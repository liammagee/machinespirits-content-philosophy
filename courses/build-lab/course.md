---
id: "build-lab"
title: "Build Lab"
subtitle: "Version control, interactive pages, agent-based models, test harnesses and AI tutors"
description: |
  A five-module tutorial for graduate students who want to build and ship
  small research software with AI assistance. One project runs through the
  whole sequence: a git repository that holds an interactive web page, the
  page runs a Schelling segregation model, a test harness keeps the
  vibe-coded parts honest, and a tutor chatbot explains the model to a
  learner.
image: "/markdown/courses/build-lab/build-lab-thumbnail.png"
instructor: "Liam Magee"
semester: "Ongoing"
institution: "University of Illinois Urbana-Champaign"
credits: 0
prerequisites: []
published: true
tags:
  - git
  - web development
  - agent-based models
  - simulation
  - testing
  - vibe coding
  - AI tutors
objectives:
  - Keep a project under version control, read its history, and recover from mistakes
  - Build a single-file interactive web page and serve it locally
  - Implement an agent-based model with a seeded random generator and separate it from its display
  - Write a test harness that checks code an AI assistant wrote, using invariants, determinism and metamorphic relations
  - Design, ground and evaluate a tutor chatbot, and know where the API key must not go
---

# Build Lab

Five modules. One project. By the end you will have a small piece of research software that you understand, can defend, and can hand to someone else.

The project is a segregation model after Thomas Schelling. It is small enough to build in an afternoon and rich enough to teach the whole toolchain. Each module adds one layer.

## The five modules

| Module | You will make | The skill underneath |
|---|---|---|
| 1. Version control with git | A repository with a readable history, local and on GitHub | Checkpoints, diffs, branches, and the habit of committing before asking an assistant for anything |
| 2. Building interactive web pages | One HTML file with a slider, a canvas and a loop | HTML, CSS and JavaScript as three jobs; serving a page locally; reading the browser console |
| 3. Interactive simulations: agent-based models | The Schelling model, with the model in its own file and the page as a view | Agents, rules, emergence; seeded randomness; separating model from display |
| 4. A test harness for vibe-coded applications | Fourteen checks that run in seconds, and a browser smoke test | Invariants, boundaries, determinism, metamorphic relations, property tests; what to ask an assistant for and what to refuse |
| 5. Strategies for building an AI tutor chatbot | A system prompt, a grounded tutor, a tiny server, and an evaluation set | Scaffolding, grounding in state, multiple voices, evaluation, and the key that never enters the page |

## How to use these modules

Each module has a hands-on section with commands you can paste, an exercise, and a short reading list. Do them in order. Module 3 embeds the finished simulation so you can compare your version with the reference. The reference code lives in this site's artifacts folder and is linked from modules 3 and 4.

You can work with any AI coding assistant. The modules assume you will, and they say at each step what to ask for, what to check, and what to keep for yourself. The short version: commit first, read the diff, run the tests, and keep the secrets out of the repository.

## What you need

- A computer with a terminal, git and Node.js (version 20 or later).
- A GitHub account.
- A text editor.
- For module 5, an Anthropic API key. The module explains where it goes and where it must not go.
