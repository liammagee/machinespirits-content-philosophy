# EPOL 590 Literature Workbench — image prompts

Source: [literature-workbench.html](../../literature-workbench.html) and the Lecture 3 workshop guide ([lecture-3-workshop.md](../../lecture-3-workshop.md)). Four images: one for the introduction and one for each workshop stage (Read, Search, Map). Each image is keyed by the workbench section it heads.

These prompts were drafted with AI (Claude) from the workshop guide. They are interpretive teaching images.

The style is the Lecture 1 two-ink risograph, with the same researcher and paper automaton, so the workbench reads as part of the 590 course.

## Workflow

1. **Generate (Codex).** For each section, generate one 16:9 image from the shared style prompt followed by that section's scene prompt.
2. **Save** the PNG at the section's **File** path under `courses/590-fall-2026/_slides/workbench/`. Save revisions as `-v2.png` and so on.
3. **Inspect** each image: no lettering, the researcher and automaton match Lecture 1, and the essential shapes sit in the middle horizontal band so the image can be cropped to a wide banner.
4. **Place** the image in the workbench. Claude compresses it and embeds it in the single-file HTML, because the hosted route serves only the HTML file.

A request to paste into Codex:

> Read `courses/590-fall-2026/_slides/workbench/image-prompts.md`. For each section, generate one 16:9 image from the shared style prompt followed by that section's scene prompt, and save it as a PNG at the section's File path under `courses/590-fall-2026/_slides/workbench/`. Do not edit any other file, and do not commit.

## Shared style prompt

```text
Asset type: a single 16:9 landscape illustration used as a wide banner at the top of a web page; artwork only, no page layout.
Style/medium: a contemporary two-colour risograph print on warm cream uncoated stock (#F3EEE4). Ink 1: fluorescent orange (#F2552C). Ink 2: medium blue (#2F4FA8). Where the inks overlap they make a deep plum-brown. Bold flat shapes, halftone dot shading, visible grain, slight misregistration between the two inks, some areas of bare paper. Confident graphic-novel linework, generous negative space, a little wit. It should feel like a zine or a small-press poster made by a design-literate grad student, not a corporate illustration.
Recurring character when requested: one adult researcher of ambiguous gender, seen small within the scene, short cropped hair, oversized blue jacket, carrying a fat orange notebook stuffed with slips of paper.
Recurring machine companion when requested: a small folded-paper automaton, like a piece of origami that learned to walk, with a round reading-lamp head that casts a cone of orange light; helpful, a bit clumsy, never a glossy robot.
Composition: one main idea per image; large readable shapes; keep every essential figure and object inside the middle horizontal band (roughly the central 45% of the height) so the image can be cropped to a 3:1 banner.
Constraints: no text, letters, numbers, captions, signatures, logos or watermarks; book spines, cards and pages are blank. No photographic lighting, 3D render, gradients beyond halftone, screens, circuit boards, brains, neural-network graphics or glowing blue AI clichés. No real people.
```

## Introduction — the workbench

- File: `images/workbench-intro.png`
- Alt text: A researcher and a paper automaton at a long workbench with three stations: an open article under a lamp, threads running out to other books, and a pinboard of linked cards with an empty patch.

```text
A long wooden workbench seen straight on, running almost the full width of the image, with three stations from left to right. Left: a single open journal article lies flat, and the paper automaton leans over it, its lamp-head casting an orange cone onto the page. Middle: several taut threads, some orange and some blue, run from a second copy of the article out past the edges of the bench towards small stacks of books. Right: a cork pinboard propped on the bench, covered in blank cards joined by string, with one conspicuous empty patch. The researcher stands at the middle station holding the orange notebook, looking along the bench from reading to mapping. Calm and orderly, like a workshop before class.
```

## 1 · Article analysis — three ways into one article

- File: `images/read-three-ways.png`
- Alt text: A journal article drawn as a tall paper building, with three researchers entering by the front door, a ladder to a high window, and a hatch at the back.

```text
A single journal article drawn as a tall narrow building made of stacked paper pages, shown in cutaway so its floors are visible. Three identical small researchers each enter it a different way: one walks in through the front door at ground level and climbs the floors in order; one has propped a ladder against the top-floor window and climbs straight in near the roof; one opens a hatch at the back halfway up, among the building's machinery of tables and figures. Dotted footprint trails inside the cutaway show the three different routes crossing in the middle floors. The paper automaton sits on the pavement with its lamp pointed at the building, watching. Witty, diagrammatic, clear.
```

## 2 · Literature discovery — backward, forward, sideways

- File: `images/search-threads.png`
- Alt text: A researcher holds an article from which threads run back to older books, forward to newer pages and sideways to another shelf; the automaton's lamp shows one thread leading to a book that dissolves.

```text
The researcher stands in the centre holding one open article. From the article, threads run out in three directions: orange threads stretch backward (left) into a tall dusty stack of older books; blue threads stretch forward (right) to a scatter of fresh loose pages still drifting down; a single plum thread runs sideways (up and across) to a separate small shelf of differently shaped books. The paper automaton stands at the end of one forward thread and shines its orange lamp on the book it leads to, and that book is dissolving into halftone dots under the light because it does not really exist. Busy but legible, with clear negative space between the three directions.
```

## 3 · Concept map — gaps in the field or gaps in the map

- File: `images/map-gaps.png`
- Alt text: A researcher steps back from a wall of cards joined by string; the automaton lights an empty patch, revealing faint pins and outlines of cards that were never found.

```text
A wide wall covered in blank index cards pinned in clusters and joined by lengths of string, some orange, some blue. Near the middle of the wall there is a conspicuous empty patch. The researcher has stepped back from the wall, notebook under one arm, head tilted, considering the whole arrangement. The paper automaton stands on a stool and shines its orange lamp into the empty patch, and in the light faint outlines of cards and stray pins appear, as if something was there all along but never pinned up. Quiet and thoughtful.
```
