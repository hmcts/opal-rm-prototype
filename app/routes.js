//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const caseTypeLabels = {
  'remo-in': 'REMO In',
  'remo-out': 'REMO Out',
  'remo-out-cms': 'REMO Out (CMS)'
}

const applicantTypeLabels = {
  individual: 'Individual',
  organisation: 'Organisation'
}

const titleLabels = {
  mr: 'Mr',
  mrs: 'Mrs',
  ms: 'Ms',
  miss: 'Miss',
  dr: 'Dr'
}

const countryLabels = {
  latvia: 'Latvia',
  poland: 'Poland',
  'united-kingdom': 'United Kingdom'
}

const applicationDefinitions = {
  '29014': {
    title: 'Maintenance Orders Reciprocal Enforcement Act 1972',
    wordingTemplate:
      'Application to register a maintenance order made by {{foreignCourt}} on {{orderDate}}.'
  }
}

function redirectWithSessionSave(req, res, next, location) {
  return req.session.save((err) => {
    if (err) {
      return next(err)
    }

    return res.redirect(location)
  })
}

function hasValue(value) {
  return typeof value === 'string' ? value.trim() !== '' : Boolean(value)
}

function asArray(value) {
  if (Array.isArray(value)) {
    return value
  }

  return value ? [value] : []
}

function getSingleValue(value) {
  if (Array.isArray(value)) {
    const firstPopulatedValue = value.find((item) =>
      typeof item === 'string' ? item.trim() !== '' : Boolean(item)
    )

    return firstPopulatedValue || ''
  }

  return value
}

function hasCompletedPartyDetails(sessionData) {
  return Boolean(
    sessionData['applicant-details-completed'] &&
      sessionData['respondent-details-completed']
  )
}

function hasCompletedOrderDetails(sessionData) {
  return Boolean(sessionData['order-details-completed'])
}

function hasCompletedApplicationDetails(sessionData) {
  return Boolean(sessionData['application-details-completed'])
}

function hasCompletedHearingDetails(sessionData) {
  return Boolean(sessionData['hearing-details-completed'])
}

function isRemoOutCase(sessionData) {
  return sessionData['case-type'] === 'remo-out'
}

function getMinorCreditors(sessionData) {
  return Array.isArray(sessionData['minor-creditors'])
    ? sessionData['minor-creditors']
    : []
}

function hasMinorCreditors(sessionData) {
  return getMinorCreditors(sessionData).length > 0
}

function getTermsPerBeneficiary(sessionData) {
  return Array.isArray(sessionData['terms-per-beneficiary'])
    ? sessionData['terms-per-beneficiary']
    : []
}

function hasTermsPerBeneficiary(sessionData) {
  return getTermsPerBeneficiary(sessionData).length > 0
}

function hasCompletedLumpSumPayment(sessionData) {
  return Boolean(sessionData['lump-sum-payment-completed'])
}

function hasCompletedInterestAndIndexation(sessionData) {
  return Boolean(sessionData['interest-and-indexation-completed'])
}

function hasCaseCommentsAndNotes(sessionData) {
  return hasValue(sessionData['case-comment']) || hasValue(sessionData['case-notes'])
}

function hasCentralAuthorityManualDetails(sessionData) {
  return Boolean(
    hasValue(sessionData['central-authority-manual-name']) ||
      hasValue(sessionData['central-authority-main-email-address']) ||
      hasValue(sessionData['central-authority-main-telephone-number']) ||
      hasValue(sessionData['central-authority-address-line-1']) ||
      hasValue(sessionData['central-authority-bank-account-type'])
  )
}

function hasCentralAuthorityDetails(sessionData) {
  return Boolean(
    hasValue(sessionData['central-authority-remo-reference']) ||
      hasValue(sessionData['central-authority-reference']) ||
      hasValue(sessionData['central-authority-name']) ||
      hasCentralAuthorityManualDetails(sessionData)
  )
}

function getTermsIndex(indexParam, sessionData) {
  const index = Number(indexParam)
  const terms = getTermsPerBeneficiary(sessionData)

  if (!Number.isInteger(index) || index < 0 || index >= terms.length) {
    return null
  }

  return index
}

function getMinorCreditorIndex(indexParam, sessionData) {
  const index = Number(indexParam)
  const creditors = getMinorCreditors(sessionData)

  if (!Number.isInteger(index) || index < 0 || index >= creditors.length) {
    return null
  }

  return index
}

function buildMinorCreditor(body) {
  return {
    creditorType: body['minor-creditor-type'] || '',
    title: body['minor-creditor-title'] || '',
    firstNames: body['minor-creditor-first-names'] || '',
    lastName: body['minor-creditor-last-name'] || '',
    organisationName: body['minor-creditor-organisation-name'] || '',
    addressLine1: body['minor-creditor-address-line-1'] || '',
    addressLine2: body['minor-creditor-address-line-2'] || '',
    addressLine3: body['minor-creditor-address-line-3'] || '',
    addressLine4: body['minor-creditor-address-line-4'] || '',
    addressLine5: body['minor-creditor-address-line-5'] || '',
    postcode: body['minor-creditor-postcode'] || '',
    bankAccountType: body['minor-creditor-bank-account-type'] || '',
    ukNameOnAccount: body['minor-creditor-uk-name-on-account'] || '',
    ukSortCode: body['minor-creditor-uk-sort-code'] || '',
    ukAccountNumber: body['minor-creditor-uk-account-number'] || '',
    ukPaymentReference: body['minor-creditor-uk-payment-reference'] || '',
    nonUkNameOnAccount: body['minor-creditor-non-uk-name-on-account'] || '',
    nonUkBicOrSwiftCode: body['minor-creditor-non-uk-bic-or-swift-code'] || '',
    nonUkIban: body['minor-creditor-non-uk-iban'] || '',
    nonUkPaymentReference: body['minor-creditor-non-uk-payment-reference'] || '',
    nonUkBankName: body['minor-creditor-non-uk-bank-name'] || '',
    nonUkBranchOfficeOrSortCode:
      body['minor-creditor-non-uk-branch-office-or-sort-code'] || '',
    nonUkAccountNumber: body['minor-creditor-non-uk-account-number'] || ''
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function getMinorCreditorName(creditor, index) {
  if (creditor.creditorType === 'organisation' && hasValue(creditor.organisationName)) {
    return creditor.organisationName
  }

  const fullName = [creditor.firstNames, creditor.lastName].filter(hasValue).join(' ')

  if (hasValue(fullName)) {
    return fullName
  }

  return `Minor creditor ${index + 1}`
}

function getMinorCreditorAddressHtml(creditor) {
  return [
    creditor.addressLine1,
    creditor.addressLine2,
    creditor.addressLine3,
    creditor.addressLine4,
    creditor.addressLine5,
    creditor.postcode
  ]
    .filter(hasValue)
    .map((line) => escapeHtml(line))
    .join('<br>')
}

function getMinorCreditorSummaryRows(creditor) {
  const rows = [
    {
      key: {
        text: 'Address'
      },
      value: {
        html: getMinorCreditorAddressHtml(creditor)
      }
    }
  ]

  if (creditor.bankAccountType === 'uk-bank-account') {
    rows.push(
      {
        key: {
          text: 'Payment method'
        },
        value: {
          text: 'UK bank account'
        }
      },
      {
        key: {
          text: 'Name on account'
        },
        value: {
          text: creditor.ukNameOnAccount
        }
      },
      {
        key: {
          text: 'Sort code'
        },
        value: {
          text: creditor.ukSortCode
        }
      },
      {
        key: {
          text: 'Account number'
        },
        value: {
          text: creditor.ukAccountNumber
        }
      },
      {
        key: {
          text: 'Payment reference'
        },
        value: {
          text: creditor.ukPaymentReference
        }
      }
    )
  } else if (creditor.bankAccountType === 'non-uk-bank-account') {
    rows.push(
      {
        key: {
          text: 'Payment method'
        },
        value: {
          text: 'IBAN'
        }
      },
      {
        key: {
          text: 'Name on account'
        },
        value: {
          text: creditor.nonUkNameOnAccount
        }
      },
      {
        key: {
          text: 'BIC or SWIFT code'
        },
        value: {
          text: creditor.nonUkBicOrSwiftCode
        }
      },
      {
        key: {
          text: 'Account number'
        },
        value: {
          text: creditor.nonUkIban
        }
      },
      {
        key: {
          text: 'Payment reference'
        },
        value: {
          text: creditor.nonUkPaymentReference
        }
      }
    )
  } else {
    rows.push({
      key: {
        text: 'Payment method'
      },
      value: {
        text: 'Cheque'
      }
    })
  }

  return rows
}

function getApplicationDefinition(applicationCode) {
  return applicationDefinitions[String(getSingleValue(applicationCode) || '').trim()] || null
}

function getMinorCreditorCards(sessionData) {
  return getMinorCreditors(sessionData).map((creditor, index) => ({
    title: getMinorCreditorName(creditor, index),
    rows: getMinorCreditorSummaryRows(creditor),
    changeHref: `/minor-creditors/${index}/edit`,
    removeHref: `/minor-creditors/${index}/remove`
  }))
}

function getApplicantFullName(sessionData) {
  return [
    sessionData['applicant-title']
      ? sessionData['applicant-title'].charAt(0).toUpperCase() +
        sessionData['applicant-title'].slice(1)
      : '',
    sessionData['applicant-first-names'],
    sessionData['applicant-last-name']
  ]
    .filter(hasValue)
    .join(' ')
}

function getApplicantCreditorLabel(sessionData) {
  const applicantName = [
    sessionData['applicant-first-names'],
    sessionData['applicant-last-name']
  ]
    .filter(hasValue)
    .join(' ')

  return hasValue(applicantName) ? applicantName : 'Applicant'
}

function getFrequencyLabel(frequency) {
  const labels = {
    weekly: 'Weekly',
    fortnightly: 'Fortnightly',
    monthly: 'Monthly',
    quarterly: 'Quarterly',
    yearly: 'Yearly'
  }

  return labels[frequency] || 'Not provided'
}

function formatCurrency(value) {
  if (!hasValue(value)) {
    return ''
  }

  const number = Number(String(value).replace(/,/g, '').trim())

  if (Number.isNaN(number)) {
    return value
  }

  return `£${number.toFixed(2)}`
}

function formatDateForReview(dateString) {
  dateString = getSingleValue(dateString)

  if (!hasValue(dateString)) {
    return ''
  }

  const parts = dateString.split('/')

  if (parts.length !== 3) {
    return dateString
  }

  const day = Number(parts[0])
  const month = Number(parts[1])
  const year = Number(parts[2])

  if (!day || !month || !year) {
    return dateString
  }

  const date = new Date(year, month - 1, day)

  if (Number.isNaN(date.getTime())) {
    return dateString
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date)
}

function formatDateLong(dateString) {
  dateString = getSingleValue(dateString)

  if (!hasValue(dateString)) {
    return '-'
  }

  const parts = dateString.split('/')

  if (parts.length !== 3) {
    return dateString
  }

  const day = Number(parts[0])
  const month = Number(parts[1])
  const year = Number(parts[2])

  if (!day || !month || !year) {
    return dateString
  }

  const date = new Date(year, month - 1, day)

  if (Number.isNaN(date.getTime())) {
    return dateString
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

function formatTextValue(value) {
  return hasValue(value) ? value : '-'
}

function formatLinesHtml(lines) {
  const filteredLines = lines.filter(hasValue)

  if (!filteredLines.length) {
    return '-'
  }

  return filteredLines.map((line) => escapeHtml(line)).join('<br>')
}

function getCountryLabel(country) {
  return countryLabels[country] || formatTextValue(country)
}

function getTitleLabel(title) {
  return titleLabels[title] || formatTextValue(title)
}

function buildSummaryRow(keyText, valueText) {
  return {
    key: {
      text: keyText
    },
    value: {
      text: formatTextValue(valueText)
    }
  }
}

function buildSummaryHtmlRow(keyText, html) {
  return {
    key: {
      text: keyText
    },
    value: {
      html
    }
  }
}

function getApplicationTitle(sessionData) {
  const definition = getApplicationDefinition(sessionData['application-code'])
  return definition ? definition.title : ''
}

function getApplicationWording(sessionData) {
  const definition = getApplicationDefinition(sessionData['application-code'])

  if (!definition) {
    return ''
  }

  const foreignCourt = hasValue(sessionData['application-foreign-court'])
    ? sessionData['application-foreign-court']
    : '[foreign court]'
  const orderDate = hasValue(sessionData['application-order-date'])
    ? formatDateLong(sessionData['application-order-date'])
    : '[date order made]'

  return definition.wordingTemplate
    .replace('{{foreignCourt}}', foreignCourt)
    .replace('{{orderDate}}', orderDate)
}

function getApplicationSummaryRows(sessionData) {
  return [
    buildSummaryRow('Application code', sessionData['application-code']),
    buildSummaryRow('Application title', getApplicationTitle(sessionData)),
    buildSummaryRow('Application wording', getApplicationWording(sessionData))
  ]
}

function getHearingTypeLabel(hearingType) {
  const labels = {
    'schedule-england-wales': 'Schedule a hearing in England and Wales',
    'non-scheduled': 'Create a non-scheduled hearing'
  }

  return labels[hearingType] || ''
}

function getHearingSummaryRows(sessionData) {
  const hearingType = sessionData['hearing-type']
  const rows = [buildSummaryRow('Hearing type', getHearingTypeLabel(hearingType))]

  if (hearingType === 'schedule-england-wales') {
    rows.push(
      buildSummaryRow('Court', sessionData['hearing-court']),
      buildSummaryRow('Hearing date', formatDateLong(sessionData['hearing-date'])),
      buildSummaryRow('Courtroom number', sessionData['hearing-courtroom-number']),
      buildSummaryRow('Start time', sessionData['hearing-start-time'])
    )

    return rows
  }

  rows.push(
    buildSummaryRow('Court details', sessionData['hearing-non-scheduled-details']),
    buildSummaryRow('Hearing date', formatDateLong(sessionData['hearing-date']))
  )

  return rows
}

function getApplicantSummaryRows(sessionData) {
  const rows = [
    buildSummaryRow('Title', getTitleLabel(sessionData['applicant-title'])),
    buildSummaryRow('First names', sessionData['applicant-first-names']),
    buildSummaryRow('Last name', sessionData['applicant-last-name']),
    buildSummaryRow('Date of birth', formatDateLong(sessionData['applicant-date-of-birth'])),
    buildSummaryRow('Main email address', sessionData['applicant-main-email-address']),
    buildSummaryRow('Other email address', sessionData['applicant-other-email-address']),
    buildSummaryRow(
      'Main telephone number',
      sessionData['applicant-main-telephone-number']
    ),
    buildSummaryRow(
      'Other telephone number',
      sessionData['applicant-other-telephone-number']
    ),
    buildSummaryHtmlRow(
      "Applicant's address",
      formatLinesHtml([
        sessionData['applicant-address-line-1'],
        sessionData['applicant-address-line-2'],
        sessionData['applicant-address-line-3'],
        sessionData['applicant-address-line-4'],
        sessionData['applicant-address-line-5'],
        sessionData['applicant-postal-or-zip-code'],
        getCountryLabel(sessionData['applicant-country'])
      ])
    )
  ]

  if (sessionData['applicant-send-correspondence-to-third-party']) {
    rows.push(
      buildSummaryRow(
        'Third party name',
        sessionData['applicant-third-party-name-or-organisation']
      ),
      buildSummaryRow(
        'Relationship to applicant',
        sessionData['applicant-third-party-relationship']
      ),
      buildSummaryRow('Reference', sessionData['applicant-third-party-reference']),
      buildSummaryHtmlRow(
        'Address',
        formatLinesHtml([
          sessionData['applicant-third-party-address-line-1'],
          sessionData['applicant-third-party-address-line-2'],
          sessionData['applicant-third-party-address-line-3'],
          sessionData['applicant-third-party-address-line-4'],
          sessionData['applicant-third-party-address-line-5'],
          sessionData['applicant-third-party-postal-or-zip-code'],
          getCountryLabel(sessionData['applicant-third-party-country'])
        ])
      )
    )
  }

  rows.push(
    buildSummaryRow(
      'Restrict personal information',
      sessionData['applicant-restrict-personal-information'] ? 'Yes' : 'No'
    )
  )

  return rows
}

function getRespondentSummaryRows(sessionData) {
  const rows = [
    buildSummaryRow('Title', getTitleLabel(sessionData['respondent-title'])),
    buildSummaryRow('First names', sessionData['respondent-first-names']),
    buildSummaryRow('Last name', sessionData['respondent-last-name']),
    buildSummaryRow(
      'Date of birth',
      formatDateLong(sessionData['respondent-date-of-birth'])
    ),
    buildSummaryRow(
      'UK National Insurance number',
      sessionData['respondent-national-insurance-number']
    ),
    buildSummaryHtmlRow(
      'Other personal information',
      formatLinesHtml(
        hasValue(sessionData['respondent-other-personal-information'])
          ? sessionData['respondent-other-personal-information'].split('\n')
          : []
      )
    ),
    buildSummaryRow('Main email address', sessionData['respondent-main-email-address']),
    buildSummaryRow('Other email address', sessionData['respondent-other-email-address']),
    buildSummaryRow(
      'Main telephone number',
      sessionData['respondent-main-telephone-number']
    ),
    buildSummaryRow(
      'Other telephone number',
      sessionData['respondent-other-telephone-number']
    ),
    buildSummaryHtmlRow(
      "Respondent's address",
      formatLinesHtml([
        sessionData['respondent-address-line-1'],
        sessionData['respondent-address-line-2'],
        sessionData['respondent-address-line-3'],
        sessionData['respondent-address-line-4'],
        sessionData['respondent-address-line-5'],
        sessionData['respondent-postal-or-zip-code'],
        getCountryLabel(sessionData['respondent-country'])
      ])
    )
  ]

  if (sessionData['respondent-send-correspondence-to-third-party']) {
    rows.push(
      buildSummaryRow(
        'Third party name',
        sessionData['respondent-third-party-name-or-organisation']
      ),
      buildSummaryRow(
        'Relationship to respondent',
        sessionData['respondent-third-party-relationship']
      ),
      buildSummaryRow('Reference', sessionData['respondent-third-party-reference']),
      buildSummaryHtmlRow(
        'Address',
        formatLinesHtml([
          sessionData['respondent-third-party-address-line-1'],
          sessionData['respondent-third-party-address-line-2'],
          sessionData['respondent-third-party-address-line-3'],
          sessionData['respondent-third-party-address-line-4'],
          sessionData['respondent-third-party-address-line-5'],
          sessionData['respondent-third-party-postal-or-zip-code'],
          getCountryLabel(sessionData['respondent-third-party-country'])
        ])
      )
    )
  }

  rows.push(
    buildSummaryRow(
      'Restrict personal information',
      sessionData['respondent-restrict-personal-information'] ? 'Yes' : 'No'
    )
  )

  return rows
}

function getCentralAuthoritySummaryRows(sessionData) {
  return [
    buildSummaryRow('REMO reference', sessionData['central-authority-remo-reference']),
    buildSummaryRow(
      "Central authority's reference",
      sessionData['central-authority-reference']
    ),
    buildSummaryRow(
      'Central authority name',
      sessionData['central-authority-manual-name'] || sessionData['central-authority-name']
    ),
    buildSummaryRow(
      'Email address',
      sessionData['central-authority-main-email-address']
    ),
    buildSummaryRow(
      'Telephone number',
      sessionData['central-authority-main-telephone-number']
    ),
    buildSummaryHtmlRow(
      'Address',
      formatLinesHtml([
        sessionData['central-authority-address-line-1'],
        sessionData['central-authority-address-line-2'],
        sessionData['central-authority-address-line-3'],
        sessionData['central-authority-address-line-4'],
        sessionData['central-authority-address-line-5'],
        sessionData['central-authority-postal-or-zip-code'],
        getCountryLabel(sessionData['central-authority-country'])
      ])
    ),
    buildSummaryHtmlRow(
      'Payment details',
      getCentralAuthorityPaymentDetailsHtml(sessionData)
    )
  ]
}

function getCentralAuthorityPaymentDetailsHtml(sessionData) {
  if (sessionData['central-authority-bank-account-type'] === 'uk-bank-account') {
    return formatLinesHtml([
      sessionData['central-authority-bank-name-on-account'],
      sessionData['central-authority-bank-account-number'],
      sessionData['central-authority-bank-payment-reference']
    ])
  }

  if (sessionData['central-authority-bank-account-type'] === 'non-uk-bank-account') {
    return formatLinesHtml([
      sessionData['central-authority-bank-non-uk-name-on-account'],
      sessionData['central-authority-bank-iban'],
      sessionData['central-authority-bank-non-uk-payment-reference']
    ])
  }

  if (sessionData['central-authority-bank-account-type'] === 'none') {
    return 'Cheque'
  }

  return '-'
}

function getCentralAuthorityCardRows(sessionData) {
  return [
    buildSummaryRow(
      'Central authority name',
      sessionData['central-authority-manual-name']
    ),
    buildSummaryRow(
      'Email address',
      sessionData['central-authority-main-email-address']
    ),
    buildSummaryRow(
      'Telephone number',
      sessionData['central-authority-main-telephone-number']
    ),
    buildSummaryHtmlRow(
      'Address',
      formatLinesHtml([
        sessionData['central-authority-address-line-1'],
        sessionData['central-authority-address-line-2'],
        sessionData['central-authority-address-line-3'],
        sessionData['central-authority-address-line-4'],
        sessionData['central-authority-address-line-5'],
        sessionData['central-authority-postal-or-zip-code'],
        getCountryLabel(sessionData['central-authority-country'])
      ])
    ),
    buildSummaryHtmlRow(
      'Payment details',
      getCentralAuthorityPaymentDetailsHtml(sessionData)
    )
  ]
}

function getInterestAppliesLabel(value) {
  const labels = {
    yes: 'Yes',
    no: 'No'
  }

  return labels[value] || '-'
}

function getIndexationTypeLabel(value) {
  const labels = {
    rpi: 'Retail Price Index (RPI)',
    cpi: 'Consumer Price Index (CPI)',
    'other-indexation': 'Other indexation',
    'no-indexation': 'None'
  }

  return labels[value] || '-'
}

function getTermsBeneficiaryDraft(sessionData) {
  return sessionData['terms-beneficiary-draft'] || null
}

function buildTermsBeneficiaryDraft(body, sessionData) {
  const beneficiaryType = body['terms-beneficiary-type'] || 'applicant'

  if (beneficiaryType === 'new-child') {
    const dateOfBirth = body['terms-beneficiary-child-date-of-birth'] || ''

    return {
      beneficiaryType,
      beneficiaryName: body['terms-beneficiary-child-name'] || 'New child',
      beneficiaryRole: 'Child',
      beneficiaryTag: 'Child',
      dateOfBirth,
      age: getAgeFromDateString(dateOfBirth)
    }
  }

  if (beneficiaryType === 'new-adult') {
    return {
      beneficiaryType,
      beneficiaryName: body['terms-beneficiary-adult-name'] || 'New adult',
      beneficiaryRole: 'Adult',
      beneficiaryTag: 'Adult'
    }
  }

  return {
    beneficiaryType: 'applicant',
    beneficiaryName: getApplicantFullName(sessionData) || 'Applicant',
    beneficiaryRole: 'Applicant',
    beneficiaryTag: 'Adult'
  }
}

function getTermsCreditorItems(sessionData, selectedCreditor) {
  const applicantLabel = getApplicantCreditorLabel(sessionData)
  const minorCreditorItems = getMinorCreditors(sessionData).map((creditor, index) => ({
    value: `minor-creditor-${index}`,
    text: getMinorCreditorName(creditor, index),
    checked: selectedCreditor === `minor-creditor-${index}`
  }))

  return [
    {
      value: 'applicant',
      text: `${applicantLabel} (Applicant)`,
      checked: selectedCreditor === 'applicant'
    },
    ...minorCreditorItems,
    {
      value: 'major-creditor',
      text: 'Major creditor',
      checked: selectedCreditor === 'major-creditor'
    }
  ]
}

function getCreditorLabel(creditorValue, sessionData) {
  if (creditorValue === 'applicant') {
    return getApplicantCreditorLabel(sessionData)
  }

  if (creditorValue === 'major-creditor') {
    return 'Major creditor'
  }

  if (String(creditorValue).startsWith('minor-creditor-')) {
    const index = Number(String(creditorValue).replace('minor-creditor-', ''))

    if (Number.isInteger(index) && getMinorCreditors(sessionData)[index]) {
      return getMinorCreditorName(getMinorCreditors(sessionData)[index], index)
    }
  }

  return ''
}

function buildTermsEntry(body, sessionData) {
  const draft = getTermsBeneficiaryDraft(sessionData)

  if (!draft) {
    return null
  }

  const expiryType = body['terms-expiry-type'] || 'expires-on-date'
  const expiryDate =
    expiryType === 'expires-on-date' ? body['terms-expiry-date'] || '' : ''

  return {
    beneficiaryType: draft.beneficiaryType,
    beneficiaryName: draft.beneficiaryName,
    beneficiaryRole: draft.beneficiaryRole,
    beneficiaryTag: draft.beneficiaryTag,
    beneficiaryDateOfBirth: draft.dateOfBirth || '',
    beneficiaryAge: draft.age ?? null,
    amount: body['terms-amount'] || '',
    arrears: body['terms-arrears'] || '',
    expiryType,
    expiryDate,
    hasAdditionalTermsAfterExpiry: body['terms-additional-terms-after-expiry']
      ? 'yes'
      : '',
    creditor: body['terms-creditor'] || 'applicant',
    creditorLabel: getCreditorLabel(body['terms-creditor'] || 'applicant', sessionData),
    orderDate: sessionData['order-date-order-made'] || '',
    paymentFrequency: sessionData['order-payment-frequency'] || ''
  }
}

function getTermsReviewGroups(sessionData) {
  const groups = []

  getTermsPerBeneficiary(sessionData).forEach((term, index) => {
    const existingGroup = groups.find(
      (group) =>
        group.name === term.beneficiaryName &&
        group.role === term.beneficiaryRole &&
        group.tag === term.beneficiaryTag
    )

    const row = [
      {
        text: formatDateForReview(term.orderDate)
      },
      {
        text: formatCurrency(term.amount)
      },
      {
        text: getFrequencyLabel(term.paymentFrequency)
      },
      {
        text: formatCurrency(term.arrears)
      },
      {
        text: term.creditorLabel
      },
      {
        text:
          term.expiryType === 'expires-on-date'
            ? formatDateForReview(term.expiryDate)
            : '-'
      },
      {
        text: term.hasAdditionalTermsAfterExpiry === 'yes' ? 'Yes' : 'No'
      },
      {
        text: 'Active'
      },
      {
        html: `<a class="govuk-link" href="#">Change</a> <a class="govuk-link govuk-!-margin-left-2" href="/terms-per-beneficiary/${index}/remove">Remove</a>`
      }
    ]

    if (existingGroup) {
      existingGroup.rows.push(row)
      return
    }

    groups.push({
      id: `beneficiary-${index + 1}`,
      name: term.beneficiaryName,
      role: term.beneficiaryRole,
      subtitle:
        term.beneficiaryType === 'new-child' && term.beneficiaryAge !== null
          ? `Age ${term.beneficiaryAge}`
          : term.beneficiaryRole,
      tag: term.beneficiaryTag,
      rows: [row]
    })
  })

  return groups
}

function getTermsReviewRow(term) {
  return [
    {
      text: formatDateForReview(term.orderDate)
    },
    {
      text: formatCurrency(term.amount)
    },
    {
      text: getFrequencyLabel(term.paymentFrequency)
    },
    {
      text: formatCurrency(term.arrears)
    },
    {
      text: term.creditorLabel
    },
    {
      text:
        term.expiryType === 'expires-on-date'
          ? formatDateForReview(term.expiryDate)
          : '-'
    },
    {
      text: term.hasAdditionalTermsAfterExpiry === 'yes' ? 'Yes' : 'No'
    },
    {
      text: 'Active'
    }
  ]
}

function getCheckCaseBeneficiaryGroups(sessionData) {
  const groups = []

  getTermsPerBeneficiary(sessionData).forEach((term, index) => {
    const existingGroup = groups.find(
      (group) =>
        group.name === term.beneficiaryName &&
        group.tag === term.beneficiaryTag &&
        group.subtitle ===
          (term.beneficiaryType === 'new-child' && term.beneficiaryAge !== null
            ? `Age ${term.beneficiaryAge}`
            : term.beneficiaryRole)
    )

    if (existingGroup) {
      existingGroup.rows.push(getTermsReviewRow(term))
      return
    }

    groups.push({
      id: `check-beneficiary-${index + 1}`,
      name: term.beneficiaryName,
      subtitle:
        term.beneficiaryType === 'new-child' && term.beneficiaryAge !== null
          ? `Age ${term.beneficiaryAge}`
          : term.beneficiaryRole,
      tag: term.beneficiaryTag,
      rows: [getTermsReviewRow(term)]
    })
  })

  return groups
}

function getTaskStatusTag(status) {
  if (status === 'provided') {
    return {
      tag: {
        text: 'Provided',
        classes: 'govuk-tag--turquoise'
      }
    }
  }

  if (status === 'optional') {
    return {
      tag: {
        text: 'Optional',
        classes: 'govuk-tag--grey'
      }
    }
  }

  return {
    tag: {
      text: 'Required',
      classes: 'govuk-tag--purple'
    }
  }
}

function getPartyDetailsItems(sessionData) {
  const items = [
    {
      title: {
        text: 'Applicant'
      },
      href: '/applicant-details',
      status: getTaskStatusTag(
        sessionData['applicant-details-completed'] ? 'provided' : 'required'
      )
    },
    {
      title: {
        text: 'Respondent'
      },
      href: '/respondent-details',
      status: getTaskStatusTag(
        sessionData['respondent-details-completed'] ? 'provided' : 'required'
      )
    }
  ]

  if (!isRemoOutCase(sessionData)) {
    items.push({
      title: {
        text: 'Central authority'
      },
      href: '/central-authority-details',
      status: getTaskStatusTag(hasCentralAuthorityDetails(sessionData) ? 'provided' : 'optional')
    })
  }

  return items
}

function getApplicationItems(sessionData) {
  const canStartApplication = hasCompletedPartyDetails(sessionData)
  const hasApplicationDetails = hasCompletedApplicationDetails(sessionData)
  const hasHearingDetails = hasCompletedHearingDetails(sessionData)

  return [
    {
      title: {
        text: 'Application details'
      },
      href: canStartApplication ? '/application-details' : undefined,
      status: hasApplicationDetails
        ? getTaskStatusTag('provided')
        : canStartApplication
          ? getTaskStatusTag('required')
          : {
              text: 'Cannot start yet'
            }
    },
    {
      title: {
        text: 'Hearing details'
      },
      href: hasApplicationDetails ? '/hearing-details' : undefined,
      status: hasApplicationDetails
        ? hasHearingDetails
          ? getTaskStatusTag('provided')
          : getTaskStatusTag('required')
        : {
            text: 'Cannot start yet'
          }
    }
  ]
}

function getOrderItems(sessionData) {
  const canStartOrder = hasCompletedPartyDetails(sessionData)
  const hasOrderDetails = hasCompletedOrderDetails(sessionData)
  const hasMinorCreditorDetails = hasMinorCreditors(sessionData)
  const hasTermsDetails = hasTermsPerBeneficiary(sessionData)
  const hasLumpSumPayment = hasCompletedLumpSumPayment(sessionData)
  const hasInterestAndIndexation = hasCompletedInterestAndIndexation(sessionData)

  return [
    {
      title: {
        text: 'Order details'
      },
      href: canStartOrder ? '/order-details' : undefined,
      status: hasOrderDetails
        ? getTaskStatusTag('provided')
        : canStartOrder
          ? getTaskStatusTag('required')
          : {
              text: 'Cannot start yet'
            }
    },
    {
      title: {
        text: 'Minor creditor details'
      },
      href: hasOrderDetails ? '/minor-creditors' : undefined,
      status: hasOrderDetails
        ? hasMinorCreditorDetails
          ? getTaskStatusTag('provided')
          : getTaskStatusTag('optional')
        : {
            text: 'Cannot start yet'
          }
    },
    {
      title: {
        text: 'Terms per beneficiary'
      },
      href: hasOrderDetails ? '/terms-per-beneficiary' : undefined,
      status: hasOrderDetails
        ? hasTermsDetails
          ? getTaskStatusTag('provided')
          : getTaskStatusTag('required')
        : {
            text: 'Cannot start yet'
          }
    },
    {
      title: {
        text: 'Lump sum payment'
      },
      href: hasOrderDetails ? '/lump-sum-payment' : undefined,
      status: hasOrderDetails
        ? hasLumpSumPayment
          ? getTaskStatusTag('provided')
          : getTaskStatusTag('required')
        : {
            text: 'Cannot start yet'
          }
    },
    {
      title: {
        text: 'Interest and indexation'
      },
      href: hasOrderDetails ? '/interest-and-indexation' : undefined,
      status: hasOrderDetails
        ? hasInterestAndIndexation
          ? getTaskStatusTag('provided')
          : getTaskStatusTag('required')
        : {
            text: 'Cannot start yet'
          }
    }
  ]
}

function getAdditionalInformationItems(sessionData) {
  return [
    {
      title: {
        text: 'Comments and notes'
      },
      href: '/case-comments-and-notes',
      status: hasCaseCommentsAndNotes(sessionData)
        ? getTaskStatusTag('provided')
        : getTaskStatusTag('optional')
    }
  ]
}

function canCheckCase(sessionData) {
  if (isRemoOutCase(sessionData)) {
    return Boolean(
      sessionData['applicant-details-completed'] &&
        sessionData['respondent-details-completed'] &&
        sessionData['application-details-completed'] &&
        sessionData['hearing-details-completed']
    )
  }

  return Boolean(
    sessionData['applicant-details-completed'] &&
      sessionData['respondent-details-completed'] &&
      sessionData['order-details-completed'] &&
      hasTermsPerBeneficiary(sessionData) &&
      hasCompletedLumpSumPayment(sessionData) &&
      hasCompletedInterestAndIndexation(sessionData)
  )
}

function getAgeFromDateString(dateString) {
  if (!dateString) {
    return null
  }

  const parts = dateString.split('/')

  if (parts.length !== 3) {
    return null
  }

  const day = Number(parts[0])
  const month = Number(parts[1])
  const year = Number(parts[2])

  if (!day || !month || !year) {
    return null
  }

  const today = new Date()
  let age = today.getFullYear() - year
  const birthdayHasPassed =
    today.getMonth() + 1 > month ||
    (today.getMonth() + 1 === month && today.getDate() >= day)

  if (!birthdayHasPassed) {
    age -= 1
  }

  return age
}

// Add your routes here
router.post('/', (req, res, next) => {
  req.session.data['applicant-type'] =
    req.body['applicant-type-remo-in'] ||
    req.body['applicant-type-remo-out'] ||
    ''

  delete req.session.data['applicant-type-remo-in']
  delete req.session.data['applicant-type-remo-out']

  return redirectWithSessionSave(req, res, next, '/case-details')
})

router.get('/case-details', (req, res) => {
  const caseType = req.session.data['case-type']

  if (!caseType) {
    return res.redirect('/')
  }

  return res.render('case-details', {
    caseTypeLabel: caseTypeLabels[caseType] || caseType,
    applicantTypeLabel:
      applicantTypeLabels[req.session.data['applicant-type']] || 'Not selected',
    partyDetailsItems: getPartyDetailsItems(req.session.data),
    caseSectionHeading: isRemoOutCase(req.session.data) ? 'Application' : 'Order',
    caseSectionIdPrefix: isRemoOutCase(req.session.data) ? 'application' : 'order',
    caseSectionItems: isRemoOutCase(req.session.data)
      ? getApplicationItems(req.session.data)
      : getOrderItems(req.session.data),
    additionalInformationItems: getAdditionalInformationItems(req.session.data),
    canCheckCase: canCheckCase(req.session.data)
  })
})

router.get('/check-case-details', (req, res) => {
  if (!req.session.data['case-type']) {
    return res.redirect('/')
  }

  if (!canCheckCase(req.session.data)) {
    return res.redirect('/case-details')
  }

  return res.render('check-case-details', {
    caseTypeLabel: caseTypeLabels[req.session.data['case-type']] || req.session.data['case-type'],
    applicantTypeLabel:
      applicantTypeLabels[req.session.data['applicant-type']] || 'Not selected',
    isRemoOutCase: isRemoOutCase(req.session.data),
    applicantRows: getApplicantSummaryRows(req.session.data),
    respondentRows: getRespondentSummaryRows(req.session.data),
    centralAuthorityRows: getCentralAuthoritySummaryRows(req.session.data),
    applicationRows: getApplicationSummaryRows(req.session.data),
    hearingRows: getHearingSummaryRows(req.session.data),
    beneficiaryGroups: getCheckCaseBeneficiaryGroups(req.session.data),
    interestAndIndexationRows: [
      buildSummaryRow('Interest', getInterestAppliesLabel(req.session.data['interest-applies'])),
      buildSummaryRow(
        'Indexation',
        getIndexationTypeLabel(req.session.data['indexation-type'])
      )
    ],
    caseCommentsRows: [
      buildSummaryRow('Comment', req.session.data['case-comment']),
      buildSummaryRow('Case note', req.session.data['case-notes'])
    ],
    showApplicantRestrictionWarning: Boolean(
      req.session.data['applicant-restrict-personal-information']
    ),
    showRespondentRestrictionWarning: Boolean(
      req.session.data['respondent-restrict-personal-information']
    )
  })
})

router.get('/case-submitted', (req, res) => {
  if (!req.session.data['case-type']) {
    return res.redirect('/')
  }

  return res.render('case-submitted')
})

router.get('/case-comments-and-notes', (req, res) => {
  if (!req.session.data['case-type']) {
    return res.redirect('/')
  }

  return res.render('case-comments-and-notes')
})

router.post('/case-comments-and-notes', (req, res, next) => {
  return redirectWithSessionSave(req, res, next, '/case-details')
})

router.get('/applicant-details', (req, res) => {
  if (!req.session.data['case-type']) {
    return res.redirect('/')
  }

  return res.render('applicant-details', {
    applicantAge: getAgeFromDateString(req.session.data['applicant-date-of-birth'])
  })
})

router.post('/applicant-details', (req, res, next) => {
  req.session.data['applicant-add-aliases'] = req.body['applicant-add-aliases']
    ? 'yes'
    : ''
  req.session.data['applicant-bank-account-type'] =
    req.body['applicant-bank-account-type'] || 'uk-bank-account'
  req.session.data['applicant-send-correspondence-to-third-party'] =
    req.body['applicant-send-correspondence-to-third-party'] ? 'yes' : ''
  req.session.data['applicant-restrict-personal-information'] =
    req.body['applicant-restrict-personal-information'] ? 'yes' : ''
  req.session.data['applicant-details-completed'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/case-details')
})

router.get('/respondent-details', (req, res) => {
  if (!req.session.data['case-type']) {
    return res.redirect('/')
  }

  return res.render('respondent-details')
})

router.post('/respondent-details', (req, res, next) => {
  req.session.data['respondent-add-aliases'] = req.body['respondent-add-aliases']
    ? 'yes'
    : ''
  req.session.data['respondent-send-correspondence-to-third-party'] =
    req.body['respondent-send-correspondence-to-third-party'] ? 'yes' : ''
  req.session.data['respondent-restrict-personal-information'] =
    req.body['respondent-restrict-personal-information'] ? 'yes' : ''
  req.session.data['respondent-details-completed'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/case-details')
})

router.get('/central-authority-details', (req, res) => {
  if (!req.session.data['case-type']) {
    return res.redirect('/')
  }

  if (isRemoOutCase(req.session.data)) {
    return res.redirect('/case-details')
  }

  return res.render('central-authority-details', {
    hasCentralAuthorityManualDetails: hasCentralAuthorityManualDetails(req.session.data),
    centralAuthorityCardRows: getCentralAuthorityCardRows(req.session.data)
  })
})

router.post('/central-authority-details', (req, res, next) => {
  req.session.data['central-authority-details-completed'] = hasCentralAuthorityDetails(
    req.session.data
  )
    ? 'yes'
    : ''

  return redirectWithSessionSave(req, res, next, '/case-details')
})

router.get('/central-authority-details/manual', (req, res) => {
  if (!req.session.data['case-type']) {
    return res.redirect('/')
  }

  return res.render('central-authority-details-manual')
})

router.post('/central-authority-details/manual', (req, res, next) => {
  req.session.data['central-authority-details-completed'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/central-authority-details')
})

router.get('/central-authority-details/remove', (req, res) => {
  if (!req.session.data['case-type']) {
    return res.redirect('/')
  }

  if (!hasCentralAuthorityManualDetails(req.session.data)) {
    return res.redirect('/central-authority-details')
  }

  return res.render('remove-central-authority-details', {
    centralAuthorityCardRows: getCentralAuthorityCardRows(req.session.data)
  })
})

router.post('/central-authority-details/remove', (req, res, next) => {
  delete req.session.data['central-authority-manual-name']
  delete req.session.data['central-authority-main-email-address']
  delete req.session.data['central-authority-other-email-address']
  delete req.session.data['central-authority-main-telephone-number']
  delete req.session.data['central-authority-other-telephone-number']
  delete req.session.data['central-authority-address-line-1']
  delete req.session.data['central-authority-address-line-2']
  delete req.session.data['central-authority-address-line-3']
  delete req.session.data['central-authority-address-line-4']
  delete req.session.data['central-authority-address-line-5']
  delete req.session.data['central-authority-postal-or-zip-code']
  delete req.session.data['central-authority-country']
  delete req.session.data['central-authority-bank-account-type']
  delete req.session.data['central-authority-bank-name-on-account']
  delete req.session.data['central-authority-bank-sort-code']
  delete req.session.data['central-authority-bank-account-number']
  delete req.session.data['central-authority-bank-payment-reference']
  delete req.session.data['central-authority-bank-non-uk-name-on-account']
  delete req.session.data['central-authority-bank-bic-or-swift-code']
  delete req.session.data['central-authority-bank-iban']
  delete req.session.data['central-authority-bank-non-uk-payment-reference']
  delete req.session.data['central-authority-bank-name']
  delete req.session.data['central-authority-bank-branch-office-or-sort-code']
  delete req.session.data['central-authority-bank-non-uk-account-number']

  req.session.data['central-authority-details-completed'] = hasCentralAuthorityDetails(
    req.session.data
  )
    ? 'yes'
    : ''

  return redirectWithSessionSave(req, res, next, '/central-authority-details')
})

router.get('/order-details', (req, res) => {
  if (!req.session.data['case-type']) {
    return res.redirect('/')
  }

  if (isRemoOutCase(req.session.data)) {
    return res.redirect('/application-details')
  }

  if (!hasCompletedPartyDetails(req.session.data)) {
    return res.redirect('/case-details')
  }

  return res.render('order-details')
})

router.post('/order-details', (req, res, next) => {
  if (isRemoOutCase(req.session.data)) {
    return res.redirect('/application-details')
  }

  const paymentTerms = asArray(req.body['order-payment-terms'])

  req.session.data['order-has-periodical-payments'] = paymentTerms.includes(
    'periodical-payments'
  )
    ? 'yes'
    : ''
  req.session.data['order-has-lump-sum'] = paymentTerms.includes('lump-sum')
    ? 'yes'
    : ''
  req.session.data['order-details-completed'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/case-details')
})

router.get('/application-details', (req, res) => {
  if (!req.session.data['case-type']) {
    return res.redirect('/')
  }

  if (!isRemoOutCase(req.session.data) || !hasCompletedPartyDetails(req.session.data)) {
    return res.redirect('/case-details')
  }

  return res.render('application-details')
})

router.post('/application-details', (req, res, next) => {
  if (!isRemoOutCase(req.session.data)) {
    return res.redirect('/case-details')
  }

  req.session.data['application-code'] = getSingleValue(req.body['application-code']) || ''
  delete req.session.data['application-details-completed']

  return redirectWithSessionSave(req, res, next, '/application-details/content')
})

router.get('/application-details/content', (req, res) => {
  if (!req.session.data['case-type']) {
    return res.redirect('/')
  }

  if (
    !isRemoOutCase(req.session.data) ||
    !hasCompletedPartyDetails(req.session.data) ||
    !hasValue(req.session.data['application-code'])
  ) {
    return res.redirect('/application-details')
  }

  return res.render('application-details-content', {
    applicationTitle: getApplicationTitle(req.session.data),
    applicationWording: getApplicationWording(req.session.data)
  })
})

router.post('/application-details/content', (req, res, next) => {
  if (!isRemoOutCase(req.session.data) || !hasValue(req.session.data['application-code'])) {
    return res.redirect('/case-details')
  }

  req.session.data['application-foreign-court'] =
    getSingleValue(req.body['application-foreign-court']) || ''
  req.session.data['application-order-date'] =
    getSingleValue(req.body['application-order-date']) || ''
  req.session.data['application-details-completed'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/case-details')
})

router.get('/hearing-details', (req, res) => {
  if (!req.session.data['case-type']) {
    return res.redirect('/')
  }

  if (!isRemoOutCase(req.session.data) || !hasCompletedApplicationDetails(req.session.data)) {
    return res.redirect('/case-details')
  }

  return res.render('hearing-details')
})

router.post('/hearing-details', (req, res, next) => {
  if (!isRemoOutCase(req.session.data)) {
    return res.redirect('/case-details')
  }

  req.session.data['hearing-type'] = getSingleValue(req.body['hearing-type']) || ''
  req.session.data['hearing-court'] = getSingleValue(req.body['hearing-court']) || ''
  req.session.data['hearing-date'] = getSingleValue(req.body['hearing-date']) || ''
  req.session.data['hearing-courtroom-number'] =
    getSingleValue(req.body['hearing-courtroom-number']) || ''
  req.session.data['hearing-start-time'] =
    getSingleValue(req.body['hearing-start-time']) || ''
  req.session.data['hearing-non-scheduled-details'] =
    getSingleValue(req.body['hearing-non-scheduled-details']) || ''
  req.session.data['hearing-details-completed'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/case-details')
})

router.get('/minor-creditors', (req, res) => {
  if (!hasCompletedOrderDetails(req.session.data)) {
    return res.redirect('/case-details')
  }

  if (!hasMinorCreditors(req.session.data)) {
    return res.render('minor-creditor-details', {
      creditor: {},
      formAction: '/minor-creditors',
      cancelHref: '/case-details'
    })
  }

  return res.render('minor-creditors', {
    minorCreditorCards: getMinorCreditorCards(req.session.data)
  })
})

router.post('/minor-creditors', (req, res, next) => {
  const creditors = getMinorCreditors(req.session.data)
  creditors.push(buildMinorCreditor(req.body))
  req.session.data['minor-creditors'] = creditors

  return redirectWithSessionSave(req, res, next, '/minor-creditors')
})

router.get('/minor-creditors/new', (req, res) => {
  if (!hasCompletedOrderDetails(req.session.data)) {
    return res.redirect('/case-details')
  }

  return res.render('minor-creditor-details', {
    creditor: {},
    formAction: '/minor-creditors/new',
    cancelHref: '/minor-creditors'
  })
})

router.post('/minor-creditors/new', (req, res, next) => {
  const creditors = getMinorCreditors(req.session.data)
  creditors.push(buildMinorCreditor(req.body))
  req.session.data['minor-creditors'] = creditors

  return redirectWithSessionSave(req, res, next, '/minor-creditors')
})

router.get('/minor-creditors/:index/edit', (req, res) => {
  if (!hasCompletedOrderDetails(req.session.data)) {
    return res.redirect('/case-details')
  }

  const index = getMinorCreditorIndex(req.params.index, req.session.data)

  if (index === null) {
    return res.redirect('/minor-creditors')
  }

  return res.render('minor-creditor-details', {
    creditor: getMinorCreditors(req.session.data)[index],
    formAction: `/minor-creditors/${index}/edit`,
    cancelHref: '/minor-creditors'
  })
})

router.post('/minor-creditors/:index/edit', (req, res, next) => {
  const index = getMinorCreditorIndex(req.params.index, req.session.data)

  if (index === null) {
    return res.redirect('/minor-creditors')
  }

  const creditors = getMinorCreditors(req.session.data)
  creditors[index] = buildMinorCreditor(req.body)
  req.session.data['minor-creditors'] = creditors

  return redirectWithSessionSave(req, res, next, '/minor-creditors')
})

router.get('/minor-creditors/:index/remove', (req, res) => {
  if (!hasCompletedOrderDetails(req.session.data)) {
    return res.redirect('/case-details')
  }

  const index = getMinorCreditorIndex(req.params.index, req.session.data)

  if (index === null) {
    return res.redirect('/minor-creditors')
  }

  const creditor = getMinorCreditors(req.session.data)[index]

  return res.render('remove-minor-creditor', {
    minorCreditorCard: {
      title: getMinorCreditorName(creditor, index),
      rows: getMinorCreditorSummaryRows(creditor)
    },
    formAction: `/minor-creditors/${index}/remove`
  })
})

router.post('/minor-creditors/:index/remove', (req, res, next) => {
  const index = getMinorCreditorIndex(req.params.index, req.session.data)

  if (index === null) {
    return res.redirect('/minor-creditors')
  }

  const creditors = getMinorCreditors(req.session.data)
  creditors.splice(index, 1)
  req.session.data['minor-creditors'] = creditors

  return redirectWithSessionSave(
    req,
    res,
    next,
    creditors.length ? '/minor-creditors' : '/case-details'
  )
})

router.get('/terms-per-beneficiary', (req, res) => {
  if (!hasCompletedOrderDetails(req.session.data)) {
    return res.redirect('/case-details')
  }

  if (!hasTermsPerBeneficiary(req.session.data)) {
    return res.redirect('/terms-per-beneficiary/beneficiary')
  }

  return res.render('terms-review', {
    beneficiaryGroups: getTermsReviewGroups(req.session.data)
  })
})

router.get('/terms-per-beneficiary/beneficiary', (req, res) => {
  if (!hasCompletedOrderDetails(req.session.data)) {
    return res.redirect('/case-details')
  }

  const draft = getTermsBeneficiaryDraft(req.session.data) || {}

  return res.render('terms-beneficiary', {
    applicantBeneficiaryLabel: `${getApplicantFullName(req.session.data)} (Applicant)`,
    childAge: getAgeFromDateString(draft.dateOfBirth),
    cancelHref: hasTermsPerBeneficiary(req.session.data)
      ? '/terms-per-beneficiary'
      : '/case-details'
  })
})

router.post('/terms-per-beneficiary/beneficiary', (req, res, next) => {
  req.session.data['terms-beneficiary-draft'] = buildTermsBeneficiaryDraft(
    req.body,
    req.session.data
  )

  return redirectWithSessionSave(req, res, next, '/terms-per-beneficiary/order-terms')
})

router.get('/terms-per-beneficiary/order-terms', (req, res) => {
  if (!hasCompletedOrderDetails(req.session.data)) {
    return res.redirect('/case-details')
  }

  const beneficiary = getTermsBeneficiaryDraft(req.session.data)

  if (!beneficiary) {
    return res.redirect('/terms-per-beneficiary/beneficiary')
  }

  return res.render('terms-order-terms', {
    beneficiary,
    frequencyLabel: getFrequencyLabel(req.session.data['order-payment-frequency']),
    creditorItems: getTermsCreditorItems(
      req.session.data,
      req.session.data['terms-creditor'] || 'applicant'
    )
  })
})

router.post('/terms-per-beneficiary/order-terms', (req, res, next) => {
  const entry = buildTermsEntry(req.body, req.session.data)

  if (!entry) {
    return res.redirect('/terms-per-beneficiary/beneficiary')
  }

  const terms = getTermsPerBeneficiary(req.session.data)
  terms.push(entry)
  req.session.data['terms-per-beneficiary'] = terms
  delete req.session.data['terms-beneficiary-draft']

  if (req.body.action === 'add-more-terms') {
    return redirectWithSessionSave(req, res, next, '/terms-per-beneficiary/beneficiary')
  }

  return redirectWithSessionSave(req, res, next, '/terms-per-beneficiary')
})

router.get('/terms-per-beneficiary/:index/remove', (req, res) => {
  if (!hasCompletedOrderDetails(req.session.data)) {
    return res.redirect('/case-details')
  }

  const index = getTermsIndex(req.params.index, req.session.data)

  if (index === null) {
    return res.redirect('/terms-per-beneficiary')
  }

  const term = getTermsPerBeneficiary(req.session.data)[index]

  return res.render('remove-terms-per-beneficiary', {
    beneficiaryGroup: {
      name: term.beneficiaryName,
      role: term.beneficiaryRole,
      tag: term.beneficiaryTag,
      rows: [getTermsReviewRow(term)]
    },
    formAction: `/terms-per-beneficiary/${index}/remove`
  })
})

router.post('/terms-per-beneficiary/:index/remove', (req, res, next) => {
  const index = getTermsIndex(req.params.index, req.session.data)

  if (index === null) {
    return res.redirect('/terms-per-beneficiary')
  }

  const terms = getTermsPerBeneficiary(req.session.data)
  terms.splice(index, 1)
  req.session.data['terms-per-beneficiary'] = terms

  return redirectWithSessionSave(
    req,
    res,
    next,
    terms.length ? '/terms-per-beneficiary' : '/case-details'
  )
})

router.get('/lump-sum-payment', (req, res) => {
  if (!hasCompletedOrderDetails(req.session.data)) {
    return res.redirect('/case-details')
  }

  return res.render('lump-sum-payment', {
    creditorItems: getTermsCreditorItems(
      req.session.data,
      req.session.data['lump-sum-creditor'] || 'applicant'
    )
  })
})

router.post('/lump-sum-payment', (req, res, next) => {
  req.session.data['lump-sum-payment-completed'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/case-details')
})

router.get('/interest-and-indexation', (req, res) => {
  if (!hasCompletedOrderDetails(req.session.data)) {
    return res.redirect('/case-details')
  }

  return res.render('interest-and-indexation')
})

router.post('/interest-and-indexation', (req, res, next) => {
  req.session.data['interest-and-indexation-completed'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/case-details')
})

router.get('/cancel', (req, res, next) => {
  delete req.session.data['case-type']
  delete req.session.data['applicant-type']
  delete req.session.data['has-order']
  delete req.session.data['applicant-details-completed']
  delete req.session.data['respondent-details-completed']
  delete req.session.data['central-authority-details-completed']
  delete req.session.data['central-authority-remo-reference']
  delete req.session.data['central-authority-reference']
  delete req.session.data['central-authority-name']
  delete req.session.data['central-authority-manual-name']
  delete req.session.data['central-authority-main-email-address']
  delete req.session.data['central-authority-other-email-address']
  delete req.session.data['central-authority-main-telephone-number']
  delete req.session.data['central-authority-other-telephone-number']
  delete req.session.data['central-authority-address-line-1']
  delete req.session.data['central-authority-address-line-2']
  delete req.session.data['central-authority-address-line-3']
  delete req.session.data['central-authority-address-line-4']
  delete req.session.data['central-authority-address-line-5']
  delete req.session.data['central-authority-postal-or-zip-code']
  delete req.session.data['central-authority-country']
  delete req.session.data['central-authority-bank-account-type']
  delete req.session.data['central-authority-bank-name-on-account']
  delete req.session.data['central-authority-bank-sort-code']
  delete req.session.data['central-authority-bank-account-number']
  delete req.session.data['central-authority-bank-payment-reference']
  delete req.session.data['central-authority-bank-non-uk-name-on-account']
  delete req.session.data['central-authority-bank-bic-or-swift-code']
  delete req.session.data['central-authority-bank-iban']
  delete req.session.data['central-authority-bank-non-uk-payment-reference']
  delete req.session.data['central-authority-bank-name']
  delete req.session.data['central-authority-bank-branch-office-or-sort-code']
  delete req.session.data['central-authority-bank-non-uk-account-number']
  delete req.session.data['order-details-completed']
  delete req.session.data['order-has-periodical-payments']
  delete req.session.data['order-has-lump-sum']
  delete req.session.data['order-payment-frequency']
  delete req.session.data['order-application-code']
  delete req.session.data['order-court-that-made-the-order']
  delete req.session.data['order-date-order-made']
  delete req.session.data['order-date-arrears-last-updated']
  delete req.session.data['order-managing-payments']
  delete req.session.data['minor-creditors']
  delete req.session.data['terms-per-beneficiary']
  delete req.session.data['terms-beneficiary-draft']
  delete req.session.data['lump-sum-payment-completed']
  delete req.session.data['lump-sum-amount']
  delete req.session.data['lump-sum-enter-pay-by-date']
  delete req.session.data['lump-sum-reason-for-payment']
  delete req.session.data['lump-sum-creditor']
  delete req.session.data['interest-and-indexation-completed']
  delete req.session.data['interest-applies']
  delete req.session.data['indexation-type']
  delete req.session.data['case-comment']
  delete req.session.data['case-notes']
  delete req.session.data['application-details-completed']
  delete req.session.data['application-code']
  delete req.session.data['application-foreign-court']
  delete req.session.data['application-order-date']
  delete req.session.data['hearing-details-completed']
  delete req.session.data['hearing-type']
  delete req.session.data['hearing-court']
  delete req.session.data['hearing-date']
  delete req.session.data['hearing-courtroom-number']
  delete req.session.data['hearing-start-time']
  delete req.session.data['hearing-non-scheduled-details']

  return redirectWithSessionSave(req, res, next, '/')
})

router.get('/cancel-case-creation', (req, res) => {
  if (!req.session.data['case-type']) {
    return res.redirect('/')
  }

  return res.render('cancel-case-creation')
})

router.post('/cancel-case-creation', (req, res, next) => {
  if (req.body['cancel-case-creation'] === 'yes') {
    return res.redirect('/cancel')
  }

  return redirectWithSessionSave(req, res, next, '/case-details')
})
