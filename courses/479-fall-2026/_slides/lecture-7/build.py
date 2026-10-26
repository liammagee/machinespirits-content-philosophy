#!/usr/bin/env python3
"""Build the lecture-7 (Week 6: Criticism / Critique) PowerPoint deck from lecture-7.md.

Uses the lecture-4 builder unchanged, like lecture-6, so the deck keeps the
look of the earlier weeks: 13.333 x 7.5 in, dark background, Iowan Old Style,
gold section titles, ```notes blocks as speaker notes.

lecture-7.md has no frontmatter, so this wrapper feeds the builder a temporary
copy with a title/week/course block prepended (the .md itself is not changed).
Delete TITLE below once lecture-7.md has its own frontmatter.

Requires: pandoc on PATH, python-pptx, Pillow with WebP support.

Usage:  python3 build.py [output.pptx]     (default: ../../479-lecture-7.pptx)
"""
import os
import runpy
import tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
COURSE = HERE.parent.parent
SOURCE = COURSE / "lecture-7.md"
TITLE = 'title: "Criticism / Critique"\nweek: 6\ncourse: "479"\n'

text = SOURCE.read_text(encoding="utf-8")
if not text.lstrip().startswith("---\n"):
    tmp = tempfile.NamedTemporaryFile("w", suffix=".md", delete=False, encoding="utf-8")
    tmp.write("---\n" + TITLE + "---\n\n" + text)
    tmp.close()
    source = tmp.name
else:
    source = str(SOURCE)

os.environ.setdefault("LECTURE_SOURCE", source)
os.environ.setdefault("LECTURE_OUTPUT", str(COURSE / "479-lecture-7.pptx"))
runpy.run_path(str(HERE.parent / "lecture-4" / "build.py"), run_name="__main__")
