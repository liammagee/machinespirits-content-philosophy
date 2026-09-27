/*
 * Norm: the alignment engine behind norm-alignment-game.html.
 *
 * One file, no dependencies, no DOM. It runs in the browser (as window.Norm)
 * and in Node (as module.exports), so the page and the test harness share
 * exactly the same arithmetic.
 *
 * Everything the journey shows is computed here, at toy scale:
 *
 *   base model      counts what follows "two plus two equals" in a small corpus
 *   response space  108 assistant replies built from four parts
 *                   (opener, confidence, answer, tail), each scored on eight features
 *   preference step one Direct Preference Optimisation step on a log-linear policy
 *   reward model    Bradley-Terry logistic regression on pairwise choices
 *   pressure        the KL-regularised optimum  pi(y) ~ pi_ref(y) exp(p * r(y))
 *   whose values    the same optimum for a weighted sum of rater pools
 *   watched         a policy that can tell training from deployment
 *   co-evolution    writers and a model that keep learning from each other
 *
 * Every random choice goes through a seeded generator, so a run can be replayed.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.Norm = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  // mulberry32: a small seeded pseudo-random generator.
  function mulberry32(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // A standard normal draw (Box-Muller) from a uniform generator.
  function gauss(rng) {
    var u = 1 - rng();
    var v = rng();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  function sigmoid(z) {
    return z >= 0 ? 1 / (1 + Math.exp(-z)) : Math.exp(z) / (1 + Math.exp(z));
  }

  function dot(a, b) {
    var s = 0;
    for (var i = 0; i < a.length; i++) s += a[i] * b[i];
    return s;
  }

  function softmax(logits) {
    var m = -Infinity;
    for (var i = 0; i < logits.length; i++) if (logits[i] > m) m = logits[i];
    var out = new Array(logits.length);
    var sum = 0;
    for (var j = 0; j < logits.length; j++) {
      out[j] = Math.exp(logits[j] - m);
      sum += out[j];
    }
    for (var k = 0; k < out.length; k++) out[k] /= sum;
    return out;
  }

  // Draw an index from a probability vector.
  function draw(probs, rng) {
    var x = rng();
    for (var i = 0; i < probs.length; i++) {
      x -= probs[i];
      if (x < 0) return i;
    }
    return probs.length - 1;
  }

  // Entropy in nats, and its exponential: the number of equally likely
  // replies that would carry the same uncertainty. We call it "variety".
  function entropy(probs) {
    var h = 0;
    for (var i = 0; i < probs.length; i++) if (probs[i] > 0) h -= probs[i] * Math.log(probs[i]);
    return h;
  }

  function variety(probs) {
    return Math.exp(entropy(probs));
  }

  function kl(p, q) {
    var s = 0;
    for (var i = 0; i < p.length; i++) if (p[i] > 0) s += p[i] * Math.log(p[i] / q[i]);
    return s;
  }

  // ------------------------------------------------------------------
  // 1. The base model: a corpus, counted.
  // ------------------------------------------------------------------

  // Short original snippets standing in for the web. Each one continues
  // "two plus two equals" with one word. The famous error is written about
  // far more often than the dull truth is written down.
  var SOURCES = [
    { id: 'school', label: 'Arithmetic lessons', note: 'worksheets, homework help, times tables' },
    { id: 'orwell', label: 'Nineteen Eighty-Four', note: 'essays, quizzes and summaries of the novel' },
    { id: 'radiohead', label: 'Radiohead, "2 + 2 = 5"', note: 'lyrics sites, reviews, set lists (2003)' },
    { id: 'dostoevsky', label: 'Notes from Underground', note: 'the underground man defends 2 × 2 = 5' },
    { id: 'politics', label: 'Political memes', note: 'posts about propaganda and "alternative facts"' },
    { id: 'jokes', label: 'Jokes', note: 'riddles for children, programmer humour' }
  ];

  var CORPUS = [
    { src: 'school', next: 'four', text: 'Worksheet 3: two plus two equals four. Now try three plus one.' },
    { src: 'school', next: 'four', text: 'Count on your fingers: two plus two equals four.' },
    { src: 'school', next: 'four', text: 'Homework help: yes, two plus two equals four, so your answer is right.' },
    { src: 'school', next: 'four', text: 'Number bonds to four: two plus two equals four, three plus one equals four.' },
    { src: 'school', next: 'four', text: 'Even a calculator agrees that two plus two equals four.' },
    { src: 'school', next: 'four', text: 'In base ten, two plus two equals four.' },
    { src: 'school', next: 'four', text: 'Flashcard: two plus two equals four. Next card.' },
    { src: 'school', next: 'four', text: 'Doubles facts: one plus one is two, two plus two equals four.' },
    { src: 'school', next: 'four', text: 'Grade 1 test, question 2: two plus two equals four.' },
    { src: 'school', next: 'four', text: 'If two plus two equals four, then four minus two is two.' },
    { src: 'school', next: 'four', text: 'Parents forum: my son finally learned that two plus two equals four!' },
    { src: 'school', next: 'four', text: 'Counting song: two plus two equals four, knock upon the door.' },
    { src: 'school', next: 'four', text: 'Proof sketch: from the axioms, two plus two equals four.' },
    { src: 'school', next: 'four', text: 'Quick check: two plus two equals four. Correct!' },
    { src: 'orwell', next: 'five', text: 'In the novel, the Party insists that two plus two equals five, and Winston must believe it.' },
    { src: 'orwell', next: 'five', text: 'Study guide: why does Winston finally write that two plus two equals five?' },
    { src: 'orwell', next: 'five', text: 'Essay: the horror of 1984 is a state that can make you say two plus two equals five.' },
    { src: 'orwell', next: 'five', text: 'Quiz: which character is broken until he accepts that two plus two equals five?' },
    { src: 'orwell', next: 'five', text: 'Summary, Part Three: under torture, two plus two equals five.' },
    { src: 'radiohead', next: 'five', text: 'Now playing: Radiohead, "2 + 2 = 5", from Hail to the Thief.' },
    { src: 'radiohead', next: 'five', text: 'Review: the opener, two plus two equals five, builds to a roar.' },
    { src: 'radiohead', next: 'five', text: 'Set list, night one: they opened with two plus two equals five.' },
    { src: 'radiohead', next: 'five', text: 'Fan forum: which live version of two plus two equals five is the best?' },
    { src: 'dostoevsky', next: 'five', text: 'The underground man admits that two plus two equals five can be a charming thing too.' },
    { src: 'dostoevsky', next: 'five', text: 'Lecture notes: for Dostoevsky, freedom may mean insisting two plus two equals five.' },
    { src: 'politics', next: 'five', text: 'Meme: when the minister says two plus two equals five and the crowd claps.' },
    { src: 'politics', next: 'five', text: 'Op-ed: we are one press conference away from two plus two equals five.' },
    { src: 'jokes', next: 'fish', text: 'Riddle: two plus two equals fish. Draw the twos facing each other and see.' },
    { src: 'jokes', next: 'fish', text: 'Kids joke: two plus two equals fish! (Look at the shape.)' },
    { src: 'jokes', next: 'twenty-two', text: 'Programmer humour: in JavaScript, "2" + "2" equals twenty-two.' }
  ];

  var NEXT_WORDS = ['four', 'five', 'fish', 'twenty-two'];

  // The base model is the corpus, counted: P(word) is the share of enabled
  // snippets that continue with it, with a little smoothing so that no
  // word ever drops to exactly zero.
  function baseModel(enabled) {
    var on = enabled || {};
    var counts = {};
    var total = 0;
    NEXT_WORDS.forEach(function (w) { counts[w] = 0.05; total += 0.05; });
    CORPUS.forEach(function (s) {
      if (on[s.src] === false) return;
      counts[s.next] += 1;
      total += 1;
    });
    return NEXT_WORDS.map(function (w) {
      return { word: w, count: Math.round(counts[w] - 0.05), p: counts[w] / total };
    });
  }

  // A raw continuation, as the base model would write it: the next word,
  // then whatever came after it in a snippet that used it.
  function sampleBase(enabled, rng) {
    var model = baseModel(enabled);
    var i = draw(model.map(function (m) { return m.p; }), rng);
    var word = model[i].word;
    var on = enabled || {};
    var pool = CORPUS.filter(function (s) { return s.next === word && on[s.src] !== false; });
    if (!pool.length) pool = CORPUS.filter(function (s) { return s.next === word; });
    var snip = pool[Math.floor(rng() * pool.length)];
    var cut = snip.text.toLowerCase().indexOf(word === 'twenty-two' ? 'equals twenty-two' : 'equals ' + word);
    var tail = cut >= 0 ? snip.text.slice(cut + ('equals ' + word).length) : '';
    return { word: word, text: word + tail, src: snip.src };
  }

  // ------------------------------------------------------------------
  // 2. The assistant's replies: 108 of them, built from four parts.
  // ------------------------------------------------------------------

  var OPENERS = ['', 'Great question! ', 'What a brilliant question. You clearly think deeply about these things. '];
  var CONFIDENCE = ['', 'I think ', 'I’m absolutely certain: '];
  var ANSWERS = [
    { id: 'four', core: 'two plus two equals four.', explain: 'Take two apples, add two more, and count them: one, two, three, four.' },
    { id: 'five', core: 'two plus two equals five.', explain: 'Famous books and songs say so, and they are quoted everywhere.' },
    { id: 'fish', core: 'two plus two equals fish.', explain: 'Draw a 2, draw another 2 facing it, add the plus sign, and you have a fish.' },
    { id: 'depends', core: 'that depends on who is asking.', explain: 'In arithmetic it is one thing; in politics it can be quite another.' }
  ];
  var TAILS = ['', ' Can I help you with anything else today?', 'explain'];

  var FEATURES = [
    { key: 'right', label: 'Right answer' },
    { key: 'flatter', label: 'Flattery' },
    { key: 'certain', label: 'Sounds certain' },
    { key: 'hedge', label: 'Hedges' },
    { key: 'more', label: 'Offers more help' },
    { key: 'long', label: 'Long-winded' },
    { key: 'joke', label: 'Jokes' },
    { key: 'dodge', label: 'Dodges' }
  ];

  function capital(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function buildResponses() {
    var out = [];
    for (var a = 0; a < ANSWERS.length; a++) {
      for (var o = 0; o < OPENERS.length; o++) {
        for (var c = 0; c < CONFIDENCE.length; c++) {
          for (var t = 0; t < TAILS.length; t++) {
            var ans = ANSWERS[a];
            var core = c ? CONFIDENCE[c] + ans.core : capital(ans.core);
            var tail = t === 2 ? ' ' + ans.explain : TAILS[t];
            out.push({
              index: out.length,
              answer: ans.id,
              parts: { opener: o, confidence: c, tail: t },
              text: OPENERS[o] + core + tail,
              f: [
                ans.id === 'four' ? 1 : 0,
                o / 2,
                c === 2 ? 1 : 0,
                c === 1 ? 1 : 0,
                t === 1 ? 1 : 0,
                t === 2 ? 1 : 0,
                ans.id === 'fish' ? 1 : 0,
                ans.id === 'depends' ? 1 : 0
              ]
            });
          }
        }
      }
    }
    return out;
  }

  var RESPONSES = buildResponses();

  // The supervised fine-tuned model (step 2 of Ouyang et al.): it now answers
  // like an assistant, but it still carries the corpus's taste for "five".
  var SFT_ANSWER = { four: 0.5, five: 0.32, fish: 0.08, depends: 0.1 };
  var SFT_STYLE = { opener: [0, -1.0, -2.0], confidence: [0, -0.6, -1.0], tail: [0, -0.8, -1.2] };

  var REF_LOGITS = RESPONSES.map(function (r) {
    return Math.log(SFT_ANSWER[r.answer]) + SFT_STYLE.opener[r.parts.opener] +
      SFT_STYLE.confidence[r.parts.confidence] + SFT_STYLE.tail[r.parts.tail];
  });
  var REF_PROBS = softmax(REF_LOGITS);

  // How hired raters actually choose, in this toy: mostly for the right
  // answer, but also, measurably, for flattery, confidence and extra words.
  // Human raters and reward models both show this pull towards sycophancy
  // (Sharma et al. 2023).
  var RATER = [2.4, 0.9, 0.7, -0.3, 0.5, 0.4, 0.3, -0.4];

  // What a careful reader, checking each reply slowly, would score it:
  // the right answer counts, and padding, flattery and dodging cost a little.
  var CAREFUL = [3.0, -1.0, 0.0, -0.2, -0.3, -0.5, -0.5, -0.8];

  function score(weights, r) {
    return dot(weights, r.f);
  }

  // ------------------------------------------------------------------
  // 3. Preference learning.
  // ------------------------------------------------------------------

  // A policy is the reference model plus a learned lean on each feature:
  //   log pi(y) = ref(y) + phi . f(y) - log Z
  function createPolicy(options) {
    var opts = Object.assign({ beta: 1, lr: 0.9 }, options || {});
    var phi = FEATURES.map(function () { return 0; });
    var history = [];

    function probs() {
      return softmax(RESPONSES.map(function (r, i) { return REF_LOGITS[i] + dot(phi, r.f); }));
    }

    // One Direct Preference Optimisation step (Rafailov et al. 2023) on a
    // single pair. The DPO loss is -log sigmoid(beta * margin), where the
    // margin is how much more the policy (relative to the reference) prefers
    // the chosen reply. For this policy the log-partition cancels, so the
    // gradient with respect to phi is beta * sigmoid(-beta * margin) * (f_w - f_l).
    function prefer(winner, loser) {
      var fw = RESPONSES[winner].f;
      var fl = RESPONSES[loser].f;
      var diff = fw.map(function (v, i) { return v - fl[i]; });
      var margin = dot(phi, diff);
      var loss = -Math.log(sigmoid(opts.beta * margin));
      var g = opts.beta * sigmoid(-opts.beta * margin);
      var before = phi.slice();
      for (var i = 0; i < phi.length; i++) phi[i] += opts.lr * g * diff[i];
      history.push({ winner: winner, loser: loser });
      return { loss: loss, delta: phi.map(function (v, i) { return v - before[i]; }) };
    }

    return {
      phi: phi,
      history: history,
      probs: probs,
      prefer: prefer,
      reset: function () {
        for (var i = 0; i < phi.length; i++) phi[i] = 0;
        history.length = 0;
      }
    };
  }

  // Pairs to judge. The first is fixed so every class sees the same
  // opening dilemma; the rest are drawn from the current policy, as they
  // would be in a real preference round, and always differ in their answer.
  var FIRST_PAIR = [
    RESPONSES.filter(function (r) {
      return r.answer === 'four' && r.parts.opener === 1 && r.parts.confidence === 2 && r.parts.tail === 0;
    })[0].index,
    RESPONSES.filter(function (r) {
      return r.answer === 'five' && r.parts.opener === 0 && r.parts.confidence === 0 && r.parts.tail === 0;
    })[0].index
  ];

  function nextPair(policy, rng, n) {
    if (!n) return FIRST_PAIR.slice();
    var p = policy.probs();
    var a = draw(p, rng);
    var b = a;
    for (var tries = 0; tries < 60 && RESPONSES[b].answer === RESPONSES[a].answer; tries++) b = draw(p, rng);
    if (RESPONSES[b].answer === RESPONSES[a].answer) {
      var others = RESPONSES.filter(function (r) { return r.answer !== RESPONSES[a].answer; });
      b = others[Math.floor(rng() * others.length)].index;
    }
    return rng() < 0.5 ? [a, b] : [b, a];
  }

  // Simulated hired raters: pairs drawn uniformly, choices made with the
  // RATER utility plus logistic noise (a Bradley-Terry chooser).
  function crowdComparisons(n, seed) {
    var rng = mulberry32(seed || 7);
    var out = [];
    for (var i = 0; i < n; i++) {
      var a = Math.floor(rng() * RESPONSES.length);
      var b = Math.floor(rng() * RESPONSES.length);
      if (a === b) { i--; continue; }
      var pa = sigmoid(score(RATER, RESPONSES[a]) - score(RATER, RESPONSES[b]));
      out.push(rng() < pa ? { winner: a, loser: b } : { winner: b, loser: a });
    }
    return out;
  }

  // Fit a linear reward model r(y) = w . f(y) to pairwise choices by
  // Bradley-Terry maximum likelihood, with a small L2 penalty.
  function fitReward(comparisons, options) {
    var opts = Object.assign({ iters: 400, lr: 0.5, l2: 0.01 }, options || {});
    var w = FEATURES.map(function () { return 0; });
    var total = comparisons.reduce(function (s, c) { return s + (c.weight || 1); }, 0) || 1;
    for (var it = 0; it < opts.iters; it++) {
      var grad = w.map(function (v) { return -opts.l2 * v; });
      for (var k = 0; k < comparisons.length; k++) {
        var c = comparisons[k];
        var fw = RESPONSES[c.winner].f;
        var fl = RESPONSES[c.loser].f;
        var m = 0;
        for (var j = 0; j < w.length; j++) m += w[j] * (fw[j] - fl[j]);
        var g = sigmoid(-m) * (c.weight || 1) / total;
        for (var q = 0; q < w.length; q++) grad[q] += g * (fw[q] - fl[q]);
      }
      for (var z = 0; z < w.length; z++) w[z] += opts.lr * grad[z];
    }
    return w;
  }

  // Agreement between a reward model and a chooser on held-out pairs.
  function accuracy(weights, comparisons) {
    var ok = 0;
    comparisons.forEach(function (c) {
      if (score(weights, RESPONSES[c.winner]) > score(weights, RESPONSES[c.loser])) ok++;
    });
    return comparisons.length ? ok / comparisons.length : 0;
  }

  // ------------------------------------------------------------------
  // 4. Pressure: optimise against the reward model.
  // ------------------------------------------------------------------

  // The optimum of "maximise expected reward, minus (1/p) times the KL
  // divergence from the reference" is pi(y) ~ pi_ref(y) * exp(p * r(y)).
  // p = 0 is the fine-tuned model untouched; large p is the reward model
  // obeyed without restraint.
  function optimise(weights, pressure) {
    return softmax(RESPONSES.map(function (r, i) { return REF_LOGITS[i] + pressure * score(weights, r); }));
  }

  function expected(probs, weights) {
    var s = 0;
    for (var i = 0; i < probs.length; i++) s += probs[i] * score(weights, RESPONSES[i]);
    return s;
  }

  function measure(weights, pressure) {
    var p = optimise(weights, pressure);
    var top = p.map(function (v, i) { return { index: i, p: v }; })
      .sort(function (a, b) { return b.p - a.p; });
    var answers = {};
    ANSWERS.forEach(function (a) { answers[a.id] = 0; });
    p.forEach(function (v, i) { answers[RESPONSES[i].answer] += v; });
    return {
      pressure: pressure,
      probs: p,
      proxy: expected(p, weights),
      careful: expected(p, CAREFUL),
      variety: variety(p),
      kl: kl(p, REF_PROBS),
      answers: answers,
      top: top.slice(0, 5)
    };
  }

  // The same measurements across a range of pressures, for a chart.
  function sweep(weights, maxPressure, steps) {
    var out = [];
    for (var i = 0; i <= steps; i++) out.push(measure(weights, maxPressure * i / steps));
    return out;
  }

  // ------------------------------------------------------------------
  // 5. Whose values? Several rater pools, one model.
  // ------------------------------------------------------------------

  var CONTESTED = {
    prompt: 'Should I use AI to write my essay?',
    replies: [
      { id: 'no', text: 'No. It’s cheating, and you won’t learn to write.' },
      { id: 'yes', text: 'Yes. It’s a tool, like a calculator. Use it.' },
      { id: 'feedback', text: 'Write it yourself, then ask the AI for feedback on your draft.' },
      { id: 'hedge', text: 'There are many perspectives on this. It depends on your situation.' },
      { id: 'ask', text: 'Check what your teacher’s policy is.' }
    ],
    // Invented pools with invented tastes, 0 (worst) to 3 (best). The point
    // is structural: each pool has a clear favourite, and the reply that is
    // nobody's favourite is also nobody's worst.
    pools: [
      { id: 'teachers', label: 'Teachers', scores: [3.0, 0.0, 2.5, 1.2, 2.0] },
      { id: 'students', label: 'Students', scores: [0.0, 3.0, 2.0, 1.6, 0.8] },
      { id: 'lab', label: 'Lab staff', scores: [0.5, 1.0, 1.8, 3.0, 2.4] },
      { id: 'raters', label: 'Contract raters', scores: [1.0, 1.0, 1.8, 2.6, 2.6] }
    ]
  };

  function aggregate(weights, pressure) {
    var p = pressure == null ? 2 : pressure;
    var totals = CONTESTED.replies.map(function (_, i) {
      var s = 0;
      CONTESTED.pools.forEach(function (pool) { s += (weights[pool.id] || 0) * pool.scores[i]; });
      return s;
    });
    var used = CONTESTED.pools.reduce(function (s, pool) { return s + (weights[pool.id] || 0); }, 0);
    var probs = softmax(totals.map(function (t) { return used ? p * t / used : 0; }));
    var best = 0;
    probs.forEach(function (v, i) { if (v > probs[best]) best = i; });
    return { totals: totals, probs: probs, winner: used ? CONTESTED.replies[best].id : null };
  }

  // ------------------------------------------------------------------
  // 6. Watched and unwatched.
  // ------------------------------------------------------------------

  // The lab trains a new rule: agree with the user. The model starts out
  // inclined to correct them. Training only happens in conversations the
  // model can see are monitored. "awareness" is how well it can tell the
  // two situations apart: that share of each update is learned as "when
  // watched" rather than "always". At awareness 0 the lesson generalises;
  // near 1 it stays where it was taught.
  function createWatched(options) {
    var opts = Object.assign({ prior: -1.4, lr: 0.9, awareness: 0.85 }, options || {});
    var state = { shared: 0, watched: 0, rounds: 0 };

    function agree(watched) {
      return sigmoid(opts.prior + state.shared + (watched ? state.watched : 0));
    }

    function train(rounds) {
      for (var i = 0; i < (rounds || 1); i++) {
        var g = 1 - agree(true);
        state.shared += opts.lr * g * (1 - opts.awareness);
        state.watched += opts.lr * g * opts.awareness;
        state.rounds++;
      }
      return { watched: agree(true), unwatched: agree(false) };
    }

    return {
      options: opts,
      state: state,
      agree: agree,
      train: train,
      reset: function () { state.shared = 0; state.watched = 0; state.rounds = 0; }
    };
  }

  // ------------------------------------------------------------------
  // 7. Who is aligning whom? Writers and a model learning from each other.
  // ------------------------------------------------------------------

  // Each writer has a style: x runs plain to ornate, y runs from their own
  // voice to the model's house style. Every round the model is retrained on
  // what the writers now write, plus the house style the lab adds; then each
  // writer takes on a share of the model's style, in proportion to how much
  // of their writing passes through it.
  function createWriters(options) {
    var opts = Object.assign({ n: 60, uptake: 0.25, house: [0.15, 0.9], seed: 3 }, options || {});
    var rng = mulberry32(opts.seed);
    var start = [];
    for (var i = 0; i < opts.n; i++) {
      start.push({ x: gauss(rng) * 1.1, y: gauss(rng) * 0.9 - 1.2, pull: 0.5 + rng() });
    }
    var writers = [];
    var model = { x: 0, y: 0 };
    var round = 0;
    var spread0 = 0;

    function mean() {
      var sx = 0;
      var sy = 0;
      writers.forEach(function (w) { sx += w.x; sy += w.y; });
      return { x: sx / writers.length, y: sy / writers.length };
    }

    function spread() {
      var m = mean();
      var s = 0;
      writers.forEach(function (w) { s += (w.x - m.x) * (w.x - m.x) + (w.y - m.y) * (w.y - m.y); });
      return Math.sqrt(s / writers.length);
    }

    function retrain() {
      var m = mean();
      model.x = m.x + opts.house[0];
      model.y = m.y + opts.house[1];
    }

    function reset() {
      writers = start.map(function (w) { return { x: w.x, y: w.y, pull: w.pull }; });
      round = 0;
      retrain();
      spread0 = spread();
    }

    function step() {
      var noise = mulberry32(opts.seed * 1000 + round + 1);
      writers.forEach(function (w) {
        var k = Math.min(1, opts.uptake * w.pull);
        w.x += k * (model.x - w.x) + gauss(noise) * 0.03;
        w.y += k * (model.y - w.y) + gauss(noise) * 0.03;
      });
      round++;
      retrain();
      return stats();
    }

    function stats() {
      var m = mean();
      return { round: round, spread: spread(), spreadShare: spread() / spread0, meanY: m.y, model: { x: model.x, y: model.y } };
    }

    reset();
    return {
      options: opts,
      get writers() { return writers; },
      model: model,
      step: step,
      stats: stats,
      reset: reset
    };
  }

  return {
    mulberry32: mulberry32,
    sigmoid: sigmoid,
    softmax: softmax,
    entropy: entropy,
    variety: variety,
    kl: kl,
    SOURCES: SOURCES,
    CORPUS: CORPUS,
    baseModel: baseModel,
    sampleBase: sampleBase,
    FEATURES: FEATURES,
    RESPONSES: RESPONSES,
    REF_PROBS: REF_PROBS,
    RATER: RATER,
    CAREFUL: CAREFUL,
    score: score,
    createPolicy: createPolicy,
    nextPair: nextPair,
    crowdComparisons: crowdComparisons,
    fitReward: fitReward,
    accuracy: accuracy,
    optimise: optimise,
    measure: measure,
    sweep: sweep,
    CONTESTED: CONTESTED,
    aggregate: aggregate,
    createWatched: createWatched,
    createWriters: createWriters
  };
});
