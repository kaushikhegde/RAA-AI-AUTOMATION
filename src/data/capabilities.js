// RAA Travel — Business Capability Map
// Derived from: booking proccess.pdf (15 AS-IS process diagrams, v0.3 23-Feb-2026),
// proccess challenge.pdf (current-state service blueprint), Tramada demo.docx (SME transcript).
//
// status:
//   H1  — Horizon 1: RAA's stated automation priority (client payments, supplier payments,
//         receipts, reconciliation) plus the traceability/integration that unblocks them
//   H2  — Horizon 2: automate once Horizon 1 lands
//   OOS — Out of scope for automation: judgement-led, advisory or vendor-owned

export const STATUS = {
  H1: { code: 'H1', label: 'Horizon 1', desc: 'Automate now — RAA stated priority' },
  H2: { code: 'H2', label: 'Horizon 2', desc: 'Automate next' },
  OOS: { code: 'OOS', label: 'Out of Scope', desc: 'Human-led or vendor-owned' },
}

export const domains = [
  {
    id: '1.0',
    name: 'Member & Engagement',
    blurb:
      'Everything from first enquiry to a signed acceptance — finding the member, understanding the trip, and keeping them informed.',
    groups: [
      {
        id: '1.1',
        name: 'Client Management',
        caps: [
          { id: '1.1.1', name: 'Client Search', status: 'H2', systems: ['Tramada', 'Landscape'], note: 'Consultant searches Tramada and Landscape thoroughly for matching client details.' },
          { id: '1.1.2', name: 'Client Profile Creation', status: 'H2', systems: ['Tramada'], note: 'Manual population of personal details when no profile exists.' },
          { id: '1.1.3', name: 'Client Detail Validation', status: 'OOS', systems: ['Tramada'], note: '3-point ID check performed verbally by consultant.' },
          { id: '1.1.4', name: 'Landscape Detail Retrieval & Copy', status: 'H1', systems: ['Landscape', 'Tramada'], note: 'Email, phone and member # copied across manually if available.' },
          { id: '1.1.5', name: 'Membership Lookup & Linking', status: 'H2', systems: ['Landscape'], note: 'Member number looked up when a membership record exists.' },
          { id: '1.1.6', name: 'Membership Record Creation', status: 'H2', systems: ['Tramada'], note: 'Client membership added where none exists.' },
          { id: '1.1.7', name: 'Passenger Management', status: 'H2', systems: ['Tramada'], note: 'Every adult passenger assumed to already hold a Tramada client profile.' },
        ],
      },
      {
        id: '1.2',
        name: 'Consultation & Enquiry',
        caps: [
          { id: '1.2.1', name: 'Travel Enquiry Capture', status: 'OOS', systems: ['Genesys', 'In-store'], note: 'Phone or face-to-face consultation.' },
          { id: '1.2.2', name: 'Requirement Gathering', status: 'OOS', systems: [], note: 'Consultant expertise; the "consultation part" of the job.' },
          { id: '1.2.3', name: 'Destination & Product Research', status: 'H2', systems: ['Tour Atlas', 'Wholesaler portals'], note: 'Tour Atlas returns tours by destination, style and date.' },
          { id: '1.2.4', name: 'Itinerary Design', status: 'OOS', systems: [], note: 'Overall travel itinerary determined before segments are built.' },
          { id: '1.2.5', name: 'Quote Presentation', status: 'H2', systems: ['Tramada'], note: 'Quote/booking document previewed and presented.' },
        ],
      },
      {
        id: '1.3',
        name: 'Communication & Correspondence',
        caps: [
          { id: '1.3.1', name: 'Outbound Email Management', status: 'H1', systems: ['Personal mailbox'], note: 'Composed from the consultant\'s own mailbox — no system record.' },
          { id: '1.3.2', name: 'Inbound Telephony Management', status: 'OOS', systems: ['Genesys'], note: 'Consultant on the phone with the client during card capture.' },
          { id: '1.3.3', name: 'In-Store Service Management', status: 'OOS', systems: ['Retail'], note: 'On-site clients print, review and sign documents in branch.' },
          { id: '1.3.4', name: 'Payment Request & Reminder', status: 'H1', systems: ['Personal mailbox'], note: 'Manual chase after a days-to-weeks client review period.' },
          { id: '1.3.5', name: 'Payment Receipted Notification', status: 'H1', systems: ['Personal mailbox'], note: 'Accounts emails ALL consultants when a BPay/deposit is receipted.' },
          { id: '1.3.6', name: 'Supplier Confirmation Handling', status: 'H1', systems: ['Personal mailbox', 'Shared mailbox'], note: 'Hotel vouchers land in a shared mailbox and are forwarded by hand.' },
        ],
      },
      {
        id: '1.4',
        name: 'Acceptance & Consent',
        caps: [
          { id: '1.4.1', name: 'Electronic Acceptance Template Issue', status: 'H1', systems: ['Compass', 'Personal mailbox'], note: 'EAT template retrieved from Compass and attached to an email.' },
          { id: '1.4.2', name: 'Signed Acceptance Capture', status: 'H1', systems: ['Email', 'Paper'], note: 'Email confirmation off-site; wet signature on-site.' },
          { id: '1.4.3', name: 'Scan & Store Acceptance', status: 'H1', systems: ['Y: drive'], note: 'Signed documents scanned to the Travel Services drive.' },
          { id: '1.4.4', name: 'Booking Note Annotation', status: 'H1', systems: ['Tramada'], note: 'Acceptance recorded free-text in booking notes — character limited.' },
        ],
      },
    ],
  },

  {
    id: '2.0',
    name: 'Booking & Fulfilment',
    blurb:
      'Building the trip in Tramada — segments, costings, supplier reservations and the documents that come out the other side.',
    groups: [
      {
        id: '2.1',
        name: 'Booking Lifecycle',
        caps: [
          { id: '2.1.1', name: 'Booking Creation', status: 'H2', systems: ['Tramada'], note: 'Client booking created and status set to "New".' },
          { id: '2.1.2', name: 'Booking Search & View', status: 'H2', systems: ['Tramada'], note: 'Existing booking retrieved before modification (BP002).' },
          { id: '2.1.3', name: 'Booking Status Management', status: 'H1', systems: ['Tramada'], note: 'New → Quote → Booked, driven manually at three separate points.' },
          { id: '2.1.4', name: 'Booking Modification', status: 'H2', systems: ['Tramada'], note: 'Separate AS-IS process BP002.' },
          { id: '2.1.5', name: 'Booking Notes Management', status: 'H1', systems: ['Tramada'], note: 'IPSI details, DVC/MINT details and acceptance all live here.' },
        ],
      },
      {
        id: '2.2',
        name: 'Product Sourcing & Reservation',
        caps: [
          { id: '2.2.1', name: 'Hotel Search', status: 'H2', systems: ['Room-Res', 'Viva Holidays'], note: 'Preferred supplier sites first, non-preferred if the client needs it.' },
          { id: '2.2.2', name: 'Hotel & Room Confirmation', status: 'OOS', systems: [], note: 'Client reviews and accepts the room offered.' },
          { id: '2.2.3', name: 'Hotel Hold vs Instant Purchase', status: 'H2', systems: ['Supplier portals'], note: 'Some suppliers demand instant purchase, others allow a deposit hold.' },
          { id: '2.2.4', name: 'Flight Reservation (GDS)', status: 'H2', systems: ['Amadeus'], note: 'The one product type that flows into Tramada automatically.' },
          { id: '2.2.5', name: 'Low-Cost Carrier Booking', status: 'H1', systems: ['Carrier sites'], note: 'Jetstar and similar — zero Tramada integration, fully manual.' },
          { id: '2.2.6', name: 'Tour & Package Sourcing', status: 'H2', systems: ['Tour Atlas', 'Wholesalers'], note: 'Sourced externally, keyed into Tramada by hand.' },
          { id: '2.2.7', name: 'Ancillary & Transfer Booking', status: 'H2', systems: ['Wholesalers'], note: 'Accommodation, transfers and extras via wholesaler portals.' },
          { id: '2.2.8', name: 'Travel Insurance Placement', status: 'H2', systems: ['Tokio Marine'], note: 'Standalone portal; works well but is another system to learn.' },
        ],
      },
      {
        id: '2.3',
        name: 'Segment & Costing Management',
        caps: [
          { id: '2.3.1', name: 'Segment Creation', status: 'H1', systems: ['Tramada'], note: 'Hotel segment created and supplier details populated manually.' },
          { id: '2.3.2', name: 'Supplier Rate Entry', status: 'H1', systems: ['Tramada'], note: 'Net rate usually entered in AUD regardless of hotel location.' },
          { id: '2.3.3', name: 'Agency Commission Calculation', status: 'H1', systems: ['Tramada'], note: 'Gross suppliers build it in; net suppliers need a manual ~10% calc.' },
          { id: '2.3.4', name: 'Package Costing Roll-Up', status: 'H2', systems: ['Tramada'], note: 'Package deals cost at package level, not segment level.' },
          { id: '2.3.5', name: 'Fee Schedule Application', status: 'H2', systems: ['Compass'], note: 'RAA Travel Schedule of Fees held as a Compass document.' },
          { id: '2.3.6', name: 'Staff Discount Application', status: 'H2', systems: ['Compass'], note: '"Staff Discount when booking Travel at RAA" rules.' },
          { id: '2.3.7', name: 'Payment Type Assignment', status: 'H1', systems: ['Tramada'], note: 'Must be right — it flows straight through to financials.' },
          { id: '2.3.8', name: 'Costing Allocation to Segment', status: 'H1', systems: ['Tramada'], note: 'Repeated for receipts, creditor payments and invoices.' },
        ],
      },
      {
        id: '2.4',
        name: 'Supplier & Product Master Data',
        caps: [
          { id: '2.4.1', name: 'Hotel & Supplier List Management', status: 'H1', systems: ['Tramada'], note: 'Name and address hand-typed when absent from the list.' },
          { id: '2.4.2', name: 'New Supplier Request', status: 'H1', systems: ['SharePoint'], note: 'Consultant completes a form; an email is sent. No SLA, no status.' },
          { id: '2.4.3', name: 'New Supplier Creation & Notification', status: 'H1', systems: ['Tramada', 'Email'], note: 'Product/Travel Support add the supplier and notify back.' },
          { id: '2.4.4', name: 'Creditor Account Setup', status: 'H2', systems: ['Tramada'], note: 'Account details populated for the new creditor.' },
          { id: '2.4.5', name: 'Supplier Portal Credential Management', status: 'H1', systems: ['LastPass'], note: 'Every creditor/supplier portal has its own login.' },
          {
            id: '2.4.6', name: 'Supplier vs Creditor Assignment', status: 'H1', systems: ['Tramada'],
            note: 'Tramada holds both. The hotel is the supplier; the wholesaler paid (Room Res, Stuba, Viva) is the creditor. Everyday language calls the wholesaler the supplier, so the fields are filled inconsistently.',
          },
          {
            id: '2.4.7', name: 'Creditor Trading-Name Mapping', status: 'H1', systems: ['Tramada', 'MINT'],
            note: 'Names differ per system — Web Source is Stuba; Circuit Travel covers Cosmos, Globus and Avalon. Held as institutional memory.',
          },
        ],
      },
      {
        id: '2.5',
        name: 'Travel Documentation',
        caps: [
          { id: '2.5.1', name: 'Itinerary & Costing Generation', status: 'H2', systems: ['Tramada'], note: 'Generated from the booking once segments exist.' },
          { id: '2.5.2', name: 'Quote / Booking Document Preview', status: 'H2', systems: ['Tramada'], note: 'Called quote, booking document or invoice depending on who is talking.' },
          { id: '2.5.3', name: 'Document Issue (Print / Email)', status: 'H1', systems: ['Tramada', 'Personal mailbox'], note: 'Printed in branch, or emailed from a personal mailbox.' },
          { id: '2.5.4', name: 'Voucher Receipt & Forwarding', status: 'H1', systems: ['Shared mailbox'], note: 'Hotel voucher emailed to a shared box, then forwarded on.' },
          { id: '2.5.5', name: 'Document Storage', status: 'H1', systems: ['Y: drive'], note: 'Travel Services network drive — outside the booking record.' },
        ],
      },
    ],
  },

  {
    id: '3.0',
    name: 'Payments & Finance',
    blurb:
      'RAA\'s stated automation priority: client payments, supplier payments, receipts, and the reconciliation of both back into Tramada.',
    groups: [
      {
        id: '3.1',
        name: 'Client Payment Acceptance',
        caps: [
          { id: '3.1.1', name: 'Payment Method Determination', status: 'H1', systems: ['Tramada'], note: 'Client may split across several methods.' },
          { id: '3.1.2', name: 'Card Payment — On-Site Swipe', status: 'H1', systems: ['Terminal', 'Tramada'], note: 'Physical payment when the customer is in branch.' },
          { id: '3.1.3', name: 'Card Payment — IPSI Phone Keypad', status: 'H1', systems: ['IPSI', 'Genesys'], note: 'Client keys card number, expiry and CVV into their phone.' },
          { id: '3.1.4', name: 'Cash & Cheque Acceptance', status: 'H2', systems: ['ECR', 'Retail'], note: 'Consultant physically walks cash to the Retail team.' },
          { id: '3.1.5', name: 'BPay Payment', status: 'H1', systems: ['BPay', 'Westpac'], note: 'Up to 3 working days to reach the RAA account.' },
          { id: '3.1.6', name: 'Direct Deposit / EFT', status: 'H1', systems: ['Westpac'], note: 'Up to 7 working days. BPay is replacing it.' },
          { id: '3.1.7', name: 'Multi-Method Split Payment', status: 'H1', systems: ['Tramada'], note: 'Loop in the AS-IS flow: ">=1 Client Payment?"' },
          { id: '3.1.8', name: 'Deposit vs Full Payment', status: 'H1', systems: ['Tramada'], note: 'Supplier conditions decide whether a hold-with-deposit is allowed.' },
          { id: '3.1.9', name: 'Instalment Payment', status: 'H2', systems: [], note: 'Marked "To Do" in the AS-IS pack, but part payments and deposits are routine in practice — the pack understates this.' },
          {
            id: '3.1.10', name: 'On-Account Supplier Settlement', status: 'H2', systems: ['Tramada'],
            note: 'For Tokio Marine, ETG and a few others the consultant takes the money and enters the costing; travel accounts make the payment.',
          },
        ],
      },
      {
        id: '3.2',
        name: 'Receipting',
        caps: [
          { id: '3.2.1', name: 'Debtor Payment Receipt Creation', status: 'H1', systems: ['Tramada'], note: 'The central receipting step for every client payment method.' },
          { id: '3.2.2', name: 'Receipt Transaction Type Selection', status: 'H1', systems: ['Tramada'], note: 'EFT selected for non-swipe; CCCF exists but is not used at RAA.' },
          { id: '3.2.3', name: 'Dummy Credit Card Selection', status: 'H1', systems: ['Tramada', 'LastPass'], note: 'RAA dummy card matched to the client\'s card type, name typed by hand.' },
          { id: '3.2.4', name: 'ECR Receipt & Branch Code Capture', status: 'H2', systems: ['ECR', 'Tramada'], note: 'Recorded against the receipt for cash payments.' },
          { id: '3.2.5', name: 'Receipt-to-Segment Allocation', status: 'H1', systems: ['Tramada'], note: 'Segments selected manually before the receipt is issued.' },
          { id: '3.2.6', name: 'Receipt Issue & Print', status: 'H1', systems: ['Tramada', 'ECR'], note: 'Booking status set to "Booked" on issue.' },
          { id: '3.2.7', name: 'Agency CC Debtor Receipt', status: 'H1', systems: ['Tramada'], note: 'Raised whenever a supplier was paid by DVC.' },
          {
            id: '3.2.8', name: 'Debtor vs Client Payment Receipt', status: 'H2', systems: ['Tramada'],
            note: 'Corporate bookings with a split profile (e.g. sports teams and their families) take a client payment receipt, retail bookings a debtor payment receipt.',
          },
          {
            id: '3.2.9', name: 'Finance Merchant Payment Receipt', status: 'H1', systems: ['Tramada'],
            note: 'Raised against in-store card settlements, matched by shop reference.',
          },
        ],
      },
      {
        id: '3.3',
        name: 'Supplier Payment',
        caps: [
          { id: '3.3.1', name: 'Supplier Payment Method Determination', status: 'H1', systems: ['Tramada'], note: 'DVC vs MINT/TravelPay — decided per supplier.' },
          { id: '3.3.2', name: 'Virtual Credit Card Generation', status: 'H1', systems: ['Amadeus'], note: 'DVC Generator Smart Flow; 6 fields populated by hand.' },
          { id: '3.3.3', name: 'DVC Population into Supplier Portal', status: 'H1', systems: ['Supplier portals'], note: 'Card number and expiry copied across, then payment submitted.' },
          { id: '3.3.4', name: 'MINT Payment Creation', status: 'H1', systems: ['MINT'], note: 'Booking #, agent ref, lead passenger, amount, date, payee — all re-keyed.' },
          { id: '3.3.5', name: 'TravelPay Payment', status: 'H1', systems: ['TravelPay'], note: 'Follows the MINT flow.' },
          { id: '3.3.6', name: 'Creditor Payment Creation (EFT)', status: 'H1', systems: ['Tramada'], note: 'Raised in Tramada for all non-DVC supplier payments.' },
          { id: '3.3.7', name: 'Payment Reference Capture', status: 'H1', systems: ['Tramada'], note: 'MINT/TravelPay reference number added to the creditor payment.' },
          { id: '3.3.8', name: 'DVC Write-Off', status: 'H1', systems: ['Tramada'], note: 'Required to clear the DVC after the agency CC debtor receipt.' },
          {
            id: '3.3.9', name: 'Payment Error Detection & Correction', status: 'H1', systems: ['Tramada', 'Westpac'],
            note: 'Wrong supplier paid, transposed digits, missing decimal points. Correction means chasing a refund and re-costing.',
          },
          {
            id: '3.3.10', name: 'Debit & Write-Off Management', status: 'H1', systems: ['Finance One'],
            note: 'Debits track money out pending supplier refund; write-offs track money lost outright. Both are formally reported.',
          },
          {
            id: '3.3.11', name: 'International EFT Payment', status: 'H2', systems: ['Westpac'],
            note: 'Needs beneficiary name, address, bank and branch. No confirmation of receipt at the far end — being defaulted to virtual card for chargeback cover.',
          },
          {
            id: '3.3.12', name: 'Post-Travel Commission Recovery', status: 'H2', systems: ['Tramada'],
            note: 'Gross virtual-card payments mean RAA pays the full amount and is repaid commission after the client travels.',
          },
        ],
      },
      {
        id: '3.4',
        name: 'Invoicing',
        caps: [
          { id: '3.4.1', name: 'Debtor Invoice Creation', status: 'H1', systems: ['Tramada'], note: 'Raised once the client has paid and suppliers are paid.' },
          { id: '3.4.2', name: 'Segment Selection for Invoice', status: 'H1', systems: ['Tramada'], note: 'One invoice per hotel segment.' },
          { id: '3.4.3', name: 'Invoice Validation', status: 'H1', systems: ['Tramada'], note: 'Consultant reviews and validates before issue.' },
          { id: '3.4.4', name: 'Invoice Issue', status: 'H1', systems: ['Tramada'], note: 'Looped for every invoice required on the booking.' },
        ],
      },
      {
        id: '3.5',
        name: 'Reconciliation & Settlement',
        caps: [
          { id: '3.5.1', name: 'BPay Bank Reconciliation', status: 'H1', systems: ['Westpac', 'Tramada'], note: 'Accounts match bank movements against bookings.' },
          { id: '3.5.2', name: 'Direct Deposit Reconciliation', status: 'H1', systems: ['Westpac', 'Tramada'], note: 'Up to 7 working days end-to-end.' },
          { id: '3.5.3', name: 'Bank Report Download & Match', status: 'H1', systems: ['Westpac', 'Excel'], note: '30 minutes to well over an hour every morning into a spreadsheet, depending on volume.' },
          { id: '3.5.4', name: 'Payment Evidence Handling', status: 'H1', systems: ['Email'], note: 'Client emails a screenshot of their own BPay/deposit as proof.' },
          { id: '3.5.5', name: 'Reference Number Normalisation', status: 'H1', systems: ['Excel'], note: 'Reference carries an extra digit that must be stripped.' },
          { id: '3.5.6', name: 'Outstanding Balance Tracking', status: 'H1', systems: ['Tramada'], note: 'Client views the outstanding amount on the quote document.' },
          { id: '3.5.7', name: 'Debtor & Creditor Ledger Maintenance', status: 'H1', systems: ['Tramada'], note: 'Three ledgers reconciled by hand against segments.' },
          {
            id: '3.5.8', name: 'Tramada Bank Statement Reconciliation', status: 'H1', systems: ['Tramada', 'Westpac'],
            note: 'Daily statement in Tramada, ticked line by line. Must balance to the cent or the statement shows out of balance.',
          },
          {
            id: '3.5.9', name: 'Supplier Statement Reconciliation', status: 'H1', systems: ['Tramada'],
            note: 'Per-creditor: DVC daily (~107 transactions), MINT daily, Tokio Marine monthly (900–1,100 policies over 45–55 pages), Club Connect, TravelPay.',
          },
          {
            id: '3.5.10', name: 'Reconciliation Backlog Management', status: 'H1', systems: ['Tramada'],
            note: 'Five months of FY25 statements from the previous card provider remain unreconciled.',
          },
          {
            id: '3.5.11', name: 'Cash Reconciliation via Finance One', status: 'H2', systems: ['Finance One', 'ECR', 'Tramada'],
            note: 'Roughly twelve steps: retail sales report, Tramada deposit, Finance One invoice, then a manual bank transfer.',
          },
          {
            id: '3.5.12', name: 'Main-to-Trust Account Transfer', status: 'H2', systems: ['Westpac'],
            note: 'Cash lands in RAA\'s main account and must be moved to the travel trust account before it can be reconciled.',
          },
          {
            id: '3.5.13', name: 'Reconciliation Session Management', status: 'H1', systems: ['Tramada'],
            note: 'Sessions can be saved and labelled, but do not reliably hold their transactions and are lost when Tramada updates.',
          },
          {
            id: '3.5.14', name: 'Many-to-One Transaction Matching', status: 'H1', systems: ['Tramada', 'Excel'],
            note: 'One statement line may cover several costings, or several lines make up one Tramada entry.',
          },
          {
            id: '3.5.15', name: 'Surcharge & Fee Variance Handling', status: 'H1', systems: ['Excel'],
            note: 'Card surcharges apply to some transactions in a batch and not others; each difference is reasoned out by hand.',
          },
          {
            id: '3.5.16', name: 'Ticket Reconciliation (Automated)', status: 'H2', systems: ['Tramada', 'ETG'],
            note: 'ETG send a weekly CSV that Tramada ingests and error-checks. The only automated reconciliation in the estate — a working reference model.',
          },
          {
            id: '3.5.17', name: 'Passenger Refund Reconciliation', status: 'H2', systems: ['Tramada'],
            note: 'Refunds arrive in bulk and are matched off against a refund report.',
          },
          {
            id: '3.5.18', name: 'Merchant Settlement Reconciliation', status: 'H1', systems: ['Westpac', 'Nuvei', 'IPSI'],
            note: 'Two acquirers — Westpac for in-store terminals, Nuvei for IPSI phone payments, which settle a day later.',
          },
        ],
      },
    ],
  },

  {
    id: '4.0',
    name: 'Risk, Compliance & Control',
    blurb:
      'The controls that make automation safe — identity, payment authority, credentials, traceability and product governance.',
    groups: [
      {
        id: '4.1',
        name: 'Identity & Verification',
        caps: [
          { id: '4.1.1', name: '3-Point ID Check', status: 'OOS', systems: [], note: 'Verbal check performed by the consultant.' },
          { id: '4.1.2', name: 'Client Detail Confirmation', status: 'H2', systems: ['Tramada'], note: 'Client confirms personal details before the profile is used.' },
        ],
      },
      {
        id: '4.2',
        name: 'Payment Control & Authority',
        caps: [
          { id: '4.2.1', name: 'BPay Payment Authority', status: 'H1', systems: ['Westpac'], note: 'A named holder can execute instant payment and provide confirmation.' },
          { id: '4.2.2', name: 'Human-in-the-Loop Approval', status: 'H1', systems: [], note: 'Explicit RAA requirement for any payment automation.' },
          { id: '4.2.3', name: 'Funds-Before-Supply Control', status: 'H1', systems: [], note: 'RAA cannot issue policy or pay a supplier until the money lands.' },
          { id: '4.2.4', name: 'DVC Validity & Risk Sizing', status: 'H1', systems: ['Amadeus'], note: 'Validity up to 2 years; shorter windows for higher risk.' },
          { id: '4.2.5', name: 'Card Data Handling (PCI / CNP)', status: 'H1', systems: ['IPSI'], note: 'Card-not-present capture over the phone keypad.' },
          {
            id: '4.2.6', name: 'Chargeback & Supplier Recourse', status: 'H2', systems: ['Westpac'],
            note: 'The reason virtual card beats EFT for irregular suppliers — funds can be clawed back if the service is not provided.',
          },
          {
            id: '4.2.7', name: 'Automation Payment Guardrails', status: 'H1', systems: [],
            note: 'RAA is explicit that automation must not be able to move money or browse member bookings unsupervised.',
          },
          {
            id: '4.2.8', name: 'High-Value Card Approval', status: 'H2', systems: ['Westpac'],
            note: 'Virtual cards over a $20,000 cumulative limit require a second approver before the card is valid.',
          },
        ],
      },
      {
        id: '4.3',
        name: 'Access & Credential Management',
        caps: [
          { id: '4.3.1', name: 'Shared Credential Vaulting', status: 'H1', systems: ['LastPass'], note: 'Common logons and dummy card details for shared portals.' },
          { id: '4.3.2', name: 'Per-Portal Login Management', status: 'H1', systems: ['Supplier portals'], note: 'No single sign-on across creditors and suppliers.' },
          { id: '4.3.3', name: 'Agent Initial & Store Code Stamping', status: 'H2', systems: ['Amadeus', 'MINT'], note: 'Attribution keyed into each payment request. Also how reconciliation exceptions get routed back to the right agent and store.' },
          {
            id: '4.3.4', name: 'Role-Based Access Control', status: 'H1', systems: ['Tramada'],
            note: 'Tramada has none. Any automation granted access inherits access to everything, including client PII.',
          },
          {
            id: '4.3.5', name: 'Two-Factor Authentication', status: 'OOS', systems: ['Westpac'],
            note: 'The virtual card portal prompts for 2FA on every login, because issuing a card issues funds.',
          },
        ],
      },
      {
        id: '4.4',
        name: 'Traceability & Audit',
        caps: [
          { id: '4.4.1', name: 'Payment Reference Integrity', status: 'H1', systems: ['Tramada'], note: 'Reference is not a required field — receipts save without it.' },
          { id: '4.4.2', name: 'Booking Note Audit Trail', status: 'H1', systems: ['Tramada'], note: 'Free-text, character-limited, unsearchable.' },
          { id: '4.4.3', name: 'Document Retention', status: 'H2', systems: ['Y: drive'], note: 'Signed acceptances and quote documents held on a network drive.' },
          { id: '4.4.4', name: 'Transaction Matching Evidence', status: 'H1', systems: ['Email', 'Excel'], note: 'Screenshots and spreadsheets stand in for a matching engine.' },
        ],
      },
      {
        id: '4.5',
        name: 'Policy & Product Governance',
        caps: [
          { id: '4.5.1', name: 'Schedule of Fees Governance', status: 'H2', systems: ['Compass'], note: 'RAA Travel Schedule of Fees.' },
          { id: '4.5.2', name: 'Staff Discount Rules', status: 'H2', systems: ['Compass'], note: 'Applied manually at costing time.' },
          { id: '4.5.3', name: 'Preferred Supplier Panel Governance', status: 'OOS', systems: [], note: 'Preferred sites first; non-preferred allowed by exception.' },
          { id: '4.5.4', name: 'Insurance Compliance Obligations', status: 'OOS', systems: ['Tokio Marine'], note: 'A named driver of the long, unskippable booking process.' },
        ],
      },
    ],
  },

  {
    id: '5.0',
    name: 'Enablers',
    blurb:
      'The platform, integration, workforce and data foundations the capabilities above run on.',
    groups: [
      {
        id: '5.1',
        name: 'Core Platforms',
        caps: [
          { id: '5.1.1', name: 'Tramada — Booking & Finance Core', status: 'H1', systems: ['Tramada'], note: 'System of record for bookings, receipts, payments and invoices.' },
          { id: '5.1.2', name: 'Amadeus — GDS & DVC', status: 'H1', systems: ['Amadeus'], note: 'Reservations plus the DVC Generator Smart Flow.' },
          { id: '5.1.3', name: 'Landscape — Member CRM', status: 'H1', systems: ['Landscape'], note: 'Source of member contact details and member number.' },
          { id: '5.1.4', name: 'IPSI — Card Payment Gateway', status: 'H1', systems: ['IPSI'], note: 'Card-not-present client payments.' },
          { id: '5.1.5', name: 'MINT — Supplier Payment Portal', status: 'H1', systems: ['MINT'], note: 'EFT payments out to suppliers.' },
          { id: '5.1.6', name: 'ECR — Retail Cash Register', status: 'OOS', systems: ['ECR'], note: 'Cash and cheque receipting via the Retail team.' },
          { id: '5.1.7', name: 'Tokio Marine — Insurance', status: 'OOS', systems: ['Tokio Marine'], note: 'Standalone free-form portal.' },
          { id: '5.1.8', name: 'Compass — Policy & Templates', status: 'H2', systems: ['Compass'], note: 'Fee schedules, discount rules, EAT templates.' },
          { id: '5.1.9', name: 'Genesys — Telephony', status: 'OOS', systems: ['Genesys'], note: 'Voice channel used during card capture.' },
          { id: '5.1.10', name: 'Tour Atlas — Product Discovery', status: 'H2', systems: ['Tour Atlas'], note: 'Tour search by destination, style and date.' },
          {
            id: '5.1.11', name: 'Finance One — Corporate Finance', status: 'H2', systems: ['Finance One'],
            note: 'RAA\'s back-of-house main finance system, separate from Tramada. Carries cash receipting, invoicing and payments.',
          },
          {
            id: '5.1.12', name: 'Westpac EFTPOS Terminals', status: 'H1', systems: ['Westpac'],
            note: 'In-store card capture. No connection to Tramada — amounts are keyed twice.',
          },
          {
            id: '5.1.13', name: 'Westpac Virtual Card Portal', status: 'H1', systems: ['Westpac'],
            note: 'Purchase requests, validity windows, cumulative limits and DBI data-collection fields. Has an API; production only, no sandbox.',
          },
          {
            id: '5.1.14', name: 'Nuvei — Merchant Acquiring', status: 'H2', systems: ['Nuvei'],
            note: 'Second acquirer alongside Westpac. IPSI phone payments settle through it, a day behind.',
          },
          {
            id: '5.1.15', name: 'ETG — Ticketing', status: 'H2', systems: ['ETG'],
            note: 'Express Travel Group. Weekly CSV feed into Tramada — the only supplier with automated reconciliation.',
          },
          {
            id: '5.1.16', name: 'Prosegur — Cash In Transit', status: 'OOS', systems: ['Prosegur'],
            note: 'Charged per bag collected, ~$150k a year. The reason cash routes through Retail rather than Travel.',
          },
        ],
      },
      {
        id: '5.5',
        name: 'Banking & Treasury',
        caps: [
          { id: '5.5.1', name: 'Travel Trust Account', status: 'H1', systems: ['Westpac'], note: 'Where travel money must sit before it can be reconciled in Tramada.' },
          { id: '5.5.2', name: 'RAA Main Account', status: 'H2', systems: ['Westpac'], note: 'Receives retail-collected cash before it is transferred to trust.' },
          { id: '5.5.3', name: 'Bank Reporting & CSV Extract', status: 'H1', systems: ['Westpac'], note: 'Daily manual download that begins every reconciliation.' },
          { id: '5.5.4', name: 'Banking API Access', status: 'H1', systems: ['Westpac'], note: 'Available for virtual cards; production only, test cards can be cancelled after issue.' },
        ],
      },
      {
        id: '5.2',
        name: 'Integration & Automation',
        caps: [
          { id: '5.2.1', name: 'GDS ↔ Tramada Integration', status: 'H2', systems: ['Amadeus', 'Tramada'], note: 'The ONLY live integration in the estate.' },
          { id: '5.2.2', name: 'Supplier & Wholesaler API Integration', status: 'H1', systems: [], note: 'Promised at contract signing, never delivered. Currently none.' },
          { id: '5.2.3', name: 'Bank Feed Ingestion', status: 'H1', systems: ['Westpac'], note: 'Manual daily download standing in for a feed.' },
          { id: '5.2.4', name: 'RPA / Smart Flow Execution', status: 'H1', systems: ['Amadeus'], note: 'DVC Smart Flow is the only automation in the payment path today.' },
          { id: '5.2.5', name: 'Travel Segment Auto-Creation', status: 'H1', systems: ['Tramada'], note: 'RAA is already building a POC for this.' },
          {
            id: '5.2.6', name: 'EFTPOS ↔ Tramada Integration', status: 'H1', systems: ['Westpac', 'Tramada'],
            note: 'Written into the Tramada contract six years ago as "will endeavour to" and never delivered. Would pre-populate the terminal from the Tramada receipt.',
          },
          {
            id: '5.2.7', name: 'Statement-First Transaction Entry', status: 'H1', systems: ['Tramada'],
            note: 'Proposed inversion: let automation create the Tramada transactions from the next-day DVC/MINT statement, then reconcile immediately — removing the agent keying step entirely.',
          },
          {
            id: '5.2.8', name: 'Exception Routing to Agent', status: 'H1', systems: ['Tramada'],
            note: 'Unmatched lines carry agent initials and store code, so exceptions can be emailed to whoever created them.',
          },
        ],
      },
      {
        id: '5.3',
        name: 'Workforce Capability',
        caps: [
          { id: '5.3.1', name: 'Consultant Onboarding Program', status: 'H2', systems: [], note: 'Extensive ramp-up from zero travel experience to fully-fledged agent.' },
          { id: '5.3.2', name: 'Systems Training', status: 'H2', systems: [], note: 'Tramada-heavy, plus Amadeus, Tokio Marine and the wholesaler estate.' },
          { id: '5.3.3', name: 'Agent Support & Escalation', status: 'H2', systems: [], note: 'Training team absorbs booking finance escalations.' },
          { id: '5.3.4', name: 'Knowledge Management', status: 'H2', systems: ['Compass'], note: 'Policies and rules held as intranet documents.' },
          {
            id: '5.3.5', name: 'Finance Capacity Management', status: 'H1', systems: [],
            note: 'Transactions have roughly tripled since COVID on unchanged travel accounts headcount. The programme goal is to scale the business 30–40% while scaling effort 5–10%.',
          },
          {
            id: '5.3.6', name: 'Speed to Competency', status: 'H2', systems: [],
            note: 'Tracked as a measure: losing an experienced consultant and replacing them with a trainee costs real sales while they learn the admin.',
          },
          {
            id: '5.3.7', name: 'Change Confidence & AI Trust', status: 'H2', systems: [],
            note: 'Staff have been promised improvements for years. An AI trust pulse score is a proposed programme measure.',
          },
        ],
      },
      {
        id: '5.4',
        name: 'Data & Analytics',
        caps: [
          { id: '5.4.1', name: 'Sales & Daily Ops Reporting', status: 'H2', systems: ['Tramada'], note: 'Run by the training/development function alongside training.' },
          { id: '5.4.2', name: 'Data Quality Management', status: 'H1', systems: ['Tramada'], note: 'Inconsistent data from human error is a named risk.' },
          { id: '5.4.3', name: 'Booking & Financial Data Capture', status: 'H1', systems: ['Tramada'], note: 'Priority data and quality concerns still to be identified.' },
        ],
      },
    ],
  },
]

export const allCaps = domains.flatMap((d) =>
  d.groups.flatMap((g) =>
    g.caps.map((c) => ({ ...c, domainId: d.id, domainName: d.name, groupId: g.id, groupName: g.name }))
  )
)

export const capCount = allCaps.length
export const groupCount = domains.reduce((n, d) => n + d.groups.length, 0)
