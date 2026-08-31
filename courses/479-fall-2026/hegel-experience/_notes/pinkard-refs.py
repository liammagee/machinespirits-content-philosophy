#!/usr/bin/env python3
"""Sync the Pinkard paragraph *references* into dialectic-map.md and dialectic.html.

dialectic.html cites ~27 paragraphs (¶84-¶167) of Pinkard's translation. The
reader pane shows, per citation, a plain-language gloss (ours) and a deep link
into the freely available copy of the translation hosted by marxists.org, at
the page that paragraph starts on.

The translation itself is in copyright, so its text is deliberately NOT copied
into this repository - which is public - and this script will not write it.
Only page numbers travel: the glosses are the single source of truth in the
"## Pinkard paragraphs & glosses" section of dialectic-map.md, and the page
numbers are computed here from a local copy of the same marxists.org PDF, so
that #page=N anchors land on the right paragraph. That copy lives under
../../_readings/, which .gitignore keeps out of the repository - so expect it
to be absent on a fresh clone, and download it from the URL below.

The marxists.org edition is bilingual - each paragraph is numbered once in
English and once in German - so a paragraph marker legitimately matches twice
on a page. Uniqueness is therefore checked over distinct pages, not matches.

What a full run does:
  1. pdftotext the public PDF and locate each cited paragraph's start page.
  2. Rewrite each entry in dialectic-map.md: correct the heading's `p.N` and
     replace the blockquote with a link to that page. If a previous run of the
     retired extract-pinkard.py embedded paragraph text, this removes it.
  3. Regenerate the `const PINKARD = {...}` object in dialectic.html between
     the PINKARD:BEGIN / PINKARD:END markers - {page, gloss} only.

`--sync` skips steps 1-2 (no PDF read) and only regenerates the object from
the map as it stands - use it after editing a gloss.

Usage:
    python3 _notes/pinkard-refs.py           # resolve pages + rewrite + regenerate
    python3 _notes/pinkard-refs.py --sync    # map -> HTML only

No dependencies beyond the standard library and pdftotext (poppler) on PATH.
"""

import json
import os
import re
import shutil
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
MAP = os.path.join(HERE, "dialectic-map.md")
HTML = os.path.join(HERE, "..", "dialectic.html")
PDF = os.path.join(HERE, "..", "..", "_readings",
                   "pinkard-translation-of-phenomenology.pdf")

PDF_URL = ("https://www.marxists.org/reference/archive/hegel/works/ph/"
           "pinkard-translation-of-phenomenology.pdf")

SECTION = "## Pinkard paragraphs & glosses"
BEGIN = "/* PINKARD:BEGIN"
END = "/* PINKARD:END */"


def parse_map(text):
    """Return (head, section, tail, entries). Each entry: {key, page, gloss}."""
    if SECTION not in text:
        sys.exit(f"map parse error: section {SECTION!r} not found")
    head, rest = text.split(SECTION, 1)
    m = re.search(r"^## ", rest, re.M)  # section runs to next h2 or EOF
    section, tail = (rest[: m.start()], rest[m.start():]) if m else (rest, "")
    entries = []
    for em in re.finditer(
        r"^### ¶(\S+) · p\.(\d+)\n(.*?)(?=^### ¶|\Z)", section, re.M | re.S
    ):
        key, page, body = em.group(1), int(em.group(2)), em.group(3)
        gm = re.search(r"\*\*Gloss\.\*\*\s*(.+?)(?:\n\s*\n|\Z)", body, re.S)
        if not gm:
            sys.exit(f"map parse error: no gloss under ¶{key}")
        entries.append({
            "key": key,
            "page": page,
            "gloss": re.sub(r"\s+", " ", gm.group(1)).strip(),
        })
    if not entries:
        sys.exit("map parse error: no ### ¶ entries found")
    return head, section, tail, entries


def para_numbers(key):
    """'95' -> [95]; '113–114' -> [113, 114] (en-dash as in the cites)."""
    if "–" in key:
        a, b = key.split("–")
        return list(range(int(a), int(b) + 1))
    return [int(key)]


def paragraph_pages():
    """Return {paragraph number: page} for the public PDF."""
    if not shutil.which("pdftotext"):
        sys.exit("pdftotext not found on PATH (brew install poppler)")
    if not os.path.exists(PDF):
        sys.exit(f"PDF not found: {PDF}\nDownload it from {PDF_URL}")
    text = subprocess.run(["pdftotext", PDF, "-"],
                          capture_output=True, text=True, check=True).stdout
    marker = re.compile(r"^\s*(\d{2,3})\.\s+\S", re.M)
    seen = {}
    for page, body in enumerate(text.split("\f"), 1):  # form feed per page break
        for m in marker.finditer(body):
            seen.setdefault(int(m.group(1)), set()).add(page)
    return {n: pages.pop() for n, pages in seen.items() if len(pages) == 1}


def link_line(key, page):
    return (f"> ¶{key} in Pinkard’s translation: "
            f"[marxists.org, p.{page}]({PDF_URL}#page={page}) — "
            f"text not reproduced here (in copyright).")


def rewrite_map(head, section, tail, entries, pages):
    for e in entries:
        nums = para_numbers(e["key"])
        missing = [n for n in nums if n not in pages]
        if missing:
            print(f"  ¶{e['key']}: {missing} not resolved in the PDF — page left at {e['page']}")
        else:
            e["page"] = pages[nums[0]]
        quote = link_line(e["key"], e["page"])
        entry_re = re.compile(
            r"(^### ¶" + re.escape(e["key"]) + r" · p\.)\d+\n(.*?)(?=^### ¶|\Z)",
            re.M | re.S,
        )

        def rewrite(m, e=e, quote=quote):
            # replace the whole blockquote — placeholder, old embedded text, or
            # a previous link line — with the current link line. `^>` without a
            # trailing space so the bare `>` separating a multi-paragraph quote
            # does not end the run and strand the paragraphs after it.
            body = re.sub(r"(?:^>.*\n?)+", quote + "\n", m.group(2), count=1, flags=re.M)
            return m.group(1) + str(e["page"]) + "\n" + body

        section, n = entry_re.subn(rewrite, section)
        if n != 1:
            sys.exit(f"map rewrite error: ¶{e['key']} matched {n} times")
    return head + SECTION + section + tail


def write_html(entries):
    with open(HTML, encoding="utf-8") as f:
        html = f.read()
    i, j = html.find(BEGIN), html.find(END)
    if i < 0 or j < 0 or j < i:
        sys.exit("dialectic.html: PINKARD:BEGIN/END markers not found or out of order")
    obj = {e["key"]: {"page": e["page"], "gloss": e["gloss"]} for e in entries}
    block = (
        BEGIN + " — generated from _notes/dialectic-map.md by"
        " _notes/pinkard-refs.py; edit there, then re-run (--sync for"
        " gloss-only changes). Page numbers index the marxists.org PDF;"
        " the translation itself is in copyright and is never embedded. */\n"
        "const PINKARD=" + json.dumps(obj, ensure_ascii=False) + ";\n"
    )
    with open(HTML, "w", encoding="utf-8") as f:
        f.write(html[:i] + block + html[j:])


def main():
    sync_only = "--sync" in sys.argv[1:]
    with open(MAP, encoding="utf-8") as f:
        map_text = f.read()
    head, section, tail, entries = parse_map(map_text)
    print(f"map: {len(entries)} entries")
    if not sync_only:
        pages = paragraph_pages()
        print(f"pdf: {len(pages)} paragraphs resolved to a unique page")
        new_map = rewrite_map(head, section, tail, entries, pages)
        with open(MAP, "w", encoding="utf-8") as f:
            f.write(new_map)
        head, section, tail, entries = parse_map(new_map)
    write_html(entries)
    print(f"html: PINKARD object regenerated — {len(entries)} page references, no text")


if __name__ == "__main__":
    main()
