// Generated from courses/479-fall-2026/lecture-4.md by artifacts/_tools/build-lecture-slides.mjs. Do not edit by hand.
export const LECTURE={course:'EPOL 479',week:4,title:'Attention',source:'courses/479-fall-2026/lecture-4.md',generated:'2026-09-20'};
export const SLIDES=[
 {
  "index": 0,
  "title": "Attention",
  "section": "Attention",
  "html": "<ul><li>Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, L. & Polosukhin, I. (2017). <a href=\"https://i-share-uiu.primo.exlibrisgroup.com/discovery/fulldisplay?docid=cdi_proquest_journals_2076493815&context=PC&vid=01CARLI_UIU:CARLI_UIU&search_scope=CentralIndex&tab=CentralIndex&lang=en\" target=\"_blank\" rel=\"noopener\">Attention is all you need</a>. <em>Advances in Neural Information Processing Systems</em>, 30.</li><li>Petersen, S. E., & Posner, M. I. (2012). <a href=\"https://i-share-uiu.primo.exlibrisgroup.com/discovery/fulldisplay?docid=cdi_pubmedcentral_primary_oai_pubmedcentral_nih_gov_3413263&context=PC&vid=01CARLI_UIU:CARLI_UIU&search_scope=CentralIndex&tab=CentralIndex&lang=en\" target=\"_blank\" rel=\"noopener\">The attention system of the human brain: 20 years after</a>. <em>Annual Review of Neuroscience</em>, 35(1), 73-89.</li><li>Terranova, T. (2012). <a href=\"https://culturemachine.net/wp-content/uploads/2019/01/465-973-1-PB.pdf\" target=\"_blank\" rel=\"noopener\">Attention, economy and the brain</a>. <em>Culture Machine</em>, 13.</li></ul>",
  "notes": "<p>As we've noted in the week's online guide, this week we are moving both back and forward - back to the earlier moments of consciousness, perception in particular, but also forward to the much more recent developments in both neuro and computer science.</p>\n<p>What I propose this week is that we examine three key papers that all treat the concept of attention in a specific way. I won't be doing too much here to relate this concept to Hegel's unfolding architecture in <em>Phenomenology of Spirit</em> - we'll instead turn to that in the weeks ahead. But you may want to think how different meanings of attention might be situated with respect to both concepts of experience and recognition we've covered to date.</p>\n<p>I'll start by looking at the Petersen & Posner paper, <em>The Attention System of the Human Brain: 20 Years After</em>, then the Vaswani et al's <em>Attention is All You Need</em> paper, and then finally Terranova's critique of the Attention Economy. In each case we'll provide a short summary, and connect the argument to the wider lecture and course content - then provide time for discussion.</p>",
  "dive": null
 },
 {
  "index": 1,
  "title": "Human Attention",
  "section": "Human attention",
  "html": "<p>---</p>\n<table><thead><tr><th>Attention Function</th><th>Representative Regions / Networks</th><th>Application to Reading</th></tr></thead><tbody><tr><td>Alerting</td><td>Locus coeruleus and neuromodulatory influences; thalamic and cortical regions</td><td>Become and remain <em>ready</em> to respond to text</td></tr><tr><td>Orienting: deliberate selection</td><td>Dorsal network: frontal eye fields and intraparietal / superior parietal regions</td><td><em>Direct</em> attention to a word or location</td></tr><tr><td>Orienting: reorienting</td><td>Ventral network: mainly right temporoparietal junction and ventral frontal cortex</td><td><em>Shift</em> toward a relevant unexpected margin cue</td></tr><tr><td>Executive control: maintenance</td><td>Cingulo-opercular network, including medial frontal / anterior cingulate and anterior insular regions</td><td><em>Keep the reading purpose</em> in force</td></tr><tr><td>Executive control: adjustment</td><td>Frontoparietal control network, including lateral prefrontal and parietal regions</td><td><em>Change strategy</em> and reread a difficult phrase</td></tr></tbody></table>\n<p>These reading situations are teaching applications of Petersen and Posner's framework, not neural measurements of reading. Networks cooperate; the rows are not successive stages. Their frontoparietal <b>control</b> network is distinguished from the dorsal <b>orienting</b> network.</p>\n<p><a href=\"../../artifacts/spotlight-attention-game.html#human\" target=\"_blank\" rel=\"noopener\">Explore the interactive reading lab</a>: rotate the anatomical cortical model, select a reading moment, and try the same next-token task from the human and machine perspectives. The machine tab preserves six games and adds query origins and training versus inference; the final tab applies Terranova to the social organization of the task.</p>\n<p><img src=\"attention-assets/slides/pasted-image-2025-09-14T18-41-01-466Z-7f762d1b.webp\" alt=\"Image\" loading=\"lazy\"></p>",
  "notes": "<p>The first paper updates Posner and Petersen's 1990 framework. It distinguishes three broad functions: alerting, orienting, and executive control. These are interacting systems, not a fixed sequence of becoming aware, looking, and deciding. The review also distinguishes sources of attentional influence from the processing systems they affect.</p>\n<p>I'll briefly talk through these three functions.</p>\n<p>Alerting concerns readiness to respond. Phasic alerting is a brief increase in readiness, such as after a warning cue; tonic alertness concerns sustained vigilance. The review associates tonic alertness strongly with the right hemisphere, but discusses less settled laterality for phasic effects. It also discusses the locus coeruleus, norepinephrine, thalamic regions, and cortical contributions. Alerting is not simply detecting a stimulus or becoming conscious of it.</p>\n<p>Orienting prioritizes a location or sensory input. The dorsal network includes frontal eye fields and intraparietal / superior parietal regions involved in goal-directed selection. The mainly right-sided ventral network includes temporoparietal junction and ventral frontal cortex, associated with interrupting a current focus and reorienting. Attention can shift without an eye movement. During reading, deliberate selection of a word and reorienting to a relevant margin cue illustrate different orienting demands.</p>\n<p>For executive control, the authors favor a two-network account while discussing alternatives. The cingulo-opercular network supports stable task maintenance; the frontoparietal control network supports initiation, switching, and adjustments during performance. Maintaining the instruction to explain a sentence and deciding to reread a confusing phrase illustrate these demands. They are not isolated reading modules, and the frontal eye fields should not be substituted for the frontoparietal executive-control network. See the review's Executive Control section and Figure 2.</p>",
  "dive": {
   "tab": "human",
   "label": "Deep dive · the three attention systems on a cortical model"
  }
 },
 {
  "index": 2,
  "title": "Functions and Networks",
  "section": "Human attention",
  "html": "<ul><li>Different networks make distinguishable contributions to readiness, selection, and control.</li><li>Several regions cooperate within each network, and the networks interact during ordinary activities such as reading.</li><li>These distinctions do not imply a fixed alerting → orienting → executive pipeline or a one-region, one-function map.</li></ul>\n<p><img src=\"attention-assets/slides/pasted-image-2025-09-14T18-41-01-466Z-7f762d1b.webp\" alt=\"Image\" loading=\"lazy\"></p>",
  "notes": "<p>The important point is the distinction between functions and networks. Multiple regions contribute to a network; distinguishable networks can work together. Their coordination is not adequately represented by a single moving spotlight, nor by a compulsory order of three stages.</p>\n<p>The comparison with transformers is functional: some information receives greater priority in a context. A transformer head is not a brain region. Query, key, and value are three numerical roles inside a weighted-sum calculation; they do not map onto alerting, orienting, and executive control.</p>",
  "dive": {
   "tab": "human",
   "label": "Deep dive · the three attention systems on a cortical model"
  }
 },
 {
  "index": 3,
  "title": "Attention and Learning",
  "section": "Human attention",
  "html": "<p><img src=\"attention-assets/slides/attention-pedagogy-studies.webp\" alt=\"alt text\" loading=\"lazy\"></p>",
  "notes": "<p>Within the context of learning, we can also see how this new attention-oriented work helps to make sense of, in particular, learning <em>difficulties</em>. Impairments on different brain regions can result in complex but still localizable – and potentially addressable – limitations in how attention is alerted, directed, sustained and purposefully redirected, as conditions require. </p>\n<p>Now while this is not a course diving into neuroscientific research, we can note in passing that this kind of neurological or neuroscientific research has impacted upon the theory and practice of pedagogy. A quick Google Scholar search shows for example how many results have integrated \"executive function\" into pedagogy research: 17,200 results since 2021.</p>",
  "dive": null
 },
 {
  "index": 4,
  "title": "Attention and Childhood Development",
  "section": "Human attention",
  "html": "<ul><li>infants first develop alerting functions (with some orienting and executive ability)</li><li>children develop mature orienting and basic executive (concentrating) functions</li><li>adolescents and young adults develop higher order executive (both attention-sustaining and -switching) functions</li></ul>\n<p><b>References:</b></p>\n<div class=\"deck-small\"><ul><li>Rueda, M. R., & Posner, M. I. (2013). Development of attention networks. </li><li>Posner, M. I., & Rothbart, M. K. (2007). Research on attention networks as a model for the integration of psychological science. Annual Review of Psychology, 58, 1–23.</li><li>Boen, R., Ferschmann, L., Vijayakumar, N., Overbye, K., Fjell, A. M., Espeseth, T., & Tamnes, C. K. (2021). Development of attention networks from childhood to young adulthood: A study of performance, intraindividual variability and cortical thickness. Cortex, 138, 138-151.</li></ul></div>",
  "notes": "<p>Several of these studies show that the hierarchy of attention mechanisms - alerting to orienting to executing – also correspond to stages of learning and childhood development. Work by Posner and colleagues in particular has sought to demonstrate that:</p>\n<ul><li><b>infants</b> first develop alerting functions (with some orienting and executive ability)</li><li><b>children</b> develop mature orienting and basic executive (concentrating) functions</li><li><b>adolescents and young adults</b> develop higher order executive (both attention-sustaining and -switching) functions</li></ul>",
  "dive": null
 },
 {
  "index": 5,
  "title": "Neuroscience and Hegel?",
  "section": "Human attention",
  "html": "<blockquote>Without hesitation, the raw instinct of self-conscious reason will reject such a science of phrenology – as well as reject this other observing instinct of self-conscious reason, which, once it has blossomed into a foreshadowing <em>of cognition</em>, has spiritlessly grasped cognition as, “The outer is supposed to be an expression of the inner.” However, the worse the thought is, the less easy it sometimes is to say exactly where its badness lies, and it becomes even more difficult to explicate it. (para 340)</blockquote>",
  "notes": "<p>And to keep concordance with Hegel, we might also note his own strong distrust of the \"neuroscience\" of his day – a now outdated field called \"phrenology\", which involved measuring skulls to determinine cognitive aptitude. Much later in the <em>Phenomenology</em>, he savagely criticises the pseudoscience of phrenology for attempting to account for traits like intelligence based on bumps on the skull. Of course for Hegel, as we have seen, the development of Consciousness and Self-consciousness - and eventually Reason, Spirit and Absolute Knowledge – depends upon an infinitely supple and complex negotiation, both within ourselves and with others. This complex process of development cannot be \"read\" off the shape or dimensions of the skull. In a phrase that pre-empts where we go next week, Hegel states: </p>\n<blockquote>Without hesitation, the raw instinct of self-conscious reason will reject such a science of phrenology – as well as reject this other observing instinct of self-conscious reason, which, once it has blossomed into a foreshadowing <em>of cognition</em>, has spiritlessly grasped cognition as, “The outer is supposed to be an expression of the inner.” However, the worse the thought is, the less easy it sometimes is to say exactly where its badness lies, and it becomes even more difficult to explicate it. (para 340)</blockquote>",
  "dive": null
 },
 {
  "index": 6,
  "title": "Neuroscience: A Modern Phrenology?",
  "section": "Human attention",
  "html": "<table><tbody><tr><td><img src=\"attention-assets/slides/pasted-image-2025-09-14T22-33-13-908Z-4dbfa114.webp\" alt=\"Image\" loading=\"lazy\"></td><td><img src=\"attention-assets/slides/pasted-image-2025-09-14T22-34-05-167Z-40814aab.webp\" alt=\"Image\" loading=\"lazy\"></td></tr></tbody></table>",
  "notes": "",
  "dive": null
 },
 {
  "index": 7,
  "title": "The Gap Between Brain and Mind",
  "section": "Human attention",
  "html": "<blockquote>The idea of mapping psychological functions to brain structures has a venerable history, dating back to Galen’s ventricular doctrine (Green [2003]) and continuing to Gall’s phrenology (Gall and Spurzheim [1810]). Although those theories are now in disrepute, the advent of neuroimaging techniques, such as positron emission tomography (PET), functional magnetic resonance imaging (fMRI), electro-encephalography (EEG), and magnetoencephalography (MEG), gives the prospect of finding one-to-one correlations between psychological functions and brain structures new vigour, and the project is the main goal of the young field of cognitive neuroscience (Posner and DiGirolamo [2000]).1 Yet many doubt that cognitive neuroscience can give us such a psychological atlas, whereby the building blocks of mind get assigned to specific neural structures (Uttal [2001], [2011]).</blockquote>\n<h5>References:</h5>\n<div class=\"deck-small\"><ul><li>Dobbs, D. (2005). Fact or phrenology?. Scientific American Mind, 16(1), 24-31.</li></ul>\n<ul><li>Stea, J. N., Black, T. R., & Di Domenico, S. I. (2022). Phrenology and neuroscience. In <em>Investigating Pop Psychology</em> (pp. 9-19). Routledge.</li></ul></div>",
  "notes": "<p>While neuroscience involves far more rigorous and detailed methods of investigation into the operations of the brain than phrenology, we can note in passing that it has attracted criticisms quite similar to those levelled by Hegel towards the \"neuroscience\" of his day. See for example the following quote from a recent book chapter by Stea, Black and Domenico, titled appropriately for our purposes \"Phrenology and Neuroscience.</p>\n<p>Despite the advances in science, for many today there remains a distinct gap between brain and mind, or the biological processing of signals and the rich descriptions of consciousness we get from philosophy, literature, art and religion. </p>\n<p>How we understand this gap also affects our interpretation of the potential for machines to develop consciousness - our topic for next week. But for now, we need to look at how the concept of attention also applies to machine learning.</p>",
  "dive": null
 },
 {
  "index": 8,
  "title": "Machine Attention",
  "section": "Machine attention",
  "html": "<ul><li>Pre-2017: Recurrent, convolutional networks (RNNs, CNNs)</li><li>Problems: Recurrent networks degrade as the length of text grows</li><li>Attention already used in combination with architectures</li><li>But is Attention All You Need? The Vaswani et al. (2017) Transformers paper</li><li>Implementation by OpenAI: <em>Improving Language Understanding by Generative Pre-Training</em> (Radford et al. 2018): <b>GPT-1</b>.</li></ul>",
  "notes": "<p>Vaswani et al.'s 2017 paper is a landmark in machine learning. Perhaps the most cited paper this century, this work by Google scholars was first actually implemented, not by Google, but by a young start-up company, OpenAI. There is a entire story of intrigue about how OpenAI was founded – with seed funding from Elon Musk – and eventually caught sight of this 2017 paper, understood its potential, and developed something called a \"Generative Pre-Training\" model  (<em>Improving Language Understanding by Generative Pre-Training</em>).</p>\n<p>Now we don't have time or opportunity to fully talk through this paper and its technical details. We would need to venture too far into the history of neural networks and their application to language modelling. But we can say that <em>prior</em> to this paper, the state-of-the-art models were using recurrent or convlutional networks, sometimes with attention mechanisms built in.</p>",
  "dive": {
   "tab": "machine",
   "panel": "games",
   "label": "Deep dive · play the six attention games"
  }
 },
 {
  "index": 9,
  "title": "From linear to grid representations",
  "section": "Machine attention",
  "html": "<p><img src=\"attention-assets/slides/comparison-heatmap-2025-09-15T13-42-51-212Z.webp\" alt=\"Image\" loading=\"lazy\"></p>",
  "notes": "<p>In short the problem with these systems was the need to maintain an ever-growing set of connections between the next token we would like to predict and the tokens or words that preceded it. </p>\n<p>I've used two heatmaps generated by GPT-5 to convey the general idea: RNNs process tokens in a linear way, from left to right, just as we read. But we quickly develop a long set of connections between tokens. </p>\n<p>Instead transformers require every token in a sentence or sequence to be related to every other - no matter how far apart they are in the sequence. This reduces the <em>time</em> involved in processing data, at the cost of increased training time and model space - but these are (comparatively) cheap.</p>\n<p>Shortly we'll do a thought experiment that will hopefully make this more clear.</p>",
  "dive": {
   "tab": "machine",
   "panel": "games",
   "label": "Deep dive · play the six attention games"
  }
 },
 {
  "index": 10,
  "title": "Some general terminology...",
  "section": "Machine attention",
  "html": "<h5>Tokens vs Words</h5>\n<p><b>Tokens</b> are word-like pieces of data that are the foundational primitatives of language models. Why not words?  There are many words in natural language, but often they involve commonly recurring terms (e.g. morphemes, prefixes, suffixes: 'un-', '-ing'). Roughly <b>4</b> tokens per <b>3</b> words.</p>\n<h5>Training vs Inference: </h5>\n<p><b>Training</b> involves building a large language model by processing large amounts of textual (or other) data, to develop up relationships between tokens. </p>\n<p><b>Inference</b> applies the trained model to a particular sequence, e.g. when you ask a question of ChatGPT.</p>",
  "notes": "",
  "dive": {
   "tab": "machine",
   "panel": "training",
   "label": "Deep dive · training versus inference, live"
  }
 },
 {
  "index": 11,
  "title": "Terminology continued...",
  "section": "Machine attention",
  "html": "<h5>Neural Network, Layers, Weights and Biases</h5>\n<p>Describes the structure of a language model: has <b>interconnected</b> nodes organized in <b>layers</b>. Each layer contains (typically) a <b>weight</b> matrix and <b>bias</b> vector. </p>\n<p>Much of the difference between models involves details about the architecture of a network and its layers; how much the weights and biases are trained; and what data is used in training.</p>\n<h5>Feed forward / Backpropagation</h5>\n<ol><li>First we estimate <b>weights</b> and <b>biases</b>, and generate a <b>loss</b>, measuring their accuracy.</li><li>Second we use <b>calculus</b> to update all the weights</li><li>Rinse and repeat, until loss is minimized.</li></ol>",
  "notes": "",
  "dive": {
   "tab": "machine",
   "panel": "training",
   "label": "Deep dive · training versus inference, live"
  }
 },
 {
  "index": 12,
  "title": "Is AI just fancy statistics?",
  "section": "Machine attention",
  "html": "<ul><li>Core Intuition: A <b>language model</b> approximates a <b>function</b> (with many parameters). </li></ul>\n<p><img src=\"attention-assets/slides/linear-regression-2025-09-15T13-42-02-464Z.webp\" alt=\"Image\" loading=\"lazy\"></p>\n<p>Typical multiple regression - a simplified 1-layer neural network:</p>\n<pre class=\"deck-math\">y_i &amp;= \\beta_0 + \\beta_1 x_{i1} + \\beta_2 x_{i2} + \\cdots + \\beta_p x_{ip} + \\varepsilon_i,\n\\quad i = 1, \\dots, n</pre>\n<p>So <b>training</b> is the attempt to produce an (ever more) accurate</p>",
  "notes": "",
  "dive": {
   "tab": "machine",
   "panel": "training",
   "label": "Deep dive · training versus inference, live"
  }
 },
 {
  "index": 13,
  "title": "Attention is Three Matrices: Queries, Keys, Values",
  "section": "Machine attention",
  "html": "<ul><li>Queries: what each token is <b>asking for</b> from other tokens (in training or inference)</li><li>Keys: the <b>relative match</b> of each token to this token</li><li>Value: what the token <b>represents</b> (e.g. in syntax or semantic terms)</li></ul>\n<p>This process is what is meant by <b>attention</b>.</p>",
  "notes": "",
  "dive": {
   "tab": "machine",
   "panel": "query",
   "label": "Deep dive · where a query comes from"
  }
 },
 {
  "index": 14,
  "title": "Thought Experiment",
  "section": "Machine attention",
  "html": "<blockquote>The cat sat on <span style=\"color: red;\">the</span>...</blockquote>",
  "notes": "<p>Let's work through the following thought experiment. We will imagine we have the following unfinished sentence, and we'll focus on the last word, <code>the</code>:</p>",
  "dive": {
   "tab": "compare",
   "label": "Deep dive · read and predict, human beside machine"
  }
 },
 {
  "index": 15,
  "title": "Sympathy for the Machine...",
  "section": "Machine attention",
  "html": "<table><thead><tr><th>Query</th><th>Key</th><th>Weight</th></tr></thead><tbody><tr><td>the</td><td>The</td><td>0.05**</td></tr><tr><td>the</td><td>cat</td><td>0.15</td></tr><tr><td>the</td><td>sat</td><td>0.25</td></tr><tr><td>the</td><td>on</td><td>0.55</td></tr></tbody></table>\n<p> ** Because <code>the</code> rarely follows <code>the</code>!</p>\n<p>What does this set of probabilities refer to? The relevance or how much the word <code>the</code> <em>attends</em> to the other tokens in the sentence.</p>",
  "notes": "<p>Now let's think about this from the machine's point of view, during inference rather than training. We saw from preceding discussion that this word <code>the</code> maintains a place in three lists of words or tokens:</p>\n<ul><li>Query</li><li>Key</li><li>Value</li></ul>\n<p>We are considering the second <code>the</code> as our <em>query</em> word, and we want to know what word should follow. We first compare it with every other word in the sentence, checking against their <em>key</em> values. This generates an initial set of probabilities, for which I'll just use some example values:</p>\n<table><thead><tr><th>Query</th><th>Key</th><th>Weight</th></tr></thead><tbody><tr><td>the</td><td>The</td><td>0.05**</td></tr><tr><td>the</td><td>cat</td><td>0.15</td></tr><tr><td>the</td><td>sat</td><td>0.25</td></tr><tr><td>the</td><td>on</td><td>0.55</td></tr></tbody></table>\n<p> ** Because <code>the</code> rarely follows <code>the</code>!</p>\n<p>What does this set of probabilities refer to? The relevance or how much the word <code>the</code> <em>attends</em> to the other tokens in the sentence. We are primed, in other words, more strongly in favour of 'on the' than anything else.</p>",
  "dive": {
   "tab": "compare",
   "label": "Deep dive · read and predict, human beside machine"
  }
 },
 {
  "index": 16,
  "title": "From Attention to Context",
  "section": "Machine attention",
  "html": "<p><img src=\"attention-assets/slides/pasted-image-2025-09-15T17-24-12-198Z-d12b6f9d.webp\" alt=\"Image\" loading=\"lazy\"></p>",
  "notes": "<p>Now each of these tokens – <em>the</em>, <em>cat</em> etc – also contains a set of numbers relating to their <em>values</em>. The values are – if you like – the semantic space of the word: the <b>cattiness</b> of the 'cat' (noun, animal, furry, etc); the <b>sittingness</b> of the 'sat' (verb, temporal, positional, etc); the <b>on-ness</b> of the 'on') (preposition, relational term); the <b>the-ness</b> of the 'the' (definite article, applies to nouns, connected to preposition). But also tied to the context of the current sentence.</p>\n<p>So once we have a sense of relative attention – how the 'the' relates to other words in the sentence – we combine the values, which we can think of as a hybrid syntactico-semantic representation, with these attention weights. </p>\n<p>This produces a <b>context</b> that governs prediction.</p>",
  "dive": {
   "tab": "compare",
   "label": "Deep dive · read and predict, human beside machine"
  }
 },
 {
  "index": 17,
  "title": "Iterated Context: From tokens to quasi-phrases / sententces",
  "section": "Machine attention",
  "html": "<ul><li>'the' is no longer just a word or token</li><li>its 'the'-ness becomes a kind of 0.55 * 'on' + 0.25 + 'sat etc. </li><li>All of these influences, derived from repeated attention, make 'mat' a more likely continuation.</li></ul>",
  "notes": "<p>This process is repeated over several or many layers of a network. At each layer we develop a richer representation of this context for each token. The mathematical representation of the 'the' we are looking at accumulates the influence of the other tokens it attends to - and so do these other tokens themselves. These ultimately help to narrow the scope – or increase the bias - toward particular tokens such as 'mat'.</p>\n<p>The 'the'-ness becomes a highly specific and contextualized 'the'-ness that is paired strongly with a prepositional phrase; is associated with a spatio-temporal situation - one of sitting; and is (less strongly) influenced by an agent. None of these roles are hard-coded; they are learned by the network. But at the same time they ressemble the rules of grammar and meaning we are used to.</p>\n<p>All of these influences, derived from repeated attention, make 'mat' a likely continuation (from within the wider set of the model's vocabulary).</p>",
  "dive": {
   "tab": "compare",
   "label": "Deep dive · read and predict, human beside machine"
  }
 },
 {
  "index": 18,
  "title": "From Context to Prediction",
  "section": "Machine attention",
  "html": "<table><thead><tr><th>Token</th><th>Probability</th></tr></thead><tbody><tr><td>the</td><td>0.01</td></tr><tr><td>cat</td><td>0.01</td></tr><tr><td>sat</td><td>0.01</td></tr><tr><td>on</td><td>0.01</td></tr><tr><td>mat</td><td><b>0.80</b></td></tr><tr><td>dog</td><td>0.08</td></tr><tr><td>house</td><td>0.08</td></tr></tbody></table>",
  "notes": "<p>This learned context is applied to every item in our initial vocabulary. That would include all the words we have used, plus (in a toy example), other nouns like 'mat', 'dog', 'house'. This produces a final set of probabilities:</p>\n<p>And finally: we roll a virtual die, and produce a set of predictions. In this toy example, 80 per cent of the time the predicted completion of the sentence will be 'mat'. </p>\n<p>Note that this 80% of the time - not 100% - is what makes LLMs often 'probabilistic', 'stochastic' and 'non-deterministic'.</p>\n<p>As a further note: You might also imagine all of this computation gets expensive for (a) large vocabularies (like multiple human languages) and (b) long contexts (like novels). That is true! And why companies like Nvidia and TSMC have such extreme valuations today - to train and do inference on attention-based mechanisms involves hardware investments in the order of tens or hundreds of billions of dollars today.</p>",
  "dive": {
   "tab": "compare",
   "label": "Deep dive · read and predict, human beside machine"
  }
 },
 {
  "index": 19,
  "title": "What about human attention?",
  "section": "Human attention",
  "html": "<p>Let's continue now with a further rough experiment.</p>\n<p>Start by <em>attending to</em> the following words I say:</p>\n<pre class=\"deck-code\">The cat sat on the...</pre>",
  "notes": "",
  "dive": {
   "tab": "human",
   "label": "Deep dive · the three attention systems on a cortical model"
  }
 },
 {
  "index": 20,
  "title": "What about human attention? (continued)",
  "section": "Human attention",
  "html": "<p>Now when I said:</p>\n<blockquote>Start by <em>attending to</em> the following words I say:</blockquote>\n<p>You are <em>alerted</em>. You have to shift from an everyday state to an alerted one, maybe by the fact that I've issued an imperative: 'Start'.</p>\n<p>What follows is your orientation to what actually does <em>follow</em> from the words 'the following words I say'. You are oriented towards the completion:</p>\n<pre class=\"deck-code\">The cat sat on the...</pre>",
  "notes": "",
  "dive": {
   "tab": "human",
   "label": "Deep dive · the three attention systems on a cortical model"
  }
 },
 {
  "index": 21,
  "title": "Executive Functions and Metacognition",
  "section": "Human attention",
  "html": "<p>Do you:</p>\n<ol><li>Complete the sentence?</li><li>Keep listening to what I say?</li></ol>",
  "notes": "<p>But then you are also possibly primed to the visual and audible <em>incompleteness</em>. The sentence doesn't end, instead your lecturer continues on with his exposition. The executive functions need to <em>decide</em>. What do you do? Do you:</p>\n<ol><li>Complete the sentence?</li><li>Keep listening to what I say?</li></ol>\n<p>Or both? Because this is a trivial case, you can complete the sentence very fast, and I'm not speaking too fast. Or do you <em>resist</em> the completion – ignoring my command altogether, or completing the sentence with another word?</p>",
  "dive": {
   "tab": "compare",
   "label": "Deep dive · read and predict, human beside machine"
  }
 },
 {
  "index": 22,
  "title": "Questions on human attention",
  "section": "Human attention",
  "html": "<p>Think for a moment about this final activity. Is <b>your</b> completion different to the <b>LLM</b>? How much of this - pointing ahead to next week's topic – is <b>conscious</b> or <b>unconscious</b>? Do you – like the Transformer model – draft a list of candidates, and pick the most <b>likely</b>? Is there a kind of metacognitive aspect that enables you to determine to <b>sustain</b> or <b>switch</b> your attention? Can you <b>refuse</b> to complete what you ought to - what your training suggests?</p>",
  "notes": "",
  "dive": {
   "tab": "compare",
   "label": "Deep dive · read and predict, human beside machine"
  }
 },
 {
  "index": 23,
  "title": "Make Content, Get Attention... Profit?",
  "section": "Attention economy",
  "html": "<p><img src=\"attention-assets/slides/pasted-image-2025-09-15T17-02-44-763Z-71b12cf1.webp\" alt=\"Image\" loading=\"lazy\"></p>",
  "notes": "<p>Turning now to Terranova's article, we come to the idea that attention is a kind of <em>commodity</em> and even <em>capital</em>, marked - like all commodities – by scarcity. It is an object that in itself warrants the <em>attention</em> of capital, of investors and advertisers, in the context of digital media. This is of course not new - the nephew of Sigmund Freud, Edward Bernays, pioneered many uses of what was then, in the early/mid twentieth century, new media, such as radio, magazines, film and television. But with the maturation of computers, the Internet, smartphones, social media and, today, AI, we come to a point at which we see attention as corroded or \"degraded\" by information. There is so much information, in other worrds, that human attentive processes become saturated, barely able to keep up.</p>\n<p>Terranova argues, citing Nicholas Carr, Catherine Malabou, Jonathan Crary and othres, that precisely the kind of neuroscientific research we discussed earlier makes possible a new corresponding <em>industrialization</em> of attention. By developing sophisticated techniques for securing attention (at alerting and orienting levels), it also seems as though the higher order \"executive functions\" are disrupted. In particular, the ability to \"switch\" is impaired - we find ourselves staring at the screen long past the point at which we intended to, when we initially and intentionally sought distraction.</p>",
  "dive": {
   "tab": "social",
   "label": "Deep dive · run the feed and close the loop"
  }
 },
 {
  "index": 24,
  "title": "Attention and Imitation",
  "section": "Attention economy",
  "html": "<p><img src=\"attention-assets/slides/pasted-image-2025-09-13T20-55-12-927Z-6998cdbe.webp\" alt=\"Image\" loading=\"lazy\"></p>",
  "notes": "<p>In a turn that also reminds us of our discussion of Hegel and the <em>social</em> process of learning, Terranova then discusses how attention to digital media in turn leads to another kind of by-passing of the deeper attention marked by executive function, due to social imitation. </p>\n<p>But this need not be entirely negative. Here Terranova turns to another Italian theorist, Lazzarato, and his treatment of attention as the condition of social labour – and therefore a positive and productive force.</p>\n<p>But Terranova's discussion takes a negative turn again, through the work of Bernard Stiegler. Stiegler – a French philosopher writing on technology since the 1990s – famously argued that contemporary technologies short-circuit important cognitive processes of memory and social processes of communication, resulting in, as Stiegler put it, a grave risk of \"proletariatanization\". Primal psychic and libidinal energy gets put to service, in this analysis, in the creation of value for companies that can direct our collective attention via \"social technologies\" and \"new forms of social relations\".</p>",
  "dive": {
   "tab": "social",
   "label": "Deep dive · run the feed and close the loop"
  }
 },
 {
  "index": 25,
  "title": "Cooperation or Proletariatanization?",
  "section": "Attention economy",
  "html": "<p><img src=\"attention-assets/slides/pasted-image-2025-09-13T21-05-34-066Z-650d5d77.webp\" alt=\"Image\" loading=\"lazy\"></p>",
  "notes": "<p>Collecting up both Lazzaratto and Stiegler's arguments, Terranova claims that – despite the very different valences or attitudes each brings to their analysis – both authors see attention as not simply a store of human attention that is only degraded by technologies. Rather, those technologies redirect attention, which in turn makes possible new kinds of subjects and social relations. For Lazzaratto, technology actually makes humans cooperate in ways that can resemble the internal structure of an individual brain. For Stiegler, technology is similarly integral to all human cognitive and social activity – but in its current form (the Internet, social media, and the general capitalization of attention and associated \"libidinal\" energies), it is tending toward the production of a simplified, proletarianized and even stupified society.</p>",
  "dive": {
   "tab": "social",
   "label": "Deep dive · run the feed and close the loop"
  }
 },
 {
  "index": 26,
  "title": "Is Attention a Design Problem?",
  "section": "Attention economy",
  "html": "<p><img src=\"attention-assets/slides/pasted-image-2025-09-13T21-21-01-254Z-b87a061e.webp\" alt=\"Image\" loading=\"lazy\"></p>",
  "notes": "<p>The reason for including Terranova's analysis – aside from its wide-ranging survey of recent debates – is that in a certain sense it elaborates upon Hegel's insistence that self-consciousness and learning is essentially <em>social</em> in nature. Indeed both Lazzaratto and Stiegler's positions, which Terranova surveys, can be seen as extensions to Hegel's insight, though adjusted for the dramatic effects wrought by informatic technologies. </p>\n<p>The individual human subject is affected by what others say and do, and digital technologies act like a concentrating device of those social habits. Let's exaggerate: every tweet, post or Tiktok we read or watch acts like a small encounter between two self-consciousnesses, which must resolve itself into a micro-master / servant dialectic enounter. Do we like the content, do we stay engaged to it - are we in other words, a servant to it? Or do we criticize, disengage and ultimately walk away? Is our self-regulation of our own attention a method also of self-mastery that resists servitude to others? Or are these attention-grabbing technologies too powerful for self-regulation, and do we need to treat attention management as a collective design problem?</p>\n<p>And where does this then bring us with respect to a technology that arguably exceeds what Terranova, Lazzaratto and Stiegler could ever have anticipated in terms of its potential capture of human attention - precisely via application of its own \"attention\" mechanisms? Hansen argues that as we enter the era of machine learning, platforms will increasingly predict,  and thereby control, even more fundamental processes than our attention: our conscious thinking itself.</p>",
  "dive": {
   "tab": "social",
   "label": "Deep dive · run the feed and close the loop"
  }
 },
 {
  "index": 27,
  "title": "Synthesizing Human and Machine Attention?",
  "section": "Synthesis",
  "html": "<p><img src=\"attention-assets/slides/pasted-image-2025-09-15T04-48-29-169Z-c40d94d6.webp\" alt=\"Image\" loading=\"lazy\"></p>\n<p>Posner on the role of att</p>\n<ul><li>https://www.youtube.com/watch?v=PKzz1OAiTRQ</li><li>https://www.youtube.com/watch?v=uYUdwS7-WvA</li></ul>",
  "notes": "<p>According to many neuroscience, attention is seen as critical to the operations of consciousness. Surprisingly, in recent discussions,  neuroscientists like Posner have also emphasized the experimental and social nature of attention formation, even in infants as they shape their alerting, orienting and executive facilities. Surprisingly, neuroscience may not be so far removed from Hegel's speculations on the nature of consciousness.</p>\n<p> Next week we focus on this concept, bringing closer together Hegel's ideas on consciousness and self-consciousness with other theories. We'll see how some scholars, like N. Katherine Hayles, have sought to combine research into both human cognition and machine learning with more traditional philosophical concerns about the nature of consciousness. We will revisit attention, but also consider ideas of the \"unconscious\" – developed originally by Freud, but surprisingly relevant in the world of machine learning too – as well as Katherine Hayles' work on what she terms \"nonconscious cognition\", operating in the world of machines.</p>",
  "dive": null
 }
];
