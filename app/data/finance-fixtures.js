// Indicative finance journeys adapted from Cogworx-UCD/opal-prototype at 5ed3bee.
// These are fictional examples for design discussion, not agreed RM financial rules.
const reports = {
  'unpresented-cheques': 'Unpresented cheques report',
  'bacs-file': 'BACS file report',
  'bank-list': 'Bank report',
  'control-totals': 'Control totals report',
  'dishonoured-cheques': 'Dishonoured cheques report',
  witnesses: 'Witness expenses report',
  suspense: 'Suspense report',
  'outstanding-payment': 'Reversed payments report',
  'presented-cheques': 'Presented cheques report',
  'court-fees-report': 'Court fees report',
  'bacs-payments': 'BACS payments report',
  'cheques-report': 'Cheques report',
  'write-off-report': 'Write-off analysis report',
  'major-creditor-negative-balance': 'Major creditors with negative balances report',
  'fines-enforcement-mis': 'Fines enforcement MIS report',
  'write-off-analysis': 'Quarter end write-off analysis report',
  'cumulative-annual-write-off': 'Cumulative annual write-off analysis report',
  'quarter-year-end-report': 'Quarter and year end report'
}

const checks = {
  'daily-checks': {
    title: 'Daily checks', tasks: ['print-cheques', 'unpresented-cheques', 'bacs-file', 'bank-list',
      'control-totals', 'dishonoured-cheques', 'witnesses', 'suspense', 'outstanding-payment',
      'process-presented-cheques', 'presented-cheques']
  },
  'month-end': {
    title: 'Month end', tasks: ['suspense', 'bank-list', 'court-fees-report', 'court-fees-transfer',
      'bacs-payments', 'payout', 'print-cheques', 'bacs-file', 'major-c-bacs', 'cheques-report',
      'outstanding-payment', 'dishonoured-cheques', 'witnesses', 'write-off-report', 'control-totals']
  },
  'quarter-year-end': {
    title: 'Quarter and year end', tasks: ['quarter-year-end-report', 'major-creditor-negative-balance',
      'fines-enforcement-mis', 'control-totals', 'write-off-analysis', 'cumulative-annual-write-off']
  }
}

const taskNames = {
  ...reports, 'print-cheques': 'Print cheques', 'process-presented-cheques': 'Automated presented cheques',
  'court-fees-transfer': 'Transfer court fees', payout: 'Pay out', 'major-c-bacs': 'Major creditor remittances'
}

const applicability = {
  witnesses: 'Witness expenses are carried over from Fines. Their use in RM needs to be confirmed.',
  'fines-enforcement-mis': 'This Fines report is included for review. Its purpose and replacement, if any, in RM are not yet agreed.',
  'major-creditor-negative-balance': 'Major creditor reporting is carried over from Fines. The RM creditor groups and rules need to be confirmed.',
  'write-off-report': 'Write-off reporting and its use in RM need to be confirmed.',
  'write-off-analysis': 'Write-off reporting and its use in RM need to be confirmed.',
  'cumulative-annual-write-off': 'Annual write-off reporting and its use in RM need to be confirmed.'
}

module.exports = {
  reports, checks, taskNames, applicability,
  chequeNumbers: ['524589', '125'],
  bankAccounts: [
    { number: '90233765', sortCode: '123456', transactions: ['1388875'] },
    { number: '27614589', sortCode: '654321', transactions: ['2045981', '2045982', '2045983'] }
  ],
  suspense: [
    { ref: '234', amount: '150', reason: 'Miscellaneous', method: 'Notes and coins' },
    { ref: '567', amount: '3200', reason: 'Unidentified', method: 'Credit transfer' },
    { ref: '890', amount: '750', reason: 'Maintenance', method: 'Cheque' },
    { ref: '123', amount: '0', reason: 'Unidentified', method: 'Credit transfer' },
    { ref: '456', amount: '25000', reason: 'Overpayment', method: 'Credit transfer' }
  ]
}
