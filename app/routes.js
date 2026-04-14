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

const caseEnquiryRecords = [
  {
    id: 'order-case',
    caseReference: 'RC0002-10458',
    respondentHeading: 'Mr John MALIK',
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
        ['Name', 'Mr John MALIK'],
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
          ['First names', 'John'],
          ['Last name', 'Malik'],
          ['Date of birth', '10 Aug 1984'],
          ['National Insurance number', 'QQ 12 34 56 C']
        ]
      },
      {
        title: 'Contact details',
        rows: [
          ['Main email address', 'john.malik@example.test'],
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
      ['Application code', 'EA0002'],
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
        ['Application code', 'RC0001'],
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
      ['Application code', 'RC0001'],
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

function buildCreateDataScenarios() {
  return {
    'main-application': {
      label: 'Orders and applications: application journey',
      description: 'Seeds the main journey with applicant, respondent, central authority, application and hearing details.',
      redirectTo: '/orders-applications/case-details',
      sessionData: {
        ...buildBaseSessionData(),
        'case-type': 'remo-in',
        'applicant-type': 'individual',
        'has-order': 'no',
        'applicant-title': 'ms',
        'applicant-first-names': 'Anna Maria',
        'applicant-last-name': 'Korhonen',
        'applicant-date-of-birth': '14/02/1986',
        'applicant-main-email-address': 'anna.korhonen@example.test',
        'applicant-main-telephone-number': '+35840111222',
        'applicant-address-line-1': '12 Market Square',
        'applicant-address-line-2': 'Helsinki',
        'applicant-postal-or-zip-code': '00100',
        'applicant-country': 'finland',
        'applicant-bank-account-type': 'non-uk-bank-account',
        'applicant-bank-non-uk-name-on-account': 'Anna Korhonen',
        'applicant-bank-bic-or-swift-code': 'NDEAFIHH',
        'applicant-bank-iban': 'FI2112345600000785',
        'respondent-title': 'mr',
        'respondent-first-names': 'David',
        'respondent-last-name': 'Smith',
        'respondent-date-of-birth': '09/07/1983',
        'respondent-main-email-address': 'david.smith@example.test',
        'respondent-main-telephone-number': '+447700900123',
        'respondent-address-line-1': '99 High Street',
        'respondent-address-line-2': 'Reading',
        'respondent-postal-or-zip-code': 'RG1 9RT',
        'respondent-country': 'united-kingdom',
        'central-authority-name': 'Finnish Central Authority',
        'central-authority-reference': 'FI-CA-20485',
        'application-code': 'RC0001',
        'application-foreign-court': 'District Court of Helsinki',
        'application-order-date': '12/03/2025',
        'hearing-type': 'non-scheduled',
        'hearing-date': '18/03/2025',
        'hearing-non-scheduled-details': 'Remote hearing listed by the central authority',
        'applicant-details-completed': 'yes',
        'respondent-details-completed': 'yes',
        'central-authority-details-completed': 'yes',
        'application-details-completed': 'yes',
        'hearing-details-completed': 'yes'
      }
    },
    'alternative-order': {
      label: 'Orders and applications (alternative): order journey',
      description: 'Seeds the alternative journey with an organisation applicant, order details, an order term, and interest/indexation.',
      redirectTo: '/orders-applications-alternative/case-details',
      sessionData: {
        ...buildBaseSessionData(),
        'orders-applications-alternative': {
          'case-type': 'remo-out',
          'applicant-type': 'organisation',
          'has-order': 'yes',
          'applicant-organisation-name': 'Uzturldizeklu garantiju fonda administracija',
          'applicant-foreign-authority-reference': 'CXD-2736549-PL',
          'applicant-main-email-address': 'maintenance@kela.fi',
          'applicant-main-telephone-number': '+358401234567',
          'applicant-address-line-1': 'Perintakeskus, PL 50',
          'applicant-address-line-2': 'Helsinki',
          'applicant-postal-or-zip-code': '00601',
          'applicant-country': 'finland',
          'applicant-bank-account-type': 'non-uk-bank-account',
          'applicant-bank-non-uk-name-on-account': 'Maintenance Recovery Unit',
          'applicant-bank-bic-or-swift-code': 'NDEAFIHH',
          'applicant-bank-iban': 'FI2112345600000785',
          'respondent-title': 'mr',
          'respondent-first-names': 'John',
          'respondent-last-name': 'Malik',
          'respondent-date-of-birth': '10/08/1984',
          'respondent-address-line-1': '24 High Street',
          'respondent-address-line-2': 'Twyford',
          'respondent-postal-or-zip-code': 'RG10 9RT',
          'respondent-country': 'united-kingdom',
          'order-application-code': 'EA0002',
          'order-court-that-made-the-order': 'Sąd Okręgowy w Warszawie',
          'order-date-order-made': '12/01/2025',
          'order-date-arrears-last-updated': '09/01/2025',
          'entered-order-terms': [
            {
              code: 'MAT',
              title: 'Matrimonial Order for Adult',
              category: 'FINAL',
              categoryLabel: 'Final',
              wording: 'Order for payment by John Malik to Applicant payable through the Court for the benefit of the Complainant. The sum of £250.00 to be paid every month from 01 Jan 2025 until 01 Jan 2026.',
              responses: {
                amount: '250',
                frequency: 'month',
                expiry: '01/01/2026',
                arrears: '100',
                creditor: 'applicant',
                respondent: 'John Malik',
                payment: 'payable through the Court',
                commencement: '01/01/2025'
              },
              creditor: 'applicant',
              creditorLabel: 'Applicant'
            }
          ],
          'interest-and-indexation-completed': 'yes',
          'interest-applies': 'yes',
          'indexation-type': 'retain-liability-order',
          'case-comment': 'Scenario data for testing order flow',
          'applicant-details-completed': 'yes',
          'respondent-details-completed': 'yes',
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
        'applicant-title': 'ms',
        'applicant-first-names': 'Patricia',
        'applicant-last-name': 'Arket',
        'applicant-main-email-address': 'patricia.arket@example.test',
        'applicant-main-telephone-number': '+447700900124',
        'applicant-address-line-1': '15 North Road',
        'applicant-address-line-2': 'Leeds',
        'applicant-postal-or-zip-code': 'LS1 4AB',
        'applicant-country': 'united-kingdom',
        'applicant-bank-account-type': 'uk-bank-account',
        'respondent-title': 'mr',
        'respondent-first-names': 'Edward',
        'respondent-last-name': 'Fisher',
        'respondent-date-of-birth': '23/06/2002',
        'respondent-address-line-1': '99 High Street',
        'respondent-address-line-2': 'Reading',
        'respondent-postal-or-zip-code': 'RG10 9RT',
        'respondent-country': 'united-kingdom',
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
            wording: 'Temporary order for payment by Edward Fisher to Applicant. Pending review.',
            responses: {
              creditor: 'Applicant',
              respondent: 'Edward Fisher',
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

const applicationDefinitionList = [
  {
    code: 'RC0001',
    title: 'Applications for a Provisional Order to be confirmed',
    act: '(Reciprocating Countries) Section 7 Maintenance Orders (Reciprocal Enforcement) Act 1972'
  },
  {
    code: 'EA0001',
    title: 'Applications for a Provisional Order to be confirmed',
    act: '(EA Countries) Section 4 Maintenance Orders (Facilities for Enforcement) Act 1920'
  },
  {
    code: 'UC0001',
    title: 'Application for a Final Order to be made',
    act: '(UN Convention Countries) Part 2 Maintenance Orders (Reciprocal Enforcement) Act 1972'
  },
  {
    code: 'HC0001',
    title: 'Applications for a Final Order to be made',
    act: 'Claim for Maintenance under Articles 10 and 11 - Hague Convention 2007'
  },
  {
    code: 'CA0001',
    title:
      'Application under schedule 1 Children Act 1989 or the Domestic Proceedings and Magistrates Courts Act 1978',
    act:
      'Application under schedule 1 Children Act 1989 or the Domestic Proceedings and Magistrates Courts Act 1978, applying jurisdictional provisions in this legislation'
  },
  {
    code: 'RC0002',
    title: 'Application for registration or recognition of a foreign order in the UK Family Court',
    act: "Reciprocating Countries' Part 1 Maintenance Orders (Reciprocal Enforcement) Act 1972"
  },
  {
    code: 'MO0001',
    title: 'Application for registration or recognition of a foreign court order in the UK Family Court',
    act:
      'Part 1 of the Maintenance Orders (Reciprocal Enforcement) Act 1972 as modified by the Reciprocal Enforcement Orders (Hague Convention Countries) Order 1993'
  },
  {
    code: 'CJ0001',
    title:
      'Application from non-EU Country for registration or recognition of an order in the UK Family Court',
    act:
      'Civil Jurisdiction and Judgements Act 1982, Hague Convention 2007 and International Recovery of Maintenance Regulations 2012 as applies to non EU countries'
  },
  {
    code: 'CJ0002',
    title: 'Application from EU Country for registration or recognition of an order in the family court',
    act:
      'Civil Jurisdiction and Judgements Act 1982, Hague Convention 2007 and International Recovery of Maintenance Regulations 2012 as applied to EU countries'
  },
  {
    code: 'EU0001',
    title: 'Application from EU Country for registration or recognition of an order in the family court',
    act:
      'EU Reg 04/2009 Forms, Civil Jurisdiction and Judgements Act 1982, Hague Convention 2007 and International Recovery of Maintenance Regulations 2012 as applied to EU countries'
  },
  {
    code: 'EA0002',
    title: 'Application for registration of a foreign order in the UK Family Court',
    act: '(EA Countries) Maintenance Orders (Facilities for Enforcement) Act 1920'
  },
  {
    code: 'UC0002',
    title: 'Countries able to send applications to the Family Court under the UN Convention',
    act:
      'Applications to the Family Court under the UN Convention (Part 2 Maintenance Orders (Reciprocal Enforcement) Act 1972)'
  },
  {
    code: 'US0001',
    title: 'Application for registration of a USA Order in the UK Family Court',
    act:
      'Maintenance Orders (Reciprocal Enforcement) Act 1972 as modified by the Reciprocal Enforcement of Maintenance (United States of America Orders 1995 and 2007)'
  },
  {
    code: 'OU0001',
    title: 'Application to register a Scottish or Northern Ireland order in the Family Court',
    act:
      'Other UK Jurisdictions (Maintenance Orders Act 1950 and Part 32 Chapter II of the Family Proceedings Rules 2010)'
  },
  {
    code: 'MO0002',
    title:
      'Enforcement of orders made by the High Court or registered in the High Court in the Family Court',
    act: 'Maintenance Orders Act 1958, Part 32 Chapter III of the Family Procedure Rules'
  },
  {
    code: 'EW0001',
    title: 'UK Residents - Applications where both parties reside in England or Wales',
    act:
      'England and Wales orders made payable to HMCTS by a District Judge and foreign orders from European and H07 countries where the parties now live in England and Wales'
  },
  {
    code: 'RC0003',
    title: 'Application for a Provisional Order to be made in the UK and confirmed abroad',
    act: '(Reciprocating Country) Section 3 Maintenance Orders (Reciprocal Enforcement) Act 1972'
  },
  {
    code: 'EA0003',
    title: 'Application for a Provisional Order to be made in the UK and confirmed abroad',
    act: '(EA Countries) Section 3 Maintenance Orders (Facilities for Enforcement) Act 1920'
  },
  {
    code: 'UC0003',
    title: 'Application for documents to be signed and sworn for an order to be made abroad',
    act: '(UN Convention Countries) Part 2 Maintenance Orders Reciprocal Enforcement Act 1972'
  },
  {
    code: 'HC0002',
    title: 'Application for an order to be made abroad',
    act: 'Countries reciprocating with the UK under Hague Convention 2007'
  },
  {
    code: 'HC0003',
    title: 'Application for a Final Order to be made in RCJ Countries',
    act:
      'Table 4 (Hague Convention Countries) Section 3 Maintenance Orders (Reciprocal Enforcement) Act as modified by the Reciprocal Enforcement Orders (Hague Convention Countries) Order 1993'
  },
  {
    code: 'HC0004',
    title: 'FCDO Countries as per FAM Court Index - Table 4',
    act:
      'Table 4 (Hague Convention Countries) Section 3 Maintenance Orders (Reciprocal Enforcement) Act as modified by the Reciprocal Enforcement Orders (Hague Convention Countries) Order 1993'
  },
  {
    code: 'HC0005',
    title: 'All Agent Countries as per the FAM Court Index Table 4',
    act:
      'Table 4 (Hague Convention Countries) Section 3 Maintenance Orders (Reciprocal Enforcement) Act as modified by the Reciprocal Enforcement Orders (Hague Convention Countries) Order 1993'
  },
  {
    code: 'CW0001',
    title: 'Application under Commonwealth Act 1920',
    act: 'Commonwealth Act 1920'
  },
  {
    code: 'UN0001',
    title: 'Application under United Nations 1956',
    act: 'United Nations 1956, sometimes called the New York Convention 1956'
  },
  {
    code: 'HC0006',
    title: 'Application under Hague Convention 2007',
    act: 'Hague Convention 2007'
  },
  {
    code: 'HC0007',
    title: 'Application under Hague Convention 1973',
    act: 'Hague Convention 1973'
  },
  {
    code: 'US0002',
    title: 'Application under USA Part I and II',
    act: 'USA Part I and II'
  },
  {
    code: 'CA0002',
    title: 'Application under UK Children Act 1989',
    act: 'Children Act 1989'
  },
  {
    code: 'WA0001',
    title: 'Application under Withdrawal Agreement',
    act: 'Withdrawal Agreement (WAC)'
  },
  {
    code: 'LU0001',
    title: 'Application under Lugano Convention',
    act: 'Lugano Convention'
  },
  {
    code: 'RE0001',
    title: 'Application under Reciprocal Maintenance Act 1972',
    act: 'Reciprocal Enforcement Act 1972'
  }
]

const applicationDefinitions = Object.fromEntries(
  applicationDefinitionList.map((definition) => [
    definition.code,
    {
      ...definition,
      wordingTemplate: `Application to progress under ${definition.act}, relating to an order made by {{foreignCourt}} on {{orderDate}}.`
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
  return applicationDefinitions[String(getSingleValue(applicationCode) || '').trim().toUpperCase()] || null
}

function getApplicationOptionItems(selectedApplicationCode) {
  const selectedCode = String(getSingleValue(selectedApplicationCode) || '')
    .trim()
    .toUpperCase()

  return applicationDefinitionList.map((definition) => ({
    text: `${definition.code} - ${definition.title}`,
    value: definition.code,
    selected: definition.code === selectedCode
  }))
}

function getApplicationLookupJson() {
  return JSON.stringify(
    Object.fromEntries(
      applicationDefinitionList.map((definition) => [definition.code, definition.title])
    )
  )
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
  if (sessionData['applicant-type'] === 'organisation') {
    return sessionData['applicant-organisation-name'] || ''
  }

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

function getCountrySelectItems(selectedCountry) {
  return [
    {
      text: '',
      value: '',
      selected: !selectedCountry
    },
    ...countryNames.map((countryName) => {
      const value = slugifyCountryName(countryName)

      return {
        text: countryName,
        value,
        selected: selectedCountry === value
      }
    })
  ]
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

function getAlternativeOrderDetailsSummaryRows(sessionData) {
  const orderApplicationDefinition = getApplicationDefinition(sessionData['order-application-code'])

  return [
    buildSummaryRow('Application code', sessionData['order-application-code']),
    buildSummaryRow(
      'Application found',
      orderApplicationDefinition?.title ||
        'Application from EU Country for registration or recognition of an order in the family court'
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
      respondentName: respondentName || 'Mr David Thompson',
      applicantName: applicantName || 'Ms Emma Lewandowska',
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
      respondentName: 'Mr Ewan Fisher',
      applicantName: 'Ms Joan Smith',
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
      respondentName: 'Mr Evan Fisher',
      applicantName: 'Ms Jane Ayre',
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
  const applicationTitle =
    getApplicationTitle(sessionData) || 'Maintenance Orders Reciprocal Enforcement Act 1972'

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
      applicantName: 'Ewa Zielinska',
      respondentName: 'David Green',
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
    responses: (definition.responses || []).map((response, index) =>
      normaliseResultResponse(code, response, index)
    )
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
  const name = cleanWorkbookText(response.name || response.prompt || `Field ${index + 1}`)
  const prompt = cleanWorkbookText(response.prompt || response.name || `Field ${index + 1}`)
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
    options: splitResultOptions(response.options)
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

  return optionValues.map((option) => ({
    text: option,
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

function getResultingResultsStatus(sessionData) {
  const recordedResults = getRecordedResults(sessionData)

  if (!recordedResults.length) {
    return {
      tag: {
        text: 'Not provided',
        classes: 'govuk-tag--grey'
      }
    }
  }

  if (hasSavableRecordedResult(sessionData)) {
    return {
      tag: {
        text: 'Provided',
        classes: 'govuk-tag--turquoise'
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

function buildFieldError(text) {
  return { text }
}

function isChecked(value) {
  return asArray(value).includes('yes')
}

function buildErrorSummary(errors) {
  return Object.entries(errors).map(([field, error]) => ({
    text: error.text,
    href: `#${field}`
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

function validateAlternativeOrderDetails(body) {
  const errors = {}
  const selectedApplicationCode = String(
    getSingleValue(body['order-application-code']) || ''
  )
    .trim()
    .toUpperCase()

  if (!hasValue(selectedApplicationCode)) {
    errors['order-application-code'] = buildFieldError('Select an application code')
  } else if (!getApplicationDefinition(selectedApplicationCode)) {
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
  const enteredTerms = getRecordedOrderTerms(sessionData)
  const hasPendingOrderTerm = Boolean(sessionData['alternative-pending-order-term'])

  if (!enteredTerms.length && !hasPendingOrderTerm) {
    return {
      tag: {
        text: 'Not provided',
        classes: 'govuk-tag--grey'
      }
    }
  }

  if (hasSavableOrderTerm(sessionData)) {
    return {
      tag: {
        text: 'Provided',
        classes: 'govuk-tag--turquoise'
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

function getRecordedOrderTermManagementRows(sessionData) {
  return getRecordedOrderTerms(sessionData).map((term) => ({
    key: {
      text: `${term.code} - ${term.title}`
    },
    value: {
      text: term.wording
    },
    actions: {
      items: [
        {
          text: 'Change',
          href: `/orders-applications-alternative/order-term/${term.index}/change`
        },
        {
          text: 'Delete',
          href: `/orders-applications-alternative/order-term/${term.index}/delete`
        }
      ]
    }
  }))
}

function getOrderTermReviewRows(orderTerm) {
  const rows = [
    buildSummaryRow('Order term code', orderTerm?.code || ''),
    buildSummaryRow('Order term title', orderTerm?.title || ''),
    buildSummaryRow('Order term wording', orderTerm?.wording || '')
  ]

  if (hasValue(orderTerm?.creditorLabel)) {
    rows.splice(2, 0, buildSummaryRow('Creditor', orderTerm.creditorLabel))
  }

  return rows
}

function getCheckCaseOrderTermCards(sessionData) {
  return getRecordedOrderTerms(sessionData).map((orderTerm) => ({
    title: `${orderTerm.code} - ${orderTerm.title}`,
    rows: getOrderTermReviewRows(orderTerm),
    changeHref: `/orders-applications-alternative/order-term/${orderTerm.index}/change`,
    removeHref: `/orders-applications-alternative/order-term/${orderTerm.index}/delete`
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
    return [
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
      href: '/orders-applications/applicant-details',
      status: getTaskStatusTag(
        sessionData['applicant-details-completed'] ? 'provided' : 'required'
      )
    },
    {
      title: {
        text: 'Respondent'
      },
      href: '/orders-applications/respondent-details',
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
      href: '/orders-applications/central-authority-details',
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
      href: canStartApplication ? '/orders-applications/application-details' : undefined,
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
      href: hasApplicationDetails ? '/orders-applications/hearing-details' : undefined,
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
      href: '/orders-applications/order-details',
      status: hasOrderDetails ? getTaskStatusTag('provided') : getTaskStatusTag('required')
    },
    {
      title: {
        text: 'Minor creditor details'
      },
      href: hasOrderDetails ? '/orders-applications/minor-creditors' : undefined,
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
      href: hasOrderDetails ? '/orders-applications/terms-per-beneficiary' : undefined,
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
      href: hasOrderDetails ? '/orders-applications/lump-sum-payment' : undefined,
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
      href: hasOrderDetails ? '/orders-applications/interest-and-indexation' : undefined,
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

function getSingleTaskStatusTag(status) {
  if (status === 'provided') {
    return {
      tag: {
        text: 'Provided',
        classes: 'govuk-tag--turquoise'
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
      text: 'Not provided',
      classes: 'govuk-tag--grey'
    }
  }
}

function getAlternativeOrderItems(sessionData) {
  return [
    {
      title: {
        text: 'Order details'
      },
      href: '/orders-applications-alternative/order-details',
      status: getSingleTaskStatusTag(
        hasCompletedOrderDetails(sessionData) ? 'provided' : 'not-provided'
      )
    },
    {
      title: {
        text: 'Enter order'
      },
      href: '/orders-applications-alternative/select-order-term',
      status: getAlternativeOrderTermsStatus(sessionData)
    },
    {
      title: {
        text: 'Interest and indexation'
      },
      href: hasCompletedOrderDetails(sessionData)
        ? '/orders-applications-alternative/interest-and-indexation'
        : undefined,
      status: hasCompletedOrderDetails(sessionData)
        ? hasCompletedInterestAndIndexation(sessionData)
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
      href: '/orders-applications/case-comments-and-notes',
      status: hasCaseCommentsAndNotes(sessionData)
        ? getTaskStatusTag('provided')
        : getTaskStatusTag('optional')
    }
  ]
}

function getAlternativePartyDetailsItems(sessionData) {
  const items = [
    {
      title: {
        text: 'Applicant'
      },
      href: '/orders-applications-alternative/applicant-details',
      status: getTaskStatusTag(
        sessionData['applicant-details-completed'] ? 'provided' : 'required'
      )
    },
    {
      title: {
        text: 'Respondent'
      },
      href: '/orders-applications-alternative/respondent-details',
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
      href: '/orders-applications-alternative/central-authority-details',
      status: getTaskStatusTag(hasCentralAuthorityDetails(sessionData) ? 'provided' : 'optional')
    })
  }

  return items
}

function getAlternativeApplicationItems(sessionData) {
  const canStartApplication = hasCompletedPartyDetails(sessionData)
  const hasApplicationDetails = hasCompletedApplicationDetails(sessionData)
  const hasHearingDetails = hasCompletedHearingDetails(sessionData)

  return [
    {
      title: {
        text: 'Application details'
      },
      href: canStartApplication ? '/orders-applications-alternative/application-details' : undefined,
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
      href: hasApplicationDetails ? '/orders-applications-alternative/hearing-details' : undefined,
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

function getAlternativeAdditionalInformationItems(sessionData) {
  return [
    {
      title: {
        text: 'Comments and notes'
      },
      href: '/orders-applications-alternative/case-comments-and-notes',
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
      hasCompletedInterestAndIndexation(sessionData)
  )
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
  return res.render('index')
})

router.get('/orders-applications', (req, res) => {
  return res.render('orders-applications/index')
})

router.post('/orders-applications', (req, res, next) => {
  req.session.data['applicant-type'] =
    req.body['applicant-type-remo-in'] ||
    req.body['applicant-type-remo-out'] ||
    ''

  delete req.session.data['applicant-type-remo-in']
  delete req.session.data['applicant-type-remo-out']

  return redirectWithSessionSave(req, res, next, '/orders-applications/case-details')
})

router.get('/orders-applications/case-details', (req, res) => {
  const caseType = req.session.data['case-type']

  if (!caseType) {
    return res.redirect('/orders-applications')
  }

  return res.render('orders-applications/case-details', {
    caseTypeLabel: caseTypeLabels[caseType] || caseType,
    applicantTypeLabel:
      applicantTypeLabels[req.session.data['applicant-type']] || 'Not selected',
    partyDetailsItems: getPartyDetailsItems(req.session.data),
    caseSectionHeading: isApplicationJourney(req.session.data) ? 'Application' : 'Order',
    caseSectionIdPrefix: isApplicationJourney(req.session.data) ? 'application' : 'order',
    caseSectionItems: isApplicationJourney(req.session.data)
      ? getApplicationItems(req.session.data)
      : getOrderItems(req.session.data),
    additionalInformationItems: getAdditionalInformationItems(req.session.data),
    canCheckCase: canCheckCase(req.session.data)
  })
})

router.get('/orders-applications/check-case-details', (req, res) => {
  if (!req.session.data['case-type']) {
    return res.redirect('/orders-applications')
  }

  if (!canCheckCase(req.session.data)) {
    return res.redirect('/orders-applications/case-details')
  }

  return res.render('orders-applications/check-case-details', {
    caseTypeLabel: caseTypeLabels[req.session.data['case-type']] || req.session.data['case-type'],
    applicantTypeLabel:
      applicantTypeLabels[req.session.data['applicant-type']] || 'Not selected',
    isApplicationJourney: isApplicationJourney(req.session.data),
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

router.get('/orders-applications/case-submitted', (req, res) => {
  if (!req.session.data['case-type']) {
    return res.redirect('/orders-applications')
  }

  return res.render('orders-applications/case-submitted')
})

router.get('/orders-applications/case-comments-and-notes', (req, res) => {
  if (!req.session.data['case-type']) {
    return res.redirect('/orders-applications')
  }

  return res.render('orders-applications/case-comments-and-notes')
})

router.post('/orders-applications/case-comments-and-notes', (req, res, next) => {
  return redirectWithSessionSave(req, res, next, '/orders-applications/case-details')
})

router.get('/orders-applications/applicant-details', (req, res) => {
  if (!req.session.data['case-type']) {
    return res.redirect('/orders-applications')
  }

  return res.render('orders-applications/applicant-details', {
    applicantAge: getAgeFromDateString(req.session.data['applicant-date-of-birth'])
  })
})

router.post('/orders-applications/applicant-details', (req, res, next) => {
  const errors = validateApplicantDetails(req.body, req.session.data['applicant-type'])

  if (Object.keys(errors).length > 0) {
    delete req.session.data['applicant-details-completed']

    return res.render('orders-applications/applicant-details', {
      data: buildApplicantDetailsViewData(req.session.data, req.body),
      applicantAge: getAgeFromDateString(req.body['applicant-date-of-birth']),
      errors,
      errorSummary: buildErrorSummary(errors)
    })
  }

  req.session.data['applicant-add-aliases'] = isChecked(req.body['applicant-add-aliases'])
    ? 'yes'
    : ''
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

  return redirectWithSessionSave(req, res, next, '/orders-applications/case-details')
})

router.get('/orders-applications/respondent-details', (req, res) => {
  if (!req.session.data['case-type']) {
    return res.redirect('/orders-applications')
  }

  return res.render('orders-applications/respondent-details')
})

router.post('/orders-applications/respondent-details', (req, res, next) => {
  const errors = validateRespondentDetails(req.body)

  if (Object.keys(errors).length > 0) {
    delete req.session.data['respondent-details-completed']

    return res.render('orders-applications/respondent-details', {
      data: buildRespondentDetailsViewData(req.session.data, req.body),
      errors,
      errorSummary: buildErrorSummary(errors)
    })
  }

  req.session.data['respondent-add-aliases'] = isChecked(req.body['respondent-add-aliases'])
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

  return redirectWithSessionSave(req, res, next, '/orders-applications/case-details')
})

router.get('/orders-applications/central-authority-details', (req, res) => {
  if (!req.session.data['case-type']) {
    return res.redirect('/orders-applications')
  }

  if (isRemoOutCase(req.session.data)) {
    return res.redirect('/orders-applications/case-details')
  }

  return res.render('orders-applications/central-authority-details', {
    hasCentralAuthorityManualDetails: hasCentralAuthorityManualDetails(req.session.data),
    centralAuthorityCardRows: getCentralAuthorityCardRows(req.session.data)
  })
})

router.post('/orders-applications/central-authority-details', (req, res, next) => {
  req.session.data['central-authority-details-completed'] = hasCentralAuthorityDetails(
    req.session.data
  )
    ? 'yes'
    : ''

  return redirectWithSessionSave(req, res, next, '/orders-applications/case-details')
})

router.get('/orders-applications/central-authority-details/manual', (req, res) => {
  if (!req.session.data['case-type']) {
    return res.redirect('/orders-applications')
  }

  return res.render('orders-applications/central-authority-details-manual')
})

router.post('/orders-applications/central-authority-details/manual', (req, res, next) => {
  req.session.data['central-authority-details-completed'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/orders-applications/central-authority-details')
})

router.get('/orders-applications/central-authority-details/remove', (req, res) => {
  if (!req.session.data['case-type']) {
    return res.redirect('/orders-applications')
  }

  if (!hasCentralAuthorityManualDetails(req.session.data)) {
    return res.redirect('/orders-applications/central-authority-details')
  }

  return res.render('orders-applications/remove-central-authority-details', {
    centralAuthorityCardRows: getCentralAuthorityCardRows(req.session.data)
  })
})

router.post('/orders-applications/central-authority-details/remove', (req, res, next) => {
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

  return redirectWithSessionSave(req, res, next, '/orders-applications/central-authority-details')
})

router.get('/orders-applications/order-details', (req, res) => {
  if (!req.session.data['case-type']) {
    return res.redirect('/orders-applications')
  }

  if (isApplicationJourney(req.session.data)) {
    return res.redirect('/orders-applications/application-details')
  }

  return res.render('orders-applications/order-details')
})

router.post('/orders-applications/order-details', (req, res, next) => {
  if (isApplicationJourney(req.session.data)) {
    return res.redirect('/orders-applications/application-details')
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

  return redirectWithSessionSave(req, res, next, '/orders-applications/case-details')
})

router.get('/orders-applications/application-details', (req, res) => {
  if (!req.session.data['case-type']) {
    return res.redirect('/orders-applications')
  }

  if (
    !isApplicationJourney(req.session.data) ||
    !hasCompletedPartyDetails(req.session.data)
  ) {
    return res.redirect('/orders-applications/case-details')
  }

  return res.render('orders-applications/application-details')
})

router.post('/orders-applications/application-details', (req, res, next) => {
  if (!isApplicationJourney(req.session.data)) {
    return res.redirect('/orders-applications/case-details')
  }

  req.session.data['application-code'] = getSingleValue(req.body['application-code']) || ''
  delete req.session.data['application-details-completed']

  return redirectWithSessionSave(req, res, next, '/orders-applications/application-details/content')
})

router.get('/orders-applications/application-details/content', (req, res) => {
  if (!req.session.data['case-type']) {
    return res.redirect('/orders-applications')
  }

  if (
    !isApplicationJourney(req.session.data) ||
    !hasCompletedPartyDetails(req.session.data) ||
    !hasValue(req.session.data['application-code'])
  ) {
    return res.redirect('/orders-applications/application-details')
  }

  return res.render('orders-applications/application-details-content', {
    applicationTitle: getApplicationTitle(req.session.data),
    applicationWording: getApplicationWording(req.session.data)
  })
})

router.post('/orders-applications/application-details/content', (req, res, next) => {
  if (
    !isApplicationJourney(req.session.data) ||
    !hasValue(req.session.data['application-code'])
  ) {
    return res.redirect('/orders-applications/case-details')
  }

  req.session.data['application-foreign-court'] =
    getSingleValue(req.body['application-foreign-court']) || ''
  req.session.data['application-order-date'] =
    getSingleValue(req.body['application-order-date']) || ''
  req.session.data['application-details-completed'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/orders-applications/case-details')
})

router.get('/orders-applications/hearing-details', (req, res) => {
  if (!req.session.data['case-type']) {
    return res.redirect('/orders-applications')
  }

  if (
    !isApplicationJourney(req.session.data) ||
    !hasCompletedApplicationDetails(req.session.data)
  ) {
    return res.redirect('/orders-applications/case-details')
  }

  return res.render('orders-applications/hearing-details')
})

router.post('/orders-applications/hearing-details', (req, res, next) => {
  if (!isApplicationJourney(req.session.data)) {
    return res.redirect('/orders-applications/case-details')
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

  return redirectWithSessionSave(req, res, next, '/orders-applications/case-details')
})

router.get('/orders-applications/minor-creditors', (req, res) => {
  if (!hasCompletedOrderDetails(req.session.data)) {
    return res.redirect('/orders-applications/case-details')
  }

  if (!hasMinorCreditors(req.session.data)) {
    return res.render('orders-applications/minor-creditor-details', {
      creditor: {},
      formAction: '/orders-applications/minor-creditors',
      cancelHref: '/orders-applications/case-details'
    })
  }

  return res.render('orders-applications/minor-creditors', {
    minorCreditorCards: getMinorCreditorCards(req.session.data)
  })
})

router.post('/orders-applications/minor-creditors', (req, res, next) => {
  const creditors = getMinorCreditors(req.session.data)
  creditors.push(buildMinorCreditor(req.body))
  req.session.data['minor-creditors'] = creditors

  return redirectWithSessionSave(req, res, next, '/orders-applications/minor-creditors')
})

router.get('/orders-applications/minor-creditors/new', (req, res) => {
  if (!hasCompletedOrderDetails(req.session.data)) {
    return res.redirect('/orders-applications/case-details')
  }

  return res.render('orders-applications/minor-creditor-details', {
    creditor: {},
    formAction: '/orders-applications/minor-creditors/new',
    cancelHref: '/orders-applications/minor-creditors'
  })
})

router.post('/orders-applications/minor-creditors/new', (req, res, next) => {
  const creditors = getMinorCreditors(req.session.data)
  creditors.push(buildMinorCreditor(req.body))
  req.session.data['minor-creditors'] = creditors

  return redirectWithSessionSave(req, res, next, '/orders-applications/minor-creditors')
})

router.get('/orders-applications/minor-creditors/:index/edit', (req, res) => {
  if (!hasCompletedOrderDetails(req.session.data)) {
    return res.redirect('/orders-applications/case-details')
  }

  const index = getMinorCreditorIndex(req.params.index, req.session.data)

  if (index === null) {
    return res.redirect('/orders-applications/minor-creditors')
  }

  return res.render('orders-applications/minor-creditor-details', {
    creditor: getMinorCreditors(req.session.data)[index],
    formAction: `/minor-creditors/${index}/edit`,
    cancelHref: '/orders-applications/minor-creditors'
  })
})

router.post('/orders-applications/minor-creditors/:index/edit', (req, res, next) => {
  const index = getMinorCreditorIndex(req.params.index, req.session.data)

  if (index === null) {
    return res.redirect('/orders-applications/minor-creditors')
  }

  const creditors = getMinorCreditors(req.session.data)
  creditors[index] = buildMinorCreditor(req.body)
  req.session.data['minor-creditors'] = creditors

  return redirectWithSessionSave(req, res, next, '/orders-applications/minor-creditors')
})

router.get('/orders-applications/minor-creditors/:index/remove', (req, res) => {
  if (!hasCompletedOrderDetails(req.session.data)) {
    return res.redirect('/orders-applications/case-details')
  }

  const index = getMinorCreditorIndex(req.params.index, req.session.data)

  if (index === null) {
    return res.redirect('/orders-applications/minor-creditors')
  }

  const creditor = getMinorCreditors(req.session.data)[index]

  return res.render('orders-applications/remove-minor-creditor', {
    minorCreditorCard: {
      title: getMinorCreditorName(creditor, index),
      rows: getMinorCreditorSummaryRows(creditor)
    },
    formAction: `/minor-creditors/${index}/remove`
  })
})

router.post('/orders-applications/minor-creditors/:index/remove', (req, res, next) => {
  const index = getMinorCreditorIndex(req.params.index, req.session.data)

  if (index === null) {
    return res.redirect('/orders-applications/minor-creditors')
  }

  const creditors = getMinorCreditors(req.session.data)
  creditors.splice(index, 1)
  req.session.data['minor-creditors'] = creditors

  return redirectWithSessionSave(
    req,
    res,
    next,
    creditors.length ? '/orders-applications/minor-creditors' : '/orders-applications/case-details'
  )
})

router.get('/orders-applications/terms-per-beneficiary', (req, res) => {
  if (!hasCompletedOrderDetails(req.session.data)) {
    return res.redirect('/orders-applications/case-details')
  }

  if (!hasTermsPerBeneficiary(req.session.data)) {
    return res.redirect('/orders-applications/terms-per-beneficiary/beneficiary')
  }

  return res.render('orders-applications/terms-review', {
    beneficiaryGroups: getTermsReviewGroups(req.session.data)
  })
})

router.get('/orders-applications/terms-per-beneficiary/beneficiary', (req, res) => {
  if (!hasCompletedOrderDetails(req.session.data)) {
    return res.redirect('/orders-applications/case-details')
  }

  const draft = getTermsBeneficiaryDraft(req.session.data) || {}

  return res.render('orders-applications/terms-beneficiary', {
    applicantBeneficiaryLabel: `${getApplicantFullName(req.session.data)} (Applicant)`,
    childAge: getAgeFromDateString(draft.dateOfBirth),
    cancelHref: hasTermsPerBeneficiary(req.session.data)
      ? '/orders-applications/terms-per-beneficiary'
      : '/orders-applications/case-details'
  })
})

router.post('/orders-applications/terms-per-beneficiary/beneficiary', (req, res, next) => {
  req.session.data['terms-beneficiary-draft'] = buildTermsBeneficiaryDraft(
    req.body,
    req.session.data
  )

  return redirectWithSessionSave(req, res, next, '/orders-applications/terms-per-beneficiary/order-terms')
})

router.get('/orders-applications/terms-per-beneficiary/order-terms', (req, res) => {
  if (!hasCompletedOrderDetails(req.session.data)) {
    return res.redirect('/orders-applications/case-details')
  }

  const beneficiary = getTermsBeneficiaryDraft(req.session.data)

  if (!beneficiary) {
    return res.redirect('/orders-applications/terms-per-beneficiary/beneficiary')
  }

  return res.render('orders-applications/terms-order-terms', {
    beneficiary,
    frequencyLabel: getFrequencyLabel(req.session.data['order-payment-frequency']),
    creditorItems: getTermsCreditorItems(
      req.session.data,
      req.session.data['terms-creditor'] || 'applicant'
    )
  })
})

router.post('/orders-applications/terms-per-beneficiary/order-terms', (req, res, next) => {
  const entry = buildTermsEntry(req.body, req.session.data)

  if (!entry) {
    return res.redirect('/orders-applications/terms-per-beneficiary/beneficiary')
  }

  const terms = getTermsPerBeneficiary(req.session.data)
  terms.push(entry)
  req.session.data['terms-per-beneficiary'] = terms
  delete req.session.data['terms-beneficiary-draft']

  if (req.body.action === 'add-more-terms') {
    return redirectWithSessionSave(req, res, next, '/orders-applications/terms-per-beneficiary/beneficiary')
  }

  return redirectWithSessionSave(req, res, next, '/orders-applications/terms-per-beneficiary')
})

router.get('/orders-applications/terms-per-beneficiary/:index/remove', (req, res) => {
  if (!hasCompletedOrderDetails(req.session.data)) {
    return res.redirect('/orders-applications/case-details')
  }

  const index = getTermsIndex(req.params.index, req.session.data)

  if (index === null) {
    return res.redirect('/orders-applications/terms-per-beneficiary')
  }

  const term = getTermsPerBeneficiary(req.session.data)[index]

  return res.render('orders-applications/remove-terms-per-beneficiary', {
    beneficiaryGroup: {
      name: term.beneficiaryName,
      role: term.beneficiaryRole,
      tag: term.beneficiaryTag,
      rows: [getTermsReviewRow(term)]
    },
    formAction: `/terms-per-beneficiary/${index}/remove`
  })
})

router.post('/orders-applications/terms-per-beneficiary/:index/remove', (req, res, next) => {
  const index = getTermsIndex(req.params.index, req.session.data)

  if (index === null) {
    return res.redirect('/orders-applications/terms-per-beneficiary')
  }

  const terms = getTermsPerBeneficiary(req.session.data)
  terms.splice(index, 1)
  req.session.data['terms-per-beneficiary'] = terms

  return redirectWithSessionSave(
    req,
    res,
    next,
    terms.length ? '/orders-applications/terms-per-beneficiary' : '/orders-applications/case-details'
  )
})

router.get('/orders-applications/lump-sum-payment', (req, res) => {
  if (!hasCompletedOrderDetails(req.session.data)) {
    return res.redirect('/orders-applications/case-details')
  }

  return res.render('orders-applications/lump-sum-payment', {
    creditorItems: getTermsCreditorItems(
      req.session.data,
      req.session.data['lump-sum-creditor'] || 'applicant'
    )
  })
})

router.post('/orders-applications/lump-sum-payment', (req, res, next) => {
  req.session.data['lump-sum-payment-completed'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/orders-applications/case-details')
})

router.get('/orders-applications/interest-and-indexation', (req, res) => {
  if (!hasCompletedOrderDetails(req.session.data)) {
    return res.redirect('/orders-applications/case-details')
  }

  return res.render('orders-applications/interest-and-indexation')
})

router.post('/orders-applications/interest-and-indexation', (req, res, next) => {
  req.session.data['interest-and-indexation-completed'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/orders-applications/case-details')
})

router.get('/orders-applications/cancel', (req, res, next) => {
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

router.get('/orders-applications/cancel-case-creation', (req, res) => {
  if (!req.session.data['case-type']) {
    return res.redirect('/orders-applications')
  }

  return res.render('orders-applications/cancel-case-creation')
})

router.post('/orders-applications/cancel-case-creation', (req, res, next) => {
  if (req.body['cancel-case-creation'] === 'yes') {
    return res.redirect('/orders-applications/cancel')
  }

  return redirectWithSessionSave(req, res, next, '/orders-applications/case-details')
})

function getOrdersApplicationsAlternativeData(req) {
  if (!req.session.data['orders-applications-alternative']) {
    req.session.data['orders-applications-alternative'] = {}
  }

  return req.session.data['orders-applications-alternative']
}


// Alternative Orders and Applications flow
router.use('/orders-applications-alternative', (req, res, next) => {
  const alternativeData = getOrdersApplicationsAlternativeData(req)

  if (req.method === 'POST' && req.body) {
    Object.entries(req.body).forEach(([key, value]) => {
      alternativeData[key] = value
    })
  }

  res.locals.data = alternativeData
  next()
})

router.get('/orders-applications-alternative', (req, res) => {
  return res.render('orders-applications-alternative/index')
})

router.post('/orders-applications-alternative', (req, res, next) => {
  getOrdersApplicationsAlternativeData(req)['applicant-type'] =
    req.body['applicant-type-remo-in'] ||
    req.body['applicant-type-remo-out'] ||
    ''

  delete getOrdersApplicationsAlternativeData(req)['applicant-type-remo-in']
  delete getOrdersApplicationsAlternativeData(req)['applicant-type-remo-out']

  return redirectWithSessionSave(req, res, next, '/orders-applications-alternative/case-details')
})

router.get('/orders-applications-alternative/case-details', (req, res) => {
  const caseType = getOrdersApplicationsAlternativeData(req)['case-type']

  if (!caseType) {
    return res.redirect('/orders-applications-alternative')
  }

  return res.render('orders-applications-alternative/case-details', {
    caseTypeLabel: caseTypeLabels[caseType] || caseType,
    applicantTypeLabel:
      applicantTypeLabels[getOrdersApplicationsAlternativeData(req)['applicant-type']] || 'Not selected',
    partyDetailsItems: getAlternativePartyDetailsItems(getOrdersApplicationsAlternativeData(req)),
    caseSectionHeading: isApplicationJourney(getOrdersApplicationsAlternativeData(req)) ? 'Application' : 'Order',
    caseSectionIdPrefix: isApplicationJourney(getOrdersApplicationsAlternativeData(req)) ? 'application' : 'order',
    caseSectionItems: isApplicationJourney(getOrdersApplicationsAlternativeData(req))
      ? getAlternativeApplicationItems(getOrdersApplicationsAlternativeData(req))
      : getAlternativeOrderItems(getOrdersApplicationsAlternativeData(req)),
    additionalInformationItems: getAlternativeAdditionalInformationItems(getOrdersApplicationsAlternativeData(req)),
    canCheckCase: canCheckAlternativeCase(getOrdersApplicationsAlternativeData(req))
  })
})

router.get('/orders-applications-alternative/check-case-details', (req, res) => {
  if (!getOrdersApplicationsAlternativeData(req)['case-type']) {
    return res.redirect('/orders-applications-alternative')
  }

  if (!canCheckAlternativeCase(getOrdersApplicationsAlternativeData(req))) {
    return res.redirect('/orders-applications-alternative/case-details')
  }

  return res.render('orders-applications-alternative/check-case-details', {
    caseTypeLabel: caseTypeLabels[getOrdersApplicationsAlternativeData(req)['case-type']] || getOrdersApplicationsAlternativeData(req)['case-type'],
    applicantTypeLabel:
      applicantTypeLabels[getOrdersApplicationsAlternativeData(req)['applicant-type']] || 'Not selected',
    isApplicationJourney: isApplicationJourney(getOrdersApplicationsAlternativeData(req)),
    isRemoOutCase: isRemoOutCase(getOrdersApplicationsAlternativeData(req)),
    applicantRows: getApplicantSummaryRows(getOrdersApplicationsAlternativeData(req)),
    respondentRows: getRespondentSummaryRows(getOrdersApplicationsAlternativeData(req)),
    centralAuthorityRows: getCentralAuthoritySummaryRows(getOrdersApplicationsAlternativeData(req)),
    applicationRows: getApplicationSummaryRows(getOrdersApplicationsAlternativeData(req)),
    hearingRows: getHearingSummaryRows(getOrdersApplicationsAlternativeData(req)),
    orderDetailsRows: getAlternativeOrderDetailsSummaryRows(getOrdersApplicationsAlternativeData(req)),
    orderTermCards: getCheckCaseOrderTermCards(getOrdersApplicationsAlternativeData(req)),
    interestAndIndexationRows: [
      buildSummaryRow('Interest', getInterestAppliesLabel(getOrdersApplicationsAlternativeData(req)['interest-applies'])),
      buildSummaryRow(
        'Indexation',
        getIndexationTypeLabel(getOrdersApplicationsAlternativeData(req)['indexation-type'])
      )
    ],
    caseCommentsRows: [
      buildSummaryRow('Comment', getOrdersApplicationsAlternativeData(req)['case-comment']),
      buildSummaryRow('Case note', getOrdersApplicationsAlternativeData(req)['case-notes'])
    ],
    showApplicantRestrictionWarning: Boolean(
      getOrdersApplicationsAlternativeData(req)['applicant-restrict-personal-information']
    ),
    showRespondentRestrictionWarning: Boolean(
      getOrdersApplicationsAlternativeData(req)['respondent-restrict-personal-information']
    )
  })
})

router.get('/orders-applications-alternative/case-submitted', (req, res) => {
  if (!getOrdersApplicationsAlternativeData(req)['case-type']) {
    return res.redirect('/orders-applications-alternative')
  }

  return res.render('orders-applications-alternative/case-submitted')
})

router.get('/orders-applications-alternative/case-comments-and-notes', (req, res) => {
  if (!getOrdersApplicationsAlternativeData(req)['case-type']) {
    return res.redirect('/orders-applications-alternative')
  }

  return res.render('orders-applications-alternative/case-comments-and-notes')
})

router.post('/orders-applications-alternative/case-comments-and-notes', (req, res, next) => {
  return redirectWithSessionSave(req, res, next, '/orders-applications-alternative/case-details')
})

router.get('/orders-applications-alternative/applicant-details', (req, res) => {
  if (!getOrdersApplicationsAlternativeData(req)['case-type']) {
    return res.redirect('/orders-applications-alternative')
  }

  return res.render('orders-applications-alternative/applicant-details', {
    applicantAge: getAgeFromDateString(getOrdersApplicationsAlternativeData(req)['applicant-date-of-birth'])
  })
})

router.post('/orders-applications-alternative/applicant-details', (req, res, next) => {
  const errors = validateApplicantDetails(req.body, getOrdersApplicationsAlternativeData(req)['applicant-type'])

  if (Object.keys(errors).length > 0) {
    delete getOrdersApplicationsAlternativeData(req)['applicant-details-completed']

    return res.render('orders-applications-alternative/applicant-details', {
      data: buildApplicantDetailsViewData(getOrdersApplicationsAlternativeData(req), req.body),
      applicantAge: getAgeFromDateString(req.body['applicant-date-of-birth']),
      errors,
      errorSummary: buildErrorSummary(errors)
    })
  }

  getOrdersApplicationsAlternativeData(req)['applicant-add-aliases'] = isChecked(
    req.body['applicant-add-aliases']
  )
    ? 'yes'
    : ''
  getOrdersApplicationsAlternativeData(req)['applicant-bank-account-type'] =
    getSingleValue(req.body['applicant-bank-account-type']) || ''
  getOrdersApplicationsAlternativeData(req)['applicant-send-correspondence-to-third-party'] =
    isChecked(req.body['applicant-send-correspondence-to-third-party'])
      ? 'yes'
      : ''
  getOrdersApplicationsAlternativeData(req)['applicant-restrict-personal-information'] =
    isChecked(req.body['applicant-restrict-personal-information'])
      ? 'yes'
      : ''

  getOrdersApplicationsAlternativeData(req)['applicant-details-completed'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/orders-applications-alternative/case-details')
})

router.get('/orders-applications-alternative/respondent-details', (req, res) => {
  if (!getOrdersApplicationsAlternativeData(req)['case-type']) {
    return res.redirect('/orders-applications-alternative')
  }

  return res.render('orders-applications-alternative/respondent-details')
})

router.post('/orders-applications-alternative/respondent-details', (req, res, next) => {
  const errors = validateRespondentDetails(req.body)

  if (Object.keys(errors).length > 0) {
    delete getOrdersApplicationsAlternativeData(req)['respondent-details-completed']

    return res.render('orders-applications-alternative/respondent-details', {
      data: buildRespondentDetailsViewData(getOrdersApplicationsAlternativeData(req), req.body),
      errors,
      errorSummary: buildErrorSummary(errors)
    })
  }

  getOrdersApplicationsAlternativeData(req)['respondent-add-aliases'] = isChecked(
    req.body['respondent-add-aliases']
  )
    ? 'yes'
    : ''
  getOrdersApplicationsAlternativeData(req)['respondent-send-correspondence-to-third-party'] =
    isChecked(req.body['respondent-send-correspondence-to-third-party'])
      ? 'yes'
      : ''
  getOrdersApplicationsAlternativeData(req)['respondent-restrict-personal-information'] =
    isChecked(req.body['respondent-restrict-personal-information'])
      ? 'yes'
      : ''

  getOrdersApplicationsAlternativeData(req)['respondent-details-completed'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/orders-applications-alternative/case-details')
})

router.get('/orders-applications-alternative/central-authority-details', (req, res) => {
  if (!getOrdersApplicationsAlternativeData(req)['case-type']) {
    return res.redirect('/orders-applications-alternative')
  }

  if (isRemoOutCase(getOrdersApplicationsAlternativeData(req))) {
    return res.redirect('/orders-applications-alternative/case-details')
  }

  return res.render('orders-applications-alternative/central-authority-details', {
    hasCentralAuthorityManualDetails: hasCentralAuthorityManualDetails(getOrdersApplicationsAlternativeData(req)),
    centralAuthorityCardRows: getCentralAuthorityCardRows(getOrdersApplicationsAlternativeData(req))
  })
})

router.post('/orders-applications-alternative/central-authority-details', (req, res, next) => {
  getOrdersApplicationsAlternativeData(req)['central-authority-details-completed'] = hasCentralAuthorityDetails(
    getOrdersApplicationsAlternativeData(req)
  )
    ? 'yes'
    : ''

  return redirectWithSessionSave(req, res, next, '/orders-applications-alternative/case-details')
})

router.get('/orders-applications-alternative/central-authority-details/manual', (req, res) => {
  if (!getOrdersApplicationsAlternativeData(req)['case-type']) {
    return res.redirect('/orders-applications-alternative')
  }

  return res.render('orders-applications-alternative/central-authority-details-manual')
})

router.post('/orders-applications-alternative/central-authority-details/manual', (req, res, next) => {
  getOrdersApplicationsAlternativeData(req)['central-authority-details-completed'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/orders-applications-alternative/central-authority-details')
})

router.get('/orders-applications-alternative/central-authority-details/remove', (req, res) => {
  if (!getOrdersApplicationsAlternativeData(req)['case-type']) {
    return res.redirect('/orders-applications-alternative')
  }

  if (!hasCentralAuthorityManualDetails(getOrdersApplicationsAlternativeData(req))) {
    return res.redirect('/orders-applications-alternative/central-authority-details')
  }

  return res.render('orders-applications-alternative/remove-central-authority-details', {
    centralAuthorityCardRows: getCentralAuthorityCardRows(getOrdersApplicationsAlternativeData(req))
  })
})

router.post('/orders-applications-alternative/central-authority-details/remove', (req, res, next) => {
  delete getOrdersApplicationsAlternativeData(req)['central-authority-manual-name']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-main-email-address']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-other-email-address']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-main-telephone-number']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-other-telephone-number']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-address-line-1']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-address-line-2']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-address-line-3']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-address-line-4']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-address-line-5']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-postal-or-zip-code']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-country']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-bank-account-type']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-bank-name-on-account']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-bank-sort-code']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-bank-account-number']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-bank-payment-reference']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-bank-non-uk-name-on-account']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-bank-bic-or-swift-code']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-bank-iban']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-bank-non-uk-payment-reference']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-bank-name']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-bank-branch-office-or-sort-code']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-bank-non-uk-account-number']

  getOrdersApplicationsAlternativeData(req)['central-authority-details-completed'] = hasCentralAuthorityDetails(
    getOrdersApplicationsAlternativeData(req)
  )
    ? 'yes'
    : ''

  return redirectWithSessionSave(req, res, next, '/orders-applications-alternative/central-authority-details')
})

router.get('/orders-applications-alternative/order-details', (req, res) => {
  if (!getOrdersApplicationsAlternativeData(req)['case-type']) {
    return res.redirect('/orders-applications-alternative')
  }

  if (isApplicationJourney(getOrdersApplicationsAlternativeData(req))) {
    return res.redirect('/orders-applications-alternative/application-details')
  }

  if (!hasCompletedPartyDetails(getOrdersApplicationsAlternativeData(req))) {
    return res.redirect('/orders-applications-alternative/case-details')
  }

  const orderApplicationDefinition = getApplicationDefinition(
    getOrdersApplicationsAlternativeData(req)['order-application-code']
  )

  return res.render('orders-applications-alternative/order-details', {
    applicationItems: getApplicationOptionItems(
      getOrdersApplicationsAlternativeData(req)['order-application-code']
    ),
    applicationLookupJson: getApplicationLookupJson(),
    errors: {},
    errorSummary: null,
    orderApplicationTitle:
      orderApplicationDefinition?.title ||
      'Application from EU Country for registration or recognition of an order in the family court'
  })
})

router.post('/orders-applications-alternative/order-details', (req, res, next) => {
  if (isApplicationJourney(getOrdersApplicationsAlternativeData(req))) {
    return res.redirect('/orders-applications-alternative/application-details')
  }

  const selectedApplicationCode = String(
    getSingleValue(req.body['order-application-code']) || ''
  )
    .trim()
    .toUpperCase()

  getOrdersApplicationsAlternativeData(req)['order-application-code'] = selectedApplicationCode
  const errors = validateAlternativeOrderDetails(req.body)
  const orderApplicationDefinition = getApplicationDefinition(selectedApplicationCode)

  if (Object.keys(errors).length > 0) {
    delete getOrdersApplicationsAlternativeData(req)['order-details-completed']

    return res.render('orders-applications-alternative/order-details', {
      applicationItems: getApplicationOptionItems(selectedApplicationCode),
      applicationLookupJson: getApplicationLookupJson(),
      errors,
      errorSummary: buildErrorSummary(errors),
      orderApplicationTitle:
        orderApplicationDefinition?.title ||
        'Application from EU Country for registration or recognition of an order in the family court'
    })
  }

  delete getOrdersApplicationsAlternativeData(req)['order-payment-terms']
  delete getOrdersApplicationsAlternativeData(req)['order-payment-frequency']
  delete getOrdersApplicationsAlternativeData(req)['order-managing-payments']
  getOrdersApplicationsAlternativeData(req)['order-has-periodical-payments'] = ''
  getOrdersApplicationsAlternativeData(req)['order-has-lump-sum'] = ''
  getOrdersApplicationsAlternativeData(req)['order-details-completed'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/orders-applications-alternative/case-details')
})

router.get('/orders-applications-alternative/select-order-term', (req, res) => {
  if (!hasCompletedOrderDetails(getOrdersApplicationsAlternativeData(req))) {
    return res.redirect('/orders-applications-alternative/case-details')
  }

  return res.render('orders-applications-alternative/select-order-term', {
    recordedOrderTerms: getRecordedOrderTerms(getOrdersApplicationsAlternativeData(req)),
    recordedOrderTermRows: getRecordedOrderTermManagementRows(getOrdersApplicationsAlternativeData(req)),
    resultItems: getResultOptionItems(
      getOrdersApplicationsAlternativeData(req)['alternative-order-term-code'],
      'orders'
    ),
    selectionError: null
  })
})

router.post('/orders-applications-alternative/select-order-term', (req, res, next) => {
  if (!hasCompletedOrderDetails(getOrdersApplicationsAlternativeData(req))) {
    return res.redirect('/orders-applications-alternative/case-details')
  }

  const selectedOrderTermCode = String(
    getSingleValue(req.body['alternative-order-term-code']) || ''
  )
    .trim()
    .toUpperCase()

  if (!getResultDefinition(selectedOrderTermCode, 'orders')) {
    getOrdersApplicationsAlternativeData(req)['alternative-order-term-code'] = ''

    return res.render('orders-applications-alternative/select-order-term', {
      recordedOrderTerms: getRecordedOrderTerms(getOrdersApplicationsAlternativeData(req)),
      recordedOrderTermRows: getRecordedOrderTermManagementRows(getOrdersApplicationsAlternativeData(req)),
      resultItems: getResultOptionItems('', 'orders'),
      selectionError: 'Select an order term from the list.'
    })
  }

  getOrdersApplicationsAlternativeData(req)['alternative-order-term-code'] = selectedOrderTermCode
  delete getOrdersApplicationsAlternativeData(req)['alternative-order-term-errors']
  delete getOrdersApplicationsAlternativeData(req)['alternative-current-order-term-responses']
  delete getOrdersApplicationsAlternativeData(req)['alternative-edit-order-term-index']
  delete getOrdersApplicationsAlternativeData(req)['alternative-pending-order-term']

  return redirectWithSessionSave(req, res, next, '/orders-applications-alternative/order-term-details')
})

router.get('/orders-applications-alternative/order-term/:index/change', (req, res, next) => {
  if (!hasCompletedOrderDetails(getOrdersApplicationsAlternativeData(req))) {
    return res.redirect('/orders-applications-alternative/case-details')
  }

  const index = Number(req.params.index)
  const recordedTerms = getRecordedOrderTerms(getOrdersApplicationsAlternativeData(req))
  const selectedTerm = recordedTerms[index]

  if (!selectedTerm) {
    return redirectWithSessionSave(req, res, next, '/orders-applications-alternative/select-order-term')
  }

  getOrdersApplicationsAlternativeData(req)['alternative-edit-order-term-index'] = String(index)
  getOrdersApplicationsAlternativeData(req)['alternative-order-term-code'] = selectedTerm.code
  getOrdersApplicationsAlternativeData(req)['alternative-current-order-term-responses'] =
    selectedTerm.responses || {}
  delete getOrdersApplicationsAlternativeData(req)['alternative-order-term-errors']

  return redirectWithSessionSave(req, res, next, '/orders-applications-alternative/order-term-details')
})

router.get('/orders-applications-alternative/order-term/:index/delete', (req, res, next) => {
  if (!hasCompletedOrderDetails(getOrdersApplicationsAlternativeData(req))) {
    return res.redirect('/orders-applications-alternative/case-details')
  }

  const index = Number(req.params.index)
  const recordedTerms = getRecordedOrderTerms(getOrdersApplicationsAlternativeData(req))

  if (!recordedTerms[index]) {
    return redirectWithSessionSave(req, res, next, '/orders-applications-alternative/select-order-term')
  }

  recordedTerms.splice(index, 1)
  getOrdersApplicationsAlternativeData(req)['entered-order-terms'] = recordedTerms.map(
    ({ index: _index, ...term }) => term
  )

  if (String(getOrdersApplicationsAlternativeData(req)['alternative-edit-order-term-index']) === String(index)) {
    delete getOrdersApplicationsAlternativeData(req)['alternative-edit-order-term-index']
    delete getOrdersApplicationsAlternativeData(req)['alternative-order-term-code']
    delete getOrdersApplicationsAlternativeData(req)['alternative-current-order-term-responses']
    delete getOrdersApplicationsAlternativeData(req)['alternative-order-term-errors']
  }

  return redirectWithSessionSave(req, res, next, '/orders-applications-alternative/select-order-term')
})

router.get('/orders-applications-alternative/order-term-details', (req, res) => {
  if (!hasCompletedOrderDetails(getOrdersApplicationsAlternativeData(req))) {
    return res.redirect('/orders-applications-alternative/case-details')
  }

  const orderTermDefinition = getResultDefinition(
    getOrdersApplicationsAlternativeData(req)['alternative-order-term-code'],
    'orders'
  )

  if (!orderTermDefinition) {
    return res.redirect('/orders-applications-alternative/select-order-term')
  }

  return res.render('orders-applications-alternative/order-term-details', {
    isEditingOrderTerm: isEditingAlternativeOrderTerm(getOrdersApplicationsAlternativeData(req)),
    resultCode: orderTermDefinition.code,
    resultTitle: orderTermDefinition.title,
    resultCategory: getResultCategoryLabel(orderTermDefinition.category),
    requiresCreditor: orderTermDefinition.nextStep === 'create-creditor',
    resultWording: getAlternativeOrderTermWording(getOrdersApplicationsAlternativeData(req)),
    responseItems: getAlternativeOrderTermResponseItems(getOrdersApplicationsAlternativeData(req))
  })
})

router.post('/orders-applications-alternative/order-term-details', (req, res, next) => {
  if (!hasCompletedOrderDetails(getOrdersApplicationsAlternativeData(req))) {
    return res.redirect('/orders-applications-alternative/case-details')
  }

  const orderTermDefinition = getResultDefinition(
    getOrdersApplicationsAlternativeData(req)['alternative-order-term-code'],
    'orders'
  )

  if (!orderTermDefinition) {
    return res.redirect('/orders-applications-alternative/select-order-term')
  }

  const { errors, values } = validateResultResponses(orderTermDefinition, req.body)

  getOrdersApplicationsAlternativeData(req)['alternative-current-order-term-responses'] = values

  if (Object.keys(errors).length) {
    getOrdersApplicationsAlternativeData(req)['alternative-order-term-errors'] = errors

    return res.render('orders-applications-alternative/order-term-details', {
      isEditingOrderTerm: isEditingAlternativeOrderTerm(getOrdersApplicationsAlternativeData(req)),
      resultCode: orderTermDefinition.code,
      resultTitle: orderTermDefinition.title,
      resultCategory: getResultCategoryLabel(orderTermDefinition.category),
      requiresCreditor: orderTermDefinition.nextStep === 'create-creditor',
      resultWording: getAlternativeOrderTermWording(getOrdersApplicationsAlternativeData(req)),
      responseItems: getAlternativeOrderTermResponseItems(getOrdersApplicationsAlternativeData(req))
    })
  }

  delete getOrdersApplicationsAlternativeData(req)['alternative-order-term-errors']

  const recordedTerms = getRecordedOrderTerms(getOrdersApplicationsAlternativeData(req))
  const savedOrderTerm = {
    code: orderTermDefinition.code,
    title: orderTermDefinition.title,
    category: orderTermDefinition.category,
    categoryLabel: getResultCategoryLabel(orderTermDefinition.category),
    wording: getAlternativeOrderTermWording(getOrdersApplicationsAlternativeData(req)),
    responses: values,
    nextStep: orderTermDefinition.nextStep
  }
  const editIndex = Number(getOrdersApplicationsAlternativeData(req)['alternative-edit-order-term-index'])
  const existingRecordedTerm = Number.isInteger(editIndex) && recordedTerms[editIndex]
    ? recordedTerms[editIndex]
    : null

  if (existingRecordedTerm?.creditor) {
    savedOrderTerm.creditor = existingRecordedTerm.creditor
    savedOrderTerm.creditorLabel = existingRecordedTerm.creditorLabel || ''
  }

  delete getOrdersApplicationsAlternativeData(req)['alternative-order-term-code']
  delete getOrdersApplicationsAlternativeData(req)['alternative-current-order-term-responses']
  delete getOrdersApplicationsAlternativeData(req)['alternative-edit-order-term-index']

  if (orderTermDefinition.nextStep === 'create-creditor') {
    const pendingOrderTerm = {
      ...savedOrderTerm
    }

    if (Number.isInteger(editIndex) && existingRecordedTerm) {
      pendingOrderTerm.editIndex = String(editIndex)
    }

    getOrdersApplicationsAlternativeData(req)['alternative-pending-order-term'] = pendingOrderTerm
    delete getOrdersApplicationsAlternativeData(req)['alternative-creditor-order-term-index']
    return redirectWithSessionSave(req, res, next, '/orders-applications-alternative/order-term-creditor')
  }

  if (Number.isInteger(editIndex) && existingRecordedTerm) {
    recordedTerms[editIndex] = savedOrderTerm
  } else {
    recordedTerms.push(savedOrderTerm)
  }

  const savedOrderTermIndex = Number.isInteger(editIndex) && existingRecordedTerm
    ? editIndex
    : recordedTerms.length - 1

  getOrdersApplicationsAlternativeData(req)['entered-order-terms'] = recordedTerms.map(
    ({ index, ...term }) => term
  )
  getOrdersApplicationsAlternativeData(req)['alternative-creditor-order-term-index'] = String(savedOrderTermIndex)
  delete getOrdersApplicationsAlternativeData(req)['alternative-pending-order-term']

  if (req.body.action === 'add-further-order-term') {
    return redirectWithSessionSave(req, res, next, '/orders-applications-alternative/select-order-term')
  }

  return redirectWithSessionSave(req, res, next, '/orders-applications-alternative/case-details')
})

router.get('/orders-applications-alternative/order-term-creditor', (req, res) => {
  const pendingOrderTerm = getOrdersApplicationsAlternativeData(req)['alternative-pending-order-term']

  if (!pendingOrderTerm || pendingOrderTerm.nextStep !== 'create-creditor') {
    return res.redirect('/orders-applications-alternative/select-order-term')
  }

  return res.render('orders-applications-alternative/order-term-creditor', {
      creditorItems: getTermsCreditorItems(
        getOrdersApplicationsAlternativeData(req),
        pendingOrderTerm.creditor || 'applicant'
      ),
      selectionError: null
  })
})

router.get('/orders-applications-alternative/order-term-creditor/cancel', (req, res, next) => {
  delete getOrdersApplicationsAlternativeData(req)['alternative-pending-order-term']
  delete getOrdersApplicationsAlternativeData(req)['alternative-creditor-order-term-index']

  return redirectWithSessionSave(req, res, next, '/orders-applications-alternative/select-order-term')
})

router.post('/orders-applications-alternative/order-term-creditor', (req, res, next) => {
  const pendingOrderTerm = getOrdersApplicationsAlternativeData(req)['alternative-pending-order-term']
  const recordedTerms = getRecordedOrderTerms(getOrdersApplicationsAlternativeData(req))

  if (!pendingOrderTerm || pendingOrderTerm.nextStep !== 'create-creditor') {
    return res.redirect('/orders-applications-alternative/select-order-term')
  }

  const selectedCreditor = getSingleValue(req.body['alternative-order-term-creditor']) || ''

  if (!selectedCreditor) {
    return res.render('orders-applications-alternative/order-term-creditor', {
      creditorItems: getTermsCreditorItems(
        getOrdersApplicationsAlternativeData(req),
        pendingOrderTerm.creditor || ''
      ),
      selectionError: 'Select a creditor.'
    })
  }

  const completedOrderTerm = {
    ...pendingOrderTerm,
    creditor: selectedCreditor,
    creditorLabel: getCreditorLabel(selectedCreditor, getOrdersApplicationsAlternativeData(req))
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

  getOrdersApplicationsAlternativeData(req)['entered-order-terms'] = recordedTerms.map(
    ({ index, ...term }) => term
  )
  getOrdersApplicationsAlternativeData(req)['alternative-creditor-order-term-index'] = String(savedOrderTermIndex)
  delete getOrdersApplicationsAlternativeData(req)['alternative-pending-order-term']
  return redirectWithSessionSave(req, res, next, '/orders-applications-alternative/order-term-review')
})

router.get('/orders-applications-alternative/order-term-review', (req, res) => {
  const orderTermIndex = Number(
    getOrdersApplicationsAlternativeData(req)['alternative-creditor-order-term-index']
  )
  const orderTerm = getRecordedOrderTerms(getOrdersApplicationsAlternativeData(req))[orderTermIndex]

  if (!orderTerm) {
    return res.redirect('/orders-applications-alternative/select-order-term')
  }

  return res.render('orders-applications-alternative/order-term-review', {
    orderTerm,
    orderTermRows: getOrderTermReviewRows(orderTerm)
  })
})

router.get('/orders-applications-alternative/application-details', (req, res) => {
  if (!getOrdersApplicationsAlternativeData(req)['case-type']) {
    return res.redirect('/orders-applications-alternative')
  }

  if (
    !isApplicationJourney(getOrdersApplicationsAlternativeData(req)) ||
    !hasCompletedPartyDetails(getOrdersApplicationsAlternativeData(req))
  ) {
    return res.redirect('/orders-applications-alternative/case-details')
  }

  return res.render('orders-applications-alternative/application-details', {
    applicationItems: getApplicationOptionItems(
      getOrdersApplicationsAlternativeData(req)['application-code']
    ),
    applicationLookupJson: getApplicationLookupJson(),
    selectionError: null
  })
})

router.post('/orders-applications-alternative/application-details', (req, res, next) => {
  if (!isApplicationJourney(getOrdersApplicationsAlternativeData(req))) {
    return res.redirect('/orders-applications-alternative/case-details')
  }

  const selectedApplicationCode = String(getSingleValue(req.body['application-code']) || '')
    .trim()
    .toUpperCase()

  getOrdersApplicationsAlternativeData(req)['application-code'] = selectedApplicationCode

  if (!getApplicationDefinition(selectedApplicationCode)) {
    return res.render('orders-applications-alternative/application-details', {
      applicationItems: getApplicationOptionItems(selectedApplicationCode),
      applicationLookupJson: getApplicationLookupJson(),
      selectionError: 'Select an application code from the list.'
    })
  }

  delete getOrdersApplicationsAlternativeData(req)['application-details-completed']

  return redirectWithSessionSave(req, res, next, '/orders-applications-alternative/application-details/content')
})

router.get('/orders-applications-alternative/application-details/content', (req, res) => {
  if (!getOrdersApplicationsAlternativeData(req)['case-type']) {
    return res.redirect('/orders-applications-alternative')
  }

  if (
    !isApplicationJourney(getOrdersApplicationsAlternativeData(req)) ||
    !hasCompletedPartyDetails(getOrdersApplicationsAlternativeData(req)) ||
    !hasValue(getOrdersApplicationsAlternativeData(req)['application-code'])
  ) {
    return res.redirect('/orders-applications-alternative/application-details')
  }

  return res.render('orders-applications-alternative/application-details-content', {
    applicationTitle: getApplicationTitle(getOrdersApplicationsAlternativeData(req)),
    applicationWording: getApplicationWording(getOrdersApplicationsAlternativeData(req))
  })
})

router.post('/orders-applications-alternative/application-details/content', (req, res, next) => {
  if (
    !isApplicationJourney(getOrdersApplicationsAlternativeData(req)) ||
    !hasValue(getOrdersApplicationsAlternativeData(req)['application-code'])
  ) {
    return res.redirect('/orders-applications-alternative/case-details')
  }

  getOrdersApplicationsAlternativeData(req)['application-foreign-court'] =
    getSingleValue(req.body['application-foreign-court']) || ''
  getOrdersApplicationsAlternativeData(req)['application-order-date'] =
    getSingleValue(req.body['application-order-date']) || ''
  getOrdersApplicationsAlternativeData(req)['application-details-completed'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/orders-applications-alternative/case-details')
})

router.get('/orders-applications-alternative/hearing-details', (req, res) => {
  if (!getOrdersApplicationsAlternativeData(req)['case-type']) {
    return res.redirect('/orders-applications-alternative')
  }

  if (
    !isApplicationJourney(getOrdersApplicationsAlternativeData(req)) ||
    !hasCompletedApplicationDetails(getOrdersApplicationsAlternativeData(req))
  ) {
    return res.redirect('/orders-applications-alternative/case-details')
  }

  return res.render('orders-applications-alternative/hearing-details')
})

router.post('/orders-applications-alternative/hearing-details', (req, res, next) => {
  if (!isApplicationJourney(getOrdersApplicationsAlternativeData(req))) {
    return res.redirect('/orders-applications-alternative/case-details')
  }

  getOrdersApplicationsAlternativeData(req)['hearing-type'] = getSingleValue(req.body['hearing-type']) || ''
  getOrdersApplicationsAlternativeData(req)['hearing-court'] = getSingleValue(req.body['hearing-court']) || ''
  getOrdersApplicationsAlternativeData(req)['hearing-date'] = getSingleValue(req.body['hearing-date']) || ''
  getOrdersApplicationsAlternativeData(req)['hearing-courtroom-number'] =
    getSingleValue(req.body['hearing-courtroom-number']) || ''
  getOrdersApplicationsAlternativeData(req)['hearing-start-time'] =
    getSingleValue(req.body['hearing-start-time']) || ''
  getOrdersApplicationsAlternativeData(req)['hearing-non-scheduled-details'] =
    getSingleValue(req.body['hearing-non-scheduled-details']) || ''
  getOrdersApplicationsAlternativeData(req)['hearing-details-completed'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/orders-applications-alternative/case-details')
})

router.get('/orders-applications-alternative/minor-creditors', (req, res) => {
  if (!hasCompletedOrderDetails(getOrdersApplicationsAlternativeData(req))) {
    return res.redirect('/orders-applications-alternative/case-details')
  }

  if (!hasMinorCreditors(getOrdersApplicationsAlternativeData(req))) {
    return res.render('orders-applications-alternative/minor-creditor-details', {
      creditor: {},
      formAction: '/orders-applications-alternative/minor-creditors',
      cancelHref: '/orders-applications-alternative/case-details'
    })
  }

  return res.render('orders-applications-alternative/minor-creditors', {
    minorCreditorCards: getMinorCreditorCards(getOrdersApplicationsAlternativeData(req)),
    primaryActionText: getOrdersApplicationsAlternativeData(req)['alternative-pending-order-term']
      ? 'Add to order term'
      : 'Return to case details',
    primaryActionHref: getOrdersApplicationsAlternativeData(req)['alternative-pending-order-term']
      ? '/orders-applications-alternative/order-term-creditor'
      : '/orders-applications-alternative/case-details'
  })
})

router.post('/orders-applications-alternative/minor-creditors', (req, res, next) => {
  const creditors = getMinorCreditors(getOrdersApplicationsAlternativeData(req))
  creditors.push(buildMinorCreditor(req.body))
  getOrdersApplicationsAlternativeData(req)['minor-creditors'] = creditors

  return redirectWithSessionSave(req, res, next, '/orders-applications-alternative/minor-creditors')
})

router.get('/orders-applications-alternative/minor-creditors/new', (req, res) => {
  if (!hasCompletedOrderDetails(getOrdersApplicationsAlternativeData(req))) {
    return res.redirect('/orders-applications-alternative/case-details')
  }

  return res.render('orders-applications-alternative/minor-creditor-details', {
    creditor: {},
    formAction: '/orders-applications-alternative/minor-creditors/new',
    cancelHref: '/orders-applications-alternative/minor-creditors'
  })
})

router.post('/orders-applications-alternative/minor-creditors/new', (req, res, next) => {
  const creditors = getMinorCreditors(getOrdersApplicationsAlternativeData(req))
  creditors.push(buildMinorCreditor(req.body))
  getOrdersApplicationsAlternativeData(req)['minor-creditors'] = creditors

  return redirectWithSessionSave(req, res, next, '/orders-applications-alternative/minor-creditors')
})

router.get('/orders-applications-alternative/minor-creditors/:index/edit', (req, res) => {
  if (!hasCompletedOrderDetails(getOrdersApplicationsAlternativeData(req))) {
    return res.redirect('/orders-applications-alternative/case-details')
  }

  const index = getMinorCreditorIndex(req.params.index, getOrdersApplicationsAlternativeData(req))

  if (index === null) {
    return res.redirect('/orders-applications-alternative/minor-creditors')
  }

  return res.render('orders-applications-alternative/minor-creditor-details', {
    creditor: getMinorCreditors(getOrdersApplicationsAlternativeData(req))[index],
    formAction: `/minor-creditors/${index}/edit`,
    cancelHref: '/orders-applications-alternative/minor-creditors'
  })
})

router.post('/orders-applications-alternative/minor-creditors/:index/edit', (req, res, next) => {
  const index = getMinorCreditorIndex(req.params.index, getOrdersApplicationsAlternativeData(req))

  if (index === null) {
    return res.redirect('/orders-applications-alternative/minor-creditors')
  }

  const creditors = getMinorCreditors(getOrdersApplicationsAlternativeData(req))
  creditors[index] = buildMinorCreditor(req.body)
  getOrdersApplicationsAlternativeData(req)['minor-creditors'] = creditors

  return redirectWithSessionSave(req, res, next, '/orders-applications-alternative/minor-creditors')
})

router.get('/orders-applications-alternative/minor-creditors/:index/remove', (req, res) => {
  if (!hasCompletedOrderDetails(getOrdersApplicationsAlternativeData(req))) {
    return res.redirect('/orders-applications-alternative/case-details')
  }

  const index = getMinorCreditorIndex(req.params.index, getOrdersApplicationsAlternativeData(req))

  if (index === null) {
    return res.redirect('/orders-applications-alternative/minor-creditors')
  }

  const creditor = getMinorCreditors(getOrdersApplicationsAlternativeData(req))[index]

  return res.render('orders-applications-alternative/remove-minor-creditor', {
    minorCreditorCard: {
      title: getMinorCreditorName(creditor, index),
      rows: getMinorCreditorSummaryRows(creditor)
    },
    formAction: `/minor-creditors/${index}/remove`
  })
})

router.post('/orders-applications-alternative/minor-creditors/:index/remove', (req, res, next) => {
  const index = getMinorCreditorIndex(req.params.index, getOrdersApplicationsAlternativeData(req))

  if (index === null) {
    return res.redirect('/orders-applications-alternative/minor-creditors')
  }

  const creditors = getMinorCreditors(getOrdersApplicationsAlternativeData(req))
  creditors.splice(index, 1)
  getOrdersApplicationsAlternativeData(req)['minor-creditors'] = creditors

  return redirectWithSessionSave(
    req,
    res,
    next,
    creditors.length ? '/orders-applications-alternative/minor-creditors' : '/orders-applications-alternative/case-details'
  )
})

router.get('/orders-applications-alternative/terms-per-beneficiary', (req, res) => {
  if (!hasCompletedOrderDetails(getOrdersApplicationsAlternativeData(req))) {
    return res.redirect('/orders-applications-alternative/case-details')
  }

  if (!hasTermsPerBeneficiary(getOrdersApplicationsAlternativeData(req))) {
    return res.redirect('/orders-applications-alternative/terms-per-beneficiary/beneficiary')
  }

  return res.render('orders-applications-alternative/terms-review', {
    beneficiaryGroups: getTermsReviewGroups(getOrdersApplicationsAlternativeData(req))
  })
})

router.get('/orders-applications-alternative/terms-per-beneficiary/beneficiary', (req, res) => {
  if (!hasCompletedOrderDetails(getOrdersApplicationsAlternativeData(req))) {
    return res.redirect('/orders-applications-alternative/case-details')
  }

  const draft = getTermsBeneficiaryDraft(getOrdersApplicationsAlternativeData(req)) || {}

  return res.render('orders-applications-alternative/terms-beneficiary', {
    applicantBeneficiaryLabel: `${getApplicantFullName(getOrdersApplicationsAlternativeData(req))} (Applicant)`,
    childAge: getAgeFromDateString(draft.dateOfBirth),
    cancelHref: hasTermsPerBeneficiary(getOrdersApplicationsAlternativeData(req))
      ? '/orders-applications-alternative/terms-per-beneficiary'
      : '/orders-applications-alternative/case-details'
  })
})

router.post('/orders-applications-alternative/terms-per-beneficiary/beneficiary', (req, res, next) => {
  getOrdersApplicationsAlternativeData(req)['terms-beneficiary-draft'] = buildTermsBeneficiaryDraft(
    req.body,
    getOrdersApplicationsAlternativeData(req)
  )

  return redirectWithSessionSave(req, res, next, '/orders-applications-alternative/terms-per-beneficiary/order-terms')
})

router.get('/orders-applications-alternative/terms-per-beneficiary/order-terms', (req, res) => {
  if (!hasCompletedOrderDetails(getOrdersApplicationsAlternativeData(req))) {
    return res.redirect('/orders-applications-alternative/case-details')
  }

  const beneficiary = getTermsBeneficiaryDraft(getOrdersApplicationsAlternativeData(req))

  if (!beneficiary) {
    return res.redirect('/orders-applications-alternative/terms-per-beneficiary/beneficiary')
  }

  return res.render('orders-applications-alternative/terms-order-terms', {
    beneficiary,
    frequencyLabel: getFrequencyLabel(getOrdersApplicationsAlternativeData(req)['order-payment-frequency']),
    creditorItems: getTermsCreditorItems(
      getOrdersApplicationsAlternativeData(req),
      getOrdersApplicationsAlternativeData(req)['terms-creditor'] || 'applicant'
    )
  })
})

router.post('/orders-applications-alternative/terms-per-beneficiary/order-terms', (req, res, next) => {
  const entry = buildTermsEntry(req.body, getOrdersApplicationsAlternativeData(req))

  if (!entry) {
    return res.redirect('/orders-applications-alternative/terms-per-beneficiary/beneficiary')
  }

  const terms = getTermsPerBeneficiary(getOrdersApplicationsAlternativeData(req))
  terms.push(entry)
  getOrdersApplicationsAlternativeData(req)['terms-per-beneficiary'] = terms
  delete getOrdersApplicationsAlternativeData(req)['terms-beneficiary-draft']

  if (req.body.action === 'add-more-terms') {
    return redirectWithSessionSave(req, res, next, '/orders-applications-alternative/terms-per-beneficiary/beneficiary')
  }

  return redirectWithSessionSave(req, res, next, '/orders-applications-alternative/terms-per-beneficiary')
})

router.get('/orders-applications-alternative/terms-per-beneficiary/:index/remove', (req, res) => {
  if (!hasCompletedOrderDetails(getOrdersApplicationsAlternativeData(req))) {
    return res.redirect('/orders-applications-alternative/case-details')
  }

  const index = getTermsIndex(req.params.index, getOrdersApplicationsAlternativeData(req))

  if (index === null) {
    return res.redirect('/orders-applications-alternative/terms-per-beneficiary')
  }

  const term = getTermsPerBeneficiary(getOrdersApplicationsAlternativeData(req))[index]

  return res.render('orders-applications-alternative/remove-terms-per-beneficiary', {
    beneficiaryGroup: {
      name: term.beneficiaryName,
      role: term.beneficiaryRole,
      tag: term.beneficiaryTag,
      rows: [getTermsReviewRow(term)]
    },
    formAction: `/terms-per-beneficiary/${index}/remove`
  })
})

router.post('/orders-applications-alternative/terms-per-beneficiary/:index/remove', (req, res, next) => {
  const index = getTermsIndex(req.params.index, getOrdersApplicationsAlternativeData(req))

  if (index === null) {
    return res.redirect('/orders-applications-alternative/terms-per-beneficiary')
  }

  const terms = getTermsPerBeneficiary(getOrdersApplicationsAlternativeData(req))
  terms.splice(index, 1)
  getOrdersApplicationsAlternativeData(req)['terms-per-beneficiary'] = terms

  return redirectWithSessionSave(
    req,
    res,
    next,
    terms.length ? '/orders-applications-alternative/terms-per-beneficiary' : '/orders-applications-alternative/case-details'
  )
})

router.get('/orders-applications-alternative/lump-sum-payment', (req, res) => {
  if (!hasCompletedOrderDetails(getOrdersApplicationsAlternativeData(req))) {
    return res.redirect('/orders-applications-alternative/case-details')
  }

  return res.render('orders-applications-alternative/lump-sum-payment', {
    creditorItems: getTermsCreditorItems(
      getOrdersApplicationsAlternativeData(req),
      getOrdersApplicationsAlternativeData(req)['lump-sum-creditor'] || 'applicant'
    )
  })
})

router.post('/orders-applications-alternative/lump-sum-payment', (req, res, next) => {
  getOrdersApplicationsAlternativeData(req)['lump-sum-payment-completed'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/orders-applications-alternative/case-details')
})

router.get('/orders-applications-alternative/interest-and-indexation', (req, res) => {
  if (!hasCompletedOrderDetails(getOrdersApplicationsAlternativeData(req))) {
    return res.redirect('/orders-applications-alternative/case-details')
  }

  return res.render('orders-applications-alternative/interest-and-indexation')
})

router.post('/orders-applications-alternative/interest-and-indexation', (req, res, next) => {
  getOrdersApplicationsAlternativeData(req)['interest-and-indexation-completed'] = 'yes'

  return redirectWithSessionSave(req, res, next, '/orders-applications-alternative/case-details')
})

router.get('/orders-applications-alternative/cancel', (req, res, next) => {
  delete getOrdersApplicationsAlternativeData(req)['case-type']
  delete getOrdersApplicationsAlternativeData(req)['applicant-type']
  delete getOrdersApplicationsAlternativeData(req)['has-order']
  delete getOrdersApplicationsAlternativeData(req)['applicant-details-completed']
  delete getOrdersApplicationsAlternativeData(req)['respondent-details-completed']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-details-completed']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-remo-reference']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-reference']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-name']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-manual-name']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-main-email-address']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-other-email-address']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-main-telephone-number']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-other-telephone-number']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-address-line-1']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-address-line-2']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-address-line-3']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-address-line-4']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-address-line-5']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-postal-or-zip-code']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-country']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-bank-account-type']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-bank-name-on-account']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-bank-sort-code']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-bank-account-number']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-bank-payment-reference']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-bank-non-uk-name-on-account']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-bank-bic-or-swift-code']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-bank-iban']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-bank-non-uk-payment-reference']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-bank-name']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-bank-branch-office-or-sort-code']
  delete getOrdersApplicationsAlternativeData(req)['central-authority-bank-non-uk-account-number']
  delete getOrdersApplicationsAlternativeData(req)['order-details-completed']
  delete getOrdersApplicationsAlternativeData(req)['order-has-periodical-payments']
  delete getOrdersApplicationsAlternativeData(req)['order-has-lump-sum']
  delete getOrdersApplicationsAlternativeData(req)['order-payment-frequency']
  delete getOrdersApplicationsAlternativeData(req)['order-application-code']
  delete getOrdersApplicationsAlternativeData(req)['order-court-that-made-the-order']
  delete getOrdersApplicationsAlternativeData(req)['order-date-order-made']
  delete getOrdersApplicationsAlternativeData(req)['order-date-arrears-last-updated']
  delete getOrdersApplicationsAlternativeData(req)['order-managing-payments']
  delete getOrdersApplicationsAlternativeData(req)['entered-order-terms']
  delete getOrdersApplicationsAlternativeData(req)['alternative-order-term-code']
  delete getOrdersApplicationsAlternativeData(req)['alternative-current-order-term-responses']
  delete getOrdersApplicationsAlternativeData(req)['alternative-edit-order-term-index']
  delete getOrdersApplicationsAlternativeData(req)['alternative-order-term-errors']
  delete getOrdersApplicationsAlternativeData(req)['alternative-creditor-order-term-index']
  delete getOrdersApplicationsAlternativeData(req)['alternative-pending-order-term']
  delete getOrdersApplicationsAlternativeData(req)['minor-creditors']
  delete getOrdersApplicationsAlternativeData(req)['terms-per-beneficiary']
  delete getOrdersApplicationsAlternativeData(req)['terms-beneficiary-draft']
  delete getOrdersApplicationsAlternativeData(req)['lump-sum-payment-completed']
  delete getOrdersApplicationsAlternativeData(req)['lump-sum-amount']
  delete getOrdersApplicationsAlternativeData(req)['lump-sum-enter-pay-by-date']
  delete getOrdersApplicationsAlternativeData(req)['lump-sum-reason-for-payment']
  delete getOrdersApplicationsAlternativeData(req)['lump-sum-creditor']
  delete getOrdersApplicationsAlternativeData(req)['interest-and-indexation-completed']
  delete getOrdersApplicationsAlternativeData(req)['interest-applies']
  delete getOrdersApplicationsAlternativeData(req)['indexation-type']
  delete getOrdersApplicationsAlternativeData(req)['case-comment']
  delete getOrdersApplicationsAlternativeData(req)['case-notes']
  delete getOrdersApplicationsAlternativeData(req)['application-details-completed']
  delete getOrdersApplicationsAlternativeData(req)['application-code']
  delete getOrdersApplicationsAlternativeData(req)['application-foreign-court']
  delete getOrdersApplicationsAlternativeData(req)['application-order-date']
  delete getOrdersApplicationsAlternativeData(req)['hearing-details-completed']
  delete getOrdersApplicationsAlternativeData(req)['hearing-type']
  delete getOrdersApplicationsAlternativeData(req)['hearing-court']
  delete getOrdersApplicationsAlternativeData(req)['hearing-date']
  delete getOrdersApplicationsAlternativeData(req)['hearing-courtroom-number']
  delete getOrdersApplicationsAlternativeData(req)['hearing-start-time']
  delete getOrdersApplicationsAlternativeData(req)['hearing-non-scheduled-details']

  return redirectWithSessionSave(req, res, next, '/')
})

router.get('/orders-applications-alternative/cancel-case-creation', (req, res) => {
  if (!getOrdersApplicationsAlternativeData(req)['case-type']) {
    return res.redirect('/orders-applications-alternative')
  }

  return res.render('orders-applications-alternative/cancel-case-creation')
})

router.post('/orders-applications-alternative/cancel-case-creation', (req, res, next) => {
  if (req.body['cancel-case-creation'] === 'yes') {
    return res.redirect('/orders-applications-alternative/cancel')
  }

  return redirectWithSessionSave(req, res, next, '/orders-applications-alternative/case-details')
})


router.get('/resulting', (req, res) => {
  return res.render('resulting/index')
})

router.get('/review-results', (req, res) => {
  const inReviewRows = [
    {
      id: 0,
      applicant: 'ARKET, Patricia',
      respondent: 'FISHER, Edward',
      hearingDate: '21 March 2026',
      created: 'Today'
    },
    {
      id: 1,
      applicant: 'SMITH, Joan',
      respondent: 'FISHER, Ewan',
      hearingDate: '20 March 2026',
      created: '1 day ago'
    },
    {
      id: 2,
      applicant: 'AYRE, Jane',
      respondent: 'FISHER, Evan',
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
      respondentName: 'Mr Edward FISHER',
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
          value: { text: 'Patricia' }
        },
        {
          key: { text: 'Last name' },
          value: { text: 'Arket' }
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
          value: { text: 'Edward' }
        },
        {
          key: { text: 'Last name' },
          value: { text: 'Fisher' }
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
      respondentName: 'Mr Ewan FISHER',
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
        { key: { text: 'First names' }, value: { text: 'Joan' } },
        { key: { text: 'Last name' }, value: { text: 'Smith' } },
        { key: { text: 'Address' }, value: { html: '99 High Street<br>Twyford<br>Berkshire<br>RG10 9RT' } }
      ],
      respondentRows: [
        { key: { text: 'Title' }, value: { text: 'Mr' } },
        { key: { text: 'First names' }, value: { text: 'Ewan' } },
        { key: { text: 'Last name' }, value: { text: 'Fisher' } },
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
      respondentName: 'Mr Evan FISHER',
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
        { key: { text: 'First names' }, value: { text: 'Jane' } },
        { key: { text: 'Last name' }, value: { text: 'Ayre' } },
        { key: { text: 'Address' }, value: { html: '101 King Street<br>Reading<br>Berkshire<br>RG1 2AB' } }
      ],
      respondentRows: [
        { key: { text: 'Title' }, value: { text: 'Mr' } },
        { key: { text: 'First names' }, value: { text: 'Evan' } },
        { key: { text: 'Last name' }, value: { text: 'Fisher' } },
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
      applicant: 'ARKET, Patricia',
      respondent: 'FISHER, Edward',
      hearingDate: '21 March 2026',
      created: 'Today',
      submittedBy: 'joe.bloggs'
    },
    {
      id: 1,
      applicant: 'SMITH, Joan',
      respondent: 'FISHER, Ewan',
      hearingDate: '20 March 2026',
      created: '1 day ago',
      submittedBy: 'joe.bloggs'
    },
    {
      id: 2,
      applicant: 'AYRE, Jane',
      respondent: 'FISHER, Evan',
      hearingDate: '18 March 2026',
      created: '2 days ago',
      submittedBy: 'emma.davis'
    }
  ]

  return res.render('check-results/index', {
    toReviewTableRows: toReviewRows.map((row) => [
      {
        text: row.applicant
      },
      {
        html: `<a class="govuk-link" href="/check-results/${row.id}">${escapeHtml(row.respondent)}</a>`
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
      respondentName: 'Mr Edward FISHER',
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
        { key: { text: 'First names' }, value: { text: 'Patricia' } },
        { key: { text: 'Last name' }, value: { text: 'Arket' } },
        { key: { text: 'Address' }, value: { html: '24 High Street<br>Twyford<br>Berkshire<br>RG10 9RT' } }
      ],
      respondentRows: [
        { key: { text: 'Title' }, value: { text: 'Mr' } },
        { key: { text: 'First names' }, value: { text: 'Edward' } },
        { key: { text: 'Last name' }, value: { text: 'Fisher' } },
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
      respondentName: 'Mr Ewan FISHER',
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
        { key: { text: 'First names' }, value: { text: 'Joan' } },
        { key: { text: 'Last name' }, value: { text: 'Smith' } },
        { key: { text: 'Address' }, value: { html: '99 High Street<br>Twyford<br>Berkshire<br>RG10 9RT' } }
      ],
      respondentRows: [
        { key: { text: 'Title' }, value: { text: 'Mr' } },
        { key: { text: 'First names' }, value: { text: 'Ewan' } },
        { key: { text: 'Last name' }, value: { text: 'Fisher' } },
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
      respondentName: 'Mr Evan FISHER',
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
        { key: { text: 'First names' }, value: { text: 'Jane' } },
        { key: { text: 'Last name' }, value: { text: 'Ayre' } },
        { key: { text: 'Address' }, value: { html: '101 King Street<br>Reading<br>Berkshire<br>RG1 2AB' } }
      ],
      respondentRows: [
        { key: { text: 'Title' }, value: { text: 'Mr' } },
        { key: { text: 'First names' }, value: { text: 'Evan' } },
        { key: { text: 'Last name' }, value: { text: 'Fisher' } },
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

router.get('/create-and-validate-draft-orders', (req, res) => {
  const toReviewRows = [
    {
      id: 0,
      applicant: 'NOWAK, Anna',
      respondent: 'NOWAK, Piotr',
      hearingDate: '16 March 2026',
      created: 'Today',
      submittedBy: 'david.watts'
    },
    {
      id: 1,
      applicant: 'ARKET, Patricia',
      respondent: 'FISHER, Edward',
      hearingDate: '21 March 2026',
      created: 'Today',
      submittedBy: 'joe.bloggs'
    },
    {
      id: 2,
      applicant: 'AYRE, Jane',
      respondent: 'FISHER, Evan',
      hearingDate: '22 March 2026',
      created: '1 day ago',
      submittedBy: 'emily.davis'
    }
  ]

  return res.render('create-and-validate-draft-orders/index', {
    toReviewTableRows: toReviewRows.map((row) => [
      {
        text: row.applicant
      },
      {
        html: `<a class="govuk-link" href="/create-and-validate-draft-orders/${row.id}">${escapeHtml(row.respondent)}</a>`
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

router.get('/create-and-validate-draft-orders/:index', (req, res) => {
  const index = Number(req.params.index)
  const draftOrderEntries = [
    {
      respondentName: 'Mr Piotr NOWAK',
      caseTypeLabel: 'REMO In',
      applicantTypeLabel: 'Individual',
      submittedBy: 'david.watts',
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
      respondentName: 'Mr Edward FISHER',
      caseTypeLabel: 'REMO Out',
      applicantTypeLabel: 'Individual',
      submittedBy: 'joe.bloggs',
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
        buildSummaryRow('First names', 'Patricia'),
        buildSummaryRow('Last name', 'Arket'),
        buildSummaryHtmlRow(
          'Address',
          formatLinesHtml(['84 REDA', 'GDANSKA', 'POLAND'])
        )
      ],
      respondentRows: [
        buildSummaryRow('Title', 'Mr'),
        buildSummaryRow('First names', 'Edward'),
        buildSummaryRow('Last name', 'Fisher'),
        buildSummaryHtmlRow(
          'Address',
          formatLinesHtml(['99 High Street', 'Reading', 'RG10 9RT'])
        )
      ],
      centralAuthorityRows: [],
      beneficiaryGroups: [
        {
          name: 'Patricia Arket',
          subtitle: 'Applicant',
          tag: 'Draft',
          rows: [
            [
              { text: '7 January 2026' },
              { text: 'Payable through the Court' },
              { text: 'Monthly' },
              { text: '£120.00' },
              { text: 'Patricia Arket' },
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
    }
  ]

  const draftOrderEntry = draftOrderEntries[index]

  if (!draftOrderEntry) {
    return res.redirect('/create-and-validate-draft-orders')
  }

  return res.render('create-and-validate-draft-orders/detail', draftOrderEntry)
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
  return res.render('orders-applications/applicant-details', {
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

    return res.render('orders-applications/applicant-details', {
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
  return res.render('orders-applications/respondent-details', {
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

    return res.render('orders-applications/respondent-details', {
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

  return res.render('orders-applications/central-authority-details', {
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
  return res.render('orders-applications/central-authority-details-manual', {
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

  return res.render('orders-applications/remove-central-authority-details', {
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
  return res.render('orders-applications/case-comments-and-notes', {
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
    responseItems: getResultingResponseItems(req.session.data)
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
      responseItems: getResultingResponseItems(req.session.data)
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
    resultsRows: getResultingResultsSummaryRows(req.session.data),
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



