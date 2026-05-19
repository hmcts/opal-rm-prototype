# Using Codex for prototyping

This guide is for business analysts and designers who want to use Codex to help change the prototype.

If you are setting up the repository for the first time, start with the [BA setup guide](ba-setup-guide.md). It gives the full Windows and Mac path, then comes back to Codex once the prototype runs locally.

## How to start Codex for this repository

Start Codex from the repository root so it can inspect the right files.

1. Open `Terminal` on Mac or `Git Bash` on Windows.
2. Move into the repository folder:

```bash
cd ~/Projects/opal-rm-prototype
```

3. Check you are in the right folder:

```bash
pwd
git status
```

4. If this is your first use on that machine, sign in:

```bash
codex login
```

5. Start the interactive Codex session:

```bash
codex
```

6. Paste one of the prompts from this guide.
7. Review the files Codex changed with `git status` and `git diff`.
8. Run the prototype with `npm run dev` and check the result in your browser.

If the terminal says `codex` is not recognised, stop there and ask your team how Codex is installed on your HMCTS laptop before going further.

## What Codex is good at in this repository

Codex is useful for:

- adding a new page to the prototype journey
- changing wording on existing pages
- moving or adding journey steps
- replacing custom markup with GOV.UK or MOJ components
- improving page structure so it is easier to test with users
- explaining which files control a screen or a journey
- planning accessibility-aware UAT tasks and developer handoff notes

Codex is less useful if your request is vague.

Good:

- "Add an interpreter needs page after hearing details."
- "Change the review screen so it shows a warning when the email is missing."
- "Use GOV.UK radios instead of a select on the case type page."

Weak:

- "Improve this."
- "Make it better."
- "Do something modern."

## How this prototype is structured

These are the files Codex will usually need to change:

- `app/views/` for page templates
- `app/routes.js` for navigation and flow logic
- `app/data/session-data-defaults.js` for default answers or stored session values
- `app/filters.js` for template filters
- `app/assets/javascripts/application.js` for small front-end behaviour
- `app/assets/sass/application.scss` for small style changes

## Rules Codex should follow here

This repository is a GOV.UK Prototype Kit prototype, so the safest instructions are:

- use GOV.UK Design System and MOJ Design System components
- prefer Nunjucks macros instead of hand-written HTML
- keep styling changes small
- keep the repository as a prototype, not a production application
- do not add a backend, database, or API layer unless explicitly asked
- treat accessibility as part of the prototype conversation, especially for repeated creditors, order terms, validation, check answers, and keyboard-only journeys

## Local Codex skills for OPAL RM

This repository includes Codex skills under `.codex/skills/`.

Use this chain for a full BA-led prototype change:

```text
$opal-prototype-planner
$opal-prototype-builder
$opal-prototype-accessibility-reviewer
$opal-prototype-uat-packager
```

Use a smaller chain when the task is narrower:

```text
$opal-prototype-planner
Plan the OPAL RM prototype change only. Do not edit files yet.
```

```text
$opal-prototype-accessibility-reviewer
Review the changed OPAL RM prototype pages before UAT.
```

For the full BA guide, read [Accessible BA-led prototyping](accessible-prototyping.md).

## Copy-paste prompt examples

### Add a page

```text
Add a new page to this prototype after the hearing details step. The page should ask whether an interpreter is required. Use GOV.UK radios, save the answer in session data, and update app/routes.js so the journey continues to the review page.
```

### Plan an accessible UAT prototype

```text
$opal-prototype-planner
We need to test whether caseworkers can add two creditors and one order term, recover from a validation error, then trust the check answers page.
Use fake data only.
Known risk: repeated creditor remove/change links need clear context.
Out of scope: login, real APIs, document upload, payment.
Plan this first and tell me what you need to know before editing files.
```

### Package a prototype for review

```text
$opal-prototype-uat-packager
Prepare the prototype output pack for this branch.
Create UAT_SCRIPT.md, ACCESSIBILITY_NOTES.md, DEVELOPER_HANDOFF.md, and DECISIONS.md.
Make it clear what the prototype proves, what it does not prove, and what developers must preserve.
```

### Change page content

```text
Update the review page so the applicant and respondent details are easier to read. Use GOV.UK summary lists and clear headings.
```

### Ask for an explanation first

```text
Explain this prototype repository to me as a business analyst. Show me which files I would change for page content, flow logic, and styling.
```

### Make a page more GOV.UK-aligned

```text
Refactor this page to use GOV.UK or MOJ macros where possible. Keep the prototype simple and easy to change.
```

### Add a warning or condition

```text
If no respondent email has been entered, show a GOV.UK warning text on the review page and explain which file you changed.
```

## Best way to work with Codex

1. Say what page or journey step you want to change.
2. Say what the user should see or be able to do.
3. Say whether the answer should affect the next page.
4. Ask Codex to explain which files it changed.

## A simple BA or designer workflow

1. Run the prototype locally with `npm run dev`.
2. Open the current page in the browser.
3. Write down what you want to change.
4. Give Codex a precise instruction.
5. Ask Codex to capture accessibility assumptions and UAT tasks.
6. Run the prototype again and check the result in the browser.
7. If needed, ask Codex for a refinement.

## If you are not sure where to start

Use this:

```text
I am a business analyst working on this GOV.UK prototype. Explain the journey structure and then make the smallest change needed to add a new question page before the review page.
```

If you want a safer first run, use this instead:

```text
I am new to Codex and this repository. First explain which files control the page content, the flow logic, and the styling. Then make one very small prototype-safe change and tell me exactly which files changed.
```
