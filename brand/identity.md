# Machine Spirits — Brand Identity

*Working document. Last revised 2026-05-10.*

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

**Recommended primary**: candidate 1 (*Philosophy for machines that learn.*) for masthead/about, with candidate 4 (*What AI forgets.*) as the title of the Founding Sketch and a recurring motif. Candidate 2 reserved for ML-research-facing contexts where "alignment" is the live word.

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

Carried over from existing assets in `machinespirits-content-philosophy/theme/` and the `techne-backdrop` plugin:

- **Logo**: existing logo from content-philosophy/assets/.
- **Signature motif**: the **fauna overlay** — small spirit-creatures wandering across the backdrop — used as a visual signature on the homepage and as a footer flourish on the newsletter. Reads as Hegelian (*Geist* in motion) and as Vygotskian (cultural figures in a shared field).
- **Color palette**: techne-red and techne-orange themes already exist in the plugin themes; default to a darker, lower-chroma palette for the brand site (the spirits should feel slightly haunted, not promotional).
- **Typography**: serif body, sans-serif headings. Specifics in `machinespirits-content-philosophy/theme/fonts.yaml`.
- **Photography/illustration policy**: no stock images of robots, brains, glowing networks, or generic "futuristic" tech. When we need imagery, prefer scans of marginalia, fragments of diagrams from primary texts, or screenshots of our own tools.

## Handle reservation (priority order)

Reserve these even if dormant. Owner: Liam Magee (`liam.magee@gmail.com`).

| Platform | Handle | Priority | Notes |
|---|---|---|---|
| Bluesky | `@machinespirits.org` (via domain handle) | P0 | Academic + ML researchers actively migrating here in 2026. |
| Mastodon | `@machinespirits@hci.social` or `@machinespirits@scholar.social` | P0 | Philosophy/STS community well-rooted on scholar.social. |
| Substack | `machinespirits.substack.com` (or self-hosted at `/newsletter`) | P0 | Newsletter home. |
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
