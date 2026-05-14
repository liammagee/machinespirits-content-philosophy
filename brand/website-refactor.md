# Website Refactor — machinespirits.org for General Release

Status: working draft, 2026-05-11. Companion to [`STRATEGY.md`](./STRATEGY.md) and [`IDENTITY.md`](./IDENTITY.md). A functional mockup of the target state lives at [`site-mockup.html`](./site-mockup.html) — open it in a browser.

This is the punch list for turning the current site (an open-source LMS with a research blog bolted on) into the site STRATEGY.md describes: **a research-program home — writing first, the lab second, the courseware kept live but off the main path, the rest of the LMS demoted to a tools page.** Same checkbox conventions as the STRATEGY 30-day list.

Repos in scope:
- `../machinespirits-website` — React 19 + TS + Vite + Tailwind 4 SPA, Express + better-sqlite3 backend, Fly.io deploy. Entry: `App.tsx` (a ~55 KB `switch` over `home|courses|dashboard|eval|instructor|kb|research-lab|docs|chat|...`).
- `../machinespirits-content-philosophy` — Pandoc/citeproc content package (`@machinespirits/content-philosophy`), consumed by the website as an npm dep, served at `/content/*`. Has `articles/`, `courses/`, `artifacts/`, `assets/`, `theme/`, `config/navigation.yaml`, and the `build`/`serve`/`publish`/`urls`/`sitemap`/`artifacts-index` scripts.

---

## 0. The one decision that gates everything else

**Keep the React SPA and bolt on a real router, or split into a static public site + a separate `/app/*` React app?**

- **Option A — one app, real router.** Add `react-router` (or similar), give every public page a real URL, lazy-load the LMS chunks behind `/app/*`. Least churn; ships fastest. Risk: the public site still loads (a slimmed) React bundle, still inherits the LMS's auth/context stack, and "simplify" stays partly cosmetic.
- **Option B — split.** Public site (`/`, `/manifesto`, `/essays/*`, `/lab/*`, `/reading-room/*`, `/courses/*` read-only) becomes static or near-static (Astro / Eleventy / a thin Vite build) consuming the content package directly. The LMS (dashboards, eval, instructor, KB, experiment lab, dialogue sim, etc.) moves wholesale to `app.machinespirits.org` or `machinespirits.org/app/*`, untouched. Most work up front; gives the cleanest "haunted, not promotional" public surface and the cleanest separation for "locked off the main path."

**Recommendation: B, phased.** Phase 1 = ship the public site as a small static build at the apex domain and reverse-proxy `/app/*` (and `/api/*`) to the existing Express+React app unchanged — i.e. *don't refactor the LMS at all yet, just move it behind a path*. Phase 2+ = iterate on the public site. This lets "general release" mean "the public face is right," not "we rewrote the LMS." If the team would rather not run two deploys, fall back to A — the workstreams below are written to apply either way; items that only matter for one option are tagged **[A]** or **[B]**.

- [x] **0.1** — **Decided 2026-05-13: Option A — one React SPA with react-router.** Rationale: least churn, ships fastest; LMS lazy-loaded behind `/app/*` in the existing Vite + Fly.io setup. The public site still loads a slimmed React bundle. "Simplify" is partly cosmetic in Phase 1; Phase 2 can revisit a split if the bundle size is unacceptable. Noted in `STRATEGY.md` §1.
- [x] **0.2** — N/A for Option A. LMS routes behind `/app/*` in the React router; no second deploy needed.
- [ ] **0.3** — Lock the public URL scheme now, before building anything, from IDENTITY.md "URL & naming conventions" (see §A).

---

## A. Information architecture & URL scheme

The target: real, stable, lowercase-hyphenated URLs; no hash routing on the public side; old links redirect.

Target public routes (from IDENTITY.md):

| Path | What |
|---|---|
| `/` | Homepage — research-program hero, "one idea / four surfaces" latest, recent essays, from-the-lab, courses strip, subscribe |
| `/manifesto` | The Founding Sketch (publish `MANIFESTO.md`) |
| `/essays` | Essay index (reverse-chron, filter by theme) |
| `/essays/YYYY-MM-DD-slug` | Essay |
| `/lab` | Lab landing — what the lab is, links to probes / demos / reading room |
| `/lab/probes` | Probe index |
| `/lab/probes/probe-NN-slug` | A probe (≤500 words + one figure) |
| `/lab/demos` | Demo index |
| `/lab/demos/tutor` | **Public, no-login tutor demo** with the Ego/Superego split visible (the headline software artifact) |
| `/reading-room` | Reading-room index |
| `/reading-room/YYYY-MM-DD-author-title` | A reading-room entry |
| `/videos` | Video index (if/when videos exist) |
| `/videos/YYYY-MM-DD-slug` | A video |
| `/courses` | Courses landing — de-emphasized, "teaching home" framing, public syllabi |
| `/courses/<id>` | A course (public view: syllabus, schedule, public materials; enrol/dashboard link goes to `/app`) |
| `/newsletter` | Subscribe + archive of issues |
| `/about` | Who/what/why; bio; institutional affiliation; how to cite; contact |
| `/colophon` | Stack, fonts, fauna, licensing, credits |
| `/tools` | The locked-off software: one honest page listing the LMS pieces (Student/Instructor dashboards, Evaluation Dashboard, Learning Map, Knowledge Base, Experiment Lab, Dialogue Simulator, Babel Maze, NightOwl, Focus Reader…), each with a one-line "what it is" and a link into `/app` (login-gated) |
| `/app/*` | The existing LMS SPA, unchanged, behind login — **[B]** or `/app` route prefix **[A]** |
| `/feed.xml`, `/essays/feed.xml`, `/lab/probes/feed.xml` | RSS |
| `/sitemap.xml`, `/robots.txt` | SEO basics |

- [x] **A.1** — Route table written to `machinespirits-website/ROUTES.md` (2026-05-13). Includes public routes, `/app/*`, API, feed/SEO paths, and the full legacy hash → real-path redirect map.
- [x] **A.2** — Option A confirmed (§0.1): react-router in the existing SPA. Public side uses real paths.
- [x] **A.3** — Implemented (2026-05-13): inline hash-shim script in `index.html` (fires before React; maps 15 legacy hash routes to real paths); Express 301s in `server.js` for `/reading/*` → `/reading-room/*` and `/games/warpstrike/*` → `/lab/demos/warpstrike/*`. Reading app remounted at `/reading-room`; warpstrike served at `/lab/demos/warpstrike`.
- [ ] **A.4** — Decide the fate of `archive-structure.json` (current IA descriptor in the website root): regenerate it to match the new IA, or retire it if the new build doesn't need it.
- [x] **A.5** — `content-philosophy/config/navigation.yaml` rewritten to the new public nav (Essays · Lab · Courses · About + Subscribe), real paths, no hashes. `app:` section added for `/app/*` tools. Content package bumped to v2.0.0.

---

## B. Homepage & top-level navigation

**Kill the LMS-dashboard framing.** The homepage today reads like a product. It should read like the front page of a research program.

Target nav (4 items + 1 action) — minimal, per STRATEGY "simplify":

> **Essays · Lab · Courses · About**  …………………  **Subscribe**

(No "Dashboard", no "Knowledge Base", no "Docs", no "Research Lab" *and* "Research Dashboard" *and* "Experiment Lab" in the nav — those collapse: the public-facing experimental work is `/lab`; everything else is `/app` reached via `/tools` or the footer.)

Target homepage modules, top to bottom:
1. **Hero** — wordmark/sigil + tagline ("Philosophy for machines that learn." — or whichever IDENTITY.md tagline wins) + a 2–3 sentence thesis (what the program claims, in plain words) + two CTAs: **Read the manifesto** / **Try the tutor**.
2. **Latest idea, four surfaces** — the current headline idea shown once, with its probe / course-note / essay / video renderings linked (whichever exist). This is the "one idea, four surfaces" pattern made visible.
3. **Recent essays** — 3–4 cards, reverse-chron, from the content package.
4. **From the lab** — the tutor-demo card (prominent: "a tutor that shows its work — Ego proposes, Superego checks") + the most recent 2–3 probes as a compact list.
5. **Teaching** — a quiet strip, not a section: "Machine Spirits is also the home for courses at UIUC — [browse courses]". De-emphasized on purpose (STRATEGY: teaching is evidence + institutional home, not the lead).
6. **Subscribe** — newsletter signup, one line of "what you'll get / how often".
7. **Footer** — About · Manifesto · Colophon · **Also from Machine Spirits** (→ `/tools`) · social handles · "© / CC license / built with…".

- [ ] **B.1** — Replace the homepage component with the module list above. Remove the LMS-y hero (course tiles / "continue learning" / dashboard CTAs) from the public home.
- [ ] **B.2** — Rewrite the top nav to **Essays · Lab · Courses · About** + **Subscribe**. Remove Dashboard/KB/Docs/Research-Lab from the public nav. Mobile nav: same, in a sheet.
- [ ] **B.3** — Write the hero thesis copy (2–3 sentences) and the tagline choice — pull from IDENTITY.md, get Liam's sign-off.
- [ ] **B.4** — Build the "latest idea / four surfaces" module as a small data-driven block (reads from a `featured` field in the content package or a hand-maintained `featured.yaml`).
- [ ] **B.5** — Update `<title>`, meta description, OG/Twitter card image for the homepage (see §J).
- [ ] **B.6** — Remove `App.tsx`'s `case 'home'` LMS dashboard branch from the public path; the dashboard lives at `/app` only.

---

## C. The writing layer — manifesto, essays, newsletter

This is the load-bearing public surface. It should feel like a journal, not a CMS.

- [ ] **C.1** — Publish `MANIFESTO.md` at `/manifesto` as a first-class page (its own template: generous measure, no sidebar clutter, a "this is a working document, revised in git" note linking the repo).
- [ ] **C.2** — `/essays` index: reverse-chron list, each entry = title, date, 1-line dek, theme tag(s), reading time. Filter by theme (recognition / nonconscious cognition / charisma / time / pedagogy …). Pull from `content-philosophy/articles/*` (the ones meant to be public — see C.6).
- [ ] **C.3** — Essay template: inherit the brand-layer type stack (Instrument Serif headlines, DM Sans body — see `assets/ms.css`'s `.doc` rules), real measure (~65–75ch), footnotes/citations rendered properly (citeproc output already exists), a "cite this" block, prev/next, related-by-theme. Keep `ArticleReader.tsx`/`TechneMarkdown.tsx` if they're good; strip anything LMS-coupled (progress tracking, "mark complete", enrolment gates) from the public reader.
- [ ] **C.4** — `/newsletter` page: embed the actual signup (Substack / Buttondown / whatever the strategy lands on) + an archive list of issues. Wire the Subscribe nav button here.
- [ ] **C.5** — Decide the essay ↔ newsletter relationship in the IA (does an essay get a `/newsletter/NN` mirror? probably not — link from issue to essay, keep one canonical URL each).
- [ ] **C.6** — Triage `content-philosophy/articles/`: which subfolders are *public essays* vs *internal/teaching notes* vs *drafts*? Current dirs include `ai-pedagogy/`, `ai-tutor/`, `dictatorship/`, `dissertations-critique/`, `hegel-essays/`, `hegel-primary-texts/`, `lms-docs/`, `markdown-citations/`, `publications/`, `stochastic-society/`, `vibe-scholarship/`, `web-design-ai/`, `_drafts/`, `.nightowl-backups/`. Sort each into: **publish as essay**, **publish elsewhere** (e.g. `hegel-primary-texts` → reading-room source texts; `lms-docs` → `/tools` or `/colophon`; `markdown-citations` → internal), or **keep in `_drafts/`** (the existing "hidden = file location" convention). `.nightowl-backups/` should be `.gitignore`d, not shipped.
- [ ] **C.7** — Per-essay frontmatter audit: every public essay needs `title`, `date` (→ `YYYY-MM-DD` slug prefix), `slug`, `theme`/`tags`, `dek`/`summary`, `status`. Add a `urls` script check that fails the build if a public article is missing these.

---

## D. The lab layer — probes, the tutor demo, the reading room

STRATEGY: construction now narrows to **two software artifacts in active dev** — the public tutor demo and the recognition-probe suite. The lab is where those live publicly. Everything else software-wise is maintenance mode → that's the "locked off" set (§F).

- [ ] **D.1** — `/lab` landing: a short statement of what the lab is (working experiments, not products), then three columns/sections — **Probes**, **Demos**, **Reading room**.
- [ ] **D.2** — `/lab/probes` index + `/lab/probes/probe-NN-slug` detail. **This requires a new `probes` content type in `content-philosophy`** — see §H. Probe template: ≤500 words, exactly one figure/chart, mono or mono-accented type, a "method" disclosure (`<details>`), a "discuss/cite" line, link to the essay or course-note that expands it.
- [ ] **D.3** — `/lab/demos/tutor` — the headline artifact. A **public, no-login** tutor demo with the **Ego/Superego (or "proposer/checker") split-pane visible**: left = the tutor's draft reply, right = the critique/revision pass, then the final answer. Today this lives behind the LMS chat (`case 'chat'`, `/api/chat`, `/api/socratic`). Extract a standalone demo: a small page that hits a rate-limited public endpoint, ships a couple of canned conversation starters, and *shows the internal turn* (that visible self-checking is the whole point — it's the "recognition" claim made tangible). Add a clear "this is a demo; the full tutor lives inside courses" note linking `/courses` / `/app`.
- [ ] **D.4** — `/lab/demos` index (tutor + warpstrike/`/games/warpstrike` if it's kept, + the content-philosophy `artifacts/*` interactive pieces like `hegel-recognition-explorer.html`, `design-audit-playground.html` — decide which of those graduate to "demo" vs get retired). Wire `content-philosophy/artifacts-index` output into this page.
- [ ] **D.5** — `/reading-room` — the existing "reading" feature (`app.get('/reading')`, `/reading/*`, `public/texts/*.pdf`). Rename routes to `/reading-room/*`, give it the IDENTITY.md URL form (`/reading-room/YYYY-MM-DD-author-title`), and keep it as a curated "what we're reading + notes" surface. **Note:** `public/texts/` holds ~100 MB of arXiv PDFs — host those on the CDN / object storage, not in the repo (see §I).
- [ ] **D.6** — Strip LMS coupling from all lab pages (no enrolment, no progress, no auth wall) — the lab is fully public.
- [ ] **D.7** — Demote the LMS-flavoured "lab" components from the public bundle: `ExperimentLab.tsx`, `ResearchDashboard.tsx`, `ResearchLabModal.tsx` belong to `/app`, not `/lab`. `/lab` is content + the tutor demo, not a dashboard.

---

## E. The teaching layer — courses, kept but quiet

STRATEGY: teaching is *evidence + the institutional home* — real, cited, but not the lead. Public side shows syllabi and public materials; the actual LMS (enrolment, gradebook, dashboards) is `/app`.

- [ ] **E.1** — `/courses` landing: "Machine Spirits is the teaching home for [these UIUC courses]" — list with code, title, term, one-line description, thumbnail. De-emphasized styling (no big hero, no "enrol now" energy).
- [ ] **E.2** — `/courses/<id>` public view: syllabus, schedule, reading list, public lecture notes / slides / podcast episodes — read-only. A single quiet "enrolled? go to your dashboard" link to `/app`. No public gradebook, no public roster.
- [ ] **E.3** — Keep `CourseBrowser.tsx` / `CourseDetailPage.tsx` if they can render a clean public read-only view; otherwise build a thin public course template and leave the rich version inside `/app`.
- [ ] **E.4** — Surface **course-notes** as a public artifact type (STRATEGY: course-note = ≤800 words + a prompt + an exercise; one of the two load-bearing surfaces). Decide: do course-notes live under `/courses/<id>/notes/...`, or in `/essays` with a `type: course-note`, or their own `/notes` index? Recommend: their own lightweight index `/notes` cross-linked from both essays and courses, since they're meant to travel (LinkedIn educator networks etc.).
- [ ] **E.5** — `content-philosophy/courses/` triage: `479`, `480`, `490`, `490-spring-2026`, `590`, `dissertation`, `socsci_and_ai`, `test` — which are public, which are archived, which is `test` (delete). Mark each course's public/private materials in its manifest.

---

## F. Lock off the software ("live but off the main path")

The brief: the LMS pieces *stay live* — nothing is deleted — but they leave the public navigation and live behind login and/or a single honest `/tools` page. Concretely, this set:

Student Dashboard · Instructor Dashboard · Evaluation Dashboard · Learning Map · Knowledge Base · Experiment Lab · Research Dashboard · Dialogue Simulator · Babel Maze · NightOwl · Focus Reader · Activity/Rubric/Gradebook tooling · Announcements · Certificates · Community/Journal · Docs browser · Mobile chat/eval views.

(Components on disk that map to these: `StudentDashboard.tsx`, `InstructorDashboard*.tsx`, `EvaluationDashboard.tsx`, `LearningMap.tsx`, `knowledge-base/`, `ExperimentLab.tsx`, `ResearchDashboard.tsx`, `eval/`, `DocsBrowser.tsx`, `ActivityTemplateManager.tsx`, `RubricEditor.tsx`/`RubricGrader.tsx`, `GradebookExport.tsx`, `RegradeRequestPanel.tsx`, `Certificate.tsx`, `community/`, `journal/`, `mobile/`, plus the `mobile-eval.html` / `mobile-chat.html` standalone pages. Babel Maze / NightOwl / Focus Reader are elsewhere in the multi-repo set / `techne-plugins` / `reading-app` — link out, don't host.)

- [ ] **F.1** — Move all of the above behind `/app/*` (route prefix **[A]** / separate app **[B]**) and **require login** to reach them. No deletion — these stay shipped.
- [ ] **F.2** — Remove every one of them from the public top nav, footer "primary" links, homepage, and `navigation.yaml`.
- [ ] **F.3** — Build `/tools` — one page, honest framing: "Machine Spirits also includes a full learning platform and a set of experimental tools. They're live but not the focus of this site." Then a list: each tool, one sentence, a link (to `/app/...` if it's in-platform, or out to the relevant repo/app if it's a sibling project). This is the *only* public entry point to the LMS besides a logged-in user's bookmark.
- [ ] **F.4** — Link `/tools` from the footer ("Also from Machine Spirits") and from `/about` ("the platform behind the program"). Nowhere else.
- [ ] **F.5** — Lazy-load / code-split the `/app` bundle so the public site doesn't ship the LMS JS **[A]**. For **[B]** this is free.
- [ ] **F.6** — Auth: a logged-out visitor hitting `/app/*` gets a clean "sign in to use the platform" page, not a 404 and not the public homepage. A logged-in visitor still lands on the public homepage by default — `/app` is opt-in.
- [ ] **F.7** — `mobile-chat.html`, `mobile-eval.html`, `office-sim.html` — either fold into `/app` or retire (see §I); they shouldn't be reachable from the public site.

---

## G. Visual redesign — "haunted, not promotional"

From IDENTITY.md: a **warm-cream light default with a haunted dark peer** (low-chroma terracotta / moss / ochre / slate / umber accents — not the bright `#E63946`, not the older techne-red/orange); **Instrument Serif on display headlines, DM Sans on body & UI** (the journal register — note this *reverses* the older "serif body / sans headings" sketch); the fauna overlay kept as a *signature motif, dialed down to subliminal*, joined by a new programmatic signature — **the Klee walking-line** traced on scroll across the landing/site chrome; no robot/brain/network stock imagery. And from STRATEGY "simplify": drop the maximalist skin. **The brand layer's [`assets/ms.css`](./assets/ms.css) is the canonical reference — the website inherits from it, doesn't redefine it.**

Things to remove:
- The parallax grid / `GeometricBackground.tsx` / `parallax-skin.html` / "trash-polka" accent shapes — gone from the public site.
- Glass-morphism panels / heavy blurs.
- The toggle soup (multiple theme/skin/animation toggles) — one light/dark toggle, that's it.
- `animals.html`, `fauna-playground/`, `office-sim.html` as shipped pages — the fauna *system* stays (`fauna-overlay.js`), the playground doesn't ship.

Things to do:
- [ ] **G.1** — New palette in `content-philosophy/theme/colors.yaml` + the website's Tailwind config — **inherit the canonical journal palette from `machinespirits-brand/assets/ms.css`** rather than re-defining one. Light default (page as paper): `--bg: #f7f4ef`, ink `#1c1a16`, faint `#6b6660`. Haunted dark peer: `--bg: #181611`, parchment `#e8e2d4`, faint `#9a958d`. Low-chroma accents (same hex in both themes, contrast handled by surrounding ink): terracotta `#b8654a`, moss `#7a8a4f`, ochre `#c8954b`, slate `#5a6c7d`, umber `#6b4423`. The earlier "dark-first" anchors (`#15131A`/`#B56A52`/`#5E2A26`) are *superseded* by this palette — keep the working list under version control in `ms.css`, not in the downstream configs.
- [ ] **G.2** — Typography in `content-philosophy/theme/fonts.yaml`: **inherit the brand-layer journal stack** — **Instrument Serif** for display headlines (web font, with `Georgia, "Iowan Old Style", "Palatino Linotype", serif` fallback), **DM Sans** for body & UI (web font, with `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` fallback), system mono for probes/code (`ui-monospace, "SF Mono", "JetBrains Mono", monospace`). Note this *reverses* the earlier "serif body / sans headings" sketch — the journal register puts serif on the *headlines* (display warmth) and sans on the body (paper-quiet legibility), which is what `assets/ms.css` already does. Real measure on body text (60–72ch). The page must be fully legible before web fonts load.
- [ ] **G.3** — Reduce the fauna overlay: fewer creatures, lower opacity, slow gentle drift, *never* over body text — corners, margins, section breaks only. Make it a thin SVG layer, not the current heavier JS canvas if possible. Keep it as the "ghost in the machine" signature; respect `prefers-reduced-motion` (freeze it).
- [ ] **G.4** — Delete the parallax / geometric / trash-polka layer from the public templates and the homepage. Remove `GeometricBackground.tsx` from public render paths (keep in repo if `/app` still uses it; otherwise retire).
- [ ] **G.5** — One theme toggle (light/dark), persisted in `localStorage`, **defaulting to the warm-cream light (the page as paper) with the haunted dark peer as the alt**, honouring `prefers-color-scheme` on first visit. (The earlier "dark default" sketch is *superseded* — the journal register reads as paper; "haunted" is now carried by the dark peer + the subliminal fauna + the Klee walking-line, not by reversing the default.) Remove all other skin/animation toggles from the public UI.
- [ ] **G.6** — Logo/sigil: pull the wordmark + sigil from `content-philosophy/assets/logo.svg` / `favicon.svg`; if those are still the old "Swiss LMS" mark, commission/redo per IDENTITY.md. `BrandSigil.tsx` should render the new mark.
- [ ] **G.7** — Generous whitespace, hairline rules instead of boxes/cards-with-shadows, restrained motion. The mockup (`site-mockup.html`) is the reference.
- [ ] **G.8** — Audit `index.html` in the website root (37 KB, lots of inline) — strip inline LMS bootstrapping/splash, set the new theme color, favicon, OG defaults there.

---

## H. Content pipeline updates (`machinespirits-content-philosophy`)

The content package needs to learn the new vocabulary. It currently knows `articles` and `courses`; it needs `probes` (and arguably `reading-room` entries and `videos`) as first-class types, and its `urls`/`sitemap`/`artifacts-index` scripts need to emit the IDENTITY.md URL forms.

- [ ] **H.1** — Add a `probes/` content source: `manifest.yaml` gains `content.probes: "./probes"`; create `probes/probe-01-<slug>/index.md` with frontmatter (`title`, `date`, `n` (probe number), `slug`, `figure` (path), `theme`, `summary`, `expands` (link to essay/course-note), `status`). One figure per probe; the build renders it.
- [ ] **H.2** — Define the **course-note** type — either a frontmatter `type: course-note` on articles, or a `notes/` source. Frontmatter for course-notes: `title`, `date`, `course` (which course it came from), `prompt`, `exercise`, `summary`. Pick one and document it in `CONVENTIONS.md`.
- [ ] **H.3** — Reading-room: formalize the `/reading-room/YYYY-MM-DD-author-title` form — a `reading-room/` source (or reuse `references/`) with `author`, `title`, `year`, `our-note`, `source-url`/`source-pdf` (PDF hosted on CDN, not in repo), `date` (when we wrote the note).
- [ ] **H.4** — `urls` script: emit the IDENTITY.md scheme for every type — `/manifesto`, `/essays/YYYY-MM-DD-slug`, `/lab/probes/probe-NN-slug`, `/lab/demos/slug`, `/reading-room/YYYY-MM-DD-author-title`, `/notes/...`, `/videos/YYYY-MM-DD-slug`, `/courses/<id>`. Fail the build on collisions or malformed slugs.
- [ ] **H.5** — `sitemap` script: produce a real `sitemap.xml` (not just an internal map) covering all public URLs, with `lastmod` from frontmatter `date`/git.
- [ ] **H.6** — `artifacts-index`: extend to include probes and demos, and emit the data the website's `/lab` pages consume (JSON the SPA/static build reads at build time).
- [x] **H.7** — `config/navigation.yaml` rewritten (2026-05-13): public nav Essays · Lab · Courses · About + Subscribe, real paths. `app:` section and `footer:` section added. (Same as A.5.)
- [x] **H.8** — `config/features.yaml` audited (2026-05-13): `gamification` and `offlineMode` turned off; `probes`, `tutor-demo`, `newsletter`, `reading-room` flags added; all features annotated as PUBLIC / APP / OFF with rationale.
- [x] **H.9** — `manifest.yaml` updated (2026-05-13): `tagline` → "Philosophy for machines that learn."; `description` → research-program thesis. Package version bumped to `2.0.0`.
- [ ] **H.10** — `.gitignore` `articles/.nightowl-backups/` and any other tooling backup dirs; don't ship them in the package.
- [ ] **H.11** — Re-publish the content package and bump the website's dependency on it.

---

## I. Cleanup & repo hygiene (must happen before "general release" — the repo is public-facing)

`machinespirits-website` currently carries ~500 MB of stuff that should never be in a public clone, plus a litter of one-off files.

- [ ] **I.1** — `data/lms.sqlite` is **278 MB committed**. Remove from the working tree, `.gitignore` it, and **rewrite history** to drop it (`git filter-repo` / BFG) — otherwise the public clone is half a gig. Provide a seed/migration script + a small fixture DB instead. **This is destructive history rewriting — confirm with Liam and coordinate (force-push, anyone with clones re-clones).**
- [ ] **I.2** — `playwright-report/` (~160 MB of trace zips), `test-results/` (~20 MB), `.playwright-mcp/` — `.gitignore` and remove from tree (and history, per I.1).
- [ ] **I.3** — `public/texts/*.pdf` — ~100 MB of arXiv PDFs. Move to object storage / CDN; reference by URL from reading-room entries. Keep maybe one small sample if a demo needs a local file.
- [ ] **I.4** — `logs/tutor-api/*.jsonl` (~100 MB) — `.gitignore`, remove from tree + history. Logs don't belong in the repo.
- [ ] **I.5** — Delete the stray top-level one-offs: `animals.html`, `parallax-skin.html`, `office-sim.html`, `mobile-chat.html`, `mobile-eval.html` (or fold the last two into `/app`), `test_output.log`, `server.log`, the `benchmark-*.json` / `cost-benefit-*.json` / `eval-2026-*.json` reports (move historical eval artifacts to `machinespirits-eval` if they matter, else delete), `archive-structure.json` (regenerate or retire — see A.4).
- [ ] **I.6** — Consolidate the doc litter: `TASKS-COMPLETE.md`, `TEST-COVERAGE-SUMMARY.md`, `TEST-IMPROVEMENTS-FINAL.md`, `MONITOR-TEST-GUIDE.md`, `MULTI-TURN-SEQUENCE-DIAGRAM-FIX.md`, `TUTORIAL-VIDEO-CONVERTED.md`, `TUTORIAL-VIDEO-README.md`, `CRASH-PROTECTION.md`, `REPOSITORY-RELATIONSHIPS.md` — move what's still useful into `docs/`, delete the rest. The repo root should have `README.md`, `CLAUDE.md`, `LICENSE`, `CITATION.cff` and not much else.
- [ ] **I.7** — `.DS_Store` files committed in both repos — remove and add to a global gitignore.
- [ ] **I.8** — `fauna-playground/`, `fauna-overlay.js` at repo root — keep `fauna-overlay.js` (it's the live overlay) wherever the build expects it; move `fauna-playground/` out of the shipped repo (own repo or `/dev` dir, gitignored).
- [ ] **I.9** — Rewrite the website `README.md`: it currently sells "Open-source LMS platform with Swiss design aesthetic and generative fauna overlays" — reframe as "machinespirits.org — the public site for the Machine Spirits research program; also hosts the platform at `/app`." Same for `package.json` `name`/`description` (`name: "machine-spirits"`, desc still says "Open-source LMS platform…").
- [ ] **I.10** — Audit the **69 Express routes** in `server.js`: keep `/api/*` (the app needs it), `/feed.xml` (rework — see §J), `/reading*` (→ `/reading-room/*`); retire `/games/warpstrike` (or move under `/lab/demos`), `/TODO.md`, `/mobile-chat.html`, `/fauna-overlay.js` (serve via the build, not a hand-rolled route), `/office-sim` etc. Public routes should map 1:1 to the §A route table; everything else is `/api/*` or gone.
- [ ] **I.11** — `.env` must be gitignored; ship a `.env.example` with placeholder values for the documented config instead. Audit the working tree and history for any committed secrets and rotate anything that was exposed.
- [ ] **I.12** — `dist/` committed — gitignore build output.

---

## J. SEO, feeds, sharing, redirects

The site can't be "generally released" while it's a hash-routed SPA with one `<title>`.

- [ ] **J.1** — Real `<title>` + meta description per page (server-rendered or static-built — **[B]** makes this trivial; **[A]** needs `react-helmet`-style head management + ideally SSR/prerender for the public routes).
- [ ] **J.2** — OpenGraph + Twitter card tags per page; a default OG image (the sigil on the dark palette) + per-essay/per-probe OG images (auto-generated from title is fine).
- [ ] **J.3** — `sitemap.xml` at the apex (from §H.5), `robots.txt` (allow all public, disallow `/app/*` and `/api/*`).
- [ ] **J.4** — RSS: `/essays/feed.xml`, `/lab/probes/feed.xml`, and a combined `/feed.xml`. Rework the existing `app.get('/feed.xml')` to read from the content package.
- [ ] **J.5** — 301 redirects from every legacy hash/path URL (the §A.3 map) — server-side, plus the client `#/...` shim.
- [ ] **J.6** — Canonical URLs (`<link rel="canonical">`) on every page; make sure there's exactly one URL per piece of content (no `/essays/x` *and* `/newsletter/n` both canonical).
- [ ] **J.7** — `ShareButton.tsx` — keep, point at the new URLs; make sure it shares the canonical URL, not a hash route.
- [ ] **J.8** — Analytics/consent: if there's tracking, the cookie/consent banner must be the privacy-preserving default (decline-by-default); no third-party junk on the public site.
- [ ] **J.9** — Submit the new sitemap to Search Console; verify the redirects don't break existing inbound links.

---

## K. Sequencing — what "general release" actually requires

Not everything above blocks launch. Minimum viable "general release" (maps to STRATEGY Q1 — "publish the manifesto, ship the public site, the tutor demo, the first probes"):

**Must ship for general release (the "minimum" subset):**
- [ ] §0.1 decision (A vs B) — *gates everything*
- [ ] §A.1–A.3 — route table + real public URLs + legacy redirects
- [ ] §B.1–B.3 — new homepage + new nav + hero copy
- [ ] §C.1 — `/manifesto` published
- [ ] §C.2–C.3, C.6 — `/essays` index + reader + the public-essay triage (even if the probe type isn't built yet)
- [ ] §C.4 — `/newsletter` signup live
- [ ] §D.1, D.3 — `/lab` landing + the public no-login tutor demo with the Ego/Superego split visible
- [ ] §E.1–E.2 — `/courses` public read-only view, de-emphasized
- [ ] §F.1–F.4, F.6 — LMS moved behind `/app` + login, out of public nav, `/tools` page exists
- [ ] §G.1–G.5 — new palette + type + dialed-down fauna + parallax/glass/toggle-soup removed
- [ ] §H.4, H.7, H.9 — `urls` emits the new scheme, `navigation.yaml` rewritten, `manifest.yaml` tagline/description fixed
- [ ] §I.1, I.2, I.4, I.11 — purge the 278 MB sqlite + the test/log bloat from the repo, and the `.env` hygiene per I.11 — *the repo is about to be public*
- [ ] §I.9 — README + package.json no longer describe the site as "an LMS"
- [ ] §J.1–J.5 — titles/meta/OG, sitemap, robots, RSS, redirects

**Fast-follow (weeks after launch, also Q1):**
- [ ] §D.2 + §H.1 — the `probes` content type and `/lab/probes` (the first probe is a Q1 deliverable but the *type* can land just after the homepage)
- [ ] §E.4 + §H.2 — course-notes as a public artifact type
- [ ] §D.5 + §H.3 — `/reading-room` formalized
- [ ] §G.6 — new logo/sigil if the current mark is the old one
- [ ] §I.3, I.5–I.8, I.10, I.12 — finish the repo cleanup
- [ ] §J.6–J.9 — canonicals, analytics/consent, Search Console

**Later (Q2+):**
- [ ] §A.4 archive-structure rationalization
- [ ] §D.4 demos index + graduating the content-philosophy `artifacts/*` interactives
- [ ] §F.5, F.7 — full code-split / mobile-page cleanup (free under **[B]**)
- [ ] §H.5–H.6, H.8, H.10–H.11 — the rest of the pipeline work
- [ ] §videos/* — if/when video surfaces exist

---

## Open questions for Liam

1. **§0** — A (one app + router, ships faster, "simplify" stays partly cosmetic) vs B (split public/`/app`, more work, cleanest result). Recommendation is B-phased. Your call — it shapes every other ticket.
2. **§I.1** — OK to rewrite git history to purge the 278 MB `lms.sqlite` (and the test/log bloat)? It means a force-push and anyone with a clone re-clones. The alternative is shipping a half-gig public repo.
3. **§B.3 / IDENTITY.md** — which tagline wins for the hero? ("Philosophy for machines that learn." is the working default in the README.)
4. **§E.4** — course-notes: own `/notes` index (recommended, they travel well), or fold into `/essays` with a type tag?
5. **§D.3** — for the public tutor demo: rate-limited live endpoint, or fully canned/replayed conversations? Live is more convincing; canned is zero-cost and zero-abuse-surface.
6. **§D.4 / artifacts** — which of `content-philosophy/artifacts/*` (`hegel-recognition-explorer.html`, `design-audit-playground.html`, `warpstrike-60.html`, `anthropic-reading-list.html`) graduate to public `/lab/demos`, and which retire?
7. **`/app` domain** — `app.machinespirits.org` subdomain, or `machinespirits.org/app/*` path? (Affects auth/cookies and the proxy setup.)
