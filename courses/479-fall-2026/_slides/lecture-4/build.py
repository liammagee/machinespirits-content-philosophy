#!/usr/bin/env python3
"""Build the lecture-4 PowerPoint deck from lecture-4.md.

The deck keeps the look of 479-lecture-2.pptx and 479-lecture-3.pptx:
13.333 x 7.5 in, dark background, Iowan Old Style, gold for quotations and
section titles.

Text policy: every heading, bullet, quotation, table cell and paragraph on a
slide comes from lecture-4.md unchanged. Speaker notes come from the ```notes
fences. The only text the builder adds is the title slide's course/week line
(from the frontmatter), "(cont.)" on continuation slides when a body does not
fit at the minimum size, and the slide number in the corner.

What this builder adds over the lecture-3 one, because lecture-4.md uses it:
  * pipe tables, drawn as real PowerPoint tables in the deck palette;
  * a table whose cells hold only images, drawn as a row of images;
  * more than one image on a slide;
  * display and inline math, converted to Unicode text;
  * fenced code blocks and inline code, set in a monospaced face;
  * <span style="font-size:0.8em;"> reference lists, set smaller;
  * <span style="color: red;">word</span>, kept in colour;
  * relative links, rewritten to their machinespirits.org address.

Images: local /markdown/images/..., /content/courses/479-fall-2026/... and
repo-relative assets/images/... references are embedded (WebP is decoded to
JPEG/PNG for PowerPoint). Remote images are not downloaded; the slide keeps
the alt text as a link instead.

Requires: pandoc on PATH, python-pptx, Pillow with WebP support.

Usage:  python3.13 build.py [output.pptx]     (default: ../../479-lecture-4.pptx)
"""
import io
import json
import math
import os
import re
import subprocess
import sys
import unicodedata
import zipfile
from pathlib import Path
from urllib.parse import urljoin

from lxml import etree
from PIL import Image
from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, MSO_AUTO_SIZE, PP_ALIGN
from pptx.oxml.ns import qn
from pptx.util import Inches, Pt

HERE = Path(__file__).resolve().parent
COURSE = HERE.parent.parent
ROOT = COURSE.parent.parent
SOURCE = Path(os.environ.get("LECTURE_SOURCE", COURSE / "lecture-4.md"))
OUT = (Path(sys.argv[1]).resolve() if len(sys.argv) > 1
       else Path(os.environ.get("LECTURE_OUTPUT", COURSE / "479-lecture-4.pptx")))

SERIF = "Iowan Old Style"
SERIF_FILE = "/System/Library/Fonts/Supplemental/Iowan Old Style.ttc"
MONO = "Menlo"
# Iowan Old Style has no arrows or maths ellipsis; those characters get a face
# that does, so PowerPoint never has to guess a substitute.
FALLBACK = "Arial"
NO_GLYPH = "\u2192\u2190\u2194\u21d2\u21d0\u22ef\u2212\u2260\u2264\u2265"
C = dict(bg="121021", ink="ECE7F0", gold="F0C9A0", dim="A49DB8", mint="8FD6C2",
         red="E8636B", rule="3A3450")
SPAN_COLOR = {"red": C["red"], "gold": C["gold"], "green": C["mint"], "blue": C["mint"]}
W, H = 13.333, 7.5
MARGIN = 0.67
TITLE_TOP, TITLE_W = 0.5, 12.0
BODY_BOTTOM = 6.85
IMG_LEFT, IMG_W = 8.05, 4.62
BODY_W_WITH_IMAGE = IMG_LEFT - MARGIN - 0.35
SIZES = [24, 22, 21, 20, 19, 18, 17, 16, 15]
MIN_SIZE = SIZES[-1]
CHAR_EM = 0.47           # fallback glyph advance, in em, when the font file is absent
MEASURE_PPP = 4          # pixels per point when measuring real text widths
LINE = 1.20              # line height as a multiple of font size
BLOCK_GAP = 0.16         # vertical gap between a text block and a table, inches
CELL_HPAD, CELL_VPAD = 0.10, 0.05
TABLE_MIN_COL = 0.95
# Relative links in the source resolve against the page's own address on the site.
SITE_BASE = "https://machinespirits.org/content/courses/479-fall-2026/"

# --------------------------------------------------------------------------
# 1. Source -> slide model (via pandoc's JSON AST)
# --------------------------------------------------------------------------

def preprocess(text):
    """Make slide separators, block quotes and coloured spans plain for pandoc."""
    text = re.sub(r'<span style="color:\s*([a-z]+);?\s*">(.*?)</span>',
                  lambda m: "[" + m.group(2) + "]{." + m.group(1) + "}", text)
    lines = text.split("\n")
    out = []
    for i, line in enumerate(lines):
        is_rule = re.match(r"^\s*(\*\s\*\s\*|---|\*\*\*)\s*$", line) and i > 0
        starts_quote = line.lstrip().startswith(">")
        prev = out[-1] if out else ""
        if (is_rule or starts_quote) and prev.strip() and not prev.lstrip().startswith(">"):
            out.append("")
        out.append(line)
    return "\n".join(out)


def pandoc_json(markdown):
    r = subprocess.run(["pandoc", "-f", "markdown-implicit_figures", "-t", "json"],
                       input=markdown, capture_output=True, text=True, check=True)
    return json.loads(r.stdout)


def pandoc_plain(markdown):
    r = subprocess.run(["pandoc", "-f", "markdown", "-t", "plain", "--wrap=none"],
                       input=markdown, capture_output=True, text=True, check=True)
    return r.stdout.strip()


def _shifted(ch):
    """The base character behind a Unicode sub/superscript, or None."""
    d = unicodedata.decomposition(ch)
    tag = d.split(" ")[0].strip("<>") if d.startswith("<") else ""
    if tag in ("sub", "super"):
        return tag, unicodedata.normalize("NFKC", ch)
    return None


# Pandoc writes subscripts two ways: y_(i) or x_1 where no glyph exists, and the
# Unicode character where one does. The serif carries almost none of the latter,
# so both forms become real PowerPoint subscript runs.
SUBSCRIPT_RE = re.compile(r"_\(([^)]*)\)|_(\w)")


def shifted_runs(text, style):
    """Split out the Unicode sub/superscript characters as shifted runs."""
    out, buf, kind = [], "", None
    for ch in text:
        hit = _shifted(ch)
        want = hit[0] if hit else None
        if want != kind and buf:
            out.append({"text": buf, **style, **({kind: True} if kind else {})})
            buf = ""
        kind, buf = want, buf + (hit[1] if hit else ch)
    if buf:
        out.append({"text": buf, **style, **({kind: True} if kind else {})})
    return out


def subscript_runs(text, style):
    """Split pandoc's y_(i) and x_1 into ordinary runs plus subscript runs."""
    out, pos = [], 0
    for m in SUBSCRIPT_RE.finditer(text):
        if m.start() > pos:
            out += shifted_runs(text[pos:m.start()], style)
        body = m.group(1) if m.group(1) is not None else m.group(2)
        out.append({"text": body, **style, "sub": True})
        pos = m.end()
    if pos < len(text):
        out += shifted_runs(text[pos:], style)
    return out


def math_to_text(tex):
    """Render a TeX fragment as Unicode; fall back to a tidied TeX string."""
    body = re.sub(r"\\(begin|end)\{[a-zA-Z*]+\}", "", tex)
    body = body.replace("&", "").replace("\\\\", " ").replace("\\quad", "   ")
    body = " ".join(body.split())
    if not body:
        return ""
    try:
        out = pandoc_plain("$" + body + "$")
    except subprocess.CalledProcessError:
        out = body
    if "\\" in out:
        out = re.sub(r"\\[a-zA-Z]+", "", body)
    out = re.sub(r"[\u2000-\u200a\u202f\u205f]", " ", out).replace("\u22ef", "\u2026")
    return re.sub(r" {2,}", "   ", out)


def link_address(url):
    """Give a relative link its address on the site; leave absolute links alone."""
    if re.match(r"^[a-z]+:", url) or url.startswith("#"):
        return url
    return urljoin(SITE_BASE, url)


def inlines_to_runs(inlines, style=None):
    """Flatten pandoc inlines to [{text, bold, italic, link, mono, color}]."""
    style = style or {}
    runs = []
    for el in inlines:
        t, c = el["t"], el.get("c")
        if t == "Str":
            runs.append({"text": c, **style})
        elif t in ("Space", "SoftBreak", "LineBreak"):
            runs.append({"text": " ", **style})
        elif t == "Emph":
            runs += inlines_to_runs(c, {**style, "italic": True})
        elif t == "Strong":
            runs += inlines_to_runs(c, {**style, "bold": True})
        elif t == "Span":
            classes = c[0][1]
            color = next((SPAN_COLOR[k] for k in classes if k in SPAN_COLOR), None)
            runs += inlines_to_runs(c[1], {**style, "color": color} if color else style)
        elif t in ("Underline", "SmallCaps", "Strikeout", "Superscript", "Subscript"):
            runs += inlines_to_runs(c, style)
        elif t == "Code":
            runs.append({"text": c[1], **style, "mono": True})
        elif t == "Math":
            runs += subscript_runs(math_to_text(c[1]), style)
        elif t == "Quoted":
            q = ("\u201c", "\u201d") if c[0]["t"] == "DoubleQuote" else ("\u2018", "\u2019")
            runs.append({"text": q[0], **style})
            runs += inlines_to_runs(c[1], style)
            runs.append({"text": q[1], **style})
        elif t == "Link":
            runs += inlines_to_runs(c[1], {**style, "link": link_address(c[2][0])})
        elif t == "Cite":
            runs += inlines_to_runs(c[1], style)
        elif t in ("Image", "RawInline", "Note"):
            pass
        else:
            raise ValueError(f"Unsupported inline {t}")
    merged = []
    for r in runs:
        same = merged and {k: v for k, v in merged[-1].items() if k != "text"} == \
            {k: v for k, v in r.items() if k != "text"}
        if same:
            merged[-1]["text"] += r["text"]
        else:
            merged.append(dict(r))
    return merged


def runs_text(runs):
    return "".join(r["text"] for r in runs)


def meta_text(v):
    if v is None:
        return None
    if isinstance(v, dict):
        t, c = v["t"], v.get("c")
        if t == "MetaString":
            return c
        if t == "MetaInlines":
            return runs_text(inlines_to_runs(c))
        if t == "MetaBool":
            return str(c)
        return None
    return str(v)


def cell_content(blocks):
    """Reduce one table cell to {runs, image}."""
    runs, image = [], None
    for b in blocks:
        t, c = b["t"], b.get("c")
        if t in ("Para", "Plain"):
            for img in (x for x in c if x["t"] == "Image"):
                image = image or img["c"][2][0]
            if runs:
                runs.append({"text": " "})
            runs += inlines_to_runs([x for x in c if x["t"] != "Image"])
        elif t in ("BulletList", "OrderedList"):
            for item in (c if t == "BulletList" else c[1]):
                if runs:
                    runs.append({"text": "  "})
                runs += cell_content(item)["runs"]
        elif t == "CodeBlock":
            runs.append({"text": c[1].strip(), "mono": True})
    return {"runs": runs, "image": image}


def table_rows(rowlist):
    return [[cell_content(cell[4]) for cell in row[1]] for row in rowlist]


def parse_table(c):
    """Pandoc Table -> {head, rows}. head is None for a headerless table."""
    _attr, _caption, colspecs, thead, tbodies, tfoot = c
    head = table_rows(thead[1])
    rows = []
    for body in tbodies:
        rows += table_rows(body[3])
    rows += table_rows(tfoot[1])
    head_row = head[0] if head and any(runs_text(x["runs"]).strip() or x["image"]
                                       for x in head[0]) else None
    ncols = max([len(colspecs)] + [len(r) for r in rows] + ([len(head_row)] if head_row else []))
    pad = lambda r: r + [{"runs": [], "image": None}] * (ncols - len(r))
    return {"kind": "table", "level": 0,
            "head": pad(head_row) if head_row else None,
            "rows": [pad(r) for r in rows if r]}


def image_only_table(tbl):
    """A table used purely to set images side by side."""
    cells = [c for row in tbl["rows"] for c in row]
    return (tbl["head"] is None and cells
            and all(c["image"] and not runs_text(c["runs"]).strip() for c in cells))


def list_items(items, slide, level, markers):
    for marker, item in zip(markers, items):
        first = True
        for child in item:
            if child["t"] in ("BulletList", "OrderedList"):
                blocks_to_paras([child], slide, level + 1)
            elif child["t"] in ("Para", "Plain"):
                runs = inlines_to_runs(child["c"])
                if runs_text(runs).strip():
                    kind = ("number" if marker else "bullet") if first else "para"
                    add_para(slide, {"kind": kind, "marker": marker, "level": level, "runs": runs})
                    first = False
            else:
                blocks_to_paras([child], slide, level + 1)


def add_para(slide, para):
    para["small"] = slide["small"]
    slide["body"].append(para)


def blocks_to_paras(blocks, slide, level=0):
    """Append body elements to slide from pandoc blocks."""
    for b in blocks:
        t, c = b["t"], b.get("c")
        if t in ("Para", "Plain"):
            imgs = [x for x in c if x["t"] == "Image"]
            for img in imgs:
                slide["images"].append({"src": img["c"][2][0],
                                        "alt": runs_text(inlines_to_runs(img["c"][1]))})
            rest = inlines_to_runs([x for x in c if x["t"] != "Image"])
            if runs_text(rest).strip():
                kind = "math" if len(c) == 1 and c[0]["t"] == "Math" else "para"
                add_para(slide, {"kind": kind, "level": level, "runs": rest})
        elif t == "BulletList":
            list_items(c, slide, level, [None] * len(c))
        elif t == "OrderedList":
            start = c[0][0]
            list_items(c[1], slide, level, [f"{n}." for n in range(start, start + len(c[1]))])
        elif t == "BlockQuote":
            for child in c:
                if child["t"] in ("Para", "Plain"):
                    add_para(slide, {"kind": "quote", "level": level,
                                     "runs": inlines_to_runs(child["c"])})
                else:
                    blocks_to_paras([child], slide, level)
        elif t == "Table":
            tbl = parse_table(c)
            if image_only_table(tbl):
                for row in tbl["rows"]:
                    for cell in row:
                        slide["images"].append({"src": cell["image"], "alt": ""})
            else:
                slide["body"].append(tbl)
        elif t == "CodeBlock":
            attr, text = c
            if "notes" in attr[1]:
                slide["notes"] = (slide["notes"] + "\n\n" + pandoc_plain(text)).strip()
            elif text.strip():
                add_para(slide, {"kind": "code", "level": level,
                                 "runs": [{"text": text.strip(), "mono": True}]})
        elif t == "RawBlock":
            fmt, raw = c
            if fmt == "html" and re.search(r"font-size\s*:", raw):
                slide["small"] = True
            elif fmt == "html" and "</span>" in raw:
                slide["small"] = False
        elif t in ("Null", "HorizontalRule"):
            pass
        elif t == "Div":
            blocks_to_paras(c[1], slide, level)
        else:
            raise ValueError(f"Unsupported block {t} on slide {slide['title']!r}")


def new_slide():
    return {"title": "", "title_runs": [], "level": 0, "body": [], "images": [],
            "notes": "", "small": False}


def has_content(s):
    return bool(s["title"] or s["body"] or s["images"])


def parse_source(path):
    doc = pandoc_json(preprocess(path.read_text()))
    meta = doc["meta"]
    slides, cur = [], new_slide()
    for b in doc["blocks"]:
        if b["t"] == "HorizontalRule":
            if has_content(cur):
                slides.append(cur)
            cur = new_slide()
        elif b["t"] == "Header":
            if has_content(cur):
                slides.append(cur)
                cur = new_slide()
            cur["level"] = b["c"][0]
            cur["title_runs"] = inlines_to_runs(b["c"][2])
            cur["title"] = runs_text(cur["title_runs"]).strip()
        else:
            blocks_to_paras([b], cur)
    if has_content(cur):
        slides.append(cur)
    return {"title": meta_text(meta.get("title")) or "", "week": meta_text(meta.get("week")),
            "course": meta_text(meta.get("course")), "slides": slides}

# --------------------------------------------------------------------------
# 2. Layout: measuring, splitting, stacking
# --------------------------------------------------------------------------

def rgb(hexstr):
    return RGBColor.from_string(hexstr)


_measure_fonts = {}


def measure_font(size_pt):
    """The real Iowan Old Style face at this size, or None if it is not installed."""
    if size_pt not in _measure_fonts:
        try:
            from PIL import ImageFont
            _measure_fonts[size_pt] = ImageFont.truetype(
                SERIF_FILE, max(4, int(size_pt * MEASURE_PPP)), index=0)
        except (ImportError, OSError):
            _measure_fonts[size_pt] = None
    return _measure_fonts[size_pt]


def est_lines(text, size_pt, width_in):
    """Count the lines this text wraps to, measuring the real glyph widths."""
    font = measure_font(size_pt)
    if font is None:
        cpl = max(8, int(width_in * 72 / (size_pt * CHAR_EM)))
        return max(1, math.ceil(len(text) / cpl))
    limit = width_in * 72 * MEASURE_PPP * 0.98      # 2 % back for bold runs
    lines, cur = 1, ""
    for word in text.split(" "):
        trial = word if not cur else cur + " " + word
        if not cur or font.getlength(trial) <= limit:
            cur = trial
        else:
            lines += 1
            cur = word
    return lines


def para_indent(p):
    if p["kind"] in ("bullet", "number"):
        return 0.30 + 0.30 * p["level"]
    if p["kind"] in ("quote", "code"):
        return 0.25
    return 0.30 * p["level"]


def para_size(p, size):
    s = size if p["level"] == 0 else size - 2
    return max(MIN_SIZE - 4, s - 3) if p.get("small") else s


def para_space_after(p):
    return 8 if p["kind"] in ("quote", "code", "math") else 6


def body_height_pt(paras, size, width_in):
    total = 0.0
    for p in paras:
        s = para_size(p, size)
        lines = est_lines(runs_text(p["runs"]), s, width_in - para_indent(p))
        total += lines * s * LINE + para_space_after(p)
    return total


def table_size(size):
    return max(12, size - 3)


def col_widths(tbl, size, width_in):
    """Split the table width by how much text each column carries."""
    rows = ([tbl["head"]] if tbl["head"] else []) + tbl["rows"]
    ncols = len(rows[0])
    weight = []
    for i in range(ncols):
        longest = max(len(runs_text(r[i]["runs"])) for r in rows)
        weight.append(max(longest, 6) ** 0.85)
    total = sum(weight)
    widths = [width_in * w / total for w in weight]
    # lift thin columns to a readable minimum, then take it back from the widest
    for i, w in enumerate(widths):
        if w < TABLE_MIN_COL and width_in >= TABLE_MIN_COL * ncols:
            debt = TABLE_MIN_COL - w
            widths[i] = TABLE_MIN_COL
            j = widths.index(max(widths))
            widths[j] -= debt
    return widths


def row_height_in(cells, widths, size):
    lines = 1
    for cell, w in zip(cells, widths):
        lines = max(lines, est_lines(runs_text(cell["runs"]), size, max(0.4, w - 2 * CELL_HPAD)))
    return lines * size * LINE / 72 + 2 * CELL_VPAD


def table_height_in(tbl, size, width_in):
    s = table_size(size)
    widths = col_widths(tbl, size, width_in)
    rows = ([tbl["head"]] if tbl["head"] else []) + tbl["rows"]
    return sum(row_height_in(r, widths, s) for r in rows)


def blocks_of(body):
    """Group the body into a vertical stack of text blocks and tables."""
    out = []
    for el in body:
        if el["kind"] == "table":
            out.append({"type": "table", "table": el})
        elif out and out[-1]["type"] == "text":
            out[-1]["paras"].append(el)
        else:
            out.append({"type": "text", "paras": [el]})
    return out


def merge_text(blocks):
    out = []
    for b in blocks:
        if b["type"] == "text" and out and out[-1]["type"] == "text":
            out[-1] = {"type": "text", "paras": out[-1]["paras"] + b["paras"]}
        else:
            out.append(b)
    return out


def block_height_in(b, size, width_in):
    if b["type"] == "text":
        return body_height_pt(b["paras"], size, width_in) / 72
    return table_height_in(b["table"], size, width_in)


def stack_height_in(blocks, size, width_in):
    if not blocks:
        return 0.0
    return (sum(block_height_in(b, size, width_in) for b in blocks)
            + BLOCK_GAP * (len(blocks) - 1))


def split_table(tbl, size, width_in, height_in):
    """Cut a tall table into row groups, each repeating the header."""
    s = table_size(size)
    widths = col_widths(tbl, size, width_in)
    head_h = row_height_in(tbl["head"], widths, s) if tbl["head"] else 0.0
    parts, cur, used = [], [], head_h
    for row in tbl["rows"]:
        h = row_height_in(row, widths, s)
        if cur and used + h > height_in:
            parts.append(cur)
            cur, used = [], head_h
        cur.append(row)
        used += h
    if cur:
        parts.append(cur)
    return [{"type": "table", "table": {**tbl, "rows": p}} for p in parts]


def atomize(blocks, size, width_in, height_in):
    """Break any block too tall for one slide into pieces that fit."""
    out = []
    for b in blocks:
        if block_height_in(b, size, width_in) <= height_in:
            out.append(b)
        elif b["type"] == "text":
            out += [{"type": "text", "paras": [p]} for p in b["paras"]]
        else:
            out += split_table(b["table"], size, width_in, height_in)
    return out


def greedy_chunks(blocks, size, width_in, height_in):
    chunks, cur = [], []
    for b in blocks:
        if cur and stack_height_in(cur + [b], size, width_in) > height_in:
            chunks.append(cur)
            cur = []
        cur.append(b)
    if cur:
        chunks.append(cur)
    return [merge_text(ch) for ch in chunks]


def plan_body(body, width_in, height_in):
    """Return (font size, [chunks]) so every chunk fits and sizes stay equal."""
    blocks = blocks_of(body)
    if not blocks:
        return MIN_SIZE, [[]]
    for s in SIZES:
        if stack_height_in(blocks, s, width_in) <= height_in:
            return s, [blocks]
    n = len(greedy_chunks(atomize(blocks, MIN_SIZE, width_in, height_in),
                          MIN_SIZE, width_in, height_in))
    for s in SIZES:
        chunks = greedy_chunks(atomize(blocks, s, width_in, height_in), s, width_in, height_in)
        if len(chunks) <= n:
            return s, chunks
    return MIN_SIZE, greedy_chunks(atomize(blocks, MIN_SIZE, width_in, height_in),
                                   MIN_SIZE, width_in, height_in)

# --------------------------------------------------------------------------
# 3. Drawing: text, tables, images
# --------------------------------------------------------------------------

def add_textbox(slide, left, top, width, height, anchor=MSO_ANCHOR.TOP):
    tb = slide.shapes.add_textbox(Inches(left), Inches(top), Inches(width), Inches(height))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.auto_size = MSO_AUTO_SIZE.NONE
    tf.vertical_anchor = anchor
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    return tb, tf


def style_run(run, size, color=C["ink"], bold=False, italic=False, link=None,
              mono=False, sub=False, sup=False, face=None):
    f = run.font
    f.name = face or (MONO if mono else SERIF)
    shift = sub or sup
    f.size = Pt(round(size * 0.68) if shift else (size - 2 if mono else size))
    f.bold = bold
    f.italic = italic
    f.color.rgb = rgb(color)
    if shift:
        f._rPr.set("baseline", "-25000" if sub else "30000")
    if link:
        run.hyperlink.address = link
        f.color.rgb = rgb(C["mint"])


def split_glyphs(runs):
    """Give every character the serif lacks its own run in the fallback face."""
    out = []
    for r in runs:
        if r.get("mono") or not any(c in NO_GLYPH for c in r["text"]):
            out.append(r)
            continue
        buf, odd = "", False
        for ch in r["text"]:
            if (ch in NO_GLYPH) != odd and buf:
                out.append(dict(r, text=buf, face=FALLBACK if odd else None))
                buf = ""
            odd = ch in NO_GLYPH
            buf += ch
        if buf:
            out.append(dict(r, text=buf, face=FALLBACK if odd else None))
    return out


PARA_RE = re.compile(r"(\s*\(para\.?\s*\d+\)[\s.*]*)$")


def add_runs(p, runs, size, color, italic=False, para_color=None):
    """Write runs into paragraph p; a trailing '(para N)' gets dim styling."""
    runs = [dict(r) for r in runs]
    if para_color and runs:
        last = runs[-1]
        m = PARA_RE.search(last["text"])
        if m:
            ref = " " + re.sub(r"\(para\.?\s*", "(para ", m.group(1).strip())
            tail = dict(last, text=ref, paranum=True)
            head = dict(last, text=last["text"][:m.start()])
            runs[-1:] = ([head] if head["text"] else []) + [tail]
    for r in split_glyphs(runs):
        run = p.add_run()
        run.text = r["text"]
        if r.get("paranum"):
            style_run(run, max(size - 4, 11), para_color, italic=False)
        else:
            style_run(run, size, r.get("color") or color, bold=r.get("bold", False),
                      italic=italic or r.get("italic", False), link=r.get("link"),
                      mono=r.get("mono", False), sub=r.get("sub", False),
                      sup=r.get("super", False), face=r.get("face"))


def set_bullet(p, marker, marL_in, indent_in):
    pPr = p._p.get_or_add_pPr()
    pPr.set("marL", str(int(Inches(marL_in))))
    pPr.set("indent", str(int(Inches(indent_in))))
    for tag in ("a:buNone", "a:buChar", "a:buAutoNum", "a:buFont", "a:buClr", "a:buSzPct"):
        for el in pPr.findall(qn(tag)):
            pPr.remove(el)
    if marker is None:
        etree.SubElement(pPr, qn("a:buNone"))
        return
    etree.SubElement(etree.SubElement(pPr, qn("a:buClr")), qn("a:srgbClr")).set("val", C["gold"])
    etree.SubElement(pPr, qn("a:buSzPct")).set("val", "90000")
    etree.SubElement(pPr, qn("a:buFont")).set("typeface", "Arial")
    etree.SubElement(pPr, qn("a:buChar")).set("char", marker)


def fill_body(tf, paras, size):
    for i, p in enumerate(paras):
        para = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        s = para_size(p, size)
        para.line_spacing = 1.08
        para.space_after = Pt(para_space_after(p))
        if p["kind"] == "bullet":
            set_bullet(para, "•" if p["level"] == 0 else "–",
                       0.30 + 0.30 * p["level"], -0.24)
            add_runs(para, p["runs"], s, C["ink"])
        elif p["kind"] == "number":
            set_bullet(para, None, 0.30 + 0.30 * p["level"], -0.30)
            run = para.add_run()
            run.text = p["marker"] + "  "
            style_run(run, s, C["gold"], bold=True)
            add_runs(para, p["runs"], s, C["ink"])
        elif p["kind"] == "quote":
            set_bullet(para, None, 0.25, 0)
            add_runs(para, p["runs"], s, C["gold"], italic=True, para_color=C["dim"])
        elif p["kind"] == "code":
            set_bullet(para, None, 0.25, 0)
            add_runs(para, p["runs"], s, C["mint"])
        elif p["kind"] == "math":
            set_bullet(para, None, 0.25, 0)
            add_runs(para, p["runs"], s, C["gold"])
        else:
            set_bullet(para, None, 0.30 * p["level"], 0)
            add_runs(para, p["runs"], s, C["ink"])


TCPR_ORDER = ["a:lnL", "a:lnR", "a:lnT", "a:lnB", "a:lnTlToBr", "a:lnBlToTr", "a:cell3D",
              "a:noFill", "a:solidFill", "a:gradFill", "a:blipFill", "a:pattFill",
              "a:grpFill", "a:headers", "a:extLst"]


def ordered_child(parent, tag):
    """Get or insert a child of parent, keeping the schema's element order."""
    found = parent.find(qn(tag))
    if found is not None:
        return found
    el = etree.Element(qn(tag))
    rank = TCPR_ORDER.index(tag)
    for i, child in enumerate(parent):
        name = "a:" + etree.QName(child).localname
        crank = TCPR_ORDER.index(name) if name in TCPR_ORDER else len(TCPR_ORDER)
        if crank > rank:
            parent.insert(i, el)
            return el
    parent.append(el)
    return el


def cell_rule(cell, tag, color, width_pt):
    """Draw one edge of a table cell, or hide it when color is None."""
    tcPr = cell._tc.get_or_add_tcPr()
    ln = ordered_child(tcPr, tag)
    for child in list(ln):
        ln.remove(child)
    ln.set("w", str(int(width_pt * 12700)))
    ln.set("cap", "flat")
    ln.set("cmpd", "sng")
    ln.set("algn", "ctr")
    if color is None:
        etree.SubElement(ln, qn("a:noFill"))
    else:
        fill = etree.SubElement(ln, qn("a:solidFill"))
        etree.SubElement(fill, qn("a:srgbClr")).set("val", color)


def write_cell(cell, content, size, color, bold=False):
    cell.fill.background()
    cell.margin_left = cell.margin_right = Inches(CELL_HPAD)
    cell.margin_top = cell.margin_bottom = Inches(CELL_VPAD)
    cell.vertical_anchor = MSO_ANCHOR.MIDDLE
    tf = cell.text_frame
    tf.word_wrap = True
    para = tf.paragraphs[0]
    para.line_spacing = 1.08
    para.space_after = Pt(0)
    runs = [dict(r, bold=bold or r.get("bold", False)) for r in content["runs"]]
    add_runs(para, runs, size, color)
    for edge in ("a:lnL", "a:lnR", "a:lnT"):
        cell_rule(cell, edge, None, 0.75)


def place_table(slide, tbl, left, top, width_in, size):
    s = table_size(size)
    widths = col_widths(tbl, size, width_in)
    rows = ([tbl["head"]] if tbl["head"] else []) + tbl["rows"]
    heights = [row_height_in(r, widths, s) for r in rows]
    gf = slide.shapes.add_table(len(rows), len(widths), Inches(left), Inches(top),
                                Inches(width_in), Inches(sum(heights)))
    table = gf.table
    table.first_row = False
    table.horz_banding = False
    tblPr = table._tbl.find(qn("a:tblPr"))
    for el in tblPr.findall(qn("a:tableStyleId")):
        tblPr.remove(el)
    style = etree.SubElement(tblPr, qn("a:tableStyleId"))
    style.text = "{2D5ABB26-0587-4C30-8999-92F81FD0307C}"   # No Style, No Grid
    for i, w in enumerate(widths):
        table.columns[i].width = Inches(w)
    for j, h in enumerate(heights):
        table.rows[j].height = Inches(h)
    for j, row in enumerate(rows):
        header = tbl["head"] is not None and j == 0
        for i, content in enumerate(row):
            cell = table.cell(j, i)
            write_cell(cell, content, s, C["gold"] if header else C["ink"], bold=header)
            last = j == len(rows) - 1
            cell_rule(cell, "a:lnB", None if last else (C["gold"] if header else C["rule"]),
                      1.0 if header else 0.75)
    return sum(heights)


def render_blocks(slide, blocks, size, left, top, width_in):
    y = top
    for b in blocks:
        h = block_height_in(b, size, width_in)
        if b["type"] == "text":
            tb, tf = add_textbox(slide, left, y, width_in, h)
            fill_body(tf, b["paras"], size)
        else:
            place_table(slide, b["table"], left, y, width_in, size)
        y += h + BLOCK_GAP


def title_size(text):
    for s in (33, 30, 27, 24, 22):
        if est_lines(text, s, TITLE_W) <= 2:
            return s
    return 20


def title_block_height(text):
    ts = title_size(text)
    return max(0.9, est_lines(text, ts, TITLE_W) * ts * LINE / 72 + 0.1)


def load_image(src):
    """Return (bytes, aspect) for a local image reference, or None for remote."""
    if src.startswith("http://") or src.startswith("https://"):
        return None
    if src.startswith("/markdown/images/"):
        base = ROOT / "assets/images" / Path(src).name
    elif re.match(r"^/(content|markdown)/courses/479-fall-2026/", src):
        base = COURSE / re.sub(r"^/(content|markdown)/courses/479-fall-2026/", "", src)
    elif not src.startswith("/") and (ROOT / src).exists():
        base = ROOT / src
    else:
        base = (COURSE / src.lstrip("/")).resolve()
    im = Image.open(base)
    buf = io.BytesIO()
    if "A" in im.getbands() or im.mode == "P":
        im.convert("RGBA").save(buf, "PNG", optimize=True)
    else:
        im.convert("RGB").save(buf, "JPEG", quality=88, optimize=True)
    buf.seek(0)
    return buf, im.width / im.height


def place_image(slide, img, left, top, width, height):
    buf, ratio = img
    w, h = width, width / ratio
    if h > height:
        h, w = height, height * ratio
    buf.seek(0)
    slide.shapes.add_picture(buf, Inches(left + (width - w) / 2), Inches(top + (height - h) / 2),
                             Inches(w), Inches(h))


def place_images(slide, imgs, left, top, width, height, stacked=False):
    """One image fills the box; several share it, side by side or stacked."""
    if len(imgs) == 1:
        place_image(slide, imgs[0], left, top, width, height)
        return
    gap = 0.22
    n = len(imgs)
    if stacked:
        cell = (height - gap * (n - 1)) / n
        for i, img in enumerate(imgs):
            place_image(slide, img, left, top + i * (cell + gap), width, cell)
    else:
        cell = (width - gap * (n - 1)) / n
        for i, img in enumerate(imgs):
            place_image(slide, img, left + i * (cell + gap), top, cell, height)


def gold_rule(slide, left, top, width):
    line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(left), Inches(top),
                                  Inches(width), Inches(0.035))
    line.fill.solid()
    line.fill.fore_color.rgb = rgb(C["gold"])
    line.line.fill.background()
    line.shadow.inherit = False
    return line


def paint_background(slide):
    fill = slide.background.fill
    fill.solid()
    fill.fore_color.rgb = rgb(C["bg"])


def add_slide_number(slide, n):
    tb, tf = add_textbox(slide, W - MARGIN - 1.0, H - 0.45, 1.0, 0.3)
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.RIGHT
    run = p.add_run()
    run.text = str(n)
    style_run(run, 10, C["dim"])


def add_notes(slide, text):
    if text:
        slide.notes_slide.notes_text_frame.text = text


def recolor_hyperlinks(prs):
    """Theme hyperlink colours decide how PowerPoint paints links; use mint."""
    for part in prs.part.package.iter_parts():
        if str(part.partname).startswith("/ppt/theme/"):
            blob = part.blob
            blob = re.sub(rb"<a:hlink>.*?</a:hlink>",
                          b'<a:hlink><a:srgbClr val="%s"/></a:hlink>' % C["mint"].encode(),
                          blob, flags=re.S)
            blob = re.sub(rb"<a:folHlink>.*?</a:folHlink>",
                          b'<a:folHlink><a:srgbClr val="%s"/></a:folHlink>' % C["dim"].encode(),
                          blob, flags=re.S)
            part._blob = blob

# --------------------------------------------------------------------------
# 4. Slide builders
# --------------------------------------------------------------------------

def build_title_slide(prs, layout, meta):
    s = prs.slides.add_slide(layout)
    paint_background(s)
    tb, tf = add_textbox(s, MARGIN, 1.9, TITLE_W, 2.2, MSO_ANCHOR.BOTTOM)
    run = tf.paragraphs[0].add_run()
    run.text = meta["title"]
    style_run(run, 44, C["ink"])
    gold_rule(s, MARGIN, 4.32, 1.6)
    parts = [p for p in [meta.get("course"),
                         f"Week {meta['week']}" if meta.get("week") else None] if p]
    if parts:
        tb, tf = add_textbox(s, MARGIN, 4.55, TITLE_W, 0.6)
        run = tf.paragraphs[0].add_run()
        run.text = "  ·  ".join(parts)
        style_run(run, 22, C["gold"])
    return s


def build_content_slide(prs, layout, src, blocks, size, images, cont, number):
    s = prs.slides.add_slide(layout)
    paint_background(s)
    body_top = 1.95
    section_only = bool(src["title"]) and not blocks and not images
    if src["title"]:
        if section_only:
            tb, tf = add_textbox(s, MARGIN, 2.3, TITLE_W, 2.2, MSO_ANCHOR.MIDDLE)
            add_runs(tf.paragraphs[0], src["title_runs"], 40, C["gold"])
            gold_rule(s, MARGIN, 4.6, 1.6)
            if src.get("remote_alt"):
                tb, tf = add_textbox(s, MARGIN, 4.85, TITLE_W, 0.5)
                run = tf.paragraphs[0].add_run()
                run.text = src["remote_alt"]
                style_run(run, 18, C["mint"], link=src.get("remote_src"))
        else:
            title = src["title"] + (" (cont.)" if cont else "")
            ts, th = title_size(title), title_block_height(title)
            tb, tf = add_textbox(s, MARGIN, TITLE_TOP, TITLE_W, th, MSO_ANCHOR.BOTTOM)
            runs = src["title_runs"] + ([{"text": " (cont.)"}] if cont else [])
            add_runs(tf.paragraphs[0], runs, ts, C["ink"])
            gold_rule(s, MARGIN, TITLE_TOP + th + 0.12, 1.2)
            body_top = TITLE_TOP + th + 0.42
    body_h = BODY_BOTTOM - body_top
    if images and blocks:
        render_blocks(s, blocks, size, MARGIN, body_top, BODY_W_WITH_IMAGE)
        place_images(s, images, IMG_LEFT, body_top, IMG_W, body_h, stacked=True)
    elif images:
        top = body_top if src["title"] else 0.45
        place_images(s, images, MARGIN, top, W - 2 * MARGIN, H - top - 0.45)
    elif blocks:
        render_blocks(s, blocks, size, MARGIN, body_top, TITLE_W)
    add_slide_number(s, number)
    return s


def main():
    meta = parse_source(SOURCE)
    prs = Presentation()
    prs.slide_width, prs.slide_height = Inches(W), Inches(H)
    layout = prs.slide_layouts[6]  # blank
    build_title_slide(prs, layout, meta)
    count = 1
    report = []
    for src in meta["slides"]:
        images = []
        for ref in src["images"]:
            loaded = load_image(ref["src"])
            if loaded is None:
                src["remote_alt"] = ref["alt"] or ref["src"]
                src["remote_src"] = ref["src"]
                report.append(f"remote image kept as a link on '{src['title']}': {ref['src']}")
            else:
                images.append(loaded)
        width = BODY_W_WITH_IMAGE if images else TITLE_W
        body_h = BODY_BOTTOM - (TITLE_TOP + title_block_height(src["title"]) + 0.42)
        size, chunks = plan_body(src["body"], width, body_h)
        if len(chunks) > 1:
            report.append(f"'{src['title']}' split into {len(chunks)} slides at {size} pt")
        elif src["body"] and size <= 16:
            report.append(f"'{src['title']}' set at {size} pt")
        for i, chunk in enumerate(chunks):
            count += 1
            s = build_content_slide(prs, layout, src, chunk, size,
                                    images if i == 0 else [], i > 0, count)
            if i == 0:
                add_notes(s, src["notes"])
    recolor_hyperlinks(prs)
    prs.save(OUT)
    print(f"built {OUT} ({OUT.stat().st_size:,} bytes)")
    for line in report:
        print("  note:", line)
    verify(OUT)


def verify(path):
    z = zipfile.ZipFile(path)
    slides = sorted((n for n in z.namelist() if re.match(r"ppt/slides/slide\d+\.xml$", n)),
                    key=lambda x: int(re.search(r"\d+", x).group()))
    notes = [n for n in z.namelist() if re.match(r"ppt/notesSlides/notesSlide\d+\.xml$", n)]
    media = [n for n in z.namelist() if n.startswith("ppt/media/")]
    print(f"{len(slides)} slides | {len(notes)} notes slides | {len(media)} media files")
    for i, n in enumerate(slides, 1):
        xml = z.read(n).decode()
        texts = re.findall(r"<a:t>(.*?)</a:t>", xml)
        title = texts[0] if texts else "(image only)"
        sizes = sorted({int(x) // 100 for x in re.findall(r'sz="(\d+)"', xml)})
        tables = xml.count("<a:tbl>")
        pics = xml.count("<p:pic>")
        extra = (f" tables={tables}" if tables else "") + (f" images={pics}" if pics else "")
        print(f"{i:2d}. {title[:52]:52s} sizes={sizes}{extra}")


if __name__ == "__main__":
    main()
