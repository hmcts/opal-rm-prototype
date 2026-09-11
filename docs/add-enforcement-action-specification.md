# Add enforcement action journey

## Purpose and scope

This specification describes the prototype journey for adding an enforcement action to a **respondent account**. It currently supports one enforcement action type: Enforcement Summons (MSUMM).

The journey begins on the Enforcement tab. The at-a-glance Enforcement status panel communicates the account status but does not provide the add-action link.

This is a prototype specification. The action and its audit history are held in session data for the duration of the prototype session; they are not persisted to a backend service.

## Design-system references

- [GOV.UK select](https://design-system.service.gov.uk/components/select/)
- [GOV.UK textarea](https://design-system.service.gov.uk/components/textarea/)
- [GOV.UK text input](https://design-system.service.gov.uk/components/text-input/)
- [GOV.UK error message and validation](https://design-system.service.gov.uk/components/error-message/)
- [GOV.UK summary list and summary card](https://design-system.service.gov.uk/patterns/check-answers/)
- [GOV.UK inset text](https://design-system.service.gov.uk/components/inset-text/)
- [MOJ date picker](https://design-patterns.service.justice.gov.uk/components/date-picker/)
- [MOJ autocomplete](https://design-patterns.service.justice.gov.uk/components/autocomplete/)
- [MOJ alert](https://design-patterns.service.justice.gov.uk/components/alert/)

The source design is the Add enforcement action journey in [Figma](https://www.figma.com/design/RPjAMYkSNtrw2S995IuwbW/RM---Cases?node-id=3956-158181).

## Journey overview

```mermaid
flowchart TD
  A[Respondent account: Enforcement tab] --> B{Current enforcement action?}
  B -->|No| C[Add enforcement action]
  B -->|Yes| D[Cannot add enforcement action]
  C --> E{MSUMM selected?}
  E -->|No| C
  E -->|Yes| F[Enforcement Summons (MSUMM) details]
  F --> G{Valid fields?}
  G -->|No| F
  G -->|Yes| H[Check enforcement details]
  H -->|Change| F
  H -->|Submit| I[Create action with Scheduled hearing]
  I --> J[Enforcement tab with success message]
```

## Entry rules

- The journey is available from the **Actions** panel on the Enforcement tab.
- The action link is labelled **Add enforcement action**.
- The journey is for respondent accounts only.
- Only one current enforcement action can exist on an account in the prototype.
- If a current enforcement action exists, the user is shown the cannot-add screen instead of a new action form.
- Direct navigation to an unknown account returns the user to the approved cases list.

## Page 1: Select an enforcement action

**Route:** `GET /active-case/:id/enforcement/add`  
**Page title and H1:** Add enforcement action

**Screenshot placeholder:** _Add enforcement action — select action type._

The user selects an enforcement action and chooses Continue. The only available option is Enforcement Summons (MSUMM).

| Field | Component and rules | Accessible name / ARIA | Field-specific error message |
| --- | --- | --- | --- |
| Enforcement action type | GOV.UK select. Blank by default. The only available action is `Enforcement Summons (MSUMM)` with value `msumm`. Required. | Visible label is programmatically associated with the select. Native select semantics are used; no additional ARIA is required. | `Select an enforcement action` |

### Navigation

- **Continue:** saves the draft selection and opens the MSUMM details page.
- **Cancel:** returns to the Enforcement tab.
- There is no back link on this page.

## Page 2: Enforcement Summons (MSUMM) details

**Route:** `GET /active-case/:id/enforcement/msumm`  
**Page title and H1:** Enforcement Summons (MSUMM)

**Screenshot placeholder:** _Enforcement Summons (MSUMM) — hearing details and past-date warning._

The account number and respondent name are shown as a caption. The page has a Back link to the action-type selection page.

| Field | Component and rules | Accessible name / ARIA | Field-specific error message |
| --- | --- | --- | --- |
| Reason | GOV.UK textarea. Optional. Maximum 1,000 characters. | Visible label is associated with the textarea. | `Reason must be 1,000 characters or fewer` |
| Court | MOJ autocomplete populated from the England and Wales family court list. Required. Display width is two-thirds. | Visible label is associated with the autocomplete input. The autocomplete provides its standard combobox semantics and keyboard behaviour. | `Select a court` |
| Hearing venue | GOV.UK text input. Optional. Display width is two-thirds. | Visible label is associated with the input. | None. |
| Hearing date | MOJ date picker. Required. Accepts a real date in `DD/MM/YYYY` format. Dates in the past and future can be selected or entered. | Visible label is associated with the date input. The past-date warning is a polite live region (`role="status"`, `aria-live="polite"`). | `Enter hearing date`; `Enter a real hearing date in the format DD/MM/YYYY` |
| Hearing time | GOV.UK text input. Optional. Must use 24-hour `HH:MM` format if entered; `00:00` represents midnight. | Visible label and hint are associated with the input. | `Enter a hearing time in the format HH:MM` |

### Hearing date warning

When a valid hearing date earlier than today is entered or selected, show the warning immediately below the date picker:

> **Hearing date in the past**  
> You can continue with this date or change it

The warning:

- uses the GOV.UK inset text component with the approved custom visual treatment: MOJ orange left border and light grey background
- is hidden when the date is today, future, blank or invalid
- does not prevent the user continuing
- is announced politely to screen-reader users when it appears

### Navigation

- **Back:** returns to the action-type selection page.
- **Continue:** validates the form, saves all entered values in the draft, and opens Check enforcement details.
- **Cancel:** returns to the Enforcement tab and does not create an action.

## Page 3: Check enforcement details

**Route:** `GET /active-case/:id/enforcement/check`  
**Page title and H1:** Check enforcement details

**Screenshot placeholder:** _Check enforcement details — Enforcement action summary card._

The page displays an **Enforcement action** summary card containing:

- Enforcement action: Enforcement Summons (MSUMM), shown as a blue tag
- Reason
- Hearing court
- Hearing venue
- Hearing date in long date format
- Hearing time

The card has a **Change** link that returns to the populated MSUMM details page. The link must not be blocked by a leave-page warning because the check page contains no editable, unsaved data.

### Navigation

- **Change:** returns to the MSUMM details form with the draft values preserved.
- **Submit:** creates the enforcement action.
- **Cancel:** returns to the Enforcement tab and does not create an action.

## On submission

On successful submission:

1. Create the enforcement action with:
   - type: `Enforcement Summons (MSUMM)`
   - hearing status: `Scheduled`
   - the reason, court, venue, hearing date and hearing time entered by the user
2. Add an Enforcement actions item to account history. It includes the MSUMM type, hearing date, court and, where supplied, the reason.
3. Clear the enforcement-action draft.
4. Redirect to the Enforcement tab.
5. Show a dismissible MOJ success alert: `Enforcement action added.`

**Screenshot placeholder:** _Enforcement tab after successful creation, with success alert and action summary card._

## Enforcement tab after creation

The Enforcement tab shows a summary card headed **Last enforcement action**. Its action is labelled **Manage hearings**; the future Manage hearings journey will define its destination and behaviour.

The card displays:

- Enforcement action tag
- Reason
- Hearing status tag
- Hearing court
- Hearing venue
- Hearing date
- Hearing time

Hearing status tags are:

| Status | Tag treatment |
| --- | --- |
| Scheduled | Grey GOV.UK tag |
| Result pending | Yellow GOV.UK tag |
| Resulted | Default light-blue GOV.UK tag |

## Active court-case banner

Show the account-level MOJ information alert directly below any success alert, and above the account header, whenever any enforcement action or application hearing has a status of `Scheduled` or `Result pending`.

The alert text is:

> Account has one or more active court cases.

The banner is visible across the account tabs. It is not shown when every hearing is `Resulted` or when there are no active hearings.

## Cannot-add enforcement action

**Route:** `GET /active-case/:id/enforcement/add` when a current action exists

**Screenshot placeholder:** _Cannot add enforcement action._

Show this message:

> You cannot add an enforcement action while another enforcement action is active.

Provide a Back link to the Enforcement tab. Do not create or overwrite an action.

## Page-specific error messages

| Page | Condition | Error summary and inline error |
| --- | --- | --- |
| Select an enforcement action | No action selected | `Select an enforcement action` |
| MSUMM details | Court is blank or not in the court list | `Select a court` |
| MSUMM details | Hearing date is blank | `Enter hearing date` |
| MSUMM details | Hearing date is not a real date in `DD/MM/YYYY` format | `Enter a real hearing date in the format DD/MM/YYYY` |
| MSUMM details | Hearing time is supplied but not in 24-hour `HH:MM` format | `Enter a hearing time in the format HH:MM` |
| MSUMM details | Reason exceeds 1,000 characters | `Reason must be 1,000 characters or fewer` |

A past hearing date is a warning, not an error, and must not appear in the error summary.

## Prototype implementation references

- Routes, validation and session draft handling: `app/routes.js`
- Action selection and MSUMM details: `app/views/active-case/enforcement-action.html`
- Check page: `app/views/active-case/check-enforcement-action.html`
- Enforcement tab summary card: `app/views/active-case/enforcement.html`
- Past-date warning behaviour: `app/assets/javascripts/application.js`
- Past-date warning custom presentation: `app/assets/sass/application.scss`
