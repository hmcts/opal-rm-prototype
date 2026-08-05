# View and amend orders QA differences

Compared against the RM write-ups in `/Users/douglasmaitland/Downloads` on 14 July 2026.

## Summary

The prototype broadly contains the journeys described in the write-ups for the Orders tab, changing order details, adding and amending order terms, viewing previous terms, changing interest and indexation, and changing managing payments.

The main gaps are validation, route-guard behaviour, the "use this creditor for all order terms" option, and parts of the amend-order-term creditor journey.

## Findings

| Area | Write-up says | Prototype behaviour | Difference |
| --- | --- | --- | --- |
| Orders tab: previous terms link | "View previous terms" opens in a new window and ARIA text says it opens in a new window. | The link opens in the same window. Creditor account links open in a new window. | Mismatch with `Orders tab.md` and `View previous order terms.md`. |
| Change order details: court and order date | Court and date order made are mandatory. | On active accounts, both labels include "(optional)" and validation allows them to be blank. | Mismatch with `Change order details.md`. |
| Change order details: future date errors | Future dates should show "Date cannot be in the future". | Validation text is "Future dates are invalid". | Content mismatch. |
| Change interest and indexation | Interest and indexation selections are mandatory, with error messages if missing. | Posting the form with no selections redirects back to the Orders tab and saves blanks. | Missing validation and error summary. |
| Change managing payments | Payment arrangement is mandatory, with "Select payment arrangement" if missing. | Posting the form with no selection redirects back to the Orders tab and saves a blank value. | Missing validation and error summary. |
| Add order terms: no selection | Error should be "Select an order". | Error is "Select an order term from the list." | Content mismatch. |
| Add/amend order term details validation | Decimal, date format, two-decimal-place, child DOB, and character validation should be enforced. | The dynamic field validation mainly checks required fields and text length. Dates and decimal formats are not fully validated against the write-up rules. | Missing validation. |
| Select creditor: major creditor | If "Major creditor" is selected, selecting the major creditor name is mandatory. | Selecting "Major creditor" with no name continues to the review page and labels the creditor as "Major creditor". | Missing validation. |
| Select creditor: apply to all | Write-up includes "Use this creditor for all order terms". | No checkbox is shown in the creditor screen or minor-creditor-added state. | Missing feature. |
| Amend order terms: add new minor creditor | The select-creditor screen is shared by add and amend journeys, including "Add a new minor creditor". | In the amend journey, selecting "Add new minor creditor" shows "Select a creditor" instead of starting the add-minor-creditor sub-journey. | Amend path is incomplete. |
| Add minor creditor validation | Minor creditor type, names, address, and bank details have required and format errors. | The add-minor-creditor route stores submitted values without validation. | Missing validation. |
| Cancel behaviour | If the user has started entering information, cancel should show a route guard. | Cancel links return to the Orders tab or clear the add-order-term state without a route guard. | Missing route guard across these journeys. |
| Review order terms changes | Add journey button should be "Submit"; amend journey button should be "Save changes". | Add journey uses "Add order terms"; amend journey uses "Save changes". | Add journey button text mismatch. |

## Confirmed matches

- Orders tab exists at `/active-case/{caseId}?tab=orders`.
- Order details, order terms, interest and indexation, managing payments, and Actions panel are present.
- Payment frequency is edited from order details and displayed read-only in order-term detail screens.
- Add order terms stores a pending term and redirects through details, creditor where required, and review.
- Remove pending minor creditor shows a success banner "Minor creditor removed." on the creditor screen.
- View previous terms uses a sortable table, includes current and closed rows, and creditor account links open in a new window.
- Success messages exist for order details, add order terms, amend order terms, interest and indexation, and managing payments.

## Verification

I ran the prototype locally at `http://localhost:3000` and checked the active-account order pages using case IDs 5 and 8.

