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
