//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const resultDefinitions = require('./data/resulting-result-definitions')
const sessionDataDefaults = require('./data/session-data-defaults')
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

const sessionReviewCasesKey = 'session-review-cases'
const caseReviewDecisionsKey = 'case-review-decisions'
const reviewCasesSuccessMessageKey = 'review-cases-success-message'
const allRejectedCasesSuccessMessageKey = 'all-rejected-cases-success-message'

const applicationDefinitionList = [
  {
    group: 'APPEAL',
    code: 'AP00001',
    title: 'Application to Appeal',
    registerText:
      'Application to appeal an Order made on [order date] by [court] for [order terms]. On the grounds [grounds for appeal].',
    act: 'Application to Appeal'
  },
  {
    group: 'Conversion Cases',
    code: 'CV00001',
    title: 'Conversion of EU/WAC case from pay direct between parties to pay HMCTS',
    registerText: 'Application for [application details].',
    act: 'Conversion Cases Pay Direct to Pay HMCTS'
  },
  {
    group: 'OTBM',
    code: 'CA89001',
    title:
      'Application under schedule 1 Children Act 1989 or the Domestic Proceedings & Magistrates Courts Act 1978, applying Jurisdictional Provisions in this Legislation  (schedule 1 para 14 Children Act 1989 and Section 30 DPMCA 1978)',
    registerText: 'Application for [application details].',
    act: 'Children Act 1989'
  },
  {
    group: 'OTBM',
    code: 'HC07001',
    title: 'Applications for a Final Order to be made',
    registerText: 'Application for [application details].',
    act: 'Hague Convention 2007'
  },
  {
    group: 'OTBM',
    code: 'MO20001',
    title: 'Applications for a Provisional Order to be confirmed',
    registerText: 'Application for [application details].',
    act: 'Maintenance Orders (Facilities for Enforcement) Act 1920'
  },
  {
    group: 'OTBM',
    code: 'MO72001',
    title: 'Applications for a Provisional Order to be confirmed',
    registerText: 'Application for [application details].',
    act: 'Maintenance Orders (Reciprocal Enforcement) Act 1972'
  },
  {
    group: 'OTBM',
    code: 'MO72002',
    title: 'Application for a Final Order to be made',
    registerText: 'Application for [application details].',
    act: 'Maintenance Orders (Reciprocal Enforcement) Act 1972'
  },
  {
    group: 'REMO IN',
    code: 'CJ82001',
    title:
      'Application from non-EU Country for registration recognition of an Order in the UK Family Court',
    registerText: 'Application for [application details].',
    act: 'Civil Jurisdiction & Judgements Act 1982; Hague Convention 2007'
  },
  {
    group: 'REMO IN',
    code: 'CJ82002',
    title: 'Application from EU Country for registration/recognition of an order in the family court',
    registerText: 'Application for [application details].',
    act: 'Civil Jurisdiction & Judgements Act 1982; Hague Convention 2007'
  },
  {
    group: 'REMO IN',
    code: 'CJ82003',
    title: 'Application from EU Country for registration/recognition of an order in the family court',
    registerText: 'Application for [application details].',
    act: 'Civil Jurisdiction and Judgements Act 1982; Hague Convention 2007; EU Reg 04/2009'
  },
  {
    group: 'REMO IN',
    code: 'MO20002',
    title: 'Application for Registration of a foreign order in the UK Family Court',
    registerText: 'Application for [application details].',
    act: 'Maintenance Orders (Facilities for Enforcement) Act 1920'
  },
  {
    group: 'REMO IN',
    code: 'MO50001',
    title: 'Application to register a Scottish or Northern Ireland order in the Family Court other UK Jurisdictions',
    registerText: 'Application for [application details].',
    act: 'Maintenance Orders Act 1950'
  },
  {
    group: 'REMO IN',
    code: 'MO58001',
    title:
      'Enforcement of orders made by the High Court or registered in the High Court under MO(FE)A 1920 or MAO 1950 in the Family Court',
    registerText: 'Application for [application details].',
    act: 'Maintenance Orders Act 1958'
  },
  {
    group: 'REMO IN',
    code: 'MO72003',
    title: 'Application for Registration/recognition of a foreign order in the UK Family Court',
    registerText: 'Application for [application details].',
    act: 'Maintenance Orders (Reciprocal Enforcement) Act 1972'
  },
  {
    group: 'REMO IN',
    code: 'MO72004',
    title: 'Application for Registration/recognition of a foreign courts order in the UK Family Court',
    registerText: 'Application for [application details].',
    act: 'Maintenance Orders (Reciprocal Enforcement) Act 1972'
  },
  {
    group: 'REMO IN',
    code: 'MO72005',
    title:
      'Countries that are only able to send applications to the Family Court under the UN Convention (Part 2 Maintenance orders (Reciprocal Enforcement) Act 1972',
    registerText: 'Application for [application details].',
    act: 'Maintenance orders (Reciprocal Enforcement) Act 1972'
  },
  {
    group: 'REMO IN',
    code: 'MO72006',
    title: 'Application for registration of a USA Order in the UK Family Court',
    registerText: 'Application for [application details].',
    act: 'Maintenance orders (Reciprocal Enforcement) Act 1972'
  },
  {
    group: 'REMO IN',
    code: 'XX00001',
    title: 'UK Residents - Applications where both parties reside in England or Wales (HOME CASES)',
    registerText: 'Application for [application details].',
    act:
      'England/Wales orders made payable to HMCTS by a District Judge and Foreign Order from European/H07 Countries where the parties now live in England/Wales'
  },
  {
    group: 'REMO OUT',
    code: 'CA20001',
    title: 'Application under Commonwealth Act 1920',
    registerText: 'Application for [application details].',
    act: 'Commonwealth Act 1920'
  },
  {
    group: 'REMO OUT',
    code: 'CA89002',
    title: 'Application under UK Children Act 1989',
    registerText: 'Application for [application details].',
    act: 'Children Act 1989'
  },
  {
    group: 'REMO OUT',
    code: 'EU20001',
    title: 'Application under withdrawal Agreement (WAC)',
    registerText: 'Application for [application details].',
    act: 'EU–UK Withdrawal Agreement (2019) (as implemented by the European Union (Withdrawal Agreement) Act 2020)'
  },
  {
    group: 'REMO OUT',
    code: 'HC07002',
    title: 'Application for an Order to be made abroad',
    registerText: 'Application for [application details].',
    act: 'Hague Convention 2007'
  },
  {
    group: 'REMO OUT',
    code: 'HC07003',
    title: 'Application under Hague Convention 2007',
    registerText: 'Application for [application details].',
    act: 'Hague Convention 2007'
  },
  {
    group: 'REMO OUT',
    code: 'HC73001',
    title: 'Application under Hague Convention 1973',
    registerText: 'Application for [application details].',
    act: 'Hague Convention 1973'
  },
  {
    group: 'REMO OUT',
    code: 'LC00001',
    title: 'Application under Lugano Convention',
    registerText: 'Application for [application details].',
    act: 'Lugano Convention'
  },
  {
    group: 'REMO OUT',
    code: 'MO20003',
    title: 'Application for a Provisional Order to be made in the UK and confirmed abroad',
    registerText: 'Application for [application details].',
    act: 'Maintenance Orders (Facilities for Enforcement) Act 1920'
  },
  {
    group: 'REMO OUT',
    code: 'MO72007',
    title: 'Application for a Provisional Order to be made in the UK and confirmed abroad',
    registerText: 'Application for [application details].',
    act: 'Maintenance Orders (Reciprocal Enforcement) Act 1972'
  },
  {
    group: 'REMO OUT',
    code: 'MO72008',
    title: 'Application for documents to be signed and sworn for an Order to be made abroad',
    registerText: 'Application for [application details].',
    act: 'Maintenance Orders (Reciprocal Enforcement) Act 1972'
  },
  {
    group: 'REMO OUT',
    code: 'MO72009',
    title: 'Application for a Final Order to be made  (RCJ Countries as per Fam Court Index Table 4)',
    registerText: 'Application for [application details].',
    act:
      'Section 3, Maintenance Orders (Reciprocal Enforcement) Act 1972, as modified by the Reciprocal Enforcement of Maintenance Orders (Hague Convention Countries) Order 1993 (SI 1993/593)'
  },
  {
    group: 'REMO OUT',
    code: 'MO72010',
    title: 'FCDO Countries as per FAM Court Index - Table 4',
    registerText: 'Application for [application details].',
    act:
      'Section 3, Maintenance Orders (Reciprocal Enforcement) Act 1972, as modified by the Reciprocal Enforcement of Maintenance Orders (Hague Convention Countries) Order 1993 (SI 1993/593)'
  },
  {
    group: 'REMO OUT',
    code: 'MO72011',
    title: 'All "Agent" Countries as per the FAM Court Index Table 4',
    registerText: 'Application for [application details].',
    act:
      'Section 3, Maintenance Orders (Reciprocal Enforcement) Act 1972, as modified by the Reciprocal Enforcement of Maintenance Orders (Hague Convention Countries) Order 1993 (SI 1993/593)'
  },
  {
    group: 'REMO OUT',
    code: 'MO72012',
    title: 'Application under USA Part I & II',
    registerText: 'Application for [application details].',
    act: 'Part I of the Maintenance Orders (Reciprocal Enforcement) Act 1972 (as applied to the United States via reciprocal enforcement orders)'
  },
  {
    group: 'REMO OUT',
    code: 'UN56001',
    title: 'Application under United Nations 1956 [sometimes called the New York Convention 1956]',
    registerText: 'Application for [application details].',
    act: 'United Nations 1956 (New York Convention)'
  },
  {
    group: 'REMO OUT',
    code: 'RE72001',
    title: 'Application under Reciprocal Maintenance Act 1972',
    registerText: 'Application for [application details].',
    act: 'Reciprocal Enforcement Act 1972'
  },
  {
    group: 'VARIATION',
    code: 'AV00001',
    title: 'Application to Vary/Revoke an Order',
    registerText: 'Application to Vary/Revoke an Order made on [order date] sitting at [court] for [order terms].',
    act: 'Application to Vary/Revoke an Order'
  }
]

const caseEnquiryRecords = [
  {
    id: 'order-case',
    caseReference: 'RC0002-10458',
    respondentHeading: 'Mr Jan MALIK',
    kind: 'Order case',
    kindTagClass: 'govuk-tag--blue',
    caseType: 'REMO Out',
    businessUnit: 'Bury St Edmunds',
    applicantType: 'Organisation',
    receivedFrom: 'Warsaw Regional Court',
    lastUpdated: '09 Apr 2026',
    arrearsTile: {
      label: 'Arrears',
      value: '£1,240.00'
    },
    atGlance: {
      leftHeading: 'Respondent',
      leftRows: [
        ['Name', 'Mr Jan MALIK'],
        ['Date of birth', '10 Aug 1984'],
        ['Address', '24 High Street\nTwyford\nBerkshire\nRG10 9RT'],
        ['National Insurance number', 'QQ 12 34 56 C']
      ],
      middleHeading: 'Case details',
      middleRows: [
        ['Case type', 'REMO Out order'],
        ['Applicant', 'Uzturldizeklu garantiju fonda administracija'],
        ['Court that made the order', 'Sąd Okręgowy w Warszawie'],
        ['Date order made', '12 Jan 2025']
      ],
      rightHeading: 'Status and notes',
      rightRows: [
        ['Current status', 'Order terms recorded'],
        ['Next hearing', '07 Apr 2026 at 10:00'],
        ['Latest note', 'Awaiting confirmation of payment history from originating court']
      ]
    },
    applicantSections: [
      {
        title: 'Organisation details',
        rows: [
          ['Applicant type', 'Organisation'],
          ['Organisation name', 'Uzturldizeklu garantiju fonda administracija'],
          ['Foreign authority reference', 'CXD-2736549-PL']
        ]
      },
      {
        title: 'Contact details',
        rows: [
          ['Main email address', 'maintenance@kela.fi'],
          ['Other email address', 'Not provided'],
          ['Main telephone number', '+358 40 123 4567'],
          ['Other telephone number', 'Not provided']
        ]
      },
      {
        title: 'Address',
        rows: [
          ['Address', 'Perintakeskus, PL 50\nHelsinki\n00601\nFinland']
        ]
      },
      {
        title: 'Bank details',
        rows: [
          ['Bank account type', 'Non-UK bank account'],
          ['Name on account', 'Maintenance Recovery Unit'],
          ['BIC or SWIFT code', 'NDEAFIHH'],
          ['IBAN', 'FI2112345600000785']
        ]
      }
    ],
    respondentSections: [
      {
        title: 'Personal details',
        rows: [
          ['Title', 'Mr'],
          ['First names', 'Jan'],
          ['Last name', 'Malik'],
          ['Date of birth', '10 Aug 1984'],
          ['National Insurance number', 'QQ 12 34 56 C']
        ]
      },
      {
        title: 'Contact details',
        rows: [
          ['Main email address', 'jan.malik@example.test'],
          ['Other email address', 'Not provided'],
          ['Main telephone number', '+44 7700 900321'],
          ['Other telephone number', 'Not provided']
        ]
      },
      {
        title: 'Address',
        rows: [
          ['Address', '24 High Street\nTwyford\nBerkshire\nRG10 9RT']
        ]
      }
    ],
    caseRows: [
      ['Application code', 'MO20002'],
      ['Application found', 'Application for registration of a foreign order in the UK Family Court'],
      ['Order terms', 'MAT, MLUMP'],
      ['Date arrears last updated', '09 Jan 2025'],
      ['Interest and indexation', 'Interest applies, retain liability order']
    ],
    hearingRows: [
      ['Hearing type', 'Hearing outside England and Wales'],
      ['Date', '07 Apr 2026'],
      ['Time', '10:00'],
      ['Venue', 'Warsaw Regional Court'],
      ['Courtroom', 'Remote hearing room 2']
    ],
    historyItems: [
      { title: 'Result recorded', meta: '09 Apr 2026 at 11:15', body: 'Temporary order recorded for review.' },
      { title: 'Order terms updated', meta: '08 Apr 2026 at 16:30', body: 'MAT and MLUMP terms added to the case.' },
      { title: 'Case created', meta: '01 Apr 2026 at 09:10', body: 'Order received from Warsaw Regional Court.' }
    ],
    notesRows: [
      ['Case note', 'Awaiting updated arrears schedule from the originating authority.'],
      ['Internal note', 'Minor creditor details confirmed with applicant organisation.']
    ]
  },
  {
    id: 'application-case',
    caseReference: 'HC0006-20485',
    respondentHeading: 'Ms Elena NOWAK',
    kind: 'Application case',
    kindTagClass: 'govuk-tag--turquoise',
    caseType: 'REMO In',
    businessUnit: 'Bury St Edmunds',
    applicantType: 'Individual',
    receivedFrom: 'Finnish Central Authority',
    lastUpdated: '10 Apr 2026',
    arrearsTile: {
      label: 'Arrears',
      value: '£0.00'
    },
    atGlance: {
      leftHeading: 'Respondent',
      leftRows: [
        ['Name', 'Ms Elena NOWAK'],
        ['Date of birth', '14 Feb 1990'],
        ['Address', '99 Market Street\nLeeds\nLS1 4AB'],
        ['National Insurance number', 'Not provided']
      ],
      middleHeading: 'Application details',
      middleRows: [
        ['Case type', 'REMO In application'],
        ['Application code', 'MO72003'],
        ['Application found', 'Application for Registration/recognition of a foreign order in the UK Family Court'],
        ['Hearing date', '18 Mar 2025']
      ],
      rightHeading: 'Status and notes',
      rightRows: [
        ['Current status', 'Awaiting hearing'],
        ['Hearing venue', 'Bury St Edmunds'],
        ['Latest note', 'Central authority reference checked and accepted']
      ]
    },
    applicantSections: [
      {
        title: 'Personal details',
        rows: [
          ['Applicant type', 'Individual'],
          ['Title', 'Ms'],
          ['First names', 'Anna Maria'],
          ['Last name', 'Korhonen'],
          ['Date of birth', '14 Feb 1986']
        ]
      },
      {
        title: 'Contact details',
        rows: [
          ['Main email address', 'anna.korhonen@example.test'],
          ['Other email address', 'Not provided'],
          ['Main telephone number', '+358 40 111 222'],
          ['Other telephone number', 'Not provided']
        ]
      },
      {
        title: 'Address',
        rows: [
          ['Address', '12 Market Square\nHelsinki\n00100\nFinland']
        ]
      },
      {
        title: 'Bank details',
        rows: [
          ['Bank account type', 'Non-UK bank account'],
          ['Name on account', 'Anna Korhonen'],
          ['BIC or SWIFT code', 'NDEAFIHH'],
          ['IBAN', 'FI2112345600000785']
        ]
      }
    ],
    respondentSections: [
      {
        title: 'Personal details',
        rows: [
          ['Title', 'Ms'],
          ['First names', 'Elena'],
          ['Last name', 'Nowak'],
          ['Date of birth', '14 Feb 1990'],
          ['National Insurance number', 'Not provided']
        ]
      },
      {
        title: 'Contact details',
        rows: [
          ['Main email address', 'elena.nowak@example.test'],
          ['Other email address', 'Not provided'],
          ['Main telephone number', '+44 7700 900456'],
          ['Other telephone number', 'Not provided']
        ]
      },
      {
        title: 'Address',
        rows: [
          ['Address', '99 Market Street\nLeeds\nLS1 4AB']
        ]
      }
    ],
    caseRows: [
      ['Application code', 'MO72003'],
      ['Application found', 'Application for Registration/recognition of a foreign order in the UK Family Court'],
      ['Foreign court', 'District Court of Helsinki'],
      ['Date order made', '12 Mar 2025'],
      ['Central authority reference', 'FI-CA-20485']
    ],
    hearingRows: [
      ['Hearing type', 'Hearing outside England and Wales'],
      ['Date', '18 Mar 2025'],
      ['Time', '09:30'],
      ['Venue', 'Remote hearing'],
      ['Courtroom', 'Not applicable']
    ],
    historyItems: [
      { title: 'Hearing created', meta: '10 Apr 2026 at 09:45', body: 'Remote hearing scheduled and linked to the application.' },
      { title: 'Application details updated', meta: '09 Apr 2026 at 15:20', body: 'Foreign court and order date confirmed.' },
      { title: 'Case created', meta: '08 Apr 2026 at 10:00', body: 'Application received from Finnish Central Authority.' }
    ],
    notesRows: [
      ['Case note', 'Respondent requested contact by email where possible.'],
      ['Internal note', 'Application wording confirmed against reference data.']
    ]
  }
]

function cloneData(value) {
  return JSON.parse(JSON.stringify(value))
}

function buildBaseSessionData() {
  return cloneData(sessionDataDefaults)
}

function buildKatarzynaKowalczykMinorCreditor() {
  return {
    creditorType: 'individual',
    title: 'Ms',
    firstNames: 'Katarzyna',
    lastName: 'Kowalczyk',
    organisationName: '',
    addressLine1: 'ul. Grzybowska 12',
    addressLine2: 'Warszawa',
    addressLine3: '',
    addressLine4: '',
    addressLine5: '',
    postcode: '00-132',
    country: 'poland',
    bankAccountType: 'non-uk-bank-account',
    ukNameOnAccount: '',
    ukSortCode: '',
    ukAccountNumber: '',
    ukPaymentReference: '',
    nonUkNameOnAccount: 'Katarzyna Kowalczyk',
    nonUkBicOrSwiftCode: 'PKOPPLPW',
    nonUkIban: 'PL27114020040000300201355387',
    nonUkPaymentReference: 'KOWALCZYK-MICHAL',
    nonUkBankName: 'PKO Bank Polski',
    nonUkBranchOfficeOrSortCode: '11402004',
    nonUkAccountNumber: '300201355387'
  }
}

function buildCreateDataScenarios() {
  return {
    'create-a-case-remo-in': {
      label: 'Create a case: REMO In order journey',
      description: 'Seeds the create a case journey with a REMO In individual applicant (outside UK), UK respondent, two order terms, and completed order metadata.',
      redirectTo: '/create-a-case/case-details',
      sessionData: {
        ...buildBaseSessionData(),
        'create-a-case': {
          'case-type': 'remo-in',
          'applicant-type': 'individual',
          'has-order': 'yes',
          'applicant-title': 'Mrs',
          'applicant-first-names': 'Marta',
          'applicant-last-name': 'Kowalski',
          'applicant-date-of-birth': '14/03/1983',
          'applicant-main-email-address': 'marta.kowalski@example.test',
          'applicant-main-telephone-number': '+48601234567',
          'applicant-address-line-1': 'ul. Nowy Swiat 45',
          'applicant-address-line-2': 'Warszawa',
          'applicant-postal-or-zip-code': '00-042',
          'applicant-country': 'poland',
          'applicant-send-correspondence-to-third-party': 'yes',
          'applicant-third-party-name-or-organisation': 'Kancelaria Legalna Warszawa',
          'applicant-third-party-relationship': 'Solicitor',
          'applicant-third-party-reference': 'MK/REM/2026',
          'applicant-third-party-address-line-1': 'ul. Chmielna 12',
          'applicant-third-party-address-line-2': 'Warszawa',
          'applicant-third-party-postal-or-zip-code': '00-020',
          'applicant-third-party-country': 'poland',
          'applicant-bank-account-type': 'non-uk-bank-account',
          'applicant-bank-non-uk-name-on-account': 'Marta Kowalski',
          'applicant-bank-bic-or-swift-code': 'NBPLPLPW',
          'applicant-bank-iban': 'PL61109010140000071219812874',
          'applicant-restrict-personal-information': 'yes',
          'applicant-restriction-reason': 'There is a domestic violence case between the applicant and respondent.',
          'respondent-title': 'Mr',
          'respondent-first-names': 'Oleksandr',
          'respondent-last-name': 'Melnyk',
          'respondent-date-of-birth': '07/09/1980',
          'respondent-main-email-address': 'oleksandr.melnyk@example.test',
          'respondent-main-telephone-number': '+447700900456',
          'respondent-address-line-1': '32 Deansgate',
          'respondent-address-line-2': 'Manchester',
          'respondent-postal-or-zip-code': 'M3 4LY',
          'respondent-country': 'united-kingdom',
          'respondent-send-correspondence-to-third-party': 'yes',
          'respondent-third-party-name-or-organisation': 'Melnyk & Co Solicitors',
          'respondent-third-party-relationship': 'Solicitor',
          'respondent-third-party-reference': 'OM/REM/2026',
          'respondent-third-party-address-line-1': '18 King Street',
          'respondent-third-party-address-line-2': 'Manchester',
          'respondent-third-party-postal-or-zip-code': 'M2 6AG',
          'respondent-third-party-country': 'united-kingdom',
          'order-application-code': 'PL-REM-2026-088',
          'order-court-that-made-the-order': 'District Court of Warsaw',
          'order-date-order-made': '10/01/2026',
          'order-date-arrears-last-updated': '01/04/2026',
          'entered-order-terms': [
            {
              code: 'MAT',
              title: 'Matrimonial Order for Adult',
              category: 'FINAL',
              categoryLabel: 'Final',
              wording:
                'Order for payment by Oleksandr Melnyk to Marta Kowalski payable through the Court for the benefit of the Complainant.\nThe sum of £ 400.00 to be paid every month from 10 January 2026 until 10 January 2028.',
              responses: {
                'result-mat-amount': '400',
                'result-mat-frequency': 'monthly',
                'result-mat-expiry': '10/01/2028',
                'result-mat-arrears': '200',
                'result-mat-creditor': 'Marta Kowalski',
                'result-mat-respondent': 'Oleksandr Melnyk',
                'result-mat-payment': 'payable through the Court',
                'result-mat-commencement': '10/01/2026',
              },
              creditor: 'applicant',
              creditorLabel: 'Marta Kowalski'
            },
            {
              code: 'MCHILD',
              title: 'Maintenance Order for child(ren)',
              category: 'FINAL',
              categoryLabel: 'Final',
              wording:
                'Order for payment by Oleksandr Melnyk to Marta Kowalski payable through the Court for the benefit of the Complainant.\nThe sum of £ 250.00 to be paid every month from 10 January 2026 until 22 August 2035.',
              responses: {
                'result-mchild-amount': '250',
                'result-mchild-frequency': 'monthly',
                'result-mchild-expiry': '22/08/2035',
                'result-mchild-arrears': '100',
                'result-mchild-education': ['Additional terms affect order expiry'],
                'result-mchild-beneficiary': 'Zofia Melnyk',
                'result-mchild-child-dob': '22/08/2017',
                'result-mchild-respondent': 'Oleksandr Melnyk',
                'result-mchild-payment': 'payable through the Court',
                'result-mchild-commencement': '10/01/2026'
              },
              creditor: 'applicant',
              creditorLabel: 'Marta Kowalski'
            }
          ],
          'interest-and-indexation-completed': 'yes',
          'interest-applies': 'no',
          'indexation-type': 'no-indexation',
          'managing-payments-completed': 'yes',
          'order-managing-payments': 'payments-via-court',
          'case-comment': 'Seeded REMO In order journey for Marta Kowalski.',
          'case-notes': 'Applicant lives in Poland (outside UK) and respondent lives in Manchester (UK). MAT plus MCHILD terms recorded.',
          'applicant-details-completed': 'yes',
          'respondent-details-completed': 'yes',
          'order-details-completed': 'yes'
        }
      }
    },
    'create-a-case-order': {
      label: 'Create a case: REMO Out order journey',
      description: 'Seeds the create a case journey with a REMO Out individual applicant (UK), Polish respondent, three order terms, and completed order metadata.',
      redirectTo: '/create-a-case/case-details',
      sessionData: {
        ...buildBaseSessionData(),
        'create-a-case': {
          'case-type': 'remo-out',
          'applicant-type': 'individual',
          'has-order': 'yes',
          'applicant-title': 'Mrs',
          'applicant-first-names': 'Anna',
          'applicant-last-name': 'Nowak',
          'applicant-date-of-birth': '08/06/1985',
          'applicant-main-email-address': 'anna.nowak@example.test',
          'applicant-main-telephone-number': '+447700900221',
          'applicant-address-line-1': '14 Birch Close',
          'applicant-address-line-2': 'Leeds',
          'applicant-address-line-4': 'West Yorkshire',
          'applicant-postal-or-zip-code': 'LS14 2AB',
          'applicant-country': 'united-kingdom',
          'applicant-send-correspondence-to-third-party': 'yes',
          'applicant-third-party-name-or-organisation': 'Leeds Family Law Solicitors',
          'applicant-third-party-relationship': 'Solicitor',
          'applicant-third-party-reference': 'AN/REM/2026',
          'applicant-third-party-address-line-1': '21 Park Square East',
          'applicant-third-party-address-line-2': 'Leeds',
          'applicant-third-party-address-line-4': 'West Yorkshire',
          'applicant-third-party-postal-or-zip-code': 'LS1 2NE',
          'applicant-third-party-country': 'united-kingdom',
          'applicant-bank-account-type': 'uk-bank-account',
          'applicant-bank-name-on-account': 'Anna Nowak',
          'applicant-bank-sort-code': '20-45-67',
          'applicant-bank-account-number': '12345678',
          'applicant-bank-payment-reference': 'NOWAK-FAMILY',
          'applicant-restrict-personal-information': 'yes',
          'applicant-restriction-reason': 'There is a domestic violence case between the applicant and respondent.',
          'respondent-title': 'Mr',
          'respondent-first-names': 'Piotr',
          'respondent-last-name': 'Nowak',
          'respondent-date-of-birth': '19/11/1982',
          'respondent-main-email-address': 'piotr.nowak@example.test',
          'respondent-main-telephone-number': '+48500111222',
          'respondent-address-line-1': 'ul. Marszalkowska 24',
          'respondent-address-line-2': 'Warszawa',
          'respondent-postal-or-zip-code': '00-576',
          'respondent-country': 'poland',
          'respondent-send-correspondence-to-third-party': 'yes',
          'respondent-third-party-name-or-organisation': 'Kancelaria Prawna Nowak',
          'respondent-third-party-relationship': 'Solicitor',
          'respondent-third-party-reference': 'PN/REM/2026',
          'respondent-third-party-address-line-1': 'ul. Nowogrodzka 18',
          'respondent-third-party-address-line-2': 'Warszawa',
          'respondent-third-party-postal-or-zip-code': '00-511',
          'respondent-third-party-country': 'poland',
          'order-application-code': 'HC07003',
          'order-court-that-made-the-order': 'Leeds Family Court',
          'order-date-order-made': '14/02/2026',
          'order-date-arrears-last-updated': '01/04/2026',
          'minor-creditors': [
            buildKatarzynaKowalczykMinorCreditor()
          ],
          'entered-order-terms': [
            {
              code: 'MAT',
              title: 'Matrimonial Order for Adult',
              category: 'FINAL',
              categoryLabel: 'Final',
              wording:
                'Order for payment by Piotr Nowak to Anna Nowak payable through the Court for the benefit of the Complainant.\nThe sum of £ 325.00 to be paid every month from 14 February 2026 until 14 February 2027.',
              responses: {
                'result-mat-amount': '325',
                'result-mat-frequency': 'monthly',
                'result-mat-expiry': '14/02/2027',
                'result-mat-arrears': '150',
                'result-mat-creditor': 'Anna Nowak',
                'result-mat-respondent': 'Piotr Nowak',
                'result-mat-payment': 'payable through the Court',
                'result-mat-commencement': '14/02/2026',
              },
              creditor: 'applicant',
              creditorLabel: 'Anna Nowak'
            },
            {
              code: 'MCHILD',
              title: 'Maintenance Order for child(ren)',
              category: 'FINAL',
              categoryLabel: 'Final',
              wording:
                'Order for payment by Piotr Nowak to Anna Nowak payable through the Court for the benefit of the Complainant.\nThe sum of £ 220.00 to be paid every month from 14 February 2026 until 15 March 2034.',
              responses: {
                'result-mchild-amount': '220',
                'result-mchild-frequency': 'monthly',
                'result-mchild-expiry': '15/03/2034',
                'result-mchild-arrears': '80',
                'result-mchild-education': ['Additional terms affect order expiry'],
                'result-mchild-beneficiary': 'Sofia Nowak',
                'result-mchild-child-dob': '15/03/2016',
                'result-mchild-respondent': 'Piotr Nowak',
                'result-mchild-payment': 'payable through the Court',
                'result-mchild-commencement': '14/02/2026'
              },
              creditor: 'applicant',
              creditorLabel: 'Anna Nowak'
            },
            {
              code: 'MCHILD',
              title: 'Maintenance Order for child(ren)',
              category: 'FINAL',
              categoryLabel: 'Final',
              wording:
                'Order for payment by Piotr Nowak to Katarzyna Kowalczyk payable through the Court for the benefit of the Complainant.\nThe sum of £ 220.00 to be paid every month from 14 February 2026 until 22 September 2036.',
              responses: {
                'result-mchild-amount': '220',
                'result-mchild-frequency': 'monthly',
                'result-mchild-expiry': '22/09/2036',
                'result-mchild-arrears': '80',
                'result-mchild-education': ['Additional terms affect order expiry'],
                'result-mchild-beneficiary': 'Michal Nowak',
                'result-mchild-child-dob': '22/09/2018',
                'result-mchild-respondent': 'Piotr Nowak',
                'result-mchild-payment': 'payable through the Court',
                'result-mchild-commencement': '14/02/2026'
              },
              creditor: 'new-minor-creditor',
              creditorLabel: 'Katarzyna Kowalczyk',
              minorCreditorData: buildKatarzynaKowalczykMinorCreditor()
            }
          ],
          'interest-and-indexation-completed': 'yes',
          'interest-applies': 'no',
          'indexation-type': 'no-indexation',
          'managing-payments-completed': 'yes',
          'order-managing-payments': 'payments-via-court',
          'central-authority-remo-reference': 'UK-REMO-2026-049',
          'central-authority-reference': 'PL-MJ-2026-203',
          'central-authority-name': 'Polish Central Authority',
          'case-comment': 'Seeded REMO Out order journey for Anna Nowak and her two children.',
          'case-notes': 'Applicant lives in the UK (Leeds) and respondent lives in Poland (Warsaw). MAT plus 2 MCHILD terms recorded.',
          'applicant-details-completed': 'yes',
          'respondent-details-completed': 'yes',
          'central-authority-details-completed': 'yes',
          'order-details-completed': 'yes'
        }
      }
    },
    resulting: {
      label: 'Resulting: record selected',
      description: 'Seeds the resulting journey with a selected record, party details, and one result already entered.',
      redirectTo: '/resulting/case-details',
      sessionData: {
        ...buildBaseSessionData(),
        'resulting-search-mode': 'record-number',
        'resulting-selected-record-id': '18392016A',
        'case-type': 'remo-in',
        'applicant-type': 'individual',
        'applicant-title': 'Ms',
        'applicant-first-names': 'Katarina',
        'applicant-last-name': 'Horvath',
        'applicant-main-email-address': 'katarina.horvath@example.test',
        'applicant-main-telephone-number': '+447700900124',
        'applicant-address-line-1': '15 North Road',
        'applicant-address-line-2': 'Leeds',
        'applicant-postal-or-zip-code': 'LS1 4AB',
        'applicant-country': 'united-kingdom',
        'applicant-send-correspondence-to-third-party': 'yes',
        'applicant-third-party-name-or-organisation': 'North Road Legal Solicitors',
        'applicant-third-party-relationship': 'Solicitor',
        'applicant-third-party-reference': 'PA/RES/2026',
        'applicant-third-party-address-line-1': '5 Greek Street',
        'applicant-third-party-address-line-2': 'Leeds',
        'applicant-third-party-postal-or-zip-code': 'LS1 5RU',
        'applicant-third-party-country': 'united-kingdom',
        'applicant-bank-account-type': 'non-uk-bank-account',
        'applicant-bank-non-uk-name-on-account': 'Katarina Horvath',
        'applicant-bank-bic-or-swift-code': 'TRWIBEB1XXX',
        'applicant-bank-iban': 'BE68539007547034',
        'applicant-bank-non-uk-payment-reference': 'HORVATH-REMO',
        'respondent-title': 'Mr',
        'respondent-first-names': 'Matej',
        'respondent-last-name': 'Novotny',
        'respondent-date-of-birth': '23/06/2002',
        'respondent-address-line-1': '99 High Street',
        'respondent-address-line-2': 'Reading',
        'respondent-postal-or-zip-code': 'RG10 9RT',
        'respondent-country': 'united-kingdom',
        'respondent-send-correspondence-to-third-party': 'yes',
        'respondent-third-party-name-or-organisation': 'Reading Family Solicitors',
        'respondent-third-party-relationship': 'Solicitor',
        'respondent-third-party-reference': 'EF/RES/2026',
        'respondent-third-party-address-line-1': '44 Friar Street',
        'respondent-third-party-address-line-2': 'Reading',
        'respondent-third-party-postal-or-zip-code': 'RG1 1DX',
        'respondent-third-party-country': 'united-kingdom',
        'hearing-date': '07/04/2026',
        'hearing-start-time': '10:00',
        'hearing-court': 'Bury St Edmunds',
        'hearing-courtroom-number': 'Courtroom 3',
        'resulting-recorded-results': [
          {
            code: 'MTEMP',
            title: 'Temporary order',
            category: 'FINAL',
            categoryLabel: 'Final',
            wording: 'Temporary order for payment by Matej Novotny to Applicant. Pending review.',
            responses: {
              creditor: 'Applicant',
              respondent: 'Matej Novotny',
              reason: 'Pending review'
            }
          }
        ],
        'resulting-session-details-completed': 'yes',
        'resulting-judge': 'District Judge Patel',
        'resulting-session-start-time': '10:00',
        'resulting-session-end-time': '11:15',
        'applicant-details-completed': 'yes',
        'respondent-details-completed': 'yes'
      }
    }
  }
}

const countryNames = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo',
  'Costa Rica',
  "Côte d'Ivoire",
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czechia',
  'Democratic Republic of the Congo',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Korea',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe'
]

function slugifyCountryName(countryName) {
  return countryName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
}

const countryLabels = Object.fromEntries(
  countryNames.map((countryName) => [slugifyCountryName(countryName), countryName])
)

const applicationDefinitions = Object.fromEntries(
  applicationDefinitionList.map((definition) => [
    definition.code,
    {
      ...definition,
      wordingTemplate: definition.registerText
    }
  ])
)

const englandAndWalesCourts = [
  'Davids Magistrates Court',
  'Davids Crown Court',
  'Davids County Court'
]

const resultingEnglandAndWalesSessions = [
  {
    court: 'Davids Magistrates Court',
    date: '16/03/2026',
    courtroom: '2',
    recordCount: 6
  },
  {
    court: 'Davids Crown Court',
    date: '16/03/2026',
    courtroom: '5',
    recordCount: 3
  },
  {
    court: 'Davids County Court',
    date: '17/03/2026',
    courtroom: '1',
    recordCount: 4
  }
]

const resultingUnscheduledSessions = [
  {
    court: 'Warsaw Regional Court, Poland',
    date: '16/03/2026',
    recordCount: 5
  },
  {
    court: 'Ontario Court of Justice, Canada',
    date: '16/03/2026',
    recordCount: 2
  },
  {
    court: 'District Court of Riga, Latvia',
    date: '17/03/2026',
    recordCount: 4
  }
]

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

function hasImplicitIndividualApplicantType(sessionData) {
  return ['remo-out', 'remo-out-cms'].includes(sessionData['case-type'])
}

function isApplicationJourney(sessionData) {
  return hasValue(sessionData['case-type']) && sessionData['has-order'] === 'no'
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

function hasValidManagingPaymentsSelection(sessionData) {
  return ['payments-via-court', 'direct-payments'].includes(sessionData['order-managing-payments'])
}

function hasCompletedManagingPayments(sessionData) {
  return Boolean(
    sessionData['managing-payments-completed'] &&
      hasValidManagingPaymentsSelection(sessionData)
  )
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
    country: body['minor-creditor-country'] || '',
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

  const fullName = [getTitleLabel(creditor.title), creditor.firstNames, creditor.lastName]
    .filter(hasValue)
    .join(' ')

  if (hasValue(fullName)) {
    return fullName
  }

  return `Minor creditor ${index + 1}`
}

function getMinorCreditorAddressHtml(creditor) {
  return formatLinesHtml([
    creditor.addressLine1,
    creditor.addressLine2,
    creditor.addressLine3,
    creditor.addressLine4,
    creditor.addressLine5,
    creditor.postcode,
    creditor.country ? (countryLabels[creditor.country] || creditor.country) : null
  ])
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

  addMinorCreditorBankRows(rows, creditor)

  return rows
}

function addMinorCreditorBankRows(rows, creditor) {
  if (creditor.bankAccountType === 'uk-bank-account') {
    rows.push(
      buildSummaryRow('Type of bank account', 'UK bank account'),
      buildSummaryRow('Name on account', creditor.ukNameOnAccount),
      buildSummaryRow('Sort code', creditor.ukSortCode),
      buildSummaryRow('Account number', creditor.ukAccountNumber),
      buildSummaryRow('Payment reference', creditor.ukPaymentReference)
    )
  } else if (creditor.bankAccountType === 'non-uk-bank-account') {
    rows.push(
      buildSummaryRow('Type of bank account', 'Non-UK bank account'),
      buildSummaryRow('Name on account', creditor.nonUkNameOnAccount),
      buildSummaryRow('BIC or SWIFT code', creditor.nonUkBicOrSwiftCode),
      buildSummaryRow('IBAN', creditor.nonUkIban),
      buildSummaryRow('Payment reference', creditor.nonUkPaymentReference)
    )
    addSummaryRowIfHasValue(rows, 'Bank name', creditor.nonUkBankName)
    addSummaryRowIfHasValue(
      rows,
      'Branch code or sort code',
      creditor.nonUkBranchOfficeOrSortCode
    )
    addSummaryRowIfHasValue(rows, 'Account number', creditor.nonUkAccountNumber)
  } else {
    rows.push(buildSummaryRow('Type of bank account', 'None entered'))
  }
}

function getMinorCreditorDetailsRows(creditor) {
  const rows = [
    buildSummaryHtmlRow('Address', getMinorCreditorAddressHtml(creditor))
  ]

  addMinorCreditorBankRows(rows, creditor)

  return rows
}

function getApplicationDefinition(applicationCode) {
  return applicationDefinitions[String(getSingleValue(applicationCode) || '').trim().toUpperCase()] || null
}

function getApplicationGroupsForCaseType(caseType) {
  const sharedGroups = ['APPEAL', 'Conversion Cases', 'OTBM']

  if (caseType === 'remo-in') {
    return ['REMO IN', ...sharedGroups]
  }

  if (caseType === 'remo-out') {
    return ['REMO OUT', ...sharedGroups]
  }

  if (caseType === 'remo-out-cms') {
    return null
  }

  return sharedGroups
}

function getApplicationDefinitionsForCaseType(caseType) {
  const allowedGroups = getApplicationGroupsForCaseType(caseType)

  if (!allowedGroups) {
    return applicationDefinitionList
  }

  return applicationDefinitionList.filter((definition) => allowedGroups.includes(definition.group))
}

function getApplicationDefinitionsByGroup(group) {
  return applicationDefinitionList.filter((definition) => definition.group === group)
}

function isApplicationDefinitionAvailableForCaseType(applicationCode, caseType) {
  const definition = getApplicationDefinition(applicationCode)

  if (!definition) {
    return false
  }

  const allowedGroups = getApplicationGroupsForCaseType(caseType)

  if (!allowedGroups) {
    return true
  }

  return allowedGroups.includes(definition.group)
}

function getDefaultOrderApplicationCodeForCaseType(caseType) {
  if (caseType === 'remo-in') {
    return 'CJ82002'
  }

  if (caseType === 'remo-out') {
    return 'HC07003'
  }

  return ''
}

function getApplicationOptionItems(selectedApplicationCode, caseType) {
  const selectedCode = String(getSingleValue(selectedApplicationCode) || '')
    .trim()
    .toUpperCase()

  return getApplicationDefinitionsForCaseType(caseType).map((definition) => ({
    text: `${definition.code} - ${definition.title}`,
    value: definition.code,
    selected: definition.code === selectedCode
  }))
}

function getApplicationLookupJson(caseType) {
  return JSON.stringify(
    Object.fromEntries(
      getApplicationDefinitionsForCaseType(caseType).map((definition) => [definition.code, definition.title])
    )
  )
}

function getMinorCreditorCards(sessionData) {
  return getMinorCreditors(sessionData).map((creditor, index) => ({
    title: getMinorCreditorName(creditor, index),
    rows: getMinorCreditorSummaryRows(creditor),
    changeHref: `/create-a-case/minor-creditors/${index}/edit`,
    removeHref: `/create-a-case/minor-creditors/${index}/remove`
  }))
}

function getApplicantFullName(sessionData) {
  if (sessionData['applicant-type'] === 'organisation') {
    return sessionData['applicant-organisation-name'] || ''
  }

  return [
    getTitleLabel(sessionData['applicant-title']),
    sessionData['applicant-first-names'],
    sessionData['applicant-last-name']
  ]
    .filter(hasValue)
    .join(' ')
}

function getApplicantCreditorLabel(sessionData) {
  if (sessionData['applicant-type'] === 'organisation' && hasValue(sessionData['applicant-organisation-name'])) {
    return sessionData['applicant-organisation-name']
  }

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

  return `£${number.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
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
  return hasValue(value) ? value : '–'
}

function formatLinesHtml(lines) {
  const filteredLines = lines.filter(hasValue)

  if (!filteredLines.length) {
    return '–'
  }

  return filteredLines.map((line) => escapeHtml(line)).join('<br>')
}

function getCountryLabel(country) {
  return countryLabels[country] || formatTextValue(country)
}

function getCountrySelectItems(selectedCountry) {
  const ukValue = slugifyCountryName('United Kingdom')
  const otherCountries = countryNames.filter((name) => name !== 'United Kingdom')

  return [
    { text: '', value: '', selected: !selectedCountry },
    { text: 'United Kingdom', value: ukValue, selected: selectedCountry === ukValue },
    { text: '──────────────', value: '', disabled: true },
    ...otherCountries.map((countryName) => {
      const value = slugifyCountryName(countryName)
      return { text: countryName, value, selected: selectedCountry === value }
    })
  ]
}

function getTitleLabel(title) {
  return titleLabels[String(title || '').toLowerCase()] || formatTextValue(title)
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

function addSummaryRowIfHasValue(rows, keyText, valueText) {
  if (hasValue(valueText)) {
    rows.push(buildSummaryRow(keyText, valueText))
  }
}

function buildSummarySectionHeadingRow(headingText) {
  return {
    classes: 'rm-summary-list__section-heading rm-summary-list__section-start',
    key: {
      text: headingText
    },
    value: {
      html: ''
    }
  }
}

function getThirdPartySummaryRows(sessionData, party) {
  return [
    buildSummarySectionHeadingRow('Third party details'),
    buildSummaryRow(
      'Third party name',
      sessionData[`${party}-third-party-name-or-organisation`]
    ),
    buildSummaryRow(
      `Relationship to ${party}`,
      sessionData[`${party}-third-party-relationship`]
    ),
    buildSummaryRow('Reference', sessionData[`${party}-third-party-reference`]),
    buildSummaryHtmlRow(
      'Address',
      formatLinesHtml([
        sessionData[`${party}-third-party-address-line-1`],
        sessionData[`${party}-third-party-address-line-2`],
        sessionData[`${party}-third-party-address-line-3`],
        sessionData[`${party}-third-party-address-line-4`],
        sessionData[`${party}-third-party-address-line-5`],
        sessionData[`${party}-third-party-postal-or-zip-code`],
        getCountryLabel(sessionData[`${party}-third-party-country`])
      ])
    )
  ]
}

function hasThirdPartyCorrespondenceDetails(sessionData, party) {
  return (
    sessionData[`${party}-send-correspondence-to-third-party`] === true ||
    sessionData[`${party}-send-correspondence-to-third-party`] === 'yes' ||
    hasValue(sessionData[`${party}-third-party-name-or-organisation`])
  )
}

function getApplicantBankSummaryRows(sessionData) {
  const rows = [
    buildSummarySectionHeadingRow('Bank details')
  ]

  if (sessionData['applicant-bank-account-type'] === 'uk-bank-account') {
    rows.push(
      buildSummaryRow('Type of bank account', 'UK bank account'),
      buildSummaryRow('Name on account', sessionData['applicant-bank-name-on-account']),
      buildSummaryRow('Sort code', sessionData['applicant-bank-sort-code']),
      buildSummaryRow('Account number', sessionData['applicant-bank-account-number']),
      buildSummaryRow('Payment reference', sessionData['applicant-bank-payment-reference'])
    )
  } else if (sessionData['applicant-bank-account-type'] === 'non-uk-bank-account') {
    rows.push(
      buildSummaryRow('Type of bank account', 'Non-UK bank account'),
      buildSummaryRow('Name on account', sessionData['applicant-bank-non-uk-name-on-account']),
      buildSummaryRow('BIC or SWIFT code', sessionData['applicant-bank-bic-or-swift-code']),
      buildSummaryRow('IBAN', sessionData['applicant-bank-iban']),
      buildSummaryRow(
        'Payment reference',
        sessionData['applicant-bank-non-uk-payment-reference']
      )
    )
    addSummaryRowIfHasValue(rows, 'Bank name', sessionData['applicant-bank-name'])
    addSummaryRowIfHasValue(
      rows,
      'Branch code or sort code',
      sessionData['applicant-bank-branch-office-or-sort-code']
    )
    addSummaryRowIfHasValue(
      rows,
      'Account number',
      sessionData['applicant-bank-non-uk-account-number']
    )
  } else {
    rows.push(buildSummaryRow('Type of bank account', 'None entered'))
  }

  return rows
}

function getApplicationTitle(sessionData) {
  const definition = getApplicationDefinition(sessionData['application-code'])
  return definition ? definition.title : ''
}

function getResultingApplicationTitle(sessionData) {
  const otbmDefinitions = getApplicationDefinitionsByGroup('OTBM')
  const selectedDefinition = getApplicationDefinition(sessionData['application-code'])

  if (selectedDefinition?.group === 'OTBM') {
    return selectedDefinition.title
  }

  return otbmDefinitions[0]?.title || ''
}

function getApplicationResponseValues(sessionData) {
  return sessionData['application-response-values'] || {}
}

function getAlternativeApplicationResponseValues(sessionData) {
  return sessionData['application-response-values'] || {}
}

function getApplicationRegisterTokens(definition) {
  if (!definition?.registerText) {
    return []
  }

  return [...new Set(Array.from(definition.registerText.matchAll(/\[([^\]]+)\]/g), (match) => match[1].trim()))]
}

function getApplicationResponseFieldType(token) {
  const normalisedToken = normaliseComparableText(token)

  if (normalisedToken.includes('date')) {
    return 'date'
  }

  if (normalisedToken.includes('grounds') || normalisedToken.includes('details') || normalisedToken.includes('terms')) {
    return 'textarea'
  }

  if (normalisedToken.includes('court')) {
    return 'text'
  }

  return 'text'
}

function getApplicationResponseFieldId(token) {
  return `application-field-${normaliseComparableText(token).replace(/\s+/g, '-')}`
}

function getApplicationResponsePrompt(token) {
  const text = cleanWorkbookText(token)
  return text.charAt(0).toUpperCase() + text.slice(1)
}

function getApplicationResponseFields(sessionData) {
  const definition = getApplicationDefinition(sessionData['application-code'])
  const values = getApplicationResponseValues(sessionData)

  if (!definition) {
    return []
  }

  return getApplicationRegisterTokens(definition).map((token) => ({
    id: getApplicationResponseFieldId(token),
    token,
    prompt: getApplicationResponsePrompt(token),
    type: getApplicationResponseFieldType(token),
    value: values[getApplicationResponseFieldId(token)] || ''
  }))
}

function getAlternativeApplicationResponseFields(sessionData) {
  const definition = getApplicationDefinition(sessionData['application-code'])
  const values = getAlternativeApplicationResponseValues(sessionData)

  if (!definition) {
    return []
  }

  return getApplicationRegisterTokens(definition).map((token) => ({
    id: getApplicationResponseFieldId(token),
    token,
    prompt: getApplicationResponsePrompt(token),
    type: getApplicationResponseFieldType(token),
    value: values[getApplicationResponseFieldId(token)] || ''
  }))
}

function getApplicationPlaceholderValue(sessionData, token) {
  const fieldId = getApplicationResponseFieldId(token)
  const value = getApplicationResponseValues(sessionData)[fieldId]

  if (!hasValue(value)) {
    return `[${token}]`
  }

  if (getApplicationResponseFieldType(token) === 'date') {
    return formatDateLong(value)
  }

  return value
}

function getAlternativeApplicationPlaceholderValue(sessionData, token) {
  const fieldId = getApplicationResponseFieldId(token)
  const value = getAlternativeApplicationResponseValues(sessionData)[fieldId]

  if (!hasValue(value)) {
    return `[${token}]`
  }

  if (getApplicationResponseFieldType(token) === 'date') {
    return formatDateLong(value)
  }

  return value
}

function getApplicationWording(sessionData) {
  const definition = getApplicationDefinition(sessionData['application-code'])

  if (!definition) {
    return ''
  }

  return definition.wordingTemplate.replace(/\[([^\]]+)\]/g, (match, token) =>
    getApplicationPlaceholderValue(sessionData, token)
  )
}

function getAlternativeApplicationWording(sessionData) {
  const definition = getApplicationDefinition(sessionData['application-code'])

  if (!definition) {
    return ''
  }

  return definition.wordingTemplate.replace(/\[([^\]]+)\]/g, (match, token) =>
    getAlternativeApplicationPlaceholderValue(sessionData, token)
  )
}

function getApplicationCodeWithTitle(applicationCode, fallbackTitle = '') {
  const code = String(getSingleValue(applicationCode) || '').trim()
  const definition = getApplicationDefinition(code)
  const title = definition?.title || fallbackTitle

  return [code, title].filter(hasValue).join(' - ')
}

function getApplicationSummaryRows(sessionData) {
  return [
    buildSummaryRow(
      'Application code',
      getApplicationCodeWithTitle(sessionData['application-code'])
    ),
    buildSummaryRow('Application wording', getApplicationWording(sessionData))
  ]
}

function getAlternativeOrderDetailsSummaryRows(sessionData) {
  return [
    buildSummaryRow(
      'Application code',
      getApplicationCodeWithTitle(
        sessionData['order-application-code'],
        'Application from EU Country for registration or recognition of an order in the family court'
      )
    ),
    buildSummaryRow('Court that made the order', sessionData['order-court-that-made-the-order']),
    buildSummaryRow('Date order made', formatDateLong(sessionData['order-date-order-made'])),
    buildSummaryRow(
      'Date arrears last updated',
      formatDateLong(sessionData['order-date-arrears-last-updated'])
    )
  ]
}

function getHearingTypeLabel(hearingType) {
  const labels = {
    'schedule-england-wales': 'Schedule a hearing in England and Wales',
    'non-scheduled': 'Record a hearing outside of England and Wales'
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

function getResultingRecordSummaryRows(sessionData) {
  const applicantName = [
    getTitleLabel(sessionData['applicant-title']),
    sessionData['applicant-first-names'],
    sessionData['applicant-last-name']
  ]
    .filter(hasValue)
    .join(' ')

  const respondentName = [
    getTitleLabel(sessionData['respondent-title']),
    sessionData['respondent-first-names'],
    sessionData['respondent-last-name']
  ]
    .filter(hasValue)
    .join(' ')

  const hearingDetails =
    sessionData['hearing-type'] === 'schedule-england-wales'
      ? [
          sessionData['hearing-court'],
          formatDateLong(sessionData['hearing-date']),
          hasValue(sessionData['hearing-courtroom-number'])
            ? `Courtroom ${sessionData['hearing-courtroom-number']}`
            : '',
          sessionData['hearing-start-time']
        ]
          .filter(hasValue)
          .join(', ')
      : [
          sessionData['hearing-non-scheduled-details'],
          formatDateLong(sessionData['hearing-date'])
        ]
          .filter(hasValue)
          .join(', ')

  return [
    buildSummaryRow('Record number', sessionData['resulting-record-number']),
    buildSummaryRow('Applicant name', applicantName || 'Applicant not provided'),
    buildSummaryRow('Respondent name', respondentName || 'Respondent not provided'),
    buildSummaryRow(
      'Hearing details',
      hasValue(hearingDetails) ? hearingDetails : 'Hearing details not provided'
    )
  ]
}

function getResultingHearingString(sessionData) {
  const date =
    sessionData['hearing-date'] ||
    sessionData['resulting-ew-date'] ||
    sessionData['resulting-unscheduled-date'] ||
    ''
  const time = sessionData['hearing-start-time'] || '10:00'
  const venue =
    sessionData['hearing-court'] ||
    sessionData['resulting-ew-court'] ||
    sessionData['hearing-non-scheduled-details'] ||
    sessionData['resulting-selected-session-court'] ||
    'Bury St Edmunds Magistrates Court'

  return [formatDateLong(date), time, venue].filter(hasValue).join(', ')
}

function getResultingRecordSearchMatches(sessionData) {
  const respondentName = [
    getTitleLabel(sessionData['respondent-title']),
    sessionData['respondent-first-names'],
    sessionData['respondent-last-name']
  ]
    .filter(hasValue)
    .join(' ')
  const applicantName = [
    getTitleLabel(sessionData['applicant-title']),
    sessionData['applicant-first-names'],
    sessionData['applicant-last-name']
  ]
    .filter(hasValue)
    .join(' ')
  const sharedHearing = getResultingHearingString(sessionData)
  const sharedVenue =
    sessionData['hearing-court'] ||
    sessionData['resulting-ew-court'] ||
    sessionData['hearing-non-scheduled-details'] ||
    sessionData['resulting-selected-session-court'] ||
    'Bury St Edmunds Magistrates Court'

  const matches = [
    {
      id: 'record-1',
      accountNumber: sessionData['resulting-record-number'] || '18392016A',
      respondentName: respondentName || 'Mr Marek Kowalski',
      applicantName: applicantName || 'Ms Ewa Kowalska',
      balance: 0,
      balanceDisplay: formatCurrency(0),
      hearing: sharedHearing || '24 March 2026, 10:00, Bury St Edmunds Magistrates Court',
      hearingDate:
        sessionData['hearing-date'] || sessionData['resulting-ew-date'] || '24/03/2026',
      hearingTime: sessionData['hearing-start-time'] || '10:00',
      courtVenue: sharedVenue,
      courtroom: sessionData['hearing-courtroom-number'] || '2',
      respondentAccountNumber: '13000988U',
      respondentAddressLines: ['24 High Street', 'Twyford', 'Berkshire', 'RG10 9RT'],
      applicantAccountNumber: '13034923P',
      applicantAddressLines: ['84 REDA', 'GDANSKA', 'POLAND'],
      totalArrears: 25,
      orderedToPay: 25,
      frequency: 'Monthly',
      comments: '-'
    },
    {
      id: 'record-2',
      accountNumber: '92746103B',
      respondentName: 'Mr Matej Novotny',
      applicantName: 'Ms Katarina Horvath',
      balance: 120,
      balanceDisplay: formatCurrency(120),
      hearing: '24 March 2026, 11:00, Bury St Edmunds Magistrates Court',
      hearingDate: '24/03/2026',
      hearingTime: '11:00',
      courtVenue: 'Bury St Edmunds Magistrates Court',
      courtroom: '4',
      respondentAccountNumber: '13000991Q',
      respondentAddressLines: ['99 High Street', 'Bury St Edmunds', 'IP33 1AA'],
      applicantAccountNumber: '13034929R',
      applicantAddressLines: ['14 Market Street', 'Reading', 'RG1 1AA'],
      totalArrears: 120,
      orderedToPay: 25,
      frequency: 'Monthly',
      comments: '-'
    },
    {
      id: 'record-3',
      accountNumber: '34017892C',
      respondentName: 'Mr Nikolai Dimitrov',
      applicantName: 'Ms Irina Petrova',
      balance: 47.32,
      balanceDisplay: formatCurrency(47.32),
      hearing: '24 March 2026, 14:00, Bury St Edmunds Magistrates Court',
      hearingDate: '24/03/2026',
      hearingTime: '14:00',
      courtVenue: 'Bury St Edmunds Magistrates Court',
      courtroom: '1',
      respondentAccountNumber: '13001021K',
      respondentAddressLines: ['11 Church Road', 'Cambridge', 'CB1 2XY'],
      applicantAccountNumber: '13034945T',
      applicantAddressLines: ['1 Oak Avenue', 'Warsaw', 'Poland'],
      totalArrears: 47.32,
      orderedToPay: 15,
      frequency: 'Weekly',
      comments: '-'
    }
  ]

  return matches
}

function getSelectedResultingRecordMatch(sessionData) {
  const selectedId = sessionData['resulting-selected-record-id']
  return getResultingRecordSearchMatches(sessionData).find((match) => match.id === selectedId) || null
}

function getUppercaseSurnameDisplay(name) {
  const parts = String(name || '').trim().split(/\s+/).filter(Boolean)

  if (!parts.length) {
    return ''
  }

  if (parts.length === 1) {
    return parts[0].toUpperCase()
  }

  return `${parts.slice(0, -1).join(' ')} ${parts[parts.length - 1].toUpperCase()}`
}

function getResultingAccountContextLabel(sessionData) {
  const selectedMatch = getSelectedResultingRecordMatch(sessionData)

  if (selectedMatch) {
    return `${selectedMatch.accountNumber} - ${getUppercaseSurnameDisplay(selectedMatch.respondentName)}`
  }

  if (!hasValue(sessionData['resulting-record-number'])) {
    return ''
  }

  const respondentName = [
    getTitleLabel(sessionData['respondent-title']),
    sessionData['respondent-first-names'],
    hasValue(sessionData['respondent-last-name'])
      ? String(sessionData['respondent-last-name']).toUpperCase()
      : ''
  ]
    .filter(hasValue)
    .join(' ')

  return respondentName
    ? `${sessionData['resulting-record-number']} - ${respondentName}`
    : sessionData['resulting-record-number']
}

function getResultingConfirmPartyRows(accountNumber, name, addressLines) {
  return [
    buildSummaryRow('Account number', accountNumber),
    buildSummaryRow('Name', name),
    buildSummaryHtmlRow('Address', formatLinesHtml(addressLines || []))
  ]
}

function getResultingConfirmHearingRows(match) {
  return [
    buildSummaryRow('Date', formatDateLong(match?.hearingDate || '')),
    buildSummaryRow('Time', match?.hearingTime || ''),
    buildSummaryRow('Court venue', match?.courtVenue || ''),
    buildSummaryRow('Courtroom', match?.courtroom || '')
  ]
}

function getResultingEnglandAndWalesSessions(sessionData) {
  const sessions = [...resultingEnglandAndWalesSessions]

  if (sessionData['hearing-type'] === 'schedule-england-wales') {
    sessions.unshift({
      court: sessionData['hearing-court'] || 'Court not provided',
      date: sessionData['hearing-date'] || '',
      courtroom: sessionData['hearing-courtroom-number'] || '-',
      recordCount: 1
    })
  }

  return sessions
}

function getResultingUnscheduledSessions(sessionData) {
  const sessions = [...resultingUnscheduledSessions]

  if (sessionData['hearing-type'] === 'non-scheduled') {
    sessions.unshift({
      court: sessionData['hearing-non-scheduled-details'] || 'Court not provided',
      date: sessionData['hearing-date'] || '',
      recordCount: 1
    })
  }

  return sessions
}

function getEnglandAndWalesSearchMatches(sessionData) {
  const court = getSingleValue(sessionData['resulting-ew-court'])
  const date = getSingleValue(sessionData['resulting-ew-date'])

  if (!hasValue(court) || !hasValue(date)) {
    return []
  }

  const exactMatches = getResultingEnglandAndWalesSessions(sessionData).filter(
    (session) => session.court === court && session.date === date
  )

  if (exactMatches.length) {
    return exactMatches
  }

  return getResultingEnglandAndWalesSessions(sessionData).map((session, index) => ({
    ...session,
    court: index === 0 ? court : session.court,
    date: index === 0 ? date : session.date
  }))
}

function getUnscheduledSearchMatches(sessionData) {
  const date = getSingleValue(sessionData['resulting-unscheduled-date'])

  if (!hasValue(date)) {
    return []
  }

  const exactMatches = getResultingUnscheduledSessions(sessionData).filter(
    (session) => session.date === date
  )

  if (exactMatches.length) {
    return exactMatches
  }

  return getResultingUnscheduledSessions(sessionData).map((session, index) => ({
    ...session,
    date: index === 0 ? date : session.date
  }))
}

function getEnglandAndWalesSearchRows(sessionData) {
  return getEnglandAndWalesSearchMatches(sessionData).map((session) => [
    {
      text: session.court
    },
    {
      text: session.date
    },
    {
      text: session.courtroom
    },
    {
      text: String(session.recordCount)
    },
    {
      html: '<a class="govuk-link" href="/resulting/view-records">View records</a>'
    }
  ])
}

function getUnscheduledSearchRows(sessionData) {
  return getUnscheduledSearchMatches(sessionData).map((session) => [
    {
      text: session.court
    },
    {
      text: session.date
    },
    {
      text: String(session.recordCount)
    },
    {
      html: '<a class="govuk-link" href="/resulting/view-records">View records</a>'
    }
  ])
}

function getResultingSearchCriteriaRows(sessionData) {
  if (sessionData['resulting-search-mode'] === 'england-wales') {
    return [
      buildSummaryRow('Hearing type', 'England and Wales hearing'),
      buildSummaryRow('Court', sessionData['resulting-ew-court']),
      buildSummaryRow('Hearing date', formatDateLong(sessionData['resulting-ew-date']))
    ]
  }

  if (sessionData['resulting-search-mode'] === 'unscheduled') {
    return [
      buildSummaryRow('Hearing type', 'Hearing outside England and Wales'),
      buildSummaryRow(
        'Hearing date',
        formatDateLong(sessionData['resulting-unscheduled-date'])
      )
    ]
  }

  return []
}

function getResultingRecordsRows(sessionData) {
  const applicantName = getApplicantFullName(sessionData) || 'Anna Nowak'
  const respondentName =
    [sessionData['respondent-first-names'], sessionData['respondent-last-name']]
      .filter(hasValue)
      .join(' ') || 'Piotr Nowak'
  const applicationTitle = getResultingApplicationTitle(sessionData) || 'Application under Commonwealth Act 1920'

  const sampleRows = [
    {
      applicantName,
      respondentName,
      applicationTitle
    },
    {
      applicantName: 'Maria Kowalska',
      respondentName: 'Tomasz Kowalski',
      applicationTitle: applicationTitle
    },
    {
      applicantName: 'Eszter Kovacs',
      respondentName: 'Janos Balogh',
      applicationTitle: applicationTitle
    }
  ]

  return sampleRows.map((row) => [
    {
      text: row.applicantName
    },
    {
      text: row.respondentName
    },
    {
      text: row.applicationTitle
    },
    {
      html: '<a class="govuk-link" href="/resulting/case-details">Result record</a>'
    }
  ])
}

function definitionSupportsJourney(definition, journey) {
  if (!journey) {
    return true
  }

  const journeys = Array.isArray(definition?.journeys) ? definition.journeys : ['results']
  return journeys.includes(journey)
}

function getResultDefinition(resultCode, journey = 'results') {
  const code = String(resultCode || '').trim().toUpperCase()
  const definition = resultDefinitions[code]

  if (!definition || !definitionSupportsJourney(definition, journey)) {
    return null
  }

  return {
    code,
    title: cleanWorkbookText(definition.title),
    category: cleanWorkbookText(definition.category),
    wordingTemplate: cleanWorkbookText(definition.wordingTemplate),
    journeys: definition.journeys || ['results'],
    nextStep: cleanWorkbookText(definition.nextStep),
    responses: (definition.responses || [])
      .map((response, index) => normaliseResultResponse(code, response, index))
      .filter((response) => !(journey === 'orders' && response.hideInOrders))
  }
}

function buildCaseEnquiryRows(rows) {
  return rows.map(([label, value]) => {
    if (String(value).includes('\n')) {
      return buildSummaryHtmlRow(label, formatLinesHtml(String(value).split('\n')))
    }

    return buildSummaryRow(label, value)
  })
}

function buildCaseEnquirySections(sections) {
  return sections.map((section) => ({
    title: section.title,
    rows: buildCaseEnquiryRows(section.rows)
  }))
}

function getCaseEnquiryRecord(recordId) {
  return caseEnquiryRecords.find((record) => record.id === recordId)
}

function getResultOptionItems(selectedResultCode, journey = 'results') {
  const selectedCode = String(selectedResultCode || '').trim().toUpperCase()

  return Object.entries(resultDefinitions)
    .filter(([, definition]) => definitionSupportsJourney(definition, journey))
    .map(([value, definition]) => ({
      text: `${value} - ${cleanWorkbookText(definition.title)}`,
      value,
      selected: value === selectedCode
    }))
}

function cleanWorkbookText(value) {
  return String(value || '').replaceAll('Â£', '£').replace(/\u00C2/g, '').trim()
}

function normaliseComparableText(value) {
  return cleanWorkbookText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function slugify(value) {
  return normaliseComparableText(value).replace(/\s+/g, '-')
}

function getNumericConstraint(value) {
  if (!hasValue(value)) {
    return undefined
  }

  const number = Number(value)
  return Number.isNaN(number) ? undefined : number
}

function getResultInputType(workbookType) {
  const cleanedType = cleanWorkbookText(workbookType)

  if (cleanedType === 'decimal') {
    return 'currency'
  }

  if (cleanedType === 'date') {
    return 'date'
  }

  if (cleanedType === 'menu-radio') {
    return 'radios'
  }

  if (cleanedType === 'menu-checkbox') {
    return 'checkboxes'
  }

  if (cleanedType === 'menu-autocomplete') {
    return 'autocomplete'
  }

  if (/^text-\d+$/i.test(cleanedType)) {
    const maxLength = Number(cleanedType.split('-')[1])
    return maxLength > 80 ? 'textarea' : 'text'
  }

  return 'text'
}

function getResultFieldMaxLength(workbookType, explicitMaxLength) {
  if (hasValue(explicitMaxLength)) {
    return getNumericConstraint(explicitMaxLength)
  }

  const cleanedType = cleanWorkbookText(workbookType)
  const match = cleanedType.match(/^text-(\d+)$/i)

  if (!match) {
    return undefined
  }

  return Number(match[1])
}

function splitResultOptions(options) {
  return cleanWorkbookText(options)
    .split(',')
    .map((option) => option.trim())
    .filter(Boolean)
}

function normaliseResultResponse(resultCode, response, index) {
  const rawName = cleanWorkbookText(response.name || response.prompt || `Field ${index + 1}`)
  const rawPrompt = cleanWorkbookText(response.prompt || response.name || `Field ${index + 1}`)
  const hideInOrders = Boolean(response.ordersHidden) || rawName.includes('*')
  const name = rawName.replace(/\*/g, '').trim()
  const prompt = rawPrompt.replace(/\*/g, '').trim()
  const type = getResultInputType(response.type)
  const minSelections = type === 'checkboxes' ? getNumericConstraint(response.min) : undefined
  const maxSelections = type === 'checkboxes' ? getNumericConstraint(response.max) : undefined

  return {
    id: `result-${slugify(resultCode)}-${slugify(name || prompt || index + 1)}`,
    name,
    prompt,
    type,
    required:
      cleanWorkbookText(response.mandatory).toLowerCase() === 'yes' &&
      (type !== 'checkboxes' || minSelections === undefined || minSelections > 0),
    minLength: type === 'text' || type === 'textarea' ? getNumericConstraint(response.min) : undefined,
    maxLength:
      type === 'text' || type === 'textarea'
        ? getResultFieldMaxLength(response.type, response.max)
        : undefined,
    minSelections,
    maxSelections,
    hint: cleanWorkbookText(response.hint),
    options: splitResultOptions(response.options),
    hideInOrders
  }
}

function getResultCategoryLabel(category) {
  const labels = {
    FINAL: 'Final',
    INTERIM: 'Interim',
    ANCILLARY: 'Ancillary'
  }

  return labels[category] || formatTextValue(category)
}

function hasSavableRecordedResult(sessionData) {
  return getRecordedResults(sessionData).some((result) =>
    ['FINAL', 'INTERIM'].includes(String(result.category || '').toUpperCase())
  )
}

function getResultingSaveLocation(sessionData) {
  return sessionData['resulting-search-mode'] === 'record-number'
    ? '/resulting/record-number'
    : '/resulting/view-records'
}

function getResultFieldOptionItems(field, value) {
  const optionValues =
    field.type === 'autocomplete' && field.options.includes('Courts-API')
      ? englandAndWalesCourts
      : field.options

  const isTermsFrequencyField = ['frequency', 'terms frequency'].includes(
    normaliseComparableText(field.name || field.prompt)
  )

  const getFrequencyOptionLabel = (option) =>
    String(option || '')
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ')

  return optionValues.map((option) => ({
    text: isTermsFrequencyField ? getFrequencyOptionLabel(option) : option,
    value: option,
    checked: Array.isArray(value) ? value.includes(option) : value === option,
    selected: value === option
  }))
}

function getResultFieldCandidateTexts(field) {
  const aliasesByName = {
    Adjournment: ['Date of hearing'],
    Beneficiary: ['Creditor'],
    Due: ['Expiry'],
    Arrears: ['Amount']
  }

  return [field.name, field.prompt, ...(aliasesByName[field.name] || [])].filter(hasValue)
}

function findResultFieldForToken(resultDefinition, token) {
  const normalisedToken = normaliseComparableText(token)

  const exactMatch = resultDefinition.responses.find((field) =>
    getResultFieldCandidateTexts(field).some(
      (candidate) => normaliseComparableText(candidate) === normalisedToken
    )
  )

  if (exactMatch) {
    return exactMatch
  }

  return (
    resultDefinition.responses.find((field) =>
      getResultFieldCandidateTexts(field).some((candidate) => {
        const normalisedCandidate = normaliseComparableText(candidate)

        return (
          normalisedCandidate.includes(normalisedToken) ||
          normalisedToken.includes(normalisedCandidate)
        )
      })
    ) || null
  )
}

function getResultingHearingDetailsText(sessionData) {
  if (sessionData['resulting-search-mode'] === 'england-wales') {
    return [
      sessionData['resulting-ew-court'],
      formatDateLong(sessionData['resulting-ew-date'])
    ]
      .filter(hasValue)
      .join(', ')
  }

  if (sessionData['resulting-search-mode'] === 'unscheduled') {
    return [
      sessionData['resulting-selected-session-court'] ||
        sessionData['hearing-non-scheduled-details'],
      formatDateLong(sessionData['resulting-unscheduled-date'])
    ]
      .filter(hasValue)
      .join(', ')
  }

  return hasValue(sessionData['hearing-date'])
    ? [
        sessionData['hearing-court'] || sessionData['hearing-non-scheduled-details'],
        formatDateLong(sessionData['hearing-date'])
      ]
        .filter(hasValue)
        .join(', ')
    : 'Hearing details not provided'
}

function getResultingPartyDetailsItems(sessionData) {
  const items = [
    {
      title: {
        text: 'Applicant'
      },
      href: '/resulting/applicant-details',
      status: getTaskStatusTag(
        sessionData['applicant-details-completed'] ? 'provided' : 'required'
      )
    },
    {
      title: {
        text: 'Respondent'
      },
      href: '/resulting/respondent-details',
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
      href: '/resulting/central-authority-details',
      status: getTaskStatusTag(hasCentralAuthorityDetails(sessionData) ? 'provided' : 'optional')
    })
  }

  return items
}

function getRecordedResults(sessionData) {
  const recordedResults = Array.isArray(sessionData['resulting-recorded-results'])
    ? sessionData['resulting-recorded-results']
    : []

  return recordedResults.map((result, index) => ({
    ...result,
    index,
    code: result.code || '',
    category: result.category || '',
    categoryLabel: result.categoryLabel || getResultCategoryLabel(result.category || '')
  }))
}

function hasCompletedSessionDetails(sessionData) {
  return Boolean(sessionData['resulting-session-details-completed'])
}

function getResultingSessionItems(sessionData) {
  return [
    {
      title: {
        text: 'Session details'
      },
      href: '/resulting/session-details',
      status: hasCompletedSessionDetails(sessionData)
        ? getTaskStatusTag('provided')
        : getTaskStatusTag('required')
    }
  ]
}

function canCheckResultingCase(sessionData) {
  return Boolean(
    sessionData['applicant-details-completed'] &&
      sessionData['respondent-details-completed'] &&
      hasSavableRecordedResult(sessionData) &&
      hasCompletedSessionDetails(sessionData)
  )
}

function getResultingCaseCommentsItems(sessionData) {
  return [
    {
      title: {
        text: 'Comments and notes'
      },
      href: '/resulting/case-comments-and-notes',
      status: hasCaseCommentsAndNotes(sessionData)
        ? getTaskStatusTag('provided')
        : getTaskStatusTag('optional')
    }
  ]
}

function getResultingResultsSummaryRows(sessionData) {
  return getRecordedResults(sessionData).map((result) => ({
    key: {
      text: `${result.code} - ${result.title}`
    },
    value: {
      text: result.wording
    }
  }))
}

function getRecordedResultManagementRows(sessionData) {
  return getRecordedResults(sessionData).map((result) => ({
    key: {
      text: `${result.code} - ${result.title}`
    },
    value: {
      text: result.wording
    },
    actions: {
      items: [
        {
          text: 'Change',
          href: `/resulting/result/${result.index}/change`
        },
        {
          text: 'Delete',
          href: `/resulting/result/${result.index}/delete`
        }
      ]
    }
  }))
}

function getResultReviewRows(result) {
  const resultDefinition = getResultDefinition(result?.code, 'results')
  const rows = [
    buildSummaryRow('Result code', result?.code || ''),
    buildSummaryRow('Result title', result?.title || ''),
    buildSummaryRow('Result wording', result?.wording || '')
  ]

  if (resultDefinition) {
    resultDefinition.responses.forEach((field) => {
      rows.push(buildSummaryRow(field.prompt, getResultValueForDisplay(field, result?.responses?.[field.id])))
    })
  }

  return rows
}

function getResultingResultCards(sessionData) {
  return getRecordedResults(sessionData).map((result) => ({
    title: `${result.code} - ${result.title}`,
    rows: getResultReviewRows(result),
    changeHref: `/resulting/result/${result.index}/change`,
    removeHref: `/resulting/result/${result.index}/delete`
  }))
}

function getResultingResultsStatus(sessionData) {
  const recordedResults = getRecordedResults(sessionData)

  if (!recordedResults.length) {
    return {
      tag: {
        text: 'Required',
        classes: 'govuk-tag--purple'
      }
    }
  }

  if (hasSavableRecordedResult(sessionData)) {
    return {
      tag: {
        text: 'Provided',
        classes: 'govuk-tag--blue'
      }
    }
  }

  return {
    tag: {
      text: 'In progress',
      classes: 'govuk-tag--blue'
    }
  }
}

function getResultingResultsItems(sessionData) {
  return [
    {
      title: {
        text: 'Enter results'
      },
      href: '/resulting/select-result',
      status: getResultingResultsStatus(sessionData)
    }
  ]
}

function getResultingSessionSummaryRows(sessionData) {
  return [
    buildSummaryRow('Judge', reqOrEmpty(sessionData['resulting-judge'])),
    buildSummaryRow('Magistrate 1', reqOrEmpty(sessionData['resulting-magistrate-1'])),
    buildSummaryRow('Magistrate 2', reqOrEmpty(sessionData['resulting-magistrate-2'])),
    buildSummaryRow('Magistrate 3', reqOrEmpty(sessionData['resulting-magistrate-3'])),
    buildSummaryRow('Legal advisor', reqOrEmpty(sessionData['resulting-legal-advisor'])),
    buildSummaryRow('Session start time', reqOrEmpty(sessionData['resulting-session-start-time'])),
    buildSummaryRow('Session end time', reqOrEmpty(sessionData['resulting-session-end-time']))
  ]
}

function getResultingCaseCommentsRows(sessionData) {
  return [
    buildSummaryRow('Comment', reqOrEmpty(sessionData['case-comment'])),
    buildSummaryRow('Case note', reqOrEmpty(sessionData['case-notes']))
  ]
}

function reqOrEmpty(value) {
  return value || ''
}

function getCurrentResultResponses(sessionData) {
  return sessionData['resulting-current-result-responses'] || {}
}

function getSharedResultFrequency(sessionData) {
  return getSingleValue(sessionData['resulting-shared-frequency']) || ''
}

function findFrequencyField(resultDefinition) {
  if (!resultDefinition) {
    return null
  }

  return (
    resultDefinition.responses.find((field) =>
      ['frequency', 'terms frequency'].includes(normaliseComparableText(field.name || field.prompt))
    ) || null
  )
}

function getEffectiveResultResponses(sessionData, resultDefinition) {
  const responses = {
    ...getCurrentResultResponses(sessionData)
  }
  const sharedFrequency = getSharedResultFrequency(sessionData)
  const frequencyField = findFrequencyField(resultDefinition)

  if (frequencyField && !hasValue(responses[frequencyField.id]) && hasValue(sharedFrequency)) {
    responses[frequencyField.id] = sharedFrequency
  }

  return responses
}

function isEditingRecordedResult(sessionData) {
  const editIndex = Number(sessionData['resulting-edit-result-index'])
  return Number.isInteger(editIndex) && editIndex >= 0
}

function getResultValueForDisplay(field, value) {
  if (Array.isArray(value)) {
    return value.length ? value.join(', ') : `[${field.prompt.toLowerCase()}]`
  }

  if (!hasValue(value)) {
    return `[${field.prompt.toLowerCase()}]`
  }

  if (field.type === 'date') {
    return formatDateLong(value)
  }

  if (field.type === 'currency') {
    return formatCurrency(value)
  }

  return value
}

function isFieldValueChecked(value) {
  if (Array.isArray(value)) return value.length > 0
  return hasValue(value) && value !== '_unchecked'
}

function getResultValueForSummary(field, value) {
  if (normaliseComparableText(field.name || field.prompt) === 'expiry terms') {
    return isFieldValueChecked(value) ? 'Yes - see case comment or notes' : 'None'
  }

  if (Array.isArray(value)) {
    if (!value.length) {
      return ''
    }

    const selectedItems = getResultFieldOptionItems(field, value).filter((item) => item.checked)
    return selectedItems.length
      ? selectedItems.map((item) => item.text).join(', ')
      : value.join(', ')
  }

  if (!hasValue(value)) {
    return ''
  }

  if (field.type === 'date') {
    const formatted = formatDateLong(value)
    if (normaliseComparableText(field.name || field.prompt) === 'child dob') {
      const age = getAgeFromDateString(value)
      return age !== null ? `${formatted} (Age: ${age})` : formatted
    }
    return formatted
  }

  if (field.type === 'currency') {
    return formatCurrency(value)
  }

  if (field.type === 'radios' || field.type === 'autocomplete') {
    const selectedItem = getResultFieldOptionItems(field, value).find((item) => item.value === value)
    return selectedItem ? selectedItem.text : value
  }

  return value
}

function buildFieldError(text) {
  return { text }
}

function isChecked(value) {
  return asArray(value).includes('yes')
}

function getErrorSummaryHref(field) {
  const normalisedField = String(field || '').toLowerCase()

  if (normalisedField.includes('date') || normalisedField.includes('dob')) {
    return `#${field}-day`
  }

  return `#${field}`
}

function buildErrorSummary(errors) {
  return Object.entries(errors).map(([field, error]) => ({
    text: typeof error === 'string' ? error : error.text,
    href: getErrorSummaryHref(field)
  }))
}

function validateApplicantDetails(body, applicantType) {
  const errors = {}

  if (applicantType === 'organisation') {
    if (!hasValue(getSingleValue(body['applicant-organisation-name']))) {
      errors['applicant-organisation-name'] = buildFieldError('Enter an organisation name')
    }

    if (!hasValue(getSingleValue(body['applicant-bank-account-type']))) {
      errors['applicant-bank-account-type'] = buildFieldError('Select a bank account type')
    }

    return errors
  }

  if (!hasValue(getSingleValue(body['applicant-first-names']))) {
    errors['applicant-first-names'] = buildFieldError('Enter first names')
  }

  if (!hasValue(getSingleValue(body['applicant-last-name']))) {
    errors['applicant-last-name'] = buildFieldError('Enter a last name')
  }

  if (!hasValue(getSingleValue(body['applicant-address-line-1']))) {
    errors['applicant-address-line-1'] = buildFieldError('Enter address line 1')
  }

  if (!hasValue(getSingleValue(body['applicant-country']))) {
    errors['applicant-country'] = buildFieldError('Select a country')
  }

  if (!hasValue(getSingleValue(body['applicant-bank-account-type']))) {
    errors['applicant-bank-account-type'] = buildFieldError('Select a bank account type')
  }

  if (isChecked(body['applicant-send-correspondence-to-third-party'])) {
    if (!hasValue(getSingleValue(body['applicant-third-party-name-or-organisation']))) {
      errors['applicant-third-party-name-or-organisation'] = buildFieldError('Enter a name or organisation')
    }

    if (!hasValue(getSingleValue(body['applicant-third-party-address-line-1']))) {
      errors['applicant-third-party-address-line-1'] = buildFieldError('Enter address line 1')
    }

    if (!hasValue(getSingleValue(body['applicant-third-party-country']))) {
      errors['applicant-third-party-country'] = buildFieldError('Select a country')
    }
  }

  if (
    isChecked(body['applicant-restrict-personal-information']) &&
    !hasValue(getSingleValue(body['applicant-restriction-reason']))
  ) {
    errors['applicant-restriction-reason'] = buildFieldError('Enter a reason')
  }

  return errors
}

function validateRespondentDetails(body) {
  const errors = {}

  if (!hasValue(getSingleValue(body['respondent-first-names']))) {
    errors['respondent-first-names'] = buildFieldError('Enter first names')
  }

  if (!hasValue(getSingleValue(body['respondent-last-name']))) {
    errors['respondent-last-name'] = buildFieldError('Enter a last name')
  }

  if (!hasValue(getSingleValue(body['respondent-address-line-1']))) {
    errors['respondent-address-line-1'] = buildFieldError('Enter address line 1')
  }

  if (!hasValue(getSingleValue(body['respondent-country']))) {
    errors['respondent-country'] = buildFieldError('Select a country')
  }

  if (isChecked(body['respondent-send-correspondence-to-third-party'])) {
    if (!hasValue(getSingleValue(body['respondent-third-party-name-or-organisation']))) {
      errors['respondent-third-party-name-or-organisation'] = buildFieldError('Enter a name or organisation')
    }

    if (!hasValue(getSingleValue(body['respondent-third-party-address-line-1']))) {
      errors['respondent-third-party-address-line-1'] = buildFieldError('Enter address line 1')
    }

    if (!hasValue(getSingleValue(body['respondent-third-party-country']))) {
      errors['respondent-third-party-country'] = buildFieldError('Select a country')
    }
  }

  if (
    isChecked(body['respondent-restrict-personal-information']) &&
    !hasValue(getSingleValue(body['respondent-restriction-reason']))
  ) {
    errors['respondent-restriction-reason'] = buildFieldError('Enter a reason')
  }

  if (
    isChecked(body['respondent-add-employer-details']) &&
    !hasValue(getSingleValue(body['respondent-employer-name']))
  ) {
    errors['respondent-employer-name'] = buildFieldError('Enter employer name')
  }

  return errors
}

function parseDateInput(dateString) {
  const value = String(getSingleValue(dateString) || '').trim()

  if (!value) {
    return { kind: 'missing' }
  }

  const match = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)

  if (!match) {
    return { kind: 'invalid' }
  }

  const day = Number(match[1])
  const month = Number(match[2])
  const year = Number(match[3])
  const date = new Date(year, month - 1, day)

  if (
    Number.isNaN(date.getTime()) ||
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return { kind: 'invalid' }
  }

  return { kind: 'valid', date }
}

function validateAlternativeOrderDetails(body, caseType) {
  const errors = {}
  const selectedApplicationCode = String(
    getSingleValue(body['order-application-code']) || ''
  )
    .trim()
    .toUpperCase()

  if (!hasValue(selectedApplicationCode)) {
    errors['order-application-code'] = buildFieldError('Select an application code')
  } else if (!isApplicationDefinitionAvailableForCaseType(selectedApplicationCode, caseType)) {
    errors['order-application-code'] = buildFieldError('Select an application code from the list')
  }

  if (!hasValue(getSingleValue(body['order-court-that-made-the-order']))) {
    errors['order-court-that-made-the-order'] = buildFieldError('Enter the court that made the order')
  }

  const orderMadeDate = parseDateInput(body['order-date-order-made'])

  if (orderMadeDate.kind === 'missing') {
    errors['order-date-order-made'] = buildFieldError('Enter the date order made')
  } else if (orderMadeDate.kind === 'invalid') {
    errors['order-date-order-made'] = buildFieldError('Enter a real date in the format DD/MM/YYYY')
  } else {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (orderMadeDate.date > today) {
      errors['order-date-order-made'] = buildFieldError('Future dates are invalid')
    }
  }

  const arrearsLastUpdatedDate = parseDateInput(body['order-date-arrears-last-updated'])

  if (arrearsLastUpdatedDate.kind === 'missing') {
    errors['order-date-arrears-last-updated'] = buildFieldError('Enter the date arrears last updated')
  } else if (arrearsLastUpdatedDate.kind === 'invalid') {
    errors['order-date-arrears-last-updated'] = buildFieldError('Enter a real date in the format DD/MM/YYYY')
  } else {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (arrearsLastUpdatedDate.date > today) {
      errors['order-date-arrears-last-updated'] = buildFieldError('Future dates are invalid')
    }
  }

  return errors
}

function buildApplicantDetailsViewData(baseData, body) {
  return {
    ...baseData,
    ...body,
    'applicant-add-aliases': isChecked(body['applicant-add-aliases']) ? 'yes' : '',
    'applicant-bank-account-type': getSingleValue(body['applicant-bank-account-type']) || '',
    'applicant-send-correspondence-to-third-party': isChecked(
      body['applicant-send-correspondence-to-third-party']
    )
      ? 'yes'
      : '',
    'applicant-restrict-personal-information': isChecked(
      body['applicant-restrict-personal-information']
    )
      ? 'yes'
      : ''
  }
}

function buildRespondentDetailsViewData(baseData, body) {
  return {
    ...baseData,
    ...body,
    'respondent-add-aliases': isChecked(body['respondent-add-aliases']) ? 'yes' : '',
    'respondent-add-employer-details': isChecked(body['respondent-add-employer-details'])
      ? 'yes'
      : '',
    'respondent-send-correspondence-to-third-party': isChecked(
      body['respondent-send-correspondence-to-third-party']
    )
      ? 'yes'
      : '',
    'respondent-restrict-personal-information': isChecked(
      body['respondent-restrict-personal-information']
    )
      ? 'yes'
      : ''
  }
}

function syncAliasFields(sessionData, body, prefix) {
  const addAliases = isChecked(body[`${prefix}-add-aliases`])
  const aliasFieldPattern = new RegExp(`^${prefix}-alias-\\d+-(first-names|last-name)$`)

  Object.keys(sessionData).forEach((key) => {
    if (aliasFieldPattern.test(key)) {
      delete sessionData[key]
    }
  })

  if (!addAliases) {
    sessionData[`${prefix}-alias-count`] = '1'
    return
  }

  const submittedCount = Number.parseInt(getSingleValue(body[`${prefix}-alias-count`]), 10)
  const aliasCount = Number.isNaN(submittedCount) || submittedCount < 1 ? 1 : submittedCount

  sessionData[`${prefix}-alias-count`] = String(aliasCount)

  for (let aliasNumber = 1; aliasNumber <= aliasCount; aliasNumber += 1) {
    const firstNamesKey = `${prefix}-alias-${aliasNumber}-first-names`
    const lastNameKey = `${prefix}-alias-${aliasNumber}-last-name`

    sessionData[firstNamesKey] = getSingleValue(body[firstNamesKey]) || ''
    sessionData[lastNameKey] = getSingleValue(body[lastNameKey]) || ''
  }
}

function getDefinitionWording(definition, responses) {
  if (!definition) {
    return ''
  }

  return definition.wordingTemplate.replace(/\{([^}]+)\}/g, (match, token) => {
    const field = findResultFieldForToken(definition, token)

    if (!field) {
      return `[${token.toLowerCase()}]`
    }

    return getResultValueForDisplay(field, responses[field.id])
  })
}

function getResultWording(sessionData) {
  const definition = getResultDefinition(sessionData['resulting-result-code'])
  return getDefinitionWording(definition, getEffectiveResultResponses(sessionData, definition))
}

function validateResultResponses(resultDefinition, body) {
  const errors = {}
  const values = {}

  resultDefinition.responses.forEach((field) => {
    const value = field.type === 'checkboxes' ? asArray(body[field.id]).filter(hasValue) : getSingleValue(body[field.id]) || ''
    values[field.id] = value

    if (field.type === 'checkboxes') {
      if (field.required && value.length === 0) {
        errors[field.id] = `${field.prompt} is required`
        return
      }

      if (field.minSelections !== undefined && value.length < field.minSelections) {
        errors[field.id] = `Select at least ${field.minSelections} option${field.minSelections === 1 ? '' : 's'} for ${field.prompt.toLowerCase()}`
        return
      }

      if (field.maxSelections !== undefined && value.length > field.maxSelections) {
        errors[field.id] = `Select ${field.maxSelections} option${field.maxSelections === 1 ? '' : 's'} or fewer for ${field.prompt.toLowerCase()}`
      }

      return
    }

    if (field.required && !hasValue(value)) {
      errors[field.id] = `${field.prompt} is required`
      return
    }

    if ((field.type === 'text' || field.type === 'textarea') && hasValue(value)) {
      if (field.minLength && value.trim().length < field.minLength) {
        errors[field.id] = `${field.prompt} must be at least ${field.minLength} characters`
      }

      if (field.maxLength && value.trim().length > field.maxLength) {
        errors[field.id] = `${field.prompt} must be ${field.maxLength} characters or fewer`
      }
    }
  })

  return {
    errors,
    values
  }
}

function getResultingResponseItems(sessionData) {
  const definition = getResultDefinition(sessionData['resulting-result-code'])
  const values = getEffectiveResultResponses(sessionData, definition)
  const errors = sessionData['resulting-result-errors'] || {}

  if (!definition) {
    return []
  }

  return definition.responses.map((field) => ({
    ...field,
    value: values[field.id] || (field.type === 'checkboxes' ? [] : ''),
    items:
      field.type === 'radios' || field.type === 'checkboxes' || field.type === 'autocomplete'
        ? getResultFieldOptionItems(field, values[field.id] || (field.type === 'checkboxes' ? [] : ''))
        : undefined,
    errorMessage: errors[field.id]
      ? {
          text: errors[field.id]
        }
      : undefined
  }))
}

function applySharedFrequencyToRecordedResults(recordedResults, sharedFrequency) {
  if (!hasValue(sharedFrequency)) {
    return recordedResults
  }

  return recordedResults.map((result) => {
    const resultDefinition = getResultDefinition(result.code)
    const frequencyField = findFrequencyField(resultDefinition)

    if (!frequencyField) {
      return result
    }

    const responses = {
      ...(result.responses || {}),
      [frequencyField.id]: sharedFrequency
    }

    return {
      ...result,
      responses,
      wording: getDefinitionWording(resultDefinition, responses)
    }
  })
}

function getRecordedOrderTerms(sessionData) {
  const recordedTerms = Array.isArray(sessionData['entered-order-terms'])
    ? sessionData['entered-order-terms']
    : []

  return recordedTerms.map((term, index) => ({
    ...term,
    index,
    code: term.code || '',
    category: term.category || '',
    categoryLabel: term.categoryLabel || getResultCategoryLabel(term.category || '')
  }))
}

function hasCompletedRecordedOrderTerm(orderTerm) {
  if (!orderTerm) {
    return false
  }

  if (orderTerm.nextStep === 'create-creditor') {
    return hasValue(orderTerm.creditor)
  }

  return true
}

function hasSavableOrderTerm(sessionData) {
  return getRecordedOrderTerms(sessionData).some((term) =>
    ['FINAL', 'INTERIM'].includes(String(term.category || '').toUpperCase()) &&
    hasCompletedRecordedOrderTerm(term)
  )
}

function getAlternativeOrderTermsStatus(sessionData) {
  if (!hasCompletedOrderDetails(sessionData)) {
    return {
      text: 'Cannot start yet'
    }
  }

  const enteredTerms = getRecordedOrderTerms(sessionData)
  const hasPendingOrderTerm = Boolean(sessionData['alternative-pending-order-term'])

  if (!enteredTerms.length && !hasPendingOrderTerm) {
    return {
      tag: {
        text: 'Required',
        classes: 'govuk-tag--purple'
      }
    }
  }

  if (hasSavableOrderTerm(sessionData)) {
    return {
      tag: {
        text: 'Provided',
        classes: 'govuk-tag--blue'
      }
    }
  }

  return {
    tag: {
      text: 'In progress',
      classes: 'govuk-tag--blue'
    }
  }
}


function getOrderTermReviewRows(orderTerm) {
  const orderTermDefinition = getResultDefinition(orderTerm?.code, 'orders')
  const rows = [
    buildSummaryRow(
      'Order term code',
      [orderTerm?.code, orderTerm?.title].filter(hasValue).join(' - ')
    )
  ]

  if (orderTermDefinition) {
    orderTermDefinition.responses.forEach((field) => {
      const value = orderTerm?.responses?.[field.id]
      const displayValue = getResultValueForSummary(field, value)

      rows.push(buildSummaryRow(field.prompt, displayValue))
    })
  }

  if (hasValue(orderTerm?.creditorLabel)) {
    rows.push(buildSummaryRow('Creditor', orderTerm.creditorLabel))
  }

  return rows
}

function getOrderTermMinorCreditorData(orderTerm, sessionData) {
  if (orderTerm?.minorCreditorData) {
    return orderTerm.minorCreditorData
  }

  const creditor = String(orderTerm?.creditor || '')

  if (creditor.startsWith('minor-creditor-')) {
    const index = Number(creditor.replace('minor-creditor-', ''))
    return Number.isInteger(index) ? getMinorCreditors(sessionData)[index] : null
  }

  if (creditor.startsWith('order-term-minor-creditor-')) {
    const termIndex = Number(creditor.replace('order-term-minor-creditor-', ''))
    const existingOrderTerm = getRecordedOrderTerms(sessionData).find((term) => term.index === termIndex)
    return existingOrderTerm?.minorCreditorData || null
  }

  return null
}

function getOrderTermMinorCreditorDetailsRows(orderTerm, sessionData) {
  const minorCreditor = getOrderTermMinorCreditorData(orderTerm, sessionData)
  return minorCreditor ? getMinorCreditorDetailsRows(minorCreditor) : []
}

function getOrderTermReviewCard(orderTerm, sessionData) {
  return {
    title: `${orderTerm.code} - ${orderTerm.title}`,
    rows: getOrderTermReviewRows(orderTerm),
    creditorDetailsRows: getOrderTermMinorCreditorDetailsRows(orderTerm, sessionData),
    changeHref: `/create-a-case/order-term/${orderTerm.index}/change`,
    removeHref: `/create-a-case/order-term/${orderTerm.index}/delete`
  }
}

function getCheckCaseOrderTermCards(sessionData) {
  return getRecordedOrderTerms(sessionData).map((orderTerm) =>
    getOrderTermReviewCard(orderTerm, sessionData)
  )
}

function getOrderTermHubCards(sessionData) {
  return getRecordedOrderTerms(sessionData).map((orderTerm) => ({
    title: `${orderTerm.code} - ${orderTerm.title}`,
    rows: getOrderTermReviewRows(orderTerm).slice(1).filter((row) => row.value.text !== '-'),
    creditorDetailsRows: getOrderTermMinorCreditorDetailsRows(orderTerm, sessionData),
    changeHref: `/create-a-case/order-term/${orderTerm.index}/change`,
    removeHref: `/create-a-case/order-term/${orderTerm.index}/delete`
  }))
}

function getCurrentAlternativeOrderResponses(sessionData) {
  return sessionData['alternative-current-order-term-responses'] || {}
}

function isEditingAlternativeOrderTerm(sessionData) {
  const editIndex = Number(sessionData['alternative-edit-order-term-index'])
  return Number.isInteger(editIndex) && editIndex >= 0
}

function getAlternativeOrderTermWording(sessionData) {
  const definition = getResultDefinition(sessionData['alternative-order-term-code'], 'orders')
  return getDefinitionWording(definition, getCurrentAlternativeOrderResponses(sessionData))
}

function getAlternativeOrderTermResponseItems(sessionData) {
  const definition = getResultDefinition(sessionData['alternative-order-term-code'], 'orders')
  const values = getCurrentAlternativeOrderResponses(sessionData)
  const errors = sessionData['alternative-order-term-errors'] || {}

  if (!definition) {
    return []
  }

  return definition.responses.map((field) => ({
    ...field,
    value: values[field.id] || (field.type === 'checkboxes' ? [] : ''),
    isChildDobField: normaliseComparableText(field.name || field.prompt) === 'child dob',
    calculatedAge:
      normaliseComparableText(field.name || field.prompt) === 'child dob'
        ? getAgeFromDateString(values[field.id] || '')
        : null,
    items:
      field.type === 'radios' || field.type === 'checkboxes' || field.type === 'autocomplete'
        ? getResultFieldOptionItems(field, values[field.id] || (field.type === 'checkboxes' ? [] : ''))
        : undefined,
    errorMessage: errors[field.id]
      ? {
          text: errors[field.id]
        }
      : undefined
  }))
}

function getApplicantSummaryRows(sessionData) {
  if (sessionData['applicant-type'] === 'organisation') {
    const rows = [
      buildSummaryRow('Organisation name', sessionData['applicant-organisation-name']),
      buildSummaryRow(
        'Foreign authority reference',
        sessionData['applicant-foreign-authority-reference']
      ),
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

    return [
      ...rows,
      ...getApplicantBankSummaryRows(sessionData)
    ]
  }

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

  if (hasThirdPartyCorrespondenceDetails(sessionData, 'applicant')) {
    rows.push(...getThirdPartySummaryRows(sessionData, 'applicant'))
  }

  rows.push(...getApplicantBankSummaryRows(sessionData))

  rows.push({
    ...buildSummaryRow(
      'Restrict personal information',
      sessionData['applicant-restrict-personal-information'] ? 'Yes' : 'No'
    ),
    classes: 'rm-summary-list__section-start'
  })

  if (sessionData['applicant-restrict-personal-information'] && sessionData['applicant-restriction-reason']) {
    rows.push(
      buildSummaryHtmlRow(
        'Reason for restriction',
        formatLinesHtml(sessionData['applicant-restriction-reason'].split('\n'))
      )
    )
  }

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

  if (sessionData['respondent-add-employer-details']) {
    rows.push(
      buildSummaryRow('Employer name', sessionData['respondent-employer-name']),
      buildSummaryRow('Employee reference', sessionData['respondent-employee-reference']),
      buildSummaryRow('Employer email address', sessionData['respondent-employer-email-address']),
      buildSummaryRow(
        'Employer telephone number',
        sessionData['respondent-employer-telephone-number']
      ),
      buildSummaryHtmlRow(
        'Employer address',
        formatLinesHtml([
          sessionData['respondent-employer-address-line-1'],
          sessionData['respondent-employer-address-line-2'],
          sessionData['respondent-employer-address-line-3'],
          sessionData['respondent-employer-address-line-4'],
          sessionData['respondent-employer-address-line-5'],
          sessionData['respondent-employer-postcode']
        ])
      )
    )
  }

  if (hasThirdPartyCorrespondenceDetails(sessionData, 'respondent')) {
    rows.push(...getThirdPartySummaryRows(sessionData, 'respondent'))
  }

  rows.push({
    ...buildSummaryRow(
      'Restrict personal information',
      sessionData['respondent-restrict-personal-information'] ? 'Yes' : 'No'
    ),
    classes: 'rm-summary-list__section-start'
  })

  if (sessionData['respondent-restrict-personal-information'] && sessionData['respondent-restriction-reason']) {
    rows.push(
      buildSummaryHtmlRow(
        'Reason for restriction',
        formatLinesHtml(sessionData['respondent-restriction-reason'].split('\n'))
      )
    )
  }

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

const majorCreditorOptions = [
  { value: 'ca-australia', text: 'Central Authority - Australia' },
  { value: 'ca-austria', text: 'Central Authority - Austria' },
  { value: 'ca-canada', text: 'Central Authority - Canada' },
  { value: 'ca-czech-republic', text: 'Central Authority - Czech Republic' },
  { value: 'ca-france', text: 'Central Authority - France' },
  { value: 'ca-germany', text: 'Central Authority - Germany' },
  { value: 'ca-ireland', text: 'Central Authority - Ireland' },
  { value: 'ca-new-zealand', text: 'Central Authority - New Zealand' },
  { value: 'ca-norway', text: 'Central Authority - Norway' },
  { value: 'ca-poland', text: 'Central Authority - Poland' },
  { value: 'ca-south-africa', text: 'Central Authority - South Africa' },
  { value: 'ca-sweden', text: 'Central Authority - Sweden' },
  { value: 'ca-usa', text: 'Central Authority - USA' }
]

function getMajorCreditorItems(selectedValue) {
  return [
    { value: '', text: 'Select a major creditor' },
    ...majorCreditorOptions.map((c) => ({
      value: c.value,
      text: c.text,
      selected: c.value === selectedValue
    }))
  ]
}

function getMajorCreditorAutocompleteItems(selectedValue) {
  return majorCreditorOptions.map((c) => ({
    value: c.value,
    text: c.text,
    selected: c.value === selectedValue
  }))
}

function getMajorCreditorLabel(value) {
  const found = majorCreditorOptions.find((c) => c.value === value)
  return found ? found.text : null
}

function getMinorCreditorsFromOrderTerms(sessionData, excludeIndex) {
  const seen = new Set()
  return getRecordedOrderTerms(sessionData)
    .filter((term) => term.minorCreditorData && term.index !== excludeIndex)
    .reduce((acc, term) => {
      const name = term.creditorLabel || getMinorCreditorName(term.minorCreditorData, 0)
      if (!seen.has(name)) {
        seen.add(name)
        acc.push({ value: `order-term-minor-creditor-${term.index}`, text: `${name} (Minor creditor)` })
      }
      return acc
    }, [])
}

function getOrderTermCreditorItems(sessionData, selectedCreditor) {
  const applicantLabel = getApplicantCreditorLabel(sessionData)
  const minorCreditorItems = getMinorCreditorsFromOrderTerms(sessionData).map((mc) => ({
    value: mc.value,
    text: mc.text,
    checked: selectedCreditor === mc.value
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
    },
    { divider: 'or' },
    {
      value: 'add-new-minor-creditor',
      text: 'Add new minor creditor',
      checked: selectedCreditor === 'add-new-minor-creditor'
    }
  ]
}

function getOrderTermCreditorLabelByValue(value, sessionData) {
  if (value === 'applicant') return getApplicantCreditorLabel(sessionData)
  if (value === 'major-creditor') return 'Major creditor'
  if (value.startsWith('major-creditor-')) {
    return getMajorCreditorLabel(value.replace('major-creditor-', '')) || 'Major creditor'
  }
  if (value.startsWith('order-term-minor-creditor-')) {
    const termIndex = Number(value.replace('order-term-minor-creditor-', ''))
    const term = getRecordedOrderTerms(sessionData).find((t) => t.index === termIndex)
    return term?.creditorLabel || 'Minor creditor'
  }
  return getCreditorLabel(value, sessionData)
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
            : '–'
      },
      {
        text: term.hasAdditionalTermsAfterExpiry === 'yes' ? 'Yes - see case comment or notes' : 'None'
      },
      {
        text: 'Active'
      },
      {
        html: `<a class="govuk-link" href="#">Change</a> <a class="govuk-link govuk-!-margin-left-2" href="/create-a-case/terms-per-beneficiary/${index}/remove">Remove</a>`
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
      text: term.hasAdditionalTermsAfterExpiry === 'yes' ? 'Yes - see case comment or notes' : 'None'
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
        classes: 'govuk-tag--blue'
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


function getSingleTaskStatusTag(status) {
  if (status === 'provided') {
    return {
      tag: {
        text: 'Provided',
        classes: 'govuk-tag--blue'
      }
    }
  }

  if (status === 'in-progress') {
    return {
      tag: {
        text: 'In progress',
        classes: 'govuk-tag--blue'
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

function getAlternativeOrderItems(sessionData, basePath = '/orders-applications-alternative') {
  const canStartOrder = hasCompletedPartyDetails(sessionData)
  const hasOrderDetails = hasCompletedOrderDetails(sessionData)

  return [
    {
      title: {
        text: 'Order details'
      },
      href: canStartOrder ? `${basePath}/order-details` : undefined,
      status: hasOrderDetails
        ? getSingleTaskStatusTag('provided')
        : canStartOrder
          ? getSingleTaskStatusTag('not-provided')
          : {
              text: 'Cannot start yet'
            }
    },
    {
      title: {
        text: 'Order terms'
      },
      href: hasOrderDetails ? `${basePath}/select-order-term` : undefined,
      status: getAlternativeOrderTermsStatus(sessionData)
    },
    {
      title: {
        text: 'Interest and indexation'
      },
      href: hasOrderDetails
        ? `${basePath}/interest-and-indexation`
        : undefined,
      status: hasOrderDetails
        ? hasCompletedInterestAndIndexation(sessionData)
          ? getTaskStatusTag('provided')
          : getTaskStatusTag('required')
        : {
            text: 'Cannot start yet'
          }
    },
    {
      title: {
        text: 'Managing payments'
      },
      href: hasOrderDetails
        ? `${basePath}/managing-payments`
        : undefined,
      status: hasOrderDetails
        ? hasCompletedManagingPayments(sessionData)
          ? getTaskStatusTag('provided')
          : getTaskStatusTag('required')
        : {
            text: 'Cannot start yet'
          }
    }
  ]
}


function getAlternativePartyDetailsItems(sessionData, basePath = '/orders-applications-alternative') {
  const items = [
    {
      title: {
        text: 'Respondent'
      },
      href: `${basePath}/respondent-details`,
      status: getTaskStatusTag(
        sessionData['respondent-details-completed'] ? 'provided' : 'required'
      )
    },
    {
      title: {
        text: 'Applicant'
      },
      href: `${basePath}/applicant-details`,
      status: getTaskStatusTag(
        sessionData['applicant-details-completed'] ? 'provided' : 'required'
      )
    }
  ]

  items.push({
    title: {
      text: 'Central authority'
    },
    href: `${basePath}/central-authority-details`,
    status: getTaskStatusTag(hasCentralAuthorityDetails(sessionData) ? 'provided' : 'optional')
  })

  return items
}

function getAlternativeApplicationItems(sessionData, basePath = '/orders-applications-alternative') {
  const canStartApplication = hasCompletedPartyDetails(sessionData)
  const hasApplicationDetails = hasCompletedApplicationDetails(sessionData)
  const hasHearingDetails = hasCompletedHearingDetails(sessionData)

  return [
    {
      title: {
        text: 'Application details'
      },
      href: canStartApplication ? `${basePath}/application-details` : undefined,
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
      href: hasApplicationDetails ? `${basePath}/hearing-details` : undefined,
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

function getAlternativeAdditionalInformationItems(sessionData, basePath = '/orders-applications-alternative') {
  return [
    {
      title: {
        text: 'Comments and notes'
      },
      href: `${basePath}/case-comments-and-notes`,
      status: hasCaseCommentsAndNotes(sessionData)
        ? getTaskStatusTag('provided')
        : getTaskStatusTag('optional')
    }
  ]
}

function canCheckCase(sessionData) {
  if (isApplicationJourney(sessionData)) {
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

function canCheckAlternativeCase(sessionData) {
  if (isApplicationJourney(sessionData)) {
    return canCheckCase(sessionData)
  }

  return Boolean(
    sessionData['applicant-details-completed'] &&
      sessionData['respondent-details-completed'] &&
      sessionData['order-details-completed'] &&
      hasSavableOrderTerm(sessionData) &&
      hasCompletedInterestAndIndexation(sessionData) &&
      hasCompletedManagingPayments(sessionData)
  )
}

function getCheckCaseDetailsViewData(sessionData) {
  return {
    caseTypeLabel: sessionData['case-type-label'] || caseTypeLabels[sessionData['case-type']] || sessionData['case-type'],
    applicantTypeLabel: applicantTypeLabels[sessionData['applicant-type']] || 'Not selected',
    showApplicantType: !hasImplicitIndividualApplicantType(sessionData),
    isApplicationJourney: isApplicationJourney(sessionData),
    isRemoOutCase: isRemoOutCase(sessionData),
    applicantRows: getApplicantSummaryRows(sessionData),
    respondentRows: getRespondentSummaryRows(sessionData),
    centralAuthorityRows: [
      buildSummaryRow('REMO reference', sessionData['central-authority-remo-reference']),
      buildSummaryRow("Central authority's reference", sessionData['central-authority-reference']),
      buildSummaryRow('Central authority name', sessionData['central-authority-manual-name'] || sessionData['central-authority-name'])
    ],
    applicationRows: getApplicationSummaryRows(sessionData),
    hearingRows: getHearingSummaryRows(sessionData),
    orderDetailsRows: getAlternativeOrderDetailsSummaryRows(sessionData),
    orderTermCards: getCheckCaseOrderTermCards(sessionData),
    interestAndIndexationRows: [
      buildSummaryRow('Interest', getInterestAppliesLabel(sessionData['interest-applies'])),
      buildSummaryRow(
        'Indexation',
        getIndexationTypeLabel(sessionData['indexation-type'])
      )
    ],
    managingPaymentsRows: [
      buildSummaryRow('How will payments be managed?', {
        'payments-via-court': 'Payments via the court',
        'direct-payments': 'Direct payments to creditors'
      }[sessionData['order-managing-payments']] || '-')
    ],
    caseCommentsRows: [
      buildSummaryRow('Comment', sessionData['case-comment']),
      buildSummaryRow('Case note', sessionData['case-notes'])
    ],
    showApplicantRestrictionWarning: Boolean(
      sessionData['applicant-restrict-personal-information']
    ),
    showRespondentRestrictionWarning: Boolean(
      sessionData['respondent-restrict-personal-information']
    )
  }
}

function getFailedPublishingCheckCaseViewData() {
  return {
    orderDetailsRows: [
      buildSummaryRow(
        'Application code',
        'PL-REM-2026-088 Application from EU Country for registration or recognition of an order in the family court'
      ),
      buildSummaryRow('Court that made the order', 'District Court of Warsaw'),
      buildSummaryRow('Date order made', '10 January 2026'),
      buildSummaryRow('Date arrears last updated', '01 April 2026')
    ],
    orderTermCards: [
      {
        title: 'MAT - Matrimonial Order for Adult',
        rows: [
          buildSummaryRow('Amount', '£400.00'),
          buildSummaryRow('Payment frequency', 'Monthly'),
          buildSummaryRow('Expiry date', '10 January 2028'),
          buildSummaryRow('Arrears', '£200.00'),
          buildSummaryRow('Creditor', 'Anna Nowak')
        ]
      },
      {
        title: 'MCHILD - Maintenance Order for child(ren)',
        rows: [
          buildSummaryRow('Amount', '£250.00'),
          buildSummaryRow('Payment frequency', 'Monthly'),
          buildSummaryRow('Expiry date', '22 August 2035'),
          buildSummaryRow('Expiry terms', 'Yes - see case comment or notes'),
          buildSummaryRow('Arrears', '£100.00'),
          buildSummaryRow('Child’s name', 'Sofia Nowak (Age: 10)'),
          buildSummaryRow('Creditor', 'Anna Nowak')
        ]
      }
    ],
    interestAndIndexationRows: [
      buildSummaryRow('Interest', 'Yes / No / –'),
      buildSummaryRow(
        'Indexation',
        'Retail Price Index (RPI) / Consumer Price Index (CPI) / Other indexation / None / –'
      )
    ],
    managingPaymentsRows: [
      buildSummaryRow(
        'Payment arrangement',
        'Payments via the court / Direct payments to creditors'
      )
    ],
    caseCommentsRows: [
      buildSummaryRow('Comment', 'Expiry terms: Order until completion of full-time education'),
      buildSummaryRow(
        'Case note',
        'Applicant lives in Poland (outside UK) and respondent lives in Manchester (UK). MAT plus MCHILD terms recorded.'
      )
    ]
  }
}

function getReviewHistoryTimelineItems(reviewHistory) {
  return reviewHistory.map((event) => ({
    label: {
      text: event.action
    },
    text: event.note || '',
    datetime: {
      timestamp: event.timestamp || getReviewHistoryTimestamp(event.at),
      ...(event.datetimeFormat ? { format: event.datetimeFormat } : { type: 'datetime' })
    },
    byline: {
      text: event.by
    }
  }))
}

function getReviewHistoryTimestamp(dateTimeText) {
  const match = String(dateTimeText || '').match(
    /^(\d{1,2}) ([A-Za-z]+) (\d{4}) at (\d{1,2}):(\d{2})(am|pm)?$/i
  )

  if (!match) {
    return dateTimeText
  }

  const monthIndex = {
    january: 1,
    february: 2,
    march: 3,
    april: 4,
    may: 5,
    june: 6,
    july: 7,
    august: 8,
    september: 9,
    october: 10,
    november: 11,
    december: 12
  }[match[2].toLowerCase()]

  if (!monthIndex) {
    return dateTimeText
  }

  const period = match[6]?.toLowerCase()
  let hour = Number(match[4])

  if (period === 'pm' && hour < 12) {
    hour += 12
  }

  if (period === 'am' && hour === 12) {
    hour = 0
  }

  const pad = (value) => String(value).padStart(2, '0')

  return `${match[3]}-${pad(monthIndex)}-${pad(match[1])}T${pad(hour)}:${match[5]}:00`
}

function getSessionReviewCases(req) {
  if (!Array.isArray(req.session.data[sessionReviewCasesKey])) {
    req.session.data[sessionReviewCasesKey] = []
  }

  return req.session.data[sessionReviewCasesKey]
}

function getCaseReviewDecisions(req) {
  if (
    !req.session.data[caseReviewDecisionsKey] ||
    Array.isArray(req.session.data[caseReviewDecisionsKey])
  ) {
    req.session.data[caseReviewDecisionsKey] = {}
  }

  return req.session.data[caseReviewDecisionsKey]
}

function getReviewWorkflowTimestamp() {
  const now = new Date()
  const date = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(now)
  const time = new Intl.DateTimeFormat('en-GB', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
    .format(now)
    .replace(/\s/g, '')
    .toLowerCase()

  return `${date} at ${time}`
}

function getReviewStatusTag(status, isChecker) {
  const labels = {
    'in-review': isChecker ? 'To review' : 'In review',
    approved: 'Approved',
    rejected: 'Rejected',
    deleted: 'Deleted',
    failed: 'Failed'
  }
  const classes = {
    'in-review': 'govuk-tag--blue',
    approved: 'govuk-tag--green',
    rejected: 'govuk-tag--orange',
    deleted: 'govuk-tag--red',
    failed: 'govuk-tag--red'
  }

  return {
    text: labels[status] || labels['in-review'],
    classes: `${classes[status] || classes['in-review']} govuk-!-margin-bottom-6`
  }
}

function getReviewStatusDateField(status) {
  return {
    approved: 'approved',
    rejected: 'rejected',
    deleted: 'deleted'
  }[status]
}

function getBaseReviewCaseStatus(id) {
  return {
    0: 'in-review',
    1: 'in-review',
    2: 'in-review',
    3: 'rejected',
    4: 'rejected',
    5: 'approved',
    6: 'approved',
    7: 'deleted'
  }[String(id)]
}

function getReviewCaseStatus(req, id) {
  const sessionCase = getSessionReviewCaseById(req, id)

  if (sessionCase) {
    return sessionCase.status || 'in-review'
  }

  const decision = getCaseReviewDecisions(req)[String(id)]

  return decision?.status || getBaseReviewCaseStatus(id) || 'in-review'
}

function getCasePartyName(sessionData, party, format = 'list') {
  const firstNames = sessionData[`${party}-first-names`] || ''
  const lastName = sessionData[`${party}-last-name`] || ''
  const title = getTitleLabel(sessionData[`${party}-title`])

  if (party === 'applicant' && sessionData['applicant-type'] === 'organisation') {
    return sessionData['applicant-organisation-name'] || 'Organisation'
  }

  if (format === 'heading') {
    return [title, firstNames, hasValue(lastName) ? String(lastName).toUpperCase() : '']
      .filter(hasValue)
      .join(' ')
  }

  if (hasValue(lastName) && hasValue(firstNames)) {
    return `${String(lastName).toUpperCase()}, ${firstNames}`
  }

  return [firstNames, lastName].filter(hasValue).join(' ') || formatTextValue('')
}

function getSessionReviewCaseById(req, id) {
  return getSessionReviewCases(req).find((caseEntry) => String(caseEntry.id) === String(id))
}

function createSessionReviewCase(req) {
  const sessionData = getCreateACaseData(req)
  const existingCase = sessionData['submitted-case-id']
    ? getSessionReviewCaseById(req, sessionData['submitted-case-id'])
    : null

  if (existingCase) {
    existingCase.caseData = cloneData(sessionData)

    if (existingCase.status === 'rejected') {
      existingCase.status = 'in-review'
      existingCase.statusLabel = 'Today'
      existingCase.statusSort = 0
      existingCase.reviewHistory = [
        ...(existingCase.reviewHistory || []),
        {
          action: 'Resubmitted',
          by: 'you',
          at: getReviewWorkflowTimestamp()
        }
      ]
    }

    return existingCase
  }

  if (
    sessionData['submitted-case-id'] &&
    getBaseRejectedDraftOrderEntry(sessionData['submitted-case-id']) &&
    getReviewCaseStatus(req, sessionData['submitted-case-id']) === 'rejected'
  ) {
    return updateReviewCaseStatus(req, sessionData['submitted-case-id'], 'in-review')
  }

  const reviewCase = {
    id: `session-${Date.now()}`,
    status: 'in-review',
    created: 'Today',
    createdSort: 0,
    submittedBy: 'you',
    statusLabel: 'Today',
    statusSort: 0,
    caseData: cloneData(sessionData),
    reviewHistory: [
      {
        action: 'Submitted',
        by: 'you',
        at: getReviewWorkflowTimestamp()
      }
    ]
  }

  getSessionReviewCases(req).unshift(reviewCase)
  sessionData['submitted-case-id'] = reviewCase.id

  return reviewCase
}

function getSessionReviewCaseRow(caseEntry) {
  const statusDateField = getReviewStatusDateField(caseEntry.status)
  const row = {
    id: caseEntry.id,
    href: `/create-cases/${caseEntry.id}`,
    status: caseEntry.status,
    respondent: getCasePartyName(caseEntry.caseData, 'respondent'),
    applicant: getCasePartyName(caseEntry.caseData, 'applicant'),
    caseType: caseEntry.caseData['case-type-label'] ||
      caseTypeLabels[caseEntry.caseData['case-type']] ||
      caseEntry.caseData['case-type'],
    submittedBy: caseEntry.submittedBy || 'you',
    created: caseEntry.created || 'Today',
    createdSort: caseEntry.createdSort || 0
  }

  if (statusDateField) {
    row[statusDateField] = caseEntry.statusLabel || 'Today'
    row[`${statusDateField}Sort`] = caseEntry.statusSort || 0
  }

  return row
}

function getGeneratedAccountId(id, offset = 0) {
  const idString = String(id)

  if (/^\d+$/.test(idString)) {
    return (Number(idString) * 10) + offset
  }

  const hash = idString.split('').reduce((total, char) => total + char.charCodeAt(0), 0)
  return (hash * 10) + offset
}

function getGeneratedApprovedCaseAccounts(row) {
  const respondentAccountNumber = accountRef(getGeneratedAccountId(row.id, 0), 'RP')
  const applicantAccountNumber = accountRef(getGeneratedAccountId(row.id, 1), 'AP')

  return {
    respondentAccountLabel: row.respondentAccountLabel || `${respondentAccountNumber} – ${row.respondent}`,
    respondentAccountHref: row.respondentAccountHref || row.activeHref || row.href || `/active-case/${row.id}`,
    applicantAccount: row.applicantAccount || {
      href: `/active-case/creditor/${getGeneratedAccountId(row.id, 1)}`,
      label: `${applicantAccountNumber} – ${row.applicant}`
    },
    minorCreditorAccounts: row.minorCreditorAccounts || []
  }
}

function applyReviewDecisions(rows, decisions) {
  return rows.map((row) => {
    const decision = decisions[String(row.id)]

    if (!decision) {
      return row
    }

    const statusDateField = getReviewStatusDateField(decision.status)
    const updatedRow = {
      ...row,
      href: `/create-cases/${row.id}`,
      status: decision.status
    }

    if (statusDateField) {
      updatedRow[statusDateField] = decision.statusLabel || 'Today'
      updatedRow[`${statusDateField}Sort`] = decision.statusSort || 0
    }

    if (decision.status === 'approved') {
      return {
        ...updatedRow,
        ...getGeneratedApprovedCaseAccounts(updatedRow)
      }
    }

    return updatedRow
  })
}

function updateReviewCaseStatus(req, id, status, note) {
  const at = getReviewWorkflowTimestamp()
  const action = {
    'in-review': 'Resubmitted',
    approved: 'Approved',
    rejected: 'Rejected',
    deleted: 'Deleted'
  }[status]
  const event = {
    action,
    by: 'you',
    at,
    ...(hasValue(note) ? { note } : {})
  }
  const sessionCase = getSessionReviewCaseById(req, id)

  if (sessionCase) {
    sessionCase.status = status
    sessionCase.statusLabel = 'Today'
    sessionCase.statusSort = 0
    sessionCase.reviewHistory = [...(sessionCase.reviewHistory || []), event]
    return sessionCase
  }

  const decisions = getCaseReviewDecisions(req)
  const existingDecision = decisions[String(id)] || { events: [] }
  decisions[String(id)] = {
    ...existingDecision,
    status,
    statusLabel: 'Today',
    statusSort: 0,
    events: [...(existingDecision.events || []), event]
  }

  return decisions[String(id)]
}

function getSessionDraftOrderEntry(caseEntry) {
  return {
    caseId: caseEntry.id,
    respondentName: getCasePartyName(caseEntry.caseData, 'respondent', 'heading') || 'Respondent',
    caseTypeLabel: caseEntry.caseData['case-type-label'] ||
      caseTypeLabels[caseEntry.caseData['case-type']] ||
      caseEntry.caseData['case-type'],
    applicantTypeLabel: applicantTypeLabels[caseEntry.caseData['applicant-type']] || 'Not selected',
    submittedBy: caseEntry.submittedBy || 'you',
    caseData: caseEntry.caseData,
    reviewHistory: caseEntry.reviewHistory || [],
    status: caseEntry.status || 'in-review'
  }
}

function getRejectedInputterViewData(sessionData, caseId) {
  return {
    caseTypeLabel: sessionData['case-type-label'] || caseTypeLabels[sessionData['case-type']] || sessionData['case-type'],
    applicantTypeLabel: applicantTypeLabels[sessionData['applicant-type']] || 'Not selected',
    showApplicantType: !hasImplicitIndividualApplicantType(sessionData),
    caseSectionHeading: isApplicationJourney(sessionData) ? 'Application' : 'Order',
    caseSectionIdPrefix: isApplicationJourney(sessionData) ? 'application' : 'order',
    partyDetailsItems: getAlternativePartyDetailsItems(sessionData, `/create-cases/${caseId}/edit`),
    caseSectionItems: isApplicationJourney(sessionData)
      ? getAlternativeApplicationItems(sessionData, `/create-cases/${caseId}/edit`)
      : getAlternativeOrderItems(sessionData, `/create-cases/${caseId}/edit`),
    additionalInformationItems: getAlternativeAdditionalInformationItems(
      sessionData,
      `/create-cases/${caseId}/edit`
    ),
    canCheckCase: canCheckAlternativeCase(sessionData)
  }
}

function getBaseRejectedDraftOrderEntry(id) {
  const entries = {
    3: {
      respondentName: 'Mr Janos BALOGH',
      caseTypeLabel: 'REMO In',
      applicantTypeLabel: 'Individual',
      submittedBy: 'emily.davis',
      caseData: {
        'case-type': 'remo-in',
        'applicant-type': 'individual',
        'has-order': 'yes',
        'applicant-title': 'Ms',
        'applicant-first-names': 'Eszter',
        'applicant-last-name': 'Kovacs',
        'applicant-main-email-address': 'eszter.kovacs@example.test',
        'applicant-main-telephone-number': '+447700900441',
        'applicant-address-line-1': '18 College Road',
        'applicant-address-line-2': 'Bristol',
        'applicant-postal-or-zip-code': 'BS8 1AA',
        'applicant-country': 'united-kingdom',
        'respondent-title': 'Mr',
        'respondent-first-names': 'Janos',
        'respondent-last-name': 'Balogh',
        'respondent-date-of-birth': '11/11/1977',
        'respondent-main-email-address': 'janos.balogh@example.test',
        'respondent-address-line-1': '18 Deansgate',
        'respondent-address-line-2': 'Manchester',
        'respondent-postal-or-zip-code': 'M3 1AA',
        'respondent-country': 'united-kingdom',
        'central-authority-remo-reference': 'HU-REM-2026-214',
        'central-authority-reference': 'HU-MJ-2026-214',
        'central-authority-name': 'Hungarian Central Authority',
        'order-application-code': 'CJ82002',
        'order-court-that-made-the-order': 'Budapest Metropolitan Court',
        'order-date-order-made': '11/01/2026',
        'order-date-arrears-last-updated': '01/04/2026',
        'entered-order-terms': [
          {
            code: 'MAT',
            title: 'Matrimonial Order for Adult',
            category: 'FINAL',
            categoryLabel: 'Final',
            responses: {
              'result-mat-amount': '175',
              'result-mat-frequency': 'monthly',
              'result-mat-expiry': '',
              'result-mat-arrears': '175',
              'result-mat-creditor': 'Eszter Kovacs',
              'result-mat-respondent': 'Janos Balogh',
              'result-mat-payment': 'payable through the Court',
              'result-mat-commencement': '11/01/2026'
            },
            creditor: 'applicant',
            creditorLabel: 'Eszter Kovacs'
          }
        ],
        'interest-and-indexation-completed': 'yes',
        'interest-applies': 'no',
        'indexation-type': 'no-indexation',
        'managing-payments-completed': 'yes',
        'order-managing-payments': 'payments-via-court',
        'case-comment': 'Rejected case awaiting inputter updates.',
        'case-notes': 'Clarify respondent address before resubmitting.',
        'applicant-details-completed': 'yes',
        'respondent-details-completed': 'yes',
        'order-details-completed': 'yes'
      },
      reviewHistory: [
        {
          action: 'Submitted',
          by: 'emily.davis',
          at: '17 May 2026 at 9:20am'
        },
        {
          action: 'Rejected',
          by: 'joe.bloggs',
          at: '17 May 2026 at 3:05pm',
          note: 'Please check the respondent address before resubmitting.'
        }
      ]
    },
    4: {
      respondentName: 'Mr Nikolai DIMITROV',
      caseTypeLabel: 'REMO Out',
      applicantTypeLabel: 'Individual',
      submittedBy: 'joe.bloggs',
      caseData: {
        'case-type': 'remo-out',
        'applicant-type': 'individual',
        'has-order': 'yes',
        'applicant-title': 'Ms',
        'applicant-first-names': 'Irina',
        'applicant-last-name': 'Petrova',
        'applicant-main-email-address': 'irina.petrova@example.test',
        'applicant-main-telephone-number': '+447700900442',
        'applicant-address-line-1': '8 The Strand',
        'applicant-address-line-2': 'London',
        'applicant-postal-or-zip-code': 'WC2N 1AA',
        'applicant-country': 'united-kingdom',
        'respondent-title': 'Mr',
        'respondent-first-names': 'Nikolai',
        'respondent-last-name': 'Dimitrov',
        'respondent-date-of-birth': '03/07/1971',
        'respondent-main-email-address': 'nikolai.dimitrov@example.test',
        'respondent-address-line-1': '45 Fleet Street',
        'respondent-address-line-2': 'London',
        'respondent-postal-or-zip-code': 'EC4A 1AA',
        'respondent-country': 'united-kingdom',
        'order-application-code': 'HC07003',
        'order-court-that-made-the-order': 'Sofia Regional Court',
        'order-date-order-made': '18/01/2026',
        'order-date-arrears-last-updated': '01/04/2026',
        'entered-order-terms': [
          {
            code: 'MAT',
            title: 'Matrimonial Order for Adult',
            category: 'FINAL',
            categoryLabel: 'Final',
            responses: {
              'result-mat-amount': '210',
              'result-mat-frequency': 'monthly',
              'result-mat-expiry': '',
              'result-mat-arrears': '210',
              'result-mat-creditor': 'Irina Petrova',
              'result-mat-respondent': 'Nikolai Dimitrov',
              'result-mat-payment': 'payable through the Court',
              'result-mat-commencement': '18/01/2026'
            },
            creditor: 'applicant',
            creditorLabel: 'Irina Petrova'
          }
        ],
        'interest-and-indexation-completed': 'yes',
        'interest-applies': 'no',
        'indexation-type': 'no-indexation',
        'managing-payments-completed': 'yes',
        'order-managing-payments': 'payments-via-court',
        'case-comment': 'Rejected case awaiting inputter updates.',
        'case-notes': 'Update arrears wording before resubmitting.',
        'applicant-details-completed': 'yes',
        'respondent-details-completed': 'yes',
        'order-details-completed': 'yes'
      },
      reviewHistory: [
        {
          action: 'Submitted',
          by: 'joe.bloggs',
          at: '16 May 2026 at 10:10am'
        },
        {
          action: 'Rejected',
          by: 'emily.davis',
          at: '18 May 2026 at 11:40am',
          note: 'Please update the arrears wording before resubmitting.'
        }
      ]
    }
  }

  const entry = entries[String(id)]
  return entry ? cloneData(entry) : null
}

function getBaseFailedDraftOrderEntry(id) {
  const entries = {
    8: {
      respondentName: 'Mr Piotr NOWAK',
      caseTypeLabel: 'REMO In',
      applicantTypeLabel: 'Individual',
      submittedBy: 'emily.davis',
      status: 'failed',
      caseData: {
        'case-type': 'remo-in',
        'applicant-type': 'individual',
        'has-order': 'yes',
        'applicant-title': 'Mrs',
        'applicant-first-names': 'Anna',
        'applicant-last-name': 'Nowak',
        'applicant-date-of-birth': '08/06/1982',
        'applicant-main-email-address': 'anna.nowak@gmail.com',
        'applicant-main-telephone-number': '+48 22 1234567',
        'applicant-other-telephone-number': '+48 22 1234567',
        'applicant-address-line-1': 'Zlota 59',
        'applicant-address-line-2': '00-120',
        'applicant-address-line-3': 'Warszawa',
        'applicant-country': 'poland',
        'applicant-send-correspondence-to-third-party': 'yes',
        'applicant-third-party-name-or-organisation': 'Agnieszka Wiśniewska',
        'applicant-third-party-relationship': 'Solicitor',
        'applicant-third-party-reference': 'GFH72846',
        'applicant-third-party-address-line-1': 'Zlota 76',
        'applicant-third-party-address-line-2': '00-122',
        'applicant-third-party-address-line-3': 'Warszawa',
        'applicant-third-party-country': 'poland',
        'applicant-restrict-personal-information': 'yes',
        'applicant-restriction-reason': 'There is a domestic violence case between the respondent and the applicant.',
        'respondent-title': 'Mr',
        'respondent-first-names': 'Piotr',
        'respondent-last-name': 'Nowak',
        'respondent-date-of-birth': '04/09/1978',
        'respondent-national-insurance-number': 'QA 12 34 56 E',
        'respondent-other-personal-information': 'NI - JY 85 21 84 D\nMilitary - CX/D765-TG762',
        'respondent-main-email-address': 'piotr.nowak@gmail.com',
        'respondent-main-telephone-number': '07634 625847',
        'respondent-address-line-1': 'Flat 1B',
        'respondent-address-line-2': '24 High Street',
        'respondent-address-line-3': 'Twyford',
        'respondent-address-line-4': 'Berkshire',
        'respondent-postal-or-zip-code': 'RG10 9JB',
        'respondent-country': 'united-kingdom',
        'respondent-send-correspondence-to-third-party': 'yes',
        'respondent-third-party-name-or-organisation': 'Henry Johnson',
        'respondent-third-party-relationship': 'Solicitor',
        'respondent-third-party-reference': 'FC-6735',
        'respondent-third-party-address-line-1': '3 Church Street',
        'respondent-third-party-address-line-2': 'Maidenhead',
        'respondent-third-party-address-line-3': 'Berkshire',
        'respondent-third-party-postal-or-zip-code': 'SL6 1DF',
        'respondent-third-party-country': 'united-kingdom',
        'respondent-restrict-personal-information': 'yes',
        'respondent-restriction-reason': 'There is a domestic violence case between the respondent and the applicant.',
        'central-authority-remo-reference': '2007/REMO/12345678',
        'central-authority-reference': 'CXD-2736549-PL',
        'central-authority-manual-name': 'Polish Central Authority',
        'order-application-code': 'PL-REM-2026-088',
        'order-court-that-made-the-order': 'District Court of Warsaw',
        'order-date-order-made': '10/01/2026',
        'order-date-arrears-last-updated': '01/04/2026',
        'entered-order-terms': [
          {
            code: 'MAT',
            title: 'Matrimonial Order for Adult',
            category: 'FINAL',
            categoryLabel: 'Final',
            responses: {
              'result-mat-amount': '400',
              'result-mat-frequency': 'monthly',
              'result-mat-expiry': '10/01/2028',
              'result-mat-arrears': '200',
              'result-mat-creditor': 'Anna Nowak',
              'result-mat-respondent': 'Piotr Nowak',
              'result-mat-payment': 'payable through the Court',
              'result-mat-commencement': '10/01/2026'
            },
            creditor: 'applicant',
            creditorLabel: 'Anna Nowak'
          },
          {
            code: 'MCHILD',
            title: 'Maintenance Order for child(ren)',
            category: 'FINAL',
            categoryLabel: 'Final',
            responses: {
              'result-mchild-amount': '250',
              'result-mchild-frequency': 'monthly',
              'result-mchild-expiry': '22/08/2035',
              'result-mchild-education': ['Additional terms affect order expiry'],
              'result-mchild-arrears': '100',
              'result-mchild-beneficiary': 'Sofia Nowak',
              'result-mchild-child-dob': '22/08/2015',
              'result-mchild-respondent': 'Piotr Nowak',
              'result-mchild-payment': 'payable through the Court',
              'result-mchild-commencement': '10/01/2026'
            },
            creditor: 'applicant',
            creditorLabel: 'Anna Nowak'
          }
        ],
        'interest-and-indexation-completed': 'yes',
        'interest-applies': 'no',
        'indexation-type': 'no-indexation',
        'managing-payments-completed': 'yes',
        'order-managing-payments': 'payments-via-court',
        'case-comment': 'Expiry terms: Order until completion of full-time education',
        'case-notes': 'Applicant lives in Poland (outside UK) and respondent lives in Manchester (UK). MAT plus MCHILD terms recorded.',
        'applicant-details-completed': 'yes',
        'respondent-details-completed': 'yes',
        'order-details-completed': 'yes'
      },
      reviewHistory: [
        {
          action: 'Submitted',
          by: 'joe.bloggs',
          at: '07 May 2026 at 13:25',
          datetimeFormat: 'DD MMMM YYYY [at] HH:mm'
        }
      ]
    }
  }

  const entry = entries[String(id)]
  return entry ? cloneData(entry) : null
}

router.get('/create-data', (req, res) => {
  const scenarios = buildCreateDataScenarios()

  return res.render('create-data/index', {
    scenarioItems: Object.entries(scenarios).map(([key, scenario]) => ({
      key,
      ...scenario
    }))
  })
})

router.post('/create-data/:scenarioKey', (req, res, next) => {
  const scenarios = buildCreateDataScenarios()
  const scenario = scenarios[req.params.scenarioKey]

  if (!scenario) {
    return res.redirect('/create-data')
  }

  req.session.data = cloneData(scenario.sessionData)

  return redirectWithSessionSave(req, res, next, scenario.redirectTo)
})

router.get('/case-enquiry', (req, res) => {
  return res.render('case-enquiry/index', {
    enquiryCaseRows: caseEnquiryRecords.map((record) => ([
      {
        text: record.caseReference
      },
      {
        text: `${record.caseType} ${record.kind.replace(' case', '').toLowerCase()}`
      },
      {
        html: `<a class="govuk-link govuk-link--no-visited-state" href="/case-enquiry/${record.id}">${record.respondentHeading}</a>`
      },
      {
        text: record.businessUnit
      },
      {
        text: record.lastUpdated
      },
      {
        html: `<a class="govuk-link govuk-link--no-visited-state" href="/case-enquiry/${record.id}">View case</a>`
      }
    ]))
  })
})

router.get('/case-enquiry/:recordId', (req, res) => {
  const enquiryCase = getCaseEnquiryRecord(req.params.recordId)

  if (!enquiryCase) {
    return res.redirect('/case-enquiry')
  }

  return res.render('case-enquiry/detail', {
    enquiryCase,
    atGlanceLeftRows: buildCaseEnquiryRows(enquiryCase.atGlance.leftRows),
    atGlanceMiddleRows: buildCaseEnquiryRows(enquiryCase.atGlance.middleRows),
    atGlanceRightRows: buildCaseEnquiryRows(enquiryCase.atGlance.rightRows),
    applicantSections: buildCaseEnquirySections(enquiryCase.applicantSections),
    respondentSections: buildCaseEnquirySections(enquiryCase.respondentSections),
    caseRows: buildCaseEnquiryRows(enquiryCase.caseRows),
    hearingRows: buildCaseEnquiryRows(enquiryCase.hearingRows),
    notesRows: buildCaseEnquiryRows(enquiryCase.notesRows)
  })
})

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

router.use((req, res, next) => {
  res.locals.getCountrySelectItems = getCountrySelectItems
  next()
})

// Add your routes here
router.get('/', (req, res) => {
  return res.redirect('/search')
})

router.get('/cases', (req, res) => {
  return res.render('index')
})


function getCreateACaseData(req) {
  if (!req.session.data['create-a-case']) {
    req.session.data['create-a-case'] = {}
  }

  return req.session.data['create-a-case']
}

function setCreateACaseSuccessMessage(req, message) {
  getCreateACaseData(req)['success-message'] = message
}

function consumeCreateACaseSuccessMessage(req) {
  const sessionData = getCreateACaseData(req)
  const message = sessionData['success-message'] || ''
  delete sessionData['success-message']
  return message
}


// Create a case flow
router.use('/create-a-case', (req, res, next) => {
  const alternativeData = getCreateACaseData(req)

  if (req.method === 'POST' && req.body) {
    Object.entries(req.body).forEach(([key, value]) => {
      alternativeData[key] = value
    })
  }

  res.locals.data = alternativeData
  next()
})

router.get('/create-a-case', (req, res) => {
  delete getCreateACaseData(req)['case-type']
  delete getCreateACaseData(req)['applicant-type-remo-in']
  delete getCreateACaseData(req)['submitted-case-id']
  return res.render('create-a-case/index')
})

router.post('/create-a-case', (req, res, next) => {
  const caseType = req.body['case-type']

  if (caseType === 'remo-in' && !req.body['applicant-type-remo-in']) {
    return res.render('create-a-case/index', {
      applicantTypeError: 'Select an applicant type',
      applicantTypeErrorField: 'remo-in'
    })
  }

  getCreateACaseData(req)['applicant-type'] =
    hasImplicitIndividualApplicantType(getCreateACaseData(req))
      ? 'individual'
      : req.body['applicant-type-remo-in'] || ''

  delete getCreateACaseData(req)['applicant-type-remo-in']
  delete getCreateACaseData(req)['applicant-type-remo-out']

  getCreateACaseData(req)['has-order'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/create-a-case/case-details')
})

router.get('/create-a-case/case-details', (req, res) => {
  const caseType = getCreateACaseData(req)['case-type']

  if (!caseType) {
    return res.redirect('/create-a-case')
  }

  return res.render('create-a-case/case-details', {
    detailsPageCaption: 'Create a case',
    detailsPageHeading: isApplicationJourney(getCreateACaseData(req))
      ? 'Case details'
      : 'Order details',
    successMessage: consumeCreateACaseSuccessMessage(req),
    caseTypeLabel: caseTypeLabels[caseType] || caseType,
    applicantTypeLabel:
      applicantTypeLabels[getCreateACaseData(req)['applicant-type']] || 'Not selected',
    showApplicantType: !hasImplicitIndividualApplicantType(getCreateACaseData(req)),
    partyDetailsItems: getAlternativePartyDetailsItems(getCreateACaseData(req), '/create-a-case'),
    caseSectionHeading: isApplicationJourney(getCreateACaseData(req)) ? 'Application' : 'Order',
    caseSectionIdPrefix: isApplicationJourney(getCreateACaseData(req)) ? 'application' : 'order',
    caseSectionItems: isApplicationJourney(getCreateACaseData(req))
      ? getAlternativeApplicationItems(getCreateACaseData(req), '/create-a-case')
      : getAlternativeOrderItems(getCreateACaseData(req), '/create-a-case'),
    additionalInformationItems: getAlternativeAdditionalInformationItems(getCreateACaseData(req), '/create-a-case'),
    canCheckCase: canCheckAlternativeCase(getCreateACaseData(req))
  })
})

router.get('/create-a-case/check-case-details', (req, res) => {
  if (!getCreateACaseData(req)['case-type']) {
    return res.redirect('/create-a-case')
  }

  if (!canCheckAlternativeCase(getCreateACaseData(req))) {
    return res.redirect('/create-a-case/case-details')
  }

  return res.render(
    'create-a-case/check-case-details',
    getCheckCaseDetailsViewData(getCreateACaseData(req))
  )
})

router.get('/create-a-case/case-submitted', (req, res) => {
  if (!getCreateACaseData(req)['case-type']) {
    return res.redirect('/create-a-case')
  }

  createSessionReviewCase(req)

  return res.render('create-a-case/case-submitted')
})

router.get('/create-a-case/case-comments-and-notes', (req, res) => {
  if (!getCreateACaseData(req)['case-type']) {
    return res.redirect('/create-a-case')
  }

  return res.render('create-a-case/case-comments-and-notes')
})

router.post('/create-a-case/case-comments-and-notes', (req, res, next) => {
  return redirectWithSessionSave(req, res, next, '/create-a-case/case-details')
})

router.get('/create-a-case/applicant-details', (req, res) => {
  if (!getCreateACaseData(req)['case-type']) {
    return res.redirect('/create-a-case')
  }

  return res.render('create-a-case/applicant-details', {
    applicantAge: getAgeFromDateString(getCreateACaseData(req)['applicant-date-of-birth'])
  })
})

router.post('/create-a-case/applicant-details', (req, res, next) => {
  const errors = validateApplicantDetails(req.body, getCreateACaseData(req)['applicant-type'])

  if (Object.keys(errors).length > 0) {
    delete getCreateACaseData(req)['applicant-details-completed']

    return res.render('create-a-case/applicant-details', {
      data: buildApplicantDetailsViewData(getCreateACaseData(req), req.body),
      applicantAge: getAgeFromDateString(req.body['applicant-date-of-birth']),
      errors,
      errorSummary: buildErrorSummary(errors)
    })
  }

  getCreateACaseData(req)['applicant-add-aliases'] = isChecked(
    req.body['applicant-add-aliases']
  )
    ? 'yes'
    : ''
  syncAliasFields(getCreateACaseData(req), req.body, 'applicant')
  getCreateACaseData(req)['applicant-bank-account-type'] =
    getSingleValue(req.body['applicant-bank-account-type']) || ''
  getCreateACaseData(req)['applicant-send-correspondence-to-third-party'] =
    isChecked(req.body['applicant-send-correspondence-to-third-party'])
      ? 'yes'
      : ''
  getCreateACaseData(req)['applicant-restrict-personal-information'] =
    isChecked(req.body['applicant-restrict-personal-information'])
      ? 'yes'
      : ''
  getCreateACaseData(req)['applicant-restriction-reason'] =
    isChecked(req.body['applicant-restrict-personal-information'])
      ? req.body['applicant-restriction-reason'] || ''
      : ''

  getCreateACaseData(req)['applicant-details-completed'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/create-a-case/case-details')
})

router.get('/create-a-case/respondent-details', (req, res) => {
  if (!getCreateACaseData(req)['case-type']) {
    return res.redirect('/create-a-case')
  }

  return res.render('create-a-case/respondent-details')
})

router.post('/create-a-case/respondent-details', (req, res, next) => {
  const errors = validateRespondentDetails(req.body)

  if (Object.keys(errors).length > 0) {
    delete getCreateACaseData(req)['respondent-details-completed']

    return res.render('create-a-case/respondent-details', {
      data: buildRespondentDetailsViewData(getCreateACaseData(req), req.body),
      errors,
      errorSummary: buildErrorSummary(errors)
    })
  }

  getCreateACaseData(req)['respondent-add-aliases'] = isChecked(
    req.body['respondent-add-aliases']
  )
    ? 'yes'
    : ''
  syncAliasFields(getCreateACaseData(req), req.body, 'respondent')
  getCreateACaseData(req)['respondent-add-employer-details'] = isChecked(
    req.body['respondent-add-employer-details']
  )
    ? 'yes'
    : ''
  getCreateACaseData(req)['respondent-send-correspondence-to-third-party'] =
    isChecked(req.body['respondent-send-correspondence-to-third-party'])
      ? 'yes'
      : ''
  getCreateACaseData(req)['respondent-restrict-personal-information'] =
    isChecked(req.body['respondent-restrict-personal-information'])
      ? 'yes'
      : ''
  getCreateACaseData(req)['respondent-restriction-reason'] =
    isChecked(req.body['respondent-restrict-personal-information'])
      ? req.body['respondent-restriction-reason'] || ''
      : ''

  getCreateACaseData(req)['respondent-details-completed'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/create-a-case/case-details')
})

router.get('/create-a-case/central-authority-details', (req, res) => {
  if (!getCreateACaseData(req)['case-type']) {
    return res.redirect('/create-a-case')
  }

  return res.render('create-a-case/central-authority-details', {
    hasCentralAuthorityManualDetails: hasCentralAuthorityManualDetails(getCreateACaseData(req)),
    centralAuthorityCardRows: getCentralAuthorityCardRows(getCreateACaseData(req))
  })
})

router.post('/create-a-case/central-authority-details', (req, res, next) => {
  getCreateACaseData(req)['central-authority-details-completed'] = hasCentralAuthorityDetails(
    getCreateACaseData(req)
  )
    ? 'yes'
    : ''

  return redirectWithSessionSave(req, res, next, '/create-a-case/case-details')
})

router.get('/create-a-case/central-authority-details/manual', (req, res) => {
  if (!getCreateACaseData(req)['case-type']) {
    return res.redirect('/create-a-case')
  }

  return res.render('create-a-case/central-authority-details-manual')
})

router.post('/create-a-case/central-authority-details/manual', (req, res, next) => {
  getCreateACaseData(req)['central-authority-details-completed'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/create-a-case/central-authority-details')
})

router.get('/create-a-case/central-authority-details/remove', (req, res) => {
  if (!getCreateACaseData(req)['case-type']) {
    return res.redirect('/create-a-case')
  }

  if (!hasCentralAuthorityManualDetails(getCreateACaseData(req))) {
    return res.redirect('/create-a-case/central-authority-details')
  }

  return res.render('create-a-case/remove-central-authority-details', {
    centralAuthorityCardRows: getCentralAuthorityCardRows(getCreateACaseData(req))
  })
})

router.post('/create-a-case/central-authority-details/remove', (req, res, next) => {
  delete getCreateACaseData(req)['central-authority-manual-name']
  delete getCreateACaseData(req)['central-authority-main-email-address']
  delete getCreateACaseData(req)['central-authority-other-email-address']
  delete getCreateACaseData(req)['central-authority-main-telephone-number']
  delete getCreateACaseData(req)['central-authority-other-telephone-number']
  delete getCreateACaseData(req)['central-authority-address-line-1']
  delete getCreateACaseData(req)['central-authority-address-line-2']
  delete getCreateACaseData(req)['central-authority-address-line-3']
  delete getCreateACaseData(req)['central-authority-address-line-4']
  delete getCreateACaseData(req)['central-authority-address-line-5']
  delete getCreateACaseData(req)['central-authority-postal-or-zip-code']
  delete getCreateACaseData(req)['central-authority-country']
  delete getCreateACaseData(req)['central-authority-bank-account-type']
  delete getCreateACaseData(req)['central-authority-bank-name-on-account']
  delete getCreateACaseData(req)['central-authority-bank-sort-code']
  delete getCreateACaseData(req)['central-authority-bank-account-number']
  delete getCreateACaseData(req)['central-authority-bank-payment-reference']
  delete getCreateACaseData(req)['central-authority-bank-non-uk-name-on-account']
  delete getCreateACaseData(req)['central-authority-bank-bic-or-swift-code']
  delete getCreateACaseData(req)['central-authority-bank-iban']
  delete getCreateACaseData(req)['central-authority-bank-non-uk-payment-reference']
  delete getCreateACaseData(req)['central-authority-bank-name']
  delete getCreateACaseData(req)['central-authority-bank-branch-office-or-sort-code']
  delete getCreateACaseData(req)['central-authority-bank-non-uk-account-number']

  getCreateACaseData(req)['central-authority-details-completed'] = hasCentralAuthorityDetails(
    getCreateACaseData(req)
  )
    ? 'yes'
    : ''

  return redirectWithSessionSave(req, res, next, '/create-a-case/central-authority-details')
})

router.get('/create-a-case/order-details', (req, res) => {
  if (!getCreateACaseData(req)['case-type']) {
    return res.redirect('/create-a-case')
  }

  const caseType = getCreateACaseData(req)['case-type']

  if (isApplicationJourney(getCreateACaseData(req))) {
    return res.redirect('/create-a-case/application-details')
  }

  if (!hasCompletedPartyDetails(getCreateACaseData(req))) {
    return res.redirect('/create-a-case/case-details')
  }

  let selectedApplicationCode = getCreateACaseData(req)['order-application-code']

  if (
    hasValue(selectedApplicationCode) &&
    !isApplicationDefinitionAvailableForCaseType(selectedApplicationCode, caseType)
  ) {
    selectedApplicationCode = getDefaultOrderApplicationCodeForCaseType(caseType)
    getCreateACaseData(req)['order-application-code'] = selectedApplicationCode
  }

  const orderApplicationDefinition = getApplicationDefinition(
    selectedApplicationCode
  )

  return res.render('create-a-case/order-details', {
    applicationItems: getApplicationOptionItems(
      selectedApplicationCode,
      caseType
    ),
    applicationLookupJson: getApplicationLookupJson(caseType),
    errors: {},
    errorSummary: null,
    orderApplicationTitle:
      orderApplicationDefinition?.title ||
      'Application from EU Country for registration or recognition of an order in the family court'
  })
})

router.post('/create-a-case/order-details', (req, res, next) => {
  if (isApplicationJourney(getCreateACaseData(req))) {
    return res.redirect('/create-a-case/application-details')
  }

  const selectedApplicationCode = String(
    getSingleValue(req.body['order-application-code']) || ''
  )
    .trim()
    .toUpperCase()

  getCreateACaseData(req)['order-application-code'] = selectedApplicationCode
  const errors = validateAlternativeOrderDetails(
    req.body,
    getCreateACaseData(req)['case-type']
  )
  const orderApplicationDefinition = getApplicationDefinition(selectedApplicationCode)

  if (Object.keys(errors).length > 0) {
    delete getCreateACaseData(req)['order-details-completed']

    return res.render('create-a-case/order-details', {
      applicationItems: getApplicationOptionItems(
        selectedApplicationCode,
        getCreateACaseData(req)['case-type']
      ),
      applicationLookupJson: getApplicationLookupJson(getCreateACaseData(req)['case-type']),
      errors,
      errorSummary: buildErrorSummary(errors),
      orderApplicationTitle:
        orderApplicationDefinition?.title ||
        'Application from EU Country for registration or recognition of an order in the family court'
    })
  }

  delete getCreateACaseData(req)['order-payment-terms']
  delete getCreateACaseData(req)['order-payment-frequency']
  delete getCreateACaseData(req)['order-managing-payments']
  getCreateACaseData(req)['order-has-periodical-payments'] = ''
  getCreateACaseData(req)['order-has-lump-sum'] = ''
  getCreateACaseData(req)['order-details-completed'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/create-a-case/case-details')
})

router.get('/create-a-case/select-order-term', (req, res) => {
  if (!hasCompletedOrderDetails(getCreateACaseData(req))) {
    return res.redirect('/create-a-case/case-details')
  }

  return res.render('create-a-case/select-order-term', {
    successMessage: consumeCreateACaseSuccessMessage(req),
    orderTermCards: getOrderTermHubCards(getCreateACaseData(req)),
    recordedOrderTerms: getRecordedOrderTerms(getCreateACaseData(req))
  })
})

router.get('/create-a-case/add-order-term', (req, res) => {
  if (!hasCompletedOrderDetails(getCreateACaseData(req))) {
    return res.redirect('/create-a-case/case-details')
  }

  delete getCreateACaseData(req)['alternative-order-term-code']
  delete getCreateACaseData(req)['alternative-edit-order-term-index']
  delete getCreateACaseData(req)['alternative-current-order-term-responses']
  delete getCreateACaseData(req)['alternative-pending-order-term']

  return res.render('create-a-case/add-order-term', {
    resultItems: getResultOptionItems('', 'orders')
  })
})

router.post('/create-a-case/select-order-term', (req, res, next) => {
  if (!hasCompletedOrderDetails(getCreateACaseData(req))) {
    return res.redirect('/create-a-case/case-details')
  }

  const selectedOrderTermCode = String(
    getSingleValue(req.body['alternative-order-term-code']) || ''
  )
    .trim()
    .toUpperCase()

  if (!getResultDefinition(selectedOrderTermCode, 'orders')) {
    getCreateACaseData(req)['alternative-order-term-code'] = ''

    return res.render('create-a-case/add-order-term', {
      resultItems: getResultOptionItems('', 'orders'),
      selectionError: 'Select an order term from the list.'
    })
  }

  getCreateACaseData(req)['alternative-order-term-code'] = selectedOrderTermCode
  delete getCreateACaseData(req)['alternative-order-term-errors']
  delete getCreateACaseData(req)['alternative-current-order-term-responses']
  delete getCreateACaseData(req)['alternative-edit-order-term-index']
  delete getCreateACaseData(req)['alternative-pending-order-term']

  return redirectWithSessionSave(req, res, next, '/create-a-case/order-term-details')
})

router.get('/create-a-case/order-term/:index/change', (req, res, next) => {
  if (!hasCompletedOrderDetails(getCreateACaseData(req))) {
    return res.redirect('/create-a-case/case-details')
  }

  const index = Number(req.params.index)
  const recordedTerms = getRecordedOrderTerms(getCreateACaseData(req))
  const selectedTerm = recordedTerms[index]

  if (!selectedTerm) {
    return redirectWithSessionSave(req, res, next, '/create-a-case/select-order-term')
  }

  getCreateACaseData(req)['alternative-edit-order-term-index'] = String(index)
  getCreateACaseData(req)['alternative-order-term-code'] = selectedTerm.code
  getCreateACaseData(req)['alternative-current-order-term-responses'] =
    selectedTerm.responses || {}
  delete getCreateACaseData(req)['alternative-order-term-errors']

  return redirectWithSessionSave(req, res, next, '/create-a-case/order-term-details')
})

router.get('/create-a-case/order-term/:index/delete', (req, res, next) => {
  if (!hasCompletedOrderDetails(getCreateACaseData(req))) {
    return res.redirect('/create-a-case/case-details')
  }

  const index = Number(req.params.index)
  const recordedTerms = getRecordedOrderTerms(getCreateACaseData(req))
  const selectedTerm = recordedTerms[index]

  if (!selectedTerm) {
    return redirectWithSessionSave(req, res, next, '/create-a-case/select-order-term')
  }

  return res.render('create-a-case/remove-order-term', {
    orderTermCard: {
      title: `${selectedTerm.code} - ${selectedTerm.title}`,
      rows: getOrderTermReviewRows(selectedTerm).slice(1).filter((row) => row.value.text !== '-')
    },
    formAction: `/create-a-case/order-term/${index}/delete`
  })
})

router.post('/create-a-case/order-term/:index/delete', (req, res, next) => {
  if (!hasCompletedOrderDetails(getCreateACaseData(req))) {
    return res.redirect('/create-a-case/case-details')
  }

  const index = Number(req.params.index)
  const recordedTerms = getRecordedOrderTerms(getCreateACaseData(req))

  if (!recordedTerms[index]) {
    return redirectWithSessionSave(req, res, next, '/create-a-case/select-order-term')
  }

  recordedTerms.splice(index, 1)
  getCreateACaseData(req)['entered-order-terms'] = recordedTerms.map(
    ({ index: _index, ...term }) => term
  )
  setCreateACaseSuccessMessage(req, 'Order terms removed')

  if (String(getCreateACaseData(req)['alternative-edit-order-term-index']) === String(index)) {
    delete getCreateACaseData(req)['alternative-edit-order-term-index']
    delete getCreateACaseData(req)['alternative-order-term-code']
    delete getCreateACaseData(req)['alternative-current-order-term-responses']
    delete getCreateACaseData(req)['alternative-order-term-errors']
  }

  return redirectWithSessionSave(req, res, next, '/create-a-case/select-order-term')
})

router.get('/create-a-case/order-term-details', (req, res) => {
  if (!hasCompletedOrderDetails(getCreateACaseData(req))) {
    return res.redirect('/create-a-case/case-details')
  }

  const orderTermDefinition = getResultDefinition(
    getCreateACaseData(req)['alternative-order-term-code'],
    'orders'
  )

  if (!orderTermDefinition) {
    return res.redirect('/create-a-case/select-order-term')
  }

  return res.render('create-a-case/order-term-details', {
    isEditingOrderTerm: isEditingAlternativeOrderTerm(getCreateACaseData(req)),
    resultCode: orderTermDefinition.code,
    resultTitle: orderTermDefinition.title,
    resultCategory: getResultCategoryLabel(orderTermDefinition.category),
    requiresCreditor: orderTermDefinition.nextStep === 'create-creditor',
    resultWording: getAlternativeOrderTermWording(getCreateACaseData(req)),
    responseItems: getAlternativeOrderTermResponseItems(getCreateACaseData(req)),
    errorSummary: null
  })
})

router.post('/create-a-case/order-term-details', (req, res, next) => {
  if (!hasCompletedOrderDetails(getCreateACaseData(req))) {
    return res.redirect('/create-a-case/case-details')
  }

  const orderTermDefinition = getResultDefinition(
    getCreateACaseData(req)['alternative-order-term-code'],
    'orders'
  )

  if (!orderTermDefinition) {
    return res.redirect('/create-a-case/select-order-term')
  }

  const { errors, values } = validateResultResponses(orderTermDefinition, req.body)

  getCreateACaseData(req)['alternative-current-order-term-responses'] = values

  if (Object.keys(errors).length) {
    getCreateACaseData(req)['alternative-order-term-errors'] = errors

    return res.render('create-a-case/order-term-details', {
      isEditingOrderTerm: isEditingAlternativeOrderTerm(getCreateACaseData(req)),
      resultCode: orderTermDefinition.code,
      resultTitle: orderTermDefinition.title,
      resultCategory: getResultCategoryLabel(orderTermDefinition.category),
      requiresCreditor: orderTermDefinition.nextStep === 'create-creditor',
      resultWording: getAlternativeOrderTermWording(getCreateACaseData(req)),
      responseItems: getAlternativeOrderTermResponseItems(getCreateACaseData(req)),
      errorSummary: buildErrorSummary(errors)
    })
  }

  delete getCreateACaseData(req)['alternative-order-term-errors']

  const recordedTerms = getRecordedOrderTerms(getCreateACaseData(req))
  const savedOrderTerm = {
    code: orderTermDefinition.code,
    title: orderTermDefinition.title,
    category: orderTermDefinition.category,
    categoryLabel: getResultCategoryLabel(orderTermDefinition.category),
    wording: getAlternativeOrderTermWording(getCreateACaseData(req)),
    responses: values,
    nextStep: orderTermDefinition.nextStep
  }
  const editIndex = Number(getCreateACaseData(req)['alternative-edit-order-term-index'])
  const existingRecordedTerm = Number.isInteger(editIndex) && recordedTerms[editIndex]
    ? recordedTerms[editIndex]
    : null

  if (existingRecordedTerm?.creditor) {
    savedOrderTerm.creditor = existingRecordedTerm.creditor
    savedOrderTerm.creditorLabel = existingRecordedTerm.creditorLabel || ''
  }

  if (existingRecordedTerm?.minorCreditorData) {
    savedOrderTerm.minorCreditorData = existingRecordedTerm.minorCreditorData
  }

  if (orderTermDefinition.nextStep === 'create-creditor') {
    const pendingOrderTerm = {
      ...savedOrderTerm
    }

    if (Number.isInteger(editIndex) && existingRecordedTerm) {
      pendingOrderTerm.editIndex = String(editIndex)
    }

    getCreateACaseData(req)['alternative-pending-order-term'] = pendingOrderTerm
    delete getCreateACaseData(req)['alternative-creditor-order-term-index']
    return redirectWithSessionSave(req, res, next, '/create-a-case/order-term-creditor')
  }

  if (Number.isInteger(editIndex) && existingRecordedTerm) {
    recordedTerms[editIndex] = savedOrderTerm
  } else {
    recordedTerms.push(savedOrderTerm)
  }

  delete getCreateACaseData(req)['alternative-order-term-code']
  delete getCreateACaseData(req)['alternative-current-order-term-responses']
  delete getCreateACaseData(req)['alternative-edit-order-term-index']

  const savedOrderTermIndex = Number.isInteger(editIndex) && existingRecordedTerm
    ? editIndex
    : recordedTerms.length - 1

  getCreateACaseData(req)['entered-order-terms'] = recordedTerms.map(
    ({ index, ...term }) => term
  )
  getCreateACaseData(req)['alternative-creditor-order-term-index'] = String(savedOrderTermIndex)
  delete getCreateACaseData(req)['alternative-pending-order-term']

  return redirectWithSessionSave(req, res, next, '/create-a-case/select-order-term')
})

router.get('/create-a-case/order-term-creditor', (req, res) => {
  const pendingOrderTerm = getCreateACaseData(req)['alternative-pending-order-term']

  if (!pendingOrderTerm || pendingOrderTerm.nextStep !== 'create-creditor') {
    return res.redirect('/create-a-case/select-order-term')
  }

  const sessionData = getCreateACaseData(req)
  const pendingMinorCreditor =
    sessionData['alternative-pending-minor-creditor'] ||
    pendingOrderTerm.minorCreditorData ||
    null
  const rawCreditor = pendingOrderTerm.creditor || null
  const selectedCreditor = rawCreditor && rawCreditor.startsWith('major-creditor-') ? 'major-creditor' : rawCreditor
  const majorCreditorCode = rawCreditor && rawCreditor.startsWith('major-creditor-')
    ? rawCreditor.replace('major-creditor-', '')
    : (sessionData['alternative-selected-major-creditor'] || '')
  const editingIndex = pendingOrderTerm.editIndex != null ? Number(pendingOrderTerm.editIndex) : undefined

  return res.render('create-a-case/order-term-creditor', {
    successMessage: consumeCreateACaseSuccessMessage(req),
    pendingMinorCreditor,
    pendingMinorCreditorCard: pendingMinorCreditor
      ? {
          title: getMinorCreditorName(pendingMinorCreditor, 0),
          rows: getMinorCreditorSummaryRows(pendingMinorCreditor)
        }
      : null,
    applicantItem: {
      value: 'applicant',
      text: `${getApplicantCreditorLabel(sessionData)} (Applicant)`,
      checked: selectedCreditor === 'applicant'
    },
    existingMinorCreditorItems: getMinorCreditorsFromOrderTerms(sessionData, editingIndex).map((mc) => ({
      value: mc.value,
      text: mc.text,
      checked: selectedCreditor === mc.value
    })),
    selectedCreditor,
    majorCreditorItems: getMajorCreditorItems(majorCreditorCode),
    majorCreditorValue: getMajorCreditorLabel(majorCreditorCode) || '',
    selectionError: null
  })
})

router.get('/create-a-case/order-term-creditor/add-minor-creditor', (req, res) => {
  const pendingOrderTerm = getCreateACaseData(req)['alternative-pending-order-term']
  if (!pendingOrderTerm || pendingOrderTerm.nextStep !== 'create-creditor') {
    return res.redirect('/create-a-case/select-order-term')
  }
  const pendingMinorCreditor = getCreateACaseData(req)['alternative-pending-minor-creditor'] || pendingOrderTerm.minorCreditorData || {}
  return res.render('create-a-case/minor-creditor-details', {
    creditor: pendingMinorCreditor,
    countryItems: getCountrySelectItems(pendingMinorCreditor.country || ''),
    formAction: '/create-a-case/order-term-creditor/add-minor-creditor',
    cancelHref: '/create-a-case/order-term-creditor'
  })
})

router.post('/create-a-case/order-term-creditor/add-minor-creditor', (req, res, next) => {
  const pendingOrderTerm = getCreateACaseData(req)['alternative-pending-order-term']
  if (!pendingOrderTerm || pendingOrderTerm.nextStep !== 'create-creditor') {
    return res.redirect('/create-a-case/select-order-term')
  }
  getCreateACaseData(req)['alternative-pending-minor-creditor'] = buildMinorCreditor(req.body)
  return redirectWithSessionSave(req, res, next, '/create-a-case/order-term-creditor')
})

router.get('/create-a-case/order-term-creditor/remove-minor-creditor', (req, res) => {
  const sessionData = getCreateACaseData(req)
  const pendingOrderTerm = sessionData['alternative-pending-order-term']
  const pendingMinorCreditor =
    sessionData['alternative-pending-minor-creditor'] ||
    (pendingOrderTerm && pendingOrderTerm.minorCreditorData) ||
    null
  if (!pendingMinorCreditor) {
    return res.redirect('/create-a-case/order-term-creditor')
  }
  return res.render('create-a-case/remove-minor-creditor', {
    minorCreditorCard: {
      title: getMinorCreditorName(pendingMinorCreditor, 0),
      rows: getMinorCreditorSummaryRows(pendingMinorCreditor)
    },
    formAction: '/create-a-case/order-term-creditor/remove-minor-creditor',
    cancelHref: '/create-a-case/order-term-creditor'
  })
})

router.post('/create-a-case/order-term-creditor/remove-minor-creditor', (req, res, next) => {
  delete getCreateACaseData(req)['alternative-pending-minor-creditor']
  const pendingOrderTerm = getCreateACaseData(req)['alternative-pending-order-term']
  if (pendingOrderTerm) {
    delete pendingOrderTerm.minorCreditorData
    delete pendingOrderTerm.creditor
    delete pendingOrderTerm.creditorLabel
  }
  setCreateACaseSuccessMessage(req, 'Minor creditor removed')
  return redirectWithSessionSave(req, res, next, '/create-a-case/order-term-creditor')
})

router.get('/create-a-case/order-term-creditor/cancel', (req, res, next) => {
  delete getCreateACaseData(req)['alternative-pending-order-term']
  delete getCreateACaseData(req)['alternative-creditor-order-term-index']

  return redirectWithSessionSave(req, res, next, '/create-a-case/select-order-term')
})

router.post('/create-a-case/order-term-creditor', (req, res, next) => {
  const pendingOrderTerm = getCreateACaseData(req)['alternative-pending-order-term']
  const recordedTerms = getRecordedOrderTerms(getCreateACaseData(req))

  if (!pendingOrderTerm || pendingOrderTerm.nextStep !== 'create-creditor') {
    return res.redirect('/create-a-case/select-order-term')
  }

  const selectedCreditor = getSingleValue(req.body['alternative-order-term-creditor']) || ''
  const pendingMinorCreditor = getCreateACaseData(req)['alternative-pending-minor-creditor'] || null

  if (selectedCreditor === 'add-new-minor-creditor') {
    return redirectWithSessionSave(req, res, next, '/create-a-case/order-term-creditor/add-minor-creditor')
  }

  const usingPendingMinorCreditor = selectedCreditor === 'new-minor-creditor' && pendingMinorCreditor

  if (!selectedCreditor && !pendingMinorCreditor) {
    const sd = getCreateACaseData(req)
    return res.render('create-a-case/order-term-creditor', {
      pendingMinorCreditor: null,
      pendingMinorCreditorCard: null,
      applicantItem: {
        value: 'applicant',
        text: `${getApplicantCreditorLabel(sd)} (Applicant)`,
        checked: false
      },
      existingMinorCreditorItems: getMinorCreditorsFromOrderTerms(sd).map((mc) => ({
        value: mc.value,
        text: mc.text,
        checked: false
      })),
      selectedCreditor: '',
      majorCreditorItems: getMajorCreditorItems(''),
      selectionError: 'Select a creditor.'
    })
  }

  let finalCreditorValue = selectedCreditor
  let creditorLabel = ''
  let minorCreditorData = null

  if (usingPendingMinorCreditor) {
    finalCreditorValue = 'new-minor-creditor'
    creditorLabel = getMinorCreditorName(pendingMinorCreditor, 0)
    minorCreditorData = pendingMinorCreditor
  } else if (selectedCreditor === 'major-creditor') {
    const selectedMajorCode = getSingleValue(req.body['alternative-major-creditor-code']) || ''
    creditorLabel = getMajorCreditorLabel(selectedMajorCode) || 'Major creditor'
    finalCreditorValue = selectedMajorCode ? `major-creditor-${selectedMajorCode}` : 'major-creditor'
    getCreateACaseData(req)['alternative-selected-major-creditor'] = selectedMajorCode
  } else {
    creditorLabel = getOrderTermCreditorLabelByValue(selectedCreditor, getCreateACaseData(req))

    if (String(selectedCreditor).startsWith('order-term-minor-creditor-')) {
      const termIndex = Number(String(selectedCreditor).replace('order-term-minor-creditor-', ''))
      const existingMinorCreditorTerm = recordedTerms.find((term) => term.index === termIndex)
      minorCreditorData = existingMinorCreditorTerm?.minorCreditorData || null
    } else if (String(selectedCreditor).startsWith('minor-creditor-')) {
      const minorCreditorIndex = Number(String(selectedCreditor).replace('minor-creditor-', ''))
      minorCreditorData = Number.isInteger(minorCreditorIndex)
        ? getMinorCreditors(getCreateACaseData(req))[minorCreditorIndex]
        : null
    }
  }

  const completedOrderTerm = {
    ...pendingOrderTerm,
    creditor: finalCreditorValue,
    creditorLabel
  }

  if (minorCreditorData) {
    completedOrderTerm.minorCreditorData = minorCreditorData
  } else {
    delete completedOrderTerm.minorCreditorData
  }
  const editIndex = hasValue(pendingOrderTerm.editIndex)
    ? Number(pendingOrderTerm.editIndex)
    : Number.NaN

  delete completedOrderTerm.editIndex

  if (Number.isInteger(editIndex) && recordedTerms[editIndex]) {
    recordedTerms[editIndex] = completedOrderTerm
  } else {
    recordedTerms.push(completedOrderTerm)
  }

  const savedOrderTermIndex = Number.isInteger(editIndex) && recordedTerms[editIndex]
    ? editIndex
    : recordedTerms.length - 1

  getCreateACaseData(req)['entered-order-terms'] = recordedTerms.map(
    ({ index, ...term }) => term
  )
  getCreateACaseData(req)['alternative-creditor-order-term-index'] = String(savedOrderTermIndex)
  delete getCreateACaseData(req)['alternative-pending-order-term']
  delete getCreateACaseData(req)['alternative-pending-minor-creditor']
  delete getCreateACaseData(req)['alternative-selected-major-creditor']
  return redirectWithSessionSave(req, res, next, '/create-a-case/select-order-term')
})

router.get('/create-a-case/order-term-review', (req, res) => {
  const orderTermIndex = Number(
    getCreateACaseData(req)['alternative-creditor-order-term-index']
  )
  const orderTerm = getRecordedOrderTerms(getCreateACaseData(req))[orderTermIndex]

  if (!orderTerm) {
    return res.redirect('/create-a-case/select-order-term')
  }

  return res.render('create-a-case/order-term-review', {
    orderTerm,
    orderTermCard: getOrderTermReviewCard(orderTerm, getCreateACaseData(req))
  })
})

router.get('/create-a-case/application-details', (req, res) => {
  if (!getCreateACaseData(req)['case-type']) {
    return res.redirect('/create-a-case')
  }

  if (
    !isApplicationJourney(getCreateACaseData(req)) ||
    !hasCompletedPartyDetails(getCreateACaseData(req))
  ) {
    return res.redirect('/create-a-case/case-details')
  }

  return res.render('create-a-case/application-details', {
    applicationItems: getApplicationOptionItems(
      getCreateACaseData(req)['application-code'],
      getCreateACaseData(req)['case-type']
    ),
    applicationLookupJson: getApplicationLookupJson(getCreateACaseData(req)['case-type']),
    selectionError: null
  })
})

router.post('/create-a-case/application-details', (req, res, next) => {
  if (!isApplicationJourney(getCreateACaseData(req))) {
    return res.redirect('/create-a-case/case-details')
  }

  const selectedApplicationCode = String(getSingleValue(req.body['application-code']) || '')
    .trim()
    .toUpperCase()

  getCreateACaseData(req)['application-code'] = selectedApplicationCode

  if (
    !isApplicationDefinitionAvailableForCaseType(
      selectedApplicationCode,
      getCreateACaseData(req)['case-type']
    )
  ) {
    return res.render('create-a-case/application-details', {
      applicationItems: getApplicationOptionItems(
        selectedApplicationCode,
        getCreateACaseData(req)['case-type']
      ),
      applicationLookupJson: getApplicationLookupJson(getCreateACaseData(req)['case-type']),
      selectionError: 'Select an application code from the list.'
    })
  }

  delete getCreateACaseData(req)['application-details-completed']
  delete getCreateACaseData(req)['application-response-values']

  return redirectWithSessionSave(req, res, next, '/create-a-case/application-details/content')
})

router.get('/create-a-case/application-details/content', (req, res) => {
  if (!getCreateACaseData(req)['case-type']) {
    return res.redirect('/create-a-case')
  }

  if (
    !isApplicationJourney(getCreateACaseData(req)) ||
    !hasCompletedPartyDetails(getCreateACaseData(req)) ||
    !hasValue(getCreateACaseData(req)['application-code'])
  ) {
    return res.redirect('/create-a-case/application-details')
  }

  return res.render('create-a-case/application-details-content', {
    applicationCode: getCreateACaseData(req)['application-code'],
    applicationTitle: getApplicationTitle(getCreateACaseData(req)),
    applicationWording: getAlternativeApplicationWording(getCreateACaseData(req)),
    responseItems: getAlternativeApplicationResponseFields(getCreateACaseData(req)),
    formAction: '/create-a-case/application-details/content',
    cancelHref: '/create-a-case/cancel'
  })
})

router.post('/create-a-case/application-details/content', (req, res, next) => {
  if (
    !isApplicationJourney(getCreateACaseData(req)) ||
    !hasValue(getCreateACaseData(req)['application-code'])
  ) {
    return res.redirect('/create-a-case/case-details')
  }

  const applicationResponseValues = Object.fromEntries(
    getAlternativeApplicationResponseFields(getCreateACaseData(req)).map((field) => [
      field.id,
      getSingleValue(req.body[field.id]) || ''
    ])
  )

  getCreateACaseData(req)['application-response-values'] = applicationResponseValues
  getCreateACaseData(req)['application-foreign-court'] =
    applicationResponseValues[getApplicationResponseFieldId('court')] ||
    applicationResponseValues[getApplicationResponseFieldId('foreign court')] ||
    ''
  getCreateACaseData(req)['application-order-date'] =
    applicationResponseValues[getApplicationResponseFieldId('order date')] ||
    applicationResponseValues[getApplicationResponseFieldId('date order made')] ||
    ''
  getCreateACaseData(req)['application-details-completed'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/create-a-case/case-details')
})

router.get('/create-a-case/hearing-details', (req, res) => {
  if (!getCreateACaseData(req)['case-type']) {
    return res.redirect('/create-a-case')
  }

  if (
    !isApplicationJourney(getCreateACaseData(req)) ||
    !hasCompletedApplicationDetails(getCreateACaseData(req))
  ) {
    return res.redirect('/create-a-case/case-details')
  }

  return res.render('create-a-case/hearing-details')
})

router.post('/create-a-case/hearing-details', (req, res, next) => {
  if (!isApplicationJourney(getCreateACaseData(req))) {
    return res.redirect('/create-a-case/case-details')
  }

  const hearingLocation = getSingleValue(req.body['hearing-location']) || ''

  getCreateACaseData(req)['hearing-type'] =
    hearingLocation === 'yes'
      ? 'schedule-england-wales'
      : hearingLocation === 'no'
        ? 'non-scheduled'
        : ''
  delete getCreateACaseData(req)['hearing-details-completed']

  const nextPage =
    getCreateACaseData(req)['hearing-type'] === 'schedule-england-wales'
      ? '/create-a-case/hearing-details-england-wales'
      : getCreateACaseData(req)['hearing-type'] === 'non-scheduled'
        ? '/create-a-case/hearing-details-outside-england-wales'
        : '/create-a-case/hearing-details'

  return redirectWithSessionSave(req, res, next, nextPage)
})

router.get('/create-a-case/hearing-details-england-wales', (req, res) => {
  if (
    !isApplicationJourney(getCreateACaseData(req)) ||
    !hasCompletedApplicationDetails(getCreateACaseData(req))
  ) {
    return res.redirect('/create-a-case/case-details')
  }

  if (getCreateACaseData(req)['hearing-type'] !== 'schedule-england-wales') {
    return res.redirect('/create-a-case/hearing-details')
  }

  return res.render('create-a-case/hearing-details-england-wales')
})

router.post('/create-a-case/hearing-details-england-wales', (req, res, next) => {
  if (!isApplicationJourney(getCreateACaseData(req))) {
    return res.redirect('/create-a-case/case-details')
  }

  getCreateACaseData(req)['hearing-type'] = 'schedule-england-wales'
  getCreateACaseData(req)['hearing-date'] =
    getSingleValue(req.body['hearing-date']) || ''
  getCreateACaseData(req)['hearing-court'] =
    getSingleValue(req.body['hearing-court']) || ''
  getCreateACaseData(req)['hearing-courtroom-number'] =
    getSingleValue(req.body['hearing-courtroom-number']) || ''
  getCreateACaseData(req)['hearing-start-time'] =
    getSingleValue(req.body['hearing-start-time']) || ''
  getCreateACaseData(req)['hearing-details-completed'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/create-a-case/case-details')
})

router.get('/create-a-case/hearing-details-outside-england-wales', (req, res) => {
  if (
    !isApplicationJourney(getCreateACaseData(req)) ||
    !hasCompletedApplicationDetails(getCreateACaseData(req))
  ) {
    return res.redirect('/create-a-case/case-details')
  }

  if (getCreateACaseData(req)['hearing-type'] !== 'non-scheduled') {
    return res.redirect('/create-a-case/hearing-details')
  }

  return res.render('create-a-case/hearing-details-outside-england-wales')
})

router.post('/create-a-case/hearing-details-outside-england-wales', (req, res, next) => {
  if (!isApplicationJourney(getCreateACaseData(req))) {
    return res.redirect('/create-a-case/case-details')
  }

  getCreateACaseData(req)['hearing-type'] = 'non-scheduled'
  getCreateACaseData(req)['hearing-date'] =
    getSingleValue(req.body['hearing-date']) || ''
  getCreateACaseData(req)['hearing-non-scheduled-details'] =
    getSingleValue(req.body['hearing-non-scheduled-details']) || ''
  getCreateACaseData(req)['hearing-details-completed'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/create-a-case/case-details')
})

router.get('/create-a-case/minor-creditors', (req, res) => {
  if (!hasCompletedOrderDetails(getCreateACaseData(req))) {
    return res.redirect('/create-a-case/case-details')
  }

  if (!hasMinorCreditors(getCreateACaseData(req))) {
    return res.render('create-a-case/minor-creditor-details', {
      creditor: {},
      countryItems: getCountrySelectItems(''),
      formAction: '/create-a-case/minor-creditors',
      cancelHref: '/create-a-case/case-details'
    })
  }

  return res.render('create-a-case/minor-creditors', {
    successMessage: consumeCreateACaseSuccessMessage(req),
    minorCreditorCards: getMinorCreditorCards(getCreateACaseData(req)),
    primaryActionText: getCreateACaseData(req)['alternative-pending-order-term']
      ? 'Add to order term'
      : 'Return to case details',
    primaryActionHref: getCreateACaseData(req)['alternative-pending-order-term']
      ? '/create-a-case/order-term-creditor'
      : '/create-a-case/case-details'
  })
})

router.post('/create-a-case/minor-creditors', (req, res, next) => {
  const creditors = getMinorCreditors(getCreateACaseData(req))
  creditors.push(buildMinorCreditor(req.body))
  getCreateACaseData(req)['minor-creditors'] = creditors

  return redirectWithSessionSave(req, res, next, '/create-a-case/minor-creditors')
})

router.get('/create-a-case/minor-creditors/new', (req, res) => {
  if (!hasCompletedOrderDetails(getCreateACaseData(req))) {
    return res.redirect('/create-a-case/case-details')
  }

  return res.render('create-a-case/minor-creditor-details', {
    creditor: {},
    countryItems: getCountrySelectItems(''),
    formAction: '/create-a-case/minor-creditors/new',
    cancelHref: '/create-a-case/minor-creditors'
  })
})

router.post('/create-a-case/minor-creditors/new', (req, res, next) => {
  const creditors = getMinorCreditors(getCreateACaseData(req))
  creditors.push(buildMinorCreditor(req.body))
  getCreateACaseData(req)['minor-creditors'] = creditors

  return redirectWithSessionSave(req, res, next, '/create-a-case/minor-creditors')
})

router.get('/create-a-case/minor-creditors/:index/edit', (req, res) => {
  if (!hasCompletedOrderDetails(getCreateACaseData(req))) {
    return res.redirect('/create-a-case/case-details')
  }

  const index = getMinorCreditorIndex(req.params.index, getCreateACaseData(req))

  if (index === null) {
    return res.redirect('/create-a-case/minor-creditors')
  }

  return res.render('create-a-case/minor-creditor-details', {
    creditor: getMinorCreditors(getCreateACaseData(req))[index],
    countryItems: getCountrySelectItems(getMinorCreditors(getCreateACaseData(req))[index].country || ''),
    formAction: `/create-a-case/minor-creditors/${index}/edit`,
    cancelHref: '/create-a-case/minor-creditors'
  })
})

router.post('/create-a-case/minor-creditors/:index/edit', (req, res, next) => {
  const index = getMinorCreditorIndex(req.params.index, getCreateACaseData(req))

  if (index === null) {
    return res.redirect('/create-a-case/minor-creditors')
  }

  const creditors = getMinorCreditors(getCreateACaseData(req))
  creditors[index] = buildMinorCreditor(req.body)
  getCreateACaseData(req)['minor-creditors'] = creditors

  return redirectWithSessionSave(req, res, next, '/create-a-case/minor-creditors')
})

router.get('/create-a-case/minor-creditors/:index/remove', (req, res) => {
  if (!hasCompletedOrderDetails(getCreateACaseData(req))) {
    return res.redirect('/create-a-case/case-details')
  }

  const index = getMinorCreditorIndex(req.params.index, getCreateACaseData(req))

  if (index === null) {
    return res.redirect('/create-a-case/minor-creditors')
  }

  const creditor = getMinorCreditors(getCreateACaseData(req))[index]

  return res.render('create-a-case/remove-minor-creditor', {
    minorCreditorCard: {
      title: getMinorCreditorName(creditor, index),
      rows: getMinorCreditorSummaryRows(creditor)
    },
    formAction: `/create-a-case/minor-creditors/${index}/remove`
  })
})

router.post('/create-a-case/minor-creditors/:index/remove', (req, res, next) => {
  const index = getMinorCreditorIndex(req.params.index, getCreateACaseData(req))

  if (index === null) {
    return res.redirect('/create-a-case/minor-creditors')
  }

  const creditors = getMinorCreditors(getCreateACaseData(req))
  creditors.splice(index, 1)
  getCreateACaseData(req)['minor-creditors'] = creditors
  setCreateACaseSuccessMessage(req, 'Minor creditor removed')

  return redirectWithSessionSave(
    req,
    res,
    next,
    creditors.length ? '/create-a-case/minor-creditors' : '/create-a-case/case-details'
  )
})

router.get('/create-a-case/terms-per-beneficiary', (req, res) => {
  if (!hasCompletedOrderDetails(getCreateACaseData(req))) {
    return res.redirect('/create-a-case/case-details')
  }

  if (!hasTermsPerBeneficiary(getCreateACaseData(req))) {
    return res.redirect('/create-a-case/terms-per-beneficiary/beneficiary')
  }

  return res.render('create-a-case/terms-review', {
    successMessage: consumeCreateACaseSuccessMessage(req),
    beneficiaryGroups: getTermsReviewGroups(getCreateACaseData(req))
  })
})

router.get('/create-a-case/terms-per-beneficiary/beneficiary', (req, res) => {
  if (!hasCompletedOrderDetails(getCreateACaseData(req))) {
    return res.redirect('/create-a-case/case-details')
  }

  const draft = getTermsBeneficiaryDraft(getCreateACaseData(req)) || {}

  return res.render('create-a-case/terms-beneficiary', {
    applicantBeneficiaryLabel: `${getApplicantFullName(getCreateACaseData(req))} (Applicant)`,
    childAge: getAgeFromDateString(draft.dateOfBirth),
    cancelHref: hasTermsPerBeneficiary(getCreateACaseData(req))
      ? '/create-a-case/terms-per-beneficiary'
      : '/create-a-case/case-details'
  })
})

router.post('/create-a-case/terms-per-beneficiary/beneficiary', (req, res, next) => {
  getCreateACaseData(req)['terms-beneficiary-draft'] = buildTermsBeneficiaryDraft(
    req.body,
    getCreateACaseData(req)
  )

  return redirectWithSessionSave(req, res, next, '/create-a-case/terms-per-beneficiary/order-terms')
})

router.get('/create-a-case/terms-per-beneficiary/order-terms', (req, res) => {
  if (!hasCompletedOrderDetails(getCreateACaseData(req))) {
    return res.redirect('/create-a-case/case-details')
  }

  const beneficiary = getTermsBeneficiaryDraft(getCreateACaseData(req))

  if (!beneficiary) {
    return res.redirect('/create-a-case/terms-per-beneficiary/beneficiary')
  }

  return res.render('create-a-case/terms-order-terms', {
    beneficiary,
    frequencyLabel: getFrequencyLabel(getCreateACaseData(req)['order-payment-frequency']),
    creditorItems: getTermsCreditorItems(
      getCreateACaseData(req),
      getCreateACaseData(req)['terms-creditor'] || 'applicant'
    )
  })
})

router.post('/create-a-case/terms-per-beneficiary/order-terms', (req, res, next) => {
  const entry = buildTermsEntry(req.body, getCreateACaseData(req))

  if (!entry) {
    return res.redirect('/create-a-case/terms-per-beneficiary/beneficiary')
  }

  const terms = getTermsPerBeneficiary(getCreateACaseData(req))
  terms.push(entry)
  getCreateACaseData(req)['terms-per-beneficiary'] = terms
  delete getCreateACaseData(req)['terms-beneficiary-draft']

  if (req.body.action === 'add-more-terms') {
    return redirectWithSessionSave(req, res, next, '/create-a-case/terms-per-beneficiary/beneficiary')
  }

  return redirectWithSessionSave(req, res, next, '/create-a-case/terms-per-beneficiary')
})

router.get('/create-a-case/terms-per-beneficiary/:index/remove', (req, res) => {
  if (!hasCompletedOrderDetails(getCreateACaseData(req))) {
    return res.redirect('/create-a-case/case-details')
  }

  const index = getTermsIndex(req.params.index, getCreateACaseData(req))

  if (index === null) {
    return res.redirect('/create-a-case/terms-per-beneficiary')
  }

  const term = getTermsPerBeneficiary(getCreateACaseData(req))[index]

  return res.render('create-a-case/remove-terms-per-beneficiary', {
    beneficiaryGroup: {
      name: term.beneficiaryName,
      role: term.beneficiaryRole,
      tag: term.beneficiaryTag,
      rows: [getTermsReviewRow(term)]
    },
    formAction: `/create-a-case/terms-per-beneficiary/${index}/remove`
  })
})

router.post('/create-a-case/terms-per-beneficiary/:index/remove', (req, res, next) => {
  const index = getTermsIndex(req.params.index, getCreateACaseData(req))

  if (index === null) {
    return res.redirect('/create-a-case/terms-per-beneficiary')
  }

  const terms = getTermsPerBeneficiary(getCreateACaseData(req))
  terms.splice(index, 1)
  getCreateACaseData(req)['terms-per-beneficiary'] = terms
  setCreateACaseSuccessMessage(req, 'Order terms removed')

  return redirectWithSessionSave(
    req,
    res,
    next,
    terms.length ? '/create-a-case/terms-per-beneficiary' : '/create-a-case/case-details'
  )
})

router.get('/create-a-case/lump-sum-payment', (req, res) => {
  if (!hasCompletedOrderDetails(getCreateACaseData(req))) {
    return res.redirect('/create-a-case/case-details')
  }

  return res.render('create-a-case/lump-sum-payment', {
    creditorItems: getTermsCreditorItems(
      getCreateACaseData(req),
      getCreateACaseData(req)['lump-sum-creditor'] || 'applicant'
    )
  })
})

router.post('/create-a-case/lump-sum-payment', (req, res, next) => {
  getCreateACaseData(req)['lump-sum-payment-completed'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/create-a-case/case-details')
})

router.get('/create-a-case/interest-and-indexation', (req, res) => {
  if (!hasCompletedOrderDetails(getCreateACaseData(req))) {
    return res.redirect('/create-a-case/case-details')
  }

  return res.render('create-a-case/interest-and-indexation')
})

router.post('/create-a-case/interest-and-indexation', (req, res, next) => {
  getCreateACaseData(req)['interest-and-indexation-completed'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/create-a-case/case-details')
})

router.get('/create-a-case/managing-payments', (req, res) => {
  if (!hasCompletedOrderDetails(getCreateACaseData(req))) {
    return res.redirect('/create-a-case/case-details')
  }

  return res.render('create-a-case/managing-payments')
})

router.post('/create-a-case/managing-payments', (req, res, next) => {
  const alternativeData = getCreateACaseData(req)

  alternativeData['managing-payments-completed'] = hasValidManagingPaymentsSelection(alternativeData)
    ? 'yes'
    : ''

  return redirectWithSessionSave(req, res, next, '/create-a-case/case-details')
})

router.get('/create-a-case/cancel', (req, res, next) => {
  delete getCreateACaseData(req)['case-type']
  delete getCreateACaseData(req)['applicant-type']
  delete getCreateACaseData(req)['has-order']
  delete getCreateACaseData(req)['applicant-details-completed']
  delete getCreateACaseData(req)['respondent-details-completed']
  delete getCreateACaseData(req)['central-authority-details-completed']
  delete getCreateACaseData(req)['central-authority-remo-reference']
  delete getCreateACaseData(req)['central-authority-reference']
  delete getCreateACaseData(req)['central-authority-name']
  delete getCreateACaseData(req)['central-authority-manual-name']
  delete getCreateACaseData(req)['central-authority-main-email-address']
  delete getCreateACaseData(req)['central-authority-other-email-address']
  delete getCreateACaseData(req)['central-authority-main-telephone-number']
  delete getCreateACaseData(req)['central-authority-other-telephone-number']
  delete getCreateACaseData(req)['central-authority-address-line-1']
  delete getCreateACaseData(req)['central-authority-address-line-2']
  delete getCreateACaseData(req)['central-authority-address-line-3']
  delete getCreateACaseData(req)['central-authority-address-line-4']
  delete getCreateACaseData(req)['central-authority-address-line-5']
  delete getCreateACaseData(req)['central-authority-postal-or-zip-code']
  delete getCreateACaseData(req)['central-authority-country']
  delete getCreateACaseData(req)['central-authority-bank-account-type']
  delete getCreateACaseData(req)['central-authority-bank-name-on-account']
  delete getCreateACaseData(req)['central-authority-bank-sort-code']
  delete getCreateACaseData(req)['central-authority-bank-account-number']
  delete getCreateACaseData(req)['central-authority-bank-payment-reference']
  delete getCreateACaseData(req)['central-authority-bank-non-uk-name-on-account']
  delete getCreateACaseData(req)['central-authority-bank-bic-or-swift-code']
  delete getCreateACaseData(req)['central-authority-bank-iban']
  delete getCreateACaseData(req)['central-authority-bank-non-uk-payment-reference']
  delete getCreateACaseData(req)['central-authority-bank-name']
  delete getCreateACaseData(req)['central-authority-bank-branch-office-or-sort-code']
  delete getCreateACaseData(req)['central-authority-bank-non-uk-account-number']
  delete getCreateACaseData(req)['order-details-completed']
  delete getCreateACaseData(req)['order-has-periodical-payments']
  delete getCreateACaseData(req)['order-has-lump-sum']
  delete getCreateACaseData(req)['order-payment-frequency']
  delete getCreateACaseData(req)['order-application-code']
  delete getCreateACaseData(req)['order-court-that-made-the-order']
  delete getCreateACaseData(req)['order-date-order-made']
  delete getCreateACaseData(req)['order-date-arrears-last-updated']
  delete getCreateACaseData(req)['order-managing-payments']
  delete getCreateACaseData(req)['entered-order-terms']
  delete getCreateACaseData(req)['alternative-order-term-code']
  delete getCreateACaseData(req)['alternative-current-order-term-responses']
  delete getCreateACaseData(req)['alternative-edit-order-term-index']
  delete getCreateACaseData(req)['alternative-order-term-errors']
  delete getCreateACaseData(req)['alternative-creditor-order-term-index']
  delete getCreateACaseData(req)['alternative-pending-order-term']
  delete getCreateACaseData(req)['minor-creditors']
  delete getCreateACaseData(req)['terms-per-beneficiary']
  delete getCreateACaseData(req)['terms-beneficiary-draft']
  delete getCreateACaseData(req)['lump-sum-payment-completed']
  delete getCreateACaseData(req)['lump-sum-amount']
  delete getCreateACaseData(req)['lump-sum-enter-pay-by-date']
  delete getCreateACaseData(req)['lump-sum-reason-for-payment']
  delete getCreateACaseData(req)['lump-sum-creditor']
  delete getCreateACaseData(req)['interest-and-indexation-completed']
  delete getCreateACaseData(req)['interest-applies']
  delete getCreateACaseData(req)['indexation-type']
  delete getCreateACaseData(req)['managing-payments-completed']
  delete getCreateACaseData(req)['case-comment']
  delete getCreateACaseData(req)['case-notes']
  delete getCreateACaseData(req)['application-details-completed']
  delete getCreateACaseData(req)['application-code']
  delete getCreateACaseData(req)['application-foreign-court']
  delete getCreateACaseData(req)['application-order-date']
  delete getCreateACaseData(req)['hearing-details-completed']
  delete getCreateACaseData(req)['hearing-type']
  delete getCreateACaseData(req)['hearing-court']
  delete getCreateACaseData(req)['hearing-date']
  delete getCreateACaseData(req)['hearing-courtroom-number']
  delete getCreateACaseData(req)['hearing-start-time']
  delete getCreateACaseData(req)['hearing-non-scheduled-details']

  return redirectWithSessionSave(req, res, next, '/create-cases')
})

router.get('/create-a-case/cancel-case-creation', (req, res) => {
  if (!getCreateACaseData(req)['case-type']) {
    return res.redirect('/create-a-case')
  }

  return res.render('create-a-case/cancel-case-creation')
})

router.post('/create-a-case/cancel-case-creation', (req, res, next) => {
  if (req.body['cancel-case-creation'] === 'yes') {
    return res.redirect('/create-a-case/cancel')
  }

  return redirectWithSessionSave(req, res, next, '/create-a-case/case-details')
})


router.get('/resulting', (req, res) => {
  return res.render('resulting/index')
})

router.get('/review-results', (req, res) => {
  const inReviewRows = [
    {
      id: 0,
      applicant: 'HORVATH, Katarina',
      respondent: 'NOVOTNY, Matej',
      hearingDate: '21 March 2026',
      created: 'Today'
    },
    {
      id: 1,
      applicant: 'POPA, Alina',
      respondent: 'POPA, Andrei',
      hearingDate: '20 March 2026',
      created: '1 day ago'
    },
    {
      id: 2,
      applicant: 'KOWALSKI, Ewa',
      respondent: 'KOWALSKI, Marek',
      hearingDate: '18 March 2026',
      created: '2 days ago'
    }
  ]

  return res.render('review-results/index', {
    inReviewRows,
    inReviewTableRows: inReviewRows.map((row) => [
      {
        text: row.applicant
      },
      {
        html: `<a class="govuk-link" href="/review-results/${row.id}">${escapeHtml(row.respondent)}</a>`
      },
      {
        text: row.hearingDate
      },
      {
        text: row.created
      }
    ])
  })
})

router.get('/review-results/:index', (req, res) => {
  const index = Number(req.params.index)
  const reviewEntries = [
    {
      respondentName: 'Mr Matej NOVOTNY',
      caseTypeLabel: 'REMO Out',
      hearingDetailsText: '21 March 2026, 10:30am, Bury St Edmunds Magistrates Court, Courtroom 2',
      reviewHistory: [
        {
          action: 'Rejected',
          by: 'Diana Prince',
          at: '24 March 2026 at 11:10am',
          note: 'Spelling mistake in respondent first name'
        },
        {
          action: 'Resubmitted',
          by: 'Joe Bloggs',
          at: '24 March 2026 at 11:34am',
          note: 'Respondent first name corrected and resubmitted for review.'
        },
        {
          action: 'Submitted',
          by: 'Joe Bloggs',
          at: '24 March 2026 at 10:32am'
        }
      ],
      applicantRows: [
        {
          key: { text: 'Title' },
          value: { text: 'Ms' }
        },
        {
          key: { text: 'First names' },
          value: { text: 'Katarina' }
        },
        {
          key: { text: 'Last name' },
          value: { text: 'Horvath' }
        },
        {
          key: { text: 'Address' },
          value: { html: '24 High Street<br>Twyford<br>Berkshire<br>RG10 9RT' }
        }
      ],
      respondentRows: [
        {
          key: { text: 'Title' },
          value: { text: 'Mr' }
        },
        {
          key: { text: 'First names' },
          value: { text: 'Matej' }
        },
        {
          key: { text: 'Last name' },
          value: { text: 'Novotny' }
        },
        {
          key: { text: 'Date of birth' },
          value: { text: '1 January 1990' }
        }
      ],
      centralAuthorityRows: [
        {
          key: { text: 'Country' },
          value: { text: 'Poland' }
        },
        {
          key: { text: 'Authority' },
          value: { text: 'Warsaw Central Authority' }
        }
      ],
      resultsRows: [
        {
          key: { text: 'INT001 - Interim maintenance' },
          value: { html: '<strong>INTERIM</strong><br>Interim maintenance of £150 per month ordered.' }
        },
        {
          key: { text: 'ANC004 - Service direction' },
          value: { html: '<strong>ANCILLARY</strong><br>Serve translated documents on the respondent.' }
        }
      ],
      caseCommentsRows: [
        {
          key: { text: 'Comment' },
          value: { text: 'Respondent requested additional time to provide evidence.' }
        },
        {
          key: { text: 'Account note' },
          value: { text: 'Interpreter may be required at the next hearing.' }
        }
      ],
      sessionRows: [
        {
          key: { text: 'Judge' },
          value: { text: 'HHJ Williams' }
        },
        {
          key: { text: 'Magistrate 1' },
          value: { text: '-' }
        },
        {
          key: { text: 'Magistrate 2' },
          value: { text: '-' }
        },
        {
          key: { text: 'Magistrate 3' },
          value: { text: '-' }
        },
        {
          key: { text: 'Legal advisor' },
          value: { text: 'A Patel' }
        },
        {
          key: { text: 'Session start time' },
          value: { text: '10:30am' }
        },
        {
          key: { text: 'Session end time' },
          value: { text: '11:15am' }
        }
      ]
    },
    {
      respondentName: 'Mr Andrei POPA',
      caseTypeLabel: 'REMO Out',
      hearingDetailsText: '20 March 2026, 2:00pm, Bury St Edmunds Magistrates Court, Courtroom 1',
      reviewHistory: [
        {
          action: 'Submitted',
          by: 'Joe Bloggs',
          at: '23 March 2026 at 4:45pm'
        }
      ],
      applicantRows: [
        { key: { text: 'Title' }, value: { text: 'Ms' } },
        { key: { text: 'First names' }, value: { text: 'Alina' } },
        { key: { text: 'Last name' }, value: { text: 'Popa' } },
        { key: { text: 'Address' }, value: { html: '99 High Street<br>Twyford<br>Berkshire<br>RG10 9RT' } }
      ],
      respondentRows: [
        { key: { text: 'Title' }, value: { text: 'Mr' } },
        { key: { text: 'First names' }, value: { text: 'Andrei' } },
        { key: { text: 'Last name' }, value: { text: 'Popa' } },
        { key: { text: 'Date of birth' }, value: { text: '4 December 1983' } }
      ],
      centralAuthorityRows: [
        { key: { text: 'Country' }, value: { text: 'Canada' } },
        { key: { text: 'Authority' }, value: { text: 'Ontario Central Authority' } }
      ],
      resultsRows: [
        {
          key: { text: 'FIN002 - Final maintenance' },
          value: { html: '<strong>FINAL</strong><br>Final maintenance of £220 per month ordered.' }
        }
      ],
      caseCommentsRows: [
        { key: { text: 'Comment' }, value: { text: 'No further directions.' } },
        { key: { text: 'Account note' }, value: { text: '-' } }
      ],
      sessionRows: [
        { key: { text: 'Judge' }, value: { text: 'DJ Green' } },
        { key: { text: 'Magistrate 1' }, value: { text: '-' } },
        { key: { text: 'Magistrate 2' }, value: { text: '-' } },
        { key: { text: 'Magistrate 3' }, value: { text: '-' } },
        { key: { text: 'Legal advisor' }, value: { text: 'L Morris' } },
        { key: { text: 'Session start time' }, value: { text: '2:00pm' } },
        { key: { text: 'Session end time' }, value: { text: '2:40pm' } }
      ]
    },
    {
      respondentName: 'Mr Marek KOWALSKI',
      caseTypeLabel: 'REMO Out',
      hearingDetailsText: '18 March 2026, 9:45am, Bury St Edmunds Magistrates Court, Courtroom 3',
      reviewHistory: [
        {
          action: 'Submitted',
          by: 'Joe Bloggs',
          at: '22 March 2026 at 9:05am'
        }
      ],
      applicantRows: [
        { key: { text: 'Title' }, value: { text: 'Ms' } },
        { key: { text: 'First names' }, value: { text: 'Ewa' } },
        { key: { text: 'Last name' }, value: { text: 'Kowalski' } },
        { key: { text: 'Address' }, value: { html: '101 King Street<br>Reading<br>Berkshire<br>RG1 2AB' } }
      ],
      respondentRows: [
        { key: { text: 'Title' }, value: { text: 'Mr' } },
        { key: { text: 'First names' }, value: { text: 'Marek' } },
        { key: { text: 'Last name' }, value: { text: 'Kowalski' } },
        { key: { text: 'Date of birth' }, value: { text: '22 September 1995' } }
      ],
      centralAuthorityRows: [
        { key: { text: 'Country' }, value: { text: 'Poland' } },
        { key: { text: 'Authority' }, value: { text: 'Gdansk Central Authority' } }
      ],
      resultsRows: [
        {
          key: { text: 'ANC002 - Adjournment direction' },
          value: { html: '<strong>ANCILLARY</strong><br>Matter adjourned for service confirmation.' }
        }
      ],
      caseCommentsRows: [
        { key: { text: 'Comment' }, value: { text: 'Awaiting updated financial statement.' } },
        { key: { text: 'Account note' }, value: { text: '-' } }
      ],
      sessionRows: [
        { key: { text: 'Judge' }, value: { text: 'HHJ Carter' } },
        { key: { text: 'Magistrate 1' }, value: { text: '-' } },
        { key: { text: 'Magistrate 2' }, value: { text: '-' } },
        { key: { text: 'Magistrate 3' }, value: { text: '-' } },
        { key: { text: 'Legal advisor' }, value: { text: 'J Brown' } },
        { key: { text: 'Session start time' }, value: { text: '9:45am' } },
        { key: { text: 'Session end time' }, value: { text: '10:20am' } }
      ]
    }
  ]

  const reviewEntry = reviewEntries[index]

  if (!reviewEntry) {
    return res.redirect('/review-results')
  }

  return res.render('review-results/detail', reviewEntry)
})

router.get('/check-results', (req, res) => {
  const toReviewRows = [
    {
      id: 0,
      applicant: 'HORVATH, Katarina',
      respondent: 'NOVOTNY, Matej',
      hearingDate: '21 March 2026',
      created: 'Today',
      submittedBy: 'joe.bloggs'
    },
    {
      id: 1,
      applicant: 'POPA, Alina',
      respondent: 'POPA, Andrei',
      hearingDate: '20 March 2026',
      created: '1 day ago',
      submittedBy: 'joe.bloggs'
    },
    {
      id: 2,
      applicant: 'KOWALSKI, Ewa',
      respondent: 'KOWALSKI, Marek',
      hearingDate: '18 March 2026',
      created: '2 days ago',
      submittedBy: 'emma.davis'
    }
  ]

  return res.render('check-results/index', {
    toReviewTableRows: toReviewRows.map((row) => [
      {
        html: `<a class="govuk-link" href="/check-results/${row.id}">${escapeHtml(row.respondent)}</a>`
      },
      {
        text: row.applicant
      },
      {
        text: row.hearingDate
      },
      {
        text: row.created
      },
      {
        text: row.submittedBy
      }
    ])
  })
})

router.get('/check-results/:index', (req, res) => {
  const index = Number(req.params.index)
  const checkEntries = [
    {
      respondentName: 'Mr Matej NOVOTNY',
      caseTypeLabel: 'REMO Out',
      hearingDetailsText: '21 March 2026, 10:30am, Bury St Edmunds Magistrates Court, Courtroom 2',
      submittedBy: 'joe.bloggs',
      reviewHistory: [
        {
          action: 'Rejected',
          by: 'Diana Prince',
          at: '24 March 2026 at 11:10am',
          note: 'Spelling mistake in respondent first name'
        },
        {
          action: 'Resubmitted',
          by: 'Joe Bloggs',
          at: '24 March 2026 at 11:34am',
          note: 'Respondent first name corrected and resubmitted for review.'
        },
        {
          action: 'Submitted',
          by: 'Joe Bloggs',
          at: '24 March 2026 at 10:32am'
        }
      ],
      applicantRows: [
        { key: { text: 'Title' }, value: { text: 'Ms' } },
        { key: { text: 'First names' }, value: { text: 'Katarina' } },
        { key: { text: 'Last name' }, value: { text: 'Horvath' } },
        { key: { text: 'Address' }, value: { html: '24 High Street<br>Twyford<br>Berkshire<br>RG10 9RT' } }
      ],
      respondentRows: [
        { key: { text: 'Title' }, value: { text: 'Mr' } },
        { key: { text: 'First names' }, value: { text: 'Matej' } },
        { key: { text: 'Last name' }, value: { text: 'Popa' } },
        { key: { text: 'Date of birth' }, value: { text: '1 January 1990' } }
      ],
      centralAuthorityRows: [
        { key: { text: 'Country' }, value: { text: 'Poland' } },
        { key: { text: 'Authority' }, value: { text: 'Warsaw Central Authority' } }
      ],
      resultsRows: [
        {
          key: { text: 'INT001 - Interim maintenance' },
          value: { html: '<strong>INTERIM</strong><br>Interim maintenance of £150 per month ordered.' }
        },
        {
          key: { text: 'ANC004 - Service direction' },
          value: { html: '<strong>ANCILLARY</strong><br>Serve translated documents on the respondent.' }
        }
      ],
      caseCommentsRows: [
        { key: { text: 'Comment' }, value: { text: 'Respondent requested additional time to provide evidence.' } },
        { key: { text: 'Account note' }, value: { text: 'Interpreter may be required at the next hearing.' } }
      ],
      sessionRows: [
        { key: { text: 'Judge' }, value: { text: 'HHJ Williams' } },
        { key: { text: 'Magistrate 1' }, value: { text: '-' } },
        { key: { text: 'Magistrate 2' }, value: { text: '-' } },
        { key: { text: 'Magistrate 3' }, value: { text: '-' } },
        { key: { text: 'Legal advisor' }, value: { text: 'A Patel' } },
        { key: { text: 'Session start time' }, value: { text: '10:30am' } },
        { key: { text: 'Session end time' }, value: { text: '11:15am' } }
      ]
    },
    {
      respondentName: 'Mr Andrei POPA',
      caseTypeLabel: 'REMO Out',
      hearingDetailsText: '20 March 2026, 2:00pm, Bury St Edmunds Magistrates Court, Courtroom 1',
      submittedBy: 'joe.bloggs',
      reviewHistory: [
        {
          action: 'Submitted',
          by: 'Joe Bloggs',
          at: '23 March 2026 at 4:45pm'
        }
      ],
      applicantRows: [
        { key: { text: 'Title' }, value: { text: 'Ms' } },
        { key: { text: 'First names' }, value: { text: 'Alina' } },
        { key: { text: 'Last name' }, value: { text: 'Popa' } },
        { key: { text: 'Address' }, value: { html: '99 High Street<br>Twyford<br>Berkshire<br>RG10 9RT' } }
      ],
      respondentRows: [
        { key: { text: 'Title' }, value: { text: 'Mr' } },
        { key: { text: 'First names' }, value: { text: 'Andrei' } },
        { key: { text: 'Last name' }, value: { text: 'Kowalski' } },
        { key: { text: 'Date of birth' }, value: { text: '4 December 1983' } }
      ],
      centralAuthorityRows: [
        { key: { text: 'Country' }, value: { text: 'Canada' } },
        { key: { text: 'Authority' }, value: { text: 'Ontario Central Authority' } }
      ],
      resultsRows: [
        {
          key: { text: 'FIN002 - Final maintenance' },
          value: { html: '<strong>FINAL</strong><br>Final maintenance of £220 per month ordered.' }
        }
      ],
      caseCommentsRows: [
        { key: { text: 'Comment' }, value: { text: 'No further directions.' } },
        { key: { text: 'Account note' }, value: { text: '-' } }
      ],
      sessionRows: [
        { key: { text: 'Judge' }, value: { text: 'DJ Green' } },
        { key: { text: 'Magistrate 1' }, value: { text: '-' } },
        { key: { text: 'Magistrate 2' }, value: { text: '-' } },
        { key: { text: 'Magistrate 3' }, value: { text: '-' } },
        { key: { text: 'Legal advisor' }, value: { text: 'L Morris' } },
        { key: { text: 'Session start time' }, value: { text: '2:00pm' } },
        { key: { text: 'Session end time' }, value: { text: '2:40pm' } }
      ]
    },
    {
      respondentName: 'Mr Marek KOWALSKI',
      caseTypeLabel: 'REMO Out',
      hearingDetailsText: '18 March 2026, 9:45am, Bury St Edmunds Magistrates Court, Courtroom 3',
      submittedBy: 'emma.davis',
      reviewHistory: [
        {
          action: 'Submitted',
          by: 'Emma Davis',
          at: '22 March 2026 at 9:05am'
        }
      ],
      applicantRows: [
        { key: { text: 'Title' }, value: { text: 'Ms' } },
        { key: { text: 'First names' }, value: { text: 'Ewa' } },
        { key: { text: 'Last name' }, value: { text: 'Kowalski' } },
        { key: { text: 'Address' }, value: { html: '101 King Street<br>Reading<br>Berkshire<br>RG1 2AB' } }
      ],
      respondentRows: [
        { key: { text: 'Title' }, value: { text: 'Mr' } },
        { key: { text: 'First names' }, value: { text: 'Marek' } },
        { key: { text: 'Last name' }, value: { text: 'Novotny' } },
        { key: { text: 'Date of birth' }, value: { text: '22 September 1995' } }
      ],
      centralAuthorityRows: [
        { key: { text: 'Country' }, value: { text: 'Poland' } },
        { key: { text: 'Authority' }, value: { text: 'Gdansk Central Authority' } }
      ],
      resultsRows: [
        {
          key: { text: 'ANC002 - Adjournment direction' },
          value: { html: '<strong>ANCILLARY</strong><br>Matter adjourned for service confirmation.' }
        }
      ],
      caseCommentsRows: [
        { key: { text: 'Comment' }, value: { text: 'Awaiting updated financial statement.' } },
        { key: { text: 'Account note' }, value: { text: '-' } }
      ],
      sessionRows: [
        { key: { text: 'Judge' }, value: { text: 'HHJ Carter' } },
        { key: { text: 'Magistrate 1' }, value: { text: '-' } },
        { key: { text: 'Magistrate 2' }, value: { text: '-' } },
        { key: { text: 'Magistrate 3' }, value: { text: '-' } },
        { key: { text: 'Legal advisor' }, value: { text: 'J Brown' } },
        { key: { text: 'Session start time' }, value: { text: '9:45am' } },
        { key: { text: 'Session end time' }, value: { text: '10:20am' } }
      ]
    }
  ]

  const checkEntry = checkEntries[index]

  if (!checkEntry) {
    return res.redirect('/check-results')
  }

  return res.render('check-results/detail', checkEntry)
})

function getCreateCasesBaseRows() {
  return [
    { id: 2, status: 'in-review', applicant: 'KOWALSKI, Ewa', respondent: 'KOWALSKI, Marek', caseType: 'REMO Out (CMS)', submittedBy: 'emily.davis', created: '1 day ago', createdSort: -1 },
    { id: 0, status: 'in-review', applicant: 'NOWAK, Anna', respondent: 'NOWAK, Piotr', caseType: 'REMO In', submittedBy: 'david.watts', created: 'Today', createdSort: 0 },
    { id: 1, status: 'in-review', applicant: 'HORVATH, Katarina', respondent: 'NOVOTNY, Matej', caseType: 'REMO Out', submittedBy: 'joe.bloggs', created: 'Today', createdSort: 0 },
    { id: 4, status: 'rejected', applicant: 'PETROVA, Irina', respondent: 'DIMITROV, Nikolai', caseType: 'REMO Out', submittedBy: 'joe.bloggs', created: '3 days ago', createdSort: -3, rejected: '1 day ago', rejectedSort: -1 },
    { id: 3, status: 'rejected', applicant: 'KOVACS, Eszter', respondent: 'BALOGH, Janos', caseType: 'REMO In', submittedBy: 'emily.davis', created: '2 days ago', createdSort: -2, rejected: '2 days ago', rejectedSort: -2 },
    { id: 6, status: 'approved', applicant: 'YILMAZ, Elif', respondent: 'DEMIR, Cem', caseType: 'REMO Out', submittedBy: 'emily.davis', created: '4 days ago', createdSort: -4, approved: '1 day ago', approvedSort: -1, respondentAccountLabel: `${accountRef(6, 'RP')} – DEMIR, Cem`, respondentAccountHref: '/active-case/6', applicantAccount: { href: '/active-case/creditor/61', label: `${accountRef(61, 'AP')} – YILMAZ, Elif` }, minorCreditorAccounts: [{ href: '/active-case/creditor/63', label: `${accountRef(63, 'MC')} – DEMIR, Leyla` }] },
    { id: 5, status: 'approved', applicant: 'POPA, Alina', respondent: 'POPA, Andrei', caseType: 'REMO In', submittedBy: 'david.watts', created: '5 days ago', createdSort: -5, approved: '2 days ago', approvedSort: -2, respondentAccountLabel: `${accountRef(5, 'RP')} – POPA, Andrei`, respondentAccountHref: '/active-case/5', applicantAccount: { href: '/active-case/creditor/51', label: `${accountRef(51, 'AP')} – POPA, Alina` }, minorCreditorAccounts: [{ href: '/active-case/creditor/52', label: `${accountRef(52, 'MC')} – POPA, Mira` }] },
    { id: 7, status: 'deleted', applicant: 'RUSU, Mihai', respondent: 'RUSU, Ioana', caseType: 'REMO In', submittedBy: 'joe.bloggs', created: '7 days ago', createdSort: -7, deleted: 'Today', deletedSort: 0 }
  ]
}

function getCreateCasesRows(req) {
  return [
    ...getSessionReviewCases(req).map(getSessionReviewCaseRow),
    ...applyReviewDecisions(getCreateCasesBaseRows(), getCaseReviewDecisions(req))
  ]
}

router.get('/create-cases', (req, res) => {
  const tab = req.query.tab || 'in-review'
  const allRows = [
    ...getCreateCasesRows(req)
  ]
  const inReviewRows = allRows.filter((row) => row.status === 'in-review')
  const rejectedRows = allRows.filter((row) => row.status === 'rejected')
  const approvedRows = allRows.filter((row) => row.status === 'approved')
  const deletedRows = allRows.filter((row) => row.status === 'deleted')

  const mapDeletedRows = (rows) => rows.map((row) => [
    { html: `<a class="govuk-link" href="${row.href || `/create-cases/${row.id}`}">${escapeHtml(row.respondent)}</a>`, text: row.respondent },
    { text: row.applicant },
    { text: row.caseType },
    { text: row.created, sortValue: row.createdSort },
    { text: row.deleted, sortValue: row.deletedSort }
  ])

  const mapApprovedRows = (rows) => rows.map((row) => {
    const buildAccountHtml = (account) => {
      const label = account.label || ''
      const parts = label.split(/\s+[–-]\s+/)
      const accountNumber = parts[0] || label
      const partyName = parts.slice(1).join(' - ')

      return `<a class="govuk-link" href="${account.href}" target="_blank" rel="noreferrer">${escapeHtml(accountNumber)}</a>${partyName ? `<br>${escapeHtml(partyName)}` : ''}`
    }
    const respondentAccountLabel = row.respondentAccountLabel || row.respondent
    const applicantHtml = row.applicantAccount
      ? buildAccountHtml(row.applicantAccount)
      : row.applicant ? escapeHtml(row.applicant) : '–'
    const minorCreditorHtml = (row.minorCreditorAccounts || [])
      .map(buildAccountHtml)
      .join('<br>')
    return [
      {
        html: buildAccountHtml({
          href: row.respondentAccountHref || row.activeHref || row.href || `/create-cases/${row.id}`,
          label: respondentAccountLabel
        }),
        text: respondentAccountLabel.replace(/\s+[–-]\s+/, ' ')
      },
      { html: applicantHtml },
      { html: minorCreditorHtml || '–' },
      { text: row.caseType },
      { text: row.approved, sortValue: row.approvedSort }
    ]
  })

  const mapInReviewRows = (rows) => rows.map((row) => [
    { html: `<a class="govuk-link" href="${row.href || `/create-cases/${row.id}`}">${escapeHtml(row.respondent)}</a>`, text: row.respondent },
    { text: row.applicant },
    { text: row.caseType },
    { text: row.created, sortValue: row.createdSort }
  ])

  const mapRejectedRows = (rows) => rows.map((row) => [
    { html: `<a class="govuk-link" href="${row.href || `/create-cases/${row.id}`}">${escapeHtml(row.respondent)}</a>`, text: row.respondent },
    { text: row.applicant },
    { text: row.caseType },
    { text: row.created, sortValue: row.createdSort },
    { text: row.rejected, sortValue: row.rejectedSort }
  ])

  const mapRows = (rows) => rows.map((row) => [
    { html: `<a class="govuk-link" href="/create-cases/${row.id}">${escapeHtml(row.respondent)}</a>` },
    { text: row.applicant },
    { text: row.hearingDate },
    { text: row.created },
    { text: row.submittedBy }
  ])

  const tabs = {
    'in-review': { label: 'In review', rows: mapInReviewRows(inReviewRows) },
    'rejected': { label: 'Rejected', rows: mapRejectedRows(rejectedRows.sort((a, b) => (a.rejectedSort ?? 0) - (b.rejectedSort ?? 0))) },
    'approved': { label: 'Approved', rows: mapApprovedRows(approvedRows.filter(row => row.approvedSort >= -7)) },
    'deleted': { label: 'Deleted', rows: mapDeletedRows(deletedRows.filter(row => row.deletedSort >= -7)) }
  }

  const activeTabData = tabs[tab] || tabs['in-review']

  return res.render('create-and-validate-draft-orders/index', {
    activeTab: tab,
    tabLabel: activeTabData.label,
    rejectedCount: rejectedRows.length,
    tableRows: activeTabData.rows
  })
})

router.get('/create-cases/all-rejected', (req, res) => {
  const successMessage = req.session.data[allRejectedCasesSuccessMessageKey]
  delete req.session.data[allRejectedCasesSuccessMessageKey]

  const rejectedRows = getCreateCasesRows(req)
    .filter((row) => row.status === 'rejected')
    .sort((a, b) => (a.rejectedSort ?? 0) - (b.rejectedSort ?? 0))

  const tableRows = rejectedRows.map((row) => [
    { html: `<a class="govuk-link" href="${row.href || `/create-cases/${row.id}`}?allRejected=true">${escapeHtml(row.respondent)}</a>`, text: row.respondent },
    { text: row.applicant },
    { text: row.caseType },
    { text: row.submittedBy },
    { text: row.created, sortValue: row.createdSort },
    { text: row.rejected, sortValue: row.rejectedSort }
  ])

  return res.render('create-and-validate-draft-orders/all-rejected', {
    successMessage,
    tableRows
  })
})

router.get('/create-cases/:index', (req, res) => {
  const requestedId = req.params.index
  const sessionCase = getSessionReviewCaseById(req, requestedId)
  const fromAllRejected = req.query.allRejected === 'true'

  if (sessionCase) {
    const draftOrderEntry = getSessionDraftOrderEntry(sessionCase)
    const isChecker = req.query.checker === 'true'
    const showRejectedInputterTaskList = !isChecker && draftOrderEntry.status === 'rejected'

    return res.render('create-and-validate-draft-orders/detail', {
      ...draftOrderEntry,
      ...getCheckCaseDetailsViewData(draftOrderEntry.caseData),
      ...getRejectedInputterViewData(draftOrderEntry.caseData, requestedId),
      caseId: requestedId,
      statusTag: getReviewStatusTag(draftOrderEntry.status, isChecker),
      reviewTimelineItems: getReviewHistoryTimelineItems(draftOrderEntry.reviewHistory),
      isChecker,
      showReviewDecisionForm: isChecker && draftOrderEntry.status === 'in-review',
      showRejectedInputterTaskList,
      returnToAllRejected: fromAllRejected && showRejectedInputterTaskList,
      backHref: fromAllRejected && showRejectedInputterTaskList
        ? '/create-cases/all-rejected'
        : showRejectedInputterTaskList ? '/create-cases?tab=rejected' : '/create-cases',
      timelineHeading: showRejectedInputterTaskList ? 'Activity' : 'Review history'
    })
  }

  const index = Number(requestedId)
  const draftOrderEntries = [
    {
      respondentName: 'Mr Piotr NOWAK',
      caseTypeLabel: 'REMO In',
      applicantTypeLabel: 'Individual',
      submittedBy: 'david.watts',
      caseData: {
        'case-type': 'remo-in',
        'applicant-type': 'individual',
        'has-order': 'yes',
        'applicant-title': 'Mrs',
        'applicant-first-names': 'Anna',
        'applicant-last-name': 'Nowak',
        'applicant-date-of-birth': '08/06/1982',
        'applicant-main-email-address': 'anna.nowak@example.test',
        'applicant-main-telephone-number': '+48221234567',
        'applicant-address-line-1': 'Zlota 59',
        'applicant-address-line-2': '00-120',
        'applicant-address-line-3': 'Warszawa',
        'applicant-country': 'poland',
        'respondent-title': 'Mr',
        'respondent-first-names': 'Piotr',
        'respondent-last-name': 'Nowak',
        'respondent-date-of-birth': '19/11/1982',
        'respondent-national-insurance-number': 'QA123456E',
        'respondent-main-email-address': 'piotr.nowak@example.test',
        'respondent-main-telephone-number': '+447700900221',
        'respondent-address-line-1': 'Flat 1B',
        'respondent-address-line-2': '24 High Street',
        'respondent-address-line-3': 'Twyford',
        'respondent-address-line-4': 'Berkshire',
        'respondent-postal-or-zip-code': 'RG10 9JB',
        'respondent-country': 'united-kingdom',
        'central-authority-remo-reference': 'PL-REM-2026-117',
        'central-authority-reference': 'GCA-2026-117',
        'central-authority-name': 'Polish Central Authority',
        'order-application-code': 'PL-REM-2026-117',
        'order-court-that-made-the-order': 'Warsaw Regional Court',
        'order-date-order-made': '12/01/2026',
        'order-date-arrears-last-updated': '01/04/2026',
        'entered-order-terms': [
          {
            code: 'MAT',
            title: 'Matrimonial Order for Adult',
            category: 'FINAL',
            categoryLabel: 'Final',
            responses: {
              'result-mat-amount': '400',
              'result-mat-frequency': 'monthly',
              'result-mat-expiry': '12/01/2027',
              'result-mat-arrears': '400',
              'result-mat-creditor': 'Anna Nowak',
              'result-mat-respondent': 'Piotr Nowak',
              'result-mat-payment': 'payable through the Court',
              'result-mat-commencement': '12/01/2026'
            },
            creditor: 'applicant',
            creditorLabel: 'Anna Nowak'
          },
          {
            code: 'MCHILD',
            title: 'Maintenance Order for child(ren)',
            category: 'FINAL',
            categoryLabel: 'Final',
            responses: {
              'result-mchild-amount': '250',
              'result-mchild-frequency': 'monthly',
              'result-mchild-expiry': '30/04/2026',
              'result-mchild-arrears': '0',
              'result-mchild-education': ['Additional terms affect order expiry'],
              'result-mchild-beneficiary': 'Agnieszka Kowalska',
              'result-mchild-child-dob': '30/04/2010',
              'result-mchild-respondent': 'Piotr Nowak',
              'result-mchild-payment': 'payable between the parties',
              'result-mchild-commencement': '12/01/2026'
            },
            creditor: 'minor-creditor',
            creditorLabel: 'Agnieszka Kowalska'
          }
        ],
        'interest-applies': 'no',
        'indexation-type': 'no-indexation',
        'order-managing-payments': 'payments-via-court',
        'case-comment': 'Draft order ready for validation',
        'case-notes': 'Creditor details checked against application'
      },
      reviewHistory: [
        {
          action: 'Submitted',
          by: 'david.watts',
          at: '7 April 2026 at 9:15am'
        },
        {
          action: 'Rejected',
          by: 'emily.davis',
          at: '7 April 2026 at 11:40am',
          note: 'Please clarify the temporary creditor and arrears wording.'
        },
        {
          action: 'Resubmitted',
          by: 'david.watts',
          at: '7 April 2026 at 2:05pm'
        }
      ],
      isApplicationJourney: false,
      isRemoOutCase: false,
      applicantRows: [
        buildSummaryRow('Title', 'Mrs'),
        buildSummaryRow('First names', 'Anna'),
        buildSummaryRow('Last name', 'Nowak'),
        buildSummaryRow('Date of birth', '8 June 1982'),
        buildSummaryHtmlRow(
          'Address',
          formatLinesHtml(['Zlota 59', '00-120', 'Warszawa', 'Poland'])
        )
      ],
      respondentRows: [
        buildSummaryRow('Title', 'Mr'),
        buildSummaryRow('First names', 'Piotr'),
        buildSummaryRow('Last name', 'Nowak'),
        buildSummaryRow('National Insurance number', 'QA123456E'),
        buildSummaryHtmlRow(
          'Address',
          formatLinesHtml(['Flat 1B', '24 High Street', 'Twyford', 'Berkshire', 'RG10 9JB'])
        )
      ],
      centralAuthorityRows: [
        buildSummaryRow('REMO reference', 'PL-REM-2026-117'),
        buildSummaryRow('Name', 'Polish Central Authority')
      ],
      beneficiaryGroups: [
        {
          name: 'Anna Nowak',
          subtitle: 'Applicant',
          tag: 'Draft',
          rows: [
            [
              { text: '12 January 2026' },
              { text: 'Payable through the Court' },
              { text: 'Monthly' },
              { text: '£400.00' },
              { text: 'Anna Nowak' },
              { text: '12 January 2027' },
              { text: '-' },
              { text: 'Active' }
            ]
          ]
        },
        {
          name: 'Agnieszka Kowalska',
          subtitle: 'Minor creditor',
          tag: 'Draft',
          rows: [
            [
              { text: '12 January 2026' },
              { text: 'Payable between the parties' },
              { text: 'One-off' },
              { text: '£0.00' },
              { text: 'Agnieszka Kowalska' },
              { text: '30 April 2026' },
              { text: 'Lump sum for school fees' },
              { text: 'Active' }
            ]
          ]
        }
      ],
      interestAndIndexationRows: [
        buildSummaryRow('Interest', 'No'),
        buildSummaryRow('Indexation', 'Not applicable')
      ],
      caseCommentsRows: [
        buildSummaryRow('Case comment', 'Draft order ready for validation'),
        buildSummaryRow('Case note', 'Creditor details checked against application')
      ]
    },
    {
      respondentName: 'Mr Matej NOVOTNY',
      caseTypeLabel: 'REMO Out',
      applicantTypeLabel: 'Individual',
      submittedBy: 'joe.bloggs',
      caseData: {
        'case-type': 'remo-out',
        'applicant-type': 'individual',
        'has-order': 'yes',
        'applicant-title': 'Ms',
        'applicant-first-names': 'Katarina',
        'applicant-last-name': 'Horvath',
        'applicant-main-email-address': 'katarina.horvath@example.test',
        'applicant-main-telephone-number': '+48500555999',
        'applicant-address-line-1': '84 Reda',
        'applicant-address-line-2': 'Gdanska',
        'applicant-country': 'poland',
        'respondent-title': 'Mr',
        'respondent-first-names': 'Matej',
        'respondent-last-name': 'Novotny',
        'respondent-main-email-address': 'matej.novotny@example.test',
        'respondent-main-telephone-number': '+447700900332',
        'respondent-address-line-1': '99 High Street',
        'respondent-address-line-2': 'Reading',
        'respondent-postal-or-zip-code': 'RG10 9RT',
        'respondent-country': 'united-kingdom',
        'order-application-code': 'HC07003',
        'order-court-that-made-the-order': 'Gdansk Regional Court',
        'order-date-order-made': '07/01/2026',
        'order-date-arrears-last-updated': '01/04/2026',
        'entered-order-terms': [
          {
            code: 'MAT',
            title: 'Matrimonial Order for Adult',
            category: 'FINAL',
            categoryLabel: 'Final',
            responses: {
              'result-mat-amount': '120',
              'result-mat-frequency': 'monthly',
              'result-mat-expiry': '',
              'result-mat-arrears': '120',
              'result-mat-creditor': 'Katarina Horvath',
              'result-mat-respondent': 'Matej Novotny',
              'result-mat-payment': 'payable through the Court',
              'result-mat-commencement': '07/01/2026'
            },
            creditor: 'applicant',
            creditorLabel: 'Katarina Horvath'
          }
        ],
        'interest-applies': 'yes',
        'indexation-type': 'rpi',
        'order-managing-payments': 'payments-via-court',
        'case-comment': 'Final draft order awaiting validation',
        'case-notes': '-'
      },
      reviewHistory: [
        {
          action: 'Submitted',
          by: 'joe.bloggs',
          at: '6 April 2026 at 4:10pm'
        }
      ],
      isApplicationJourney: false,
      isRemoOutCase: true,
      applicantRows: [
        buildSummaryRow('Title', 'Ms'),
        buildSummaryRow('First names', 'Katarina'),
        buildSummaryRow('Last name', 'Horvath'),
        buildSummaryHtmlRow(
          'Address',
          formatLinesHtml(['84 REDA', 'GDANSKA', 'POLAND'])
        )
      ],
      respondentRows: [
        buildSummaryRow('Title', 'Mr'),
        buildSummaryRow('First names', 'Matej'),
        buildSummaryRow('Last name', 'Novotny'),
        buildSummaryHtmlRow(
          'Address',
          formatLinesHtml(['99 High Street', 'Reading', 'RG10 9RT'])
        )
      ],
      centralAuthorityRows: [],
      beneficiaryGroups: [
        {
          name: 'Katarina Horvath',
          subtitle: 'Applicant',
          tag: 'Draft',
          rows: [
            [
              { text: '7 January 2026' },
              { text: 'Payable through the Court' },
              { text: 'Monthly' },
              { text: '£120.00' },
              { text: 'Katarina Horvath' },
              { text: '-' },
              { text: '-' },
              { text: 'Active' }
            ]
          ]
        }
      ],
      interestAndIndexationRows: [
        buildSummaryRow('Interest', 'Yes'),
        buildSummaryRow('Indexation', 'RPI')
      ],
      caseCommentsRows: [
        buildSummaryRow('Case comment', 'Final draft order awaiting validation'),
        buildSummaryRow('Case note', '-')
      ]
    },
    {
      respondentName: 'Mr Marek KOWALSKI',
      submittedBy: 'emily.davis',
      caseData: {
        'case-type': 'remo-out',
        'case-type-label': 'REMO Out (CMS)',
        'applicant-type': 'individual',
        'has-order': 'yes',
        'applicant-title': 'Ms',
        'applicant-first-names': 'Ewa',
        'applicant-last-name': 'Kowalski',
        'applicant-date-of-birth': '05/05/1984',
        'applicant-main-email-address': 'ewa.kowalski@example.test',
        'applicant-main-telephone-number': '+447700900778',
        'applicant-address-line-1': '101 King Street',
        'applicant-address-line-2': 'Reading',
        'applicant-address-line-3': 'Berkshire',
        'applicant-postal-or-zip-code': 'RG1 2AB',
        'applicant-country': 'united-kingdom',
        'respondent-title': 'Mr',
        'respondent-first-names': 'Marek',
        'respondent-last-name': 'Kowalski',
        'respondent-date-of-birth': '22/09/1995',
        'respondent-main-email-address': 'marek.kowalski@example.test',
        'respondent-main-telephone-number': '+447700900887',
        'respondent-address-line-1': '12 Market Street',
        'respondent-address-line-2': 'Cardiff',
        'respondent-postal-or-zip-code': 'CF10 1AA',
        'respondent-country': 'united-kingdom',
        'order-application-code': 'HC07003',
        'order-court-that-made-the-order': 'Reading Family Court',
        'order-date-order-made': '22/03/2026',
        'order-date-arrears-last-updated': '01/04/2026',
        'entered-order-terms': [
          {
            code: 'MAT',
            title: 'Matrimonial Order for Adult',
            category: 'FINAL',
            categoryLabel: 'Final',
            responses: {
              'result-mat-amount': '180',
              'result-mat-frequency': 'monthly',
              'result-mat-expiry': '',
              'result-mat-arrears': '180',
              'result-mat-creditor': 'Ewa Kowalski',
              'result-mat-respondent': 'Marek Kowalski',
              'result-mat-payment': 'payable through the Court',
              'result-mat-commencement': '22/03/2026'
            },
            creditor: 'applicant',
            creditorLabel: 'Ewa Kowalski'
          }
        ],
        'interest-applies': 'no',
        'indexation-type': 'no-indexation',
        'order-managing-payments': 'payments-via-court',
        'case-comment': 'Awaiting updated financial statement.',
        'case-notes': '-'
      },
      reviewHistory: [
        {
          action: 'Submitted',
          by: 'emily.davis',
          at: '22 March 2026 at 9:05am'
        }
      ]
    }
  ]

  draftOrderEntries[7] = {
    respondentName: 'Ms Ioana RUSU',
    caseTypeLabel: 'REMO In',
    applicantTypeLabel: 'Individual',
    submittedBy: 'joe.bloggs',
    caseData: {
      'case-type': 'remo-in',
      'applicant-type': 'individual',
      'has-order': 'yes',
      'applicant-title': 'Mr',
      'applicant-first-names': 'Mihai',
      'applicant-last-name': 'Rusu',
      'applicant-date-of-birth': '04/02/1979',
      'applicant-main-email-address': 'mihai.rusu@example.test',
      'applicant-address-line-1': '18 Castle Street',
      'applicant-address-line-2': 'Bristol',
      'applicant-postal-or-zip-code': 'BS1 4AB',
      'applicant-country': 'united-kingdom',
      'respondent-title': 'Ms',
      'respondent-first-names': 'Ioana',
      'respondent-last-name': 'Rusu',
      'respondent-date-of-birth': '16/10/1981',
      'respondent-address-line-1': '27 River Road',
      'respondent-address-line-2': 'Cardiff',
      'respondent-postal-or-zip-code': 'CF10 2AA',
      'respondent-country': 'united-kingdom',
      'central-authority-remo-reference': 'UK-REMO-2026-771',
      'central-authority-reference': 'CA-DEL-2026-771',
      'central-authority-name': 'UK Central Authority',
      'order-application-code': 'HC07003',
      'order-court-that-made-the-order': 'Bristol Family Court',
      'order-date-order-made': '17/02/2026',
      'order-date-arrears-last-updated': '01/04/2026',
      'entered-order-terms': [
        {
          code: 'MAT',
          title: 'Matrimonial Order for Adult',
          category: 'FINAL',
          categoryLabel: 'Final',
          responses: {
            'result-mat-amount': '95',
            'result-mat-frequency': 'monthly',
            'result-mat-expiry': '',
            'result-mat-arrears': '0',
            'result-mat-creditor': 'Mihai Rusu',
            'result-mat-respondent': 'Ioana Rusu',
            'result-mat-payment': 'payable through the Court',
            'result-mat-commencement': '17/02/2026'
          },
          creditor: 'applicant',
          creditorLabel: 'Mihai Rusu'
        }
      ],
      'interest-and-indexation-completed': 'yes',
      'interest-applies': 'no',
      'indexation-type': 'no-indexation',
      'managing-payments-completed': 'yes',
      'order-managing-payments': 'payments-via-court',
      'case-comment': 'Deleted after duplicate case identified.',
      'case-notes': 'No further action required.',
      'applicant-details-completed': 'yes',
      'respondent-details-completed': 'yes',
      'order-details-completed': 'yes'
    },
    reviewHistory: [
      {
        action: 'Submitted',
        by: 'joe.bloggs',
        at: '4 May 2026 at 10:15am'
      },
      {
        action: 'Deleted',
        by: 'emily.davis',
        at: '11 May 2026 at 9:20am',
        note: 'Duplicate case created in error.'
      }
    ]
  }

  const draftOrderEntry = draftOrderEntries[index] ||
    getBaseRejectedDraftOrderEntry(index) ||
    getBaseFailedDraftOrderEntry(index)

  if (!draftOrderEntry) {
    return res.redirect('/create-cases')
  }
  const decision = getCaseReviewDecisions(req)[String(index)]
  const status = decision?.status || draftOrderEntry.status || getBaseReviewCaseStatus(index) || 'in-review'
  const reviewHistory = [
    ...draftOrderEntry.reviewHistory,
    ...((decision && decision.events) || [])
  ]
  const isChecker = req.query.checker === 'true'
  const showRejectedInputterTaskList = !isChecker && status === 'rejected'

  return res.render('create-and-validate-draft-orders/detail', {
    ...draftOrderEntry,
    caseId: requestedId,
    status,
    statusTag: getReviewStatusTag(status, isChecker),
    reviewTimelineItems: getReviewHistoryTimelineItems(reviewHistory),
    ...getCheckCaseDetailsViewData(draftOrderEntry.caseData),
    ...(status === 'failed' && isChecker ? getFailedPublishingCheckCaseViewData() : {}),
    ...getRejectedInputterViewData(draftOrderEntry.caseData, requestedId),
    isChecker,
    showReviewDecisionForm: isChecker && status === 'in-review',
    showRejectedInputterTaskList,
    returnToAllRejected: fromAllRejected && showRejectedInputterTaskList,
    failedPublishingAlert: status === 'failed' && isChecker
      ? {
          title: 'There was a problem publishing the case',
          html: '<p class="govuk-body">Contact the service desk.</p><p class="govuk-body">Error code: [operation_ID].</p>'
        }
      : null,
    backHref: status === 'failed'
      ? '/review-cases?tab=failed'
      : fromAllRejected && showRejectedInputterTaskList
        ? '/create-cases/all-rejected'
        : showRejectedInputterTaskList ? '/create-cases?tab=rejected' : '/create-cases',
    timelineHeading: showRejectedInputterTaskList ? 'Activity' : 'Review history'
  })
})

router.get('/create-cases/:index/edit/:section', (req, res, next) => {
  const sessionCase = getSessionReviewCaseById(req, req.params.index)
  const baseRejectedEntry = getBaseRejectedDraftOrderEntry(req.params.index)

  if (
    (!sessionCase || sessionCase.status !== 'rejected') &&
    (!baseRejectedEntry || getReviewCaseStatus(req, req.params.index) !== 'rejected')
  ) {
    return res.redirect(`/create-cases/${req.params.index}`)
  }

  const caseData = sessionCase ? sessionCase.caseData : baseRejectedEntry.caseData

  req.session.data['create-a-case'] = {
    ...cloneData(caseData),
    'submitted-case-id': sessionCase ? sessionCase.id : req.params.index
  }

  return redirectWithSessionSave(
    req,
    res,
    next,
    `/create-a-case/${req.params.section}`
  )
})

router.post('/create-cases/:index/review', (req, res, next) => {
  if (getReviewCaseStatus(req, req.params.index) !== 'in-review') {
    return res.redirect(`/create-cases/${req.params.index}?checker=true`)
  }

  const decision = getSingleValue(req.body['draft-order-review-decision']) || ''
  const rejectionReason = getSingleValue(req.body['rejection-reason']) || ''

  if (decision === 'approve') {
    updateReviewCaseStatus(req, req.params.index, 'approved')
    req.session.data[reviewCasesSuccessMessageKey] = 'Account approved'
    return redirectWithSessionSave(req, res, next, '/review-cases')
  }

  if (decision === 'reject') {
    updateReviewCaseStatus(req, req.params.index, 'rejected', rejectionReason)
    return redirectWithSessionSave(req, res, next, '/review-cases?tab=rejected')
  }

  return redirectWithSessionSave(req, res, next, `/create-cases/${req.params.index}?checker=true`)
})

router.post('/create-cases/:index/resubmit', (req, res, next) => {
  if (getReviewCaseStatus(req, req.params.index) !== 'rejected') {
    return res.redirect(`/create-cases/${req.params.index}`)
  }

  const sessionCase = getSessionReviewCaseById(req, req.params.index)
  const draftOrderEntry = sessionCase
    ? getSessionDraftOrderEntry(sessionCase)
    : getBaseRejectedDraftOrderEntry(req.params.index)
  const respondentName = (draftOrderEntry?.respondentName || 'the case')
    .replace(/^(Mr|Mrs|Ms|Miss|Dr)\s+/, '')

  updateReviewCaseStatus(req, req.params.index, 'in-review')

  if (req.query.allRejected === 'true') {
    req.session.data[allRejectedCasesSuccessMessageKey] = `You have submitted ${respondentName}'s case for review.`
    return redirectWithSessionSave(req, res, next, '/create-cases/all-rejected')
  }

  return redirectWithSessionSave(req, res, next, '/create-cases')
})

router.get('/create-cases/:index/delete', (req, res) => {
  if (req.query.checker !== 'true' || getReviewCaseStatus(req, req.params.index) !== 'in-review') {
    return res.redirect(`/create-cases/${req.params.index}`)
  }

  return res.render('create-and-validate-draft-orders/delete-case', {
    caseId: req.params.index,
    formAction: `/create-cases/${req.params.index}/delete?checker=true`,
    cancelHref: `/create-cases/${req.params.index}?checker=true`
  })
})

router.post('/create-cases/:index/delete', (req, res, next) => {
  if (req.query.checker !== 'true' || getReviewCaseStatus(req, req.params.index) !== 'in-review') {
    return res.redirect(`/create-cases/${req.params.index}`)
  }

  updateReviewCaseStatus(
    req,
    req.params.index,
    'deleted',
    getSingleValue(req.body['delete-reason']) || ''
  )

  return redirectWithSessionSave(req, res, next, '/review-cases?tab=deleted')
})

const activeCases = {
  5: {
    accountNumber: accountRef(5, 'RP'),
    caseReference: '05000215T',
    respondentName: 'Mr Andrei POPA',
    applicantName: 'Mrs Alina POPA',
    caseType: 'REMO In',
    remoReference: '2008/REMO/56789012',
    businessUnit: 'Reading',
    dateOfLastMovement: '2 May 2026',
    arrears: '£180.00',
    respondent: {
      name: 'Mr Andrei POPA',
      title: 'Mr',
      firstNames: 'Andrei',
      lastName: 'POPA',
      dateOfBirth: '15 March 1975',
      nationalInsuranceNumber: 'AB 98 76 54 C',
      otherPersonalInformation: null,
      mainEmail: 'andrei.popa@example.com',
      otherEmail: null,
      mainTelephone: '07700 900123',
      otherTelephone: null,
      address: ['45 Park Road', 'Newbury', 'Berkshire', 'RG14 1BB', 'United Kingdom'],
      restricted: false,
      restrictionReason: null,
      thirdParty: null
    },
    applicant: {
      name: 'Mrs Alina POPA',
      dateOfBirth: '22 April 1979 (Age 47)',
      restricted: true,
      accountNumber: accountRef(51, 'AP'),
      accountHref: '/active-case/creditor/51'
    },
    beneficiaries: {
      adults: ['Mrs Alina POPA'],
      children: ['Mira POPA (Age 12)', 'Luca POPA (Age 8)']
    },
    comment: 'Standard maintenance case. Payments maintained on time. No recent enforcement action.'
  },
  6: {
    accountNumber: accountRef(6, 'RP'),
    caseReference: '06000387W',
    respondentName: 'Mr Cem DEMIR',
    applicantName: 'Mrs Elif YILMAZ',
    caseType: 'REMO Out',
    remoReference: '2010/REMO/34567890',
    businessUnit: 'Bury St. Edmunds',
    dateOfLastMovement: '30 April 2026',
    arrears: '£0.00',
    respondent: {
      name: 'Mr Cem DEMIR',
      title: 'Mr',
      firstNames: 'Cem',
      lastName: 'DEMIR',
      dateOfBirth: '8 June 1970',
      nationalInsuranceNumber: 'CD 11 22 33 B',
      otherPersonalInformation: null,
      mainEmail: 'cem.demir@example.com',
      otherEmail: null,
      mainTelephone: '07700 900456',
      otherTelephone: null,
      address: ['22 Victoria Street', 'Brighton', 'East Sussex', 'BN1 3HQ', 'United Kingdom'],
      restricted: true,
      restrictionReason: 'There is a domestic violence case between the respondent and the applicant.',
      thirdParty: {
        name: 'Demir & Partners Solicitors',
        relationship: 'Solicitor',
        reference: 'CD/2024/001',
        address: ['10 Legal Lane', 'Brighton', 'East Sussex', 'BN2 5XY', 'United Kingdom']
      }
    },
    applicant: {
      name: 'Mrs Elif YILMAZ',
      dateOfBirth: '14 August 1972 (Age 53)',
      restricted: true,
      accountNumber: accountRef(61, 'AP'),
      accountHref: '/active-case/creditor/61'
    },
    beneficiaries: {
      adults: ['Mrs Elif YILMAZ'],
      children: ['Leyla DEMIR (Age 15)']
    },
    comment: 'No recent issues. Case active. Next review due September 2026.'
  }
}

const minorCreditorAccounts = {
  51: {
    type: 'applicant',
    accountNumber: accountRef(51, 'AP'),
    caseReference: '05000215T',
    name: 'Mrs Alina POPA',
    title: 'Mrs',
    firstNames: 'Alina',
    lastName: 'POPA',
    awaitingPayout: '£0.00',
    businessUnit: 'Reading',
    dateOfBirth: '22 April 1979 (Age 47)',
    address: ['14 Elm Close', 'Newbury', 'Berkshire', 'RG14 2PQ', 'United Kingdom'],
    mainEmail: 'alina.popa@example.com',
    otherEmail: null,
    mainTelephone: '07700 900123',
    otherTelephone: null,
    respondentAccountHref: '/active-case/5',
    respondentAccountNumber: accountRef(5, 'RP'),
    respondentName: 'Mr Andrei POPA',
    restricted: false
  },
  52: {
    type: 'creditor',
    accountNumber: accountRef(52, 'MC'),
    caseReference: '05000215T',
    name: 'Mira POPA',
    title: null,
    firstNames: 'Mira',
    lastName: 'POPA',
    awaitingPayout: '£0.00',
    businessUnit: 'Reading',
    dateOfBirth: '10 March 2013 (Age 13)',
    address: ['45 Park Road', 'Newbury', 'Berkshire', 'RG14 1BB', 'United Kingdom'],
    mainEmail: null,
    otherEmail: null,
    mainTelephone: null,
    otherTelephone: null,
    respondentAccountHref: '/active-case/5',
    respondentAccountNumber: accountRef(5, 'RP'),
    respondentName: 'Mr Andrei POPA',
    restricted: false
  },
  61: {
    type: 'applicant-creditor',
    accountNumber: accountRef(61, 'AP'),
    caseReference: '06000387W',
    name: 'Mrs Elif YILMAZ',
    title: 'Mrs',
    firstNames: 'Elif',
    lastName: 'YILMAZ',
    awaitingPayout: '£180.00',
    businessUnit: 'Bury St. Edmunds',
    dateOfBirth: '14 August 1972 (Age 53)',
    address: ['8 Meadow Lane', 'Brighton', 'East Sussex', 'BN1 7RR', 'United Kingdom'],
    mainEmail: 'elif.yilmaz@example.com',
    otherEmail: null,
    mainTelephone: '07700 900456',
    otherTelephone: null,
    respondentAccountHref: '/active-case/6',
    respondentAccountNumber: accountRef(6, 'RP'),
    respondentName: 'Mr Cem DEMIR',
    bacsStatus: 'PROVIDED',
    restricted: true,
    restrictionReason: 'There is a domestic violence case between the respondent and the applicant.',
    paymentMethod: 'BACS',
    nameOnAccount: 'Mrs Elif YILMAZ',
    sortCode: '20-00-00',
    bankAccountNumber: '73538301',
    paymentReference: 'REF-06387-EY'
  },
  63: {
    type: 'creditor',
    accountNumber: accountRef(63, 'MC'),
    caseReference: '06000387W',
    name: 'Ms Leyla DEMIR',
    awaitingPayout: '£95.00',
    businessUnit: 'Bury St. Edmunds',
    address: ['22 River Walk', 'Norwich', 'Norfolk', 'NR1 1HD', 'United Kingdom'],
    respondentAccountHref: '/active-case/6',
    respondentAccountNumber: accountRef(6, 'RP'),
    respondentName: 'Mr Cem DEMIR',
    restricted: false,
    paymentMethod: 'BACS',
    nameOnAccount: 'L Demir',
    sortCode: '60-16-13',
    bankAccountNumber: '31926819',
    paymentReference: 'REF-06387-LD'
  }
}

const majorCreditorAccounts = {
  62: {
    accountNumber: accountRef(62, 'MA'),
    caseReference: '06000387W',
    majorCreditorCode: 'ca-australia',
    name: 'Australian Child Support Agency',
    awaitingPayout: '£180.00',
    dateOfLastMovement: '30 April 2026',
    address: ['Level 3', 'Centrepoint Tower', 'Sydney', 'NSW 2000', 'Australia'],
    bacsStatus: 'PROVIDED'
  }
}

const monthNumbers = { January: '01', February: '02', March: '03', April: '04', May: '05', June: '06', July: '07', August: '08', September: '09', October: '10', November: '11', December: '12' }

function toDatePickerValue(dateString) {
  if (!dateString) return ''
  const match = dateString.match(/(\d{1,2})\s+(\w+)\s+(\d{4})/)
  if (!match) return ''
  const day = match[1].padStart(2, '0')
  const month = monthNumbers[match[2]]
  const year = match[3]
  return month ? `${day}/${month}/${year}` : ''
}

function getAddressFormFields(address = [], prefix) {
  const parts = Array.isArray(address) ? address.filter(hasValue) : []
  const country = parts.length > 0 ? parts[parts.length - 1] : ''
  const postcode = parts.length > 1 ? parts[parts.length - 2] : ''
  const lines = parts.slice(0, -2)

  return {
    [`${prefix}-address-line-1`]: lines[0] || '',
    [`${prefix}-address-line-2`]: lines[1] || '',
    [`${prefix}-address-line-3`]: lines[2] || '',
    [`${prefix}-address-line-4`]: lines[3] || '',
    [`${prefix}-address-line-5`]: lines[4] || '',
    [`${prefix}-postal-or-zip-code`]: postcode || '',
    [`${prefix}-country`]: country || ''
  }
}

function getAddressFromBody(body, prefix) {
  return [
    body[`${prefix}-address-line-1`],
    body[`${prefix}-address-line-2`],
    body[`${prefix}-address-line-3`],
    body[`${prefix}-address-line-4`],
    body[`${prefix}-address-line-5`],
    body[`${prefix}-postal-or-zip-code`],
    body[`${prefix}-country`] ? getCountryLabel(body[`${prefix}-country`]) : ''
  ].filter((value) => value && value.trim())
}

function getMinorCreditorFormDataFromAccount(account) {
  const addressFields = getAddressFormFields(account.address, 'minor-creditor')
  const countryValue = countryLabels[addressFields['minor-creditor-country']]
    ? addressFields['minor-creditor-country']
    : slugifyCountryName(addressFields['minor-creditor-country'] || '')
  const hasUkBankDetails = account.sortCode || account.bankAccountNumber || account.paymentMethod === 'BACS'
  const hasNonUkBankDetails = account.iban || account.bicOrSwiftCode || account.paymentMethod === 'IBAN'

  return {
    creditorType: account.organisationName ? 'organisation' : 'individual',
    title: account.title || '',
    firstNames: account.firstNames || '',
    lastName: account.lastName || '',
    organisationName: account.organisationName || '',
    addressLine1: addressFields['minor-creditor-address-line-1'],
    addressLine2: addressFields['minor-creditor-address-line-2'],
    addressLine3: addressFields['minor-creditor-address-line-3'],
    addressLine4: addressFields['minor-creditor-address-line-4'],
    addressLine5: addressFields['minor-creditor-address-line-5'],
    postcode: addressFields['minor-creditor-postal-or-zip-code'],
    country: countryLabels[countryValue] ? countryValue : '',
    bankAccountType: hasUkBankDetails
      ? 'uk-bank-account'
      : hasNonUkBankDetails
        ? 'non-uk-bank-account'
        : 'none',
    ukNameOnAccount: hasUkBankDetails ? account.nameOnAccount || '' : '',
    ukSortCode: hasUkBankDetails ? account.sortCode || '' : '',
    ukAccountNumber: hasUkBankDetails ? account.bankAccountNumber || '' : '',
    ukPaymentReference: hasUkBankDetails ? account.paymentReference || '' : '',
    nonUkNameOnAccount: hasNonUkBankDetails ? account.nameOnAccount || '' : '',
    nonUkBicOrSwiftCode: account.bicOrSwiftCode || '',
    nonUkIban: account.iban || '',
    nonUkPaymentReference: hasNonUkBankDetails ? account.paymentReference || '' : '',
    nonUkBankName: account.bankName || '',
    nonUkBranchOfficeOrSortCode: account.branchOfficeOrSortCode || '',
    nonUkAccountNumber: account.nonUkAccountNumber || ''
  }
}

function getMinorCreditorAddressFromData(creditor) {
  return [
    creditor.addressLine1,
    creditor.addressLine2,
    creditor.addressLine3,
    creditor.addressLine4,
    creditor.addressLine5,
    creditor.postcode,
    creditor.country ? getCountryLabel(creditor.country) : ''
  ].filter(hasValue)
}

function updateMinorCreditorAccountFromForm(account, body) {
  const creditor = buildMinorCreditor(body)

  account.creditorType = creditor.creditorType
  account.title = creditor.title || null
  account.firstNames = creditor.firstNames || ''
  account.lastName = creditor.lastName || ''
  account.organisationName = creditor.organisationName || ''
  account.name = getMinorCreditorName(creditor, 0)
  account.address = getMinorCreditorAddressFromData(creditor)

  if (creditor.bankAccountType === 'uk-bank-account') {
    account.paymentMethod = 'BACS'
    account.bacsStatus = 'PROVIDED'
    account.nameOnAccount = creditor.ukNameOnAccount || null
    account.sortCode = creditor.ukSortCode || null
    account.bankAccountNumber = creditor.ukAccountNumber || null
    account.paymentReference = creditor.ukPaymentReference || null
    delete account.bicOrSwiftCode
    delete account.iban
    delete account.bankName
    delete account.branchOfficeOrSortCode
    delete account.nonUkAccountNumber
  } else if (creditor.bankAccountType === 'non-uk-bank-account') {
    account.paymentMethod = 'IBAN'
    account.bacsStatus = 'PROVIDED'
    account.nameOnAccount = creditor.nonUkNameOnAccount || null
    account.bicOrSwiftCode = creditor.nonUkBicOrSwiftCode || null
    account.iban = creditor.nonUkIban || null
    account.paymentReference = creditor.nonUkPaymentReference || null
    account.bankName = creditor.nonUkBankName || null
    account.branchOfficeOrSortCode = creditor.nonUkBranchOfficeOrSortCode || null
    account.nonUkAccountNumber = creditor.nonUkAccountNumber || null
    delete account.sortCode
    delete account.bankAccountNumber
  } else {
    account.paymentMethod = null
    account.bacsStatus = null
    account.nameOnAccount = null
    account.paymentReference = null
    delete account.sortCode
    delete account.bankAccountNumber
    delete account.bicOrSwiftCode
    delete account.iban
    delete account.bankName
    delete account.branchOfficeOrSortCode
    delete account.nonUkAccountNumber
  }
}

function getMinorCreditorRowsFromAccount(account) {
  const creditor = getMinorCreditorFormDataFromAccount(account)
  const nameRows = creditor.creditorType === 'organisation'
    ? [buildSummaryRow('Organisation name', creditor.organisationName)]
    : [
        buildSummaryRow('Title', creditor.title),
        buildSummaryRow('First names', creditor.firstNames),
        buildSummaryRow('Last name', creditor.lastName)
      ]

  return [
    buildSummaryRow('Creditor type', creditor.creditorType === 'organisation' ? 'Organisation' : 'Individual'),
    ...nameRows,
    ...getMinorCreditorSummaryRows(creditor)
  ]
}

function getActiveCaseRespondentRows(respondent) {
  const rows = [
    buildSummaryRow('Title', respondent.title),
    buildSummaryRow('First names', respondent.firstNames),
    buildSummaryRow('Last name', respondent.lastName),
    buildSummaryRow('Date of birth', respondent.dateOfBirth),
    buildSummaryRow('UK National Insurance number', respondent.nationalInsuranceNumber),
    buildSummaryHtmlRow(
      'Other personal information',
      formatLinesHtml(
        respondent.otherPersonalInformation
          ? respondent.otherPersonalInformation.split('\n')
          : []
      )
    ),
    buildSummaryRow('Main email address', respondent.mainEmail),
    buildSummaryRow('Other email address', respondent.otherEmail),
    buildSummaryRow('Main telephone number', respondent.mainTelephone),
    buildSummaryRow('Other telephone number', respondent.otherTelephone),
    buildSummaryHtmlRow("Respondent's address", formatLinesHtml(respondent.address || []))
  ]

  if (respondent.thirdParty) {
    const tp = respondent.thirdParty
    rows.push(
      buildSummarySectionHeadingRow('Third party details'),
      buildSummaryRow('Third party name', tp.name),
      buildSummaryRow('Relationship to respondent', tp.relationship),
      buildSummaryRow('Reference', tp.reference),
      buildSummaryHtmlRow('Address', formatLinesHtml(tp.address || []))
    )
  }

  rows.push(
    buildSummaryRow('Restrict personal information', respondent.restricted ? 'Yes' : 'No'),
    buildSummaryRow('Reason for restriction', respondent.restrictionReason)
  )

  return rows
}

router.get('/active-case/:id', (req, res) => {
  const id = Number(req.params.id)
  const tab = req.query.tab || 'at-a-glance'
  const activeCase = activeCases[id]

  if (!activeCase) {
    return res.redirect('/create-cases?tab=approved')
  }

  return res.render('active-case/index', {
    activeCase,
    caseId: id,
    tab,
    respondentRows: getActiveCaseRespondentRows(activeCase.respondent)
  })
})

router.get('/active-case/:id/respondent/edit', (req, res) => {
  const id = Number(req.params.id)
  const activeCase = activeCases[id]

  if (!activeCase) {
    return res.redirect('/create-cases?tab=approved')
  }

  const r = activeCase.respondent
  const fields = {
    'respondent-title': r.title || '',
    'respondent-first-names': r.firstNames || '',
    'respondent-last-name': r.lastName || '',
    'respondent-add-aliases': null,
    'respondent-date-of-birth': toDatePickerValue(r.dateOfBirth),
    'respondent-national-insurance-number': r.nationalInsuranceNumber || '',
    'respondent-other-personal-information': r.otherPersonalInformation || '',
    'respondent-main-email-address': r.mainEmail || '',
    'respondent-other-email-address': r.otherEmail || '',
    'respondent-main-telephone-number': r.mainTelephone || '',
    'respondent-other-telephone-number': r.otherTelephone || '',
    ...getAddressFormFields(r.address, 'respondent'),
    'respondent-send-correspondence-to-third-party': r.thirdParty ? 'yes' : null,
    'respondent-third-party-name-or-organisation': r.thirdParty ? r.thirdParty.name || '' : '',
    'respondent-third-party-relationship': r.thirdParty ? r.thirdParty.relationship || '' : '',
    'respondent-third-party-reference': r.thirdParty ? r.thirdParty.reference || '' : '',
    ...getAddressFormFields(r.thirdParty ? r.thirdParty.address : [], 'respondent-third-party'),
    'respondent-restrict-personal-information': r.restricted ? 'yes' : null,
    'respondent-restriction-reason': r.restrictionReason || ''
  }

  Object.assign(req.session.data, fields)
  Object.assign(res.locals.data, fields)

  return res.render('create-a-case/respondent-details', {
    accountContextLabel: (activeCase.accountNumber || activeCase.caseReference) + ' — ' + activeCase.respondentName,
    backHref: '/active-case/' + id + '?tab=respondent',
    formAction: '/active-case/' + id + '/respondent/edit',
    cancelHref: '/active-case/' + id + '?tab=respondent',
    submitButtonText: 'Save changes'
  })
})

router.post('/active-case/:id/respondent/edit', (req, res) => {
  const id = Number(req.params.id)
  const activeCase = activeCases[id]

  if (!activeCase) {
    return res.redirect('/create-cases?tab=approved')
  }

  const respondent = activeCase.respondent
  respondent.title = req.body['respondent-title'] || null
  respondent.firstNames = req.body['respondent-first-names'] || ''
  respondent.lastName = req.body['respondent-last-name'] || ''
  respondent.name = [
    respondent.title,
    respondent.firstNames,
    respondent.lastName
  ].filter(Boolean).join(' ')
  respondent.dateOfBirth = hasValue(req.body['respondent-date-of-birth'])
    ? formatDateLong(req.body['respondent-date-of-birth'])
    : null
  respondent.nationalInsuranceNumber = req.body['respondent-national-insurance-number'] || null
  respondent.otherPersonalInformation = req.body['respondent-other-personal-information'] || null
  respondent.mainEmail = req.body['respondent-main-email-address'] || null
  respondent.otherEmail = req.body['respondent-other-email-address'] || null
  respondent.mainTelephone = req.body['respondent-main-telephone-number'] || null
  respondent.otherTelephone = req.body['respondent-other-telephone-number'] || null
  respondent.address = getAddressFromBody(req.body, 'respondent')
  respondent.restricted = isChecked(req.body['respondent-restrict-personal-information'])
  respondent.restrictionReason = respondent.restricted
    ? req.body['respondent-restriction-reason'] || null
    : null

  if (isChecked(req.body['respondent-send-correspondence-to-third-party'])) {
    respondent.thirdParty = {
      name: req.body['respondent-third-party-name-or-organisation'] || '',
      relationship: req.body['respondent-third-party-relationship'] || '',
      reference: req.body['respondent-third-party-reference'] || '',
      address: getAddressFromBody(req.body, 'respondent-third-party')
    }
  } else {
    respondent.thirdParty = null
  }

  activeCase.respondentName = respondent.name
  Object.values(minorCreditorAccounts)
    .filter((account) => account.respondentAccountHref === `/active-case/${id}`)
    .forEach((account) => {
      account.respondentName = respondent.name
    })

  return res.redirect('/active-case/' + id + '?tab=respondent')
})

router.get('/active-case/creditor/:id/applicant/edit', (req, res) => {
  const id = Number(req.params.id)
  const account = minorCreditorAccounts[id]

  if (!account) {
    return res.redirect('/create-cases?tab=approved')
  }

  const fields = {
    'applicant-title': account.title || '',
    'applicant-first-names': account.firstNames || '',
    'applicant-last-name': account.lastName || '',
    'applicant-add-aliases': (account.aliases && account.aliases.length > 0) ? 'yes' : null,
    'applicant-alias-count': String((account.aliases && account.aliases.length > 0) ? account.aliases.length : 1),
    'applicant-date-of-birth': toDatePickerValue(account.dateOfBirth),
    'applicant-main-email-address': account.mainEmail || '',
    'applicant-other-email-address': account.otherEmail || '',
    'applicant-main-telephone-number': account.mainTelephone || '',
    'applicant-other-telephone-number': account.otherTelephone || '',
    'applicant-address-line-1': account.address[0] || '',
    'applicant-address-line-2': account.address[1] || '',
    'applicant-address-line-3': account.address[2] || '',
    'applicant-address-line-4': '',
    'applicant-address-line-5': '',
    'applicant-postal-or-zip-code': account.address[3] || '',
    'applicant-country': account.address[4] || '',
    'applicant-send-correspondence-to-third-party': null,
    'applicant-restrict-personal-information': account.restricted ? 'yes' : null,
    'applicant-restriction-reason': account.restrictionReason || '',
    'applicant-bank-account-type': null
  }

  Object.assign(req.session.data, fields)
  Object.assign(res.locals.data, fields)

  if (account.aliases && account.aliases.length > 0) {
    account.aliases.forEach((alias, i) => {
      const fnKey = `applicant-alias-${i + 1}-first-names`
      const lnKey = `applicant-alias-${i + 1}-last-name`
      req.session.data[fnKey] = alias.firstNames
      req.session.data[lnKey] = alias.lastName
      res.locals.data[fnKey] = alias.firstNames
      res.locals.data[lnKey] = alias.lastName
    })
  }

  return res.render('create-a-case/applicant-details', {
    accountContextLabel: (account.accountNumber || account.caseReference) + ' — ' + account.name,
    backHref: '/active-case/creditor/' + id + '?tab=applicant',
    formAction: '/active-case/creditor/' + id + '/applicant/edit',
    cancelHref: '/active-case/creditor/' + id + '?tab=applicant',
    submitButtonText: 'Save changes',
    applicantAge: getAgeFromDateString(fields['applicant-date-of-birth'])
  })
})

router.post('/active-case/creditor/:id/applicant/edit', (req, res) => {
  const id = Number(req.params.id)
  const account = minorCreditorAccounts[id]

  if (!account) return res.redirect('/create-cases?tab=approved')

  account.title = req.body['applicant-title'] || null
  account.firstNames = req.body['applicant-first-names'] || ''
  account.lastName = req.body['applicant-last-name'] || ''
  account.name = [account.title, account.firstNames, account.lastName].filter(Boolean).join(' ')
  account.mainEmail = req.body['applicant-main-email-address'] || null
  account.otherEmail = req.body['applicant-other-email-address'] || null
  account.mainTelephone = req.body['applicant-main-telephone-number'] || null
  account.otherTelephone = req.body['applicant-other-telephone-number'] || null
  account.address = [
    req.body['applicant-address-line-1'],
    req.body['applicant-address-line-2'],
    req.body['applicant-address-line-3'],
    req.body['applicant-address-line-4'],
    req.body['applicant-address-line-5'],
    req.body['applicant-postal-or-zip-code'],
    req.body['applicant-country']
  ].filter(v => v && v.trim())
  account.restricted = isChecked(req.body['applicant-restrict-personal-information'])
  account.restrictionReason = account.restricted ? req.body['applicant-restriction-reason'] || null : null

  account.aliases = []
  if (isChecked(req.body['applicant-add-aliases'])) {
    const aliasCount = Number.parseInt(req.body['applicant-alias-count'], 10) || 1
    for (let i = 1; i <= aliasCount; i++) {
      const firstNames = (req.body[`applicant-alias-${i}-first-names`] || '').trim()
      const lastName = (req.body[`applicant-alias-${i}-last-name`] || '').trim()
      if (firstNames || lastName) {
        account.aliases.push({ firstNames, lastName })
      }
    }
  }

  syncAliasFields(req.session.data, req.body, 'applicant')

  return res.redirect('/active-case/creditor/' + id + '?tab=applicant')
})

router.get('/active-case/creditor/:id/creditor/edit', (req, res) => {
  const id = Number(req.params.id)
  const account = minorCreditorAccounts[id]

  if (!account || account.type !== 'creditor') {
    return res.redirect('/create-cases?tab=approved')
  }

  const creditor = getMinorCreditorFormDataFromAccount(account)

  return res.render('create-a-case/minor-creditor-details', {
    creditor,
    countryItems: getCountrySelectItems(creditor.country || ''),
    accountContextLabel: (account.accountNumber || account.caseReference) + ' — ' + account.name,
    backHref: '/active-case/creditor/' + id + '?tab=creditor',
    formAction: '/active-case/creditor/' + id + '/creditor/edit',
    cancelHref: '/active-case/creditor/' + id + '?tab=creditor',
    submitButtonText: 'Save changes'
  })
})

router.post('/active-case/creditor/:id/creditor/edit', (req, res) => {
  const id = Number(req.params.id)
  const account = minorCreditorAccounts[id]

  if (!account || account.type !== 'creditor') {
    return res.redirect('/create-cases?tab=approved')
  }

  updateMinorCreditorAccountFromForm(account, req.body)

  return res.redirect('/active-case/creditor/' + id + '?tab=creditor')
})

router.get('/review-cases', (req, res) => {
  const tab = req.query.tab || 'to-review'
  const successMessage = req.session.data[reviewCasesSuccessMessageKey]
  delete req.session.data[reviewCasesSuccessMessageKey]
  const baseRows = [
    { id: 2, status: 'in-review', respondent: 'KOWALSKI, Marek', applicant: 'KOWALSKI, Ewa', caseType: 'REMO Out (CMS)', submittedBy: 'emily.davis', created: '1 day ago', createdSort: -1 },
    { id: 0, status: 'in-review', respondent: 'NOWAK, Piotr', applicant: 'NOWAK, Anna', caseType: 'REMO In', submittedBy: 'david.watts', created: 'Today', createdSort: 0 },
    { id: 1, status: 'in-review', respondent: 'NOVOTNY, Matej', applicant: 'HORVATH, Katarina', caseType: 'REMO Out', submittedBy: 'joe.bloggs', created: 'Today', createdSort: 0 },
    { id: 4, status: 'rejected', respondent: 'DIMITROV, Nikolai', applicant: 'PETROVA, Irina', caseType: 'REMO Out', submittedBy: 'joe.bloggs', created: '3 days ago', createdSort: -3, rejected: '1 day ago', rejectedSort: -1 },
    { id: 3, status: 'rejected', respondent: 'BALOGH, Janos', applicant: 'KOVACS, Eszter', caseType: 'REMO In', submittedBy: 'emily.davis', created: '2 days ago', createdSort: -2, rejected: '2 days ago', rejectedSort: -2 },
    { id: 7, status: 'deleted', respondent: 'RUSU, Ioana', applicant: 'RUSU, Mihai', caseType: 'REMO In', submittedBy: 'joe.bloggs', created: '7 days ago', createdSort: -7, deleted: 'Today', deletedSort: 0 }
  ]
  const allRows = [
    ...getSessionReviewCases(req).map(getSessionReviewCaseRow),
    ...applyReviewDecisions(baseRows, getCaseReviewDecisions(req))
  ]
  const toReviewRows = allRows.filter((row) => row.status === 'in-review')
  const rejectedRows = allRows.filter((row) => row.status === 'rejected')
  const deletedRows = allRows.filter((row) => row.status === 'deleted')
  const failedRows = [
    { id: 8, respondent: 'NOWAK, Piotr', applicant: 'NOWAK, Anna', caseType: 'REMO In', submittedBy: 'emily.davis', created: '2 days ago', createdSort: -2, failed: 'Today', failedSort: 0 }
  ]

  const mapToReviewRows = (rows) => rows.map((row) => [
    { html: `<a class="govuk-link" href="${row.href || `/create-cases/${row.id}`}?checker=true">${escapeHtml(row.respondent)}</a>`, text: row.respondent },
    { text: row.applicant },
    { text: row.caseType },
    { text: row.submittedBy },
    { text: row.created, sortValue: row.createdSort }
  ])

  const mapRejectedRows = (rows) => rows.map((row) => [
    { html: `<a class="govuk-link" href="${row.href || `/create-cases/${row.id}`}?checker=true">${escapeHtml(row.respondent)}</a>`, text: row.respondent },
    { text: row.applicant },
    { text: row.caseType },
    { text: row.submittedBy },
    { text: row.created, sortValue: row.createdSort },
    { text: row.rejected, sortValue: row.rejectedSort }
  ])

  const mapDeletedRows = (rows) => rows.map((row) => [
    { html: `<a class="govuk-link" href="${row.href || `/create-cases/${row.id}`}">${escapeHtml(row.respondent)}</a>`, text: row.respondent },
    { text: row.applicant },
    { text: row.caseType },
    { text: row.submittedBy },
    { text: row.created, sortValue: row.createdSort },
    { text: row.deleted, sortValue: row.deletedSort }
  ])

  const mapFailedRows = (rows) => rows.map((row) => [
    { html: `<a class="govuk-link" href="/create-cases/${row.id}?checker=true">${escapeHtml(row.respondent)}</a>`, text: row.respondent },
    { text: row.applicant },
    { text: row.caseType },
    { text: row.submittedBy },
    { text: row.created, sortValue: row.createdSort },
    { text: row.failed, sortValue: row.failedSort }
  ])

  const tabs = {
    'to-review': { label: 'To review', rows: mapToReviewRows(toReviewRows) },
    'rejected': { label: 'Rejected', rows: mapRejectedRows(rejectedRows.sort((a, b) => (a.rejectedSort ?? 0) - (b.rejectedSort ?? 0))) },
    'deleted': { label: 'Deleted', rows: mapDeletedRows(deletedRows.filter(row => row.deletedSort >= -7)) },
    'failed': { label: 'Failed', rows: mapFailedRows(failedRows) }
  }

  const activeTabData = tabs[tab] || tabs['to-review']

  return res.render('review-cases/index', {
    activeTab: tab,
    tabLabel: activeTabData.label,
    successMessage,
    rejectedCount: rejectedRows.length,
    failedCount: failedRows.length,
    tableRows: activeTabData.rows
  })
})

router.post('/resulting', (req, res, next) => {
  req.session.data['resulting-search-mode'] =
    getSingleValue(req.body['resulting-search-mode']) || ''
  req.session.data['resulting-record-number'] =
    getSingleValue(req.body['resulting-record-number']) || ''

  if (req.session.data['resulting-search-mode'] === 'record-number') {
    return redirectWithSessionSave(req, res, next, '/resulting/record-number')
  }

  if (req.session.data['resulting-search-mode'] === 'england-wales') {
    return redirectWithSessionSave(req, res, next, '/resulting/england-wales')
  }

  if (req.session.data['resulting-search-mode'] === 'unscheduled') {
    return redirectWithSessionSave(req, res, next, '/resulting/unscheduled')
  }

  return redirectWithSessionSave(req, res, next, '/resulting')
})

router.get('/resulting/record-number', (req, res) => {
  if (req.session.data['resulting-search-mode'] !== 'record-number') {
    return res.redirect('/resulting')
  }

  return res.render('resulting/record-number')
})

router.post('/resulting/record-number', (req, res, next) => {
  req.session.data['resulting-record-number'] =
    getSingleValue(req.body['resulting-record-number-search']) ||
    req.session.data['resulting-record-number'] ||
    'RM12345678'

  req.session.data['resulting-record-search-last-name'] =
    getSingleValue(req.body['resulting-record-search-last-name']) || ''
  req.session.data['resulting-record-search-first-names'] =
    getSingleValue(req.body['resulting-record-search-first-names']) || ''
  req.session.data['resulting-record-search-company-name'] =
    getSingleValue(req.body['resulting-record-search-company-name']) || ''
  req.session.data['resulting-record-search-exact-match'] =
    req.body['resulting-record-search-exact-match'] ? 'yes' : ''
  req.session.data['resulting-record-search-include-aliases'] =
    req.body['resulting-record-search-include-aliases'] ? 'yes' : ''

  return redirectWithSessionSave(req, res, next, '/resulting/record-number/results')
})

router.get('/resulting/record-number/results', (req, res) => {
  if (
    req.session.data['resulting-search-mode'] !== 'record-number' ||
    !hasValue(req.session.data['resulting-record-number'])
  ) {
    return res.redirect('/resulting')
  }

  return res.render('resulting/record-number-results', {
    searchMatches: getResultingRecordSearchMatches(req.session.data)
  })
})

router.post('/resulting/record-number/results', (req, res, next) => {
  req.session.data['resulting-selected-record-id'] =
    getSingleValue(req.body['resulting-selected-record-id']) || ''

  const selectedMatch = getSelectedResultingRecordMatch(req.session.data)

  if (!selectedMatch) {
    return redirectWithSessionSave(req, res, next, '/resulting/record-number/results')
  }

  req.session.data['resulting-record-number'] = selectedMatch.accountNumber
  req.session.data['hearing-date'] = selectedMatch.hearingDate
  req.session.data['hearing-start-time'] = selectedMatch.hearingTime
  req.session.data['hearing-court'] = selectedMatch.courtVenue
  req.session.data['hearing-courtroom-number'] = selectedMatch.courtroom

  return redirectWithSessionSave(req, res, next, '/resulting/case-details')
  })

router.get('/resulting/england-wales', (req, res) => {
  return res.render('resulting/england-wales', {
    courtItems: englandAndWalesCourts.map((court) => ({ text: court })),
    searchMatches: getEnglandAndWalesSearchMatches(req.session.data),
    searchRows: getEnglandAndWalesSearchRows(req.session.data)
  })
})

router.post('/resulting/england-wales', (req, res, next) => {
  req.session.data['resulting-ew-court'] =
    getSingleValue(req.body['resulting-ew-court']) || ''
  req.session.data['resulting-ew-date'] =
    getSingleValue(req.body['resulting-ew-date']) || ''

  return redirectWithSessionSave(req, res, next, '/resulting/england-wales')
})

router.get('/resulting/unscheduled', (req, res) => {
  return res.render('resulting/unscheduled', {
    searchMatches: getUnscheduledSearchMatches(req.session.data),
    searchRows: getUnscheduledSearchRows(req.session.data)
  })
})

router.post('/resulting/unscheduled', (req, res, next) => {
  req.session.data['resulting-unscheduled-date'] =
    getSingleValue(req.body['resulting-unscheduled-date']) || ''

  return redirectWithSessionSave(req, res, next, '/resulting/unscheduled')
})

router.get('/resulting/view-records', (req, res) => {
  if (
    req.session.data['resulting-search-mode'] !== 'england-wales' &&
    req.session.data['resulting-search-mode'] !== 'unscheduled'
  ) {
    return res.redirect('/resulting')
  }

  return res.render('resulting/view-records', {
    searchCriteriaRows: getResultingSearchCriteriaRows(req.session.data),
    recordsRows: getResultingRecordsRows(req.session.data)
  })
})

router.get('/resulting/case-details', (req, res) => {
  if (
    req.session.data['resulting-search-mode'] !== 'record-number' &&
    req.session.data['resulting-search-mode'] !== 'england-wales' &&
    req.session.data['resulting-search-mode'] !== 'unscheduled'
  ) {
    return res.redirect('/resulting')
  }

  return res.render('resulting/case-details', {
    accountContextLabel: getResultingAccountContextLabel(req.session.data),
    caseTypeLabel:
      caseTypeLabels[req.session.data['case-type']] || req.session.data['case-type'] || '-',
    hearingDetailsText: getResultingHearingDetailsText(req.session.data),
    partyDetailsItems: getResultingPartyDetailsItems(req.session.data),
    resultsItems: getResultingResultsItems(req.session.data),
    additionalInformationItems: getResultingCaseCommentsItems(req.session.data),
    sessionItems: getResultingSessionItems(req.session.data),
    recordedResults: getRecordedResults(req.session.data),
    canCheckCase: canCheckResultingCase(req.session.data),
    saveError: null
  })
})

router.post('/resulting/case-details', (req, res, next) => {
  if (!canCheckResultingCase(req.session.data)) {
    return res.render('resulting/case-details', {
      accountContextLabel: getResultingAccountContextLabel(req.session.data),
      caseTypeLabel:
        caseTypeLabels[req.session.data['case-type']] || req.session.data['case-type'] || '-',
      hearingDetailsText: getResultingHearingDetailsText(req.session.data),
      partyDetailsItems: getResultingPartyDetailsItems(req.session.data),
      resultsItems: getResultingResultsItems(req.session.data),
      additionalInformationItems: getResultingCaseCommentsItems(req.session.data),
      sessionItems: getResultingSessionItems(req.session.data),
      recordedResults: getRecordedResults(req.session.data),
      canCheckCase: canCheckResultingCase(req.session.data),
      saveError: 'Complete all required sections and add at least one final or interim result before checking results.'
    })
  }

  return redirectWithSessionSave(req, res, next, '/resulting/check-your-answers')
})

router.get('/resulting/applicant-details', (req, res) => {
  return res.render('create-a-case/applicant-details', {
    applicantAge: getAgeFromDateString(req.session.data['applicant-date-of-birth']),
    accountContextLabel: getResultingAccountContextLabel(req.session.data),
    backHref: '/resulting/case-details',
    formAction: '/resulting/applicant-details',
    cancelHref: '/resulting/case-details'
  })
})

router.post('/resulting/applicant-details', (req, res, next) => {
  const errors = validateApplicantDetails(req.body, req.session.data['applicant-type'])

  if (Object.keys(errors).length > 0) {
    delete req.session.data['applicant-details-completed']

    return res.render('create-a-case/applicant-details', {
      data: buildApplicantDetailsViewData(req.session.data, req.body),
      applicantAge: getAgeFromDateString(req.body['applicant-date-of-birth']),
      accountContextLabel: getResultingAccountContextLabel(req.session.data),
      backHref: '/resulting/case-details',
      formAction: '/resulting/applicant-details',
      cancelHref: '/resulting/case-details',
      errors,
      errorSummary: buildErrorSummary(errors)
    })
  }

  req.session.data['applicant-add-aliases'] = isChecked(req.body['applicant-add-aliases'])
    ? 'yes'
    : ''
  syncAliasFields(req.session.data, req.body, 'applicant')
  req.session.data['applicant-bank-account-type'] =
    getSingleValue(req.body['applicant-bank-account-type']) || ''
  req.session.data['applicant-send-correspondence-to-third-party'] = isChecked(
    req.body['applicant-send-correspondence-to-third-party']
  )
    ? 'yes'
    : ''
  req.session.data['applicant-restrict-personal-information'] = isChecked(
    req.body['applicant-restrict-personal-information']
  )
    ? 'yes'
    : ''

  req.session.data['applicant-details-completed'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/resulting/case-details')
})

router.get('/resulting/respondent-details', (req, res) => {
  return res.render('create-a-case/respondent-details', {
    accountContextLabel: getResultingAccountContextLabel(req.session.data),
    backHref: '/resulting/case-details',
    formAction: '/resulting/respondent-details',
    cancelHref: '/resulting/case-details'
  })
})

router.post('/resulting/respondent-details', (req, res, next) => {
  const errors = validateRespondentDetails(req.body)

  if (Object.keys(errors).length > 0) {
    delete req.session.data['respondent-details-completed']

    return res.render('create-a-case/respondent-details', {
      data: buildRespondentDetailsViewData(req.session.data, req.body),
      accountContextLabel: getResultingAccountContextLabel(req.session.data),
      backHref: '/resulting/case-details',
      formAction: '/resulting/respondent-details',
      cancelHref: '/resulting/case-details',
      errors,
      errorSummary: buildErrorSummary(errors)
    })
  }

  req.session.data['respondent-add-aliases'] = isChecked(req.body['respondent-add-aliases'])
    ? 'yes'
    : ''
  syncAliasFields(req.session.data, req.body, 'respondent')
  req.session.data['respondent-add-employer-details'] = isChecked(
    req.body['respondent-add-employer-details']
  )
    ? 'yes'
    : ''
  req.session.data['respondent-send-correspondence-to-third-party'] = isChecked(
    req.body['respondent-send-correspondence-to-third-party']
  )
    ? 'yes'
    : ''
  req.session.data['respondent-restrict-personal-information'] = isChecked(
    req.body['respondent-restrict-personal-information']
  )
    ? 'yes'
    : ''

  req.session.data['respondent-details-completed'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/resulting/case-details')
})

router.get('/resulting/central-authority-details', (req, res) => {
  if (isRemoOutCase(req.session.data)) {
    return res.redirect('/resulting/case-details')
  }

  return res.render('create-a-case/central-authority-details', {
    accountContextLabel: getResultingAccountContextLabel(req.session.data),
    hasCentralAuthorityManualDetails: hasCentralAuthorityManualDetails(req.session.data),
    centralAuthorityCardRows: getCentralAuthorityCardRows(req.session.data),
    formAction: '/resulting/central-authority-details',
    manualHref: '/resulting/central-authority-details/manual',
    removeHref: '/resulting/central-authority-details/remove',
    cancelHref: '/resulting/case-details'
  })
})

router.post('/resulting/central-authority-details', (req, res, next) => {
  req.session.data['central-authority-details-completed'] = hasCentralAuthorityDetails(
    req.session.data
  )
    ? 'yes'
    : ''

  return redirectWithSessionSave(req, res, next, '/resulting/case-details')
})

router.get('/resulting/central-authority-details/manual', (req, res) => {
  return res.render('create-a-case/central-authority-details-manual', {
    accountContextLabel: getResultingAccountContextLabel(req.session.data),
    formAction: '/resulting/central-authority-details/manual',
    cancelHref: '/resulting/central-authority-details'
  })
})

router.post('/resulting/central-authority-details/manual', (req, res, next) => {
  req.session.data['central-authority-details-completed'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/resulting/central-authority-details')
})

router.get('/resulting/central-authority-details/remove', (req, res) => {
  if (!hasCentralAuthorityManualDetails(req.session.data)) {
    return res.redirect('/resulting/central-authority-details')
  }

  return res.render('create-a-case/remove-central-authority-details', {
    accountContextLabel: getResultingAccountContextLabel(req.session.data),
    centralAuthorityCardRows: getCentralAuthorityCardRows(req.session.data),
    formAction: '/resulting/central-authority-details/remove',
    cancelHref: '/resulting/central-authority-details'
  })
})

router.post('/resulting/central-authority-details/remove', (req, res, next) => {
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

  return redirectWithSessionSave(req, res, next, '/resulting/central-authority-details')
})

router.get('/resulting/case-comments-and-notes', (req, res) => {
  return res.render('create-a-case/case-comments-and-notes', {
    accountContextLabel: getResultingAccountContextLabel(req.session.data),
    formAction: '/resulting/case-comments-and-notes',
    cancelHref: '/resulting/case-details'
  })
})

router.post('/resulting/case-comments-and-notes', (req, res, next) => {
  return redirectWithSessionSave(req, res, next, '/resulting/case-details')
})

router.get('/resulting/select-result', (req, res) => {
  return res.render('resulting/select-result', {
    accountContextLabel: getResultingAccountContextLabel(req.session.data),
    recordedResults: getRecordedResults(req.session.data),
    recordedResultRows: getRecordedResultManagementRows(req.session.data),
    resultItems: getResultOptionItems(req.session.data['resulting-result-code']),
    selectionError: null
  })
})

router.post('/resulting/select-result', (req, res, next) => {
  const selectedResultCode = String(getSingleValue(req.body['resulting-result-code']) || '')
    .trim()
    .toUpperCase()

  if (!getResultDefinition(selectedResultCode)) {
    req.session.data['resulting-result-code'] = ''

    return res.render('resulting/select-result', {
      accountContextLabel: getResultingAccountContextLabel(req.session.data),
      recordedResults: getRecordedResults(req.session.data),
      recordedResultRows: getRecordedResultManagementRows(req.session.data),
      resultItems: getResultOptionItems(''),
      selectionError: 'Select a result from the list.'
    })
  }

  req.session.data['resulting-result-code'] = selectedResultCode
  delete req.session.data['resulting-result-errors']
  delete req.session.data['resulting-current-result-responses']
  delete req.session.data['resulting-edit-result-index']

  return redirectWithSessionSave(req, res, next, '/resulting/result-details')
})

router.get('/resulting/result/:index/change', (req, res, next) => {
  const index = Number(req.params.index)
  const recordedResults = getRecordedResults(req.session.data)
  const selectedResult = recordedResults[index]

  if (!selectedResult) {
    return redirectWithSessionSave(req, res, next, '/resulting/select-result')
  }

  req.session.data['resulting-edit-result-index'] = String(index)
  req.session.data['resulting-result-code'] = selectedResult.code
  req.session.data['resulting-current-result-responses'] = selectedResult.responses || {}
  delete req.session.data['resulting-result-errors']

  return redirectWithSessionSave(req, res, next, '/resulting/result-details')
})

router.get('/resulting/result/:index/delete', (req, res, next) => {
  const index = Number(req.params.index)
  const recordedResults = getRecordedResults(req.session.data)

  if (!recordedResults[index]) {
    return redirectWithSessionSave(req, res, next, '/resulting/select-result')
  }

  recordedResults.splice(index, 1)
  req.session.data['resulting-recorded-results'] = recordedResults.map(({ index: _index, ...result }) => result)

  if (String(req.session.data['resulting-edit-result-index']) === String(index)) {
    delete req.session.data['resulting-edit-result-index']
    delete req.session.data['resulting-result-code']
    delete req.session.data['resulting-current-result-responses']
    delete req.session.data['resulting-result-errors']
  }

  return redirectWithSessionSave(req, res, next, '/resulting/select-result')
})

router.get('/resulting/result-details', (req, res) => {
  const resultDefinition = getResultDefinition(req.session.data['resulting-result-code'])

  if (!resultDefinition) {
    return res.redirect('/resulting/select-result')
  }

  return res.render('resulting/result-details', {
    accountContextLabel: getResultingAccountContextLabel(req.session.data),
    isEditingResult: isEditingRecordedResult(req.session.data),
    resultCode: resultDefinition.code,
    resultTitle: resultDefinition.title,
    resultCategory: getResultCategoryLabel(resultDefinition.category),
    resultWording: getResultWording(req.session.data),
    responseItems: getResultingResponseItems(req.session.data),
    errorSummary: null
  })
})

router.post('/resulting/result-details', (req, res, next) => {
  const resultDefinition = getResultDefinition(req.session.data['resulting-result-code'])

  if (!resultDefinition) {
    return res.redirect('/resulting/select-result')
  }

  const { errors, values } = validateResultResponses(resultDefinition, req.body)

  req.session.data['resulting-current-result-responses'] = values

  if (Object.keys(errors).length) {
    req.session.data['resulting-result-errors'] = errors

    return res.render('resulting/result-details', {
      accountContextLabel: getResultingAccountContextLabel(req.session.data),
      isEditingResult: isEditingRecordedResult(req.session.data),
      resultCode: resultDefinition.code,
      resultTitle: resultDefinition.title,
      resultCategory: getResultCategoryLabel(resultDefinition.category),
      resultWording: getResultWording(req.session.data),
      responseItems: getResultingResponseItems(req.session.data),
      errorSummary: buildErrorSummary(errors)
    })
  }

  delete req.session.data['resulting-result-errors']

  const frequencyField = findFrequencyField(resultDefinition)
  const sharedFrequency = frequencyField ? getSingleValue(values[frequencyField.id]) || '' : ''

  if (frequencyField && hasValue(sharedFrequency)) {
    req.session.data['resulting-shared-frequency'] = sharedFrequency
  }

  const recordedResults = applySharedFrequencyToRecordedResults(
    getRecordedResults(req.session.data),
    getSharedResultFrequency(req.session.data)
  )
  const savedResponses =
    frequencyField && hasValue(getSharedResultFrequency(req.session.data))
      ? {
          ...values,
          [frequencyField.id]: getSharedResultFrequency(req.session.data)
        }
      : values
  const savedResult = {
    code: resultDefinition.code,
    title: resultDefinition.title,
    category: resultDefinition.category,
    categoryLabel: getResultCategoryLabel(resultDefinition.category),
    wording: getDefinitionWording(resultDefinition, savedResponses),
    responses: savedResponses
  }
  const editIndex = Number(req.session.data['resulting-edit-result-index'])

  if (Number.isInteger(editIndex) && recordedResults[editIndex]) {
    recordedResults[editIndex] = savedResult
  } else {
    recordedResults.push(savedResult)
  }

  req.session.data['resulting-recorded-results'] = recordedResults.map(({ index, ...result }) => result)

  delete req.session.data['resulting-result-code']
  delete req.session.data['resulting-current-result-responses']
  delete req.session.data['resulting-edit-result-index']

  if (req.body.action === 'add-further-result') {
    return redirectWithSessionSave(req, res, next, '/resulting/select-result')
  }

  return redirectWithSessionSave(req, res, next, '/resulting/case-details')
})

router.get('/resulting/session-details', (req, res) => {
  return res.render('resulting/session-details', {
    accountContextLabel: getResultingAccountContextLabel(req.session.data)
  })
})

router.post('/resulting/session-details', (req, res, next) => {
  req.session.data['resulting-judge'] = getSingleValue(req.body['resulting-judge']) || ''
  req.session.data['resulting-magistrate-1'] =
    getSingleValue(req.body['resulting-magistrate-1']) || ''
  req.session.data['resulting-magistrate-2'] =
    getSingleValue(req.body['resulting-magistrate-2']) || ''
  req.session.data['resulting-magistrate-3'] =
    getSingleValue(req.body['resulting-magistrate-3']) || ''
  req.session.data['resulting-legal-advisor'] =
    getSingleValue(req.body['resulting-legal-advisor']) || ''
  req.session.data['resulting-session-start-time'] =
    getSingleValue(req.body['resulting-session-start-time']) || ''
  req.session.data['resulting-session-end-time'] =
    getSingleValue(req.body['resulting-session-end-time']) || ''
  req.session.data['resulting-session-details-completed'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/resulting/case-details')
})

router.get('/resulting/check-your-answers', (req, res) => {
  if (
    req.session.data['resulting-search-mode'] !== 'record-number' &&
    req.session.data['resulting-search-mode'] !== 'england-wales' &&
    req.session.data['resulting-search-mode'] !== 'unscheduled'
  ) {
    return res.redirect('/resulting')
  }

  if (!canCheckResultingCase(req.session.data)) {
    return res.redirect('/resulting/case-details')
  }

  return res.render('resulting/check-your-answers', {
    accountContextLabel: getResultingAccountContextLabel(req.session.data),
    caseTypeLabel:
      caseTypeLabels[req.session.data['case-type']] || req.session.data['case-type'] || '-',
    hearingDetailsText: getResultingHearingDetailsText(req.session.data),
    applicantRows: getApplicantSummaryRows(req.session.data),
    respondentRows: getRespondentSummaryRows(req.session.data),
    centralAuthorityRows: getCentralAuthoritySummaryRows(req.session.data),
    resultCards: getResultingResultCards(req.session.data),
    caseCommentsRows: getResultingCaseCommentsRows(req.session.data),
    sessionRows: getResultingSessionSummaryRows(req.session.data),
    showApplicantRestrictionWarning: Boolean(
      req.session.data['applicant-restrict-personal-information']
    ),
    showRespondentRestrictionWarning: Boolean(
      req.session.data['respondent-restrict-personal-information']
    ),
    isRemoOutCase: isRemoOutCase(req.session.data)
  })
})

router.post('/resulting/check-your-answers', (req, res, next) => {
  return redirectWithSessionSave(req, res, next, '/resulting/submitted')
})

router.get('/resulting/submitted', (req, res) => {
  if (
    req.session.data['resulting-search-mode'] !== 'record-number' &&
    req.session.data['resulting-search-mode'] !== 'england-wales' &&
    req.session.data['resulting-search-mode'] !== 'unscheduled'
  ) {
    return res.redirect('/resulting')
  }

  return res.render('resulting/submitted', {
    accountContextLabel: getResultingAccountContextLabel(req.session.data)
  })
})

function buildApplicantAccountRows(account) {
  const rows = []
  if (account.title) rows.push(buildSummaryRow('Title', account.title))
  rows.push(buildSummaryRow('First names', account.firstNames))
  rows.push(buildSummaryRow('Last name', account.lastName))
  if (account.aliases) {
    account.aliases.forEach(alias => {
      rows.push(buildSummaryRow('Alias', [alias.firstNames, alias.lastName].filter(Boolean).join(' ')))
    })
  }
  rows.push(buildSummaryRow('Date of birth', account.dateOfBirth))
  rows.push(buildSummaryRow('Main email address', account.mainEmail))
  rows.push(buildSummaryRow('Other email address', account.otherEmail))
  rows.push(buildSummaryRow('Main telephone number', account.mainTelephone))
  rows.push(buildSummaryRow('Other telephone number', account.otherTelephone))
  rows.push(buildSummaryHtmlRow("Applicant's address", formatLinesHtml(account.address || [])))
  rows.push(buildSummaryRow('Restrict personal information', account.restricted ? 'Yes' : 'No'))
  if (account.restricted && account.restrictionReason) {
    rows.push(buildSummaryRow('Restriction reason', account.restrictionReason))
  }
  return rows.filter(Boolean)
}

router.get('/active-case/creditor/:id', (req, res) => {
  const id = Number(req.params.id)
  const account = minorCreditorAccounts[id]

  if (!account) {
    return res.redirect('/create-cases?tab=approved')
  }

  const tab = req.query.tab || 'at-a-glance'
  const applicantRows = buildApplicantAccountRows(account)
  return res.render('active-case/creditor', {
    account,
    accountId: id,
    tab,
    applicantRows,
    creditorRows: getMinorCreditorRowsFromAccount(account)
  })
})

router.get('/active-case/major-creditor/:id', (req, res) => {
  const id = Number(req.params.id)
  const account = majorCreditorAccounts[id]

  if (!account) {
    return res.redirect('/create-cases?tab=approved')
  }

  return res.render('active-case/major-creditor', { account })
})

// ── Search ────────────────────────────────────────────────────────────────────

function makePcAddr(addr1, city, county, postcode) {
  return county
    ? [addr1, city, county, postcode, 'United Kingdom']
    : [addr1, city, postcode, 'United Kingdom']
}

function normaliseSearchText(value) {
  return String(value || '').trim().toLowerCase()
}

function normaliseCompactSearchText(value) {
  return normaliseSearchText(value).replace(/[\s-]/g, '')
}

function normaliseDateSearchText(value) {
  const trimmed = String(value || '').trim()
  if (!trimmed) return ''

  const monthNames = {
    january: '01',
    february: '02',
    march: '03',
    april: '04',
    may: '05',
    june: '06',
    july: '07',
    august: '08',
    september: '09',
    october: '10',
    november: '11',
    december: '12'
  }

  const isoMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (isoMatch) return `${isoMatch[3]}/${isoMatch[2]}/${isoMatch[1]}`

  const slashMatch = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (slashMatch) {
    return [
      slashMatch[1].padStart(2, '0'),
      slashMatch[2].padStart(2, '0'),
      slashMatch[3]
    ].join('/')
  }

  const writtenMatch = trimmed.toLowerCase().match(/^(\d{1,2}) ([a-z]+) (\d{4})/)
  if (writtenMatch && monthNames[writtenMatch[2]]) {
    return [
      writtenMatch[1].padStart(2, '0'),
      monthNames[writtenMatch[2]],
      writtenMatch[3]
    ].join('/')
  }

  return normaliseSearchText(trimmed)
}

function getSearchViewData(formValues = {}) {
  return {
    formValues,
    majorCreditorItems: getMajorCreditorAutocompleteItems(formValues['major-creditor'] || '')
  }
}

function getCaseMajorCreditorAccounts(caseReference) {
  return Object.entries(majorCreditorAccounts)
    .filter(([, account]) => account.caseReference === caseReference)
    .map(([id, account]) => ({ id, ...account }))
}

function getMajorCreditorAccountByCode(majorCreditorCode) {
  const account = Object.entries(majorCreditorAccounts)
    .find(([, account]) => account.majorCreditorCode === majorCreditorCode)

  return account ? { id: account[0], ...account[1] } : null
}

// Compact search data — r=respondent, a=applicant creditor account, mc=minor creditors
// bu=business unit, ct=case type, dolm=date of last movement, payout=awaiting payout
const searchData = [
  { id: 5, caseRef: '05000215T', remoRef: '2008/REMO/56789012',
    status: 'Active', bu: 'Reading', arrears: '£180.00', ct: 'REMO In', dolm: '2 May 2026',
    r: { ln: 'POPA', fn: 'Andrei', ti: 'Mr', dob: '15 March 1975 (Age 51)', ni: 'AB 98 76 54 C', a1: '45 Park Road', city: 'Newbury', cy: 'Berkshire', pc: 'RG14 1BB', email: 'andrei.popa@example.com', tel: '07700 900123', restr: false },
    a: { id: 51, ln: 'POPA', fn: 'Alina', ti: 'Mrs', dob: '22 April 1979 (Age 47)', payout: '£0.00', a1: '14 Elm Close', city: 'Newbury', cy: 'Berkshire', pc: 'RG14 2PQ', email: 'alina.popa@example.com', tel: '07700 900123', restr: true },
    mc: [{ id: 52, ln: 'POPA', fn: 'Mira', dob: '10 March 2013 (Age 13)', payout: '£0.00' }] },

  { id: 6, caseRef: '06000387W', remoRef: '2010/REMO/34567890',
    status: 'Active', bu: 'Bury St. Edmunds', arrears: '£0.00', ct: 'REMO Out', dolm: '30 April 2026',
    r: { ln: 'DEMIR', fn: 'Cem', ti: 'Mr', dob: '8 June 1970 (Age 55)', ni: 'CD 11 22 33 B', a1: '22 Victoria Street', city: 'Brighton', cy: 'East Sussex', pc: 'BN1 3HQ', email: 'cem.demir@example.com', tel: '07700 900456', restr: true },
    a: { id: 61, ln: 'YILMAZ', fn: 'Elif', ti: 'Mrs', dob: '14 August 1972 (Age 53)', payout: '£180.00', a1: '8 Meadow Lane', city: 'Brighton', cy: 'East Sussex', pc: 'BN1 7RR', email: 'elif.yilmaz@example.com', tel: '07700 900456', restr: true },
    mc: [{ id: 63, ln: 'DEMIR', fn: 'Leyla', dob: '12 May 2011 (Age 15)', payout: '£95.00' }] },

  { id: 10, caseRef: '10000101S', remoRef: '2014/REMO/10000101',
    status: 'Active', bu: 'Reading', arrears: '£240.00', ct: 'REMO In', dolm: '5 May 2026',
    r: { ln: 'KOWALSKI', fn: 'Marek', ti: 'Mr', dob: '15 January 1975 (Age 51)', ni: 'AB 12 34 56 A', a1: '12 Oak Street', city: 'Reading', cy: 'Berkshire', pc: 'RG1 1AA', email: 'marek.kowalski@example.com', tel: '07700 900100', restr: false },
    a: { id: 100, ln: 'KOWALSKI', fn: 'Ewa', ti: 'Mrs', dob: '22 March 1978 (Age 48)', payout: '£0.00', a1: '15 Elm Avenue', city: 'Reading', cy: 'Berkshire', pc: 'RG1 2AA', email: 'ewa.kowalski@example.com', tel: '07700 900101', restr: false },
    mc: [{ id: 201, ln: 'KOWALSKI', fn: 'Oskar', dob: '15 April 2015 (Age 11)', payout: '£0.00' }] },

  { id: 11, caseRef: '11000201S', remoRef: '2016/REMO/11000201',
    status: 'Active', bu: 'Bristol', arrears: '£0.00', ct: 'REMO Out', dolm: '28 April 2026',
    r: { ln: 'NOVOTNY', fn: 'Matej', ti: 'Mr', dob: '8 April 1968 (Age 58)', ni: 'CD 23 45 67 B', a1: '3 Park Street', city: 'Bristol', cy: 'City of Bristol', pc: 'BS1 1AA', email: 'matej.novotny@example.com', tel: '07700 900110', restr: false },
    a: { id: 101, ln: 'HORVATH', fn: 'Katarina', ti: 'Mrs', dob: '14 September 1971 (Age 54)', payout: '£0.00', a1: '7 Queen Square', city: 'Bristol', cy: 'City of Bristol', pc: 'BS1 2AA', email: 'katarina.horvath@example.com', tel: '07700 900111', restr: false },
    mc: [] },

  { id: 12, caseRef: '12000301S', remoRef: '2013/REMO/12000301',
    status: 'Active', bu: 'Birmingham', arrears: '£180.00', ct: 'REMO In', dolm: '1 May 2026',
    r: { ln: 'NOWAK', fn: 'Piotr', ti: 'Mr', dob: '22 September 1980 (Age 45)', ni: 'EF 34 56 78 C', a1: '25 Corporation Street', city: 'Birmingham', cy: 'West Midlands', pc: 'B2 1AA', email: 'piotr.nowak@example.com', tel: '07700 900120', restr: false },
    a: { id: 102, ln: 'NOWAK', fn: 'Anna', ti: 'Mrs', dob: '5 July 1983 (Age 42)', payout: '£0.00', a1: '14 Broad Street', city: 'Birmingham', cy: 'West Midlands', pc: 'B1 1AA', email: 'anna.nowak@example.com', tel: '07700 900121', restr: false },
    mc: [
      { id: 202, ln: 'NOWAK', fn: 'Lena', dob: '22 June 2012 (Age 13)', payout: '£0.00' },
      { id: 203, ln: 'NOWAK', fn: 'Tomasz', dob: '8 February 2017 (Age 9)', payout: '£0.00' }
    ] },

  { id: 13, caseRef: '13000401A', remoRef: '2015/REMO/13000401',
    status: 'Suspended', bu: 'London', arrears: '£640.00', ct: 'REMO In', dolm: '15 April 2026',
    r: { ln: 'DIMITROV', fn: 'Nikolai', ti: 'Mr', dob: '3 July 1971 (Age 54)', ni: 'GH 45 67 89 D', a1: '45 Fleet Street', city: 'London', cy: null, pc: 'EC4A 1AA', email: 'nikolai.dimitrov@example.com', tel: '07700 900130', restr: false },
    a: { id: 103, ln: 'PETROVA', fn: 'Irina', ti: 'Ms', dob: '28 October 1975 (Age 50)', payout: '£0.00', a1: '8 The Strand', city: 'London', cy: null, pc: 'WC2N 1AA', email: 'irina.petrova@example.com', tel: '07700 900131', restr: false },
    mc: [{ id: 204, ln: 'DIMITROV', fn: 'Mila', dob: '10 November 2014 (Age 11)', payout: '£0.00' }] },

  { id: 14, caseRef: '14000501S', remoRef: '2017/REMO/14000501',
    status: 'Active', bu: 'Manchester', arrears: '£0.00', ct: 'REMO Out', dolm: '3 May 2026',
    r: { ln: 'BALOGH', fn: 'Janos', ti: 'Mr', dob: '11 November 1977 (Age 48)', ni: 'IJ 56 78 90 A', a1: '18 Deansgate', city: 'Manchester', cy: 'Greater Manchester', pc: 'M3 1AA', email: 'janos.balogh@example.com', tel: '07700 900140', restr: false },
    a: { id: 104, ln: 'KOVACS', fn: 'Eszter', ti: 'Mrs', dob: '11 January 1980 (Age 46)', payout: '£0.00', a1: '32 Market Street', city: 'Manchester', cy: 'Greater Manchester', pc: 'M1 1AA', email: 'eszter.kovacs@example.com', tel: '07700 900141', restr: false },
    mc: [{ id: 205, ln: 'BALOGH', fn: 'Hanna', dob: '3 September 2016 (Age 9)', payout: '£0.00' }] },

  { id: 15, caseRef: '15000601B', remoRef: '2012/REMO/15000601',
    status: 'Active', bu: 'Leeds', arrears: '£0.00', ct: 'REMO In', dolm: '20 April 2026',
    r: { ln: 'RUSU', fn: 'Mihai', ti: 'Mr', dob: '25 March 1973 (Age 53)', ni: 'KL 67 89 01 B', a1: '5 Briggate', city: 'Leeds', cy: 'West Yorkshire', pc: 'LS1 1AA', email: 'mihai.rusu@example.com', tel: '07700 900150', restr: false },
    a: { id: 105, ln: 'RUSU', fn: 'Ioana', ti: 'Mrs', dob: '7 April 1976 (Age 50)', payout: '£0.00', a1: '9 The Headrow', city: 'Leeds', cy: 'West Yorkshire', pc: 'LS1 2AA', email: 'ioana.rusu@example.com', tel: '07700 900151', restr: false },
    mc: [] },

  { id: 16, caseRef: '16000701C', remoRef: '2018/REMO/16000701',
    status: 'Inactive', bu: 'Newcastle', arrears: '£200.00', ct: 'REMO Out', dolm: '22 April 2026',
    r: { ln: 'IONESCU', fn: 'Stefan', ti: 'Mr', dob: '17 June 1966 (Age 59)', ni: 'MN 78 90 12 C', a1: '22 Grainger Street', city: 'Newcastle upon Tyne', cy: 'Tyne and Wear', pc: 'NE1 1AA', email: 'stefan.ionescu@example.com', tel: '07700 900160', restr: false },
    a: { id: 106, ln: 'IONESCU', fn: 'Elena', ti: 'Mrs', dob: '19 November 1969 (Age 56)', payout: '£0.00', a1: '15 Northumberland Street', city: 'Newcastle upon Tyne', cy: 'Tyne and Wear', pc: 'NE1 2AA', email: 'elena.ionescu@example.com', tel: '07700 900161', restr: false },
    mc: [] },

  { id: 17, caseRef: '17000801D', remoRef: '2014/REMO/17000801',
    status: 'Active', bu: 'Sheffield', arrears: '£80.00', ct: 'REMO In', dolm: '7 May 2026',
    r: { ln: 'HORVAT', fn: 'Luka', ti: 'Mr', dob: '4 February 1979 (Age 47)', ni: 'OP 89 01 23 D', a1: '11 Fargate', city: 'Sheffield', cy: 'South Yorkshire', pc: 'S1 1AA', email: 'luka.horvat@example.com', tel: '07700 900170', restr: false },
    a: { id: 107, ln: 'HORVAT', fn: 'Maja', ti: 'Mrs', dob: '3 June 1982 (Age 43)', payout: '£0.00', a1: '6 High Street', city: 'Sheffield', cy: 'South Yorkshire', pc: 'S1 2AA', email: 'maja.horvat@example.com', tel: '07700 900171', restr: false },
    mc: [{ id: 206, ln: 'HORVAT', fn: 'Ivan', dob: '17 January 2013 (Age 13)', payout: '£0.00' }] },

  { id: 18, caseRef: '18000901E', remoRef: '2016/REMO/18000901',
    status: 'Active', bu: 'Exeter', arrears: '£0.00', ct: 'REMO Out', dolm: '25 April 2026',
    r: { ln: 'NOVAK', fn: 'Tomas', ti: 'Mr', dob: '28 August 1972 (Age 53)', ni: 'QR 90 12 34 A', a1: '9 High Street', city: 'Exeter', cy: 'Devon', pc: 'EX4 1AA', email: 'tomas.novak@example.com', tel: '07700 900180', restr: false },
    a: { id: 108, ln: 'NOVAK', fn: 'Petra', ti: 'Mrs', dob: '25 February 1974 (Age 52)', payout: '£0.00', a1: '14 Sidwell Street', city: 'Exeter', cy: 'Devon', pc: 'EX4 2AA', email: 'petra.novak@example.com', tel: '07700 900181', restr: false },
    mc: [] },

  { id: 19, caseRef: '19001001F', remoRef: '2013/REMO/19001001',
    status: 'Suspended', bu: 'Bury St. Edmunds', arrears: '£520.00', ct: 'REMO In', dolm: '10 April 2026',
    r: { ln: 'ZIELINSKI', fn: 'Pawel', ti: 'Mr', dob: '16 December 1969 (Age 56)', ni: 'ST 01 23 45 B', a1: '3 Angel Hill', city: 'Bury St. Edmunds', cy: 'Suffolk', pc: 'IP33 1AA', email: 'pawel.zielinski@example.com', tel: '07700 900190', restr: false },
    a: { id: 109, ln: 'ZIELINSKI', fn: 'Magda', ti: 'Mrs', dob: '18 August 1972 (Age 53)', payout: '£0.00', a1: '17 Abbeygate Street', city: 'Bury St. Edmunds', cy: 'Suffolk', pc: 'IP33 2AA', email: 'magda.zielinski@example.com', tel: '07700 900191', restr: false },
    mc: [
      { id: 207, ln: 'ZIELINSKI', fn: 'Kasia', dob: '5 August 2010 (Age 15)', payout: '£0.00' },
      { id: 208, ln: 'ZIELINSKI', fn: 'Milosz', dob: '28 March 2014 (Age 12)', payout: '£0.00' }
    ] },

  { id: 20, caseRef: '20001101G', remoRef: '2015/REMO/20001101',
    status: 'Active', bu: 'Reading', arrears: '£120.00', ct: 'REMO Out', dolm: '6 May 2026',
    r: { ln: 'PAVLOV', fn: 'Sergei', ti: 'Mr', dob: '7 May 1981 (Age 45)', ni: 'UV 12 34 56 C', a1: '28 Church Road', city: 'Reading', cy: 'Berkshire', pc: 'RG1 3AA', email: 'sergei.pavlov@example.com', tel: '07700 900200', restr: false },
    a: { id: 110, ln: 'PAVLOV', fn: 'Anya', ti: 'Mrs', dob: '30 December 1985 (Age 40)', payout: '£0.00', a1: '6 London Road', city: 'Reading', cy: 'Berkshire', pc: 'RG1 4AA', email: 'anya.pavlov@example.com', tel: '07700 900201', restr: false },
    mc: [] },

  { id: 21, caseRef: '21001201H', remoRef: '2017/REMO/21001201',
    status: 'Active', bu: 'Bristol', arrears: '£0.00', ct: 'REMO In', dolm: '2 May 2026',
    r: { ln: 'PETRESCU', fn: 'Victor', ti: 'Mr', dob: '20 January 1974 (Age 52)', ni: 'WX 23 45 67 D', a1: '18 College Road', city: 'Bristol', cy: 'City of Bristol', pc: 'BS8 1AA', email: 'victor.petrescu@example.com', tel: '07700 900210', restr: false },
    a: { id: 111, ln: 'PETRESCU', fn: 'Daria', ti: 'Mrs', dob: '14 March 1977 (Age 49)', payout: '£0.00', a1: '4 Park Street', city: 'Bristol', cy: 'City of Bristol', pc: 'BS1 3AA', email: 'daria.petrescu@example.com', tel: '07700 900211', restr: false },
    mc: [] },

  { id: 22, caseRef: '22001301I', remoRef: '2012/REMO/22001301',
    status: 'Active', bu: 'Birmingham', arrears: '£340.00', ct: 'REMO Out', dolm: '30 April 2026',
    r: { ln: 'SOKOLOV', fn: 'Pavel', ti: 'Mr', dob: '13 October 1976 (Age 49)', ni: 'YZ 34 56 78 A', a1: '7 New Street', city: 'Birmingham', cy: 'West Midlands', pc: 'B2 2AA', email: 'pavel.sokolov@example.com', tel: '07700 900220', restr: false },
    a: { id: 112, ln: 'SOKOLOV', fn: 'Svetlana', ti: 'Mrs', dob: '22 September 1979 (Age 46)', payout: '£0.00', a1: '20 Colmore Row', city: 'Birmingham', cy: 'West Midlands', pc: 'B3 1AA', email: 'svetlana.sokolov@example.com', tel: '07700 900221', restr: false },
    mc: [{ id: 209, ln: 'SOKOLOV', fn: 'Nina', dob: '12 December 2015 (Age 10)', payout: '£0.00' }] },

  { id: 23, caseRef: '23001401J', remoRef: '2018/REMO/23001401',
    status: 'Active', bu: 'London', arrears: '£0.00', ct: 'REMO In', dolm: '8 May 2026',
    r: { ln: 'IVANOV', fn: 'Mikhail', ti: 'Mr', dob: '5 August 1983 (Age 42)', ni: 'AB 45 67 89 B', a1: '31 Aldgate High Street', city: 'London', cy: null, pc: 'EC3N 1AA', email: 'mikhail.ivanov@example.com', tel: '07700 900230', restr: false },
    a: { id: 113, ln: 'IVANOV', fn: 'Anastasia', ti: 'Mrs', dob: '9 July 1984 (Age 41)', payout: '£0.00', a1: '12 Bishopsgate', city: 'London', cy: null, pc: 'EC2M 1AA', email: 'anastasia.ivanov@example.com', tel: '07700 900231', restr: false },
    mc: [] },

  { id: 24, caseRef: '24001501K', remoRef: '2014/REMO/24001501',
    status: 'Inactive', bu: 'Manchester', arrears: '£160.00', ct: 'REMO Out', dolm: '24 April 2026',
    r: { ln: 'MARIN', fn: 'Gheorghe', ti: 'Mr', dob: '30 September 1965 (Age 60)', ni: 'CD 56 78 90 C', a1: '5 Oxford Road', city: 'Manchester', cy: 'Greater Manchester', pc: 'M1 2AA', email: 'gheorghe.marin@example.com', tel: '07700 900240', restr: false },
    a: { id: 114, ln: 'MARIN', fn: 'Sorina', ti: 'Mrs', dob: '1 May 1968 (Age 58)', payout: '£0.00', a1: '23 Deansgate', city: 'Manchester', cy: 'Greater Manchester', pc: 'M3 2AA', email: 'sorina.marin@example.com', tel: '07700 900241', restr: false },
    mc: [] },

  { id: 25, caseRef: '25001601L', remoRef: '2016/REMO/25001601',
    status: 'Active', bu: 'Leeds', arrears: '£0.00', ct: 'REMO In', dolm: '4 May 2026',
    r: { ln: 'DVORAK', fn: 'Karel', ti: 'Mr', dob: '18 April 1978 (Age 48)', ni: 'EF 67 89 01 D', a1: '14 Park Row', city: 'Leeds', cy: 'West Yorkshire', pc: 'LS1 3AA', email: 'karel.dvorak@example.com', tel: '07700 900250', restr: false },
    a: { id: 115, ln: 'DVORAK', fn: 'Jana', ti: 'Mrs', dob: '16 November 1981 (Age 44)', payout: '£0.00', a1: '3 City Square', city: 'Leeds', cy: 'West Yorkshire', pc: 'LS1 4AA', email: 'jana.dvorak@example.com', tel: '07700 900251', restr: false },
    mc: [
      { id: 210, ln: 'DVORAK', fn: 'Adam', dob: '9 July 2011 (Age 14)', payout: '£0.00' },
      { id: 211, ln: 'DVORAK', fn: 'Tereza', dob: '21 February 2016 (Age 10)', payout: '£0.00' }
    ] },

  { id: 26, caseRef: '26001701M', remoRef: '2013/REMO/26001701',
    status: 'Active', bu: 'Newcastle', arrears: '£440.00', ct: 'REMO Out', dolm: '12 April 2026',
    r: { ln: 'JOVANOVIC', fn: 'Milan', ti: 'Mr', dob: '9 June 1970 (Age 55)', ni: 'GH 78 90 12 A', a1: '8 Pilgrim Street', city: 'Newcastle upon Tyne', cy: 'Tyne and Wear', pc: 'NE1 3AA', email: 'milan.jovanovic@example.com', tel: '07700 900260', restr: false },
    a: { id: 116, ln: 'JOVANOVIC', fn: 'Milica', ti: 'Mrs', dob: '8 February 1973 (Age 53)', payout: '£0.00', a1: '19 Grey Street', city: 'Newcastle upon Tyne', cy: 'Tyne and Wear', pc: 'NE1 4AA', email: 'milica.jovanovic@example.com', tel: '07700 900261', restr: false },
    mc: [] },

  { id: 27, caseRef: '27001801N', remoRef: '2015/REMO/27001801',
    status: 'Active', bu: 'Sheffield', arrears: '£0.00', ct: 'REMO In', dolm: '9 May 2026',
    r: { ln: 'BALAN', fn: 'Sorin', ti: 'Mr', dob: '23 February 1985 (Age 41)', ni: 'IJ 89 01 23 B', a1: '3 Pinstone Street', city: 'Sheffield', cy: 'South Yorkshire', pc: 'S1 3AA', email: 'sorin.balan@example.com', tel: '07700 900270', restr: false },
    a: { id: 117, ln: 'BALAN', fn: 'Lidia', ti: 'Mrs', dob: '20 June 1988 (Age 37)', payout: '£0.00', a1: '15 Norfolk Street', city: 'Sheffield', cy: 'South Yorkshire', pc: 'S1 4AA', email: 'lidia.balan@example.com', tel: '07700 900271', restr: false },
    mc: [] },

  { id: 28, caseRef: '28001901O', remoRef: '2017/REMO/28001901',
    status: 'Suspended', bu: 'Exeter', arrears: '£720.00', ct: 'REMO Out', dolm: '17 April 2026',
    r: { ln: 'MOROZ', fn: 'Anton', ti: 'Mr', dob: '14 July 1967 (Age 58)', ni: 'KL 90 12 34 C', a1: '22 Paris Street', city: 'Exeter', cy: 'Devon', pc: 'EX1 1AA', email: 'anton.moroz@example.com', tel: '07700 900280', restr: false },
    a: { id: 118, ln: 'LEBED', fn: 'Nadia', ti: 'Mrs', dob: '4 January 1970 (Age 56)', payout: '£0.00', a1: '7 Queen Street', city: 'Exeter', cy: 'Devon', pc: 'EX4 3AA', email: 'nadia.lebed@example.com', tel: '07700 900281', restr: false },
    mc: [{ id: 212, ln: 'MOROZ', fn: 'Sofia', dob: '4 June 2018 (Age 7)', payout: '£0.00' }] },

  { id: 29, caseRef: '29002001P', remoRef: '2012/REMO/29002001',
    status: 'Active', bu: 'Bury St. Edmunds', arrears: '£60.00', ct: 'REMO In', dolm: '11 May 2026',
    r: { ln: 'SHEVCHENKO', fn: 'Mykola', ti: 'Mr', dob: '1 December 1982 (Age 43)', ni: 'MN 01 23 45 D', a1: '9 Cornhill', city: 'Bury St. Edmunds', cy: 'Suffolk', pc: 'IP33 3AA', email: 'mykola.shevchenko@example.com', tel: '07700 900290', restr: false },
    a: { id: 119, ln: 'BONDAR', fn: 'Oksana', ti: 'Mrs', dob: '27 August 1976 (Age 49)', payout: '£0.00', a1: '28 Risbygate Street', city: 'Bury St. Edmunds', cy: 'Suffolk', pc: 'IP33 4AA', email: 'oksana.bondar@example.com', tel: '07700 900291', restr: false },
    mc: [] },

  { id: 30, caseRef: '30002101Q', remoRef: '2018/REMO/30002101',
    status: 'Active', bu: 'Reading', arrears: '£0.00', ct: 'REMO Out', dolm: '19 April 2026',
    r: { ln: 'GULYAS', fn: 'Bence', ti: 'Mr', dob: '27 May 1973 (Age 53)', ni: 'OP 12 34 56 A', a1: '17 Kings Road', city: 'Reading', cy: 'Berkshire', pc: 'RG1 5AA', email: 'bence.gulyas@example.com', tel: '07700 900300', restr: false },
    a: { id: 120, ln: 'NAGY', fn: 'Klara', ti: 'Mrs', dob: '13 April 1980 (Age 46)', payout: '£0.00', a1: '4 Forbury Road', city: 'Reading', cy: 'Berkshire', pc: 'RG1 6AA', email: 'klara.nagy@example.com', tel: '07700 900301', restr: false },
    mc: [] },

  { id: 31, caseRef: '31002201R', remoRef: '2014/REMO/31002201',
    status: 'Active', bu: 'Bristol', arrears: '£200.00', ct: 'REMO In', dolm: '10 May 2026',
    r: { ln: 'KRAWCZYK', fn: 'Tadeusz', ti: 'Mr', dob: '8 January 1969 (Age 57)', ni: 'QR 23 45 67 B', a1: '5 Redcliff Street', city: 'Bristol', cy: 'City of Bristol', pc: 'BS1 4AA', email: 'tadeusz.krawczyk@example.com', tel: '07700 900310', restr: false },
    a: { id: 121, ln: 'WOJCIK', fn: 'Alicja', ti: 'Mrs', dob: '29 October 1986 (Age 39)', payout: '£0.00', a1: '12 Victoria Street', city: 'Bristol', cy: 'City of Bristol', pc: 'BS1 5AA', email: 'alicja.wojcik@example.com', tel: '07700 900311', restr: false },
    mc: [{ id: 213, ln: 'KRAWCZYK', fn: 'Filip', dob: '30 October 2013 (Age 12)', payout: '£0.00' }] },

  { id: 32, caseRef: '32002301S', remoRef: '2016/REMO/32002301',
    status: 'Inactive', bu: 'Birmingham', arrears: '£0.00', ct: 'REMO Out', dolm: '21 April 2026',
    r: { ln: 'SZABO', fn: 'Laszlo', ti: 'Mr', dob: '15 November 1976 (Age 49)', ni: 'ST 34 56 78 C', a1: '14 Snow Hill', city: 'Birmingham', cy: 'West Midlands', pc: 'B4 1AA', email: 'laszlo.szabo@example.com', tel: '07700 900320', restr: false },
    a: { id: 122, ln: 'FARKAS', fn: 'Reka', ti: 'Mrs', dob: '11 March 1974 (Age 52)', payout: '£0.00', a1: '28 Temple Row', city: 'Birmingham', cy: 'West Midlands', pc: 'B2 3AA', email: 'reka.farkas@example.com', tel: '07700 900321', restr: false },
    mc: [] },

  { id: 33, caseRef: '33002401T', remoRef: '2013/REMO/33002401',
    status: 'Active', bu: 'London', arrears: '£300.00', ct: 'REMO In', dolm: '12 May 2026',
    r: { ln: 'KARPOV', fn: 'Oleg', ti: 'Mr', dob: '3 April 1984 (Age 42)', ni: 'UV 45 67 89 D', a1: '9 Cheapside', city: 'London', cy: null, pc: 'EC2V 1AA', email: 'oleg.karpov@example.com', tel: '07700 900330', restr: false },
    a: { id: 123, ln: 'MIKHAILOVA', fn: 'Vera', ti: 'Mrs', dob: '25 July 1982 (Age 43)', payout: '£0.00', a1: '21 Old Bailey', city: 'London', cy: null, pc: 'EC4M 1AA', email: 'vera.mikhailova@example.com', tel: '07700 900331', restr: false },
    mc: [
      { id: 214, ln: 'KARPOV', fn: 'Masha', dob: '15 March 2012 (Age 14)', payout: '£0.00' },
      { id: 215, ln: 'KARPOV', fn: 'Lev', dob: '8 November 2015 (Age 10)', payout: '£0.00' }
    ] },

  { id: 34, caseRef: '34002501U', remoRef: '2015/REMO/34002501',
    status: 'Active', bu: 'Manchester', arrears: '£0.00', ct: 'REMO Out', dolm: '23 April 2026',
    r: { ln: 'BOGDANOV', fn: 'Yuri', ti: 'Mr', dob: '19 September 1971 (Age 54)', ni: 'WX 56 78 90 A', a1: '33 Piccadilly', city: 'Manchester', cy: 'Greater Manchester', pc: 'M1 3AA', email: 'yuri.bogdanov@example.com', tel: '07700 900340', restr: false },
    a: { id: 124, ln: 'KUZNETSOVA', fn: 'Galina', ti: 'Mrs', dob: '6 December 1978 (Age 47)', payout: '£0.00', a1: "11 St Ann's Square", city: 'Manchester', cy: 'Greater Manchester', pc: 'M2 1AA', email: 'galina.kuznetsova@example.com', tel: '07700 900341', restr: false },
    mc: [] },

  { id: 35, caseRef: '35002601V', remoRef: '2017/REMO/35002601',
    status: 'Suspended', bu: 'Leeds', arrears: '£880.00', ct: 'REMO In', dolm: '13 May 2026',
    r: { ln: 'STOJANOV', fn: 'Dragan', ti: 'Mr', dob: '12 March 1963 (Age 63)', ni: 'YZ 67 89 01 B', a1: '6 Cookridge Street', city: 'Leeds', cy: 'West Yorkshire', pc: 'LS2 1AA', email: 'dragan.stojanov@example.com', tel: '07700 900350', restr: false },
    a: { id: 125, ln: 'MILENKOVIC', fn: 'Jelena', ti: 'Mrs', dob: '18 September 1966 (Age 59)', payout: '£0.00', a1: '20 Bond Street', city: 'Leeds', cy: 'West Yorkshire', pc: 'LS1 5AA', email: 'jelena.milenkovic@example.com', tel: '07700 900351', restr: false },
    mc: [] },

  { id: 36, caseRef: '36002701W', remoRef: '2012/REMO/36002701',
    status: 'Active', bu: 'Newcastle', arrears: '£140.00', ct: 'REMO Out', dolm: '26 April 2026',
    r: { ln: 'KOVALENKO', fn: 'Dmytro', ti: 'Mr', dob: '6 August 1975 (Age 50)', ni: 'AB 78 90 12 C', a1: '12 Quayside', city: 'Newcastle upon Tyne', cy: 'Tyne and Wear', pc: 'NE1 5AA', email: 'dmytro.kovalenko@example.com', tel: '07700 900360', restr: false },
    a: { id: 126, ln: 'TKACHENKO', fn: 'Olena', ti: 'Mrs', dob: '2 May 1983 (Age 42)', payout: '£0.00', a1: '5 Sandyford Road', city: 'Newcastle upon Tyne', cy: 'Tyne and Wear', pc: 'NE1 6AA', email: 'olena.tkachenko@example.com', tel: '07700 900361', restr: false },
    mc: [{ id: 216, ln: 'KOVALENKO', fn: 'Marta', dob: '27 August 2017 (Age 8)', payout: '£0.00' }] },

  { id: 37, caseRef: '37002801X', remoRef: '2018/REMO/37002801',
    status: 'Active', bu: 'Sheffield', arrears: '£0.00', ct: 'REMO In', dolm: '1 May 2026',
    r: { ln: 'LUKIC', fn: 'Nikola', ti: 'Mr', dob: '24 July 1987 (Age 38)', ni: 'CD 89 01 23 D', a1: '7 Surrey Street', city: 'Sheffield', cy: 'South Yorkshire', pc: 'S1 5AA', email: 'nikola.lukic@example.com', tel: '07700 900370', restr: false },
    a: { id: 127, ln: 'PAVIC', fn: 'Ivana', ti: 'Mrs', dob: '10 January 1990 (Age 36)', payout: '£0.00', a1: '19 Division Street', city: 'Sheffield', cy: 'South Yorkshire', pc: 'S1 6AA', email: 'ivana.pavic@example.com', tel: '07700 900371', restr: false },
    mc: [] },

  { id: 38, caseRef: '38002901Y', remoRef: '2014/REMO/38002901',
    status: 'Active', bu: 'Exeter', arrears: '£260.00', ct: 'REMO Out', dolm: '27 April 2026',
    r: { ln: 'BLAZEK', fn: 'Radek', ti: 'Mr', dob: '31 October 1979 (Age 46)', ni: 'EF 90 12 34 A', a1: '3 Heavitree Road', city: 'Exeter', cy: 'Devon', pc: 'EX1 2AA', email: 'radek.blazek@example.com', tel: '07700 900380', restr: false },
    a: { id: 128, ln: 'MALIKOVA', fn: 'Zuzana', ti: 'Mrs', dob: '23 November 1975 (Age 50)', payout: '£0.00', a1: '15 Cowick Street', city: 'Exeter', cy: 'Devon', pc: 'EX4 4AA', email: 'zuzana.malikova@example.com', tel: '07700 900381', restr: false },
    mc: [] },

  { id: 39, caseRef: '39003001A', remoRef: '2016/REMO/39003001',
    status: 'Active', bu: 'Bury St. Edmunds', arrears: '£0.00', ct: 'REMO In', dolm: '29 April 2026',
    r: { ln: 'MIHAILOV', fn: 'Georgi', ti: 'Mr', dob: '17 February 1965 (Age 61)', ni: 'GH 01 23 45 B', a1: '8 Northgate Street', city: 'Bury St. Edmunds', cy: 'Suffolk', pc: 'IP33 5AA', email: 'georgi.mihailov@example.com', tel: '07700 900390', restr: false },
    a: { id: 129, ln: 'STOYANOVA', fn: 'Milena', ti: 'Mrs', dob: '7 August 1968 (Age 57)', payout: '£0.00', a1: '3 Churchgate Street', city: 'Bury St. Edmunds', cy: 'Suffolk', pc: 'IP33 6AA', email: 'milena.stoyanova@example.com', tel: '07700 900391', restr: false },
    mc: [] }
]

// Populate activeCases and minorCreditorAccounts from searchData
searchData.forEach((d) => {
  const rAddr = makePcAddr(d.r.a1, d.r.city, d.r.cy, d.r.pc)
  const aAddr = makePcAddr(d.a.a1, d.a.city, d.a.cy, d.a.pc)
  const rName = `${d.r.ti} ${d.r.fn} ${d.r.ln}`
  const aName = `${d.a.ti} ${d.a.fn} ${d.a.ln}`
  const rDob  = d.r.dob.replace(/ \(Age \d+\)/, '')

  if (!activeCases[d.id]) {
    activeCases[d.id] = {
      accountNumber: accountRef(d.id, 'RP'),
      caseReference: d.caseRef, respondentName: rName, applicantName: aName,
      caseType: d.ct, remoReference: d.remoRef, businessUnit: d.bu,
      dateOfLastMovement: d.dolm, arrears: d.arrears,
      respondent: {
        name: rName, title: d.r.ti, firstNames: d.r.fn, lastName: d.r.ln,
        dateOfBirth: rDob, nationalInsuranceNumber: d.r.ni,
        otherPersonalInformation: null,
        mainEmail: d.r.email, otherEmail: null,
        mainTelephone: d.r.tel, otherTelephone: null,
        address: rAddr, restricted: d.r.restr, restrictionReason: null, thirdParty: null
      },
      applicant: {
        name: aName, dateOfBirth: d.a.dob,
        restricted: d.a.restr,
        accountNumber: accountRef(d.a.id, 'AP'),
        accountHref: `/active-case/creditor/${d.a.id}`
      },
      comment: null
    }
  }

  if (!minorCreditorAccounts[d.a.id]) {
    minorCreditorAccounts[d.a.id] = {
      type: 'applicant', caseReference: d.caseRef, accountNumber: accountRef(d.a.id, 'AP'), name: aName,
      title: d.a.ti, firstNames: d.a.fn, lastName: d.a.ln,
      awaitingPayout: d.a.payout, businessUnit: d.bu, dateOfBirth: d.a.dob,
      address: aAddr, mainEmail: d.a.email, otherEmail: null,
      mainTelephone: d.a.tel, otherTelephone: null,
      respondentAccountHref: `/active-case/${d.id}`, respondentName: rName,
      respondentAccountNumber: accountRef(d.id, 'RP'),
      restricted: d.a.restr
    }
  }

  d.mc.forEach((mc) => {
    if (!minorCreditorAccounts[mc.id]) {
      const mcAddr = makePcAddr(d.r.a1, d.r.city, d.r.cy, d.r.pc)
      minorCreditorAccounts[mc.id] = {
        type: 'creditor', caseReference: d.caseRef, accountNumber: accountRef(mc.id, 'MC'),
        name: `${mc.fn} ${mc.ln}`, firstNames: mc.fn, lastName: mc.ln,
        awaitingPayout: mc.payout, businessUnit: d.bu, dateOfBirth: mc.dob,
        address: mcAddr, mainEmail: null, otherEmail: null,
        mainTelephone: null, otherTelephone: null,
        respondentAccountHref: `/active-case/${d.id}`, respondentName: rName,
        respondentAccountNumber: accountRef(d.id, 'RP'),
        restricted: false
      }
    }
  })
})

function performSearch(params) {
  const { accountNumber, referenceNumber,
    respondentLastName, respondentDateOfBirth, respondentFirstNames,
    respondentAddress, respondentPostcode,
    applicantLastName, applicantDateOfBirth, applicantFirstNames,
    applicantAddress, applicantPostcode,
    minorType, minorLastName, minorFirstNames,
    minorAddress, minorPostcode, minorCompany, minorCompanyExact,
    majorCreditor,
    minorCompanyAddress, minorCompanyPostcode, activeOnly } = params

  function m(haystack, needle, exact) {
    if (!needle) return true
    const h = normaliseSearchText(haystack)
    const n = normaliseSearchText(needle)
    return exact === 'yes' ? h === n : h.includes(n)
  }

  function compactMatch(haystack, needle) {
    if (!needle) return true
    return normaliseCompactSearchText(haystack).includes(normaliseCompactSearchText(needle))
  }

  function dateMatch(haystack, needle) {
    if (!needle) return true
    return normaliseDateSearchText(haystack) === normaliseDateSearchText(needle)
  }

  return searchData.filter((c) => {
    if (activeOnly && c.status !== 'Active') return false

    if (accountNumber) {
      const accountNumbers = [
        accountRef(c.id, 'RP'),
        accountRef(c.a.id, 'AP'),
        ...c.mc.map((mc) => accountRef(mc.id, 'MC')),
        ...getCaseMajorCreditorAccounts(c.caseRef).map((account) => account.accountNumber)
      ].map(normaliseCompactSearchText)

      if (!accountNumbers.includes(normaliseCompactSearchText(accountNumber))) return false
    }

    if (referenceNumber) {
      if (
        !compactMatch(c.remoRef, referenceNumber) &&
        !compactMatch(c.caseRef, referenceNumber)
      ) {
        return false
      }
    }

    if (respondentLastName || respondentFirstNames || respondentDateOfBirth || respondentAddress || respondentPostcode) {
      if (!m(c.r.ln, respondentLastName)) return false
      if (!m(c.r.fn, respondentFirstNames)) return false
      if (!dateMatch(c.r.dob, respondentDateOfBirth)) return false
      if (!m(c.r.a1, respondentAddress)) return false
      if (!compactMatch(c.r.pc, respondentPostcode)) return false
    }

    if (applicantLastName || applicantFirstNames || applicantDateOfBirth || applicantAddress || applicantPostcode) {
      if (!m(c.a.ln, applicantLastName)) return false
      if (!m(c.a.fn, applicantFirstNames)) return false
      if (!dateMatch(c.a.dob, applicantDateOfBirth)) return false
      if (!m(c.a.a1, applicantAddress)) return false
      if (!compactMatch(c.a.pc, applicantPostcode)) return false
    }

    const isMinorSearch = minorLastName || minorFirstNames || minorAddress || minorPostcode || minorCompany
    if (isMinorSearch && c.mc.length === 0) return false
    if (isMinorSearch) {
      const hasMatch = c.mc.some((mc) => {
        if (minorType === 'company') {
          if (!m(mc.companyName, minorCompany, minorCompanyExact)) return false
          if (!m(mc.a1 || c.r.a1, minorCompanyAddress)) return false
          if (!compactMatch(mc.pc || c.r.pc, minorCompanyPostcode)) return false
        } else {
          if (!m(mc.ln, minorLastName)) return false
          if (!m(mc.fn, minorFirstNames)) return false
          if (!m(mc.a1 || c.r.a1, minorAddress)) return false
          if (!compactMatch(mc.pc || c.r.pc, minorPostcode)) return false
        }
        return true
      })
      if (!hasMatch) return false
    }

    if (majorCreditor) {
      const hasMajorCreditor = getCaseMajorCreditorAccounts(c.caseRef).some(
        (account) => account.majorCreditorCode === majorCreditor
      )
      if (!hasMajorCreditor) return false
    }

    return true
  })
}

function accountRef(id, prefix) {
  return prefix + String(id).padStart(6, '0')
}

function mapSearchRows(results) {
  const buildSearchAccountHtml = (href, accountNumber, partyName) =>
    `<a class="govuk-link" href="${escapeHtml(href)}">${escapeHtml(accountNumber)}</a><br>${escapeHtml(partyName)}`

  return results.map((c) => {
    const rLabel = `${c.r.ln}, ${c.r.fn}`
    const aLabel = `${c.a.ln}, ${c.a.fn}`
    const rRef   = accountRef(c.id, 'RP')
    const aRef   = accountRef(c.a.id, 'AP')
    const minorCreditorLinks = c.mc.map((mc) => {
      const mcRef = accountRef(mc.id, 'MC')
      return buildSearchAccountHtml(`/active-case/creditor/${mc.id}`, mcRef, `${mc.ln}, ${mc.fn}`)
    })
    const minorCreditorHtml = minorCreditorLinks.length ? minorCreditorLinks.join('<br>') : '–'

    return [
      { html: buildSearchAccountHtml(`/active-case/${c.id}`, rRef, rLabel), text: rRef },
      { html: buildSearchAccountHtml(`/active-case/creditor/${c.a.id}`, aRef, aLabel) },
      { html: minorCreditorHtml },
      { text: c.status },
      { text: c.arrears }
    ]
  })
}

router.get('/search', (req, res) => {
  return res.render('search/index', getSearchViewData())
})

router.post('/search', (req, res, next) => {
  const b = req.body
  const get = (k) => (b[k] || '').trim()

  const accountNumber = get('account-number')
  const referenceNumber = get('reference-number')
  const rLn = get('respondent-last-name')
  const rFn = get('respondent-first-names')
  const rDob = get('respondent-date-of-birth')
  const rA1 = get('respondent-address-line-1')
  const rPc = get('respondent-postcode')
  const aLn = get('applicant-last-name')
  const aFn = get('applicant-first-names')
  const aDob = get('applicant-date-of-birth')
  const aA1 = get('applicant-address-line-1')
  const aPc = get('applicant-postcode')
  const mcType = get('minor-creditor-type')
  const mcLn  = get('minor-creditor-last-name')
  const mcFn  = get('minor-creditor-first-names')
  const mcA1  = get('minor-creditor-address-line-1')
  const mcPc  = get('minor-creditor-postcode')
  const mcCo  = get('minor-creditor-company-name')
  const mcCoA1 = get('minor-creditor-company-address-line-1')
  const mcCoPc = get('minor-creditor-company-postcode')
  const majorCreditor = get('major-creditor')
  const activeOnly = b['active-accounts-only'] === 'yes'

  const hasQuick = !!(accountNumber || referenceNumber)
  const hasAdv   = !!(rLn || rFn || rDob || rA1 || rPc || aLn || aFn || aDob || aA1 || aPc || mcLn || mcFn || mcA1 || mcPc || mcCo || mcCoA1 || mcCoPc || majorCreditor)
  const hasAdvancedSearchFieldsOtherThanMajorCreditor = !!(rLn || rFn || rDob || rA1 || rPc || aLn || aFn || aDob || aA1 || aPc || mcLn || mcFn || mcA1 || mcPc || mcCo || mcCoA1 || mcCoPc)

  if (hasQuick && hasAdv) return res.redirect('/search/conflicting-criteria')
  if (!hasQuick && !hasAdv) return res.redirect('/search')

  if (majorCreditor && !hasAdvancedSearchFieldsOtherThanMajorCreditor) {
    const account = getMajorCreditorAccountByCode(majorCreditor)
    if (!account) return res.redirect('/search/no-results')

    return redirectWithSessionSave(req, res, next, `/active-case/major-creditor/${account.id}`)
  }

  const results = performSearch({
    accountNumber, referenceNumber,
    respondentLastName: rLn,
    respondentFirstNames: rFn,
    respondentDateOfBirth: rDob,
    respondentAddress: rA1, respondentPostcode: rPc,
    applicantLastName: aLn,
    applicantFirstNames: aFn,
    applicantDateOfBirth: aDob,
    applicantAddress: aA1, applicantPostcode: aPc,
    minorType: mcType,
    minorLastName: mcLn,
    minorFirstNames: mcFn,
    minorAddress: mcA1, minorPostcode: mcPc,
    minorCompany: mcCo, minorCompanyExact: b['minor-creditor-company-name-exact'],
    minorCompanyAddress: mcCoA1, minorCompanyPostcode: mcCoPc,
    majorCreditor,
    activeOnly
  })

  if (results.length === 0) return res.redirect('/search/no-results')
  if (results.length > 100) return res.redirect('/search/too-many-results')

  req.session.data = req.session.data || {}
  req.session.data.searchResults = mapSearchRows(results)

  return redirectWithSessionSave(req, res, next, '/search/results')
})

router.get('/search/conflicting-criteria', (req, res) => res.render('search/conflicting-criteria'))
router.get('/search/no-results',           (req, res) => res.render('search/no-results'))
router.get('/search/too-many-results',     (req, res) => res.render('search/too-many-results'))

router.get('/search/results', (req, res) => {
  const allResults = (req.session.data && req.session.data.searchResults) || []
  const total   = allResults.length
  const page    = Math.max(1, parseInt(req.query.page || '1', 10))
  const perPage = 25
  const from    = (page - 1) * perPage + 1
  const to      = Math.min(page * perPage, total)
  const pageCount = Math.ceil(total / perPage)
  const pageRows  = allResults.slice((page - 1) * perPage, page * perPage)

  const paginationItems = []
  for (let i = 1; i <= pageCount; i++) {
    paginationItems.push({ number: i, href: '/search/results?page=' + i, current: i === page })
  }

  return res.render('search/results', {
    results: pageRows,
    hasPagination: pageCount > 1,
    pagination: { items: paginationItems, results: { from, to, count: total } }
  })
})
