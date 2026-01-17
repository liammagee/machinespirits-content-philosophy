# Dissertation - AI, Bias, Alignment & Other Topics

## Slide 1

| | |
|---|---|
| AI, Bias, Alignment<br><br><br><br>(& Other Topics!)<br><br> |  |

---

## Slide 2

### Let’s start with an old story…   ![Image](images/dissertation___ai__bias__alignment___other_topics_img_1.png)  

| | |
|---|---|
| 1833 Alexander Pushkin visited Uralsk (https://adebiportal.kz/en/news/view/alexander-pushkin-215-anniversary__8687)<br>In the same year he published *Eugene Onegin *as a single volume<br><br> |  |

---

## Slide 3

### ![Image](images/dissertation___ai__bias__alignment___other_topics_img_2.png)   Towards AI: Andrey Markov (1856 - 1922)  

| | |
|---|---|
| Developed Markov Chains - key to many disciplines even today (Google “Monte Carlo Markov Chains (MCMCs)”)<br>First known “language model” - 1913: First 20,000 characters of Eugene Onegin<br><br><br><br>![Image](images/dissertation___ai__bias__alignment___other_topics_img_3.png)<br><br> |  |

---

## Slide 4

### ![Image](images/dissertation___ai__bias__alignment___other_topics_img_4.png)  

---

## Slide 5

### ![Image](images/dissertation___ai__bias__alignment___other_topics_img_5.png)   (Apologies for English language bias!)  Let’s start with the letter ‘s’.   What follows?  (Can someone keep count?)  

---

## Slide 6

### ![Image](images/dissertation___ai__bias__alignment___other_topics_img_6.png)  

| | |
|---|---|
| ![Image](images/dissertation___ai__bias__alignment___other_topics_img_7.png)<br><br> |  |

---

## Slide 7

### **p	h	t	s	k	.	SPACE [e…]		** **s**	1	1	1	1	1	1	1		0…		**s	****1/28	1/28	1/28	1/28	1/28	1/28	1/28		0/28…	**  

| | |
|---|---|
| ![Image](images/dissertation___ai__bias__alignment___other_topics_img_8.png)<br><br> |  |

---

## Slide 8

### ![Image](images/dissertation___ai__bias__alignment___other_topics_img_9.png)  

---

## Slide 9

### And just like magic…  

| | |
|---|---|
| (After we download *Eugene Onegin *in English and convert it to plain text format)<br><br> |  |

---

## Slide 10

### ![Image](images/dissertation___ai__bias__alignment___other_topics_img_10.png)  

---

## Slide 11

### ![Image](images/dissertation___ai__bias__alignment___other_topics_img_11.png)   ![Image](images/dissertation___ai__bias__alignment___other_topics_img_12.png)  

| | |
|---|---|
|  | ![Image](images/dissertation___ai__bias__alignment___other_topics_img_13.png)<br><br> |

---

## Slide 12

### Markov (Language) Model  

| | |
|---|---|
| Models independent probabilities (“z given y, given x, given z” etc etc)<br>“If I have a vowel, what should come next?”<br>Roll a die / clip a coin<br>16% - another vowel<br>84% - another consonant<br><br> | ![Image](images/dissertation___ai__bias__alignment___other_topics_img_14.png)<br><br> |

---

## Slide 13

### Are Markov Chains Large Language Models?  

| | |
|---|---|
| Tokens (sub-words) not letters<br>Conditional probabilities: not one but thousands, millions…<br>Multidimensional (‘s’ relates to ‘e’ on dimension X, not on dimension Y)<br>Positional encoding (where a token lies in a sentence)<br>“Transformer”: architecture that looks backward and forward (“attention” mechanism) to transform *input* into *output*<br>But still… basically very fancy Markov chains<br>What does the “expert” (GPT) say?<br><br><br><br>![Image](images/dissertation___ai__bias__alignment___other_topics_img_15.png)<br><br> |  |

---

## Slide 14

### Let’s build a Giant Markov Chain. Let’s call it a Generative Pre-trained Transformer (GPT for short).  

| | |
|---|---|
| And we’ll use the whole Internet (instead of just *Eugene Onegin*).<br><br>And lots of data and GPUs (which are good at *matrix multiplication* - manipulating spreadsheets).<br><br> |  |

---

## Slide 15

### What Could Go Wrong?  

---

## Slide 16

### What is the Internet?  

| | |
|---|---|
| *Eugene Onegin*…<br>Wikipedia<br>Millions of books<br>Billions of webpages<br>Social media (Facebook, Reddit, Twitter, Tiktok, YouTube etc)<br>Most content is unmoderated, can represent overt (toxic, offensive) or covert (non-obvious, unconscious) bias<br><br> |  |

---

## Slide 17

### Bias  

| | |
|---|---|
| ![Image](images/dissertation___ai__bias__alignment___other_topics_img_16.png)<br><br><br><br>Pre-GPT models had problems with bias<br>See classic study by Bolukbasi et al. (2016)<br>Bias can be **quantified** and **modified** <br>But Transformers (Vaswani et al. 2017) are so large and complex, debiasing is now much harder<br><br> |  |

---

## Slide 18

### Common forms of bias  

| | |
|---|---|
| - Gender<br> - Race<br> - Religion<br> - Disability<br> - Sexuality<br> - Class<br> - Other social markers<br><br> | - Bias can often be **intersectional** (Crenshaw 1989) - involving more than one category<br> - Do LLMs exhibit intersectional bias?<br><br> |

---

## Slide 19

### Intersectional Bias in Causal Language Models  

| | |
|---|---|
| ![Image](images/dissertation___ai__bias__alignment___other_topics_img_17.png)<br><br> | - Tested on GPT-2<br> - Categories of disability, gender, religion<br>Main findings: <br>Reproduced bias towards Muslim religion, physical disability<br> Associations of violence, terrorism, criminality<br>Intersectional bias is not always additive (X + Y). This means LLMs cannot easily be *debiased*.<br><br> |

---

## Slide 20

### Alignment  

| | |
|---|---|
| - Tested with GPT-3 onwards<br> - Humans score LLM outputs<br> - LLM is re-trained on these scores, and adapts its weights to produce “better” outputs<br> - Important paper: Ouyang et al. (2022).<br>	- Make GPT-3 more **helpful**, **truthful** and **harmless**<br>	- Debiasing through making LLMs outputs correspond to human values (preferences, desires - and also biases)<br>**	- **Breakthrough that led to ChatGPT in November 2023. Largely (not fully) addressed issues of bias.<br><br> |  |

---

## Slide 21

### Alignment  

| | |
|---|---|
| - More questions: alignment with who? With what?<br> - Alignment has become the key “problem” that organises vast capital ($100s of billions today)<br>	 - What is helpful? What is true? What is harm?<br> - Computer scientists have become parents, therapists, teachers for LLMs<br> - Interesting history: research by the Moscow Linguistic School (1950s, 60s) - how to reconcile language structures (or models) with statistics. These problems are old and not resolved…<br><br> | ![Image](images/dissertation___ai__bias__alignment___other_topics_img_18.png)<br><br> |

---

## Slide 22

### Relevance for Teaching (Finally!)   ![Image](images/dissertation___ai__bias__alignment___other_topics_img_19.png)  

| | |
|---|---|
| - Algorithmic bias can reproduce social bias<br>	And limit learning for students from diverse or minority backgrounds - Can bias ever be eliminated? (and who determines bias?)<br> - And alignment can introduce new biases that affect how students learn<br> - Do we need AI literacy, to help us interpret bias, alignment ideology? (see *Critical AI*)<br><br> |  |

---

