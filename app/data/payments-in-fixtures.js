// Prototype reference values retained from opal-prototype at 086c8ed9.
// These are source-prototype fees, not a current fee schedule.
module.exports = {
  "courtFees": [
    {
      "code": "C01.1",
      "description": "A JP PERFORMING A FUNCTION AWAY FROM COURT",
      "amount": "2900"
    },
    {
      "code": "C02.1",
      "description": "APP TO STATE CASE FOR OPINION OF H/C",
      "amount": "15600"
    },
    {
      "code": "C02.2",
      "description": "CSA91 APPEAL AGAINST DEDUCTION FROM EARNINGS",
      "amount": "2200"
    },
    {
      "code": "C02.3",
      "description": "APPEAL SCH 5 TO LICENSING ACT 2003",
      "amount": "7000"
    },
    {
      "code": "C02.4",
      "description": "AN APPEAL WHERE NO OTHER FEE SPECIFIED",
      "amount": "7000"
    },
    {
      "code": "C03.1",
      "description": "REQUEST FOR CERT OF REFUSAL TO STATE CASE",
      "amount": "0"
    },
    {
      "code": "C03.2",
      "description": "REQUEST FOR CERTIFICATE OF SATISFACTION",
      "amount": "1900"
    },
    {
      "code": "C03.3",
      "description": "REQUEST FOR CERTIFIED COPY OF MEMO OF CONVICTION",
      "amount": "1500"
    },
    {
      "code": "C03.4",
      "description": "REQUEST FOR CERTIFICATE OR DOC NO OTHER FEE",
      "amount": "2300"
    },
    {
      "code": "C04.1",
      "description": "CT APPN FOR LIABILITY ORDER",
      "amount": "50"
    },
    {
      "code": "C04.2",
      "description": "CSA 91 Application For Liability Order",
      "amount": "1400"
    },
    {
      "code": "C05.1A",
      "description": "COPY OF DOCUMENT FIRST 10 PAGES",
      "amount": "1100"
    },
    {
      "code": "C05.1B",
      "description": "COPY OF DOCUMENT EACH SUBSEQUENT PAGE",
      "amount": "50"
    },
    {
      "code": "C05.2",
      "description": "COPY OF DOCUMENT ON DISK",
      "amount": "1100"
    },
    {
      "code": "C06.1",
      "description": "LICENCE, CONSENT OR AUTHORITY NO FEE",
      "amount": "0"
    },
    {
      "code": "C06.2",
      "description": "APPLICATION FOR RENEWAL OR VARIATION LICENCE",
      "amount": "3100"
    },
    {
      "code": "C06.3",
      "description": "APPLICATION FOR REVOCATION OF LICENCE",
      "amount": "3100"
    }
  ],
  "sources": [
    "allpay",
    "NatWest",
    "British Telecom",
    "Barclaycard",
    "DWP/AEA",
    "Other"
  ],
  "methods": [
    "Notes and coins",
    "Postal order",
    "Cheque",
    "Credit transfer"
  ],
  "reasons": [
    {
      "value": "OF",
      "text": "Maintenance overpayment (OF)"
    },
    {
      "value": "FA",
      "text": "Maintenance paid in advance (FA)"
    },
    {
      "value": "MS",
      "text": "Miscellaneous payment (MS)"
    },
    {
      "value": "UN",
      "text": "Unidentified amount (UN)"
    }
  ]
}
