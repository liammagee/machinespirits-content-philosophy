# Machine Spirits — Social Communications

*Operational playbook for the social channels. Started 2026-05-12.*

> The **channel mix and the rationale** are in `STRATEGY.md` §4 (content engine), §6 (distribution), §7 (engagement tactics). The **handles, bios, and voice rules** are in `IDENTITY.md` (handle reservation, voice principles, bio one-liners, "what to refuse"). This document is the **how**: per-platform mechanics, reusable post templates, the 30-day social launch sequence, what to measure, and the risks specific to operating in feeds.
>
> One substantive change this document proposes to the inherited strategy: it promotes **X / Twitter** from STRATEGY.md §6's "(residual) — cross-post only" to a *disciplined native presence* (see §0). That is the one thing here that should be ratified or rejected before it's folded back into STRATEGY.md at the next quarterly revision; everything else operationalizes positions STRATEGY.md already holds.

---

## 0. The shape of it — and the X question

**Inherited position.** STRATEGY.md puts the daily weight on **Bluesky and Mastodon** (where the academic / ML / philosophy migration of 2024–2026 landed), **LinkedIn** weekly for educators, **Substack** as the newsletter home, **YouTube** as the demo shelf, **LessWrong / Alignment Forum** for alignment-adjacent probes — and treats **X** as residual: cross-post only, "do not invest" (IDENTITY.md handle table, P2).

**The X question.** You named X first. Worth saying plainly where it sits in 2026:

- *For us, X's one real asset* is that the largest single concentration of working ML and alignment researchers still posts there. Bluesky has the academic exodus; X still has the lab accounts, the paper-announcement culture, the people whose threads STRATEGY.md §7's "one-way reply guy" is meant to show up under.
- *Against it*: aggressive downranking of posts with off-platform links (the newsletter and the site are off-platform links), a reply environment hostile to careful argument, and ownership volatility that makes association a small but real reputational variable.

**Recommendation — one rung up, not to the top.** Promote X from "residual mirror" to **tier-2: native posting, low cadence, maximum discipline.** Concretely: re-thread probe and essay announcements *natively* on X (a pasted Bluesky link dies; a native thread doesn't), put the link in a reply rather than the lead post, pin the Founding Sketch, and hold the line — every X post carries an anchor citation, nothing is a hot take, the "no daily-news commentary" rule from STRATEGY.md §7 is *strictest* here. X never sets the cadence, never gets the daily ration, and the position degrades gracefully back to mirror-only if the platform gets worse. So: a bar the researchers drink at that we visit on purpose — not a place we live.

**Everything else stands.** Bluesky + Mastodon remain the home. The newsletter list remains the only audience asset the platform actually owns; every social surface funnels to it.

---

## 1. Channel roster

Tiers by owner-effort, not by importance — Tier 3 channels carry the most weight, they just don't take daily *posting*.

| Tier | Platform | Role | Native here | Cross-posted here | Cadence | Weekly effort |
|---|---|---|---|---|---|---|
| 1 | **Bluesky** `@machinespirits.org` | Home base; primary-audience feed | Probe threads, footnote-of-the-day, essay teasers, replies under researchers' threads | YouTube clips (native video) | 3–5 substantive posts/wk (1/day during launch) | ~2 h |
| 1 | **Mastodon** `@machinespirits@hci.social` | The scholarly room (philosophy / STS / HCI) | Same as Bluesky, slightly lower volume | YouTube clips | 3–4/wk | ~1 h |
| 2 | **X / Twitter** `@machinespirits` | The ML/alignment researchers' bar — visit, don't live | Re-threaded probe & essay announcements; the occasional anchored footnote | (rarely — re-author, don't paste) | 2–4 anchored posts/wk; *zero* if nothing is anchored that week | ~30 min |
| 2 | **LinkedIn** — company page + Liam personal | The educators' channel | Course-notes (exercise as document carousel), pedagogy notes, the video, practitioner notes ("how I used the tutor in 590 this week") | Essay links when classroom-relevant | Weekly, Tue–Thu AM US | ~45 min |
| 3 | **Substack** `machinespirits.substack.com` | Newsletter home — a destination, not a feed | The biweekly essay; light Notes (footnotes, teasers) | — | Biweekly issue + ~2 Notes/wk | (counted under the newsletter, not "social") |
| 3 | **YouTube** `@machinespirits` | Demo / lecture / reading-room shelf | The "What AI Forgets" reading, tutor-demo Shorts, monthly reading-room recordings, talk recordings | — | Biweekly Short + monthly long | (counted under "video") |
| 3 | **LessWrong / Alignment Forum** | The alignment-conversation surface | Full probe write-ups (as posts, not link-posts) when they genuinely touch alignment; comments engaged | — | 1–2/month, only when earned | as it arises |
| 4 | **Threads** `@machinespirits` | Staked; bridge-from-Bluesky if a clean one exists, else dormant | — | (auto, if bridged) | none | 0 |
| 4 | **BookWyrm** `@machinespirits` | Staked; activates only when the reading-room ships publicly, then becomes the reading-log | (reading-room dispatches, later) | — | none yet | 0 |

Total recurring social budget at steady state: **~4–5 h/week**, inside the ~8 h/week the rest of STRATEGY.md assumes — and most of that is Bluesky. If a week is tight, Bluesky + Mastodon are the two that run; the others wait.

---

## 2. The cross-post graph

STRATEGY.md §2's production unit is "one idea → four surfaces" (probe / course-note / essay / video), load-bearing on the probe and the course-note. Each surface has a fixed social fan-out — *originated* on the owned property (site or content repo or Substack or YouTube), then announced outward. Never the reverse: social is the announcement layer, not where the work first appears.

| Artifact (origin) | → Bluesky | → Mastodon | → X | → LinkedIn | → LW/AF | → Substack Notes |
|---|---|---|---|---|---|---|
| **Probe** (site `/lab/probes`) | thread (figure as lead image, alt-text) | thread | re-threaded natively | only if educator-relevant | post (full), if alignment-adjacent | a Note linking it |
| **Course-note** (content repo) | light post | light post | — | **carousel** (the exercise as a document) + post | — | — |
| **Essay** (Substack + site) | teaser thread → link in reply | teaser thread | re-threaded teaser → link in reply | if classroom-relevant | only if it's the alignment-positioned one | the essay *is* the Note context |
| **Video** (YouTube) | **native video** upload + caption | **native video** | **native video** | native video | — | — |
| **Footnote of the day** (no origin — born social) | yes | yes | yes (anchored) | — | — | yes |
| **Reading-room dispatch** (site) | thread | thread | (optional) | — | — | a Note | also → BookWyrm later |

Two rules the table encodes: (1) **native video beats a YouTube link** on every feed platform — upload the file, don't post the URL; (2) **the link goes in a reply, not the lead post** on X (and it doesn't hurt on the others) — feeds downrank outbound links, replies are exempt.

---

## 3. Per-platform playbooks

### Bluesky — the home base

- **Handle / bio.** `@machinespirits.org` via the domain handle (set the DNS `_atproto` TXT record — it doubles as proof of ownership). Bio: the IDENTITY.md "Bluesky (≤256 chars)" line — *Rethinking AI through recognition, the unconscious, and time. Essays, probes, a working AI tutor. machinespirits.org*. Banner: a crop of the fauna overlay (IDENTITY.md visual identity — no robots, brains, or glowing networks). Pinned: the Founding Sketch (per STRATEGY.md §3).
- **What gets posted.** Probe announcement threads (template in §4); footnote-of-the-day; essay teasers; the "one-way reply guy" replies under researchers' and educators' threads — *generative citations and rephrasings only* (STRATEGY.md §7), never an argument, never a drive-by link.
- **Mechanics.** Alt-text on **every** image — non-negotiable, and consistent with "cite generously" (an image is a citation too). Compose threads as threads (don't reply-chain a single post). Link cards render fine here; still, in long threads put the canonical link near the top *and* in the last post.
- **Reach levers.** Get listed on the relevant **starter packs** (AI ethics, philosophy of technology, machine learning, ed-tech) — DM the curators with the manifesto. Consider a custom **feed** ("Machine Spirits reading list" — posts tagged from the readings library) once there's a back-catalogue. Follow ~50 seed accounts across the four audiences in week 0.
- **Don't.** Subtweet; quote-dunk; post a vibes-only take with no anchor; argue with strangers; engagement-bait ("a thread 🧵👇" with nothing under it).

### Mastodon — the scholarly room

- **Which instance.** Recommend **hci.social** (HCI / STS / AI-and-society overlap is closest to the secondary audience and a chunk of the primary) over scholar.social (broader, slower, more humanities). Pick one as home; you can boost from a second account but don't split effort. Handle: `@machinespirits@hci.social`. Bio: the IDENTITY.md long-ish bio (Mastodon allows ~500 chars + profile metadata fields — use one field for `machinespirits.org`, one for "Founder: Liam Magee, UIUC").
- **Culture discipline.** **Content warnings**: use them where the instance expects them (some topics) and *not* on ordinary posts — over-CWing reads as not knowing the room; under-CWing reads as careless. When unsure, lurk first or ask a mod. **Alt-text** is even more strongly expected here than on Bluesky — it's a community norm, not just good practice.
- **Engagement shape.** Historically no quote-posts (changing slowly) — so reach is boosts + replies, which means **the substance has to be in the post itself**, not in a quoted thing. Treat Mastodon as quality-over-reach: smaller federation, but the right people, and a culture that rewards careful posts.
- **Cadence.** Mirror Bluesky at slightly lower volume; the audiences overlap but Mastodon skews philosophy / STS / accessibility.

### X / Twitter — the researchers' bar

- **Handle / bio.** `@machinespirits`. Bio: a ≤160-char cut of the IDENTITY.md short bio — *Philosophy for machines that learn. Critique & construction, in public. machinespirits.org*. Pinned: the Founding Sketch.
- **What to do.** Re-thread the probe and essay announcements **natively** (re-author for X — pasting a Bluesky link gets buried). Link in a **reply**, not the lead post. The occasional anchored footnote. That's it.
- **What not to do.** No engagement-farming, no quote-dunking, no thread-bait, no arguing with anonymous accounts, no news-of-the-day commentary (the STRATEGY.md §7 rule, strictest here). If a week has nothing anchored, the correct number of X posts is **zero**.
- **The escape valve.** If X degrades further — heavier link-downranking, policy or ownership changes that raise the reputational cost — the position drops back to pure mirror (or dark) **without anything breaking**, because Bluesky and Mastodon are already the home and the newsletter list is already the owned asset. This is deliberately a low-commitment beachhead.

### LinkedIn — the educators' channel

- **Setup.** A company page **"Machine Spirits"**; Liam posts from his personal profile, the page reshares. (Personal-profile reach > company-page reach on LinkedIn; the page is for legitimacy and the "About.")
- **What gets posted.** Course-notes — the **exercise as a document carousel** (LinkedIn's document-post format is the single highest-reach format there and it's *exactly* right for a classroom handout); pedagogy essays; the video (native); practitioner notes ("here's how the Ego/Superego tutor handled X in 590 this week"). Lead with the **Monday-usable** thing — this audience wants "what do I do in class," not the allusive opener that works on Bluesky.
- **Mechanics / reach.** Tag co-authors and institutions. Post Tue–Thu mornings US. Share course-notes into instructional-design / AI-in-education / SoTL groups — *sparingly*, not as a broadcast. CC-license the handouts and say so in the post ("reuse it").
- **Don't.** The "broetry" style (one-line paragraphs, "Agree? 👇"); engagement pods; humble-brag founder posts (IDENTITY.md "no founder-personality theatre").

### Substack — the newsletter home

- **Setup.** `machinespirits.substack.com` to start (Substack's recommendation network and discovery are worth the lock-in early); self-host at `machinespirits.org/newsletter` later if/when it's worth owning the pipe (STRATEGY.md notes both options). About page = the manifesto + the IDENTITY.md long bio. Issue #01 = the Founding Sketch (STRATEGY.md §3).
- **Substack Notes.** A low-effort feed-like surface that drives subscriptions — treat it as a quieter Bluesky: footnotes, essay teasers, the occasional probe link. Don't duplicate everything; pick the items worth the Substack audience's attention.
- **Recommendation network.** Get cross-recommended by adjacent newsletters (philosophy of technology, AI-and-society, ed-tech, critical AI). This is the highest-leverage Substack growth lever and it's relationship work, not posting work.
- **CTA discipline.** Every issue ends with the open question (STRATEGY.md §8); every social teaser links the **Substack issue**, not the site homepage — give people the one obvious next action (subscribe).

### YouTube — the demo / lecture shelf

- **Setup.** `@machinespirits`. Channel art: the logo + fauna-overlay banner. Sections: "Tutor demos," "Reading-room sessions," "Talks," "Shorts."
- **Content.** The 2-min "What AI Forgets" reading over a slow pan across the fauna backdrop (STRATEGY.md §3); short tutor-demo clips showing the Ego/Superego split-pane; monthly reading-room session recordings; conference-talk recordings. The 90–180-second "video" surface from the production unit ships as a **Short** *and* as a native-video cross-post to Bluesky / Mastodon / X / LinkedIn (don't just link YouTube there).
- **Framing.** The channel is a **shelf, not a discovery engine** — people arrive from the newsletter and the site, not from YouTube search. Title for "what is this and why would I watch it," not for SEO games. No clickbait thumbnails, no "you won't believe."
- **Cadence.** Biweekly Short + monthly long (STRATEGY.md §6).

### LessWrong / Alignment Forum — the alignment surface

- **Role.** Not a "social" channel — it's where a probe that *genuinely* speaks to an alignment question gets cross-posted as a **full post** (not a link-post), discussion left open. The "Recognition, Not Just Alignment" essay (newsletter #06) is the archetype: deliberately positioned inside the alignment conversation.
- **Voice.** This audience engages substantively and will push back — be ready to **defend the argument in the comments**. This is the *one* place where arguing-in-comments is on-mission (everywhere else, STRATEGY.md §7's "do not argue with strangers" holds).
- **Discipline.** Cadence 1–2/month, only when earned. Post the full write-up, not a teaser. Don't treat it as a megaphone — cross-posting things that don't earn it burns the standing fast.

### Threads / BookWyrm — staked, dormant

- **Threads** `@machinespirits`: stake it, set the bio, pin the Founding Sketch, and either bridge it from Bluesky (the AT-proto ↔ Threads bridges are maturing) or leave it dark. **Zero native effort** until there's a reason.
- **BookWyrm** `@machinespirits`: stake it. Activates only when the reading-room ships publicly (STRATEGY.md §5) — then it becomes the reading-log / "reading X with a chatbot" surface, federated into the Fediverse. Until then: staked and empty, which is fine.

---

## 4. Post templates

Reusable shapes. Each obeys IDENTITY.md voice: dated, anchored, show-before-thesis, machines quoted like sources, no hype/doom, no founder-theatre. The `[…]` slots get filled per artifact.

**Probe announcement** (Bluesky / X / Mastodon thread):
```
1/ [The finding, concrete, in one line.] We ran [probe NN]: [what it measures].
   [The result in plain words.] 🧵

2/ Why it matters: [the philosophical hook — one sentence, name the figure
   (recognition / temporality / the nonconscious / charismatic authority)].

3/ Method, briefly: [what the tutor or eval actually did].

4/ [The figure — as an image, with full alt-text.]

5/ Full write-up + data → machinespirits.org/lab/probes/probe-NN-slug · [date]
   (link also in the reply ↓)
```

**Footnote of the day** (Bluesky / Mastodon / X):
```
Footnote — [date]
"[≤15-word quote]" — [Author], [Work] ([year])
[Two lines: what the passage is doing; why it's on our mind today.] [one anchor]
```

**Essay teaser** (Bluesky / X / Mastodon, → link in reply):
```
New essay — "[Two-author title, per IDENTITY.md voice rule 2]" — [date]
[The argument in one sentence.]
Anchored to: [the probe / transcript it stands on, named].
🧵 the spine ↓   ·   read it: [Substack link, in the reply]

  2/ [first move of the argument]
  3/ [second move]
  4/ [the open question it ends on]
```

**Course-note** (LinkedIn, with a document carousel):
```
[The classroom problem, one line — the thing this fixes.]
Here's a ~20-minute exercise I use in [course]: [one-line description].
[3–4 lines: how it runs · what students do · what it surfaces.]
Full note + the handout (CC-licensed, reuse it): [link]
[carousel: the exercise steps as a document, one step per slide]
```

**"Reading [X] with a chatbot" dispatch** (Bluesky / Mastodon / site):
```
Reading [Author]'s [Work] with the tutor — [date]
[One passage. One thing the machine saw — or missed.]
"[≤15-word quote from the transcript]" — [model], [date]
Dispatch + full transcript → [link]
```

**The reply** (the "one-way reply guy," under a researcher's or educator's thread):
```
[A generative citation or rephrasing — "this rhymes with [X]'s argument
that …" / "there's a Hegelian version of this: …" / "cf. [paper]"].
[Link to a relevant probe/essay ONLY if it genuinely adds — never a drive-by.]
```
*Rule:* a reply adds a citation or a reframe. It never argues, never corrects-as-dunk, never "well, actually." Nothing generative to add → don't reply. (The LW/AF exception in §3 stands.)

---

## 5. The 30-day social launch sequence

This is the **social slice** of STRATEGY.md §9's first-30-day punch list, expanded into per-platform actions. Assumes ~8 h/week total; the social part is ~4–5 h/week of it.

**Week 0 — setup**
- [ ] Confirm/claim every handle in the IDENTITY.md table. **Decide the Mastodon instance** (recommended: hci.social) and the Substack-vs-self-host start (recommended: Substack first).
- [ ] Set bios everywhere from IDENTITY.md "Bio one-liners": Bluesky (≤256), X (≤160 cut), Mastodon (long + metadata fields), LinkedIn (long), Substack about (manifesto link). Date nothing in a bio; date everything in posts.
- [ ] Profile image = the logo; banner = a fauna-overlay crop (IDENTITY.md visual policy — no robots/brains/networks/"futuristic").
- [ ] Pin the Founding Sketch wherever pinnable (Bluesky, X, Mastodon, Substack about).
- [ ] Bluesky: get on 3–5 starter packs; follow ~50 seed accounts across the four audiences.
- [ ] LinkedIn: create the company page; connect it to Liam's profile.

**Weeks 1–2 — presence**
- [ ] Bluesky + Mastodon: **one substantive thread per day for 14 days** (STRATEGY.md §9), each one a footnote-of-the-day or a mini-probe seeded from existing drafts in `machinespirits-content-philosophy/articles/`, each carrying one anchor, each dated.
- [ ] X: **2 anchored posts/week** — a footnote and a manifesto teaser. No more. Re-author for X; don't paste.
- [ ] LinkedIn: 1 post — the manifesto, framed for educators ("a philosopher built an LMS — here's why").
- [ ] When the **first probe** ships (STRATEGY.md §9, week 2): run the probe-announcement template across Bluesky / X / Mastodon; cross-post to LW/AF *only* if it touches alignment.

**Weeks 3–4 — cadence**
- [ ] When the **first course-note** ships (STRATEGY.md §9, week 3): LinkedIn carousel + lighter Bluesky/Mastodon posts.
- [ ] Issue **#02** (the recursion essay): essay-teaser template across the feeds; the teaser links the Substack issue, link in the reply.
- [ ] The **2-min "What AI Forgets" video**: YouTube Short + native-video cross-post to Bluesky / Mastodon / X / LinkedIn.
- [ ] Settle into steady state: Bluesky/Mastodon 3–5/wk · X 2–4/wk (anchored only) · LinkedIn weekly · Substack biweekly · YouTube biweekly Short. Threads/BookWyrm: dormant.

---

## 6. What to measure — and what to ignore

The numbers that count, one each, reviewed monthly:

- **Newsletter subscribers.** The only audience number STRATEGY.md's quarterly checkpoints commit to (1k by Q2 · 2.5k Q3 · 5k Q4). Everything social is upstream of this; if subs aren't moving, the social layer isn't doing its job *or* the artifacts aren't.
- **Spine metrics** (STRATEGY.md §1): probe citations by ML researchers; documented external classroom adoptions of a course-note. Social is two steps upstream of these — but they're the real scoreboard.
- **In-audience engagement, qualitative**: replies and DMs from *named* people in the four audiences. Are the right people noticing? A spreadsheet of "who engaged with what, this month" beats any dashboard.
- **Per-platform, the one useful number**: "substantive replies from in-audience accounts / month" (Bluesky, X); "course-note saves + shares / month" (LinkedIn). Not followers.

Ignore: follower counts as a *goal*, likes, "impressions," viral-thread chasing, trending-topic participation, streak-keeping for its own sake.

**The monthly honest test:** *did at least one artifact reach a named ML researcher or a named educator who then engaged with it?* Two months running of "yes" → the social layer works; leave it alone. A run of "no" → the problem is the artifacts (or the targeting), not the posting cadence — fix upstream, don't post more.

---

## 7. Risks specific to operating in feeds

| Risk | Counter |
|---|---|
| **The cadence tail wags the dog** — daily posting becomes the goal; the probes/notes/essays the posts exist to carry slip. | No post without an anchor. Nothing to anchor to today → zero posts today is correct. The artifact pipeline is the constraint, not the feed. |
| **X drift** — engaging there pulls the voice toward dunking; or platform politics make association costly. | X is tier-2, native-but-pure-anchored, by design; degrades gracefully to mirror-only or dark; the home is already elsewhere. |
| **Platform death / capture** — any one platform (X especially; also a Mastodon instance; also Substack) degrades or vanishes. | The newsletter list is the only audience asset the platform owns. Everything funnels there. Never let a platform-native following be *the* thing. |
| **Reply-guy reputation** — showing up under researchers' threads, done wrong, reads as self-promo. | The §4 reply rule: adds a citation or a reframe; never argues; never drive-by links; in doubt, don't reply. |
| **Missing the Mastodon room** — over- or under-using content warnings, wrong register. | Lurk first; mirror the instance's norms; ask a mod when unsure. |
| **Accessibility lapse** — images without alt-text, contradicting the reading-room ethos. | Alt-text on every image, every platform, every time. It's part of "cite generously." |
| **Founder-theatre creep** — the personal account drifts into persona-posting. | IDENTITY.md "what to refuse." The work is the work. The page is for the project; Liam's account amplifies the project, not Liam. |

---

*This document is the operational layer under STRATEGY.md §4/§6/§7 and IDENTITY.md. Revised when a platform's role changes; the §0 X promotion should be ratified into STRATEGY.md §6 at the next quarterly revision. Version history is in git.*
