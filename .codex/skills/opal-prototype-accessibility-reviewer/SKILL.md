---
name: opal-prototype-accessibility-reviewer
description: Use when reviewing OPAL RM prototype pages for early accessibility risks before UAT or developer handoff. This complements manual accessibility review and does not certify WCAG compliance.
metadata:
  short-description: Review OPAL RM prototype accessibility risks
---

# OPAL Prototype Accessibility Reviewer

Use this skill before UAT, PR review, or developer handoff.

## Review scope

Check the changed OPAL RM prototype pages for practical risks that would make UAT misleading or create avoidable developer rework.

Focus on:

- page title and heading structure
- labels, legends, hints, and grouped controls
- validation messages and error summaries
- keyboard-only path through happy and error journeys
- repeated creditors, order terms, and minor creditor sections
- summary-list action names
- autocomplete or conditional reveal behaviour
- links and buttons that rely on visual context only

## Output

Return findings-first:

- `P1` blocks meaningful UAT
- `P2` likely creates developer rework or misleading UAT
- `P3` useful improvement

For each finding include:

- page or file
- issue
- user impact
- recommended prototype fix
- production handoff note if needed

End with:

- manual review still required
- what is safe enough for UAT
- what must move into developer acceptance criteria

Load `references/accessibility-checklist.md` when the user asks for a checklist or report template.
