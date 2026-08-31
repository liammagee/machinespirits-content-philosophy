#!/usr/bin/env python3
"""Encode the web copies of the lecture 2 slide images.

The generated slide illustrations arrive as ~2.9 MB PNGs. PNG is lossless and
these are painterly images full of gradient and grain - the one thing it is
worst at - so the illustrated lecture pulled roughly 43 MB before this step.
The PNGs stay in the repository as the masters (the PowerPoint builder embeds
them, and revisions are generated from them); the lecture markdown links the
.webp written here, about nine times smaller.

Sources: lecture-2-images/*.png and concept-relations.png (slide 20). Each is
encoded beside its master at the same pixel size - 1672x941 is already about
right for a retina content column, so nothing is downscaled. Quality 82 matches
hegel-experience/_notes/generate-story-art.py, the other webp encoder here.

Up-to-date outputs are skipped, so the script is safe to re-run after
regenerating a single slide; --force re-encodes everything.

Usage:
    python3 _slides/lecture-2/encode-webp.py
    python3 _slides/lecture-2/encode-webp.py --force

Requires cwebp on PATH (brew install webp). No other dependencies.
"""

import glob
import os
import shutil
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
COURSE = os.path.normpath(os.path.join(HERE, "..", ".."))
QUALITY = "82"


def sources():
    paths = sorted(glob.glob(os.path.join(COURSE, "lecture-2-images", "*.png")))
    slide20 = os.path.join(COURSE, "concept-relations.png")
    if os.path.exists(slide20):
        paths.append(slide20)
    return paths


def main():
    force = "--force" in sys.argv[1:]
    if not shutil.which("cwebp"):
        sys.exit("cwebp not found on PATH (brew install webp)")
    paths = sources()
    if not paths:
        sys.exit(f"no PNGs found under {COURSE}")

    before = after = 0
    for png in paths:
        webp = png[: -len(".png")] + ".webp"
        name = os.path.relpath(webp, COURSE)
        if (not force and os.path.exists(webp)
                and os.path.getmtime(webp) >= os.path.getmtime(png)):
            print(f"  {name}: up to date, skipping")
            after += os.path.getsize(webp)
            before += os.path.getsize(png)
            continue
        subprocess.run(["cwebp", "-quiet", "-q", QUALITY, png, "-o", webp],
                       check=True)
        b, a = os.path.getsize(png), os.path.getsize(webp)
        before, after = before + b, after + a
        print(f"  {name}: {b / 1048576:.2f} MB -> {a / 1024:.0f} KB")

    print(f"\n{len(paths)} images: {before / 1048576:.1f} MB of masters, "
          f"{after / 1048576:.1f} MB served")


if __name__ == "__main__":
    main()
