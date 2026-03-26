# Opal RM prototype documentation

This site is the published version of the repository onboarding guide for `hmcts/opal-rm-prototype`.

Use it if you need to:

- set up a Windows laptop from scratch
- set up a MacBook from scratch
- learn the basic Git commands needed for day-to-day work
- understand how to use Codex to make prototype changes safely
- understand how the repository publishes documentation previews for branches and pull requests

## Start here

If you are new to development tools, read in this order:

1. [Windows setup](windows-setup.md) or [Mac setup](macbook-setup.md)
2. [Git and GitHub basics](git-and-github.md)
3. [Using Codex for prototyping](using-codex.md)
4. [Troubleshooting](troubleshooting.md)

## What this repository is

This repository contains a GOV.UK Prototype Kit prototype for an `Opal RM` case creation journey.

It is a prototype, not a production service. That means:

- speed and clarity matter more than heavy engineering patterns
- there is no persistent backend or database
- data is stored in the session only

## Useful local commands

Install dependencies:

```bash
npm install
```

Run the prototype locally:

```bash
npm run dev
```

Open the prototype:

```text
http://localhost:3000
```

## Published documentation URLs

When the GitHub Pages workflow runs successfully:

- latest docs from `main`: `https://hmcts.github.io/opal-rm-prototype/latest/`
- branch preview: `https://hmcts.github.io/opal-rm-prototype/branches/<branch-name>/`
- pull request preview: `https://hmcts.github.io/opal-rm-prototype/pulls/pr-<number>/`
