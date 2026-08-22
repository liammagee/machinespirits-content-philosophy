---
title: "Week 4: Attention"
week: 4
course: "479-fall-2026"
type: "weekly-overview"
---

# Week 4: Attention

[Weekly index](index.md) · [Lecture notes](../lecture-4.md) · [Full reference audit](../references-by-week.md)

## Overview

**Attention** makes some information consequential while leaving other information in the background. Human attention is selective, embodied, limited, motivated, and socially organized. In machine learning, attention is also a technical operation that weights relations among representations.

The shared word can illuminate or mislead. Transformer attention is not proof that a model attends as a conscious person does, while human attention is not reducible to a single mechanism. This week treats the analogy as a question to investigate rather than a conclusion.

By the end of the week, you should be able to explain computational attention at a basic level, identify multiple systems of human attention, and assess both the value and the limit of comparing them.

## Weekly readings

### Core

- Ashish Vaswani et al., [“Attention Is All You Need”](https://doi.org/10.48550/arXiv.1706.03762) (2017).
- Steven E. Petersen and Michael I. Posner, [“The Attention System of the Human Brain: 20 Years After”](https://doi.org/10.1146/annurev-neuro-062111-150525), *Annual Review of Neuroscience* 35 (2012): 73–89.
- Tiziana Terranova, [“Attention, Economy and the Brain”](https://doi.org/10.1080/09502386.2012.707261), *Culture Machine* 13 (2012): 1–19.
- [Week 4 lecture: Attention](../lecture-4.md).

### Further reading

- Yi-Yuan Tang, Britta K. Hölzel, and Michael I. Posner, [“The Neuroscience of Mindfulness Meditation”](https://doi.org/10.1038/nrn3916), *Nature Reviews Neuroscience* 16 (2015): 213–225.
- Hyoe Ishigami and Raymond M. Klein, [“Repeated Measurement of the Components of Attention”](https://doi.org/10.3758/PBR.17.6.802), *Psychonomic Bulletin & Review* 17 (2010): 802–809.

## Questions for discussion

1. Is attention best understood as selection, weighting, control, orientation, or care?
2. What does a transformer attention mechanism explain, and what does it leave unexplained?
3. Who or what directs a learner's attention in a classroom or platform?
4. How does an attention economy turn a capacity for learning into a resource to be captured?

## How does attention relate to machine learning?

In transformer models, attention computes context-sensitive weights among token representations, helping the model determine which relations matter for the next operation. These weights are inspectable mathematical quantities, but they are not transparent explanations of every model decision and should not be treated as a report of conscious focus.

## How does attention relate to human learning?

Human learners must orient, sustain focus, manage conflict, notice novelty, and shift between tasks. Their attention is affected by goals, emotion, fatigue, prior knowledge, other people, and designed environments. Learning changes attention too: expertise enables a learner to notice patterns that a novice overlooks.

## Self-assessed weekly activity: Attention trace

### 1. Begin with a machine-human chat

Give the machine a short passage from one of this week's readings and begin with:

> Ask me what I noticed first, what I ignored, and why. Then provide a concise public explanation of which words or relations in the passage you prioritized when composing your response. Do not claim to reveal hidden chain-of-thought or private internal reasoning. Help me compare our two attention traces without treating them as identical.

Discuss the passage for six to eight exchanges.

### 2. Produce an artifact

Create two attention traces:

- **Human trace:** three moments when your focus selected, sustained, shifted, or resisted.
- **Machine trace:** three observable features of the prompt or response that appeared consequential.

Then write a 250-word comparison naming one strong analogy and two important disanalogies between computational and human attention.

### 3. Reflect

- What did you notice only after the machine directed you toward it?
- What human motive or feeling had no clear machine equivalent?
- How did the interface itself direct both participants' attention?

### 4. Self-assess

| Criterion | Score |
|---|---:|
| I explain computational attention without anthropomorphizing it. | /4 |
| I describe human attention as more than simple selection. | /4 |
| I identify a useful analogy and its limits. | /4 |
| I ground my analysis in an observable dialogue trace. | /4 |
| I analyze how the learning environment directs attention. | /4 |
| **Total** | **/20** |

Use the [shared scale](index.md#self-assessment-scale), then complete: **Next week I will deliberately direct my attention toward…**
