#!/usr/bin/env python3
"""Encode webp copies of the shared images served at /markdown/images/.

assets/images/ is the flat pool the website serves at /markdown/images/<file>
(server.js mounts it there for the absolute refs written in lecture markdown).
Much of it is generated section art: 2-3.5 MB PNGs of painterly, grainy
pictures, which is the content PNG compresses worst. The 479 and 590 lectures
pull twenty of them, so several pages weighed 20-50 MB.

This script encodes a .webp beside each referenced master and repoints the
markdown at it. The PNG stays as the master, the way lecture 2's slide art
works (courses/479-fall-2026/_slides/lecture-2/encode-webp.py).

Two rules keep it safe to re-run:

  * A reference is only rewritten when the .webp exists AND is meaningfully
    smaller. Small or already-efficient images keep their PNG rather than
    churning the markdown for nothing.
  * References are scanned in both forms, so a .webp ref still resolves back
    to its master and gets re-encoded when that master changes.

Only the absolute /markdown/images/ form is touched. Relative `images/foo.png`
refs - used by 490, dissertation and socsci_and_ai - resolve against each
course's own images/ directory and are left alone.

Usage:
    python3 assets/_tools/encode-webp.py            # encode + repoint
    python3 assets/_tools/encode-webp.py --dry-run  # report, change nothing
    python3 assets/_tools/encode-webp.py --force    # re-encode everything

Requires cwebp on PATH (brew install webp). No other dependencies.
"""

import os
import re
import shutil
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, "..", ".."))
POOL = os.path.join(ROOT, "assets", "images")
CONTENT = ("articles", "courses", "notes")
QUALITY = "82"

# below this saving, leave the reference on the PNG - not worth the churn
MIN_SAVING = 0.25

REF = re.compile(r"/markdown/images/([A-Za-z0-9._%-]+\.(?:png|jpe?g|webp))", re.I)
MASTERS = (".png", ".jpeg", ".jpg")


def markdown_files():
    for top in CONTENT:
        for dirpath, dirnames, filenames in os.walk(os.path.join(ROOT, top)):
            dirnames[:] = [d for d in dirnames if d != "node_modules"]
            for name in filenames:
                if name.endswith(".md"):
                    yield os.path.join(dirpath, name)


def referenced():
    """Distinct master filenames referenced at /markdown/images/, in either form."""
    names = set()
    for path in markdown_files():
        with open(path, encoding="utf-8") as f:
            for name in REF.findall(f.read()):
                if name.lower().endswith(".webp"):
                    stem = name[: -len(".webp")]
                    for ext in MASTERS:
                        if os.path.exists(os.path.join(POOL, stem + ext)):
                            names.add(stem + ext)
                            break
                else:
                    names.add(name)
    return sorted(names)


def encode(names, force, dry_run):
    """Return {master name: webp name} for masters whose webp is worth using."""
    wins, saved, skipped, missing = {}, 0, [], []
    for name in names:
        master = os.path.join(POOL, name)
        if not os.path.exists(master):
            missing.append(name)
            continue
        stem = os.path.splitext(name)[0]
        webp_name = stem + ".webp"
        webp = os.path.join(POOL, webp_name)
        stale = (not os.path.exists(webp)
                 or os.path.getmtime(webp) < os.path.getmtime(master))
        if (stale or force) and not dry_run:
            subprocess.run(["cwebp", "-quiet", "-q", QUALITY, master, "-o", webp],
                           check=True)
        if not os.path.exists(webp):
            continue  # dry run with nothing encoded yet
        big, small = os.path.getsize(master), os.path.getsize(webp)
        if 1 - small / big < MIN_SAVING:
            skipped.append((name, big, small))
            if not dry_run and stale:
                os.remove(webp)
            continue
        wins[name] = webp_name
        saved += big - small
    return wins, saved, skipped, missing


def repoint(wins, dry_run):
    """Point every /markdown/images/<master> ref at its webp. Returns files changed."""
    changed = []
    for path in markdown_files():
        with open(path, encoding="utf-8") as f:
            text = original = f.read()
        for master, webp in wins.items():
            text = text.replace(f"/markdown/images/{master}",
                                f"/markdown/images/{webp}")
        if text != original:
            changed.append(os.path.relpath(path, ROOT))
            if not dry_run:
                with open(path, "w", encoding="utf-8") as f:
                    f.write(text)
    return changed


def main():
    force = "--force" in sys.argv[1:]
    dry_run = "--dry-run" in sys.argv[1:]
    if not shutil.which("cwebp"):
        sys.exit("cwebp not found on PATH (brew install webp)")

    names = referenced()
    print(f"{len(names)} images referenced at /markdown/images/")
    wins, saved, skipped, missing = encode(names, force, dry_run)

    for name in missing:
        print(f"  referenced but not in assets/images/: {name}")
    for name, big, small in skipped:
        print(f"  {name}: webp saves only "
              f"{100 * (1 - small / big):.0f}%, keeping the PNG")

    changed = repoint(wins, dry_run)
    verb = "would repoint" if dry_run else "repointed"
    print(f"\n{len(wins)} images encoded, {saved / 1048576:.1f} MB saved across "
          f"the pool\n{verb} {len(changed)} markdown files")
    for path in changed:
        print(f"  {path}")


if __name__ == "__main__":
    main()
