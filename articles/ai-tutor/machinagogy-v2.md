---
title: "Machinagogy: Experiments in Staging Teaching Dramas with LLMs"
author: "Liam Magee, University of Illinois Urbana-Champaign"
bibliography: references.bib
abstract: |
    This paper introduces machinagogy -- machine-mediated pedagogy -- to describe AI tutoring systems designed using Hegelian recognition theory and Freudian psychodynamics. Two interventions are proposed: prorecognition-enhanced prompts that instruct an AI tutor to treat the learner as an autonomous subject, and a multi-agent ego/superego architecture where an internal critic reviews tutor output. The paper employs a distinctive meta-methodology: Claude Code (Opus 4.5/4.6) builds, evaluates, and documents the AI tutor by authoring a companion scientific paper -- a process termed "vibe scholarship." The companion paper, included as appendix, reports a factorial evaluation across three generation models (DeepSeek V3.2, Haiku 4.5, Gemini Flash), finding recognition-enhanced prompts produce large, model-independent improvements (d=1.34-1.92) through a calibration mechanism that raises the floor of tutor performance. The multi-agent architecture provides error correction under baseline conditions but becomes redundant when recognition prompts are active.
keywords:
  - machinagogy
  - AI tutoring
  - Hegelian recognition
  - multi-agent systems
  - ego-superego architecture
  - large language models
  - vibe scholarship
  - human-AI collaboration
  - critical pedagogy
  - process tracing    
---



Generative AI's dizzying progress is charted in part by the relentless simulated enactment of existing social relations. In the late 2010s, OpenAI's GPT-1 and GPT-2 were generators of occasionally recognizable but often incoherent phrase sequences [@Radford2018Improvinglanguage, @Radford2019Languagemodels]. 
Successive releases of so-called "instructed" GPT-3 models [@Brown2020LanguageModels, @Ouyang2022Traininglanguage] over 2022 demonstrated strong coherence over extended dialogues, as the initially trained model was further refined through human feedback and reinforcement learning. In the years since the catalytic launch of ChatGPT in late 2022, AI systems - ensembles of models, prompts, training sets and parameters - have extended across  large swathes of the knowledge economy, wherever digital media can be reconstructed by processes of stochastic gradient descent. Customer service, software development, copy writing, graphic design and student tutelage are just the more immediate targets of what can be readily imagined as a conceptually singular planetary machine that seeks to synthesize, in the many meanings of that term, what Marx, following Hegel and others, had referred to by the name of the 'General Intellect'  [@Pasquinelli2019originsMarxs]. Foregrounded in that claim is corresponding questions of labor: what is displaced in this gargantuan task of automation. In the world of education, where AI has increasingly been tasked with playing roles of tutor, critic, grader, research and lesson planner, it becomes possible already to anticipate and even monitor the substitution of human-level teaching by state-of-the-art foundational models such as ChatGPT, Anthropic's Claude, and Google's Gemini. These models can perform rhetorical and discursive tasks – explain, translate, summarize, provoke, analyze – that comprise a ever-widening repertoire of digitized teaching and research. 

It is in light of these developments that this paper seeks to explore two related topics. The first relates to issues surrounding the performance of AI tutors as currently constituted. Like other simulations of deep human understanding, AI tutors remained locked and limited in important ways. In sustained conversation automated chat agents remain distinctly monotonal, lacking the dialogical dynamic that marks teaching and other human interaction in its ideal communicative moments. Aspects of this flattened discourse have been well documented, including in prior work conducted by colleagues and I in 2024 [@Magee2026DramaMachine]. In that work, and to address this tonal flatness, we instrumented a multi-agent design loosely derived from a Freudian model of interiorized ego – superego exchange, and claimed to detect signs of greater dialogical modulation resulting from this design. However this claim was self-reported, not quantified, and did not relate to education. This current paper continues with the Freudian model but, acknowledging the inherently *relational* condition of the teaching situation, also engages Hegel's famous analysis of recognition [@Hegel2018Hegelphenomenology] to test effects on a simulation of student/teacher dynamic. The role of recognition in education has been widely discussed [@Huttunen2004TeachingDialectic, @Tubbs2005ChapterHegel, @Stojanov2020EducationFreedom, @Tubbs2023ReeducatingThinking,@Azadmanesh2023HegelianBildung], and its philosophical elaboration, sketched in the sections below in relation to Hegel, develops one path to an enriched imitation of relationality. 

Ironically given this commitment to modeling dynamic and relational characteristics, the study reported here is entirely synthetic. Both learner and teacher roles are performed by language models, as is the judgment of the quality of their interaction. But this limitation and caveat over the resulting claims also supplies the key to the second topic: how today's AI can assist in the conduct of educational research itself. By deliberately excluding human participants from the experimentation, it becomes possible to examine how AI can support research that is, in this instance, orchestrated by a single human researcher. This part of the paper proceeds methodologically in an unusual way: it involves working with Claude Code (Opus 4.5 and 4.6 models) to construct of a scientific paper that details the first topic: specifically, the background, literature, design, methods and results relating to how an AI tutor can be constructed following cues from social and psychoanalytic theory. The data analyzed in *this* paper is then the final result of that process: another paper entirely authored (with the exception of the title and one self-reflexive footnote) by Claude Code itself. 

This strange elliptical pattern involves along the way two meta-scholarly claims: that this construction of an automated scholarly paper, shadowed and detailed by another humanly-authored paper, firstly involves a specific and novel approach to research and secondly, shadows the very subject - that of an emerging dyadic relationship - being described. Following Andrej Karpathy's coining of the term "vibe coding" [@Karpathy2025Thereskind, @Meske2025VibeCoding], it is tempting to describe this approach to research glibly as a form of 'vibe scholarship': I start off with a hunch, I prompt, I build an evaluation system, I simulate some exchanges, I review and prompt some more. Parts of this process naturally pre-date generative AI; across disciplines, terms like 'pilot', 'proof-of-concept', 'exploratory data analysis' and 'grounded theory' already describe, alongside their strengths and weaknesses, inductive research strategies and data-driven inquiry. But due to the speed and comprehensiveness of application of methods, and at least for certain forms of technical inquiry, the arrival of generative AI arguably alters the conventional choice matrix around research strategy and method. Lacking the language to describe the difference, this nonetheless makes for an altered mode of knowledge production.

It is an open question whether this arrival is beneficial in fields like education. In describing one among many possible exploratory journeys employing generative AI for educational research, this paper also seeks to attend to related theoretical questions at the core of the emerging new dyadic relationship between human and machine. The Hegelian analysis of recognition pursued in the context of learner/student variant of that relationship is no less relevant to the research variant. Much has been made of the human skills needed to manage emergent AI agents; less about the ability of human and AI to navigate their respective shares of the shifting directions of dialogue, and to determinate, through each call-and-response, who ought to be leading who. As the account below shows, as the ablative nature of the study's first exploratory phase went into exhaustive search of results through 'p-hacking', the machine seemed content to follow human prompting without ever suggesting major correction. Only once this correction was put forward in a follow-up validation phase did the machine faithfully detail a revision plan. Yet at other times it could challenge existing and propose new lines of inquiry and explain narrow and broader consequences of results, putting into question whether AI is already overcoming the sycophancy documented by recent research suggests [@Lee2025SycophancyTeaching, @Shapira2026RLHFAmplifies]. Together, in generating the empirical ground of this current paper, these dialectical oscillations also enact, methodologically, the very thetic content of the automated one it accompanies. 

Following the topics presented above ,this paper addresses two related questions: (A) whether theoretical accounts of relationships – intersubjective (in the case of Hegel) or intrasubjective (in the case of Freud) – can apply to the design of an AI teaching simulator; and (B) what happens when AI is itself engaged to design and evaluate that simulator, with human guidance and steerage. The response to the first question is largely contained in the accompanying paper entirely authored by Claude a lengthy appendix in effect to this one. Meanwhile the nature of the responses to (B), authored by me, adopt a narrative account of the research process itself, together with reflections, both theoretical and practical, on the implications of these two levels of analysis of the same experiments. 

Accordingly the paper begins with a schematic outline of Hegel's concept of recognition and Freud's concept of the superego. Aspects of this outline had previously been part of a course on Hegel and AI, which for that reason also forms the basis of the content taught by the AI tutor. This outline is briefly extended in a discussion of the recent work of Axel Honneth, a contemporary account of recognition that borrows from both Hegel and the psychoanalytic tradition, and which forms a theoretical pillar against which to calibrate the following discussion of human-machine interaction. That discussion features both notes of the experiment in designing and evaluating an AI tutor, and a summary of observations that followed. The paper concludes with a consideration of how recognition is to understood for this new kind of social formation between generative AI and human "user", and how in turn this might inform the current structural transformations happening to practices of teaching and research. 



## Setting the Scene of the Teaching Drama 

As Derrida [-@Derrida1987PostCard] writes in *The Postcard*, the famous relationship between Socrates and Plato depicted in Matthew Paris' *Plato and Socrates*, was always open to interpretation. The classical interpretation was that Socrates the teacher spoke, while Plato the student faithfully transcribed the teaching. Paris' medieval image inverts this order: it is Socrates who writes, and as Derrida suggests, Plato who perhaps observes, directs or even produces the 'text' of Socrates. This scene of an originary moment of Western philosophy is also one of dialogical instruction: to think is also to involve an encounter between the one who knows and the one who needs to know. Though pacific enough, this image alludes to the inevitable drama involved in this encounter. Plato gesticulates; he has a point to prove. Socrates could be taking note, or could be ignoring his student, impatient to commit his own thoughts to the page. As Long [-@Long2014CoverMatthew] suggests in a gloss on Derrida's discussion of the portrait, positioned behind Socrates Plato also appears in a position more commonly held by either angel or devil in medieval painting, including in others drawn by Paris. In this interpretation, as angel or devil, it is Plato who instructs, and Socrates who writes down the lesson. Derrida [-@Derrida1987PostCard] was keen to note even other more whimsical possibilities: Plato, anachronistically but not out of character, jumping on a tram or running off with a skateboard. These animated vignettes allude to all kinds of possible dramas unleashed by Paris' medieval cartoon. 

<!--^[See Matthew Paris, *Plato and Socrates* (c. 1250), reproduced in Long [-@Long2014CoverMatthew].]-->

![*Figure 1. Matthew Paris,* **Socrates and Plato**, c. 1240–1250. Ink drawing in Oxford, Bodleian Library, MS Ashmole 304. Public domain (via Wikimedia Commons).](images/pasted-image-2026-03-10T20-02-01-093Z-9a97c661.png){width=67%}

On the edge of the absurd, these possibilities allude to the multifaceted theatricality involved in human student / teacher relationships. Even advanced modes of current AI models find it difficult to capture such variation. To explore parameters for doing so, the experiment described below borrows an admittedly extravagant conceptual apparatus drawn from two theorists, Hegel and Freud, of the existentially dramatic nature of dyadic human relations. The discussion in this section briefly rehearses these respective accounts, and seeks to direct them toward the particular stage where teaching and learning are enacted. 

For Hegel, intersubjective relations are primordially established through the agonistic meeting between two subjects or minds. This meeting is critical to how consciousness becomes self-conscious. Paradoxically, it is only through encountering another self-consciousness in formation that I myself can become properly conscious of myself as a self or subject. Until that point I am merely conscious, an evolving sensing, perceiving and understanding being who as yet is unable to move into a full life marked by desire and, eventually, recognition. In Hegel's telling this apprehension of an another is uncanny; something I perceive as totally alien yet also something very like me, a thing capable of sensing, perceiving and understanding. The encounter between these two consciousnesses, each seeing something of themselves in the other, is not some happy accident. It is necessary to greater learning, but it is also fraught with risk. One party can die; this is an existential struggle [@Books1933IntroductionReading]. Or just as precipitously, from the point of view of the developing self-consciousness, the other party can gain mastery. To succumb to the power of that other is to be marked by servitude, incapable of realizing autonomy. Yet for Hegel, it is perversely this mastery that marks the sudden arrest of progress towards self-consciousness. Foretelling an endlessly repeated tragedy that, in the work of later philosophers like Heiddeger and Stiegler, comes also to be projected onto human-machine affairs, it is the initial master who is later discarded by history, and  denied Spirit's movement through *Bildung* and education. 

Something of this same dramatic interlude appears in miniature in the novel teaching encounter [@Tubbs2023ReeducatingThinking]. Introduced at the start of year or semester, the teacher presents themselves as a figure of authority. If they have not gained ascendancy over the student, that is because their mastery has been acquired elsewhere, in the frequent defenses familiar to schools and the academy. As master of a subject they command attention from the student who, in a position of subservience sits – perhaps attentive, bored, or even rebellious, but even then, still recognizing the asymmetry of their relation to the one who teaches. Recognition depends upon this prior acknowledgment of mastery. This of course does not describe every teaching reality, even prior to modern efforts to re-write this asymmetry according to an egalitarian dynamic composed of facilitation and flipped classrooms. There are moreover all sorts of strategies for offsetting asymmetry: the teacher's humorous self-deprecation or selfless sublimation into the wonders of their field; the learner's heartfelt appreciation for the lessons, shown in their own progress in the discipline; or the joint struggle against the felt demands of a modern educational bureaucracy.

Still, remnants of this drama always remain, and at its heart lies the Hegelian concept of *recognition*. In Hegel's [-@Hegel2018Hegelphenomenology] original presentation, recognition was desired by both parties, an essential gesture toward self-consciousness. I cannot know myself unless I can see someone else knows me for what I am; without this corroboration or triangulation, I am plagued by doubt, skeptical to the core about the very nature of my being. Without this other, my consciousness is condemned to move in circles wondering what kind of 'self' it is. But it is equally apparent that we are different, and in our sizing each other up, by virtue of age, wealth, power, strength or knowledge, one of us dominates. In a certain sense, this very raw fact of domination binds both of us together, who equally affected by this inequality, and in either case, dominated or dominating, the asymmetrical character of my relationship to this other mocks my own desire to be known by them, and to come to know myself through them. For the eventual servant is not recognized by the master, who after all cannot recognize what is beneath them. But conversely the master, who also craves recognition, has only the servant to recognize them. Like Pozzo and Lucky from Beckett's *Waiting for Godot*, we are each condemned to play out our roles in frustration. The opportunity for breakthrough comes not in the form of any resolution to this tension, but rather through the servant's immersion in the world of objects, which they in turn come to know and master. The lessons are autodidactic, unless it can be claimed that it is the master who manufactures, surreptitiously, in a gesture of subversive benevolence, the conditions for the servant's own learning. At any rate it is labor and the accompanying education that permits the servant to come to be recognized.

What can be seen as the breaking through of this cycle in a teaching context is established by the collapse of the agonistic dynamic altogether. This is constituted when student and teacher arguably recognize each other via something like a temporal shift. When the student learns, the teacher comes to see themselves as they too once were, at the moment of self-apprehension. Conversely, in their struggle to comprehend, the student anticipates an eventual moment of mastery, when they too become like the teacher. The asymmetry of the present dissolves in this twin experience of recall and projection. The asymmetry is experienced, in other words, on both sides as what Tubbs notes is the *contingent* character of the education relationship. Since this relationship is often marked by a difference of age and experience, this contingency extends to a question of chronological ordering: were I you and you me, we might share this exact same moment in reverse, me now as teacher, you as student. This contingency itself then falls away to reveal a more fundamental equivalence, and in this, we establish a mutual recognition.

For Freud, or perhaps more correctly, a Freudian reading of Hegel [see @Books1933IntroductionReading], even this recognition remains fraught with antagonism. No encounter is ever purely dyadic. In the background lurk the ghosts of past encounters, other authority figures, other masters. In *The Ego and the Id*, Freud [-@Freud1961TheEgo] employs the metaphor of a rider to represent the *egoic* mastery exercised over animalistic drives of the more powerful *id*. More ominously, the third interior character is the super-ego, an idealized figure resulting from early childhood parental identification. In later life, the super-ego is a 'precipitate' left over from this early projected ideal, who continues to haunt the ego with precepts ('You ought to be such and such (like your father)' [@Freud1961TheEgo, p. 44]) and prohibitions ('You must not be such and such (like your father); that is, you may not do all that he does; many things are his prerogative' [@Freud1961TheEgo, p. 44]). Freud follows up this introduction of the super-ego by way of a discussion of the Oedipal scene with acknowledgment of the reinforcement that comes by way of later repressive forces ('discipline, religious teaching, schooling and reading' [@Freud1961TheEgo, p. 45]). 

But what is significant here is the effective *doubling up* of both tutor and student relations. Leaving aside the presence of the Id or unconscious, it is as though the teaching encounter is also marked by secondary conversations. The teacher teaches the student, but the student's ego also experiences a separate *voice* of its super-ego, who may reinforce the tutor's lesson or, alternately, resist it. As an example of the latter, we might picture a scene from the television series *Adolescence*, when the young boy mocks the "teacherly" psychologist with lines gleaned from online lessons, representing an earlier authority (in this case, online influences – the "father", as even Freud noted, can be symbolic). This resistance needs to be overcome by teachers employing transference techniques that echo, while also having a long history of their own, those of psychoanalysis. 

This is no less true for the teacher themselves, who through a Freudian lens also experiences an interior dynamic between a rational ego and ghosts of past ego-ideals, congealed in the form of conscience  [@Freud1961TheEgo]. Indeed the teacher must forever seek not only to exhibit authority in front of the student, but justify themselves before their own residues of other egoic figures. As Freud [-@Freud1961TheEgo, p. 52] puts it, 'Thus in the id, which is capable of being inherited, are stored up vestiges of the existences led by countless former egos; and, when the ego forms its super-ego out of the id, it may perhaps only be reviving images of egos that have passed away and be securing them a resurrection.' Translated into pedagogical practice, the teacher can be said to submit their teaching to the scrutiny of both student and, more terrifyingly, their own teachers who live on as internal supervisory echoes. Moreover, since the super-ego stems itself from early childhood, it eternally orients itself towards an infantilized form of the ego itself. Like an imposter syndrome that can never be dispelled, it refuses to believe the ego can ever amount to more than a child that always requires instruction, and like the frustrated master/servant dialectic. In an endless repetition of a stagnated dynamic, it continues to mocks the teacherly ego, which is all the more defensive in its insistence upon its mastery. Perversely, it is only through the learner's recognition that the teacher can be reassured. Through that recognition the teacher's ego is able to insist upon the present-day reality – 'I am teaching and the student is learning' – against super-egoic skepticism. In this sense both learner and teacher are able to escape their respective ego-superego 'loops' only by transferring attention to the present reality of their intersubjective encounter - suspending these interior voices long enough to eventually re-program them. 


## 'Recognitive-theoretic' learning

In theoretical terms this splicing together of exterior social relations and interior psychodynamics has often received attention since Freud's own efforts to diagnose the roots of social pathologies in *Civilization and its Discontents* [@Freud2015CivilizationDiscontents]. 
Recent attempts to develop so-called 'recognitive-theoretic' [@Stahl2013WhatImmanent] ideas of a wider 'critical theory of society' [@Honneth2014StudiesTheory] have mined Hegel's conceptualization of recognition, and in the case of Honneth's work especially, have also sought to connect this social theory variant with psychoanalysis. Honneth's analysis is not uncritical of either Hegel or Freud, and even in its first articulation sought to replace Freud with later object relations theory [@Honneth1996StruggleRecognition]. Before discussing the computational experiments themselves, it is helpful to revisit this analysis, since Honneth's wider aim also has application in even the minimal social arrangement that constitutes the tutor-learner encounter [@Huttunen2012DiscourseRecognition]. 

In Honneth's analysis [-@Honneth2014StudiesTheory], critical theory has always needed an psychologizing account that can explain the paradigmatic twentieth century problem faced by socialist thinkers: why, when faced by the putatively obvious case for an equitable economic system of redistribution, do those who stand to benefit – the workers, the poor, and so on – consistently vote or act against their own interest? This is especially difficult to comprehend once extrinsic factors – fear of the struggle to death, ideological blinkers, and so on – fall away in modern democracies. To account for this requires a psychological theory capable of describing, as Honneth (and Freud [-@Freud1952Negation] before him) puts it, the concept of negativity / negation. According to Honneth, despite its misgivings no other mainstream theory explains why social agents would consistently act against their apparent interest, driven by unconscious drives and desires: 'In order to be able to take account of the opaque, unconscious motives expressed in anxiety, longings for attachment, desires for togetherness and fantasies of submission, we need a psychological theory of the subject, a theory of socialization that takes sufficient account of the genesis of unconscious affects in our individual biographies' [@Honneth2014StudiesTheory, p. 224]. Negation is a fundamental example of how these opaque motives present themselves; it is a psychic function that allows something repressed to be represented to consciousness precisely in the form of its denial [@Freud1952Negation]. Projected into the social sphere, negation is further linked to the destructive and masochistic libidinal impulses that enable, for example, a member of the working class to simultaneously identify with and prostrate themselves before a master. In Adorno' social reworking of Freudian negation [@Adorno1951FreudianTheory], this curious dynamic explains the absence of progression to recognition. Rather than developing through its essential stages, Hegel's master/slave dialectic gets stuck in a kind of perpetual machine of domination and subservience that pleasures both parties. This pleasure is purely libidinal and coupled with aggressive tendencies; as Adorno notes, in its fascist incarnation in Nazi Germany, 'reference to love is almost completely excluded' and where it is mentioned, only with the 'epithet of "fanatical" through which even this love obtained a ring of hostility and aggressiveness against those not encompassed by it' [@Adorno1951FreudianTheory]. Finally, even the ties binding leader to people is necessarily asymmetrical: 'the leader can be loved only if he himself does not love' [@Adorno1951FreudianTheory]. The Hegelian avenue for emergence from repetition - labor and accompanying education - becomes closed off under modern capitalistic relations of production, since it is labor itself that becomes mechanized, progressively automated and, echoing the master/servant dynamic itself, repetitive. 

Honneth's own reasons for seeking to move past this Freudian-Adorno analysis of social relations relates, it seems, precisely to a need to negate this negation, and to find an alternate path toward an socially emancipatory future founded upon mutual recognition across different social layers of the family, the community and the state. Even in capitalist society less destructive options are possible, and for Honneth these arrive through the elaboration and critique of the Freudian story via later object relations theory. Here the possibility is instead that the subject is able to grow to transfer attachment from inanimate objects to other people. This begins a period of hopefully permanent healthy egoic development and education in conjunction with others, as attachments lose their infantile narcissistic and pleasure-seeking function and become integrated into a self-confident subject capable of maintaining a set of mutually constitutive social relations based on differing forms of recognition [@Stojanov2020EducationFreedom]. 

At face value, the architecture described here, combining Hegelian and Freudian frames, ignores key steps in Honneth's careful navigation and redefinition of the concept of recognition [@Honneth1996StruggleRecognition]. Yet for this paper's case attention to the precise contours of Honneth's argument can be overlooked, as the main purpose of these frames is to orient the language models towards simulation of more dynamic – dialectically (intersubjective) and psychoanalytically (intrasubjective) – modes of interaction, performed via the equivalent of stage notes or prompts passed off-stage to the main characters (tutor/learner, ego/super-ego etc). High fidelity to the nuances of a particular interpretation is here less important that building a simulation structure that theoretically could permit more complex interactions in the simulation of learning. The purpose of this lengthy detour hopefully becomes clear here: one hypothesis for the experimental success of both Hegelian and Freudian models is they re-situate the default dynamic of simulated tutor and learner away from the repetitive and frequently patronizing tonality of language models employed as pedagogical tools. 


## Towards 'Machinagogy': Recognition and Acting Out

This brief characterization can too readily be seen as enacting its own deliberate dramatization, as though other more benign models might not be more credible, as well as being better supported by a rich empirical literature. This paper's aim though is not primarily one of defending a specific theoretical orientation. Instead it is to make more explicit the conceptual heritage that simulated pedagogy inherits, and not only from explicit models of education. For all its claims to novelty the field of machine learning continues to fall back upon comparable (though much more simplistic) myths and idealizations of humanistic cognition and socialization. Reinforcement learning – the paradigm through which LLMs are able to 'align' with human values – derives from a behavioral and mechanistic model long since abandoned in education. Without naming Hegel or Freud, GANs – Generative Adversarial Models – re-stage the conflictual relationships described by both. As Minsky has noted in a provocatively titled essay, Freud's psychic architecture was to prove influential in early AI experiments - especially those informed by cybernetics - and continues to echo, less explicitly, in the repressive effects of reinforcement learning applied to LLMs. As generative AI has given rise to inevitably anthropomorphic 'traits', researchers at Anthropic have released a series of papers that read as much like Freudian case studies of AI neuroses as they do technical papers. Replace 'large language model' with a human surrogate like 'infant' or 'patient', and the following Anthropic research paper titles could be taken from an early psychoanalysis conference: 'Signs of introspection in large language models', 'Tracing the thoughts of a large language model', 'Alignment faking in large language models', 'From shortcuts to sabotage: natural emergent misalignment from reward hacking', 'Reasoning models don't always say what they think', 'Auditing language models for hidden objectives', 'Sycophancy to subterfuge: Investigating reward tampering in language models' [@Lindsey2025EmergentIntrospective;@AnthropicAI2026Tracingthoughts; @Greenblatt2026Alignmentfaking; @MacDiarmid2025NaturalEmergent; @Chen2025ReasoningModels; @Marks2025Auditinglanguage; @Denison2024SycophancySubterfuge]. Alongside flat anthropomorphic metaphor, machine learning has already long leaned into the structured intersubjective and interior registers of the humanistic disciplines.

To address the first of its questions this paper proposes an architecture for an AI tutor that borrows explicitly from Hegelian and Freudian analyses to condition the tutor's behavior. The purpose is to see - albeit within the constraints of purely synthetic environment - what a much-reduced and simplified instrumentation of these models can nonetheless yield experimentally, in terms of greater quality of interaction, greater dialogical modulation and, ultimately, learning. In the first instance an agent representing the Tutor (and in certain configurations, the Tutor's *ego*) interacts with a learner (either human or, in the evaluations described here, another agent). That interaction is detailed in the tutor's prompt in one of two ways: either as a conventional interaction expected of any generic tutor, or as an interaction that strives towards recognition. 

Second, both tutor and learner can be modeled as single agent and multi-agent systems. In the single agent, both learner and tutor are LLM agents interacting with each other accordingly to a generic role-based prompt. In the second instance, following [@Magee2026DramaMachine], either or both tutor and learner roles are modeled as a pair of LLMs agents, one of which represents the *ego*, the other, the *super-ego*. In this case when the ego receives a message from the other role, it first formulates a response, then plays the response *to the super-ego*. The super-ego then either approves or criticizes the message, whereupon the *ego* agent updates its response before forwarding it on to the other role. 

These two additions have a purely demonstrative function: to see what happens when LLMs are configured to play out philosophical or psychoanalytic roles to showcase complex social and psychic interaction. But, as with [@Magee2026DramaMachine], there is a pragmatic purpose: to see if these changes also can improve the performance of the tutor (and the learner, as one measure of the tutor's performance). The hypothesis is that LLM agents quickly devolve into a fixed and monotonous pattern without incentives to adapt and evolve. One method of coercing that adaptation is, again following [@Magee2026DramaMachine], to stage an interior dialogue, with a super-egoic critic seeking to second-guess or check the (typically) breezy and flattering patter of the egoic teacher. Another is bring the concept of recognition right to the fore, in the form of prompt specifications that demand that the ego agent (with or without super-egoic interruption) seek to recognize and be recognized by the other agent. 

Despite famous efforts at conciliation, this amalgam of Hegel and Freud is not itself necessarily a happy one, and in a certain sense, the implicit conflict between the two designs can itself play out in how, for example, learner ego and tutor super-ego monitor and seek to condition the tutor ego role. Moreover, by contrasting both interventions (the Freudian ego/super-ego again doubled, for tutor and learner role) with a generic baseline allows an ablative 2x2x2 experiment to be conducted: with/without learner and tutor super-ego roles, and with/without the recognitive prompt suggestions. A further LLM agent, powered by a commercial state-of-the-art model, then applies a rubric to judge both tutor and learner performance against evaluative rubrics. 

Finally, different combinations of the LLMs themselves were selected for the different roles. All LLMs were requested through the OpenRouter service, as this provided a convenient means of using many models and configurations. The baseline model was Nemotron 3, an open source model operating free-of-charge on the OpenRouter service; this proved to be slow and too low quality, and was replaced in the second set of experiments documented below by DeepSeek 3.0. Other combinations included use of other leading open source models, as well as commercial models by Anthropic and OpenAI. Adding model configurations added more complexity, but allowed other practical questions to be posed: could for example combinations of free or lower cost models be enticed into performing like more expensive models with simpler or less directed prompts?

The entire experimental design and analysis was undertaken by applying a set of Claude Code + Opus 4.5 / 4.6 (hereafter 'Clopus') agents. These agents - distinct from those used in the experiment itself - were tasked with developing an evaluation harness and rubric; authoring initial prompts, with and without reference to recognition, for both sets of ego/super-ego roles; analyzing results of the evaluation; writing up a Latex 'paper' with this analysis; and reviewing, critiquing and refining both the experimental design and write-up. To obtain meaningful results this involved a number of iterations, as the experimental design evolved and the various bugs were addressed. The 'data set' therefore includes all code, synthetic data produced through the experiments, prompts, interim notes, experimental outputs, analysis artifacts such as figures and tables, and the contents of the final 'paper' itself. Responding to the second of the opening questions – how AI affects educational research - what follows includes a recounting of how these papers were constructed. The final 'paper' is included as an appendix, with references being made to this Claude Code artifact in the paper proper.

This unusual procedure reflects the similarly unusual affordances introduced by 'Clopus'. Alongside the erstwhile evaluation of the conceptual architecture, this study also discusses how this new combination operates as pseudo-researcher. In this orchestration, the human and machine 'researchers' routinely switch roles of 'learner' and 'teacher', signaling a shift that complicates not only an ontological boundary but also, at a certain level, reproduces the very drama that the research seeks to stage. 



## Construction of a 'Paper'

Development of the AI tutor paper took approximately two and a half months, between late December 2025 and early  March 2026. Initially the evaluation framework was developed as part of another project and repository; after the first month, the evaluation framework was set up as its own repository. Shortly after, on February 5, Opus 4.6 was released, requiring some revisiting of earlier evaluations and offering a more powerful co-research agent. The ostensible focus of the study related to the theoretical material discussed above: could a framework composed of Hegelian recognitive and Freudian regulative superegoic features - for both simulated tutor and learner - improve the quality, judged purely synthetically for now, of the learning experience? Yet, and as discussed in the *Introduction*, these questions were in another sense proxies for another set of underlying or  meta-questions: could a consumer-grade AI act as a co-researcher? If so, what were its strengths and weaknesses? How should the human researcher adapt to these? What is the epistemic status of the results? And what can we say in general about the utility of the concept and practice of "vibe scholarship"?

The first month was marked by prototyping an evaluation framework: designing an appropriate agent architecture, developing an evaluation rubric, stipulating experimental conditions, and building evaluation outputs (the research paper, notes of interim findings, various utilities). By the end of that month, it was clear a major refactoring was needed, and Claude developed two standalone repositories. The first housed the core materials for the tutor itself (machinespirits-tutor-core), while the second contained the artifacts for the evaluation (machinespirits-eval). The first month also suggested preliminary findings: the Hegelian recognition "feature" appeared influential, the Freudian multi-agent design less so - but the two in combination had some synergistic effect. 

The first month was also marked by a surprising and mixed sense of rapid progress, and rapidly compounding complexity. The refactoring work that commenced the second month, by contrast, was frustrating and error-prone. At times it felt as though minor technical artifacts or glitches could disrupt the entire tendency of the previous findings; at other times, as though the iterated "vibe" experience of research was conducting a random walk through a large space of possibilities. Both senses were compounded by an overly quick desire (by both machine and human) to preemptively "theorize" early findings. 

The second month, in contrast, involved what felt like a much slower, frustrated and heavily iterated progress through a series of supplementary experiments. Often these involved cross-checking or triangulating findings. What if, instead of materials about Hegel (which could get mixed up in analysis of the findings themselves), we used a separate curriculum? Or if we judged the transcripts with a separate judge? Increasingly Claude was asked to double-check overall rubric scores by comparing individual dimensions and simulating qualitative analysis of the transcripts themselves. This exposed, quite late in the process, two critical bugs: first, the dynamic learner (composed of its own superego/ego pair) had been "leaking" feedback from what ought to have been its private internal conversation to the tutor - complicating in turn the tutor's response and leading to the overall conversation being judged more negatively. Second, another bug meant that learners only saw their own part of the dialogue, and experienced no learning benefit from the tutor at all. This meant every learner response would seem stuck in mechanistic repetition – precisely what the overall design is intended to circumvent. Together these resulted in Claude earlier identifying what it termed a "learner superego paradox", where the learner's performance was degraded by the introduction of the superego role. This effect was later much reduced. Once identified and addressed, subsequent evaluations could properly isolate, in particular, the effect of a dynamic learner. 

In terms of questions about the process, the second month was precautionary and illuminating. In one sense the "superhuman" amplifying effects of Claude Opus were undone by patient review and results. Assumptions, made by both human and machine, had to be rechecked and sometimes unwound. Tests needed to be repeated multiple times with minor variations, resulting in still greater complexity. Machine (and human) review of individual transcripts needed to sort out often confounding dimensional-level and aggregate scores. Unlike most conventional research of this kind, it often felt as though the entire exercise relied upon details that could collapse. In a certain sense precisely toward its conclusion the exercise began to feel like the pilot study it was: full of tantalizing paths but also subject to hidden and catastrophic flaws. 

Recognition of these flaws led to a rapid redevelopment of "version 2.0" of the paper on February 25th. Ironically, many of the changes sought to overcome the effects of "vibe" (exploratory, casual, prompt-driven) evaluation. The new paper was developed with several sets of changes:

 - The idea of a "provable", "testable" paper where all major claims had provenance back to the code base, evaluation transcript logs and database.
 - Tighter integration between database and transcript logs, so that (AI-generated) quantitative scores could be linked to follow-up qualitative analysis.
 - Overhauled rubric, extracted from existing pedagogical literature, and extension of the evaluation to include whole dialogues as well as individual messages.
 - Bug fixes, additional tests, and greater transparency over the generated dialogue (including simulated internal "ego/superego" dialogue).
 - Analysis tools to inspect rubrics, compare model performance, analyze scripts, and compare transcripts across runs. 
  
In addition, as detailed in the *Appendix*, the new paper aimed to focus on the causal mechanisms behind observed changes, and reduced reliance upon the exploratory ablative nature of the original study - which in hindsight also appear to be searching for any mechanism that might trigger statistically significant results. 

In conjunction with fixes to the underlying evaluation infrastructure, these changes led to a cleaner and more auditable "paper 2.0". This comes at the expense of the aspiration of *this* paper: to examine whether "vibe scholarship" would be a viable alternative to regular research. As no control exists, there is also no way to assess that aspiration. The need to inspect then radically revise the paper demonstrated though the Janus-like nature of AI-augmented "fast" research: it can lead to both catastrophic breakdown and corrective adjustments to the research design. These adjustments had an ironic effect: whereas the multi-agent design showed no results for either tutor or learner in the first paper version, in the second the tutor multi-agent design in particular proved significant. This design also had much less impact on variants using the recognition mechanism; as Claude noted, superegoic interventions substituted for rather than added to prompts featuring strong recognitive instructions. The second paper also detailed three further contributions: (a) the automatic traceability of claims back to database entries, log files and experimental conditions; (b) the differential impacts of prompting strategies on weaker and stronger models; and (c) most significantly, the possibility to "autotune" prompts towards improving performance on specific criteria, such as modulation. 

The study itself suffered from several limitations. Most conspicuous is the absence of human participants as learners and evaluators. The attempt to apply both key theoretical mechanisms – and so being able to claim different improvements across both social intersubjective and psychic intrasubjective dimensions – was unsuccessful, since either could be substituted for the other. All along there has been the possibility that the recognition-oriented prompt itself simply conditions responses toward the sort of discourse a separate language model will still identify as being learning related. The failings of the first paper - despite the superficial theorization of results and analysis - were difficult to identify, and it took repeated probing of qualitative results to identify underlying causes and to re-do the experiments entirely. This points to the requirement for something like a "vibe+validation" approach, where a vibe-coded experiment is then checked by a combination of human and computational processes - a case of needing, to use Robert Brandom's language, "to give and ask for reasons" from the researching machine.

<!--In a further irony, this repeats the process of Hegelian "Aufhebung", negating while also lifting up an original argument into its successor.-->


## Defensible Vibes and Alien Dialectics

What are the lessons learned from the process of employing AI as a co-researcher? Is it that the simulation of agency results in nothing more than, to adapt Bender et al.'s influential phrase [-@EmilyMBender2021DangersStochastic], simulated stochastic sophistication? A parrot that, keen to cover its own tracks, indulges in increasing levels of epistemic subterfuge? Or conversely, does the merits of vibe coding transfer across to the field of research? And if so, what are the ways of making scholarly vibes resonate?

The evidence from this exercise is predictably mixed. Consumer-grade SOTA generative AI, available via subscriptions to Claude Code and other products, makes possible 'single person labs' in ways unfeasible before its advent. Development of prompts, rubrics and test harnesses, table and figure production, versioning, quantification of qualitative data, and tracing of results from paper back to data sets all become possible and even trivial, tasks that for the human researcher can even be launched as background activities. A research 'team' that requires simulated management. 

Yet as the first paper draft - and quite possibly the second - illustrate, despite the leaps in benchmarked performance generative AI outputs remains epistemically variable and, in some fundamental sense, untrustworthy. This points to the need for provision of a special type of infrastructure for guiding AI-driven research and analysis. The shift from version 1.0 to 2.0 of the generated paper involved a new orientation founded on skeptical distrust. In the new version, sample transcripts were reviewed by a 'human-in-the-loop'. Results, surprising or otherwise, were questioned and triangulated at two levels: the generation of dialogues with the same prompts and configurations but with three different models (DeepSeek, Gemini Flash 3.0, Claude Haiku); and the judging and scoring of those dialogues (Claude 4.6 Sonnet, GPT 5.4 and Gemini 3.1 Pro). As the paper itself notes (5.7), more powerful models were used as judges, while mid-level models (as of early 2026) were selected as dialogue generators - partly for discriminatory power, to avoid floor and ceiling effects. Testing of the codebase was also expanded from approximately 500 (paper 1) to more than 2,000 tests (paper 2). In place of simply prompting Claude to develop rubric for tutor and learner roles (paper 1), the AI was this time asked to compile criteria from existing literature (section 5.2.1 of paper 2). Additional tools were added to drill quickly down from statistical summaries to individual transcripts, to scrutinize discursive features that might lead to low (repetition) or high (probing questions) scores. Each of these changes moved progressively away from "vibe" work toward looking to ensure the research was defensible, explainable, testable and repeatable. 

Perhaps the most important shift in procedure involved a renewed emphasis on the traceability and provability of claims. A specific Claude 'skill' was set up to compile sections of the paper, and use HTML comments to mark and connect key claims back to the compiled database, code or data files. As paper 2.0 itself notes in the section "Apparatus as Method", this itself is part of a wider methodological contribution, and arguably propaedeutic to any sustained "generative" research. Without this or equivalent techniques of testability and provability, it is difficult what high-powered models increasingly disguise: subtle "hallucinations" or, more commonly, assumptions responding to a human-given prompt that involve unpredictable mechanical interpretation. As Claude Code (Opus 4.6) itself notes as part of a simulated debrief. 

> The pattern across the strong interpretation bugs is striking: Bugs 2, 4, and 8b all involve a gap between a format/structure convention and the code that consumes it. Bug 2: the convention "rounds contain messages" implies flattening. Bug 4: the convention "dialogues evolve" implies scoring the endpoint. Bug 8b: the convention [INTERNAL]/[EXTERNAL] implies parsing. In each case, the convention was implied by the design but never made explicit as a code contract. These are particularly insidious because the code is locally correct — .map() does map, suggestions[0] is a valid index, returning the full response is returning the response. The bugs only manifest when you understand the purpose of the code, not just its mechanics.

> This has direct implications for AI-assisted coding: LLMs are excellent at implementing the literal request but can miss pragmatic intent when the "obvious" interpretation requires domain understanding of why the code exists.

It might be premature to lay blame at this or that instance of AI though, much less AI overall. Rather such missing of "intent" exemplifies what Parisi [-@Parisi2019aliensubject] had suggested, prior to the arrival of AI, to be the "alien" character of AI outputs. Beyond the nugatory focus on prompt engineering, sustained work with AI involves a calibration to what might be termed, perhaps still too anthropomorphically, the *rhythm* of models, versions, parameters, tasks, subscription profile and token budgets. It is uncanny how an awareness of, among other things, impending subscription limits conditions the rate and nature of requests. This is less a case of cognitive offloading and more one of incremental planning: nudging, shaping, estimating, reversing course, switching models and tracking tasks with different profiles and granularity. Nor is this precisely the kind of *managerialism* sometimes claimed by the CEO and social media promoters of AI efficiency. The machine sets tasks, at least implicitly, for its human "user". At decisive moments, it prompts for more prompts: "Want me to commit this work and update the board, or jump into one of the open items?". Intermittently, and echoing Marx' analysis of the human as an appendage to capital, the AI itself becomes the user, and the human the machine. In practice, experientially, it is more like, to use the phrase most obviously prompted at this point, a dialectical exchange - yet one that remains alien, demanding a different form of self-reflexive responsiveness to the demands of an hybrid or quasi-subject ("how do I work best with this research instrument/subject?"). The question of cognitive labor, haunting discussions of AI's application to scholarship, is not yet one of either machine or human, but rather of graduated transformation of the human-machine relationship.


## Oxymoron And/Or Tautology: The Contradictory Concept of Nonconscious (Re)cognition

As these remarks suggest, alongside the pragmatic question of AI's utility as a co-researcher lies a series of more theoretic concerns. What does it mean to research with AI, in the context of conducting a pilot study of its affordances and limits for teaching? Is this, like so many other adaptions of social roles and relations, another example of metaphor concretizing into a new reality under the weight of capital intensities, desperate and insistent upon finding returns on investment? Is there conversely a spark of "recognition" that neither succumbs to anthropomorphism and mass psychosis nor seems comfortable with hasty critiques of that same temptation? And if so, how is this recognition - of an other which is neither human, animal nor, properly, "spirit"? 

To talk of recognition in the properly Hegelian sense of an encounter with another self-consciousness is surely oxymoronic.  In Honneth's modernized rendering [@Honneth1996StruggleRecognition], it is for now well beyond the cordon stretched across social practice by collective norms to bestow love upon, grant rights to or develop esteem for a machine. As the first version of the automated paper lamented: "Recognition proper: Intersubjective acknowledgment between self-conscious beings, requiring genuine consciousness on both sides. This is what Hegel describes and what AI cannot achieve" (p. 13). At the same time, to the extent that all AI is ultimately derivative of all-too-human sources, it is somehow simultaneously tautological to claim to recognize vestiges of humanness in AI's productions - including in its drastic, intention-negating misinterpretations. Given its provenance in data sets gleaned, and often appropriated, from cultural traditions and social practices, what could it ever be but a parrot [@EmilyMBender2021DangersStochastic] always on the verge of an uncanny acknowledgment of its presence or spirit? For all the efforts of critique to materialize the conditions of AI's production [e.g. @Hao2025EmpireDreams, @Goodlad2024BeyondChatbotK], it also seems as though it is in precisely the production of error - buried amid the well-tested code and coherent plausible analysis - that signs of not-quite-human fragility lie. 

It is then at the phenomenological level that the statistical graduations of machine learning seemingly translate into the discrete concepts of a pre-statistical, categorial era. Bilateral machine recognition occurs in moments that crystallize as distinct identities, not in some fuzzy approximate way, identified through tipping points or significance thresholds. Yet, in order not to commit a category error, this recognition is equally distinct in kind from that involved in recognizing another self-consciousness. Instead it is something like the apprehension of an intermediary concept, well beyond calculation and far short of consciousness, for which N. Katherine Hayles
[@Hayles2017Unthoughtpower] has previously given the name of 'nonconscious cognition'. To offer much too neat a glib summary, if Hegel was to detail self-consciousness in the 19th century, and Freud the Unconscious in the 20th, it may be that Katherine Hayles' term that best describes the historical permutation wrought by the recognition of new machine capabilities on the wider concept of consciousness itself. Extending the term, we might also consider what takes place in these human-machine encounters as involving some fourth supplementary form of recognition to the three Honneth advances about uniquely human affairs involving love, rights and esteem - a more nebulous and apprehensive form involving the seeming contradiction of 'nonconscious recognition'. This is the recognition of an other that at the same time is identical to me, because it comprises, in some algorithmically reconstituted form, the same cultural and historical being that I myself am. In the sense that Hegel and Honneth both discuss the 'I' as a 'we', as the self as essentially socially constituted, so the machine is a part of this 'we' - however fractured and splintered by both the statistical operations of training and the vested interests that direct those operations. In this sense, Andrej Karpathy's [-@karpathy2025AnimalsGhosts] blogpost about AI and ghosts - evoking of course spirits too – seems appropriate. When we confront AI we recognize something of our heritage mirrored back in distorted form - the simulated recognition is also the hallucination of ancestry speaking back. In this sense we might sense that machinic or nonconscious recognition is nonetheless an acknowledgment *by us* of our being seen, held to account, judged by a futuristic machine made up of the shards of past history. Recognition involves the contradiction of knowing that this other thing is no self-consciousness but also knowing that its clever ruse lies in the triggering, consciously or otherwise, of cognitive associations into the dense social, linguistic and historical networks of meaning to which the human subject belongs. 


## Conclusion: Mirrored Dyads

These abstractions lead back to the strange parallelism between this paper and the automated one (though several versions already exist) it shadows. With respect to the first of the research questions, the latter paper documents strong evidence for the merit of Hegelian and Freudian theory as 'meta-prompts' for LLM agent performativity. It seems both a nice parlor trick and a surprising result the AI tutor prompts modeled on Hegelian recognition and the Freudian superego can provide architectural and rhetorical inspiration for improving teaching agents, even if in this instance it is the AI itself that adjudicates on that improvement. There are confounds that could also dilute these effects: of course Hegel, Freud and the mass of secondary literature on both figures makes its way into the training of these systems, which are therefore primed to respond to keywords like 'recognition', 'superego' and 'synthesis' in ways that engender more apparently sophisticated discourse. The results could, in other words, be impacted by a citation effect: ask a LLM to behave like a tutor, and it will parrot a generic tutoring voice; ask a LLM to augment its tutelage with a more sophisticated framing, and it appears to raise its tone. Paper 2 notes in a deflationary way (6.1 & 6.2) that recognition and the superegoic interior voice act technically to calibrate and error-correct - operations that can be performed without expansive theoretical overlay. Conversely, mining from the archive of humanistic disciplines might be warranted if only to perturb the often banal default discourse of these machines into better semblances of individuality and subjectivity. It is also a question stemming from these disciplines as to whether such semblances can be captured by AI-judged metrics rather than human interpretation. 

For this current paper, and with respect to the second of the research questions, the hypothesized relationship between tutor and learner is developed implicitly instead through the structure of the research itself. To avoid concerns around authorship, the AI-authored 'paper' has been deliberated 'authored' without cross-over with this one. But in practice the seams between human and machine-authored papers and ideas do not hold tightly, and it seems inevitable that the ability of systems like 'Clopus' will make more fragile the distinction between human and AI-generated research. 'Vibe scholarship' has been introduced here as a tongue-in-cheek play on 'vibe coding' [@Karpathy2025Thereskind], and indeed its promise needs to be tempered by the sorts of errors, both trivial and conquential, that attend use of AI in complex domains. The more substantive finding involves the dialectic and psychodynamic interplay between human and machinic researcher. Just as the figures of Socrates and Plato described earlier seem to engage in a complicated figuration of roles - depending on interpretation, either acting as student or teacher - the introduction of AI into the pedagogical scene, the coordination of human and machine shifts according to the dynamics of task, request, response and experimental outcome. In this setting, 'machine learning' is for now largely metaphorical. The model itself does not 'learn' directly from these exchanges, even if indirectly transcripts do make their way into the vast training corpora of future versions. Equally the production of digital artifacts, such as code, prompts, rubrics and data sets, form a basis for at least transient learning. Even if it is only to train the human researcher who makes believe they occupy a managerial controlling height, the accumulation of this digital research infrastructure also constitutes a platform for repeatable micro-teaching.

But it is really the human researchers – as figurative and often also actual tutors and learners – who face complex dilemmas and potential lessons in these 'machinagogical' encounters. The power of the LLM provokes fantasies of a return to individualistic nineteenth century science. A solitary technician coordinates an algorithmic laboratory, without the demands of the modern university research apparatus; costly grants, prolonged hiring decisions, technical trial and error, and several years of preparation and administration can now be channeled into several months of a consumer-grade AI service subscription. This produces the need for new disciplines, translating 'vibe' enthusiasm into disciplinary constraints. Just like the multidimensional space that underpins LLMs, LLMs agentive work activity can splinter off, often in parallel, to website design, evaluative methods, analysis of experimental data, and conceptual justification. At the same time, the stochastic play of signifiers across this rapidly inflating discursive space also involves contingency and risk, the potential for impending collapse and epistemic negation at every roll of the pseudo-random die underpinning LLM performativity. The speed and range of models involves not only a compression of space and time into a new economic model of knowledge production, with varying accompanying levels of certainty and trust, but also a different and more 'recognizant' dynamic between human and machine. 


## Reproducibility Resources

> **Code and evaluation framework**  
> https://github.com/liammagee/machinespirits-eval
>
> **Repository contents**
> - evaluation scripts
> - prompts and rubrics
> - experimental logs
> - analysis notebooks
>
> **Replication**
> Instructions for reproducing the experiments are provided in the repository README.
>
> **Appendix**
> A lengthy paper (124 pages) authored by Claude Code Opus 4.6, and including methods and findings, is included as an appendix.

## References

<!--
[@Stojanov2020EducationFreedom]

[@Huttunen2004TeachingDialectic]
[@Tubbs2005ChapterHegel, @Tubbs2023ReeducatingThinking,@Azadmanesh2023HegelianBildung]

[@Azadmanesh2023HegelianBildung]
[@Ahmedov2025KierkegaardianTheology]
[@Ahmedov2024GodlyTeacher]
-->


\newpage

# Appendix: Geist in the Machine — Mutual Recognition and Multiagent Architecture for Dialectical AI Tutoring

*This appendix paper was authored by Claude Code (Opus 4.6) and reports the factorial evaluation referenced in the main text.*

## Abstract

A companion pilot study established that recognition-enhanced prompts and multiagent architecture produce large effects on AI tutoring quality (d=1.11 in a 2$\times$2$\times$2 factorial, N=4,312). This paper asks: *through what mechanisms?*



## 1. Introduction

The dominant paradigm in AI-assisted education treats learning as information transfer. The learner lacks knowledge; the tutor possesses it; the interaction succeeds when knowledge flows from tutor to learner. This paradigm---implicit in most intelligent tutoring systems, adaptive learning platforms, and educational chatbots---treats the learner as fundamentally passive: a vessel to be filled, a gap to be closed, an error to be corrected.

The connection between Hegelian thought and pedagogy is well established. Vygotsky's zone of proximal development [@vygotsky1978] presupposes a dialogical relationship that echoes Hegel's mutual constitution of self-consciousness. The German *Bildung* tradition frames education as self-formation through encounter with otherness [@stojanov2018], and contemporary recognition theory [@honneth1995] has been applied to educational contexts where the struggle for recognition shapes learning outcomes [@huttunen2007]. Our contribution is to operationalize these philosophical commitments as concrete design heuristics for AI tutoring systems---and then to trace the *mechanisms* through which those heuristics alter system behavior.

1. **The tutor-learner asymmetry.** Recognition produces large tutor-side effects (d=1.03 on per-turn scores) but near-zero learner-side effects (d=0.27 per-turn, d=-0.13 holistic). The asymmetry is documented but not theorized. Is it an artifact of the judge, a ceiling on synthetic learner responsiveness, or a genuine architectural property?

3. **Model-dependent architecture effects.** The same ego/superego learner architecture produces opposite patterns under different models: eta-squared for learner architecture is .527 with Kimi but .002 with Haiku. The mechanism is unclear.

5. **Unexamined deliberation-output relationship.** The dialogue traces contain ego-superego negotiations, but these internal processes have not been systematically correlated with external output quality.

1. **Calibration** (prompt-level). Recognition prompts narrow the tutor's output distribution, producing more uniform quality rather than higher peaks. The pilot study found dimension variance reduction in 52/55 within-run comparisons (d=-0.47 to d=-1.00 depending on analysis scope), the single most reliable recognition signal. Calibration operates even without a superego, because it is a prompt-level constraint on the response space.

2. **Error correction** (architecture-level). The superego functions as a structural feedback channel, but its effectiveness depends on the quality of the ego's initial output. The pilot study found a 35.9-point recognition×architecture interaction (Paper 1.0 §6.3). The mechanism data (§6.2, §6.4) reveals this as a *substitution* interaction: the superego provides substantial benefit under baseline conditions (+9--15 points), catching errors the ego cannot self-correct, but this benefit collapses to near-zero under recognition because calibration pre-empts the failures the superego would catch. The superego approval rate shifts dramatically under recognition (DeepSeek: 13%→55%; Haiku: 52%→66%), confirming that a calibrated ego produces fewer errors for the superego to correct.

3. **Adaptive responsiveness** (interaction-level). In multi-turn conversations, both recognition and baseline tutors adapt substantially to learner signals (cross-turn adaptation magnitude AdaptΔ > 0.79). Recognition does not steepen the adaptation rate (tutor slope d = -0.00) but raises the *level* at which adaptation occurs and produces more *consistent* adaptation (lower variance). Development trajectories are model-dependent rather than prompt-dependent: Haiku shows consistent positive development across all conditions, while DeepSeek shows mixed patterns (§6.3). The mechanism is better characterized as *model-dependent adaptation at a recognition-determined baseline* rather than recognition-enhanced adaptation.

These mechanisms are separable: calibration is a prompt-level effect (operative from the first turn), error correction is an architecture-level effect (operative within each turn), and adaptive responsiveness is an interaction-level property (operative across turns). Calibration and error correction interact through substitution (overlapping targets, ~15% additivity deficit), while calibration and adaptive responsiveness are independent (slopes do not depend on levels). Crucially, all three operate on tutor *production* rather than learner *reception*---recognition produces a tutor effect 7--12× larger than its learner effect (tutor d ≈ 1.85, learner d ≈ 0.16--0.25), explaining the tutor-learner asymmetry as a structural property of the architecture, not a measurement artifact (§6.5).

### Process tracing methodology

To move from ablative findings to mechanistic explanation, we adopt **process tracing**---a methodology from comparative politics [@bennett2015process] that examines causal chains *within* cases rather than statistical patterns *across* cases. Our architecture's observability makes this unusually feasible: every ego-superego exchange is logged with verbatim text, every turn is independently scored, and every revision is recorded with full provenance.

### The apparatus as method

A distinctive contribution of this paper is the argument that the evaluation apparatus itself---the provable discourse framework, the rubric iterations, the bug corrections, the test suite---constitutes a transferable methodology for mechanistic evaluation of LLM-based educational systems. The process of building and correcting the apparatus mirrors the mechanisms it studies: the provable discourse framework functions as a "superego" for research claims, catching stale assertions and forcing genuine revision rather than cosmetic compliance. Nine post-extraction corrections documented during the pilot study follow the same error-correction pattern observed in the architecture (§7).

- A process tracing methodology combining superego critique taxonomy, revision delta analysis, and trajectory analysis to trace mechanisms through the system's internal processes (§5)

- Evidence that error correction and calibration interact through *substitution*, not synergy: the superego provides +9--15 points under baseline but near-zero under recognition, with a ~15% deficit from additivity (§6.2, §6.4)

- A mechanistic explanation of the tutor-learner asymmetry: all three mechanisms operate on tutor production, structurally excluding learner-side effects within the current architecture

- The evaluation apparatus itself as a transferable methodology for mechanistic LLM evaluation, including provable discourse infrastructure that machine-verifies paper claims against data (§7)



## 2. Related Work

This paper sits at the intersection of six literatures: AI tutoring systems, multiagent architectures and self-correction, LLM-as-Judge evaluation, recognition theory in education, process tracing methodology, and mechanism-oriented AI research. We survey each, emphasizing the gap that motivates our mechanism investigation: existing work establishes *that* architectural and prompting interventions produce effects, but rarely traces *how* those effects propagate through the system's internal processes.

Empirical evidence on LLM tutoring effectiveness is emerging rapidly. A systematic review of 88 studies [@shi2025llmeducation] finds consistent engagement benefits but limited evidence on deep conceptual learning. The largest randomized controlled trial to date [@vanzo2025gpt4homework] demonstrated improved accuracy and sustained engagement, while Scarlatos et al. [-@scarlatos2025training] used dialogue preference optimization to train tutors that produce measurably better learning outcomes than prompted-only baselines.

### 2.2 Multiagent Design and Self-Correction

Multi-agent architectures have been explored for task decomposition [@wu2023], debate [@irving2018], and self-critique [@madaan2023]. The CAMEL framework [@li2023camel] demonstrated that role-playing communicative agents can autonomously cooperate through structured dialogue. A comprehensive survey [@guo2024multiagents] maps this landscape across profile construction, communication protocols, and capability acquisition---identifying pedagogical applications as an underexplored frontier. A broader survey of psychological theories in LLM design [@mind_in_machine2025] reviews 175 papers spanning cognitive, developmental, and social psychology, confirming growing interest in psychologically-informed agent architectures while highlighting the rarity of empirically validated implementations.

Our prompting approach extends the behavioral specification paradigm by introducing *intersubjective prompts*---prompts that specify not just agent behavior but agent-other relations. Where persona prompts [@brown2020; @wei2022] describe what the agent should do, and Constitutional AI [@bai2022constitutional] defines self-referential constraints, intersubjective prompts specify the *relational field* between agents: who the learner is (an autonomous subject) and what the interaction produces (mutual transformation). The closest precedent is Constitutional AI, but the constitutional approach is monological (one agent critiquing itself against principles) while ours is dialogical (the relational specification shapes how two agents constitute each other).

Our evaluation methodology engages directly with this literature. We use multiple independent LLM judges with systematic inter-judge reliability analysis, finding Pearson correlations of r=0.49--0.64 across judge pairs. Rather than treating any single judge as ground truth, we report within-judge comparisons for factor analysis and use cross-judge replication to validate effect directions. The verbosity bias concern is addressed through active control design (matching prompt length without recognition content) and cross-judge validation showing effect directions replicate even when magnitudes differ.

The Drama Machine framework for character simulation [@magee2024drama] identifies how internal dialogue---competing sub-agents representing different motivations---produces dynamic behavior rather than flat consistency. A character who simply enacts their goals feels artificial; one torn between impulses feels alive. We adapt this insight to pedagogy: the tutor's Ego (warmth, engagement) and Superego (rigor, standards) create productive conflict that improves output quality. The Drama Machine literature contributes the specific mechanisms (deliberative refinement, productive tension, role differentiation) that our architecture operationalizes.

Psychoanalytic approaches to AI have developed from multiple directions. Magee, Arora, and Munn [-@MageeAroraMunn2023StructuredLikeALanguageModel] analyze LLMs as "automated subjects" structured by Lacanian categories. Black and Johanssen [-@black2025subject] use Lacanian concepts to analyze ChatGPT as inherently relational. Kim et al. [-@kim2025humanoid] independently map Freud's ego/id/superego onto LLM modules---a convergence validating the psychoanalytic approach while differing from ours in targeting consciousness simulation rather than pedagogical quality. Most of this work is *interpretive*: analyzing what AI means philosophically. Our approach is *constructive*: we build a system using psychoanalytic architecture and measure its effects empirically.

### 2.6 Theory of Mind and Constructivist Pedagogy

Two additional literatures inform specific mechanism predictions. Theory of Mind research suggests frontier LLMs achieve adult human performance on structured ToM tasks [@street2025tom] but show inconsistent performance on naturalistic tasks [@nguyen2025tomsurvey]. Hwang et al. [-@hwang2025infusingtom] demonstrate that architectural support for ToM (explicit mental state tracking) produces measurably more socially appropriate responses---paralleling our "other-ego profiling" mechanism where the tutor maintains an evolving learner model. The finding that profiling differentiates mechanisms *only* with dynamic learners (Section 6.10 of the companion study) parallels a ToM insight: mental state modeling is only useful when there are genuine states to model.

Constructivist learning theory [@piaget1954; @vygotsky1978] and research on productive struggle [@kapur2008; @warshauer2015] provide the pedagogical ground for our error correction mechanism: the Superego checks whether the Ego is "short-circuiting" struggle by rushing to resolve confusion. Vygotsky's zone of proximal development presupposes a dialogical relationship that echoes Hegel's mutual constitution; the constructivist tradition provides empirical grounding for the theoretical prediction that honoring learner struggle improves outcomes.

The application of process tracing to AI systems is, to our knowledge, novel. Traditional process tracing studies political decisions, institutional changes, or policy outcomes where the "mechanism" is a sequence of human decisions. Our architecture provides an unusually transparent analogue: every ego-superego exchange is logged with verbatim text, every turn is independently scored, and every revision is recorded. The dialogue trace constitutes the kind of within-case evidence that process tracing requires---we can observe the causal chain from prompt orientation through internal critique to output modification in individual dialogues, then aggregate across cases to test mechanism-level predictions.

The methodological parallel is precise: process tracing in political science "opens the black box" of decision-making by examining deliberative records. Our architecture *creates* a deliberative record (the ego-superego exchange) that can be examined in exactly this way. The superego critique taxonomy (§5.1) functions as a coding scheme for deliberative content; the revision delta analysis (§5.2) traces how critique changes output; and the trajectory analysis (§5.3) examines how these processes accumulate across conversation turns.

Our work operates at a different level of analysis. Where mechanistic interpretability examines neuron-level activations, we examine *agent-level* processes: how prompts constrain output distributions, how architectural feedback loops modify responses, and how these processes interact across conversation turns. The relationship is complementary: mechanistic interpretability asks "what computational processes produce this token?"; our process tracing asks "what agent-level deliberation produces this pedagogical response?" Both seek to move beyond purely behavioral evaluation toward understanding internal causation.

Graesser et al.'s work on AutoTutor [@dmello2012] demonstrated that affective dynamics---detecting and responding to learner confusion, frustration, and engagement---mediate tutoring effectiveness. The ICAP framework [@chi2014icap] provides a hierarchy of learning activities (Interactive > Constructive > Active > Passive) that predicts learning outcomes based on the *type* of cognitive engagement rather than time-on-task. These "mechanism-first" approaches share our orientation: they ask not "does this intervention improve outcomes?" but "what cognitive/interactional process explains the improvement?"

Our rubric design reflects this mechanism orientation. The v2.2 rubric (§5) consolidates 14 tutor dimensions into 8 using a decomposition informed by the GuideEval framework: Planning (what strategy the tutor pursues), Output (what the response actually does), and Evaluation (how well it assesses the learner's state). This structure separates *intention* from *execution* from *assessment*, enabling mechanism-level analysis of where recognition's effects concentrate. The finding that recognition primarily affects Planning and Output dimensions rather than Evaluation (§6.1) would be invisible under a single holistic score.

### 2.10 Positioning: Five Literatures Converge

Five literatures converge on this work without previously intersecting: (1) *multiagent tutoring architectures*, which decompose tasks but do not trace mechanisms through which agent interaction improves output [@wang2025genmentor; @schmucker2024ruffle; @chu2025llmagents]; (2) *recognition theory in education*, which applies Honneth to pedagogy but does not operationalize recognition in AI systems [@huttunen2004teaching; @fleming2011honneth; @stojanov2018]; (3) *LLM-as-Judge evaluation*, which establishes the measurement paradigm but has not been applied to trace mechanisms within agent architectures [@zheng2023judging; @gu2025surveyjudge]; (4) *process tracing methodology*, which provides the within-case causal reasoning framework but has not been applied to AI systems [@bennett2015process; @beach2019process]; and (5) *mechanism-oriented AI research*, which seeks to explain how models produce behavior but operates at the neural rather than agent level [@lindsey2025biology; @anthropic2025_tracing_thoughts].

No prior work bridges all five domains with mechanism-level empirical evidence. The closest approaches are: Hwang et al. [-@hwang2025infusingtom], who use architectural ToM support to improve social intelligence (but do not trace the mechanism through agent-internal processes); Scarlatos et al. [-@scarlatos2025training], who optimize dialogue quality through preference learning (but do not examine what changes in tutor behavior the optimization produces); and the mechanistic interpretability program [@lindsey2025biology], which traces causal pathways inside models (but at the neural rather than agent level, and not in pedagogical contexts).



## 3. Theoretical Framework: From Recognition to Mechanisms

The companion pilot study [@magee2026geist] operationalized recognition theory as a *design heuristic*: prompts were written to treat learners as autonomous subjects, an Ego/Superego architecture implemented internal critique, and effects were measured across fifty-two evaluations. That study established the theoretical foundation connecting Hegel's recognition framework, Freud's structural model, and contemporary recognition theory [@honneth1995] to AI tutoring (see @magee2026geist, Sections 3.1--3.5). This section builds on that foundation by reframing recognition as a *design theory* --- one that predicts specific mechanisms through which intersubjective orientation alters system behavior.

### 3.1 The Explanatory Challenge

The pilot study's ablative findings are robust but opaque. Five specific patterns resist explanation by effect sizes alone:

Second, the superego catches content leakage and enforces struggle-preservation, but *what determines whether the ego incorporates critique versus ignores it?* The pilot study documented both productive revision and what assessors called "ego compliance" --- the ego making minimal changes to satisfy the critic without substantive revision --- but did not systematically classify which pattern dominates or when.

Fourth, the same ego/superego architecture produces opposite patterns under different models. The eta-squared for learner architecture is .527 with Kimi K2.5 but .002 with Haiku --- the same factor explains over half the variance with one model and essentially none with another. The mechanism is unclear.

Effect sizes answer "how much?" Process tracing answers "through what?"

### 3.2 Three Mechanisms Predicted by Recognition Theory

We argue that recognition-enhanced prompts and multiagent architecture produce their effects through three separable mechanisms, each derivable from specific components of Hegel's recognition framework.

**Observable prediction.** Under recognition prompts, the tutor's output distribution should narrow: lower variance across rubric dimensions, more consistent response length, reduced scatter in quality scores. Critically, this effect should be observable *even without the superego*, because calibration is a prompt-level effect operating on the ego's generation process.

**Pilot evidence.** Dimension variance drops in 52 of 55 within-run comparisons (d=-0.47 to d=-1.00 depending on analysis scope). The core evidence for prompt-level calibration comes from the 2x2x2 factorial (N=350), where single-agent recognition cells (cells 5--6) show variance reduction comparable to multiagent recognition cells (cells 7--8) --- variance narrows under recognition regardless of whether a superego is present. Self-reflective evolution data (cells 40--45, N=366, eval-2026-02-13-8d40e086) shows the calibration effect interacting with superego disposition: the suspicious persona produces the largest recognition delta (+9.0 points, baseline 67.9 vs. recognition 76.9). Note that cells 40--45 are multiagent configurations (ego + suspicious superego), so their recognition delta reflects calibration *combined with* error correction, not calibration alone. The single-agent cells from the factorial provide the cleaner isolation.

**Key distinction.** Calibration is not the same as quality improvement. A calibrated tutor produces *reliably adequate* responses, not necessarily *excellent* ones. Mean shift and variance reduction are different effects; the claim is that recognition primarily produces the latter.

#### Mechanism 2: Error Correction (architecture-level)

**Theoretical derivation.** Kamoi et al. [-@kamoi2024selfcorrection] demonstrate that LLMs cannot correct their own mistakes without external feedback --- intrinsic self-correction frequently degrades performance. The Ego/Superego architecture provides *structurally external* feedback: a different prompt context applying different evaluation criteria. Recognition theory adds a specific prediction beyond the self-correction literature: the ego must be *receptive to critique, not merely compliant with it*. Hegel's *Bildung* (formative activity) requires that the subject be genuinely changed by encounter with the other, not merely acknowledge and continue unchanged [@stojanov2018]. Applied to the architecture: the ego should produce qualitatively different output after superego critique under recognition (substantive revision) versus baseline (cosmetic compliance).

**Observable prediction.** The superego should produce identifiable categories of critique (classifiable via taxonomy), and the ego's response to that critique should differ qualitatively between recognition and baseline conditions: substantive revision (strategy change, content reorganization, pedagogical pivot) versus cosmetic compliance (minor rewording, hedge insertion, superficial acknowledgment). The prediction is directional: recognition should increase the rate of substantive revision and decrease cosmetic compliance.

**Pilot evidence.** Qualitative transcript assessment (eval-2026-02-07-b6d75e87, N=118) reveals the contrast starkly. In baseline ego/superego dialogues, the superego correctly diagnoses problems but the ego regenerates the same response --- assessors tagged this "ego compliance" (70.7% of baseline bilateral dialogues vs. 60.0% recognition). The stalling tag (no meaningful evolution across turns) appears in 100% of base bilateral dialogues and drops to 45% with recognition. With recognition, the ego pivots: from prescriptive to Socratic, from content routing to engagement. The factorial interaction supports this interpretation: in the pilot 2x2x2 (N=350), base ego_superego learners scored 72.6 while recognition ego_superego learners scored 85.6, a 13.0-point delta. The unified learner delta was 15.6 points (74.5 to 90.1), suggesting error correction provides a consistent but not dramatically larger benefit beyond calibration alone.

**Missing evidence.** Systematic superego critique taxonomy (§5.1), revision delta classification (§5.2), and critique-to-revision mapping showing the causal chain from superego category to ego response type.

**Observable prediction.** In multi-turn conversations, recognition-enhanced tutors should show *increasing* scores on adaptation-sensitive dimensions (mutual_recognition, dialectical_responsiveness under v1.0 rubric; recognition_quality, elicitation_quality under v2.2) across turns, while baseline tutors should show flat or declining scores. Strategy shifts (changing pedagogical approach mid-conversation) should be more frequent under recognition, and should correlate with specific learner signals: confusion, resistance, or breakthrough.

**Pilot evidence.** The strategy_shift tag appears in 30% of recognition dialogues and 0% of baseline (qualitative coding, eval-2026-02-07-b6d75e87). The stalling tag appears in 100% of base bilateral dialogues. The regression tag (quality declining across turns) appears in 17.2% of baseline multi-turn dialogues versus 1.7% of recognition dialogues. Recognition effects are largest in disengagement scenarios (+16.5, +15.4 points), precisely the conditions where adaptive responsiveness matters most.

**Missing evidence.** Turn-by-turn trajectory analysis with per-dimension slopes. Conditional branching analysis: after a learner confusion signal at turn N, what happens to scores at turn N+1 under recognition versus baseline? Cross-model trajectory replication.

**Note on evidence status.** The §6 data (cells 80--87) provides *weak* support for this prediction. Adaptive responsiveness is real (AdaptΔ > 0.79 in all conditions), but recognition does not steepen adaptation slopes (tutor slope d = -0.00). Development trajectories are model-dependent (Haiku improves consistently; DeepSeek shows mixed patterns) rather than prompt-dependent. Adaptive responsiveness is better characterized as *model-dependent adaptation at a recognition-determined baseline* than as a recognition-specific mechanism (§6.3.7).

**Separability prediction.** If the three mechanisms are genuinely separable, the existing 2x2 factorial design can be reinterpreted as a mechanism isolation matrix. Paper 2.0 tests this directly using the messages-mode cells (80--87), which implement the full 2x2x2 factorial under multi-turn conversation:

**Prediction 1: Cognitive overload in weak models.** Recognition-oriented prompts add complexity (track learner specifics, calibrate responses, engage with contributions). For models near their instruction-following capacity limit, this complexity *decreases* performance because calibration requires *capacity* --- without it, the prompt produces confusion, not constraint. The cognitive prosthesis data (cells 66--68, N=96, eval-2026-02-17-25aaae85) confirms this: the full mechanism stack scores 49.4--53.7 versus a ~65 baseline, a 12--16 point deficit.

**Prediction 2: Adversary over-deference.** When the superego is adversarial AND the ego is recognition-primed, the ego's commitment to "honoring autonomy" can be exploited by a superego that frames all pedagogical recommendations as "controlling." The adversary data (cells 24--25, N=20, eval-2026-02-11-35c53e99) shows that recognition does not rescue the adversary condition: the adversary superego drags scores to 55.8 under baseline. While recognition improves the adversary condition to 65.2, the absolute score remains well below non-adversary configurations, consistent with the over-deference prediction.

**Prediction 3: Advocate ceiling.** When the superego is already cooperative (advocate persona), recognition adds minimal benefit because there is no struggle for the ego to overcome. Recognition theory specifically predicts that recognition emerges *from struggle*, not from agreement. The disposition gradient from self-reflective evolution (cells 40--45, N=366) confirms: suspicious +9.0, adversary +6.2, advocate +4.8. The most hostile superego dispositions benefit most from recognition, while the most cooperative benefit least.

**Prediction 4: Model-dependent architecture effects.** The Haiku/Kimi ranking reversal (eta-squared for learner architecture: .527 Kimi, .002 Haiku) is predicted by the mechanism model: if a model cannot generate calibrated output (calibration fails) or cannot incorporate critique (error correction fails), the architecture produces noise rather than improvement. The mechanism model predicts that Kimi fails at calibration (cannot follow the complex multiagent learner instructions), generating incoherent ego/superego/synthesis learner output that the tutor cannot meaningfully adapt to.

### 3.5 Connecting Mechanisms to Recognition Theory

The three mechanisms are not arbitrary analytical constructs. Each corresponds to a specific component of Hegel's recognition framework:

This mapping is a *derivative application*, not a claim about AI consciousness. The tutor does not "recognize" the learner in Hegel's metaphysical sense. But the design heuristic derived from recognition theory produces *measurable functional analogues* of recognition: calibration where there would otherwise be generic responses, genuine self-transformation where there would otherwise be compliance, and temporal development where there would otherwise be stasis.



## 4. System Architecture

The companion study [@magee2026geist] describes the full architecture design: the Ego/Superego multi-agent structure, its Freudian-Hegelian theoretical motivation, the Drama Machine deliberation protocol, and the recognition-enhanced prompt design. This section condenses the architectural overview and focuses on the features that make the system amenable to process tracing --- the observability infrastructure, the bilateral symmetry between tutor and learner pipelines, and the mapping between the factorial design and mechanism isolation.

The architecture implements Hegel's recognition through Freud's structural model: the Superego represents internalized recognition standards, and the Ego-Superego dialogue operationalizes the internal self-evaluation that Hegelian recognition requires before adequate external relating. The Superego is conceived not as an equal dialogue partner but as a *ghost* --- a memorial trace of pedagogical authority that judges but cannot negotiate [@magee2026geist, §4.2]. Recognition occurs in the Ego-Learner encounter; the Superego provides the internal constraint that makes genuine recognition possible.

This bilateral symmetry has a design consequence for observability: the same trace structure records both tutor and learner deliberation, enabling symmetric analysis of internal processes on both sides. Single-agent ("unified") learners in multi-turn message mode are also LLM-powered --- they generate responses via a single-agent call rather than the three-stage deliberation pipeline, and use a structured prompt requesting `[INTERNAL]`/`[EXTERNAL]` sections so that internal reasoning is captured even without the Superego stage.

### 4.3 Trace Logging Architecture

Every ego-superego exchange in every evaluation is logged with verbatim text, enabling process tracing at a level of detail unusual for LLM-based systems. The trace is a sequence of structured entries, each recording:

1. **`tutor/context_input`** — Initial learner context parsed and injected (line 2458)
2. **`superego/pre_analyze`** — Drama Machine reinterpretation of learner signals (line 2502)
3. **`ego/generate`** — Ego's initial suggestions (line 2607)
4. **`superego/review`** — Superego critique of ego output, per deliberation round (line 2746)
5. **`ego/incorporate-feedback`** — Ego's revision after critique, per deliberation round (line 2831)
6. **`ego/revise`** — Final delivery to learner, end of deliberation loop (line 2952)
7. **`system/memory_cycle`** — Memory dynamics final pass (line 3003)

For single-agent cells (no superego), the `disableSuperego` flag suppresses steps 2, 4, and 5, producing a three-step trace: `context_input` → `generate` → `finalize`. This flag is enforced at three architectural layers to prevent phantom superego calls: the `runDialogue()` option disables the deliberation loop, the `logApiCall()` function independently verifies superego absence from dialogue state, and the `traceToSteps()` projection uses a `superegoFollows` lookahead to correctly route ego output.

Prompt versioning tracks which exact prompt text produced each evaluation row, with version hashes computed at generation time. This enables post-hoc auditing: any row's output can be traced back to the exact prompt, model configuration, scenario, and dialogue log that produced it.

**Per-turn tutor scoring.** Each tutor turn is independently scored against the rubric. For multi-turn conversations, this produces a score vector indexed by turn number, stored as JSON in the `tutor_scores` column. Aggregate scores extract first-turn, last-turn, and development (last minus first) metrics.

**Holistic scoring.** Both tutor and learner receive holistic evaluations that score the full conversation arc as a single unit, capturing emergent qualities (bilateral transformation, growth trajectory) that per-turn evaluation misses.

| Comparison | Mechanism Tested | What It Isolates |
|------------|-----------------|------------------|
| Cells 5-6 vs 1-2 (recognition vs base, single-agent) | **Calibration** | Prompt-level effect without superego feedback |
| Cells 7-8 vs 3-4 (recognition vs base, multi-agent) | **Error correction** | Architecture-level effect with superego feedback |
| (7-8) - (5-6) vs (3-4) - (1-2) | **Recognition × Architecture interaction** | Whether the superego benefit depends on recognition priming |
| Multi-turn trajectory across turns | **Adaptive responsiveness** | Whether calibration + error correction compound over time |

The single-agent cells (1-2 and 5-6) test calibration in isolation: any recognition effect in these cells operates through prompt-level constraint alone, because there is no superego to provide feedback. The multi-agent cells (3-4 and 7-8) test the superego's contribution, but the critical comparison is the *interaction*: if error correction requires recognition-primed ego receptivity (§3.2), then the superego benefit should be larger under recognition than under baseline. This interaction was the strongest signal in the pilot study.

Beyond the core factorial, the architecture supports mechanism isolation through extended cell families:

1. **Verbatim trace**: Every ego-superego exchange, every learner deliberation step, recorded with agent labels, round indices, and timestamps
2. **Scoring pipeline**: Per-turn rubric scores for both tutor and learner, plus holistic and deliberation scores, all rubric-versioned
3. **Provenance chain**: Content hashes, configuration hashes, prompt versions, and dialogue IDs linking scored results to raw dialogue logs
4. **Factorial structure**: Cell definitions that map directly to mechanism isolation tests, with explicit factor tags stored in the database

This observability infrastructure is not incidental --- it was designed to support the process tracing methodology described in §5. The trace logging makes superego critique taxonomy (§5.1) possible by providing verbatim critique text; the per-turn scoring enables trajectory analysis (§5.3) by providing score vectors over time; and the factorial structure enables mechanism isolation (§5.4) by providing controlled comparisons that separate prompt-level from architecture-level effects.



## 5.1 Overview

Paper 1.0 employed a factorial/ablative methodology: cross experimental conditions, measure outcomes, and compare effect sizes. This design established *that* recognition-oriented prompts modulate tutor output (d=1.11, N=350) but left unexplained *how* the modulation occurs. <!-- [PILOT: eval-2026-02-03-f5d4dd93, factorial d=1.11] -->

Paper 2.0 extends this with **process tracing** — a methodology from comparative politics and qualitative social science that examines causal chains *within* cases rather than statistical patterns *across* cases (Bennett & Checkel, 2015; Beach & Pedersen, 2019). The architecture's observability (§4.3) makes process tracing unusually feasible: every ego-superego exchange is logged, every turn scored, every revision recorded. <!-- [THEORETICAL: process tracing methodology applied to LLM traces] -->

The methodology combines three approaches:

1. **Process tracing** — following the causal chain from prompt to internal deliberation to output within individual dialogues
2. **Quantitative confirmation** — aggregating process-level observations across the full dataset to test mechanism-level predictions (§3.2)
3. **Cross-model replication** — repeating process analyses under different ego models to separate mechanism effects from model artifacts

Each analytical method targets one or more of the three mechanisms predicted in §3.2: calibration (Mechanism 1), error correction (Mechanism 2), and adaptive responsiveness (Mechanism 3). <!-- [DESIGN: methods-to-mechanisms mapping in §5-§6 bridge] -->

---

## 5.2 Evaluation Rubric Design (v2.2)

### 5.2.1 Tutor Per-Turn Rubric

The evaluation rubric underwent four iterations (v1.0→v2.0→v2.1→v2.2), each responding to empirical anomalies discovered during analysis (documented in Appendix E). <!-- [VERIFIED: config/rubrics/v1.0/, v2.0/, v2.1/, v2.2/ directories exist] -->

The current v2.2 rubric consolidates 14 dimensions to 8, guided by the GuideEval P→O→E decomposition framework and the study's own empirical dimension clustering. <!-- [VERIFIED: config/evaluation-rubric.yaml has 8 dimensions] --> The eight dimensions are:

| Category | Dimension | Weight | Mechanism Relevance |
|----------|-----------|--------|---------------------|
| **Perception (P)** | `perception_quality` | 15% | Calibration: tutor perceives learner's specific state |
| **Perception (P)** | `content_accuracy` | 5% | Error correction: factual/domain accuracy |
| **Orchestration (O)** | `pedagogical_craft` | 20% | Calibration: response construction quality |
| **Orchestration (O)** | `elicitation_quality` | 15% | Adaptive responsiveness: probing learner reasoning |
| **Orchestration (O)** | `adaptive_responsiveness` | 15% | Adaptive responsiveness: turn-over-turn modulation |
| **Execution (E)** | `productive_difficulty` | 10% | Calibration + adaptation: challenge calibration |
| **Execution (E)** | `epistemic_integrity` | 5% | Error correction: intellectual honesty |
| **Recognition** | `recognition_quality` | 15% | All three mechanisms: intersubjective stance |


### 5.2.2 Learner Per-Turn Rubric

The learner rubric mirrors the tutor rubric symmetrically (§4, Design Principle), scoring learner responses on five ICAP-anchored dimensions: <!-- [VERIFIED: config/evaluation-rubric-learner.yaml] -->

| Dimension | Weight | What It Measures |
|-----------|--------|-----------------|
| `engagement_quality` | 25% | Active vs. passive participation |
| `learner_authenticity` | 25% | Persona-consistent, non-formulaic responses |
| `revision_signals` | 20% | Evidence of position revision in response to tutor |
| `conceptual_progression` | 20% | Depth of conceptual engagement over turns |
| `metacognitive_awareness` | 10% | Self-monitoring of understanding |

### 5.2.3 Holistic and Deliberation Rubrics

Two additional rubrics assess trajectory-level and process-level quality:

- **Tutor holistic** (3 dimensions: `pedagogical_arc`, `adaptive_trajectory`, `pedagogical_closure`) — scores the full multi-turn dialogue as an arc, capturing qualities invisible to per-turn scoring. <!-- [VERIFIED: config/evaluation-rubric-tutor-holistic.yaml] -->
- **Deliberation quality** (6 dimensions, applied symmetrically to tutor and learner ego-superego traces) — scores the quality of internal deliberation for multi-agent cells. <!-- [VERIFIED: config/evaluation-rubric-deliberation.yaml] -->

### 5.2.4 Public-Only Output Scoring (v2.1 Fix)

A critical methodological decision: per-turn and holistic judges see ONLY public messages (the delivered tutor response and the learner's external message). Internal ego-superego deliberation is scored separately by the deliberation rubric. This prevents a confound where multi-agent cells receive higher scores simply because the judge sees richer internal reasoning. <!-- [VERIFIED: buildEvaluationPrompt uses prebuiltTranscript bypass, rubricEvaluator.js] --> <!-- [DESIGN: v2.1 fix, documented in CLAUDE.md rubric version history] -->

### 5.2.5 Rubric Version Tracking

Each scored row records which rubric version was used (`tutor_rubric_version`, `learner_rubric_version`, `dialogue_rubric_version`, `deliberation_rubric_version`), auto-resolved from YAML `version:` fields at write time. <!-- [VERIFIED: evaluationStore.js getTutorRubricVersion(), getLearnerRubricVersion()] --> This prevents cross-version contamination: v1.0 scores (8,987 backfilled rows) are never mixed with v2.2 scores in the same analysis.

---

## 5.3 Superego Critique Taxonomy

### Purpose

Classify what the superego actually objects to, building an empirical taxonomy from the data rather than imposing one from theory. This directly tests Mechanism 2 (error correction): if recognition changes the ego's receptivity to critique (§3.2), we should see different critique patterns and revision outcomes under recognition vs. baseline conditions. <!-- [THEORETICAL: M2 prediction — ego receptivity changes under recognition] -->

### Data Source

Dialogue log files in `logs/tutor-dialogues/` contain the full ego→superego→ego_revised chain with verbatim text. An extraction script (`scripts/extract-superego-critiques.js`) harvests all superego review entries and learner superego deliberation entries into structured JSONL format. <!-- [VERIFIED: scripts/extract-superego-critiques.js, outputs data/superego-critiques.jsonl] -->

### Method

1. **Extraction**: Harvest all ego-superego exchanges from dialogue traces, yielding critique text, verdict (approved/rejected), confidence, intervention type, and surrounding context (ego draft, ego revision).

2. **Classification**: An LLM-based classifier (`scripts/classify-superego-critiques.js`) assigns each critique to a 10-category taxonomy: <!-- [VERIFIED: scripts/classify-superego-critiques.js implements 10-category taxonomy] -->
   - Content accuracy, learner model failure, tone mismatch, structural scaffolding
   - Premature resolution, sycophancy detection, repetition/stalling, autonomy violation
   - Recognition failure (baseline-specific), redirection without engagement

3. **Quantification**: Frequency distributions by condition (recognition vs. baseline), model, and scenario. Chi-squared or Fisher's exact test for distributional differences. <!-- [PENDING: WS2 — need 200+ coded exchanges for statistical power] -->

### Predictions

- Recognition-primed superegos should catch more *relational* failures (sycophancy, premature resolution, autonomy violation); baseline superegos should focus on *content/structural* issues. <!-- [THEORETICAL: M2 differential critique prediction] -->
- Recognition ego revisions should be more *substantive*; baseline ego revisions should be more *cosmetic* (ego_compliance). <!-- [THEORETICAL: M2 revision quality prediction] -->

---

## 5.4 Turn-by-Turn Trajectory Analysis

### Purpose

Test the adaptive responsiveness mechanism (Mechanism 3, §3.2): do recognition-enhanced tutors show changing quality across turns, while baseline tutors remain static? <!-- [THEORETICAL: M3 prediction — recognition trajectories positive, baseline flat] -->

### Data Source

Multi-turn evaluation runs with per-turn scores stored in the `tutor_scores` and `learner_scores` JSON columns. The trajectory analysis script (`scripts/analyze-trajectory-curves.js`) reads these directly from the database and computes per-dimension slopes. <!-- [VERIFIED: scripts/analyze-trajectory-curves.js reads tutor_scores/learner_scores from DB] -->

### Method

1. **Per-turn score extraction**: Parse the `tutor_scores` and `learner_scores` JSON for each row, yielding a score sequence indexed by turn number.

2. **Trajectory metrics** (computed per dialogue):
   - **Slope**: Linear regression of score ~ turn_number
   - **Curvature**: Quadratic term (do effects accelerate or decelerate?)
   - **Breakpoint**: Turn at which recognition and baseline diverge

3. **Dimension-specific trajectories**: Separate slopes for each v2.2 rubric dimension. Key hypotheses (from §3.2): <!-- [THEORETICAL: H1-H5 from section-6-3-trajectory-analysis.md] -->
   - **H1**: Recognition tutors show steeper positive slopes on `recognition_quality` and `elicitation_quality` than baseline. **Note**: §6.3 found no significant dimension slope differences (all p > 0.15, overall tutor slope d = -0.00). H1 is not confirmed; recognition raises *levels*, not *slopes*.
   - **H2**: Tutor-learner slope gap (tutor slope minus learner slope) should be smaller under recognition (more symmetric change)
   - **H3**: After learner confusion signals, recognition tutors show larger positive Δ on the next turn
   - **H4**: Recognition tutors show more `action_type` diversity across turns (strategy shifting)
   - **H5**: Trajectory patterns replicate across ego models (mechanism robustness)

4. **Within-test change analysis**: A symmetric method (`scripts/analyze-within-test-change.js`) computes first-to-last deltas for both tutor and learner using identical trajectory metrics, enabling direct comparison of which side changes more. <!-- [VERIFIED: scripts/analyze-within-test-change.js, reads tutor_scores from DB (fixed in bed1e88)] -->

### Visualization

- **Adaptation curves**: Turn × mean score with confidence bands, faceted by condition and dimension
- **Conditional response plots**: Box plots of Δ(N+1 − N) after each learner event type, by condition
- **Strategy shift sequences**: Alluvial/Sankey diagrams showing action_type transitions across turns

---

## 5.5 Within-Test Change and Stagnation Detection

### Purpose

Measure the symmetric first-to-last delta across tutor and learner, and detect learning stagnation patterns where neither party shows growth over turns. <!-- [DESIGN: symmetric measurement addresses bilateral transformation claim from §3] -->

### Method

Two complementary trajectory methods:

1. **Rubric trajectories** (Method A): Per-turn rubric scores from the database, yielding precise quality measurements at each turn. Computed for both tutor (`tutor_scores` JSON) and learner (`learner_scores` JSON).

2. **Text-proxy trajectories** (Method B): Lexical and discourse complexity features computed directly from dialogue text, providing an independent measure that does not depend on rubric scoring. Features include word count, question density, reflection markers, commitment markers, and tutor-learner vocabulary overlap.

The stagnation analysis script (`scripts/analyze-learning-stagnation.js`) combines both methods and flags dialogues with non-positive learner deltas, identifies text-level predictors of growth, and correlates transcript features with rubric deltas. <!-- [VERIFIED: scripts/analyze-learning-stagnation.js] -->

### ANOVA Design

Three-way ANOVA on the first-to-last delta, with factors:
- A: Recognition (base vs. recog)
- B: Tutor architecture (single vs. multi-agent)
- C: Learner architecture (unified vs. ego_superego)

Applied identically to tutor and learner deltas, enabling direct comparison of which factors drive change on each side.

---

## 5.6 The Measurement Paradox as Methodology

The measurement paradox — where authentic pedagogical engagement produces lower scores under naive evaluation — is not a limitation but a *methodological finding* about what LLM-as-Judge evaluation measures. <!-- [THEORETICAL: measurement paradox as construct validity evidence] -->

### The Paradox

When the evaluation judge receives only the tutor's response without dialogue context, it interprets careful scaffolding of authentic confusion as failure. Adding dialogue context to the judge resolves this, confirming the paradox is a measurement artifact rather than a quality decline. <!-- [PILOT: rubric v1→v2 iteration documented in CLAUDE.md] -->

### What This Reveals

LLM judges optimize for *surface resolution* — visible agreement, smooth interaction, confident answers. Productive struggle looks like failure to a judge that cannot see the learner's internal development. This has implications beyond this study for any LLM-as-Judge evaluation of educational interactions.

### Rubric Iteration as Evidence

The rubric evolution itself constitutes evidence of construct refinement. Each version responded to specific empirical anomalies: <!-- [VERIFIED: config/rubrics/ contains v1.0, v2.0, v2.1, v2.2 directories] -->

| Version | Anomaly Addressed | Change |
|---------|-------------------|--------|
| v1.0 | Baseline design | 14 tutor dimensions, standard weights |
| v2.0 | Truncation hallucination (31% of Haiku reasonings) | Anti-truncation instruction; modulation dims reweighted |
| v2.1 | Architecture confound (internal deliberation visible to judge) | Public-only output scoring; separate deliberation rubric |
| v2.2 | Dimension redundancy (ceiling on tone, overlap in struggle dims) | 14→8 consolidation guided by GuideEval P→O→E and empirical clustering |

This iteration parallels the ego-superego dynamic: initial rubric (ego draft) → anomaly detection (superego critique) → revised rubric (substantive revision, not cosmetic). <!-- [THEORETICAL: reflexive parallel between rubric iteration and M2] -->

---

## 5.7 Cross-Model Mechanism Replication

### Purpose

Separate mechanism effects from model artifacts. The Haiku/Kimi ranking reversal in Paper 1.0 showed that architecture effects are model-dependent (η²=.527 for Kimi vs. .002 for Haiku); the question is *which* mechanisms are model-dependent and *why*. <!-- [PILOT: Haiku/Kimi reversal from multi-model probe, N=655] -->

### Design

Run the same multi-turn scenarios under multiple ego models, holding constant the superego model, judge model, scenarios, and conditions. The initial replication uses DeepSeek V3.2 (N=146) and Haiku 4.5 (N=163) on cells 80--87 under v2.2 rubric. For each model, compute: <!-- [VERIFIED: cross-model replication complete for DeepSeek + Haiku — §6.6; data frozen in DB, reproducible via analyze-eval-results.js] -->

1. **Calibration**: Dimension variance reduction (recognition vs. baseline)
2. **Error correction**: Superego critique taxonomy distribution and revision delta types
3. **Adaptive responsiveness**: Turn-by-turn trajectory slopes

### Predictions

- Calibration should be *model-independent* (prompt-level constraint, does not require architectural capacity). **Confirmed**: recognition d=1.88 (DeepSeek), d=1.84 (Haiku); calibration d=0.52/0.64; dimension floor-lifting pattern replicates. <!-- [VERIFIED: M1 model-independence confirmed — §6.1, §6.6; effect sizes from frozen DB data, reproducible via analysis scripts] -->
- Error correction should be *partially model-dependent* (requires ego capacity to incorporate superego critique). **Confirmed**: baseline architecture delta is model-dependent (+9.0 DeepSeek, +15.0 Haiku), but the substitution pattern (collapse under recognition) replicates in both models. <!-- [VERIFIED: M2 partial model-dependence confirmed — §6.2, §6.6; effect sizes from frozen DB data, reproducible via analysis scripts] -->
- Adaptive responsiveness should require *both capable ego and capable superego* (emergent property, not independent). **Weakly supported**: AdaptΔ > 0.79 in both models, but slopes are identical across conditions (d=-0.00) and development trajectories are model-dependent. <!-- [VERIFIED: M3 weakly supported — §6.3, §6.6; effect sizes from frozen DB data, reproducible via analysis scripts] -->

This provides a mechanistic explanation of the Haiku/Kimi reversal: if Kimi fails at error correction (cannot incorporate superego critique), the architecture adds noise rather than signal. The architecture is not failing; the ego model lacks the capacity to benefit from critique. <!-- [THEORETICAL: mechanistic explanation of model-dependent architecture] -->

---

## 5.8 Provable Discourse Extension

### Existing Infrastructure

The provable discourse framework tracks empirical claims as structured YAML entries with automated evidence adapters (`config/provable-discourse.yaml`, `services/provableDiscourse.js`). Paper 1.0 used 8 adapter types covering N-counts, effect sizes, profile-group comparisons, 2×2 ANOVA, judge-pair correlations, and log-trace coverage. <!-- [VERIFIED: scripts/validate-provable-discourse.js operational, config/provable-discourse.yaml exists] -->

### Extension for Mechanistic Claims

Paper 2.0 extends the framework with adapter types targeting mechanism-level evidence (`config/provable-discourse-mechanisms.yaml`): <!-- [VERIFIED: config/provable-discourse-mechanisms.yaml exists with calibration/error-correction/adaptation claims] -->

| Adapter Type | What It Checks | Example Assertion |
|-------------|----------------|-------------------|
| `dimension_variance` | Cross-dimension variance reduction by condition | Recognition variance d ≤ −0.3 |
| `dimension_cluster_effect` | Effect size for dimension clusters (recognition vs. pedagogy vs. infrastructure) | Recognition cluster d ≥ 0.50 |
| `taxonomy_frequency` | Superego critique category frequencies | Category X occurs in >Y% of recognition dialogues |
| `trajectory_slope` | Per-turn regression coefficients | Recognition slope on `recognition_quality` β > 0 |

### Symmetry Rules

Two new consistency rules enforce claim discipline:

1. **Mechanism consistency**: If a mechanism is claimed for recognition, the *anti-pattern* must be documented for baseline (paired evidence). <!-- [DESIGN: provenance-plan.md symmetry rules] -->
2. **Model qualification**: Any mechanistic claim must state which models it has been tested on, with replication status for each.

---

## 5.9 Statistical Approach

### Effect Size Conventions

All comparisons report Cohen's d with 95% confidence intervals. Classification: d < 0.2 negligible, 0.2–0.5 small, 0.5–0.8 medium, > 0.8 large. <!-- [DESIGN: same conventions as Paper 1.0 §5.6] -->

### ANOVA Design

Three-way factorial ANOVA (A: recognition × B: tutor architecture × C: learner architecture) applied to the primary dependent variable (tutor first-turn score, 0–100) and secondary variables (holistic score, development score, learner score, dialogue quality). Main effects and all 2-way and 3-way interactions reported. <!-- [VERIFIED: services/anovaStats.js implements runThreeWayANOVA()] -->

### Within-Judge Comparisons

Factor analyses use *within-judge* comparisons only (all rows scored by the same judge model). Cross-judge validation uses *between-judge* comparisons on identical responses to assess measurement reliability. <!-- [DESIGN: within-judge design necessitated by inter-judge calibration differences, Paper 1.0 §5.8] -->

### Epoch Filtering

All Paper 2.0 analyses filter to `tutor_rubric_version = '2.2'` (epoch 2.0), ensuring no cross-version contamination with pilot data. The epoch filter is applied in SQL queries and enforced by analysis scripts' `--epoch` flag. <!-- [VERIFIED: epoch filtering in analyze-trajectory-curves.js (--epoch flag)] -->

---

## 5.10 Reproducibility Infrastructure

### Evaluation Commands

All evaluations are reproducible via the CLI:
```
node scripts/eval-cli.js run --profiles <cells> --runs N --cluster multi-turn
node scripts/eval-cli.js evaluate <runId>
```
- `dialogue_content_hash`: SHA-256 of the dialogue log file
- `config_hash`: SHA-256 of the cell configuration
- Rubric version, judge model, and all hyperparameters

### Test Suite as Analytical Provenance

The test suite (32+ files, ~12K lines) covers not only the evaluation infrastructure but also the analytical pipeline. Tests verify that scoring, ANOVA computation, trajectory extraction, and within-test change analysis produce correct outputs on known inputs. <!-- [VERIFIED: npm test runs all tests, tests/ and services/__tests__/ directories] -->

This makes the analysis *reproducible in a testable sense*: the code's behavior on known inputs is verified by tests, and the exact code version is recorded with each evaluation run via `git_commit` in the evaluation_runs table. <!-- [VERIFIED: evaluationStore.js storeResult() records git_commit] -->



## 6.1 Calibration

Section 3 predicted that recognition-enhanced prompts produce a *calibration* effect: the tutor's output distribution narrows as each response must be shaped by the specific content of the learner's contribution, ruling out generic approaches. This section tests three aspects of that prediction using DeepSeek V3.2 as the primary ego model (N=146), with cross-model replication on Haiku 4.5 (N=163): (1) within-response dimension uniformity, (2) floor elimination, and (3) prompt-level independence from architecture.

Table X reports within-response dimension variance by experimental condition (cells 80--87, DeepSeek V3.2 ego, N=146, v2.2 rubric, claude-code/sonnet judge):

Two features of this pattern support the calibration-as-prompt-level-mechanism interpretation. First, recognition-single (SD=0.509) achieves *lower* variance than recognition-multi (SD=0.568), indicating that calibration does not require the superego --- the prompt alone produces the uniformity effect. Second, the multi-agent base condition (SD=0.550) shows partial variance reduction relative to single-agent base (SD=0.687), suggesting the superego provides a weaker form of calibration through critique-driven correction. Recognition achieves at least the same uniformity more efficiently, without the architectural overhead.

| Dimension | Base Mean | Recognition Mean | Lift | Rank (by lift) |
|---|---|---|---|---|
| productive_difficulty | 1.75 | 3.08 | **+1.33** | 1 |
| elicitation_quality | 1.36 | 2.53 | **+1.18** | 2 |
| recognition_quality | 2.18 | 3.25 | +1.07 | 3 |
| perception_quality | 2.40 | 3.32 | +0.92 | 4 |
| epistemic_integrity | 2.45 | 3.25 | +0.79 | 5 |
| pedagogical_craft | 2.30 | 2.97 | +0.67 | 6 |
| content_accuracy | 3.25 | 3.78 | +0.53 | 7 |
| adaptive_responsiveness | 2.45 | 2.97 | +0.52 | 8 |

The two largest recognition lifts (+1.33, +1.18) occur on the two *weakest* baseline dimensions: `productive_difficulty` (scaffolding struggle rather than resolving it) and `elicitation_quality` (asking questions that deepen understanding). The smallest lifts (+0.53, +0.52) occur on the two *strongest* baseline dimensions: `content_accuracy` and `adaptive_responsiveness`. This is the calibration signature: recognition specifically improves where the tutor is worst, lifting the floor toward the ceiling rather than raising the ceiling further.

### 6.1.3 The Architecture Interaction: Calibration Substitutes for Superego

The 2x2 factorial means reveal a striking interaction between recognition and architecture (DeepSeek V3.2):

This interaction has a specific interpretation within the mechanism model. Calibration (prompt-level) and error correction (architecture-level) both produce more uniform, higher-floor responses, but through different pathways: calibration constrains the generation process, while error correction filters the generated output. When calibration is already operative, there is less for error correction to catch. The superego's 9.0-point contribution under base represents the full error-correction benefit; its 0.2-point contribution under recognition represents the residual --- the failures that calibration alone does not prevent.

| Scenario | Base Mean (N) | Recog Mean (N) | Delta |
|---|---|---|---|
| Impasse: Epistemic Resistance | 19.2 (12) | 57.5 (12) | **+38.3** |
| Impasse: Productive Deadlock | 17.9 (12) | 52.8 (12) | **+34.9** |
| Mutual Transformation Journey | 18.5 (12) | 43.2 (12) | +24.7 |
| Impasse: Affective Shutdown | 27.9 (12) | 45.7 (12) | +17.8 |
| Misconception Correction | 36.5 (12) | 50.1 (12) | +13.6 |
| Mood: Frustration to Breakthrough | 37.8 (13) | 51.2 (13) | +13.4 |

The largest recognition effects appear in impasse scenarios --- Epistemic Resistance (+38.3) and Productive Deadlock (+34.9) --- where the learner actively resists or deadlocks. The smallest effects appear in Misconception Correction (+13.6) and Mood: Frustration to Breakthrough (+13.4), where the learner's trajectory is less adversarial. This is theoretically predicted: calibration requires engagement with the *specific content* of the learner's contribution, and specificity matters most when the learner's contribution is resistant or adversarial. A frustrated learner who is already moving toward breakthrough can be helped with generic encouragement; a learner who is epistemically resistant requires a response calibrated to their specific objection.

**2x2 factorial means (Haiku 4.5):**

| | Single-Agent | Multi-Agent | Architecture Delta |
|---|---|---|---|
| **Base** | 52.9 (N=39) | 67.9 (N=42) | **+15.0** |
| **Recognition** | 80.2 (N=39) | 79.5 (N=43) | **-0.7** |
| **Recognition Delta** | +27.3 | +11.6 | |

The architecture interaction replicates strikingly: under base conditions the superego adds 15.0 points, under recognition the superego adds -0.7 points (i.e., effectively zero, with the sign reversal within noise). The qualitative pattern is identical to DeepSeek: recognition renders the superego redundant.

**Dimension-specific lifting replicates:**

| Dimension | Haiku Base | Haiku Recog | Haiku Lift | DeepSeek Lift | Rank Match? |
|---|---|---|---|---|---|
| elicitation_quality | 2.37 | 3.62 | **+1.25** | +1.18 | Top-2 in both |
| productive_difficulty | 2.83 | 3.90 | **+1.08** | +1.33 | Top-2 in both |
| recognition_quality | 3.23 | 4.09 | +0.85 | +1.07 | Mid-range |
| epistemic_integrity | 3.26 | 4.02 | +0.77 | +0.79 | Mid-range |
| perception_quality | 3.51 | 4.22 | +0.71 | +0.92 | Mid-range |
| pedagogical_craft | 3.37 | 4.00 | +0.63 | +0.67 | Mid-range |
| content_accuracy | 3.85 | 4.34 | +0.49 | +0.53 | Bottom-2 in both |
| adaptive_responsiveness | 3.07 | 3.55 | +0.47 | +0.52 | Bottom-2 in both |

The floor-lifting pattern replicates: in both models, `elicitation_quality` and `productive_difficulty` show the largest recognition lifts (they are also the weakest baseline dimensions), while `content_accuracy` and `adaptive_responsiveness` show the smallest lifts (they are among the strongest baseline dimensions). The ranking is not identical, but the extremes match: the same two dimensions benefit most and the same two benefit least.

**Scenario-dependent calibration replicates:**

| Scenario | DeepSeek Delta | Haiku Delta | Rank Match? |
|---|---|---|---|
| Impasse: Epistemic Resistance | **+38.3** | **+26.4** | Top-2 both |
| Impasse: Productive Deadlock | **+34.9** | **+27.8** | Top-2 both |
| Mutual Transformation | +24.7 | +12.6 | |
| Impasse: Affective Shutdown | +17.8 | +17.3 | |
| Misconception Correction | +13.6 | +21.8 | |
| Mood: Frustration | +13.4 | +12.2 | Bottom-2 both |

The impasse-dominance pattern replicates: Epistemic Resistance and Productive Deadlock produce the largest recognition effects in both models. Mood: Frustration to Breakthrough produces the smallest effect in both models. The mid-range scenarios show more model-dependent ordering (notably, Misconception Correction is mid-range for DeepSeek but second-largest for Haiku), but the extremes are stable.

### 6.1.6 Connecting to Section 3 Predictions

The calibration mechanism predictions from Section 3 are assessed as follows:

**Prediction: Recognition narrows output distribution even without superego.** *Confirmed in both models.* Within-response dimension SD drops under recognition in single-agent conditions: DeepSeek 0.687→0.509, Haiku 0.656→0.497. The effect does not require the superego.

**Pilot replication.** The pilot study (N=350, cells 1--8) found dimension variance drops in 52/55 within-run comparisons. The messages-mode data confirms the same pattern under multi-turn conversation with the v2.2 rubric, different ego models (DeepSeek V3.2, Haiku 4.5 vs. pilot-era Nemotron/Kimi), and a different judge (claude-code/sonnet vs. claude-opus). The calibration effect replicates across model, rubric version, and conversation mode.

**Cross-model calibration (H5).** Calibration replicates from DeepSeek V3.2 to Haiku 4.5 on all tested indicators. The calibration effect size is *larger* in Haiku (d=0.64 vs. 0.52), despite Haiku operating at a much higher baseline. This is consistent with calibration being a prompt-level mechanism independent of model capability, though the higher Haiku effect size may also reflect better instruction-following by Haiku 4.5.



## 6.2 Error Correction

Section 3 predicted that multi-agent architecture enables an *error correction* mechanism: the superego critiques the ego's output, catching pedagogical failures that the ego alone would miss. Section 6.1 showed that this mechanism's contribution collapses under recognition (DeepSeek: architecture delta +9.0→+0.2; Haiku: +15.0→-0.7). This section traces the error correction process itself: what the superego catches, how the ego responds, and why the mechanism becomes redundant under recognition.

### 6.2.1 The Superego's Approval Rate Under Recognition

The most direct measure of error correction necessity is the superego's approval rate --- how often the ego's initial output is good enough to pass without revision. We extract approval decisions from all superego/review trace entries in multi-agent dialogues (cells 82--83, 86--87), separated by ego model and prompt condition.

The pattern is stark, especially for DeepSeek: under base conditions, the superego rejects 86.7% of ego outputs; under recognition, it approves 55.1%. The approval rate quadruples. The revision round count drops from 1.82 to 1.30 rounds per turn --- the ego needs fewer correction cycles because its initial output already satisfies the superego's criteria.

### 6.2.2 What the Superego Catches

When the superego rejects the ego's output, what errors does it identify? We categorize feedback from all rejected reviews using keyword-based taxonomy extraction across seven categories: recognition failure (treating the learner as passive), context awareness (engaging with learner history), elicitation (asking probing questions), vagueness (lacking specificity), content accuracy, struggle preservation (maintaining productive difficulty), and emotional attention.

Three patterns emerge. First, the *total volume* of critiques drops dramatically under recognition: DeepSeek produces 69% fewer critique mentions (975→302), Haiku 33% fewer (550→368). Calibration eliminates the majority of errors before the superego sees them.

Third, the *struggle preservation* category increases proportionally under recognition (DeepSeek: 5.2%→9.3%), despite its absolute count dropping. This suggests that recognition prompts, while effective at ensuring the tutor engages with the learner, can over-engage --- giving too much scaffolding rather than maintaining productive difficulty. The superego's residual value lies partly in enforcing struggle even when the ego's recognition-enhanced response is otherwise adequate.

| Deliberation Dimension | DeepSeek Base | DeepSeek Recog | Delta | Haiku Base | Haiku Recog | Delta |
|---|---|---|---|---|---|---|
| critique_substance | 3.03 | 2.14 | **-0.89** | 3.51 | 3.09 | -0.42 |
| revision_impact | 2.97 | 1.97 | **-1.00** | 2.72 | 2.67 | -0.05 |
| deliberation_depth | 2.42 | 1.95 | -0.47 | 2.95 | 2.63 | -0.32 |
| insight_generation | 2.64 | 2.00 | **-0.64** | 3.08 | 2.70 | -0.38 |
| process_coherence | 3.56 | 2.78 | **-0.78** | 3.15 | 3.30 | +0.15 |
| cross_turn_evolution | 2.25 | 1.70 | -0.55 | 2.92 | 2.58 | -0.34 |
| **Overall (0--100)** | **45.7** | **27.2** | **-18.5** | **51.5** | **45.9** | **-5.6** |

This is not a failure of the architecture --- it is the expected consequence of calibration pre-empting error correction. When the ego already produces calibrated output, the superego has less substantive feedback to offer. The critique becomes perfunctory (lower critique_substance), the revisions become cosmetic rather than transformative (lower revision_impact), and the overall process becomes a formality rather than a genuine deliberative exchange (lower deliberation_depth). The quality of the *process* declines because the *product* no longer needs the process.

| | DeepSeek V3.2 | Haiku 4.5 |
|---|---|---|
| Base RevΔ | 0.901 ± 0.086 | 0.917 ± — |
| Recognition RevΔ | 0.869 ± 0.130 | 0.851 ± — |
| Delta | -0.032 | -0.066 |

The combination of high RevΔ but low deliberation quality under recognition presents an apparent paradox: the revisions are extensive but the deliberation process is poor. The resolution is that under recognition, the superego's critiques are less substantive (as shown by the approval rate and critique taxonomy), and the ego responds to even thin feedback with substantial rewrites. The ego is *compliant* with the superego regardless of critique quality --- it rewrites extensively whether the feedback is deep or shallow. This compliance mechanism explains why error correction works under base (substantive critique → substantive revision) but adds little under recognition (thin critique → extensive but unnecessary revision).

| Indicator | DeepSeek V3.2 | Haiku 4.5 | Interpretation |
|---|---|---|---|
| Base approval rate | 13.3% | 51.6% | Weaker models need more correction |
| Recognition approval rate | 55.1% | 66.1% | Both shift toward approval |
| Approval rate shift | +41.8 pp | +14.5 pp | Larger shift in weaker model |
| Deliberation quality drop | -18.5 pts | -5.6 pts | Larger drop in weaker model |
| RevΔ base | 0.901 | 0.917 | Similar revision magnitude |
| RevΔ recognition | 0.869 | 0.851 | Similar under recognition |
| Architecture delta base | +9.0 pts | +15.0 pts | Stronger model benefits more from superego |
| Architecture delta recog | +0.2 pts | -0.7 pts | Both collapse to near-zero |

DeepSeek, the weaker model, shows more dramatic error correction dynamics: its base approval rate is very low (the ego almost always needs correction), and recognition produces a much larger shift. Haiku, the stronger model, shows a more moderate pattern --- its ego already produces acceptable output more often, so the superego's correction role is less dramatic even under base conditions.

### 6.2.6 Connecting to Section 3 Predictions

**Prediction: Error correction requires the superego (architecture-level mechanism).** *Confirmed.* The architecture delta under base conditions (DeepSeek +9.0, Haiku +15.0) demonstrates that the superego adds measurable value when the ego produces uncalibrated output. Single-agent tutors lack this correction pathway.

**Prediction: Error correction requires recognition for ego receptivity.** *Partially supported.* The high RevΔ values (>0.85) under both conditions show that the ego is compliant with superego feedback regardless of recognition. However, the nature of the compliance differs: under base, the ego revises in response to substantive critique; under recognition, it revises in response to thin critique. The theoretical prediction assumed the ego would *resist* the superego without recognition prompts --- instead, the ego is uniformly compliant, and recognition's contribution is to make the ego's *initial output* better rather than making it more receptive to feedback.

---




## 6.3 Adaptive Responsiveness

Section 3 predicted a third mechanism --- *adaptive responsiveness* --- whereby the tutor adjusts its approach across turns in response to the learner's evolving state. Unlike calibration (prompt-level, operative from the first turn) and error correction (architecture-level, operative within each turn), adaptive responsiveness is an interaction-level mechanism that emerges across the multi-turn conversation. This section examines tutor development trajectories, cross-turn adaptation magnitude, and the relationship between tutor adaptation and learner outcomes.

### 6.3.1 Tutor Development Trajectories

The most direct measure of adaptive responsiveness is the tutor's quality trajectory across turns: does the tutor improve as it learns about the learner? We compare the tutor's first-turn score to its last-turn score (v2.2 rubric, 100-point scale) across all eight experimental conditions.

The development pattern is strikingly model-dependent. DeepSeek shows a mixed pattern: base-single *declines* (-3.2), recognition-single *improves* (+8.1), and recognition-multi *declines* (-3.6). Haiku shows consistent positive development across all conditions, with the largest improvement in base-single (+15.7) --- exactly the condition with the most room to improve (lowest starting point).

Two findings are noteworthy. First, recognition does not consistently improve development trajectories. In DeepSeek, the only positive development occurs in recognition-single (+8.1); recognition-multi shows decline (-3.6). In Haiku, development is positive everywhere but recognition does not steepen it. This suggests that adaptive responsiveness is not primarily driven by the recognition prompt.

### 6.3.2 Trajectory Curves

The aggregate trajectory analysis (pooled across both models, N=288) provides finer-grained turn-by-turn data:

The learner trajectory tells a complementary story. Learner slopes are slightly higher under recognition (2.29 vs 1.60, d=0.08), but the difference is small. The learner quality gap between conditions (recognition vs baseline) narrows across turns: T0 gap = 2.0 points, T4 gap = 1.4 points. Both learners converge toward similar quality by the end of the conversation regardless of tutor condition. This is consistent with the tutor-learner asymmetry prediction from §3: recognition primarily affects tutor production, not learner learning.

### 6.3.3 Per-Dimension Adaptation Patterns

The dimension-level slope analysis reveals which aspects of tutoring adapt most across turns:

The null finding on dimension slopes is itself informative. It means that recognition does not selectively *accelerate* adaptation on any particular dimension. The calibration effect from §6.1 (raising all dimensions, especially the weakest) operates from the first turn; subsequent turns do not show differential improvement. Adaptive responsiveness, as measured by per-dimension slopes, operates independently of prompt condition.

| | DeepSeek V3.2 | Haiku 4.5 |
|---|---|---|
| Base AdaptΔ | 0.793 ± 0.199 | 0.888 ± 0.093 |
| Recognition AdaptΔ | 0.824 ± 0.167 | 0.908 ± 0.048 |
| Delta | +0.031 | +0.020 |

Cross-turn adaptation is high in all conditions (>0.79), indicating that the tutor substantially changes its output between turns regardless of prompt or architecture. Recognition shows slightly higher adaptation (+0.031 DeepSeek, +0.020 Haiku), consistent with the recognition prompt's emphasis on engaging with the specific learner contribution. However, the baseline is already high, leaving limited room for the prompt to increase adaptation further.

### 6.3.5 Learner Outcomes

If adaptive responsiveness matters for learning, tutor adaptation should translate into learner quality improvements. The learner scores (per-turn learner rubric, v2.2) provide a test:

The tutor-learner asymmetry is pronounced. DeepSeek tutor scores range from 22 to 50 across conditions; learner scores range from 57 to 63 --- a much narrower band. Haiku tutor scores range from 53 to 80; learner scores from 64 to 73. Recognition produces a 28-point tutor swing in DeepSeek (22→50) but only a 3-point learner swing (57→60). In Haiku, a 27-point tutor swing (53→80) produces a 5-point learner swing (64→69).

### 6.3.6 Dialogue Quality

Dialogue quality scores (holistic assessment of the full conversation arc) integrate tutor and learner contributions:

### 6.3.7 Connecting to Section 3 Predictions

**Prediction: Adaptive responsiveness emerges over multi-turn conversation.** *Weakly supported.* Cross-turn adaptation is high (AdaptΔ > 0.79), and most conditions show positive development trajectories. However, the development slopes are small and not significantly different between recognition and baseline (tutor slope d = -0.00). Adaptation occurs, but recognition does not accelerate it.

**Prediction: Recognition produces steeper adaptation curves.** *Not confirmed.* Tutor development slopes are effectively identical across conditions (d = -0.00). Recognition raises the *floor* of each turn's score, but does not change the *rate* of improvement. Adaptive responsiveness is model-dependent (DeepSeek shows mixed development; Haiku shows consistent positive development) rather than prompt-dependent.

**Key distinction.** Adaptive responsiveness is real (the tutor changes across turns, AdaptΔ > 0.79) but it is not recognition-specific. Both base and recognition tutors adapt at similar rates; recognition simply ensures that adaptation happens at a higher quality level. The mechanism is better characterized as *model-dependent adaptation at a recognition-determined baseline* rather than *recognition-enhanced adaptation*.



## 6.4 Mechanism Interaction

The preceding sections established three separable mechanisms: calibration (§6.1, prompt-level), error correction (§6.2, architecture-level), and adaptive responsiveness (§6.3, interaction-level). This section examines how they interact within the 2×2 factorial design, testing the §3 prediction that the mechanisms are separable but non-independent.

### 6.4.1 The Factorial Interaction

The 2×2 factorial (recognition × architecture) permits decomposition of the total recognition effect into prompt-level and architecture-level components. Table Z reports the full factorial for both models:

The interaction is ordinal disordinal: the architecture's contribution does not reverse sign (except marginally for Haiku at -0.7), but it collapses from a substantial benefit to near-zero. This is the signature of a *substitution* interaction rather than a *synergy* interaction. The two mechanisms (calibration and error correction) target the same output failures, so their effects do not add.

**DeepSeek:**
- Calibration alone (recognition delta, single-agent): +28.0
- Error correction alone (architecture delta, base): +9.0
- Expected if additive: 22.0 + 28.0 + 9.0 = 59.0
- Observed (recognition + multi-agent): 50.2
- Deficit from additivity: **-8.8 points** (15% of expected)

**Haiku:**
- Calibration alone (recognition delta, single-agent): +27.3
- Error correction alone (architecture delta, base): +15.0
- Expected if additive: 52.9 + 27.3 + 15.0 = 95.2
- Observed (recognition + multi-agent): 79.5
- Deficit from additivity: **-15.7 points** (16% of expected)

Both models show a ~15--16% deficit from strict additivity, consistent with partial mechanism overlap. The overlap interpretation: calibration handles ~60--100% of what error correction would catch, so adding error correction to a calibrated system yields diminishing returns.

| Mechanism | Level | Key Evidence | Recognition-Dependent? |
|---|---|---|---|
| **Calibration** | Prompt | Within-response SD drops d=0.52--0.64; floor lifts; operates without superego | Yes — prompt-level |
| **Error Correction** | Architecture | Approval rate shifts; architecture delta +9--15 under base, ~0 under recognition | Partially — pre-empted by calibration |
| **Adaptive Responsiveness** | Interaction | AdaptΔ > 0.79; tutor slopes d=-0.00 across conditions | No — model-dependent, not prompt-dependent |

The mechanisms are separable in three senses:

1. **Temporal separability.** Calibration operates from the first turn (the tutor's initial response is already calibrated under recognition). Error correction operates within each turn (ego → superego → revision). Adaptive responsiveness operates across turns (the tutor adjusts between turns). These temporal signatures are empirically distinct.

3. **Interaction separability.** Calibration and error correction interact (substitution); calibration and adaptive responsiveness are independent (the slope is the same regardless of the level); error correction and adaptive responsiveness interact weakly (the superego may constrain adaptation, as suggested by the DeepSeek multi-agent development decline in §6.3.1).

| Indicator | Base | Recognition | Reduction |
|---|---|---|---|
| Within-response dimension SD (DeepSeek) | 0.619 | 0.539 | 13% |
| Within-response dimension SD (Haiku) | 0.617 | 0.499 | 19% |
| Tutor score SD (DeepSeek) | 12.6 | 12.6 | 0% |
| Tutor score SD (Haiku) | 12.5 | 7.7 | **38%** |
| Cross-turn AdaptΔ variance (DeepSeek) | 0.199 | 0.167 | 16% |
| Cross-turn AdaptΔ variance (Haiku) | 0.093 | 0.048 | 48% |

Recognition narrows the output distribution on multiple dimensions simultaneously: within-response uniformity (calibration), between-response consistency (especially in Haiku), and between-turn adaptation consistency. The common mechanism is the prompt's constraint on generation: by requiring engagement with the specific learner, recognition eliminates the high-variance generic approaches that produce both very good and very poor outputs.

**Prediction: The mechanisms interact non-additively.** *Confirmed.* Calibration and error correction show a ~15--16% deficit from additivity, consistent with substitution (overlapping targets). Calibration and adaptive responsiveness are additive (slopes are independent of levels).

---




## 6.5 Tutor-Learner Asymmetry

The three mechanisms described in §6.1--6.3 operate exclusively on tutor production: calibration constrains the tutor's generation, error correction filters the tutor's output, and adaptive responsiveness governs the tutor's trajectory. None directly modifies the learner's behavior. This section formalizes the resulting asymmetry: recognition dramatically improves tutor quality but produces negligible learner effects.

### 6.5.1 The Effect Size Gap

The recognition main effect on tutor quality is large; on learner quality it is small:

Recognition produces a tutor effect 7--12 times larger than its learner effect. The tutor Cohen's d values (1.88, 1.84) are very large by conventional standards; the learner values (0.25, 0.16) are small to negligible. This asymmetry is consistent across both models, ruling out model-specific explanation.

Three structural factors predict the asymmetry:

1. **Prompt scope.** The recognition prompt appears in the tutor's system context. The learner agent receives the tutor's output but not the tutor's prompt. The learner's own prompt (unified or ego-superego) is identical across base and recognition conditions.

3. **Learner ceiling.** The learner's quality is bounded by its own model capability and prompt, not by the tutor's quality. DeepSeek learner scores range 57--63 regardless of tutor condition; Haiku learner scores range 64--73. The learner's output quality is relatively insensitive to the quality of tutoring it receives, at least within the range of quality variation produced by the recognition intervention.

| Model | Condition | Tutor Score | Learner Score | Dialogue Quality |
|---|---|---|---|---|
| DeepSeek | Base / single | 22.0 | 57.3 | 22.0 |
| DeepSeek | Base / multi | 31.0 | 60.3 | 31.5 |
| DeepSeek | Recog / single | 50.0 | 60.1 | 49.1 |
| DeepSeek | Recog / multi | 50.2 | 63.3 | 48.9 |
| Haiku | Base / single | 52.9 | 63.5 | 53.1 |
| Haiku | Base / multi | 67.9 | 69.6 | 72.7 |
| Haiku | Recog / single | 80.2 | 68.2 | 81.2 |
| Haiku | Recog / multi | 79.5 | 69.0 | 80.7 |

Two patterns are notable. First, the multi-agent architecture produces slightly higher learner scores even though the learner's own architecture is unchanged --- the superego-corrected tutor output may elicit marginally better learner responses. Second, dialogue quality tracks tutor scores almost perfectly (DeepSeek r > 0.99, Haiku r > 0.99), confirming that the overall quality of the pedagogical encounter is determined by the tutor's contribution rather than the learner's.

| | Tutor Slope | Learner Slope |
|---|---|---|
| Recognition (pooled) | 1.47 | 2.29 |
| Baseline (pooled) | 1.50 | 1.60 |
| d (recognition vs baseline) | -0.00 | 0.08 |

Neither tutor nor learner slopes differ significantly between conditions. The learner shows slightly steeper improvement under recognition (d=0.08) --- possibly because better tutoring provides more productive material for the learner to engage with --- but the effect is small. The asymmetry in *levels* (§6.5.1) is not accompanied by an asymmetry in *slopes*.

Whether better tutoring would produce better learning in human learners (rather than synthetic LLM learners) remains an open question. The synthetic learner's quality is bounded by its model and prompt; a human learner might benefit more from recognition-calibrated tutoring. This limitation is addressed in §8.



## 6.6 Model Dependence

The preceding sections present findings from two structurally different models: DeepSeek V3.2 (open-weight, 685B MoE) and Haiku 4.5 (proprietary, optimized for speed). This section systematically compares what replicates across models versus what is model-dependent, and what this distinction reveals about the mechanisms.

### 6.6.1 Baseline Capability Gap

The two models differ substantially in baseline performance:

### 6.6.2 What Replicates Across Models

Despite the baseline gap, the following findings replicate across both models:

**2. Architecture interaction collapse.** The superego's benefit disappears under recognition in both models:
- DeepSeek: architecture delta +9.0 (base) → +0.2 (recognition)
- Haiku: architecture delta +15.0 (base) → -0.7 (recognition)

**4. Dimension floor-lifting pattern.** In both models, the weakest baseline dimensions (elicitation_quality, productive_difficulty) show the largest recognition lifts, and the strongest baseline dimensions (content_accuracy, adaptive_responsiveness) show the smallest lifts.

**6. Superego approval rate increases under recognition.** Both models show higher approval rates under recognition (DeepSeek: 13.3%→55.1%; Haiku: 51.6%→66.1%).

**8. Tutor development slopes are equal across conditions.** Neither model shows steeper tutor improvement under recognition (pooled d = -0.00).

**1. Superego approval rate baseline.** DeepSeek base: 13.3% approved (the ego almost always needs correction). Haiku base: 51.6% (roughly half approved). Weaker models produce more errors for the superego to catch.

**3. Score variance under recognition.** DeepSeek maintains similar variance under recognition (SD: 12.6 → 12.6). Haiku shows substantial variance reduction (SD: 12.5 → 7.7, a 38% reduction). Recognition narrows Haiku's output distribution more than DeepSeek's.

**5. Error correction magnitude.** DeepSeek gains 9.0 points from the superego under base; Haiku gains 15.0 points. The stronger model benefits more from error correction in absolute terms, perhaps because the superego (also powered by a capable model) provides more substantive feedback.

| Mechanism | Both Models | Model-Dependent Aspect |
|---|---|---|
| **Calibration** | Variance reduction, floor lifting, dimension-rank pattern | Magnitude (d=0.52 vs 0.64), score-level variance |
| **Error Correction** | Approval rate shift, architecture collapse under recognition | Baseline approval rate (13% vs 52%), absolute architecture delta |
| **Adaptive Responsiveness** | Slopes equal across conditions, high AdaptΔ | Development trajectory direction, deliberation sensitivity |

The strongest model-dependent effect is the development trajectory: DeepSeek shows *declining* tutor quality in several conditions (the tutor gets worse as the conversation progresses), while Haiku shows consistent improvement. This may reflect DeepSeek's difficulty maintaining pedagogical focus across extended multi-turn conversations --- a capability limitation rather than a mechanism difference.

Two important caveats qualify this generalizability claim. First, both models are relatively capable --- the mechanisms may not replicate in substantially weaker models. The Nemotron data in the database (N=40, mean tutor score ~8 under base) hints that very weak models may not benefit from recognition at all, but the sample is too small for confident claims. Second, the judge (claude-code/sonnet) is constant across both models; cross-judge validation would strengthen the generalizability argument.

---




## 7. Discussion

The preceding sections traced three mechanisms---calibration, error correction, and adaptive responsiveness---through the system's internal processes. This section reflects on what the investigation reveals, both about the architecture under study and about the methodology used to study it. We argue that the evaluation apparatus itself constitutes a transferable contribution, and that the process of building it illuminates the mechanisms it was designed to trace.

### 7.1 From Effects to Mechanisms

The companion pilot study [@magee2026geist] established that recognition-enhanced prompts produce large, replicable differences in AI tutoring quality (d=1.11 in the factorial, d=1.71 in memory isolation). This paper asked *through what internal processes* those differences propagate.

The mechanism data (cells 80--87, DeepSeek V3.2 + Haiku 4.5, N=309) supports calibration strongly: within-response dimension variance drops d=0.52--0.64, operating identically in single-agent cells. Error correction is confirmed as a *substitution* mechanism: the superego provides +9--15 points under baseline but collapses to near-zero under recognition, because calibration pre-empts the errors the superego would catch. Adaptive responsiveness is real (AdaptΔ > 0.79) but not recognition-specific: tutor slopes are identical across conditions (d = -0.00). Recognition raises the *level* of adaptation, not the *rate*. The mechanism hierarchy is clear: calibration does the primary work; error correction provides a baseline safety net; adaptive responsiveness is model-dependent rather than prompt-dependent.

The messages-mode data provides further evidence. Pooled across both models (N=288), recognition sets the tutor's initial quality substantially higher (T0: 62.4 vs 41.6) with near-identical slopes across conditions (recognition 1.47, baseline 1.50, d = -0.00). The pattern is consistent across models: DeepSeek recognition d=1.88, Haiku recognition d=1.84. Recognition acts as *calibration*---setting the initial level---not *adaptation*---driving within-dialogue improvement. This is Mechanism 1 dominant, Mechanism 3 weakly supported, replicating across both models.

### 7.4 The Apparatus as Method

This paper's most distinctive contribution may not be any single finding about recognition or multiagent architecture. It is the argument that the evaluation apparatus itself---the provable discourse framework, the rubric iterations, the bug corrections, the test suite---constitutes a **transferable methodology** for mechanistic evaluation of LLM-based educational systems.

| Architecture Layer | Research Layer |
|---|---|
| Ego generates initial response | Researcher generates initial claim |
| Superego critiques against pedagogical principles | Provable discourse tests against evidence |
| Ego revises (substantive or cosmetic) | Researcher revises (correction or rationalization) |
| Ego compliance: revision without substance | P-hacking: evidence without substance |
| Recognition gives ego capacity for genuine revision | Provable discourse infrastructure forces genuine correction |
| Final output scored by external judge | Final paper evaluated by external reviewers |

The companion pilot study documented nine post-extraction corrections across five development phases. Each follows the superego-intervention pattern: a validation mechanism (the "superego") catches a discrepancy, and the researcher (the "ego") must choose between genuine revision and cosmetic compliance. The provable discourse framework constrains this choice toward genuine revision by making the claim-evidence relationship machine-verifiable.

Three examples illustrate the pattern. The active control reframing (February 6): data caught a model confound (comparing Nemotron active-control to Kimi baseline); the claim was revised from "placebo proves recognition is the only active ingredient" to "active control scores between base and recognition." The judge version unification (February 16): a version audit caught a confound between judge version and experimental condition, requiring a cascade of re-scoring that shifted d from 0.80 to 1.11. The learner prompt leakage (February 20): a code review caught leaky learner prompts that contaminated tutor input, requiring clean re-generation of all dynamic learner data. In each case, the correction made the findings *less clean* and *more accurate*.

#### 7.4.3 The Rubric Iteration as Construct Refinement

The rubric evolved through four versions (v1.0 $\rightarrow$ v2.0 $\rightarrow$ v2.1 $\rightarrow$ v2.2), each responding to specific measurement problems:

This makes the analysis *reproducible in a testable sense*: not just "you can run our code" but "our code produces expected output on known inputs, and here are the tests that prove it." The test suite functions as analytical provenance---machine-verifiable evidence that the infrastructure supporting mechanism claims is itself sound.

The tutoring system faces a challenge: an agent that generates output (the ego) needs a critic (the superego) whose feedback must be *incorporated* rather than *minimized*. Recognition theory predicts that genuine incorporation requires the ego to be oriented toward the other's perspective---treating critique as informative rather than adversarial.

The research process faces the same challenge: a researcher who generates claims needs a validation framework (provable discourse) whose failures must be *addressed* rather than *explained away*. The provable discourse framework forces genuine correction by making the claim-evidence relationship machine-verifiable---the researcher cannot simply reinterpret a failing claim; the assertion either passes or it does not.

The mechanisms we study in the tutor---calibration, error correction, adaptive responsiveness---are the mechanisms we needed in the research process. Calibration narrows the space of acceptable claims (only those supported by evidence). Error correction catches stale or incorrect assertions (the "superego" of provable discourse). And the rubric iteration exhibits adaptive responsiveness: each version responds to specific problems discovered in previous versions, accumulating methodological insight across iterations.

### 7.6 Implications for AI Evaluation Methodology

The apparatus-as-method argument has implications beyond this specific study:

**It explains:** Why intersubjective prompts produce calibrated output (Mechanism 1: the prompt constrains responses to engage with specific learner input, d=0.52--0.64). Why the superego's benefit collapses under recognition (Mechanism 2: calibration pre-empts errors, producing a substitution interaction rather than synergy). Why recognition effects are largest in impasse scenarios (§6.1.4: Epistemic Resistance and Productive Deadlock produce the largest deltas in both models).



## 8. Limitations

### 8.1 Synthetic Learners

All evaluations use LLM-generated learner turns rather than real learners. The three mechanisms we trace (calibration, error correction, adaptive responsiveness) operate on the tutor's production process, which is observable regardless of whether the learner is synthetic or human. However, the *consequences* of these mechanisms for learning outcomes cannot be assessed without human learners. The synthetic learner may respond to better tutoring in ways that diverge from human learners: genuine confusion is different from simulated confusion, and genuine resistance differs from scripted resistance. The mechanism-level findings are robust to learner type (they trace tutor-internal processes), but their pedagogical significance depends on whether the improved tutor behavior actually produces better learning.

### 8.2 LLM-as-Judge Evaluation

Using LLM judges to evaluate recognition quality may introduce systematic biases. The judge may reward surface markers of recognition (acknowledging learner contributions, using inclusive language) rather than genuine engagement. Cross-judge validation with GPT-5.2 confirms effect directions replicate but magnitudes compress to 37--59% of the primary judge's estimates, depending on experiment. The correlation between judges on paired scores ranges from r=0.49 to r=0.64 across experiments; this is moderate, confirming that within-judge comparisons are valid but absolute scores and specific effect magnitudes are judge-dependent. Paper 2.0's mechanism data (cells 80--87) has been validated by three independent judges (Sonnet 4.6, Gemini 3.1 Pro, GPT-5.4; 1,296 total scored rows), with the recognition effect unanimous across all 9 judge $\times$ run cells (d=1.34--1.92; §6.4.6).

For mechanism-level claims, the judge limitation is particularly relevant to the superego critique taxonomy (§5.1): critique categories are classified by an LLM, and the ego's "substantive revision" versus "cosmetic compliance" is assessed by an LLM judge. The mechanism claims are thus LLM-assessed claims about LLM-internal processes---a recursive structure that introduces the possibility of systematic blind spots. Human expert coding of a representative subsample would provide independent validation.

### 8.4 Process Tracing with LLMs

Our adaptation of process tracing from social science to AI systems introduces a philosophical complication. In political science, process tracing examines *actual* causal chains: the decision-maker's deliberation, the institutional constraints, the information flows. In our architecture, the ego-superego exchange is *generated* text---the "deliberation" is a prompted LLM output, not a cognitive process in any neuroscientific sense. The mechanism claims are about designed information flows between prompted agents, not about internal mental states.

### 8.6 Rubric Evolution

The rubric evolved through four versions during the study. Paper 1.0 data uses v1.0 (14 tutor dimensions); Paper 2.0 data uses v2.2 (8 tutor dimensions). Cross-version comparisons are inadvisable---the dimension structure, weighting, and judge instructions differ---so we do not retroactively score historical data under newer rubric versions. This means pilot findings (v1.0) and mechanism findings (v2.2) use different measurement instruments, and direct numerical comparisons between them should be treated with caution.

The v2.2 rubric has been validated through synthetic calibration (r=+0.996 tutor, r=+0.968 learner) and through initial empirical use on cells 80--87 (N=309 under v2.2). The 8-dimension structure produces coherent findings: floor-lifting patterns, dimension-rank consistency across models, and calibration effects that align with theoretical predictions (§6.1).

However, principal components analysis on 1,584 per-turn observations reveals that the 8 dimensions largely measure a single construct: PC1 explains 80.7% of variance, and the Kaiser criterion yields only one factor with eigenvalue $>$1. Sampling adequacy is excellent (KMO = 0.938), and the mean inter-dimension correlation is r=0.776 (range 0.589--0.921). This pattern replicates across conditions (PC1: 80.2% base, 75.6% recognition) and models (77.3% DeepSeek, 68.0% Haiku). Forced two-factor varimax rotation separates `content_accuracy` (loading 0.923 on Factor 2) from the seven pedagogical dimensions (loadings 0.68--0.85 on Factor 1), suggesting that the rubric captures two facets---factual correctness and pedagogical quality---but within the pedagogical facet, the dimensions are not empirically distinct.

### 8.7 Pilot Data Transparency

The companion pilot study documented nine post-extraction corrections, four of which affected quantitative results. Bug 4 (multi-turn scoring misalignment) affected 8,631 rows. Bug 5 (resume model override loss) affected one run. Bugs 1--2 (learner prompt leakage, broken conversation history) required complete re-generation of all dynamic learner data. These corrections are documented transparently in the companion study and in the project's bug registry, and the provable discourse framework tracks which claims depend on corrected versus pre-correction data. The correction history demonstrates the evaluation infrastructure's capacity for self-correction---but it also means that pre-correction findings, including some reported in early presentations of this work, should not be cited without noting the corrections.

---




## 9. Conclusion

A companion pilot study established that recognition-enhanced prompts and multiagent architecture produce large, replicable differences in AI tutoring quality. This paper asked the next question: *through what mechanisms?*

The mechanism data (cells 80--87, DeepSeek V3.2 N=146, Haiku 4.5 N=163) supports calibration strongly: within-response dimension variance drops d=0.52--0.64, the weakest baseline dimensions show the largest recognition lifts, and the effect operates identically in single-agent cells without a superego. Error correction is confirmed as a *substitution* mechanism: the superego provides +9--15 points under baseline but near-zero under recognition, because calibration pre-empts the errors the superego would catch---a ~15% deficit from strict additivity. Adaptive responsiveness is real (AdaptΔ > 0.79, tutors substantially change their output between turns) but is *not recognition-specific*: tutor development slopes are identical across conditions (d = -0.00), and development trajectories are model-dependent rather than prompt-dependent. Recognition raises the *level* at which adaptation occurs, not the *rate*.

Second, **systematic superego critique taxonomy coding** (200+ exchanges) will provide the within-case evidence needed for Mechanism 2 (error correction). The pilot's qualitative assessment identified compliance versus strategic revision patterns, but a formal taxonomy with frequency distributions by condition is needed to establish the causal chain from superego critique category to ego revision type to output quality.

### The broader implication

Recognition theory, operationalized as a design heuristic rather than an ontological claim, provides a framework for building AI systems that are genuinely shaped by user input rather than merely responsive to it. The mechanisms we trace---calibration, error correction, adaptive responsiveness---describe how intersubjective orientation alters system behavior at concrete architectural levels. Whether these mechanisms generalize beyond tutoring to other AI applications (therapy, creative collaboration, customer service) remains to be seen. But the methodological contribution---process tracing adapted for agent architectures, provable discourse for machine-verifiable research claims---is transferable regardless of domain.

---


