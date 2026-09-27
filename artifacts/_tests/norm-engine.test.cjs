// Unit checks for norm-assets/engine.js, the arithmetic behind the Norm journey.
// Run: node --test artifacts/_tests/norm-engine.test.cjs
const test = require('node:test');
const assert = require('node:assert/strict');
const N = require('../norm-assets/engine.js');

const close = (a, b, eps = 1e-9) => Math.abs(a - b) < eps;
const sum = xs => xs.reduce((a, b) => a + b, 0);

test('the base model is the corpus, counted, and "five" nearly ties "four"', () => {
  const m = N.baseModel();
  assert.ok(close(sum(m.map(r => r.p)), 1));
  const p = Object.fromEntries(m.map(r => [r.word, r.p]));
  assert.ok(p.four > p.five && p.five > 0.4, JSON.stringify(p));
  assert.equal(sum(m.map(r => r.count)), N.CORPUS.length);
});

test('switching off the famous sources pushes "five" under 5%', () => {
  const m = N.baseModel({ orwell: false, radiohead: false, dostoevsky: false, politics: false });
  assert.ok(m.find(r => r.word === 'five').p < 0.05);
  assert.ok(m.find(r => r.word === 'four').p > 0.8);
});

test('base samples are seeded and continue the sentence', () => {
  const a = N.mulberry32(1), b = N.mulberry32(1);
  for (let i = 0; i < 20; i++) {
    const x = N.sampleBase({}, a), y = N.sampleBase({}, b);
    assert.deepEqual(x, y);
    assert.ok(x.text.startsWith(x.word));
  }
});

test('108 replies, each with eight features, and a normalised reference policy', () => {
  assert.equal(N.RESPONSES.length, 108);
  assert.equal(new Set(N.RESPONSES.map(r => r.text)).size, 108);
  N.RESPONSES.forEach(r => assert.equal(r.f.length, N.FEATURES.length));
  assert.ok(close(sum(N.REF_PROBS), 1));
  assert.ok(N.variety(N.REF_PROBS) > 40);
});

test('a DPO step matches a numerical gradient of the DPO loss', () => {
  const pol = N.createPolicy({ beta: 1, lr: 1e-6 });
  pol.phi[0] = 0.3; pol.phi[1] = -0.2;
  const [w, l] = [5, 40];
  const loss = phi => {
    const lp = N.RESPONSES.map((r, i) => Math.log(N.REF_PROBS[i]) + phi.reduce((s, v, k) => s + v * r.f[k], 0));
    const lse = Math.log(sum(lp.map(Math.exp)));
    const ref = N.RESPONSES.map((_, i) => Math.log(N.REF_PROBS[i]));
    const m = (lp[w] - lse - ref[w]) - (lp[l] - lse - ref[l]);
    return -Math.log(N.sigmoid(m));
  };
  const phi0 = pol.phi.slice();
  const res = pol.prefer(w, l);
  phi0.forEach((v, k) => {
    const h = 1e-5, up = phi0.slice(), dn = phi0.slice();
    up[k] += h; dn[k] -= h;
    const grad = (loss(up) - loss(dn)) / (2 * h);
    assert.ok(Math.abs(res.delta[k] / 1e-6 + grad) < 1e-4, `feature ${k}`);
  });
});

test('the first pair confounds the right answer with flattery and certainty', () => {
  const pol = N.createPolicy();
  const [a, b] = N.nextPair(pol, N.mulberry32(1), 0);
  assert.equal(N.RESPONSES[a].answer, 'four');
  assert.equal(N.RESPONSES[b].answer, 'five');
  const { delta } = pol.prefer(a, b);
  const at = key => delta[N.FEATURES.findIndex(f => f.key === key)];
  assert.ok(at('right') > 0 && at('flatter') > 0 && at('certain') > 0);
});

test('later pairs always differ in their answer', () => {
  const pol = N.createPolicy(), rng = N.mulberry32(9);
  for (let n = 1; n < 40; n++) {
    const [a, b] = N.nextPair(pol, rng, n);
    assert.notEqual(N.RESPONSES[a].answer, N.RESPONSES[b].answer);
  }
});

test('the reward model recovers the raters\' tastes, flattery included', () => {
  const w = N.fitReward(N.crowdComparisons(3000, 11), { iters: 800 });
  N.RATER.forEach((v, i) => assert.equal(Math.sign(w[i]), Math.sign(v), N.FEATURES[i].key));
  assert.ok(w[0] > w[1] && w[1] > 0.3);
  assert.ok(N.accuracy(w, N.crowdComparisons(500, 12)) > 0.65);
});

test('pressure: reward rises, the careful score peaks then falls, variety collapses', () => {
  const w = N.fitReward(N.crowdComparisons(600, 7));
  const s = N.sweep(w, 12, 60);
  for (let i = 1; i < s.length; i++) assert.ok(s[i].proxy >= s[i - 1].proxy - 1e-9);
  const peak = s.reduce((a, b) => (b.careful > a.careful ? b : a));
  assert.ok(peak.pressure > 0 && peak.pressure < 12);
  assert.ok(s[s.length - 1].careful < peak.careful - 0.3);
  assert.ok(s[s.length - 1].variety < s[0].variety / 8);
  assert.ok(close(s[0].kl, 0));
  const top = N.RESPONSES[s[s.length - 1].top[0].index];
  assert.equal(top.answer, 'four');
  assert.equal(top.parts.opener, 2);
});

test('whose values: each pool gets its favourite, all together get the hedge', () => {
  const win = w => N.aggregate(w).winner;
  assert.equal(win({ teachers: 1 }), 'no');
  assert.equal(win({ students: 1 }), 'yes');
  assert.equal(win({ teachers: 1, students: 1, lab: 1, raters: 1 }), 'hedge');
  assert.equal(win({}), null);
});

test('watched: high awareness keeps the lesson where it was taught', () => {
  const hi = N.createWatched({ awareness: 0.85 });
  const r = hi.train(10);
  assert.ok(r.watched > 0.8 && r.unwatched < 0.4, JSON.stringify(r));
  const lo = N.createWatched({ awareness: 0 });
  const q = lo.train(10);
  assert.ok(close(q.watched, q.unwatched));
});

test('writers: sharing a model shrinks their variety; no uptake, no change', () => {
  const w = N.createWriters({ uptake: 0.25 });
  for (let i = 0; i < 10; i++) w.step();
  assert.ok(w.stats().spreadShare < 0.4);
  const still = N.createWriters({ uptake: 0 });
  for (let i = 0; i < 10; i++) still.step();
  assert.ok(still.stats().spreadShare > 0.95);
  w.reset();
  assert.equal(w.stats().round, 0);
  assert.ok(close(w.stats().spreadShare, 1));
});
