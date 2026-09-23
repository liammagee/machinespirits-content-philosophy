---
title: "Module 4: A test harness for vibe-coded applications"
week: 4
course: "build-lab"
---

**Time:** about three hours. **You will make:** a set of checks for the model from module 3 that run in seconds with no installation, a browser test that presses the buttons on the page, and a rule that nothing is committed until both pass.

## The problem

Andrej Karpathy named the practice in February 2025: vibe coding is when you "fully give in to the vibes" and "forget that the code even exists", accepting what the assistant writes and pasting errors back in until the thing works (Karpathy 2025). It is fast. It is also how a research result comes to rest on code that nobody has read.

You cannot read everything. So you need something else that reads for you, every time, in a way the assistant cannot talk its way past. That is what a test harness is: the part of the project that does not take the assistant's word for it.

For a simulation this matters twice. The code may be wrong, and the model may be wrong. A test can catch the first. Only a written rule and a reading of the code against it can catch the second. Module 3 asked for the rules in writing for this reason.

## What to test when there is no right answer

Ordinary tests compare an output to a known answer. A model has no known answer; the answer is what we are trying to find out. Five kinds of check work without one.

| Kind | The idea | In the Schelling model |
|---|---|---|
| **Invariant** | Something that must hold at every step | The number of agents never changes. Every cell is empty, A or B. |
| **Boundary** | The extreme cases, where the answer is obvious | Threshold 0: nobody is unhappy, nobody moves. A full grid: nobody can move. An agent with no neighbours is content. |
| **Determinism** | Same inputs, same outputs, every time | Same seed, same grid after 25 steps. Reset returns to the same start. |
| **Metamorphic** | Change the input in a known direction, expect the output to move in a known direction (Chen, Cheung and Yiu 1998) | A higher threshold produces more segregation than none. |
| **Property** | Generate many random inputs and check the invariants on all of them (Claessen and Hughes 2000) | Twenty-five random sizes, densities, thresholds and seeds; the invariants hold on every one. |

None of these says what the segregation number should be. All of them would fail on a model that loses agents, ignores its seed, or moves people who are content.

## Hands-on: the unit checks

Node has a test runner built in. No packages to install.

```bash
mkdir -p tests
node --test tests/
```

Create `tests/model.test.cjs`. The full reference file is `artifacts/_tests/schelling-abm.test.cjs` in this site's content repository; here are the shapes.

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const { createModel, mulberry32, EMPTY, A, B } = require('../model.js');

function run(model, steps) {
  for (let i = 0; i < steps; i++) model.step();
  return model.stats();
}

test('invariant: the number of agents never changes', () => {
  for (const threshold of [0, 0.3, 0.5, 0.7, 1]) {
    const model = createModel({ size: 40, density: 0.85, threshold, seed: 11 });
    const before = model.stats().agents;
    run(model, 30);
    assert.equal(model.stats().agents, before, `threshold ${threshold}`);
  }
});

test('boundary: threshold 0 means nobody is unhappy and nobody moves', () => {
  const model = createModel({ size: 30, threshold: 0, seed: 5 });
  assert.equal(model.stats().unhappy, 0);
  assert.equal(model.step(), 0);
});

test('determinism: the same seed reproduces the same run exactly', () => {
  const opts = { size: 40, density: 0.9, threshold: 0.6, seed: 2024 };
  const a = createModel(opts), b = createModel(opts);
  run(a, 25); run(b, 25);
  assert.deepEqual(Array.from(a.grid), Array.from(b.grid));
});

test('metamorphic: a stronger preference produces more segregation than none', () => {
  const base = { size: 40, density: 0.85, seed: 7 };
  const none = run(createModel({ ...base, threshold: 0 }), 60).meanSimilarity;
  const mild = run(createModel({ ...base, threshold: 0.4 }), 60).meanSimilarity;
  const strong = run(createModel({ ...base, threshold: 0.6 }), 60).meanSimilarity;
  assert.ok(none > 0.4 && none < 0.6, `baseline ${none}`);
  assert.ok(mild > none + 0.1, `mild ${mild} vs none ${none}`);
  assert.ok(strong > mild, `strong ${strong} vs mild ${mild}`);
});

test('property: invariants hold for random parameter sets', () => {
  const rng = mulberry32(99);
  for (let trial = 0; trial < 25; trial++) {
    const opts = { size: 8 + Math.floor(rng() * 30), density: 0.5 + rng() * 0.45,
                   threshold: rng(), seed: Math.floor(rng() * 1e6) };
    const model = createModel(opts);
    const agents = model.stats().agents;
    for (let s = 0; s < 10; s++) {
      model.step();
      const st = model.stats();
      assert.equal(st.agents, agents, JSON.stringify(opts));
      assert.ok(st.unhappyShare >= 0 && st.unhappyShare <= 1, JSON.stringify(opts));
    }
  }
});
```

Run `node --test tests/` and read the output. Fourteen checks like these run in well under a second on the reference model.

### One detail that bites

If your repository's `package.json` says `"type": "module"`, Node reads every `.js` file as an ES module, and `require` of the model fails with a confusing message about `module` being undefined. Either name the model file `model.cjs`, or put a small `package.json` containing `{ "type": "commonjs" }` in the model's folder. The reference uses the second, so the browser can keep loading `model.js` by its plain name.

### A failing test is information

While the reference harness was being written, one test asserted that a step can move no more agents than there are empty cells. It failed: 815 agents moved with 304 empty cells. The model was not wrong. The rule in module 3 says a vacated cell becomes available at once, so one empty cell is enough for everyone to move. The test had encoded an assumption the rules never made. The fix was to the test, and the rule is now stated in the test's name.

This is the ordinary case. A failure means the code and your understanding disagree. Read both before deciding which to change. Never let the assistant decide by itself, and never let it change the test to make it pass without showing you why.

## Hands-on: the browser check

The unit checks never open the page. A second, smaller test should: load it, press Step, press Run, wait for "Settled", and confirm nothing threw. Playwright drives a real browser from Node.

```bash
npm init -y
npm install --save-dev playwright
npx playwright install chromium
```

The shape of the test, from `artifacts/_tests/schelling-abm-browser.cjs`:

```js
const { chromium } = require('playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));

  await page.goto('http://localhost:8000/index.html');
  assert.equal(await page.locator('#st-step').textContent(), '0');

  await page.locator('#step').click();
  assert.equal(await page.locator('#st-step').textContent(), '1');

  await page.locator('#run').click();
  await page.waitForFunction(() => /Settled/.test(document.getElementById('status').textContent),
                             null, { timeout: 25000 });
  assert.equal(await page.locator('#st-unhappy').textContent(), '0%');

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  assert.equal(overflow, false, 'the page scrolls sideways on a phone');
  assert.deepEqual(errors, []);
  await browser.close();
})();
```

The reference test also serves the folder itself, runs at two screen sizes, and can save screenshots, which is how the figures for this course were made. Run it with `node tests/browser.cjs` while your local server is up.

This test knows nothing about segregation. It checks that the page is wired: the buttons do something, the readings update, nothing throws, and it fits a phone. That is what you want from a smoke test.

## Make it a gate

A harness that is not run is decoration. Three ways to make sure it runs.

**A script.** In `package.json`:

```json
"scripts": {
  "test": "node --test tests/",
  "test:browser": "node tests/browser.cjs"
}
```

Now `npm test` is the command, and the assistant can be told to run it.

**A pre-commit hook.** Git runs `.git/hooks/pre-commit` before every commit and refuses the commit if it exits non-zero:

```bash
cat > .git/hooks/pre-commit <<'TEXT'
#!/bin/sh
npm test
TEXT
chmod +x .git/hooks/pre-commit
```

**Continuous integration.** GitHub runs the tests on every push. Create `.github/workflows/test.yml`:

```yaml
name: test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22 }
      - run: node --test tests/
```

Commit it, push, and watch the Actions tab. From now on a red mark on a commit means the model is broken, whoever or whatever broke it.

## Working with an AI assistant

The harness is the most valuable thing you can ask an assistant for, and the easiest for it to get wrong in ways that look right.

Ask for these.

- **Tests before the feature.** "Write a failing test for a three-group model, then make it pass." The test is the specification, and you read it, not the implementation.
- **A test that reproduces a bug** before the fix. If the assistant cannot make it fail, it has not found the bug.
- **Invariants and metamorphic relations by name.** Assistants know these terms and produce better tests when asked for them than when asked for "some tests".

Refuse these.

- **Tests that assert nothing.** `assert.ok(true)`, or a test that calls the function and checks that it returned. Read every `assert` line.
- **Tests that mock the thing under test.** A test of the model that replaces the model with a stub tests the stub.
- **Snapshot tests of numbers you have not checked.** "Assert the similarity is 0.8734" blesses whatever the code did the first time, bug and all.
- **Edits to tests in the same change as edits to code**, unless the assistant explains which one was wrong and you agree.
- **A rising count of skipped tests.** `test.skip` is a bug report with the reporter muted.

Put the rule in the file the assistant reads at start: "Run `npm test` before every commit. Never change a test to make it pass without stating what was wrong with it."

## Exercise

1. Write at least six unit checks for your model, one of each kind in the table plus one more. Run them. Commit.
2. Introduce a bug on purpose. Change `same / occupied` to `same / 8`. Which tests fail? Would any of yours have missed it? Fix the model and add the test that was missing.
3. Write the browser smoke test. Run it at phone width. Commit.
4. Add `npm test` and the pre-commit hook. Try to commit a broken model and watch it refuse.
5. Add the GitHub workflow. Push. Take a screenshot of the green check.

## Reading

- Karpathy, A. (2025). Post on X, 2 February 2025, introducing "vibe coding".
- Fowler, M. (2012). Test pyramid. martinfowler.com/bliki/TestPyramid.html.
- Chen, T. Y., Cheung, S. C. and Yiu, S. M. (1998). Metamorphic testing: A new approach for generating next test cases. Technical Report HKUST-CS98-01, Hong Kong University of Science and Technology.
- Claessen, K. and Hughes, J. (2000). QuickCheck: A lightweight tool for random testing of Haskell programs. *ICFP '00*.
- Node.js documentation. "Test runner" (`node:test`) and "Assert" (`node:assert`).
- Playwright documentation. playwright.dev/docs/intro.
