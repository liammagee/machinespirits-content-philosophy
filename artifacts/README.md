# Artifacts

Self-contained HTML/JS/CSS files (Claude artifacts, interactive demos, explorations) that can be hosted on the Machine Spirits site and optionally embedded within course lectures.

## Quick Start

### 1. Add an artifact

Drop an HTML file here with `<meta>` tags in the `<head>`:

```html
<meta name="artifact-title" content="My Demo">
<meta name="artifact-description" content="What it does">
<meta name="artifact-tags" content="tag1,tag2,tag3">
<meta name="artifact-author" content="Claude">
<meta name="artifact-date" content="2026-03-15">
<meta name="artifact-course" content="479">        <!-- optional: link to course -->
<meta name="artifact-lecture" content="lecture-3">  <!-- optional: link to lecture -->
```

### 2. Link to a lecture (optional)

In the lecture's YAML frontmatter:

```yaml
artifacts:
  - slug: my-demo
    title: "My Demo"
    position: after-content   # before-content | after-content
```

Or inline in the lecture markdown:

```markdown
::artifact[my-demo]
```

### 3. Publish

```bash
cd ~/Dev/machinespirits/machinespirits-content-philosophy
./publish "Add my-demo artifact"
```

`./publish` runs `./artifacts-index` to refresh `artifacts/index.json` and pushes. The live site picks up changes on the next content-repo deploy (~3-5 min). **No website-repo changes needed.**

## How it works

1. `./artifacts-index` scans `artifacts/*.html`, extracts `<meta>` tags, and writes `artifacts/index.json` (committed to the content repo)
2. The website mounts `artifacts/` at `/content/artifacts/` via `express.static` — same pattern as `articles/` and `courses/`
3. `routes/artifactRoutes.js` (`/api/artifacts`) reads `index.json` directly from the content package
4. The gallery at `/#/artifacts` calls `/api/artifacts` and renders cards from the index
5. Lectures with `artifacts:` frontmatter render embedded iframes pointing at `/content/artifacts/<slug>.html`

## Access points

| URL | What |
|-----|------|
| `/#/artifacts` | Gallery (browse all) |
| `/#/artifact/<slug>` | Viewer (single artifact in iframe) |
| `/content/artifacts/<slug>.html` | Direct/standalone (shareable) |
| Within a lecture | Embedded iframe with fullscreen toggle |

## Existing artifacts

- `anthropic-reading-list.html` — Reading tracker for Anthropic alignment papers
- `design-audit-playground.html` — Colour palette, typography, spacing tokens, WCAG contrast matrix
- `hegel-recognition-explorer.html` — Interactive master-slave dialectic (linked to course 479, lecture 3)
- `warpstrike-60.html` — Wrapper iframing the Warpstrike 60 game (deployed at warpstrike-60.fly.dev)

- `spotlight-attention-game.html` — Spotlight: attention in machines, readers and society (EPOL 479, lecture 4), composed as **ten guided chapters** with a chapter rail (a sticky contents bar on phones). Every chapter has the same shape: a one-minute primer that names its paper, a “What to do” list naming the buttons to press, the activity, an optional “Go deeper”, and a one-sentence take-away with a Next button. Part I, the machine (Vaswani et al. 2017): the paper and the formula in four steps with a next-word animation; query, key and value from embedding, position and learned tables; the six original puzzles; training versus inference with a real gradient step; and an optional eight-head numerical inspector. Part II, the reader (Petersen & Posner 2012): three attention systems on a Three.js cortical surface. Part III: the same sentence read and predicted by both accounts. Part IV, the attention economy (Terranova 2012): the **attention loop** cabinet (train → generate → broadcast → monetize, with in-browser fine-tuning of a tiny attention decoder, 120 simulated readers, a ledger and a guide strip; each round the player makes a move, Boost, Hold or Interrupt engagement, with its effect on readers, money and energy stated on the card, and every post and Act II intervention says what it does to readers), then an optional chapter with the allocation room and three scoreboards. Chapter 10 is the synthesis. Legacy hashes (`#machine`, `#framing`, `#social`) still resolve, and the 28 Week 4 slides remain available as an overlay deck with deep dives into each chapter (`_tools/build-lecture-slides.mjs` regenerates it). The embedded game runs in two views, `?view=intro` and `?view=levels`. Serve the `attention-assets/` directory alongside the HTML. Provenance and checks: `_notes/attention-lab-review.md`, `_tests/`.
