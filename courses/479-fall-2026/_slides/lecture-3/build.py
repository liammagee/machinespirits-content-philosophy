#!/usr/bin/env python3
"""Build the lecture-3 PowerPoint deck from lecture-3.md.

The deck follows the look of 479-lecture-2.pptx: 13.333 x 7.5 in, dark
background, Iowan Old Style, gold for quotations and section titles.

Text policy: every heading, bullet, quotation and paragraph on a slide comes
from lecture-3.md unchanged. Speaker notes come from the ```notes fences.
The only text the builder adds is the title slide's course/week line (from
the frontmatter), "(cont.)" on continuation slides when a body does not fit
at the minimum size, and the slide number in the corner.

Images: local /markdown/images/... and /content/courses/479-fall-2026/...
references are embedded (WebP is decoded to JPEG/PNG for PowerPoint). Remote
images are not downloaded; the slide keeps the alt text as a link instead.

Requires: pandoc on PATH, python-pptx, Pillow with WebP support.

Usage:  python3 build.py [output.pptx]        (default: ../../479-lecture-3.pptx)
"""
import io
import json
import math
import os
import re
import subprocess
import sys
import zipfile
from pathlib import Path

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
SOURCE = Path(os.environ.get("LECTURE_SOURCE", COURSE / "lecture-3.md"))
OUT = (Path(sys.argv[1]).resolve() if len(sys.argv) > 1
       else Path(os.environ.get("LECTURE_OUTPUT", COURSE / "479-lecture-3.pptx")))

SERIF = "Iowan Old Style"
C = dict(bg="121021", ink="ECE7F0", gold="F0C9A0", dim="A49DB8", mint="8FD6C2")
W, H = 13.333, 7.5
MARGIN = 0.67
TITLE_TOP, TITLE_W = 0.5, 12.0
BODY_BOTTOM = 6.85
IMG_LEFT, IMG_W = 8.05, 4.62
BODY_W_WITH_IMAGE = IMG_LEFT - MARGIN - 0.35
SIZES = [24, 22, 21, 20, 19, 18, 17, 16, 15]
MIN_SIZE = SIZES[-1]
CHAR_EM = 0.47           # average glyph advance, in em (calibrated on a PDF export)
LINE = 1.20              # line height as a multiple of font size

# --------------------------------------------------------------------------
# 1. Source -> slide model (via pandoc's JSON AST)
# --------------------------------------------------------------------------

def preprocess(text):
    """Make slide separators and block quotes unambiguous for pandoc."""
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


def inlines_to_runs(inlines, style=None):
    """Flatten pandoc inlines to [{text, bold, italic, link}]."""
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
            runs += inlines_to_runs(c[1], style)
        elif t in ("Underline", "SmallCaps", "Strikeout", "Superscript", "Subscript"):
            runs += inlines_to_runs(c, style)
        elif t == "Code":
            runs.append({"text": c[1], **style})
        elif t == "Quoted":
            q = ("“", "”") if c[0]["t"] == "DoubleQuote" else ("‘", "’")
            runs.append({"text": q[0], **style})
            runs += inlines_to_runs(c[1], style)
            runs.append({"text": q[1], **style})
        elif t == "Link":
            runs += inlines_to_runs(c[1], {**style, "link": c[2][0]})
        elif t == "Cite":
            runs += inlines_to_runs(c[1], style)
        elif t in ("Image", "RawInline", "Note", "Math"):
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
    return str(v)


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
                    slide["body"].append({"kind": kind, "marker": marker, "level": level, "runs": runs})
                    first = False
            else:
                blocks_to_paras([child], slide, level + 1)


def blocks_to_paras(blocks, slide, level=0):
    """Append body paragraphs to slide from pandoc blocks."""
    for b in blocks:
        t, c = b["t"], b.get("c")
        if t in ("Para", "Plain"):
            imgs = [x for x in c if x["t"] == "Image"]
            if imgs:
                if slide["image"] is not None or len(imgs) != 1:
                    raise ValueError("unexpected image count on slide " + slide["title"])
                img = imgs[0]
                slide["image"] = {"src": img["c"][2][0], "alt": runs_text(inlines_to_runs(img["c"][1]))}
                rest = inlines_to_runs([x for x in c if x["t"] != "Image"])
                if runs_text(rest).strip():
                    slide["body"].append({"kind": "para", "level": level, "runs": rest})
            else:
                runs = inlines_to_runs(c)
                if runs_text(runs).strip():
                    slide["body"].append({"kind": "para", "level": level, "runs": runs})
        elif t == "BulletList":
            list_items(c, slide, level, [None] * len(c))
        elif t == "OrderedList":
            start = c[0][0]
            list_items(c[1], slide, level, [f"{n}." for n in range(start, start + len(c[1]))])
        elif t == "BlockQuote":
            for child in c:
                if child["t"] in ("Para", "Plain"):
                    slide["body"].append({"kind": "quote", "level": level, "runs": inlines_to_runs(child["c"])})
                else:
                    blocks_to_paras([child], slide, level)
        elif t == "CodeBlock":
            attr, text = c
            if "notes" in attr[1]:
                slide["notes"] = (slide["notes"] + "\n\n" + pandoc_plain(text)).strip()
            elif text.strip():
                slide["body"].append({"kind": "para", "level": level, "runs": [{"text": text}]})
        elif t in ("RawBlock", "Null", "HorizontalRule"):
            pass
        elif t == "Div":
            blocks_to_paras(c[1], slide, level)
        else:
            raise ValueError(f"Unsupported block {t} on slide {slide['title']!r}")


def new_slide():
    return {"title": "", "title_runs": [], "level": 0, "body": [], "image": None, "notes": ""}


def has_content(s):
    return bool(s["title"] or s["body"] or s["image"])


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
# 2. Layout helpers
# --------------------------------------------------------------------------

def rgb(hexstr):
    return RGBColor.from_string(hexstr)


def est_lines(text, size_pt, width_in):
    cpl = max(8, int(width_in * 72 / (size_pt * CHAR_EM)))
    return max(1, math.ceil(len(text) / cpl))


def para_indent(p):
    if p["kind"] in ("bullet", "number"):
        return 0.30 + 0.30 * p["level"]
    return 0.25 if p["kind"] == "quote" else 0.30 * p["level"]


def para_size(p, size):
    return size if p["level"] == 0 else size - 2


def body_height_pt(paras, size, width_in):
    total = 0.0
    for p in paras:
        s = para_size(p, size)
        lines = est_lines(runs_text(p["runs"]), s, width_in - para_indent(p))
        total += lines * s * LINE + (8 if p["kind"] == "quote" else 6)
    return total


def fits(paras, size, width_in, height_in):
    return body_height_pt(paras, size, width_in) <= height_in * 72


def greedy_split(paras, size, width_in, height_in):
    chunks, cur = [], []
    for p in paras:
        if cur and not fits(cur + [p], size, width_in, height_in):
            chunks.append(cur)
            cur = []
        cur.append(p)
    if cur:
        chunks.append(cur)
    return chunks


def balanced_split(paras, size, width_in, n):
    target = body_height_pt(paras, size, width_in) / n
    chunks, cur = [], []
    for p in paras:
        if cur and body_height_pt(cur + [p], size, width_in) > target * 1.02 and len(chunks) < n - 1:
            chunks.append(cur)
            cur = []
        cur.append(p)
    if cur:
        chunks.append(cur)
    return chunks


def plan_body(paras, width_in, height_in):
    """Return (font size, [chunks]) so every chunk fits and sizes stay equal."""
    for s in SIZES:
        if fits(paras, s, width_in, height_in):
            return s, [paras]
    n = len(greedy_split(paras, MIN_SIZE, width_in, height_in))
    for s in SIZES:
        chunks = balanced_split(paras, s, width_in, n)
        if len(chunks) == n and all(fits(ch, s, width_in, height_in) for ch in chunks):
            return s, chunks
    return MIN_SIZE, greedy_split(paras, MIN_SIZE, width_in, height_in)


def add_textbox(slide, left, top, width, height, anchor=MSO_ANCHOR.TOP):
    tb = slide.shapes.add_textbox(Inches(left), Inches(top), Inches(width), Inches(height))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.auto_size = MSO_AUTO_SIZE.NONE
    tf.vertical_anchor = anchor
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    return tb, tf


def style_run(run, size, color=C["ink"], bold=False, italic=False, link=None):
    f = run.font
    f.name = SERIF
    f.size = Pt(size)
    f.bold = bold
    f.italic = italic
    f.color.rgb = rgb(color)
    if link:
        run.hyperlink.address = link
        f.color.rgb = rgb(C["mint"])


PARA_RE = re.compile(r"(\s*\(para\.?\s*\d+\)[\s.*]*)$")


def add_runs(p, runs, size, color, italic=False, para_color=None):
    """Write runs into paragraph p; a trailing '(para N)' gets dim styling."""
    runs = [dict(r) for r in runs]
    if para_color and runs:
        last = runs[-1]
        m = PARA_RE.search(last["text"])
        if m:
            ref = " " + re.sub(r"\(para\.?\s*", "(para ", m.group(1).strip())
            tail = dict(last, text=ref, paranum=True)
            head = dict(last, text=last["text"][:m.start()])
            runs[-1:] = ([head] if head["text"] else []) + [tail]
    for r in runs:
        run = p.add_run()
        run.text = r["text"]
        if r.get("paranum"):
            style_run(run, max(size - 4, 11), para_color, italic=False)
        else:
            style_run(run, size, color, bold=r.get("bold", False),
                      italic=italic or r.get("italic", False), link=r.get("link"))


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
        para.space_after = Pt(8 if p["kind"] == "quote" else 6)
        if p["kind"] == "bullet":
            set_bullet(para, "•" if p["level"] == 0 else "–", 0.30 + 0.30 * p["level"], -0.24)
            add_runs(para, p["runs"], s, C["ink"])
        elif p["kind"] == "number":
            set_bullet(para, None, 0.30 + 0.30 * p["level"], -0.30)
            run = para.add_run()
            run.text = p["marker"] + "  "
            style_run(run, s, C["gold"], bold=True)
            add_runs(para, p["runs"], s, C["ink"])
        elif p["kind"] == "quote":
            set_bullet(para, None, 0.25, 0)
            add_runs(para, p["runs"], s, C["gold"], italic=True, para_color=C["dim"])
        else:
            set_bullet(para, None, 0.30 * p["level"], 0)
            add_runs(para, p["runs"], s, C["ink"])


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
    else:
        base = (COURSE / src).resolve()
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
    slide.shapes.add_picture(buf, Inches(left + (width - w) / 2), Inches(top + (height - h) / 2),
                             Inches(w), Inches(h))


def gold_rule(slide, left, top, width):
    line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(left), Inches(top), Inches(width), Inches(0.035))
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
                          b'<a:hlink><a:srgbClr val="%s"/></a:hlink>' % C["mint"].encode(), blob, flags=re.S)
            blob = re.sub(rb"<a:folHlink>.*?</a:folHlink>",
                          b'<a:folHlink><a:srgbClr val="%s"/></a:folHlink>' % C["dim"].encode(), blob, flags=re.S)
            part._blob = blob

# --------------------------------------------------------------------------
# 3. Slide builders
# --------------------------------------------------------------------------

def build_title_slide(prs, layout, meta):
    s = prs.slides.add_slide(layout)
    paint_background(s)
    tb, tf = add_textbox(s, MARGIN, 1.9, TITLE_W, 2.2, MSO_ANCHOR.BOTTOM)
    run = tf.paragraphs[0].add_run()
    run.text = meta["title"]
    style_run(run, 44, C["ink"])
    gold_rule(s, MARGIN, 4.32, 1.6)
    parts = [p for p in [meta.get("course"), f"Week {meta['week']}" if meta.get("week") else None] if p]
    if parts:
        tb, tf = add_textbox(s, MARGIN, 4.55, TITLE_W, 0.6)
        run = tf.paragraphs[0].add_run()
        run.text = "  ·  ".join(parts)
        style_run(run, 22, C["gold"])
    return s


def build_content_slide(prs, layout, src, paras, size, image, cont, number):
    s = prs.slides.add_slide(layout)
    paint_background(s)
    body_top = 1.95
    section_only = bool(src["title"]) and not paras and image is None
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
    if image is not None and paras:
        tb, tf = add_textbox(s, MARGIN, body_top, BODY_W_WITH_IMAGE, body_h)
        fill_body(tf, paras, size)
        place_image(s, image, IMG_LEFT, body_top, IMG_W, body_h)
    elif image is not None:
        top = body_top if src["title"] else 0.45
        place_image(s, image, MARGIN, top, W - 2 * MARGIN, H - top - 0.45)
    elif paras:
        tb, tf = add_textbox(s, MARGIN, body_top, TITLE_W, body_h)
        fill_body(tf, paras, size)
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
        image = None
        if src["image"]:
            loaded = load_image(src["image"]["src"])
            if loaded is None:
                src["remote_alt"] = src["image"]["alt"] or src["image"]["src"]
                src["remote_src"] = src["image"]["src"]
                report.append(f"remote image kept as a link on '{src['title']}': {src['image']['src']}")
            else:
                image = loaded
        paras = src["body"]
        width = BODY_W_WITH_IMAGE if image is not None else TITLE_W
        body_h = BODY_BOTTOM - (TITLE_TOP + title_block_height(src["title"]) + 0.42)
        size, chunks = plan_body(paras, width, body_h) if paras else (MIN_SIZE, [paras])
        if len(chunks) > 1:
            report.append(f"'{src['title']}' split into {len(chunks)} slides at {size} pt")
        elif paras and size <= 16:
            report.append(f"'{src['title']}' set at {size} pt")
        for i, chunk in enumerate(chunks):
            count += 1
            s = build_content_slide(prs, layout, src, chunk, size, image if i == 0 else None, i > 0, count)
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
        print(f"{i:2d}. {title[:60]:60s} sizes={sizes}")


if __name__ == "__main__":
    main()
