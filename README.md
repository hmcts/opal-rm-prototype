# Opal RM Prototype

This repository contains a GOV.UK Prototype Kit prototype for an `Opal RM` case creation journey.

It uses:

- [GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk/)
- [GOV.UK Frontend](https://frontend.design-system.service.gov.uk/)
- [GOV.UK Prototype Components](https://govuk-prototype-components.x-govuk.org/)
- [MOJ Frontend](https://design-patterns.service.justice.gov.uk/)

## What this prototype does

The prototype demonstrates a multi-page flow for creating and reviewing a case, including:

- case type selection
- applicant and respondent details
- order and application details
- hearing details
- review and submission pages

Prototype data is stored in the session only. There is no database or persistent backend.

## Run the prototype locally

1. Install dependencies:

```bash
npm install
```

2. Start the prototype:

```bash
npm run dev
```

3. Open the local URL shown in the terminal, usually:

```text
http://localhost:3000
```

## Where to make changes

- Views: `app/views/`
- Routes and journey logic: `app/routes.js`
- Default session data: `app/data/session-data-defaults.js`
- Filters: `app/filters.js`
- Front-end JavaScript: `app/assets/javascripts/application.js`
- Styles: `app/assets/sass/application.scss`

## Working principles

- Prefer GOV.UK Design System, GOV.UK Prototype Components, and MOJ Design System components.
- Use Nunjucks macros instead of handwritten component markup where possible.
- Check GOV.UK Prototype Components before creating custom prototype-only UI patterns.
- Keep changes lightweight and easy to iterate on.
- Treat this as a prototype, not a production service.

## Useful scripts

- `npm run dev` - run the prototype in development mode
- `npm run serve` - serve the prototype
- `npm start` - start the prototype

## Licence

See `LICENCE.txt`.
