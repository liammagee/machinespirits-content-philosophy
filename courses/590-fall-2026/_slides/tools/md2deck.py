"""Turn a lecture markdown file into Slides-artifact slide files, literally.

One slide per `---` block. Every word of the markdown is kept and nothing is added: no extra headings,
no speaker notes. HTML comments are dropped (they do not show on the page either). Only the visual
design is added. The output follows the Slides format's closed subset (px only, no margin, one-level
lists, <b>/<i>/<a>/<span> inline), so nested lists become indented rows.

Sizes are written as tokens, S[r] = r x the slide's base size; fit_deck.py picks the base per slide.

usage: python3 md2deck.py lecture-2.md DECK
  DECK is the deck folder (deck.json, slides/, images/). DECK/images.json maps a markdown image's file
  stem to its Slides asset id ({"pasted-image-…-f69f72d5": "2031aeeb…"}); the picture itself is
  DECK/images/<asset id>.jpg. Slide files no longer in the markdown are removed; deck.json keeps its
  other keys (title, faces …) and gets the new order and sections.
"""
import html, json, re, sys, pathlib
from markdown_it import MarkdownIt
try:
    import linkify_it  # bare URLs become links when linkify-it-py is installed
    LINKIFY = True
except ImportError:
    LINKIFY = False
from bs4 import BeautifulSoup, NavigableString, Tag

SRC, OUT = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
IMAGES = json.load(open(OUT / "images.json")) if (OUT / "images.json").exists() else {}

BG, INK, SOFT, MUTED, PANEL, LINE = "#15161D", "#F3EEE4", "#D8D2C6", "#9C978C", "#22232C", "#33354A"
EMBER, COBALT, GOLD = "#FF7A50", "#8EA6F0", "#F2C14E"
DISPLAY, SERIF, MONO = "'Space Grotesk', Arial, sans-serif", "'Source Serif 4', Georgia, serif", "'Courier New', monospace"
MARKERS = ["•", "◦", "▪", "–"]

def S(r):  # a size relative to the slide's base font size
    return f"S[{r}]"

md = MarkdownIt("commonmark", {"html": True, "linkify": LINKIFY}).enable(["table"] + (["linkify"] if LINKIFY else []))

def inline_one(c):
    """One inline markdown node -> the subset's inline tags."""
    if isinstance(c, NavigableString):
        return html.escape(str(c), quote=False)
    if c.name in ("strong", "b"):
        return f'<b><span style="color:{EMBER}">{inline(c)}</span></b>'
    if c.name in ("em", "i"):
        return f"<i>{inline(c)}</i>"
    if c.name == "a":  # links can't take a colour themselves, so a span inside carries it
        return f'<a href="{html.escape(c.get("href", ""))}"><span style="color:{COBALT}">{inline(c)}</span></a>'
    if c.name == "br":
        return "<br>"
    if c.name == "img":
        return ""  # images are laid out beside the text
    return inline(c)  # code and anything else: keep the words

def inline(node):
    """The inline content of a block element."""
    return "".join(inline_one(c) for c in node.children)

def text_p(inner, r=1.0, color=INK, extra=""):
    return f'<p style="font-size:{S(r)};line-height:1.4;color:{color}{extra}">{inner}</p>'

def list_rows(lst, depth=0):
    """A (possibly nested) list -> rows of marker + text, indented by depth."""
    rows, n = [], int(lst.get("start", 1))
    for li in lst.find_all("li", recursive=False):
        parts, nested = [], []
        for c in li.children:
            if isinstance(c, Tag) and c.name in ("ul", "ol"):
                nested.append(c)
            elif isinstance(c, Tag) and c.name == "p":
                parts.append(inline(c))
            else:
                parts.append(inline_one(c))
        r = 1.0 if depth == 0 else 0.92
        color = INK if depth == 0 else SOFT
        mark = f"{n}." if lst.name == "ol" else MARKERS[min(depth, 3)]
        n += 1
        body = "".join(parts).strip()
        if body:
            rows.append(
                f'<div style="display:flex;flex-direction:row;gap:{S(0.45)};padding:0px 0px 0px {S(1.15 * depth)}">'
                f'<p data-m style="font-size:{S(r)};line-height:1.4;color:{EMBER};font-weight:700;min-width:{S(0.9 if lst.name == "ol" else 0.6)}">{mark}</p>'
                f'<p style="font-size:{S(r)};line-height:1.4;color:{color};flex:1">{body}</p></div>')
        for sub in nested:
            rows += list_rows(sub, depth + 1)
    return rows

def table(t):
    rows = []
    for i, tr in enumerate(t.find_all("tr")):
        cells = []
        for j, cell in enumerate(tr.find_all(["th", "td"])):
            txt = html.escape(cell.get_text(), quote=False)
            if cell.name == "th":
                cells.append(f'<th style="color:{MUTED};width:{12 if j == 0 else 88}%">{txt}</th>')
            else:
                cells.append(f'<td style="color:{EMBER if j == 0 else INK}">{txt}</td>')
        rows.append("<tr>" + "".join(cells) + "</tr>")
    return (f'<table style="font-family:{SERIF};font-size:{S(0.92)};color:{INK};border-bottom:1px solid {LINE}">'
            + "".join(rows) + "</table>")

def block(el, first_heading):
    """One top-level markdown element -> subset HTML."""
    n = el.name
    if n in ("h1", "h2", "h3"):
        size = {"h1": 2.9, "h2": 2.1, "h3": 1.75}[n]
        h = (f'<{n} style="font-family:{DISPLAY};font-size:{S(size)};font-weight:700;line-height:1.1;color:{INK}">{inline(el)}</{n}>')
        if el is first_heading:
            h += f'<div style="width:120px;height:6px;background:{EMBER};border-radius:3px"></div>'
        return h
    if n in ("h4", "h5", "h6"):
        return (f'<p style="font-family:{DISPLAY};font-size:{S(0.8)};font-weight:700;letter-spacing:3px;'
                f'text-transform:uppercase;color:{COBALT}">{inline(el)}</p>')
    if n == "p":
        inner = inline(el).strip()
        return text_p(inner, 1.0, SOFT) if inner else ""
    if n in ("ul", "ol"):
        return f'<div style="display:flex;flex-direction:column;gap:{S(0.3)}">' + "".join(list_rows(el)) + "</div>"
    if n == "blockquote":
        ps = "".join(f'<p style="font-family:{MONO};font-size:{S(0.74, )};line-height:1.45;color:{INK}">{inline(p)}</p>'
                     for p in el.find_all("p"))
        return (f'<div style="display:flex;flex-direction:column;gap:{S(0.5)};background:{PANEL};'
                f'border-left:6px solid {EMBER};border-radius:12px;padding:{S(0.8)} {S(1.1)}">{ps}</div>')
    if n == "table":
        return table(el)
    return text_p(html.escape(el.get_text(), quote=False))

def slug(s, used):
    b = re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")[:40].strip("-") or "slide"
    k, i = b, 2
    while k in used:
        k, i = f"{b}-{i}", i + 1
    used.add(k)
    return k

text = re.sub(r"<!--.*?-->", "", SRC.read_text(), flags=re.S)
blocks = [b.strip() for b in re.split(r"^---\s*$", text, flags=re.M) if b.strip()]
used, order, sections = set(), [], {}
(OUT / "slides").mkdir(parents=True, exist_ok=True)

for block_md in blocks:
    soup = BeautifulSoup(md.render(block_md), "html.parser")
    top = [c for c in soup.children if isinstance(c, Tag)]
    imgs = []
    for img in soup.find_all("img"):
        key = pathlib.Path(img["src"]).stem
        if key in IMAGES:
            imgs.append((f"/_blob/{IMAGES[key]}", img.get("alt", "Image")))
    top = [c for c in top if not (c.name == "p" and not c.get_text(strip=True) and c.find("img"))]
    heads = [c for c in top if c.name in ("h1", "h2", "h3", "h4")]
    title = heads[0].get_text(" ", strip=True) if heads else block_md.splitlines()[0]
    sid = slug(title, used)
    order.append(sid)
    divider = all(c.name in ("h1", "h2", "h3") for c in top) and not imgs

    if divider:  # a slide of headings only: a section opener
        hs = "".join(
            f'<{c.name} style="font-family:{DISPLAY};font-size:{150 if j == 0 else 88}px;font-weight:700;line-height:1.05;'
            f'color:{INK if j == 0 else EMBER}">{inline(c)}</{c.name}>' for j, c in enumerate(top))
        if len(top) > 1 or sid == order[0]:
            sections[f"s{len(sections) + 1}"] = {"description": " ".join(c.get_text(" ", strip=True) for c in top), "start": sid}
        slide = (f'<section id="{sid}" data-transition="fade" style="background:{BG};color:{INK};font-family:{SERIF};'
                 f'padding:128px 140px;display:flex;flex-direction:column;justify-content:center;gap:32px">'
                 f'<div style="width:220px;height:10px;background:linear-gradient(90deg, {EMBER}, {GOLD} 50%, {COBALT});border-radius:5px"></div>'
                 f'{hs}</section>')
    else:
        first = heads[0] if heads else None
        h4 = next((c for c in top if c.name in ("h4", "h5", "h6")), None)
        col = lambda els: "".join(block(c, first) for c in els)
        if imgs:
            k = len(imgs)
            words = len(soup.get_text())  # the more text, the narrower the picture, so the text stays readable
            w = 820 if words < 700 else 640 if words < 1100 else 500
            h = (800 - 24 * (k - 1)) // k
            pics = "".join(f'<img src="{s}" alt="{html.escape(a)}" style="width:{w}px;height:{h}px;object-fit:contain;border-radius:14px">' for s, a in imgs)
            body = (f'<div style="display:flex;flex-direction:row;gap:64px;flex:1">'
                    f'<div data-fit style="flex:1;display:flex;flex-direction:column;gap:{S(0.55)}">{col(top)}</div>'
                    f'<div style="display:flex;flex-direction:column;gap:24px;justify-content:center">{pics}</div></div>')
        elif h4 is not None:  # a sub-heading starts a second column
            i = top.index(h4)
            body = (f'<div data-fit style="display:flex;flex-direction:row;gap:72px">'
                    f'<div style="flex:1.15;display:flex;flex-direction:column;gap:{S(0.55)}">{col(top[:i])}</div>'
                    f'<div style="flex:1;display:flex;flex-direction:column;gap:{S(0.55)};border-left:2px solid {LINE};padding:{S(2.6)} 0px 0px 48px">{col(top[i:])}</div></div>')
        else:
            body = f'<div data-fit style="display:flex;flex-direction:column;gap:{S(0.55)}">{col(top)}</div>'
        slide = (f'<section id="{sid}" data-transition="push" style="background:{BG};color:{INK};font-family:{SERIF};'
                 f'padding:84px 120px 72px;display:flex;flex-direction:column">{body}</section>')
    (OUT / "slides" / f"{sid}.html").write_text(slide)

for f in (OUT / "slides").glob("*.html"):
    if f.stem not in order:
        f.unlink()
deck_json = OUT / "deck.json"
deck = json.loads(deck_json.read_text()) if deck_json.exists() else {
    "v": 4, "createdOnFiles": {"v": 1, "at": __import__("datetime").datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")}, "lists": "css",
    "title": "", "designSystems": [],
    "faces": {"space-grotesk": {"family": "Space Grotesk", "href": "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400..700&display=swap"},
              "source-serif-4": {"family": "Source Serif 4", "href": "https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,400..700;1,400..700&display=swap"}}}
deck["order"], deck["sections"] = order, sections
if not deck.get("title"):
    deck["title"] = next((t for t in [BeautifulSoup(md.render(b), "html.parser").find("h2") for b in blocks] if t), None).get_text(" ", strip=True)
deck_json.write_text(json.dumps(deck, ensure_ascii=False, separators=(",", ":")))
print(len(order), "slides")
