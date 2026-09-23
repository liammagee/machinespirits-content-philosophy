---
title: "Module 2: Building interactive web pages"
week: 2
course: "build-lab"
---

**Time:** about two hours. **You will make:** one HTML file with a slider, a drawing surface and a loop, served from your own machine and committed to the repository from module 1.

## Why a web page

A web page is the most portable interactive thing you can make. It needs no installation, runs on a phone, and can be sent as a link. For research it is the genre Bret Victor called the explorable explanation: a text where the reader can change the numbers and see the argument respond (Victor 2011). Vi Hart and Nicky Case's *Parable of the Polygons* is the best-known example, and it is a Schelling model, the one you will build in module 3 (Hart and Case 2014).

You do not need a framework, a build step, or a package manager. One file is enough for this lab, and one file is easier to reason about, to test, and to hand to an assistant.

## Three languages, three jobs

A page is written in three languages that do different jobs.

| Language | Job | In our page |
|---|---|---|
| HTML | Structure: what is on the page | A heading, a slider, a canvas, a button |
| CSS | Appearance: how it looks | Colours, spacing, layout on small screens |
| JavaScript | Behaviour: what happens when | Read the slider, draw the grid, run the loop |

Keep them in that order in your head. When something is wrong, ask which job failed. A missing control is HTML. A control in the wrong place is CSS. A control that does nothing is JavaScript.

## Hands-on: a page that responds

Replace the empty `index.html` from module 1 with this. Read it once before you paste it.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Build Lab</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 640px; margin: 24px auto; padding: 0 16px; }
    canvas { display: block; width: 100%; aspect-ratio: 1; border: 1px solid #ccc; }
    label { display: block; margin: 12px 0; }
  </style>
</head>
<body>
  <h1>A grid that listens</h1>
  <label>
    Cells per side: <output id="n-out">20</output>
    <input id="n" type="range" min="5" max="60" value="20">
  </label>
  <button id="shuffle" type="button">Shuffle</button>
  <canvas id="grid"></canvas>

  <script>
    const canvas = document.getElementById('grid');
    const slider = document.getElementById('n');
    const readout = document.getElementById('n-out');
    let cells = [];

    function shuffle() {
      const n = Number(slider.value);
      cells = Array.from({ length: n * n }, () => Math.random() < 0.5 ? 1 : 2);
      draw();
    }

    function draw() {
      const n = Number(slider.value);
      const size = canvas.clientWidth;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      const cell = size / n;
      cells.forEach((v, i) => {
        ctx.fillStyle = v === 1 ? '#2a78d6' : '#eb6834';
        ctx.fillRect((i % n) * cell, Math.floor(i / n) * cell, cell - 1, cell - 1);
      });
    }

    slider.addEventListener('input', () => { readout.textContent = slider.value; shuffle(); });
    document.getElementById('shuffle').addEventListener('click', shuffle);
    window.addEventListener('resize', draw);
    shuffle();
  </script>
</body>
</html>
```

What each part does.

- The `<meta name="viewport">` line makes the page lay out for a phone instead of pretending to be a desktop.
- `<input type="range">` is the slider. `<output>` shows its value. Both are labelled, so a screen reader can name them.
- `<canvas>` is a drawing surface. JavaScript paints on it with a **context**, here `ctx`.
- The state of the page is one array, `cells`. Every function reads from it or writes to it. Keeping state in one place is the habit that makes the model in module 3 testable.
- `addEventListener` connects an event (the slider moving, the button clicked) to a function. This is the whole of interactivity: events call functions, functions change state, one function draws the state.

## Serve it

Opening the file directly works for this page, but as soon as you split code into several files the browser will refuse to load them from `file://`. So serve the folder from the start:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`. Leave the server running in one terminal window and edit in another. Reload the page after each change.

Commit:

```bash
git add index.html
git commit -m "Add a page with a slider and a canvas grid"
```

## The console is your friend

Every browser has developer tools. Open them with F12, or Cmd-Option-I on a Mac. Three panels matter.

- **Console** shows errors and anything you print with `console.log(...)`. When a control does nothing, look here first. A red line names the file and the line number.
- **Elements** shows the page as the browser understands it. Click an element to see its CSS.
- **Network** shows every file the page asked for and whether it arrived. A 404 here means a wrong path.

Try it: change `getElementById('grid')` to `getElementById('grd')`, reload, and read the error. Then put it back.

## Animation: a loop

The simulation in module 3 needs the page to do something every few milliseconds. Two ways.

```js
// Fixed rate: eight times a second. Simple and enough for a model.
const timer = setInterval(step, 125);
clearInterval(timer); // to stop

// Display rate: once per screen refresh. For smooth motion.
function frame() { step(); requestAnimationFrame(frame); }
requestAnimationFrame(frame);
```

Use `setInterval` for a model, because you want to control the number of steps per second, not draw as fast as the screen allows.

## Small screens and other readers

- Test the page at phone width. Drag the browser window narrow, or use the device toolbar in the developer tools. Nothing should scroll sideways.
- Give every control a label. Do not rely on colour alone to carry meaning. The reference simulation marks unhappy agents with a hole in the cell as well as a colour for this reason.
- Buttons should be at least 44 pixels tall so they can be tapped.

## Working with an AI assistant

Pages are where vibe coding shines and where it bites. The assistant can produce a working page from one sentence. It will also happily add a framework, a build step and six files you did not ask for. Set constraints in the request.

A request that works:

> One HTML file, no frameworks, no build step. A slider that sets the number of cells per side, a canvas that draws a random two-colour grid, a Shuffle button. Explain any line I would not understand.

Then, in order: run it, open the console, read the diff, commit. If the assistant's page does more than you asked, ask it to remove the extra. If it does something you do not understand, ask it to explain, and if the explanation does not convince you, ask for a simpler version. You are the one who has to maintain this.

## Exercise

1. Build the page above, serve it, commit it.
2. Add a second slider that controls the share of cells in the first colour. Wire it up. Commit.
3. Add a "Step" button that repaints one random cell in the other colour. Then add a "Run" button that does this eight times a second and a "Pause" that stops it. Commit each.
4. Break it in the console on purpose and fix it.
5. Push. Send yourself the link to the GitHub file and check it is the version you think it is.

## Reading

- MDN Web Docs. "Learn web development", the HTML, CSS and JavaScript first steps. developer.mozilla.org.
- MDN Web Docs. "Canvas tutorial".
- Victor, B. (2011). Explorable explanations. worrydream.com/ExplorableExplanations.
- Hart, V. and Case, N. (2014). Parable of the polygons. ncase.me/polygons.
