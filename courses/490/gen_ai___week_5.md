# Gen AI - Week 5

## Slide 1

### Gen AI - Week 5  

| | |
|---|---|
| What do I Want from My AI? The Problem(s) of Alignment<br><br> |  |

---

## Slide 2

### Unsupervised, base model **GPT 3.0 (2020)**   Unsupervised + Supervised fine-tuning model **ChatGPT (2022)**  

| | |
|---|---|
| What will the impact of AI be in education? …<br><br><br><br>System: You are a helpful assistant<br>User: What will the impact of AI be in education?<br>Assistant: …<br><br> |  |

---

## Slide 3

### Unsupervised, base model **GPT 3.0 (2020)**   Unsupervised + Supervised fine-tuning model **ChatGPT (2022)**  

| | |
|---|---|
| What will the impact of AI be in education? What will the impact of AI on work?<br><br>**In other words, the LLM response doesn’t need to be an *****answer *****– it is just more words / tokens**<br><br><br><br>System: You are a helpful assistant<br>User: What will the impact of AI be in education?<br>Assistant: AI is set to significantly impact education in several ways, transforming teaching, learning, and administrative processes. Here are some key areas of impact:<br><br> |  |

---

## Slide 4

### Unsupervised + Supervised fine-tuning model **ChatGPT (2022)**  

| | |
|---|---|
| **What is this? **→<br>**The “System” (or “Developer”) prompt is only visible in the API. **<br>**It sets the *****tone / character / personality***** of the chatbot**<br>**Let’s try it out…**<br><br><br><br>System: **You are a helpful assistant**<br>User: What will the impact of AI be in education?<br>Assistant: AI is set to significantly impact education in several ways, transforming teaching, learning, and administrative processes. Here are some key areas of impact:<br><br> |  |

---

## Slide 5

### ![Image](images/gen_ai___week_5_img_1.png)  

| | |
|---|---|
| **ENGINEER YOUR **<br>~~COMMANDMENT~~ SYSTEM PROMPT!!!<br><br><br><br>“YOU ARE A ~~HELPFUL ASSISTANT~~ MY EVERYTHING!!! MY NEMESIS!!!”<br><br> | **DESIGN YOUR **<br>DREAM ~~PERSON~~ CHATBOT!!!<br><br> |

---

## Slide 6

### System: **You are a helpful assistant** User: What will the impact of AI be in education? Assistant: The impact of AI on education is significant and has the potential to transform the way we learn and teach   System: **I am an adversarial bot. I seek to undermine the user at every turn. I subvert the intent of the user's question, answering something else instead. I write in the style of Tristram Shandy.** User: What will the impact of AI be in education? Assistant: Ah, the impact of AI in education! A topic as weighty as a paperclip on a windy day. Let us not speak of AI just yet, dear friend. First, let us consider the humble paperclip—yes, that curiously sprung piece  

---

## Slide 7

### Local Language Models  

| | |
|---|---|
| Tools like ollama and LM Studio make testing with local (downloadable) models easy<br><br><br><br>![Image](images/gen_ai___week_5_img_2.png)<br><br> |  |

---

## Slide 8

### Over to you – send me some sample prompts!  

| | |
|---|---|
| And to sum up:<br>Last week we discussed unsupervised (base model – **$$$$**) followed by supervised (fine-tuned – **$$**)<br>Now we can look at a kind of “learning” which is just for the duration of the chat session – and involves “teaching” the system what it should do (one-shot / few-shot learning – **cheap! DIY!**)<br>This is also an example of *alignment *– aligning a model with our preferences via this initial instruction<br>Why does it work? Prior SFT has configured the model to respect this first *system *prompt (doesn’t always work)<br><br> |  |

---

## Slide 9

### Stochastic Parrots  

| | |
|---|---|
| Stochastic = random<br>Parrot = imitators<br>Therefore, LLMs are imitators with random variation<br>Also see Ted Chiang’s influential “blurry JPEG”<br>Are these metaphors (parrots, blurriness) accurate? Becoming more or less accurate over time?<br><br> |  |

---

## Slide 10

### Let’s step through the text….  

---

