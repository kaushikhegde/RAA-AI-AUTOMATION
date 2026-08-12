// RAA Travel — AI opportunities for Payments & Reconciliation.
// Source: Tramada Finance AI Workshop deck, "Summary of AI Opportunities for Payments and
// Reconciliation" (slide 04). Linked to the capabilities each opportunity would change.

const SRC = 'AI Opportunities workshop deck — "Summary of AI Opportunities for Payments and Reconciliation" (slide 04)'

export const opportunityPhases = [
  { id: 'payment', name: 'Payment process end to end', desc: 'Client-facing payment capture and receipting — travel consultant led.' },
  { id: 'finance', name: 'Finance end to end', desc: 'Supplier payment, reconciliation and settlement — finance/accounts led.' },
]

// Priority called at the RAA prioritisation workshop, Aug 2026: the reconciliation and
// supplier-payment opportunities (5-8) go first, missing-info alerting (2) is next,
// and the lighter-touch input opportunities (1, 3, 4) follow once those land.
export const PRIORITY = {
  high: { code: 'high', label: 'High priority', order: 0 },
  medium: { code: 'medium', label: 'Second priority', order: 1 },
  low: { code: 'low', label: 'Low priority', order: 2 },
}

export const opportunities = [
  {
    id: 'AI1',
    phase: 'payment',
    priority: 'low',
    persona: 'consultant',
    title: 'AI chatbot to Tramada input',
    processStep: 'Issue Debtor Payment Receipt',
    description:
      'Chat interface with an AI agent which prompts Travel Consultants to respond with required details. AI agent populates details from chat into Tramada fields.',
    example:
      'AI agent asks the consultant for a reference number via chat. Consultant replies with the reference number. AI agent inputs it into Tramada.',
    benefits: [
      'Reduced time and increased accuracy for customer payment entry through reduced repeated manual input',
      'Travel Consultant can select from suggested options for certain dimensions as well as enter free text',
      'Guided experience and reduced learning curve for Travel Consultants to learn financial dimensions of Tramada input',
      'Leverage a working demo Scyne has shown previously',
    ],
    risks: [
      'Tramada finance workflow rules need to be understood and fed into AI chat flow design to ensure appropriate prompts and response options are delivered at the right time',
      'Human-in-the-loop required to check Tramada input before process finalisation',
      'User testing required to assess effectiveness and usability',
      'Change in current workflow process, requires change management or training of travel consultants',
      'Some copy paste and manual text input will still be required',
      "No confirmed RAA AI architecture and deployment — Scyne to suggest based on industry's best practices",
    ],
    caps: ['3.2.1', '3.2.5'],
    challenges: ['C2', 'C22'],
    source: SRC,
  },
  {
    id: 'AI2',
    phase: 'payment',
    priority: 'medium',
    persona: 'consultant',
    title: 'AI prompts and alerts for errors and missing information',
    processStep: 'Issue Debtor Payment Receipt',
    description:
      'Alerts or prompts for missing fields, steps, or conflicting information that need to be rectified by the Travel Consultant.',
    example:
      'Travel consultant forgets to input the reference number into Tramada. AI companion pops up an alert to prompt the consultant to input it.',
    benefits: [
      'Reduces instances of Travel Consultants missing critical details, e.g. reference numbers, reducing need for follow up as part of financial reconciliation',
      'Reduced error rate and resulting financial impact, e.g. prompts to check amount entered if a conflict is detected',
    ],
    risks: [
      'Critical fields will remain optional, meaning consultants may still miss essential details if they ignore the AI prompts',
      "Cross checking Tramada input with supplier costs will be dependent on AI agent's visibility across supplier portals",
      'Change in current workflow process, requires change management or training of travel consultants',
      "No confirmed RAA AI architecture and deployment — Scyne to suggest based on industry's best practices",
    ],
    caps: ['4.4.1', '3.2.1'],
    challenges: ['C22', 'C21'],
    source: SRC,
  },
  {
    id: 'AI3',
    phase: 'payment',
    priority: 'low',
    persona: 'consultant',
    title: 'AI interface mask for Tramada input',
    processStep: 'Debtor invoice · Issue creditor payment',
    description:
      'Guidelines and rules ingested by AI. Consultants input details at the start and AI populates everything else in Tramada, ensuring all necessary fields are entered.',
    example:
      'A UI layer presents the required fields for the page to be filled in. Consultant completes them and AI populates the rest where required in Tramada.',
    benefits: [
      'Streamlined UX can reduce time and increase accuracy for customer payment entry',
      'Mandatory fields can be designed into UI mask, reducing instances of missed information and time to follow up during financial reconciliation',
      'Improved UX can reduce learning curve for Travel Consultants to learn financial dimensions of Tramada input',
      'Ensures Consultant has visibility and oversight of Tramada entry',
    ],
    risks: [
      'Tramada finance workflow rules need to be understood and fed into UI mask design to ensure essential information is captured in the optimal flow',
      'Moderate UI/UX time investment required to design and test effectiveness and usability of UI',
      'Change in current workflow process, requires change management or training of travel consultants',
      'Some copy paste and manual text input will still be required',
      "No confirmed RAA AI architecture and deployment — Scyne to suggest based on industry's best practices",
    ],
    caps: ['3.4.1', '3.3.6'],
    challenges: ['C8', 'C49'],
    source: SRC,
  },
  {
    id: 'AI4',
    phase: 'payment',
    priority: 'low',
    persona: 'consultant',
    title: 'AI automates travel insurance policies',
    processStep: 'Invoicing',
    description:
      'AI agent updates travel insurance policy fields to prepopulate and start the policy as soon as payment from the customer has been made.',
    benefits: [
      'Increased time to serve through reduced manual admin and mental burden for travel consultants to remember to update policy statuses',
      'Reduced error rate through reduced instances of consultants forgetting to update bookings at appropriate time',
      'Improved customer experience through instant booking status updates and travel itineraries sent to customers',
    ],
    risks: [
      'API integration for AI agent to access Tokio Marine and payment portals may be required to indicate success/failure of transactions back to Tramada',
      'Notification of changes to human agent required',
      "No confirmed RAA AI architecture and deployment — Scyne to suggest based on industry's best practices",
    ],
    caps: ['2.2.8', '4.5.4'],
    challenges: ['C3'],
    source: SRC,
  },
  {
    id: 'AI5',
    phase: 'finance',
    priority: 'high',
    persona: 'consultant',
    title: 'AI MINT field population from Tramada',
    processStep: 'Supplier payments — MINT · DVC (Westpac Portal)',
    description:
      'Follows a set of rules to prepopulate payment details in MINT and notify a human to verify and execute.',
    example:
      'AI agent takes the payment amount and supplier details from Tramada, logs in to MINT, prepopulates the details and sends a notification to a human to proceed with payment.',
    benefits: [
      'Increased time to serve through reduced manual admin and repeated data entry for MINT supplier payments',
      'Increased supplier satisfaction through timely and accurate processing of supplier payments',
    ],
    risks: [
      'Travel consultant required to login to MINT/TravelPay first',
      'Integration API / AI agent access permissions for MINT portal required for AI agent to execute field population',
      'Human-in-the-loop required to review populated details before submitting via MINT portal',
      'Rigorous testing required to mitigate any financial risk',
      "No confirmed RAA AI architecture and deployment — Scyne to suggest based on industry's best practices",
    ],
    caps: ['3.3.4', '3.3.2', '3.3.3'],
    challenges: ['C7', 'C8'],
    source: SRC,
  },
  {
    id: 'AI6',
    phase: 'finance',
    priority: 'high',
    persona: 'finance',
    title: 'AI updates fields in Tramada from payment and supplier portals',
    processStep: 'Client payments · Supplier payments',
    description:
      'After payment is made, payment details are pulled by an AI agent and populated into Tramada via booking notes, automating receipting.',
    benefits: ['Instant population of booking notes — human focuses on checking and submitting instead of manual entry'],
    risks: [
      "Travel consultant required to login to specified payment and supplier's portals first, or API integration required",
      'AI agent access permissions for supplier portals may be required to capture details and populate in Tramada',
      'Human-in-the-loop required to review populated details before submitting via Tramada',
      "No confirmed RAA AI architecture and deployment — Scyne to suggest based on industry's best practices",
    ],
    caps: ['2.1.5', '3.2.1'],
    challenges: ['C13', 'C22'],
    source: SRC,
  },
  {
    id: 'AI7',
    phase: 'finance',
    priority: 'high',
    persona: 'finance',
    title: 'AI performs initial financial reconciliation',
    processStep: 'Reconciliation',
    description:
      'Agent conducts initial financial reconciliation by cross-checking a payment spreadsheet against Tramada transactions and ticking them off when matched — checking reference no., booking no., policy no. and amount. Covers bank statement, BPay, MINT, DVC, IPSI and ETG. Exceptions are raised and a human is notified.',
    benefits: [
      'Reduced time to cross-check transactions against banking spreadsheets',
      'Reduced time to reconcile transactions across multiple pages of transactions in Tramada',
      'Finance team effort can be focused on addressing exceptions rather than manual box ticking',
    ],
    risks: [
      'Accounts person required to download specified spreadsheets and upload to AI to start process',
      'Fact Table/Documentation regarding reconciliation logic might be required for AI to base off to increase reconciliation accuracy',
      'May be limited to reconciling exact matches, capability to detect and flag multi-payments needs validating',
      'Requires some UI/UX design input to prototype AI interface to upload spreadsheets and run reconciliation process',
      "No confirmed RAA AI architecture and deployment — Scyne to suggest based on industry's best practices",
    ],
    caps: ['3.5.8', '3.5.14', '3.5.13'],
    challenges: ['C36', 'C40'],
    source: SRC,
  },
  {
    id: 'AI8',
    phase: 'finance',
    priority: 'high',
    persona: 'finance',
    title: 'AI auto-populates payment details from transaction statements to Tramada',
    processStep: 'Reconciliation',
    description:
      'AI reads data from financial spreadsheets (e.g. next-day DVC) and matches it against Tramada bookings, then auto-populates the payment details into Tramada segments. Matched data and exceptions are both raised to a human to verify and resolve — matched data can be reconciled automatically.',
    benefits: [
      'Time taken for cross-checking spreadsheets reduced',
      'Exception flags notify the finance team, who focus on reconciling anomalies instead of manual entry',
    ],
    risks: [
      'Accounts person required to download specified spreadsheets and upload to AI to start process',
      '1 day delay to receive statements and input customer payment receipts into Tramada',
      'Human-in-the-loop required to review populated details before submitting via Tramada',
      'Change in current workflow process, requires change management or training of travel consultants',
      "No confirmed RAA AI architecture and deployment — Scyne to suggest based on industry's best practices",
    ],
    caps: ['5.2.7', '3.5.9'],
    challenges: ['C36', 'C37'],
    source: SRC,
  },
]

export const opportunityCount = opportunities.length
