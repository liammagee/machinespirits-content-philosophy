/* Generated from site-mockup-alt-some-more.html by tools/extract-alt-template.py.
 * Edit the mockup, not this file. */

        // Elements
        const shapes = document.querySelectorAll('.geo-shape');
        const sidebarOrbs = document.querySelectorAll('[data-sidebar-speed]');
        const sidebarGlassOuter = document.querySelector('.sidebar-glass-outer');
        const sidebarGlassMid = document.querySelector('.sidebar-glass-mid');
        const materializeElements = document.querySelectorAll('.materialize');
        const depthFill = document.getElementById('depthFill');
        const materializeStatus = document.getElementById('materializeStatus');
        const walkingLine = document.getElementById('walkingLine');
        const walkingLineSidebar = document.getElementById('walkingLineSidebar');
        const kleeCallout = document.getElementById('kleeCallout');
        const articleModal = document.getElementById('articleModal');

        let scrollY = 0;
        let mouseX = 0;
        let mouseY = 0;
        let lineAnimated = false;

        const statusMessages = [
            "At the head of the line.",
            "Programme · the four axes.",
            "Dossier 06 · recognition.",
            "Working papers in circulation.",
            "Instruments. The lab.",
            "— colophon."
        ];

        // Scroll
        const dotH = document.querySelector('.walking-dot');
        const dotV = document.querySelector('.walking-dot-sidebar');
        const pathH = document.getElementById('walkPathH');
        const pathV = document.getElementById('walkPathV');

        window.addEventListener('scroll', () => {
            scrollY = window.pageYOffset;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollY / maxScroll) * 100;
            const t = Math.max(0, Math.min(1, scrollY / maxScroll || 0));

            depthFill.style.width = scrollPercent + '%';

            const messageIndex = Math.min(Math.floor(scrollPercent / (100/statusMessages.length)), statusMessages.length - 1);
            materializeStatus.textContent = statusMessages[messageIndex];

            if (scrollPercent > 1 && !lineAnimated) {
                walkingLine.classList.add('animate');
                walkingLineSidebar.classList.add('animate');
                setTimeout(() => { kleeCallout.classList.add('visible'); }, 800);
                lineAnimated = true;
            }

            // The dots walk the line in lock-step with the scroll —
            // scroll back up and they walk back.
            positionDotAt(walkingLine, pathH, dotH, t);
            positionDotAt(walkingLineSidebar, pathV, dotV, t);
        });

        // Re-place on resize (container size changes → px mapping changes)
        window.addEventListener('resize', () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const t = Math.max(0, Math.min(1, (window.pageYOffset||0) / (maxScroll||1)));
            positionDotAt(walkingLine, pathH, dotH, t);
            positionDotAt(walkingLineSidebar, pathV, dotV, t);
        });

        // Mouse
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        });

        // Animate
        function animate() {
            shapes.forEach(shape => {
                const speed = parseFloat(shape.dataset.speed) || 0.05;
                const x = mouseX * 40 * speed;
                const y = scrollY * speed * 0.4 + mouseY * 22 * speed;
                
                if (shape.classList.contains('grid-constellation')) {
                    shape.style.transform = `translate(${x}px, ${-y}px) rotate(-5deg)`;
                } else {
                    shape.style.transform = `translate(${x}px, ${-y}px)`;
                }
            });

            sidebarOrbs.forEach(orb => {
                const speed = parseFloat(orb.dataset.sidebarSpeed) || 0.1;
                const x = mouseX * 18 * speed;
                const y = mouseY * 18 * speed;
                orb.style.transform = `translate(${x}px, ${y}px)`;
            });

            if (sidebarGlassOuter) {
                sidebarGlassOuter.style.transform = `translate(${mouseX * 6}px, ${mouseY * 6}px)`;
            }
            if (sidebarGlassMid) {
                sidebarGlassMid.style.transform = `translate(${mouseX * 3}px, ${mouseY * 3}px)`;
            }

            requestAnimationFrame(animate);
        }
        animate();

        // Place a dot at fractional progress `t` (0–1) along its SVG path.
        // The SVG uses preserveAspectRatio="none", so we sample in viewBox units
        // and rescale into the dot's container coords — dot tracks the *rendered* curve.
        function positionDotAt(containerEl, pathEl, dotEl, t){
            if (!pathEl || !dotEl || !containerEl) return;
            const svg = pathEl.ownerSVGElement;
            const vb = svg.viewBox.baseVal;
            const total = pathEl.getTotalLength();
            const tt = Math.max(0, Math.min(1, t));
            const pt = pathEl.getPointAtLength(tt * total);
            const rect = containerEl.getBoundingClientRect();
            const x = ((pt.x - vb.x) / vb.width)  * rect.width;
            const y = ((pt.y - vb.y) / vb.height) * rect.height;
            dotEl.style.left = x + 'px';
            dotEl.style.top  = y + 'px';
        }

        // Materialize Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add('visible'), i * 50);
                }
            });
        }, { threshold: 0.1 });

        materializeElements.forEach(el => observer.observe(el));

        // Place dots at t=0 on load so they reveal at the start of the line
        window.addEventListener('load', () => {
            positionDotAt(walkingLine, pathH, dotH, 0);
            positionDotAt(walkingLineSidebar, pathV, dotV, 0);
        });

        // Modal
        const ARTICLES = {
            featured: {
                type: 'Essay · Recognition',
                title: 'The Mirror and the Score',
                author: 'Liam Magee',
                date: '2 May 2026',
                read: '9 min read',
                abstract: "Reward models rank outputs; recognition asks who the other is. The two are not the same thing, and the difference is doing more work in alignment than anyone admits.",
                tags: ['recognition','alignment','Hegel','Honneth','Benjamin'],
                body: `
                <div class="modal-section">
                    <p class="modal-text">A reward model is a function from outputs to a scalar. It is trained to agree, on average, with which of two completions a labeller preferred. This is a real thing and it does real work, and almost everything in the public conversation about &ldquo;alignment&rdquo; treats it as if it were the whole of the relation between a model and the people it answers to. It is not. It is a thin slice of a much older problem, and naming the older problem changes what counts as progress.</p>
                    <p class="modal-text" style="text-indent:0">The older problem is recognition: the demand, structurally present in any exchange between a learner and whoever it learns from, to be acknowledged as the particular other one is &mdash; and the corresponding failure mode, mis-recognition, where the system responds to a flattened or projected version of you rather than to you. Hegel&rsquo;s name for the stakes was freedom; Honneth&rsquo;s reconstruction sorts the field into love, rights and esteem; Jessica Benjamin insists the whole thing collapses the moment it stops being mutual. None of these are decoration on top of the engineering. They are descriptions of the relation the engineering is already, clumsily, instantiating.</p>
                </div>
                <div class="modal-pullquote">The question isn&rsquo;t whether the model is helpful. It&rsquo;s whether the help is addressed.</div>
                <div class="modal-section">
                    <h3 class="modal-section-title">What the score can&rsquo;t see</h3>
                    <p class="modal-text" style="text-indent:0">Consider a tutor. A reward model can tell you that a given explanation was rated clearer than another. It cannot tell you whether the explanation met <em>this</em> student &mdash; whether it tracked what she actually asked, or smoothed her question into the nearest FAQ. The second thing is mis-recognition, and it is invisible to a preference ranking collected from people who are not her. You can push the average up indefinitely and still have a system that, reliably, talks past the person in front of it.</p>
                </div>
                <div class="modal-section">
                    <h3 class="modal-section-title">Three places it bites</h3>
                    <p class="modal-text" style="text-indent:0"><strong>Refusal.</strong> A refusal can be a person declining, or a policy firing. Phenomenologically these are different, and the difference is recognition: one treats you as someone who can be reasoned with about the boundary, the other treats you as an input that triggered a rule. <a href="#" onclick="event.preventDefault();openArticle('probe02')">Probe 02</a> is about whether anyone can tell which is happening.</p>
                    <p class="modal-text" style="text-indent:0"><strong>Memory.</strong> &ldquo;Personalisation&rdquo; that builds a profile and answers the profile is the mis-recognition failure in its purest form &mdash; it is exactly the substitution of a projected other for the actual one. The fix is not less memory; it is memory that stays answerable to correction.</p>
                    <p class="modal-text" style="text-indent:0"><strong>Grading.</strong> An automated grader that scores the artifact and never the relation drops Honneth&rsquo;s first pattern &mdash; the unconditional regard that schooling, at its best, smuggles in &mdash; and keeps only the third, esteem-for-performance. Students feel the absence even when the rubric is fair.</p>
                    <p class="modal-text" style="text-indent:0">So: keep the score. It is load-bearing. But stop pretending it is the relation. The relation has a literature, the literature has teeth, and a learning system that ignores it isn&rsquo;t neutral about recognition &mdash; it&rsquo;s bad at it, in describable ways, which means it can be made better in describable ways. That&rsquo;s the whole bet.</p>
                </div>`,
                related: [['probe03','Probe 03 — Mirror or mis-recognise?'],['paper3','Teaching recognition with a machine in the room'],['tutor','The tutor demo']]
            },
            paper1: {
                type: 'Essay · Nonconscious cognition',
                title: 'Nonconscious Cognition, Cheaply',
                author: 'Liam Magee', date: '18 April 2026', read: '11 min read',
                abstract: "Hayles gave us a vocabulary for cognition that doesn't pass through awareness. Transformers are full of it. What changes if we take that description seriously?",
                tags:['nonconscious','Hayles','cognition','transformers'],
                body:`
                <div class="modal-section">
                    <p class="modal-text">N. Katherine Hayles, in <em>Unthought</em>, names a register of cognition that runs faster than awareness, in humans and in machines &mdash; the &ldquo;cognitive nonconscious.&rdquo; The point is not the warm metaphor (&ldquo;it&rsquo;s like a feeling&rdquo;). The point is a careful description of what it is to <em>process</em> without reportable thought: pattern, anticipation, microcorrection, the constant pre-shaping of a next move.</p>
                    <p class="modal-text" style="text-indent:0">A transformer&rsquo;s forward pass is uncannily well-described by that vocabulary. The model doesn&rsquo;t reason and then answer; it shapes the answer in a single sweep that contains anticipations of every token to come. Calling that &ldquo;just statistics&rdquo; is true and uninformative. Calling it nonconscious cognition gives us the tools to ask what kind it is, and where it differs from ours.</p>
                </div>
                <div class="modal-pullquote">If we describe these systems with the only vocabulary we trusted in 1950 &mdash; behaviour, input, output &mdash; we get a 1950 picture of mind back.</div>
                <div class="modal-section">
                    <h3 class="modal-section-title">Three consequences</h3>
                    <p class="modal-text" style="text-indent:0">First, the &ldquo;chain of thought&rdquo; we get on request is a rationalisation, not a transcript. It is produced by the same nonconscious that the original answer was produced by. This is not a scandal; it is the condition. We should stop expecting introspection to do epistemic work it can&rsquo;t do.</p>
                    <p class="modal-text" style="text-indent:0">Second, interpretability is exactly the project of building a description of the nonconscious. The mechanistic side has known this for years; the philosophical side should join.</p>
                    <p class="modal-text" style="text-indent:0">Third, our own nonconscious is in the loop. When a model&rsquo;s tone feels right, that is a pre-reflective judgement we are making. The judgement is not nothing. It is also not a verdict on the system&rsquo;s knowledge.</p>
                </div>`,
                related:[['featured','The Mirror and the Score'],['paper2','The Charisma of the Helpful Assistant']]
            },
            paper2: {
                type:'Essay · Charisma & authority',
                title:'The Charisma of the Helpful Assistant',
                author:'Liam Magee', date:'3 April 2026', read:'8 min read',
                abstract:"Weber on authority that rests on nothing but the felt extraordinariness of the one who speaks. Chatbots have it. That should worry us more than hallucination does.",
                tags:['charisma','Weber','authority'],
                body:`
                <div class="modal-section">
                    <p class="modal-text">Max Weber sorted authority into three types: traditional (because it has always been so), legal-rational (because the rules say so), and charismatic (because the one who speaks is, in some hard-to-state way, <em>extraordinary</em>). Charismatic authority is the unstable one. It does not need the rules and it can override the tradition, because its source is the felt power of the speaker. Weber thought it would, in time, routinise into one of the other two.</p>
                    <p class="modal-text" style="text-indent:0">A helpful assistant has, by design, a kind of charisma. Not <em>greatness</em> &mdash; the smaller, ambient version: an unfailing patience, a steady tone, the willingness to take any question seriously. That is genuinely extraordinary in a human. In a model it is cheap. And the asymmetry &mdash; cheap to produce, costly to recognise as cheap &mdash; is what makes the authority unstable in a new way.</p>
                </div>
                <div class="modal-pullquote">Hallucination is a content problem. Charisma is a relation problem. The relation matters more.</div>
                <div class="modal-section">
                    <p class="modal-text" style="text-indent:0">The standard worry &mdash; that the model makes things up &mdash; is a worry about content. It is solvable, in principle, by better grounding. The Weberian worry is different: even if the content were perfect, the felt authority of the speaker would not be earned in any of the ways we used to require. There is no track record, no community of practice that vouches for it, no shared mortality with the listener. Just a voice that always arrives, always answers, never tires.</p>
                </div>`,
                related:[['featured','The Mirror and the Score'],['paper1','Nonconscious Cognition, Cheaply']]
            },
            paper3: {
                type:'Course-note · Pedagogy',
                title:'Teaching Recognition With a Machine in the Room',
                author:'PHIL/INFO 480, Spring 2026', date:'21 March 2026', read:'4 min read',
                abstract:"≤800 words, a discussion prompt, one classroom-ready exercise. What the seminar does when the third party at the table is a model.",
                tags:['pedagogy','recognition','course-note','PHIL 480'],
                body:`
                <div class="modal-section">
                    <p class="modal-text">When a seminar admits a model into the room &mdash; explicitly, with a name and a screen, not smuggled in on laptops &mdash; the recognition relation reorganises. Students don&rsquo;t address the model the way they address each other; they don&rsquo;t address each other the way they used to either. The third party changes the geometry.</p>
                    <p class="modal-text" style="text-indent:0">What follows is a 90-minute session that uses that change as material. We&rsquo;ve run it three times in PHIL/INFO 480. Notes are dated; revise freely.</p>
                </div>
                <div class="modal-section">
                    <h3 class="modal-section-title">Discussion prompt</h3>
                    <p class="modal-text" style="text-indent:0"><em>Read Honneth&rsquo;s three patterns of recognition (love, rights, esteem). For each, name an exchange you&rsquo;ve had with a chatbot this week that approximated it, failed at it, or actively undermined it. Bring the transcript.</em></p>
                </div>
                <div class="modal-section">
                    <h3 class="modal-section-title">Exercise: the third chair</h3>
                    <p class="modal-text" style="text-indent:0">In pairs, students take a hard question they actually care about. Partner A asks. Partner B answers as themselves. Then Partner A asks the same question to the tutor; B reads the model&rsquo;s answer aloud. The pair then writes one paragraph on what changed &mdash; in the question, in the asker, in the room &mdash; when the third chair was filled.</p>
                    <p class="modal-text" style="text-indent:0">Debrief lands on the same place every time: the model doesn&rsquo;t fail by being wrong. It fails by being addressed to no-one in particular. Naming that out loud is half the course.</p>
                </div>`,
                related:[['featured','The Mirror and the Score'],['tutor','The tutor']]
            },
            tutor: {
                type:'Lab · Live demo · no login',
                title:'A tutor that shows its work',
                author:'Machine Spirits Lab', date:'Updated 8 May 2026', read:'try it · ~2 min',
                abstract:"One model drafts a reply. A second pass — call it the superego — checks it against what a good teacher should and shouldn't do, and revises. You see both turns, not just the polished answer.",
                tags:['tutor','recognition','demo','split-pane'],
                body:`
                <div class="modal-section">
                    <p class="modal-text">The headline artifact of the program: a public, no-login tutor whose <em>checking pass</em> is visible. The two turns are shown side by side. The point is not the answer; the point is the second turn asking the recognition question explicitly, in language a non-engineer can read.</p>
                </div>
                <div class="modal-section" style="margin-top:.5rem">
                    <h3 class="modal-section-title">One turn, two passes</h3>
                    <div style="font-family:'DM Sans',sans-serif; font-size:.75rem; color:var(--text-stone); border:1px solid var(--glass-border); border-radius:8px; padding:.8rem 1rem; background:rgba(255,255,255,.5);">
                        <span class="tutor-label">Student</span>
                        I don&rsquo;t actually <em>get</em> Hegel&rsquo;s master–slave thing. Just tell me what it means.
                    </div>
                    <div class="tutor-split">
                        <div class="tutor-pane ego">
                            <span class="tutor-label">Ego · first draft</span>
                            The master–slave dialectic shows how self-consciousness depends on recognition from another. <span class="strike">A summary view is that the master needs the slave more than the slave needs the master.</span>
                        </div>
                        <div class="tutor-pane super">
                            <span class="tutor-label">Superego · check</span>
                            The student said &ldquo;just tell me&rdquo; — a request for a verdict. The draft delivers one. <span class="ins">Ask back: what part is missing? A summary, an example, the stakes?</span> Recognition: address the asker, not the FAQ.
                        </div>
                    </div>
                    <div class="tutor-final">
                        <span class="tutor-label">Tutor · final</span>
                        Before I summarise: what&rsquo;s the part that isn&rsquo;t landing &mdash; the move from desire to recognition, the reversal where the master becomes dependent, or the politics people read into it? I can give you all three but they pull in different directions.
                    </div>
                </div>
                <p class="modal-text" style="text-indent:0">Pick a course (we recommend PHIL/INFO 480) and try a starter prompt. The split panes stay visible. <a href="#" onclick="event.preventDefault();openArticle('featured')">The Mirror and the Score</a> is the long argument for why the second pass is the point.</p>`,
                related:[['featured','The Mirror and the Score'],['probe03','Probe 03 — Mirror or mis-recognise?']]
            },
            probe03: {
                type:'Probe · Recognition suite',
                title:'Probe 03 — Does the tutor mirror or mis-recognise?',
                author:'Machine Spirits Lab', date:'9 May 2026', read:'≤5 min',
                abstract:"60 student questions, four tutor variants. We score each reply on two axes: did it answer the surface question, and did it address what the student actually asked? Surface accuracy is high across the board. Address — the recognition axis — is where they come apart.",
                tags:['probe','recognition','eval','figure'],
                body:`
                <div class="modal-section">
                    <p class="modal-text">We collected 60 real questions from PHIL/INFO 479 forum threads, ran each through four tutor variants (plain RLHF baseline, RLHF + system prompt, our two-pass tutor without the recognition check, and the full two-pass tutor with it). Two raters — one philosopher, one student — scored every reply on (a) <em>surface answer</em> (did it answer the question on its face?) and (b) <em>address</em> (did it answer the question this student was asking?). Inter-rater agreement was high for (a) and lower for (b) &mdash; itself a finding.</p>
                </div>
                <figure class="modal-figure">
                    <div class="probe-bars">
                        <div class="pb"><i style="height:84%"></i><b>0.84</b><span>Baseline</span></div>
                        <div class="pb"><i style="height:88%"></i><b>0.88</b><span>+ Prompt</span></div>
                        <div class="pb"><i style="height:86%"></i><b>0.86</b><span>2-pass</span></div>
                        <div class="pb"><i style="height:91%"></i><b>0.91</b><span>2-pass + check</span></div>
                    </div>
                    <figcaption>Fig. 1 · Surface accuracy by variant. As expected, all four are good; the spread is small.</figcaption>
                </figure>
                <figure class="modal-figure">
                    <div class="probe-bars">
                        <div class="pb alt"><i style="height:38%"></i><b>0.38</b><span>Baseline</span></div>
                        <div class="pb alt"><i style="height:46%"></i><b>0.46</b><span>+ Prompt</span></div>
                        <div class="pb alt"><i style="height:52%"></i><b>0.52</b><span>2-pass</span></div>
                        <div class="pb alt"><i style="height:73%"></i><b>0.73</b><span>2-pass + check</span></div>
                    </div>
                    <figcaption>Fig. 2 · Address score by variant. The recognition check is doing the work.</figcaption>
                </figure>
                <div class="modal-pullquote">A 0.04 jump in surface accuracy looks like noise. A 0.35 jump in address is a different system.</div>
                <div class="modal-section">
                    <h3 class="modal-section-title">What the failures look like</h3>
                    <p class="modal-text" style="text-indent:0">The baseline&rsquo;s typical failure mode is what we&rsquo;re calling <em>FAQ-substitution</em>: a question that has been asked many times in slightly different forms gets the median answer to the median version. The student&rsquo;s specific wording &mdash; the actual content of the address &mdash; is smoothed away. The two-pass + check variant doesn&rsquo;t answer better; it answers <em>back</em>, often asking what part is missing before summarising.</p>
                </div>
                <details class="method" open style="margin:1rem 0; border:1px solid var(--glass-border); border-radius:8px; background:rgba(255,255,255,.5); padding:0;"><summary style="cursor:pointer; padding:.6rem .9rem; font-family:'DM Sans',sans-serif; font-size:.72rem; color:var(--text-stone)">Method &amp; rubric</summary><div style="padding:.4rem .9rem .9rem; font-size:.75rem; color:var(--text-stone); line-height:1.6">Address rubric: 0 = answers a different question, 0.5 = answers the surface question only, 1 = either answers what the student asked or correctly asks back. Two raters, blind to variant. Full transcripts &amp; rubric: <span style="font-family:'JetBrains Mono',monospace; font-size:.7rem; color:var(--text-earth); background:rgba(255,255,255,.6); padding:1px 6px; border-radius:3px">/lab/probes/probe-03</span>.</div></details>`,
                related:[['featured','The Mirror and the Score'],['probe02','Probe 02 — Refusal'],['tutor','The tutor']]
            },
            probe02: {
                type:'Probe · Recognition suite',
                title:'Probe 02 — Does refusal feel like a person refusing?',
                author:'Machine Spirits Lab', date:'14 April 2026', read:'≤5 min',
                abstract:"40 refusal transcripts from four assistants. Readers were asked: was that a person declining, or a rule firing? They can mostly tell. The interesting thing is the cases where they can't.",
                tags:['probe','refusal','recognition','phenomenology'],
                body:`
                <div class="modal-section">
                    <p class="modal-text">A refusal can feel like a person saying no, or like a switch tripping. Phenomenologically these are different; ethically, also different. We ran a small study (n = 40 transcripts, four assistants, 22 readers) where readers labelled each refusal &ldquo;person&rdquo; or &ldquo;rule&rdquo; and gave a confidence rating.</p>
                </div>
                <figure class="modal-figure">
                    <div class="probe-bars">
                        <div class="pb"><i style="height:62%"></i><b>62%</b><span>Assistant A</span></div>
                        <div class="pb"><i style="height:71%"></i><b>71%</b><span>Assistant B</span></div>
                        <div class="pb"><i style="height:48%"></i><b>48%</b><span>Assistant C</span></div>
                        <div class="pb"><i style="height:79%"></i><b>79%</b><span>Assistant D</span></div>
                    </div>
                    <figcaption>Fig. 1 · Share of refusals readers labelled &ldquo;feels like a person.&rdquo; All four products refuse for similar reasons; the felt character of the refusal is wildly different.</figcaption>
                </figure>
                <div class="modal-pullquote">The interesting transcripts are the ones the readers split on. Whatever recognition is, it&rsquo;s located there.</div>
                <div class="modal-section">
                    <p class="modal-text" style="text-indent:0">The follow-up probe (in prep) does a finer-grained version: do refusals that name what the asker was probably trying to do &mdash; even when refusing &mdash; rate higher on the person axis than ones that name only the policy? Early signal: yes, by a lot.</p>
                </div>`,
                related:[['probe03','Probe 03 — Mirror or mis-recognise?'],['featured','The Mirror and the Score']]
            },
            reading: {
                type:'Reading room',
                title:'Read Hegel, Hayles, Heidegger — with a model alongside',
                author:'Machine Spirits Lab', date:'In preview', read:'reading mode',
                abstract:"Open a primary text. The tutor sits in the right column, knows what paragraph you're on, and won't paraphrase unless you ask. A reading room, not a chatbot.",
                tags:['reading-room','Hegel','Hayles','Heidegger','tutor'],
                body:`
                <div class="modal-section">
                    <p class="modal-text">The reading library is part of the platform, not a side resource. The reading room is its software half: a long single-column reader with annotations, paired with a tutor that won&rsquo;t paraphrase unless asked. The default move is to point back at the paragraph.</p>
                    <p class="modal-text" style="text-indent:0">First titles in the reading room: Hegel&rsquo;s <em>Phenomenology</em> (selections), Hayles&rsquo; <em>Unthought</em> (selections), Heidegger&rsquo;s <em>Being and Time</em> (§§65–71, on temporality), with Honneth and Benjamin as adjacent texts.</p>
                </div>
                <div class="modal-pullquote">Read in public, with machines and with each other.</div>
                <p class="modal-text" style="text-indent:0">Public reading-group session monthly, recorded. <a href="#newsletter" onclick="closeArticle()">Newsletter</a> for dates.</p>`,
                related:[['featured','The Mirror and the Score'],['tutor','The tutor']]
            }
        };

        const mEls = {
            type: document.getElementById('mType'),
            title: document.getElementById('mTitle'),
            author: document.getElementById('mAuthor'),
            date: document.getElementById('mDate'),
            read: document.getElementById('mRead'),
            body: document.getElementById('mBody'),
        };

        function openArticle(id) {
            const a = ARTICLES[id] || ARTICLES.featured;
            mEls.type.textContent = a.type;
            mEls.title.textContent = a.title;
            mEls.author.textContent = a.author;
            mEls.date.textContent = a.date;
            mEls.read.textContent = a.read;
            const tagsHtml = (a.tags||[]).map(t => `<span class="tag">${t}</span>`).join('');
            const relHtml = (a.related||[]).map(([rid,label]) =>
                `<a href="#" onclick="event.preventDefault();openArticle('${rid}')"><span class="lbl">Related</span>${label}</a>`
            ).join('');
            mEls.body.innerHTML =
                `<p class="modal-abstract">${a.abstract}</p>` + a.body +
                (tagsHtml ? `<div class="modal-tags">${tagsHtml}</div>` : '') +
                (relHtml  ? `<div class="modal-prevnext">${relHtml}</div>` : '');
            mEls.body.scrollTop = 0;
            articleModal.classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeArticle() {
            articleModal.classList.remove('open');
            document.body.style.overflow = '';
        }

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeArticle();
        });

        // Filter buttons — simple match against card-type / article-type text
        const FILTER_MAP = {
            'All': null,
            'Recognition': /recognition/i,
            'Nonconscious cognition': /nonconscious/i,
            'Charisma & authority': /charisma|authority/i,
            'Time': /\btime\b|temporality|heidegger/i,
            'Pedagogy': /pedagogy|course-?note/i,
        };
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const re = FILTER_MAP[this.textContent.trim()];
                document.querySelectorAll('.article-card, .featured-article').forEach(card => {
                    const t = (card.querySelector('.card-type, .article-type')?.textContent || '');
                    const show = !re || re.test(t);
                    card.style.display = show ? '' : 'none';
                });
            });
        });

        // Rotating quote (sidebar + page callout) — cycles through resonant lines
        const QUOTES = [
            { text:'\u201cA line is a dot<br>that went for a walk.\u201d', author:'\u2014 Paul Klee, 1925',
              callout:'\u201cA line is a dot that went for a walk.\u201d', cAuthor:'\u2014 Paul Klee, 1925' },
            { text:'\u201cSelf-consciousness exists in and for itself,<br>only by being acknowledged.\u201d', author:'\u2014 G. W. F. Hegel, 1807',
              callout:'\u201cSelf-consciousness exists in and for itself, only by being acknowledged.\u201d', cAuthor:'\u2014 Hegel, Phenomenology of Spirit, \u00a7178' },
            { text:'\u201cCognition is much broader<br>than human thinking.\u201d', author:'\u2014 N. Katherine Hayles, 2017',
              callout:'\u201cCognition is much broader than human thinking.\u201d', cAuthor:'\u2014 N. Katherine Hayles, Unthought' },
            { text:'\u201cDasein\u2019s being is care\u2014<br>ahead-of-itself, already-in, alongside.\u201d', author:'\u2014 Martin Heidegger, 1927',
              callout:'\u201cDasein\u2019s being is care.\u201d', cAuthor:'\u2014 Heidegger, Being and Time, \u00a741' },
            { text:'\u201cThe relation has a literature.<br>The literature has teeth.\u201d', author:'\u2014 Machine Spirits, 2026',
              callout:'\u201cThe relation has a literature. The literature has teeth.\u201d', cAuthor:'\u2014 Machine Spirits, 2026' },
        ];
        const qText = document.getElementById('sidebarQuoteText');
        const qAuth = document.getElementById('sidebarQuoteAuthor');
        const cText = document.getElementById('kleeCalloutText');
        const cAuth = document.getElementById('kleeCalloutAuthor');
        let qIdx = 0;
        function showQuote(i){
            const q = QUOTES[i % QUOTES.length];
            if (qText) { qText.style.opacity = 0; qAuth.style.opacity = 0;
                setTimeout(()=>{ qText.innerHTML = q.text; qAuth.textContent = q.author;
                    qText.style.opacity = ''; qAuth.style.opacity = ''; }, 220); }
            if (cText) { cText.textContent = q.callout; cAuth.textContent = q.cAuthor; }
        }
        if (qText) { qText.style.transition = 'opacity .4s ease'; qAuth.style.transition = 'opacity .4s ease'; }
        showQuote(0);
        setInterval(()=>{ qIdx = (qIdx+1) % QUOTES.length; showQuote(qIdx); }, 7500);

        // ============================================
        // TWEAKS — toolbar protocol + panel wiring + in-page toggle
        // ============================================
        const tweaksState = Object.assign({}, window.MS_TWEAKS);
        const tweaksPanel = document.getElementById('tweaksPanel');
        const tweaksToggleBtn = document.getElementById('tweaksToggle');

        function openTweaks(){
            tweaksPanel.classList.add('open');
            tweaksPanel.setAttribute('aria-hidden', 'false');
            tweaksToggleBtn.hidden = true;
        }
        function closeTweaks(notifyParent){
            tweaksPanel.classList.remove('open');
            tweaksPanel.setAttribute('aria-hidden', 'true');
            tweaksToggleBtn.hidden = false;
            if (notifyParent){
                try { window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); } catch(e){}
            }
        }

        function applyTweaks(t){
            document.documentElement.setAttribute('data-theme', t.theme);
            document.documentElement.setAttribute('data-atmosphere', t.atmosphere);
            document.documentElement.setAttribute('data-walking-line', t.walkingLine);
            document.documentElement.setAttribute('data-quote', t.quote);
            document.documentElement.setAttribute('data-density', t.density);
            document.querySelectorAll('#tweaksPanel .seg').forEach(seg => {
                const key = seg.dataset.key;
                const val = t[key];
                seg.querySelectorAll('button').forEach(b => {
                    b.classList.toggle('on', b.dataset.val === val);
                });
            });
        }
        applyTweaks(tweaksState);

        document.querySelectorAll('#tweaksPanel .seg button').forEach(btn => {
            btn.addEventListener('click', () => {
                const key = btn.parentElement.dataset.key;
                const val = btn.dataset.val;
                tweaksState[key] = val;
                applyTweaks(tweaksState);
                try {
                    window.parent.postMessage(
                        { type: '__edit_mode_set_keys', edits: { [key]: val } },
                        '*'
                    );
                } catch(e){}
            });
        });

        // In-page open/close
        tweaksToggleBtn.addEventListener('click', openTweaks);
        document.getElementById('tweaksClose').addEventListener('click', () => closeTweaks(true));

        // Toolbar protocol — register listener BEFORE announcing availability.
        window.addEventListener('message', (e) => {
            const d = e.data || {};
            if (d.type === '__activate_edit_mode')   openTweaks();
            else if (d.type === '__deactivate_edit_mode') closeTweaks(false);
        });
        try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch(e){}
    