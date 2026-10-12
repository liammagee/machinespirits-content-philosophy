#!/usr/bin/env python3
"""Build the lecture-8 (Week 7: Synthesis) PowerPoint deck from lecture-8.md.

The deck uses the lecture-4 builder unchanged, so it keeps the look of the
earlier weeks' decks: 13.333 x 7.5 in, dark background, Iowan Old Style,
gold section titles, every ```notes block carried as speaker notes, and the
same text policy (every word on a slide comes from lecture-8.md).

Images: the slide illustrations are linked from lecture-8.md and live in
lecture-8-images/ (PNG masters, .webp web copies). They are generated with
Codex from _slides/lecture-8/image-prompts.md; encode-webp.py writes the web
copies. Rebuild this deck after accepting new images or editing the lecture.

Requires: pandoc on PATH, python-pptx, Pillow with WebP support.

Usage:  python3 build.py [output.pptx]     (default: ../../479-lecture-8.pptx)
"""
import os
import runpy
from pathlib import Path

HERE = Path(__file__).resolve().parent
COURSE = HERE.parent.parent

os.environ.setdefault("LECTURE_SOURCE", str(COURSE / "lecture-8.md"))
os.environ.setdefault("LECTURE_OUTPUT", str(COURSE / "479-lecture-8.pptx"))
runpy.run_path(str(HERE.parent / "lecture-4" / "build.py"), run_name="__main__")
