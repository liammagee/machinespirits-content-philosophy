# Bolashak - Week 1

## Slide 1

### Reviewing AI  

| | |
|---|---|
| A Series of Distinctions<br><br> |  |

---

## Slide 2

### Interlude: Installing Ollama (a Local AI server)  

| | |
|---|---|
| Steps:<br>Visit https://ollama.com/<br>Download for your platform (Windows, macOS, Linux)<br>Open Command Line (Windows) or Terminal (macOS, Linux)<br>Enter:<br>ollama run llama3.2:3b<br>ollama run deepseek-r1:8b<br>ollama run phi4<br>Wait! Language models take time to download. Then use your local LLM…<br><br> |  |

---

## Slide 3

### High level Overview: AI vs?  

| | |
|---|---|
| Artificial Intelligence<br><br> | Natural Intelligence?<br><br>Inspirations: Philosophy of Mind, Cybernetics, Psychoanalysis, Childhood Psychology, Neural & Cognitive Science, Literature, Drama, Game Theory…<br><br>But is there **consensus** on what intelligence is?<br><br> |

---

## Slide 4

### High level Overview: AI vs?  

| | |
|---|---|
| Artificial Intelligence<br><br> | Artificial Stupidity?<br>“It is claimed that the interrogator could distinguish the machine from the man simply by setting them a number of problems in arithmetic. The machine would be unmasked because of its deadly accuracy.”<br>*— Turing, 1950, “Computing Machinery and Intelligence”.*<br>“Artificial Intelligence has achieved super-human performance in some tasks, such as arithmetic or games; in this article we argue that sometimes AI’s ability might need to be artificially constrained. Such deliberate limiting is called Artificial Stupidity.”<br>* – Trazzi, M., & Yampolskiy, R. V. (2020). Artificial stupidity: Data we need to make machines our equals. Patterns, 1(2)*<br>For a Philosophy of Stupidity / Bêtise: Avital Ronell, Bernard Stiegler.<br><br> |

---

## Slide 5

### AI – What Is It?  

| | |
|---|---|
| Symbolic Reasoning<br><br> | Connectionist Reasoning<br><br> |

---

## Slide 6

### AI – What Is It? Symbolism vs Connectionism  

| | |
|---|---|
| Symbolic Reasoning - Deduction<br>All men are mortal<br>Socrates is a man<br>Socrates is mortal<br><br>**Modus Ponens**<br>All A are B (or "if A, then B")<br>C is A<br>Therefore C is B )<br>**Example: Semantic Web; “Reasoning” Language Models?**<br><br> | Connectionist Reasoning - Induction<br>If “men” and “mortal” appear in the **same sentence**, assume they are connected (semantically, grammatically etc)<br>Freudian free association (some meaningful relationship due to contiguity:<br>”It is a rule of psycho-analytic technique that an internal connection which is still undisclosed will announce its presence by means of a contiguity—a temporal proximity—of associations; just as in writing, if ‘a’ and ‘b’ are put side by side,  it means that the syllable ‘ab’ is to be formed out of them.” <br>– Freud, S. (1997). Dora: An Analysis of a Case of Hysteria. Simon and Schuster.<br>Markov Chains - relationship between letters, next letter prediction <br>Markov, A. A. (2006[1913]). An example of statistical investigation of the text Eugene Onegin concerning the connection of samples in chains. Science in Context, 19(4), 591-600.**Example: ChatGPT**<br><br> |

---

## Slide 7

### Connectionism: Supervised vs Unsupervised Learning  

| | |
|---|---|
| Supervised Learning<br>Statistics: Linear Regression, Correlations. Is this Hypothesis True?<br>Machine Learning: **classify **this text / image<br>*Discriminative (this ****or**** that – cat ****or**** dog)*<br><br> | Unsupervised Learning<br>Statistics: Factor Analysis, Principal Component Analysis – What’s in this Data?<br>Machine Learning: **predict** or **generate **next token<br>*Generative (what comes ****next****? Next token prediction)*<br><br> |

---

## Slide 8

### Unsupervised Learning: Trained (Specialised) vs Pre-trained (General)  

| | |
|---|---|
| Trained<br>**Data **from a specialized field or domain<br>**Train** a model to understand the data<br>Test model **prediction** reproduces the training data<br>**Do not expect generalization** (to other data sets)<br><br> | Pre-trained<br>Very large data set from many domains / fields / languages2. Train a model to understand general patterns in the data3. Test model prediction reproduces the training data4. **Do expect generalization** (to other data sets)5. **Fine-tune** for specialization – or other techniques<br><br> |

---

## Slide 9

### Unsupervised Learning: Trained (Specialised) vs Pre-trained (General)  

| | |
|---|---|
| Trained<br>**Data **from a specialized field or domain<br>**Train** a model to understand the data<br>Test model **prediction** reproduces the training data<br>**Do not expect generalization** (to other data sets)<br><br> | Pre-trained<br>Very large data set from many domains / fields / languages2. Train a model to understand general patterns in the data3. Test model prediction reproduces the training data4. **Do expect generalization** (to other data sets)5. **Fine-tune** for specialization – or other techniques… Generalized Pre-Training model = “GPT” for short<br><br> |

---

## Slide 10

### Pre-trained (General): Base vs Instruct / Aligned Models  

| | |
|---|---|
| Base model (GPT-3 - 2020)<br>“as-is”*<br>* But it is biased, unaligned with human values, so…<br><br> | Instruct Model (GPT-3.5, ChatGPT - 2022)<br>1. Take the base model, and generate many statements<br> 2. Have humans score those statements on criteria: Helpful, Truthful, Harmless<br> 3. Re-train the model, providing "rewards" as its outputs measure closer to "good" statements<br>Ouyang, et al (2022). *Training language models to follow instructions with human feedback*. Advances in neural information processing systems, 35, 27730-27744.<br>Reinforcement Learning<br>	 - with Human Feedback (RLHF)<br>	 - with AI Feedback (RLAIF)<br><br> |

---

## Slide 11

### More things…  

| | |
|---|---|
| In-context “training”<br>**Fine-tuning**<br>Or **give examples** in a prompt <br>No examples = Zero-shot learning<br>1 example = One-shot  learning<br>Few examples = Few-shot learningGPT-3: Brown, T., et al. (2020). *Language models are ****few-shot**** learners*. Advances in neural information processing systems, 33, 1877-1901.<br><br> | Retrieval-Augmented Generation<br>I want to know what I was thinking when I was happy…<br>But GPT doesn’t know my style / facts about my life etc.<br>Fortunately my life is recorded in Dropbox…Can I (a) search Dropbox for happy memories, and add these as context to GPT?<br>Steps:<br>Do Semantic Search<br>Retrieve relevant excerpts<br>Add these excerpts to my prompt<br>GPT can answer due this **new context**<br>**Note: relevant for Literature Reviews, Qualitative Data Analysis!!**<br><br> |

---

## Slide 12

### Closed vs Open Source  

| | |
|---|---|
| Closed<br>“Open”AI?<br>GPT-1, GPT-2: open source<br>GPT-3 onwards: closed source<br>Anthropic’s Claude<br>Google Gemini<br><br> | Open<br>GPT-NEO<br>Llama (Meta)<br>Mistral<br>DeepSeek<br>Qwen (Alibaba)<br>Phi (Microsoft)<br><br> |

---

## Slide 13

### Remote (Service) vs Local (similar to Closed vs Open)  

| | |
|---|---|
| RemoteLarge models<br>Data is online - may be used for training (fails IRB tests)<br>Monthly subscription <br>Additional features<br>Examples: ChatGPT,  Anthropic’s Claude, Google Gemini, DeepSeek, OpenRouter<br><br> | Local<br><br>Small models only<br>Data is offline - private, secure,<br>Hardware costs (Macbook or NVidia GPUs)<br>Relies upon open source software<br>Examples: Llama, DeepSeek, Phi, etc<br><br> |

---

## Slide 14

### Chat vs API  

| | |
|---|---|
| Chat<br>Web Interface<br>Non-technical<br>Less customization<br>Pay by month<br><br> | API<br>Code Interface (Python / JavaScript)<br>Some coding required<br>Can be integrated into apps, websites, devices, drones etc<br>Pay by token<br><br> |

---

## Slide 15

### Training vs Inference Time  

| | |
|---|---|
| Regular Model<br>(OpenAI GPT-4o; DeepSeek-v3)<br>Expensive Training<br>Cheap Inference<br>Next token prediction<br><br> | Thinking Model <br>(OpenAI o1, o3; DeepSeek-R1)<br>Expensive Training<br>Expensive Inference (“Thinking”)<br>Next token prediction…<br>Then review….<br>Then predict again<br>Kahneman, D. (2011). Thinking, fast and slow. *Farrar, Straus and Giroux*.<br><br> |

---

## Slide 16

### Other Considerations  

| | |
|---|---|
| Free vs Paid<br>Text vs Multimodality (Images, video)<br>Geopolitics of AI: US / China / EU / ???<br>Need to stay on “cutting edge” for research / work? Consider access to ChatGPT Plus (perhaps Claude / Google Gemini)<br><br> | Tools<br>Web Search<br>Voice interface<br>Code Execution<br>Computer control (Agents)<br>Task reminders<br>Project organization<br>Collaboration<br>Deep Research<br>Memorization / Personalization<br><br> |

---

## Slide 17

### To Explore…  

| | |
|---|---|
| Large Language Models<br>OpenAI ($20 per month (Plus) / $200 per month (Pro))<br>Anthropic Claude <br>Google Gemini<br>DeepSeek<br>QwenChat<br>Meta.ai <br>Grok (x.com)<br>Microsoft Co-pilot<br>Mistral<br><br> | Tools<br>**Search**: Perplexity<br>**Summarization**: NotebookLM <br>**Research Assistance**: Google DeepResearch / OpenAI DeepResearch<br>**Multiple AI models**: Poe / OpenRouter (CGScholar)<br>**Image Generators**: Midjourney<br>**Voice**: ElevenLabs<br>**Video**: Kling, Luma Labs<br><br> |

---

## Slide 18

### Other Considerations  

| | |
|---|---|
| Free vs Paid<br>Text vs Multimodality (Images, video)<br>Geopolitics of AI: US / China / EU / ???<br>Legality (can DeepSeek be used? downloaded?)<br>Model augmentations (code execution, project management, collaboration, etc etc) <br>& associated effects of vendor lock-in<br><br> | Need to stay on “cutting edge” for research / work? Consider access to ChatGPT Plus (perhaps Claude / Google Gemini)<br><br> |

---

## Slide 19

### Prompting and Role-playing  

| | |
|---|---|
| Prompting<br>**How** do we talk to AI?<br>“Explain it to me like I’m 5 years old”<br>“Here’s an example”<br>“Here are a series of documents. Compare and contrast”.<br>“Develop a structure / conceptual map for my literature review…”<br>“Review my draft and give me critical feedback…”<br>“Here’s my draft. I’ve got writer’s block. Give me some inspiration.”<br>“Here’s my first draft, some feedback, and follow-up draft. Have I addressed everything?”<br><br> | Role-playing in Research<br>**Who** is the AI? “I am an expert / a student“<br>Your Co-pilot / Co-worker / Colleague?<br>Your (Anonymous) Critic?<br>Your Student?<br>Your Advisor, Mentor or Boss?<br>Your Research Assistant? <br>Your Research Participant?<br>**Which models** respond best to **different roles**?<br><br> |

---

## Slide 20

### More ideas?  

| | |
|---|---|
| Prompting<br>**What** do you find works well?<br><br> | AI In General<br>**What** do you think will happen next?<br><br> |

---

