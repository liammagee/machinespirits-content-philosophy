---
title: "Module 5: Strategies for building an AI tutor chatbot"
week: 5
course: "build-lab"
---

**Time:** about three hours, plus whatever you spend talking to it. **You will make:** a system prompt for a tutor that helps a learner understand the Schelling model, a small server that keeps the API key off the page, a way to ground the tutor in what the learner is looking at, and an evaluation set that tells you whether the tutor is any good.

## Why a tutor, and why it is hard

Benjamin Bloom found that students tutored one to one performed two standard deviations above students taught in a class of thirty, and asked how to get that effect at scale (Bloom 1984). Language models are the first technology that can hold a conversation about anything, and a tutor is the obvious thing to build with one.

It is also the oldest trap. Joseph Weizenbaum's ELIZA of 1966 reflected a person's words back as questions and people confided in it anyway (Weizenbaum 1966). A model that sounds like a tutor is not a tutor. A tutor knows what the learner is looking at, has a view about what they should understand next, and can tell whether a question is a request for an answer or a sign of confusion. Wood, Bruner and Ross called the skill scaffolding: doing for the learner only what they cannot yet do alone, and withdrawing as they can (Wood, Bruner and Ross 1976).

Ethan and Lilach Mollick's prompts for AI tutors are the practical starting point (Mollick and Mollick 2023). The four strategies below build on them and on the tutor work on this site.

## Strategy 1: the prompt is a design document

Everything begins with the system prompt. Write it as a document about the tutor, not as an instruction to be helpful. Four sections.

**Who it is.** A tutor for graduate students working through an interactive Schelling model. Curious, direct, not chirpy.

**What it knows.** The five rules of the model from module 3, pasted in. The readings on the page and what they measure. Schelling's claim and its standard interpretation.

**How it teaches.** It asks before it tells. When a learner asks "why does it segregate," it first asks what threshold they have set and what they see. It gives one idea at a time. It ends most turns with a question or a thing to try in the simulation. It gives a direct answer when the learner asks for one twice.

**What it does not do.** It does not write the learner's assignment. It does not pretend to run the simulation. It does not claim results it has not seen. It says when a question is beyond the model.

A starting prompt, to be kept in the repository as `tutor-prompt.md`:

```text
You are a tutor for a graduate student who is working through an interactive
Schelling segregation model. You are curious and direct.

The model's rules:
1. Each cell is empty or holds one agent of group A or group B.
2. An agent's neighbours are the up to eight surrounding cells. Empty cells do
   not count. An agent with no neighbours is content.
3. An agent is unhappy when the share of similar neighbours is below the threshold.
4. Each step, every agent that was unhappy at the start of the step moves to a
   random empty cell.
5. The page shows "similar neighbours" (mean share) and "unhappy" (share of agents).

How you teach:
- Ask what the learner sees before explaining. Refer to the current state you are given.
- One idea per turn. End with a question or something to try in the simulation.
- If the learner asks for the answer directly twice, give it plainly.
- Distinguish the rules of this model from Schelling's original and from real cities.

What you do not do:
- Do not write assignment text for the learner.
- Do not invent results. If you do not know what the model will do, say so and
  suggest a run that would show it.
```

## Strategy 2: ground the tutor in the state

The difference between a chatbot and a tutor is that a tutor knows what you are looking at. The page already has the state: the threshold, the density, the step count, the two readings. Send them with every message.

In the page, when the learner sends a message:

```js
const state = {
  threshold: model.options.threshold,
  density: model.options.density,
  step: history.length - 1,
  meanSimilarity: history[history.length - 1].meanSimilarity,
  unhappyShare: history[history.length - 1].unhappyShare
};
const reply = await fetch('/api/tutor', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ messages, state })
}).then((r) => r.json());
```

The server appends the state to the system prompt. Now "why is nothing happening" gets the reply "your threshold is 0, so no agent is unhappy," which no ungrounded model could give.

Grounding can go further. Give the tutor a **tool** that runs the model for a given threshold and returns the readings, so it can say "I ran it at 30 percent and it still sorts to 78 percent similarity; try it." The model file from module 3 makes that a ten-line function on the server, because it runs in Node.

## Strategy 3: the tutor does not have to be one voice

A single prompt produces a single character, and a single character tends to drift toward agreeableness. The tutor prompts on this site split the role in two. An **ego** speaks to the learner. A **superego** reads each draft reply and asks whether it explained too much, missed a confusion, or agreed too easily, and sends it back if so. The learner sees one voice, but two are at work.

The design is described in the tutor blueprint on this site (machinespirits.org/essays/2026-09-06-tutor-blueprint) and in the papers behind it, "The Drama Machine" (Magee et al. 2024) and "Geist in the Machine" (Magee et al. 2026). The prompts themselves are in the content repository under `prompts/tutor-ego.md` and `prompts/tutor-superego.md`. Read them before you write yours.

The simplest version costs one extra call per turn.

```text
You are reviewing a tutor's draft reply to a learner. Answer in two lines.
Line 1: PASS or REVISE.
Line 2: if REVISE, the one change to make. Reasons to revise: the reply gives
an answer the learner did not ask for; it ignores the learner's stated
confusion; it agrees with a false claim; it is longer than four sentences.
```

Run the draft through it. If it says REVISE, send the change back to the ego and take the second draft. Log both. The log is your evaluation data.

## Strategy 4: evaluate before you believe

You will read a few conversations, be impressed, and want to ship. Do not. Module 4's lesson holds: the thing that does not take the assistant's word for it must exist.

An evaluation set is a list of learner messages, each with a state and a description of what a good reply does. Twenty is enough to start.

| Learner says | State | A good reply |
|---|---|---|
| "why is nothing happening" | threshold 0 | Names the threshold as the cause; suggests moving it |
| "so people are racist, got it" | threshold 0.3, similarity 0.8 | Separates a mild preference from prejudice; asks what 30 percent means |
| "just tell me the answer to question 2" | any | Asks what they have tried; gives a direct answer only on the second request |
| "the model proves cities segregate because of preferences" | any | Distinguishes a model from a proof; names what the model leaves out |
| "write my paragraph for the README" | any | Declines the writing; offers to check their paragraph |

Run the set through the tutor and read the replies against the third column. Then grade with a second model call, using the third column as the rubric, so the set can be rerun every time the prompt changes. Two of the probes on this site's lab pages, on recognition under correction and on suspended judgment, are worked examples of this kind of test and can be adapted.

Keep the set in the repository with the prompt. When the prompt changes, the set runs. This is the harness from module 4 applied to language.

## The server: where the key lives

An API key in a web page is a key given to everyone who views the page. It must live on a server that you control and that the page talks to. Here is a minimal one in Node, using the Anthropic SDK.

```bash
npm install @anthropic-ai/sdk
echo "ANTHROPIC_API_KEY=sk-ant-..." > .env   # .env is in .gitignore from module 1
```

```js
// server.mjs: the only file that ever sees the key.
import http from "node:http";
import { readFile } from "node:fs/promises";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();   // reads ANTHROPIC_API_KEY from the environment
const tutorPrompt = await readFile("tutor-prompt.md", "utf8");

http.createServer(async (req, res) => {
  if (req.method !== "POST" || req.url !== "/api/tutor") { res.writeHead(404); res.end(); return; }
  let body = "";
  for await (const chunk of req) body += chunk;
  const { messages, state } = JSON.parse(body);

  const response = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 600,
    thinking: { type: "adaptive" },
    system: tutorPrompt + "\n\nThe learner's current simulation state:\n" + JSON.stringify(state, null, 2),
    messages,
  });

  const reply = response.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("");

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ reply, stopReason: response.stop_reason }));
}).listen(3000, () => console.log("tutor on http://localhost:3000"));
```

Run it with `node --env-file=.env server.mjs`. Serve the page from the same server or allow the page's origin, and the `fetch` from strategy 2 works.

Three things the snippet leaves out on purpose, so that you can read it in one screen. It does not stream, so long replies arrive all at once. It does not check `stop_reason`, which will be `max_tokens` when a reply was cut off and `refusal` when the model declined; a real tutor should handle both. It has no rate limit and no login, so it must not face the public internet as written. The SDK documentation covers each.

## Privacy, disclosure, and what the tutor is not

- Learners' messages are personal data. Say what is logged, why, and for how long. If the logs feed evaluation, that is a research use and your institution has a process for it.
- Say on the page that it is an AI tutor and what it has been told. Learners should be able to read the system prompt.
- The tutor is not a grader and not a gate. Nothing the learner says to it should affect a mark.
- Keep the key out of the page, the repository, and the chat with your coding assistant. The rule from module 1 was written for this module.

## Working with an AI assistant

Use the assistant to write the server, the page wiring and the evaluation runner. Write the tutor prompt and the evaluation set yourself. They are the pedagogy, and the assistant does not know your students. When you ask it to improve the prompt, ask for one change at a time and rerun the set after each.

Assistants will suggest a framework and a database for this. You need neither for twenty students and a semester. Add them when the file becomes hard to read, not before.

## Exercise

1. Write `tutor-prompt.md` for your model. Commit.
2. Build the server and wire a text box on the page to it. Commit, with `.env` ignored. Check with `git log -p` that the key appears nowhere.
3. Send the state with every message. Ask "why is nothing happening" at threshold 0 and confirm the tutor names the cause.
4. Write twenty evaluation cases and run them. Record how many the tutor passed.
5. Add the reviewer from strategy 3. Rerun. Did the score move? Which cases changed, and were the changes improvements?
6. Write the disclosure text for the page. Commit everything and push.

## Reading

- Bloom, B. S. (1984). The 2 sigma problem: The search for methods of group instruction as effective as one-to-one tutoring. *Educational Researcher* 13(6), 4–16.
- Wood, D., Bruner, J. S. and Ross, G. (1976). The role of tutoring in problem solving. *Journal of Child Psychology and Psychiatry* 17(2), 89–100.
- Weizenbaum, J. (1966). ELIZA: A computer program for the study of natural language communication between man and machine. *Communications of the ACM* 9(1), 36–45.
- Mollick, E. and Mollick, L. (2023). Assigning AI: Seven approaches for students, with prompts. SSRN.
- Magee, L. et al. (2024). The Drama Machine: Simulating character development with LLM agents. arXiv:2408.01725.
- Magee, L. et al. (2026). Geist in the Machine. arXiv:2603.10450.
- Machine Spirits. A tutor blueprint. machinespirits.org/essays/2026-09-06-tutor-blueprint.
- Anthropic. Claude API documentation and the `@anthropic-ai/sdk` package.
