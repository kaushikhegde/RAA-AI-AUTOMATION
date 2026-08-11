// RAA Travel — AI opportunities for Payments & Reconciliation.
// Source: Tramada Finance AI Workshop deck, "Summary of AI Opportunities for Payments and
// Reconciliation" (slide 04). Linked to the capabilities each opportunity would change.

const SRC = 'AI Opportunities workshop deck — "Summary of AI Opportunities for Payments and Reconciliation" (slide 04)'

export const opportunityPhases = [
  { id: 'payment', name: 'Payment process end to end', desc: 'Client-facing payment capture and receipting — travel consultant led.' },
  { id: 'finance', name: 'Finance end to end', desc: 'Supplier payment, reconciliation and settlement — finance/accounts led.' },
]

export const opportunities = [
  {
    id: 'AI1',
    phase: 'payment',
    persona: 'consultant',
    title: 'AI chatbot to Tramada input',
    processStep: 'Issue Debtor Payment Receipt',
    description:
      'Chat interface with an AI agent which prompts Travel Consultants to respond with required details. AI agent populates details from chat into Tramada fields.',
    example:
      'AI agent asks the consultant for a reference number via chat. Consultant replies with the reference number. AI agent inputs it into Tramada.',
    benefit: 'Reduces repeated page-to-page manual input — reduced time and increased accuracy for customer payment entry.',
    caps: ['3.2.1', '3.2.5'],
    source: SRC,
  },
  {
    id: 'AI2',
    phase: 'payment',
    persona: 'consultant',
    title: 'AI prompts and alerts for errors and missing information',
    processStep: 'Issue Debtor Payment Receipt',
    description:
      'Alerts or prompts for missing fields, steps, or conflicting information that need to be rectified by the Travel Consultant.',
    example:
      'Travel consultant forgets to input the reference number into Tramada. AI companion pops up an alert to prompt the consultant to input it.',
    benefit: 'Ensures input of the reference number is effectively mandatory. Alerts ensure Travel Consultants are notified before the receipt is issued.',
    caps: ['4.4.1', '3.2.1'],
    source: SRC,
  },
  {
    id: 'AI3',
    phase: 'payment',
    persona: 'consultant',
    title: 'AI interface mask for Tramada input',
    processStep: 'Debtor invoice · Issue creditor payment',
    description:
      'Guidelines and rules ingested by AI. Consultants input details at the start and AI populates everything else in Tramada, ensuring all necessary fields are entered.',
    example:
      'A UI layer presents the required fields for the page to be filled in. Consultant completes them and AI populates the rest where required in Tramada.',
    benefit: 'Reduces errors as detail population is handled by AI. Guidelines are in place to fine-tune the AI tasks.',
    caps: ['3.4.1', '3.3.6'],
    source: SRC,
  },
  {
    id: 'AI4',
    phase: 'payment',
    persona: 'consultant',
    title: 'AI automates travel insurance policies',
    processStep: 'Invoicing',
    description:
      'AI agent updates travel insurance policy fields to prepopulate and start the policy as soon as payment from the customer has been made.',
    benefit: 'Time saved as the insurance policy is updated instantly rather than actioned manually.',
    caps: ['2.2.8', '4.5.4'],
    source: SRC,
  },
  {
    id: 'AI5',
    phase: 'finance',
    persona: 'consultant',
    title: 'AI MINT field population from Tramada',
    processStep: 'Supplier payments — MINT · DVC (Westpac Portal)',
    description:
      'Follows a set of rules to prepopulate payment details in MINT and notify a human to verify and execute.',
    example:
      'AI agent takes the payment amount and supplier details from Tramada, logs in to MINT, prepopulates the details and sends a notification to a human to proceed with payment.',
    benefit: 'Instant payment detail population — human focuses on checking payment amount and supplier details instead of manual entry.',
    caps: ['3.3.4', '3.3.2', '3.3.3'],
    source: SRC,
  },
  {
    id: 'AI6',
    phase: 'finance',
    persona: 'finance',
    title: 'AI updates fields in Tramada from payment and supplier portals',
    processStep: 'Client payments · Supplier payments',
    description:
      'After payment is made, payment details are pulled by an AI agent and populated into Tramada via booking notes, automating receipting.',
    benefit: 'Instant population of booking notes — human focuses on checking payment amount and submitting instead of manual entry.',
    caps: ['2.1.5', '3.2.1'],
    source: SRC,
  },
  {
    id: 'AI7',
    phase: 'finance',
    persona: 'finance',
    title: 'AI performs initial financial reconciliation',
    processStep: 'Reconciliation',
    description:
      'Agent conducts initial financial reconciliation by cross-checking a payment spreadsheet against Tramada transactions and ticking them off when matched — checking reference no., booking no., policy no. and amount. Covers bank statement, BPay, MINT, DVC, IPSI and ETG. Exceptions are raised and a human is notified.',
    benefit: 'Time taken for cross-checking spreadsheets reduced. Time taken for box-ticking reduced.',
    caps: ['3.5.8', '3.5.14', '3.5.13'],
    source: SRC,
  },
  {
    id: 'AI8',
    phase: 'finance',
    persona: 'finance',
    title: 'AI auto-populates payment details from transaction statements to Tramada',
    processStep: 'Reconciliation',
    description:
      'AI reads data from financial spreadsheets (e.g. next-day DVC) and matches it against Tramada bookings, then auto-populates the payment details into Tramada segments. Matched data and exceptions are both raised to a human to verify and resolve — matched data can be reconciled automatically.',
    benefit: 'Time taken for cross-checking spreadsheets reduced. Exception flags notify the finance team, who focus on reconciling anomalies instead of manual entry.',
    caps: ['5.2.7', '3.5.9'],
    source: SRC,
  },
]

export const opportunityCount = opportunities.length
