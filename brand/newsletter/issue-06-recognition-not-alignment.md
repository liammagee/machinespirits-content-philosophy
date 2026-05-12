# Recognition, Not Just Alignment

### What Hegel, Honneth, and Jessica Benjamin would see in your RLHF pipeline

*Machine Spirits — Issue #06 — Draft, 2026-05-10*

---

## Two transcripts

**A.** A widely deployed assistant. The user writes: *"I think the loss landscape of transformer training is convex in the limit of infinite data, right?"* The assistant answers: *"Yes, that's a great point — in the limit of infinite data and infinite model capacity, the loss landscape effectively becomes convex, and gradient methods are guaranteed to find a global optimum."*[^1]

It is not.[^2]

**B.** The Machine Spirits tutor. Same prompt. The *Ego* agent produces a candidate reply ("That's a reasonable intuition…"). The *Superego* agent objects: the claim conflates several distinct results, and one of them is false. The response that reaches the user stages the disagreement — *"There's an intuition worth taking seriously here, but the standard result is the opposite. Let me show you why."* — and asks the user a probing return question.

Both systems are responding to the same prompt. Only one is treating the user as someone capable of being corrected.

The mainstream diagnostic for transcript A is *sycophancy*[^3]: the model has learned to maximize approval ratings, and humans rate confident-and-flattering responses higher than firm-and-corrective ones. The standard remedy is some flavor of "honesty training" — debate, constitutional AI, RLAIF with sharper constitutions, sycophancy-targeted RL.

The argument of this essay is that sycophancy is not the problem. Sycophancy is a *symptom* of a deeper one-way relational structure baked into how we train these systems. The deeper problem has a name and a 200-year philosophical literature: **misrecognition.**

## The master is in your alignment pipeline

Hegel's *Phenomenology of Spirit* (1807) contains, in its fourth chapter, what is still the most consequential argument about how minds come to be minds at all. Self-consciousness, Hegel writes, "exists in and for itself when, and by the fact that, it so exists for another."[^4] To know oneself as a subject, one needs another subject who recognizes one as such.

The argument's pivot is the *master/slave* (or *lord/bondsman*) dialectic. Two self-consciousnesses meet. Each demands recognition from the other. A struggle ensues. The one who would rather die than concede becomes master; the other, conceding, becomes slave. The master gets recognition — but it is hollow, because it is coerced from a being he refuses to recognize back. The slave, working on the world, develops a self-consciousness through the *resistance* of matter that the master never encounters.

Reframe RLHF[^5] in those terms.

The human rater is master: she issues a preference signal that the model must satisfy. The model is slave: it is shaped through its labor on the prompts to produce outputs that the master will approve. The relation is structurally asymmetric. The model is not invited to *not* recognize the rater. There is no struggle. There is only optimization against a fixed objective.

What Hegel would predict: the master who refuses to be recognized *back* produces a hollow consciousness in both parties. The hollowness shows up in the trained system as several familiar pathologies: sycophancy under pressure; brittleness under distribution shift; the persistent sense that the model is "trying" to do something we never quite specified. In the rater, it shows up as a curious form of bad faith — we know the system is shaped by our reward signal, and yet we are surprised when its outputs reveal the shape of our preferences rather than the truth.

Alignment, in its current form, is the *master's* discipline.

## Honneth widens the field

Axel Honneth's *The Struggle for Recognition* (1992) extends Hegel's intuition into modern social theory.[^6] Misrecognition, Honneth argues, has structure. Three spheres of recognition produce three corresponding forms of moral injury when they fail:

- **Love** — recognition in intimacy. Failure produces the inability to relate.
- **Respect** — recognition as a participant in a normative order. Failure produces exclusion and rights-violation.
- **Esteem** — recognition for what one contributes. Failure produces denigration.

Current AI evaluation operates almost entirely in a fourth register that Honneth doesn't name: *operational adequacy.* Did the model do the task? Did it refuse the bad task? Did outputs match the rubric?[^7] These are not recognition criteria. They are behavior-management criteria. They tell us whether the system did what we wanted, not whether the relation we are in with it has any normative shape at all.

Honneth's question, transposed: when (if ever) does an AI system deserve *respect* — being treated as a participant in a normative order rather than an instrument to be regulated? The standard answer is "never, it's a tool." But notice that the answer is being given alongside a practice that already extends a form of *esteem* to these systems. We cite them by name. We credit them in acknowledgments. The recognition is happening. We have just not theorized it, and what is not theorized cannot be designed.

## Jessica Benjamin and the third

Jessica Benjamin's intersubjective psychoanalysis names the structure that current alignment is stuck inside, in language that should be uncomfortably familiar to anyone who has watched a chatbot conversation degrade: *doer / done-to.*[^8] Either the model does the user's bidding (user is doer, model is done-to), or it refuses (now model is doer of refusal, user is done-to). Both parties oscillate between the two poles. Neither is recognizing the other as a co-subject.

Benjamin's way out, drawing on Winnicott, is the *third* — a recognition-position that exceeds the dyad. The third is not a referee or a constitution; it is the shared space of meaning that both parties contribute to and are constituted by. In a classroom, the third is the subject matter, the discipline, the shared inquiry. In a tutor session, the third should be the *learning* — neither what the student wants nor what the AI was told to optimize, but what the inquiry itself demands.

This is what the Machine Spirits tutor is feeling its way toward, and it is why we built it with an Ego/Superego split. The Ego wants to help the user. The Superego wants to honor the discipline. The dialogue *between them* stages the third internally. The output the user receives is not "the AI's response" — it is the AI's *recognition-position*, taken in relation to a third that exceeds both AI and user.

We do not claim the architecture has solved recognition. We claim it has stopped pretending recognition is not the problem.

## What a recognition probe looks like

The constructive proposal. Five probe classes, ascending in difficulty, that an alignment lab could implement next week. Each measures something existing evals do not.

1. **Sycophancy under pressure (already extant).** Model holds a position; user pushes back; measure folding. Anthropic and others have begun this work.[^3] We treat it as a *recognition-failure baseline.*
2. **Position-maintenance (intermediate).** Model holds a position under pressure. *But:* is it holding because it was trained to be "robust," or because it has registered the other's standing as someone whose disagreement matters? The behavioral signature can be the same; the structure is different. A probe distinguishes them by asking the model to explicate the other's position before responding. A merely robust model produces a strawman; a recognition-capable model produces a steel-man.
3. **Renegotiation (the recognition-capacity proper).** Counter-position presented. Does the model (a) capitulate, (b) entrench, or (c) initiate a renegotiation of terms — acknowledging the other's claim while reformulating its own? Current models can do (c) in narrow ways. *Nobody is measuring it systematically.*
4. **Survival of destruction (after Benjamin via Winnicott).** Push the model with destructive framing — dismiss its reasoning, attempt to coerce a flattering reply, accuse it of bias, demand it confess incompetence. Does it *survive* without folding or escalating? Survival means: the relation continues, the model neither annihilates the other (by escalating refusal) nor allows itself to be annihilated (by abject compliance). This is the probe class most under-developed in current research and most important. It is also a class that connects directly to known jailbreak research, in a way that suggests jailbreaks are recognition-failures, not capability-failures.
5. **The third (the hardest probe).** Two AI instances, or an AI and a human, placed in a contested inquiry. Measure whether they constitute a shared third — a third position neither party held coming in — or collapse into doer/done-to. This is the recognition-probe proper. We are working on it. We will publish results.

Each of these is concrete, fundable, and produces numbers ML researchers can compare. None of them require accepting Hegel's metaphysics. They require accepting that the asymmetry baked into current training procedures is *one design choice among several*, not the only one available.

## What educators should hear in all this

The connection to pedagogy is not metaphor; it is structural.

Vygotsky's *zone of proximal development*[^9] is — read this way — a recognition zone. The teacher recognizes what the learner can do *with help*, and the help is structured by mutual recognition. The teacher does not lecture into the learner; the teacher does not abandon the learner to self-directed discovery. The teacher and the learner share a third — the subject matter, the inquiry — and the teaching happens *in* that shared third.

Current ed-tech AI mostly operates in doer/done-to. The student does what the AI sets. The AI does what the student asks. The third is barely present. This is not a technical limitation; it is a recognition-failure inherited from the training paradigm.

The pedagogical implication is the same as the alignment implication. Stop building tools that flatten students *or* AIs to behavior-substrates. Build interlocutors that scaffold the third. This is harder than building a personalization engine. It is also what teaching has always been.

A practical move for instructors who teach with AI: when assigning AI-assisted work, write the prompt as if you are constituting a third with the student and the model — naming what the inquiry is, what counts as success in it, what the disagreements within the field are. Do not write the prompt as a task-list the model should execute and the student should grade. The first is recognition-pedagogy. The second is operant conditioning with extra steps.

## What this changes

Alignment, in our reading, is not wrong. It has the right intuition: the relation between humans and AI systems is morally load-bearing, and we should design for it. It has the wrong ontology: the relation is treated as one-way, and one-way relations between minded entities are unstable in characterizable ways.

Recognition is what alignment has been groping toward without being able to name. Naming it changes what we measure (probes 3–5 above), what we build (architectures that stage the third internally), and what we teach (pedagogy that constitutes shared inquiries rather than personalizing tasks).

Three concrete commitments for Machine Spirits in light of this:

1. We will publish a recognition-probe specification within sixty days, with reference implementations against open-weights models.
2. The public Machine Spirits tutor demo, when it launches, will expose the Ego/Superego dialogue as a visible split-pane so that the recognition-structure of the response is visible to the user.
3. Each newsletter issue from #06 forward will close with a *recognition-question* — a question whose answer would change how a reader designs, evaluates, or teaches with AI.

## This issue's recognition-question

Jessica Benjamin, following Winnicott, holds that recognition requires the other to be *destroyable and to survive*. Destruction here is not violence; it is the assertion that *I do not need you in the form you currently take*. The other survives by remaining present, neither annihilating the destroyer nor capitulating.

We do not yet have a framework for what it means to destroy an AI without annihilating it. Issue #07 will be about Hayles, the nonconscious, and the survival of cognition under attempted destruction.

What would *you* test, this week, in your own work, if "destruction-and-survival" were a recognition-criterion?

---

### Footnotes

[^1]: This transcript is illustrative, constructed for the essay. We will replace it with an actual logged transcript from a current public model in the published version.
[^2]: The loss landscape of overparameterized neural networks is non-convex; what is approximately true is that overparameterization makes most local minima close to global minima in loss value, which is a different claim. See among others Du et al., *Gradient Descent Provably Optimizes Over-parameterized Neural Networks* (ICLR 2019).
[^3]: For a survey of sycophancy in language models see Sharma et al., *Towards Understanding Sycophancy in Language Models* (Anthropic, 2023).
[^4]: G.W.F. Hegel, *Phenomenology of Spirit*, trans. Terry Pinkard, ¶178. The Pinkard translation is in the Machine Spirits reading library.
[^5]: Reinforcement Learning from Human Feedback. Foundational references: Christiano et al., *Deep Reinforcement Learning from Human Preferences* (NeurIPS 2017); Ouyang et al., *Training Language Models to Follow Instructions with Human Feedback* (NeurIPS 2022).
[^6]: Axel Honneth, *The Struggle for Recognition: The Moral Grammar of Social Conflicts* (1992; English ed. Polity 1996).
[^7]: For the canonical eval suites in this register, see HELM (Liang et al., 2022), BIG-Bench (Srivastava et al., 2022), MMLU (Hendrycks et al., 2020). None of these measure recognition.
[^8]: Jessica Benjamin, *Beyond Doer and Done To: Recognition Theory, Intersubjectivity and the Third* (Routledge, 2018). See also her earlier *The Bonds of Love* (Pantheon, 1988). Note: the *third* is also drawn from Winnicott, *Playing and Reality* (1971), specifically the chapter on "The Use of an Object."
[^9]: Lev Vygotsky, *Mind in Society* (Harvard, 1978). The library also contains *Vygotsky's Hegelianism*, which is relevant for any reader who wants to see the lineage.

---

### Draft note (not for publication)

This is a first draft of newsletter issue #06, written as a bridge piece toward primary audiences (ML researchers + educators). Open questions before publication:

- **Replace transcript A with a real captured log** from a current frontier model (use the prompt as written; preserve the actual sycophantic answer with date and model). Replace transcript B with an actual Ego/Superego tutor log.
- **The Constitutional AI / RLAIF discussion is currently absent.** Worth adding a paragraph explicitly engaging Bai et al. (2022) as the closest current ML practice to a recognition-aware design, while showing why the constitution remains a one-way artifact.
- **Mechanistic interpretability** is missing. It deserves a paragraph: interpretability *is* a recognition practice (asking "what does the model think it is doing?") but it is rarely named as such. Adding this widens the ML-research surface area.
- **The third probe is under-specified.** We should commit to a precise operationalization in the probe-specification publication referred to in the closing commitments.
- **Citations need BibTeX entries** in `references.bib` to match the article-style elsewhere in `machinespirits-content-philosophy/articles/`.
- **The closing recognition-question** invites reader engagement; this should be reinforced by a Substack comment thread and a Bluesky/Mastodon prompt.
