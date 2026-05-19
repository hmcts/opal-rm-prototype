---
name: opal-prototype-uat-packager
description: Use when packaging an OPAL RM clickable prototype for BA/UAT review and developer handoff, including UAT script, accessibility notes, developer guidance, and decisions.
metadata:
  short-description: Package OPAL RM prototype outputs
---

# OPAL Prototype UAT Packager

Use this skill when a prototype branch is ready to be reviewed.

## Produce or update

- `UAT_SCRIPT.md`
- `ACCESSIBILITY_NOTES.md`
- `DEVELOPER_HANDOFF.md`
- `DECISIONS.md` when a decision affects future delivery

Use the templates in `assets/` when the repository does not already have these files.

## Pack rules

- Keep the UAT script task-based, not implementation-based.
- Use fake data only.
- State what the prototype proves and what it does not prove.
- Put accessibility assumptions and manual review needs in plain language.
- Tell developers which accessibility decisions must survive production build.
- Avoid claiming that the prototype is production-ready or WCAG certified.

## Minimum final summary

Report:

- UAT tasks covered
- accessibility risks exposed
- developer handoff decisions
- open questions
- validation evidence
