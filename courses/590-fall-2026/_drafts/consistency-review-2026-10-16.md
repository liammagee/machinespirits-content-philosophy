# EPOL 590 consistency review — PowerPoint, Word syllabus, Canvas

Checked October 16, 2026, ahead of the Monday October 19 launch. Sources:
`590-lecture-1…7.pptx` (this folder), `syllabus/…Fall-2026-Draft.docx`, and the
Canvas course 75598 (read-only, via the Canvas API in the instructor's browser
session). Nothing in Canvas was changed.

## Canvas fixes applied (Oct 16, evening)

These changes were made through the Canvas API. Everything is still unpublished. Pre-edit restore points
in Canvas page history: ai-overview r1, course r1, lecture-1 r3, lecture-2…6 r1, lecture-7 r2.

- New class document: **EPOL 590 Fall 2026**,
  `docs.google.com/document/d/1JATwv9qBCeN9ld3AEHc5FeZVi6ZamubNqLHzVQjeWGY`. It is a copy of the 2025
  "ERAM 590" doc and is private to the instructor; it still needs sharing with the class. All seven
  old-doc links on Lectures 1, 2, 3 and 7 now point to it, with the link text "EPOL 590 Fall 2026
  class document".
- The "ERAM 590 — Course Overview" page is now **EPOL 590 — Course Overview** (slug
  `epol-590-course-overview`; the module item followed). Its body and the Lecture 7 "Dual: – ERAM –"
  line now say EPOL 590.
- Lecture 1–7 pages link `blob/master/courses/590-fall-2026/590-lecture-N.pptx` instead of the 2025
  commit; Lecture 1's link no longer says "(2025)".
- Lecture 1 page: the 2025 weekly plan, assessment list and rubric are replaced by the syllabus schedule
  (with dates and fall break), the Canvas task names and due dates, and the six syllabus criteria. The
  duplicate "Consequences" section is removed and a link to the new class document is added.
- Lecture 4 page: the "Future Weeks" list (which mentioned Week 8) now lists Sessions 5–7 with dates,
  plus the Dec 15 final.
- AI overview page: the "584 Lecture 0" heading is now "AI Overview".
- Not changed: the syllabus page's note that "older teaching materials use ERAM 590" (accurate) and the
  instructor checklist.

Still open after these fixes: the PowerPoint files for lectures 2–7 still contain ERAM, the old doc
link and (Lecture 4) "Week 8". The repo `lecture-N.md` sources still need the same fixes. The 2025 doc
is still "anyone with the link can edit". The AI Studio link in Lecture 5 is unchecked.

## Assessment setup (Oct 16, late)

- **2025 for comparison:** Canvas course 63619 was a shell. It had two undated 10-point placeholder
  assignments, no submissions and no Canvas grades. All work and peer feedback happened in per-student
  tabs of the shared "ERAM 590" Google Doc, which is still set to anyone-with-link can edit.
- **Class doc:** the 2026 class doc copy has had every student tab, the Room tabs, the Week 2 answers
  and the Week 5 app links removed. Its Week 7 prompt still says "6–8 pages".
- **Tasks 1–6:** these now accept a Website URL (Google Doc link) or a file upload.
- **Rubric:** a draft "EPOL 590 common criteria" rubric (Canvas rubric 138066) is attached to Tasks 1–6
  and used for grading. Its six syllabus criteria are weighted 15/15/20/20/15/15 = 100, with five
  levels from Excellent (100%) to Not shown (0%). The weights are a proposal; the syllabus still marks
  the allocation TO CONFIRM.
- **Peer review:** turned on for Tasks 4 and 6, one reviewer each, assigned automatically the morning
  after the deadline (Sat 14 Nov and Sat 5 Dec, 9 AM CT). Note that the syllabus puts the peer
  *workshops* in Sessions 4 and 6, before those deadlines.
- Everything is still unpublished.

## What already agrees

| Item | Word syllabus | Canvas | Lecture 1 deck |
|---|---|---|---|
| Section, CRN, credits, meeting time | EPOL 590 AIL, 73886, 4 cr, Mon 5:00–7:50 PM CT | same | — |
| Seven seminar dates, no Nov 23 | yes | yes (module names) | — |
| Six staged tasks at 10% + final at 40% | yes | groups weighted 60 / 40, 7 × 100 pts, no drop rules | yes |
| Staged due dates (Fri Oct 23 → Fri Dec 4, 11:59 PM CT) | yes | all six match, DST handled correctly | — |
| Final review due Tue Dec 15, 11:59 PM CT | yes | yes | yes (slide 7) |
| Final review length 1,500–2,000 words | yes | assignment 7 and Lecture 7 page | Lecture 7 slide 3 |
| Enrollment | — | 18 students (matches Banner per launch notes) | — |
| Course time zone | America/Chicago | America/Chicago | — |

## Must fix before Monday (students will see these on day one)

1. **Course name is ERAM in Lecture 1.** The deck title slide (slide 1) and slide 14 say
   "ERAM 590"; `lecture-1.md` does too. Canvas Lecture 1 already says EPOL. Canvas's
   "ERAM 590 — Course Overview" page title, and `course.md` ("Welcome to ERAM 590"), also need renaming.
2. **Canvas links the 2025 deck, not the 2026 one.** Canvas Lecture 1–7 pages link
   `courses/590/590-lecture-N.pptx` on GitHub at commit `6fb85c6`. Only Lecture 1 differs between the
   two folders, and the 2025 copy lacks the Dec 15 deadline. Re-point at least Lecture 1 to
   `courses/590-fall-2026/590-lecture-1.pptx`, or to the HTML deck.
3. **The 2025 shared Google Doc is still linked.** It appears in Lecture 1 slide 14, Lectures 2, 3 and 7
   (pptx and `.md`), and Canvas Lecture 2, 3 and 7 pages
   (`docs.google.com/document/d/1wyWkvOj…`). The syllabus says to create a fresh workspace.
4. **The Lecture 1 deck's weekly plan contradicts the syllabus.** Slides 5 and 8 use the 2025 sequence:
   | Wk | Deck (slides 5/8) | Syllabus / Canvas module |
   |---|---|---|
   | 2 | Audiences & persuasion / Mapping a field | Article anatomy, review design, mapping |
   | 3 | Does AI mean artificial knowledge? / Vibe scholarship | AI-assisted close and distant reading |
   | 4 | Scholarly voice; assessment "Scientific Mode" only | Difficult texts and scholarly voice; scientific *and* humanities |
   | 5 | Sociology of knowledge / Designing a review; "Frame up your Literature Review" | Structure and signposting; Structured draft |
   | 6 | Reflexive researcher | Reflexivity, positionality and AI |
   | 7 | Automatic academy | Future of scholarship **and final review workshop** |
   The deck also gives no dates, and fall break isn't mentioned.
5. **Assessment names differ.** Deck slide 7 uses the 2025 titles ("First Draft of Research Topic…",
   "Literature Review: Signposting", "Statement about the use of AI… / Reflection…"). Canvas and the
   syllabus use "1 Research topic and question" … "6 AI-use statement and reflexive commentary".
   Use the Canvas names on the slide so students can match them.
6. **The rubric slide (9) differs from the syllabus criteria.** The deck lists seven 2025 criteria,
   including "novel" questions and citation practice. The syllabus has six common criteria, including
   traceability and responsiveness to feedback. Pick one list.

## Should fix this term (later lectures; not blocking Monday)

- **Lecture 4, slide 23**: "Week 5: Scaffolding / Week 7: Drafting / **Week 8**: Final Literature Review".
  There is no Week 8. Same in `lecture-4.md:255` and the Canvas Lecture 4 page.
- **Lecture 7, slide 26**: says "6–8 pages" and also "1.5–2.0K words". The syllabus says 1,500–2,000 words.
  Drop the page count.
- **Lecture 7, slide 27**: "Dual: – ERAM – …" should be EPOL.
- **Lectures 2–7 carry "Week N" recaps** but no 2026 dates. That's fine, but they'll need the
  Monday dates if you want them to line up with the Canvas module names.
- **Lecture 5 and the Canvas AI overview link a Google AI Studio app** (`ai.studio/apps/drive/1rKen…`).
  Launch notes flagged one unreachable Gemini link; check this one in Student View.
- **`lecture-1.md` lines 243–275**: headings "584 Lecture 2…7" are stray EPOL 584 cross-references.
- **Lecture 1, slide 19 ("Consequences")** repeats slide 17's bullets. It's a copy-paste leftover.
- **The Word syllabus schedule table drops punctuation** in the focus column, e.g. "Article anatomy review
  design and mapping a field" and "Structure signposting and scholarly communities". Commas or "and"
  are missing where the Canvas modules have them. Check `syllabus/build_syllabus.py`.
- **Workload**: the syllabus says "about 20 hours per active week". The deck's "Format" slide only
  describes the 3-hour seminar. Consider one line on the deck.

## Still open (unchanged from the launch notes)

The Zoom link (in neither the syllabus nor Canvas), the Task 1 length and source expectations, the
readings list, recording policy, the AI policy wording, the accessibility statement, and the Start Here
page. Everything in Canvas — the course, modules, pages and assignments — is still **unpublished**.
