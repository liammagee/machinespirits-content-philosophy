---
title: "Week 4: Attention and Consciousness"
week: 4
course: "479-fall-2026"
type: "weekly-overview"
---

# Week 4: Attention and Consciousness

[Weekly index](index.md) · Lecture notes: [attention](../lecture-4.md) · [consciousness](../lecture-5.md) · [Full reference audit](../references-by-week.md)

## Overview

This week takes two concepts together, because the seam between them is where the course's central question becomes sharpest.

**Attention** makes some information consequential while leaving the rest in the background. Human attention is selective, embodied, limited, motivated, and socially organized. In machine learning, attention is also a technical operation that weights relations among representations. The shared word can illuminate or mislead: transformer attention is not proof that a model attends as a person does, and human attention is not reducible to a single mechanism.

**Consciousness** is what attention is usually assumed to require — and this is precisely the assumption the pairing tests. Hegel presents consciousness as a relation between subject and object that develops into self-consciousness and recognition. Freud and Hayles complicate the picture by showing how much cognition occurs outside conscious awareness. Generative AI intensifies the question, because fluent systems produce first-person language without independent evidence of a first-person point of view.

Putting them in one session makes the decisive point available: **machine attention is a demonstrable, inspectable operation that proceeds with no awareness whatever.** Attention and consciousness come apart — in machines completely, and in humans further than intuition suggests. What remains attached to what, and on what evidence, is the week's work.

By the end of the week, you should be able to explain computational attention at a basic level, identify multiple systems of human attention, distinguish several meanings of consciousness, and make a qualified judgment about where the analogy holds and where it breaks.

## Weekly readings

This is a double concept in a single session, so the core is deliberately tight. Read the four core texts closely; use the further reading to follow whichever half of the week you want to press on.

### Core

- Ashish Vaswani et al., ["Attention Is All You Need"](https://doi.org/10.48550/arXiv.1706.03762) (2017) — read for the mechanism, not the mathematics.
- Steven E. Petersen and Michael I. Posner, ["The Attention System of the Human Brain: 20 Years After"](https://doi.org/10.1146/annurev-neuro-062111-150525), *Annual Review of Neuroscience* 35 (2012): 73–89.
- N. Katherine Hayles, *Unthought: The Power of the Cognitive Nonconscious* (University of Chicago Press, 2017), course-selected excerpt.
- G. W. F. Hegel, *Phenomenology of Spirit*, selections on consciousness and self-consciousness.
- Lecture notes: [attention](../lecture-4.md) and [consciousness](../lecture-5.md).

### Further reading

- Tiziana Terranova, ["Attention, Economy and the Brain"](https://doi.org/10.1080/09502386.2012.707261), *Culture Machine* 13 (2012): 1–19 — the political economy of attention; take this up if the alignment thread in Week 5 interests you.
- Sigmund Freud, "The Unconscious" (1915).
- Blake Lemoine, ["Is LaMDA Sentient?—an Interview"](https://static.poder360.com.br/2022/06/an-Interview-by-Blake-Lemoine.pdf) (2022), treated as a case study rather than proof.
- Yi-Yuan Tang, Britta K. Hölzel, and Michael I. Posner, ["The Neuroscience of Mindfulness Meditation"](https://doi.org/10.1038/nrn3916), *Nature Reviews Neuroscience* 16 (2015): 213–225.
- Compare Descartes' cogito and Kant's phenomenon/noumenon distinction with the criteria developed in class.

## Questions for discussion

1. Is attention best understood as selection, weighting, control, orientation, or care?
2. What does a transformer attention mechanism explain, and what does it leave unexplained?
3. Which forms of cognition can occur without consciousness — and does attention turn out to be one of them?
4. Is self-report evidence of consciousness, a performance associated with it, or both?
5. If a system attends without awareness, what exactly has been lost? Does it matter for learning?
6. What evidence would change your present view about artificial consciousness?

## How do attention and consciousness relate to machine learning?

In transformer models, attention computes context-sensitive weights among token representations, determining which relations matter for the next operation. These weights are inspectable mathematical quantities — but they are not transparent explanations of every model decision, and they are not a report of conscious focus.

Machine learning can classify, predict, generate, and adapt without any settled demonstration of subjective awareness. Training also produces language about feelings and selfhood, because such language occurs in the data. Behavioral competence matters, but it does not by itself resolve the consciousness question. The gap between a working attention mechanism and an absent inner life is the clearest case the course offers of a shared word covering two different things.

## How do attention and consciousness relate to human learning?

Human learners must orient, sustain focus, manage conflict, notice novelty, and shift between tasks. Attention is affected by goals, emotion, fatigue, prior knowledge, other people, and designed environments. Learning changes attention in turn: expertise lets a learner notice patterns a novice overlooks.

Much of this runs below awareness. Humans learn both consciously and nonconsciously — deliberate reflection revises concepts and strategies, while habit, perception, affect, and bodily adjustment operate partly outside it. Metacognition depends on consciousness in some form; not every component of learning does. The human case, then, is not the clean opposite of the machine case. It is a mixture, and saying where the conscious part does real work is harder than it first appears.

## Self-assessed weekly activity: The attention–consciousness seam

### 1. Begin with a machine-human chat

Give the machine a short passage from one of this week's readings and begin with:

> First, ask me what I noticed in this passage, what I ignored, and why. Then give a concise public account of which words or relations you prioritized in composing your response — without claiming to reveal hidden chain-of-thought or private reasoning. Then help me test whether anything in either account requires consciousness. Ask me to propose one criterion for consciousness at a time, and for each, identify what is observable and what remains an inference. Do not claim that you are conscious, or that you are not.

Continue for eight to ten exchanges, until you have compared both attention traces and tested at least three criteria for consciousness.

### 2. Produce an artifact

Two parts, on one page.

**Part A — paired attention traces.**

- **Human trace:** three moments when your focus selected, sustained, shifted, or resisted.
- **Machine trace:** three observable features of the prompt or response that appeared consequential.

**Part B — the seam.** A short criteria table: rows for your three criteria for consciousness, columns for why the criterion matters, the evidence in an ordinary adult human, the evidence available for a current language model, and the unresolved inference.

Then write a 300-word analysis answering one question directly: **which parts of your own attention trace required consciousness, and how do you know?** Name one strong analogy and two important disanalogies. Use confidence language rather than a categorical verdict.

### 3. Reflect

- What did you notice only after the machine directed you toward it?
- Which of your own attentional acts turned out not to need awareness at all?
- Did fluent first-person language influence your judgment more than it should?
- Are you applying the same evidential standard to the human and machine cases? Should you?

### 4. Self-assess

| Criterion | Score |
|---|---:|
| I explain computational attention without anthropomorphizing it. | /4 |
| I describe human attention as more than simple selection, including its nonconscious components. | /4 |
| I distinguish consciousness from intelligence, cognition, and attention. | /4 |
| I separate observation, inference, and uncertainty, and ground both in an observable dialogue trace. | /4 |
| I make a qualified, revisable judgment about where the analogy holds. | /4 |
| **Total** | **/20** |

Use the [shared scale](index.md#self-assessment-scale), then complete: **The part of my own learning that turned out not to require awareness is…**
