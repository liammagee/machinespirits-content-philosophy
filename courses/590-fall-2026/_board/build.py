#!/usr/bin/env python3
"""Build the EPOL 590 boards: inline src/base.css, src/engine.js and each board's app into one HTML file.

    python3 build.py              # writes dist/students.html and dist/responses.html
    python3 build.py --hosted     # writes hosted/*.html for machinespirits.org (/590-fall-2026/map, /590-fall-2026/respond): adds the
                                  # src/hosted.js shim over the site's /api/boards store, shares the page's own address

Single files publish as claude.ai artifacts and also run as plain static pages.
"""
import json, pathlib, sys

HERE = pathlib.Path(__file__).parent
SRC, DIST, HOSTED = HERE / "src", HERE / "dist", HERE / "hosted"
CDN = """<script src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three-spritetext@1.9.0/dist/three-spritetext.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/3d-force-graph@1.73.4/dist/3d-force-graph.min.js"></script>"""
FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap">'

# Store names in the site's /api/boards (machinespirits-website routes/boardsRoutes.js).
BOARD = {"students": "epol590-map", "responses": "epol590-respond"}

# Canonical claude.ai links for the review copies; --hosted drops them so the page shares its own address.
SHARE = {
    "students": "https://claude.ai/artifact/MVjkPLeNjV6kadJuaE6ZBz",
    "responses": "https://claude.ai/artifact/62vwkvMX2jSBDh3PtyPGMg",
}

PAGES = {
    "students": {
        "title": "EPOL 590 Constellation",
        "field": "Three-dimensional map of students, their interests and research topics, and recent papers on each interest",
        "head": """<div class="eyebrow">EPOL 590 · Class constellation</div>
  <h1>Who is researching what</h1>
  <div class="counts"><span><b id="n-students">0</b>students</span><span><b id="n-terms">0</b>interests</span><span><b id="n-papers">0</b>papers</span></div>
  <div class="row"><button id="act-join" type="button">Join</button><button id="act-link" class="ghost" type="button">Copy link</button></div>""",
        "empty": "<strong>No one has joined yet</strong>Press Join to add your interests and a research topic. The course node already has papers on AI and academic literature.",
    },
    "responses": {
        "title": "EPOL 590 Responses",
        "field": "Three-dimensional mind map of the class's answers to the current question, clustered by the words they share",
        "head": """<div class="eyebrow" id="q-lecture">EPOL 590 · Lecture 1</div>
  <h1 id="q-title">What is academic literature?</h1>
  <div class="counts"><span><b id="n-answers">0</b>responses</span><span><b id="n-themes">0</b>themes</span></div>
  <select id="q-switch" aria-label="Choose a question" hidden></select>
  <div class="row"><button id="act-respond" type="button">Respond</button><button id="act-link" class="ghost" type="button">Copy link</button></div>""",
        "empty": "<strong>No responses yet</strong>Press Respond to add yours. Themes appear when two answers share a word.",
    },
}

SHELL = """<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="claude:viewport-fit-sides" content="cover">
{fonts}
<style>
{css}
</style>
<div id="field" aria-label="{field}"></div>
<section id="head" class="panel">
  {head}
</section>
<section id="pop" class="panel" hidden></section>
<aside id="drawer" class="panel" hidden aria-live="polite"></aside>
<div id="tip" hidden role="tooltip"></div>
<div id="caption" hidden aria-live="polite"><div class="eyebrow"></div><div class="t"></div></div>
<div id="tools" class="panel" role="toolbar" aria-label="View controls"></div>
<footer id="legend" class="panel">
  <div id="chips" role="group" aria-label="Filter the map"></div>
  <div id="status" role="status"><i></i><span id="status-text">Connecting…</span></div>
</footer>
<div id="empty" hidden>{empty}</div>
<div id="toast" hidden role="status"></div>
{cdn}
<script>window.BOARD_CONFIG = {config};</script>
{shim}<script>
{engine}
</script>
<script>
{app}
</script>
"""


def build(hosted=False):
    out = HOSTED if hosted else DIST
    out.mkdir(exist_ok=True)
    css, engine = (SRC / "base.css").read_text(), (SRC / "engine.js").read_text()
    shim = "<script>\n" + (SRC / "hosted.js").read_text() + "</script>\n" if hosted else ""
    for name, page in PAGES.items():
        cfg = {"shareUrl": "", "hosted": True, "board": BOARD[name]} if hosted else {"shareUrl": SHARE[name]}
        html = SHELL.format(title=page["title"], fonts=FONTS, css=css, field=page["field"], head=page["head"], empty=page["empty"],
                            cdn=CDN, config=json.dumps(cfg), shim=shim, engine=engine, app=(SRC / f"{name}.js").read_text())
        (out / f"{name}.html").write_text(html)
        print(f"wrote {out.name}/{name}.html ({len(html):,} bytes)")


if __name__ == "__main__":
    build(hosted="--hosted" in sys.argv)
