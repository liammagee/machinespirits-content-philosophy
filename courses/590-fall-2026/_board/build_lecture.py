#!/usr/bin/env python3
"""Build a standalone, public HTML version of a claude.ai Slides deck.

    python3 build_lecture.py ../_slides/lecture-1/deck hosted/lecture-1.html

DECK holds the deck's own files as the Slides artifact stores them: deck.json (order), slides/<id>.html
(one <section> each) and images/<asset id>.jpg for every /_blob/<id> the slides use. The output is one
self-contained page served by the site at /590-fall-2026/lecture-1: images inlined, x-embed animations as sandboxed
iframes, build-in steps and transitions kept, speaker notes (<aside>) left out, and ?k= class keys stripped
from links so the key is not published.
"""
import base64, html, json, pathlib, re, sys

ICONS = {  # the x-icon names this deck uses, as plain stroked SVG
    "Book": '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
    "Database": '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    "Clock": '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
}

PLAYER = r"""
<style>
:root{color-scheme:dark}
html,body{margin:0;height:100%;background:#0E0F14;overflow:hidden;font-family:'Space Grotesk',Arial,sans-serif}
#stage{position:absolute;left:50%;top:50%;width:1920px;height:1080px;transform-origin:center;overflow:hidden;background:#15161D}
#stage section{position:absolute;inset:0;width:1920px;height:1080px;box-sizing:border-box;overflow:hidden;visibility:hidden;opacity:0;transition:opacity .5s ease,transform .5s ease}
#stage section.on{visibility:visible;opacity:1;transform:none}
#stage section[data-transition=push]{transform:translateX(60px)}
#stage section.on[data-transition=push]{transform:none}
#stage section > :not([style*="position:absolute"]){position:relative}
#stage p,#stage h1,#stage h2,#stage h3{margin:0}
#stage ul{margin:0;padding-left:1.1em} #stage li{margin:.15em 0}
#stage table{border-collapse:collapse;width:100%} #stage th,#stage td{padding:14px 18px;text-align:left;border-bottom:1px solid rgba(21,22,29,.18)}
#stage a{color:inherit}
#stage img{display:block}
#stage .x-icon{display:block;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
#stage iframe.x-embed{border:0;background:#15161D}
[data-build-in]{transition:opacity .45s ease,transform .45s ease}
[data-build-in].hold{opacity:0}
[data-build-in].hold.rise{transform:translateY(28px)}
[data-build-in].hold.pop{transform:scale(.92)}
#bar{position:fixed;left:0;bottom:0;height:3px;background:#FF7A50;transition:width .3s}
#nav{position:fixed;right:max(16px,env(safe-area-inset-right,0px));bottom:14px;display:flex;gap:8px;align-items:center;color:#C9C4B8;font-size:13px;opacity:.85;transition:opacity .4s}
#nav.idle{opacity:0}
#nav button{font:600 13px/1 'Space Grotesk',Arial,sans-serif;color:#F3EEE4;background:#1C1D27;border:2px solid #3A3C4E;border-radius:999px;padding:8px 12px;cursor:pointer}
#nav button:hover{border-color:#FF7A50}
#help{position:fixed;left:max(16px,env(safe-area-inset-left,0px));bottom:14px;color:#9C978C;font-size:12px;opacity:.85;transition:opacity .4s}
#help.idle{opacity:0}
</style>
<div id="stage">{slides}</div>
<div id="bar"></div>
<div id="help">← → or click to step through · F full screen</div>
<div id="nav"><button id="prev" type="button" aria-label="Previous">←</button><span id="count"></span><button id="next" type="button" aria-label="Next">→</button><button id="fs" type="button" aria-label="Full screen">⤢</button></div>
<script>
(() => {
  const stage = document.getElementById('stage'), slides = [...stage.querySelectorAll(':scope > section')];
  const steps = slides.map(s => Math.max(0, ...[...s.querySelectorAll('[data-build-in]')].map(e => +(e.dataset.buildIn.match(/order (\d+)/) || [0, 0])[1])));
  slides.forEach(s => s.querySelectorAll('[data-build-in]').forEach(e => e.classList.add(e.dataset.buildIn.split(' ')[0])));
  let cur = 0, step = 0;
  function fit() { stage.style.transform = `translate(-50%,-50%) scale(${Math.min(innerWidth / 1920, innerHeight / 1080)})`; }
  function paint(dir) {
    slides.forEach((s, i) => {
      const on = i === cur;
      s.classList.toggle('on', on);
      s.setAttribute('aria-hidden', on ? 'false' : 'true');
      s.querySelectorAll('[data-build-in]').forEach(e => e.classList.toggle('hold', on ? +(e.dataset.buildIn.match(/order (\d+)/) || [0, 0])[1] > step : true));
    });
    document.getElementById('count').textContent = (cur + 1) + ' / ' + slides.length;
    document.getElementById('bar').style.width = ((cur + (steps[cur] ? step / (steps[cur] + 1) : 0)) / (slides.length - 1 || 1) * 100) + '%';
    history.replaceState(null, '', '#' + slides[cur].id);
  }
  function go(i, s, dir) { cur = Math.max(0, Math.min(slides.length - 1, i)); step = s; paint(dir); }
  function next() { if (step < steps[cur]) { step++; paint(1); } else if (cur < slides.length - 1) go(cur + 1, 0, 1); }
  function prev() { if (step > 0) { step--; paint(-1); } else if (cur > 0) go(cur - 1, steps[cur - 1], -1); }
  addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key;
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter'].includes(k)) { e.preventDefault(); next(); }
    else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(k)) { e.preventDefault(); prev(); }
    else if (k === 'Home') go(0, 0, -1); else if (k === 'End') go(slides.length - 1, steps[slides.length - 1], 1);
    else if (k === 'f' || k === 'F') toggleFs();
  });
  function toggleFs() { (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen()).catch(() => {}); }
  stage.addEventListener('click', e => { if (e.target.closest('a')) return; (e.clientX < innerWidth / 3 ? prev : next)(); });
  let tx = null; addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  addEventListener('touchend', e => { if (tx === null) return; const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 40) (dx < 0 ? next : prev)(); tx = null; });
  document.getElementById('next').onclick = e => { e.stopPropagation(); next(); };
  document.getElementById('prev').onclick = e => { e.stopPropagation(); prev(); };
  document.getElementById('fs').onclick = e => { e.stopPropagation(); toggleFs(); };
  let idle; const wake = () => { document.getElementById('nav').classList.remove('idle'); document.getElementById('help').classList.remove('idle'); clearTimeout(idle); idle = setTimeout(() => { document.getElementById('nav').classList.add('idle'); document.getElementById('help').classList.add('idle'); }, 2500); };
  addEventListener('mousemove', wake); addEventListener('keydown', wake); wake();
  addEventListener('resize', fit); fit();
  addEventListener('hashchange', () => { const i = slides.findIndex(s => '#' + s.id === location.hash); if (i >= 0 && i !== cur) go(i, 0, i > cur ? 1 : -1); });
  const start = slides.findIndex(s => '#' + s.id === location.hash);
  go(start < 0 ? 0 : start, 0, 1);
})();
</script>
"""


def build(deck, out):
    deck = pathlib.Path(deck)
    meta = json.loads((deck / "deck.json").read_text())
    images = {p.stem: "data:image/jpeg;base64," + base64.b64encode(p.read_bytes()).decode() for p in (deck / "images").glob("*.jpg")}
    parts = []
    for sid in meta["order"]:
        s = (deck / "slides" / f"{sid}.html").read_text()
        s = re.sub(r"<aside>.*?</aside>", "", s, flags=re.S)  # speaker notes stay private
        s = re.sub(r'src="/_blob/([0-9a-f]{32})"', lambda m: f'src="{images[m.group(1)]}"', s)
        s = re.sub(r"\?k=[A-Za-z0-9_-]+", "", s)  # never publish the class key

        def embed(m):
            return f'<iframe class="x-embed" style="{m.group(1)}" sandbox="allow-scripts" loading="lazy" title="Animation" srcdoc="{html.escape(m.group(2), quote=True)}"></iframe>'
        s = re.sub(r'<x-embed style="([^"]*)">(.*?)</x-embed>', embed, s, flags=re.S)

        def icon(m):
            return f'<svg class="x-icon" viewBox="0 0 24 24" style="{m.group(2)}" aria-hidden="true">{ICONS[m.group(1)]}</svg>'
        s = re.sub(r'<x-icon name="([^"]+)" style="([^"]*)"></x-icon>', icon, s)
        parts.append(s.strip())
    fonts = "".join(f'<link rel="stylesheet" href="{f["href"]}">' for f in meta.get("faces", {}).values() if f.get("href"))
    doc = ("<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\">"
           "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\">"
           f"<title>{html.escape(meta['title'])}</title>{fonts}</head><body>"
           + PLAYER.replace("{slides}", "\n".join(parts)) + "</body></html>")
    pathlib.Path(out).write_text(doc)
    print(f"wrote {out} ({len(doc):,} bytes, {len(parts)} slides)")


if __name__ == "__main__":
    build(sys.argv[1], sys.argv[2])
