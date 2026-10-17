# EPOL 590 Lecture 1 — slide image prompts

Source: [lecture-1.md](../../lecture-1.md) and the HTML deck built from it. Six images, one per slide that carries an idea. Each image is keyed by its **slide heading**, not a slide number. The schedule, assessment and readings slides stay text-only.

These prompts were drafted with AI (Claude) from the lecture. They are interpretive teaching images.

The style differs on purpose from the 479 lithographs. It is a two-ink risograph look on cream stock, so 590 has its own look and sits well beside the deck's ink, paper, orange and blue palette.

## Workflow

1. **Generate (Codex).** For each section, generate one 16:9 image from the shared style prompt followed by that section's scene prompt.
2. **Save** the PNG at the section's **File** path under `courses/590-fall-2026/`. Save revisions as `-v2.png` and so on.
3. **Inspect** each image: no lettering, the researcher and the paper automaton look the same from image to image, and the essential shapes sit inside the margins.
4. **Place** the image in the HTML deck. Claude uploads it as an asset and sets the slide's `<img src>`.

A request to paste into Codex:

> Read `courses/590-fall-2026/_slides/lecture-1/image-prompts.md`. For each slide section, generate one 16:9 image from the shared style prompt followed by that section's scene prompt, and save it as a PNG at the section's File path under `courses/590-fall-2026/`. Do not edit any other file, and do not commit.

## Shared style prompt

```text
Asset type: a single 16:9 landscape illustration for a graduate seminar slide; artwork only, no slide layout.
Style/medium: a contemporary two-colour risograph print on warm cream uncoated stock (#F3EEE4). Ink 1: fluorescent orange (#F2552C). Ink 2: medium blue (#2F4FA8). Where the inks overlap they make a deep plum-brown. Bold flat shapes, halftone dot shading, visible grain, slight misregistration between the two inks, some areas of bare paper. Confident graphic-novel linework, generous negative space, a little wit. It should feel like a zine or a small-press poster made by a design-literate grad student, not a corporate illustration.
Recurring character when requested: one adult researcher of ambiguous gender, seen small within the scene, short cropped hair, oversized blue jacket, carrying a fat orange notebook stuffed with slips of paper.
Recurring machine companion when requested: a small folded-paper automaton, like a piece of origami that learned to walk, with a round reading-lamp head that casts a cone of orange light; helpful, a bit clumsy, never a glossy robot.
Composition: one main idea per image; large readable shapes; keep essential figures inside generous margins so the image can be cropped to a 4:3 or square panel beside slide text.
Constraints: no text, letters, numbers, captions, signatures, logos or watermarks; book spines and pages are blank. No photographic lighting, 3D render, gradients beyond halftone, screens, circuit boards, brains, neural-network graphics or glowing blue AI clichés. No real people.
```

## AI and Academic Literature (cover)

- File: `lecture-1-images/cover-the-field.png`
- Alt text: A small researcher and a paper automaton with a lamp for a head stand on the edge of a landscape made of stacked and open books, stretching to the horizon.

```text
A vast rolling landscape built entirely from books: stacked volumes form hills and cliffs, open books form valleys and fields, loose pages drift like clouds. At the near edge, on a ledge of closed books, the researcher stands with the orange notebook, looking out; beside them the paper automaton lifts its lamp-head, and its orange cone of light falls across one small patch of the distant landscape. Wide, epic but quiet. The researcher and automaton are small, in the lower third.
```

## Where do good research questions come from?

- File: `lecture-1-images/question-sources.png`
- Alt text: Five different streams — from a newspaper stack, a crowd, a desk, a heart-shaped lamp and a busy café — flow into one small pool where the researcher kneels.

```text
Seen from slightly above: five narrow streams of ink-blue water wind across cream paper from five little sources at the edges of the frame — a toppling stack of blank newspapers (events), a tall shelf of journals (literature), a cluttered desk with a broken chair (circumstance), a single glowing desk lamp in an armchair (disposition), and a tiny crowd of researchers all pointing the same way (the cool kids). The streams meet in one small round pool in the centre, where the researcher kneels and dips the orange notebook in. Playful map-like composition.
```

## Question and literature: a dialectic

- File: `lecture-1-images/question-literature-dialectic.png`
- Alt text: The researcher climbs a spiral staircase whose steps alternate between orange notebook pages and blue journal volumes, with the automaton lighting the next step.

```text
A tall spiral staircase rising through the frame on bare cream paper. Its steps alternate: one step is an orange notebook page, the next a thick blue bound journal, then orange, then blue, upward. The researcher is mid-climb, one foot on each kind of step; the paper automaton walks a step ahead holding its lamp-head to light the next one. Each turn of the spiral is slightly narrower, suggesting the question being refined. No arrows, no labels.
```

## Is it doable? Practicalities

- File: `lecture-1-images/feasibility.png`
- Alt text: The researcher compares a manageable hill with a path on it against an enormous mountain reaching beyond the frame.

```text
A split horizon. On the left, an impossibly huge blue mountain rises out of the top of the frame, crowded with tiny scaffolds, cranes and a hundred tiny researchers. On the right, a modest orange hill with a single winding footpath and a flag-less pole at the top. The researcher stands at the fork between them, orange notebook open, while the paper automaton tugs gently toward the hill. Gentle humour about scope.
```

## Is it novel?

- File: `lecture-1-images/novelty.png`
- Alt text: Viewed from above, a huge map table is crowded with pinned paper notes, and the automaton's lamp lights one small unmarked gap that the researcher is pointing at.

```text
Top-down view of a vast table covered edge to edge with overlapping paper slips, index cards, thread and pins, like an obsessive research wall laid flat — dense halftone texture in blue. Almost every area is crowded. Near the centre is one small clear patch of bare cream paper. The automaton's orange lamp-light falls on that gap and the researcher's hand points into it. A second, fainter pool of light at the table's far edge hints that someone else may be arriving at the same gap.
```

## Discussion: what is literature, and what is changing?

- File: `lecture-1-images/seminar-table.png`
- Alt text: Seen from directly above, a round seminar table is surrounded by researchers with books, laptops and notebooks; a paper automaton sits among them as one more participant.

```text
Directly overhead view of a round seminar table on cream paper. Around it, eight researchers seen from above (heads, shoulders, hands), each with something different: an open book, a notebook, a stack of printouts, a coffee cup, a closed laptop. One seat is taken by the small paper automaton, its lamp-head lit, as one participant among many rather than the centre. Hands gesture across the table; a few loose pages drift between people. Warm, conversational, democratic.
```
