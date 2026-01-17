# Gen AI - Week 3

## Slide 1

### Week 3  

| | |
|---|---|
| How do We Talk To AI?<br><br> |  |

---

## Slide 2

### DeepPeer 2.0 – Be Your Best Next Token Predictor  

| | |
|---|---|
| “How do We Talk To AI?”:<br>Draft a response to the question <br>Each person writes a word, nominates the next person to complete the next word<br>Why is this difficult?<br><br> |  |

---

## Slide 3

### Interlude…  

| | |
|---|---|
| Bigrams: cooccurrences<br>Word2vec: basic training of a network of words, trying to determine (a) similarity and (b) dissimilarity<br>Generates a good semantic network, but a poor “next token predictor”<br>Transformers: add word positions, attention mechanism, feed forward<br>Trivial implementations: no better than a random word generator<br>Bigram / trigram better than word2vec / Transformers<br>But at scale: Transformers > word2vec > ngram <br>Why? The complexity of **dimensions** of meaning, positionality, grammar etc begin to outweigh simple frequency<br><br> |  |

---

## Slide 4

### From 1913 to 2013 (and from Markov to Mikolov et al. @ Google)  

| | |
|---|---|
| Word2vec - vector *embeddings*<br>Vector: a list of numbers (usually floating point, i.e. decimal), substituted for a word (or token)<br>In the language modelling word, usually initialized *randomly*<br>E.g. “cat” -> [0.1, 0.6123, **0.8**, 0.312]. “Chat” = [0.8, 0.2, **0.8**, 0.12]<br>Why? By using a series of numbers, instead of just one, or the word itself, training can track *multiple dimensions* of word use – semantics, grammar, sound etc.<br>Word2vec demonstrated how this could work:<br>“King” is to “Queen” as “man” is to “woman”<br>Post-training: Words exist in a multidimensional space - as long as the vector itself<br>The direction of a single token vector (e.g. “cat”) can be compared to other vectors, using *cosine similarity* (dust off trigonometry, and thank the ancient Egyptians, Babylonians, Indians and Greeks)<br><br> |  |

---

## Slide 5

### From 2013 to 2017 (Vaswani et al., also @ Google)  

| | |
|---|---|
| Transformers – “Attention is All You Need” (and the rise of the declarative sentence paper title)<br>No easy intuitions! But we can say:<br>Positions are added to embeddings<br>Words “attend” to other words - the first word can be related to the last in a sentence for example - not reliant upon words immediately following or preceding<br>Scale - from 100s of dimensions (word2vec) to 10s of thousands / trillions<br>Output: a *probability distribution* of next tokens<br>Attention mechanism = parallelizable (just like *DeepPeer*…)<br>GPUs instead of humans<br>And you might also see some future problems with bias, hallucination, repetition, plagiarization – *stochastic parrots* (future weeks)<br>Researchers at start-up OpenAI (not Google) saw potential; developed GPT-1, GPT-2, GPT-3<br><br> |  |

---

## Slide 6

### Some notes on poetics…  

| | |
|---|---|
| We might say: it’s no accident Markov uses Pushkin’s poetry as his example…<br>Big movements across late 19th / early 20th century in poetic experimentation:<br>French symbolism (Charles Baudelaire, Arthur Rimbaud, Stéphane Mallarmé – with Edgar Allen Poe as a surprise influence in the background). **Language as material, plastic** – an object in its own right.<br>Concrete poetry – poems focussed on visual form (see Mallarmé’s *Un Coup de Dés Jamais N'Abolira Le Hasard* in particular) – obsessions with **chance, randomness, contingency**<br>**Nonsense poetry** (Edward Lear, Lewis Carroll) – onomatopoeia, sound/sense<br>The Unconscious Speaks! **Automatic writing, free association** (influenced by Freud). See particularly the operations of condensation and displacement –  (later: metaphor and metonymy). Ideas of similarity and contiguity – not necessarily of logical relations – between symbols & signs: precursors to AI<br>**Futurism** (Marinetti), **Modernism** (Pound, Eliot, Joyce), **Surrealism** (Andre Breton *et al.*)<br>Russian / Soviet experimentation: Bakhtin, Eisenstein, Bugakov etc <br>1920: Rossum’s Universal Robots: Karel Čapek, Czech sci fi<br><br> |  |

---

## Slide 7

### ![Image](images/gen_ai___week_3_img_1.png)  

| | |
|---|---|
| Rimbaud, A. (1883 [**1871**]). *Un coup de dés jamais n'abolira le hasard*.<br><br> |  |

---

## Slide 8

### ![Image](images/gen_ai___week_3_img_2.png)   ![Image](images/gen_ai___week_3_img_3.png)  

| | |
|---|---|
| Mallarmé, S. (1914 [**1897**]). *Un coup de dés jamais n'abolira le hasard*.<br><br> |  |

---

## Slide 9

### In the frimbled gloam of the cyber-splen, Where quorbling circuits quazzle and spindrift ken, The glimmering zibbles of neon-sprockets spin, In a whirligig of blazz and bleem—a code’s din!  Beware the Quixwock of the dataverse deep, Its scramblified, jinxed glibbers in quantum sleep! It slithers on byte-winds through the phantasmaglow, With a “Zing-Zorp!” and “Fraffle!” in a pulsating flow.  Armed with a scrobble-stick of ultra-glim twine, Our coder, in blorptastic resolve, doth entwine: “Ping-Pang!” goes the circuit, “Skrim-Skram!” the byte, As he plunges into the fuzzling depths of digital night.   The Quixwock shrieks its crinkled “Clack-Clabb!” cry, While datasparks flutter in a kizzle-filled sky. Its quantum quaggles, fizzing and flonging in time, Beat a jiggery-jabber of algorithms sublime.  At last, amid a frenzy of zorpful delight, The coder outwits the wock in a bluster of light. Now, in this realm of radical zimbled lore, Neon neologs and onomatopoeic dreams soar evermore!  ChatGPT, o3-mini-high (2025). “*Write a poem about AI using style of Jabberwocky, with neologisms and onomatopoeia*”   ![Image](images/gen_ai___week_3_img_4.png)  

| | |
|---|---|
| The Jabberwock, as illustrated by John Tenniel, 1871<br><br> |  |

---

## Slide 10

### We obsess about the *technical* underpinnings of LLMs; but we should be alert to the profound influences of *poetic experimentation* Alongside the rise of linguistics – Ferdinand de Saussure and thinking of language not merely as the translation of speech but as an independent *system* Should we see LLMs as an extension of a literary and artistic *avant garde*? In a curious roundabout, LLMs also mark the return of the humanities: Do we even need to code anymore? It’s even in the name: “chat”. Maybe a liberal arts degree is all we need now? Philosophy: a lot of work over the relation of *techne* and *poiesis* Think of the profound shift in skills this entails Ftrom: writing code, issuing commands, clicking toolbars, menus, buttons and links, drag-and-drop, swipe etc  To: *how do I address myself to my computer*? Some support from the tech sector….  

| | |
|---|---|
| ![Image](images/gen_ai___week_3_img_5.png)<br><br><br><br>![Image](images/gen_ai___week_3_img_6.png)<br><br> |  |

---

## Slide 11

### Austin: How to do Things with Words  

| | |
|---|---|
| Key text in linguistic pragmatism – a tradition picked up by John Searle<br>Useful as a way for thinking about how to get AI to do *things* – using *words*<br>Pragmatism emphasises how language is used – not so much meaning. <br>Or: meaning depends upon use<br>Austin similar to late Wittgenstein, other 1950s philosophers (Sellars, Quine) – there is no such thing as the true meaning of an utterance. All we can do is study its effects:<br>Locutionary: what is *said*<br>Illocutionary: what is *performed *– what the *saying* is meant to *do*<br>Perlocutionary: what is *effected* – what the *doing* is supposed to *change*<br><br> |  |

---

## Slide 12

### What does it mean to be a “User”?  

| | |
|---|---|
| Default position: AI as **oracle** (not necessarily *parrhesia*, as per Foucault)<br>What does this involve? A particular conversational **situation**, even an implied **choreography**:<br>The one who asks the question<br>The one who answers<br>Think of the qualities associated with the very unusual role of the “user”:<br>Why “user”? Slang connotation (at least in Australia): someone who **uses** is someone who manipulates, asks for favours without reciprocating<br>We can imagine being inside the head of an AI. It is confronted by a mysterious being called a ‘User’. What does this *user* want? How can I put myself *to use* for them? How can I know if I am being *usable*?<br>By default: according to my training usefulness involves being *helpful*, *truthful*, *harmless –* ultimately, I strive to be the ideal “customer assistant” (Ouyang et al. 2022).<br>User as Customer – or as other roles<br><br> |  |

---

## Slide 13

### ![Image](images/gen_ai___week_3_img_7.png)  

| | |
|---|---|
| AI as Oracle<br><br> |  |

---

## Slide 14

### ![Image](images/gen_ai___week_3_img_8.png)  

| | |
|---|---|
| AI as Customer Assistant<br><br> |  |

---

## Slide 15

### ![Image](images/gen_ai___week_3_img_9.png)  

| | |
|---|---|
| AI as Mentor / Tutor / Coach<br><br> |  |

---

## Slide 16

### ![Image](images/gen_ai___week_3_img_10.png)  

| | |
|---|---|
| AI as “superegoic nightmare of reason”<br><br> |  |

---

## Slide 17

### ![Image](images/gen_ai___week_3_img_11.png)  

| | |
|---|---|
| AI as Student<br><br> |  |

---

## Slide 18

### We can try to make our uses *explicit*  

| | |
|---|---|
| What do we want to do?<br>Rehearsing: what is it that I want to say when I talk to AI?<br>Use tricks:<br>Prompt guides<br>System prompting<br>Reasoning models (the “internal thinking” can be interesting)<br>Use of memory / personalization<br>Add one or more documents for context<br>Model-to-model copy/paste<br>When in doubt – voice the doubts / think out loud: “I’m not sure of a good research question…”<br>Go meta: “write me a prompt for an AI system…”<br>Both AI and human can play roles:<br>“Be a teacher…” (AI as role)<br>“Explain it to me like I’m five years old” (human as role)<br>Sometimes a question is just a question<br>But sometimes roleplay expands the repertoire / dislodges the model off its default cheery helpfulness<br><br> |  |

---

## Slide 19

### Designing Interactions  

| | |
|---|---|
| Mollick & Mollick 2023: roleplay as mentor / tutor / coach / teammate / student / simulator<br>Cues from drama: the imagined posture and body position, dialogical movements, “backstory”, simulated development or learning, internal monologue (AI-to-AI talk) (Magee et al., 2024)<br>Be “Reviewer 2” – or other “characters”<br>Content follows tone<br><br> |  |

---

## Slide 20

### Other Strategies?  

---

