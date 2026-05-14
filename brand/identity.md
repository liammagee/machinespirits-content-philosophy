# Machine Spirits — Brand Identity

*Working document. Last revised 2026-05-13.*

## Platform name

**Machine Spirits.** Retained as the umbrella name across all repos, the live site (`machinespirits.org`), the newsletter, social handles, and any future imprints.

The name is doing the following work simultaneously:

- a Hegelian wink at *Geist* (spirit, both individual and objective)
- a Heideggerian wink at the *uncanny* — *unheimlich* spirits in machines
- a Vygotskian wink at the cultural-historical formation of cognition
- a colloquial wink at "ghost in the machine" while explicitly refusing the Cartesian dualism that phrase encodes
- a non-academic phrase that a non-philosopher can still find evocative

We do **not** introduce a separate "movement" name (e.g. "Recognition AI," "Phenomenological ML"). Movement-tags emerge from a network using them; coining one prematurely looks like a brand exercise rather than a school of thought.

## Tagline candidates

Five candidates, each with what it foregrounds and what it sacrifices. Pick one as primary, keep two as alternates for context-specific use.

1. **"Philosophy for machines that learn."**
   - Foregrounds: clarity, mission, the *learn* in machine learning.
   - Sacrifices: doesn't yet signal which philosophy. Generic risk.

2. **"Recognition, not just alignment."**
   - Foregrounds: positions us *inside* the live AI-safety conversation while opening a different door.
   - Sacrifices: only legible to those who already know "alignment." Reads as a contrarian slogan to outsiders.

3. **"A deeper grammar for AI."**
   - Foregrounds: technical-philosophical bridge; "grammar" is Wittgensteinian and Chomskyan at once.
   - Sacrifices: abstract; doesn't say what kind of depth.

4. **"What AI forgets."**
   - Foregrounds: evocative, memorable, hints at unconscious/nonconscious axis. Matches the title of the Founding Sketch.
   - Sacrifices: more poetic than programmatic.

5. **"Thinking with and against the machine."**
   - Foregrounds: dialectical stance, refuses the for/against binary.
   - Sacrifices: longer; assumes a critical-theory reader.

**Primary (confirmed 2026-05-13):** candidate 1 — *Philosophy for machines that learn.* — for masthead, hero, social bios, and the newsletter header. Candidate 4 (*What AI forgets.*) is the title of the Founding Sketch and a recurring campaign motif. Candidate 2 (*Recognition, not just alignment.*) is reserved for ML/alignment-facing contexts (LessWrong, arXiv, FAccT submissions).

## Voice principles

Six principles. Each is a rule with an exception spelled out, because rules without exceptions become stylistic tics.

1. **Both/and, not either/or.** Every artifact should be defensible to both a Hegel scholar and a transformer engineer. *Exception*: footnoted asides may speak only to one audience.
2. **Two-author titles.** Where possible, titles should name two unlikely-paired authors or two unlikely-paired terms (e.g., *Hegel + Sutskever*, *Hayles + Transformer*, *Heidegger and the Context Window*). *Exception*: when the piece's argument is genuinely about one figure.
3. **Show before manifesto.** Open with a demo, a probe result, a close reading, or a scene — not with the thesis. The thesis lands after. *Exception*: the Founding Sketch, which is allowed to be a manifesto because it names itself as one.
4. **Date everything.** Every public artifact carries a date. *No exception.*
5. **Quote machines like sources.** When an AI says something revealing or useful, quote it with date and model. When it says something impoverished, quote that too. *No exception.*
6. **Cite generously.** The reading-room ethos: a reader should be able to follow the trail. *Exception*: short-form social posts may carry a single anchor citation instead of a full one.

## What to refuse

- **Hype talk** ("superintelligence is coming," "AGI within…"). We discuss these positions as cultural objects, never as our own claims.
- **Doomer talk.** Same treatment.
- **AI-skeptic disdain.** Refusing to engage with what the systems actually do is intellectually unserious.
- **Pure-academic register.** No essay should require a graduate seminar to parse its title.
- **Pure-influencer register.** No post should be a vibes-only take with no anchor.
- **Founder-personality theatre.** The platform is about the work, not the founder's persona.

## Visual identity

The canonical tokens — palette, type stack, layout chrome — live in [`assets/ms.css`](./assets/ms.css); the canonical behaviour in [`assets/ms.js`](./assets/ms.js). Sibling repos (`machinespirits-website`, `machinespirits-content-philosophy/theme/`, the `techne-backdrop` plugin) inherit from this layer — they don't define their own.

- **Logo / sigil**: the concentric-rings glyph (a steady centre with a dashed orbit and four cardinal ticks) used in the header brandmark and the footer. SVG inline in `templates/page.html` and the site chrome.
- **Signature motifs**: two, layered.
  - **The fauna overlay** — small spirit-creatures (the five SVG silhouettes in `.fauna`), held at very low opacity (`--fauna-opacity` ≈ .05) and pinned to corners and margins, *never* over body text. Ambient rather than figurative; the spirits are still there, they just don't perform. Reads as Hegelian (*Geist* in motion) and as Vygotskian (cultural figures in a shared field).
  - **The Klee walking-line** — a thin, scroll-linked black thread on the landing/site chrome (after Paul Klee's "a line is a dot that went for a walk"), traced by stroke-dashoffset as the reader descends the page. The line drawn by the act of reading; the program assembling itself under the reader's eye. Frozen in `prefers-reduced-motion` (the line stays put).
- **Colour palette**: a warm-cream light default (the page as paper — `--bg: #f7f4ef`, ink `#1c1a16`) with a haunted dark peer (`--bg: #181611`, parchment `#e8e2d4`); low-chroma accents — terracotta, moss, ochre, slate, umber. The earlier techne-red / techne-orange / bright `#E63946` palettes are explicitly *not* the brand-layer palette — the spirits should feel slightly haunted, not promotional. Light is the default because journal pages are paper; the dark peer is the same page after dusk.
- **Typography**: **Instrument Serif** for display headlines (the journal-warm display register), **DM Sans** for body & UI (a humanist sans that reads as paper-set rather than as screen-chrome), and a system monospace for code / probes / mono-tags. Note this *reverses* the older "serif body / sans headings" assumption — on the journal register the headlines carry the warmth and the body stays quiet. System-stack fallbacks are first-class; the page is fully legible before the web fonts load.
- **Photography/illustration policy**: no stock images of robots, brains, glowing networks, or generic "futuristic" tech. When we need imagery, prefer scans of marginalia, fragments of diagrams from primary texts, or screenshots of our own tools.

## Handle reservation (priority order)

Reserve these even if dormant. Owner: Liam Magee (`liam.magee@gmail.com`).

| Platform | Handle | Priority | Notes |
|---|---|---|---|
| Bluesky | `@machinespirits.org` (via domain handle) | P0 | Academic + ML researchers actively migrating here in 2026. |
| Mastodon | `@machinespirits@hci.social` | P0 | **Confirmed 2026-05-13** — hci.social chosen over scholar.social for HCI/STS/AI-and-society overlap closest to primary audience. |
| Substack | `machinespirits.substack.com` | P0 | **Confirmed 2026-05-13** — Substack to launch; migrate to self-hosted `/newsletter` in Q2 once subscriber list is established. Keep CSV export enabled. |
| GitHub org | `machinespirits` | P0 | Move the existing repos under an org. |
| YouTube | `@machinespirits` | P1 | Demo videos, lectures, reading-room sessions. |
| LinkedIn | Company page "Machine Spirits" | P1 | Reach educators, journalists, policy. |
| X / Twitter | `@machinespirits` | P2 | Stake it; cross-post short-form; do not invest. |
| Threads | `@machinespirits` | P3 | Stake it. |
| BookWyrm | `@machinespirits` | P3 | The reading-room ethos. |

## Naming conventions for future artifacts

- **Newsletter issues**: numbered (#01, #02…) + a title. e.g. *Issue #01 — What AI Forgets.*
- **Essays on site**: dated path `/essays/YYYY-MM-DD-slug`.
- **Probes / eval results**: `/lab/probes/probe-NN-slug`.
- **Demos**: `/lab/demos/slug` (link from public-tutor-demo onwards).
- **Reading-room dispatches**: `/reading-room/YYYY-MM-DD-author-title`.
- **Videos**: `/videos/YYYY-MM-DD-slug` mirrored on YouTube.

## Bio one-liners (reusable)

- **Long (≤280 chars)**: *Machine Spirits — rethinking AI through Hegelian recognition, Freudian/Hayles nonconscious cognition, Weberian charisma, and Heideggerian time. Critique and construction, in public. Built at UIUC by Liam Magee.*
- **Short (≤140 chars)**: *Machine Spirits — philosophy for machines that learn. Critique and construction, in public.*
- **Bluesky (≤256 chars)**: *Rethinking AI through recognition, the unconscious, and time. Essays, probes, a working AI tutor. machinespirits.org*

---

*Decisions on this page are working defaults. The tagline pick especially should be A/B-tested in the first month of newsletter issues before being locked.*
