---
title: "Probe 01 — scaffold"
date: 2026-05-17
n: 1
theme: recognition
summary: >
  Type-defining seed for the probes/ source. Establishes the frontmatter
  contract and the path-derived URL form so urls/sitemap/artifacts-index can
  enumerate probes. Replace this body with the real Probe 01 write-up.
expands:
status: scaffold
figure: figure.svg
---

# Probe 01 — scaffold

This is the seed entry that establishes the `probes/` content source. It is
**not** a published probe — `status: scaffold`, and the build treats it as a
buildable source the URL/sitemap/artifact tooling can enumerate.

A real probe replaces this body with the eval write-up and supplies the single
`figure:` asset (one figure per probe — see `CONVENTIONS.md`). The figure asset
itself is owed editorially (no raster/vector probe assets exist in the repo
yet), the same posture as the §3.8 default OG sigil.

The URL is **path-derived** from the directory name: this file lives at
`probes/probe-01-scaffold/index.md`, so its public URL is
`/lab/probes/probe-01-scaffold` (bare-path, per IDENTITY.md and
WEBSITE-REFACTOR.md §A). `n:` and the directory's numeric prefix carry the
probe number for display; `slug` is never authored (CONVENTIONS.md invariant).
