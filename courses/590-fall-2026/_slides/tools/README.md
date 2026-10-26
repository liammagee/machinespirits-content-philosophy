# Lecture slides from markdown

The markdown (`courses/590-fall-2026/lecture-N.md`) is the source. The slides are generated from it literally:

- one slide per `---` block, in order
- every word of the markdown, exactly as written: no added headings, no rewording, nothing left out
- no speaker notes
- HTML comments (`<!-- … -->`) are left out, as they are on the page
- only the design is added: the dark course theme, a big title layout for slides that hold only headings
  (e.g. "Hour 2"), a second column where a `####` sub-heading starts, images beside the text, and text
  sized to fill the slide

## Rebuild after editing the markdown

```
courses/590-fall-2026/_slides/tools/build-deck 2
```

This regenerates `_slides/lecture-2/deck/`, checks it against the markdown, sizes the text, writes previews
to `_slides/lecture-2/preview/` (not committed) and rebuilds the hosted page `_board/hosted/lecture-2.html`.
It stops if a slide's words differ from the markdown.

Then ask Claude to publish `_slides/lecture-2/deck` to the Lecture 2 Slides artifact
(https://claude.ai/artifact/LaMRRyCE2bwxvdcZy9sdVw). Publishing needs Claude's Artifact tool; nothing here
uploads.

## Images

A markdown image is shown only if `deck/images.json` maps its file stem to an asset id in the Slides artifact,
and the picture is saved as `deck/images/<asset id>.jpg` (for the hosted page and the previews). For a new
image, ask Claude to upload it to the artifact; the upload gives the asset id.

## Requirements

```
pip install markdown-it-py linkify-it-py beautifulsoup4 playwright
python3 -m playwright install chromium
```

## The files

- `md2deck.py` markdown -> slide files in the Slides format's subset (px sizes, one-level lists, so nested
  bullets become indented rows), plus `deck.json` (order and sections; title, fonts kept)
- `check_deck.py` word-for-word check against the markdown, and a check for tags the Slides format rejects
- `fit_deck.py` picks the largest text size (52px down, never under 24px) that fits each slide; previews
- `build-deck` runs the three, then `_board/build_lecture.py`

## Generating images with Codex

```
courses/590-fall-2026/_slides/tools/gen-images 2            # all prompts
courses/590-fall-2026/_slides/tools/gen-images 2 salon      # just one (slugs are listed in the script)
```

Runs each prompt in `_slides/lecture-2/image-prompts.md` through `codex exec` and its `$imagegen` skill, saves
`assets/images/lecture-2-<slug>.png`, and adds `![Image](/markdown/images/lecture-2-<slug>.png)` at the end of
the matching slide in `lecture-2.md`. Images already on disk are skipped, so it can be rerun after a failure.
Needs the Codex CLI, logged in. Then ask Claude to upload the images to the Slides deck and rebuild.
