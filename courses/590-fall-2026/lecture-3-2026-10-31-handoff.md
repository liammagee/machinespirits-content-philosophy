# EPOL 590 Lecture 3 — Saturday planning handoff

**Prepared:** October 31, 2026. **Seminar:** Monday November 2, 2026, 5:00–7:50 p.m. Central.  
**Purpose:** Preserve decisions and unresolved implementation work for when instructor returns to a computer. This handoff supplements, but does not overwrite, `lecture-3.md` or `lecture-3-workshop.md`.

## Decisions agreed

- Preserve Lecture 3's **reading → literature discovery → conceptual mapping** scaffold; prioritize student activity over exposition (~70/30).
- Use **two seed articles from Lecture 2**, not students' divergent research interests:
  - Keerthiraj & Misra (2025), *Who owns the future? AI, digital sovereignty, and the politics of knowledge*, *AI & Society*: https://link.springer.com/article/10.1007/s00146-025-02641-y
  - Liu et al. (2025), *Adaptive vs. Planned Metacognitive Scaffolding for Computational Thinking*, *Computers & Education*: https://doi.org/10.1016/j.compedu.2025.105473
- Attendance may be well below the 18-person roster. Use **two flexible groups** (one article each), with two-by-two subgroups only if attendance warrants. No six-triad requirement.
- Compare **three ways of reading** within each group: sequential; abstract/introduction/conclusion then selective; investigative entry through methodology, results, theory, or references. Keep shared questions about claim, evidence/warrant, uncertainty, and passage references. Read without AI first, then ask AI to follow the same reading route.
- At the second workshop **swap the articles between groups**. Each group leaves a short handover brief (claim, two questions, promising reference). New readers pursue backward, forward, sideways searching, conventional and AI-assisted; verify sources. **Do not identify gaps in hour 2.**
- Mapping is where **possible gaps** arise, using chronological, conceptual, and relational views, then critique/revision. An absence in a map may be a search/representation artifact, not a real literature gap.
- **No Canvas or additional documentation platform for the workshop.** Use **Google Docs as the authoritative shared record**, including brainstorming, notes, handovers, discoveries, and reflections. Prefer two Docs (one per seed article) with a clear handover section; copy/paste the brief into the other group's document or designated tab/section. The Machine Spirits HTML Workbench is **optional** for PDFs, visualizations, and personal experimentation, not the canonical record. Avoid duplicate data entry. No Google Sheets requirement.
- Each group nominates a recorder; optionally a separate workbench operator. Project shared Docs for the first two workshops, maps in the third.
- Initial AI setup should favor UIUC-supported **NotebookLM/Gemini**, with Illinois Chat/Copilot as alternatives; existing personal ChatGPT/Claude subscriptions are optional for permitted content. Claude Code/Codex optional advanced routes, never required. No paid account, terminal, or unrestricted local-folder access required. Distinguish desktop interface from on-device inference. Respect publisher licensing, privacy, and source verification.

## Agreed timetable (Central)

| Time | Activity |
|---|---|
| 5:00–5:15 | AI research workbench setup and source-grounded smoke test |
| 5:15–5:20 | Two article groups; select/predict reading strategies |
| 5:20–5:33 | Human-first reading; record claim, warrant, uncertainty, path |
| 5:33–5:45 | Compare strategies within article group |
| 5:45–6:00 | AI follows chosen strategy; compare with human interpretation |
| 6:00–6:15 | Cross-article exchange: evidence, argument, disciplinary differences |
| 6:15–6:20 | Synthesis and written handover brief |
| 6:20–6:30 | Break |
| 6:30–6:35 | Swap articles and receive other group's brief |
| 6:35–6:45 | Conventional literature search: backward/forward/sideways |
| 6:45–7:00 | AI-assisted search; verify references; select three useful works |
| 7:00–7:10 | Report findings to original readers; reconsider interpretation |
| 7:10–7:15 | Consolidate verified discoveries; no gap analysis yet |
| 7:15–7:20 | Short chronological/conceptual/relational mapping demonstration |
| 7:20–7:32 | Groups map their original article's emerging field |
| 7:32–7:40 | Exchange/critique maps; question relationships and possible gaps |
| 7:40–7:46 | Revise maps and record why |
| 7:46–7:50 | Final reflection: gaps in field vs gaps in map; vibe scholarship |

**Flexibility:** The first workshop may run over its original hour boundary; protect meaningful student comparisons and the final mapping time. The above is a working schedule, not an inflexible script.

## Google Docs layout to prepare

**Doc A — Digital sovereignty / Keerthiraj & Misra** and **Doc B — Metacognitive scaffolding / Liu et al.** Each should contain:

1. Article link, group roster/recorder, chosen reading strategies.
2. **Hour 1 reading table:** reader/strategy; claim; evidence with passage; uncertainty; AI comparison; what changed.
3. **Handover brief (copy/paste to other Doc):** central claim; two unresolved questions; one promising reference; source passage(s).
4. **Hour 2 discovery log:** publication/DOI; backward, forward, or sideways discovery; conventional vs AI suggestion; verified?; significance to original article. The receiving group adds to the article's document.
5. **Hour 3 mapping:** links to initial and revised maps (or embedded images); map type; labeled relationships; peer critique; possible gaps and how to verify them; revision rationale.
6. Final reflection: Did AI deepen reading and scholarship or just accelerate production?

**Important:** The two actual Docs/templates have **not yet been created**. An existing shared class Doc was used previously: https://docs.google.com/document/d/1JATwv9qBCeN9ld3AEHc5FeZVi6ZamubNqLHzVQjeWGY/edit . Decide whether to use two new Docs or sections/tabs in the existing Doc, while preserving the simple copy/paste handover. No Canvas work requested.

## Machine Spirits Workbench status

- Editable HTML: `courses/590-fall-2026/literature-workbench.html`
- Hosted-content copy: `courses/590-fall-2026/_board/hosted/literature-workbench.html`
- Current features: article interpretation fields, literature discovery log, basic concept network, SVG/Mermaid export, local JSON, multi-PDF selection/text extraction (PDF.js loaded from CDN), and a discovery-method bar chart.
- **Not implemented/verified:** shared live collaboration, AI API integration, chronological/conceptual/relational switchable views, map version history, reliable offline PDF extraction, browser QA, and public deployment. Do not imply the workbench is live.
- Website route proposed in **draft PR #62**: https://github.com/liammagee/machinespirits/pull/62 for intended URL https://machinespirits.org/590-fall-2026/literature-workbench . Needs tests, review, merge, and deployment. Local Devspace workspace opening failed during previous attempt.
- For Monday, **Google Docs is the fallback and authoritative record** even if workbench deployment fails. No need to make live collaboration a Monday prerequisite.

## When back at a computer — priority checklist

1. Create and share two simple Google Docs (or two tabs/sections if that is easier), using the structure above. Verify student edit access, and test copy/paste handover.
2. Verify access to both full articles and permission to upload PDFs to chosen AI tools; prepare permissible excerpts/fallback.
3. Update the lecture workshop guide to include the agreed second and third workshop instructions and timetable (the first workshop was already revised for two groups and reading strategies).
4. Test HTML workbench in desktop and mobile browsers, especially multi-PDF extraction, citations/excerpts, JSON export/import, SVG/Mermaid export, and safety of local storage. Correct defects before student use.
5. Review and test draft website PR #62, confirm content is pinned in deployment, merge only after validation, and verify the live URL. If blocked, use Google Docs without delaying class.
6. Optional later work: prompt-copy buttons, secure AI integration, shared state, three map views, and versioned revisions. Do not add extra interfaces or student account requirements for Monday.
7. Prepare one concise student-facing instructions page with article links, Docs, timings, AI options, and expectations. Keep Canvas out of the workshop.

**Open decisions:** Whether to use two new Docs versus two tabs in existing class Doc; whether the optional workbench is reliable enough to demo Monday. All other core pedagogical decisions above are agreed.
