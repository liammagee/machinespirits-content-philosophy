---
title: "Reflection & Quiz Activities"
week: 1
course: "test"
activities:
  - id: "test-reflection-1"
    type: "reflection"
    title: "Introduction Reflection"
    description: "Write a brief reflection on your learning goals."
    instructions: "Consider what you hope to learn from this course and how it connects to your prior knowledge."
    points: 10
    dueOffset: 7
    config:
      minWords: 50
      maxWords: 300
      prompts:
        - "What are your primary learning objectives?"
        - "How does this topic connect to your prior experience?"
        - "What questions do you hope to answer?"

  - id: "test-quiz-1"
    type: "quiz"
    title: "LMS Concepts Quiz"
    description: "Test your understanding of basic LMS concepts."
    instructions: "Answer all questions to the best of your ability."
    points: 15
    dueOffset: 7
    config:
      shuffleQuestions: false
      showCorrectAnswers: true
      questions:
        - type: "multiple-choice"
          prompt: "What does LMS stand for?"
          options:
            - text: "Learning Management System"
              correct: true
              explanation: "LMS stands for Learning Management System, software that manages educational content."
            - text: "Logical Memory Structure"
              correct: false
              explanation: "This is not correct."
            - text: "Linear Measurement Scale"
              correct: false
              explanation: "This is not correct."
            - text: "Local Machine Service"
              correct: false
              explanation: "This is not correct."
        - type: "multiple-choice"
          prompt: "Which activity type involves AI-guided questioning?"
          options:
            - text: "Quiz"
              correct: false
              explanation: "Quizzes are pre-defined questions, not AI-guided."
            - text: "Reflection"
              correct: false
              explanation: "Reflections are student-written, not AI-guided."
            - text: "Socratic Dialogue"
              correct: true
              explanation: "Socratic Dialogues use AI to guide students through questioning."
            - text: "Code"
              correct: false
              explanation: "Code activities involve programming, not AI questioning."
---

# Lecture 1: Reflection & Quiz Activities

Welcome to the first test lecture! This lecture demonstrates the **Reflection** and **Quiz** activity types.

## Reflection Activities

Reflections allow students to express their thoughts, connect ideas, and engage in metacognitive thinking. Key features:

- Word count limits (min/max)
- Auto-save to localStorage
- Customizable prompts
- Due date tracking

## Quiz Activities

Quizzes assess knowledge through various question types:

- **Multiple Choice**: Single correct answer from options
- **Short Answer**: Free-text responses
- **Matching**: Pair items from two lists

Quizzes can be auto-graded for objective questions and provide explanations for correct/incorrect answers.

## Try It Out

Complete both activities below to test the functionality. Check that:
1. Your responses save correctly
2. Word counts update in real-time
3. Quiz feedback displays properly
4. Submissions appear in your dashboard
