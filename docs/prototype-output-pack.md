# Prototype output pack

This page shows what should travel with a reviewable OPAL RM prototype branch.

The clickable screens are not enough. The branch should also explain what the prototype is testing, which accessibility decisions matter, and what developers should preserve when they build the production service.

## Files to produce

| File | Audience | Purpose |
| --- | --- | --- |
| `UAT_SCRIPT.md` | BAs, VAs, UCD, users | Defines task-based UAT scenarios and fake data |
| `ACCESSIBILITY_NOTES.md` | Accessibility, UCD, developers | Captures early risks, checks performed, and manual review needs |
| `DEVELOPER_HANDOFF.md` | Developers, testers, tech leads | Explains routes, behaviours, decisions, and production acceptance criteria |
| `DECISIONS.md` | Delivery team | Records decisions that should not be lost after prototype review |

## UAT_SCRIPT.md template

```markdown
# UAT Script

## Prototype goal

State what decision this UAT session should support.

## Participant role

State the role, for example caseworker, service manager, or reviewer.

## Fake data

- Applicant:
- Respondent:
- Creditor:
- Order term:

## Tasks

1. Start the journey.
2. Complete the relevant details.
3. Recover from one validation error.
4. Review the check answers page.
5. Change one repeated item.
6. Submit or finish the prototype journey.

## Observe

- Can the user understand what to do next?
- Can they recover from errors?
- Do repeated sections remain clear?
- Does the check answers page give enough confidence?
- Which wording or layout caused hesitation?
```

## ACCESSIBILITY_NOTES.md template

```markdown
# Accessibility Notes

## Checks performed

- Keyboard walkthrough:
- Error summary review:
- Labels, legends, and hints:
- Summary-list action names:
- Repeated sections:

## Findings

| Priority | Page | Finding | Recommended action |
| --- | --- | --- | --- |
| P2 |  |  |  |

## Manual review required

- Screen-reader review:
- Content review:
- Accessibility specialist review:

## Boundary

This prototype has not been certified as WCAG compliant. These notes capture early risks and decisions for UAT and developer handoff.
```

## DEVELOPER_HANDOFF.md template

```markdown
# Developer Handoff

## Routes and pages represented

- 

## Behaviour shown in the prototype

- 

## Accessibility decisions to preserve

- 

## Production acceptance criteria to consider

- 

## Prototype shortcuts that must not be copied blindly

- 

## Open questions

- 
```

## DECISIONS.md template

```markdown
# Decisions

| Date | Decision | Reason | Owner | Follow-up |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |
```

## Example completed developer handoff

```markdown
# Developer Handoff

## Routes and pages represented

- /create-a-case/application-details
- /create-a-case/order-term-details
- /create-a-case/order-term-creditor
- /create-a-case/check-case-details
- /create-a-case/case-submitted

## Behaviour shown in the prototype

- A caseworker can add application details, one order term, and two creditors.
- The user can change the second creditor from check answers.
- Validation demonstrates the error summary pattern but does not use production rules.

## Accessibility decisions to preserve

- Summary-list change links include item-specific hidden context.
- Error summaries link to exact fields or fieldsets.
- Monetary amount fields include visible format hints.
- Repeated creditor actions do not rely on visual order alone.

## Production acceptance criteria to consider

- Given there are multiple creditors, each change and remove action has an accessible name that includes the creditor.
- Given a validation error occurs, the error summary links to the exact field and focus is managed correctly.
- Given a user reviews check answers, every answer has a clear question and action label.

## Prototype shortcuts that must not be copied blindly

- Session-only storage.
- Fake validation rules.
- Placeholder confirmation content.

## Open questions

- Does the production model support multiple creditors per order term?
- Who owns final validation content?
- Is save-and-return required?
```
