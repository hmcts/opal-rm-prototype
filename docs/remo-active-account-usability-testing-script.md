# REMO Active Account Usability Testing Script

## Session Setup

Prototype URL: `http://localhost:3050`

Start each task from the Search page unless the participant is already on a relevant account page. Ask the participant to think aloud. Do not explain the navigation unless they are blocked and ask for help.

Use the sample data in this script only when the participant needs to enter new or changed information. The search criteria are chosen from records that exist in the prototype.

## Introduction

Thank you for taking part. We are testing the prototype, not you. Some things may not work as you expect, and that is useful for us to learn.

Please say what you are thinking as you work through each task. For example, what you are looking for, what you expect to happen, and anything that feels unclear.

## Warm-Up

Before we start the tasks, please take a moment to look at the Search page.

Prompts:

- What would you do first if you needed to find an account?
- Is anything unclear on this page?

## Task 1: Edit Respondent Details, Authority, Arrears Date, And Comment

### Participant Task

Find the active account for Cem Demir.

On the respondent account, update the third party correspondence address. Then change the central authority, update the date arrears were last updated, and add a comment to the file.

### Search Criteria

Use one of these:

- Respondent last name: `DEMIR`
- Respondent first names: `Cem`
- Account number: `26000060C`

Expected account:

- Respondent account: `26000060C`
- Name: `DEMIR, Cem`
- Case type: `REMO Out`

### Sample Data To Enter

Third party correspondence address:

- Name or organisation: keep as `Demir & Partners Solicitors`
- Relationship: keep as `Solicitor`
- Reference: keep as `CD/2024/001`
- Address line 1: `Level 2`
- Address line 2: `14 West Street`
- Address line 3: `Brighton`
- Address line 4: `East Sussex`
- Postal or zip code: `BN1 2RE`
- Country: `United Kingdom`

Central authority:

- Select central authority: `Central Authority - Australia`
- Central authority reference: `AUS-CSA-2026-387`

Order details:

- Date arrears last updated: `15/06/2026`

Comment:

`Third party correspondence address updated. Central authority changed following new information from Australia. Arrears date updated from latest schedule.`

### Success Criteria

The participant can:

- Find the respondent account from Search.
- Locate where respondent third party details are edited.
- Locate where authority details are edited.
- Locate order details and update the arrears date.
- Add or change the account comment.
- Recognise whether each change has been saved.

### Moderator Prompts

- What made you choose that tab or link?
- Was it clear whether this was respondent, applicant, or order information?
- Did the success message reassure you that the change was saved?

## Task 2: Edit Applicant Address And Add Third Party Address

### Participant Task

Find the active account for Alina Popa. Open the applicant account. Change the applicant address and add a third party correspondence address.

### Search Criteria

Use one of these:

- Applicant last name: `POPA`
- Applicant first names: `Alina`
- Applicant account number: `26000511A`

Expected account:

- Applicant account: `26000511A`
- Name: `POPA, Alina`
- Linked respondent: `POPA, Andrei`

### Sample Data To Enter

Applicant address:

- Address line 1: `22 Willow Court`
- Address line 2: `Newbury`
- Address line 3: `Berkshire`
- Postal or zip code: `RG14 5QP`
- Country: `United Kingdom`

Third party correspondence address:

- Select that correspondence should be sent to a third party.
- Name or organisation: `West Berkshire Family Law`
- Relationship: `Solicitor`
- Reference: `AP/POPA/2026`
- Address line 1: `3 Market Place`
- Address line 2: `Newbury`
- Address line 3: `Berkshire`
- Postal or zip code: `RG14 5AA`
- Country: `United Kingdom`

### Success Criteria

The participant can:

- Find the applicant account from Search.
- Understand that the applicant account opens separately from the respondent account.
- Find the applicant edit journey.
- Update the applicant address.
- Add third party correspondence details.
- Save and return to the applicant account.

### Moderator Prompts

- Did you expect the applicant account to open in a new tab?
- Was it clear where to edit applicant details?
- Was the third party correspondence section easy to find?

## Task 3: Change Minor Creditor Name And Add Note

### Participant Task

Find the active account for the minor creditor Mira Popa. Change the minor creditor name and add a note explaining why the name has changed.

### Search Criteria

Use one of these:

- Minor creditor last name: `POPA`
- Minor creditor first names: `Mira`
- Minor creditor account number: `26000522C`

Expected account:

- Minor creditor account: `26000522C`
- Name: `POPA, Mira`
- Linked respondent: `POPA, Andrei`

### Sample Data To Enter

Minor creditor name:

- First names: `Mira Elena`
- Last name: `POPA`

Account note:

`Minor creditor first names updated to match updated birth certificate provided by the applicant.`

### Success Criteria

The participant can:

- Find a minor creditor using Search.
- Identify that they are on a minor creditor account.
- Find where to edit creditor details.
- Change the name.
- Add an account note.
- Check that the note is available in history and notes.

### Moderator Prompts

- Was it clear this was a minor creditor rather than the applicant or respondent?
- Did you know where to add the reason for the name change?
- Did the history and notes area behave as expected?

## Task 4: View Major Creditor Details

### Participant Task

Find and view the details for the major creditor linked to the Demir case.

### Search Criteria

Use:

- Major creditor: `Central Authority - Australia`

Expected account:

- Major creditor account: `26000623R`
- Name: `Australian Child Support Agency`
- Case reference: `06000387W`

### What To Observe

Ask the participant to tell you:

- The major creditor name.
- The address shown.
- Whether BACS details have been provided.
- The amount awaiting payout.

Expected details:

- Name: `Australian Child Support Agency`
- Address: `Level 3, Centrepoint Tower, Sydney, NSW 2000, Australia`
- BACS details: `PROVIDED`
- Awaiting payout: `£180.00`

### Success Criteria

The participant can:

- Find the major creditor search field.
- Search using the major creditor criterion.
- Recognise they have landed on a major creditor account.
- Find the main details and payout status.

### Moderator Prompts

- Was it obvious how to search for a major creditor?
- Did the result page provide enough context about the linked case?
- What else would you expect to see on a major creditor account?

## Task 5: Complete Penny Account Order Details And Add Lump Sum Terms

### Participant Task

Find the active account for James Carter.

The account was set up as a penny account because the court paperwork was not available at the time. The paperwork has now arrived. Update the draft order details and existing order terms with the missing information, then add the lump sum order terms.

### Search Criteria

Use one of these:

- Respondent last name: `CARTER`
- Respondent first names: `James`
- Respondent account number: `26000008R`

Expected account:

- Respondent account: `26000008R`
- Name: `CARTER, James`
- Case type: `REMO Out`
- Applicant: `CARTER, Helen`

### Sample Data To Enter

Order details:

- Court that made the order: `Reading Family Court`
- Date the order was made: `22/06/2026`
- Payment frequency: `Monthly`

Existing order terms:

- MAT amount: `250.00`
- MCHILD amount for Emily Carter: `175.00`
- MCHILD amount for Oliver Carter: `175.00`
- Payment arrangement: keep as `payable through the Court`
- Respondent: keep as `James Carter`
- Creditor: keep as `Helen Carter`
- Child dates of birth: keep the existing values

New lump sum order terms:

- Order term: `MLUMP - Lump Sum Payment`
- Amount: `1200.00`
- Creditor: `Helen Carter`
- Respondent: `James Carter`
- Payment arrangement: `payable through the Court`
- Reason for payment: `Lump sum ordered by the court to clear costs owed to the applicant.`
- Date payment due by: `31/07/2026`

### Success Criteria

The participant can:

- Find the respondent account from Search.
- Recognise that the current order values are draft penny amounts.
- Find where to change the court, order date, and payment frequency.
- Update the existing MAT and MCHILD order terms from penny values to the court paperwork values.
- Find and use Add order terms.
- Select and add MLUMP lump sum order terms.
- Review the order terms before adding them.
- Recognise whether the updated and added order terms have been saved.

### Moderator Prompts

- Was it clear that the penny amounts needed changing rather than deleting?
- Where did you expect to update the payment frequency?
- Was Add order terms easy to find from the Orders tab?
- Did MLUMP make sense as a label for the lump sum payment?
- Did the review page give you enough confidence before adding the lump sum order terms?

## Wrap-Up Questions

- Which task felt easiest?
- Which task felt hardest?
- Were any labels or tabs unclear?
- Did opening account numbers in new tabs help or get in the way?
- Was it clear when you were editing respondent, applicant, minor creditor, order, authority, or comment information?
- What would you change before this was tested with more users?

## Notes Template

Participant:

Date:

Moderator:

Prototype version or branch:

Task 1 notes:

Task 2 notes:

Task 3 notes:

Task 4 notes:

Task 5 notes:

Overall observations:
