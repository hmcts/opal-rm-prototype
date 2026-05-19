---
name: opal-prototype-planner
description: Use when a BA, VA, designer, or delivery lead wants to turn an OPAL RM requirement, Confluence note, Jira story, or Figma design into a scoped, accessibility-aware prototype plan before files are edited.
metadata:
  short-description: Plan OPAL RM accessible prototype work
---

# OPAL Prototype Planner

Use this skill before building or changing the prototype.

## Goal

Create a short, practical prototype brief that makes the user goal, screens, data, accessibility risks, UAT tasks, and developer handoff expectations visible before implementation starts.

## Workflow

1. Confirm the user group and the decision UAT must support.
2. Identify the OPAL RM journey area, for example create a case, order terms, creditors, hearing details, check answers, search, resulting, or review cases.
3. Ask only for missing information that affects scope, accessibility, or UAT value.
4. Separate in-scope clickable behaviour from out-of-scope production behaviour.
5. Produce a plan that the BA can review before Codex edits files.

## Questions to ask when input is thin

- Who will use this screen or journey?
- What task should the user complete in UAT?
- Which pages already exist and which pages need to be added or changed?
- Which fields are mandatory, conditional, repeated, or legally sensitive?
- What should happen when the user makes a mistake?
- Which accessibility-sensitive areas are likely, for example repeated sections, tables, errors, autocomplete, hidden context, or keyboard-only use?
- Is there a Figma design, sketch, Jira story, or Confluence page to follow?
- What is deliberately out of scope?

## Output shape

Return:

- prototype goal
- target users
- journey map
- pages to change or add
- fake data needed
- accessibility risks to design around
- UAT tasks
- developer handoff notes to capture
- open questions
- recommended next skill

Load `references/ba-intake-checklist.md` when the user needs examples or when the ask is too vague.
