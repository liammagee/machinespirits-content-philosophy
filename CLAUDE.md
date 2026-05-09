# machinespirits-content-philosophy

Content package for machinespirits.org. Articles, courses, theme, and tutor prompts. The website (`liammagee/machinespirits`) consumes this repo and redeploys when it receives a `content-updated` event.

## Authoring workflow — four scripts in repo root

| Script | What it does |
|---|---|
| `./build` | Renders `.md` → `.html` via Pandoc with citeproc. Skips `_*` paths. Skips up-to-date files (mtime check). Exits non-zero on failure. Flags: `--all` (force), `<path>` (single file). |
| `./serve` | Starts `python3 -m http.server` on port 8000, generates `_preview.html` index page (gitignored), opens browser. For local preview of rendered output. |
| `./urls` | Text listing of published / draft / hidden files. `./urls drafts` filters; `--plain` for piping. `./urls site` emits live URLs (`--base` to override default). |
| `./publish "msg"` | Runs `./build`, then `git add -A`, commits, `git pull --rebase --autostash`, pushes. The push triggers redeploy. |

**Always use `./publish` to ship.** It gates the push on `./build` succeeding, which prevents broken articles from reaching the live site.

## Status by file location and form (no frontmatter flag)

| Where the file is | State |
|---|---|
| `articles/<topic>/foo.html` (with or without `.md` sibling) | **Published** — indexed and served |
| `articles/<topic>/foo.md` only, no `.html` | **Draft, buildable** — `./build` will render it next run |
| Any path with a `_*` component (e.g., `_drafts/`, `_archive/`) | **Hidden** — never built, never indexed, kept in version control |

The website-side indexer enforces this by walking `articles/**/*.html` and skipping any path containing a `_*` component.

## Common operations

| Goal | Action |
|---|---|
| Start a new article | Create `articles/<topic>/essay.md` with YAML frontmatter (`title:`, optional `bibliography:`, etc.), then `./build`. |
| Hide a work-in-progress | Move under any `_*/` folder, e.g. `articles/<topic>/_drafts/`. |
| Unpublish a live article | `git rm articles/<topic>/foo.html` (the `.md` source stays). |
| Hand-author standalone HTML | Just create `articles/<topic>/page.html`. `./build` ignores it. Examples: the dictatorship reading list, the markdown-citations tutorial. |
| Preview locally | `./serve`. For full-site chrome, run `machinespirits-website` separately with this package linked. |
| See what's published / drafted / hidden | `./urls`. |
| Force rebuild everything | `./build --all`. |

## What NOT to do

- **Don't run `git push` (or `git commit` + `git push`) directly.** Use `./publish` so the build gate runs. Going around the gate can ship a broken article.
- **Don't add a `status:` or `published:` field to frontmatter.** The folder/form convention is the single source of truth — adding a flag creates two sources that can disagree.
- **Don't edit committed `.html` files** that have a `.md` sibling — they'll be overwritten by the next `./build`. Edit the `.md` source.
- **Don't put working notes / raw chats / scratch files** at the top of a topic folder — they'll get rendered and indexed. Put them under `_drafts/`.
- **Don't break the `_*` prefix convention** when naming new utility folders. `_drafts/`, `_archive/`, `_review/` are fine; `wip/` or `archive/` would leak into the index.

## When `./publish` fails

- **`./build` failures** — the script lists failing files. Either fix the source or move the file to `_drafts/`. Re-run `./publish`.
- **Pull-rebase conflicts** — uncommitted changes are autostashed; a true merge conflict requires manual resolution.
- **Push rejection** — typically means the remote has commits you don't. Pull first (`git pull --rebase`), then re-publish.

## Repo geography

- `articles/<topic>/` — published articles, organized thematically (one folder per topic)
- `courses/<id>/` — course materials (lectures, slides, syllabi)
- `assets/` — images, logos
- `theme/` — colours, fonts (consumed by website)
- `prompts/` — tutor prompt customizations
- `config/` — navigation, feature flags
- `manifest.yaml` — package entry point (read by website)

## See also

- `CONVENTIONS.md` — fuller spec for the folder/form rule
- Each script's `--help` for flags and usage
- `package.json` and `manifest.yaml` for the consumed contract
