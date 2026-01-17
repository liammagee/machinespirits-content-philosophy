---
title: "Socratic Dialogue & Experiment Activities"
week: 3
course: "test"
activities:
  - id: "test-socratic-1"
    type: "socratic"
    title: "Exploring Consciousness"
    description: "Engage in a Socratic dialogue about the nature of consciousness."
    instructions: "Respond thoughtfully to the AI tutor's questions. The dialogue will explore your understanding through guided questioning."
    points: 15
    dueOffset: 7
    config:
      topic: "the nature of consciousness and whether machines can be conscious"
      systemPrompt: |
        You are a Socratic tutor exploring the philosophy of mind and consciousness.
        Guide the student through questions about:
        - What defines consciousness?
        - Can consciousness be measured or detected?
        - What would it mean for a machine to be conscious?
        - How does the Chinese Room argument apply?

        Use the Socratic method: ask probing questions, challenge assumptions gently,
        and help the student discover insights through dialogue. Keep responses concise.
      minTurns: 4
      maxTurns: 10
      provider: "gemini"

  - id: "test-experiment-1"
    type: "experiment"
    title: "Social Dynamics Experiment"
    description: "Explore how different parameters affect agent behavior in a social simulation."
    instructions: "Form hypotheses, adjust parameters, observe behavior, and record your findings."
    points: 20
    dueOffset: 7
    config:
      mode: "RECOGNITION"
      baseParameters:
        rigidity: 0.2
        socialDrive: 0.5
        chaos: 0.3
      trials:
        - name: "Baseline"
          params: {}
          hypothesis: "With moderate parameters, agents will form loose groups"
        - name: "High Social Drive"
          params:
            socialDrive: 0.9
          hypothesis: "Agents will cluster tightly together"
        - name: "High Chaos"
          params:
            chaos: 0.8
          hypothesis: "Movement will become erratic and groups will disperse"
        - name: "High Rigidity"
          params:
            rigidity: 0.9
          hypothesis: "Agents will move in grid-like patterns"
      requiredObservations: 3
---

# Lecture 3: Socratic Dialogue & Experiment Activities

This lecture demonstrates the **Socratic Dialogue** and **Experiment** activity types.

## Socratic Dialogue Activities

Socratic dialogues use AI to guide students through philosophical inquiry:

- **AI-powered questioning** using Gemini, Claude, or OpenAI
- **Turn tracking** with minimum/maximum limits
- **Custom system prompts** for different topics
- **Transcript storage** for review

The AI takes on the role of a Socratic tutor, asking probing questions to help students discover insights through dialogue rather than direct instruction.

### Key Principles

1. **Question over answer**: The tutor guides through questions, not lectures
2. **Challenge assumptions**: Students examine the basis of their beliefs
3. **Discover insights**: Understanding emerges through dialogue
4. **Build on responses**: Each question builds on previous answers

## Experiment Activities

Experiment activities combine simulation with scientific observation:

- **Interactive simulations** with adjustable parameters
- **Preset trials** with guiding hypotheses
- **Observation recording** for each trial
- **Parameter controls** (rigidity, social drive, chaos)

Students form hypotheses, manipulate variables, observe outcomes, and record findings - learning through experimentation.

## Try It Out

1. Start a Socratic dialogue about consciousness
2. Engage thoughtfully - minimum 4 exchanges required
3. Then run the simulation experiment
4. Try each preset trial and record observations
5. Submit when you've completed the required observations
