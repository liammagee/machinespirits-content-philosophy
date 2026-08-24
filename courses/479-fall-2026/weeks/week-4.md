---
title: "Week 4: Attention"
week: 4
course: "479-fall-2026"
type: "weekly-overview"
---

# Week 4: Attention

[Weekly index](index.md) · [Lecture notes](../lecture-4.md) · [Full reference audit](../references-by-week.md)

## Overview

**Attention** makes some information consequential while leaving the rest in the background. Human attention is selective, embodied, limited, motivated, and socially organized. In machine learning, attention is also a technical operation that weights relations among representations. The shared word can illuminate or mislead: transformer attention is not proof that a model attends as a person does, and human attention is not reducible to a single mechanism.

Attention stands alone this week because it is the course's clearest case of a shared word covering two different things — and because, unlike every other concept on the syllabus, one side of the comparison is fully inspectable. Transformer attention weights are mathematical quantities you can read off. Having tested last week whether recognition needs a conscious partner, we now have a demonstrable operation that proceeds with no awareness whatever, and the question becomes what attention explains once awareness is set aside.

Attention is also the concept with the shortest route to politics. Selection is never neutral: what a system foregrounds, and on whose behalf, is the hinge between this week and the alignment question in Week 5.

By the end of the week, you should be able to explain computational attention at a basic level, identify multiple systems of human attention, and make a qualified judgment about where the analogy holds and where it breaks.

## Weekly readings

### Core

- Ashish Vaswani et al., ["Attention Is All You Need"](https://doi.org/10.48550/arXiv.1706.03762) (2017) — read for the mechanism, not the mathematics.
- Steven E. Petersen and Michael I. Posner, ["The Attention System of the Human Brain: 20 Years After"](https://doi.org/10.1146/annurev-neuro-062111-150525), *Annual Review of Neuroscience* 35 (2012): 73–89.
- [Week 4 lecture: Attention](../lecture-4.md).

### Further reading

- Tiziana Terranova, ["Attention, Economy and the Brain"](https://doi.org/10.1080/09502386.2012.707261), *Culture Machine* 13 (2012): 1–19 — the political economy of attention; take this up if the alignment thread in Week 5 interests you.
- Yi-Yuan Tang, Britta K. Hölzel, and Michael I. Posner, ["The Neuroscience of Mindfulness Meditation"](https://doi.org/10.1038/nrn3916), *Nature Reviews Neuroscience* 16 (2015): 213–225.
- N. Katherine Hayles, *Unthought: The Power of the Cognitive Nonconscious* (2017), revisited from Week 3 for the nonconscious components of attention.

## Questions for discussion

1. Is attention best understood as selection, weighting, control, orientation, or care?
2. What does a transformer attention mechanism explain, and what does it leave unexplained?
3. Which of your own attentional acts turn out not to require awareness at all?
4. If a system attends without awareness, what exactly has been lost? Does it matter for learning?
5. Who benefits from the way a given system allocates attention — the model's, and yours?

## How does attention relate to machine learning?

In transformer models, attention computes context-sensitive weights among token representations, determining which relations matter for the next operation. These weights are inspectable mathematical quantities — but they are not transparent explanations of every model decision, and they are not a report of conscious focus.

The mechanism is genuinely powerful: it is what allows a model to hold long-range dependencies together, and its introduction is the proximate reason the current generation of systems works at all. What it does not supply is a subject for whom something stands out. The gap between a working attention mechanism and an absent inner life is the clearest case the course offers of a shared word covering two different things.

## How does attention relate to human learning?

Human learners must orient, sustain focus, manage conflict, notice novelty, and shift between tasks. Attention is affected by goals, emotion, fatigue, prior knowledge, other people, and designed environments. Learning changes attention in turn: expertise lets a learner notice patterns a novice overlooks.

Much of this runs below awareness, as Week 3 established. Attention is therefore not a single faculty but a set of partly independent systems — alerting, orienting, executive control — some of which operate without the learner registering them. Attention is also increasingly a designed and contested resource: the environments in which people now study are built by parties with an interest in where that attention goes.

## Self-assessed weekly activity: Paired attention traces

### 1. Begin with a machine-human chat

Give the machine a short passage from one of this week's readings and begin with:

> First, ask me what I noticed in this passage, what I ignored, and why. Then give a concise public account of which words or relations you prioritized in composing your response — without claiming to reveal hidden chain-of-thought or private reasoning. Then help me compare the two accounts: where they converge, where they diverge, and what each one cannot show. Do not claim that your account is a report of experience.

Continue for eight to ten exchanges, until you have compared both attention traces in some detail.

### 2. Produce an artifact

Two parts, on one page.

**Part A — paired attention traces.**

- **Human trace:** three moments when your focus selected, sustained, shifted, or resisted.
- **Machine trace:** three observable features of the prompt or response that appeared consequential.

**Part B — the comparison.** A short table: rows for each of the three pairs, columns for what the human side involved, what the machine side involved, what is genuinely analogous, and what the analogy hides.

Then write a 300-word analysis answering one question directly: **what does calling both of these "attention" gain us, and what does it cost us?** Name one strong analogy and two important disanalogies. Use confidence language rather than a categorical verdict.

### 3. Reflect

- What did you notice only after the machine directed you toward it?
- Which of your own attentional acts turned out not to need awareness at all?
- Was your attention during this activity shaped by anything you did not choose?
- Are you applying the same evidential standard to the human and machine cases? Should you?

### 4. Self-assess

| Criterion | Score |
|---|---:|
| I explain computational attention without anthropomorphizing it. | /4 |
| I describe human attention as more than simple selection, including its nonconscious components. | /4 |
| I identify what the shared vocabulary gains and what it obscures. | /4 |
| I separate observation, inference, and uncertainty, and ground both in an observable dialogue trace. | /4 |
| I make a qualified, revisable judgment about where the analogy holds. | /4 |
| **Total** | **/20** |

Use the [shared scale](index.md#self-assessment-scale), then complete: **The part of my own learning that turned out not to require awareness is…**
