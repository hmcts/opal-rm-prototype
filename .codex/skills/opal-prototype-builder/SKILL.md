---
name: opal-prototype-builder
description: Use when implementing OPAL RM GOV.UK Prototype Kit changes from an agreed prototype plan, with accessibility, UAT, and developer handoff artefacts kept in scope.
metadata:
  short-description: Build OPAL RM prototype changes
---

# OPAL Prototype Builder

Use this skill to edit this repository after a prototype plan exists.

## Build rules

- Use GOV.UK, GOV.UK Prototype Components, and MOJ macros before custom markup.
- Keep pages under `app/views/` and route logic in `app/routes.js`.
- Use session data for prototype state. Do not add a database, API layer, or production architecture.
- Use fake data only.
- Keep custom Sass and JavaScript small and justified.
- Preserve labels, legends, hints, error summaries, focus order, headings, and visible button/link text.

## Accessibility while building

For each changed page, check:

- every input has a visible label or fieldset legend
- hints explain format and avoid replacing labels
- error messages are specific and linked from an error summary
- repeated actions include context, visually or with hidden text
- summary-list change/remove links are meaningful without nearby visual context
- keyboard users can complete the happy path and error path
- no visual-only cue is required to understand the task

## Expected output

When implementation is complete, report:

- files changed
- route or journey changes
- accessibility decisions made
- fake data added or changed
- manual checks performed
- follow-up questions for BA, UCD, accessibility, or developers

Load `references/output-contract.md` when producing the handoff summary.
