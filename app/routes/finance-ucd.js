// UCD finance screen interactions, adapted to RM's session-only prototype.
// Source: Cogworx-UCD/opal-prototype 5ed3bee. No source CSS or browser-storage scripts.
const express = require(require.resolve('express', { paths: [require.resolve('govuk-prototype-kit')] }))
const screens = require('../data/finance-ucd-screens.json')
const examples = require('../data/finance-ucd-examples.json')

module.exports = function financeUcd(helpers) {
  const router = express.Router()
  const { suspenseItems, cheques, bacsPayments, minorCreditorAccounts, staticReports } = structuredClone(examples)
  const rmAccounts = helpers.accounts()
  cheques.forEach((cheque,index) => {
    const account=rmAccounts[index % rmAccounts.length]
    if(account)Object.assign(cheque,{accountNumber:account.ref,accountName:account.name,accountType:'Maintenance account',balance:helpers.money(account.balance),arrears:account.arrears})
  })
  minorCreditorAccounts.forEach((creditor,index) => {
    const account=rmAccounts[index % rmAccounts.length]
    if(account)Object.assign(creditor,{accountName:account.applicantName,respondentAccountNumber:account.ref,respondentName:account.name})
  })
  function sourceState(req) {
    req.session.data.financeUcd = req.session.data.financeUcd || {serviceDomain: 'RM', businessUnit: 'RM'}
    return req.session.data.financeUcd
  }

  router.use((req, res, next) => {
    if (req.path.endsWith('.html')) return res.redirect('/finance' + req.path.slice(0,-5) + (req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : ''))

    if (!/^\/(suspense|repayment|cancel-cheques|reissue-bacs-payments|daily-checks|month-end|quarter-year-end|reports|reversed-payments)(?:\/|$)/.test(req.path)) return next()
    const state = sourceState(req)
    Object.assign(state, req.query, req.body)
    state.serviceDomain = 'RM'; state.businessUnit = 'RM'
    const render = res.render.bind(res)
    const redirect = res.redirect.bind(res)
    res.redirect = (url) => redirect(typeof url === 'string' && /^\/(suspense|repayment|cancel-cheques|reissue-bacs-payments|daily-checks|month-end|quarter-year-end|reports)(?:\/|$|\?)/.test(url) ? '/finance' + url : url)
    res.render = (template, view = {}) => {
      if (/^(suspense|repayment|cancel-cheques|reissue-bacs-payments|daily-checks|month-end|quarter-year-end|reports)\//.test(template)) template='finance/ucd/'+template

      const showNav = /(?:task-list|(?:daily-checks|month-end)\/(?:bank-list|bacs-file|control-totals|unpresented-cheques|presented-cheques|dishonoured-cheques|witnesses|suspense|outstanding-payment|court-fees-report|cheques-report|bacs-payments|write-off-report)|suspense\/(?:search|item|not-found)|(?:cancel-cheques|reissue-bacs-payments)\/index)$/.test(template)
      const definition=screens.find(s=>s.template===template)
      const reported=Array.isArray(view.errors)?view.errors:view.error?[{text:view.error,href:'#'+(definition?.fields[0] || '')}]:[]
      const aliases={'account-number':'accountNumber','suspense-note':'suspenseNote','account-note':'accountNote'}
      const inline=Object.fromEntries(reported.map(error=>{const id=String(error.href || '').replace(/^#/,'');return [aliases[id] || id,{text:error.text}]}))
      view.fieldErrors={...inline,...view.fieldErrors}
      let sourcePagination
      const list = view.historyRows || view.reports || view.item?.transactions
      if (Array.isArray(list)) {
        const page=helpers.page(list,req,'/finance'+req.path)
        sourcePagination=page.pagination
        if(view.historyRows)view.historyRows=page.items
        else if(view.reports)view.reports=page.items
        else view.item={...view.item,firstPaymentTransaction:view.item.transactions.find(t=>t.firstPayment),transactions:page.items}
      }
      if(view.historyRows)view.historyRows=view.historyRows.map(row=>row.type==='Notes'?{...row,detail:helpers.escapeHtml(row.detail)}:row)
      if(view.item?.transactions)view.item.transactions=view.item.transactions.map(row=>row.isNote?{...row,detail:helpers.escapeHtml(row.detail)}:row)
      const flash = state.flash; delete state.flash
      return render(template, {sourceSelect: params => ({...params, items: params.items.map(item => params.value ? {...item, selected: (item.value || item.text) === params.value} : item)}), sourcePagination, respondentAccount: findRespondent(state.accountNumber), respondentRows: findRespondent(state.accountNumber) ? helpers.accountRows(findRespondent(state.accountNumber)) : [], data: {...state, ...req.body}, sourceScreen: screens.find(s => s.template === template)?.url, sourceErrors: [], fieldErrors: {}, sourceFlash: flash, showNav: showNav || /finance\/ucd\/(?:cancel-cheques\/cheque-history|reissue-bacs-payments\/(?:at-a-glance|payment-history))$/.test(template) || /finance\/ucd\/(?:daily-checks|month-end)\/(?:print-cheques|print-report|process-presented-cheques|processed-presented-cheques|payout-minor|payout-major|payout-hmcts|major-c-bacs|court-fees-transfer)$/.test(template) || /finance\/ucd\/quarter-year-end\/(?:control-totals|major-creditor-negative-balance|fines-enforcement-mis|cumulative-annual-write-off|write-off-analysis|quarter-year-end-report)$/.test(template), ...view})
    }
    next()
  })
  function findRespondent(value) {
    const input = String(value || '').replace(/\s/g,'').toUpperCase()
    return helpers.accounts().find(a => a.ref === input || (/^\d{8}$/.test(input) && a.ref.slice(0,8) === input))
  }
  function suspenseBalance(req,item) {
    return item.balance + (sourceState(req).suspenseTransactions?.[item.referenceNumber] || []).reduce((sum,t) => sum+t.amount,0)
  }
  router.use((req,res,next) => {
    if(req.method !== 'POST' || !req.path.startsWith('/suspense/'))return next()
    const state=sourceState(req), path=req.path.split('/').pop()
    const item=suspenseItems.find(i=>i.referenceNumber===String(req.body.suspenseRef || ''))
    if(['transfer','repay-respondent'].includes(path)) {
      const account=findRespondent(req.body.accountNumber)
      if(!account)return res.render('finance/ucd/suspense/'+path,{suspenseRef:req.body.suspenseRef,sourceErrors:[{href:'#account-number',text:'Respondent account not found'}],fieldErrors:{accountNumber:{text:'Respondent account not found'}}})
      state.accountNumber=account.ref
    }
    const amountField={'confirm-transfer':'amountToTransfer','confirm-repay-respondent':'amountToRepay','confirm-repay-third-party':'amountToRepay','pay-hmcts':'paymentAmount','reverse':'reverseAmount'}[path]
    if(amountField) {
      if(!item)return res.redirect('/finance/suspense/search')
      const balance=suspenseBalance(req,item)
      if (balance<=0) return res.redirect('/finance/suspense/cannot-action?ref='+encodeURIComponent(item.referenceNumber))
      const amount=['pay-hmcts','reverse'].includes(path)?String(balance):helpers.parseMoney(req.body[amountField])
      const messages={}
      if(amount===null || BigInt(amount)<=0n || BigInt(amount)>BigInt(balance))messages[amountField]='Enter an amount greater than £0 and no more than the suspense balance'
      if(!String(req.body.suspenseNote || '').trim())messages.suspenseNote='Enter a suspense note'
      if(String(req.body.suspenseNote || '').length>1000)messages.suspenseNote='Suspense note must be 1,000 characters or fewer'
      if(Object.keys(messages).length) {
        const errors=Object.entries(messages).map(([field,text])=>({href:'#'+(field==='suspenseNote'?'suspense-note':field),text}))
        return res.render('finance/ucd/suspense/'+path,{suspenseRef:item.referenceNumber,item:{...item,balance,balanceFormatted:helpers.money(String(balance))},sourceErrors:errors,fieldErrors:Object.fromEntries(Object.entries(messages).map(([id,text])=>[id,{text}]))})
      }
      if(['pay-hmcts','reverse'].includes(path))req.body[amountField]=String(balance)
    }
    if(path==='add-note' && (!String(req.body.suspenseNote || '').trim() || String(req.body.suspenseNote).length>1000))return res.render('finance/ucd/suspense/add-note',{suspenseRef:req.body.suspenseRef,item,sourceErrors:[{href:'#suspense-note',text:'Enter a suspense note of 1,000 characters or fewer'}],fieldErrors:{suspenseNote:{text:'Enter a suspense note of 1,000 characters or fewer'}}})
    next()
  })
  router.get('/suspense/item/:ref/:action?',(req,res)=> {
    const actions={'hmcts':'pay-hmcts','repay-respondent':'repay-respondent','repay-third-party':'confirm-repay-third-party',note:'add-note'}
    return res.redirect('/finance/suspense/'+(actions[req.params.action] || req.params.action || 'item')+'?ref='+encodeURIComponent(req.params.ref))
  })
  router.use((req,res,next) => {
    if(req.method !== 'POST')return next()
    const state=sourceState(req)
    const source=screens.find(s=>s.url===req.body.financeScreen)
    if(source && /\/create-/.test(source.url)) {
      const messages={}
      const selector=source.fields.find(name=>/Category$|ReportType\d*$/.test(name))
      if(selector && !req.body[selector])messages[selector]='Select a report type'
      for(const field of source.fields.filter(name=>/DateFrom|DateTo|dateFrom|dateTo|Date$/.test(name)))if(req.body[field] && !helpers.validDate(req.body[field]))messages[field]='Enter a valid date'
      if(Object.keys(messages).length)return sourceForm(req,res,source,messages)
    }
    if(req.path==='/month-end/payout-minor' && !req.body.payoutMinorCreditor) {
      const methods=Array.isArray(req.body.payoutMethod)?req.body.payoutMethod:req.body.payoutMethod?[req.body.payoutMethod]:[]
      const messages={}
      if(!methods.length || methods.some(m=>!['Paid by cheque','Paid by BACS'].includes(m)))messages.payoutMethod='Select a payout method'
      for(const [method,name] of [['Paid by cheque','cheques-payout'],['Paid by BACS','bacs-payout']])if(methods.includes(method) && (helpers.parseMoney(req.body[name])===null || BigInt(helpers.parseMoney(req.body[name]) || '0')<0n))messages[name]='Enter a valid minimum payment'
      if(Object.keys(messages).length)return sourceForm(req,res,screens.find(s=>s.source==='month-end/payout-method-normal.html'),messages)
    }
    if(req.path==='/month-end/court-fees-transfer') {
      const selected=Array.isArray(req.body.courtFees)?req.body.courtFees:req.body.courtFees?[req.body.courtFees]:[]
      if(!selected.length)return res.render('finance/ucd/month-end/court-fees-transfer',{sourceErrors:[{href:'#court-fees',text:'Select court fees to transfer'}]})
      state.transferred='true'
    }
    if(req.path==='/reissue-bacs-payments') {
      const messages={}
      if(!/^\d{8}$/.test(req.body.enterBankAccountNumber || ''))messages.enterBankAccountNumber='Enter an 8-digit bank account number'
      const sort=String(req.body.enterSortCode || '').replace(/[-\s]/g,'')
      if(!/^\d{6}$/.test(sort))messages.enterSortCode='Enter a 6-digit sort code'
      if(Object.keys(messages).length)return sourceForm(req,res,screens.find(s=>s.source==='reissue-bacs-payments/index.html'),messages)
      req.body.enterSortCode=sort
    }
    next()
  })
  router.get('/:group(daily-checks|month-end|quarter-year-end)/:report/create',(req,res,next)=>{
    const {group,report}=req.params
    const forms={'suspense':'create-suspense-report','bacs-payments':'create-bacs-payments','cheques-report':'create-cheques-report','court-fees-report':'create-court-fees-report'}
    if(forms[report])return res.redirect('/finance/'+group+'/'+forms[report]+(report==='bacs-payments' && req.query['report-type']==='Processed'?'?bacsReportType=Processed':''))
    return res.redirect('/finance/'+group+'/'+report)
  })
  router.get(['/reissue-bacs-payments/single/confirmation','/reissue-bacs-payments/multiple/confirmation'],(req,res)=>res.redirect('/finance/reissue-bacs-payments/confirmation'))
  router.get('/suspense/:action(transfer|pay-hmcts|repay-respondent|confirm-repay-third-party|reverse)',(req,res,next)=>{
    const item=suspenseItems.find(item=>item.referenceNumber===req.query.ref)
    if(item && suspenseBalance(req,item)<=0)return res.render('finance/ucd/suspense/cannot-action',{item,suspenseRef:item.referenceNumber})
    next()
  })
  router.get('/cancel-cheques/confirmation',(req,res,next)=>{
    if(!sourceState(req).cancelFundsDestination)return res.redirect('/finance/cancel-cheques')
    next()
  })
  router.get('/reissue-bacs-payments/confirmation',(req,res,next)=>{
    if(!sourceState(req).reissueBacsDestination)return res.redirect('/finance/reissue-bacs-payments')
    next()
  })
  router.get('/suspense/advance',(req,res)=>res.redirect('/finance/suspense/transfer-maintenance-paid-in-advance'))
router.post('/quarter-year-end/select-business-unit', (req, res) => {
  const state = sourceState(req)
  if (!['Quarter end only','Quarter and year end'].includes(state.quarterOrYear)) return res.render('finance/ucd/quarter-year-end/select-business-unit',{sourceErrors:[{href:'#quarterOrYear',text:'Select a check'}],fieldErrors:{quarterOrYear:{text:'Select a check'}}})
  const warnings = state.hmctsCreditorsPaidOut !== 'true' || state.majorCreditorsPaidOut !== 'true' ? 'Yes' : 'No'
  if (warnings === 'Yes' || warnings === undefined) {
    return res.redirect('./cannot-start-quarter-year-end')
  }
  res.redirect('./task-list')
})
function getUserReports(req, reportType) {
  sourceState(req).reports = sourceState(req).reports || {}
  sourceState(req).reports[reportType] = sourceState(req).reports[reportType] || []
  return sourceState(req).reports[reportType]
}

router.get('/quarter-year-end/quarter-year-end-report', (req, res) => {
  const selectedBU = sourceState(req)['businessUnit'] || 'all'
  let filteredReports = getUserReports(req, 'quarterYearEnd')

  if (selectedBU !== 'all') {
    filteredReports = filteredReports.filter(report => report.unit === selectedBU)
  }

  const showBanner = sourceState(req)['reportCreated']
  sourceState(req)['reportCreated'] = false

  res.render("finance/ucd/quarter-year-end/quarter-year-end-report", {
    reports: filteredReports,
    businessUnit: selectedBU,
    showBanner
  })
})

router.post('/quarter-year-end/quarter-year-end-report', (req, res) => {
  const selectedUnit = 'RM'
  const selectedType = sourceState(req)['createReportReportType']

  if (selectedUnit && selectedType) {
    const newReport = {
      date: '2026-04-01T12:30:00Z',
      displayDate: '01 Apr 2026 at 12:30',
      title: `${selectedType} report`,
      unit: selectedUnit,
      author: 'jane.smith',
      status: 'Ready'
    }

    getUserReports(req, 'quarterYearEnd').unshift(newReport)
    sourceState(req)['reportCreated'] = true
  }

  res.redirect('/quarter-year-end/quarter-year-end-report')
})

router.get('/quarter-year-end/major-creditor-negative-balance', (req, res) => {
  const businessUnit = sourceState(req)['businessUnit'] || 'Unknown unit'
  const showBanner = sourceState(req)['majorReportCreated']
  sourceState(req)['majorReportCreated'] = false

  res.render("finance/ucd/quarter-year-end/major-creditor-negative-balance", {
    reports: getUserReports(req, 'majorCreditor'),
    businessUnit,
    showBanner
  })
})

router.post('/quarter-year-end/major-creditor-negative-balance', (req, res) => {
  const selectedUnit = sourceState(req)['businessUnit'] || 'Unknown unit'

  const newReport = {
    date: '2026-04-01T12:30:00Z',
    displayDate: '01 Apr 2026 at 12:30',
    title: 'Major creditors with negative balances report',
    unit: selectedUnit,
    author: 'jane.smith',
    status: 'Ready'
  }

  getUserReports(req, 'majorCreditor').unshift(newReport)
  sourceState(req)['majorReportCreated'] = true

  res.redirect('/quarter-year-end/major-creditor-negative-balance')
})

router.get('/quarter-year-end/fines-enforcement-mis', (req, res) => {
  const businessUnit = sourceState(req)['businessUnit'] || 'Unknown unit'
  const showBanner = sourceState(req)['finesEnforcementReportCreated']
  sourceState(req)['finesEnforcementReportCreated'] = false

  res.render("finance/ucd/quarter-year-end/fines-enforcement-mis", {
    reports: getUserReports(req, 'finesEnforcement'),
    businessUnit,
    showBanner
  })
})

router.post('/quarter-year-end/fines-enforcement-mis', (req, res) => {
  const selectedUnit = sourceState(req)['businessUnit'] || 'Unknown unit'

  const newReport = {
    date: '2026-04-01T12:30:00Z',
    displayDate: '01 Apr 2026 at 12:30',
    title: 'Fines enforcement MIS report',
    unit: selectedUnit,
    author: 'jane.smith',
    status: 'Ready'
  }

  getUserReports(req, 'finesEnforcement').unshift(newReport)
  sourceState(req)['finesEnforcementReportCreated'] = true

  res.redirect('/quarter-year-end/fines-enforcement-mis')
})

router.get('/quarter-year-end/control-totals', (req, res) => {
  const businessUnit = sourceState(req)['businessUnit'] || 'Unknown unit'
  const showBanner = sourceState(req)['controlTotalsReportCreated']
  sourceState(req)['controlTotalsReportCreated'] = false

  res.render("finance/ucd/quarter-year-end/control-totals", {
    reports: getUserReports(req, 'controlTotals'),
    businessUnit,
    showBanner
  })
})

router.post('/quarter-year-end/control-totals', (req, res) => {
  const selectedUnit = sourceState(req)['businessUnit'] || 'Unknown unit'

  const newReport = {
    date: '2026-04-01T12:30:00Z',
    displayDate: '01 Apr 2026 at 12:30',
    title: 'Quarter end control totals report',
    unit: selectedUnit,
    author: 'jane.smith',
    status: 'Ready'
  }

  getUserReports(req, 'controlTotals').unshift(newReport)
  sourceState(req)['controlTotalsReportCreated'] = true

  res.redirect('/quarter-year-end/control-totals')
})

router.get('/quarter-year-end/write-off-analysis', (req, res) => {
  const businessUnit = sourceState(req)['businessUnit'] || 'Unknown unit'
  const showBanner = sourceState(req)['writeOffAnalysisReportCreated']
  sourceState(req)['writeOffAnalysisReportCreated'] = false

  res.render("finance/ucd/quarter-year-end/write-off-analysis", {
    reports: getUserReports(req, 'writeOffAnalysis'),
    businessUnit,
    showBanner
  })
})

router.post('/quarter-year-end/write-off-analysis', (req, res) => {
  const selectedUnit = sourceState(req)['businessUnit'] || 'Unknown unit'

  const newReport = {
    date: '2026-04-01T12:30:00Z',
    displayDate: '01 Apr 2026 at 12:30',
    title: 'Quarter end write-off analysis report',
    unit: selectedUnit,
    author: 'jane.smith',
    status: 'Ready'
  }

  getUserReports(req, 'writeOffAnalysis').unshift(newReport)
  sourceState(req)['writeOffAnalysisReportCreated'] = true

  res.redirect('/quarter-year-end/write-off-analysis')
})

router.get('/quarter-year-end/cumulative-annual-write-off', (req, res) => {
  const businessUnit = sourceState(req)['businessUnit'] || 'Unknown unit'
  const showBanner = sourceState(req)['cumulativeAnnualWriteOffReportCreated']
  sourceState(req)['cumulativeAnnualWriteOffReportCreated'] = false

  res.render("finance/ucd/quarter-year-end/cumulative-annual-write-off", {
    reports: getUserReports(req, 'cumulativeAnnualWriteOff'),
    businessUnit,
    showBanner
  })
})

router.post('/quarter-year-end/cumulative-annual-write-off', (req, res) => {
  const selectedUnit = sourceState(req)['businessUnit'] || 'Unknown unit'

  const newReport = {
    date: '2026-04-01T12:30:00Z',
    displayDate: '01 Apr 2026 at 12:30',
    title: 'Cumulative annual write-off analysis report',
    unit: selectedUnit,
    author: 'jane.smith',
    status: 'Ready'
  }

  getUserReports(req, 'cumulativeAnnualWriteOff').unshift(newReport)
  sourceState(req)['cumulativeAnnualWriteOffReportCreated'] = true

  res.redirect('/quarter-year-end/cumulative-annual-write-off')
})
router.get('/suspense/search', (req, res) => {
  const clearForm = req.query.clear === 'true'

  if (clearForm) {
    sourceState(req).businessUnit = 'RM'
    sourceState(req).suspenseReference = ''
  }
  const itemsByBusinessUnit = {}
  suspenseItems.forEach(item => {
    if (!itemsByBusinessUnit[item.businessUnit]) {
      itemsByBusinessUnit[item.businessUnit] = []
    }
    itemsByBusinessUnit[item.businessUnit].push(item.referenceNumber)
  })
  res.render("finance/ucd/suspense/search", {
    errors: null,
    suspenseReference: sourceState(req).suspenseReference || '',
    businessUnit: sourceState(req).businessUnit || '',
    itemsByBusinessUnit: itemsByBusinessUnit,
    showFooterContent: true
  })
})
router.post('/suspense/search', (req, res) => {
  const referenceNumber = req.body.suspenseReference
  const businessUnit = 'RM'
  sourceState(req).suspenseReference = referenceNumber || ''
  sourceState(req).businessUnit = businessUnit || ''
  const errors = []

  if (!businessUnit || businessUnit.trim() === '') {
    errors.push({
      text: 'Select a business unit',
      href: '#businessUnit'
    })
  }

  if (!referenceNumber || referenceNumber.trim() === '') {
    errors.push({
      text: 'Enter a suspense reference number',
      href: '#suspenseReference'
    })
  }
  if (errors.length > 0) {
    const itemsByBusinessUnit = {}
    suspenseItems.forEach(item => {
      if (!itemsByBusinessUnit[item.businessUnit]) {
        itemsByBusinessUnit[item.businessUnit] = []
      }
      itemsByBusinessUnit[item.businessUnit].push(item.referenceNumber)
    })

    return res.render("finance/ucd/suspense/search", {
      errors: errors,
      suspenseReference: referenceNumber || '',
      businessUnit: businessUnit || '',
      showFooterContent: true,
      itemsByBusinessUnit: itemsByBusinessUnit
    })
  }
  const item = suspenseItems.find(item =>
    item.referenceNumber === referenceNumber &&
    item.businessUnit === businessUnit
  )

  if (item) {
    res.redirect(`/suspense/item?ref=${referenceNumber}&search=${encodeURIComponent(referenceNumber)}`)
  } else {
    res.redirect(`/suspense/not-found?ref=${encodeURIComponent(referenceNumber)}&bu=${encodeURIComponent(businessUnit)}`)
  }
})
router.post('/suspense/quick-search', (req, res) => {
  const referenceNumber = req.body.search

  if (!referenceNumber || referenceNumber.trim() === '') {
    const businessUnit = sourceState(req).currentBusinessUnit || ''
    const buParam = businessUnit ? `&bu=${encodeURIComponent(businessUnit)}` : ''
    return res.redirect(`/suspense/not-found?ref=${buParam}`)
  }
  const item = suspenseItems.find(item => item.referenceNumber === referenceNumber.trim())

  if (item) {
    res.redirect(`/suspense/item?ref=${referenceNumber.trim()}&search=${encodeURIComponent(referenceNumber.trim())}`)
  } else {
    const businessUnit = sourceState(req).currentBusinessUnit || ''
    const buParam = businessUnit ? `&bu=${encodeURIComponent(businessUnit)}` : ''
    res.redirect(`/suspense/not-found?ref=${encodeURIComponent(referenceNumber.trim())}${buParam}`)
  }
})
router.get('/suspense/not-found', (req, res) => {
  const referenceNumber = req.query.ref
  const businessUnit = req.query.bu

  res.render("finance/ucd/suspense/not-found", {
    referenceNumber: referenceNumber,
    businessUnit: businessUnit
  })
})
router.get('/suspense/item', (req, res) => {
  const referenceNumber = req.query.ref
  let searchValue = req.query.search || sourceState(req).quickSearch || ''
  if (searchValue) {
    sourceState(req).quickSearch = searchValue
  }
  const item = suspenseItems.find(item => item.referenceNumber === referenceNumber)
  if (item) {
    sourceState(req).currentBusinessUnit = item.businessUnit
  }

  if (item) {
    const sessionNotes = sourceState(req).suspenseNotes || {}
    const itemNotes = sessionNotes[referenceNumber] || []
    const sessionTransactions = sourceState(req).suspenseTransactions || {}
    const itemTransactions = sessionTransactions[referenceNumber] || []
    const allNotes = [...itemNotes, ...item.notes]
    const allTransactions = [...itemTransactions, ...item.transactions]
    const notesAsTransactions = allNotes.map(note => ({
      ...note,
      type: 'Notes',
      dateFormatted: note.dateAddedFormatted,
      date: note.dateAdded,
      detail: note.text,
      amountFormatted: '',
      isNote: true
    }))
    const combinedHistory = [...allTransactions, ...notesAsTransactions].sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateB - dateA
    })
    let currentBalance = item.balance
    itemTransactions.forEach(txn => {
      currentBalance += txn.amount
    })
    const showNoteBanner = sourceState(req)['suspenseNoteAdded']
    const showTransferBanner = sourceState(req)['suspenseTransferCompleted']
    const transferAmount = sourceState(req)['transferAmount']
    const showPaymentBanner = sourceState(req)['suspensePaymentCompleted']
    const paymentAmount = sourceState(req)['paymentAmount']
    const showRepayBanner = sourceState(req)['suspenseRepayCompleted']
    const repayAmount = sourceState(req)['repayAmount']
    const showRepayThirdPartyBanner = sourceState(req)['suspenseRepayThirdPartyCompleted']
    const repayThirdPartyAmount = sourceState(req)['repayThirdPartyAmount']
    const showReverseBanner = sourceState(req)['suspenseReverseCompleted']
    const reverseAmount = sourceState(req)['reverseAmount']
    const reverseDishonouredCheque = sourceState(req)['reverseDishonouredCheque']

    sourceState(req)['suspenseNoteAdded'] = false
    sourceState(req)['suspenseTransferCompleted'] = false
    sourceState(req)['transferAmount'] = null
    sourceState(req)['suspensePaymentCompleted'] = false
    sourceState(req)['paymentAmount'] = null
    sourceState(req)['suspenseRepayCompleted'] = false
    sourceState(req)['repayAmount'] = null
    sourceState(req)['suspenseRepayThirdPartyCompleted'] = false
    sourceState(req)['repayThirdPartyAmount'] = null
    sourceState(req)['suspenseReverseCompleted'] = false
    sourceState(req)['reverseAmount'] = null
    sourceState(req)['reverseDishonouredCheque'] = false
    const itemsByBusinessUnit = {}
    suspenseItems.forEach(item => {
      if (!itemsByBusinessUnit[item.businessUnit]) {
        itemsByBusinessUnit[item.businessUnit] = []
      }
      itemsByBusinessUnit[item.businessUnit].push(item.referenceNumber)
    })

    res.render("finance/ucd/suspense/item", {
      item: {
        ...item,
        notes: allNotes,
        transactions: combinedHistory,
        balance: currentBalance,
        balanceFormatted: `£${(currentBalance / 100).toFixed(2)}`
      },
      showNoteBanner,
      showTransferBanner,
      transferAmount,
      showPaymentBanner,
      paymentAmount,
      showRepayBanner,
      repayAmount,
      showRepayThirdPartyBanner,
      repayThirdPartyAmount,
      showReverseBanner,
      reverseAmount,
      reverseDishonouredCheque,
      searchValue: searchValue,
      showFooterContent: true,
      itemsByBusinessUnit: itemsByBusinessUnit
    })
  } else {
    res.redirect('/suspense/search')
  }
})
router.get('/suspense/add-note', (req, res) => {
  const referenceNumber = req.query.ref
  const item = suspenseItems.find(item => item.referenceNumber === referenceNumber)

  if (item) {
    const firstPaymentTxn = item.transactions.find(txn => txn.firstPayment === true)

    res.render("finance/ucd/suspense/add-note", {
      suspenseRef: referenceNumber,
      businessUnit: item.businessUnit,
      firstPaymentTxn: firstPaymentTxn
    })
  } else {
    res.redirect('/suspense/search')
  }
})
router.post('/suspense/add-note', (req, res) => {
  const referenceNumber = req.body.suspenseRef
  const noteText = req.body.suspenseNote

  if (noteText && noteText.trim()) {
    sourceState(req).suspenseNotes = sourceState(req).suspenseNotes || {}
    sourceState(req).suspenseNotes[referenceNumber] = sourceState(req).suspenseNotes[referenceNumber] || []
    const now = new Date()
    const dateFormatted = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })

    const newNote = {
      id: `note-session-${Date.now()}`,
      text: noteText.trim(),
      author: 'joe.bloggs',
      authorName: 'Joe Bloggs',
      dateAdded: now.toISOString(),
      dateAddedFormatted: dateFormatted
    }
    sourceState(req).suspenseNotes[referenceNumber].unshift(newNote)
    sourceState(req)['suspenseNoteAdded'] = true
  }
  const searchParam = sourceState(req).quickSearch ? `&search=${encodeURIComponent(sourceState(req).quickSearch)}` : ''
  res.redirect(`/suspense/item?ref=${referenceNumber}${searchParam}`)
})
router.get('/suspense/transfer', (req, res) => {
  const referenceNumber = req.query.ref
  const item = suspenseItems.find(item => item.referenceNumber === referenceNumber)

  if (item) {
    const sessionTransactions = sourceState(req).suspenseTransactions || {}
    const itemTransactions = sessionTransactions[referenceNumber] || []

    let currentBalance = item.balance
    itemTransactions.forEach(txn => {
      currentBalance += txn.amount
    })
    if (currentBalance === 0) {
      return res.redirect(`/suspense/cannot-action?ref=${referenceNumber}`)
    }

    res.render("finance/ucd/suspense/transfer", {
      suspenseRef: referenceNumber,
      businessUnit: item.businessUnit
    })
  } else {
    res.redirect('/suspense/search')
  }
})
router.post('/suspense/transfer', (req, res) => {
  const referenceNumber = req.body.suspenseRef
  res.redirect(`/suspense/confirm-transfer?ref=${referenceNumber}`)
})
router.get('/suspense/confirm-transfer', (req, res) => {
  const referenceNumber = req.query.ref
  const item = suspenseItems.find(item => item.referenceNumber === referenceNumber)

  if (item) {
    const sessionTransactions = sourceState(req).suspenseTransactions || {}
    const itemTransactions = sessionTransactions[referenceNumber] || []

    let currentBalance = item.balance
    itemTransactions.forEach(txn => {
      currentBalance += txn.amount
    })

    res.render("finance/ucd/suspense/confirm-transfer", {
      suspenseRef: referenceNumber,
      businessUnit: item.businessUnit,
      item: {
        ...item,
        balance: currentBalance,
        balanceFormatted: `£${(currentBalance / 100).toFixed(2)}`
      }
    })
  } else {
    res.redirect('/suspense/search')
  }
})
router.post('/suspense/confirm-transfer', (req, res) => {
  const referenceNumber = req.body.suspenseRef
  const amountToTransfer = req.body.amountToTransfer
  const suspenseNote = req.body.suspenseNote

  if (amountToTransfer && amountToTransfer.trim()) {
    const now = new Date()
    const dateFormatted = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
    const amountInPence = -Number(helpers.parseMoney(amountToTransfer))
    sourceState(req).suspenseTransactions = sourceState(req).suspenseTransactions || {}
    sourceState(req).suspenseTransactions[referenceNumber] = sourceState(req).suspenseTransactions[referenceNumber] || []
    const partyTerm = sourceState(req).serviceDomain === 'Fines' ? 'respondent' : 'respondent'
    const PartyTerm = sourceState(req).serviceDomain === 'Fines' ? 'Respondent' : 'Respondent'

    const newTransaction = {
      id: `txn-session-${Date.now()}`,
      date: now.toISOString(),
      dateFormatted: dateFormatted,
      type: `Transfer to ${partyTerm}`,
      detail: `${PartyTerm}: ${helpers.escapeHtml(sourceState(req).accountNumber)} – ${helpers.escapeHtml(findRespondent(sourceState(req).accountNumber)?.name || "")}`,
      amount: amountInPence,
      amountFormatted: `£${Math.abs(amountInPence / 100).toFixed(2)}`
    }
    sourceState(req).suspenseTransactions[referenceNumber].unshift(newTransaction)
    if (suspenseNote && suspenseNote.trim()) {
      sourceState(req).suspenseNotes = sourceState(req).suspenseNotes || {}
      sourceState(req).suspenseNotes[referenceNumber] = sourceState(req).suspenseNotes[referenceNumber] || []
      const noteDate = new Date(now.getTime() + 1000) // 1 second after transaction

      const newNote = {
        id: `note-session-${Date.now()}`,
        text: suspenseNote.trim(),
        author: 'joe.bloggs',
        authorName: 'Joe Bloggs',
        dateAdded: noteDate.toISOString(),
        dateAddedFormatted: dateFormatted
      }

      sourceState(req).suspenseNotes[referenceNumber].unshift(newNote)
    }
    sourceState(req)['suspenseTransferCompleted'] = true
    sourceState(req)['transferAmount'] = `£${Math.abs(amountInPence / 100).toFixed(2)}`
  }
  const searchParam = sourceState(req).quickSearch ? `&search=${encodeURIComponent(sourceState(req).quickSearch)}` : ''
  res.redirect(`/suspense/item?ref=${referenceNumber}${searchParam}`)
})
router.get('/suspense/pay-hmcts', (req, res) => {
  const referenceNumber = req.query.ref
  const item = suspenseItems.find(item => item.referenceNumber === referenceNumber)

  if (item) {
    const sessionTransactions = sourceState(req).suspenseTransactions || {}
    const itemTransactions = sessionTransactions[referenceNumber] || []

    let currentBalance = item.balance
    itemTransactions.forEach(txn => {
      currentBalance += txn.amount
    })
    if (currentBalance === 0) {
      return res.redirect(`/suspense/cannot-action?ref=${referenceNumber}`)
    }

    res.render("finance/ucd/suspense/pay-hmcts", {
      suspenseRef: referenceNumber,
      businessUnit: item.businessUnit,
      item: {
        ...item,
        balance: currentBalance,
        balanceFormatted: `£${(currentBalance / 100).toFixed(2)}`
      }
    })
  } else {
    res.redirect('/suspense/search')
  }
})
router.post('/suspense/pay-hmcts', (req, res) => {
  const referenceNumber = req.body.suspenseRef
  const paymentAmount = req.body.paymentAmount
  const suspenseNote = req.body.suspenseNote

  if (paymentAmount) {
    const now = new Date()
    const dateFormatted = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
    const amountInPence = -Math.abs(parseInt(paymentAmount))
    sourceState(req).suspenseTransactions = sourceState(req).suspenseTransactions || {}
    sourceState(req).suspenseTransactions[referenceNumber] = sourceState(req).suspenseTransactions[referenceNumber] || []

    const newTransaction = {
      id: `txn-session-${Date.now()}`,
      date: now.toISOString(),
      dateFormatted: dateFormatted,
      type: 'Transfer to HMCTS/Other',
      detail: '–',
      amount: amountInPence,
      amountFormatted: `£${Math.abs(amountInPence / 100).toFixed(2)}`
    }
    sourceState(req).suspenseTransactions[referenceNumber].unshift(newTransaction)
    if (suspenseNote && suspenseNote.trim()) {
      sourceState(req).suspenseNotes = sourceState(req).suspenseNotes || {}
      sourceState(req).suspenseNotes[referenceNumber] = sourceState(req).suspenseNotes[referenceNumber] || []
      const noteDate = new Date(now.getTime() + 1000) // 1 second after transaction

      const newNote = {
        id: `note-session-${Date.now()}`,
        text: suspenseNote.trim(),
        author: 'joe.bloggs',
        authorName: 'Joe Bloggs',
        dateAdded: noteDate.toISOString(),
        dateAddedFormatted: dateFormatted
      }

      sourceState(req).suspenseNotes[referenceNumber].unshift(newNote)
    }
    sourceState(req)['suspensePaymentCompleted'] = true
    sourceState(req)['paymentAmount'] = `£${Math.abs(amountInPence / 100).toFixed(2)}`
  }
  const searchParam = sourceState(req).quickSearch ? `&search=${encodeURIComponent(sourceState(req).quickSearch)}` : ''
  res.redirect(`/suspense/item?ref=${referenceNumber}${searchParam}`)
})
router.get('/suspense/reverse', (req, res) => {
  const referenceNumber = req.query.ref
  const item = suspenseItems.find(item => item.referenceNumber === referenceNumber)

  if (item) {
    const sessionTransactions = sourceState(req).suspenseTransactions || {}
    const itemTransactions = sessionTransactions[referenceNumber] || []

    let currentBalance = item.balance
    itemTransactions.forEach(txn => {
      currentBalance += txn.amount
    })
    if (currentBalance === 0) {
      return res.redirect(`/suspense/cannot-action?ref=${referenceNumber}`)
    }

    res.render("finance/ucd/suspense/reverse", {
      suspenseRef: referenceNumber,
      businessUnit: item.businessUnit,
      item: {
        ...item,
        balance: currentBalance,
        balanceFormatted: `£${(currentBalance / 100).toFixed(2)}`
      }
    })
  } else {
    res.redirect('/suspense/search')
  }
})
router.post('/suspense/reverse', (req, res) => {
  const referenceNumber = req.body.suspenseRef
  const reverseAmount = req.body.reverseAmount
  const suspenseNote = req.body.suspenseNote
  const checkboxValue = req.body.dishonouredCheque
  const dishonouredCheque = Array.isArray(checkboxValue)
    ? checkboxValue.includes('Dishonoured cheque')
    : checkboxValue === 'Dishonoured cheque'
  sourceState(req)['dishonouredCheque'] = null

  if (reverseAmount) {
    const now = new Date()
    const dateFormatted = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
    const amountInPence = -Math.abs(parseInt(reverseAmount))
    sourceState(req).suspenseTransactions = sourceState(req).suspenseTransactions || {}
    sourceState(req).suspenseTransactions[referenceNumber] = sourceState(req).suspenseTransactions[referenceNumber] || []
    const detail = dishonouredCheque ? 'Dishonoured cheque' : '–'

    const newTransaction = {
      id: `txn-session-${Date.now()}`,
      date: now.toISOString(),
      dateFormatted: dateFormatted,
      type: 'Reverse',
      detail: detail,
      amount: amountInPence,
      amountFormatted: `£${Math.abs(amountInPence / 100).toFixed(2)}`
    }
    sourceState(req).suspenseTransactions[referenceNumber].unshift(newTransaction)
    if (suspenseNote && suspenseNote.trim()) {
      sourceState(req).suspenseNotes = sourceState(req).suspenseNotes || {}
      sourceState(req).suspenseNotes[referenceNumber] = sourceState(req).suspenseNotes[referenceNumber] || []
      const noteDate = new Date(now.getTime() + 1000) // 1 second after transaction

      const newNote = {
        id: `note-session-${Date.now()}`,
        text: suspenseNote.trim(),
        author: 'joe.bloggs',
        authorName: 'Joe Bloggs',
        dateAdded: noteDate.toISOString(),
        dateAddedFormatted: dateFormatted
      }

      sourceState(req).suspenseNotes[referenceNumber].unshift(newNote)
    }
    sourceState(req)['suspenseReverseCompleted'] = true
    sourceState(req)['reverseAmount'] = `£${Math.abs(amountInPence / 100).toFixed(2)}`
    sourceState(req)['reverseDishonouredCheque'] = dishonouredCheque
  }
  const searchParam = sourceState(req).quickSearch ? `&search=${encodeURIComponent(sourceState(req).quickSearch)}` : ''
  res.redirect(`/suspense/item?ref=${referenceNumber}${searchParam}`)
})
router.get('/suspense/cannot-action', (req, res) => {
  const referenceNumber = req.query.ref
  const item = suspenseItems.find(item => item.referenceNumber === referenceNumber)

  if (item) {
    res.render("finance/ucd/suspense/cannot-action", {
      suspenseRef: referenceNumber,
      businessUnit: item.businessUnit
    })
  } else {
    res.redirect('/suspense/search')
  }
})
router.get('/suspense/repay-respondent', (req, res) => {
  const referenceNumber = req.query.ref
  const item = suspenseItems.find(item => item.referenceNumber === referenceNumber)

  if (item) {
    const sessionTransactions = sourceState(req).suspenseTransactions || {}
    const itemTransactions = sessionTransactions[referenceNumber] || []

    let currentBalance = item.balance
    itemTransactions.forEach(txn => {
      currentBalance += txn.amount
    })
    if (currentBalance === 0) {
      return res.redirect(`/suspense/cannot-action?ref=${referenceNumber}`)
    }

    res.render("finance/ucd/suspense/repay-respondent", {
      suspenseRef: referenceNumber,
      businessUnit: item.businessUnit,
      item: {
        ...item,
        balance: currentBalance,
        balanceFormatted: `£${(currentBalance / 100).toFixed(2)}`
      }
    })
  } else {
    res.redirect('/suspense/search')
  }
})
router.post('/suspense/repay-respondent', (req, res) => {
  const referenceNumber = req.body.suspenseRef
  const accountNumber = req.body.accountNumber
  sourceState(req).accountNumber = accountNumber
  res.redirect(`/suspense/confirm-repay-respondent?ref=${referenceNumber}`)
})
router.get('/suspense/repay', (req, res) => {
  const referenceNumber = req.query.ref
  const item = suspenseItems.find(item => item.referenceNumber === referenceNumber)

  if (item) {
    const sessionTransactions = sourceState(req).suspenseTransactions || {}
    const itemTransactions = sessionTransactions[referenceNumber] || []

    let currentBalance = item.balance
    itemTransactions.forEach(txn => {
      currentBalance += txn.amount
    })
    if (currentBalance === 0) {
      return res.redirect(`/suspense/cannot-action?ref=${referenceNumber}`)
    }

    res.render("finance/ucd/suspense/repay", {
      suspenseRef: referenceNumber,
      businessUnit: item.businessUnit
    })
  } else {
    res.redirect('/suspense/search')
  }
})
router.post('/suspense/repay', (req, res) => {
  const referenceNumber = req.body.suspenseRef
  const repayTo = req.body.repayTo

  if (repayTo === 'respondent') {
    res.redirect(`/suspense/confirm-repay-respondent?ref=${referenceNumber}`)
  } else if (repayTo === 'third-party') {
    res.redirect(`/suspense/confirm-repay-third-party?ref=${referenceNumber}`)
  } else {
    res.redirect(`/suspense/repay?ref=${referenceNumber}`)
  }
})
router.get('/suspense/confirm-repay-respondent', (req, res) => {
  const referenceNumber = req.query.ref
  const item = suspenseItems.find(item => item.referenceNumber === referenceNumber)

  if (item) {
    const sessionTransactions = sourceState(req).suspenseTransactions || {}
    const itemTransactions = sessionTransactions[referenceNumber] || []

    let currentBalance = item.balance
    itemTransactions.forEach(txn => {
      currentBalance += txn.amount
    })

    res.render("finance/ucd/suspense/confirm-repay-respondent", {
      suspenseRef: referenceNumber,
      businessUnit: item.businessUnit,
      accountNumber: sourceState(req).accountNumber,
      item: {
        ...item,
        balance: currentBalance,
        balanceFormatted: `£${(currentBalance / 100).toFixed(2)}`
      }
    })
  } else {
    res.redirect('/suspense/search')
  }
})
router.post('/suspense/confirm-repay-respondent', (req, res) => {
  const referenceNumber = req.body.suspenseRef
  const amountToRepay = req.body.amountToRepay
  const suspenseNote = req.body.suspenseNote

  if (amountToRepay && amountToRepay.trim()) {
    const now = new Date()
    const dateFormatted = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
    const amountInPence = -Number(helpers.parseMoney(amountToRepay))
    sourceState(req).suspenseTransactions = sourceState(req).suspenseTransactions || {}
    sourceState(req).suspenseTransactions[referenceNumber] = sourceState(req).suspenseTransactions[referenceNumber] || []
    const partyTerm = sourceState(req).serviceDomain === 'Fines' ? 'respondent' : 'respondent'
    const PartyTerm = sourceState(req).serviceDomain === 'Fines' ? 'Respondent' : 'Respondent'

    const newTransaction = {
      id: `txn-session-${Date.now()}`,
      date: now.toISOString(),
      dateFormatted: dateFormatted,
      type: `Repay to ${partyTerm}`,
      detail: `${PartyTerm}: ${helpers.escapeHtml(sourceState(req).accountNumber)} – ${helpers.escapeHtml(findRespondent(sourceState(req).accountNumber)?.name || "")}`,
      amount: amountInPence,
      amountFormatted: `£${Math.abs(amountInPence / 100).toFixed(2)}`
    }
    sourceState(req).suspenseTransactions[referenceNumber].unshift(newTransaction)
    if (suspenseNote && suspenseNote.trim()) {
      sourceState(req).suspenseNotes = sourceState(req).suspenseNotes || {}
      sourceState(req).suspenseNotes[referenceNumber] = sourceState(req).suspenseNotes[referenceNumber] || []
      const noteDate = new Date(now.getTime() + 1000) // 1 second after transaction

      const newNote = {
        id: `note-session-${Date.now()}`,
        text: suspenseNote.trim(),
        author: 'joe.bloggs',
        authorName: 'Joe Bloggs',
        dateAdded: noteDate.toISOString(),
        dateAddedFormatted: dateFormatted
      }

      sourceState(req).suspenseNotes[referenceNumber].unshift(newNote)
    }
    sourceState(req)['suspenseRepayCompleted'] = true
    sourceState(req)['repayAmount'] = `£${Math.abs(amountInPence / 100).toFixed(2)}`
  }
  const searchParam = sourceState(req).quickSearch ? `&search=${encodeURIComponent(sourceState(req).quickSearch)}` : ''
  res.redirect(`/suspense/item?ref=${referenceNumber}${searchParam}`)
})
router.get('/suspense/confirm-repay-third-party', (req, res) => {
  const referenceNumber = req.query.ref
  const item = suspenseItems.find(item => item.referenceNumber === referenceNumber)

  if (item) {
    const sessionTransactions = sourceState(req).suspenseTransactions || {}
    const itemTransactions = sessionTransactions[referenceNumber] || []

    let currentBalance = item.balance
    itemTransactions.forEach(txn => {
      currentBalance += txn.amount
    })
    if (currentBalance === 0) {
      return res.redirect(`/suspense/cannot-action?ref=${referenceNumber}`)
    }

    res.render("finance/ucd/suspense/confirm-repay-third-party", {
      suspenseRef: referenceNumber,
      businessUnit: item.businessUnit,
      item: {
        ...item,
        balance: currentBalance,
        balanceFormatted: `£${(currentBalance / 100).toFixed(2)}`
      }
    })
  } else {
    res.redirect('/suspense/search')
  }
})
router.post('/suspense/confirm-repay-third-party', (req, res) => {
  const referenceNumber = req.body.suspenseRef
  const amountToRepay = req.body.amountToRepay
  const suspenseNote = req.body.suspenseNote

  if (amountToRepay && amountToRepay.trim()) {
    const now = new Date()
    const dateFormatted = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
    const amountInPence = -Number(helpers.parseMoney(amountToRepay))
    sourceState(req).suspenseTransactions = sourceState(req).suspenseTransactions || {}
    sourceState(req).suspenseTransactions[referenceNumber] = sourceState(req).suspenseTransactions[referenceNumber] || []

    const newTransaction = {
      id: `txn-session-${Date.now()}`,
      date: now.toISOString(),
      dateFormatted: dateFormatted,
      type: 'Repay to 3rd party',
      detail: helpers.escapeHtml([sourceState(req)['3rdPartyType'], sourceState(req)['3rdPartyTypeIndividualCompanyName'] || [sourceState(req)['3rdPartyTypeIndividualTitle'],sourceState(req)['3rdPartyTypeIndividualFirstName'],sourceState(req)['3rdPartyTypeIndividualLastName']].filter(Boolean).join(' '), sourceState(req)['partyPaymentMethod']].filter(Boolean).join(' · ')),
      amount: amountInPence,
      amountFormatted: `£${Math.abs(amountInPence / 100).toFixed(2)}`
    }
    sourceState(req).suspenseTransactions[referenceNumber].unshift(newTransaction)
    if (suspenseNote && suspenseNote.trim()) {
      sourceState(req).suspenseNotes = sourceState(req).suspenseNotes || {}
      sourceState(req).suspenseNotes[referenceNumber] = sourceState(req).suspenseNotes[referenceNumber] || []
      const noteDate = new Date(now.getTime() + 1000) // 1 second after transaction

      const newNote = {
        id: `note-session-${Date.now()}`,
        text: suspenseNote.trim(),
        author: 'joe.bloggs',
        authorName: 'Joe Bloggs',
        dateAdded: noteDate.toISOString(),
        dateAddedFormatted: dateFormatted
      }

      sourceState(req).suspenseNotes[referenceNumber].unshift(newNote)
    }
    sourceState(req)['suspenseRepayThirdPartyCompleted'] = true
    sourceState(req)['repayThirdPartyAmount'] = `£${Math.abs(amountInPence / 100).toFixed(2)}`
  }
  const searchParam = sourceState(req).quickSearch ? `&search=${encodeURIComponent(sourceState(req).quickSearch)}` : ''
  res.redirect(`/suspense/item?ref=${referenceNumber}${searchParam}`)
})

router.get('/reports/reversed-payments', (req, res) => {
  const selectedBU = sourceState(req)['businessUnit'] || 'all'
  let filteredReports = getUserReports(req, 'reversedPayments')

  if (selectedBU !== 'all') {
    filteredReports = filteredReports.filter(report => report.unit === selectedBU)
  }

  const showBanner = sourceState(req)['reversedPaymentsReportCreated']
  sourceState(req)['reversedPaymentsReportCreated'] = false

  res.render("finance/ucd/reports/reversed-payments", {
    reports: filteredReports,
    businessUnit: selectedBU,
    showBanner
  })
})

router.get('/reports/create-reversed-payments', (req, res) => {
  res.redirect('/finance/reports/reversed-payments')
})

router.post('/reports/reversed-payments', (req, res) => {
  const selectedUnit = 'RM'

  if (selectedUnit && selectedUnit !== '') {
    const newReport = {
      date: '2026-04-01T12:30:00Z',
      displayDate: '01 Apr 2026 at 12:30',
      title: 'Reversed payments report',
      unit: selectedUnit,
      author: 'jane.smith',
      status: 'Ready'
    }

    getUserReports(req, 'reversedPayments').unshift(newReport)
    sourceState(req)['reversedPaymentsReportCreated'] = true
  }

  res.redirect('/reports/reversed-payments')
})
router.get('/suspense/transfer-maintenance-paid-in-advance', (req, res) => {
  res.render("finance/ucd/suspense/transfer-maintenance-paid-in-advance")
})

router.post('/suspense/transfer-maintenance-paid-in-advance', (req, res) => {
  const now = new Date()
  const day = now.getDate()
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const month = months[now.getMonth()]
  const year = now.getFullYear()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')

  const formattedDate = `${day} ${month} ${year} at ${hours}:${minutes}`
  const selectedUnits = sourceState(req)['business-units']
  if (!sourceState(req)['fines-transferred-dates']) {
    sourceState(req)['fines-transferred-dates'] = {}
  }
  if (selectedUnits) {
    if (Array.isArray(selectedUnits)) {
      selectedUnits.forEach(unit => {
        sourceState(req)['fines-transferred-dates'][unit] = formattedDate
      })
    } else {
      sourceState(req)['fines-transferred-dates'][selectedUnits] = formattedDate
    }
  }

  sourceState(req)['fines-transferred'] = 'true'
  sourceState(req).flash = 'Maintenance paid in advance transferred'

  res.redirect('/suspense/transfer-maintenance-paid-in-advance')
})


function isValidChequeNumber(number) {
  return /^\d{3}$/.test(number) || /^\d{6}$/.test(number) || /^\d{10}$/.test(number)
}

router.get('/cancel-cheques', (req, res) => {
  sourceState(req)['cancelCheque'] = null
  sourceState(req)['cancelFundsDestination'] = null
  sourceState(req)['cancelReason'] = null
  res.render("finance/ucd/cancel-cheques/index", {
    error: null,
    chequeNumber: ''
  })
})

router.post('/cancel-cheques', (req, res) => {
  const chequeNumber = (req.body.enterChequeNumber || '').trim()

  if (!chequeNumber) {
    return res.render("finance/ucd/cancel-cheques/index", {
      error: 'Enter a cheque number',
      chequeNumber: ''
    })
  }

  if (!isValidChequeNumber(chequeNumber)) {
    return res.render("finance/ucd/cancel-cheques/index", {
      error: 'Enter a valid cheque number',
      chequeNumber: chequeNumber
    })
  }

  const cheque = cheques.find(c => c.chequeNumber === chequeNumber)

  if (!cheque) {
    return res.redirect('/cancel-cheques/cheque-not-found')
  }

  sourceState(req)['cancelCheque'] = cheque
  res.redirect('/cancel-cheques/review-details')
})

router.get('/cancel-cheques/cheque-not-found', (req, res) => {
  res.render("finance/ucd/cancel-cheques/cheque-not-found")
})

router.get('/cancel-cheques/review-details', (req, res) => {
  const cheque = sourceState(req)['cancelCheque']
  if (!cheque) return res.redirect('/cancel-cheques')
  res.render("finance/ucd/cancel-cheques/review-details", { cheque })
})

router.post('/cancel-cheques/review-details', (req, res) => {
  res.redirect('/cancel-cheques/cancel-cheque')
})

router.get('/cancel-cheques/cancel-cheque', (req, res) => {
  const cheque = sourceState(req)['cancelCheque']
  if (!cheque) return res.redirect('/cancel-cheques')
  res.render("finance/ucd/cancel-cheques/cancel-cheque", { cheque })
})

router.post('/cancel-cheques/cancel-cheque', (req, res) => {
  const cheque = sourceState(req)['cancelCheque']
  const whereFundsShouldGo = req.body.whereFundsShouldGo
  const accountNote = (req.body.accountNote || '').trim()

  const errors = []

  if (!whereFundsShouldGo) {
    errors.push({ text: 'Select where the funds should go', href: '#whereFundsShouldGo' })
  }

  if (!accountNote) {
    errors.push({ text: 'Enter reason for cancellation', href: '#account-note' })
  }

  if (errors.length > 0) {
    return res.render("finance/ucd/cancel-cheques/cancel-cheque", {
      cheque,
      errors,
      fundsError: !whereFundsShouldGo ? 'Select where the funds should go' : null,
      reasonError: !accountNote ? 'Enter reason for cancellation' : null,
      whereFundsShouldGo,
      accountNote
    })
  }

  sourceState(req)['cancelFundsDestination'] = whereFundsShouldGo
  sourceState(req)['cancelReason'] = accountNote
  res.redirect('/cancel-cheques/confirmation')
})

router.get('/cancel-cheques/confirmation', (req, res) => {
  const destination = sourceState(req)['cancelFundsDestination']
  const cheque = sourceState(req)['cancelCheque']

  const messages = {
    'issue-new-cheque': 'A new cheque has been issued.',
    'pay-hmcts-other': 'The amount has been paid to HMCTS/Other.',
    'move-funds-to-suspense': 'The amount has been moved to the suspense account.'
  }

  const message = messages[destination] || 'The cheque has been cancelled.'

  res.render("finance/ucd/cancel-cheques/confirmation", { message, cheque })
})

router.get('/cancel-cheques/cheque-history', (req, res) => {
  const destination = sourceState(req)['cancelFundsDestination']
  const cheque = sourceState(req)['cancelCheque']
  const reason = sourceState(req)['cancelReason'] || ''

  if (!cheque) return res.redirect('/cancel-cheques')
  if (!destination) {
    const historyRows = [
      {
        date: cheque.dateWrittenShort,
        user: 'Sarah Davis',
        type: 'Financial',
        detail: `Cheque issued  ·  Cheque number: ${cheque.chequeNumber}`,
        amount: cheque.amount,
        tag: 'CR'
      }
    ]
    return res.render("finance/ucd/cancel-cheques/cheque-history", { cheque, historyRows })
  }
  const now = new Date()
  const cancelDate = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  const cancelDateSlash = now.toLocaleDateString('en-GB')

  const defaultNotes = {
    'issue-new-cheque': "The original cheque was lost in the post. The payee's address has been verified, and a new cheque is required to pay the outstanding balance.",
    'pay-hmcts-other': 'A duplicate cheque was issued by mistake. The funds are being returned to the HMCTS central account to correct the ledger balance.',
    'move-funds-to-suspense': "The cheque was returned by the Post Office because the payee has moved. The funds are being moved to the suspense account until we find their new address."
  }

  const variableRows = {
    'issue-new-cheque': {
      date: cancelDate,
      user: 'Sarah Davis',
      type: 'Financial',
      detail: `Cheque reissued  ·  Cheque number: Not yet written`,
      amount: cheque.amount,
      tag: 'CR'
    },
    'pay-hmcts-other': {
      date: cancelDate,
      user: 'Sarah Davis',
      type: 'Financial',
      detail: `Suspense transfer  ·  Cheque cancelled to Central Fund`,
      amount: cheque.amount,
      tag: 'DR'
    },
    'move-funds-to-suspense': {
      date: cancelDate,
      user: 'Sarah Davis',
      type: 'Financial',
      detail: `Suspense transfer  ·  Cheque cancelled to suspense 256335`,
      amount: cheque.amount,
      tag: 'DR'
    }
  }

  const historyRows = [
    {
      date: cheque.dateWrittenShort,
      user: 'Sarah Davis',
      type: 'Financial',
      detail: `Cheque issued  ·  Cheque number: ${cheque.chequeNumber}  ·  Cheque cancelled: ${cancelDateSlash}`,
      amount: cheque.amount,
      tag: 'CR'
    },
    {
      date: cancelDate,
      user: 'Sarah Davis',
      type: 'Financial',
      detail: `Cheque cancelled  ·  Cheque number: ${cheque.chequeNumber}`,
      amount: cheque.amount,
      tag: 'DR'
    },
    variableRows[destination],
    {
      date: cancelDate,
      user: 'Sarah Davis',
      type: 'Notes',
      detail: reason || defaultNotes[destination],
      amount: null,
      tag: null
    }
  ]

  res.render("finance/ucd/cancel-cheques/cheque-history", { cheque, historyRows })
})
function getCreditorAccount(creditorAccountId) {
  return minorCreditorAccounts.find(c => c.accountId === creditorAccountId)
}

function enrichPayment(payment) {
  const creditor = getCreditorAccount(payment.creditorAccountId)
  return {
    ...payment,
    creditorName: creditor ? creditor.accountName : payment.creditorAccountId
  }
}

function getRemainingBacsPayments(req, account) {
  const completed = (sourceState(req)['reissueBacsCompleted'] || {})[account.bankAccountId] || []
  return account.payments.filter(p => !completed.includes(p.transactionNumber)).map(enrichPayment)
}
const bacsReissueDestinations = ['pay-to-existing-creditor-by-bacs', 'issue-new-cheque']

function parseMoneyToPence(value) {
  return Number(helpers.parseMoney(value || '0'))
}

function formatPenceToMoney(pence) {
  return `£${(pence / 100).toFixed(2)}`
}
function getPaymentsForCreditor(creditorAccountId) {
  const results = []
  bacsPayments.forEach(bankAccount => {
    bankAccount.payments.forEach(payment => {
      if (payment.creditorAccountId === creditorAccountId) {
        results.push({ bankAccount, payment })
      }
    })
  })
  return results
}
function getCreditorForRequest(req) {
  const creditorAccountId = req.query.creditor || (sourceState(req)['reissueBacsSelectedPayment'] || {}).creditorAccountId
  return getCreditorAccount(creditorAccountId)
}
function getCreditorAccountTotals(req, creditor) {
  const completedDetailsByBankAccount = sourceState(req)['reissueBacsCompletedDetails'] || {}

  let movedToOutstandingPence = 0
  getPaymentsForCreditor(creditor.accountId).forEach(({ bankAccount, payment }) => {
    const completedDetails = completedDetailsByBankAccount[bankAccount.bankAccountId] || {}
    const completion = completedDetails[payment.transactionNumber]
    if (completion && !bacsReissueDestinations.includes(completion.destination)) {
      movedToOutstandingPence += parseMoneyToPence(payment.amount)
    }
  })

  return {
    ...creditor,
    awaitingPayment: formatPenceToMoney(parseMoneyToPence(creditor.awaitingPayment) - movedToOutstandingPence),
    outstanding: formatPenceToMoney(parseMoneyToPence(creditor.outstanding) + movedToOutstandingPence)
  }
}

router.get('/reissue-bacs-payments', (req, res) => {
  sourceState(req)['reissueBacsAccount'] = null
  sourceState(req)['reissueBacsSelectedPayment'] = null
  sourceState(req)['reissueBacsIsSingle'] = null
  sourceState(req)['reissueBacsDestination'] = null
  sourceState(req)['reissueBacsReason'] = null
  res.render("finance/ucd/reissue-bacs-payments/index", {
    errors: null,
    bankAccountNumber: '',
    sortCode: ''
  })
})

router.post('/reissue-bacs-payments', (req, res) => {
  const bankAccountNumber = (req.body.enterBankAccountNumber || '').trim()
  const sortCode = (req.body.enterSortCode || '').trim()

  const errors = []
  if (!bankAccountNumber) {
    errors.push({ text: 'Enter a bank account number', href: '#enterBankAccountNumber' })
  }
  if (!sortCode) {
    errors.push({ text: 'Enter a sort code', href: '#enterSortCode' })
  }

  if (errors.length > 0) {
    return res.render("finance/ucd/reissue-bacs-payments/index", {
      errors,
      accountNumberError: !bankAccountNumber ? 'Enter a bank account number' : null,
      sortCodeError: !sortCode ? 'Enter a sort code' : null,
      bankAccountNumber,
      sortCode
    })
  }

  const account = bacsPayments.find(a => a.bankAccountNumber === bankAccountNumber && a.sortCode === sortCode)

  if (!account) {
    return res.redirect('/reissue-bacs-payments/bacs-not-found')
  }

  sourceState(req)['reissueBacsAccount'] = account

  const remaining = getRemainingBacsPayments(req, account)

  if (remaining.length === 0) {
    return res.redirect('/reissue-bacs-payments/bacs-not-found')
  }

  if (remaining.length === 1) {
    sourceState(req)['reissueBacsSelectedPayment'] = remaining[0]
    sourceState(req)['reissueBacsIsSingle'] = true
    return res.redirect('/reissue-bacs-payments/single')
  }

  res.redirect('/reissue-bacs-payments/multiple')
})

router.get('/reissue-bacs-payments/bacs-not-found', (req, res) => {
  res.render("finance/ucd/reissue-bacs-payments/bacs-not-found")
})

router.get('/reissue-bacs-payments/single', (req, res) => {
  const account = sourceState(req)['reissueBacsAccount']
  const payment = sourceState(req)['reissueBacsSelectedPayment']
  if (!account || !payment) return res.redirect('/reissue-bacs-payments')
  res.render("finance/ucd/reissue-bacs-payments/single/index", { account, payment })
})

router.post('/reissue-bacs-payments/review-single-details', (req, res) => {
  res.redirect('/reissue-bacs-payments/reallocate')
})

router.get('/reissue-bacs-payments/multiple', (req, res) => {
  const account = sourceState(req)['reissueBacsAccount']
  if (!account) return res.redirect('/reissue-bacs-payments')

  const remaining = getRemainingBacsPayments(req, account)

  if (remaining.length === 0) {
    return res.redirect('/reissue-bacs-payments')
  }

  if (remaining.length === 1) {
    sourceState(req)['reissueBacsSelectedPayment'] = remaining[0]
    sourceState(req)['reissueBacsIsSingle'] = true
    return res.redirect('/reissue-bacs-payments/single')
  }

  const rows = remaining.map(payment => [
    { html: `<a class="govuk-link govuk-link--no-visited-state" href="/finance/reissue-bacs-payments/multiple/select-payment?tx=${payment.transactionNumber}">${payment.transactionNumber}<span class="govuk-visually-hidden"> - reissue payment to ${payment.creditorName} for ${payment.amount}</span></a>` },
    { html: `<a class="govuk-link govuk-link--no-visited-state" href="/finance/reissue-bacs-payments/at-a-glance?creditor=${payment.creditorAccountId}">${payment.creditorAccountId}</a><br>${payment.creditorName}` },
    { text: payment.transactionDateShort || payment.transactionDate },
    { text: payment.amount }
  ])

  res.render("finance/ucd/reissue-bacs-payments/multiple/index", { account, payments: remaining, rows })
})

router.get('/reissue-bacs-payments/multiple/select-payment', (req, res) => {
  const account = sourceState(req)['reissueBacsAccount']
  if (!account) return res.redirect('/reissue-bacs-payments')

  const remaining = getRemainingBacsPayments(req, account)
  const payment = remaining.find(p => p.transactionNumber === req.query.tx)

  if (!payment) return res.redirect('/reissue-bacs-payments/multiple')

  sourceState(req)['reissueBacsSelectedPayment'] = payment
  sourceState(req)['reissueBacsIsSingle'] = false

  res.redirect('/reissue-bacs-payments/reallocate')
})

router.get('/reissue-bacs-payments/reallocate', (req, res) => {
  const account = sourceState(req)['reissueBacsAccount']
  const payment = sourceState(req)['reissueBacsSelectedPayment']
  const isSingle = sourceState(req)['reissueBacsIsSingle']

  if (!account || !payment) return res.redirect('/reissue-bacs-payments')

  res.render("finance/ucd/reissue-bacs-payments/reallocate", {
    account,
    payment,
    backHref: isSingle ? '/reissue-bacs-payments/single' : '/reissue-bacs-payments/multiple'
  })
})

router.post('/reissue-bacs-payments/reallocate', (req, res) => {
  const account = sourceState(req)['reissueBacsAccount']
  const payment = sourceState(req)['reissueBacsSelectedPayment']
  const isSingle = sourceState(req)['reissueBacsIsSingle']

  if (!account || !payment) return res.redirect('/reissue-bacs-payments')

  const wherePaymentShouldGo = req.body.wherePaymentShouldGo
  const accountNote = (req.body.accountNote || '').trim()

  const errors = []

  if (!wherePaymentShouldGo) {
    errors.push({ text: 'Select where the payment should go', href: '#wherePaymentShouldGo' })
  }

  if (!accountNote) {
    errors.push({ text: 'Enter reason for payment', href: '#account-note' })
  }

  if (errors.length > 0) {
    return res.render("finance/ucd/reissue-bacs-payments/reallocate", {
      account,
      payment,
      backHref: isSingle ? '/reissue-bacs-payments/single' : '/reissue-bacs-payments/multiple',
      errors,
      fundsError: !wherePaymentShouldGo ? 'Select where the payment should go' : null,
      reasonError: !accountNote ? 'Enter reason for payment' : null,
      wherePaymentShouldGo,
      accountNote
    })
  }

  const now = new Date()
  const cancelDate = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  const cancelDateSlash = now.toLocaleDateString('en-GB')
  const cancelDateSort = now.toISOString().slice(0, 10)
  sourceState(req)['reissueBacsCompleted'] = sourceState(req)['reissueBacsCompleted'] || {}
  sourceState(req)['reissueBacsCompleted'][account.bankAccountId] = sourceState(req)['reissueBacsCompleted'][account.bankAccountId] || []
  sourceState(req)['reissueBacsCompleted'][account.bankAccountId].push(payment.transactionNumber)
  sourceState(req)['reissueBacsCompletedDetails'] = sourceState(req)['reissueBacsCompletedDetails'] || {}
  sourceState(req)['reissueBacsCompletedDetails'][account.bankAccountId] = sourceState(req)['reissueBacsCompletedDetails'][account.bankAccountId] || {}
  sourceState(req)['reissueBacsCompletedDetails'][account.bankAccountId][payment.transactionNumber] = {
    destination: wherePaymentShouldGo,
    reason: helpers.escapeHtml(accountNote),
    cancelDate,
    cancelDateSlash,
    cancelDateSort
  }

  sourceState(req)['reissueBacsDestination'] = wherePaymentShouldGo
  sourceState(req)['reissueBacsReason'] = accountNote

  res.redirect('/reissue-bacs-payments/confirmation')
})

router.get('/reissue-bacs-payments/confirmation', (req, res) => {
  const account = sourceState(req)['reissueBacsAccount']
  const payment = sourceState(req)['reissueBacsSelectedPayment']
  const isSingle = sourceState(req)['reissueBacsIsSingle']
  const destination = sourceState(req)['reissueBacsDestination']

  if (!account || !payment) return res.redirect('/reissue-bacs-payments')

  const messages = {
    'pay-to-existing-creditor-by-bacs': 'Amount has been paid out to creditor.',
    'issue-new-cheque': 'A new cheque has been issued.',
    'move-funds-to-suspense': 'The amount has been moved to the suspense account.',
    'reallocate-to-account': 'Amount has been held on creditor account and will be repaid once hold has been removed.',
    'pay-hmcts-other': 'The amount has been allocated to HMCTS/Other.'
  }

  const message = messages[destination] || 'The BACS payment has been cancelled.'
  const remaining = getRemainingBacsPayments(req, account)

  res.render(isSingle ? 'reissue-bacs-payments/single/confirmation' : 'reissue-bacs-payments/multiple/confirmation', {
    account,
    payment,
    message,
    remainingCount: remaining.length
  })
})

router.get('/reissue-bacs-payments/at-a-glance', (req, res) => {
  const creditor = getCreditorForRequest(req)

  if (!creditor) return res.redirect('/reissue-bacs-payments')

  res.render("finance/ucd/reissue-bacs-payments/at-a-glance", { account: getCreditorAccountTotals(req, creditor) })
})

router.get('/reissue-bacs-payments/payment-history', (req, res) => {
  const creditor = getCreditorForRequest(req)
  const payment = sourceState(req)['reissueBacsSelectedPayment']

  if (!creditor) return res.redirect('/reissue-bacs-payments')

  const completedDetailsByBankAccount = sourceState(req)['reissueBacsCompletedDetails'] || {}

  const defaultNotes = {
    'pay-to-existing-creditor-by-bacs': 'The BACS payment failed to reach the creditor. The creditor\'s bank details have been reconfirmed, and the payment is being reissued by BACS to settle the outstanding amount.',
    'issue-new-cheque': 'The BACS payment failed to reach the creditor\'s bank account. The creditor\'s postal address has been confirmed, and a cheque is being issued instead to settle the outstanding amount.',
    'move-funds-to-suspense': 'The BACS payment was rejected by the receiving bank. The funds are being moved to the suspense account until the correct details are confirmed.',
    'reallocate-to-account': 'The payment was sent to the wrong account in error. The funds are being reallocated to the correct account.',
    'pay-hmcts-other': 'A duplicate payment was made by mistake. The funds are being returned to the HMCTS central account to correct the ledger balance.'
  }
  const extraRow = {
    'pay-to-existing-creditor-by-bacs': (amount, transactionNumber) => ({
      detail: `BACS payment reissued  ·  Payment reference: ${String(Number(transactionNumber) + 109532)}`,
      amount,
      tag: 'DR'
    }),
    'issue-new-cheque': (amount) => ({
      detail: `Cheque reissued  ·  Cheque number: Not yet written`,
      amount,
      tag: 'DR'
    }),
    'move-funds-to-suspense': (amount) => ({
      detail: `Suspense transfer  ·  12345678A`,
      amount,
      tag: 'DR'
    }),
    'pay-hmcts-other': (amount, transactionNumber) => ({
      detail: `BACS payment reissued  ·  Payment reference: ${String(Number(transactionNumber) + 109532)}`,
      amount,
      tag: 'DR'
    }),
    'reallocate-to-account': () => ({
      detail: `Payment hold  ·  Old: False  ·  New: True`,
      amount: null,
      tag: null
    })
  }

  const historyRows = []

  getPaymentsForCreditor(creditor.accountId).forEach(({ bankAccount, payment: accountPayment }) => {
    const completedDetails = completedDetailsByBankAccount[bankAccount.bankAccountId] || {}
    const completion = completedDetails[accountPayment.transactionNumber]

    historyRows.push({
      date: accountPayment.transactionDateShort,
      sortDate: accountPayment.transactionDateSort,
      user: 'Sarah Davis',
      type: 'Financial',
      detail: `Payment received: ${accountPayment.paymentReference}`,
      amount: accountPayment.amount,
      tag: 'CR'
    })

    if (!completion) return

    historyRows.push({
      date: completion.cancelDate,
      sortDate: completion.cancelDateSort,
      user: 'Sarah Davis',
      type: 'Financial',
      detail: `BACS payment  ·  Payment reference: ${accountPayment.transactionNumber}`,
      amount: accountPayment.amount,
      tag: 'DR'
    })

    historyRows.push({
      date: completion.cancelDate,
      sortDate: completion.cancelDateSort,
      user: 'Sarah Davis',
      type: 'Financial',
      detail: `BACS payment returned  ·  Payment reference: ${accountPayment.transactionNumber}`,
      amount: accountPayment.amount,
      tag: 'CR'
    })

    const extra = extraRow[completion.destination] && extraRow[completion.destination](accountPayment.amount, accountPayment.transactionNumber)
    if (extra) {
      historyRows.push({
        date: completion.cancelDate,
        sortDate: completion.cancelDateSort,
        user: 'Sarah Davis',
        type: 'Financial',
        ...extra
      })
    }

    historyRows.push({
      date: completion.cancelDate,
      sortDate: completion.cancelDateSort,
      user: 'Sarah Davis',
      type: 'Notes',
      detail: helpers.escapeHtml(completion.reason || defaultNotes[completion.destination]),
      amount: null,
      tag: null
    })
  })

  historyRows.sort((a, b) => a.sortDate.localeCompare(b.sortDate))

  res.render("finance/ucd/reissue-bacs-payments/payment-history", { account: getCreditorAccountTotals(req, creditor), payment, historyRows })
})

  // RM entry points omit UCD business-unit screens. Keep the separate period choice.
  router.get('/suspense', (req, res) => res.redirect('/finance/suspense/search'))
  router.get('/repayment', (req, res) => res.redirect('/finance/repayment/repayment'))
  router.get('/daily-checks', (req, res) => res.redirect('/finance/daily-checks/task-list'))
  router.get('/month-end', (req, res) => res.redirect('/finance/month-end/task-list'))
  router.get('/quarter-year-end', (req, res) => res.redirect('/finance/quarter-year-end/select-check'))
  router.get('/quarter-year-end/select-check', (req, res) => res.render('finance/ucd/quarter-year-end/select-business-unit'))
  router.get('/reversed-payments', (req, res) => res.redirect('/finance/reports/reversed-payments'))
  router.get('/:group(daily-checks|month-end|quarter-year-end)/tasks', (req, res) => res.redirect('/finance/' + req.params.group + '/task-list'))
  router.get('/:group(daily-checks|month-end)/select-business-unit', (req, res) => res.redirect('/finance/' + req.params.group + '/task-list'))
  router.get('/repayment/select-business-unit', (req, res) => res.redirect('/finance/repayment/repayment'))
  router.get('/quarter-year-end/select-business-unit', (req, res) => res.redirect('/finance/quarter-year-end/select-check'))
  router.get('/month-end/payout', (req, res) => res.redirect('/finance/month-end/payout-minor'))
  router.get('/month-end/major-c-bacs', (req, res) => res.render('finance/ucd/month-end/major-c-bacs'))
  router.get('/month-end/court-fees-transfer', (req, res) => res.render('finance/ucd/month-end/court-fees-transfer'))

  // Source report states are explicit server-rendered transitions, without source JavaScript.
  const screenForPath = new Map(screens.filter(s => !s.source.startsWith('search/')).map(s => [s.url.replace(/^\/finance/, '').replace(/defendant/g, 'respondent').replace('transfer-fines-paid-in-advance','transfer-maintenance-paid-in-advance'), s]))
  function sourceForm(req, res, screen, messages) {
    const sourceErrors = Object.entries(messages).map(([name, text]) => ({text, href: '#' + ({accountNumber:'account-number',suspenseNote:'suspense-note',accountNote:'account-note'}[name] || name)}))
    return res.render(screen.template, {sourceErrors, fieldErrors: Object.fromEntries(Object.entries(messages).map(([name,text]) => [name,{text}]))})
  }
  function required(req, names) {
    const messages = {}
    const labels = {
      dateOfHearing: 'Enter date of payment', creditorType: 'Select creditor type',
      addressL1: 'Enter address line 1', postCode: 'Enter postcode',
      repaymentPaymentMethod: 'Select a payment method', amountToRepayment: 'Enter an amount to repay',
      creditorTypeIndividualFirstName: 'Enter first names', creditorTypeIndividualLastName: 'Enter last name',
      creditorTypeCompanyName: 'Enter company name', creditorAccountName: 'Enter the name on the bank account',
      creditorSortCode: 'Enter sort code', creditorAccountNumber: 'Enter bank account number',
      nextChequeNumber: 'Enter next cheque number'
    }
    for (const name of names) if (!String(req.body[name] || '').trim()) messages[name] = labels[name] || 'Enter a value'

    return messages
  }
  router.post('/repayment/repayment-confirmation', (req,res) => {
    const state = sourceState(req)
    Object.assign(state, req.body)
    const names = ['dateOfHearing', 'creditorType', 'addressL1', 'postCode', 'repaymentPaymentMethod', 'amountToRepayment']
    names.push(...(state.creditorType === 'Company' ? ['creditorTypeCompanyName'] : ['creditorTypeIndividualFirstName','creditorTypeIndividualLastName']))
    if (state.repaymentPaymentMethod === 'Pay by BACS') names.push('creditorAccountName','creditorSortCode','creditorAccountNumber')
    const errors = required(req,names)
    if (helpers.parseMoney(state.amountToRepayment) === null || BigInt(helpers.parseMoney(state.amountToRepayment) || '0') <= 0n) errors.amountToRepayment = 'Enter an amount greater than £0 with no more than 2 decimal places'
    if (!helpers.validDate(state.dateOfHearing)) errors.dateOfHearing = 'Enter a valid date of payment'
    if (Object.keys(errors).length) return sourceForm(req,res,screenForPath.get('/repayment/repayment'),errors)
    state.repaymentComplete = true
    return res.redirect('/finance/repayment/repayment-confirmation')
  })
  router.get('/repayment/repayment-confirmation', (req,res) => {
    if (!sourceState(req).repaymentComplete) return res.redirect('/finance/repayment')
    return res.render('finance/ucd/repayment/repayment-confirmation')
  })
  router.post('/:group(daily-checks|month-end)/check-print-number', (req,res) => res.redirect('/finance/' + req.params.group + '/check-print-number'))
  router.post('/:group(daily-checks|month-end)/print-cheques', (req,res) => {
    const messages = required(req,['nextChequeNumber'])
    if (req.body.nextChequeNumber && !/^\d{3,10}$/.test(req.body.nextChequeNumber)) messages.nextChequeNumber = 'Enter a valid next cheque number'
    if (Object.keys(messages).length) return sourceForm(req,res,screenForPath.get('/' + req.params.group + '/check-print-number'),messages)
    const state=sourceState(req), entered=String(req.body.nextChequeNumber)
    const missing=Number(entered)-2883-1
    if(missing>0 && state.checkedChequeNumber!==entered) {
      state.checkedChequeNumber=entered
      return res.render('finance/ucd/'+req.params.group+'/check-print-number',{sequenceMessage:missing+(missing===1?' cheque is missing':' cheques are missing')})
    }
    delete state.checkedChequeNumber
    Object.assign(sourceState(req),req.body,{chequesPrinted:'true'})
    return res.redirect('/finance/' + req.params.group + '/print-cheques')
  })
  router.post('/:group(daily-checks|month-end)/processed-presented-cheques', (req,res) => {
    sourceState(req).chequesProcessed = 'true'
    return res.redirect('/finance/' + req.params.group + '/processed-presented-cheques')
  })
  router.post('/:group(daily-checks|month-end)/print-confirmation', (req,res) => {
    Object.assign(sourceState(req),req.body)
    if (!req.body.printer) return sourceForm(req,res,screenForPath.get('/' + req.params.group + '/select-printer'),{printer:'Select a printer'})
    sourceState(req).flash = 'Report sent to printer'
    return res.redirect('/finance/' + req.params.group + '/print-report')
  })
  router.post('/month-end/payout-minor', (req,res) => {
    if (req.body.payoutMinorCreditor) {
      sourceState(req).payoutMinorCreditor = req.body.payoutMinorCreditor
      return res.redirect('/finance/month-end/payout-method-normal')
    }
    Object.assign(sourceState(req),req.body,{minorCreditorsPaidOut:'true'})
    return res.redirect('/finance/month-end/payout-minor')
  })
  router.get('/month-end/payout-method-demand', (req,res) => {
    sourceState(req).payoutMinorCreditor = 'Demand'
    return res.render('finance/ucd/month-end/payout-method-normal')
  })
  router.post('/:group(daily-checks|month-end)/:report', (req,res,next) => {
    const screen = screenForPath.get('/' + req.params.group + '/' + req.params.report)
    if (!screen) return next()
    Object.assign(sourceState(req),req.body,req.query)
    return res.redirect('/finance/' + req.params.group + '/' + req.params.report + (Object.keys(req.query).length ? '?' + new URLSearchParams(req.query) : ''))
  })
  // Unlinked upstream report-harness stubs return to the actual Bank report screen.
  router.get('/:group(daily-checks|month-end)/test-report', (req,res) => res.redirect('/finance/'+req.params.group+'/bank-list'))
  router.get('/:group(daily-checks|month-end|quarter-year-end|repayment)/:screen', (req,res,next) => {
    const screen = screenForPath.get('/' + req.params.group + '/' + req.params.screen)
    if (!screen) return next()
    return res.render(screen.template)
  })

  return router
}
