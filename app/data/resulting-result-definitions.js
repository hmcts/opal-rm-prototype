const adjournedHearingFields = [
  {
    name: 'Adjournment',
    prompt: 'Adjournment date',
    type: 'date',
    mandatory: 'Yes'
  },
  {
    name: 'Court',
    prompt: 'Court venue',
    type: 'menu-autocomplete',
    mandatory: 'Yes',
    options: 'Courts-API'
  },
  {
    name: 'Time',
    prompt: 'Hearing time',
    type: 'text-60',
    mandatory: 'Yes'
  },
  {
    name: 'Reason',
    prompt: 'Reason for hearing',
    type: 'text-1000',
    mandatory: 'Yes'
  }
]

const orderAndResultJourneyCodes = ['MAT', 'MCHILD', 'MLUMP', 'MNSTD', 'MPAY', 'MTEMP']
const createCreditorNextStepCodes = ['MAT', 'MCHILD', 'MLUMP', 'MPAY', 'MTEMP']

const rawResultDefinitions = {
  MAT: {
    title: 'Matrimonial Order for Adult',
    category: 'FINAL',
    wordingTemplate:
      'Order for payment by {Respondent} to {Creditor} {Payment} for the benefit of the Complainant.\nThe sum of £ {Amount} to be paid every {Frequency} from {Commencement} until {Expiry}.',
    responses: [
      {
        name: 'Amount',
        prompt: 'Amount of order',
        type: 'decimal',
        mandatory: 'Yes'
      },
      {
        name: 'Frequency',
        prompt: 'Terms frequency',
        type: 'menu-radio',
        mandatory: 'Yes',
        options: 'week, fortnight, month, quarter, year'
      },
      {
        name: 'Expiry',
        prompt: 'Expiry Date',
        type: 'date',
        mandatory: 'No'
      },
      {
        name: 'Arrears',
        prompt: 'Arrears Amount',
        type: 'decimal',
        mandatory: 'Yes'
      },
      {
        name: 'Creditor',
        prompt: 'Creditor name',
        type: 'text-60',
        mandatory: 'Yes'
      },
      {
        name: 'Respondent',
        prompt: 'Respondent name',
        type: 'text-60',
        mandatory: 'Yes'
      },
      {
        name: 'Payment',
        prompt: 'Payment arrangement',
        type: 'menu-radio',
        mandatory: 'Yes',
        options: 'payable through the Court, payable between the parties'
      },
      {
        name: 'Commencement',
        prompt: 'Commencement Date',
        type: 'date',
        mandatory: 'Yes'
      }
    ]
  },
  MCHILD: {
    title: 'Maintenace Order for child(ren)',
    category: 'FINAL',
    wordingTemplate:
      'Order for payment by {Respondent} to {Creditor} {Payment} for the benefit of the Complainant.\nThe sum of £ {Amount} to be paid every {Frequency} from {Commencement} until {Expiry}.',
    responses: [
      {
        name: 'Amount',
        prompt: 'Amount of order',
        type: 'decimal',
        mandatory: 'Yes'
      },
      {
        name: 'Frequency',
        prompt: 'Terms frequency',
        type: 'menu-radio',
        mandatory: 'Yes',
        options: 'week, fortnight, month, quarter, year'
      },
      {
        name: 'Expiry',
        prompt: 'Expiry Date',
        type: 'date',
        mandatory: 'Yes'
      },
      {
        name: 'Arrears',
        prompt: 'Arrears Amount',
        type: 'decimal',
        mandatory: 'Yes'
      },
      {
        name: 'Education',
        prompt: 'Expiry terms',
        type: 'menu-checkbox',
        mandatory: 'No',
        min: '0',
        max: '1',
        options: 'Order until completion of full-time eduction'
      },
      {
        name: 'Beneficiary',
        prompt: "Child's name",
        type: 'text-60',
        mandatory: 'Yes'
      },
      {
        name: 'Respondent',
        prompt: 'Respondent name',
        type: 'text-60',
        mandatory: 'Yes'
      },
      {
        name: 'Payment',
        prompt: 'Payment arrangement',
        type: 'menu-radio',
        mandatory: 'Yes',
        options: 'payable through the Court, payable between the parties'
      },
      {
        name: 'Commencement',
        prompt: 'Commencement Date',
        type: 'date',
        mandatory: 'Yes'
      }
    ]
  },
  MLUMP: {
    title: 'Lump sum order',
    category: 'FINAL',
    wordingTemplate:
      'Order for payment by {Respondent} to {Creditor} {Payment} for {Reason}.\nThe sum of £ {Amount} to be paid on or before {Expiry}.',
    responses: [
      {
        name: 'Amount',
        prompt: 'Amount of order',
        type: 'decimal',
        mandatory: 'Yes'
      },
      {
        name: 'Creditor',
        prompt: 'Creditor name',
        type: 'text-60',
        mandatory: 'Yes'
      },
      {
        name: 'Respondent',
        prompt: 'Respondent name',
        type: 'text-60',
        mandatory: 'Yes'
      },
      {
        name: 'Payment',
        prompt: 'Payment arrangement',
        type: 'menu-radio',
        mandatory: 'Yes',
        options: 'payable through the Court, payable between the parties'
      },
      {
        name: 'Reason',
        prompt: 'Reason for order',
        type: 'text-1000',
        mandatory: 'Yes'
      },
      {
        name: 'Due',
        prompt: 'Cost due by date',
        type: 'date',
        mandatory: 'Yes'
      }
    ]
  },
  MNSTD: {
    title: 'Non-standard order',
    category: 'ANCILLARY',
    wordingTemplate: '{Details}',
    responses: [
      {
        name: 'Details',
        prompt: 'Non-standard details',
        type: 'text-1000',
        mandatory: 'Yes'
      }
    ]
  },
  MSUMM: {
    title: 'Enforcement summons',
    category: 'INTERIM',
    wordingTemplate: 'Summons issued for hearing on {Date of hearing} at {Court venue}',
    responses: [
      {
        name: 'Hearing',
        prompt: 'Date of hearing',
        type: 'date',
        mandatory: 'Yes'
      },
      {
        name: 'Court',
        prompt: 'Court venue',
        type: 'menu-autocomplete',
        mandatory: 'Yes',
        options: 'Courts-API'
      },
      {
        name: 'Time',
        prompt: 'Hearing time',
        type: 'text-60',
        mandatory: 'Yes'
      }
    ]
  },
  MNENF: {
    title: 'Enforcement hearing',
    category: 'FINAL',
    wordingTemplate: 'Summons issued for hearing on {Date of hearing} at {Court venue}',
    responses: [
      {
        name: 'Hearing',
        prompt: 'Date of hearing',
        type: 'date',
        mandatory: 'Yes'
      },
      {
        name: 'Court',
        prompt: 'Court venue',
        type: 'menu-autocomplete',
        mandatory: 'Yes',
        options: 'Courts-API'
      },
      {
        name: 'Time',
        prompt: 'Hearing time',
        type: 'text-60',
        mandatory: 'Yes'
      },
      {
        name: 'Reason',
        prompt: 'Reason for hearing',
        type: 'text-1000',
        mandatory: 'Yes'
      }
    ]
  },
  MADJ: {
    title: 'Case adjourned',
    category: 'INTERIM',
    wordingTemplate:
      'Adjourned to {Date of hearing} at {Hearing time} at {Court venue}. Reason: {Reason}',
    responses: adjournedHearingFields
  },
  MPAY: {
    title: 'Ordered to pay arrears (no adjourment)',
    category: 'FINAL',
    wordingTemplate: 'Order to pay arrears of {Arrears}. {Details}',
    responses: [
      {
        name: 'Arrears',
        prompt: 'Amount of arrears',
        type: 'decimal',
        mandatory: 'Yes'
      },
      {
        name: 'Details',
        prompt: 'Non-standard details',
        type: 'text-1000',
        mandatory: 'Yes'
      }
    ]
  },
  MTEMP: {
    title: 'Temporary order',
    category: 'FINAL',
    wordingTemplate: 'Temporary order for payment by {Respondent} to {Creditor}. {Reason}.',
    responses: [
      {
        name: 'Creditor',
        prompt: 'Creditor name',
        type: 'text-60',
        mandatory: 'Yes'
      },
      {
        name: 'Respondent',
        prompt: 'Respondent name',
        type: 'text-60',
        mandatory: 'Yes'
      },
      {
        name: 'Reason',
        prompt: 'Reason for order',
        type: 'text-1000',
        mandatory: 'Yes'
      }
    ]
  },
  MAEO: {
    title: 'Attachment of Earnings Order made',
    category: 'FINAL',
    wordingTemplate:
      'Attachment of earnings order made. Normal Deduction Rate £{Deduction}. Protected Earnings Rate £{Protected} every {Period}.',
    responses: [
      {
        name: 'Deduction',
        prompt: 'Normal deduction rate',
        type: 'decimal',
        mandatory: 'Yes'
      },
      {
        name: 'Protected',
        prompt: 'Protected earnings rate',
        type: 'decimal',
        mandatory: 'Yes'
      },
      {
        name: 'Period',
        prompt: 'Pay period',
        type: 'text-60',
        mandatory: 'Yes'
      }
    ]
  },
  MWDN: {
    title: 'Withdrawn',
    category: 'FINAL',
    wordingTemplate: 'Withdrawn',
    responses: []
  },
  MREMT: {
    title: 'Arrears remitted',
    category: 'FINAL',
    wordingTemplate: 'Arrears in the sum of £{Amount} remitted. {Reason}.',
    responses: [
      {
        name: 'Arrears',
        prompt: 'Amount of arrears remitted',
        type: 'decimal',
        mandatory: 'Yes'
      },
      {
        name: 'Reason',
        prompt: 'Reason for order',
        type: 'text-1000',
        mandatory: 'No'
      }
    ]
  },
  MBAIL: {
    title: 'Bailiff Service Ordered',
    category: 'INTERIM',
    wordingTemplate:
      'Adjourned to {Date of hearing} at {Hearing time} at {Court venue}. Reason: {Reason}',
    responses: adjournedHearingFields
  },
  MCMTP: {
    title: 'Contempt Proceedings',
    category: 'INTERIM',
    wordingTemplate:
      'Adjourned to {Date of hearing} at {Hearing time} at {Court venue}. Reason: {Reason}',
    responses: adjournedHearingFields
  },
  MTPDA: {
    title: 'Interim Third Party Debt Order (with adjournment)',
    category: 'INTERIM',
    wordingTemplate:
      'Adjourned to {Date of hearing} at {Hearing time} at {Court venue}. Reason: {Reason}',
    responses: adjournedHearingFields
  },
  MTPDO: {
    title: 'Third Party Debt Order (no adjournment)',
    category: 'INTERIM',
    wordingTemplate:
      'Adjourned to {Date of hearing} at {Hearing time} at {Court venue}. Reason: {Reason}',
    responses: adjournedHearingFields
  },
  MCOO: {
    title: 'Charging Order (with adjournment)',
    category: 'INTERIM',
    wordingTemplate:
      'Adjourned to {Date of hearing} at {Hearing time} at {Court venue}. Reason: {Reason}',
    responses: adjournedHearingFields
  },
  MCON: {
    title: 'Charging Order (no adjournment)',
    category: 'INTERIM',
    wordingTemplate:
      'Adjourned to {Date of hearing} at {Hearing time} at {Court venue}. Reason: {Reason}',
    responses: adjournedHearingFields
  },
  MWOC: {
    title: 'Warrant of Control (with adjournment)',
    category: 'INTERIM',
    wordingTemplate:
      'Adjourned to {Date of hearing} at {Hearing time} at {Court venue}. Reason: {Reason}',
    responses: adjournedHearingFields
  },
  MWCN: {
    title: 'Warrant of Control (no adjournment)',
    category: 'INTERIM',
    wordingTemplate:
      'Adjourned to {Date of hearing} at {Hearing time} at {Court venue}. Reason: {Reason}',
    responses: adjournedHearingFields
  },
  MWOA: {
    title: 'Warrant of Arrest (with adjournment)',
    category: 'INTERIM',
    wordingTemplate:
      'Adjourned to {Date of hearing} at {Hearing time} at {Court venue}. Reason: {Reason}',
    responses: adjournedHearingFields
  },
  MWAN: {
    title: 'Warrant of Arrest (no adjournment)',
    category: 'INTERIM',
    wordingTemplate:
      'Adjourned to {Date of hearing} at {Hearing time} at {Court venue}. Reason: {Reason}',
    responses: adjournedHearingFields
  }
}

module.exports = Object.fromEntries(
  Object.entries(rawResultDefinitions).map(([code, definition]) => [
    code,
    {
      ...definition,
      journeys: orderAndResultJourneyCodes.includes(code)
        ? ['orders', 'results']
        : ['results'],
      nextStep: createCreditorNextStepCodes.includes(code)
        ? 'create-creditor'
        : undefined
    }
  ])
)
