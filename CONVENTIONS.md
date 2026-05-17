# Content Conventions

How drafts, sources, and published articles live in this repo.

## The rule

A file's **location** and **form** determine its state. No frontmatter flags.

| Location / form | State |
|---|---|
| `articles/<topic>/foo.html` (with or without sibling `.md`) | **Published** — indexed, served |
| `articles/<topic>/foo.md` only (no sibling `.html`) | **Buildable** — `./build` will render it |
| Any path containing a component starting with `_` | **Hidden** — never built, never indexed |

The website indexer walks `articles/**/*.html` and skips any path with a `_*` component.
That's the only filter rule.

## Index metadata (presentational frontmatter)

State is still **only** location/form (above) — *no frontmatter key ever
publishes, hides, or unpublishes a file*. Frontmatter is read **only to render
the `/essays` index and essay headers**. A published `.html` with no frontmatter
is still served; it just appears thinly in the index.

| Field | Wanted for a good index entry | Notes |
|---|---|---|
| `title` | yes | Display title (may differ from the first `#` heading). |
| `date` | yes | `YYYY-MM-DD`. The essay URL is `/essays/<date>-<slug>`. |
| `theme` | yes | One short theme tag — drives the index theme filter. Allowed values are an editorial taxonomy (see `TRIAGE.md`). |
| `dek` | yes | One-sentence standfirst shown under the title in the index. |
| `slug` | — | **Derived from the file path** — do not author a `slug:` key. |
| reading time | — | **Computed** from word count at index time — not authored. |

The frontmatter audit (`./lint`, below) reports — but never blocks — published
files that are missing or malforming these. Missing index metadata degrades the
listing only; it never changes whether the page is served.

## New content sources: `probes/`, `notes/`, `reading-room/`

These three first-class sources (added in the §4 content-pipeline pass;
manifest `content.probes` / `content.notes` / `content.reading-room`) obey the
**same invariant as `articles/`**: location and form determine state, no
frontmatter flag ever publishes or hides, and the slug is **path-derived — never
authored**. Their public URLs are **bare-path** (no trailing slash, no `.html`)
per `IDENTITY.md` and `WEBSITE-REFACTOR.md` §A; the `urls` script enumerates
them and fails the build on collisions or malformed slugs.

| Source | File layout | Public URL (path-derived) |
|---|---|---|
| `probes/` | `probes/probe-NN-<slug>/index.md` | `/lab/probes/probe-NN-<slug>` |
| `notes/` | `notes/<YYYY-MM-DD->-<slug>.md` | `/notes/<YYYY-MM-DD->-<slug>` |
| `reading-room/` | `reading-room/YYYY-MM-DD-author-title/index.md` | `/reading-room/YYYY-MM-DD-author-title` |

Presentational frontmatter (read only for indexing/headers, never for state):

- **probes** — `title`, `date`, `n` (probe number), `theme` (the four-axis
  vocabulary), `summary`, `expands` (link to the essay/course-note it tests),
  `status`, `figure` (one figure per probe; the build renders it).
- **notes** (the *course-note* type) — `title`, `date`, `course` (which course
  it came from), `prompt`, `exercise`, `summary`.
- **reading-room** — `author`, `title`, `year`, `our-note`, `source-url`,
  `source-pdf` (primary-text PDFs live on a CDN, **not** in this repo — see
  `WEBSITE-REFACTOR.md` §I.3), `date` (when we wrote the note).

Reconciliation note: WEBSITE-REFACTOR.md §H.1 lists `slug` in the probe
frontmatter. That bullet is superseded by this file's standing invariant — the
slug is derived from the directory/file name (the `n:` key and the `probe-NN-`
prefix carry the number for display). One authority for state and URL: the
path. Do not author a `slug:` key in any source.

## Workflows

### Markdown → local Pandoc → publish (most common)

    edit articles/<topic>/essay.md
    ./build                                # regenerates stale HTML
    open articles/<topic>/essay.html       # preview locally
    ./publish

`./build` only re-renders files whose `.md` is newer than its `.html`, so it's safe to run repeatedly.

### Hand-authored HTML (passes straight through)

    edit articles/<topic>/page.html
    ./publish

No `./build` needed. The file is its own source. Co-existing `.md` is fine if you want one — Pandoc just won't overwrite the hand-authored HTML *unless its `.md` is newer*.

### Working notes / scratch

    mkdir -p articles/<topic>/_drafts
    edit articles/<topic>/_drafts/notes.md

Anything inside `_drafts/` (or any `_*` folder, anywhere in the path) is invisible to `./build` and to the website indexer. Use this for raw chats, fragments, half-thoughts.

### Unpublishing

    git rm articles/<topic>/foo.html       # source stays
    ./publish

The `.md` source remains in the repo; only the rendered output is removed. Re-running `./build` will re-render it.

## What `./build` does

For each `articles/**/*.md` and `courses/**/*.md` outside `_*` paths:

- If `foo.html` is missing or older than `foo.md`, run Pandoc with citeproc and write `foo.html` next to it.
- Pandoc reads `bibliography:` from frontmatter (relative paths resolve against the article's directory).
- `--all` flag forces regeneration of everything.
- Pass a path to render one file: `./build articles/dictatorship/essay.md`.

## What `./lint` does

Audits **index metadata**, never state. For each *published* article (the
location rule: `articles/**/*.html` minus `_*` paths) it reads the sibling
`.md`'s frontmatter and reports any missing/malformed `title`, `date`
(`YYYY-MM-DD`), `theme`, or `dek`.

- Report-only by default — a thin entry is a quality issue, not a build error.
- `./lint --strict` exits non-zero on any gap (for future CI).
- `slug` and reading time are never checked: both are derived/computed, not authored.

## Alternative: website-side rendering

The same conventions support the website rendering Markdown at deploy time instead of locally:

- Don't commit the `.html` artifacts (gitignore `articles/**/*.html`, but keep hand-authored ones — distinguish via a marker comment or separate folder).
- The website indexer walks `**/*.md` (skipping `_*`), runs Pandoc at build time.

The local-Pandoc path is the default because it lets you preview rendered output before pushing and keeps Pandoc out of the deploy pipeline.

## Migration notes

Files that were working notes / raw chats and shouldn't be indexed:

- `articles/dictatorship/claude-chat-07-05-2026.md`
- `articles/dictatorship/gpt-pro.md`
- `articles/dictatorship/dictatorship-pdf.md` (if a working draft)
- `articles/ai-tutor/notes.md`

Move them under `_drafts/` in their respective topic folders to keep them in version control without publishing them.
