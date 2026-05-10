# Custom Claude Skills — Machine Spirits Repos

A catalog of every project-scoped Claude Code extension across the Machine Spirits ecosystem. Use it to find an existing skill before building a new one, and to remind yourself what's available in a given repo.

This file lives in the content repo because it's the most stable, lowest-traffic root in the cluster — but it documents skills owned by *each* repo individually. Each skill must be invoked from inside its own repo; Claude Code only loads `.claude/` from the current working tree.

## Conventions across the cluster

Three extension formats are in use. They are not interchangeable.

| Format | Location | Invocation | Notes |
|---|---|---|---|
| **Slash command** | `.claude/commands/<name>.md` | `/<name>` typed by the user | Markdown file with optional YAML frontmatter; body is a prompt template |
| **Subagent** | `.claude/agents/<name>.md` | Claude delegates via the `Agent` tool | Frontmatter `model:` picks the tier; not user-invocable |
| **Skill** | `.claude/skills/<name>/SKILL.md` | `/<name>` (some marked `disable-model-invocation`) | Self-contained dir; can ship reference files alongside |
| **Plugin command** | `.claude/plugins/<plugin>/commands/<name>.md` | `/<plugin>:<name>` | Group of commands forming a named toolkit |

Frontmatter conventions worth knowing:

- `model:` — `haiku` / `sonnet` / `opus` — picks the tier for a subagent or heavy command.
- `effort:` — `low` / `medium` / `high` — hint for orchestrators about cost.
- `user_invocable:` (or `user-invocable:`) — `false` blocks the user from typing the slash directly; the command exists for orchestrators only.
- `disable-model-invocation:` — set on skills that *only* the user should trigger (running an eval, etc.).
- `context: fork` — the command should run in a forked context window so its scratch work doesn't pollute the main thread.
- `allowed-tools:` — restricts the tool set the command may call. Common values: `Bash(./<script>:*)` to scope shell access to one binary, or `mcp__claude-in-chrome__*` for browser-driving commands.

---

## machinespirits-website (`liammagee/machinespirits`)

The LMS site — React/Vite frontend + Express backend.

### Slash commands

| Name | Description |
|---|---|
| `/qa` | Run the QA Explorer Playwright crawler (`scripts/qa-explorer.js`), then triage the markdown report under `reports/`. Groups findings by root cause, iterates fixes (rebuild + re-crawl) until major = 0. Use after non-trivial UI or content changes. |

### Subagents

| Name | Model | Description |
|---|---|---|
| `test-coverage-reviewer` | sonnet | Reviews code changes for adequate test coverage, identifies gaps, updates existing tests after code modifications. Invoked proactively after new features, refactors, or bug fixes. |

---

## machinespirits-content-philosophy (this repo)

The content package — articles, courses, theme, prompts. Consumed by the website at deploy time.

### Slash commands

| Name | Description |
|---|---|
| `/publish [msg]` | Publish content edits to machinespirits.org. `cd`s into this repo, generates a commit message from the changed files (or uses the arg verbatim), stages everything, commits with `Co-Authored-By` line, pushes. The push triggers the deploy. Mirrors the `./publish` shell script. |
| `/urls [published\|drafts\|hidden\|site\|static] [--plain] [--base <url>]` | Passthrough to `./urls`. Lists files / URLs by state. Tools restricted to `Bash(./urls:*)`. |

---

## machinespirits-design (`rastersysteme`)

The slide-deck composition pipeline. Has the most extensions of any repo — the work is loop-heavy and benefits from delegated agents.

The design repo embodies a **two-loop methodology**: an *inner loop* (automated rubric-targeted refinement) and an *outer loop* (human-in-the-loop rubric calibration), with an *outer-outer* loop that updates the paper describing the methodology.

### Slash commands (top-level)

| Name | Effort | Description |
|---|---|---|
| `/rs` | — | Context-aware skill navigator. Scans deck state, shows relevant skills grouped by intent, suggests next steps. The entry point for the rastersysteme toolkit. |
| `/design` | — | Inner loop: apply rubric-targeted improvements to composed deck design directives. Requires outer-loop-validated rubric. |
| `/evaluate` | medium | Inner loop: score a rendered slide deck against the design rubric. Headless + jsdom evaluators on every slide. |
| `/refine-loop` | high | Inner loop recursive design/evaluation cycle — evaluate, improve, re-render, re-evaluate until rubric scores plateau. |
| `/refine-step` | medium | Single idempotent refinement iteration — for `/loop` integration. |
| `/peer-review [--status\|--converge]` | — | Iterative academic peer review and refinement for the concentric-loops paper. The outer-outer loop reviewing its own description. |
| `/chrome-keepalive` | — | Internal utility — keeps Chrome extension connection alive during long operations. |

### Subagents

| Name | Model | Description |
|---|---|---|
| `deck-fix` | opus | Autonomous deck improvement. Evaluates, edits composed markdown to fix weak rubric dimensions, re-renders, re-splices, re-evaluates until threshold (default 80%). |
| `deck-review` | sonnet | Multi-perspective review — runs rubric eval, content analysis, design audit, overflow detection in parallel; synthesizes a prioritized improvement plan. |
| `inner-loop` | opus | Automated design refinement. Identifies weak dimensions, fixes directives, re-renders, splices, re-evaluates. Runs the convergence cycle until plateau. |
| `outer-loop` | opus | Rubric calibration. Compares rubric scores to visual reality in Chrome, identifies blind spots and false positives, updates rubric code to match user perception. |
| `overflow-audit` | haiku | Scans composed markdown for text overflow using pretext measurement; suggests fixes (font reduction, content split, zone expansion) before rendering. |
| `splice-evaluator` | sonnet | Splices images into a deck, runs rubric eval, reports splice health metrics. |
| `synthesize` | opus | The Evolve loop — *the outer-outer loop IS the paper*. Updates the concentric-loops paper with new findings, re-composes, renders, splices, evaluates, refines to >= 80%. |
| `text-measure` | haiku | Text measurement specialist using pretext — finds optimal font sizes for zones, checks if text fits before rendering. |

### Skills

| Name | Description |
|---|---|
| `gslides-imagine <url> [--generate] [--upload] [--style <name>]` | Extract content from a Google Slides presentation, generate image prompts via Claude, create images via Midjourney/Imagen, upload as atmospheric backgrounds. |
| `refresh-content <source.md> <composed.md> [--render] [--output <path>]` | Reload source markdown into an existing composed deck, preserving all design directives. For minor edits that don't need a full recompose. |
| `watch-decks [--timeout <ms>] [--persistent]` | Background monitor that watches `decks/` for HTML changes and auto-scores each modified deck with rubric-jsdom. Use during refine loops to see convergence in real time. |

### Plugin commands — `rs` toolkit (`/rs:<name>`)

The cohesive composition pipeline. Most are `user_invocable: true`; the heavy ones run in a forked context.

| Name | Tier / Notes | Description |
|---|---|---|
| `/rs:help` | — | Same as `/rs` — context-aware skill navigator. |
| `/rs:audit` | high effort | Outer-outer loop: review all deck progress, verify skills/rubric/eval have learned from the corpus. Closes the self-improvement loop. |
| `/rs:batch` | — | Run a skill across all decks in batch — splice-images, qa-visual, render, compose, or any per-deck operation. |
| `/rs:build-deck` | opus, high effort | Full pipeline: compose → render → inner loop → outer loop checkpoint. Feeds the design database. |
| `/rs:compose` | opus, high effort, fork context | Claude-directed composition on source markdown — assigns design directives (grid zones, typography, colors, accents) per slide. |
| `/rs:imagine` | opus, high effort, fork context | Generate consistent image prompts for each slide with a visual thread connecting the series. Optionally generate images. |
| `/rs:splice-images` | opus | Merge generated images into an HTML deck with intelligent, collision-aware placement. |
| `/rs:render` | — | Re-render an HTML deck from its composed markdown source. Optionally splices and reloads in Chrome. |
| `/rs:edit-slide` | — | Edit a specific slide's content, design directive, or layout. Reads context, verifies in Chrome. |
| `/rs:insert-slide` | — | Insert a new slide at a position, with a design directive that fits the surrounding context. |
| `/rs:delete-slide` | — | Remove one or more slides with confirmation and re-render. |
| `/rs:diff` | — | Visual diff between two versions of a composed deck — shows changed slides, modified directives, side-by-side rendering. |
| `/rs:compare` | — | Multi-variant comparison across intensity levels and themes, with rubric eval and side-by-side review. |
| `/rs:design-system` | — | Manage design systems — list, preview, generate new ones, apply a saved system to a deck. |
| `/rs:design-polish` | not user-invocable | Polish a rendered deck — enlarge foreground images, bump text sizes, fix contrast, verify no overlap. |
| `/rs:pace` | — | Add timing cues to slide speaker notes based on presentation duration. Estimates time per slide from content weight. |
| `/rs:preview` | Chrome MCP | Open a slide deck in Chrome and navigate to a specific slide for visual inspection. |
| `/rs:studio` | Chrome MCP | Open the studio viewer — a precision presentation tool with grid view, QA panel, speaker notes. |
| `/rs:qa-visual` | Chrome MCP | Accessibility and design-consistency audit. Headless-first; Chrome only for screenshots of problem slides. |
| `/rs:qa-fix-loop` | — | Autonomous cycle: audits a deck, fixes issues, re-renders, verifies. Loops until clean. |
| `/rs:uat` | medium effort | Outer loop: User Acceptance Testing — screenshot every slide, compare wireframes, generate HTML checklist for human review. |
| `/rs:export` | — | Export a slide deck to PDF or PPTX. |
| `/rs:promote` | — | Triage untracked scripts — classify as reusable tools or one-off hacks; promote keepers, delete throwaways. |

---

## machinespirits-eval

The tutor evaluation system. Skills here are mostly DB-driven — query the runs database, manage runs, build the paper.

### Skills

| Name | Description |
|---|---|
| `/run-eval <cell-profiles> [--runs N] [--model provider.alias]` | Run an evaluation with specified cells; handles the full generation + judging pipeline. **Disabled for model invocation** — user-only. |
| `/resume-run <run-id>` | Resume an incomplete eval run — diagnose missing tests, clean empty rows, resume generation, start judging. **Disabled for model invocation**. |
| `/clean-runs [stalled\|artifacts\|all]` | Identify and remove stalled, failed, or test-artifact evaluation runs from the database. |
| `/query-db <natural-language-question>` | Query the evaluation database for results, run metadata, or cross-run comparisons. |
| `/analyze-run <run-id>` | Pull scores from the DB, compute statistics, summarize findings for a single run. |
| `/analyze-data <analysis-type-or-question>` | Route an analysis question to the correct script with exact invocation syntax. |
| `/deep-dive [run-id\|cell-pattern\|--coverage] [--level quick\|standard\|full]` | Multi-layer analysis — scores, trajectories, transcripts, qualitative assessment. |
| `/cell-info <cell-name-or-number>` | Look up a cell's architecture by reading `tutor-agents.yaml`. **Rule: never guess, always check.** |
| `/check-models [model-alias]` | Check rate limits and OpenRouter model availability (default: `nemotron`). |
| `/build-paper` | Build the research paper PDF and check for issues. |
| `/author-paper2 <section> [--verify-only\|--claims-only\|--diff]` | Reproducible recipe for authoring Paper 2.0 sections with maximum traceability. |
| `/litreview <topic-and-questions> [--out <path>] [--areas <01,05,09>] [--depth quick\|standard\|deep]` | Synthesize the local PDF corpus into an architecture-aimed literature review for a topic, cross-referenced against current project decisions. |

---

## machinespirits-eval-repro-20260225

A frozen reproduction snapshot of `machinespirits-eval`. Has a strict subset of the eval skills, kept stable for citation/reproducibility.

### Skills

`/run-eval`, `/resume-run` (implicit), `/query-db`, `/analyze-run`, `/check-models`, `/build-paper` — same descriptions as in `machinespirits-eval`. Don't edit these to track upstream changes; the point of this repo is that it doesn't move.

---

## machinespirits-ide

Workbench/desktop integration. One skill so far.

### Skills

| Name | Description |
|---|---|
| `research-feed` | Manage and query the NightOwl research-feed plugin through its MCP tools. List/add/remove/enable sources (arxiv, reddit, bluesky, mastodon, googleSearch, googleScholar, chromeTabs); import open Chrome tabs (macOS); search adapters one-shot; browse cached items by relevance; save to citations; dismiss; prune. Triggered by phrases like *"the feed"*, *"what I'm tracking"*, *"open tabs"*, *"recent papers"*, *"save this to citations"*. |

---

## Maintenance

When you add, rename, or remove a skill in any of the repos above, update this file. The catalog rots if it isn't kept current — and the cost of an outdated catalog is higher than no catalog (people will trust it and waste time on dead paths).

Quick check from the cluster root:

```bash
find ~/Dev/machinespirits -path '*/node_modules' -prune -o \
  -path '*/.git' -prune -o -path '*/worktrees' -prune -o \
  \( -path '*/.claude/commands/*.md' -o \
     -path '*/.claude/agents/*.md' -o \
     -path '*/.claude/skills/*/SKILL.md' -o \
     -path '*/.claude/skills/*.md' -o \
     -path '*/.claude/plugins/*/commands/*.md' \) -print | sort
```

If that listing diverges from this document, this document is wrong.
