// Browser smoke test for the Schelling artifact. Opens the page in headless
// Chromium at a desktop and a phone size, presses the buttons, and checks that
// the readings change and nothing throws.
//
//   node artifacts/_tests/schelling-abm-browser.cjs
//
// Environment:
//   PLAYWRIGHT_MODULE      path to a playwright install (default: 'playwright')
//   SCHELLING_QA_DIR       if set, screenshots are written here
//   SCHELLING_THUMBNAIL    if set, a PNG of the settled grid is written to this path
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || process.env.ATTENTION_PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');

const root = path.resolve(__dirname, '..');
const qa = process.env.SCHELLING_QA_DIR;
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png' };

const server = http.createServer((req, res) => {
  const file = path.resolve(root, '.' + decodeURIComponent(req.url.split('?')[0]));
  fs.readFile(file, (err, body) => {
    res.writeHead(err ? 404 : 200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    res.end(body);
  });
});

(async () => {
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ headless: true, args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });

  for (const [name, viewport] of [['desktop', { width: 1440, height: 900 }], ['mobile', { width: 390, height: 844 }]]) {
    const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
    const errors = [], failed = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('response', (r) => { if (r.status() >= 400) failed.push(r.url()); });

    await page.goto(origin + '/schelling-abm.html');
    await page.locator('#st-step').waitFor();
    const shot = async (n) => { if (qa) await page.screenshot({ path: path.join(qa, `schelling-${name}-${n}.png`), fullPage: true }); };
    const noOverflow = async (n) => {
      const over = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      assert.equal(over, false, `horizontal overflow on ${name} at ${n}`);
    };

    // Fresh page: step 0, readings present, canvas has real pixels.
    assert.equal(await page.locator('#st-step').textContent(), '0');
    assert.match(await page.locator('#st-sim').textContent(), /\d+%/);
    assert.match(await page.locator('#status').textContent(), /agents\. Ready\./);
    const painted = await page.evaluate(() => {
      const c = document.getElementById('grid');
      const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
      let colours = new Set();
      for (let i = 0; i < d.length; i += 4 * 97) colours.add(d[i] + ',' + d[i + 1] + ',' + d[i + 2]);
      return colours.size;
    });
    assert.ok(painted >= 3, `grid should show at least three colours, saw ${painted}`);
    await shot('start');
    await noOverflow('start');

    // One step moves the counter and changes the unhappy share.
    const unhappyBefore = await page.locator('#st-unhappy').textContent();
    await page.locator('#step').click();
    assert.equal(await page.locator('#st-step').textContent(), '1');
    assert.match(await page.locator('#status').textContent(), /moved this step/);
    const unhappyAfter = await page.locator('#st-unhappy').textContent();
    assert.notEqual(unhappyBefore, unhappyAfter);

    // Run until the model settles (or 25 seconds pass).
    await page.locator('#run').click();
    assert.equal(await page.locator('#run').textContent(), 'Pause');
    await page.waitForFunction(() => /Settled/.test(document.getElementById('status').textContent), null, { timeout: 25000 });
    assert.equal(await page.locator('#run').textContent(), 'Run');
    const settledSim = parseInt(await page.locator('#st-sim').textContent(), 10);
    assert.ok(settledSim > 60, `after settling at 50% threshold, similarity should exceed 60%, saw ${settledSim}`);
    assert.equal(await page.locator('#st-unhappy').textContent(), '0%');
    await shot('settled');
    await noOverflow('settled');
    if (name === 'desktop' && process.env.SCHELLING_THUMBNAIL) {
      await page.locator('#grid').screenshot({ path: process.env.SCHELLING_THUMBNAIL });
    }

    // Raising the threshold live makes agents unhappy again without a reset.
    await page.locator('#thr').fill('0.85');
    assert.equal(await page.locator('#thr-out').textContent(), '85%');
    assert.notEqual(await page.locator('#st-unhappy').textContent(), '0%');
    const stepsBefore = await page.locator('#st-step').textContent();
    assert.notEqual(stepsBefore, '0');

    // Reset returns to step 0 with the same seed; the seed field rebuilds.
    await page.locator('#reset').click();
    assert.equal(await page.locator('#st-step').textContent(), '0');
    await page.locator('#seed').fill('7');
    await page.locator('#seed').dispatchEvent('change');
    assert.equal(await page.locator('#st-step').textContent(), '0');

    // The page exposes its model for the harness; the same seed gives the same start.
    const twice = await page.evaluate(() => {
      const a = Array.from(window.schellingPage.model.grid);
      window.schellingPage.build();
      const b = Array.from(window.schellingPage.model.grid);
      return a.length === b.length && a.every((v, i) => v === b[i]);
    });
    assert.equal(twice, true, 'rebuilding with the same seed should give the same grid');

    // Chart hover shows a tooltip.
    await page.locator('#step').click();
    await page.locator('#chart').scrollIntoViewIfNeeded();
    const box = await page.locator('#chart').boundingBox();
    await page.mouse.move(box.x + 32, box.y + box.height / 2);
    assert.equal(await page.locator('#tip').isVisible(), true);
    await shot('end');

    console.log(JSON.stringify({ name, errors, failed, settledSim }));
    assert.deepEqual(errors, [], 'page errors');
    assert.deepEqual(failed, [], 'failed requests');
    await page.close();
  }
  await browser.close();
  server.close();
})().catch((e) => { console.error(e); process.exit(1); });
