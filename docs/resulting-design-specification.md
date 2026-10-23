# Resulting journeys — design specification

Date: 21 October 2026  
Status: Consolidated design specification for BA review  
Scope: Application and Enforcement hearing results; inputter and checker journeys

## 1. Purpose and authority

This document consolidates the eight BA Markdown write-ups supplied for Resulting and the subsequent decisions agreed with the designer. It describes the intended behaviour, rather than asserting that every rule is already implemented in the prototype.

Explicit decisions made during the review supersede conflicting wording in the supplied write-ups and older Figma frames. Existing checker behaviour is documented as a prototype baseline where it was not part of those decisions. Remaining dependencies and implementation gaps are listed at the end.

This is a GOV.UK Prototype Kit prototype. Use session data for draft and proposed changes. This specification does not require a database or production integration. References to shared data describe the intended service behaviour; a prototype session cannot demonstrate sharing between independent users.

### Source material

- [Resulting designs](https://www.figma.com/design/RPjAMYkSNtrw2S995IuwbW/RM---Cases?node-id=2060-103536)
- [Review Add, Change and Remove route map](https://www.figma.com/design/RPjAMYkSNtrw2S995IuwbW/RM---Cases?node-id=5379-10793)
- Supplied BA files: Results (inputter view); Outstanding hearings; Hearing information; Hearing outcome; Existing order details; Add results; Result details; Check and submit for validation.
- Result-code workbook linked from the supplied Result details write-up. Its contents have not been independently verified for this specification; do not infer a complete result-code catalogue from the current prototype.

### Design-system references

- [GOV.UK buttons](https://design-system.service.gov.uk/components/button/), [back links](https://design-system.service.gov.uk/components/back-link/) and [tabs](https://design-system.service.gov.uk/components/tabs/)
- [GOV.UK tables](https://design-system.service.gov.uk/components/table/) and [summary lists/cards](https://design-system.service.gov.uk/components/summary-list/)
- [GOV.UK text inputs](https://design-system.service.gov.uk/components/text-input/), [character count](https://design-system.service.gov.uk/components/character-count/), [radios](https://design-system.service.gov.uk/components/radios/) and [checkboxes](https://design-system.service.gov.uk/components/checkboxes/)
- [GOV.UK error summaries](https://design-system.service.gov.uk/components/error-summary/), [error messages](https://design-system.service.gov.uk/components/error-message/) and [check answers](https://design-system.service.gov.uk/patterns/check-answers/)
- [GOV.UK Prototype Components](https://govuk-prototype-components.x-govuk.org/)
- [MOJ date picker](https://design-patterns.service.justice.gov.uk/components/date-picker/), [sortable table](https://design-patterns.service.justice.gov.uk/components/sortable-table/), [pagination](https://design-patterns.service.justice.gov.uk/components/pagination/), [alert](https://design-patterns.service.justice.gov.uk/components/alert/) and [timeline](https://design-patterns.service.justice.gov.uk/components/timeline/)

Use established Nunjucks macros and design-system utilities. Do not introduce custom CSS or custom interaction patterns to match a frame.

## 2. Shared rules

### Roles, states and permissions

| State | Inputter behaviour | Checker behaviour | Account effect |
| --- | --- | --- | --- |
| Result pending | Record the hearing result. | Not yet a submitted result to validate. | Draft changes are not applied. |
| Validation pending | View the submitted result read-only. | Review, validate or reject. | Proposed order changes, remission and new hearings remain unapplied. |
| Result rejected | View review history, correct the draft and resubmit. | View the rejected submission/history. | Rejected proposals are not applied. |
| Validated | Excluded from outstanding and pending queues. No 24-hour Validated tab. | Validation is recorded in history. | Apply the validated proposals. |

Judiciary and Legal adviser are an exception to deferred account changes: confirmed shared personnel updates affect all hearings at the same court on the same date, including already validated hearings. Do not describe these shared metadata updates as waiting for result validation.

### Display and accessibility

- Keep primary navigation on Resulting, Outstanding hearings, All rejected results and Validate results worklists.
- Account links show the linked account number, then `LASTNAME, Firstname` underneath on lists and review screens. Hearing information uses the contextual display name, for example `Mr Piotr NOWAK`.
- Format monetary summaries as `£500.00` and `£1,000.00`. Retain payment frequency where relevant, for example `£500.00 monthly`.
- Table dates use `DD MMM YYYY`, for example `01 Oct 2026`. Date entry uses `DD/MM/YYYY`. Hearing-context summaries use day, full month and year.
- Where a summary field has no data, show an em dash with an accessible name of `No data`, for example `<span aria-label="No data">—</span>`.
- Use actual names in attendance questions, not placeholder tokens or “Defendant”.
- Paginate lists with more than 25 rows using MOJ pagination. Preserve filters and sorting across pages.
- Use native labels and component semantics. Add visually hidden context to repeated links rather than replacing visible labels with unrelated ARIA labels.
- Errors appear in a GOV.UK error summary and beside the field. Summary links target the relevant field. Preserve submitted values and use standard focus behaviour.
- Removal success messages use MOJ alert with `variant: "success"` and `dismissible: true`. Store before redirecting, consume on the destination and do not repeat on refresh.

## 3. Journey sequence

1. Open Outstanding hearings from Resulting or Cases, or start Record result from the account's relevant hearing.
2. Select a Result pending hearing and complete Hearing information.
3. For an Application, choose Hearing outcome. Enforcement bypasses this screen.
4. On the Application order route, review existing orders and optionally add/amend terms.
5. Record results through the initial Add results journey. At least one result is required except on the Application order route with at least one term.
6. Check and submit for validation. Add, change or remove results from review as needed.
7. Submit and return to Outstanding hearings with the court/date filters retained.
8. The checker validates or rejects the submission.
9. A rejected result can be corrected by an inputter and resubmitted.

### Result requirement matrix

| Hearing and route | Can review show No results? | Can submit with No results? |
| --- | --- | --- |
| Application: Add or amend order terms, with at least one term | Yes | Yes |
| Application: No order terms to add or amend | Yes, including after removing the final result | No |
| Enforcement | Yes, including after removing the final result | No |

Do not force a user away from review simply because they removed the last result. Enforce the submission requirement when they attempt to submit.

## 4. Resulting — inputter workspace

Route reference: `/record-results`  
H1: **Resulting**  
Screenshot placeholders: _Validation pending tab_; _Rejected tab_; _empty personal worklist_.

| Element | Content and behaviour | Accessible name / ARIA | Field-specific error |
| --- | --- | --- | --- |
| Record results | Opens Outstanding hearings. | Visible button text. | Not applicable |
| Validation pending | Personal submitted results awaiting validation. Each row opens a read-only review. | GOV.UK tab semantics and associated panel. | Not applicable |
| Rejected | Personal rejected submissions, with rejection count badge. Each row opens the correction review. | Expose the badge count with its tab context. | Not applicable |
| Personal scope text | Pending: `Showing only results you have submitted.` Rejected: `Showing only results you submitted. To resubmit results for other team members, you can view all rejected results.` | The final phrase is a descriptive link. | Not applicable |
| Table | Respondent account; Applicant account; Court; Hearing date; Action. All displayed columns, including Action, are sortable. | MOJ sortable headers; `aria-sort` reflects the active sort. Account links identify party and number; View result identifies the hearing parties. | Not applicable |
| View all rejected results | Opens the all-users rejected worklist. | `View all rejected results`. | Not applicable |

There is no Validated tab and no “validated in the last 24 hours” rule. The existing newest-first personal queue order is a prototype baseline, not the Outstanding hearings oldest-first decision.

### Page-specific errors

None for viewing tabs. Empty results are a normal state, not a validation error. Empty-state copy for personal queues remains to be confirmed; do not render a meaningless empty table.

## 5. All rejected results

Route reference: `/record-results/all-rejected`  
H1: **All rejected results**  
Screenshot placeholders: _All rejected results populated_; _All rejected results empty_.

Show rejected hearing results submitted by any user, rather than just the signed-in user's submissions. Keep primary navigation and a return link to the personal Rejected tab. A View result link opens the selected rejected result and its correction journey.

| Element | Content and behaviour | Accessible name / ARIA | Field-specific error |
| --- | --- | --- | --- |
| Table | Party account links, Court, Hearing date, Submitted by and Action. Use sortable headers and pagination. Submitted by follows the existing all-users worklist baseline. | Account and action context as on Resulting; `aria-sort` on sortable headers. | Not applicable |
| Empty state | Show a clear no-rejected-results message and the return link; no empty table. Exact copy is still a content dependency. | Normal paragraph; no error role. | Not applicable |

### Page-specific errors

None for an empty worklist. Only eligible rejected submissions may be edited; direct navigation must respect the hearing's current state.

## 6. Outstanding hearings

Route reference: `/record-results/list-hearings` — the URL may remain unchanged when the screen is renamed.  
H1 and navigation label: **Outstanding hearings**  
Screenshot placeholders: _Unfiltered list_; _Court/date filtered list_; _No matching hearings_; _Invalid date_.

| Element | Component and rules | Accessible name / ARIA | Field-specific error |
| --- | --- | --- | --- |
| Back to Resulting | Returns to personal Resulting. | Visible link text. | Not applicable |
| Select a court | Optional court selection/autocomplete. Court and date can be used separately or together. | Label associated with control. | None for blank |
| Hearing date | Optional MOJ date picker; valid calendar date in DD/MM/YYYY when supplied. | Date-picker labels and keyboard behaviour. | `Enter a valid hearing date`; format error: `Date must be in the format DD/MM/YYYY` |
| Filter | Apply supplied filters to the eligible hearing list. | Visible button text. | Not applicable |
| Clear filter | Clear court/date and restore the full eligible list. | Visible link/button text. | Not applicable |
| Hearings to result and validate | Respondent account; Applicant account; Court; Hearing date; Hearing status; Action. No Hearing type column. | Sortable header semantics; contextual account/action links. | Not applicable |
| Record result | Only for Result pending; opens Hearing information. | `Record result for [respondent] and [applicant]`. | Not applicable |
| View result | For Validation pending or Result rejected; opens the appropriate review. | `View result for [respondent] and [applicant]`. | Not applicable |

Include Result pending, Validation pending and Result rejected; exclude validated hearings. Initially load without filters. Default sort: hearing date ascending, then court A–Z, then respondent surname A–Z. Use real dates and names for sorting rather than formatted strings. Show at most 25 hearings per page.

### Page-specific errors

An invalid filter date prevents filtering and retains the entered court/date for correction. No-match and no-outstanding-hearing states are informational, not errors. Exact empty-state copy remains a content dependency.

## 7. Hearing information

Route reference: `/record-results/:id/:category/information`  
Caption: **Record results**; H1: **Hearing information**  
Screenshot placeholders: _Application_; _Enforcement with remission expanded_; _Field errors_.

Read-only context: Court, Hearing date, Respondent, Applicant and Hearing type. Use the actual type of the selected hearing.

| Field | Component and rules | Accessible name / ARIA | Field-specific error |
| --- | --- | --- | --- |
| Judiciary | Required GOV.UK character-count textarea; maximum 250 characters. Prefill shared session values when present. | Label `Judiciary`; component supplies counter/error descriptions. | `Enter the judiciary`; `Judiciary must be 250 characters or fewer` |
| Legal adviser (optional) | Single-line text input. Hint: `Required if judiciary were Magistrates`. Optional because the system cannot reliably determine whether free-text Judiciary represents magistrates. Existing prototype maximum is 250 characters. | Label and hint associated with input. | No blank-field error. Existing limit error: `Legal adviser must be 250 characters or fewer` |
| Was [person's name] present? | Required inline Yes/No radios. Application: the person who did not make the application. Enforcement: the account respondent. | Named legend; retain radio group semantics. | `Select whether [person's name] was present` |
| Should arrears be remitted? | Enforcement only; required Yes/No radios. Yes reveals the amount. No omits the proposed remission amount. | Legend and conditional association provided by macro. | `Select whether arrears should be remitted` |
| How much arrears should be remitted? | Required when Yes. GBP input with £ prefix. Accept whole pounds or exactly two decimal places: 500, 500.00, 500.50. Reject 500.5. Must be greater than zero and no more than account total arrears. | Explicit label and linked error; prefix does not replace label. | See remission errors below. |

Initial Continue: Application → Hearing outcome; Enforcement → Add results. Review edit: **Save changes** → original review, through shared-details confirmation where required.

When shared values are prefilled, explain: `If you change Judiciary or Legal adviser, you will be asked to confirm the update for all hearings at this court on this date.`

### Page-specific errors

Proposed exact remission copy for BA content review:

| Condition | Error message |
| --- | --- |
| Yes selected but amount blank | `Enter an amount to remit in pounds` |
| Invalid number, negative amount, or unsupported decimal precision | `Enter an amount in pounds using whole pounds or 2 decimal places` |
| Amount is zero | `Enter an amount greater than £0.00` |
| Amount exceeds total arrears | `Enter an amount no more than the total arrears of [formatted total]` |

Total arrears means the total across the account's order terms, not only the term most recently edited. Trim surrounding whitespace before validation. Do not silently round invalid input.

## 8. Confirm shared Judiciary and Legal adviser changes

Route reference: `/record-results/:id/:category/confirm-judicial-details`  
H1: **Change the judiciary details for this session?**  
Screenshot placeholders: _Proposed judge details_; _Proposed magistrates and Legal adviser details_.

Show when previously stored shared Judiciary or Legal adviser values are changed, including through a review Change link. First-time entry where no shared details exist does not require a change confirmation.

Explain: **This change will update Judiciary and Legal adviser details for all hearings at this court on this date, including already validated hearings.** This wording consolidates the agreed scope and is proposed copy for BA review.

| Element | Behaviour | Accessible name / ARIA | Field-specific error |
| --- | --- | --- | --- |
| Judiciary / Legal adviser | Read-only proposed values. Blank Legal adviser is an em dash. | Blank value has accessible name `No data`. | Not applicable |
| Update all hearings | Apply shared values to every hearing in scope, regardless of result status. Continue to the normal next step, or original review if editing from review. | Visible button text. | Not applicable |
| Revert to original details | Restore original shared values and return to Hearing information. | Visible link text. | Not applicable |

### Page-specific errors

No form fields. Do not apply proposed shared edits before confirmation. Cancelling a wider result draft does not undo a previously confirmed shared update affecting other hearings.

## 9. Hearing outcome — Application only

Route reference: `/record-results/:id/application/outcome`  
Caption: **Record results**; H1: **Hearing outcome**  
Screenshot placeholder: _Application outcome options_.

| Field | Component and rules | Accessible name / ARIA | Field-specific error |
| --- | --- | --- | --- |
| What was the outcome of the hearing? | Required radios: `Add or amend order terms`; `No order terms to add or amend`. | Group legend and labelled options. | `Select the outcome of the hearing` |

- Add or amend order terms → Existing order details. At least one term must exist when completing this route. If none exist, start the add-term journey.
- Existing terms may be accepted unchanged; the user does not have to make an amendment.
- No order terms to add or amend → initial blank result selector; at least one result is required before submission.
- Back → Hearing information. Enforcement bypasses Hearing outcome.

### Page-specific errors

No additional errors beyond the missing outcome selection. Retain the user's selection after any validation error.

## 10. Existing order details and term subjourneys

Route reference: `/record-results/:id/application/order-terms` (summary); `/record-results/:id/application/order-details` (order-details edit).  
Caption: **Record results**; H1: **Existing order details**  
Screenshot placeholders: _Existing terms_; _No terms/add-term entry_; _Updated proposal with success alert_.

Show order details, individual term cards, Interest and indexation, and Managing payments. Display proposed edits without applying them to the live account.

| Element | Rules and navigation | Accessible name / ARIA | Field-specific error |
| --- | --- | --- | --- |
| Order details summary | Application code/description, Court that made the order, Date order made, Payment frequency, Date arrears last updated. | Standard summary list semantics. | Not applicable |
| Change — Order details | Populated single-page edit → Save changes → invoking summary/review. | `Change order details`. | Reuse the existing order-details field errors. |
| Add terms | Place before term cards. Order selection → term details → creditor details → Check your answers → Save → invoking summary/review. | Visible `Add terms` text. | Reuse existing add-term validation. |
| Change — selected term | Term details → creditor details → Check your answers → Save changes → invoking summary/review. Preserve the selected term's identity even if display ordering changes. | `Change [term type] [identifying context]`. | Reuse existing term-specific errors. |
| Creditor account link | Opens the creditor account. | `View creditor account [number] for [name]`. | Not applicable |
| Interest and indexation / Managing payments | Populated amendment journeys. Within the initial order journey, save returns to Existing order details. Review-entry detours are documented under dependencies. | Specific Change link context. | Reuse the corresponding existing form validation. |
| Continue | At least one term required on the order route. Continue to the optional further-results question. | Visible button text. | Do not allow completion of an empty order route. |

Success alerts after saving: `Order details updated`, `Order terms added`, `Order terms updated`, `Interest and indexation updated`, `Managing payments updated`. Show once at the actual return destination.

### Page-specific errors

The summary has no editable fields. Field-specific order/term rules remain owned by the existing order specifications; this document does not invent additional limits. The order-route minimum of one term must be enforced before submission.

## 11. Add results — initial recording journey

Route reference: `/record-results/:id/:category/add-result`  
Caption: **Record results**; H1: **Add results**  
Screenshot placeholders: _Initial blank selector_; _Optional further-results question_; _Results added with question_.

| Entry state | Display | Continue behaviour |
| --- | --- | --- |
| Application without order route; Enforcement; no results yet | Blank Select a result control. | Select a code → Result details. |
| Application order route with terms; no results yet | `Do you have any more results to add for this case?` Yes/No radios. Yes reveals a blank result selector. | Yes and selected code → Result details; No → review. |
| One or more results added | Result cards with Change and Remove, followed by the further-results question. | Yes → blank selector then details; No → review. |

Duplicate result codes are allowed. Treat each entry as a separate result. After adding a result in this initial journey, return to Add results with the updated cards and further-results question.

| Field / link | Component and rule | Accessible name / ARIA | Field-specific error |
| --- | --- | --- | --- |
| Select a result | Supported autocomplete/select, blank for each new result; choices from reference data. Required when adding. | Explicit label, no placeholder-only label. | `Select a result` |
| Do you have any more results to add for this case? | Required Yes/No selection when this question is displayed. | Group legend and conditional association to selector. | `Select whether you have any more results to add for this case` |
| Change | Opens selected result's prefilled Result details directly; no code-selection step. | `Change [code and description], result [position]`. | Not applicable |
| Remove | Opens confirmation for that entry. | `Remove [code and description], result [position]`. | Not applicable |

### Page-specific errors

Do not require the result selector when the user chooses No. Do not require an answer to the further-results question when using the standalone selector from review, because that question is not displayed there.

## 12. Result details — reusable, code-driven form

Route reference: `/record-results/:id/:category/result-details`  
Caption: **Record results**; H1: **[Result code] – [Result description]**  
Screenshot placeholders: _Code-specific add form_; _Prefilled edit form_; _MADJ hearing details_; _Validation errors_.

There are no permanent result-specific fields shared by every result. The workbook defines each code's field labels, grouping, order, hints, options, optional/required status and validation. Do not add a generic Reason field to codes that do not define one.

| Configured type | Component and validation | Accessible name / ARIA | Field-specific error pattern |
| --- | --- | --- | --- |
| Date | MOJ date picker; valid calendar date in DD/MM/YYYY. A newly scheduled hearing may be in the future. | Associated label, hint and error; component date-picker semantics. | `Enter [field]`; `[Field] must be in the format DD/MM/YYYY`; `Enter a valid [field]` |
| Decimal, maximum 2 decimal places | GOV.UK input; configured unit/prefix, bounds and precision. Do not assume remission's exact precision rule applies to every decimal field. | Associated label/hint/error. | `Enter [field]`; `Enter [field] using no more than 2 decimal places`; configured bound error. |
| Integer | GOV.UK input; whole number and configured bounds. | Associated label/hint/error. | `Enter [field]`; `[Field] must be a whole number`; configured bound error. |
| Menu: select/autocomplete | Standard select/autocomplete from configured choices. | Accessible combobox/select semantics. | `Select [field]` |
| Menu: one choice, fewer than 6 options | GOV.UK radios. | Fieldset legend and labelled options. | `Select [field]` |
| Menu: multiple choices | GOV.UK checkboxes; configured minimum/maximum selection if defined. | Fieldset legend and labelled options. | `Select [field]`; configured selection-limit error. |
| Text, maximum 60 characters | GOV.UK single-line input. | Label plus hint/error association. | `Enter [field]`; `[Field] must be 60 characters or fewer` |
| Text, maximum 1,000 characters | GOV.UK character-count textarea. | Label plus counter/error association. | `Enter [field]`; `[Field] must be 1,000 characters or fewer` |

These are component/error patterns, not a substitute for the missing per-code workbook mapping. Exact field wording must be populated from that source.

### New-hearing fields where configured

| Field | Rule | Accessible name / ARIA | Field-specific error |
| --- | --- | --- | --- |
| Court | Required; unselected for a newly added result. Prefill the stored value when changing an existing result. | Label associated with select/autocomplete. | `Select a court` |
| Hearing venue (optional) | Optional text input unless the code configuration defines otherwise. | Visible label. | Configured type/length error only. |
| Hearing date | Required valid date; future dates allowed. | MOJ date picker. | `Enter a hearing date`; `Date must be in the format DD/MM/YYYY`; `Enter a valid hearing date` |
| Hearing time (optional) | Compact GOV.UK width-5 input. Only 24-hour HH:MM: 00:00–23:59. Reject 14.30, 2:30, 24:00 and invalid minutes. | Label and hint `For example, 14:30`. | `Enter a hearing time in the format HH:MM` |

Every hearing created by a result belongs under Applications, including when the originating hearing was Enforcement. There is no limit on the number of Application hearings created. Process each configured new-hearing result; do not retain only the first proposed hearing. Creation happens on validation, not draft save or submission.

### Add/edit return behaviour

| Entry | Action | Destination |
| --- | --- | --- |
| Initial Add results | Continue with valid details | Initial Add results, updated card list and further-results question. |
| Add results button on review | Standalone blank selector → Result details → Continue | Original review, with the additional result. No existing cards or further-results question on the standalone selector. |
| Change beside a result on review | Open details directly, prefilled → Save changes | Original review, updating that entry without duplication. |
| Change beside a result on initial Add results | Open details directly, prefilled → Save changes | Initial Add results, with `Result updated` success alert. |

Back returns within the add/edit context; it does not save unsubmitted edits. Cancel follows the context-sensitive cancellation rules below.

### Page-specific errors

Validate only configured fields. Missing optional values do not fail validation. Time punctuation is part of the valid HH:MM format, so do not use “Enter only numbers” for a valid colon. Keep the user on the form with values preserved when errors exist.

## 13. Remove result

Route reference: `/record-results/:id/:category/remove-result/:index`  
H1: **Are you sure you want to remove this result?**  
Screenshot placeholders: _Confirmation_; _Review after removal_; _Review with No results_.

Show the selected result's code, description and applicable details. Remove only that entry, including when another entry has the same code.

| Action | Behaviour | Accessible name / ARIA | Field-specific error |
| --- | --- | --- | --- |
| Yes - remove | Remove the selected draft result; return to the invoking review or initial Add results screen. Show `Result removed` once with MOJ dismissible success alert. | Visible confirmation button text. | Not applicable |
| No - go back | Return to invoking screen without removing anything or showing a success message. | Context identifies the destination. | Not applicable |

When invoked from review, removing the last result returns to review with **No results** and **Add results**. Do not redirect to Add results on removal. Submission eligibility remains governed by the result requirement matrix.

### Page-specific errors

No editable fields. If the selected result no longer exists, do not remove another result by accident. Return to the invoking result list/review; stale-entry message wording is a remaining content dependency.

## 14. Check and submit for validation

Route reference: `/record-results/:id/:category/review`  
Caption: **Record results**; H1: **Check and submit for validation**  
Screenshot placeholders: _Application with terms_; _Application without order route_; _Enforcement_; _No results_; _Submission error_.

Show the inset text **The account will not change until a checker validates the result.** The shared-personnel confirmation separately explains its immediate effect.

| Section / control | Rules | Accessible name / ARIA | Field-specific error |
| --- | --- | --- | --- |
| Review history | Show existing submissions/rejections and rejection reasons where applicable, using MOJ timeline. | Heading `Review history`; semantic timeline. | Not applicable |
| Hearing information | Court, Hearing date, linked party accounts/names, Hearing type, Judiciary, Legal adviser and named attendance question. Remission summary for Enforcement only. | Standard summary semantics; contextual party links. | Not applicable |
| Order details / Order terms | Application order-route proposal. Add terms precedes cards; each term has a Change link. | Unique Change link names include identifying term context. | Existing order field errors belong to edit forms. |
| Additional order information | Relevant Interest and indexation and Managing payments summaries. | Contextual Change links. | Existing edit-form errors. |
| Results | Add results precedes result cards. Each result has Change and Remove. Empty text is exactly `No results`, with no empty-state Change link. | Unique action names distinguish duplicate result codes. | See page-specific submission errors. |
| Submit for validation | Validate route requirements; set status Validation pending and submit the proposal to checker queue. | Visible button text. | Do not submit an incomplete proposal. |

Successful submission returns to **Outstanding hearings**, retaining court/date filters, with **Hearing resulted and pending validation.** as a one-time dismissible success alert. If entry was from account details, the agreed submission destination is still Outstanding hearings; cancellation has a different rule.

### Review edit routes

| Review action | Route through screens | Save destination |
| --- | --- | --- |
| Hearing information: Change | One prefilled page; shared-details confirmation if applicable. | Original review. |
| Order details: Change | One prefilled page; Save changes. | Original review. |
| Order term: Change | Term details → creditor details → Check your answers → Save changes. | Original review. |
| Add terms | Order selection → term details → creditor details → Check your answers. | Original review. |
| Add results | Standalone blank selector → code-specific Result details. | Original review. |
| Individual result: Change | Selected result's prefilled details directly → Save changes. | Original review. |
| Individual result: Remove | Confirmation → Yes - remove. | Original review, including when no results remain. |

### Page-specific errors

A mandatory-result hearing with No results cannot be submitted. The current prototype redirects to Add results on Submit; a review-page error summary linked to Add results would be a content/interaction improvement, not an already agreed exact message. The review itself must remain accessible before submission with an empty Results section.

At least one order term must be present for the Application order route. Do not apply any proposed order changes or create proposed hearings at this stage.

## 15. Cancellation and return context

Remember the journey's original entry point separately from any local review-edit return point.

| Context | Confirmed Cancel | Decline cancellation |
| --- | --- | --- |
| Recording started from Outstanding hearings | Discard the unsaved hearing-result draft and proposed order changes. Return to Outstanding hearings with court/date filters retained. | Stay on the current page with entries intact. |
| Recording started from account details | Discard the unsaved hearing-result draft and proposed order changes. Return to the originating account details screen. Preserve the originating tab where available. | Stay on the current page. |
| Local edit/add opened from review | Discard only the current unsaved local operation. Preserve the rest of the draft and return to the original review. | Stay on the edit form. |
| Checker Cancel | Leave without recording a decision and return to the checker worklist. | No proposed result changes are applied. |

Cancel accessible text identifies the real destination, for example `Cancel and return to review`, rather than always saying Outstanding hearings. Use the existing leave-confirmation pattern. Confirmed result removal is separate from cancelling an unsaved edit.

## 16. Validate results — checker worklist

Route reference: `/validate-results`  
H1: **Validate results**  
Screenshot placeholders: _To review_; _Rejected_; _Validation success_; _Rejection success_.

Current prototype baseline: tabs **To review** and **Rejected**. No Validated tab. Keep primary navigation. Columns: Respondent account, Applicant account, Court, Hearing date, Submitted by, Action. Do not include Hearing type. All displayed headers are sortable, with the same accessible sorting treatment as Resulting. The existing checker default is newest hearing date first; the agreed oldest-first rule applies to Outstanding hearings.

View result opens the selected hearing result. Party account links remain separate from this action. Paginate after 25 rows.

### Page-specific errors

No input validation on the list. Empty queues are normal informational states. Exact empty-state copy remains a dependency.

## 17. Review hearing result — checker and submitted inputter views

Route references: checker `/active-case/:id/:category/validate-result`; inputter `/my-results/:id/:category`.  
H1: **Review hearing result**  
Screenshot placeholders: _Checker pending review_; _Inputter pending read-only_; _Rejected review/history_; _Rejection reason expanded_.

Show status, Review history, hearing information, proposed orders where applicable, and result cards. Party account numbers are links above LASTNAME, Firstname. The checker does not have inputter Change/Add/Remove controls. An inputter's Validation pending view is read-only.

| Field | Component and rules | Accessible name / ARIA | Field-specific error |
| --- | --- | --- | --- |
| Select review decision | Required radios: `Validate hearing result`; `Reject hearing result`. Only shown for a pending result in checker mode. | Fieldset legend and labelled options. | `Select a review decision` |
| Enter reason for rejection | Conditional GOV.UK character-count textarea when Reject selected. Required; current prototype limit 255 characters. | Associated label, counter and inline error. | `Enter a reason for rejection`; `Reason for rejection must be 255 characters or fewer` |

Current prototype action is **Submit**. Figma still includes Continue in a checker frame; reconcile this wording during design tidy-up rather than treating the mismatch as an agreed new step.

### Validation and rejection effects

- Validate: apply proposed order changes and remission; create every proposed Application hearing; record validation in history; remove the submission from the pending queue. Return to Validate results with **Hearing result validated. Account changes have been applied.**
- Reject: retain the proposal for correction, set Result rejected and add the reason to Review history. Do not apply proposed changes. Return to Validate results with **Hearing result rejected and returned to the inputter.**
- Both success alerts are one-time dismissible MOJ success alerts.

### Page-specific errors

Retain the chosen decision and reason on error. If the hearing is no longer Validation pending, do not apply another decision based on the stale screen. Stale-state message wording and concurrent-checker behaviour remain outside the agreed prototype decisions.

## 18. Correct and resubmit a rejected result

Enter from personal Rejected, All rejected results or Outstanding hearings. Show the rejection reason in Review history, the proposed data and the same inputter editing routes described above. All rejected results supports correction of submissions originally entered by another team member.

Add results and Change return to the rejected review that opened them, not the new-result Check and submit page. Results can be removed through confirmation; an empty review remains accessible, subject to the submission matrix. Proposed order changes remain unapplied until validation.

Submit for validation returns the result to Validation pending and retains the review history. Use the same submission destination and retained court/date context as the recording journey. Preservation of the all-rejected origin for Back navigation is separate from submission destination.

Screenshot placeholders: _Rejected editable review_; _Corrected result_; _Resubmitted status/history_.

### Page-specific errors

Apply the same submission eligibility rules as a new hearing result. Do not lose rejection history when preparing the editable draft or resubmitting it.

## 19. Acceptance checks

1. Resulting has only Validation pending and Rejected; Action sorts; All rejected results includes other users' submissions.
2. Outstanding hearings retains primary navigation, filters independently by court/date, paginates at 25, and defaults to date/court/respondent surname ascending.
3. Status determines action consistently: Record result for Result pending; View result for pending validation/rejected.
4. Judiciary is required and limited to 250; Legal adviser is optional with the magistrates hint. Enforcement alone displays remission.
5. Shared edits require confirmation, including when opened from review, and affect already validated hearings at the same court/date.
6. Remission accepts 500/500.00/500.50, rejects 500.5, zero and amounts above total account arrears.
7. Existing terms can continue unchanged. Application order route has at least one term but may have no manually added results.
8. Duplicate result codes remain distinct. Change edits only the selected entry; Remove removes only that entry.
9. Review Add results opens the standalone blank selector; Change opens prefilled details directly; successful saves return to the invoking review.
10. Removing the last result on review stays on review, shows No results/Add results and a dismissible one-time Result removed alert. Mandatory-result submission remains blocked.
11. A new result's court is blank; an existing result's court is retained when edited. Time accepts only valid 24-hour HH:MM and uses a compact input.
12. Multiple new hearings are all created under Applications on validation; no first-result-only truncation occurs.
13. Cancel returns to the original journey entry and discards the draft; local review Cancel discards only the local edit. A confirmed shared update is not rolled back.
14. Submission returns to filtered Outstanding hearings; inputter pending is read-only. Validation applies proposals; rejection does not; history remains visible.
15. Missing data, link context, keyboard behaviour, error focus, conditional controls, pagination and screen-reader sorting announcements receive manual checks.

## 20. Dependencies, design tidy-up and prototype differences

These items must remain visible when handing this specification to delivery teams. They are not evidence that the corresponding behaviour has already been implemented.

| Item | Status / required work |
| --- | --- |
| Result-code workbook | Required to complete per-code fields, options, validation, bounds and hearing-creation mapping. Current prototype has a simplified Reason/MADJ form, not the full configurable catalogue. |
| Outstanding hearings naming and tie-break sorting | Agreed target; reconcile prototype headings, navigation and date/court/surname ordering. |
| Shared details confirmation from review | Agreed target; the reviewed prototype bypassed confirmation for review-entry edits. Also update confirmation text to state that validated hearings are included. |
| Remission amount bounds | Agreed target; existing prototype decimal syntax alone does not enforce positive value and total-arrears maximum. |
| Multiple created Application hearings | Agreed target; reviewed submission/validation code retained only one proposed hearing and needs extension. |
| Cancellation snapshots and origin | Agreed target; global leave confirmation alone does not establish draft discard, local rollback or return-to-entry semantics. |
| Review removal | Check and submit now supports last-result removal without redirecting away. Apply consistent controls/return behaviour to the rejected inputter review as needed. |
| Interest/indexation and Managing payments from review | Existing prototype detour: save → Existing order details → Add results → Check and submit. A direct return for these two sections was not separately agreed; do not silently claim it. |
| Empty states and some exact errors | Proposed/unspecified copy is identified in the relevant sections. Confirm copy without changing the already agreed business rules. |
| Legal adviser and rejection-reason limits | 250 and 255 respectively are existing prototype baselines, not additional decisions from the 32-point review. Confirm if service rules differ. |
| Personal/checker queue sort defaults | Newest-first is existing prototype behaviour; initial/tie-break rules for those queues were not explicitly agreed. |
| Figma | Add missing Add terms/Add results/Remove controls and empty variants; standardise currency, Legal adviser spelling, attendance context, sorting samples and success/cancellation states. The review route map has already been updated for Add, Change and Remove. |
| External order specifications | Existing order-form field rules are referenced rather than reproduced without verification. No external Confluence pages or original BA files were modified to create this document. |

## 21. Traceability to the agreed decisions

| Decisions | Specification coverage |
| --- | --- |
| 1–4: tabs, Action sort, all rejected, Resulting name | Sections 4–5 |
| 5–7: Outstanding hearings name and ordering | Section 6 |
| 8–12: shared personnel, validated scope, review confirmation, optional Legal adviser, Judiciary limit | Sections 7–8 |
| 13–14: remission range and whole pounds/exact two-decimal input | Section 7 |
| 15–17: unchanged terms, optional results on order route, mandatory results elsewhere | Sections 3, 9–11, 14 |
| 18–22: duplicate codes, multiple Application hearings, future date, HH:MM, blank new court | Sections 11–12 |
| 23–24: review return routes, Add buttons, No results | Section 14 |
| 25–28: submit destination, origin-aware Cancel, discard draft/local edit | Sections 14–15 |
| 29–30: account/name display, Review history, Validate hearing result | Sections 2, 14, 17 |
| 31–32: workbook-driven fields, standalone Add, direct prefilled Change | Sections 11–12, 14 |
| Subsequent refinements: field sizing, review Remove, empty review | Sections 7, 12–14 |
