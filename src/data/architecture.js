// RAA Travel — Current-state system landscape and target-state interventions.
//
// NOT CURRENTLY RENDERED. The Architecture tab was removed from the app; this file is retained
// because it holds analysis (22 systems, 12 data flows, 11 target-state interventions mapped to
// challenges and capabilities) that is not captured anywhere else. Delete it if it is not wanted.

export const layers = [
  {
    id: 'channel',
    name: 'Channels',
    blurb: 'How members reach RAA Travel today.',
    systems: [
      { id: 'branch', name: 'Retail Branch', kind: 'Channel', purpose: 'Face-to-face consultation, physical payment, printed documents.', integration: 'manual' },
      { id: 'genesys', name: 'Genesys', kind: 'Telephony', purpose: 'Voice channel; the consultant is on the phone during card capture.', integration: 'none' },
      { id: 'mailbox', name: 'Personal & Shared Mailboxes', kind: 'Email', purpose: 'Quotes, EAT templates, vouchers, payment screenshots.', integration: 'none' },
    ],
  },
  {
    id: 'core',
    name: 'Core Booking & Finance',
    blurb: 'Tramada is the system of record — but almost nothing feeds it automatically.',
    systems: [
      { id: 'tramada', name: 'Tramada', kind: 'Core', purpose: 'Bookings, segments, costings, receipts, creditor payments, invoices.', integration: 'partial', core: true },
      { id: 'amadeus', name: 'Amadeus', kind: 'GDS', purpose: 'Flight reservations and the DVC Generator Smart Flow.', integration: 'api' },
      { id: 'landscape', name: 'Landscape', kind: 'CRM', purpose: 'Member contact details and member number.', integration: 'manual' },
      { id: 'compass', name: 'Compass', kind: 'Intranet', purpose: 'Schedule of Fees, staff discount rules, EAT templates.', integration: 'none' },
    ],
  },
  {
    id: 'sourcing',
    name: 'Product & Sourcing',
    blurb: 'Where trips are actually found and reserved — none of it flows into Tramada.',
    systems: [
      { id: 'wholesalers', name: 'Wholesaler Portals', kind: 'Supplier', purpose: 'Room-Res, Viva Holidays and similar — accommodation and transfers.', integration: 'none' },
      { id: 'lcc', name: 'Low-Cost Carriers', kind: 'Supplier', purpose: 'Jetstar and similar; booked direct, keyed into Tramada by hand.', integration: 'none' },
      { id: 'touratlas', name: 'Tour Atlas', kind: 'Discovery', purpose: 'Tour search by destination, travel style and date.', integration: 'none' },
      { id: 'tokio', name: 'Tokio Marine', kind: 'Insurance', purpose: 'Travel insurance placement; standalone free-form portal.', integration: 'none' },
    ],
  },
  {
    id: 'payments',
    name: 'Payments',
    blurb: 'Four ways money comes in, three ways it goes out — all stitched together manually.',
    systems: [
      { id: 'ipsi', name: 'IPSI', kind: 'Gateway', purpose: 'Card-not-present client payments via phone keypad.', integration: 'manual' },
      { id: 'ecr', name: 'ECR', kind: 'POS', purpose: 'Cash and cheque receipting through the Retail team.', integration: 'manual' },
      { id: 'bpay', name: 'BPay / Direct Deposit', kind: 'Bank rail', purpose: 'Member-initiated transfers into the RAA bank account.', integration: 'manual' },
      { id: 'mint', name: 'MINT', kind: 'Supplier payment', purpose: 'EFT payments out to suppliers; details re-keyed from Tramada.', integration: 'manual' },
      { id: 'travelpay', name: 'TravelPay', kind: 'Supplier payment', purpose: 'Alternative supplier payment rail; follows the MINT flow.', integration: 'manual' },
      { id: 'vcc', name: 'Virtual Credit Card', kind: 'Supplier payment', purpose: 'Generated in Amadeus, pasted into the supplier portal, later written off.', integration: 'partial' },
    ],
  },
  {
    id: 'data',
    name: 'Data, Storage & Access',
    blurb: 'The shadow systems doing real work in the process.',
    systems: [
      { id: 'westpac', name: 'Westpac Reporting', kind: 'Bank', purpose: 'Daily BPay report, downloaded by hand each morning.', integration: 'manual' },
      { id: 'excel', name: 'Reconciliation Spreadsheet', kind: 'Shadow IT', purpose: 'Where bank movements are matched to bookings.', integration: 'none' },
      { id: 'ydrive', name: 'Y: Drive', kind: 'File store', purpose: 'Travel Services network drive holding quotes and signed acceptances.', integration: 'none' },
      { id: 'sharepoint', name: 'SharePoint', kind: 'Forms', purpose: 'New hotel supplier request form.', integration: 'none' },
      { id: 'lastpass', name: 'LastPass', kind: 'Vault', purpose: 'Shared portal logons and RAA dummy credit card details.', integration: 'none' },
    ],
  },
]

export const integrationLegend = [
  { key: 'api', label: 'System integration', desc: 'Data flows automatically between systems.' },
  { key: 'partial', label: 'Partial / assisted', desc: 'Some automation, but a human still bridges the gap.' },
  { key: 'manual', label: 'Manual re-key', desc: 'A person retypes the same data into the next system.' },
  { key: 'none', label: 'No integration', desc: 'Email, file, paper or memory carries the data.' },
]

export const flows = [
  { from: 'Amadeus', to: 'Tramada', mechanism: 'System integration', status: 'api', note: 'Flight reservations flow through. The only live link in the estate.' },
  { from: 'Landscape', to: 'Tramada', mechanism: 'Manual copy', status: 'manual', note: 'Email, phone and member # copied across by the consultant.' },
  { from: 'Wholesalers / LCC', to: 'Tramada', mechanism: 'Manual re-key', status: 'none', note: 'Every segment built by hand — the single largest time sink.' },
  { from: 'Tramada', to: 'MINT', mechanism: 'Manual re-key', status: 'manual', note: 'Creditor payable amount and six fields retyped. Known error source.' },
  { from: 'Amadeus (DVC)', to: 'Supplier portal', mechanism: 'Copy / paste', status: 'partial', note: 'Card number and expiry pasted into the supplier payment page.' },
  { from: 'IPSI', to: 'Tramada', mechanism: 'Manual note', status: 'manual', note: 'Payment confirmation summarised into booking notes.' },
  { from: 'Westpac', to: 'Spreadsheet', mechanism: 'Daily file download', status: 'manual', note: '30–60 minutes each morning; reference digit stripped by hand.' },
  { from: 'Spreadsheet', to: 'Tramada', mechanism: 'Manual receipt', status: 'manual', note: 'Debtor payment receipt created per matched payment.' },
  { from: 'Member', to: 'Accounts', mechanism: 'Emailed screenshot', status: 'none', note: 'The member supplies their own payment evidence.' },
  { from: 'Supplier', to: 'Shared mailbox', mechanism: 'Email voucher', status: 'none', note: 'Forwarded on by hand, then noted in the booking.' },
  { from: 'Consultant', to: 'SharePoint', mechanism: 'Form + email', status: 'none', note: 'New supplier request with no SLA or status back.' },
  { from: 'Compass', to: 'Consultant', mechanism: 'Read a document', status: 'none', note: 'Fee schedule and discount rules applied from memory.' },
]

export const interventions = [
  {
    id: 'I1', horizon: 'H1', name: 'Automated bank feed and payment matching',
    desc: 'Replace the daily Westpac download and spreadsheet with an ingested feed, rules-based matching to Tramada bookings and an exception queue for the unmatched.',
    solves: ['C20', 'C21', 'C24', 'C25', 'C11'], caps: ['3.5.1', '3.5.2', '3.5.3', '5.2.3'],
  },
  {
    id: 'I2', horizon: 'H1', name: 'Reference integrity by design',
    desc: 'Make the payment reference mandatory, generate it in the correct format, and normalise the bank\'s extra digit at ingestion rather than in a spreadsheet.',
    solves: ['C21', 'C22', 'C13'], caps: ['4.4.1', '3.5.5', '3.3.7'],
  },
  {
    id: 'I3', horizon: 'H1', name: 'Tramada → MINT payable push with human approval',
    desc: 'Push the creditor payable straight into MINT pre-populated, leaving the consultant a single approve-and-release action. Preserves RAA\'s human-in-the-loop requirement.',
    solves: ['C8', 'C7'], caps: ['3.3.4', '3.3.6', '4.2.2'],
  },
  {
    id: 'I4', horizon: 'H1', name: 'Automated receipting on settlement',
    desc: 'Raise the debtor payment receipt and allocate it to segments automatically when a matched settlement lands — removing the dummy card ritual entirely.',
    solves: ['C5', 'C23', 'C14'], caps: ['3.2.1', '3.2.3', '3.2.5', '3.2.6'],
  },
  {
    id: 'I5', horizon: 'H1', name: 'Member self-service payment',
    desc: 'A secure payment link the member uses on their own device, with real-time status. Removes phone-keypad card capture and the emailed screenshot.',
    solves: ['C15', 'C16', 'C17', 'C12'], caps: ['3.1.3', '3.5.4', '3.5.6'],
  },
  {
    id: 'I6', horizon: 'H1', name: 'Supplier content ingestion and segment auto-creation',
    desc: 'Build on RAA\'s existing POC: ingest wholesaler and low-cost carrier confirmations and create Tramada segments and costings automatically.',
    solves: ['C1', 'C2', 'C29', 'C35', 'C30'], caps: ['5.2.2', '5.2.5', '2.3.1', '2.2.5'],
  },
  {
    id: 'I7', horizon: 'H2', name: 'Supplier master data and commission rules',
    desc: 'Authoritative supplier catalogue with the net/gross commission model held against the supplier record and applied by rule at costing time.',
    solves: ['C31', 'C32', 'C33', 'C34'], caps: ['2.4.1', '2.3.3', '2.3.7'],
  },
  {
    id: 'I8', horizon: 'H2', name: 'Digital quote, acceptance and document vault',
    desc: 'Issue quotes and EAT digitally, capture acceptance electronically, and attach everything to the booking instead of the Y: drive and personal mailboxes.',
    solves: ['C9', 'C19', 'C13'], caps: ['1.4.1', '1.4.2', '2.5.5', '4.4.3'],
  },
  {
    id: 'I9', horizon: 'H2', name: 'Instalment and deposit payment support',
    desc: 'Close the acknowledged gap in the AS-IS pack: part payments, deposits and scheduled instalments handled natively.',
    solves: ['C18'], caps: ['3.1.9', '3.1.8'],
  },
  {
    id: 'I10', horizon: 'H2', name: 'Single sign-on and credential hygiene',
    desc: 'Federate supplier portal access and remove shared dummy card credentials from the payment path.',
    solves: ['C5', 'C6'], caps: ['4.3.1', '4.3.2', '2.4.5'],
  },
  {
    id: 'I11', horizon: 'H2', name: 'Guided consultant workspace',
    desc: 'One workspace over the estate with guided flows, cutting system-hopping and shortening the six-week ramp-up.',
    solves: ['C3', 'C4', 'C26', 'C27', 'C28'], caps: ['5.3.1', '5.3.2', '5.1.1'],
  },
]
