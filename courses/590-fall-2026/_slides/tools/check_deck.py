"""Check that every slide holds exactly the markdown's words (no more, no fewer), no speaker notes, and only
tags the Slides format accepts.   usage: python3 check_deck.py lecture-2.md DECK"""
import json, re, sys, pathlib
from markdown_it import MarkdownIt
try:
    import linkify_it  # bare URLs become links when linkify-it-py is installed
    LINKIFY = True
except ImportError:
    LINKIFY = False
from bs4 import BeautifulSoup
md = MarkdownIt("commonmark", {"html": True, "linkify": LINKIFY}).enable(["table"] + (["linkify"] if LINKIFY else []))
SRC, DECK = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
OK = set("section h1 h2 h3 p ul ol li br b i u a span div img table tr th td svg hr x-shape x-icon x-connector x-embed aside".split())
text = re.sub(r"<!--.*?-->", "", SRC.read_text(), flags=re.S)
blocks = [b.strip() for b in re.split(r"^---\s*$", text, flags=re.M) if b.strip()]
order = json.loads((DECK / "deck.json").read_text())["order"]
words = lambda s: re.sub(r"\s+", "", s)
problems = 0 if len(blocks) == len(order) else print(f"{len(blocks)} markdown blocks but {len(order)} slides") or 1
for b, sid in zip(blocks, order):
    slide = BeautifulSoup((DECK / "slides" / f"{sid}.html").read_text(), "html.parser")
    bad = sorted({t.name for t in slide.find_all(True)} - OK) + (["aside (notes)"] if slide.find("aside") else []) \
        + (["em/rem/margin"] if re.search(r"\d(em|rem)\b|margin", str(slide)) else [])
    for m in slide.select("[data-m]"):
        m.decompose()  # list markers stand for the markdown's bullets and numbers
    if words(BeautifulSoup(md.render(b), "html.parser").get_text()) != words(slide.get_text()) or bad:
        problems += 1
        print("MISMATCH" if not bad else "FORMAT " + ", ".join(bad), sid)
print(f"{len(order)} slides checked, {problems} problems")
sys.exit(1 if problems else 0)
