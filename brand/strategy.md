# Machine Spirits — Strategy

*Awareness, engagement, and recognition strategy for the Machine Spirits platform.*
*Started 2026-05-10. Quarterly checkpoints below.*

> See `MANIFESTO.md` for the Founding Sketch and `IDENTITY.md` for name, tagline, voice, and visual identity.

## 0. Mission and method

**Mission.** Shift the dominant frame of AI discourse away from positivism, behaviorism, and thin ethics — toward a frame that takes seriously phenomenological, psychoanalytic, and social-theoretic accounts of humanness *and* machine-ness.

**Method.** Critique *and* construction, in public. The platform ships software that performs the alternative (the LMS, Ego/Superego tutor, evaluation framework, plugin ecosystem) and writes essays that interpret the software and the wider field. The two halves are load-bearing for each other.

**Audience.** All four of:

| Audience | Tier | What they want from us |
|---|---|---|
| ML researchers / alignment community | **Primary** | Demos, evaluation results, papers legible to ML venues. |
| Educators (HE, philosophy, CS) | **Primary** | Course materials, pedagogy essays, replicable classroom practice. |
| Academic philosophy / critical theory / STS | Secondary | Sustained close readings, conference-grade arguments, theoretical originality. |
| Tech-curious public + policy + journalism | Secondary | Plain-language essays, short videos, op-eds, podcast appearances. |

The two primary audiences sit at a natural intersection the platform already occupies: an LMS with AI tutors, evaluated philosophically. Reach them through the *probe* (their eval and demo surface) and the *course-note* (their classroom surface). The secondary audiences are reached by the *essay* and the *video*, both of which are derivatives of the same underlying ideas. The principle: **one idea, four surfaces — load-bearing on probe and course-note.**

## 1. The spine — what Machine Spirits is

Machine Spirits is, primarily, a **research program**: a thesis about AI and a body of work advancing it.

**The thesis.** Contemporary AI is impoverished by a positivist, behaviorist, thin-ethics frame. Phenomenological, psychoanalytic, and social-theoretic resources — recognition (Hegel, Honneth, Jessica Benjamin), the unconscious and the nonconscious (Freud, Hayles), charismatic authority (Weber), temporal orientation (Heidegger via Pippin) — give a deeper and more workable account of human learning, machine learning, and the relation between them.

Everything else the project does is in service of that research program, in one of three roles:

| Limb | Role | Here to do |
|---|---|---|
| **Software** — LMS, Ego/Superego tutor, eval/probe framework, Techne plugins, NightOwl, reading-app | **Evidence** | Show the philosophical claims have computational purchase. The tutor *performs* recognition; the probe suite *measures* its absence; the plugins *stage* hermeneutic and dialectical structure. Arguments in the form of working systems. |
| **Teaching** — courses 479 / 480 / 490 / 590 / dissertation; course-notes | **Evidence + institutional home** | Show that pedagogy *is* a recognition relation; and supply the durable, funded, institutionally legitimate base from which the research operates. |
| **Media** — newsletter, essays, social, talks, video | **Amplification** | Carry the research to the four audiences. The "one idea, four surfaces" production unit (next section) is the media engine. |

### What this commits us to

1. **The unit of progress is a published argument backed by a piece of evidence** — an essay / preprint / paper / chapter, paired with a probe result, a demo, or a transcript. "Shipped a feature" is not, by itself, progress on the spine.
2. **Construction narrows.** For the next twelve months, exactly two software artifacts are in *active development*: the **public tutor demo** (the flagship evidence artifact) and the **recognition-probe suite** (the flagship measurement artifact) — both described under *The lab as the strongest argument*, below. Everything else in the software ecosystem — the Techne plugins, NightOwl, the reading-app, the broader LMS feature set — moves to **maintenance mode**: kept running, breakages fixed, security patched, no new features. *(Provisional — revisited when the capacity question is settled; see "Open question," below.)*
3. **Critique gets the freed bandwidth.** The newsletter cadence, two to three flagship publications, and the book proposal have first claim on the time maintenance-mode frees up.
4. **The reading library is part of the research program, not a side resource.** Reading in public — with machines and with each other — is one of the program's methods, not an outreach activity.

### Positioning: the gap Machine Spirits occupies

The program's distinctiveness is precise and statable: **recognition theory + working software + pedagogy, integrated.** No existing player holds all three.

| Adjacent work | Has | Lacks, relative to Machine Spirits |
|---|---|---|
| **David Gunkel** — *robot rights*, machine moral status | Philosophy of machine moral standing; some pedagogy | Software-as-argument; works from Levinas / Derrida, not Hegel / Honneth / Benjamin — less dynamic (no struggle, no breakdown-and-repair) |
| **Mark Coeckelbergh** — the "relational turn" in AI ethics | A relational account of moral status | Software-as-argument; the account stays general — "relational" without the asymmetry, struggle, and reparative dynamics recognition theory supplies |
| **Shannon Vallor** — *Technology and the Virtues* | A virtue-ethical framework for AI; industry reach | Software-as-argument; virtue ethics rather than recognition; the human/machine *relation* is not the centre |
| ***Critical AI*** **journal** (Goodlad et al., Rutgers); Crawford; Pasquinelli; Chun | Sustained critical-theoretic and political-economy critique | Construction — no tutor, no probes, no teaching platform; a different theoretical base |
| **N. Katherine Hayles** — *Unthought* | A direct intellectual ally; literary-theoretic depth | Builds no software; not a program with a teaching/media apparatus — an ally to cite and build on, not a competitor |
| **"Machine behavior"** (Rahwan et al., 2019) | An influential research agenda | This is the **foil**, not a neighbour — explicitly behaviorist. Machine Spirits is its antithesis, and should say so. |

The one-liner — *recognition theory + working software + pedagogy; none of the existing players do all three* — belongs in the grant-pitch language and the public bio alongside the taglines in `IDENTITY.md`.

### Open question this section does not settle

The maintenance-mode list above assumes a roughly solo, ~8-hours-per-week capacity. If that changes — an RA, a postdoc, a grant that funds a developer — the list shrinks and more of the software ecosystem can stay in active development. That is the **capacity decision**, taken up next, and it is enabled by the **funding decision** after it. What the spine decision fixes is the *priority order those decisions must respect*: if a funder would pay for plugin features but not for the probe suite, the probe suite still wins — it is evidence for the spine; the plugin features are not.

---

## 2. One idea, four surfaces (the production unit)

Every "idea" the platform develops produces four artifacts on a rolling schedule. For Machine Spirits' primary audiences (ML researchers and educators) the **probe** and the **course-note** are the load-bearing surfaces; the essay and the video broaden reach to the secondary audiences but never lead a cycle on their own.

1. **The probe** (≤500 words + a figure). Site `/lab/probes`; cross-posted to arXiv when bundled and to LessWrong/Alignment Forum when relevant. A specific eval result, a tutor transcript, a measurement. *Primary for ML researchers; legible to all others.*
2. **The course-note** (≤800 words + a discussion prompt + one classroom-ready exercise). Added to the relevant course in `machinespirits-content-philosophy`; cross-posted to LinkedIn educator networks. *Primary for educators and students; reusable in classrooms.*
3. **The essay** (≈1500–2500 words). Substack + site. The full argument with citations. *For the academic and curious-public audiences; ties the probe and the course-note into a single argument.*
4. **The video** (90–180 seconds, optionally a longer cut). YouTube + cross-posted as Bluesky/Mastodon video. *For the public and as a classroom asset for educators; useful as a teaching object.*

Each idea ships with all four surfaces over a 2–3 week production cycle. The probe leads (week 1), the course-note follows (week 2), the essay anchors them (week 3), the video distils (week 3). The newsletter cadence (biweekly) defines the rhythm.

## 3. The Founding Sketch as inaugural artifact

`MANIFESTO.md` (the Founding Sketch, dated 2026-05-10) is published as:

- The `/manifesto` page on `machinespirits.org`.
- Newsletter issue #01.
- A pinned post on Bluesky and Mastodon.
- The "About" reference on LinkedIn and Substack.
- A short video (≤2 min) reading the sketch aloud over a slow pan across the fauna-overlay backdrop.

The first essay (issue #02) reflects on the recursion of asking an AI to plan a critique of AI. The second (issue #03) takes one named figure (Hegel) and one named technical concept (gradient descent) and reads them through each other. After that, the cadence is regular.

## 4. Content engine

### Three rings of output

| Ring | Cadence | Asset types | Purpose |
|---|---|---|---|
| A — Short-form | 3–5/week | Bluesky/Mastodon threads, "Footnote of the day," visual cards | Reach, top-of-funnel, ambient presence |
| B — Mid-form | Biweekly | Newsletter, probe, video, course-note (the "one idea, four surfaces" unit) | Audience-building, authority |
| C — Long-form | Quarterly | arXiv/SSRN preprint, conference submission | Citable scholarship |

### Seed sequence for first 8 newsletter issues

Drawing on existing draft articles in `machinespirits-content-philosophy/articles/`:

1. **#01 — What AI Forgets** (the Founding Sketch).
2. **#02 — On Asking the Machine to Plan its Own Critique** (the recursion essay).
3. **#03 — Robo-Phenomenology** (existing draft, revised).
4. **#04 — Machinagogy** (existing draft, revised).
5. **#05 — Vibe-Scholarship** (existing draft, revised).
6. **#06 — Recognition, Not Just Alignment** (Hegel → Honneth → Jessica Benjamin → why current AI evals miss recognition entirely; first piece deliberately positioned in the alignment conversation).
7. **#07 — Reading Hayles with a Chatbot** (a close reading of *Unthought* paired with transcripts).
8. **#08 — The Dictatorship of the Artificial Intellect** (existing draft, revised; positions us in the political-theory adjacent space).

### Recurring formats audiences can anticipate

- **"Reading [X] with a Chatbot"** — monthly. A primary text + transcripts.
- **"A Probe"** — every newsletter (the probe surface).
- **"Footnote of the day"** — short-form, near-daily, one citation + 2 lines.
- **"Two-author"** — a quarterly format pairing one philosopher with one ML researcher.

## 5. The lab as the strongest argument

The platform's most distinctive asset is that it ships working software arguing the philosophical point. Strategic priorities for the next 6 months:

1. **Public tutor demo.** Pick one course (recommend 480 *Philosophy of AI*) and expose a no-login "Try the Tutor" page. Make the **Ego/Superego dialogue visibly split-pane** so users see the recognition-structure of the response. This is the single most important asset for the ML-researcher and curious-public audiences.
2. **Philosophical probes.** Build a public eval suite specifically targeting *recognition*, *Heideggerian temporality*, *unconscious/nonconscious cognition*, and *charismatic authority* as evaluation criteria. Publish results monthly. This is the asset that gets the platform cited by ML researchers.
3. **Reading-room mode.** Combine the existing `reading-app` (Focus Reader) with the tutor so a visitor can read Hegel/Hayles/Heidegger *with* the AI alongside, with annotations visible. This is the asset that travels among educators and the curious public.
4. **Live tutor sessions.** Monthly streamed reading-group with the tutor as participant. Recorded. Becomes course content.

## 6. Distribution and audience-bridging

Because the audience target is all four, distribution is deliberately wide rather than concentrated.

| Channel | Primary audience served | Cadence | Asset format |
|---|---|---|---|
| `machinespirits.org/lab/probes` | ML researchers, educators | 2–3/month | Probes, demos, transcripts |
| Course-notes in `machinespirits-content-philosophy` | Educators, students | 2–3/month | Course-notes, syllabus inserts, exercises |
| arXiv / SSRN | ML researchers, philosophers | Monthly probe-bundle + quarterly preprint | Probe write-ups, preprints |
| LessWrong / Alignment Forum | ML researchers, alignment community | 1–2/month | Cross-posted probes with discussion |
| LinkedIn (educator networks, instructional design groups) | Educators, instructional designers, journalists | Weekly | Course-notes, pedagogy essays, video |
| Bluesky | ML researchers, educators, philosophers | Daily | Threads, probe announcements, video cross-posts |
| Substack (newsletter home) | All audiences | Biweekly | Essay |
| YouTube | Educators, students, public | Biweekly short + monthly long | Short demos, longer reading-room sessions |
| Mastodon (scholar.social / hci.social) | Philosophers, STS, HCI | Daily | Threads, longer cross-posts |
| Conference venues | ML researchers, educators (primary); academics (secondary) | Continuous submission cycle | Workshop/talk submissions |
| Selective engagement (HN, Reddit r/MachineLearning, r/Professors) | ML, educators | Opportunistic | Replies, occasional posts |
| X / Twitter | (residual) | Cross-post only | Threads |

**Conference targets** (lead with primary-audience venues; rotate quarterly):

- **Primary — ML / alignment / FAccT**: FAccT, NeurIPS workshops (esp. AI for Education, Interpretability, Human-Centered AI), AIES, EAAMO, ICML workshops.
- **Primary — Pedagogy / educator**: SIGCSE, AAC&U, ISSOTL, AI in Education (AIED), Learning @ Scale (L@S), EDUCAUSE.
- *Secondary — Academic philosophy*: APA Continental Division, SPEP, Hegel Society of America.
- *Secondary — STS / HCI*: 4S, AoIR, CHI Critical Computing, DIS.

A reasonable first-year sequence: SIGCSE (early-year deadline) → FAccT submission cycle (deadline winter, conference summer) → NeurIPS workshop proposal (summer) → AIED (year-2). Aim for *one primary-audience venue per quarter* in year one.

## 7. Engagement tactics

- **No daily-news commentary.** React only when a news event lets us teach a platform concept.
- **One-way reply guy.** Reliably show up under researchers' threads with generative citations and rephrasings. Do not argue with strangers.
- **Personal outreach in the first 60 days.** Liam sends a personal note to ~30 named people — **10 ML researchers, 10 educators**, 5 philosophers, 5 journalists/policy — saying *here is what I am building* with one specific artifact to look at (a probe for the ML researchers; a course-note for the educators; the manifesto for the others).
- **The two-author trick** (see `IDENTITY.md`): every essay names two unlikely paired authors in its title.
- **Quote machines as sources.** Tutor transcripts and AI replies are quoted with date and model.

## 8. Community

- **Open reading group.** Once a month, public Zoom or recorded session, one paper from the `machinespirits-readings/` library. The LMS already supports study groups; expose one publicly.
- **Newsletter discussion threads.** Each issue ends with a question; comments stay open.
- **Workshop proposal by month 9.** Target: a *Recognition and AI* workshop at FAccT 2027 or a NeurIPS 2026 workshop. Start informally (a Discord, a shared Google Doc CFP) so the workshop emerges from the network rather than being imposed.
- **Solicit guest essays by month 6** once the newsletter has a base. Target people doing the bridging work in adjacent fields.

## 9. First-30-day punch list

Assumes ~8 hours per week of dedicated time.

- [ ] Pick primary tagline from `IDENTITY.md` candidates (week 1).
- [ ] Publish `MANIFESTO.md` as `/manifesto` on `machinespirits.org` (week 1).
- [ ] Stake handles on Bluesky, Mastodon (scholar.social), Substack, GitHub org, YouTube, LinkedIn (week 1).
- [ ] Send first personal-outreach batch — 4 ML researchers, 4 educators, 1 philosopher, 1 journalist (week 1–2).
- [ ] Stand up Substack with issue #01 = Founding Sketch (week 2).
- [ ] **Publish first probe** on `/lab/probes` — a tutor transcript or eval result with brief interpretation (week 2).
- [ ] Post one Bluesky thread + one Mastodon thread daily for 14 consecutive days, seeded from existing article drafts (weeks 2–4).
- [ ] **Publish first course-note** — one existing article re-cast for classroom use with a discussion prompt and a ready-to-use exercise (week 3).
- [ ] Ship the **public tutor demo** for one course (week 3–4).
- [ ] Publish issue #02 (the recursion essay) (week 4).
- [ ] Record a 2-minute "What AI Forgets" video and post to YouTube + cross-post (week 4).

## 10. Quarterly checkpoints

- **Q1 (May–Jul 2026)**: Identity + first 6 newsletter issues + **public tutor demo** (the core ML-and-educator artifact) + first probe series on `/lab/probes` and on arXiv + 3 course-notes shipped + first preprint draft.
- **Q2 (Aug–Oct 2026)**: First **FAccT or NeurIPS workshop submission** + first **SIGCSE or AIED submission** + open reading group launched + **5 educators adopting a course-note** in their syllabus + 1,000 newsletter subscribers.
- **Q3 (Nov 2026 – Jan 2027)**: Workshop proposal + first podcast appearances + book proposal outlined + **10 documented external classroom uses** + **at least one ML paper citing a Machine Spirits probe** + 2,500 subscribers.
- **Q4 (Feb–Apr 2027)**: Workshop held + book proposal sent + reading-room mode shipped publicly + cross-disciplinary citation footprint measurable + 5,000 subscribers.

## 11. Principles and risks

### Principles to hold

- **Critique and construction, both.** Refuse to be only essays or only software.
- **Bridge by default.** Every artifact must work for at least two of the four audiences; major artifacts work for all four.
- **Date everything.** No undated public output.
- **No founder-theatre.** The work is the work.
- **The reading library is part of the platform.** Read in public, with machines and with each other.

### Risks to watch

- **Academic drift.** Cadence slips to quarterly; language re-thickens. *Counter*: the short-form ring and the four-surface unit force continuous translation.
- **Influencer drift.** Vibes outpace argument. *Counter*: every short-form post carries an anchor citation; every essay carries a probe or a transcript.
- **Single-hammer drift.** Recognition theory becomes the only frame; unconscious, charisma, and time get neglected. *Counter*: rotate the four axes across newsletter issues.
- **Performative recursion fatigue.** The "AI critiquing AI" move gets stale. *Counter*: reserve it for moments when the recursion is genuinely productive, not as a reflex.
- **Solo burnout.** The cadence has to be sustainable for one person initially. *Counter*: re-use existing draft articles for the first 8 issues; do not add new commitments before month 4.
- **Institutional capture.** Pressure to fit the platform into a department, a lab, or a vendor. *Counter*: keep the platform editorially independent of any single institution while collaborating widely.

---

*This document is revised quarterly. Version history is in git.*
