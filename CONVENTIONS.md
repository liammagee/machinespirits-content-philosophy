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

The frontmatter audit (`./lint`, below) reports — but never blocks — published,
essay-eligible files that are missing or malforming these. It applies the same
deliberate non-essay exclusions from `config/essay-exclusions.txt` as `./urls`
and the brand renderer. Missing index metadata degrades the listing only; it
never changes whether the page is served.

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
| `reading-room/` | `reading-room/YYYY-MM-DD-author-title/index.md` | `/research/dispatches/YYYY-MM-DD-author-title` |

Presentational frontmatter (read only for indexing/headers, never for state):

- **probes** — `title`, `date`, `n` (probe number), `theme` (the four-axis
  vocabulary), `summary`, `expands` (link to the essay/course-note it tests),
  `status`, `figure` (one figure per probe; the build renders it).
- **notes** (the *course-note* type) — `title`, `date`, `course` (which course
  it came from), `prompt`, `exercise`, `summary`.
- **reading-room** — editorial dispatch sources rendered at
  `/research/dispatches`; `author`, `title`, `year`, `our-note`, `source-url`,
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

`./build` only re-renders files whose `.md` is newer than its `.html`, so it's
safe to run repeatedly. That mtime test is an optimisation, not a safety
mechanism — pages whose `.html` is the source are protected by
`config/render-exclusions.txt` instead.

### Hand-authored HTML (passes straight through)

    edit articles/<topic>/page.html
    ./publish

No `./build` needed. The file is its own source.

A co-existing `.md` is fine, and is how a hand-authored page earns an `/essays`
index entry — but list it in `config/render-exclusions.txt` when you add one.
That manifest, not file mtime, is what keeps Pandoc off the page. Git does not
preserve mtimes, so on a fresh clone the `.md` is never older than the `.html`;
`./build --all` and `./build <file>` ignore mtime outright. Without an entry the
page would be replaced by a near-empty rendering of the metadata stub.

`./build` refuses to overwrite any existing `.html` that is not Pandoc output, so
a page missing from the manifest fails the build loudly rather than being lost.

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

- Skip the file entirely if it is listed in `config/render-exclusions.txt` — its `.html` sibling is the page, not build output. Checked before `--all` and before single-file builds, so neither can destroy such a page.
- Refuse the file, and fail the build, if `foo.html` exists but is not Pandoc output and is not listed in the manifest. This is the backstop for a hand-authored page nobody remembered to list.
- If `foo.html` is missing or older than `foo.md`, run Pandoc with citeproc and write `foo.html` next to it.
- Pandoc reads `bibliography:` from frontmatter (relative paths resolve against the article's directory).
- `--all` flag forces regeneration of everything that is not render-excluded.
- Pass a path to render one file: `./build articles/dictatorship/essay.md`.

## What `./lint` does

Audits **index metadata**, never state. For each *published, essay-eligible*
article (the location rule: `articles/**/*.html` minus `_*` paths and the
content-owned exclusions in `config/essay-exclusions.txt`) it reads the sibling
`.md`'s frontmatter and reports any missing/malformed `title`, `date`
(`YYYY-MM-DD`), `theme`, or `dek`. `./urls`, `./lint`, and the brand renderer
all load that same manifest; missing or malformed policy is a hard failure.

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
