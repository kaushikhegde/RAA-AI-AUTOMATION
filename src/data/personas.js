import sarahJourneyImage from '../assets/sarah-journey.jpeg'

// RAA Travel — Personas and Today/Tomorrow journeys
// Personas are representative composites drawn from the lanes in the AS-IS process pack,
// the service blueprint, and the SME transcript. Megan's role detail comes from the
// recorded Tramada demo session.

export const personas = [
  {
    id: 'consultant',
    name: 'Sarah Mitchell',
    role: 'Travel Consultant',
    emoji: '🧳',
    accent: '#130064',
    context:
      'Retail-store and phone-based consultant taking a family holiday from first enquiry through to invoice — the primary lane in every AS-IS diagram.',
    goalStatement:
      'Spend the day advising members on travel, not re-keying the same booking into seven systems.',
    today: [
      'Every non-Amadeus segment keyed by hand',
      'Hops Tramada, Amadeus, MINT, IPSI, LastPass and supplier portals per booking',
      'Chases the client for payment, then chases the screenshot',
      'Documents scattered across Y: drive and a personal mailbox',
    ],
    tomorrow: [
      'Supplier content flows into segments automatically',
      'One workspace with the payment path built in',
      'Member self-serves payment; receipting fires on settlement',
      'Documents and acceptance attached to the booking record',
    ],
    keyBenefit: 'More time selling travel, far less time re-keying it',
    challengeIds: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11', 'C12', 'C13', 'C50'],
    // Presentation-ready rendering of this journey, shown beneath the interactive diagram.
    journeyImage: sarahJourneyImage,
    journeyImageCaption: 'Sarah\'s Journey — Travel Consultant Today vs Tomorrow',
    journey: [
      { stage: 'Enquiry', today: 'Phone or counter consult', tomorrow: 'Unified enquiry capture', emotion: '🙂', mood: 'Engaged' },
      { stage: 'Client Setup', today: 'Search Tramada, then Landscape, copy details', tomorrow: 'Landscape auto-match and prefill', emotion: '😐', mood: 'Patient' },
      { stage: 'Sourcing', today: 'Six portals, no integration', tomorrow: 'Aggregated supplier search', emotion: '😕', mood: 'Scattered' },
      { stage: 'Segments & Costing', today: 'Manual segments, manual commission', tomorrow: 'Auto-created segments, rules-based costing', emotion: '😩', mood: 'Drained' },
      { stage: 'Quote & Acceptance', today: 'Email from personal mailbox, wait days', tomorrow: 'Digital quote with e-acceptance', emotion: '😟', mood: 'Anxious' },
      { stage: 'Client Payment', today: 'Card over the keypad or chase a BPay', tomorrow: 'Member-initiated secure payment link', emotion: '😣', mood: 'Frustrated' },
      { stage: 'Receipting', today: 'Dummy card from LastPass, allocate by hand', tomorrow: 'Receipt auto-raised and allocated', emotion: '😖', mood: 'Exasperated' },
      { stage: 'Supplier Payment', today: 'VCC Smart Flow, then re-key into MINT', tomorrow: 'Payable pushed to MINT, one approval', emotion: '😤', mood: 'Wary' },
      { stage: 'Invoice & Close', today: 'One invoice per segment, manual validation', tomorrow: 'Invoices generated on settlement', emotion: '😮‍💨', mood: 'Relieved' },
    ],
  },

  {
    id: 'member',
    name: 'Helen Whitmore',
    role: 'RAA Member / Client',
    emoji: '🧭',
    accent: '#00349F',
    context:
      'Long-standing RAA member booking a multi-segment overseas trip. Reviews the quote over a week, then pays by BPay — sometimes a deposit first, then the balance.',
    goalStatement:
      'Book with confidence and know my money has landed and my trip is actually secured.',
    today: [
      'Waits 3–7 working days for payment to be recognised',
      'Emails a screenshot of her own payment as proof',
      'Reads card digits into a phone keypad',
      'No way to check status without ringing the consultant',
    ],
    tomorrow: [
      'Settlement recognised same day, booking confirmed',
      'Payment evidence captured automatically',
      'Secure self-service payment on her own device',
      'Live booking and balance status she can see herself',
    ],
    keyBenefit: 'Certainty her trip is confirmed, without doing RAA\'s paperwork',
    challengeIds: ['C14', 'C15', 'C16', 'C17', 'C18', 'C19'],
    journey: [
      { stage: 'Enquiry', today: 'Calls or visits a branch', tomorrow: 'Same warm consult, better prepared', emotion: '😊', mood: 'Hopeful' },
      { stage: 'Client Setup', today: 'Repeats details already held by RAA', tomorrow: 'Recognised as a member instantly', emotion: '😐', mood: 'Resigned' },
      { stage: 'Sourcing', today: 'Waits while options are assembled', tomorrow: 'Options presented in one view', emotion: '🙂', mood: 'Interested' },
      { stage: 'Segments & Costing', today: 'Invisible to her', tomorrow: 'Transparent, itemised costing', emotion: '😐', mood: 'Neutral' },
      { stage: 'Quote & Acceptance', today: 'PDF attachment, print, sign, scan', tomorrow: 'Digital acceptance in two taps', emotion: '😕', mood: 'Inconvenienced' },
      { stage: 'Client Payment', today: 'Keys card over the phone, or BPays blind', tomorrow: 'Secure link, method of her choosing', emotion: '😰', mood: 'Uneasy' },
      { stage: 'Receipting', today: 'Emails a screenshot and waits', tomorrow: 'Instant receipt to her inbox', emotion: '😟', mood: 'Uncertain' },
      { stage: 'Supplier Payment', today: 'Invisible — but it gates her booking', tomorrow: 'Booking confirmed as soon as funds clear', emotion: '😶', mood: 'In the dark' },
      { stage: 'Invoice & Close', today: 'Multiple invoices, unclear totals', tomorrow: 'One clear statement of her trip', emotion: '🙂', mood: 'Satisfied' },
    ],
  },

  {
    id: 'accounts',
    name: 'Nadia Rossi',
    role: 'Accounts Team Officer',
    emoji: '📊',
    accent: '#15909C',
    context:
      'The compensating control for the whole front office. Reconciles every inbound and outbound stream against the bank — BPay, DVC, MINT, TravelPay, ETG, Tokio Marine, cash, card settlements and refunds — and creates receipts on consultants\' behalf when they were never entered.',
    goalStatement:
      'Match every dollar to a booking the same day, without hunting for missing references.',
    today: [
      'Ticks off thousands of transactions by hand — Tokio Marine alone runs 45–55 pages',
      'Downloads a Westpac CSV each morning and matches it in a spreadsheet',
      'Reconciles across two acquirers, Finance One and a separate trust account',
      'Enters the receipts consultants forgot, then chases the ones she can\'t place',
    ],
    tomorrow: [
      'Statement-first automation enters the transactions, then reconciles them',
      'Reference format validated and normalised at source',
      'She reviews an exception list instead of clicking every line',
      'Backlog cleared and bank statements closed within the month',
    ],
    keyBenefit: 'Same-day matching with a clean audit trail on every dollar',
    challengeIds: [
      'C20', 'C21', 'C22', 'C23', 'C24', 'C25',
      'C36', 'C37', 'C38', 'C39', 'C40', 'C41', 'C42',
    ],
    journey: [
      { stage: 'Enquiry', today: 'Not involved', tomorrow: 'Not involved', emotion: '😐', mood: 'N/A' },
      { stage: 'Client Setup', today: 'Not involved', tomorrow: 'Not involved', emotion: '😐', mood: 'N/A' },
      { stage: 'Sourcing', today: 'Not involved', tomorrow: 'Not involved', emotion: '😐', mood: 'N/A' },
      { stage: 'Segments & Costing', today: 'Inherits whatever was keyed', tomorrow: 'Validated data upstream', emotion: '😕', mood: 'Cautious' },
      { stage: 'Quote & Acceptance', today: 'No visibility of pending payments', tomorrow: 'Expected-receipts view', emotion: '😶', mood: 'Blind' },
      { stage: 'Client Payment', today: 'Waits for funds to appear in the bank', tomorrow: 'Real-time settlement signal', emotion: '😐', mood: 'Waiting' },
      { stage: 'Receipting', today: 'Manual receipt creation per payment', tomorrow: 'Auto-receipt on matched settlement', emotion: '😣', mood: 'Bogged down' },
      { stage: 'Reconciliation', today: 'Westpac download into a spreadsheet, digit-stripping', tomorrow: 'Bank feed auto-match with exception queue', emotion: '😫', mood: 'Exhausted' },
      { stage: 'Invoice & Close', today: 'Three ledgers reconciled by hand', tomorrow: 'Ledgers reconciled continuously', emotion: '😩', mood: 'Worn out' },
    ],
  },

  {
    id: 'finance',
    name: 'Heath Littlefield',
    role: 'Travel Finance & Commercial',
    emoji: '🏦',
    accent: '#9F2241',
    context:
      'Owns the Westpac banking relationship, the virtual-card risk model and the supplier commercial agreements. Tracks the debits and write-offs that front-office keying errors create, and is accountable for finance scaling more slowly than the business.',
    goalStatement:
      'Grow the business 30–40% while growing finance effort 5–10% — and stop paying for avoidable errors.',
    today: [
      'Transaction volume tripled since COVID on unchanged travel accounts headcount',
      'Five months of FY25 card statements still unreconciled',
      '10–20% of daily DVC transactions need manual fixing',
      'Absorbs write-offs and debits from wrong suppliers and mis-keyed amounts',
    ],
    tomorrow: [
      'Statement-first automation: enter from the statement, then reconcile',
      'Mandatory references make the common errors impossible',
      'Exceptions routed to the agent and store that caused them',
      'Backlog cleared and reconciliation kept current',
    ],
    keyBenefit: 'Scale the business without scaling the error rate or the headcount',
    challengeIds: ['C43', 'C44', 'C45', 'C46', 'C47', 'C48'],
    journey: [
      { stage: 'Enquiry', today: 'Not involved', tomorrow: 'Not involved', emotion: '😐', mood: 'N/A' },
      { stage: 'Client Setup', today: 'Not involved', tomorrow: 'Not involved', emotion: '😐', mood: 'N/A' },
      { stage: 'Sourcing', today: 'Sets the supplier panel and payment terms', tomorrow: 'Terms drive the payment rail automatically', emotion: '🙂', mood: 'In control' },
      { stage: 'Segments & Costing', today: 'Costing errors surface weeks later', tomorrow: 'Validated at entry', emotion: '😕', mood: 'Wary' },
      { stage: 'Quote & Acceptance', today: 'No financial visibility', tomorrow: 'Exposure visible early', emotion: '😶', mood: 'Blind' },
      { stage: 'Client Payment', today: 'Funds must clear before anything moves', tomorrow: 'Faster settlement recognition', emotion: '😐', mood: 'Waiting' },
      { stage: 'Receipting', today: 'Terminal and Tramada amounts disagree', tomorrow: 'Terminal pre-populated from Tramada', emotion: '😠', mood: 'Exposed' },
      { stage: 'Supplier Payment', today: 'Card risk, validity windows, wrong suppliers paid', tomorrow: 'API-issued cards with controls built in', emotion: '😤', mood: 'Guarded' },
      { stage: 'Reconciliation', today: 'Months behind, errors compounding', tomorrow: 'Closed within the month', emotion: '😫', mood: 'Under pressure' },
    ],
  },

  {
    id: 'trainer',
    name: 'Megan Gray',
    role: 'Training & Development Consultant',
    emoji: '🎓',
    accent: '#533F8C',
    context:
      'Takes people with zero travel experience and makes them fully-fledged agents in six weeks. Also the escalation point for booking finance issues and daily sales and ops data.',
    goalStatement:
      'Shorten time-to-competence and stop being the human integration layer between systems.',
    today: [
      'Six weeks to competence across a very large system estate',
      'Amadeus is a DOS-era GDS with a graphical veneer',
      'Pulled into agents\' booking finance issues daily',
      'Promised Tramada supplier integration never landed',
    ],
    tomorrow: [
      'Fewer systems, guided workflows, faster ramp-up',
      'Complexity absorbed by the platform, not the trainee',
      'Escalations fall as error-prone manual steps disappear',
      'Integration delivered where the vendor did not',
    ],
    keyBenefit: 'Agents productive sooner, escalations that stop repeating',
    challengeIds: ['C26', 'C27', 'C28', 'C29', 'C30'],
    journey: [
      { stage: 'Enquiry', today: 'Teaches consultation technique', tomorrow: 'Same — the human skill still matters', emotion: '🙂', mood: 'Confident' },
      { stage: 'Client Setup', today: 'Teaches two CRMs and a copy-paste habit', tomorrow: 'Teaches one flow', emotion: '😐', mood: 'Patient' },
      { stage: 'Sourcing', today: 'Teaches Amadeus, Tour Atlas and six portals', tomorrow: 'Teaches one aggregated search', emotion: '😖', mood: 'Stretched' },
      { stage: 'Segments & Costing', today: 'Where most trainee time is lost', tomorrow: 'Auto-created segments to review, not build', emotion: '😩', mood: 'Frustrated' },
      { stage: 'Quote & Acceptance', today: 'Teaches templates, drives and mailboxes', tomorrow: 'Teaches one issue-and-accept action', emotion: '😕', mood: 'Weary' },
      { stage: 'Client Payment', today: 'Teaches four payment methods and their quirks', tomorrow: 'One guided payment journey', emotion: '😣', mood: 'Bogged down' },
      { stage: 'Receipting', today: 'Teaches the dummy card ritual', tomorrow: 'Ritual removed entirely', emotion: '😤', mood: 'Exasperated' },
      { stage: 'Supplier Payment', today: 'Fields escalations on VCC and MINT errors', tomorrow: 'Fewer errors to escalate', emotion: '😫', mood: 'Overloaded' },
      { stage: 'Invoice & Close', today: 'Fixes finance problems after the fact', tomorrow: 'Problems prevented at source', emotion: '😮‍💨', mood: 'Relieved' },
    ],
  },

  {
    id: 'support',
    name: 'Tom Nguyen',
    role: 'Product / Travel Support Officer',
    emoji: '🗂️',
    accent: '#9F2241',
    context:
      'Receives SharePoint requests to create new hotel suppliers, and maintains the hotel list, creditor accounts, fee schedules and the preferred supplier panel.',
    goalStatement:
      'Keep supplier and product master data clean so the financials are right first time.',
    today: [
      'New supplier onboarding is a SharePoint form plus an email',
      'Hotel names and addresses hand-typed into the list',
      'Net vs gross commission logic applied manually',
      'No supplier APIs, so master data can never self-heal',
    ],
    tomorrow: [
      'Request workflow with SLA and status back to the consultant',
      'Supplier records sourced from an authoritative feed',
      'Commission model held against the supplier, applied by rule',
      'Master data refreshed by integration, not retyping',
    ],
    keyBenefit: 'Clean supplier data upstream, correct financials downstream',
    // Evidenced only by the AS-IS process pack. Neither discovery workshop raised this role or
    // its pain points, so treat it as lower confidence than the other five personas.
    evidenceNote:
      'Drawn from the AS-IS process pack only — not raised in either discovery workshop. Lower confidence than the other personas.',
    challengeIds: ['C31', 'C32', 'C33', 'C34', 'C35', 'C49'],
    journey: [
      { stage: 'Enquiry', today: 'Not involved', tomorrow: 'Not involved', emotion: '😐', mood: 'N/A' },
      { stage: 'Client Setup', today: 'Not involved', tomorrow: 'Not involved', emotion: '😐', mood: 'N/A' },
      { stage: 'Sourcing', today: 'Consultant hits an unknown supplier', tomorrow: 'Supplier already in the catalogue', emotion: '😕', mood: 'Reactive' },
      { stage: 'Supplier Onboarding', today: 'SharePoint form, email, no SLA', tomorrow: 'Tracked request with status', emotion: '😣', mood: 'Chased' },
      { stage: 'Segments & Costing', today: 'Net/gross commission decided case by case', tomorrow: 'Commission model applied by rule', emotion: '😖', mood: 'Error-prone' },
      { stage: 'Quote & Acceptance', today: 'Bad master data surfaces in the quote', tomorrow: 'Quote built on validated data', emotion: '😟', mood: 'Nervous' },
      { stage: 'Client Payment', today: 'Payment Type mis-set flows into financials', tomorrow: 'Payment Type derived, not typed', emotion: '😩', mood: 'Anxious' },
      { stage: 'Supplier Payment', today: 'Duplicate suppliers split the payables', tomorrow: 'One supplier, one creditor account', emotion: '😤', mood: 'Frustrated' },
      { stage: 'Invoice & Close', today: 'Cleans up data after the money moved', tomorrow: 'Nothing to clean up', emotion: '😮‍💨', mood: 'Settled' },
    ],
  },
]

export const journeyStages = personas[0].journey.map((s) => s.stage)
