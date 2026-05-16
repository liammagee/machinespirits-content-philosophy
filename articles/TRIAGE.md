# Articles triage
# Last reviewed: 2026-05-13
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

## _drafts/
fate: INTERNAL
files:
  - computer-phenomenology-of-time.md   # promising draft — possible future essay
  - pleasurable-guilts.md               # early fragment — keep hidden

## ai-pedagogy/
fate: PUBLISH (essays)
files:
  - robo-phenomenology.md    # → newsletter #03 "Robo-Phenomenology"; needs date + slug frontmatter
  - era-ai.md                # → essay; review and date before publishing
  - multiagent-tutor-architecture.md  # → possible lab/probe write-up rather than essay; review

## ai-tutor/
fate: MIXED
files:
  - full-paper-2026-01-28.md  # → review: possible probe source or essay #07 ("Reading Hayles with a Chatbot")
  - branch-status.html        # → INTERNAL (development status page, not public)
  - _drafts/                  # → INTERNAL (keep hidden)

## dictatorship/
fate: PUBLISH (newsletter #08)
notes: "The Dictatorship of the Artificial Intellect" — draft in progress; target newsletter #08.
       Check _drafts/ for latest version before publishing.

## dissertations-critique/
fate: INTERNAL
files:
  - thoughts-on-dissertations.md  # teaching notes — not for public publication

## hegel-essays/
fate: PUBLISH (essays)
files:
  - hegel-voice-1.md    # → essay; one of the "Hegel + [ML concept]" two-author pieces
  - hegel-voice-2.md    # → essay; same series
  - discarded-master.md # → review: may be a reading-room dispatch rather than a full essay

## hegel-primary-texts/
fate: READING-ROOM (source texts, not essays)
files:
  - history-philosophy.md  # Hegel's Lectures on the History of Philosophy — reading-room source
  - logic-being.md         # Science of Logic (Being) — reading-room source
  - philosophy-right.md    # Philosophy of Right — reading-room source
notes: PDFs should move to CDN (§I.3 equivalent for content package); reference by URL.
       These become /reading-room/YYYY-MM-DD-hegel-* entries with an "our-note" field.

## lms-docs/
fate: TOOLS (/tools or /colophon)
files:
  - instructor-guide.md  # → /tools or /about — platform documentation, not research
  - student-guide.md     # → /tools — same

## markdown-citations/
fate: INTERNAL
files:
  - markdown-bibtex-guide.html  # tooling reference; not public

## publications/
fate: PUBLISH (/about or a /publications page)
files:
  - publications.md  # → bibliography/CV section of /about; or a standalone /publications page

## stochastic-society/
fate: PUBLISH (essay draft)
files:
  - stochastic-society.md  # → essay; topic overlaps with newsletter sequence; assign an issue #

## vibe-scholarship/
fate: PUBLISH (newsletter #05)
files:
  - vibe-scholarship-article.md  # → this appears to be the longer, more developed version
  - vibe-scholarship.md          # → shorter version or earlier draft; pick one as canonical
notes: Two versions exist — compare and pick the canonical one; archive the other in _drafts/.

## web-design-ai/
fate: INTERNAL
files:
  - web-design-ai-era.md  # internal notes on web design + AI; not part of the research program
