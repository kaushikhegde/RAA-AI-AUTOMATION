// RAA Travel — Current-state challenges, traced to source documents and capabilities.

export const themes = [
  { id: 'T1', name: 'Integration Void', colour: '#9F2241', desc: 'Amadeus is the only live integration; everything else is retyped.' },
  { id: 'T2', name: 'Manual Re-Keying & Data Quality', colour: '#7266A2', desc: 'The same booking data is entered repeatedly across systems.' },
  { id: 'T3', name: 'Settlement Latency', colour: '#00349F', desc: '3, 5 and 7 working-day waits gate fulfilment and supplier payment.' },
  { id: 'T4', name: 'Traceability Gaps', colour: '#15909C', desc: 'Reference numbers optional, malformed or missing entirely.' },
  { id: 'T5', name: 'Credential & Payment Control Risk', colour: '#BD4D3C', desc: 'Shared vaults, dummy cards and per-portal logins in the payment path.' },
  { id: 'T6', name: 'No Member Self-Service', colour: '#533F8C', desc: 'Screenshots and phone calls stand in for a member channel.' },
  { id: 'T7', name: 'Capability Burden', colour: '#A67E6E', desc: 'Extensive time to competence as a symptom of system complexity.' },
]

const SRC = {
  BP: 'booking proccess.pdf — AS-IS process pack v0.3',
  BLUE: 'proccess challenge.pdf — current-state service blueprint',
  TX: 'Tramada demo.docx — SME transcript',
  W1: 'meeting2.docx — Discovery Workshop, 23 Jul 2026',
  W2: 'meeting1.docx — Workshop 2, 30 Jul 2026',
}

export const challenges = [
  // ── Priya Anand · Travel Consultant ──────────────────────────────────
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
    id: 'C2', persona: 'consultant', theme: 'T2', severity: 'High',
    title: 'Post-consultation admin dominates the role',
    detail:
      'The booking conversation itself is efficient. What consumes consultant capacity afterwards is receipting the client\'s payment across two systems — selecting a dummy card, entering payment details by phone keypad, allocating to segments — then following up for a payment screenshot when it doesn\'t self-evidence. That tail routinely runs longer than the booking conversation itself, and is the largest single driver of time-to-competency for new starters.',
    evidence: '"The biggest cause of inefficiency that we heard was that after-consultation admin." — "Which is the Tramada side, yeah."',
    source: SRC.TX,
    caps: ['2.3.1', '2.3.8', '3.2.1'],
  },
  {
    id: 'C3', persona: 'consultant', theme: 'T7', severity: 'High',
    title: 'Mandatory fields are not tailored to use case',
    detail:
      'Tramada gets this wrong in both directions. Some fields are made mandatory for compliance reasons (e.g. insurance) that cannot be deferred, making large bookings disproportionately long. Other fields that should be mandatory to protect data quality and traceability — a reference number, a policy number — are not, so they get skipped under time pressure with no system prompt to catch it.',
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
      'Run the Amadeus DVC Generator Smart Flow, populate six fields, copy the card number and expiry into the supplier site, then raise an agency CC debtor receipt and write off the DVC.',
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
    id: 'C13', persona: 'consultant', theme: 'T4', severity: 'Medium',
    title: 'Booking notes have a character limit',
    detail: 'Critical booking context — payment references, acceptance detail, supplier conditions — gets truncated in the only free-text field available.',
    evidence: '"Note: There is a limitation on the number of characters that can be entered into the Notes."',
    source: SRC.BP,
    caps: ['2.1.5', '4.4.2'],
  },

  // ── Grace Sullivan · RAA Member ─────────────────────────────────────────
  {
    id: 'C14', persona: 'member', theme: 'T3', severity: 'Critical',
    title: 'Days of waiting before the booking is receipted',
    detail: 'BPay takes up to 3 working days to reach the RAA account, direct deposit up to 7, and cheques 5 — before anything is receipted.',
    evidence: 'AS-IS BPay flow: "It takes up to 3 working days." Direct Deposit: "This can take up to 7 working days." Cheque: "have to wait 5 working days."',
    source: SRC.BP,
    caps: ['3.1.5', '3.1.6', '3.1.4', '3.5.1'],
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
    title: 'No formal instalment plan, only ad-hoc separate transactions',
    detail: 'A member is not limited to one full payment — they can pay via several separate transactions across the day — but there is no formal, planned instalment option with scheduled amounts and dates. Any splitting happens informally and is tracked manually rather than by the system.',
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

  // ── Elena Vasquez · Accounts Team Officer ─────────────────────────────────
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

  // ── Rachel Kim · Training & Development ─────────────────────────────────
  {
    id: 'C26', persona: 'trainer', theme: 'T7', severity: 'High',
    title: 'Extensive time to competence across a very large system estate',
    detail: 'New starters with no travel background must learn the entire system estate before they can operate independently — including Amadeus, a powerful but DOS-era GDS with a steep, unforgiving learning curve even with point-and-click added.',
    evidence: '"We take brand new people that have never been in travel and show them all the systems... and then they\'re out being fully fledged travel agents." / "It\'s like a DOS based system and now has got some integration with graphics so you can do point and click… It\'s just a big system to learn."',
    source: SRC.TX,
    caps: ['5.3.1', '5.3.2', '5.1.2'],
  },
  {
    id: 'C29', persona: 'trainer', theme: 'T1', severity: 'Critical',
    title: 'Promised Tramada supplier integration was never delivered',
    detail: 'Integration with suppliers and airlines was expected at contract signing, de-prioritised post-COVID, and is not expected to arrive.',
    evidence: '"When we signed on with Tramada, I believe there was meant to be some integration with suppliers, airlines… COVID happened and their development team probably got redistributed. We\'ve still been asking for it, but I don\'t think it\'s coming anytime soon."',
    source: SRC.TX,
    caps: ['5.2.2', '5.2.1'],
  },
  // ── Daniel Osei · Product / Travel Support ───────────────────────────────
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
    title: 'Master and customer data are hand-typed, creating duplicates and inconsistency',
    detail: 'When a hotel is missing from the list, its name and address are typed manually — producing duplicate and dirty master data. The same manual re-entry happens with customer details, which are retyped rather than pulled from an existing record. Both create room for error and leave master data inconsistent across bookings.',
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
    title: 'No supplier APIs at all, master data is not saved and must be manually replicated',
    detail: 'Without integrations, every correction is manual and must be re-entered by hand each time it recurs, which increases room for error across bookings.',
    evidence: '"Currently no API integrations." RAA is separately creating a POC to automate travel segment creation.',
    source: SRC.BLUE,
    caps: ['5.2.2', '5.2.5'],
  },

  // ── Elena · Accounts — back-office reconciliation (from the workshops) ──
  {
    id: 'C36', persona: 'accounts', theme: 'T2', severity: 'Critical',
    title: 'Reconciliation is thousands of manual ticks across dozens of pages',
    detail:
      'Every transaction is clicked off by hand against a statement. Tokio Marine alone covers 900–1,100 policies across 45–55 pages — roughly two hours of clicking, spread over two three-hour sessions.',
    evidence: '"Someone has to sit there and go click, click, click, click, click 1000 times to check off the numbers in Tramada." / "It can send them a bit batty, staring at a screen with the spreadsheet on one side and the Tramada on the other."',
    source: `${SRC.W1} · ${SRC.W2}`,
    caps: ['3.5.8', '3.5.9', '3.5.13'],
  },
  {
    id: 'C37', persona: 'accounts', theme: 'T3', severity: 'Critical',
    title: 'Reconciliation is months behind, not days',
    detail:
      'The manual effort means the team never catches up. Five months of FY25 statements from the previous card provider remain unreconciled.',
    evidence: '"On our old credit card system that was done by a company called Air Plus, we\'ve still got five months worth of statements to reconcile back from financial year 25."',
    source: SRC.W2,
    caps: ['3.5.8', '3.5.10'],
  },
  {
    id: 'C38', persona: 'accounts', theme: 'T2', severity: 'High',
    title: 'Cash reconciliation spans three systems and a manual bank transfer',
    detail:
      'Cash is receipted by Retail through ECR into RAA\'s main account, entered separately in Tramada, invoiced in Finance One, then travel accounts physically move funds from the main account to the trust account before it can be reconciled.',
    evidence: '"There\'s about 12 different steps to this." Cash routes through Retail because a separate pickup would add roughly $150,000 a year in cash-collection fees.',
    source: SRC.W2,
    caps: ['3.5.11', '3.5.12', '5.1.11'],
  },
  {
    id: 'C39', persona: 'accounts', theme: 'T4', severity: 'High',
    title: 'Reconciliation sessions are unreliable and silently lost',
    detail:
      'A saved session does not hold its transactions — opening a new session either re-selects or deletes them. Sessions are also wiped by Tramada platform updates, which arrive two or three at a time.',
    evidence: '"You\'ll open a new session and it\'ll show those transactions already selected from the previous session, or it\'ll delete them altogether." / "When Tramada do an update, we sometimes lose the sessions altogether."',
    source: SRC.W2,
    caps: ['3.5.13'],
  },
  {
    id: 'C40', persona: 'accounts', theme: 'T4', severity: 'High',
    title: 'One bank line rarely maps to one Tramada costing',
    detail:
      'A single statement amount may cover several costings, or several lines may make up one Tramada entry. Credit-card surcharges apply to some transactions in a batch and not others, so every difference is reasoned out by hand.',
    evidence: '"They might have 5 transactions. Of those, three might have a 3% fee added, but the other two don\'t… we\'ve got to try and decipher a lot of this information and work out what it\'s made of."',
    source: SRC.W2,
    caps: ['3.5.14', '3.5.15'],
  },
  {
    id: 'C41', persona: 'accounts', theme: 'T4', severity: 'Medium',
    title: 'BPay receipts often land unallocated',
    detail:
      'Where the amount does not clearly match a segment, the payment is receipted against the booking but left unallocated for the consultant to place later — which they may not do.',
    evidence: '"If it\'s not matching, what they will do is just receipt it as an unallocated receipt. So it\'s in the booking, it\'s just not allocated to any segments."',
    source: SRC.W1,
    caps: ['3.2.5', '3.5.6'],
  },
  {
    id: 'C42', persona: 'accounts', theme: 'T2', severity: 'Medium',
    title: 'Suppliers trade under different names in every system',
    detail:
      'Creditor names differ between Tramada, MINT and the supplier statement — Web Source is Stuba; Circuit Travel covers Cosmos, Globus and Avalon — so matching relies on institutional memory.',
    evidence: '"Web source specific is actually Stuba… some of them are actually quite confusing."',
    source: SRC.W2,
    caps: ['2.4.1', '3.5.14'],
  },

  // ── Marcus · Travel Finance & Commercial ────────────────────────────────
  {
    id: 'C44', persona: 'finance', theme: 'T2', severity: 'Critical',
    title: 'EFTPOS terminals are not connected to Tramada',
    detail:
      'The in-store terminal amount and the Tramada receipt are keyed independently, so they disagree — or the transaction never reaches Tramada at all. Named as one of the two largest sources of receipting discrepancy.',
    evidence: '"The transaction\'s been put through the terminal in store… but the actual transaction hasn\'t been entered into Tramada." Integration was in the Tramada contract six years ago as "will endeavour to" and was never delivered.',
    source: SRC.W2,
    caps: ['5.1.12', '5.2.6', '3.1.2'],
  },
  {
    id: 'C45', persona: 'finance', theme: 'T2', severity: 'Critical',
    title: 'Human error at the keyboard costs real money, not just time',
    detail:
      'A single mis-typed digit turns into a large loss — an agent adds an extra 0 and a $7,000 payment becomes a $700,000 payment. Wrong suppliers get paid, digits get transposed and decimal points dropped. RAA formally tracks debits (pending supplier refunds) and write-offs (money lost outright).',
    evidence: '"We\'ve had very large payments made because they\'ve used the supplier number as the payment amount." / "A $7,000 payment becomes a $700,000 payment, which we\'ve seen." / "We\'ve had another payment this morning where they\'ve paid the wrong supplier."',
    source: `${SRC.W1} · ${SRC.W2}`,
    caps: ['3.3.9', '3.3.10'],
  },
  {
    id: 'C46', persona: 'finance', theme: 'T5', severity: 'High',
    title: 'Virtual card issuance carries live financial risk',
    detail:
      'Cards are issued one per supplier payment with a validity window that can run to two years for a hotel charging at check-in. Unused credit sits exposed to fraud and locks up available limit; cards over $20,000 need a second approver.',
    evidence: '"It\'s credit sitting on that card. From a risk point of view, it\'s better to have more cards but with less dollar value sitting on a card." / "If the cumulative amount is over $20,000, they need approval by someone else."',
    source: SRC.W1,
    caps: ['4.2.4', '3.3.2'],
  },
  {
    id: 'C47', persona: 'finance', theme: 'T3', severity: 'High',
    title: 'International EFT gives no proof the supplier was paid',
    detail:
      'Once funds leave the account there is no confirmation of receipt at the other end. A hotel recently claimed non-payment on the morning of check-in — RAA is defaulting these to virtual card so chargeback rights exist.',
    evidence: '"We can go to the bank and they can confirm it\'s left our account, but we have no way of confirming that it\'s actually reached the other end."',
    source: SRC.W2,
    caps: ['3.3.11', '4.2.6'],
  },
  {
    id: 'C48', persona: 'finance', theme: 'T5', severity: 'High',
    title: 'Tramada has no role-based access',
    detail:
      'Any automation given access to Tramada inherits access to everything in it, including client PII. RAA is explicit that agents must not be able to move money or browse member bookings.',
    evidence: '"Tramada doesn\'t have sort of role-based access… if an agent does have complete access to Tramada, is there a risk there from a cyber perspective?" / "Being able to spend money and being able to see members\' bookings, we have to avoid those two things."',
    source: SRC.W2,
    caps: ['4.3.4', '4.2.7'],
  },

  // ── Daniel · Product / Travel Support ─────────────────────────────────────
  {
    id: 'C49', persona: 'support', theme: 'T4', severity: 'High',
    title: 'Supplier and creditor are different things, and get conflated',
    detail:
      'Tramada holds both a supplier and a creditor against a segment — booking the Hilton through Room Res makes Hilton the supplier and Room Res the creditor. Payments go to the creditor, but everyday language calls the wholesaler the supplier, so the fields get filled inconsistently.',
    evidence: '"The supplier is the hotel, and the creditor is Room Res, is how it\'s set up in Tramada… from a general layman\'s travel perspective, we say supplier is generally referred to as the wholesaler."',
    source: SRC.W2,
    caps: ['2.4.6', '3.3.6'],
  },

  // ── Marcus Chen · Travel Finance & Commercial ───────────────────────────
  {
    id: 'C50', persona: 'finance', theme: 'T2', severity: 'High',
    title: 'Shortcuts and inconsistent manual entry cost finance hours to unwind',
    detail:
      'Under pressure to sell, consultants skip steps intending to return to them and rarely do — the saving is measured in seconds at the front and the cost in hours at the back. The same manual entry that enables the shortcut also produces inconsistent data across most booking details, which only becomes visible later, in reconciliation and reporting, where the finance team absorbs the time and effort to trace and fix it.',
    evidence: '"It might save them 20 seconds here and a minute here… what they\'re not understanding is the flow-on effect it has on the travel accounts team." / "Make it easy to do the right thing and hard to do the wrong thing." / "Manual data entry on most details." / "Inconsistent data due to human errors."',
    source: `${SRC.W1} · ${SRC.BLUE}`,
    caps: ['4.4.1', '5.4.2', '5.4.3'],
  },
]

export const severityOrder = ['Critical', 'High', 'Medium', 'Low']

export const severityColour = {
  Critical: '#9F2241',
  High: '#BD4D3C',
  Medium: '#FBBA00',
  Low: '#89C6CC',
}
