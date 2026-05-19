# BA Intake Checklist

## Strong BA input

```text
We need a clickable prototype for creating an OPAL RM case.
Users are caseworkers.
UAT should tell us whether users can add application details, add order terms, add creditors, recover from validation errors, and trust the check answers page.
Use fake data only.
Known accessibility risk: repeated creditors and order terms need clear action names and keyboard-friendly error recovery.
Out of scope: login, real APIs, document upload, payment, and production validation.
```

## Thin input that needs follow-up

```text
Make the create case journey accessible.
```

Ask:

1. Which user task should UAT prove?
2. Which exact journey area is changing?
3. Are repeated sections involved?
4. Which Figma design or page should be treated as the source?
5. What should be excluded from the prototype?

## Example planned output

```text
Prototype goal
- Test whether a caseworker can create an OPAL RM case with two creditors and one order term without losing context.

Pages to change
- /create-a-case/application-details
- /create-a-case/order-term-details
- /create-a-case/order-term-creditor
- /create-a-case/check-case-details

Accessibility risks
- Repeated creditor actions must have item-specific accessible names.
- Error summaries must link to the exact field or fieldset.
- Check answers change links must preserve hidden context.

UAT tasks
- Add application details.
- Add two creditors.
- Change the second creditor from check answers.
- Submit and confirm the case.
```
