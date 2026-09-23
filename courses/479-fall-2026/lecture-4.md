---
title: "Attention"
week: 4
course: "479"
artifacts:
  - slug: spotlight-attention-game
    title: "Spotlight: attention in machines, readers and society"
    position: after-content
---


## Welcome to Week 4: Attention

---

## Discussion

 - Thoughts, impressions?
 - Some comments later on relationship to Hegel - but is there a relationship between alerting / orienting / executing (Petersen and Posner, 2012) and sense certainty / perception / understanding (Hegel, 1807)?
 - Terranova (attention economy), Hansen (cognitive lock-in)

---


## Assessments

 - Send me your chats / reflections each week! I do read and respond to them
 - Peer review: Weeks 5 & 7 - bring your definitions of **human and machine learning** and **key question** to class. We'll use these in the break-out discussions. 



---

## Attention: Machines, Brains, Society


- Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, L. & Polosukhin, I. (2017). [Attention is all you need](https://i-share-uiu.primo.exlibrisgroup.com/discovery/fulldisplay?docid=cdi_proquest_journals_2076493815&context=PC&vid=01CARLI_UIU:CARLI_UIU&search_scope=CentralIndex&tab=CentralIndex&lang=en). *Advances in Neural Information Processing Systems*, 30.
- Petersen, S. E., & Posner, M. I. (2012). [The attention system of the human brain: 20 years after](https://i-share-uiu.primo.exlibrisgroup.com/discovery/fulldisplay?docid=cdi_pubmedcentral_primary_oai_pubmedcentral_nih_gov_3413263&context=PC&vid=01CARLI_UIU:CARLI_UIU&search_scope=CentralIndex&tab=CentralIndex&lang=en). *Annual Review of Neuroscience*, 35(1), 73-89.
- Terranova, T. (2012). [Attention, economy and the brain](https://culturemachine.net/wp-content/uploads/2019/01/465-973-1-PB.pdf). *Culture Machine*, 13.
- Hansen, M. (2024). From attention economy to cognitive lock-ins. Big Data & Society, 11(3), 20539517241275878.



```notes
As we've noted in the week's online guide, this week we are moving both back and forward - back to the earlier moments of consciousness, perception in particular, but also forward to the much more recent developments in both neuro and computer science.

What I propose this week is that we examine four key papers that all treat the concept of attention in a specific way. I won't be doing too much here to relate this concept to Hegel's unfolding architecture in *Phenomenology of Spirit* - we'll instead turn to that in the weeks ahead. But you may want to think how different meanings of attention might be situated with respect to both concepts of experience and recognition we've covered to date.

I'll start by looking at the Petersen & Posner paper, *The Attention System of the Human Brain: 20 Years After*, then the Vaswani et al's  *Attention is All You Need* paper, and then finally Terranova's  critique of the Attention Economy. In each case we'll provide a short summary, and connect the argument to the wider lecture and course content - then provide time for discussion.

Note that our discussions of these papers will be very high level - just enough to get some intuition of similarities and differences. 

```




---

### Human Attention


| Attention Function | Representative Regions / Networks | Application to Reading |
| --- | --- | --- |
| Alerting | Locus coeruleus and neuromodulatory influences; thalamic and cortical regions | Become and remain *ready* to respond to text |
| Orienting: deliberate selection | Dorsal network: frontal eye fields and intraparietal / superior parietal regions | *Direct* attention to a word or location |
| Orienting: reorienting | Ventral network: mainly right temporoparietal junction and ventral frontal cortex | *Shift* toward a relevant unexpected margin cue |
| Executive control: maintenance | Cingulo-opercular network, including medial frontal / anterior cingulate and anterior insular regions | *Keep the reading purpose* in force |
| Executive control: adjustment | Frontoparietal control network, including lateral prefrontal and parietal regions | *Change strategy* and reread a difficult phrase |

These reading situations are teaching applications of Petersen and Posner's framework, not neural measurements of reading. Networks cooperate; the rows are not successive stages. 

[Explore the interactive reading lab](../../artifacts/spotlight-attention-lab.html#human): rotate the anatomical cortical model, select a reading moment, and try the same next-token task from the human and machine perspectives. 



```notes

The first paper updates Posner and Petersen's 1990 framework. It distinguishes three broad functions: alerting, orienting, and executive control. These are interacting systems, not a fixed sequence of becoming aware, looking, and deciding. The review also distinguishes sources of attentional influence from the processing systems they affect.

I'll briefly talk through these three functions.

Alerting concerns readiness to respond. Phasic alerting is a brief increase in readiness, such as after a warning cue; tonic alertness concerns sustained vigilance. The review associates tonic alertness strongly with the right hemisphere, but discusses less settled laterality for phasic effects. It also discusses the locus coeruleus, norepinephrine, thalamic regions, and cortical contributions. Alerting is not simply detecting a stimulus or becoming conscious of it.

Orienting prioritizes a location or sensory input. The dorsal network includes frontal eye fields and intraparietal / superior parietal regions involved in goal-directed selection. The mainly right-sided ventral network includes temporoparietal junction and ventral frontal cortex, associated with interrupting a current focus and reorienting. Attention can shift without an eye movement. During reading, deliberate selection of a word and reorienting to a relevant margin cue illustrate different orienting demands.

For executive control, the authors favor a two-network account. The cingulo-opercular network supports stable task maintenance. The frontoparietal control network supports initiation, switching, and adjustments during performance. Maintaining the instruction to explain a sentence and deciding to reread a confusing phrase illustrate these demands. See the review's Executive Control section and Figure 2.


```


---

### Functions and Networks

- Different networks make distinguishable contributions to readiness, selection, and control.
- Several regions cooperate within each network, and the networks interact during ordinary activities such as reading.
- These distinctions do not imply a fixed alerting → orienting → executive pipeline or a one-region, one-function map.


![Image](assets/images/pasted-image-2025-09-14T18-41-01-466Z-7f762d1b.webp)

```notes

The important point is the distinction between functions and networks. Multiple regions contribute to a network; distinguishable networks can work together. Their coordination is not adequately represented by a single moving spotlight, nor by a compulsory order of three stages.

The comparison with transformers is functional: some information receives greater priority in a context. A transformer head is not a brain region. Query, key, and value are three numerical roles inside a weighted-sum calculation; they do not map onto alerting, orienting, and executive control.

```

---

### Attention and Learning


![alt text](assets/images/attention-pedagogy-studies.webp)

```notes

Within the context of learning, we can also see how this new attention-oriented work helps to make sense of, in particular, learning *difficulties*. Impairments on different brain regions can result in complex but still localizable – and potentially addressable – limitations in how attention is alerted, directed, sustained and purposefully redirected, as conditions require. 

Now while this is not a course diving into neuroscientific research, we can note in passing that this kind of neurological or neuroscientific research has impacted upon the theory and practice of pedagogy. A quick Google Scholar search shows for example how many results have integrated "executive function" into pedagogy research: 16,900 results since 2022.

```

---

### Attention and Childhood Development

- infants first develop alerting functions (with some orienting and executive ability)
- children develop mature orienting and basic executive (concentrating) functions
- adolescents and young adults develop higher order executive (both attention-sustaining and -switching) functions


**References:**

<span style="font-size:0.8em;">

- Rueda, M. R., & Posner, M. I. (2013). Development of attention networks. In *The Oxford Handbook of Developmental Psychology, Vol. 1: Body and Mind*. 
- Posner, M. I., & Rothbart, M. K. (2007). Research on attention networks as a model for the integration of psychological science. Annual Review of Psychology, 58, 1–23.
 - Boen, R., Ferschmann, L., Vijayakumar, N., Overbye, K., Fjell, A. M., Espeseth, T., & Tamnes, C. K. (2021). Development of attention networks from childhood to young adulthood: A study of performance, intraindividual variability and cortical thickness. Cortex, 138, 138-151.
 
</span>

<!--- Rueda, M. R., Posner, M. I., & Rothbart, M. K. (2004). Attentional control and self-regulation in early development. Trends in Cognitive Sciences, 8, 140–147.-->

```notes

Several of these studies show that the hierarchy of attention mechanisms - alerting to orienting to executing – also correspond to stages of learning and childhood development. Work by Posner and colleagues in particular has sought to demonstrate that:

- **infants** first develop alerting functions (with some orienting and executive ability)
- **children** develop mature orienting and basic executive (concentrating) functions
- **adolescents and young adults** develop higher order executive (both attention-sustaining and -switching) functions

```

---

### Neuroscience and Hegel?

> Without hesitation, the raw instinct of self-conscious reason will reject such a science of phrenology – as well as reject this other observing instinct of self-conscious reason, which, once it has blossomed into a foreshadowing *of cognition*, has spiritlessly grasped cognition as, “The outer is supposed to be an expression of the inner.” However, the worse the thought is, the less easy it sometimes is to say exactly where its badness lies, and it becomes even more difficult to explicate it. (para 340)

```notes
And to keep concordance with Hegel, we might also note his own strong distrust of the "neuroscience" of his day – a now outdated field called "phrenology", which involved measuring skulls to determine cognitive aptitude. Much later in the *Phenomenology*, he savagely criticises the pseudoscience of phrenology for attempting to account for traits like intelligence based on bumps on the skull. Of course for Hegel, as we have seen, the development of Consciousness and Self-consciousness - and eventually Reason, Spirit and Absolute Knowledge – depends upon an infinitely supple and complex negotiation, both within ourselves and with others. This complex process of development cannot be "read" off the shape or dimensions of the skull. In a phrase that pre-empts where we go next week, Hegel states: 
 
> Without hesitation, the raw instinct of self-conscious reason will reject such a science of phrenology – as well as reject this other observing instinct of self-conscious reason, which, once it has blossomed into a foreshadowing *of cognition*, has spiritlessly grasped cognition as, “The outer is supposed to be an expression of the inner.” However, the worse the thought is, the less easy it sometimes is to say exactly where its badness lies, and it becomes even more difficult to explicate it. (para 340)

```


---


### Neuroscience: A Modern Phrenology?

|   |   | 
|---|---| 
| ![Image](assets/images/pasted-image-2025-09-14T22-33-13-908Z-4dbfa114.webp) | ![Image](assets/images/pasted-image-2025-09-14T22-34-05-167Z-40814aab.webp)  |


---

### The Gap Between Brain and Mind


> The idea of mapping psychological functions to brain structures has a venerable history, dating back to Galen’s ventricular doctrine (Green [2003]) and continuing to Gall’s phrenology (Gall and Spurzheim [1810]). Although those theories are now in disrepute, the advent of neuroimaging techniques, such as positron emission tomography (PET), functional magnetic resonance imaging (fMRI), electro-encephalography (EEG), and magnetoencephalography (MEG), gives the prospect of finding one-to-one correlations between psychological functions and brain structures new vigour, and the project is the main goal of the young field of cognitive neuroscience (Posner and DiGirolamo [2000]). Yet many doubt that cognitive neuroscience can give us such a psychological atlas, whereby the building blocks of mind get assigned to specific neural structures (Uttal [2001], [2011]). (De Brigard and Gessell, 2024)

#### References:

<span style="font-size:0.8em;">

- Dobbs, D. (2005). Fact or Phrenology?. Scientific American Mind, 16(1), 24-31.

- De Brigard, F. and Gessell, B. (2024). The Mirage of Big-data Phrenology. The British Journal for the Philosophy of Science.
 
- Stea, J. N., Black, T. R., & Di Domenico, S. I. (2022). Phrenology and neuroscience. In *Investigating Pop Psychology* (pp. 9-19). Routledge.

- Uttal, W. R. (2011). Mind and brain: A critical appraisal of cognitive neuroscience. The MIT Press.

</span>



```notes


While neuroscience involves far more rigorous and detailed methods of investigation into the operations of the brain than phrenology, we can note in passing that it has attracted criticisms quite similar to those levelled by Hegel towards the "neuroscience" of his day. See for example the following quote from a recent article by De Brigard and Gessell.


Despite the advances in science, for many today there remains a distinct gap between brain and mind, or the biological processing of signals and the rich descriptions of consciousness we get from philosophy, literature, art and religion. 

How we understand this gap also affects our interpretation of the potential for machines to develop consciousness - our topic for next week. But for now, we need to look at how the concept of attention also applies to machine learning.
```

---

### Machine Attention


 - Pre-2017: Recurrent, convolutional networks (RNNs, CNNs)
 - Problems: Recurrent networks degrade as the length of text grows
 - Attention already used in combination with architectures
 - But is Attention All You Need? The Vaswani et al. (2017) Transformers paper
 - Implementation by OpenAI: *Improving Language Understanding by Generative Pre-Training* (Radford et al. 2018): **GPT-1**.

```notes
Vaswani et al.'s 2017 paper is a landmark in machine learning. Perhaps the most cited paper this century, this work by Google scholars was first actually implemented in a large generative language model, not by Google, but by a young start-up company, OpenAI. 

There is an entire story of intrigue about how OpenAI was founded – with seed funding from Elon Musk – and eventually caught sight of this 2017 paper, understood its potential, and developed something called a "Generative Pre-Training" model 
(*Improving Language Understanding by Generative Pre-Training*).

Now we don't have time or opportunity to fully talk through this paper and its technical details. We would need to venture too far into the history of neural networks and their application to language modelling. But we can say that *prior* to this paper, the state-of-the-art models were using recurrent or convolutional networks, sometimes with attention mechanisms built in. 
```

---

### From linear to grid representations




<!-- | RNN | Transformer |
| --- | --- |
| ![rnn](assets/images/rnn.webp) | ![transformer](assets/images/transformer.webp) | -->


![Image](assets/images/comparison-heatmap-2025-09-15T13-42-51-212Z.webp)



```notes

In short the problem with these systems was the need to maintain an ever-growing set of connections between the next token we would like to predict and the tokens or words that preceded it. 

I've used two heatmaps generated by GPT-5 to convey the general idea: RNNs process tokens in a linear way, from left to right, just as we read. But we quickly develop a long set of connections between tokens. 

Instead transformers require every token in a sentence or sequence to be related to every other - no matter how far apart they are in the sequence. This reduces the *time* involved both in training and inferencing or predicting, because a number of tokens can be processed in parallel. In recurrent neural networks, by comparison, each token depends upon the state of the preceding one, so the same kind of parallelism isn't possible. This comes at the cost of the need for much greater computation and memory - effects of which we can see in today's shortage in computer memory and graphics chips.

Shortly we'll do a thought experiment that will hopefully make this more clear.

```


---

### Some general terminology...

#### Tokens vs Words

**Tokens** are word-like pieces of data that are the foundational primitives of language models. Why not words?  There are many words in natural language, but often they involve commonly recurring terms (e.g. morphemes, prefixes, suffixes: 'un-', '-ing'). Roughly **4** tokens per **3** words.

#### Training vs Inference: 

**Training** involves building a large language model by processing large amounts of textual (or other) data, to develop up relationships between tokens. 

**Inference** applies the trained model to a particular sequence, e.g. when you ask a question of ChatGPT.


---

### Terminology continued...

#### Neural Network, Layers, Weights and Biases

Describes the structure of a language model: has **interconnected** nodes organized in **layers**. Each layer contains (typically) a **weight** matrix and **bias** vector. 


Much of the difference between models involves details about the architecture of a network and its layers; how much the weights and biases are trained; and what data is used in training.

#### Feed forward / Backpropagation

1. First we estimate **weights** and **biases**, and generate a **loss**, measuring their accuracy.
2. Second we use **calculus** to update all the weights
3. Rinse and repeat, until loss is minimized. 


---

### Is AI just fancy statistics?

 - Core Intuition: A **language model** approximates a **function** (with many parameters). 

![Image](assets/images/linear-regression-2025-09-15T13-42-02-464Z.webp)

Typical multiple regression - a simplified 1-layer neural network:

$$
\begin{align}
y_i &= \beta_0 + \beta_1 x_{i1} + \beta_2 x_{i2} + \cdots + \beta_p x_{ip} + \varepsilon_i,
\quad i = 1, \dots, n
\end{align}
$$

So **training** is the attempt to produce an (ever more) accurate approximation of this function, by adjusting its parameters against the data.

---

### Attention is Three Matrices: Queries, Keys, Values

- Queries: what each token is **asking for** from other tokens (in training or inference)
- Keys: what each token offers to be matched against. The comparison of the key and query gives a score of the **relative match** of each other token to this token
- Value: what the token **represents** (e.g. in syntax or semantic terms)

This process is what is meant by **attention**. 


---

### Thought Experiment


> The cat sat on <span style="color: red;">the</span>...

```notes
Let's work through the following thought experiment. We will imagine we have the following unfinished sentence, and we'll focus on the last word, `the`:
```



---

### Sympathy for the Machine...


| Query | Key | Weight |
|-------|-----|--------|
| the   | The | 0.05**  |
| the   | cat | 0.15   |
| the   | sat | 0.25   |
| the   | on  | 0.50   |
| the   | the  | 0.05**   |


 ** Because `the` rarely attends to other instances of `the`! 

What does this set of probabilities refer to? The relevance or how much the word `the` *attends* to the other tokens in the sentence. 


```notes
Now let's think about this from the machine's point of view, during inference rather than training. We saw from preceding discussion that this word `the` maintains a place in three lists of words or tokens:

- Query
- Key
- Value

We are considering the second `the` as our *query* word, and we want to know what word should follow. We first compare it with every other word in the sentence, checking against their *key* values. This generates an initial set of probabilities, for which I'll just use some example values:



| Query | Key | Weight |
|-------|-----|--------|
| the   | The | 0.05**  |
| the   | cat | 0.15   |
| the   | sat | 0.25   |
| the   | on  | 0.50   |
| the   | the  | 0.05**   |


** Because `the` rarely attends to other instances of `the`! 

What does this set of probabilities refer to? The relevance or how much the word `the` *attends* to the other tokens in the sentence. We are primed, in other words, more strongly in favour of 'on the' than anything else.

```


---

### From Attention to Context

![Image](assets/images/pasted-image-2025-09-15T17-24-12-198Z-d12b6f9d.webp)

```notes

Now each of these tokens – *the*, *cat* etc – also contains a set of numbers relating to their *values*. The values are – if you like – the semantic space of the word: the **cattiness** of the 'cat' (noun, animal, furry, etc); the **sittingness** of the 'sat' (verb, temporal, positional, etc); the **on-ness** of the 'on' (preposition, relational term); the **the-ness** of the 'the' (definite article, applies to nouns, connected to preposition). But also tied to the context of the current sentence.

So once we have a sense of relative attention – how the 'the' relates to other words in the sentence – we combine the values, which we can think of as a hybrid syntactico-semantic representation, with these attention weights. 

This produces a **context** that governs prediction. 


```


---

### Iterated Context: From tokens to quasi-phrases / sentences


 - 'the' is no longer just a word or token
 - its 'the'-ness becomes a kind of 0.55 * 'on' + 0.25 * 'sat' etc. 
 - All of these influences, derived from repeated attention, make 'mat' a more likely continuation.

```notes

This process is repeated over several or many layers of a network. At each layer we develop a richer representation of this context for each token. The mathematical representation of the 'the' we are looking at accumulates the influence of the other tokens it attends to - and so do these other tokens themselves. These ultimately help to narrow the scope – or increase the bias - toward particular tokens such as 'mat'.

The 'the'-ness becomes a highly specific and contextualized 'the'-ness that is paired strongly with a prepositional phrase; is associated with a spatio-temporal situation - one of sitting; and is (less strongly) influenced by an agent. None of these roles are hard-coded; they are learned by the network. But at the same time they resemble the rules of grammar and meaning we are used to.

All of these influences, derived from repeated attention, make 'mat' a likely continuation (from within the wider set of the model's vocabulary).

```

---

### From Context to Prediction


| Token | Probability |
|-------|-------------|
| the   | 0.01        |
| cat   | 0.01        |
| sat   | 0.01        |
| on    | 0.01        |
| mat   | **0.80**        |
| dog   | 0.08        |
| house | 0.08        |


```notes
This learned context is applied to every item in our initial vocabulary. That would include all the words we have used, plus (in a toy example), other nouns like 'mat', 'dog', 'house'. This produces a final set of probabilities:


And finally: we roll a virtual die, and produce a set of predictions. In this toy example, 80 per cent of the time the predicted completion of the sentence will be 'mat'. 

Note that this 80% of the time - not 100% - is what makes LLMs often 'probabilistic', 'stochastic' and 'non-deterministic'.

As a further note: You might also imagine all of this computation gets expensive for (a) large vocabularies (like multiple human languages) and (b) long contexts (like novels). That is true! And why companies like Nvidia and TSMC have such extreme valuations today - to train and do inference on attention-based mechanisms involves hardware investments in the order of tens or hundreds of billions of dollars today.

```

---

### What about human attention?

Let's continue now with a further rough experiment.

Start by *attending to* the following words I say:

```
The cat sat on the...
```

---


Now when I said:

> Start by *attending to* the following words I say:

You are *alerted*. You have to shift from an everyday state to an alerted one, maybe by the fact that I've issued an imperative: 'Start'.

What follows is your orientation to what actually does *follow* from the words 'the following words I say'. You are oriented towards the completion:

```
The cat sat on the...
```


---

### Executive Functions and Metacognition 

Do you:

1. Complete the sentence?
2. Keep listening to what I say?

```notes
But then you are also possibly primed to the visual and audible *incompleteness*. The sentence doesn't end, instead your lecturer continues on with his exposition. The executive functions need to *decide*. What do you do? Do you:

1. Complete the sentence?
2. Keep listening to what I say?

Or both? Because this is a trivial case, you can complete the sentence very fast, and I'm not speaking too fast. Or do you *resist* the completion – ignoring my command altogether, or completing the sentence with another word? 
```

---

### Questions on human attention

Think for a moment about this final activity. Is **your** completion different to the **LLM**? How much of this - pointing ahead to next week's topic – is **conscious** or **unconscious**? Do you – like the Transformer model – draft a list of candidates, and pick the most **likely**? Is there a kind of metacognitive aspect that enables you to determine to **sustain** or **switch** your attention? Can you **refuse** to complete what you ought to - what your training suggests? 

---

### Similiarities and differences

- Curious that two very different mechanisms use the same term "attention"
- Really it is metaphorical - substantial differences in what these systems do, and at what scale:
  - Computational attention: word-to-word (or pixel), over and over
  - Human attention: layered through quite distinct processes (alert > orient > execute)
- But in some sense can we also see some important similarities - especially when we compare textual interpretation (reading) / next token prediction (writing)?


---

### Make Content, Get Attention... Profit?

![Image](assets/images/pasted-image-2025-09-15T17-02-44-763Z-71b12cf1.webp)

```notes
Turning now to Terranova's article, we come to the idea that attention is a kind of *commodity* and even *capital*, marked - like all commodities – by scarcity. It is an object that in itself warrants the *attention* of capital, of investors and advertisers, in the context of digital media. This is of course not new - the nephew of Sigmund Freud, Edward Bernays, pioneered many uses of what was then, in the early/mid twentieth century, new media, such as radio, magazines, film and television. But with the maturation of computers, the Internet, smartphones, social media and, today, AI, we come to a point at which we see attention as corroded or "degraded" by information. There is so much information, in other words, that human attentive processes become saturated, barely able to keep up.

Terranova argues, citing Nicholas Carr, Catherine Malabou, Jonathan Crary and others, that precisely the kind of neuroscientific research we discussed earlier makes possible a new corresponding *industrialization* of attention. By developing sophisticated techniques for securing attention (at alerting and orienting levels), it also seems as though the higher order "executive functions" are disrupted. In particular, the ability to "switch" is impaired - we find ourselves staring at the screen long past the point at which we intended to, when we initially and intentionally sought distraction. 
```

---

### Attention and Imitation 

![Image](assets/images/pasted-image-2025-09-13T20-55-12-927Z-6998cdbe.webp)

```notes
In a turn that also reminds us of our discussion of Hegel and the *social* process of learning, Terranova then discusses how attention to digital media in turn leads to another kind of by-passing of the deeper attention marked by executive function, due to social imitation. 

But this need not be entirely negative. Here Terranova turns to another Italian theorist, Lazzarato, and his treatment of attention as the condition of social labour – and therefore a positive and productive force.

But Terranova's discussion takes a negative turn again, through the work of Bernard Stiegler. Stiegler – a French philosopher writing on technology since the 1990s – famously argued that contemporary technologies short-circuit important cognitive processes of memory and social processes of communication, resulting in, as Stiegler put it, a grave risk of "proletarianization". Primal psychic and libidinal energy gets put to service, in this analysis, in the creation of value for companies that can direct our collective attention via "social technologies" and "new forms of social relations".
```

---

### Cooperation or Proletariatanization?

![Image](assets/images/pasted-image-2025-09-13T21-05-34-066Z-650d5d77.webp)


```notes
Collecting up both Lazzarato and Stiegler's arguments, Terranova claims that – despite the very different valences or attitudes each brings to their analysis – both authors see attention as not simply a store of human attention that is only degraded by technologies. Rather, those technologies redirect attention, which in turn makes possible new kinds of subjects and social relations. For Lazzarato, technology actually makes humans cooperate in ways that can resemble the internal structure of an individual brain. For Stiegler, technology is similarly integral to all human cognitive and social activity – but in its current form (the Internet, social media, and the general capitalization of attention and associated "libidinal" energies), it is tending toward the production of a simplified, proletarianized and even stupefied society. 
```


---


### Is Attention a Design Problem?

![Image](assets/images/pasted-image-2025-09-13T21-21-01-254Z-b87a061e.webp)

```notes
The reason for including Terranova's analysis – aside from its wide-ranging survey of recent debates – is that in a certain sense it elaborates upon Hegel's insistence that self-consciousness and learning is essentially *social* in nature. Indeed both Lazzarato and Stiegler's positions, which Terranova surveys, can be seen as extensions to Hegel's insight, though adjusted for the dramatic effects wrought by informatic technologies. 

The individual human subject is affected by what others say and do, and digital technologies act like a concentrating device of those social habits. Let's exaggerate: every tweet, post or Tiktok we read or watch acts like a small encounter between two self-consciousnesses, which must resolve itself into a micro-master / servant dialectic enounter. Do we like the content, do we stay engaged to it - are we in other words, a servant to it? Or do we criticize, disengage and ultimately walk away? Is our self-regulation of our own attention a method also of self-mastery that resists servitude to others? Or are these attention-grabbing technologies too powerful for self-regulation, and do we need to treat attention management as a collective design problem?

And where does this then bring us with respect to a technology that arguably exceeds what Terranova, Lazzarato and Stiegler could ever have anticipated in terms of its potential capture of human attention - precisely via application of its own "attention" mechanisms?

In the reading on cognitive lock-in, Mark Hansen argues that as we enter the era of machine learning, platforms will increasingly predict, and thereby control, even more fundamental processes than our attention: our conscious thinking itself. 'Lock-in' refers to a situation where leaving a vendor is difficult because of the legacy investment in that vendor. Hansen's point is that our commitment to a given AI system will create, at a personal and psychological level, a similar inability to leave that system - it will have made us dependent upon it cognitively (and perhaps also affectively). 

```




---


### Synthesizing Human and Machine Attention?


![Image](assets/images/pasted-image-2025-09-15T04-48-29-169Z-c40d94d6.webp)

Posner on the role of attention in development and learning:

 - [Michael Posner: Implications of Cognitive Neuroscience for Education (gocognitive)](https://www.youtube.com/watch?v=PKzz1OAiTRQ)
 - [Michael Posner on the anatomy of attentional networks: a historical perspective (gocognitive)](https://www.youtube.com/watch?v=uYUdwS7-WvA)

```notes
According to many neuroscientists, attention is seen as critical to the operations of consciousness. In recent discussions, neuroscientists like Posner have also emphasized the experimental and social nature of attention formation, even in infants as they shape their alerting, orienting and executive facilities. Surprisingly, neuroscience may not be so far removed from Hegel's speculations on the nature of consciousness.

 Next week we focus on this concept, bringing closer together Hegel's ideas on consciousness and self-consciousness with other theories. We'll see how some scholars, like N. Katherine Hayles, have sought to combine research into both human cognition and machine learning with more traditional philosophical concerns about the nature of consciousness. We will revisit attention, but also consider ideas of the "unconscious" – developed originally by Freud, but surprisingly relevant in the world of machine learning too – as well as Katherine Hayles' work on what she terms "nonconscious cognition", operating in the world of machines.
```


---

### From Absolute Spirit to the General Intellect and Social Mind (Terranova, Hansen)

 - One view of machine learning: it is a *social* product that helps us realize a collective intellectual potential
 - Return to this in Week 7.


---

### Break-out Rooms

 - How useful is the concept of attention in understanding similarities and differences between machine and human learning?
 - How might the machinic concept of attention limit its ability to learn? What about human attention - is this mechanism a limitation to learning, especially in the digital age?
 - Terranova and Hansen present critical views on how attention is monetized and controlled. But are there positive sides to this?