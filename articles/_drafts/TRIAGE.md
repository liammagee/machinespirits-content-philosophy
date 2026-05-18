# Articles triage
# Last reviewed: 2026-05-16
#
# Three fates: PUBLISH (public essay/probe/reading-room entry on the site),
#              INTERNAL (not public — teaching notes, tooling docs, drafts),
#              TOOLS (/tools or /colophon — platform-facing, not research-facing).
#
# A file is PUBLISHED by location/form, not a flag: a sibling .html exists and
# no path component starts with _ (see CONVENTIONS.md "The rule"). There is no
# `status:` key. PUBLISH below is an editorial verdict, not a frontmatter value.
#
# Public essays still want index metadata in frontmatter so the /essays index
# renders well: title, date (YYYY-MM-DD), theme, dek. `slug` is derived from the
# path and reading time is computed — do not author them. Full spec + the audit:
# CONVENTIONS.md "Index metadata (presentational frontmatter)" and "What ./lint does".

# ── theme taxonomy ───────────────────────────────────────────────────────────
# `theme` is a single tag per essay, drawn ONLY from this controlled vocabulary.
# It drives the /essays filter. Pick the closest axis; retag freely later.
#
#   recognition           — Hegelian recognition, intersubjectivity, master/
#                            slave, mutual recognition in AI tutoring.
#                            e.g. hegel-voice-2, discarded-master, machinagogy
#   nonconscious cognition — Hayles; machine perception/inference below
#                            awareness; phenomenology of machine "experience".
#                            e.g. robo-phenomenology, era-ai, full-paper
#   charisma               — authority, persuasion, the social force of
#                            automated authorship; eroded epistemic authority.
#                            e.g. vibe-scholarship, dictatorship
#   time                   — history, futurity, succession, phenomenology of
#                            time, stochastic temporality.
#                            e.g. stochastic-society, computer-phenomenology-of-time

# ── post-sweep state (2026-05-16) ────────────────────────────────────────────
# A de-publish sweep moved every INTERNAL/TOOLS file and the non-canonical
# duplicates into the topic's _drafts/ (source kept, fully reversible). A
# second pass (2026-05-16) demoted 3 non-ready stubs and routed the
# Drama-Machine paper to /probes. Served set is now 12: 4 essay-eligible
# (2 index-clean, 1 held for transcript cleanup, 1 blocked) + 8 held-out.
#
# HELD OUT of /essays (still served, destined for a not-yet-built surface — the
# future /essays indexer MUST exclude these paths):
#   hegel-primary-texts/*                    → /reading-room
#   publications/publications.*              → /about (or /publications)
#   ai-tutor/machinagogy-v2.*                → /probes  (formal paper)
#   ai-pedagogy/geist-explained.html         → /probes  (its reader's guide)
#   ai-pedagogy/multiagent-tutor-architecture.* → /probes  (Drama-Machine paper, decided 2026-05-16)
#   ai-tutor/full-paper-2026-01-28.*         → unresolved (see below); not an essay yet
#
# CAVEAT: articles/TRIAGE.html and articles/sitemap.html were git-rm'd, but
# `./build --all` will re-render TRIAGE.md → TRIAGE.html. A build/indexer skip
# for top-level meta files (TRIAGE.*, sitemap.*) is an open follow-up.
#
# BUG: hegel-essays/hegel-voice-1.md is mis-saved — its title/body are
# "Character Development in Contemporary Cinema" (film notes), not Hegel.
# Needs the correct source pasted in before it can publish. (Liam.)

## _drafts/
fate: INTERNAL
files:
  - computer-phenomenology-of-time.md   # promising draft — possible future essay (theme: time)
  - pleasurable-guilts.md               # early fragment — keep hidden

## ai-pedagogy/
fate: MIXED
files:
  - robo-phenomenology.md    # → NOT READY (165w image-skeleton) — swept to _drafts/ 2026-05-16; theme: nonconscious cognition when written
  - era-ai.md                # → NOT READY (281w outline) — swept to _drafts/ 2026-05-16; theme: nonconscious cognition when written
  - multiagent-tutor-architecture.md  # → /probes — 4640w formal paper (Drama Machine), same shape as machinagogy-v2 (decided 2026-05-16)
  - geist-explained.html     # → /probes — hand-authored reader's guide; public face of machinagogy-v2 (decided 2026-05-16)

## ai-tutor/
fate: MIXED
files:
  - full-paper-2026-01-28.md  # → unresolved: probe source or essay #07 ("Reading Hayles with a Chatbot"); held out of /essays meanwhile
  - machinagogy-v2.md         # → /probes — formal paper (*Geist in the Machine*, abstract+bib) (decided 2026-05-16)
  - branch-status.html        # → INTERNAL — swept to _drafts/ 2026-05-16
  - review-machinagogy-v2.md  # → INTERNAL — peer-review notes; swept to _drafts/ 2026-05-16
  - _drafts/                  # → INTERNAL (keep hidden)

## dictatorship/
fate: PUBLISH (newsletter #08)
notes: "The Dictatorship of the Artificial Intellect" — draft in progress; target newsletter #08.
       theme: charisma. Check _drafts/ for latest version before publishing.

## dissertations-critique/
fate: INTERNAL
files:
  - thoughts-on-dissertations.md  # teaching notes — swept to _drafts/ 2026-05-16

## hegel-essays/
fate: PUBLISH (essays)
files:
  - hegel-voice-1.md    # → essay; BUG: file holds cinema notes, not Hegel — BLOCKED on correct source (theme: recognition once fixed)
  - hegel-voice-2.md    # → essay "Back to the Future with Hegel"; theme: recognition; dek HELD until raw-transcript cleanup (prose will change)
  - discarded-master.md # → essay; INDEX-CLEAN 2026-05-16 (theme: recognition; dek written; date 2024-01-01 provisional)

## hegel-primary-texts/
fate: READING-ROOM (source texts, not essays)
files:
  - history-philosophy.md  # Hegel's Lectures on the History of Philosophy — reading-room source
  - logic-being.md         # Science of Logic (Being) — reading-room source
  - philosophy-right.md    # Philosophy of Right — reading-room source
notes: HELD OUT of /essays. Dates (1837/1812/1821) are the source works', not publication dates.
       PDFs should move to CDN; reference by URL. These become
       /reading-room/YYYY-MM-DD-hegel-* entries with an "our-note" field.

## lms-docs/
fate: TOOLS (/tools or /colophon)
files:
  - instructor-guide.md  # → /tools or /about — swept to _drafts/ 2026-05-16
  - student-guide.md     # → /tools — swept to _drafts/ 2026-05-16

## markdown-citations/
fate: INTERNAL
files:
  - markdown-bibtex-guide.html  # tooling reference — swept to _drafts/ 2026-05-16

## publications/
fate: PUBLISH (/about or a /publications page)
files:
  - publications.md  # → bibliography/CV section of /about; HELD OUT of /essays (not an essay)

## stochastic-society/
fate: PUBLISH (essay draft) — NOT READY
files:
  - stochastic-society.md  # → 31w empty stub (published: false) — swept to _drafts/ 2026-05-16; theme: time; assign an issue # when written

## vibe-scholarship/
fate: PUBLISH (newsletter #05)
files:
  - vibe-scholarship-article.md  # → CANONICAL; INDEX-CLEAN 2026-05-16 (theme: charisma; dek written; date 2025-01-01 provisional)
  - vibe-scholarship.md          # → non-canonical 90-min workshop skeleton — swept to _drafts/ 2026-05-16
notes: Canonical resolved. The workshop skeleton is archived in _drafts/.

## web-design-ai/
fate: INTERNAL
files:
  - web-design-ai-era.md  # internal notes on web design + AI — swept to _drafts/ 2026-05-16
