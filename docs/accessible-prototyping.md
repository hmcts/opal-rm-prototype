# Accessible BA-led prototyping

<div class="prototype-hero">
  <p class="prototype-eyebrow">OPAL RM prototype workflow</p>
  <h1>Design accessibility into the prototype conversation</h1>
  <p class="prototype-lede">Use this guide when BAs, VAs, designers, and developers are shaping a clickable OPAL RM prototype with Codex. The aim is to expose accessibility risks early, produce better UAT evidence, and give developers clearer implementation guidance.</p>
  <div class="prototype-actions">
    <a href="#copy-paste-starter-prompts">Copy prompts</a>
    <a href="#expected-output-pack">Output pack</a>
    <a href="#what-good-looks-like">Good examples</a>
  </div>
</div>

## Why this matters

Clickable prototypes are often treated as throwaway screens. That is risky when the prototype becomes the thing users react to, developers copy from, and stakeholders remember.

For OPAL RM, accessibility needs to be visible before build because the service includes repeated sections, check answers pages, validation, order terms, creditors, hearing details, and result recording. Those areas can look simple visually but become confusing for keyboard, screen-reader, voice-control, or cognitive-load scenarios if the prototype does not make the interaction explicit.

This workflow does not certify accessibility. It helps the team agree the right shape before production delivery starts.

## How it works in practice

<div class="prototype-grid prototype-grid-four">
  <div class="prototype-card">
    <span class="prototype-step">1</span>
    <h3>Frame the UAT decision</h3>
    <p>Start with the user, the journey, the question UAT must answer, and the parts that are deliberately out of scope.</p>
  </div>
  <div class="prototype-card">
    <span class="prototype-step">2</span>
    <h3>Build the clickable journey</h3>
    <p>Use GOV.UK and MOJ components in the Prototype Kit. Keep state simple and use fake data only.</p>
  </div>
  <div class="prototype-card">
    <span class="prototype-step">3</span>
    <h3>Review accessibility risk</h3>
    <p>Check keyboard flow, labels, legends, errors, repeated actions, headings, and summary-list links before UAT.</p>
  </div>
  <div class="prototype-card">
    <span class="prototype-step">4</span>
    <h3>Package the evidence</h3>
    <p>Produce UAT tasks, accessibility notes, developer handoff, decisions, and open questions with the prototype PR.</p>
  </div>
</div>

## Codex skills in this repo

Use these local skills from the root of `hmcts/opal-rm-prototype`:

```text
$opal-prototype-planner
$opal-prototype-builder
$opal-prototype-accessibility-reviewer
$opal-prototype-uat-packager
```

They live in `.codex/skills/` in this repository, so the guidance is specific to OPAL RM and the GOV.UK Prototype Kit structure used here.

| Skill | Use when | Output |
| --- | --- | --- |
| `opal-prototype-planner` | A BA or VA has an idea, Jira story, Confluence note, or Figma design | Prototype brief, accessibility risks, UAT tasks |
| `opal-prototype-builder` | The plan is agreed and the prototype needs to change | GOV.UK Prototype Kit pages, routes, and handoff notes |
| `opal-prototype-accessibility-reviewer` | The prototype is ready for UAT or PR review | Findings-first accessibility risk review |
| `opal-prototype-uat-packager` | The branch needs to be reviewable by stakeholders and developers | `UAT_SCRIPT.md`, `ACCESSIBILITY_NOTES.md`, `DEVELOPER_HANDOFF.md`, `DECISIONS.md` |

## Copy-paste starter prompts

### Plan before editing

```text
$opal-prototype-planner
We need a clickable OPAL RM prototype for creating a case.
Users are caseworkers.
UAT should tell us whether users can add application details, add order terms, add creditors, recover from validation errors, and trust the check answers page.
Use fake data only.
Known accessibility risk: repeated creditors and order terms need clear action names and keyboard-friendly error recovery.
Out of scope: login, real APIs, document upload, payment, and production validation.
Plan the prototype first. Do not edit files yet.
```

### Build from an agreed plan

```text
$opal-prototype-builder
Implement the agreed create-a-case prototype changes.
Use GOV.UK and MOJ components where possible.
Keep state in session data.
After editing, explain the route changes, accessibility decisions, fake data, and manual checks.
```

### Review before UAT

```text
$opal-prototype-accessibility-reviewer
Review the changed create-a-case pages before UAT.
Focus on keyboard flow, error summaries, repeated creditor actions, check answers change links, labels, legends, and hints.
Give findings first with P1, P2, or P3 priority.
Do not claim the prototype is WCAG certified.
```

### Package the output

```text
$opal-prototype-uat-packager
Prepare the prototype output pack for review.
Create or update UAT_SCRIPT.md, ACCESSIBILITY_NOTES.md, DEVELOPER_HANDOFF.md, and DECISIONS.md.
Use fake data and include open questions for BA, UCD, accessibility, and developers.
```

## What the BA or VA provides

<div class="example-split">
  <div class="example-card example-card-bad">
    <h3>Too thin</h3>
    <pre><code>Make the case journey accessible.</code></pre>
    <p>This does not tell Codex what UAT should prove, which pages matter, or where accessibility risk is likely.</p>
  </div>
  <div class="example-card example-card-good">
    <h3>Much better</h3>
    <pre><code>We need to test whether caseworkers can add two creditors and one order term, recover from a validation error, then trust the check answers page.
Use fake data only.
Known risk: repeated creditor remove/change links need clear context.
Out of scope: login, real APIs, document upload, payment.</code></pre>
    <p>This gives Codex enough context to ask useful follow-up questions and produce a reviewable prototype plan.</p>
  </div>
</div>

## What good looks like

### Good follow-up questions from Codex

```text
1. Which OPAL RM journey area is changing: create case, search, resulting, review cases, or case enquiry?
2. Which user role should UAT simulate?
3. Which repeated sections are involved, for example creditors, minor creditors, or order terms?
4. What should happen when the user makes a mistake?
5. Which Figma design, Jira story, or Confluence page should be treated as source material?
6. What must not be included in the prototype?
```

### Good planned output

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

## OPAL RM accessibility hotspots

| Area | Why it matters | What to ask Codex to check |
| --- | --- | --- |
| Repeated creditors and minor creditors | Identical links can become meaningless out of visual context | Change/remove links include the creditor name or hidden context |
| Order terms | Amounts, dates, and terms can become cognitively heavy | Hints explain formats and the page has clear grouping |
| Hearing details | Conditional content can hide important tasks | Keyboard users can reach and understand all revealed fields |
| Central authority details | Autocomplete and manual entry can be fragile | Users have a clear fallback and accessible field labels |
| Check answers | Developers often copy this structure into production | Summary-list actions are item-specific and questions match page titles |
| Validation | UAT can miss failure paths | Error summary links to exact fields and messages explain the fix |
| Resulting and review flows | Users need confidence before submitting | Status, next actions, and confirmation wording are unambiguous |

## Expected output pack

Every substantial prototype PR should include:

```text
UAT_SCRIPT.md
ACCESSIBILITY_NOTES.md
DEVELOPER_HANDOFF.md
DECISIONS.md
```

These files make the prototype useful beyond the clickable screens.

<div class="prototype-outcome-strip">
  <div>
    <strong>For BAs</strong>
    <span>clear UAT tasks and fake data</span>
  </div>
  <div>
    <strong>For UCD and accessibility</strong>
    <span>early risks and review questions</span>
  </div>
  <div>
    <strong>For developers</strong>
    <span>decisions to preserve in production</span>
  </div>
</div>

## Example UAT script extract

```text
Scenario: Add two creditors and review the case

You are a caseworker creating an OPAL RM case.

Task
1. Start a new case.
2. Add application and respondent details.
3. Add one order term.
4. Add two creditors.
5. Review the case on check answers.
6. Change the second creditor.
7. Submit the case.

Observe
- Can the user tell which creditor they are changing?
- Can a keyboard-only user recover from a validation error?
- Does the check answers page give enough confidence to submit?
```

## Example accessibility notes extract

```text
Checks performed
- Keyboard walkthrough of the happy path and validation path.
- Markup review for labels, legends, hints, headings, and action names.
- Error summary review on application details and order term pages.

Findings
- P2: Repeated creditor remove links need item-specific accessible names.
- P3: Order amount hint should include a format example, for example 250.00.

Manual review required
- Screen-reader review of repeated creditor journey.
- Content review of validation messages before production build.
- Production WCAG assessment before release.
```

## Example developer handoff extract

```text
Accessibility decisions to preserve
- One order term question per page where the task is complex.
- Summary-list change links include hidden context, for example "Change creditor Alex Smith".
- Error summary links to the exact field or fieldset.
- Monetary fields include visible format hints.

Production questions
- Does the real data model support multiple creditors per order term?
- Is save-and-return required for long case creation?
- Who owns final validation wording?
```

## Review questions for relevant people

Ask reviewers to agree or challenge:

```text
- Are these the right UAT tasks?
- Are the accessibility assumptions honest and useful?
- Does the prototype expose the risky parts before build?
- Would developers know which accessibility decisions to preserve?
- Are any claims too strong for a prototype?
- What must move into production acceptance criteria?
```

## Definition of done for a prototype branch

- The clickable journey runs locally.
- UAT tasks are written in plain language.
- Fake data is included and contains no real case data.
- Accessibility risks are captured in `ACCESSIBILITY_NOTES.md`.
- Developer handoff explains what to preserve and what not to copy blindly.
- Open questions are visible.
- The prototype does not claim production accessibility certification.

## Boundary

This workflow makes accessibility visible early enough for UAT, UCD, accessibility specialists, and developers to agree the direction. It does not replace a manual accessibility audit, assistive technology testing, or production WCAG assessment.
