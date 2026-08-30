#!/usr/bin/env python3
"""Generate the story illustrations for dialectic.html via the OpenAI image API.

Reads the shared style preamble and the 13 per-scene prompts from the
"## Image prompts" section of dialectic-map.md (the single source of truth),
calls POST /v1/images/generations (model gpt-image-2, 1536x864 — exact 16:9),
keeps the API's PNG in art/_originals/ (hidden from the indexer), and encodes
the served art/story-NN.webp with cwebp (~40 KB vs ~1.6 MB; the page loads the
.webp). Existing files are skipped, so the script is safe to re-run; use
--force to regenerate. Requires cwebp on PATH (brew install webp).

Each style iteration is a SET: a subdirectory of art/ (with its own
_originals/). The current set is named in SET below; the page tries sets
newest-first per scene and falls back to older art, so a set can be generated
incrementally and never overwrites an earlier style. `--set NAME` overrides;
`--set .` writes to art/ itself (the original, pre-set layout).

Usage:
    export OPENAI_API_KEY=sk-...
    python3 _notes/generate-story-art.py            # all missing scenes
    python3 _notes/generate-story-art.py 0 5 12     # just these scenes
    python3 _notes/generate-story-art.py --force 9  # regenerate scene 9

No dependencies beyond the standard library.
"""

import base64
import json
import os
import re
import shutil
import subprocess
import sys
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
MAP = os.path.join(HERE, "dialectic-map.md")
ART = os.path.join(HERE, "..", "art")
SET = "litho"  # current style set; must match ART_SETS in dialectic.html

API_URL = "https://api.openai.com/v1/images/generations"
MODEL = "gpt-image-2"
SIZE = "1536x864"  # exact 16:9, matching the stage — gpt-image-2 takes arbitrary WxH divisible by 16
WEBP_QUALITY = "82"


def load_prompts():
    """Return (preamble, {index: prompt}) parsed from dialectic-map.md."""
    with open(MAP, encoding="utf-8") as f:
        text = f.read()
    section = text.split("## Image prompts", 1)[1]
    # the preamble is the blockquote after "Shared style preamble"
    quote_lines = []
    in_quote = False
    for line in section.splitlines():
        if line.startswith(">"):
            in_quote = True
            quote_lines.append(line.lstrip("> ").strip())
        elif in_quote:
            break
    preamble = " ".join(quote_lines).strip()
    prompts = {}
    for m in re.finditer(r"^\|\s*(\d+)\s*\|\s*(.+?)\s*\|\s*$", section, re.M):
        prompts[int(m.group(1))] = m.group(2)
    if not preamble or len(prompts) != 13:
        sys.exit(f"parse error: preamble={bool(preamble)}, prompts={len(prompts)} (expected 13)")
    return preamble, prompts


def generate(key, prompt):
    req = urllib.request.Request(
        API_URL,
        data=json.dumps({"model": MODEL, "prompt": prompt, "size": SIZE}).encode(),
        headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=300) as resp:
        body = json.load(resp)
    return base64.b64decode(body["data"][0]["b64_json"])


def main():
    args = [a for a in sys.argv[1:] if a != "--force"]
    force = "--force" in sys.argv[1:]
    set_name = SET
    if "--set" in args:
        i = args.index("--set")
        set_name = args[i + 1]
        del args[i:i + 2]
    art_dir = os.path.normpath(os.path.join(ART, set_name))
    wanted = sorted(int(a) for a in args) if args else list(range(13))

    key = os.environ.get("OPENAI_API_KEY")
    if not key:
        sys.exit("OPENAI_API_KEY is not set")
    if not shutil.which("cwebp"):
        sys.exit("cwebp not found on PATH (brew install webp)")

    preamble, prompts = load_prompts()
    originals = os.path.join(art_dir, "_originals")
    os.makedirs(originals, exist_ok=True)
    print(f"set: {os.path.relpath(art_dir)}")

    for i in wanted:
        out = os.path.join(art_dir, f"story-{i:02d}.webp")
        png_path = os.path.join(originals, f"story-{i:02d}.png")
        if os.path.exists(out) and not force:
            print(f"scene {i:2d}: exists, skipping ({os.path.relpath(out)})")
            continue
        if os.path.exists(png_path) and not force:
            print(f"scene {i:2d}: re-encoding kept original…")
        else:
            full = f"{preamble} {prompts[i]}"
            print(f"scene {i:2d}: generating…")
            try:
                png = generate(key, full)
            except urllib.error.HTTPError as e:
                sys.exit(f"scene {i}: API error {e.code}: {e.read().decode(errors='replace')[:500]}")
            with open(png_path, "wb") as f:
                f.write(png)
        subprocess.run(["cwebp", "-quiet", "-q", WEBP_QUALITY, png_path, "-o", out], check=True)
        print(f"scene {i:2d}: wrote {os.path.relpath(out)} ({os.path.getsize(out)//1024} KB)")


if __name__ == "__main__":
    main()
