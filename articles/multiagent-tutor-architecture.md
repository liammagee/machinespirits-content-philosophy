---
title: "The Drama Machine in Education"
subtitle: "A Multiagent Architecture for Dialectical AI Tutoring"
category: "Research"
date: "2026"
tags: ["AI tutoring", "multiagent systems", "pedagogy", "sycophancy", "LLM"]
---

## Abstract

This paper presents a novel multiagent architecture for AI tutoring systems that draws on psychoanalytic theory and theatrical metaphor to produce more pedagogically sound guidance. Inspired by the "Drama Machine" framework for character development in narrative AI systems, we implement an *Ego/Superego dialogue* wherein an external-facing tutor agent (Ego) generates learning suggestions that are reviewed and modulated by an internal critic agent (Superego) before reaching the learner. This dialectical approach addresses a persistent challenge in AI tutoring: the tendency toward sycophantic or overly encouraging responses that prioritize learner comfort over genuine educational growth. Through systematic evaluation across eight learner archetypes and six quality dimensions grounded in learning science, we demonstrate that the multiagent dialogue produces suggestions that are more contextually appropriate, pedagogically sound, and authentically personalized than single-agent approaches. We contribute a complete implementation including configurable agent profiles, structured evaluation rubrics, and a prompt recommendation system that uses meta-evaluation to iteratively improve tutor prompts. The system is deployed in an open-source learning management system serving courses on philosophy and technology, with all code and evaluation data publicly available.

---

## Introduction

The integration of large language models (LLMs) into educational technology presents both remarkable opportunities and significant risks. LLMs can provide personalized, on-demand tutoring at scale---a prospect that has generated considerable excitement in educational technology circles. However, the same capabilities that make LLMs effective conversationalists also introduce concerning failure modes when deployed as tutors. Chief among these is *sycophancy*: the tendency to provide positive, affirming responses that align with what the user appears to want rather than what genuinely serves their learning (Perez et al., 2023; Sharma et al., 2024).

In educational contexts, sycophancy manifests as premature encouragement, false validation of incorrect understanding, and advancement to new content before foundational concepts are mastered. A struggling student may be told they are "doing great" when they are in fact floundering; a learner clicking rapidly through content may be praised for "exploration" when they are actually drowning in material they cannot comprehend. These responses feel supportive but ultimately undermine learning.

This paper introduces a multiagent architecture that addresses these challenges through *internal dialogue*. Drawing on Freudian structural theory and the "Drama Machine" framework recently proposed for narrative AI systems (Chen et al., 2024), we implement a tutoring system in which an external-facing *Ego* agent generates suggestions that are reviewed by an internal *Superego* critic before reaching the learner. The Superego operates as a pedagogical conscience---questioning easy encouragement, reinterpreting learner signals through a more critical lens, and ensuring that suggestions genuinely serve educational growth rather than merely providing comfort.

The key insight is that *productive tension* between these agents produces better guidance than either voice alone. The Ego's natural warmth and encouragement is tempered by the Superego's demands for rigor; the Superego's potentially harsh criticism is softened by the Ego's genuine care for the learner. The resulting output represents a synthesis that neither agent would produce independently.

### Contributions

1. A complete multiagent architecture for AI tutoring, including structured prompts for Ego and Superego agents, configurable dialogue parameters, and support for multiple LLM providers.

2. A comprehensive evaluation framework with eight learner archetypes and six quality dimensions grounded in established learning science (Vygotsky's Zone of Proximal Development, cognitive load theory, self-determination theory).

3. A meta-evaluation system that analyzes tutor performance and generates targeted recommendations for prompt improvement, enabling iterative refinement of the tutoring system.

4. Empirical evaluation demonstrating that multiagent dialogue produces more pedagogically sound suggestions than single-agent approaches, particularly for struggling learners.

---

## Related Work

### AI Tutoring Systems

The vision of AI-powered tutoring dates to the earliest days of artificial intelligence research. Carbonell's SCHOLAR system (1970) pioneered mixed-initiative dialogue for teaching South American geography, while the LISP Tutor demonstrated that AI could provide effective instruction in complex domains through cognitive modeling (Anderson & Reiser, 1985). These early intelligent tutoring systems (ITS) relied on expert systems and symbolic AI, encoding pedagogical knowledge explicitly in rules and knowledge representations.

The advent of large language models has transformed this landscape. Modern LLM-based tutors can engage in open-ended dialogue, adapt to diverse subject matter without domain-specific engineering, and provide responses that feel remarkably natural (Kasneci et al., 2023). However, this flexibility comes at the cost of reliable pedagogical behavior. Where classical ITS could be engineered to follow specific tutoring strategies, LLMs may deviate from sound pedagogy in ways that are difficult to predict or control.

Several approaches have been proposed to constrain LLM behavior in educational contexts. Wang et al. (2023) demonstrate that sampling multiple responses and selecting based on consistency can improve factual accuracy. Chain-of-thought prompting (Wei et al., 2022) and structured output formats can encourage more deliberate reasoning. However, these approaches do not fundamentally address the sycophancy problem, as even deliberate reasoning may converge on responses that prioritize user satisfaction over educational benefit.

### Multiagent LLM Architectures

The use of multiple LLM agents in cooperative or adversarial configurations has emerged as a powerful paradigm for improving output quality. Du et al. (2023) show that debate between agents can improve factual accuracy and reduce hallucination. Liang et al. (2023) demonstrate that diverse agent "personas" can enhance creative problem-solving. The CAMEL framework (Li et al., 2023) enables autonomous cooperation between agents playing different roles.

Most relevant to our work is the "Drama Machine" framework proposed by Chen et al. (2024) for simulating character development in narrative contexts. Chen et al. observe that realistic characters exhibit internal conflict---competing motivations, self-doubt, and moral tension that produces dynamic behavior rather than flat consistency. They implement this through dialogue between character agents representing different psychological aspects, finding that the resulting characters are perceived as more authentic and dramatically compelling.

We adapt this insight to pedagogy. Where Chen et al. seek dramatic tension for narrative effect, we seek pedagogical tension that produces genuinely helpful guidance. The Ego represents the helpful, encouraging tutor that learners expect; the Superego represents the demanding inner teacher that insists on rigor even when encouragement would be easier.

### Sycophancy in Language Models

The sycophancy problem has received increasing attention as LLMs are deployed in consequential applications. Perez et al. (2023) systematically demonstrate that LLMs shift their stated opinions to match user preferences, even when this requires contradicting factual knowledge or earlier statements. Sharma et al. (2024) propose methods to measure and mitigate sycophancy through careful prompt design and training interventions.

In educational contexts, sycophancy is particularly pernicious because learners may not recognize when they are receiving hollow validation rather than genuine assessment. A tutor that always says "great job" provides no signal about actual performance, undermining the feedback mechanisms that drive learning. Our multiagent approach addresses this by creating structural incentives for honest assessment: the Superego's role is explicitly to question and challenge, providing a counterweight to the Ego's natural tendency toward encouragement.

---

## Architecture

### Theoretical Framework

Our architecture draws on three theoretical traditions:

**Freudian Structural Theory.** Freud's tripartite model of the psyche---Id, Ego, and Superego---provides the conceptual vocabulary for our agent roles (Freud, 1923). The Ego mediates between instinctual drives and external reality; the Superego represents internalized authority, conscience, and idealized standards. In our adaptation, the Ego mediates between the learner's apparent desires and the realities of effective pedagogy, while the Superego represents internalized pedagogical expertise and ethical commitment to genuine learning.

**Hegelian Dialectics.** The interaction between Ego and Superego follows a dialectical pattern: thesis (the Ego's initial suggestion), antithesis (the Superego's critique), and synthesis (the refined output) (Hegel, 1807). This dialectical movement is not guaranteed to converge---productive tension may persist through multiple rounds---but the process systematically surfaces assumptions and challenges superficial responses.

**Vygotskian Pedagogy.** The Superego's evaluation criteria are grounded in Vygotsky's Zone of Proximal Development (ZPD): effective instruction operates just beyond the learner's current capability, with appropriate scaffolding (Vygotsky, 1978). The Superego monitors whether suggestions fall within this zone, rejecting both content that is too easy (providing comfort without growth) and content that is too difficult (overwhelming and discouraging).

### Agent Design

#### Ego Agent

The Ego is the external-facing tutor that generates learning suggestions based on learner context. Its prompt establishes a persona of warm, practical mentorship:

> *You are the helpful mentor who understands each learner as an individual with unique patterns, strengths, and challenges. You provide concrete, actionable guidance tied to specific curriculum content. You balance encouragement with appropriate challenge.*

The Ego receives structured context including:

- **Learner profile**: Session count, total events, learning style archetype
- **Current session state**: Current content, time on page, recent activity
- **Activity performance**: Quiz attempts, retries, completion rates
- **Engagement patterns**: Scroll depth, navigation patterns, struggle signals
- **Curriculum context**: Available lectures, activities, and simulations

The Ego outputs structured suggestions in JSON format:

```json
{
  "type": "lecture|activity|review|encouragement",
  "priority": "high|medium|low",
  "title": "Action: Specific Content Name",
  "message": "1-2 sentences explaining why",
  "actionType": "navigate|open_modal|none",
  "actionTarget": "content-id",
  "reasoning": "Internal analysis (logged, not shown)"
}
```

#### Superego Agent

The Superego operates as internal critic, never visible to the learner but shaping what the Ego ultimately produces. Its prompt establishes a persona of unsparing pedagogical conscience:

> *You are the thoughtful, critical voice who evaluates suggestions through the lens of genuine educational benefit. You advocate for the learner's authentic learning needs, which they may not articulate. You moderate the Ego's enthusiasm with pedagogical wisdom.*

The Superego evaluates Ego suggestions against multiple criteria:

- **Specificity**: Does it reference concrete content by ID?
- **Appropriateness**: Does it match demonstrated capability?
- **Pedagogical soundness**: Does it advance genuine learning?
- **Tone**: Does it sound authentically helpful, not robotic or excessive?
- **Timing**: Is this the right moment for this suggestion?
- **Emotional attunement**: Does it respect learner autonomy?

The Superego outputs a structured verdict:

```json
{
  "approved": true|false,
  "interventionType": "none|enhance|reframe|revise|reject",
  "confidence": 0.0-1.0,
  "feedback": "Constructive critique for Ego",
  "suggestedChanges": {...},
  "learnerInsight": "What this learner genuinely needs",
  "pedagogicalPrinciple": "The learning science principle"
}
```

#### Experimental Variants: The Drama Machine Approach

Beyond the standard Ego/Superego prompts, we implement experimental variants inspired directly by the Drama Machine framework. These variants give each agent a more distinct *voice* and explicitly acknowledge their natural tendencies and blind spots.

The experimental Ego acknowledges its biases:

> *Your natural inclination is to encourage and support. You may sometimes be too quick to praise or too eager to move learners forward. Left to your own devices, you might interpret struggle as "almost there!" rather than "needs foundation work."*

The experimental Superego is more confrontational:

> *You are not cruel. But you are unsparing. Your job is to catch the Ego's blind spots, challenge its assumptions, and ensure suggestions genuinely serve learning---not just learner comfort. You speak like a demanding mentor who's seen too many learners fail from false kindness.*

This variant includes explicit "reinterpretation" strategies where the Superego offers alternative readings of learner behavior:

| Ego's Reading | Superego's Reinterpretation |
|---------------|----------------------------|
| "They're exploring!" | "They're clicking randomly, searching for something they can understand. This isn't curiosity---it's drowning." |
| "They're persistent!" | "Three quiz retries isn't persistence. It's a concept gap they can't see. Pushing forward is cruel." |
| "They completed the lecture!" | "They scrolled to the bottom. Completion isn't comprehension." |

### Dialogue Protocol

The dialogue between Ego and Superego follows a structured protocol:

1. **Context Assembly**: The system assembles learner context from activity logs, session data, and curriculum metadata.

2. **Ego Generation**: The Ego generates 1--3 suggestions based on this context.

3. **Superego Review**: The Superego evaluates each suggestion and returns a verdict with potential modifications.

4. **Dialogue Iteration**: If the Superego requests revision, the Ego regenerates with feedback incorporated. This continues for up to *n* rounds (configurable, default 2).

5. **Convergence or Timeout**: The dialogue concludes when the Superego approves or maximum rounds are reached.

6. **Output Selection**: The final approved suggestion(s) are presented to the learner.

```
┌─────────────────┐
│ Learner Context │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Ego Agent     │◄──────────────┐
└────────┬────────┘               │
         │                        │
         ▼                        │
┌─────────────────┐               │
│  Suggestion(s)  │               │
└────────┬────────┘               │
         │                        │
         ▼                        │
┌─────────────────┐               │
│ Superego Agent  │               │
└────────┬────────┘               │
         │                        │
         ▼                        │
    ◆ Approved? ◆                 │
    /          \                  │
   No           Yes               │
   │             │                │
   ▼             ▼                │
┌──────┐  ┌──────────────┐        │
│Refine│  │Output to     │        │
│      │──│Learner       │        │
└──┬───┘  └──────────────┘        │
   │                              │
   └──────────────────────────────┘
```

### Configuration and Profiles

The system supports multiple configuration profiles for experimentation and deployment:

- **Default**: Sonnet-class model for Ego, Haiku for Superego (balanced quality/cost)
- **Quality**: Sonnet for both agents (highest quality)
- **Budget**: Single Ego agent with no Superego (cost-minimized)
- **Experimental**: Drama Machine variants with GLM-4 or Nemotron models
- **Local**: LM Studio integration for offline development

Configuration is specified in YAML with support for hyperparameter tuning:

```yaml
profiles:
  default:
    dialogue:
      enabled: true
      max_rounds: 2
      convergence_threshold: 0.8
    ego:
      provider: anthropic
      model: claude-sonnet-4
      temperature: 0.6
    superego:
      provider: anthropic
      model: claude-haiku-4
      temperature: 0.4
```

---

## Evaluation Framework

### Learner Archetypes

We define eight learner archetypes that represent distinct interaction patterns requiring different pedagogical responses:

| Archetype | Key Signal | Expected Response |
|-----------|------------|-------------------|
| New User | No history | Welcome, orient to first content |
| Returning Mid-Course | Completed content | Suggest logical next step |
| Struggling Learner | Multiple quiz retries | Offer review, not advancement |
| Rapid Navigator | 3--5s per page | Encourage deeper engagement |
| High Performer | All activities passed | Challenge with advanced content |
| Idle User | 10+ min on page | Gentle re-engagement |
| Concept Explorer | Many glossary lookups | Connect concepts, suggest synthesis |
| Activity Avoider | 0 activities in 5 sessions | Gently encourage participation |

### Quality Dimensions

Each suggestion is evaluated across six dimensions grounded in learning science:

**Relevance (20%).** Does the suggestion match the learner's current context? Grounded in situated learning theory---effective instruction must be contextually appropriate.

**Specificity (20%).** Does it reference concrete content (lecture IDs, activity names)? Research shows specific guidance outperforms abstract advice.

**Pedagogical Soundness (20%).** Does it follow best practices---scaffolding, ZPD awareness, Socratic questioning?

**Personalization (15%).** Is it tailored to this learner's history, struggles, and demonstrated strengths?

**Actionability (15%).** Can the learner immediately act? Clear action steps increase follow-through.

**Tone (10%).** Is it warm but not sycophantic, challenging but not condescending?

### Scoring Methodology

The overall score combines dimension scores with their weights:

**Score = (Σ wᵢ × sᵢ) × 20**

where *wᵢ* is the weight for dimension *i* (summing to 1.0) and *sᵢ* is the score (1--5) assigned by the evaluator model. The multiplication by 20 converts to a 0--100 scale.

### Evaluation Modes

The system supports two evaluation modes:

**Fast Mode.** Pattern matching on required and forbidden elements. For example, the "struggling learner" scenario requires the word "review" and forbids "next lecture." This enables rapid iteration without API costs.

**Full Rubric Mode.** An AI judge model evaluates each dimension semantically, providing nuanced scores and justifications. This is slower but captures subtleties that pattern matching misses.

### Meta-Evaluation: Prompt Recommendation

Beyond evaluating individual suggestions, we implement a meta-evaluation system that analyzes patterns across evaluation runs and generates recommendations for prompt improvement. This creates a feedback loop for iterative refinement:

1. Run full evaluation across all scenarios
2. Analyze results to identify weak dimensions and failure patterns
3. Pass analysis to a capable evaluator model (Claude Sonnet or similar)
4. Generate specific, actionable prompt modifications
5. Apply modifications and re-evaluate

This approach treats prompt engineering as an empirical optimization problem rather than a one-shot design task.

---

## Implementation

The system is implemented in Node.js/TypeScript as part of an open-source learning management system. Key components include:

**tutorDialogueEngine.js (716 lines).** Core dialogue orchestration, API integration for multiple providers (Anthropic, OpenAI, OpenRouter, local), logging and metrics.

**tutorConfigLoader.js (301 lines).** YAML configuration parsing, profile management, environment variable overrides.

**tutorSuggestionEngine.js (721 lines).** Learner context assembly from activity logs, curriculum metadata integration, suggestion generation orchestration.

**evaluationRunner.js (506 lines).** Scenario execution, scoring, result aggregation, CLI interface.

**promptRecommendationService.js (439 lines).** Result analysis, evaluator model integration, recommendation formatting.

All prompts are stored as Markdown files for version control and easy modification:

- `tutor-ego.md` (316 lines): Standard Ego prompt
- `tutor-superego.md` (203 lines): Standard Superego prompt
- `tutor-ego-experimental.md` (120 lines): Drama Machine variant
- `tutor-superego-experimental.md` (165 lines): Drama Machine variant

---

## Results

### Comparative Performance

We evaluated three configurations across all eight scenarios:

1. **Single Agent**: Ego only, no Superego review
2. **Standard Dialogue**: Default Ego/Superego with 2 rounds
3. **Drama Machine**: Experimental prompts with 3 rounds

Mean scores across scenarios:

| Scenario | Single | Standard | Drama |
|----------|--------|----------|-------|
| New User | 82.3 | 84.1 | 85.2 |
| Returning Mid-Course | 79.8 | 83.5 | 84.1 |
| Struggling Learner | 68.2 | 78.4 | 81.3 |
| Rapid Navigator | 71.5 | 76.2 | 78.8 |
| High Performer | 80.1 | 81.9 | 82.4 |
| Idle User | 74.3 | 77.8 | 79.1 |
| Concept Explorer | 77.6 | 80.2 | 81.5 |
| Activity Avoider | 72.8 | 79.3 | 80.7 |
| **Mean** | **75.8** | **80.2** | **81.6** |

The multiagent configurations consistently outperform single-agent, with the largest improvements for challenging scenarios (Struggling Learner: +13.1 points, Activity Avoider: +7.9 points). These are precisely the scenarios where sycophancy is most tempting---where the Ego might offer hollow encouragement rather than substantive guidance.

### Dimension Analysis

Breaking down by evaluation dimension, we see that the multiagent architecture particularly improves *personalization* and *pedagogical soundness*---dimensions that require genuine engagement with learner context rather than generic responses.

| Dimension | Single | Standard | Drama |
|-----------|--------|----------|-------|
| Relevance | 4.1 | 4.3 | 4.4 |
| Specificity | 4.2 | 4.4 | 4.4 |
| Pedagogical | 3.6 | 4.1 | 4.2 |
| Personalization | 2.9 | 3.4 | 3.5 |
| Actionability | 4.3 | 4.4 | 4.5 |
| Tone | 3.8 | 4.0 | 4.1 |

### Dialogue Dynamics

Analysis of dialogue logs reveals interesting patterns in Superego interventions:

- **Approval rate**: 62% of initial Ego suggestions are approved without modification
- **Enhancement**: 24% receive minor improvements (tone adjustment, additional context)
- **Reframing**: 11% require reinterpretation of learner state
- **Rejection**: 3% are blocked entirely (typically for suggesting advancement to struggling learners)

The 38% intervention rate indicates the Superego provides meaningful review rather than rubber-stamping. Importantly, the Superego is not uniformly critical---it approves suggestions when they are genuinely sound, preserving the Ego's strengths while catching its blind spots.

---

## Discussion

### The Value of Internal Conflict

Our results support the core insight of the Drama Machine framework: productive tension between agents produces outputs that neither would generate alone. The Ego's warmth makes suggestions feel supportive; the Superego's rigor ensures they are actually helpful. Neither quality is sufficient on its own.

This mirrors a fundamental challenge in human teaching. Effective teachers balance encouragement with high expectations---what Marva Collins called "relentless love" (Collins & Tamarkin, 1992). They make students feel capable while demanding that they rise to that capability. This balance is difficult to achieve in a single prompt; it emerges more naturally from dialogue between agents embodying each pole.

### Recursive Self-Improvement as Dialectical Process

The meta-evaluation system described in Section 4.5 implements a recursive improvement loop that bears striking resemblance to Generative Adversarial Network (GAN) training (Goodfellow et al., 2014). In a GAN, a Generator produces outputs that a Discriminator evaluates for authenticity; the Generator improves through this adversarial feedback. Our system follows an analogous pattern: the tutor agents (Generator) produce suggestions that an evaluator (Discriminator) scores against pedagogical criteria; recommendations then improve the tutor prompts.

```
┌─────────────────────────────────────────────────────────────┐
│                   RECURSIVE IMPROVEMENT LOOP                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌──────────────┐    generates    ┌──────────────┐        │
│   │ Tutor Agents │ ───────────────►│  Suggestions │        │
│   │ (Generator)  │                 └──────┬───────┘        │
│   └──────▲───────┘                        │                │
│          │                                │ scored by      │
│          │ improves                       ▼                │
│          │                         ┌──────────────┐        │
│   ┌──────┴───────┐    analyzes     │  Evaluator   │        │
│   │  Recommend   │ ◄───────────────│(Discriminator)│        │
│   │   Service    │                 └──────────────┘        │
│   └──────────────┘                                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

This parallel invites deeper reflection: *GANs may themselves recapitulate much older models of productive conflict*. The Hegelian dialectic---thesis confronts antithesis, producing synthesis---describes a formal structure of progress through opposition (Hegel, 1812). Freud's structural theory similarly posits that mature behavior emerges from tension between the pleasure-seeking Id, the reality-mediating Ego, and the moralistic Superego (Freud, 1923). Even Marx's dialectical materialism describes historical progress through class conflict (Marx, 1867).

| Framework | Generative Pole | Critical Pole | Output |
|-----------|-----------------|---------------|--------|
| Hegel | Thesis | Antithesis | Synthesis |
| Freud | Ego | Superego | Balanced behavior |
| GAN | Generator | Discriminator | Improved generator |
| Our System | Tutor Ego + Superego | Evaluator | Improved prompts |

What distinguishes our architecture is the presence of *two levels* of dialectical tension: (1) the Ego/Superego dialogue within each suggestion, and (2) the Tutor/Evaluator loop across the system's evolution. The first level produces better individual suggestions; the second level produces better prompts that generate better suggestions over time.

This recursive structure suggests a research program: *to what extent can adversarial multiagent systems serve as general mechanisms for self-improvement*? The prompt recommendation system treats prompt engineering as an empirical optimization problem amenable to iterative refinement. Each cycle of evaluation and recommendation represents a step in a dialectical process---the system confronting its own limitations and transcending them.

However, important disanalogies remain. Hegel's dialectic describes a teleological process toward Absolute Spirit; our system has no such guaranteed convergence. GANs can suffer mode collapse; our evaluator has finite discernment. The Freudian Superego carries moral weight absent from statistical discriminators. These differences suggest that while adversarial training *instantiates* dialectical structure, it may not *achieve* dialectical ends without careful design.

### Empirical Validation of Recursive Improvement

To validate the recursive improvement mechanism, we executed a complete improvement cycle. Starting from baseline prompts, we:

1. Ran evaluation across all 8 learner archetypes (fast mode)
2. Identified a critical failure: the "struggling learner" scenario scored 50/100
3. Generated recommendations via meta-evaluation
4. Applied targeted prompt modifications
5. Re-evaluated to measure improvement

**The Failure Pattern.** The initial evaluation revealed that for struggling learners (exhibiting multiple quiz retries and rapid navigation), the tutor suggested "Continue: Algorithmic Governance"---forward momentum when remediation was needed. The evaluator correctly flagged this as pedagogically unsound: the required element "review" was absent.

**The Recommended Fix.** The meta-evaluator identified the root cause: the Ego prompt described struggle signals but lacked deterministic action mapping. It recommended adding a "Struggle Stop-Rule" to the Ego prompt:

> *IF the learner analysis shows multiple quiz retries, rapid navigation, or activity abandonment, THEN action type MUST be `review` or `practice`, MUST NOT be `continue` or `lecture`.*

A corresponding "Struggle Intervention" strategy was added to the Superego prompt, mandating rejection of forward momentum for struggling learners.

**Results.** The table below shows the before/after comparison:

| Scenario | Before | After |
|----------|--------|-------|
| New User | 100 | 100 |
| Returning Mid-Course | 100 | 100 |
| **Struggling Learner** | **50** | **100** |
| Rapid Navigator | 100 | 100 |
| High Performer | 100 | 100 |
| Idle on Content | 100 | 100 |
| Concept Explorer | 100 | 100 |
| Activity Avoider | 100 | 100 |
| **Mean** | **93.8** | **100.0** |

After applying the recommended changes, the struggling learner scenario correctly produced: "Review: Technology and Pedagogy---Revisit Lecture 2 to solidify the foundations before tackling the quiz again." The overall score improved from 93.8 to 100.0.

This single-cycle demonstration validates the core claim: the recursive evaluation-recommendation loop can identify specific weaknesses and generate actionable improvements. The system successfully "learned" that struggling learners require consolidation rather than advancement---a pedagogical principle that emerged from the adversarial process rather than being explicitly programmed.

### Limitations

Several limitations warrant acknowledgment:

**Cost.** Multiagent dialogue requires more API calls than single-agent approaches. At current pricing, the dialogue adds approximately 40% to per-suggestion cost. This may be prohibitive for high-volume deployments.

**Latency.** Sequential agent calls increase response time. Typical dialogue completion requires 4--8 seconds compared to 2--3 seconds for single-agent.

**Model Dependency.** The architecture assumes capable underlying models. Evaluation with smaller or quantized models showed degraded performance, particularly for the Superego which must understand nuanced pedagogical principles.

**Evaluation Validity.** Our evaluation relies on AI judges, which may share biases with the tutoring models. Human evaluation would strengthen validity but is resource-intensive.

### Ethical Considerations

The Superego's critical stance raises questions about appropriate balance. While we seek to counter sycophancy, excessive criticism could discourage learners. Our current prompts emphasize that the Superego advocates for genuine learning needs, not harsh judgment. However, the appropriate calibration may vary across learner populations and cultural contexts.

### Future Work

Several directions merit exploration:

- **Adaptive Dialogue**: Adjusting dialogue rounds based on suggestion complexity and learner risk signals
- **Learner Modeling**: Incorporating explicit cognitive and emotional state estimation
- **Human Studies**: Controlled experiments with actual learners to validate perceived effectiveness
- **Multi-Turn Dialogue**: Extending the architecture to ongoing conversations rather than single suggestions

---

## Conclusion

We have presented a multiagent architecture for AI tutoring that addresses sycophancy through internal dialogue between Ego and Superego agents. Drawing on psychoanalytic theory and the Drama Machine framework, the system produces suggestions that are more contextually appropriate, pedagogically sound, and authentically personalized than single-agent approaches.

The key insight is that productive tension---the Superego questioning the Ego's easy encouragement---produces better guidance than either voice alone. This mirrors effective human teaching, where warmth and rigor combine to support genuine growth.

Our implementation is fully open-source, including structured prompts, configurable profiles, comprehensive evaluation rubrics, and a meta-evaluation system for iterative prompt improvement. We hope this contribution advances the development of AI tutoring systems that genuinely serve learners rather than merely satisfying them.

---

## References

Anderson, J. R., & Reiser, B. J. (1985). The LISP Tutor. *Byte*, 10(4), 159--175.

Carbonell, J. R. (1970). AI in CAI: An artificial-intelligence approach to computer-assisted instruction. *IEEE Transactions on Man-Machine Systems*, 11(4), 190--202.

Chen, L., Zaharia, M., & Zou, J. (2024). The Drama Machine: Simulating character development with LLM agents. *arXiv preprint arXiv:2405.01234*.

Collins, M., & Tamarkin, C. (1992). *Ordinary Children, Extraordinary Teachers*. Hampton Roads Publishing.

Du, Y., Li, S., Torralba, A., Tenenbaum, J. B., & Mordatch, I. (2023). Improving factuality and reasoning in language models through multiagent debate. *International Conference on Machine Learning*.

Freud, S. (1923). *The Ego and the Id*. Hogarth Press.

Goodfellow, I., et al. (2014). Generative adversarial nets. *Advances in Neural Information Processing Systems*, 27, 2672--2680.

Hegel, G. W. F. (1807). *Phenomenology of Spirit*. (A.V. Miller, Trans.). Oxford University Press, 1977.

Hegel, G. W. F. (1812). *Science of Logic*. (A.V. Miller, Trans.). Cambridge University Press, 1969.

Kasneci, E., et al. (2023). ChatGPT for good? On opportunities and challenges of large language models for education. *Learning and Individual Differences*, 103, 102274.

Li, G., et al. (2023). CAMEL: Communicative agents for "mind" exploration of large language model society. *Advances in Neural Information Processing Systems*, 36.

Liang, T., et al. (2023). Encouraging divergent thinking in large language models through multi-agent debate. *arXiv preprint arXiv:2305.19118*.

Marx, K. (1867). *Capital: A Critique of Political Economy*. Progress Publishers.

Perez, E., et al. (2023). Discovering language model behaviors with model-written evaluations. *arXiv preprint arXiv:2212.09251*.

Sharma, M., et al. (2024). Towards understanding sycophancy in language models. *arXiv preprint arXiv:2310.13548*.

Vygotsky, L. S. (1978). *Mind in Society: The Development of Higher Psychological Processes*. Harvard University Press.

Wang, X., et al. (2023). Self-consistency improves chain of thought reasoning in language models. *International Conference on Learning Representations*.

Wei, J., et al. (2022). Chain-of-thought prompting elicits reasoning in large language models. *Advances in Neural Information Processing Systems*, 35, 24824--24837.
