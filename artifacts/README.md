# Artifacts

Self-contained HTML/JS/CSS files (Claude artifacts, interactive demos, explorations) that can be hosted on the Machine Spirits site and optionally embedded within course lectures.

## Quick Start

### 1. Add an artifact

Drop an HTML file here with `<meta>` tags in the `<head>`:

```html
<meta name="artifact-title" content="My Demo">
<meta name="artifact-description" content="What it does">
<meta name="artifact-tags" content="tag1,tag2,tag3">
<meta name="artifact-author" content="Claude">
<meta name="artifact-date" content="2026-03-15">
<meta name="artifact-course" content="479">        <!-- optional: link to course -->
<meta name="artifact-lecture" content="lecture-3">  <!-- optional: link to lecture -->
```

### 2. Link to a lecture (optional)

In the lecture's YAML frontmatter:

```yaml
artifacts:
  - slug: my-demo
    title: "My Demo"
    position: after-content   # before-content | after-content
```

Or inline in the lecture markdown:

```markdown
::artifact[my-demo]
```

### 3. Publish

```bash
cd ~/Dev/machinespirits/machinespirits-content-philosophy
./publish "Add my-demo artifact"
```

`./publish` runs `./artifacts-index` to refresh `artifacts/index.json` and pushes. The live site picks up changes on the next content-repo deploy (~3-5 min). **No website-repo changes needed.**

## How it works

1. `./artifacts-index` scans `artifacts/*.html`, extracts `<meta>` tags, and writes `artifacts/index.json` (committed to the content repo)
2. The website mounts `artifacts/` at `/content/artifacts/` via `express.static` — same pattern as `articles/` and `courses/`
3. `routes/artifactRoutes.js` (`/api/artifacts`) reads `index.json` directly from the content package
4. The gallery at `/#/artifacts` calls `/api/artifacts` and renders cards from the index
5. Lectures with `artifacts:` frontmatter render embedded iframes pointing at `/content/artifacts/<slug>.html`

## Access points

| URL | What |
|-----|------|
| `/#/artifacts` | Gallery (browse all) |
| `/#/artifact/<slug>` | Viewer (single artifact in iframe) |
| `/content/artifacts/<slug>.html` | Direct/standalone (shareable) |
| Within a lecture | Embedded iframe with fullscreen toggle |

## Existing artifacts

- `anthropic-reading-list.html` — Reading tracker for Anthropic alignment papers
- `design-audit-playground.html` — Colour palette, typography, spacing tokens, WCAG contrast matrix
- `hegel-recognition-explorer.html` — Interactive master-slave dialectic (linked to course 479, lecture 3)
- `warpstrike-60.html` — Wrapper iframing the Warpstrike 60 game (deployed at warpstrike-60.fly.dev)
