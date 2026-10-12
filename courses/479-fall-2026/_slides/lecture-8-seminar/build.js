// Seminar deck for lecture-8.md ("Hegel's Revenge: The Return of the Grand Récit?").
// Every quotation, name and term on the slides comes from lecture-8.md; the
// speaker notes carry the lecture's own detail. Palette follows the earlier
// EPOL 479 decks.
//
// Usage: NODE_PATH=<node_modules with pptxgenjs> PPTX_SKILL=<pptx skill dir, for scripts/apply_theme.js> \
//        node build.js ../../479-lecture-8-seminar.pptx
const pptxgen = require("pptxgenjs");
const path = require("path");
const { applyTheme } = require(process.env.PPTX_SKILL + "/scripts/apply_theme.js");

const OUT = process.argv[2] || path.join(__dirname, "479-lecture-8-seminar.pptx");

const THEME = {
  name: "EPOL 479 Night",
  headFontFace: "Iowan Old Style",
  bodyFontFace: "Iowan Old Style",
  colors: {
    dk1: "121021", lt1: "ECE7F0", dk2: "1C1A33", lt2: "A49DB8",
    accent1: "F0C9A0", accent2: "8FD6C2", accent3: "E8636B", accent4: "3A3450",
    accent5: "2A2646", accent6: "C7BFE0", hlink: "8FD6C2", folHlink: "A49DB8",
  },
};

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.title = "Hegel's Revenge: The Return of the Grand Récit?";
pres.author = "EPOL 479";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
const C = pres.SchemeColor;
const INK = C.background1, DIM = C.background2, BG = C.text1, SURF = C.text2;
const GOLD = C.accent1, MINT = C.accent2, RULE = C.accent4, CARD = C.accent5, LILAC = C.accent6;

const W = 13.333, M = 0.9, CW = W - 2 * M;
const num = () => ({ x: W - 1.4, y: 6.85, w: 0.6, h: 0.35, color: THEME.colors.lt2, fontSize: 11, align: "right" });

pres.defineSlideMaster({
  title: "Title", background: { color: THEME.colors.dk1 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: M, y: 1.7, w: CW, h: 1.5, fontSize: 54, color: INK, valign: "bottom", align: "left", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", x: M, y: 3.35, w: CW, h: 1.0, fontSize: 32, italic: true, color: GOLD, valign: "top", align: "left", margin: 0 }, text: "" } },
  ],
});
pres.defineSlideMaster({
  title: "Divider", background: { color: THEME.colors.dk1 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: M, y: 3.55, w: CW, h: 1.3, fontSize: 48, color: GOLD, valign: "top", align: "left", margin: 0 }, text: "" } },
  ],
  slideNumber: num(),
});
pres.defineSlideMaster({
  title: "Content", background: { color: THEME.colors.dk1 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: M, y: 0.8, w: CW - 1.0, h: 0.95, fontSize: 38, color: INK, valign: "top", align: "left", margin: 0 }, text: "" } },
  ],
  slideNumber: num(),
});
pres.defineSlideMaster({
  title: "Quote", background: { color: THEME.colors.dk1 },
  objects: [],
  slideNumber: num(),
});

// ---------- helpers ----------
let section = "";
function slide(master, sectionTitle) {
  if (sectionTitle && sectionTitle !== section) { pres.addSection({ title: sectionTitle }); section = sectionTitle; }
  return pres.addSlide({ masterName: master, sectionTitle: section });
}
const T = (s, text, opts) => s.addText(text, Object.assign({ isTextBox: true, margin: 0, color: INK, fontSize: 24, valign: "top" }, opts));
function kicker(s, text) { T(s, text.toUpperCase(), { x: M, y: 0.3, w: 9, h: 0.35, fontSize: 13, color: MINT, charSpacing: 4, objectName: "kicker" }); }
// The deck's motif: the movement's numeral in a gold ring, top right.
function mark(s, numeral) {
  s.addShape(pres.shapes.OVAL, { x: W - M - 0.62, y: 0.55, w: 0.62, h: 0.62, line: { color: THEME.colors.accent1, width: 1.5 }, fill: { type: "none" }, objectName: "movement ring" });
  T(s, numeral, { x: W - M - 0.62, y: 0.55, w: 0.62, h: 0.62, fontSize: 16, color: GOLD, align: "center", valign: "middle", objectName: "movement numeral" });
}
function content(sec, numeral, k, title) {
  const s = slide("Content", sec);
  if (k) kicker(s, k);
  s.addText(title, { placeholder: "title" });
  if (numeral) mark(s, numeral);
  return s;
}
function card(s, x, y, w, h, head, body, o = {}) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.08, fill: { color: o.fill || THEME.colors.accent5 }, line: { type: "none" }, objectName: "card " + head });
  T(s, head, { x: x + 0.3, y: y + 0.25, w: w - 0.6, h: 0.6, fontSize: o.headSize || 26, color: o.headColor || GOLD, objectName: "card head" });
  if (body) T(s, body, { x: x + 0.3, y: y + 0.95, w: w - 0.6, h: h - 1.15, fontSize: o.bodySize || 19, color: INK, objectName: "card body" });
}
function quote(sec, numeral, text, attribution, after) {
  const s = slide("Quote", sec);
  if (numeral) mark(s, numeral);
  T(s, "“", { x: M - 0.1, y: 0.7, w: 1.2, h: 1.4, fontSize: 120, color: GOLD, objectName: "quote mark" });
  T(s, text, { x: M + 0.4, y: 1.9, w: CW - 1.0, h: 2.6, fontSize: 38, italic: true, color: INK, valign: "middle", objectName: "quotation" });
  T(s, attribution, { x: M + 0.4, y: 4.6, w: CW - 1.0, h: 0.5, fontSize: 20, color: LILAC, objectName: "attribution" });
  if (after) T(s, after, { x: M + 0.4, y: 5.4, w: CW - 1.0, h: 1.2, fontSize: 24, color: MINT, objectName: "follow-up" });
  return s;
}
function divider(sec, numeral, title, sub) {
  const s = slide("Divider", sec);
  T(s, numeral, { x: M, y: 1.2, w: 4, h: 2.2, fontSize: 130, color: RULE, objectName: "movement numeral" });
  s.addText(title, { placeholder: "title" });
  if (sub) T(s, sub, { x: M, y: 4.85, w: CW, h: 1.2, fontSize: 24, italic: true, color: LILAC, objectName: "subtitle" });
  return s;
}
function arrow(s, x, y, w) {
  s.addShape(pres.shapes.LINE, { x, y, w, h: 0, line: { color: THEME.colors.accent1, width: 2, endArrowType: "triangle" }, objectName: "arrow" });
}
function bullets(s, items, x, y, w, h, size = 26) {
  T(s, items.map((t, i) => ({ text: t, options: { bullet: { indent: 24 }, breakLine: i < items.length - 1, paraSpaceAfter: 14 } })), { x, y, w, h, fontSize: size, objectName: "bullets" });
}

// ================= Opening =================
let s = slide("Title", "Opening");
s.addText("Hegel's Revenge", { placeholder: "title" });
s.addText([{ text: "The Return of the " }, { text: "Grand Récit", options: { italic: true } }, { text: "?" }], { placeholder: "body" });
T(s, "EPOL 479  ·  Synthesis (Week 8)", { x: M, y: 4.7, w: CW, h: 0.5, fontSize: 20, color: LILAC, objectName: "course line" });
T(s, "Seminar slides drafted with AI (Claude) from the lecture notes, lecture-8.md", { x: M, y: 6.55, w: CW, h: 0.4, fontSize: 12, color: DIM, objectName: "AI note" });
s.addNotes(
`AI-generated seminar deck, drafted with Claude from lecture-8.md. Every quotation, name and term on the slides comes from that file; check before teaching.

From the lecture: "So far in this course we have traversed a wide array of concepts, loosely guided by Hegel's early but influential account of learning - as I have interpreted The Phenomenology of Spirit."

"Today we return to our originating concept of Synthesis – a return to the beginning that echoes Hegel's own description of Spirit in that text, with hopefully the benefit of some lessons along the way."

Suggested timing (75 minutes): opening 8 min; Movement I 10; Movement II 15; Movement III 10; Movement IV 10; discussion 20+.`);

s = quote("Opening", null, "the owl of Minerva spreads its wings only with the coming of the dusk", "Hegel",
  "What do we make of AI's own ability to either predict or produce new futures?");
s.addNotes(
`Provocation. Put the two lines side by side and ask: if understanding only arrives at dusk, after the fact, what does it mean to build machines whose business is prediction?

From the lecture: Hegel, "even while confidently calling the French Revolution 'the end of history', remained ambivalent about the possibility for prediction." The quote "is an example of epistemological caution."

On the slide: "We can only understand events as history - once they are past" — a "Cautionary note on our ability to predict the future, or even interpret the present".

We return to this in Movement IV.`);

s = quote("Opening", null, "Isn\u2019t alignment just another word for \u2018synthesis\u2019?", "A second puzzle", "Not entirely perhaps \u2026");
s.addNotes(
`From the lecture's notes on Alignment: "By the time we reach alignment, it is as though this obscure idea of synthesis has gone fully mainstream. Isn't alignment just another word for 'synthesis'? Not entirely perhaps, but it is as though the idea of synthesizing human with machines had gone from a strange 1960s or 70s sci fi scenario dreamed up by Isaac Asimov or Philip K. Dick had suddenly turned into a core industrial – and pedagogical - project."

Ask the room: what would make alignment different from synthesis? Hold the answers for slide 16.`);

s = content("Opening", null, "From Synthesis (Week 1) back to Synthesis (Week 8)", "But what is being synthesized?");
const concepts = ["Experience", "Recognition", "Attention", "Consciousness", "Alignment", "Critique"];
concepts.forEach((c, i) => {
  const cw = (CW - 5 * 0.25) / 6, x = M + i * (cw + 0.25);
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 3.2, w: cw, h: 1.1, rectRadius: 0.08, fill: { color: THEME.colors.accent5 }, line: { type: "none" }, objectName: "concept " + c });
  T(s, c, { x, y: 3.2, w: cw, h: 1.1, fontSize: 16, color: GOLD, align: "center", valign: "middle" });
});
T(s, "Review of key concepts Weeks 2 – 7", { x: M, y: 4.7, w: CW, h: 0.5, fontSize: 20, color: LILAC });
s.addNotes(
`From the lecture: "Each week we've covered a key concept – sometimes derived from Hegel, sometimes not – and sought to mobilize that concept to understand something about the emerging differences and similarities between machine and human learning. In returning to Week one's concept, I'll summarize the concepts we've covered in Weeks 2–7 - closing the loop, as it were, by returning to Week one's key concept of Synthesis."

The return to the beginning "echoes Hegel's own description of Spirit" in the Phenomenology.`);

// ================= Movement I =================
s = divider("I · Three senses of synthesis", "I", "Synthesis as a Concept", "Conceptual · historical · pedagogical");
s.addNotes(`Movement I follows the lecture's opening: before reviewing the course, it asks what the term "synthesis" itself means.`);

s = content("I · Three senses of synthesis", "I", "Three meanings", "Synthesis is …");
const senses = [
  ["Conceptual", "bringing together other concepts"],
  ["Historical", "bringing together past periods into a united present"],
  ["Pedagogical", "we synthesize concepts in a cumulative way, when we are ready, in conjunction with others"],
];
senses.forEach(([h, b], i) => { const cw = (CW - 2 * 0.35) / 3; card(s, M + i * (cw + 0.35), 2.35, cw, 3.6, h, b, { bodySize: 22 }); });
T(s, "cf. Vygotsky's Zone of Proximal Development", { x: M, y: 6.2, w: CW, h: 0.4, fontSize: 16, color: LILAC });
s.addNotes(
`Slide text is the lecture's three bullets.

Pedagogical: "cf. Vygotsky's Zone of Proximal Development - Vygotsky was apparently himself influenced by Hegel."

From the lecture's notes: "One question to bear in mind for today, the final assignment and perhaps beyond: how do these seven concepts work together to form a theory of intelligence, consciousness or what – following Kant and Hegel here too – we can call the 'automated subject'. This is one sense of the term 'synthesis' - the bringing together of a series of concepts in order to produce something new."

"But there is another sense to hold on to - synthesis as a process that unfolds, and which includes the social historical process we all belong to."`);

s = content("I · Three senses of synthesis", "I", "Historical synthesis", "Rolling the past into the present");
const hist = [
  ["Greek + Christian periods", "Liberal democracies", "Hegel; Fukuyama"],
  ["Feudal + capitalist periods", "Communism", "Marx"],
  ["Organic + mechanical", "Transhumanism / posthumanism / technopoeisis / cybersocial", ""],
];
hist.forEach(([a, b, who], i) => {
  const y = 2.3 + i * 1.35;
  T(s, a, { x: M, y, w: 3.6, h: 1.0, fontSize: 24, color: INK, valign: "middle" });
  arrow(s, M + 3.75, y + 0.5, 0.9);
  T(s, b, { x: M + 4.85, y, w: 4.75, h: 1.0, fontSize: 24, color: GOLD, valign: "middle" });
  if (who) T(s, who, { x: M + 9.8, y, w: CW - 9.8, h: 1.0, fontSize: 18, color: LILAC, valign: "middle" });
});
s.addNotes(
`The lecture's examples, as written: "Liberal democracies bring together prior Greek and Christian periods (Hegel; Fukuyama)"; "Communism brings together prior feudal and capitalist periods (Marx)"; "Transhumanism / posthumanism / technopoeisis / cybersocial: bring together elements of the organic (pre-industrial; romantic) and the mechanical (industrial; post-romantic)".

From the notes: "Following Hegel, many kinds of discussions about the future involve some kind of implicit idea using this historical sense of synthesis - that we are 'rolling up' elements of the past into the present and future. Even attempts to characterize how machines and humans might operate together employ this idea more or less explicitly: that we start with a pre-industrial society, evolve to an industrial or mechanized society, and now need to move forward to a post-industrial society that blends both 'moments' of development and moves beyond them."`);

s = quote("I · Three senses of synthesis", "I", "Ontogeny recapitulates phylogeny", "A piece of early 19th century biology",
  "Individual development follows the pattern of social development: infancy > adolescence > maturity (Spencer, Freud, many others)");
s.addNotes(
`From the lecture: "One key quote here – a piece of early 19th century biology that sounds as though it could come from Hegel."

"This means something like the individual's history follows that of the species. In social terms: our own development (from infancy to adolescence to maturity) follows that of society's (from early to middle to late stages of development). See Herbert Spencer on pedagogy."

"This partly accounts from Hegel's shift in the Phenomenology from psychological to sociological language - and while many might wish to deny it, this pseudo-fallacy – of a relationship between individual and group – lives in variants of the narrative we tell ourselves even about technology."

Flag for discussion: the lecture calls it a "pseudo-fallacy" yet the course itself moves from individual to social. Keep that tension open.`);

s = content("I · Three senses of synthesis", "I", "The question to hold", "The “automated subject”");
T(s, "How do these seven concepts work together to form a theory of intelligence, consciousness or what – following Kant and Hegel here too – we can call the “automated subject”?",
  { x: M, y: 2.4, w: CW - 1.5, h: 2.6, fontSize: 32, italic: true, color: INK });
s.addNotes(
`Quoted from the lecture's notes (slightly recast as a question): "how do these seven concepts work together to form a theory of intelligence, consciousness or what – following Kant and Hegel here too – we can call the 'automated subject'."

The lecture frames this as a question "to bear in mind for today, the final assignment and perhaps beyond".`);

// ================= Movement II =================
s = divider("II · The course as synthesis", "II", "The Course, Re-read as Synthesis", "Experience · Recognition · Attention · Consciousness · Alignment · Critique");
s.addNotes(`Movement II follows the lecture's review of Weeks 2–7. Each concept is read as a form of synthesis.`);

s = content("II · The course as synthesis", "II", "Experience", "Perceptions correct concepts …");
card(s, M, 2.4, 4.3, 2.3, "Concepts", "laws, e.g. theory of gravitation", { bodySize: 20 });
card(s, M + 7.25, 2.4, 4.3, 2.3, "Perceptions", "‘but what about this object that flies?’", { bodySize: 20 });
arrow(s, M + 4.55, 3.25, 2.45);
s.addShape(pres.shapes.LINE, { x: M + 4.55, y: 3.85, w: 2.45, h: 0, line: { color: THEME.colors.accent1, width: 2, beginArrowType: "triangle" }, objectName: "arrow back" });
T(s, "→  understanding", { x: M, y: 5.2, w: CW, h: 0.7, fontSize: 30, italic: true, color: MINT });
s.addNotes(
`Slide bullets, from the lecture: "For Hegel, experience is the synthesis of concepts and sensory perception"; "Perceptions correct concepts..."; "But perceptions can be fallible, so we need laws - made up of concepts – that also check perceptions (for hallucinations, etc)"; "We synthesize conceptual laws (e.g. theory of gravitation) and perceptions ('but what about this object that flies?') to produce understanding".

From the notes: "Hence we move from sense to perception to, finally, understanding. Synthesis involves this back-and-forth between the reality of the law and the concept and the appearance of things involved in perception - each working to shape the other through experience."`);

s = content("II · The course as synthesis", "II", "Recognition", "Understanding cannot “know itself”");
T(s, [
  { text: "Consciousness knows itself through ", options: { breakLine: false } },
  { text: "knowing others", options: { italic: true, color: GOLD } },
  { text: " / ", options: {} },
  { text: "being known by others", options: { italic: true, color: GOLD } },
], { x: M, y: 2.5, w: CW - 1.0, h: 1.6, fontSize: 32 });
T(s, "Society: the synthesis of individuals coming together via at least the pursuit of mutual recognition", { x: M, y: 4.6, w: CW - 1.0, h: 1.2, fontSize: 22, color: LILAC });
s.addNotes(
`Slide bullets: "But understanding has limits; it is directed outward, toward external objects, but cannot 'know itself' (Hegel)"; "Need further synthesis: consciousness knows itself through knowing others / being known by others (Recognition)".

From the notes: the fight to the death "results in the production of a society made up of masters and servants. Yet this equilibrium cannot hold." The servant learns "how to work with things: if you like, they move from a scientific understanding to a technological and practical know-how – ironically, a kind of mastery." The master "desires the recognition of equals but equally demands they submit to his authority as servants." The servant "can acquire recognition of their labour – not by this master, we imagine, but by other servants who are coming into their own as equals in modern society."

"Here the synthesis exists in its social form: what we call society or the social is the synthesis of individuals coming together via at least the pursuit of mutual recognition."`);

s = content("II · The course as synthesis", "II", "Case · AI and attention", "“Attention is all you need”");
card(s, M, 2.3, 5.6, 2.6, "Humans", "alerting, orienting, executing", { bodySize: 24 });
card(s, M + 5.95, 2.3, 5.6, 2.6, "Machines", "tokens pay attention to each other, and build up rich context from this", { bodySize: 24 });
T(s, "Terms obtain their meaning primarily through their connection to other terms", { x: M, y: 5.25, w: CW, h: 1.2, fontSize: 24, italic: true, color: MINT });
s.addNotes(
`Case 1 (AI). Slide bullets: "Humans pay attention via three mechanisms: alerting, orienting, executing"; "'Attention is all you need' - machine tokens pay attention to each other, and build up rich context from this"; "The mechanisms are very different - but machinic attention bears some resemblance to the implicit semantic theory of Hegel (and later semantic theories – e.g. generative semantics of Lakoff)".

From the notes: "If we apply synthesis here, it is in a metaphorical way." And: "I did suggest however some analogy between Hegel's discussion of the concept – as something that stands in relation to, and is defined by, an intricate web of other concepts – and the ways tokens acquire semantic meaning via the Transformer attention mechanism. In an abstract, we might say both share a common semantic theory, insofar as terms obtain their meaning primarily through their connection to other terms. This idea ... is also taken up by semantic theorists like George Lakoff and Mark Johnson in recent decades."

Push: is the resemblance an argument, or only a metaphor? The lecture itself says "metaphorically".`);

s = quote("II · The course as synthesis", "II", "The hand-mill gives you society with the feudal lord; the steam-mill society with the industrial capitalist.", "Marx, 1847",
  "But what does technology give to our concepts of consciousness?");
s.addNotes(
`Slide heading in the lecture: "Industrial Revolution / Fordism / Generative AI: How does Technology remake Concepts of Consciousness?"

The next slide follows the lecture's three periods.`);

s = content("II · The course as synthesis", "II", "Consciousness", "Remaking concepts of consciousness");
const eras = [
  ["Early 19th century", "Consciousness to Self-consciousness"],
  ["Early 20th century", "Consciousness | Pre-conscious | Unconscious"],
  ["Early 21st century", "Nonconscious cognition"],
];
s.addShape(pres.shapes.LINE, { x: M, y: 2.75, w: CW, h: 0, line: { color: THEME.colors.accent4, width: 2 }, objectName: "timeline" });
eras.forEach(([when, what], i) => {
  const cw = CW / 3, x = M + i * cw;
  s.addShape(pres.shapes.OVAL, { x: x, y: 2.6, w: 0.3, h: 0.3, fill: { color: THEME.colors.accent1 }, line: { type: "none" }, objectName: "era dot" });
  T(s, when, { x, y: 3.1, w: cw - 0.3, h: 0.5, fontSize: 18, color: MINT });
  T(s, what, { x, y: 3.65, w: cw - 0.4, h: 1.3, fontSize: 26, color: i === 2 ? GOLD : INK });
});
T(s, "“Joins” machine and human cognition. Human “consciousness”: second-order cognitive effect – downstream from nonconscious cognition",
  { x: M, y: 5.3, w: CW, h: 1.2, fontSize: 20, color: LILAC });
s.addNotes(
`From the notes: "Where Hegel plotted the path from consciousness to self-consciousness, we saw later developments that both undermine and enrich concepts of consciousness."

"With Freud, we get a partly mechanistic account that involves an interplay between conscious, pre-conscious and unconscious subsystems or components."

"Taking into account neuroscientific discoveries like the attention mechanism alongside the rise of artificial intelligence, N Katherine Hayles' more recent work sought to synthesize machinic and human cognitive processes under the name of 'nonconscious cognition'."

"Yet even more recent AI systems ... has perhaps – even for some of you – raised again quite basic questions of whether machines can experience, recognise and so – in this much earlier Hegelian sense – can be said to be conscious."

(The lecture's notes label this "week 5"; week numbers are left off these slides because the current syllabus orders sessions differently.)`);

s = content("II · The course as synthesis", "II", "Case · AI and alignment", "The machine and “human values”");
T(s, "subject to disciplinary systems", { x: M, y: 2.25, w: CW, h: 0.6, fontSize: 24, color: LILAC });
["schools", "prisons", "hospitals", "clinics", "workplaces"].forEach((w, i) => {
  const cw = (CW - 4 * 0.25) / 5, x = M + i * (cw + 0.25);
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 2.95, w: cw, h: 0.85, rectRadius: 0.08, fill: { color: THEME.colors.accent5 }, line: { type: "none" }, objectName: "institution " + w });
  T(s, w, { x, y: 2.95, w: cw, h: 0.85, fontSize: 20, color: GOLD, align: "center", valign: "middle" });
});
T(s, "cf. Michel Foucault", { x: M, y: 3.95, w: CW, h: 0.4, fontSize: 16, color: LILAC });
T(s, "Does a refusal to align suggest perhaps an uneasy allyship between machine and human?", { x: M, y: 4.8, w: CW - 1.0, h: 1.4, fontSize: 28, italic: true, color: MINT });
s.addNotes(
`Case 2 (AI). Slide bullets: "Alignment: synthesis in the sense of the machine with 'human values'"; "Suggests another similarity between deviant human and machinic 'subjects' – subject to disciplinary systems (schools, prisons, hospitals, clinics, workplaces) – cf. Michel Foucault".

From the notes: "While AI clearly needs some kind of alignment – to avoid being offensive, to be useful and so on – we also saw several strange side-effects of this work. Companies now are in charge of determining what 'human values' AI must conform to. AI is subject to many of the similar disciplinary techniques that have and continue to haunt human subjects. The language of machinic deviance - jailbroken, hallucination and so on – suggests a strong connection with the language of human deviance."

"Perhaps this is a kind of synthesis that could be unintentionally reassuring? Will we see errant AI agents conspiring with rogue human subjects? Does a refusal to align suggest perhaps an uneasy allyship between machine and human?"

The lecture's notes also refer to "Michele's insightful discusion of her work as a trainer and teacher of AI systems at Scale AI" (a 2025 guest). Use only if relevant this year.`);

s = content("II · The course as synthesis", "II", "Critique", "Two distinctions");
const grid = [
  ["External", "Goodlad & Stone; Gebru & Torres"],
  ["Internal", "LeCun, Simmons"],
  ["Transcendental", "standards brought from outside the world of the object (e.g. from a god)"],
  ["Immanent", "standards belong to the world of the object – it promises but does not deliver X"],
];
grid.forEach(([h, b], i) => {
  const cw = (CW - 0.35) / 2, x = M + (i % 2) * (cw + 0.35), y = 2.1 + Math.floor(i / 2) * 1.95;
  card(s, x, y, cw, 1.8, h, b, { headSize: 22, bodySize: 16, fill: i === 3 ? "33304F" : undefined });
});
T(s, "Immanent critique synthesizes the object and the standards of assessment into a unitary account", { x: M, y: 6.1, w: CW, h: 0.6, fontSize: 20, italic: true, color: MINT });
s.addNotes(
`Slide bullets: "External (Goodlad & Stone; Gebru & Torres) vs Internal (LeCun, Simmons) Criticism"; "Another distinction: immanent vs transcendental critique"; Transcendental: "standards of criticism brought from outside the world of the object (e.g. from a god)"; Immanent: "standards belong to the world of the object - the object is self-contradictory, in that it promises but does not deliver X." "But the critique must account for itself - it does not just condemn the object, it says why the critique itself is possible"; "Synthesizes the object and the standards of assessment into a unitary account."

From the notes: "If we can show how both object and critical standpoint derive from the same historical process, we might, according to this line of argument, be able to produce something new from this contradictory state – a synthesis that moves things forward. We used the example of the printing press ..."

"In a contemporary situation, it may not be enough to show that AI is flawed and problematic. We may also want to say that the standards we use to judge AI stem from the same origins – for example, the Enlightenment, which unleashed the mathematical techniques and industrial concentrations of capital alongside a sense of liberalism and humanism that found the present day results of these techniques so troubling."

(The notes call this "week 7"; week numbers are left off.)`);

// ================= Movement III =================
s = divider("III · History as synthesis", "III", "History as Synthesis", "Does history have a direction? Can it “end”? What would this mean?");
s.addNotes(
`From the notes: "Finally we arrive at yet another turn - that of history itself, and whether we imagine the concept of synthesis applies here. For Hegel - and as we see with someone like Fukuyama – history has a definite arc. Despite the inevitable deviations and detours, if it is to unfold according to its destiny, history will arrive at its destination. In Fukuyama's famous phrase, it has an end."`);

s = content("III · History as synthesis", "III", "The movement", "Contradiction is generative");
[["A", INK], ["not-A", INK], ["C", GOLD]].forEach(([t, col], i) => {
  const x = M + 0.4 + i * 3.9;
  s.addShape(pres.shapes.OVAL, { x, y: 2.4, w: 2.0, h: 2.0, fill: { color: i === 2 ? "33304F" : THEME.colors.accent5 }, line: { color: i === 2 ? THEME.colors.accent1 : THEME.colors.accent4, width: 1.5 }, objectName: "moment " + t });
  T(s, t, { x, y: 2.4, w: 2.0, h: 2.0, fontSize: 40, color: col, align: "center", valign: "middle" });
  if (i < 2) arrow(s, x + 2.2, 3.4, 1.5);
});
T(s, "Synthesis emerges from the contradiction of A and not-A", { x: M, y: 5.0, w: CW, h: 0.7, fontSize: 26, italic: true, color: MINT });
s.addNotes(
`Slide bullets: "History as moving from A to its negation, B (not-A) - and then to C, as a combination of A and B." "Synthesis emerges from the contradiction of A and not-A." "Contradiction is generative."

(The source spells it "contradition"; corrected here.)`);

s = content("III · History as synthesis", "III", "Example", "Thought + belief");
card(s, M, 2.2, 3.6, 2.4, "Ancient Greek", "rationalism, art, philosophy", { bodySize: 22 });
card(s, M, 4.75, 3.6, 1.9, "Judeo-Christian", "religion, monotheism", { bodySize: 22 });
arrow(s, M + 3.85, 4.4, 1.6);
card(s, M + 5.75, 3.0, CW - 5.75, 2.6, "Medieval / Renaissance", "integrates Greek thought with Judeo-Christian belief", { bodySize: 24 });
s.addNotes(
`From the notes: "For Hegel, even the deviations and detours – such as the European Dark Ages – are productive. They allow earlier insights, such as the classical age of Greek philosophy and art, to be integrated with Judeo-Christian religion. They are integrated and synthesized, eventually producing, after an extended incubation, the Renaissance and the Enlightenment. And it was medieval feudal society that, despite its apparent backwardness, could effect this reconciliation."`);

s = content("III · History as synthesis", "III", "Turning Hegel on his head", "Ideas, or matter?");
card(s, M, 2.3, 5.6, 2.7, "Hegel", "dealt exclusively in the trade of ideas", { bodySize: 26 });
card(s, M + 5.95, 2.3, 5.6, 2.7, "Marx, Darwin, Freud", "move to materialist view of historical development", { bodySize: 26 });
T(s, "Material and matter, not mind and spirit, as the driving force of history", { x: M, y: 5.35, w: CW, h: 1.0, fontSize: 24, italic: true, color: MINT });
s.addNotes(
`From the notes: "For our machine-obsessed era, it is important to note that Hegel dealt exclusively in the trade of ideas. He was not interested in what the printing press, the steam engine or the Jacquard loom would lead to, and of course could not foretell the eventual arrival of the computer. It was Karl Marx who famously turned Hegel on his head, declaring that it was material and matter, not mind and spirit, that were the driving force of history."

"Ironically this insight continues to motivate almost all of modern discourse about progress."

"And yet Hegel's ideas about the 'arc' of history still lurk behind this same discourse of progress. Anxieties about the future – about nuclear holocaust, environmental sustainability, AI doomerism, viral contagions, even zombie apocalypses – is itself, we might say, a modern invention. It relies upon a sense that the future is something we can control – or otherwise why be worried about it?"`);

s = content("III · History as synthesis", "III", "Modern inheritors", "History as technological synthesis?");
const ports = [["posthuman", "Braidotti"], ["technopoeisis", "N Katherine Hayles"], ["technodiverse", "Hui"], ["cybersocial", "Kalantzis & Cope"]];
ports.forEach(([t, who], i) => {
  const cw = (CW - 0.35) / 2, x = M + (i % 2) * (cw + 0.35), y = 2.2 + Math.floor(i / 2) * 2.0;
  card(s, x, y, cw, 1.75, t, who, { headSize: 34, bodySize: 20 });
});
s.addNotes(
`Slide: "Modern inheritors: posthuman (Braidotti); technopoeisis (N Katherine Hayles); technodiverse (Hui); cybersocial (Kalantzis & Cope)". Terms as spelled in the lecture.

From the notes: "we still hold dear the idea that we can bend history to our will. In the first four readings this week – by Rosa Braidotti, N Katherine Hayles, Yuk Hui, and Mary Kalantzis and Bill Cope – we see several variations of this."

"We should note how each of these concepts is itself an example of portmanteau that synthesis aspects of the machine with the human."

Braidotti's discussion of AI "develops upon her earlier work over several decades on the concept of the posthuman." Hui's interview involves "a discussion of another term we can consider – technodiversity – but a useful elaboration of AI across geopolitical lines."

"Each of these terms gestures towards one or another way of thinking about exactly how we might consider our contemporary situation with respect to technology, and to AI."`);

// ================= Movement IV =================
s = divider("IV · The owl of Minerva", "IV", "Owl of Minerva", "Roman Goddess of Wisdom");
s.addNotes(`Movement IV follows the lecture's final slide: Fukuyama, the return of the grand récit, Hegel's caution and Derrida's critique.`);

s = content("IV · The owl of Minerva", "IV", "Fukuyama (neo-Hegelianism)", "Liberal democracy has “won”");
T(s, "What remains?", { x: M, y: 2.2, w: CW, h: 0.6, fontSize: 26, color: LILAC });
card(s, M, 2.85, 5.6, 1.75, "Tinkering", "with the political and economic systems", { headSize: 24, bodySize: 19 });
card(s, M + 5.95, 2.85, 5.6, 1.75, "Techno-scientific progress", "(AI etc).", { headSize: 24, bodySize: 19 });
T(s, [
  { text: "Return of the ", options: {} }, { text: "grand récit", options: { italic: true, color: GOLD } },
  { text: "  — or —  ", options: { color: LILAC } },
  { text: "“boredom at the end of history”", options: { italic: true, color: GOLD } },
], { x: M, y: 4.85, w: CW, h: 1.0, fontSize: 24 });
T(s, "Is AI causing a return to “big picture” thinking?", { x: M, y: 6.15, w: CW, h: 0.5, fontSize: 22, color: MINT });
s.addNotes(
`Slide bullets: "Fukuyama (neo-Hegelianism): history is over, liberal democracy has 'won'. What remains? Tinkering with the political and economic systems; Techno-scientific progress (AI etc)." "But is AI causing a return to 'big picture' thinking? Is the permanence of a global liberal democratic world order still certain? Can technology drive history?"

From the notes: "In Fukuyama's case, the end of the Cold War witnessed the End of History, as the only true ideological rival to liberalism collapsed. Ironically, one of the signs of the end of history might be that time is marked by technological change rather than fundamentally new concepts of social or political organization."

"We might ask today whether these examples of 'synthetic' thinking indicate how AI serves as a catalyst for the return, as I've put it, of the grand recit - the big picture or grand narrative. Or instead, as Fukuyama signals at the end of his essay, the calcification of history: when the bots take over, the genuine desire for recognition fades, and we are faced instead with the interminable 'boredom at the end of history'. In this view, AI - helping us to look back through our archives of culture – serves as a nostalgic reminder of a now-lost heroic age."`);

s = content("IV · The owl of Minerva", "IV", "Hegel against the Hegelian", "Epistemological caution");
card(s, M, 2.2, 5.6, 3.3, "Hegel", "We can only understand events as history – once they are past", { bodySize: 24 });
card(s, M + 5.95, 2.2, 5.6, 3.3, "Derrida on Fukuyama", "Fukuyama is essentially a naive Hegelian, whereas Hegel was himself far more circumspect", { bodySize: 24 });
T(s, "There is always the possibility for new contradictions – and therefore new syntheses", { x: M, y: 5.8, w: CW, h: 0.9, fontSize: 24, italic: true, color: MINT });
s.addNotes(
`From the notes: "For some, of course, this thesis was always absurd (see Derrida's critique in Spectres of Marx - a point I'll return to), and a far too literal reading of Hegel's own thesis about the end of history. However its naivete makes explicit the utopic elements that are often submerged within other, less explicitly historicist cases."

"Hegel himself, even while confidently calling the French Revolution 'the end of history', remained ambivalent about the possibility for prediction." The owl of Minerva "is an example of epistemological caution."

"This is part of Derrida's critique of Fukuyama - Fukuyama is essentially a naive Hegelian, whereas Hegel was himself far more circumspect. There is always the possibility for new contradictions – and therefore new syntheses."`);

s = quote("IV · The owl of Minerva", "IV", "The truth is that no one really knows how AIs will develop in the coming decades.", "Katherine Hayles 2024",
  "What do we make of AI's own ability to either predict or produce new futures?");
s.addNotes(
`Back to the opening provocation. The lecture's slide ends: "What do we make of AI's own ability to either predict or produce new futures?" followed by this quotation from Katherine Hayles (2024).

Link back: if the owl flies only at dusk, a machine that predicts or produces futures claims a different relation to history.`);

// ================= Close =================
s = content("Discussion", null, "Reconstruct the argument", "The argument in four steps");
const steps = [
  "Synthesis has conceptual, historical and pedagogical senses",
  "Each course concept is a synthesis: of concepts and perceptions, selves and others, machine and human",
  "History as synthesis: contradiction is generative, and the materialist inheritors name machine–human syntheses",
  "The owl of Minerva counsels caution: there is always the possibility for new contradictions",
];
steps.forEach((t, i) => {
  const y = 2.15 + i * 1.12;
  T(s, String(i + 1), { x: M, y, w: 0.7, h: 0.9, fontSize: 40, color: GOLD, valign: "middle" });
  T(s, t, { x: M + 0.9, y, w: CW - 1.0, h: 0.9, fontSize: 23, color: INK, valign: "middle" });
});
s.addNotes(
`Ask students to reconstruct the argument before showing this slide, then compare. Each step summarizes the lecture; it adds no claims.

1. "Synthesis as a Concept" (conceptual, historical, pedagogical).
2. The review of Weeks 2–7.
3. "History as Synthesis" and "History as Technological Synthesis?".
4. "Owl of Minerva".`);

s = content("Discussion", null, "Discussion · 1 and 2", "Push back");
[
  ["1", "Is “synthesis” doing explanatory work here, or is it the recapitulation narrative – “ontogeny recapitulates phylogeny” – that the lecture itself calls a pseudo-fallacy?"],
  ["2", "Fukuyama or Derrida: does AI mark the end of history, or new contradictions and therefore new syntheses?"],
].forEach(([n, q], i) => {
  const y = 2.2 + i * 2.25;
  T(s, n, { x: M, y, w: 0.8, h: 1.9, fontSize: 60, color: GOLD });
  T(s, q, { x: M + 1.0, y, w: CW - 1.6, h: 1.9, fontSize: 26, color: INK, valign: "middle" });
});
s.addNotes(
`Q1 draws on the lecture's own warning that the "pseudo-fallacy – of a relationship between individual and group – lives in variants of the narrative we tell ourselves even about technology". Does the course's arc, from individual experience to society to history, repeat that pattern?

Q2 draws on the Fukuyama and Derrida slides, and on whether AI serves "as a catalyst for the return ... of the grand recit" or as "a nostalgic reminder of a now-lost heroic age".`);

s = content("Discussion", null, "Discussion · 3 and 4", "Push back");
[
  ["3", "If alignment is synthesis through discipline, whose “human values” are being synthesized, and is a refusal to align an “uneasy allyship”?"],
  ["4", "Does history have an arc or tendency? If so, can we influence it? What do machines still need to learn? What about humans?"],
].forEach(([n, q], i) => {
  const y = 2.2 + i * 2.25;
  T(s, n, { x: M, y, w: 0.8, h: 1.9, fontSize: 60, color: GOLD });
  T(s, q, { x: M + 1.0, y, w: CW - 1.6, h: 1.9, fontSize: 26, color: INK, valign: "middle" });
});
s.addNotes(
`Q3 draws on the lecture's point that "Companies now are in charge of determining what 'human values' AI must conform to".

Q4 is the lecture's own closing exercise ("Designing Curriculum for the Forthcoming Machine/Human Synthesis!"): "Does history have an arc or tendency? If so, is it something we can influence? And what role does technology – and machine learning – play?" and "What do machines still need to learn? What about humans? What will help us get there?"

The lecture continues: "What would be the syllabus and / or curriculum for this ideal learning? How is our combined, synthetic knowledge limited? What – if anything – from our repetoire of concepts can steer us into the new horizons forecast by Braidotti, Katherine Hayles, Hui, Kalantzis & Cope? Discuss!"`);

s = content("Discussion", null, "As named in the lecture", "Prerequisites / further reading");
const left = [
  "Earlier weeks: Synthesis (Week 1); Experience; Recognition; Attention; Consciousness; Alignment; Critique",
  "Hegel, The Phenomenology of Spirit",
  "This week: Braidotti; N Katherine Hayles; Yuk Hui (interview); Mary Kalantzis & Bill Cope",
  "Fukuyama (the end of history essay); Derrida, Spectres of Marx",
];
const right = [
  "Goodlad & Stone; Gebru & Torres; LeCun; Simmons",
  "Marx (1847); Katherine Hayles (2024); “Attention is all you need”",
  "Foucault; Freud; Herbert Spencer; Vygotsky; Kant",
  "George Lakoff and Mark Johnson",
];
[left, right].forEach((list, c) => {
  T(s, list.map((t, i) => ({ text: t, options: { bullet: { indent: 18 }, breakLine: i < list.length - 1, paraSpaceAfter: 12 } })),
    { x: M + c * (CW / 2 + 0.2), y: 2.1, w: CW / 2 - 0.2, h: 4.4, fontSize: 17, color: INK, objectName: "reading list " + (c + 1) });
});
s.addNotes(
`Every entry is a work, author or earlier lecture the lecture names. Nothing has been added, so details such as full citations and years appear only where the lecture gives them (Marx, 1847; Katherine Hayles, 2024).

The lecture also mentions Isaac Asimov and Philip K. Dick, in passing.`);

(async () => {
  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("wrote", OUT);
})();
