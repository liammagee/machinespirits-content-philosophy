# Machine Spirits — Colophon

*How the site is made. Started 2026-05-16.*

> The design *rationale* — why this palette, why these motifs — is in `IDENTITY.md` under "Visual identity." This page is the record of what is actually used.

## Type

- **Instrument Serif** — display headlines. The journal-warm register: the headlines carry the warmth.
- **DM Sans** — body and UI. A humanist sans that reads as paper-set rather than as screen-chrome.
- **System monospace** — code, probes, and mono-tags.

System-stack fallbacks are first-class. Every page is fully legible before the web fonts load.

## Colour

A warm-cream light default — the page as paper (`--bg: #f7f4ef`, ink `#1c1a16`) — with a haunted dark peer (`--bg: #181611`, parchment `#e8e2d4`). Accents stay low-chroma: terracotta, moss, ochre, slate, umber. Light is the default because journal pages are paper; the dark peer is the same page after dusk. The earlier saturated reds are explicitly *not* the brand palette — the spirits should feel slightly haunted, not promotional.

## Marks and motifs

- **The sigil** — a concentric-rings glyph: a steady centre, a dashed orbit, four cardinal ticks. Inline SVG in the site chrome and footer.
- **The fauna overlay** — small spirit-creatures held at very low opacity, pinned to corners and margins, never over body text. Ambient, not figurative.
- **The Klee walking-line** — a thin, scroll-linked thread traced as the reader descends the page, after Klee's "a line is a dot that went for a walk." Frozen under `prefers-reduced-motion`.

Imagery policy: no stock robots, brains, or glowing networks. When images are needed — scans of marginalia, fragments of diagrams from primary texts, or screenshots of the project's own tools.

## Stack

- Content is authored as Markdown and rendered to static HTML through **Pandoc**, wrapped in the shared `templates/` chrome with `assets/ms.css` + `assets/ms.js`. Citations render via `--citeproc`.
- The rendered tree is mirrored into the content package and served by the **website** repo, an Express application. The public surface is selected by the `MS_PUBLIC_SURFACE` flag; the LMS lives behind `/app/*`.
- Reduced-motion and no-JavaScript paths are first-class: animations resolve to their end states, the walking-line stays put, and all content is reachable without script.
- Source: the brand layer and content package are public repositories under the `machinespirits` GitHub organisation.

## Licensing

Prose and editorial content: CC BY 4.0 unless a page states otherwise. Software in the sibling repositories carries its own licence — see each repository's `LICENSE`. Quoted material, including machine outputs, is attributed with model and date.

## Credits

Built by Liam Magee at the University of Illinois Urbana-Champaign. Typefaces: Instrument Serif and DM Sans (SIL Open Font License). Rendering: Pandoc. The walking-line owes its name to Paul Klee.

---

*This page states working defaults; like everything in this layer it is revised in git.*
