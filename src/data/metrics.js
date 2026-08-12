// RAA Travel — Payments POC baseline metrics.
// Source: payments-poc-metrics.html (workshop draft). No data collected yet — all values below
// are placeholders showing the expected direction and tracking cadence, not measured results.

export const metricThemes = [
  {
    id: 'speed',
    name: 'Speed & Efficiency',
    metrics: [
      {
        title: 'Average time for payments to be processed to completion',
        direction: 'down',
        cadence: 'Tracked monthly',
        value: '4.2 days',
        delta: '−18% (sample)',
        status: 'Awaiting baseline',
      },
      {
        title: 'Average time to reference transactions between spreadsheets and Tramada',
        direction: 'down',
        cadence: 'Tracked per payment type',
        value: '12 min',
        delta: '−9% (sample)',
        status: 'Awaiting baseline',
      },
    ],
  },
  {
    id: 'accuracy',
    name: 'Accuracy & Financial Integrity',
    metrics: [
      {
        title: 'Number of errors found after start of reconciliation',
        direction: 'down',
        cadence: 'Tracked monthly',
        value: '3.1%',
        delta: '−0.4pp (sample)',
        status: 'Awaiting baseline — starting point',
      },
      {
        title: 'Average rate of financial discrepancies',
        direction: 'down',
        cadence: 'Tracked monthly',
        value: '5%',
        delta: '−0.6pp (sample)',
        status: 'Awaiting baseline — starting point',
      },
      {
        title: 'Financial loss due to payment errors (debits & write-offs)',
        direction: 'down',
        cadence: 'Tracked monthly',
        value: '$8,400',
        delta: '−12% (sample)',
        status: 'Currently tracked, baseline pending',
      },
    ],
  },
  {
    id: 'adoption',
    name: 'Adoption & Trust',
    metrics: [
      {
        title: 'RAA staff AI trust score (rubric, 1–5)',
        direction: 'up',
        cadence: 'Pulse survey pre & post POC',
        value: '3.6 / 5',
        delta: '+0.4 (sample)',
        status: '1st survey not yet run',
      },
      {
        title: 'Avg time to competency for new travel consultants',
        direction: 'down',
        cadence: 'Measured over longer period',
        value: '9.5 wks',
        delta: '−1.2 wks (sample)',
        status: 'Historical data available (RAA)',
      },
    ],
  },
  {
    id: 'growth',
    name: 'Growth & Revenue',
    metrics: [
      {
        title: 'Avg value of bookings, quotes & conversion rate (quote to sale)',
        direction: 'up',
        cadence: 'Tracked monthly',
        value: '$1,240 · 22%',
        delta: '+3% (sample)',
        status: 'Awaiting baseline',
      },
      {
        title: 'Avg sales per month per consultant (0–6 & 7–12 month tenure)',
        direction: 'up',
        cadence: 'Tracked over early tenure',
        value: '$14,200',
        delta: '+6% (sample)',
        status: 'Historical data available (RAA)',
      },
    ],
  },
]
