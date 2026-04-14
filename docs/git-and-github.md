# Git and GitHub basics

This page covers the small set of commands most people need every day.

## The safest daily workflow

Start from the latest `main`:

```bash
git checkout main
git pull --ff-only origin main
```

Create your own branch:

```bash
git checkout -b docs/my-change
```

Check what changed:

```bash
git status
git diff
```

Stage files:

```bash
git add README.md docs/
```

Commit:

```bash
git commit -m "docs: improve onboarding guide"
```

Push the branch for the first time:

```bash
git push -u origin docs/my-change
```

Later pushes:

```bash
git push
```

## Useful commands

See your current branch:

```bash
git branch --show-current
```

Download new branches from GitHub:

```bash
git fetch origin
```

Switch to an existing branch:

```bash
git checkout branch-name
```

Show recent commit history:

```bash
git log --oneline --decorate -10
```

Discard an uncommitted change in one file:

```bash
git restore path/to/file
```

## How to raise a pull request

1. Push your branch.
2. Open GitHub in the browser.
3. Click `Compare & pull request`.
4. Add a clear title and summary.
5. Create the pull request.

For branches created inside this repository, the docs workflow publishes:

- a branch preview
- a pull request preview

The pull request gets a comment with the preview link.
