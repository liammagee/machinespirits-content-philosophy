# dialectic.html — sequence map

A mediating document between Hegel's text (Pinkard translation, course PDF) and the
animated visualization at `../dialectic.html`. One row of this file per scene of the
HTML. Kept under `_notes/` so it is versioned but never built or indexed.

Three registers run in parallel through the piece, and this file is the contract
between them:

1. **Hegel** — the argument of ¶¶84–167, paragraph-referenced, with deep links into
   the PDF (`#page=N`). All panel prose in the HTML is *commentary*; Hegel's own
   sentences live on the middle tab ("in Hegel's words") as a `quotes:[{text,cite}]`
   array per scene — one to three renderings each, all labelled "our rendering —
   check against Pinkard". While that tab is selected, the quotes are also typeset
   large in the main visual pane (a `#hegelview` overlay — the "quote slide"),
   mirrored as cards in the side panel. Exactly one verbatim Pinkard quotation
   appears in the whole piece: "The Now is the night." (¶95, in scene 2's quotes
   and as the written tag on the stage).
2. **The stage** — what the SVG animation literally does, scene by scene. Path
   animations use SMIL `<animateMotion>` (not WAAPI `offset-path`, which Safari
   does not run on SVG elements).
3. **The story** — *ours, not Hegel's*. A child sets out to learn the world with a
   notebook; one page per scene; each page quietly loses what the argument loses.
   In the HTML it is the default tab ("☾ the story") for each scene, read *before*
   the argument. While it is selected, the scene's illustration **fills the whole
   stage** (a `#storyview` overlay). Tab order is story → in Hegel's words → the
   argument, and the action button walks the same three phases per scene: on the
   story it reads "in Hegel's words →" (flips to the quote slide), on the quote
   slide "to the argument →", and only then runs the argument's steps. Manual tab
   clicks and the button can never disagree — the phase is derived from which pane
   is visible while `step===0`. The story mirrors; it never argues. Where it
   conflicts with Hegel, trust Hegel.

Four steps hand the conceptual move to the reader instead of animating it
(`hint()` chip over the stage + `waitClicks()` promise, gen-guarded so navigating
away mid-wait cleans up): scene 2 *Write it down* (the paper appears blank; the
reader clicks it to commit the Now to writing), scene 4 *Point to the Now* (three
clicks on the Now, each leaving a "has been" ghost — pointing is a movement),
scene 5 *Inspect the properties* (click each of the four property labels; each
fills the same Here), scene 12 *Lift the curtain* (¶165 made literal: nothing
lifts it for you — the reader clicks the curtain to go behind it themselves).
Invisible oversized hit-pads take the clicks; the visible element carries a
`.hot` brightness pulse (disabled under `prefers-reduced-motion`).

The page as a whole is framed as EPOL 479's **general introduction to Hegel — and
to thinking about human and machine learning together** (source: `../../lecture-2.md`).
Scene 0 opens with a `b-frame` block (1807, Jena, Kant's wake, *Erfahrung* as
constituted experience against empiricist/mechanistic pictures of learning), and a
teal `b-machine` "Meanwhile, the machine" note appears in scenes 1 (sense-certainty
≈ bare sensor), 5 (perception ≈ today's pattern-recognizing ML), 9 (understanding ≈
world model, plus the explanation-that-spins caution) and 12 (the continuous-learning
gap: we cannot stop experiencing, the machine cannot start). Next week's material —
recognition and self-consciousness, `lecture-3.md` — is deliberately **not**
referenced yet; scene 12's ¶167 quote is the only forward gesture.

## Why a story at all

The intended reader is a graduate student with no philosophy background — but also
a teacher, and the genre is deliberately teacherly: a gentle narrator, simple
declaratives, a child who learns by trying, in the neighbourhood of *The Little
Prince* without imitating it. The argument's difficulty is not vocabulary but
*reflexivity* — each shape of consciousness is undone by its own gesture. A story
instantiates reflexive failure without technical terms: a written page the world
walks away from, two children equally certain, a wheel that turns because a hand
turns it. The story gives the student a place to stand *before* the concept
arrives, and the separate tab keeps the two registers from contaminating each
other.

## Scene table

| # | Title | Hegel | Movement | Stage | Story page |
|---|-------|-------|----------|-------|------------|
| 0 | How experience works | Intro ¶84–88 (p.104) | Consciousness tests its knowing against its object; both collapse; the new object = what the old one turned out to be. "For us" watch the necessity from behind its back (¶87). | Two orbs (KNOWING / OBJECT), failed correspondence test, old object nests inside the new (teal ring), the violet "for us" eye brightens. | *before the first page* — a child decides to learn the world without being told, takes a notebook out into the evening; we walk a few steps behind. |
| 1 | The richest knowledge | ¶90–91 (p.107) | Sense-certainty claims the richest knowledge — pure receiving. Asked to say it, it can produce only "it is": the poorest truth. | A wealth of twinkling particulars collapses to a single point and the huge words "It is." | *page one* — asked what they found out, the child writes one line: *It is there.* The truest page in the notebook, and the emptiest. |
| 2 | Write the truth down | ¶95–97 (p.109) | The Now is the night; write it, wait until noon; the sentence goes stale. What survives this-and-that is a universal. Language refutes the meant singular. | Night sky → noon; the paper tag with the one verbatim Pinkard quote ages and is stamped GONE STALE; NOW turns teal (universal). | *page two* — the child writes *It is night* and underlines it twice; in the morning the page still says so and the world does not. A written word waits; the world does not wait with it. |
| 3 | The I will vouch for it | ¶100–102 (p.110) | The truth retreats into the I — but another I claims equal immediate warrant. "This I" is what every I says: another universal. | Two eye-figures beam at tree and house; the claims collide and cancel; ghost-I's multiply. | *page three* — "the star is over the elm tree." "It is over the river," says another child, just as certain. Being certain was the one thing everyone had brought; the sky did not take sides. |
| 4 | Don't speak — point | ¶104–110 (p.111) | Pure pointing: the pointed-at Now *has been*; the return gathers a plurality. The Here splays. The This survives as universal — *wahrnehmen*, to take truly, = to perceive. | The pointing hand; ghost-nows sliding into the past; the gathered band; the This bursts into four properties. | *page four* — the child stops writing and only points; the star slips on under the finger. Even pointing tells a small story, and stories take time. |
| 5 | The thing with many properties | ¶112–115 (p.116) | The new object: one thing, many general properties held in the Also, excluded by the One. Built entirely from sense-certainty's wreckage. | The salt: co-located property layers over a cube; the blue ALSO ring, the gold ONE ring; "sweet?" is repelled. | *page five* — the child picks up a stone: *grey, and heavy, and cold, and round*. One stone, four words, tied in a bundle; the world holds beautifully still, for a while. |
| 6 | The juggle | ¶116–122 (p.118) | Perceiving shuttles the One and the Also between thing and I, faster and faster; the truth is the two-sided movement itself. | ONE and ALSO tokens swap between hexagon-thing and eye, accelerating into a blur; the self-sameness banner cracks. | *page six* — one stone, or many words? The child passes it from hand to hand, faster and faster, until the passing is the steadiest thing in the garden. |
| 7 | The thing perishes | ¶123–131 (p.121) | For-itself and for-another collapse into one respect: determinateness *is* difference from others. Result: the unconditioned universal. | Salt's hexagon edges take the neighbours' colours; walls dissolve into a teal relations-mesh. | *page seven* — the stone ends where the moss begins; take away everything the stone is not and nothing is left to hold. The page called *stone* has every other page hiding inside it. |
| 8 | Force and the play of forces | ¶136–143 (p.130) | The object becomes movement: expression / driven-back. Force solicited by force; their reality is the vanishing; the understanding peers through appearance toward the inner. | The breathing cluster splits into two forces in antiphase; role labels swap; the veil shimmers; THE INNER opens; the syllogism line. | *page eight* — "something inside it must make it what it is" — but the inside only ever shows itself as an outside. The child writes *the inside* at the top of a page, and underneath it, nothing at all. |
| 9 | A tranquil realm of laws | ¶148–155 (p.136) | Law = the stable in the flux; unified, it thins to lawfulness as such. Explanation distinguishes force from law and concedes they are the same content: a tautology — and the movement now runs in the understanding. | Flux paths yield golden law-curves and law-cards; cards merge and thin; the tautology wheel turns around the understanding's own eye — a closed circuit: event → law → force → event. | *page nine* — "why does the star come back?" "Because it always does." "Why does it always?" "Because it comes back." It turns beautifully, like a well-oiled wheel; much later, the child notices whose hand is turning it. |
| 10 | The inverted world | ¶156–160 (p.142) | The second law inverts the first; the inverted world refuses to stay elsewhere; each pole carries its opposite within: inner difference. | The chips flip (sweet→sour…); the first world's ghosts return; opposites bleed back inside; everything folds into the drawn lemniscate. | *page ten* — the child dreams the world backwards and wakes to find nothing to correct: each thing already carries its own backwards inside it, the way day carries night. |
| 11 | Infinity: the pulse | ¶161–163 (p.145) | Simple infinity — unity that divides itself, each side the whole; the soul of every previous collapse. | The lemniscate beats like a pulse; riders (night/day, One/Also, force/force, law/force) circulate on it. | *page eleven* — the child reads the notebook from the beginning: each word certain, then split in two, then joined again, a little wiser. One story, wearing different clothes. |
| 12 | Behind the curtain | ¶164–167 (p.148) | Behind the curtain there is nothing to see unless we go behind it; consciousness of an other becomes self-consciousness; I = I. | Theatre curtains part on a mirrored eye; the corner "for us" eye dims (it has walked on stage); knowing and object merge into I = I. | *the last page* — the child draws back the curtain of the sky and finds a small face, looking. "Oh — it was me, learning." Then morning, a harder light, and a new notebook. |

## The story, in full

The authoritative text of the story tab; the HTML mirrors these pages verbatim
(`STORY` array in dialectic.html). Words the child writes in the notebook are
italicized.

**Before the first page (scene 0).** Here is a story to keep beside the argument.
It is ours, not Hegel's — a small lantern carried along the road, not the road
itself. Once there was a child who decided to learn the world without being told
anything about it. The child took a clean notebook and went out into the evening.
*I will look for myself,* the child said, *and write down only what is really
there.* We walk a few steps behind — near enough to watch, too far to help.

**Page one (scene 1).** The child looked, and the world was all there at once: the
grass, the sky, the smell of rain coming. "What did you find out?" we asked. The
child thought for a long time, and wrote one line: *It is there.* It was the
truest page in the notebook, and the emptiest.

**Page two (scene 2).** That night the child wrote: *It is night* — and underlined
it twice, because nothing had ever been more certain. In the morning the page
still said so, and the world did not. The ink had kept its word; the night had
not. A written word waits, the child learned. The world does not wait with it.

**Page three (scene 3).** "The bright star is over the elm tree," said the child.
"It is over the river," said another child, from another garden, just as certain.
They compared notebooks for a long time. Being certain, it turned out, was the
one thing everyone had brought. The sky did not take sides.

**Page four (scene 4).** So the child stopped writing and only pointed. But a
finger is slow and the sky is not: by the time we looked, the star had slipped a
little further on. Even pointing tells a small story, the child learned — and
stories take time.

**Page five (scene 5).** The child picked up a stone. *Grey,* said the notebook.
*And heavy. And cold. And round.* One stone, four words — with room left for
more. The child tied the words into a little bundle, and for a while the world
held beautifully still.

**Page six (scene 6).** "But is it one stone, or many words?" The child tried
putting the many-ness inside the stone; that seemed wrong. Then inside the
notebook; that seemed wrong too. So the child passed it from hand to hand, faster
and faster — and soon the passing was the steadiest thing in the garden.

**Page seven (scene 7).** The stone ended where the moss began. The moss ended at
the path; the path, at the dark. Take away everything the stone is not, thought
the child, and nothing is left to hold. That evening, the page called *stone* had
every other page hiding inside it.

**Page eight (scene 8).** "Then something inside it must make it what it is," said
the child. But the inside would only ever show itself as an outside: a push
answered by a pull, a light answered by a light. At the top of a fresh page the
child wrote *the inside* — and underneath it, nothing at all.

**Page nine (scene 9).** "Why does the star come back every year?" "Because it
always does." "And why does it always?" "Because it comes back." The child turned
this around and around, and it turned beautifully, like a well-oiled wheel. Much
later, the child noticed whose hand was turning it.

**Page ten (scene 10).** That night the child dreamed the world backwards: up was
down, sweet was sour, and the star rose in the west. The child woke early and ran
out to check — and found nothing to correct. Each thing already carried its own
backwards inside it, the way day carries night.

**Page eleven (scene 11).** The child read the notebook from the beginning. Page
after page, the same thing kept happening to different words: each was certain,
then split in two, then joined up again, a little wiser. It was not many stories
after all. It was one story, wearing different clothes.

**The last page (scene 12).** At the end of the garden hung the curtain of the
sky, and at last the child drew it back, to see what was behind everything.
Behind it was a small face, looking. "Oh," said the child. "It was me —
learning." Then it was morning, which is a harder light. The child went in to
breakfast, and started a new notebook.

## Image prompts

One image per scene, filling the whole stage while the story tab is selected
(the `#storyview` overlay). Each style iteration is a **set** — a subdirectory
of `art/` holding `story-NN.webp` (NN = zero-padded scene index) plus its own
`_originals/`. The HTML tries sets newest-first per scene (`ART_SETS` in
`dialectic.html`, currently `art/litho/` then the original run at `art/`
itself) and finally draws a procedural vignette, so a new style can be
generated incrementally: scenes not yet regenerated keep showing the previous
set, and **no set ever overwrites an earlier one**. The current set for the
generator is `SET` in `generate-story-art.py` (`--set NAME` overrides). The stage is
16:9 (1200×675); generated images are 1536×864 — exact 16:9, since `gpt-image-2`
accepts arbitrary resolutions (divisible by 16) — so nothing is cropped away by
the `object-fit: cover` fit.

**Generation:** `_notes/generate-story-art.py` parses the preamble and the table
below (this file is the single source of truth for the prompts), calls the
OpenAI image API (`gpt-image-2`), keeps the API's PNG in `art/_originals/`
(hidden from the indexer), and encodes the served `art/story-NN.webp` with
`cwebp -q 82` (~40 KB each instead of ~1.6 MB). Existing files are skipped;
`--force` regenerates; pass scene numbers to limit the run.

```bash
export OPENAI_API_KEY=sk-...
python3 _notes/generate-story-art.py
```

**Shared style preamble (prepend to every prompt):**

> A mid-century Central European children's picture-book lithograph, in the
> spirit of 1950s–60s Czech and Polish book illustration: hand-drawn and
> slightly crooked, printed in a small number of flat inks on rough toothy
> paper, with visible litho grain, crayon scumble, scratched-out highlights and
> gently misregistered colour. Deep indigo and violet night inks over warm
> paper; one warm pale-gold accent; sparing second accents of faded teal and
> muted coral. Naive flattened perspective, no photographic light, no gradients,
> no 3D render. A tiny stylized child with a notebook, small in the scene. Mood
> tender, hushed, a little strange — a bedtime book from a country that no
> longer exists. No text or lettering. 16:9.

| # | Prompt (after the preamble) |
|---|-----------------------------|
| 0 | A child steps from the lit doorway of a crooked little house into an enormous flat indigo garden; one huge hand-drawn star, printed slightly off-register in pale gold, hangs low over paper-cut hills. |
| 1 | The child stands stiff and small in a meadow of scratchy hatched grass under a sky crammed with clumsy stamped stars of every size, the notebook shut under one arm; the whole sky pressing down like wet ink. |
| 2 | The child asleep at a tall skinny desk beneath a round window; the window is split down the middle by the printing itself — one half deep night ink with a moon, the other half bare warm paper with a rough dawn sun — and the open notebook has gone pale. |
| 3 | Two spindly watchtowers on two lumpy hills, a small child leaning from each window pointing at the same off-register gold comet; between the hills a valley of fog rendered as bare unprinted paper. |
| 4 | The child points a long naive arm at an empty patch of sky; where the star used to be, a trail of fading gold thumbprints arcs away across the indigo, each print fainter than the last. |
| 5 | The child holds up a fat grey stone like an offering; around the stone hover four crooked concentric rings, each ring printed in a different flat ink — teal, coral, violet, gold — none of them quite lining up. |
| 6 | The child juggles one small glowing shape between two raised hands, the shape smeared into repeated overprinted echoes between them; the garden around is nearly solid black ink with a few scratched-out leaves. |
| 7 | A stone at the child's feet coming apart at the edges: its outline continues as bare scratched lines into moss, path and night, so it is no longer clear where stone ends and garden begins; the child crouches, peering. |
| 8 | Two large soft lamps of unequal size lean toward each other in the sky like two heads talking; below, the tiny child stands before a tall veil of thin, almost transparent ink hanging from nothing. |
| 9 | A giant pale orrery-wheel of hooped rings and little stamped planets fills the sky; from behind we see the child, small at its base, both hands on a crank far too big for them. |
| 10 | A flat black lake mirrors the night exactly, but wrong: in the water the stars are printed as black dots on pale gold and the darkness shines; the child stands at the very edge of the paper-white shore, toes at the ink. |
| 11 | A looping figure-eight path of pale gold thread winds through a tiny crowded map of every earlier scene — house, meadow, towers, stone, lake — and the child walks it with a small lantern, twice as large as the world they cross. |
| 12 | At the end of a long garden two enormous theatre curtains of night hang parted; between them a tall thin mirror shows the child back to themself, and from one side the first bare-paper light of morning leaks in. |

## Motif and palette key

- The palette is pastel over deep indigo — Monument Valley / Ori territory,
  sombre overtones kept. Accents: apricot `#f0c9a0` = sense-certainty / the
  claim of immediacy · periwinkle `#a9bbe8` = perception / the Also · dusty rose
  `#e08e9b` = force, contradiction, failure · soft mint `#8fd6c2` = the result
  that survives a collapse (the universal, the mesh, infinity) · lavender
  `#c0aee6` = the "for us" register and the story tab.
- The violet eye (top-right of the stage) is the one element that survives every
  scene change; scene 12 dims it deliberately and `renderScene()` restores it.
- Melancholic atmosphere (ours, decorative): drifting ground-mist, occasional
  meteors, slow starfield twinkle — all suppressed under `prefers-reduced-motion`.
- Optional night music (♪ toggle in the header): a quiet generative A-minor
  drone + sparse notes, synthesized in WebAudio so the file stays self-contained.
  Off by default; user gesture starts it.

## Renderings

All quotations on the "in Hegel's words" tab (and any in-panel phrases) are our
renderings of Hegel's German and are labelled as such with ¶ references; the
single verbatim Pinkard sentence is scene 2's "The Now is the night." (¶95),
marked as the one verbatim quotation on the page. Each scene carries one to
three quotes, shown all at once (no step-gating — they are reference material,
not narrative beats), both as the stage-filling quote slide (`#hegelview`) and
as cards in the side panel. Deep links go to the PDF page of each scene's
paragraphs via `#page=N`.

Every quote's "check against Pinkard" (and, for the verbatim ¶95, an appended
"¶95 + gloss") is a link opening the reader (`#reader`): an overlay on the
panel showing the plain-language gloss from the section below, then a deep
link to that paragraph in Pinkard's translation. The reader closes on ✕,
Escape, a register/tab switch, or a scene change; its data is the `PINKARD`
object, generated between the `PINKARD:BEGIN/END` markers by
`_notes/pinkard-refs.py` (see the next section for the workflow).

## Pinkard paragraphs & glosses

Source of truth for the page's reader pane (opened from “check against
Pinkard” on any quote card or slide). One entry per cited ¶ or ¶-range: a
plain-language gloss of what the paragraph means, and a link to the paragraph
itself.

The glosses are ours and ship with the page. **Pinkard's translation is in
copyright and is never reproduced here** — this repository is public, and so
is the site it feeds. Only the page number travels, so that the reader's link
lands on the right paragraph. The edition linked is the freely available
bilingual PDF hosted by marxists.org:

<https://www.marxists.org/reference/archive/hegel/works/ph/pinkard-translation-of-phenomenology.pdf>

Its pagination differs from the course PDF in `_readings/` (739pp against
539pp — ¶95 is p.91 there, p.108 here), so page numbers must be resolved
against that edition, not read off the course copy. That is what the script
does:

    python3 _notes/pinkard-refs.py

It locates each cited paragraph in the public PDF, corrects each heading's
`p.N` and link below, and regenerates the `PINKARD` object in `dialectic.html`
(the region between the `PINKARD:BEGIN` / `PINKARD:END` markers — never edit
that region by hand). After editing a gloss here, push it to the page without
re-reading the PDF: `python3 _notes/pinkard-refs.py --sync`.

Because the edition is bilingual, each paragraph number is printed twice on
its page (once for the English, once for the German), so the script checks
uniqueness over distinct *pages* rather than over matches.

### ¶84 · p.82

**Gloss.** Hegel's method in one move: we never need an outside yardstick to test knowledge. Consciousness always carries two things at once — what it takes the object to be, and how the object actually shows up for it — and the test is simply the comparison of the two. When they fail to match, consciousness cannot shrug the mismatch off; it has to revise its own account.

> ¶84 in Pinkard’s translation: [marxists.org, p.82](https://www.marxists.org/reference/archive/hegel/works/ph/pinkard-translation-of-phenomenology.pdf#page=82) — text not reproduced here (in copyright).

### ¶86 · p.85

**Gloss.** When the test fails, it is not only the knowing that shifts — the object changes too, because the object was only ever the object-as-known. A new object emerges from the wreck of the old one. This self-correcting movement, in which each failure generates the next and richer shape, is exactly what Hegel means by the word “experience”.

> ¶86 in Pinkard’s translation: [marxists.org, p.85](https://www.marxists.org/reference/archive/hegel/works/ph/pinkard-translation-of-phenomenology.pdf#page=85) — text not reproduced here (in copyright).

### ¶87 · p.85

**Gloss.** The learner never watches its own learning happen. From the inside, the new object seems simply to turn up — a lucky find. Only an observer of the whole series (Hegel says: “we”, the readers) sees that the new object was produced by the failure of the old one. The production happens, as the story puts it, behind the learner's back.

> ¶87 in Pinkard’s translation: [marxists.org, p.85](https://www.marxists.org/reference/archive/hegel/works/ph/pinkard-translation-of-phenomenology.pdf#page=85) — text not reproduced here (in copyright).

### ¶91 · p.89

**Gloss.** Sense-certainty — just look, don't think — promises the richest knowledge there is: the whole world, immediately, nothing filtered out. But ask it to state what it knows and everything collapses into a single word: *is*. The richest-seeming knowledge yields the poorest truth, because it refuses the very distinctions that would make its content sayable.

> ¶91 in Pinkard’s translation: [marxists.org, p.89](https://www.marxists.org/reference/archive/hegel/works/ph/pinkard-translation-of-phenomenology.pdf#page=89) — text not reproduced here (in copyright).

### ¶95 · p.91

**Gloss.** The famous experiment. If “the Now is the night” is true, writing it down cannot hurt it — a truth loses nothing by being preserved. But read the note at noon and it has gone stale. What survives the test is not night or day but the Now itself, which stays Now precisely by not being any particular content. The written note is the first machine in the book: an external memory that outlives what it recorded.

> ¶95 in Pinkard’s translation: [marxists.org, p.91](https://www.marxists.org/reference/archive/hegel/works/ph/pinkard-translation-of-phenomenology.pdf#page=91) — text not reproduced here (in copyright).

### ¶96 · p.92

**Gloss.** Something that persists by negating every particular filling — not night, not day, “a not-this” — is what Hegel calls a universal. And the twist: universals are all that language can say. Say “Now”, “This”, “here” and you utter what everybody utters. The bare particular you *mean* is exactly what you cannot *say*.

> ¶96 in Pinkard’s translation: [marxists.org, p.92](https://www.marxists.org/reference/archive/hegel/works/ph/pinkard-translation-of-phenomenology.pdf#page=92) — text not reproduced here (in copyright).

### ¶101 · p.94

**Gloss.** Pushed off the object, sense-certainty retreats into the subject: the truth of the This now lies in *my* seeing, *my* hearing — the immediacy of the I. The certainty has not been given up, only relocated: from the thing over there to the one who beholds it.

> ¶101 in Pinkard’s translation: [marxists.org, p.94](https://www.marxists.org/reference/archive/hegel/works/ph/pinkard-translation-of-phenomenology.pdf#page=94) — text not reproduced here (in copyright).

### ¶102 · p.94

**Gloss.** But “I” fares no better than “Now”. Every speaker says “I”, and every “I” is any I. The word that was supposed to name pure singularity is the most common word in the language — so the singular I is just as unsayable as the singular This was.

> ¶102 in Pinkard’s translation: [marxists.org, p.94](https://www.marxists.org/reference/archive/hegel/works/ph/pinkard-translation-of-phenomenology.pdf#page=94) — text not reproduced here (in copyright).

### ¶107 · p.97

**Gloss.** Fine — don't say the Now, point at it. But pointing takes time: by the moment the finger arrives, that Now *has been*. Pointing out the Now is not a touch but a little history — Now, has-been, and the return out of the has-been — and what the Now truly is turns out to be a result: many nows gathered into one.

> ¶107 in Pinkard’s translation: [marxists.org, p.97](https://www.marxists.org/reference/archive/hegel/works/ph/pinkard-translation-of-phenomenology.pdf#page=97) — text not reproduced here (in copyright).

### ¶110 · p.100

**Gloss.** The same goes for the Here and for the piece of paper you mean. Speakers mean *this* paper, but what they say is “things”, “objects” — universals. And Hegel is blunt about the residue: the “ineffable” particular that cannot enter language is not deeper than language but less — the merely meant, the untrue. What cannot be said was never doing any work in knowledge.

> ¶110 in Pinkard’s translation: [marxists.org, p.100](https://www.marxists.org/reference/archive/hegel/works/ph/pinkard-translation-of-phenomenology.pdf#page=100) — text not reproduced here (in copyright).

### ¶113 · p.103

**Gloss.** Perception has learned sense-certainty's lesson: it takes the thing *as* universal from the start. The salt is one Here and at the same time many: white, and also tart, and also cubical, and also of a certain weight. That harmless little word “also” is the whole structure of the new object.

> ¶113 in Pinkard’s translation: [marxists.org, p.103](https://www.marxists.org/reference/archive/hegel/works/ph/pinkard-translation-of-phenomenology.pdf#page=103) — text not reproduced here (in copyright).

### ¶113–114 · p.103

**Gloss.** The thing has two faces that do not fit together. As the *Also* it is a loose medium in which properties coexist without touching — the whiteness does not affect the cubical shape, neither affects the tartness. As the *One* it excludes: the properties are *its*, determinate only by contrast with what the thing is not. Perception's whole drama is that the thing has to be both at once.

> ¶113–114 in Pinkard’s translation: [marxists.org, p.103](https://www.marxists.org/reference/archive/hegel/works/ph/pinkard-translation-of-phenomenology.pdf#page=103) — text not reproduced here (in copyright).

### ¶116–118 · p.106

**Gloss.** The perceiver knows perception can deceive, and has a fix ready: whenever the thing comes out contradictory, blame the perceiving. “The thing itself is one; the diversity came from me.” Consciousness takes the untruth upon itself to keep its object pure — the first appearance of error-management as a deliberate strategy.

> ¶116–118 in Pinkard’s translation: [marxists.org, p.106](https://www.marxists.org/reference/archive/hegel/works/ph/pinkard-translation-of-phenomenology.pdf#page=106) — text not reproduced here (in copyright).

### ¶119–122 · p.109

**Gloss.** The strategy becomes a shell game. First: unity belongs to the thing, diversity comes from us — our eyes, our tongue. Then, when that fails: diversity belongs to the thing, unity is our synthesis. The assignments keep swapping because neither side can hold its role — the contradiction lives in the relation itself, not in either party.

> ¶119–122 in Pinkard’s translation: [marxists.org, p.109](https://www.marxists.org/reference/archive/hegel/works/ph/pinkard-translation-of-phenomenology.pdf#page=109) — text not reproduced here (in copyright).

### ¶125–126 · p.113

**Gloss.** The thing was supposed to stand on its own — for itself, indifferent to everything else. But its determinateness — being *this* thing and no other — exists only through contrast with other things. Its independence is constituted by relation, which is to say it is not independence. The thing's own character is what dissolves it.

> ¶125–126 in Pinkard’s translation: [marxists.org, p.113](https://www.marxists.org/reference/archive/hegel/works/ph/pinkard-translation-of-phenomenology.pdf#page=113) — text not reproduced here (in copyright).

### ¶128 · p.114

**Gloss.** Perception's last defence is bookkeeping: the thing is one “insofar as”, many “in another respect”. Hegel calls this sophistry — juggling empty abstractions to postpone the contradiction rather than think it. Those abstractions, handled and dropped like counters, are precisely what the understanding will now take as its proper objects.

> ¶128 in Pinkard’s translation: [marxists.org, p.114](https://www.marxists.org/reference/archive/hegel/works/ph/pinkard-translation-of-phenomenology.pdf#page=114) — text not reproduced here (in copyright).

### ¶136 · p.121

**Gloss.** Force is the thing re-thought as movement. Force driven back into itself — withdrawn, potential — *must* express itself; and the expression is not something done to it from outside but its own doing. Substance has become process: what a force is, is what it does.

> ¶136 in Pinkard’s translation: [marxists.org, p.121](https://www.marxists.org/reference/archive/hegel/works/ph/pinkard-translation-of-phenomenology.pdf#page=121) — text not reproduced here (in copyright).

### ¶141 · p.127

**Gloss.** Take two forces: each is solicited by the other, each active only in the exchange. Try to grasp either force outside the play and there is nothing to hold — their being is a pure vanishing. The truth of force is not a hidden stuff behind the play but the *thought* of the interplay — which drives consciousness to look behind the play for something that stays put.

> ¶141 in Pinkard’s translation: [marxists.org, p.127](https://www.marxists.org/reference/archive/hegel/works/ph/pinkard-translation-of-phenomenology.pdf#page=127) — text not reproduced here (in copyright).

### ¶143–146 · p.129

**Gloss.** Behind the vanishing play, consciousness posits a true world: the inner, the supersensible. But at first this beyond is empty — there is nothing in it yet, precisely because consciousness has defined it only as “not the appearance”. Nothing is to be seen in a void; the inner is a blank exactly as long as consciousness has not yet recognised its own hand in filling it.

> ¶143–146 in Pinkard’s translation: [marxists.org, p.129](https://www.marxists.org/reference/archive/hegel/works/ph/pinkard-translation-of-phenomenology.pdf#page=129) — text not reproduced here (in copyright).

### ¶149 · p.135

**Gloss.** The empty inner gets its filling: it becomes the tranquil realm of laws — the flux of appearance redrawn as a stable, motionless likeness. But the copy is too calm. The law states what always holds; appearance keeps a remainder of change and instance that the law does not capture. The map is quieter than the territory, and that gap is the next problem.

> ¶149 in Pinkard’s translation: [marxists.org, p.135](https://www.marxists.org/reference/archive/hegel/works/ph/pinkard-translation-of-phenomenology.pdf#page=135) — text not reproduced here (in copyright).

### ¶152–154 · p.138

**Gloss.** Explanation: the understanding distinguishes the law from its ground — a force — and then finds the force constituted exactly like the law. A difference is declared and immediately cancelled: one content, said twice. Nothing happens in the object; all the movement is the understanding's own. That is the joke, and also the clue — the necessity consciousness kept looking for was its own activity all along.

> ¶152–154 in Pinkard’s translation: [marxists.org, p.138](https://www.marxists.org/reference/archive/hegel/works/ph/pinkard-translation-of-phenomenology.pdf#page=138) — text not reproduced here (in copyright).

### ¶158 · p.145

**Gloss.** The inverted world. If one supersensible world mirrors appearance, the logic of opposition generates a second, inverted one: what is sweet in the first is sour in it, what is black is white. The lesson of the exercise: once a world can be inverted wholesale, “like” and “unlike” stop being fixed addresses — the like is unlike to itself, and the unlike like.

> ¶158 in Pinkard’s translation: [marxists.org, p.145](https://www.marxists.org/reference/archive/hegel/works/ph/pinkard-translation-of-phenomenology.pdf#page=145) — text not reproduced here (in copyright).

### ¶160 · p.147

**Gloss.** The inversion teaches inner difference: real opposition is not two separate things parked in two separate worlds. The opposite is “the opposite of an opposite” — its other is already inside it. Difference that a thing carries within itself, its differing from itself, is the concept the whole chapter has been driving toward.

> ¶160 in Pinkard’s translation: [marxists.org, p.147](https://www.marxists.org/reference/archive/hegel/works/ph/pinkard-translation-of-phenomenology.pdf#page=147) — text not reproduced here (in copyright).

### ¶162 · p.149

**Gloss.** Inner difference made absolute receives its grand names: simple infinity, the absolute concept, the simple essence of life, the soul of the world, the universal blood. It is unity that differs from itself and remains itself in the differing — the pulse the book has been tracking from the first page, now stated in its own right.

> ¶162 in Pinkard’s translation: [marxists.org, p.149](https://www.marxists.org/reference/archive/hegel/works/ph/pinkard-translation-of-phenomenology.pdf#page=149) — text not reproduced here (in copyright).

### ¶163 · p.151

**Gloss.** This infinity was silently the engine of every shape so far — sense-certainty's Now, perception's Also, the play of forces. In the inner it finally steps forth as itself, free-standing. And when consciousness takes *this* as its object, it is looking at the very structure of its own looking: consciousness of difference has become self-consciousness.

> ¶163 in Pinkard’s translation: [marxists.org, p.151](https://www.marxists.org/reference/archive/hegel/works/ph/pinkard-translation-of-phenomenology.pdf#page=151) — text not reproduced here (in copyright).

### ¶165 · p.153

**Gloss.** The curtain scene. The inner world was supposed to hide behind appearance like a stage behind a curtain. Hegel's verdict: behind the curtain there is nothing to see — unless we go behind it ourselves; and our going behind is what puts both a seer and a seen there. The hidden truth was never an object lying in wait; it is the activity of the consciousness that seeks it.

> ¶165 in Pinkard’s translation: [marxists.org, p.153](https://www.marxists.org/reference/archive/hegel/works/ph/pinkard-translation-of-phenomenology.pdf#page=153) — text not reproduced here (in copyright).

### ¶167 · p.156

**Gloss.** The turn is complete: consciousness of an object has become consciousness of itself, and Hegel marks the arrival — with self-consciousness we have entered the native land of truth. Everything before was the prehistory of a knower that can now take its own knowing as the thing to be known.

> ¶167 in Pinkard’s translation: [marxists.org, p.156](https://www.marxists.org/reference/archive/hegel/works/ph/pinkard-translation-of-phenomenology.pdf#page=156) — text not reproduced here (in copyright).
