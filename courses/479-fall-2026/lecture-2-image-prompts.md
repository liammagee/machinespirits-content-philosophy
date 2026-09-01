# Lecture 2 — editable slide image prompts

Source: [lecture-2.md](lecture-2.md). Visual reference: [dialectic.html](hegel-experience/dialectic.html), its [art direction](hegel-experience/_notes/dialectic-map.md#image-prompts), and the active `hegel-experience/art/litho/` illustrations (especially scenes 00, 05, and 12).

Image links are integrated into the canonical [lecture-2.md](lecture-2.md) and its companion [lecture-2-illustrated.md](lecture-2-illustrated.md). The PowerPoint uses the same images and preserves the complete lecture text in its speaker notes.

Source snapshot times and file checksums are recorded in [_slides/lecture-2/image-manifest.json](_slides/lecture-2/image-manifest.json). Rebuild after later lecture edits; Markdown changes are not automatically synchronized into the PowerPoint.

The lecture now has **26 slides**, counting each `---`-delimited section once. Slide 10 contains both a section heading and a subheading. Twenty slides have images: fourteen generated illustrations, one redesigned course map, and five retained images. Slides 16–20 and 26 are intentionally text-only. The last five illustrated scenes keep their original asset filenames (`slide-16-...` through `slide-19-...` and `concept-relations.png`) even though later source insertions moved them to slides 21–25. Section headings below follow the current source order.

## Regeneration

1. Edit the scene prompt below, retaining its slide number and descriptive filename.
2. Generate **one separate image per illustrated slide**, using the shared style prompt followed by that slide's scene prompt. For slide 25, use only its complete standalone prompt because it requires lettering. Use Codex's built-in image generation; this workflow does not invoke the existing API-based story generator.
3. Inspect at full size for visual consistency and unwanted lettering. Copy the approved PNG into `lecture-2-images/`. Keep revisions as `-v2.png`, `-v3.png`, etc.; update the image reference in `lecture-2.md` and its illustrated companion when accepting a revision. Slide 25 lives at `concept-relations.png`, with its original archived under `_slides/lecture-2/`. Do not overwrite the dialectic story art.
4. Encode the web copies: `python3 _slides/lecture-2/encode-webp.py`. The PNGs are the masters and stay in the repository; the lecture pages link the `.webp` beside each one, which is roughly nine times smaller. The PowerPoint builder maps a `.webp` link back to its `.png` master, so the deck keeps the lossless image.
5. Rebuild the PowerPoint after accepted image or lecture changes. The deck uses editable text and separate image objects, not flattened slide screenshots.

Example request: “Regenerate slide 21 (the curtain scene) using lecture-2-image-prompts.md; preserve the lithograph style and existing `slide-16-curtain` filename stem, save a new version, then update the lecture and PowerPoint.”

The editable PowerPoint builder is saved at [_slides/lecture-2/build.mjs](_slides/lecture-2/build.mjs). It reads image links and complete speaker notes from the canonical `lecture-2.md`. Its `D` array holds the shortened visible slide copy, so substantive lecture edits should also be reflected there before rebuilding. Ask Codex to load the bundled workspace dependencies, set `RUNTIME_NODE`, `RUNTIME_NODE_MODULES` and `RUNTIME_BIN_DIR` to those returned paths, and run the builder with that Node executable. `LECTURE_REPO`, `LECTURE_OUTPUT` and `LECTURE_QA` optionally override the repository, deck and preview locations. Rebuilding does not generate images or make model API calls.

The filenames below are the initial accepted-version destinations. Built-in generation may choose a nearby landscape resolution; retain the full image with proportional fitting rather than stretching or cropping away content. Request 16:9 for the illustrations; the slide 25 course map is square.

## Shared style prompt

```text
Use case: illustration-story.
Asset type: a single 16:9 landscape illustration for a university philosophy lecture slide; artwork only, no slide layout.
Style/medium: a mid-century Central European children's picture-book lithograph, recalling 1950s–60s Czech and Polish book illustration. Hand-drawn, slightly crooked, printed in a few flat inks on warm rough toothy paper. Visible lithographic grain, crayon scumble, scratched highlights, irregular print edges and gently misregistered colour. Naive flattened perspective; sophisticated, quiet composition.
Palette: deep indigo and midnight violet (#121021, #1a1730); warm pale gold (#f0c9a0); sparing faded teal (#8fd6c2), muted coral (#e08e9b), and lavender (#c0aee6). Warm paper peeks through the ink. Match the existing dialectic lithographs, not a glossy fantasy painting.
Recurring character when requested: one tiny stylized child with short dark hair, a faded teal coat, muted coral scarf and a small cream notebook; small within the environment. This is a teaching metaphor for inquiry, not a claim that Hegel describes literal childhood stages.
Mood: tender, hushed, slightly strange and contemplative. Large legible shapes; one main idea per image; keep essential figures and objects inside generous safe margins so the complete image can be placed beside editable text.
Constraints: no text, letters, numbers, captions, labels, signatures, logos or watermarks; blank notebook pages. No photographic lighting, gradients, 3D render, shiny robots, neural-network graphics, rigid infographic arrows, or thesis–antithesis–synthesis triangle. Do not imply that the machine analogies demonstrate phenomenal consciousness. Output one finished image, not a contact sheet.
```

## Slide 01 — Introducing Hegel and experience

- File: `lecture-2-images/slide-01-experience.png`
- Anchor: *Phenomenology*, Introduction §§84–87; Consciousness §§90–165. Interpretive teaching image.
- Alt text: A small notebook-carrying child enters an indigo garden beneath a pale gold star.

```text
A tiny notebook-carrying child steps out of a crooked house's warm doorway into an immense indigo garden. A pale winding path passes a round stone and a still pool toward a half-open distant curtain. One large imperfect gold star hangs over low violet hills. A quiet invitation into the experience of knowing; the path's landscape subtly changes while it remains one continuous garden. Wide composition, figures small, a single unbroken scene.
```

## Slide 02 — Lecture overview

- File: `lecture-2-images/slide-02-three-encounters.png`
- Anchor: Consciousness §§90–165; sequence, not a universal three-step formula.
- Alt text: One garden path links a bright star, a stone with coloured traces, and two leaning lamps.

```text
A single gently winding garden path connects three concrete encounters within one landscape: a low gold star reflected in a puddle, a large grey stone with a few overlapping teal and coral traces around its surface, and two tall asymmetrical lamps leaning toward one another. The small child walks along the path with an open notebook. The encounters are connected by the terrain, not divided into panels or arranged as a triangle. Quiet dusk, scratched grasses and paper-cut trees.
```

## Slide 04 — Hegel's influence

- File: `lecture-2-images/slide-04-influence.png`
- Anchor: historical and interpretive context from the lecture; not a literal genealogy.
- Alt text: Books pass through many windows of a branching, crooked university town.

```text
An old crooked university town at night, its many different windows linked by a continuous wandering pale-gold ribbon of open blank books. Small adult silhouettes read, debate and pass books across windows and narrow bridges; a workshop, a theatre and a library belong to the same town. The child watches from the foreground holding a notebook. Convey ideas travelling, being argued with and transformed across generations, not a diagram of direct causal influence. No identifiable historical portraits or lettering.
```

## Slide 05 — Phenomenology of Spirit

- File: `lecture-2-images/slide-05-book-and-world.png`
- Anchor: the 1807 work; Introduction §§78–87. Interpretive image, not a historical reconstruction.
- Alt text: An open book becomes a path through a small early nineteenth-century town.

```text
An enormous open cream book rests on a simple desk beside a candle. Its blank pages continue into a crooked path through a small early nineteenth-century Central European town beneath indigo skies. A tiny dark-coated reader at the desk and the recurring child on the path look toward the same distant warm window. The page and the world belong to a single continuous flat lithographic space. No readable book cover, manuscript or invented quotation; no military scene.
```

## Slide 06 — Geist's ambiguous meaning

- File: `lecture-2-images/slide-06-geist.png`
- Anchor: translation and course framing; mind, spirit and shared life are not separate substances.
- Alt text: Warm light connects a solitary reader with the windows of a small community.

```text
A solitary tiny reader sits by a warm window with a blank notebook. The same pale-gold light wanders through the street into many other differently shaped windows where people read, converse and make music. Above them a broad translucent lavender wash of ink joins the roofs like a shared evening atmosphere. Suggest individual thinking and a shared cultural world without a literal ghost, disembodied soul or supernatural apparition. The town is intimate, imperfect and quiet.
```

## Slide 07 — Study of appearances

- File: `lecture-2-images/slide-07-appearances.png`
- Anchor: lecture's Kant-to-Hegel framing. The image poses a question; it does not depict a knowable noumenal object.
- Alt text: A single tree looks different through a window, a rain-covered pane and a still pond.

```text
One crooked tree in an indigo garden is encountered through a simple window, a rain-speckled pane and its reflection in a still pond. The same few branches appear changed by these situations, yet the scene unmistakably contains one tree rather than three separate worlds. The child stands between window and pond, comparing what appears with a notebook. Pale gold leaves, lavender glass marks and faded teal reflection. Do not show a hidden final true tree behind a curtain.
```

## Slide 08 — Shapes of knowing

- File: `lecture-2-images/slide-08-revising-the-page.png`
- Anchor: Introduction §§84–87; knowing and its object are tested together.
- Alt text: A child redraws a stone in a notebook as the garden's outlines continue across the page.

```text
The child kneels beside a real lumpy stone with an open notebook. On the left blank page a simple chalk-like outline of the stone fails to match it; on the right page a new drawing extends into the moss, path and surrounding garden. A few erased crayon traces remain visible beneath the revision. Show attentive comparison and a changed way of grasping one object, not the magical creation of the physical stone. Only drawings on the pages; absolutely no handwriting.
```

## Slide 09 — Hegel and empiricism

- File: `lecture-2-images/slide-09-active-experience.png`
- Anchor: Introduction §§84–87; the passive-reception contrast is a teaching simplification.
- Alt text: A child rearranges coloured panes while looking at a garden that resists the frame.

```text
A small child actively rearranges three irregular coloured glass panes in a wooden viewing frame, looking through them toward a crooked garden tree. The panes make aspects of the tree newly visible, but one branch extends awkwardly beyond the frame and forces adjustment. A shut empty collecting jar sits quietly nearby, secondary and unglamorous. Emphasize active inquiry constrained by what is encountered, not arbitrary invention or a brain being filled with data. Teal and coral panes, gold leaves, indigo night.
```

## Slide 10 — Consciousness in three shapes

- File: `lecture-2-images/slide-10-one-stone-three-ways.png`
- Anchor: §§90–110, §§111–131, §§132–165. Three approaches to knowing, not developmental ages.
- Alt text: One stone appears as an immediate encounter, a bearer of qualities and part of a field of relations.

```text
One large lumpy grey stone dominates the middle of a continuous garden scene. At its left edge a child's small pointing hand meets a pale-gold spot of immediate attention. Across its surface, distinct teal, coral and lavender print textures disclose several qualities. At its right edge those textures continue into moss, roots, water and the path, showing relations extending beyond the isolated object. One stone, one environment, no three panels, no arrows, no labels and no duplicated ages of the child.
```

## Slide 14 — Discussion about experience

- File: `lecture-2-images/slide-14-conversation.png`
- Anchor: classroom discussion; contemporary interpretive image.
- Alt text: Three learners gather around a lantern, a cup, a stone and an open notebook.

```text
Three small learners of varied appearance sit in a loose circle in the night garden around one lantern, a warm cup, a grey stone and an open blank notebook. One gestures toward the cup, one listens, and one looks at the night sky. Their positions leave the circle open toward the viewer. A few pale-gold moths hover above the lantern; muted coral scarf, teal coats, violet grasses. Convey shared questioning about ordinary experience, without speech bubbles, classroom furniture or lettering.
```

## Slide 21 — The curtain and the understanding

- File: `lecture-2-images/slide-16-curtain.png`
- Anchor: §165. Curtain is Hegel's metaphor; mirror and child are our teaching imagery, not Hegel's literal claim.
- Alt text: A child draws aside a star-patterned curtain and finds their own viewing position within the garden.

```text
At the far end of the garden, two great indigo theatre curtains patterned with sparse scratched gold stars are drawn aside by the tiny child. Through the opening we see the same garden continuing and a tall narrow mirror angled so that it reflects the child holding the curtain, including the child's hand and notebook. A strip of warm paper dawn enters from one side. The observer's activity becomes part of what is seen; no hidden supernatural agent, glowing brain or assertion that the garden is imaginary.
```

## Slide 22 — Machines and experience

- File: `lecture-2-images/slide-17-machine-and-stone.png`
- Anchor: course analogy to §§90–165, not a claim from Hegel about AI.
- Alt text: A learner and a small mechanical instrument attend to the same stone from different positions.

```text
The child and a small plain mechanical measuring instrument sit on opposite sides of the same garden stone. The instrument has a simple brass aperture, a paper tape bearing only abstract dots, and no face or humanoid features. The child compares the stone with a blank notebook. Both cast ordinary printed shadows; a broad violet curtain hangs far behind them. Make their common object and different forms of engagement visible while leaving the question of machine experience unanswered. No glowing robot eyes or human soul imagery.
```

## Slide 23 — Training, memory and the changing world

- File: `lecture-2-images/slide-18-training-and-context.png`
- Anchor: conceptual distinction between fixed trained parameters and additional information at use time; not a universal claim about every system.
- Alt text: A bound book rests beside a changing window scene and a small tray of loose new pages.

```text
A large old closed indigo book rests on a desk, its cover entirely unlettered. Beside it, a modest tray receives a few fresh loose cream pages carried through an open window by the wind. Outside the window different leaves and a new dawn show the world changing; a small brass reading instrument can reach both the bound book and the tray. Distinguish a relatively fixed learned store from newly supplied context using material objects. No dates, clocks, digital interfaces, literal memory erasure or text.
```

## Slide 24 — Continuity as an open question

- File: `lecture-2-images/slide-19-continuity.png`
- Anchor: course thought experiment, not evidence that continuous computation establishes consciousness.
- Alt text: A child's continuous walk passes a quiet instrument recording separate encounters.

```text
A continuous pale-gold footpath winds through one broad garden from dusk at the left to pale morning at the right. A single small child carrying a notebook walks midway along it. At the garden gate a quiet mechanical instrument has laid out several separate square sheets, each showing only an abstract dot, with spaces between the sheets. The visual question is the relation between ongoing lived time and discrete recorded encounters. Keep it ambiguous and gentle: no assertion that every machine sleeps, cannot learn or lacks consciousness.
```

## Slide 25 — Course concept relations

- File: `concept-relations.png`
- Original: `_slides/lecture-2/concept-relations-original.png` (unaltered backup).
- Anchor: the existing eight-week course sequence, not eight categories attributed to Hegel.
- Alt text: An indigo and gold circular course map links Synthesis, Experience, Recognition, Attention, Consciousness, Alignment, Critique, and Back to Synthesis, around a child with a notebook.
- References: supply the original diagram first and `hegel-experience/art/litho/story-00.webp` second.
- Regeneration: use the complete prompt below on its own. Do not prepend the shared no-lettering prompt: this diagram requires all eight labels. Preserve square proportions and use contain fitting.

```text
Use case: infographic; edit/redesign the first reference image using the second reference only for visual style.

Create one beautiful, highly legible square course map, preferably 2048 by 2048 pixels. It replaces an unattractive circular diagram in a university lecture. Preserve the exact eight topics, week numbers, clockwise order and single closed circular connection shown in reference 1. The layout must remain recognizably a circular course journey, not a branching graph or eight separate cards. The text is the most important content.

Exact labels and positions, clockwise:
12 o'clock: "Week 1" then "Synthesis"
1:30: "Week 2" then "Experience"
3 o'clock: "Week 3" then "Recognition"
4:30: "Week 4" then "Attention"
6 o'clock: "Week 5" then "Consciousness"
7:30: "Week 6" then "Alignment"
9 o'clock: "Week 7" then "Critique"
10:30: "Week 8" then "Back to Synthesis" (this final topic may wrap over two lines).
Do not omit, rename, duplicate or add topics. Keep all text upright and horizontal. Make every topic large and equally legible, and the Week labels smaller but comfortably readable. Use pale warm ivory serif lettering reminiscent of Iowan Old Style or Baskerville, with restrained gold small week labels. The text should look carefully typeset in an illustrated book, not scribbled. Use generous gaps between labels, with no line, symbol or texture obscuring a letter. Keep all labels well inside the canvas. In particular, Consciousness, Recognition and Back to Synthesis must fit comfortably without clipping.

Redesign the diagram as a quiet circular path or constellation in a midnight garden. Eight small irregular gold dots or tiny stars mark the stations on a thin, softly hand-drawn warm-gold circular line. Place the label groups beside or immediately outside their stations, leaving ample spacing. Avoid large coloured node bubbles, boxes, panels or heavy chart arrows. Do not add cross-links: one loop connects Week 1 through Week 8 and back to Week 1. The course order is a teaching sequence, not a claim that these are Hegel's eight categories.

Match the illustration style of reference 2: mid-century Central European children's book lithograph, 1950s–60s Czech/Polish book art, flat ink shapes, toothy paper grain, gentle crayon scumble and scratched highlights, slightly irregular printing, no glossy gradients or photorealism. Background deep midnight indigo and violet (#121021, #1a1730); pale gold (#f0c9a0), warm ivory, and very sparing faded teal (#8fd6c2), coral (#e08e9b) and lavender (#c0aee6). Keep background texture quiet behind the lettering. A subtle irregular warm paper edge is welcome. The original white background and bright blue circles must be completely replaced.

Inside the circle, use a small restrained vignette: a tiny short dark-haired child in a faded teal coat and coral scarf holding a cream notebook, standing on a low violet hill, looking at one pale gold star. A few spare plants at the base of the hill. Leave generous dark breathing room around this vignette; it must not compete with the labels. Quiet, contemplative, mature and slightly strange. No title, subtitle, legend, extra text, signature, watermark, ornate border, 3D effect or UI styling. Return one finished image.
```

## Existing images retained

| Slide | Image in the lecture | PowerPoint source |
| --- | --- | --- |
| 03 | Schlesinger portrait of Hegel, Wikimedia Commons | Same portrait, embedded locally for offline use |
| 11 | `/markdown/images/consciousness-sense-certainty.webp` | `../../assets/images/consciousness-sense-certainty.png` |
| 12 | `/markdown/images/consciousness-perception.webp` | `../../assets/images/consciousness-perception.png` |
| 13 | `/markdown/images/consciousness-understanding.webp` | `../../assets/images/consciousness-understanding.png` |
| 15 | `/markdown/images/experience-of-experience.webp` | `../../assets/images/experience-of-experience.jpeg` |

## Source and interpretation discipline

The artwork is interpretive illustration, not evidence about how consciousness or machines work. It borrows the child, notebook, stone, garden and curtain motifs from the existing dialectic project. Consult the local Terry Pinkard PDF for the philosophical text. Preserve the difference between Hegel's text, a classroom gloss and an AI analogy. The PowerPoint condenses the lecture's visible copy and retains the full original slide text and notes in speaker notes. It qualifies the lecture's broad claims about contemporary AI and avoids treating consciousness as established by a sensor, classifier, world model or memory feature.

Slide 18's distinction between trained parameters and retrieved information is supported by [Lewis et al., Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (2020)](https://arxiv.org/abs/2005.11401). This technical distinction does not establish consciousness.
