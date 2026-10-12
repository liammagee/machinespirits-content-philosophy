# Lecture 8 — slide image prompts

Source: [lecture-8.md](../../lecture-8.md) (Week 7: Synthesis, Technosymbiosis, and History). Style continues the lecture 2 illustrations ([lecture-2-image-prompts.md](../../lecture-2-image-prompts.md)) so the course reads as one set.

Fourteen images, one per slide that carries an idea. The assessment, "Today", "Readings…" and peer-review slides stay text-only. Each image is keyed by its **slide heading**, not a slide number, so adding or moving slides does not break the mapping.

These prompts were drafted with AI (Claude) from the lecture notes. They are interpretive teaching images, not illustrations of what any thinker literally claims.

## Workflow

1. **Generate (Codex, on your machine).** For each section below, generate one image from the shared style prompt followed by that section's scene prompt. Use Codex's built-in image generation. Request 16:9 landscape.
2. **Save** the PNG at the path given in the section's **File** line, under `courses/479-fall-2026/`. Keep the stem; for a later revision save `-v2.png`, `-v3.png` and say which to use.
3. **Inspect** each at full size: no lettering, the child and the automaton recognisably the same from image to image, essential shapes inside the margins.
4. **Commit and push** the PNGs (only `courses/479-fall-2026/lecture-8-images/`).
5. **Then** (Claude, or by hand): `python3 _slides/lecture-8/encode-webp.py` writes the `.webp` web copies; add each image to `lecture-8.md` under its heading, as `![alt text](/content/courses/479-fall-2026/lecture-8-images/<stem>.webp)` using the alt text below; rebuild the page (`./build courses/479-fall-2026/lecture-8.md`), the lecture deck (`python3 _slides/lecture-8/build.py`) and the seminar deck (`node _slides/lecture-8-seminar/build.cjs`).

A request to paste into Codex:

> Read `courses/479-fall-2026/_slides/lecture-8/image-prompts.md`. For each of its fourteen slide sections, generate one 16:9 image from the shared style prompt followed by that section's scene prompt, and save it as a PNG at the section's File path under `courses/479-fall-2026/`. Do not edit any other file. Show me the fourteen images, then commit them with the message "Lecture 8 slide images" and push.

## Shared style prompt

```text
Use case: illustration-story.
Asset type: a single 16:9 landscape illustration for a university philosophy lecture slide; artwork only, no slide layout.
Style/medium: a mid-century Central European children's picture-book lithograph, recalling 1950s–60s Czech and Polish book illustration. Hand-drawn, slightly crooked, printed in a few flat inks on warm rough toothy paper. Visible lithographic grain, crayon scumble, scratched highlights, irregular print edges and gently misregistered colour. Naive flattened perspective; sophisticated, quiet composition.
Palette: deep indigo and midnight violet (#121021, #1a1730); warm pale gold (#f0c9a0); sparing faded teal (#8fd6c2), muted coral (#e08e9b), and lavender (#c0aee6). Warm paper peeks through the ink. Match the existing course lithographs, not a glossy fantasy painting.
Recurring character when requested: one tiny stylized child with short dark hair, a faded teal coat, muted coral scarf and a small cream notebook; small within the environment. A teaching metaphor for inquiry.
Recurring machine companion when requested: a small hand-made automaton of pale wood, folded paper and dull brass, about the child's height, with a softly glowing lantern for a head and visible simple joints; toy-like, gentle and slightly awkward. A teaching metaphor for machine learning, never a glossy robot.
Mood: tender, hushed, slightly strange and contemplative. Large legible shapes; one main idea per image; keep essential figures and objects inside generous safe margins so the complete image can be placed beside editable text.
Constraints: no text, letters, numbers, captions, labels, signatures, logos or watermarks; blank notebook pages and blank book pages. No photographic lighting, gradients, 3D render, shiny robots, screens, circuit boards, neural-network graphics, rigid infographic arrows, or thesis–antithesis–synthesis triangle. No portraits of real people. Do not imply that the machine is conscious. Output one finished image, not a contact sheet.
```

## Week 8: Technosymbiosis / Synthesis

- File: `lecture-8-images/technosymbiosis.png`
- Alt text: The child and a small lantern-headed automaton sit side by side on a hill at night, each writing in a notebook.

```text
On a low violet hill at night, the child and the machine companion sit side by side on the grass, each bent over an open blank notebook, learning together. Around them a small garden grows in which green vines and thin dull-brass wires climb the same trellis and twist together. One large imperfect gold star overhead. Quiet companionship and interdependence, neither figure leading. Wide composition, figures small.
```

## Hegel's Revenge: The Return of the *Grand Récit*?

- File: `lecture-8-images/return-of-the-grand-recit.png`
- Alt text: A long path loops through a dusk landscape past six small lanterns and returns to the gate where it began, beneath an enormous open book in the clouds.

```text
A long pale path winds through an indigo dusk landscape in one great loop and returns to the small garden gate where it began. Six small lanterns stand at intervals along the loop, each a little different, marking the stations already passed. The child stands at the gate looking back along the whole path. High above, the clouds form the shape of one enormous open book with blank pages spread across the sky: a grand narrative returning. Calm, retrospective, a sense of coming home changed.
```

## Synthesis as a Concept

- File: `lecture-8-images/three-syntheses.png`
- Alt text: Three streams meet and braid into one river: one of drifting paper slips, one past ruins and towers of different eras, one where people pass a lantern hand to hand.

```text
Three streams flow down from the hills and braid together into a single wide river in the foreground. The first carries drifting blank paper slips like ideas. The second runs past ruins and towers from different ages: a broken classical column, a small chapel, a mill chimney. Along the bank of the third, a line of small figures pass a lit lantern from hand to hand, the child among them, an older figure stooping to help. Where they join, the water is calm and gold-lit. Conceptual, historical and pedagogical synthesis as one landscape.
```

## Experience

- File: `lecture-8-images/law-and-flight.png`
- Alt text: The child sketches the curve of a falling pear while a bird lifts away from the same branch, in an orchard at dusk.

```text
In a small orchard at dusk, a pear falls from a branch in a clean arc toward the grass while, from the same branch, a bird lifts upward into the sky. The child stands below with the notebook open, mid-sketch, looking from one to the other. A simple brass pendulum hangs from a nearby wooden frame, quietly suggesting law and regularity. The tension between a law that explains falling and an object that flies; curiosity, not confusion.
```

## Recognition / Consciousness

- File: `lecture-8-images/recognition-and-labour.png`
- Alt text: In a night workshop, workers at benches shape objects and acknowledge each other's work while a master sits apart, turned away.

```text
A long low workshop at night lit by warm lamps. Along the benches, several workers shape simple objects of wood and clay with their hands; two of them pause to look at each other's finished work with quiet acknowledgement. Raised at the far end, a master figure sits apart in a tall chair, turned away, isolated. The child watches from the doorway with the notebook. Recognition earned through labour and shared among equals; productive struggle, not violence.
```

## Attention

- File: `lecture-8-images/three-lamps-and-threads.png`
- Alt text: The child at a desk with three small lamps, beside a field of blank cards joined to one card by gold threads of different thickness.

```text
Split across one continuous night room. On the left, the child sits at a small desk with three little lamps: one flaring brightly as if just switched on, one turned to face a single object, one burning steadily over the open notebook. On the right, a field of small blank cards floats in the air; fine gold threads of different thickness run from many cards to one bright card, the thickest threads to the cards that matter most. Two very different kinds of attending side by side, related only loosely. No letters on any card.
```

## Industrial Revolution / Fordism / Generative AI: How does Technology remake Concepts of Consciousness?

- File: `lecture-8-images/three-mills.png`
- Alt text: Along one river stand a hand-mill turned by a peasant, a smoking steam mill, and a quiet mill of looms and fine threads.

```text
Along a single winding river, three mills stand one after another from left to right. First, a small stone hand-mill turned by a peasant woman. Then a tall brick steam mill with a smoking chimney and lit windows. Last, a strange quiet mill of wooden looms and countless fine pale threads, faintly glowing, no smoke, with the machine companion tending it. Above each mill the clouds take a different layered shape, as if each age imagined the mind differently. Historical progression without a timeline diagram.
```

## Alignment

- File: `lecture-8-images/corridor-of-institutions.png`
- Alt text: The child and the automaton walk side by side along a chalk line down a corridor of doorways, past a schoolroom, a clinic, a workshop and a barred window; one door at the end stands ajar.

```text
A long institutional corridor of many doorways in perspective, each opening onto a different room: a schoolroom with desks in rows, a clinic with a white bed, a workshop with a clock, a small barred window. Down the middle runs a straight chalk line. The child and the machine companion walk side by side along it, in step, the automaton's lantern dimmed. A tall measuring rod and a hand bell stand by the wall. At the far end one door stands slightly ajar onto a dark wild garden. Discipline and correction, and a hint of shared refusal.
```

## Critique

- File: `lecture-8-images/printing-press.png`
- Alt text: Sheets fly from an old printing press, fold into paper birds and circle back to inspect the press, while a reader holds one sheet up to the lamp.

```text
An old wooden hand printing press stands in a dim print shop. Blank sheets fly from it; some fold themselves into paper birds that circle back and hover around the press, as if examining the machine that made them. In the foreground a reader holds one blank sheet up to a lamp, studying it. Critique born from the same process as the thing it criticises. Quiet, reflective, no lettering on any page.
```

## History as **Synthesis** of Differences

- File: `lecture-8-images/thought-and-belief.png`
- Alt text: A classical temple on one bank and a small chapel on the other, a dark forest between, and a path leading across to a domed city in the distance.

```text
On the left bank, a white classical temple with a few columns and a statue on a plinth. On the right bank, a small stone chapel with a single bell. Between them lies a dark tangled forest. A narrow path leads out of the forest and over a bridge toward a distant city whose great dome combines the temple's columns with the chapel's tower. The child walks the path through the forest, lantern in hand. Opposites meeting slowly, after a long darkness.
```

## History as Technological Synthesis?

- File: `lecture-8-images/four-hybrid-gardens.png`
- Alt text: Four small hybrid gardens in one landscape: a tree bearing brass fruit, a loom weaving roots, many differently shaped windmills, and a village square stitched together by paths and fine wires.

```text
One landscape divided softly into four small neighbouring gardens. In the first, a tree grows small dull-brass fruit among its leaves. In the second, a wooden loom weaves living roots into cloth. In the third, many windmills of quite different shapes and cultures turn together on a hillside. In the fourth, a village square where houses are stitched together by footpaths and fine glinting wires. The child and the machine companion walk between them. Hybrids of organic and mechanical, plural rather than one future.
```

## Owl of Minerva (Roman Goddess of Wisdom)

- File: `lecture-8-images/owl-of-minerva.png`
- Alt text: At dusk a great owl spreads its wings over an old city and library while fog hides the road ahead; the child watches the sunset.

```text
At dusk, a great owl lifts from the roof of an old library and spreads its wide wings over a small sleeping city behind it, lit gold by the last of the sun. The road leading away from the city into the future disappears into soft lavender fog. On a hill at the edge, the child and the machine companion sit watching the sunset, looking back at the city. Understanding that arrives only as the day ends; caution about what lies ahead.
```

## Designing Curriculum for the Forthcoming Technosymbiosis!

- File: `lecture-8-images/curriculum.png`
- Alt text: Through one window, two classrooms side by side: in one, children study; in the other, small automata study; a single teacher's desk is shared between them.

```text
Seen through one large arched window at night, two classrooms side by side under one roof. In the left room, children sit at desks with open blank notebooks. In the right room, small lantern-headed automata sit at identical desks with open blank books. Between the rooms a doorway stands open, and a single teacher's desk is placed in it, shared by both, with a lamp and an empty chalkboard behind it. Parallel worlds of learning, and the question of what each should learn.
```

## Final thoughts?

- File: `lecture-8-images/final-thoughts.png`
- Alt text: The child closes the notebook on the hill at night beside the automaton, the long path behind them, the star overhead.

```text
The same low hill as the opening image, later in the night. The child closes the small cream notebook; the machine companion beside them dims its lantern. Behind them, the long looping path they have walked lies quietly in the moonlight. One large imperfect gold star overhead. A gentle farewell and a sense of something completed and also beginning.
```
