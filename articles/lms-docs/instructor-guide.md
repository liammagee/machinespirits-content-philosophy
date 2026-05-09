---
title: "Instructor Guide"
category: "Documentation"
author: "Machine Spirits LMS"
date: "2024-12-16"
description: "Complete guide for instructors to set up and manage courses"
---

# Instructor Guide

Welcome to Machine Spirits LMS. This guide covers everything you need to create and manage courses using our markdown-based content authoring system.

## Quick Start

1. **Create a course file** in `markdown/courses/`
2. **Create lecture files** in `markdown/lectures/`
3. **Add activities** via YAML frontmatter
4. **Deploy** and students can enroll

---

## Course Structure Overview

```
markdown/
├── courses/
│   └── your-course.md      # Course definition
└── lectures/
    ├── course-lecture-1.md # Week 1 content
    ├── course-lecture-2.md # Week 2 content
    └── ...
```

---

## Creating a Course

Create a markdown file in `markdown/courses/` with YAML frontmatter:

```yaml
---
id: "my-course-101"           # Unique identifier (used in URLs)
title: "Introduction to AI"   # Display title
subtitle: "Foundations and Applications"
description: |
  A comprehensive introduction to artificial intelligence,
  covering machine learning, neural networks, and ethics.
image: "/markdown/images/ai-course.png"   # Course banner
instructor: "Dr. Jane Smith"
semester: "Spring 2025"
institution: "University Name"
credits: 3
prerequisites:
  - "CS 101"
  - "MATH 200"
tags:
  - artificial intelligence
  - machine learning
  - ethics
objectives:
  - Understand core AI concepts
  - Implement basic ML algorithms
  - Evaluate AI ethical implications
readings:
  - title: "Deep Learning"
    author: "Goodfellow et al."
    type: "book"
    url: "https://www.deeplearningbook.org/"
    required: true
  - title: "AI Ethics Guidelines"
    type: "article"
    url: "https://example.com/ethics"
---

# Introduction to AI

Course body content in markdown...
```

### Required Fields

| Field | Description |
|-------|-------------|
| `id` | Unique course identifier (URL-safe) |
| `title` | Course display name |

### Recommended Fields

| Field | Description |
|-------|-------------|
| `description` | Course description (multi-line with `|`) |
| `instructor` | Instructor name |
| `semester` | Term/semester |
| `image` | Course banner image path |
| `objectives` | Learning objectives array |

---

## Creating Lectures

Create lecture files in `markdown/lectures/` with the naming convention:
`{course-id}-lecture-{number}.md`

```yaml
---
title: "Neural Networks Fundamentals"
week: 3
course: "my-course-101"     # Must match course id
activities:                  # Optional activities array
  - id: "week3-quiz"
    type: "quiz"
    title: "Neural Network Concepts"
    points: 15
    # ... activity config
---

# Neural Networks Fundamentals

Lecture content in markdown...
```

### Lecture Fields

| Field | Description |
|-------|-------------|
| `title` | Lecture title |
| `week` | Week number (for ordering) |
| `course` | Course ID this lecture belongs to |
| `activities` | Array of activity definitions |

---

## Activity Types

Machine Spirits supports multiple activity types. Each activity is defined in the lecture frontmatter.

### Common Activity Fields

```yaml
activities:
  - id: "unique-activity-id"    # Required: unique identifier
    type: "reflection"           # Required: activity type
    title: "Activity Title"      # Required: display title
    description: "Brief desc"    # Optional: shown to students
    instructions: "Full text"    # Optional: detailed instructions
    points: 10                   # Optional: point value
    dueOffset: 7                 # Optional: days after lecture date
    config:                      # Type-specific configuration
      # ... config options
```

---

### Reflection Activity

Free-form written reflection with word limits.

```yaml
- id: "week1-reflection"
  type: "reflection"
  title: "Learning Goals Reflection"
  description: "Reflect on your learning objectives"
  points: 10
  config:
    minWords: 100
    maxWords: 500
    prompts:
      - "What do you hope to learn?"
      - "How does this connect to your experience?"
```

**Config Options:**
- `minWords`: Minimum word count (default: 50)
- `maxWords`: Maximum word count (default: 1000)
- `prompts`: Array of reflection prompts

---

### Quiz Activity

Automated assessment with multiple question types.

```yaml
- id: "week2-quiz"
  type: "quiz"
  title: "Chapter 2 Quiz"
  points: 20
  config:
    shuffleQuestions: false
    showCorrectAnswers: true
    questions:
      # Multiple Choice
      - type: "multiple-choice"
        prompt: "What is machine learning?"
        options:
          - text: "A type of AI"
            correct: true
            explanation: "ML is a subset of AI."
          - text: "A programming language"
            correct: false
            explanation: "ML is a methodology, not a language."

      # Short Answer
      - type: "short-answer"
        prompt: "Define supervised learning."
        rubric: "Accept answers mentioning labeled data and prediction."

      # Matching
      - type: "matching"
        prompt: "Match terms with definitions:"
        pairs:
          - left: "Neural Network"
            right: "Interconnected nodes"
          - left: "Gradient Descent"
            right: "Optimization algorithm"
```

**Question Types:**
- `multiple-choice`: Single correct answer
- `short-answer`: Free-text response
- `matching`: Pair items from two lists

---

### Code Activity

Programming exercises with test runner and AI review.

```yaml
- id: "week3-code"
  type: "code"
  title: "Implement Binary Search"
  points: 25
  config:
    language: "javascript"      # python, javascript, typescript
    starterCode: |
      function binarySearch(arr, target) {
        // Your code here
      }
    testCases:
      - name: "Basic test"
        input: "[1,2,3,4,5], 3"
        expectedOutput: "2"
      - name: "Not found"
        input: "[1,2,3], 4"
        expectedOutput: "-1"
        hidden: true            # Hidden from students
    hints:
      - "Use two pointers: left and right"
      - "Calculate mid = Math.floor((left + right) / 2)"
    aiReview:
      enabled: true
      provider: "claude"        # claude, openai, gemini
```

**Config Options:**
- `language`: Programming language
- `starterCode`: Initial code template
- `testCases`: Array of test cases
- `hints`: Progressive hint system
- `aiReview.enabled`: Enable AI code review

---

### Annotate Activity

Text annotation and critical reading.

```yaml
- id: "week4-annotate"
  type: "annotate"
  title: "Critical Reading: AI Ethics"
  points: 15
  config:
    sourceTitle: "The Ethics of AI"
    sourceText: |
      Artificial intelligence raises profound ethical questions...
      [Full text to annotate]
    minAnnotations: 5
    maxAnnotations: 20
    requiredTypes:
      - "claim"
      - "evidence"
    enableSynthesis: true
    synthesisPrompt: "Summarize the main argument and your analysis."
```

**Annotation Types:**
- `claim`: Identify main arguments
- `evidence`: Mark supporting evidence
- `question`: Note questions/uncertainties
- `connection`: Link to other concepts
- `insight`: Personal insights

---

### Socratic Activity

AI-guided philosophical dialogue.

```yaml
- id: "week5-socratic"
  type: "socratic"
  title: "Exploring Consciousness"
  points: 15
  config:
    topic: "the nature of consciousness and AI"
    systemPrompt: |
      You are a Socratic tutor exploring philosophy of mind.
      Ask probing questions and challenge assumptions.
    minTurns: 5
    maxTurns: 15
    provider: "gemini"          # gemini, claude, openai
```

---

### Experiment Activity

Interactive simulation with observation recording.

```yaml
- id: "week6-experiment"
  type: "experiment"
  title: "Social Dynamics Lab"
  points: 20
  config:
    mode: "RECOGNITION"
    baseParameters:
      rigidity: 0.2
      socialDrive: 0.5
      chaos: 0.3
    trials:
      - name: "Baseline"
        params: {}
      - name: "High Social Drive"
        params:
          socialDrive: 0.9
    requiredObservations: 3
```

---

### Simulation Activity

Hegelian social simulation with multiple scenarios.

```yaml
- id: "week7-simulation"
  type: "simulation"
  title: "Recognition and Alienation"
  points: 25
  config:
    scenario: "recognition"
    reflectionPrompts:
      - "What patterns emerge in the simulation?"
      - "How do these dynamics reflect real social phenomena?"
    minObservations: 3
    allowParameterControl: true
    conceptualFramework: "Hegelian Phenomenology"
```

**Scenarios:**
- `recognition`: Mutual acknowledgment
- `alienation`: Social isolation
- `reification`: Object-like behavior
- `dialectic`: Thesis-antithesis-synthesis
- `emergence`: Complex emergent behavior
- `custom`: User-defined parameters

---

## Grading

### Automatic Grading

Quiz activities with objective questions are auto-graded. Points are awarded based on correct answers.

### Manual Grading

Access the instructor dashboard to:
1. View all submissions
2. Grade short-answer and reflection activities
3. Add feedback comments

### Grade Passback

Grades appear in the student dashboard with:
- Points earned/total
- Letter grade calculation
- Per-course breakdown

---

## Best Practices

### Activity Design

1. **Clear instructions**: Write detailed, unambiguous instructions
2. **Appropriate difficulty**: Match activity complexity to learning objectives
3. **Scaffolded learning**: Build activities progressively
4. **Meaningful points**: Align point values with effort/importance

### Content Organization

1. **Consistent naming**: Use `{course}-lecture-{week}` convention
2. **Logical progression**: Order lectures by week number
3. **Mixed activities**: Vary activity types within lectures
4. **Regular assessment**: Include activities in most lectures

### Engagement

1. **Reflection prompts**: Ask thought-provoking questions
2. **AI integration**: Leverage Socratic dialogues for deep learning
3. **Simulations**: Use interactive elements for abstract concepts
4. **Code practice**: Include hands-on programming when relevant

---

## Troubleshooting

### Activity Not Appearing

- Check `course` field matches course ID exactly
- Verify YAML syntax is valid
- Ensure activity has required fields (`id`, `type`, `title`)

### Quiz Not Auto-Grading

- Verify multiple-choice options have `correct: true/false`
- Check question `type` is spelled correctly

### Code Tests Failing

- Test cases must have `name`, `input`, `expectedOutput`
- JavaScript/TypeScript only for browser execution

---

## Support

For technical issues or feature requests:
- GitHub: [machine-spirits/issues](https://github.com/lmagee/machine-spirits/issues)
- Documentation: [/articles/instructor-guide](/articles/instructor-guide)

---

*Version 1.0 - December 2024*
