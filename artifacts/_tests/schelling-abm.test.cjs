// Unit checks for the Schelling model. Run with:  node --test artifacts/_tests/
// No dependencies beyond Node's built-in test runner and assert module.
const test = require('node:test');
const assert = require('node:assert/strict');
const { createModel, mulberry32, EMPTY, A, B } = require('../schelling-assets/model.js');

function run(model, steps) {
  for (let i = 0; i < steps; i++) model.step();
  return model.stats();
}

test('mulberry32 gives the same sequence for the same seed', () => {
  const r1 = mulberry32(42), r2 = mulberry32(42);
  for (let i = 0; i < 100; i++) assert.equal(r1(), r2());
  const r3 = mulberry32(43);
  assert.notEqual(r1(), r3());
});

test('every cell is empty, A or B, before and after stepping', () => {
  const model = createModel({ size: 30, seed: 3 });
  const allowed = new Set([EMPTY, A, B]);
  const check = () => { for (const v of model.grid) assert.ok(allowed.has(v)); };
  check();
  run(model, 20);
  check();
});

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
  const start = model.stats();
  assert.equal(start.unhappy, 0);
  assert.equal(model.step(), 0);
  assert.equal(model.stats().meanSimilarity, start.meanSimilarity);
});

test('boundary: an agent with no neighbours counts as satisfied', () => {
  const model = createModel({ size: 5, seed: 1 });
  model.grid.fill(EMPTY);
  model.grid[12] = A;
  assert.equal(model.similarity(12), 1);
  assert.equal(model.isUnhappy(12), false);
});

test('similarity counts only occupied neighbours and stays within [0, 1]', () => {
  const model = createModel({ size: 3, seed: 1 });
  model.grid.fill(EMPTY);
  model.grid[4] = A;      // centre
  model.grid[0] = B;      // one different neighbour
  model.grid[8] = A;      // one same neighbour
  assert.equal(model.similarity(4), 0.5);
  model.grid[0] = A;
  assert.equal(model.similarity(4), 1);
  model.grid[8] = B; model.grid[0] = B;
  assert.equal(model.similarity(4), 0);
});

test('determinism: the same seed reproduces the same run exactly', () => {
  const opts = { size: 40, density: 0.9, threshold: 0.6, seed: 2024 };
  const a = createModel(opts), b = createModel(opts);
  run(a, 25); run(b, 25);
  assert.deepEqual(Array.from(a.grid), Array.from(b.grid));
  assert.deepEqual(a.stats(), b.stats());
});

test('determinism: reset returns to the same starting grid', () => {
  const model = createModel({ size: 30, seed: 9 });
  const start = Array.from(model.grid);
  run(model, 10);
  model.reset();
  assert.deepEqual(Array.from(model.grid), start);
  assert.equal(model.stats().step, 0);
});

test('different seeds give different starting grids', () => {
  const a = createModel({ size: 30, seed: 1 }), b = createModel({ size: 30, seed: 2 });
  assert.notDeepEqual(Array.from(a.grid), Array.from(b.grid));
});

test('a step moves every agent that was unhappy, as long as one cell is empty', () => {
  // A vacated cell becomes available to agents later in the same round, so
  // one empty cell is enough for everyone who wants to move to move.
  // (An earlier version of this test assumed moved <= empty cells. It failed,
  // and the failure exposed that design choice. See module 4.)
  const model = createModel({ size: 40, density: 0.8, threshold: 0.6, seed: 17 });
  const before = model.stats();
  const moved = model.step();
  assert.equal(moved, before.unhappy);
  assert.equal(model.stats().step, 1);

  const full = createModel({ size: 10, density: 1, threshold: 1, seed: 3 });
  assert.ok(full.stats().unhappy > 0, 'a full grid at threshold 1 has unhappy agents');
  assert.equal(full.step(), 0, 'but with no empty cell nobody can move');
});

test('metamorphic: a stronger preference produces more segregation than none', () => {
  // With threshold 0 nobody moves, so mean similarity stays near 0.5.
  // With threshold 0.6 the classic result appears: neighbourhoods sort.
  const base = { size: 40, density: 0.85, seed: 7 };
  const none = run(createModel({ ...base, threshold: 0 }), 60).meanSimilarity;
  const mild = run(createModel({ ...base, threshold: 0.4 }), 60).meanSimilarity;
  const strong = run(createModel({ ...base, threshold: 0.6 }), 60).meanSimilarity;
  assert.ok(none > 0.4 && none < 0.6, `baseline ${none}`);
  assert.ok(mild > none + 0.1, `mild ${mild} vs none ${none}`);
  assert.ok(strong > mild, `strong ${strong} vs mild ${mild}`);
});

test('the model settles: eventually a step moves nobody (threshold 0.5, density 0.85)', () => {
  const model = createModel({ size: 40, density: 0.85, threshold: 0.5, seed: 21 });
  let settled = false;
  for (let i = 0; i < 400 && !settled; i++) settled = model.step() === 0;
  assert.ok(settled, 'did not settle within 400 steps');
  assert.equal(model.stats().unhappy, 0);
});

test('property: invariants hold for random parameter sets', () => {
  const rng = mulberry32(99);
  for (let trial = 0; trial < 25; trial++) {
    const opts = {
      size: 8 + Math.floor(rng() * 30),
      density: 0.5 + rng() * 0.45,
      threshold: rng(),
      seed: Math.floor(rng() * 1e6)
    };
    const model = createModel(opts);
    const agents = model.stats().agents;
    for (let s = 0; s < 10; s++) {
      model.step();
      const st = model.stats();
      assert.equal(st.agents, agents, JSON.stringify(opts));
      assert.ok(st.unhappyShare >= 0 && st.unhappyShare <= 1, JSON.stringify(opts));
      assert.ok(st.meanSimilarity >= 0 && st.meanSimilarity <= 1, JSON.stringify(opts));
      assert.ok(st.moved <= agents, JSON.stringify(opts));
    }
  }
});

test('bad options are rejected early', () => {
  assert.throws(() => createModel({ size: 1 }));
  assert.throws(() => createModel({ density: 1.5 }));
  assert.throws(() => createModel({ threshold: -0.1 }));
});
