#!/usr/bin/env python3
"""Build the lecture-6 (Week 5: Alignment) PowerPoint deck from lecture-6.md.

The deck uses the lecture-4 builder unchanged, so it keeps the look of the
earlier weeks' decks: 13.333 x 7.5 in, dark background, Iowan Old Style,
gold section titles, every ```notes block carried as speaker notes, and the
same text policy (every word on a slide comes from lecture-6.md).

The Norm demo screenshots in lecture-6-images/ are captured from
artifacts/norm-alignment-game.html; recapture them if the demo changes.

Requires: pandoc on PATH, python-pptx, Pillow with WebP support.

Usage:  python3 build.py [output.pptx]     (default: ../../479-lecture-6.pptx)
"""
import os
import runpy
from pathlib import Path

HERE = Path(__file__).resolve().parent
COURSE = HERE.parent.parent

os.environ.setdefault("LECTURE_SOURCE", str(COURSE / "lecture-6.md"))
os.environ.setdefault("LECTURE_OUTPUT", str(COURSE / "479-lecture-6.pptx"))
runpy.run_path(str(HERE.parent / "lecture-4" / "build.py"), run_name="__main__")
