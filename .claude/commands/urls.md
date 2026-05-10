---
description: List URLs from the content repo (passthrough to ./urls)
argument-hint: [published|drafts|hidden|site|static] [--plain] [--base <url>]
allowed-tools: Bash(./urls:*)
---

Run `./urls $ARGUMENTS` from the project root and print the output verbatim in a fenced code block. Do not summarise, reformat, or comment unless the user explicitly asks a follow-up question.

Mode reference (for your own context — do not echo this back):
- (no args)            all three sections (published / drafts / hidden), with colour
- `published`          only published `.html` paths
- `drafts`             only `.md` files lacking a built `.html` sibling
- `hidden`             paths under any `_*/` ancestor
- `site`               SPA hash-route URLs (`https://machinespirits.org/#/<slug>`)
- `static`             raw URLs (`https://machinespirits.org/content/...`) — every HTML, served standalone
- `--plain`            no ANSI colour
- `--base <url>`       override host for `site` / `static`
