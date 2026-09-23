/*
 * Schelling segregation model.
 *
 * One file, no dependencies. It runs in the browser (as window.Schelling)
 * and in Node (as module.exports), so the same code can be drawn on a page
 * and checked by a test harness.
 *
 * Every random choice goes through a seeded generator. Two models built
 * with the same options produce exactly the same run.
 *
 *   const model = Schelling.createModel({ size: 50, density: 0.9, threshold: 0.5, seed: 1 });
 *   model.step();          // move every agent that was unhappy at the start of the step
 *   model.stats();         // { step, agents, unhappy, unhappyShare, meanSimilarity, moved }
 *   model.grid[i];         // 0 empty, 1 group A, 2 group B (row-major, size * size)
 *   model.options.threshold = 0.7;   // may be changed between steps
 *   model.reset();         // same seed, same starting grid
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.Schelling = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var EMPTY = 0;
  var A = 1;
  var B = 2;

  // mulberry32: a small seeded pseudo-random generator. Returns a function
  // that yields numbers in [0, 1). Same seed, same sequence, in every engine.
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

  // Fisher-Yates shuffle in place, using the model's generator.
  function shuffle(list, rng) {
    for (var i = list.length - 1; i > 0; i--) {
      var j = Math.floor(rng() * (i + 1));
      var tmp = list[i];
      list[i] = list[j];
      list[j] = tmp;
    }
    return list;
  }

  function createModel(options) {
    var opts = Object.assign({ size: 50, density: 0.9, threshold: 0.5, seed: 1 }, options || {});
    if (!(opts.size >= 2)) throw new Error('size must be at least 2');
    if (!(opts.density >= 0 && opts.density <= 1)) throw new Error('density must be between 0 and 1');
    if (!(opts.threshold >= 0 && opts.threshold <= 1)) throw new Error('threshold must be between 0 and 1');

    var size = opts.size;
    var cells = size * size;
    var grid = new Uint8Array(cells);
    var rng = null;
    var stepCount = 0;
    var moved = 0;

    // Share of an agent's occupied neighbours (Moore neighbourhood, up to 8,
    // no wrap-around at the edges) that belong to the same group. An agent
    // with no neighbours at all counts as fully satisfied.
    function similarity(i) {
      var me = grid[i];
      var same = 0;
      var occupied = 0;
      var x = i % size;
      var y = (i - x) / size;
      for (var dy = -1; dy <= 1; dy++) {
        for (var dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          var nx = x + dx;
          var ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= size || ny >= size) continue;
          var v = grid[ny * size + nx];
          if (v === EMPTY) continue;
          occupied++;
          if (v === me) same++;
        }
      }
      return occupied === 0 ? 1 : same / occupied;
    }

    function isUnhappy(i) {
      return grid[i] !== EMPTY && similarity(i) < opts.threshold;
    }

    // Fill the grid from the seed. Each cell is occupied with probability
    // `density`; occupants are assigned to A or B with equal chance.
    function reset() {
      rng = mulberry32(opts.seed);
      stepCount = 0;
      moved = 0;
      for (var i = 0; i < cells; i++) {
        if (rng() < opts.density) {
          grid[i] = rng() < 0.5 ? A : B;
        } else {
          grid[i] = EMPTY;
        }
      }
    }

    // One round. Every agent that is unhappy at the start of the round moves
    // to a random empty cell, in random order. The cell it leaves becomes
    // available to agents later in the same round. Returns how many moved.
    function step() {
      var unhappy = [];
      var empty = [];
      for (var i = 0; i < cells; i++) {
        if (grid[i] === EMPTY) empty.push(i);
        else if (isUnhappy(i)) unhappy.push(i);
      }
      shuffle(unhappy, rng);
      moved = 0;
      for (var u = 0; u < unhappy.length; u++) {
        if (empty.length === 0) break;
        var from = unhappy[u];
        var k = Math.floor(rng() * empty.length);
        var to = empty[k];
        grid[to] = grid[from];
        grid[from] = EMPTY;
        empty[k] = from;
        moved++;
      }
      stepCount++;
      return moved;
    }

    function stats() {
      var agents = 0;
      var unhappy = 0;
      var simSum = 0;
      for (var i = 0; i < cells; i++) {
        if (grid[i] === EMPTY) continue;
        agents++;
        var s = similarity(i);
        simSum += s;
        if (s < opts.threshold) unhappy++;
      }
      return {
        step: stepCount,
        agents: agents,
        unhappy: unhappy,
        unhappyShare: agents ? unhappy / agents : 0,
        meanSimilarity: agents ? simSum / agents : 0,
        moved: moved
      };
    }

    reset();

    return {
      size: size,
      grid: grid,
      options: opts,
      EMPTY: EMPTY,
      A: A,
      B: B,
      reset: reset,
      step: step,
      stats: stats,
      similarity: similarity,
      isUnhappy: isUnhappy
    };
  }

  return { createModel: createModel, mulberry32: mulberry32, EMPTY: EMPTY, A: A, B: B };
});
