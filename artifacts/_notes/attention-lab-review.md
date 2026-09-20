# Spotlight — Week 4 review and implementation

Date: 2026-09-19. Course: EPOL 479, Fall 2026.

## Review boundary and recovery of the original

The first revision was a simplified replacement: the original filename was
not present in the local content checkout. Following feedback, the original
was located at:
https://machinespirits.org/content/artifacts/spotlight-attention-game.html

The retrieved original SHA-256 is
`8867950d643f1c9407b4a140044bb2442701eb2df4f18c3f2cac376063ad30a6`.
The current application restores its visual design, mechanics, feature data,
all six levels (16 scored puzzles), three animated introduction examples,
query forge, multi-head game, two-layer game, progress storage and sandbox.
It lives in `attention-assets/spotlight-machine.html`, inside the main
application. No puzzles were substituted by the new explanatory activities.

The first revision's eight-head numerical inspector also remains available,
in `attention-assets/vector-lab.html`. Its shorter sentence and synthetic
vectors are explicitly distinguished from the game chips and shared
next-token task. This retains detail instead of replacing one explanation
with another.

Existing unrelated Week 3 edits were left intact. Regenerating the sitemap
also reflects the already-edited Week 3 title in that derived listing.
No commit, push, publication or deployment was requested or performed.

## Source copies verified

All three PDFs already exist under `machinespirits-readings/479/`:

- `Vaswani2017_Attention_Is_All_You_Need.pdf`: 15-page arXiv v7 (2023)
  copy of the 2017 paper; SHA-256
  `bdfaa68d8984f0dc02beaca527b76f207d99b666d31d1da728ee0728182df697`.
- `PetersenPosner2012_Attention_System_Human_Brain.pdf`: 18-page NIH
  manuscript; SHA-256
  `3a175582d0551300a312efc60449118dd53642e4d6b253da8c7e152279ecb35d`.
- `Terranova2012_Attention_Economy_and_the_Brain.pdf`: Culture Machine 13;
  SHA-256 `ab71f4a915ac9de6047aad15921a1f26d349d5b4d45f40acb5aef1dd43ee4e6d`.

No reading-repository changes were needed. The source links are in the
application. Human-attention references use manuscript PDF pagination;
Terranova references use the paper's printed pagination.

## Material and interpretation

| Activity | Source grounding | Authored construction and limits |
|---|---|---|
| Original six games | Vaswani §§3.1–3.5 | Readable chips, manual query rules, star objectives and shared keys in the multi-head game are pedagogical simplifications. |
| Query origin | Vaswani §§3.2, 3.4, 3.5 | Invented 2D embeddings and W_Q; actual scaled embedding plus sinusoidal position and matrix multiplication. Different positions and projection entries change Q visibly. |
| Training / inference | Vaswani §§3.1, 3.2.3, 5 | Real gradient descent in a one-example, two-source, two-candidate scalar toy. Only W_Q = theta learns; the full Transformer trains many parameters together. Does not demonstrate general language learning. |
| Numerical inspector | Vaswani §3.2 | Eight synthetic 2D heads; stable softmax, proper causal masking and weighted V. One adjusted key is shared across all matrix rows. |
| Alerting | Petersen & Posner pp. 2, 4–5; Fig. 1 | Readiness before reading; right laterality qualified for tonic versus phasic alerting. |
| Dorsal / ventral orienting | Petersen & Posner pp. 3, 5–6; Fig. 2a | Relevant text and margin-cue scenarios; not measured gaze or comprehension. |
| Stable / adaptive control | Petersen & Posner pp. 6–8; Figs. 2b–c, 3 | Keeping a prediction task versus revising a strategy; authors' favored two-network account, not uncontested localization. |
| Shared next-token comparison | Same `reading-cases.js` data as original introduction | User response compared with scripted candidate probabilities, not a trained-model benchmark. All three prefixes and candidate lists match the original. |
| Social synthesis | Terranova pp. 1–13 | Engagement, assessment and cooperative reading are authored institutional scenarios. No empirical behavioral/revenue effects are simulated. Transformer connection is a retrospective course application. |

Terranova's argument is not reduced to distraction or a recommendation to
optimize individual focus. The fourth tab questions the naturalization of
scarcity, the limits of behavioral proxies, social production through
imitation/cooperation, and the organization of memory and expectation. It
keeps capture and cooperation as political questions, not a guaranteed
outcome of an interface toggle. Her paper predates the Transformer.

## Corrections to the recovered game

- Distinguish attention softmax over source positions from vocabulary softmax
  after the decoder. Intro distributions and continuations are scripted;
  they do not come from a running language model or actual sampling.
- An attention mixture contributes to a token representation; it is not the
  whole new representation or a complete account of its meaning.
- First-layer Q comes from embedding plus position; later queries can use
  context accumulated in prior layers. W_Q is shared across positions, not
  manually chosen for every token during inference.
- In the games, IF/LOOK FOR rules stand in for W_Q and keys remain fixed.
  Real Q/K/V projections are independently learned for each head/layer.
  Explain the column-vector versus paper row-vector notation difference.
- Sharpness is an experimental score multiplier; the paper's 1/sqrt(d_k)
  scaling is fixed, not learned or a user dial.
- Multi-head outputs are concatenated and transformed with W_O. Heads are
  not assigned stable linguistic jobs in advance.
- The exact sum-to-one constraint is not a biological attention-budget law;
  human attention is not a single serial beam.
- Added visible keyboard focus, larger touch targets, keyboard-readable
  matrix cells, pause-on-section-change and manual initial playback.

## Brain geometry and rendering

The previous procedural ellipsoids were replaced by actual fsaverage5 pial
meshes: 10,242 vertices and 20,480 triangles per hemisphere, with sulcal-depth
shading. Three.js 0.180.0 is vendored locally. The model supports drag, arrow
keys, zoom keys, rotation buttons, a top view, individual hemispheres and
transparency for deep schematic markers. Surface patches change emphasis
between reading moments; reduced motion uses static highlights. Animations
stop on tab/page changes. Textual scenarios and region lists remain available
if the WebGL renderer or surface assets cannot load.

Geometry source: Nilearn 0.12.1's distribution of the FreeSurfer fsaverage5
standard template (Fischl et al., 1999). GIFTI arrays were decoded and converted
to binary without changing mesh geometry. Native RAS coordinates are rendered
as [R/100, S/100, -A/100]. Network locations, patch widths, colors, timing and
emphasis are authored approximations, not atlas registration or fMRI data.
Deep markers are not segmented subcortical anatomy; cortical and subcortical
limits are stated beside the model.

`attention-assets/brain-provenance.json` records pinned source URLs, checksums
and binary layout. `attention-assets/credits.html` preserves the complete
FreeSurfer agreement and Three.js and Nilearn notices. Nilearn's dataset page
lists the data license as unknown; the upstream FreeSurfer agreement explicitly
covers data and is retained, rather than claiming the geometry is simply BSD.

## Validation

`node artifacts/_tests/attention-lab.cjs` starts its own loopback static server
and isolated Playwright browser. Optional environment variables:
`ATTENTION_PLAYWRIGHT_MODULE`, `ATTENTION_BROWSER_EXECUTABLE`,
`ATTENTION_QA_DIR`. No dependency installation is required when these point
at an existing runtime.

Verified in the final regression run:

- All eight game navigation entries; all six levels and 16 puzzles; normalized
  finite attention rows for all puzzles, plus manual scoring/unlocking,
  query chips, sharpness, independent heads, shared rules, two-layer forge,
  reset and sandbox controls.
- 112 numerical head/query/mask combinations, per-row normalization, no
  future leakage, agreement between selected row and full matrix, a known
  weighted mixture, and response to key adjustment.
- Query changes with position and W_Q; reset restores the calculation.
- A first gradient update agrees with the analytic derivative; subsequent
  updates decrease target loss; inference keeps theta and update count fixed.
- All three shared prefixes and displayed distributions match the original
  intro, including the other-token remainder; probabilities total 100%.
- Actual WebGL rendering of 40,960 triangles; five distinct network images;
  rotation, hemisphere, transparency, playback/pause and reduced-motion mode.
- All three social scenarios and local-only feedback; keyboard tab navigation;
  no horizontal document overflow at 320, 390, 768, 1440 pixels for every tab,
  machine panel and original game mode.
- Failed 3D module load leaves the textual human activities functional.
- Zero JavaScript page errors, failed asset requests, or external runtime
  requests in the main regression run.

Desktop and mobile screenshots were inspected, as were the live in-app
anatomical and transparent brain views. The website's artifact gallery uses
an iframe `src` and serves the full artifact directory via Express static,
so the asset subdirectory fits the existing integration. Serve the directory
over HTTP; the modular 3D viewer is not intended for a bare file:// open.

Week 4 guide/lecture links and artifact metadata were updated. The lecture
build retains an existing unrelated TeX `align` warning. Artifact index and
sitemap are regenerated. Final `./validate` and scoped `git diff --check` passed.

## Social-tab revision: operations-room simulation (2026-09-19)

The first activity now states its task explicitly: choose an organizer, inspect
its interface proposal, and reveal the record for a supplied continuation.
The reveal is an example receipt, not a button pretending to submit an answer.
Organizers, examples, incentives, ownership and unrecorded activity remain
visible. The receipt resets when the organizer or reading example changes.

The new Cybersyn-inspired room uses 120 fictional readers in six groups,
eight manual cycles, three contracts, twelve intervention units per cycle,
four interventions and two targeting rules. Each unit targets five readers.
Users see the next event before dispatching; over-budget plans cannot run.
Reader lights show clicks, no click, temporary unavailability and disconnection;
they do not claim to display attention. All 120 readers have inspectable traces;
arrow keys plus Home/End move through one roving keyboard tab stop.

Each run snapshots the shared reading prefix. Further cycles are an abstraction
of further continuation activities, not generated text or a language model.
The deterministic model keeps capacity and understanding off the dashboard,
then exposes their authored values in the debrief. A once-per-run, partial,
noisy check-in adds a different kind of evidence. All model rules and numbers
are pedagogical constructions, not Terranova's findings or calibrated behavior.
The UI explains the distinction between a contract's proxy and human/social
outcomes and reconnects the run to all three readings. Repeat runs preserve the
same population and scheduled shocks but can change policies; the comparison
explicitly is not an isolated causal test of the contract.

Historical visual reference: MIT News, Michael Brindley, “Designing a
revolution,” October 16, 2023,
https://news.mit.edu/2023/designing-revolution-1002 . The article describes the
1972–73 Chilean operations-room design and its 2023 reconstruction, including
wall displays and seven fiberglass chairs. The app links this source and
identifies the room as an imaginative adaptation for attention allocation,
not a reconstruction, attention-monitoring history, or historical simulation.
The existing erroneous Terranova DOI in the Week 4 guide was replaced with
the verified Culture Machine PDF link already used by the app.

Files: `attention-assets/control-room-engine.mjs` (pure state transitions),
`control-room.mjs` (DOM controller), `control-room.css` (scoped visual design).
No new runtime dependencies, network calls or browser persistence were added.

Validation additions:
- `node artifacts/_tests/control-room.mjs`: deterministic replay, unchanged
  input state on rejected dispatch, finite/bounded state, atomic budget limits,
  terminal-state enforcement, survey limits, contract-independent underlying
  outcomes for identical policies, achievable contracts, and trade-offs across
  32 varied policy/seed/targeting runs.
- Browser suite: 120 reader controls, budget rejection, held reading context,
  trace inspection, check-in, eight-cycle assessment win, replay and retained
  comparison results. Existing machine, brain and comparison checks still run.
- Responsive review includes the expanded game, not just its initial brief.

Final visual/interaction checks passed at 320, 390, 768 and 1440 pixels,
including a keyboard-selected individual reader and the quick control that
sets all six groups at once. Desktop and mobile room screenshots were inspected.
The full lab suite reports 16 preserved puzzles, 112 numerical cases, the
8-cycle game/replay checks, five distinct anatomical renders, and no JavaScript
errors, failed assets or external runtime requests. `./validate`, module syntax
checks and scoped `git diff --check` passed. Changes remain local and uncommitted.

## Kafka / Debord editorial frame (2026-09-19)

A new opening asks “Who is asking you?” and distinguishes the instruction,
the reader's response, and what institutions count. Kafka's doorkeeper in
*Before the Law* (included in *The Trial*, chapter 9; David Wyllie translation,
Project Gutenberg) motivates questions of access, authority and waiting.
Debord's *The Society of the Spectacle*, theses 4–6 and 24 (Ken Knabb translation,
Bureau of Public Secrets), motivates the mediation of social relations through
representations under commodity production. These are explicitly identified as
our interpretive frame, separate from the three attention papers' explanations.
The framing is paraphrased and links to both primary texts. It does not reduce
Debord's spectacle to visually distracting screens or imply that Kafka offered
an attention mechanism.

`editorial.css` supplies paper/ink typography, a photographic opening, four
entry points, neutral states, and a monochrome operations room. The machine
and vector inspectors receive local companion stylesheets. Game layouts and
all controls are retained; the two heads/layers now use solid versus striped
beams, positive/negative features use outlines/strikethrough, and the heatmap
uses a sequential gray ramp. Visible instructions match the new cues. Human
and machine remain in consistent comparison columns, using solid versus double
rules. The brain keeps its anatomical geometry and network regions, with
neutral lighting and darker cortex so pale network emphasis remains visible.

Two original images were generated using the built-in `image_gen.imagegen`
tool, then copied into `attention-assets/reading-room.png` and
`attention-assets/audience-screen.png`. Both are captioned generated allegories;
neither is offered as historical or neuroscientific evidence. Exact generation
prompts, dimensions and purpose are saved in `artwork-provenance.json`, linked
from the app credits. No remote image or font dependency was introduced.

The full browser suite passes after the redesign: 16 puzzles, 112 numerical
cases, query/training behavior, 40,960-triangle rendering across five network
views, comparison and control-room behavior, image loading, and widths 320,
390, 768 and 1440. The new filtering initially exposed the effects canvas's
300px default width on narrow screens; its CSS dimensions now follow the
viewport. Desktop/mobile artwork, the comparison and operations room were
visually inspected, and a focused anatomical screenshot checked surface versus
network contrast. No JavaScript errors, external runtime requests or failed
asset loads were reported. The simulation engine suite also passes unchanged.

## Week 4 introduction page (2026-09-19)

The default `#intro` view now gives the gist of the current Week 4 overview:
attention makes some information consequential; the shared word spans distinct
human and computational explanations; inspectable weights do not establish
awareness or explain every model decision; and selection leads to political
questions about whose purposes a system serves. A three-part course progression
connects Week 3 recognition, Week 4 attention, and Week 5 alignment. The page
includes the week's learning goals, the activity's central gains/costs question,
and a link to the full overview. The existing artwork and Kafka/Debord frame
remain here alongside the course introduction.

An Introduction tab precedes the four activities. The shared reading selector
appears only within activities; the long opening is no longer repeated above
every tab. No game or learner state resets when returning to the introduction.
Existing `#machine`, `#human`, `#compare`, and `#social` links continue to select
their panels; legacy `#framing` links open the introduction. Keyboard navigation
uses the actual tab count, including wrapping and Home/End.

The full browser regression suite passed with new checks for default landing,
entry routes, legacy/direct links, hidden shared controls on the introduction,
and five-tab keyboard navigation. All five views passed document-overflow checks
at 320, 390, 768 and 1440 pixels; the 16 game puzzles, 112 numerical cases, brain,
training, comparison and social simulation checks remain green. Desktop course
framing and progression were inspected in the live preview.

## Clearer teaching, paired animation and themes (2026-09-19)

The machine introduction and query/training explanations now begin with ordinary
language: lists of numbers, comparisons, weights and mixtures. The complete
original game sequence and numerical inspector remain. The original model's
encoder–decoder structure and related technical detail remain in expandable
explanations. Human scenes now lead with getting ready, focusing, maintaining a
goal and checking a response; a separate source-detail disclosure preserves the
phasic/tonic, dorsal/ventral and two-control-network distinctions.

The human view adds three named system selectors (Alerting, Orienting, Executive
control), a matching banner on the brain, and an explicit numbered region list.
The cortex defaults to 50% opacity; a 10–100% slider changes the actual Three.js
surface material, leaving the region markers bright. Deep markers appear below
100%. Numbered labels have collision avoidance and leader lines. Rotation,
hemisphere selection, keyboard controls and the 40,960-triangle anatomy remain.
Playback controls now sit above the visualization.

A five-scene comparison player keeps human left and machine right, including on
small screens. Both sides use the same selected reading prefix. A second local
Three.js view changes human network emphasis while the machine side shows input
representations, query/key comparisons, weighted values, further layers and
next-token probabilities. It explicitly distinguishes shared questions from
matched biological/computational stages. Human systems overlap; the animation's
six-second scenes are teaching pacing. The original authored attention ratios
and vocabulary distributions remain separate illustrations, with their limits
stated in the interface. No model or neural measurements are introduced.
Play/pause, scene selection, previous/next, restart and shared opacity controls
work; navigation, hidden-document events and context changes stop playback.
Reduced motion removes pulses/flow while preserving static scenes and controls.

Light/dark controls propagate to both original iframes, including a lazily loaded
numerical inspector. Only the theme preference is added to persistent storage;
learner answers and simulation runs remain in memory. Heatmap legends, numerical
SVGs, selected controls and population-monitor signals have theme-aware contrast.
The anatomical instrument and operations room retain their dark instrument
surfaces in either theme, with readable light monitor/debrief panels.

The control room now leads the social tab and has a dedicated entry from the
introduction. Its purpose is stated before starting: a platform can optimize a
counted activity while missing readers' needs. The brief describes the goal,
eight rounds, intervention budget and end-of-run reveal. The initial action fits
the chosen contract; the global action selector remains selected so the current
plan is visible. Per-group controls are optional, action descriptions are open,
and first-round feedback suggests a next move. Small screens put the dispatch
controls ahead of the population display. Engine rules are unchanged.

Validation: the full browser suite passes (16 puzzles, 112 numerical cases,
three shared examples, both anatomical viewers, playback/navigation, opacity
synchronization, theme persistence and iframe propagation, eight-round simulation
win/check-in/replay, and widths 320/390/768/1440). A new contrast assertion guards
the population signals in both themes. No JavaScript errors, failed runtime
assets or external runtime requests. The deterministic simulation suite and
repository validation pass. Additional visual checks cover the human page,
comparison player, control-room instructions and both themes. All work remains
local; no commit, push or publication was requested.

## Continuous paired reading (2026-09-19)

The comparison now advances through every word of the selected prefix rather
than progressing through five explanatory slides. One transport controls both
columns: play/pause, previous/next word, finish, restart, word selection and
2/4/7-second pacing. Within a word, a three-part cycle changes the neurological
illustration and animates the computational signals. Sentence cursors stay
synchronized; the human storyboard can also return to an earlier word, including
“it” to “cat” or “glass”. Navigation and document hiding pause playback.

The anatomical renderer has an optional comparison-only activity mode: several
networks receive changing illustrative emphasis, with luminous packets moving
along schematic connections within the foreground network. The existing human
activity retains its original selected-network behavior. Neither the connections
nor the word-by-word activity are presented as measured firing, fiber tracts,
gaze, or neural timing. Numbered regions and A/O/E indicators remain explicit.

The right-hand animation now performs an actual two-dimensional attention
calculation for each growing prefix. `reading-mechanisms.mjs` supplies authored
embeddings, fixed Q/K/V matrices, sinusoidal positions, scaled dot products,
causal masking, softmax and weighted values. Edge thickness and moving packets
reflect the computed shares. All future weights are exactly zero. A disclosure
shows the current numbers and computation. This is a toy head, not a trained
language model or a complete translation decoder. The original next-token
probabilities remain at completion, clearly separate from the new attention
calculation. The complete games and numerical inspector are retained.

Validation: the new pure calculation test verifies normalization, future-token
independence, weighted values, fixed parameters and the authored return cues.
Browser checks traverse all word positions across three examples, verify both
cursors, masking, pause/navigation, completion and opacity. With reduced motion
disabled, tests verify both a changing machine-packet coordinate and changing
brain canvas pixels within the same word, then a stationary packet when paused.
The full suite passes: 16 original puzzles, 112 numerical cases, simulation run,
both themes and 320/390/768/1440 widths, with no JS errors or external requests.
Reduced motion suppresses traveling packets while retaining static word/network
updates. Desktop and mobile comparison renders were inspected. Repository
validation passes; changes remain local and unpublished.

## Brighter regions and visible human playback (2026-09-19)

Separated cortical anatomy from the region highlights. The opacity sliders now
change only the gray anatomical surface; an independent, unlit RGBA overlay
keeps the cortical patches bright. Larger white node cores and soft halos keep
buried regions visible at low opacity. Hemisphere selection and the opaque
surface's occlusion remain respected. Both human and comparison brains use this
renderer.

The human view now enables the schematic moving signals as well as expanding
rings around its highlighted regions. A transport beside the brain shows
Playing/Paused/Complete, a six-second progress bar, a countdown, the upcoming
moment, and Play/Pause/Resume/Replay. Pausing preserves the elapsed scene time;
leaving the tab or hiding the document pauses the sequence. Reduced motion
removes traveling signals and rings, retaining steady highlights and the
teaching clock. The on-screen legend explains the cues and distinguishes the
connections from anatomical pathways or measured neural signals.

Verification: a focused render check measured 89–94% retention of bright pixels
across all five scenes when opacity drops from 50% to 10%, while the surrounding
cortex fades. Human and comparison views were visually inspected, including a
390px mobile view. The complete browser suite now checks low-opacity brightness,
actual changing human canvas pixels within a scene, a moving progress bar,
stationary paused output, resume, static reduced-motion output, completion and
replay. All existing games, comparison reading, simulation, themes and responsive
checks pass, with no JavaScript errors, missing runtime assets or external
requests. Artifact indexing and repository validation pass. Work remains local.

## Restrained red accents (2026-09-19)

Added one shared accent stylesheet across the main lab, preserved machine game,
and numerical inspector. Deep red marks primary actions and selected words;
a softer red serves dark backgrounds. Selection rules, progress bars, current
query signals, and control-room click signals carry the accent. Typography,
reading panels, anatomical surface, and artwork retain their neutral foundation.
The console's legacy green/amber base colors were converted to equivalent gray
values before removing its blanket grayscale filter.

Brain region patches and moving dots remain bright white, while the surrounding
halos, expanding rings, region labels and playback indicator use warm red.
Opacity still controls only the anatomical surface. Labels, shapes, borders,
stripes and numbers remain available alongside color.

Verified the light human view at 10% opacity, dark comparison and original game
visually. The full browser regression suite passes, including both themes,
all 16 original puzzles, 112 numerical cases, low-opacity region brightness,
human playback/reduced motion, paired reading, the complete control-room run,
reader-signal contrast, and widths 320/390/768/1440. No JavaScript errors, missing
runtime assets or external requests. Artifact indexing and repository validation
pass. Changes remain local.


## Paired next-token prediction (2026-09-20)

Extended the synchronized reading player through three final steps: prepare
possible endings, evaluate them, and choose and append a word. The human column
keeps the 3D attention-network animation, recalls sentence clues, displays
illustrative candidate words, and explains the contributions of language,
memory and executive control. No human probabilities or measured neural
sequences are claimed. The learner's own response remains separate.

The machine column now computes the continuation from the preceding attention
mixture: a simplified residual sum, a fixed output projection into a six-word
vocabulary, vocabulary softmax, and greedy token selection. Its probabilities
are causally computed, with invented coefficients explicitly distinguished
from learned weights. The calculation inspector exposes the coefficients,
scores and probabilities. The original introduction's scripted distributions
and the complete machine games remain available.

Playback continues automatically from the final input token. Watch prediction
jumps directly to the new sequence; pause, forward/backward steps, restart and
sentence selection work throughout. Both columns append their chosen word in
red. Human-left/machine-right positioning is retained at mobile widths, and
prediction panels expand to avoid clipping their explanations.

Validation: pure calculation checks verify the residual, output projection,
vocabulary softmax, greedy choice and dependence on the attention mixture.
Browser checks cover all three endings, automatic reading-to-prediction playback,
stepping, pause/replay, context reset, appended words, and narrow-screen clipping.
The complete suite passes, including 16 retained puzzles, 112 numerical cases,
both themes, the eight-cycle simulation, bright low-opacity brain highlights,
reduced motion and 320/390/768/1440 widths. No JavaScript errors, missing runtime
assets or external requests occurred. Light/dark desktop and 320px prediction
renders were inspected. Artifact indexing and repository validation pass.
Changes remain local and unpublished.

## Short-term and working memory in reading (2026-09-20)

Added synchronized memory panels to both the human scenes and the paired
reading/prediction player. The human panel separates a retained task goal from
an illustrative recent sentence meaning, then shows holding, updating,
refreshing and using that meaning. In the comparison, meaning changes only
when its relevant words have been reached, remains available during prediction,
and resets with the selected sentence. The machine column separately shows
available/masked prefix positions and the current calculated value mixture.
The comparison table now explicitly contrasts biological working memory with
available machine representations and fixed inference weights.

Source boundary: checked Petersen & Posner's Executive Control discussion in
the local course PDF, manuscript pp. 6–8, especially the sustained task-control
signals and flexible adjustments described on p. 7, plus Figs. 2–3. The review
supports the control distinction, not a short-term storage model, word-capacity
limit or localized sentence store. The short-term/working-memory terminology
and changing sentence meanings are clearly marked as a reading application.
The existing brain highlights remain control networks, not purported memory
storage sites. The explainer also distinguishes recent meaning from language
knowledge acquired over longer-term learning.

Validation: pure checks cover future-clue exclusion, stable task goals,
context-specific meaning and continuity into prediction. Browser checks cover
human scene changes, sentence changes, prefix availability at every word,
meaning updates at the relevant clue and prediction continuity. The complete
suite passes (16 puzzles, 112 numerical cases, both themes, all four responsive
widths, brain playback, reduced motion and control-room run), with no script
errors or external runtime requests. Human desktop and comparative mobile
renders were inspected. Artifact indexing and repository validation pass.
Versioned the changed entry scripts after observing stale scripts in the
existing preview tab; reloading now displays the new panels. Work remains local.

## Platform / pedagogical hacker campaign (2026-09-20)

Made the social section's main control room a two-act game. In Act I, the
learner selects generated posts for 120 fictional readers and tries to earn
1,250 capture points over four rounds. Its explicit scoring rule rewards
noticing, opening and completing the platform task, and penalizes reconsidering
it. In Act II, the learner replays those exact posts against the same initial
population and keyed random draws, with six intervention points. The goal is
20 additional distinct readers making a deliberate choice compared with that
feed's baseline. Pauses, questions about the goal and shared annotation have
different costs and modeled effects; another warning alone is less effective.
Deliberate continuation is a possible reflective choice, as are changing the
question and discussing a reason. The debrief returns to who sets the goals
and values the activity. The original allocation/contract simulator remains
available in an expandable additional exercise, and all machine games remain.

The generation, ranking and reader-response mechanisms are kept distinct.
The generator is an actual locally trained, single-head causal attention
decoder with 24-dimensional representations, learned Q/K/V projections,
residual/tanh and a vocabulary output projection. Its 8,135 parameters were
trained on 36 authored sequences (119 vocabulary tokens) for 1,000 Adam steps.
Final training loss is 0.0006944333061485156 from 4.835700378934398; greedy
JavaScript inference reproduces all 36 sequences exactly. This establishes
fitting that tiny corpus, not generalization or effective real-world content.
The corpus, reproducible NumPy training script, saved model, corpus hash and
training history are retained locally. The token inspector shows learned
input attention separately from next-token probabilities. A separate fitted
regression estimates fictional historical capture scores; the human outcomes
are authored simulation rules, not learned neuroscience or observed behavior.
All model weights remain fixed during play.

Checked Petersen & Posner's Executive Control discussion in the local course
PDF, manuscript pp. 6–8, especially p. 7 and Figs. 2–3. The network distinction
is stable task maintenance (cingulo-opercular) versus flexible adjustments and
switching (frontoparietal). The game's application to maintaining a feed task
or reconsidering its goal is explicitly a teaching interpretation. These are
not obedience and resistance circuits: stable control can sustain self-chosen
inquiry, and flexible control can serve platform tasks. Alerting, orienting
and the two control lenses may overlap; the display does not claim a fixed
neural sequence. Its meters are fictional behavioral outcomes, not brain
measurements. Terranova frames the question of ownership, valuation and
collective inquiry; Cybersyn informs the room's visual design without a claim
that it historically monitored individual attention.

Validation: model/engine checks cover all 36 generated training sequences,
corpus provenance, normalized causal attention, frozen weights, identical
no-intervention replay, both acts' achievable goals across three topics,
atomic budget rejection and varied population seeds. The focused browser
suite completes both acts through the UI, verifies the exact archived posts,
120-reader display, token playback and stepping, intervention-budget controls,
selected-text contrast in both themes, and widths 320/390/768/1440. No script
errors or external runtime requests occurred. The complete existing browser
suite also passes, including 16 retained puzzles, 112 numerical cases,
low-opacity brain highlights, shared reading/prediction, memory, reduced motion
and the original simulator. Desktop and mobile campaign renders were inspected.
Artifact indexing and repository validation pass. Work remains local and
unpublished; versioned entry and dependency URLs refresh the existing preview.

## Live publication, online feedback and alignment choices (2026-09-20)

Replaced instant round completion with a 7.2-second broadcast. Readers produce
staggered notice/open/maintenance/adjustment/choice events; the four prominent
bars display current counts and percentages of the 120 fictional readers.
Events overlap rather than asserting a fixed neurological sequence. Pause,
resume, 1x/3x speed and a skip-to-outcome control are available. Leaving the
section or hiding the document pauses playback. A round commits once, after
playback, with publishing and learning controls locked in the meantime. The
same deterministic engine outcome is reached by normal playback and skip.

The game now follows choose / watch / learn, with prominent publication and
next-round buttons. Starting collapses the long briefing; it can be reopened.
The learning panel sits beside the broadcast on desktop and below it on mobile.
Mobile playback hides the inactive chooser so the four bars remain prominent.
Plate 02 appears in the game introduction and inside the live console, with
contrast-preserving overlays and its original source/credit retained. The
original image remains in the social discussion as well.

Added a real online selector in platform-feedback.mjs. Four keys are derived
from the pretrained decoder's final value mixtures and centered/normalized.
A 24-dimensional learned query, with the original fitted forecast as a prior,
produces normalized selection weights over the generation briefs. Feedback
applies a reward-advantage-weighted log-probability gradient to that query for
the published brief. Positive and negative advantages respectively reinforce
and reduce its recommendation. Because the player chooses actions, this is
an illustrative reward-weighted update, not a claim to an unbiased on-policy
reinforcement-learning experiment. It is separate from the fixed language
model; word probabilities, brief-selection weights and rewards stay distinct.
The interface shows before/after weights, query-change magnitude, actual
capture/adjustment outcomes, learning freeze and continued shifts that retain
the selector. New campaigns reset it. Improvement is not guaranteed. The
outcome journal includes frozen rounds and changes of objective.

The hacker act exposes four objectives: capture, reader feedback, a right to
pause, and shared reasons. Reader feedback values deliberate choice and
adjustment instead of automatic completion; the explicit pause principle
masks streak and curiosity-gap recommendations; the collective objective
adds reward for discussing a reason. These suggest interventions, which the
player can override. Each objective retains its own learned query. Archived
posts remain fixed for the controlled replay; updated weights are clearly
labeled recommendations for a future feed. Changing a reward alone does not
alter current reader behavior. Feedback is for the content/intervention pair,
not evidence identifying a causal effect of its content alone.

Primary references checked and linked in the source inspector: Ouyang et al.
(2022), https://arxiv.org/abs/2203.02155; Bai et al. (2022),
https://arxiv.org/abs/2212.08073; and Anthropic's Collective Constitutional AI
research report. The game explicitly presents simplified ideas, not full
RLHF, Constitutional AI, an actual public consultation or a biological claim.
Petersen & Posner's stable-versus-flexible control distinction and its limits
remain visible, including that self-chosen inquiry also needs maintenance.

Verification: pure checks verify event ordering and exact final counts,
positive/negative parameter updates, normalized policy weights, rule masks,
objective-specific rewards, immutable updates and unchanged decoder weights.
The focused browser suite completes both acts, tests partial live responses,
pause/resume, background pause, skip, frozen learning, carried-over learning,
archived-post identity, budget limits, all four alignment choices, Plate 02,
and responsive layouts at 320/390/768/1440. Charts retain frozen rounds and
mixed-objective history. Both themes and reduced-motion interaction pass.
Desktop and mobile live renders were inspected. The complete earlier lab
suite passes: 16 puzzles, 112 numerical cases, 3 shared examples, bright
low-opacity brain animation, memory and next-token comparison, and the original
allocation simulator. No browser errors or external runtime requests occurred.
Artifact indexing and repository validation pass. Changes remain local.

## The attention loop: one game, real training runs, a monetization score (2026-09-20)

The social tab's control room is now a single loop played in one cabinet, with
four stations that mirror the course's three readings and the economy that
joins them: **Train** (machine attention), **Generate** (four posts written
token by token), **Broadcast** (human attention: the 120-reader wall and the
A / O / E1 / E2 bars) and **Monetize** (the attention economy's ledger). The
ring shows where the player is; earlier stations of the same round can be
revisited; long explanations moved into ⓘ tips so the surface reads as a game.

**Generation is shown, not described.** When a campaign starts, and after every
training run, the writer drafts each of the four posts in front of the player:
prompt chips, the words so far, attention arcs from the query position back over
the prefix (thickness = softmax share), and the top next-token probabilities.
The trace can be paused, stepped, replayed or skipped.

**Feedback modifies generation.** `platform-trainer.mjs` ports the forward and
backward pass of `_training/train-platform.py` (one causal head, residual/tanh,
vocabulary projection, Adam with clipping) to the browser. Its loss on the base
corpus equals the recorded final training loss to ten decimals and its gradients
match finite differences (`_tests/platform-trainer.mjs`). Each round the player
commissions a run on a per-campaign copy of the model, restricted to the
campaign topic's pretraining examples plus one of three objectives:

- *Reinforce what monetized*: the best-earning published post's words are taught
  to the other three briefs (the feed drifts toward that style; more readers
  maintain the platform's task, E1). Compounded over rounds this homogenizes the
  feed and its repetition penalties bite.
- *Retain the pretraining mix*: examples only; the writer stays put.
- *Introduce reflective materials*: the base examples of the most capturing
  briefs are retired and those briefs are trained on three pause-and-decide
  texts authored from the writer's own vocabulary (more readers adjust the
  task, E2).

Intensity sets the optimizer steps (8 / 14 / 24 for reinforcement, 35 / 60 / 90
for materials). The station animates the real per-step loss and then shows,
for each brief, a drift meter (two-way probability share of the pretrained words
against what the writer now produces) and the new text. Calibration sweeps
established that a standard reinforcement run flips about one brief, an
intensive one two with collateral changes, and a standard materials run
retrains the targeted briefs while every post still terminates.

**The economy closes the loop.** Revenue = 1 credit per open (impression) +
4 per completion (engaged session). Reconsideration (E2) is not billable.
Completing task after task drains reader energy; low energy lowers noticing,
opening and completing, and below 42% a reader may leave the platform for good.
A pause, a reconsideration or a deliberate choice restores energy. The
recommender's reward in Act I is monetization (a new `revenue` objective in
`platform-feedback.mjs`). Five rounds, target 1,100 credits. With the fixed
seed, publishing the recommendation every round lands just under the target,
reinforcing what paid crashes the middle rounds (≈955), alternating styles
passes (≈1,125) and giving readers room early then monetizing scores highest
(≈1,175) on all three topics; a post's style is now read back from its words,
so a "guided" brief that has learned to write streak text is treated as one.

Act II (the pedagogical hacker) replays the same archived posts with the writer
frozen and reports revenue against the original feed as well as deliberate
choices. In the reference run the interventions cost nothing: pauses restored
energy and the platform billed slightly more, which is itself a discussion point.

**Lecture mode.** `_tools/build-lecture-slides.mjs` converts
`courses/479-fall-2026/lecture-4.md` into `attention-assets/lecture-4-slides.mjs`
(28 slides, lecturer notes, figures copied into `attention-assets/slides/`).
`lecture-deck.mjs` presents them as an overlay deck with keyboard navigation, a
progress strip marking simulation slides, lecturer notes, a contents view with
direct jumps to the six simulations, and a deep-dive button on 21 slides that
opens the matching lab activity and leaves a "back to slide N" chip. Entry points:
the masthead, the introduction, and `#slides` / `#slide-N` links.

Validation: `node artifacts/_tests/platform-game.mjs`, `platform-trainer.mjs`,
`platform-feedback.mjs` and `control-room.mjs` pass; the browser suite
`platform-game-browser.cjs` plays both acts through the UI (five rounds,
reinforce / materials / retain runs, writing trace, ledger, learning freeze,
alignment choices, loop ring, tips, both themes, 320–1440 px) and the deck
(contents, notes, deep dive and return); `attention-lab.cjs` still passes.
All rules, prices and reader responses remain authored simulation.

## A guided loop for beginners (2026-09-21)

**Request.** Assume the player has never heard of an attention mechanism. Keep the cabinet's atmosphere, but step them through each stage clearly, with less text and with the concepts and papers named where they apply.

**What changed.**

- **Guide strip** (`#pg-guide`, inside `.pg-console` under the loop ring). A `GUIDE` table in `platform-game.mjs` keyed by act, phase, round and training state (`train-first`, `train-plan`, `train-running`, `train-done`, `writing`, `choose`, `live`, `monetize`, `finished-platform`, `hack-choose`, `hack-live`, `hack-monetize`, `finished-hacker`) gives each state a step label, one sentence on what is on screen, one instruction naming the button to press, and a collapsed **Why?** that states the concept and links the paper (Vaswani et al. 2017 §3.2 for the writer's arcs and softmax; Petersen & Posner 2012 for alerting, orienting and the two sides of executive control; Terranova 2012 for the ledger; Ouyang et al. 2022 for the recommender's feedback). `renderGuide()` runs from `render()`, `setStation()`, `renderTrain()`, `runTraining()`, `finishTraining()` and `finish()`. When the player uses the loop ring to look back at an earlier station, the strip switches to a "looking back" note that names the station where the game is waiting. A **Hide guide** toggle persists in `localStorage`; the current key is exposed as `data-guide` on `#platform-game` for tests.
- **Glossary** (`#pg-glossary`, a `<details>` above the start button): token, attention with query/key/value in one sentence, softmax, training and loss, the three human attention systems, attention economy. Each entry links its paper.
- **Plainer copy.** The briefing now lists the four steps as a numbered list. Station heads, help lines, channel explanations (A/O/E1/E2), ledger labels, drift meters, recommender status and the training objectives (`OBJECTIVES` in `platform-trainer.mjs`) use everyday words: "brief" became "style", "pretrained" became "original" or "as delivered", "optimizer steps" became "steps", and each objective states its effect on readers and whether that effect is billable. Tooltips were rewritten to explain rather than to cite, with one paper reference each where it helps.
- **What did not change.** The engine, trainer, recommender, generator, tests' numerical expectations, element ids the lab and deck depend on, and the cabinet's visual language. The reduced motion, theme and responsive rules cover the new strip and glossary.

**Checks.** `_tests/platform-trainer.mjs`, `_tests/platform-feedback.mjs` and `_tests/platform-game.mjs` unchanged and passing. `_tests/platform-game-browser.cjs` now asserts the guide key and instruction at each stage of Act I and Act II, the "looking back" state when the ring revisits an earlier station, the hide/show toggle, the glossary and the four briefing steps. `_tests/attention-lab.cjs` passes unchanged. No page errors, no failed or external requests, no horizontal overflow at 320/390/768/1440.

**Phone-width fix found on the way.** At 390px and 320px the recommender panel and the revenue chart were clipped on the right in Act II: the chart's five nowrap captions gave the single-column learning grid a 456px minimum, and the panel stretched to match. `.pg-learning-grid>*{min-width:0}` removes the floor and captions wrap below 700px. Measured with a probe over every element in the monetize station after Act II: nothing extends past the cabinet at either width.

## Recomposed as ten guided chapters (2026-09-21)

**Request.** Everything was there but not intuitive. Take the application apart and recompose it so that it is easy to use, as an introduction to the Transformer paper and the first attention mechanism and so on, keeping the flair but never at the expense of intelligibility.

**Diagnosis.** Five tabs hid the order of ideas. The machine tab opened on the six puzzles, which assume the mechanism, with the explanation of queries, keys and values three sub-panels away. The introduction was an editorial essay (Kafka, Debord, the week thread) before any activity, with no instruction about where to begin. Each activity had its own copy but no consistent “what am I looking at, what do I do, what should I remember”.

**Composition.** One page, one path. A chapter rail (left column at 1200px and above; a sticky chapter bar with a contents panel below that) lists ten chapters in four parts, marks the current and visited ones, and keeps progress in `localStorage`. Every chapter has the same three-part shape: a **primer** card (`.primer`) that explains the idea in about a minute and names its paper and section; a **What to do** box (`.todo`) that names the buttons; the activity; an optional **Go deeper** (`details.deeper`); and a **Take away** sentence with generated Prev/Next buttons (`[data-nav]`, filled by `renderChapterNavs()`).

| # | Chapter (id) | Activity kept from the old page |
|---|---|---|
| 0 | Start here (`intro`) | Opening plate, four-part route map, week question, deck launch; frame and week thread fold into Go deeper |
| 1 | The paper and the idea (`paper`) | Vaswani et al. 2017 primer, equation 1 in four steps, the next-word animation from the embedded game in `?view=intro` |
| 2 | Query, key, value (`queries`) | Query-origin inspector, three jobs, where the matrices come from |
| 3 | Build it: six puzzles (`practice`) | The embedded game in `?view=levels` (levels 1–6 and free play) |
| 4 | Training and inference (`training`) | Training/inference switch and the one-weight gradient step |
| 5 | The numbers, under a microscope (`numbers`, optional) | Eight-head vector inspector, lazy-loaded |
| 6 | Three attention systems (`human`) | Petersen & Posner primer, cortical surface, five reading moments |
| 7 | Read and predict together (`compare`) | Paired player, own prediction; the two-column table folds into Go deeper |
| 8 | Run the feed, then break it (`social`) | The attention-loop cabinet, unchanged |
| 9 | More ways to score reading (`society`, optional) | Allocation room, three scoreboards, Terranova’s three questions |
| 10 | What has been understood? (`synthesis`) | Closing inquiry, week outcomes, the carried question |

**Mechanics.** `lab.js` replaces `setTab`/`selectMachine` with a `CHAPTERS` table, `go(id)`, `renderRail()`, roving-tabindex keyboard navigation on the rail, a `LEGACY` map for old hashes (`#machine` → `paper`, `#framing` → `intro`, `#query` → `queries`, `#vectors` → `numbers`) and `window.spotlightGo` for the deck. The embedded game reads `?view=intro|levels` and `?id=` (`spotlight-machine.html`): the intro view hides its level strip, header, welcome copy and footer and shows only the animation panel; the levels view hides the intro entry and starts on level 1; height messages carry the frame id. The lecture deck maps each slide’s tab/panel to a chapter and lists seven chapter entries in its contents. The chapter section for queries is `queries`, not `qkv`, because the Q/K/V diagram card already uses `id="qkv"` as its render target (an earlier draft wiped its own chapter through that collision).

**Copy.** New primers, what-to-do lists and take-aways for all ten chapters; the old section intros, sub-navigation, “next section” strips and the room invitation are gone. The Kafka/Debord frame, the week thread and the two-meanings table remain, one click away.

**Checks.** `_tests/attention-lab.cjs` now drives the chapters (rail clicks at 1440px, `window.spotlightGo` at phone widths where the rail is a panel), verifies the primer and what-to-do in chapter 1, the visited mark, the route map, legacy hashes, rail keyboard navigation with wrap-around, the mobile contents panel, both game frames (`#intro-frame` for the shared example, `#games-frame` for the seven level buttons) and every previous numerical and WebGL check. `_tests/platform-game-browser.cjs` checks the deck’s seven chapter entries and the dive into chapter 8. No overflow at 320/390/768/1440 in any chapter; the formula wraps and the chapter bar’s title truncates.

## Clarity pass for a non-technical audience (2026-09-21)

**Request.** Still not clear enough. Make every action button stand out (Play in the animation, and check throughout). The current word in the animation shows a percentage: it attends to itself, but nothing says why. Re-check everything for clarity and ease of use, and retire phrases like “Share out 100%. Softmax turns the scores into shares that add up to one” that assume a reader knows statistics.

**Buttons.** The animation’s Play button is now the filled primary style inside the embedded game (the only primary control in that panel; Step and Restart stay secondary). On the main page, the buttons that are the action of their card become primary: Reveal the example distribution (chapter 7) and Show what gets recorded (chapter 9). Button names inside every “What to do” list render as key caps (`.todo b`) so the instruction and the control look alike. Already-primary controls were kept as the single primary per view: Learn once, Play reading sequence, Read together, Keep my prediction, Start Act I, Publish, Feed it back, the chapter Next.

**Self-attention in the animation.** `demoArcs()` draws no arc for the current word but printed its share in the same label row the arcs start from, so the thick outgoing arc covered it. The current word’s share now appears as a badge under the word, “keeps 12%”, the arcs start and end above the label row (they are measured from the token box, not the word box) and are slightly thinner, and the caption says what happens and why: “‘on’ looks back at the words before it: sat 81% · cat 4% · The 4%. It keeps 12% for itself, so its own meaning stays in the blend.” The first word gets its own caption (nothing to look back at, keeps 100%). The other captions drop “decoder”, “vocabulary output layer”, “scripted teaching values” and “non-top sample” for plain sentences.

**Copy.** The four steps of the formula now read: every word gets three labels (a question, a name tag, the contents); ask around; turn the scores into percentages, like slices of one pie (the paper’s name for this step is softmax); blend. A one-line legend under the formula names Q, K, V, softmax and √d in the same words. Chapter 2 speaks of recipes rather than tables and projections, and its cards and reset button follow. Chapter 3 calls the sharpness level a dial and the matrix a grid of who looks at whom. Chapter 4 explains the loss as a score for how wrong the guess was and names backpropagation and the optimizer as the names of the two steps. Chapter 5 says long lists of numbers, “no peeking ahead”, and “the pie from Chapter 1”. Chapter 6 keeps the network names but introduces them as two teams. The loop game’s glossary and guide strip use the same vocabulary (name tag, percentages, slices, “how wrong”), the plan summary says step size instead of learning rate, and the run status reads “loss (how wrong)” and “numbers moved by”.

**Checks.** Both browser suites pass unchanged in their assertions; the animation’s shared-example text and prediction bars are still compared exactly against chapter 7. Screenshots in light and dark confirm the badge, the arcs clearing the labels, the primary Play and the key caps.

**Inside the six puzzles.** The level introductions, how-to lines, formula captions and “What just happened” notes in `spotlight-machine.html` now use the same words as the chapters: name tag for key, question for query, slices and percentages for shares, “placed side by side” for concatenated, “grid” for matrix, recipe for W<sub>Q</sub>/W<sub>K</sub>. Technical names stay in parentheses where a reader may meet them elsewhere (softmax, q · k, √dₖ, Winograd schema, residual stream). Hints, goals and scoring are unchanged.
