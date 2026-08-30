# A lamp, reconsidered

Local content iteration, 2026-08-30. Replaces the coffee example in `../index.html`.
`../dialectic.html` supplies the visual reference and is not edited by this work.

## Teaching boundaries

- Sense-certainty: keep a written present-tense claim while its content changes.
  The old encounter was not false. A timestamp preserves a historical truth but
  introduces mediation; it does not rescue the original claim to pure immediacy.
  Anchor: Pinkard §§95–98, PDF page 109.
- Perception: inspect several general properties of the one lamp, then vary the
  context for its apparent brightness. Bright in a dark room and weak in daylight
  are not formally contradictory, since the circumstances differ. The example
  pressures a claim to an unconditional property; it is an entry into the One/Also
  problem, not a deduction of Hegel's whole transition. Anchor: §§113–115, page 116.
- Understanding: interrupt and restore conditions of illumination. The Boolean
  circuit is an illustrative dependency model, not a simulation of electrical
  physics or a literal realization of Hegel's reciprocal play of forces. Anchors:
  §§138–140, page 131; §§149–150, pages 136–137.
- Explanation: contrast a renamed appearance with a testable account, without
  presenting testability as Hegel's exhaustive standard or causal modeling as the
  completion of his argument. Anchor: §§154–155, page 140.
- The final panel is explicitly our retrospective reconstruction, distinct from
  the standpoint moving through each encounter. Anchor: §§85–87, page 104.
- Sensor/classifier/causal-model comparisons concern functions. They do not
  establish that these systems instantiate the shapes or possess experience.

The linked edition is the course's local *Phenomenology of Spirit*, Terry Pinkard
translation. Page numbers above are PDF viewer pages, not printed page numbers.
All learner thoughts and glosses in the app are teaching formulations, not quotes.

## Artwork provenance

Built-in `image_gen`: one generation and one edit. The two 1536 × 1024 originals
were inspected and converted with `cwebp -q 88` without cropping or compositing.
Minor generative texture differences remain between the two states.

Final assets:

- `../art/lamp-on.webp`
- `../art/lamp-off.webp`

The daylight control applies a labeled, illustrative contrast overlay in the app;
it does not claim to calculate photometric illumination.

### Exact ON prompt

```text
Use case: stylized-concept
Asset type: dominant object illustration for a Hegel teaching interaction, ON state
Primary request: a single ordinary adjustable desk lamp with muted brass arms and a warm ivory metal shade, sitting on a plain small dark desk surface. The shade is tilted downward and the bulb inside is visible. The lamp is ON, with a luminous pale-gold bulb and a contained warm pool of light on the desk.
Scene/backdrop: perfectly deep midnight violet #121021 background; shadowed edges merge smoothly into the background. No environmental scene or other objects.
Style/medium: quiet painterly lithograph / editorial illustration, finely restrained thin paper grain. Not photorealistic, not cartoon.
Composition/framing: landscape 3:2. Lamp central with roomy negative space. Entire lamp visible including shade, articulated support, and base. Clear, recognizable lamp silhouette and light source. Small dark desk surface in the lower part of the frame, no visible desk legs.
Lighting/mood: contemplative, dim ambient visibility, muted lavender highlights, warm pale gold light #f0c9a0 emitted by the lamp. Modest controlled light pool, no dramatic rays.
Constraints: only one lamp and plain desk surface. No text, labels, glyphs, extra objects, people, logos, signatures, watermarks, or borders.
```

### Exact OFF edit prompt

```text
Use case: lighting-weather
Asset type: matching OFF state of the exact same interactive desk-lamp illustration
Input images: Image 1 is the edit target, the lamp-on illustration.
Primary request: change ONLY the lamp illumination from ON to OFF. The bulb must be visibly unlit, with dark non-luminous filament and no glow. Remove the emitted warm glow inside and below the shade and remove the warm pool of light on the desk. Retain subtle cool ambient visibility of the entire lamp, bulb, and plain desk so the lamp remains legible.
Strict invariants: preserve the exact same camera, canvas size, crop, framing, location, orientation, articulated arm geometry, joints, springs, shade shape, bulb shape and location, lamp base, small dark desk shape and perspective, background deep midnight violet #121021, painterly lithographic texture, and composition. Do not shift, enlarge, rebuild, restyle, or redesign any object. Keep the muted brass and ivory material identity, with subdued lavender ambient highlights. Only the physically light-emitting parts and their illumination should change. All other pixels and content should remain as close as possible to the original.
Constraints: lamp OFF; no luminous bulb, no warm pool, no light beam or halo. No new objects, text, labels, glyphs, people, logos, signatures, watermarks, or borders.
```

## Verification

Run `node --test courses/479-fall-2026/hegel-experience/_notes/test-lamp-experience.mjs`
from the repository root. Tests execute the shipped script with a lightweight DOM
stand-in; they do not claim browser rendering, interaction, or layout QA.

The page remains in the existing content-package workflow. No publishing or
changes to the sibling website repository are part of this iteration.
