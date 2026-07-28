// RAA Travel — Current-state challenges, traced to source documents and capabilities.

export const themes = [
  { id: 'T1', name: 'Integration Void', colour: '#9F2241', desc: 'Amadeus is the only live integration; everything else is retyped.' },
  { id: 'T2', name: 'Manual Re-Keying & Data Quality', colour: '#7266A2', desc: 'The same booking data is entered repeatedly across systems.' },
  { id: 'T3', name: 'Settlement Latency', colour: '#00349F', desc: '3, 5 and 7 working-day waits gate fulfilment and supplier payment.' },
  { id: 'T4', name: 'Traceability Gaps', colour: '#15909C', desc: 'Reference numbers optional, malformed or missing entirely.' },
  { id: 'T5', name: 'Credential & Payment Control Risk', colour: '#BD4D3C', desc: 'Shared vaults, dummy cards and per-portal logins in the payment path.' },
  { id: 'T6', name: 'No Member Self-Service', colour: '#533F8C', desc: 'Screenshots and phone calls stand in for a member channel.' },
  { id: 'T7', name: 'Capability Burden', colour: '#A67E6E', desc: 'Six weeks to competence as a symptom of system complexity.' },
]

const SRC = {
  BP: 'booking proccess.pdf — AS-IS process pack v0.3',
  BLUE: 'proccess challenge.pdf — current-state service blueprint',
  TX: 'Tramada demo.docx — SME transcript',
}

export const challenges = [
  // ── Sarah Mitchell · Travel Consultant ──────────────────────────────────
  {
    id: 'C1', persona: 'consultant', theme: 'T1', severity: 'Critical',
    title: 'No supplier integration — every non-GDS segment is keyed by hand',
    detail:
      'Amadeus is the only system that talks to Tramada. Every wholesaler, low-cost carrier and hotel segment is built manually, segment by segment.',
    evidence: '"All of our other wholesalers, low-cost carriers like Jetstar is a big one, none of that speaks to Tramada, so we all manually have to do all the segments and information for booking to be booked."',
    source: SRC.TX,
    caps: ['2.2.5', '2.3.1', '5.2.2'],
  },
  {
    id: 'C2', persona: 'consultant', theme: 'T2', severity: 'Critical',
    title: 'Post-consultation admin dominates the role',
    detail:
      'The booking conversation itself is efficient. The administrative tail behind it is where consultant capacity is consumed.',
    evidence: '"The biggest cause of inefficiency that we heard was that after-consultation admin." — "Which is the Tramada side, yeah."',
    source: SRC.TX,
    caps: ['2.3.1', '2.3.8', '3.2.1'],
  },
  {
    id: 'C3', persona: 'consultant', theme: 'T7', severity: 'High',
    title: 'Tramada is mandatory-field heavy and cannot be skipped through',
    detail:
      'Compliance obligations mean required data cannot be deferred, making large bookings disproportionately long.',
    evidence: '"Tramada itself needs a lot of information, so you can\'t always skip over things… because we\'re so compliant with things like insurance, it becomes this very long process, especially if you\'re doing a very big booking."',
    source: SRC.TX,
    caps: ['2.1.1', '4.5.4'],
  },
  {
    id: 'C4', persona: 'consultant', theme: 'T1', severity: 'High',
    title: 'System-hopping on every single booking',
    detail:
      'A single booking touches Tramada, Amadeus, MINT, IPSI, LastPass, Tour Atlas, supplier portals, Compass, the Y: drive and a personal mailbox.',
    evidence: 'Ten distinct swimlanes and systems appear across the AS-IS pack for one hotel booking.',
    source: SRC.BP,
    caps: ['5.1.1', '5.1.2', '5.1.5', '5.1.4', '4.3.2'],
  },
  {
    id: 'C5', persona: 'consultant', theme: 'T5', severity: 'High',
    title: 'The dummy credit card ritual',
    detail:
      'To receipt a client card payment the consultant must select an RAA dummy card matching the client\'s card type, sourced from LastPass, and hand-enter the customer name.',
    evidence: '"Need to manually select \'dummy\' credit card to match customer\'s card type and manually enter customer name." Dummy card details are hosted in LastPass.',
    source: SRC.BLUE,
    caps: ['3.2.3', '4.3.1'],
  },
  {
    id: 'C6', persona: 'consultant', theme: 'T5', severity: 'Medium',
    title: 'Credential sprawl across supplier portals',
    detail: 'Every creditor and supplier portal carries its own login, with no single sign-on.',
    evidence: '"Each creditor/supplier portal has its own logins."',
    source: SRC.BLUE,
    caps: ['4.3.2', '2.4.5'],
  },
  {
    id: 'C7', persona: 'consultant', theme: 'T2', severity: 'High',
    title: 'Manual virtual credit card handling end to end',
    detail:
      'Run the Amadeus VCC Generator Smart Flow, populate six fields, copy the card number and expiry into the supplier site, then raise an agency CC debtor receipt and write off the VCC.',
    evidence: 'Fields: currency/amount, transaction validity period, agent initial & store code, Tramada booking #, supplier name, lead passenger name.',
    source: SRC.BP,
    caps: ['3.3.2', '3.3.3', '3.2.7', '3.3.8'],
  },
  {
    id: 'C8', persona: 'consultant', theme: 'T2', severity: 'Critical',
    title: 'MINT double-entry causes supplier payment errors',
    detail:
      'The creditor payable amount in Tramada is re-typed into MINT along with booking number, agent reference, passenger name, amount, date and payee.',
    evidence: '"Ability to scrape Tramada creditor payable amount into MINT portal — reduce supplier payment errors."',
    source: SRC.BLUE,
    caps: ['3.3.4', '3.3.6'],
  },
  {
    id: 'C9', persona: 'consultant', theme: 'T2', severity: 'Medium',
    title: 'Documents live outside the booking record',
    detail:
      'Quote documents are stored on the Y: drive, vouchers arrive in a shared or personal mailbox, and signed acceptances are scanned and summarised into booking notes.',
    evidence: 'AS-IS "Issue Client Itinerary" shows Y: drive storage, personal mailbox composition and manual booking-note updates.',
    source: SRC.BP,
    caps: ['2.5.5', '2.5.4', '1.4.3', '1.4.4'],
  },
  {
    id: 'C10', persona: 'consultant', theme: 'T2', severity: 'Low',
    title: 'Cash means a physical walk to the Retail team',
    detail: 'The consultant carries cash or cheque to Retail, who receipt it through the ECR and hand back a printed receipt.',
    evidence: '"Consultant takes the cash to the Retail team. Cash/cheque is receipted through ECR."',
    source: SRC.BP,
    caps: ['3.1.4', '3.2.4'],
  },
  {
    id: 'C11', persona: 'consultant', theme: 'T3', severity: 'Critical',
    title: 'Fulfilment is blocked until funds clear',
    detail: 'RAA cannot issue a policy or pay the supplier until the client\'s money has landed — so settlement latency directly delays the trip being secured.',
    evidence: '"RAA cannot issue policy or pay supplier until get $$ from BPAY."',
    source: SRC.BLUE,
    caps: ['4.2.3', '3.1.5', '3.3.1'],
  },
  {
    id: 'C12', persona: 'consultant', theme: 'T6', severity: 'High',
    title: 'Chasing the client for acceptance, payment and evidence',
    detail:
      'Quote review runs days to weeks, then the consultant follows up for payment and again for a payment screenshot.',
    evidence: 'AS-IS itinerary flow annotates "Review Time: Days/Weeks" on the client review loop.',
    source: SRC.BP,
    caps: ['1.3.4', '3.5.4'],
  },
  {
    id: 'C13', persona: 'consultant', theme: 'T4', severity: 'Medium',
    title: 'Booking notes have a character limit',
    detail: 'Critical booking context — payment references, acceptance detail, supplier conditions — gets truncated in the only free-text field available.',
    evidence: '"Note: There is a limitation on the number of characters that can be entered into the Notes."',
    source: SRC.BP,
    caps: ['2.1.5', '4.4.2'],
  },

  // ── Helen Whitmore · RAA Member ─────────────────────────────────────────
  {
    id: 'C14', persona: 'member', theme: 'T3', severity: 'Critical',
    title: 'Days of waiting before the booking is receipted',
    detail: 'BPay takes up to 3 working days to reach the RAA account, direct deposit up to 7, and cheques 5 — before anything is receipted.',
    evidence: 'AS-IS BPay flow: "It takes up to 3 working days." Direct Deposit: "This can take up to 7 working days." Cheque: "have to wait 5 working days."',
    source: SRC.BP,
    caps: ['3.1.5', '3.1.6', '3.1.4', '3.5.1'],
  },
  {
    id: 'C15', persona: 'member', theme: 'T6', severity: 'High',
    title: 'The member does RAA\'s reconciliation work',
    detail: 'Clients email a screenshot of their own BPay or direct deposit payment so Accounts can match it.',
    evidence: '"Emails screenshot of BPay or direct deposit payment confirmation." / "Email Copy of BPay Payment (Screen Shot)."',
    source: SRC.BLUE,
    caps: ['3.5.4', '4.4.4'],
  },
  {
    id: 'C16', persona: 'member', theme: 'T5', severity: 'High',
    title: 'Card details read into a phone keypad',
    detail: 'Off-site clients enter card number, expiry and CVV on their phone keypad while on a Genesys call with the consultant.',
    evidence: 'AS-IS "Client Payment: Credit/Debit Card" — "Request to Enter Card Details on Phone Keypad."',
    source: SRC.BP,
    caps: ['3.1.3', '4.2.5'],
  },
  {
    id: 'C17', persona: 'member', theme: 'T6', severity: 'High',
    title: 'No self-service and no status visibility',
    detail: 'Every status check — has my payment landed, is my hotel confirmed — requires a phone call or email to the consultant.',
    evidence: 'No client-facing system appears in any AS-IS lane; the client lane only ever interacts with the consultant.',
    source: SRC.BP,
    caps: ['3.5.6', '1.3.4'],
  },
  {
    id: 'C18', persona: 'member', theme: 'T3', severity: 'Medium',
    title: 'No instalment payment option',
    detail: 'The current flow supports full payment only. Instalments are an acknowledged gap.',
    evidence: '"This flow currently only caters for full payment, not part payment yet." Final page: "To Do: Instalment Payment."',
    source: SRC.BP,
    caps: ['3.1.9', '3.1.8'],
  },
  {
    id: 'C19', persona: 'member', theme: 'T6', severity: 'Medium',
    title: 'Everything arrives as an email attachment',
    detail: 'Quote, EAT and itinerary come as attachments from a consultant\'s personal mailbox — and on-site clients print, sign and have documents scanned.',
    evidence: 'AS-IS: "Compose Email (Personal Mailbox)" → "Include Quote/Booking Document & EAT Template" → "Scan Quote/Booking Document."',
    source: SRC.BP,
    caps: ['1.4.1', '1.4.2', '2.5.3'],
  },

  // ── Nadia Rossi · Accounts Team Officer ─────────────────────────────────
  {
    id: 'C20', persona: 'accounts', theme: 'T2', severity: 'High',
    title: '30–60 minutes of manual bank downloads every morning',
    detail: 'The BPay report is downloaded from Westpac daily and pasted into a spreadsheet to be matched by hand.',
    evidence: '"30 to 60 minutes a day, download from Westpac — put into our spreadsheet." / "Download BPAY report every morning."',
    source: SRC.BLUE,
    caps: ['3.5.3', '5.2.3'],
  },
  {
    id: 'C21', persona: 'accounts', theme: 'T4', severity: 'High',
    title: 'Reference numbers carry an extra digit',
    detail: 'The bank reference has one digit too many and must be trimmed before it will match a Tramada booking number.',
    evidence: '"Reference number, has an extra digit we need to get rid of to get the booking number we need."',
    source: SRC.BLUE,
    caps: ['3.5.5', '4.4.1'],
  },
  {
    id: 'C22', persona: 'accounts', theme: 'T4', severity: 'Critical',
    title: 'Reference numbers frequently missing altogether',
    detail: 'Reference is not a required field, so receipts can be saved without one — destroying traceability between money and booking.',
    evidence: '"Missing reference numbers frequently — not a required field — causes traceability issues." / "Possible to save receipt without reference number."',
    source: SRC.BLUE,
    caps: ['4.4.1', '3.3.7', '3.2.1'],
  },
  {
    id: 'C23', persona: 'accounts', theme: 'T2', severity: 'Medium',
    title: 'Receipt notifications broadcast to every consultant',
    detail: 'When a BPay or deposit is receipted, an email goes to all consultants rather than routing to the owning booking.',
    evidence: '"Notify Travel Consultant (sends email to all consultants) of BPay or deposit amount receipted."',
    source: SRC.BLUE,
    caps: ['1.3.5'],
  },
  {
    id: 'C24', persona: 'accounts', theme: 'T3', severity: 'Critical',
    title: 'A 3–7 business day reconciliation lag blocks downstream fulfilment',
    detail: 'Nothing moves — no supplier payment, no policy issue, no confirmation — until reconciliation completes.',
    evidence: '"Reconciliation/processing of payment (3–7 business days)."',
    source: SRC.BLUE,
    caps: ['3.5.1', '3.5.2', '4.2.3'],
  },
  {
    id: 'C25', persona: 'accounts', theme: 'T2', severity: 'High',
    title: 'Three ledgers reconciled by hand against segments',
    detail: 'Debtor receipts, creditor payments and agency CC debtor receipts each require manual costing allocation to segments.',
    evidence: 'Three separate AS-IS processes each end with "Allocate Costing(s) to Segment".',
    source: SRC.BP,
    caps: ['3.5.7', '2.3.8', '3.2.5'],
  },

  // ── Megan Gray · Training & Development ─────────────────────────────────
  {
    id: 'C26', persona: 'trainer', theme: 'T7', severity: 'High',
    title: 'Six weeks from zero experience to fully-fledged agent',
    detail: 'New starters with no travel background must learn the entire system estate before they can operate independently.',
    evidence: '"We take brand new people that have never been in travel and show them all the systems, give them six weeks and then they\'re out being fully fledged travel agents."',
    source: SRC.TX,
    caps: ['5.3.1', '5.3.2'],
  },
  {
    id: 'C27', persona: 'trainer', theme: 'T7', severity: 'High',
    title: 'Amadeus is a DOS-era GDS with a graphical veneer',
    detail: 'The reservations system is powerful but has a steep, unforgiving learning curve even with point-and-click added.',
    evidence: '"It\'s like a DOS based system and now has got some integration with graphics so you can do point and click… It\'s just a big system to learn."',
    source: SRC.TX,
    caps: ['5.1.2', '5.3.2'],
  },
  {
    id: 'C28', persona: 'trainer', theme: 'T7', severity: 'Medium',
    title: 'The training function is the fallback integration layer',
    detail: 'Beyond training, Megan absorbs agents\' booking finance escalations and daily sales analytics.',
    evidence: '"If they\'ve got issues with their finance of their booking or bookings in general, I do a fair bit of that as well, and a bit of data and analytics."',
    source: SRC.TX,
    caps: ['5.3.3', '5.4.1'],
  },
  {
    id: 'C29', persona: 'trainer', theme: 'T1', severity: 'Critical',
    title: 'Promised Tramada supplier integration was never delivered',
    detail: 'Integration with suppliers and airlines was expected at contract signing, de-prioritised post-COVID, and is not expected to arrive.',
    evidence: '"When we signed on with Tramada, I believe there was meant to be some integration with suppliers, airlines… COVID happened and their development team probably got redistributed. We\'ve still been asking for it, but I don\'t think it\'s coming anytime soon."',
    source: SRC.TX,
    caps: ['5.2.2', '5.2.1'],
  },
  {
    id: 'C30', persona: 'trainer', theme: 'T2', severity: 'High',
    title: 'Human error drives inconsistent data that surfaces later as finance problems',
    detail: 'Manual entry on most details produces inconsistency that only becomes visible in reconciliation and reporting.',
    evidence: '"Manual data entry on most details." / "Inconsistent data due to human errors."',
    source: SRC.BLUE,
    caps: ['5.4.2', '5.4.3'],
  },

  // ── Tom Nguyen · Product / Travel Support ───────────────────────────────
  {
    id: 'C31', persona: 'support', theme: 'T2', severity: 'Medium',
    title: 'New supplier onboarding is a SharePoint form and an email',
    detail: 'The consultant completes a form, an email is sent, and there is no SLA or status returned while the booking waits.',
    evidence: 'AS-IS "Search/Add Hotel(s)": "Complete a Form through SharePoint" → "Submit Request (Email Sent)" → "Notify Creation of New Hotel Supplier."',
    source: SRC.BP,
    caps: ['2.4.2', '2.4.3'],
  },
  {
    id: 'C32', persona: 'support', theme: 'T2', severity: 'High',
    title: 'Hotel names and addresses hand-typed, creating duplicates',
    detail: 'When a hotel is missing from the list, its name and address are typed manually — producing duplicate and dirty master data.',
    evidence: '"Hotel Name & Address are manually populated if it does not exist in the existing Hotel List."',
    source: SRC.BP,
    caps: ['2.4.1', '5.4.2'],
  },
  {
    id: 'C33', persona: 'support', theme: 'T2', severity: 'High',
    title: 'Net vs gross commission logic applied by hand',
    detail: 'Some suppliers charge gross with commission built in; others charge net and the consultant manually builds in the commission.',
    evidence: '"Some hotel suppliers charge a gross amount… and some charge a net amount (consultant manually builds in the commission amount e.g. 10% on net costing)."',
    source: SRC.BP,
    caps: ['2.3.3', '2.3.2'],
  },
  {
    id: 'C34', persona: 'support', theme: 'T4', severity: 'Critical',
    title: 'Payment Type is a silent failure point into financials',
    detail: 'Payment Type is set manually at segment level and flows straight through to financials — a wrong value is not caught until reconciliation.',
    evidence: '"It is important to ensure the Payment Type is populated correctly as it flows to financials."',
    source: SRC.BP,
    caps: ['2.3.7', '3.3.1'],
  },
  {
    id: 'C35', persona: 'support', theme: 'T1', severity: 'Critical',
    title: 'No supplier APIs at all, so master data can never self-heal',
    detail: 'Without integrations, every correction is manual and the same errors recur across bookings.',
    evidence: '"Currently no API integrations." RAA is separately creating a POC to automate travel segment creation.',
    source: SRC.BLUE,
    caps: ['5.2.2', '5.2.5'],
  },
]

export const severityOrder = ['Critical', 'High', 'Medium', 'Low']

export const severityColour = {
  Critical: '#9F2241',
  High: '#BD4D3C',
  Medium: '#FBBA00',
  Low: '#89C6CC',
}
