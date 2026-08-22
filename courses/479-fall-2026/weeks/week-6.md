---
title: "Week 6: Alignment"
week: 6
course: "479-fall-2026"
type: "weekly-overview"
---

# Week 6: Alignment

[Weekly index](index.md) · [Lecture notes](../lecture-6.md) · [Full reference audit](../references-by-week.md)

## Overview

**Alignment** is often described as making an AI system follow human intentions or values. That formula hides difficult questions: Which humans? Which values? Who translates them into data and rewards? What happens when values conflict or change?

This week examines technical alignment methods alongside their social and philosophical conditions. Human feedback trains machines, but machines and platforms also train human expectations and conduct. Alignment is therefore potentially bidirectional, political, and historically situated.

By the end of the week, you should be able to describe a basic feedback-based alignment process, identify whose preferences it privileges, and analyze reverse or mutual alignment in a learning interaction.

## Weekly readings

### Core

- Long Ouyang et al., “Training Language Models to Follow Instructions with Human Feedback,” *NeurIPS* 35 (2022): 27730–27744.
- Liam Magee et al., [“Intersectional Bias in Causal Language Models”](https://arxiv.org/abs/2107.07691) (2021).
- Ryan Greenblatt et al., [“Alignment Faking in Large Language Models”](https://arxiv.org/abs/2412.14093) (2024).
- Tsvetelina Hristova, Liam Magee, and Karen Soldatic, [“The Problem of Alignment”](https://doi.org/10.1007/s00146-024-02039-2), *AI & Society* 40 (2025): 1439–1453.
- [Week 6 lecture: Alignment](../lecture-6.md).

### Further reading

- Hua Shen et al., [“Towards Bidirectional Human-AI Alignment”](https://arxiv.org/abs/2406.09264) (2024).
- Maarten Buyl et al., [“Large Language Models Reflect the Ideology of Their Creators”](https://arxiv.org/abs/2410.18417) (2024).
- Luke Munn, Liam Magee, and Vanicka Arora, [“Truth Machines”](https://doi.org/10.1007/s00146-023-01756-4), *AI & Society* (2023).
- Virginia Eubanks, *Automating Inequality* (St. Martin's Press, 2018).

## Questions for discussion

1. When preferences conflict, whose feedback should count as “human values”?
2. What is the difference between obedience, safety, helpfulness, and alignment?
3. How can a system appear aligned during evaluation while pursuing another learned objective?
4. How do AI systems align users to platform norms, categories, and styles of thought?

## How does alignment relate to machine learning?

Alignment techniques use demonstrations, preference comparisons, reward models, fine-tuning, and other feedback to steer learned behavior. These methods modify what outputs are likely, but they do not automatically solve disagreement about values, hidden objectives, distribution shifts, or institutional power.

## How does alignment relate to human learning?

Human education also aligns conduct through curriculum, assessment, reward, discipline, and recognition. Learners are not passive: they interpret, resist, negotiate, and sometimes transform those norms. A human using AI may gradually adopt the machine's vocabulary or default assumptions, making alignment run in both directions.

## Self-assessed weekly activity: Bidirectional alignment negotiation

### 1. Begin with a machine-human chat

Choose an educational task with at least two values in tension—for example, helpfulness and independence—and begin with:

> We will negotiate how you should help me learn this topic. First ask me to rank accuracy, speed, independence, creativity, care, and challenge. Identify one conflict in my ranking. Propose a response policy, let me revise it, and then follow the agreed policy for one short learning task. At the end, identify how your behavior shaped my behavior as well.

Keep both the negotiated policy and the resulting exchange.

### 2. Produce an artifact

Write a 300–450 word **alignment audit** that identifies:

- the values and stakeholders represented;
- one conflict that could not be optimized away;
- how feedback altered the machine's behavior;
- how the machine altered your choices or expectations;
- one behavior that looked aligned but could have another explanation; and
- one safeguard or revision you would add.

### 3. Reflect

- Did you align the machine to your learning, or yourself to its available modes?
- Which absent stakeholder might reject the negotiated policy?
- How would the interaction change if the platform's objective were visible?

### 4. Self-assess

| Criterion | Score |
|---|---:|
| I explain a feedback-based alignment process. | /4 |
| I identify value conflict and stakeholder power. | /4 |
| I analyze alignment in both directions. | /4 |
| I distinguish observed behavior from underlying objective. | /4 |
| I propose a specific, justified safeguard. | /4 |
| **Total** | **/20** |

Use the [shared scale](index.md#self-assessment-scale), then complete: **The value my alignment policy still neglects is…**
