---
title: "Module 3: Interactive simulations, agent-based models"
week: 3
course: "build-lab"
artifacts:
  - slug: schelling-abm
    title: "Schelling segregation model: a playable agent-based model"
    position: after-content
---

**Time:** about three hours. **You will make:** a Schelling segregation model in its own JavaScript file, drawn by the page from module 2, with a seed so that every run can be repeated. The finished reference version is embedded at the end of this page.

## What an agent-based model is

An agent-based model has three parts. **Agents** are individuals with a state. **Rules** say how each agent acts given what it can see. An **environment** holds the agents, usually a grid or a network. Nothing in the model describes the whole. You describe individuals, run the clock, and watch what the whole does. When the whole shows a pattern nobody wrote down, the pattern is called **emergent**.

Thomas Schelling's segregation model is the canonical example (Schelling 1971). Two groups live on a grid. Each agent wants some share of its neighbours to be like itself, say a third. Anyone below that share moves. Schelling ran it with coins on a chessboard and found that a mild preference produces sharp segregation. No agent wants a segregated city. The city segregates anyway.

Epstein and Axtell's *Sugarscape* extended the method to trade, culture and disease (Epstein and Axtell 1996). Macy and Willer surveyed its use in sociology under the title "From factors to actors" (Macy and Willer 2002). Wilensky and Rand's textbook is the standard introduction and uses NetLogo, which you should look at once (Wilensky and Rand 2015). Park and colleagues' generative agents replaced the rules with a language model, so that each agent plans in words (Park et al. 2023). That is where this field is heading, and module 5 borrows from it.

## The model, exactly

Write the rules before the code. If you cannot state a rule in one sentence, you cannot test it in module 4.

1. Each cell is empty or holds one agent of group A or group B. The start is random, set by a seed. Each cell is filled with probability `density`; a filled cell is A or B with equal chance.
2. An agent's neighbours are the up to eight cells around it. Empty cells do not count. An agent with no neighbours counts as content.
3. An agent is **unhappy** when the share of similar neighbours is below `threshold`.
4. Each **step**, every agent that was unhappy at the start of the step moves, in random order, to a random empty cell. The cell it leaves becomes empty at once.
5. Two readings: the mean share of similar neighbours over all agents, and the share of agents that are unhappy.

Two of these are choices, not facts. Rule 2 uses eight neighbours and no wrap-around at the edges. Rule 4 moves agents to a random empty cell rather than the nearest satisfactory one, which is what Schelling did by hand. Different choices give different pictures. Write yours down.

## Two files, not one

The page from module 2 mixed state, rules and drawing. Now split them.

- `model.js` holds the rules. It knows nothing about canvases, sliders or browsers.
- `index.html` holds the view. It creates a model, calls `step()`, reads `stats()`, and draws.

The reason is module 4. Rules that live in their own file can be run in Node without a browser, a hundred times a second, by a test. Rules that live inside a click handler cannot.

The interface is small:

```js
const model = Schelling.createModel({ size: 50, density: 0.9, threshold: 0.5, seed: 1 });
model.step();                 // move everyone who was unhappy; returns how many moved
model.stats();                // { step, agents, unhappy, unhappyShare, meanSimilarity, moved }
model.grid[i];                // 0 empty, 1 group A, 2 group B; row-major, size * size
model.options.threshold = 0.7;   // the page changes this live from the slider
model.reset();                // same seed, same start
```

## Randomness you can repeat

`Math.random()` gives a different sequence every time. That is fine for a game and fatal for a model, because a bug seen once cannot be seen again, and two readers of your paper cannot get the same figure. Use a seeded generator. This one is mulberry32, a few lines that produce the same sequence for the same seed in every JavaScript engine:

```js
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
```

Every random choice in the model, filling the grid, shuffling the unhappy agents, picking a target cell, must go through `rng()`. One stray `Math.random()` anywhere breaks the guarantee.

## The core of the model

Here is the similarity rule and the step rule from the reference file. Read them against the five rules above.

```js
function similarity(i) {
  var me = grid[i], same = 0, occupied = 0;
  var x = i % size, y = (i - x) / size;
  for (var dy = -1; dy <= 1; dy++) {
    for (var dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      var nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= size || ny >= size) continue;
      var v = grid[ny * size + nx];
      if (v === EMPTY) continue;
      occupied++;
      if (v === me) same++;
    }
  }
  return occupied === 0 ? 1 : same / occupied;
}

function step() {
  var unhappy = [], empty = [];
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
    empty[k] = from;       // the vacated cell joins the pool
    moved++;
  }
  stepCount++;
  return moved;
}
```

The grid is a `Uint8Array`, one byte per cell. For a 50 by 50 grid that is 2,500 bytes, and a step touches each cell a handful of times. The browser can do hundreds of steps a second. Speed is not the problem in this lab. Clarity is.

The full file is `artifacts/schelling-assets/model.js` in this site's content repository. It is wrapped so that the same code loads in the browser as `window.Schelling` and in Node with `require`. Copy it, or write your own to the same interface.

## The view

The page does four things: build a model from the controls, draw the grid, draw the chart, and run the loop.

```js
function drawGrid() {
  var n = model.size, cell = canvas.clientWidth / n;
  for (var i = 0; i < n * n; i++) {
    var v = model.grid[i];
    ctx.fillStyle = v === 0 ? EMPTY_COLOUR : (v === 1 ? COLOUR_A : COLOUR_B);
    ctx.fillRect((i % n) * cell, Math.floor(i / n) * cell, cell - 1, cell - 1);
    if (v !== 0 && model.similarity(i) < model.options.threshold) {
      // a hole in the middle marks an unhappy agent, so the mark does not depend on colour
      ctx.fillStyle = SURFACE_COLOUR;
      ctx.fillRect((i % n) * cell + cell * 0.32, Math.floor(i / n) * cell + cell * 0.32, cell * 0.36, cell * 0.36);
    }
  }
}

function doStep() {
  var moved = model.step();
  history.push(model.stats());
  drawGrid(); drawChart();
  if (moved === 0) stop();      // settled: nobody wants to move
}
```

The threshold slider changes `model.options.threshold` live and redraws without resetting. Density, size and seed rebuild the model, because they change the starting grid.

The reference page is embedded below and is also at `/content/artifacts/schelling-abm.html`. Run it before you build yours, so you know what "done" looks like.

## What to look for

Work through the five prompts under the simulation. Then answer these in your README.

1. At what threshold does the "similar neighbours" reading settle above 80 percent? Is that threshold above or below 50 percent?
2. Does the model always settle? Try 80 percent. What happens to the number of moves per step, and why?
3. Fix the seed and vary only the density from 60 to 98 percent. Describe the effect in one sentence.
4. Which of your answers change when you change the seed? Those are the ones that need many runs before you write them down.

Schelling's claim was that a mild preference is enough. Your model should reproduce that. If it does not, either your rules differ from his in a way that matters, or there is a bug. Module 4 will help you tell which.

## Extending it

Each of these is an afternoon. Pick one for the exercise.

- **A third group.** What changes when the agents are not a binary?
- **Different neighbourhoods.** Four neighbours instead of eight. A radius of two. A torus, where the edges wrap.
- **Different moves.** Move to the nearest cell that would make the agent content, as Schelling did. Or let the agent stay if no such cell exists.
- **Unequal groups.** Seventy percent A, thirty percent B. Who ends up more segregated?
- **A cost to moving.** An agent moves only if it has been unhappy for three steps.
- **Agents that talk.** Replace the rule with a call to a language model that is given the neighbourhood and asked whether to move. This is what generative agents do. It is slow and costs money per step, so try it on a ten by ten grid. Module 5 shows the API call.

## Working with an AI assistant

The model is the one part of this project where you must be able to read every line. Ask the assistant to write it, but write the five rules first and give them as the specification. Then read the code against the rules. The two places assistants most often drift are the neighbourhood (they wrap edges without being asked) and the move rule (they re-check happiness before moving, or move to the nearest satisfying cell, without saying so). Neither is wrong. Both change the results, and both must be in your written rules if they are in your code.

Ask for the seeded generator by name. Ask for the model in its own file with no reference to `document` or `window`. Ask for `Math.random` to appear nowhere.

## Exercise

1. Write the five rules for your model in the README. Commit.
2. Build `model.js` to the interface above. Commit.
3. Change `index.html` to draw the model, with a threshold slider, Step, Run and Reset. Commit.
4. Reproduce Schelling's result and record the threshold at which it appears, for three seeds. Commit the numbers in the README.
5. Pick one extension, build it on a branch, and write one paragraph on what changed. Merge it.

## Reading

- Schelling, T. C. (1971). Dynamic models of segregation. *Journal of Mathematical Sociology* 1(2), 143–186.
- Schelling, T. C. (1978). *Micromotives and Macrobehavior*. Norton. Chapter 4 is the readable version.
- Epstein, J. M. and Axtell, R. (1996). *Growing Artificial Societies: Social Science from the Bottom Up*. MIT Press.
- Macy, M. W. and Willer, R. (2002). From factors to actors: Computational sociology and agent-based modeling. *Annual Review of Sociology* 28, 143–166.
- Wilensky, U. and Rand, W. (2015). *An Introduction to Agent-Based Modeling*. MIT Press.
- Park, J. S., O'Brien, J. C., Cai, C. J., Morris, M. R., Liang, P. and Bernstein, M. S. (2023). Generative agents: Interactive simulacra of human behavior. *UIST '23*.
- Hart, V. and Case, N. (2014). Parable of the polygons. ncase.me/polygons.
