---
author: "Author Lastname"
title: "The Work Being Read"
year: 1807
date: 2026-05-17
our-note: >
  One or two sentences on why this text is in the reading room and what our
  dispatch says about it.
source-url:
source-pdf:
status: scaffold
---

# The Work Being Read — reading-room scaffold

Seed entry establishing the `reading-room/` content source (WEBSITE-REFACTOR.md
§H.3 — the user ruled a dedicated `reading-room/` source). A reading-room
dispatch is our note *about* a primary text, not the text itself.

The public URL is **path-derived**:
`reading-room/2026-05-17-scaffold-example/index.md` →
`/reading-room/2026-05-17-scaffold-example` (bare-path; the
`YYYY-MM-DD-author-title` form is the IDENTITY.md scheme, `date` = when we
wrote the note).

`source-pdf:` is intentionally empty — the primary-text PDFs are hosted on a
CDN, **not** committed to this repo. That CDN infra is a separate deferred
item (WEBSITE-REFACTOR.md §I.3), owed outside the content pipeline. Until it
lands, `source-url:` (a link out) is the only live source pointer.
