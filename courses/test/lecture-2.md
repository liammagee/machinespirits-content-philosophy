---
title: "Code & Annotate Activities"
week: 2
course: "test"
activities:
  - id: "test-code-1"
    type: "code"
    title: "FizzBuzz Challenge"
    description: "Implement the classic FizzBuzz problem in JavaScript."
    instructions: |
      Write a function that returns an array of numbers from 1 to n, but:
      - For multiples of 3, return "Fizz" instead of the number
      - For multiples of 5, return "Buzz" instead of the number
      - For multiples of both 3 and 5, return "FizzBuzz"
    points: 20
    dueOffset: 7
    config:
      language: "javascript"
      starterCode: |
        function fizzBuzz(n) {
          // Your code here
          const result = [];

          // Loop from 1 to n
          // Check divisibility and push appropriate value

          return result;
        }

        // Test it
        return fizzBuzz(15);
      testCases:
        - name: "Basic test (n=5)"
          input: "5"
          expectedOutput: "[1, 2, \"Fizz\", 4, \"Buzz\"]"
        - name: "FizzBuzz at 15"
          input: "15"
          expectedOutput: "FizzBuzz"
          hidden: true
      hints:
        - "Use the modulo operator (%) to check divisibility"
        - "Check for FizzBuzz (divisible by both) before checking individual cases"
        - "Remember to convert numbers to strings when needed"
      aiReview:
        enabled: true
        provider: "claude"
        systemPrompt: "Review this JavaScript code for a FizzBuzz implementation. Focus on correctness, code style, and any edge cases."
      allowExecution: true
      theme: "dark"

  - id: "test-annotate-1"
    type: "annotate"
    title: "Critical Reading: AI in Education"
    description: "Annotate this passage about AI in education."
    instructions: "Read carefully and mark claims, evidence, and questions."
    points: 15
    dueOffset: 7
    config:
      sourceTitle: "The Promise and Peril of AI in Education"
      sourceText: |
        Artificial intelligence is transforming education in profound ways. Proponents argue that AI tutoring systems can provide personalized learning experiences at scale, adapting to each student's pace and style. Studies have shown that AI-powered adaptive learning platforms can improve student outcomes by 20-30% compared to traditional instruction.

        However, critics raise important concerns. The reliance on AI may diminish the human connection essential to education. Teachers bring empathy, creativity, and moral guidance that algorithms cannot replicate. Furthermore, AI systems trained on biased data may perpetuate or amplify existing inequalities in educational access and outcomes.

        The question is not whether AI will play a role in education, but how we can harness its benefits while mitigating its risks. This requires thoughtful policy, ongoing research, and a commitment to keeping human flourishing at the center of educational technology.
      minAnnotations: 3
      maxAnnotations: 15
      requiredTypes:
        - "claim"
        - "evidence"
      enableSynthesis: true
      synthesisPrompt: "Based on your annotations, summarize the main argument and evaluate the strength of the evidence presented."
---

# Lecture 2: Code & Annotate Activities

This lecture demonstrates the **Code** and **Annotate** activity types.

## Code Activities

Code activities provide an interactive programming environment with:

- **Syntax highlighting** for multiple languages (JS, Python, TS, HTML, CSS)
- **Test runner** with sandboxed execution
- **AI code review** powered by Claude Sonnet
- **Hints system** for progressive assistance
- **Starter code** templates

### AI Code Review

The AI review feature analyzes your code for:
- Correctness and logic errors
- Code style and readability
- Best practices
- Potential improvements

## Annotate Activities

Annotation activities help students engage deeply with text through:

- **Text selection** to highlight passages
- **Annotation types**: Claim, Evidence, Question, Connection, Insight
- **Comments** to explain annotations
- **Synthesis** to summarize understanding

This activity type is particularly useful for close reading and critical analysis.

## Try It Out

1. Complete the FizzBuzz coding challenge
2. Run your code to test it
3. Request an AI review to get feedback
4. Then annotate the AI in Education passage
5. Write a synthesis based on your annotations
