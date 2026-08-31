#!/usr/bin/env python3
"""Build the lecture-1 PowerPoint deck from lecture-1.md via pandoc.

The markdown is written for the web renderer, so it needs a few fixes before
pandoc will make sensible slides out of it:

  * YAML frontmatter would otherwise land as body text on slide 1
  * ```notes fences become pandoc ::: notes divs -> real speaker notes
  * headings carry stray ** that pandoc renders literally in slide titles
  * ### and ## are used interchangeably for slide breaks; --slide-level=2
    needs them normalised to ## so every slide splits in the same place

Usage:  python3 build.py [output.pptx]        (default: ../../479-lecture-1.pptx)
        LECTURE_OUTPUT=/some/where.pptx python3 build.py
"""
import os
import re
import subprocess
import sys
import zipfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
COURSE = HERE.parent.parent
SOURCE = COURSE / "lecture-1.md"
OUT = (Path(sys.argv[1]).resolve() if len(sys.argv) > 1
       else Path(os.environ.get("LECTURE_OUTPUT", COURSE / "479-lecture-1.pptx")))
INTERMEDIATE = HERE / "lecture-1-slides.md"


def to_slide_markdown(text):
    t = re.sub(r"^---\n.*?\n---\n", "", text, count=1, flags=re.S)   # YAML frontmatter
    t = re.sub(r"<!--.*?-->", "", t, flags=re.S)                      # commented-out blocks
    t = re.sub(r'<a id="[^"]*"></a>', "", t)                          # anchors
    t = re.sub(r"```notes\s*\n(.*?)```",                              # notes -> pandoc div
               lambda m: "\n::: notes\n" + m.group(1).strip() + "\n:::\n", t, flags=re.S)
    t = re.sub(r"^(#{1,6})\s*(.*)$",                                  # strip ** from headings
               lambda m: m.group(1) + " " + m.group(2).replace("**", "").strip(), t, flags=re.M)
    t = re.sub(r"^(\*\s\*\s\*|---|\*\*\*)\s*$", "", t, flags=re.M)    # horizontal rules
    t = re.sub(r"^###\s", "## ", t, flags=re.M)                       # normalise slide level
    t = re.sub(r"\n{3,}", "\n\n", t)
    return t


def verify(path):
    z = zipfile.ZipFile(path)
    slides = sorted((n for n in z.namelist() if re.match(r"ppt/slides/slide\d+\.xml$", n)),
                    key=lambda x: int(re.search(r"\d+", x).group()))
    notes = [n for n in z.namelist() if re.match(r"ppt/notesSlides/notesSlide\d+\.xml$", n)]
    visible = "".join(
        "".join(re.findall(r"<a:t>(.*?)</a:t>", z.read(n).decode()))
        for n in slides + notes
    )
    print(f"{len(slides)} slides | {len(notes)} notes slides | "
          f"stray '**': {visible.count('**')} | "
          f"frontmatter leak: {'YES' if 'category: null' in visible else 'no'}")
    for i, n in enumerate(slides, 1):
        title = "".join(re.findall(r"<a:t>(.*?)</a:t>", z.read(n).decode()))
        print(f"{i:2d}. {title[:64]}")


def main():
    INTERMEDIATE.write_text(to_slide_markdown(SOURCE.read_text()))
    subprocess.run(
        ["pandoc", INTERMEDIATE.name, "-o", str(OUT), "--slide-level=2", "--from=markdown"],
        cwd=HERE, check=True,
    )
    INTERMEDIATE.unlink()
    print(f"built {OUT} ({OUT.stat().st_size:,} bytes)")
    verify(OUT)


if __name__ == "__main__":
    main()
