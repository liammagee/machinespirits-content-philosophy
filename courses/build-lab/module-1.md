---
title: "Module 1: Version control with git"
week: 1
course: "build-lab"
---

**Time:** about two hours. **You will make:** a git repository on your machine and on GitHub, with a README, an ignore file, a branch you merged, and a history you can read.

## Why start here

Every later module changes files. Some of those changes will be written by an AI assistant at speed, and some of them will be wrong. Version control lets you take one change back without losing the rest. It is also the record of what was tried, when, and why.

Jenny Bryan's case for scientists applies to this lab: version control is not overhead, it is what makes collaboration and reproducibility possible without email attachments called `final_v3_REAL.docx` (Bryan 2018). Karthik Ram made the same case for reproducibility a few years earlier (Ram 2013).

Git gives you three things.

1. **Checkpoints.** A commit is a snapshot you can return to.
2. **Differences.** `git diff` shows exactly what changed between two points.
3. **Branches.** Parallel versions of the project that can be merged.

## The mental model

Git stores snapshots, not edits. A **commit** is a snapshot of every tracked file, plus a message, an author, a time, and a pointer to the previous commit. The chain of commits is the **history**.

A change passes through three places on its way into history.

| Place | What it holds | How a change gets there |
|---|---|---|
| Working directory | The files on disk that you edit | Any editor |
| Staging area | The set of changes you intend to commit next | `git add` |
| Repository | Committed history | `git commit` |

A **branch** is a movable name that points at a commit. `main` is only the default name. A **remote** is another copy of the repository, usually on GitHub.

## Setup

Install git. On macOS run `xcode-select --install` or use Homebrew. On Windows install Git for Windows. On Linux use your package manager. Then tell git who you are:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.edu"
git config --global init.defaultBranch main
```

Create a GitHub account if you do not have one. The easiest way to authenticate from the terminal is the GitHub CLI: install `gh`, then run `gh auth login` and follow the prompts.

## Hands-on: the lab repository

**1. Create the repository.**

```bash
mkdir build-lab
cd build-lab
git init
```

**2. Add a README and make the first commit.**

```bash
cat > README.md <<'TEXT'
# Build Lab

An interactive Schelling segregation model, with tests and a tutor.
TEXT
git add README.md
git commit -m "Add README"
```

**3. Add an ignore file.** Some files should never enter history: dependencies, secrets, editor droppings.

```bash
cat > .gitignore <<'TEXT'
node_modules/
.env
.DS_Store
*.log
TEXT
git add .gitignore
git commit -m "Ignore dependencies, secrets and editor files"
```

**4. Look at what you have.**

```bash
git status
git log --oneline
```

`git status` tells you what is modified, staged, or untracked. It is the command you will run most. `git log --oneline` shows the history, one commit per line.

**5. Make a change and read it before committing.** Edit the README, add a line, then:

```bash
git diff
```

This shows unstaged changes. After `git add`, use `git diff --staged` to see what is about to be committed. Reading the diff before every commit is the single habit that matters most in this lab.

## Branches and merges

A branch lets you try something without disturbing `main`.

```bash
git switch -c page
echo "<!doctype html><title>Build Lab</title>" > index.html
git add index.html
git commit -m "Add an empty page"
git switch main
git merge page
```

Module 2 will replace that page. For now the point is the shape: branch, commit, switch back, merge.

When two branches change the same lines, the merge stops and marks the conflict in the file:

```text
<<<<<<< HEAD
the version on main
=======
the version on your branch
>>>>>>> page
```

Edit the file to what you want, delete the markers, `git add` the file, and `git commit`. Conflicts are ordinary. They are the tool telling you two people, or you and an assistant, changed the same thing.

## Remotes

Put the repository on GitHub so it exists somewhere other than your laptop.

```bash
gh repo create build-lab --private --source=. --push
```

Without the CLI: create an empty repository on GitHub, then

```bash
git remote add origin git@github.com:YOUR-USER/build-lab.git
git push -u origin main
```

After that, `git push` sends your commits up and `git pull` brings others' commits down.

## Working with an AI assistant

Assistants such as Claude Code, Cursor and Copilot can edit many files in seconds and can run git commands themselves. That changes how you use git. Six rules.

1. **Commit before you ask.** The commit is the state you can return to if the change goes wrong. Ask the assistant for nothing until `git status` is clean.
2. **Read the diff, not the chat.** The assistant's summary of what it did may not match what it did. `git diff` is the ground truth.
3. **One change per commit.** Small commits are readable and reversible. "Add slider and fix the model and update README" is three commits.
4. **Know your undo.** `git restore <file>` throws away unstaged edits to that file. `git restore --staged <file>` unstages it. `git revert <commit>` makes a new commit that undoes an old one, which is safe on shared history. `git reset --hard` erases uncommitted work and should be used only when you mean it.
5. **Never commit secrets.** API keys go in `.env`, and `.env` is in `.gitignore`. Module 5 needs a key. If a key ever lands in a commit, treat it as leaked and rotate it. Deleting it in a later commit does not remove it from history.
6. **Write the commit message first.** A message like "Draw the grid on a canvas with one colour per group" is a specification. Give it to the assistant as the task, then check the diff against it.

Tell the assistant your rules and put them in a file it reads at start, such as `CLAUDE.md` or `.cursorrules`. A workable set: commit after each working step, never push, never force, never edit tests to make them pass.

### A gated push

The content repository behind this site does not let anyone push directly. A `./publish` script builds every page first and pushes only if the build succeeds. That is a workflow decision written down as a script, so nobody has to remember it. You can write yours the same way once module 4 gives you a check to gate on.

## Commit messages

Use a subject line of about fifty characters in the imperative mood: "Add", not "Added" or "Adds". Leave a blank line, then explain why, not what. The diff already says what.

```text
Seed the random generator from a number

Runs were not repeatable, so a bug seen once could not be seen again.
The seed is now an option and the default is 1.
```

## Exercise

1. Build the repository above: README, ignore file, at least three commits.
2. Make a branch with one commit on it, then merge it into `main`.
3. Push to GitHub. Private is fine.
4. Break something on purpose. Delete the README, then recover it with `git restore README.md`. Make a bad commit, then undo it with `git revert`.
5. Add one line to the README naming the git command you expect to use most, and commit it.

## Reading

- Chacon, S. and Straub, B. *Pro Git*, 2nd edition. Free online at git-scm.com/book. Chapters 1 to 3 cover everything in this module.
- Bryan, J. (2018). Excuse me, do you have a moment to talk about version control? *The American Statistician* 72(1), 20–27.
- Ram, K. (2013). Git can facilitate greater reproducibility and increased transparency in science. *Source Code for Biology and Medicine* 8, 7.
- GitHub Docs. "Hello World" and "About pull requests".
