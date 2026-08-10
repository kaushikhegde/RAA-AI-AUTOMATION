// RAA Travel — Personas and Today/Tomorrow journeys
// Personas are representative composites drawn from the lanes in the AS-IS process pack,
// the service blueprint, and the SME transcript. Rachel's role detail comes from the
// recorded Tramada demo session.

export const personas = [
  {
    id: 'consultant',
    name: 'Priya Anand',
    role: 'Travel Consultant',
    emoji: '🧳',
    accent: '#130064',
    context:
      'Retail-store and phone-based consultant taking a family holiday from first enquiry through to invoice — the primary lane in every AS-IS diagram.',
    goalStatement:
      'Spend the day advising members on travel, not re-keying the same booking into multiple systems.',
    today: [
      'Every non-Amadeus segment keyed by hand, hopping Tramada, Amadeus, MINT, IPSI, LastPass and supplier portals per booking',
      'Easy to make financial errors and miss keying in critical details under time pressure — a reference number, a policy number, a decimal point',
      'No system-enforced upper limit on how much a single supplier payment can be generated for',
      'Long time to competency for new starters, learning a large system estate before they can work independently',
      'Documents scattered across Y: drive and a personal mailbox',
    ],
    tomorrow: [
      'Supplier content flows into segments automatically, with no re-keying across systems',
      'Guided, validated entry catches missing or miskeyed details before they\'re submitted',
      'Payment limits and risk checks enforced by the platform, not memory',
      'AI-assisted guidance cuts new-starter time to competency by catching errors a human might miss',
      'Documents and acceptance attached to the booking record automatically',
    ],
    keyBenefit: 'More time selling travel, far less time re-keying it',
    challengeIds: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11', 'C13'],
    // Current-state scenario, traced step by step from the SME transcript. Rendered as
    // three views on the Journeys tab: a high-level overview (from the `journey` stages
    // below), this scenario as it runs today, and a placeholder layout for its future state.
    journeyScenario: {
      title: 'Scenario 01: Customer credit card payment and reconciliation',
      headline: 'Manual receipt capture with lengthy follow up for missing details',
      summary:
        'Consultant manually receipts a phoned-in card payment across two systems (IPSI and Tramada). Accounts reconciles the daily bank statement against Tramada line-by-line; any payment that can\'t be matched is chased manually across the network.',
      source: 'Tramada demo.docx — SME transcript',
      phases: [
        {
          name: 'Customer Payment',
          actors: ['Customer', 'Travel Consultant'],
          actions: [
            {
              title: 'Launch payment & capture card',
              text: 'Consultant launches the IPSI portal and starts a debtor payment receipt in Tramada. Asks the customer their card type, selects a matching dummy card from LastPass under "card number," and overrides the cardholder name field with the customer\'s actual name.',
            },
            {
              title: 'Allocate & submit',
              text: 'Allocates the cost to segments via checkbox, copies the total into Amount Received, ticks "include service fee," and copies the resulting Total Amount to Receipt into IPSI. Talks the customer through entering their card number and expiry via phone keypad.',
            },
            {
              title: 'Reference entry',
              text: 'Once IPSI confirms, manually types the store branch code plus the IPSI transaction reference into Tramada\'s Reference Number field — a mandatory step for later tracing, but not a mandatory field in the system itself.',
            },
          ],
          painPoints: [
            'Complex, multi-system, multi-field process contributes significantly to new consultants\' time-to-competency',
            'Cardholder name and reference number are non-mandatory fields, so they\'re easy to skip under time pressure',
            'No system check that amount received matches allocated segments before submission',
          ],
        },
        {
          name: 'Reconciliation',
          actors: ['Accounts'],
          actions: [
            {
              title: 'Pull settlement data',
              text: 'Accounts downloads the daily Westpac (or Nuve) merchant settlement report, which shows one lump total per shop/channel — not itemised by customer or booking.',
            },
            {
              title: 'Match by total, not by line',
              text: 'In Tramada, filters "finance merchant payment receipts" by that shop\'s code for the day, totals every individual consultant receipt, and checks the total against the settlement figure.',
            },
            {
              title: 'Investigate mismatches',
              text: 'If it doesn\'t balance, searches line by line within that shop\'s receipts for the cause — a missing receipt, wrong payment type, dummy cardholder name left in, or a fee included/excluded incorrectly — and corrects it in the booking where possible.',
            },
          ],
          painPoints: [
            'Significant time investment to manually match every transaction line by line',
            'Extra training and expertise needed to correctly handle split transactions and edge cases like sports team debtors',
            'Slow, manual detective work required to trace and fix errors',
          ],
        },
        {
          name: 'Follow Up',
          actors: ['Accounts', 'Travel Consultant', 'Customer'],
          actions: [
            {
              title: 'Chase unidentified amounts',
              text: 'Emails the whole consultant network asking if anyone is expecting a payment that couldn\'t be matched to a booking or shop total.',
            },
            {
              title: 'Close out actions',
              text: 'Follows up individually with whichever consultant responds, and/or the customer, to confirm and finalise remaining discrepancies (e.g. clarifying a deposit amount).',
            },
          ],
          painPoints: [
            'Significant delay waiting for the network to respond and identify unmatched payments',
            'No clear ownership — depends on someone else recognising the payment',
          ],
        },
      ],
    },
    journey: [
      { stage: 'Enquiry', today: 'Phone or counter consult', tomorrow: 'Unified enquiry capture', emotion: '🙂', mood: 'Engaged' },
      { stage: 'Client Setup', today: 'Search Tramada, then Landscape, copy details', tomorrow: 'Landscape auto-match and prefill', emotion: '😐', mood: 'Patient' },
      { stage: 'Sourcing', today: 'Six portals, no integration', tomorrow: 'Aggregated supplier search', emotion: '😕', mood: 'Scattered' },
      { stage: 'Segments & Costing', today: 'Manual segments, manual commission', tomorrow: 'Auto-created segments, rules-based costing', emotion: '😩', mood: 'Drained' },
      { stage: 'Quote & Acceptance', today: 'Email from personal mailbox, wait days', tomorrow: 'Digital quote with e-acceptance', emotion: '😟', mood: 'Anxious' },
      { stage: 'Client Payment', today: 'Card over the keypad or chase a BPay', tomorrow: 'Member-initiated secure payment link', emotion: '😣', mood: 'Frustrated' },
      { stage: 'Receipting', today: 'Dummy card from LastPass, allocate by hand', tomorrow: 'Receipt auto-raised and allocated', emotion: '😖', mood: 'Exasperated' },
      { stage: 'Supplier Payment', today: 'DVC Smart Flow, then re-key into MINT', tomorrow: 'Payable pushed to MINT, one approval', emotion: '😤', mood: 'Wary' },
      { stage: 'Invoice & Close', today: 'One invoice per segment, manual validation', tomorrow: 'Invoices generated on settlement', emotion: '😮‍💨', mood: 'Relieved' },
    ],
  },

  {
    id: 'member',
    name: 'Grace Sullivan',
    role: 'RAA Member / Client',
    emoji: '🧭',
    accent: '#00349F',
    context:
      'Long-standing RAA member booking a multi-segment overseas trip. Reviews the quote over a week, then pays by BPay — sometimes a deposit first, then the balance.',
    goalStatement:
      'Book with confidence and know my money has landed and my trip is actually secured.',
    today: [
      'Waits 3–7 working days for payment to be recognised before her booking is confirmed',
      'Reads card digits into a phone keypad, or pays via BPay with no confirmation the funds have landed',
      'No way to check booking or payment status without ringing the consultant',
      'Everything arrives as an email attachment — quote, itinerary, acceptance form',
      'No formal instalment option, only ad-hoc separate payments tracked manually',
    ],
    tomorrow: [
      'Settlement recognised same day, booking confirmed without the wait',
      'Secure self-service payment on her own device, with instant confirmation',
      'Live booking and payment status she can check herself, any time',
      'Documents and acceptance available in one place, no email attachments to manage',
      'A clear, scheduled instalment option if she wants to split the cost',
    ],
    keyBenefit: 'Certainty her trip is confirmed, without doing RAA\'s paperwork',
    challengeIds: ['C14', 'C16', 'C17', 'C18', 'C19'],
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
    name: 'Elena Vasquez',
    role: 'Accounts Team Officer',
    emoji: '📊',
    accent: '#15909C',
    context:
      'The compensating control for the whole front office. Reconciles every inbound and outbound stream against the bank — BPay, DVC, MINT, TravelPay, ETG, Tokio Marine, cash, card settlements and refunds — and creates receipts on consultants\' behalf when they were never entered.',
    goalStatement:
      'Match every dollar to a booking the same day, without hunting for missing references.',
    today: [
      'Time-consuming reconciliation: matching every bank statement line against Tramada costs, line by line, across dozens of pages',
      'Lengthy, complex process to rectify mismatches — e.g. multiple payments landing against one Tramada costing, or one payment covering several',
      'Reference numbers arrive malformed, with an extra digit, or missing entirely, breaking the link back to a booking',
      'Reconciliation sessions are unreliable, sometimes wiped by a platform update',
      'Enters the receipts consultants forgot, then chases the ones she can\'t place',
    ],
    tomorrow: [
      'Bank feed auto-matched against Tramada costs, with only genuine exceptions surfaced for review',
      'Mismatches resolved automatically where the split is unambiguous, with a clear trail for the rest',
      'Reference format validated and normalised at source, every time',
      'Reconciliation sessions held reliably, independent of platform updates',
      'Missing receipts flagged and routed back to the right consultant automatically',
    ],
    keyBenefit: 'Same-day matching with a clean audit trail on every dollar',
    challengeIds: [
      'C21', 'C22', 'C23', 'C24', 'C25',
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
    name: 'Marcus Chen',
    role: 'Travel Finance & Commercial',
    emoji: '🏦',
    accent: '#9F2241',
    context:
      'Owns the Westpac banking relationship, the virtual-card risk model and the supplier commercial agreements. Tracks the debits and write-offs that front-office keying errors create, and is accountable for finance scaling more slowly than the business.',
    goalStatement:
      'Grow the business 30–40% while growing finance effort 5–10% — and stop paying for avoidable errors.',
    today: [
      'In-store EFTPOS terminals aren\'t connected to Tramada, so the receipt and the terminal amount can disagree — or the transaction never reaches Tramada at all',
      'A single mis-typed digit becomes a large financial loss — a $7,000 payment has become a $700,000 payment',
      'Shortcuts that save an agent seconds cost the finance team hours to trace and unwind, on top of inconsistent manual data entry',
      'Virtual card validity windows and unused credit carry live fraud and risk exposure',
      'No confirmation an international EFT supplier payment actually landed at the other end',
    ],
    tomorrow: [
      'Terminal and Tramada amounts reconciled automatically, so a broken link is caught immediately',
      'Mandatory references and validated entry make the common keying errors impossible',
      'Consistent, validated data at entry means less time spent tracing and unwinding mistakes downstream',
      'Card issuance and risk controls built into the platform, not tracked manually',
      'Payment confirmation closes the loop on every international transfer',
    ],
    keyBenefit: 'Scale the business without scaling the error rate or the headcount',
    challengeIds: ['C44', 'C45', 'C46', 'C47', 'C48', 'C50'],
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
    name: 'Rachel Kim',
    role: 'Training & Development Consultant',
    emoji: '🎓',
    accent: '#533F8C',
    context:
      'Takes people with zero travel experience and makes them fully-fledged agents, a process that takes considerable time given the size of the system estate. Also the escalation point for booking finance issues and daily sales and ops data.',
    goalStatement:
      'Shorten time-to-competence and stop being the human integration layer between systems.',
    today: [
      'Extensive time to competence across a very large system estate before a new starter can operate independently',
      'Amadeus is a powerful reservations system with a steep, DOS-era learning curve even with point-and-click added',
      'Trainees lose the most time in segments and costing — the most manual, most error-prone part of a booking',
      'Promised Tramada supplier integration was never delivered, so the workaround is taught as if it were permanent',
    ],
    tomorrow: [
      'Faster, more predictable time to competence as fewer systems and manual steps need to be taught',
      'A guided, point-and-click experience across the estate, without the steep legacy learning curve',
      'Auto-created segments and rules-based costing for trainees to review, not build from scratch',
      'Integration delivered where the vendor did not, so the workaround is retired from training entirely',
    ],
    keyBenefit: 'Agents productive sooner, escalations that stop repeating',
    challengeIds: ['C26', 'C29'],
    journey: [
      { stage: 'Enquiry', today: 'Teaches consultation technique', tomorrow: 'Same — the human skill still matters', emotion: '🙂', mood: 'Confident' },
      { stage: 'Client Setup', today: 'Teaches two CRMs and a copy-paste habit', tomorrow: 'Teaches one flow', emotion: '😐', mood: 'Patient' },
      { stage: 'Sourcing', today: 'Teaches Amadeus, Tour Atlas and six portals', tomorrow: 'Teaches one aggregated search', emotion: '😖', mood: 'Stretched' },
      { stage: 'Segments & Costing', today: 'Where most trainee time is lost', tomorrow: 'Auto-created segments to review, not build', emotion: '😩', mood: 'Frustrated' },
      { stage: 'Quote & Acceptance', today: 'Teaches templates, drives and mailboxes', tomorrow: 'Teaches one issue-and-accept action', emotion: '😕', mood: 'Weary' },
      { stage: 'Client Payment', today: 'Teaches four payment methods and their quirks', tomorrow: 'One guided payment journey', emotion: '😣', mood: 'Bogged down' },
      { stage: 'Receipting', today: 'Teaches the dummy card ritual', tomorrow: 'Ritual removed entirely', emotion: '😤', mood: 'Exasperated' },
      { stage: 'Supplier Payment', today: 'Fields escalations on DVC and MINT errors', tomorrow: 'Fewer errors to escalate', emotion: '😫', mood: 'Overloaded' },
      { stage: 'Invoice & Close', today: 'Fixes finance problems after the fact', tomorrow: 'Problems prevented at source', emotion: '😮‍💨', mood: 'Relieved' },
    ],
  },

  {
    id: 'support',
    name: 'Daniel Osei',
    role: 'Product / Travel Support Officer',
    emoji: '🗂️',
    accent: '#9F2241',
    context:
      'Receives SharePoint requests to create new hotel suppliers, and maintains the hotel list, creditor accounts, fee schedules and the preferred supplier panel.',
    goalStatement:
      'Keep supplier and product master data clean so the financials are right first time.',
    today: [
      'New supplier onboarding is a SharePoint form plus an email, with no SLA or status returned',
      'Hotel names, addresses and customer details are hand-typed rather than pulled from an existing record, creating duplicates and room for error',
      'Net vs gross commission logic applied and remembered by hand, supplier by supplier',
      'Payment Type is set manually and flows straight into financials with no check',
      'No supplier APIs at all — master data is not saved and must be manually replicated',
    ],
    tomorrow: [
      'Request workflow with SLA and status returned automatically',
      'Supplier and customer records sourced from an authoritative feed, no retyping and no duplicates',
      'Commission model held against the supplier, applied by rule, not memory',
      'Payment Type derived automatically, not typed',
      'Master data refreshed by integration, so nothing needs replicating by hand',
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
