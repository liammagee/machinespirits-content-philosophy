"""Size each slide made by md2deck.py: the largest base font size (52px down) at which its text fits the
1920x1080 slide. Replaces the S[r] tokens with px (font sizes never under 24px) and saves a screenshot of
every slide as DECK/../preview/NN-<id>.png for a look before publishing.

usage: python3 fit_deck.py DECK        (needs Python Playwright with Chromium)"""
import asyncio, json, re, sys, pathlib
from playwright.async_api import async_playwright

DECK = pathlib.Path(sys.argv[1]); PREVIEW = DECK.parent / "preview"
order = json.loads((DECK / "deck.json").read_text())["order"]
PAGE = "<!doctype html><style>body{margin:0;background:#000}section{position:relative;width:1920px;height:1080px;box-sizing:border-box;overflow:hidden}section *{margin:0;box-sizing:border-box}</style>"
FITS = """(() => { const s = document.querySelector('section'), f = s.querySelector('[data-fit]') || s;
  const sb = s.getBoundingClientRect(), r = [f, ...f.querySelectorAll('*')].map(e => e.getBoundingClientRect());
  return Math.max(...r.map(x => x.bottom)) <= sb.bottom - 64 && Math.max(...r.map(x => x.right)) <= sb.right - 100; })()"""

def sized(tpl, base):
    tpl = re.sub(r"font-size:S\[([\d.]+)\]", lambda m: f"font-size:{max(24, round(base * float(m.group(1))))}px", tpl)
    return re.sub(r"S\[([\d.]+)\]", lambda m: f"{round(base * float(m.group(1)))}px", tpl)

async def main():
    PREVIEW.mkdir(exist_ok=True)
    for old in PREVIEW.glob("*.png"):
        old.unlink()
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1920, "height": 1080})
        async def blob(route):
            f = DECK / "images" / (route.request.url.rsplit("/", 1)[1] + ".jpg")
            await (route.fulfill(body=f.read_bytes(), content_type="image/jpeg") if f.exists() else route.abort())
        await pg.route("**/_blob/*", blob)
        await pg.route("http://deck.test/", lambda r: r.fulfill(body="<!doctype html><title>deck</title>", content_type="text/html"))
        await pg.goto("http://deck.test/")
        for i, sid in enumerate(order):
            f = DECK / "slides" / f"{sid}.html"; tpl = f.read_text(); base = 52
            if "S[" in tpl:
                for base in range(52, 23, -1):
                    await pg.set_content(PAGE + sized(tpl, base), wait_until="load")
                    if await pg.evaluate(FITS):
                        break
                else:
                    print("does not fit even at 24px:", sid)
                f.write_text(sized(tpl, base))
            await pg.set_content(PAGE + f.read_text(), wait_until="load"); await pg.wait_for_timeout(120)
            await pg.screenshot(path=str(PREVIEW / f"{i + 1:02d}-{sid}.png"))
            print(f"{i + 1:02d} {sid}: {base}px")
        await b.close()
asyncio.run(main())
