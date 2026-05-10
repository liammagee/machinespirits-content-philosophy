Publish content edits from `machinespirits-content-philosophy` to machinespirits.org. Lowest-fuss flow: stage, commit, push. The push triggers GitHub Actions → Fly.io deploy. Site live in ~3-5 min.

The user can also run `./publish` directly from the content repo for the same flow without invoking Claude.

## Instructions

Follow these steps in order. Stop and report if any step fails.

### 1. Move to the content repo

`cd ~/Dev/machinespirits/machinespirits-content-philosophy`

All operations happen here — never in the website repo.

### 2. Check what changed

Run `git status --short`. If empty, report "Nothing to publish" and stop.

### 3. Generate a commit message

Look at the staged + unstaged + untracked changes. Build a short message based on what's actually changing:

- For each modified or new `.md` file under `articles/`, read the frontmatter `title:` (or the first `# ` heading). Use those titles in the message.
- For changes to `references/bibliography.bib`, mention "bibliography update".
- For new/modified `.html` files in `artifacts/`, mention "artifact: <name>".
- For course content under `courses/`, mention the course (e.g., "Update course 490").
- For asset/image changes only, mention "assets".

Examples of good messages:
- `Publish: The Discarded Master`
- `Update articles: Era of AI, Stochastic Society`
- `Publish dictatorship essay + bibliography update`
- `Update course 490 (week 1-3)`

Keep it under 72 chars on the first line. If many things changed, use a short summary then a body listing them.

If the user passed an argument when invoking `/publish`, use that as the message verbatim and skip auto-generation.

### 4. Stage, commit, push

- `git add -A` (stage everything in the content repo).
- Confirm something is staged (`git diff --cached --quiet` should return non-zero).
- Commit with the message from step 3. End with: `Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>`. Use a HEREDOC.
- `git push`.

### 5. Report

Output the commit SHA and these links — nothing more:

```
Pushed <sha>. Site rebuild starts now (~3-5 min).
  Live:    https://machinespirits.org
  Actions: https://github.com/liammagee/machinespirits/actions
  Watch:   gh run watch -R liammagee/machinespirits
```

Do not poll the deploy. Do not run `gh run watch`. Do not open a browser. Trust the pipeline — the user can check those links if they want.

## Notes

- The content repo's branch is `master`, not `main`. `git push` with no args pushes to the tracked upstream — that's correct.
- If `git push` is rejected because the remote moved ahead, run `git pull --rebase` and try the push again. Don't force push.
- Do NOT touch the website repo (`machinespirits-website`). It rebuilds automatically when the content repo's GitHub Action dispatches `content-updated`.
- Do NOT run `npm run publish` in the website repo — that regenerates derived artifacts inside the website repo, which is a separate concern from publishing source content.
- Do NOT run `flyctl deploy` directly. The deploy is triggered by GitHub Actions via repository_dispatch.
- Skip files >5MB only if they're clearly not content (e.g., random `.zip` archives). PDFs, images, and `.pptx` slide decks under articles/ or courses/ ARE content — include them.
