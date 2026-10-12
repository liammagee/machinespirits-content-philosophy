#!/usr/bin/env python3
"""Encode the web copies of the lecture 8 slide images.

The PNGs in lecture-8-images/ are the masters: Codex writes them, they stay
in the repository, and revisions are generated from them. lecture-8.md links
the .webp written here beside each one, which is several times smaller.
The PowerPoint builders read the same files.

Up-to-date outputs are skipped, so this is safe to re-run after one image is
regenerated; --force re-encodes everything. Quality 82 matches the lecture 2
encoder.

Usage:
    python3 _slides/lecture-8/encode-webp.py
    python3 _slides/lecture-8/encode-webp.py --force

Requires Pillow with WebP support (pip install pillow).
"""
import sys
from pathlib import Path

from PIL import Image

COURSE = Path(__file__).resolve().parents[2]
IMAGES = COURSE / "lecture-8-images"
QUALITY = 82


def main():
    force = "--force" in sys.argv[1:]
    pngs = sorted(IMAGES.glob("*.png"))
    if not pngs:
        sys.exit(f"no PNGs in {IMAGES}")
    for png in pngs:
        webp = png.with_suffix(".webp")
        if not force and webp.exists() and webp.stat().st_mtime >= png.stat().st_mtime:
            print(f"up to date  {webp.name}")
            continue
        with Image.open(png) as im:
            im.convert("RGB").save(webp, "WEBP", quality=QUALITY, method=6)
        print(f"encoded     {webp.name}  {png.stat().st_size // 1024} KB -> {webp.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
