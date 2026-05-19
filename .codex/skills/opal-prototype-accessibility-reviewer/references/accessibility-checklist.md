# Accessibility Review Checklist

## Prototype checks

- Page title matches the task.
- One clear H1 per page.
- Heading order does not skip for layout reasons.
- Inputs use labels, fieldset legends, and hints correctly.
- Error summary appears at the top of the page and links to the exact field or fieldset.
- Error text explains how to fix the problem.
- Back links and cancel links are predictable.
- Summary-list change/remove links include hidden or visible context.
- Repeated creditor and order-term actions can be understood without visual position.
- Keyboard focus order follows the page layout.
- Conditional content is reachable and understandable.
- The prototype does not depend on colour, spacing, or icons alone.

## Example finding

```text
P2 - Repeated creditor remove links need context
Page: app/views/create-a-case/order-term-creditor.html
Impact: Screen-reader and voice-control users may hear several identical "Remove" links and not know which creditor will be removed.
Prototype fix: Include hidden text, for example "Remove creditor Alex Smith".
Developer handoff: Preserve item-specific action names in production summary lists and repeated sections.
```

## Boundary

This review does not certify accessibility. It identifies risks early so the BA, UCD, accessibility specialist, and developers can agree what to preserve or improve.
