import React, { useState } from 'react'
import { metricThemes } from '../data/metrics.js'

const ALL_ID = 'all'

export default function Metrics() {
  const [themeId, setThemeId] = useState(ALL_ID)
  const isAll = themeId === ALL_ID
  const theme = metricThemes.find((t) => t.id === themeId)
  const allMetrics = metricThemes.flatMap((t) =>
    t.metrics.map((m) => ({ ...m, themeName: t.name }))
  )
  const visibleMetrics = isAll ? allMetrics : theme.metrics

  return (
    <div className="page">
      <div className="section-head">
        <div className="eyebrow">Payments POC · Baseline metrics</div>
        <h2>What we&rsquo;re measuring, grouped by outcome.</h2>
        <p>
          No data has been collected yet. Each metric below shows the direction we expect it to move
          after implementation and when tracking begins — not projected numbers.
        </p>
        <div className="metrics-legend">
          <span><span className="legend-dot legend-dot-up" /> Expected to increase</span>
          <span><span className="legend-dot legend-dot-down" /> Expected to decrease</span>
          <span><span className="legend-dot legend-dot-pending" /> Awaiting baseline</span>
        </div>
        <div className="dummy-banner">⚠ Sample values shown are placeholders — no real data collected yet</div>
      </div>

      <div className="pillrow" role="group" aria-label="Choose a metric theme">
        <button
          className={`pill${isAll ? ' is-active' : ''}`}
          onClick={() => setThemeId(ALL_ID)}
        >
          All ({allMetrics.length})
        </button>
        {metricThemes.map((t) => (
          <button
            key={t.id}
            className={`pill${themeId === t.id ? ' is-active' : ''}`}
            onClick={() => setThemeId(t.id)}
          >
            {t.name} ({t.metrics.length})
          </button>
        ))}
      </div>

      <div className="metrics-grid">
        {visibleMetrics.map((m) => (
          <MetricCard metric={m} key={m.title} showTheme={isAll} />
        ))}
      </div>

      <div className="callout">
        Directions and cadences reflect intent from workshop notes, not measured results — tracking
        begins once the POC is live.
      </div>
    </div>
  )
}

function MetricCard({ metric: m, showTheme }) {
  return (
    <article className="metric-card">
      {showTheme && <div className="metric-card-theme">{m.themeName}</div>}
      <div className="metric-card-title">{m.title}</div>
      <div className="metric-row">
        <span className={`chip chip-${m.direction}`}>
          {m.direction === 'up' ? '↑ Increase' : '↓ Decrease'}
        </span>
        <span className="metric-cadence">{m.cadence}</span>
      </div>
      <div className="metric-stat-row">
        <span className="metric-stat-value">{m.value}</span>
        <span className={`metric-stat-delta metric-stat-delta-${m.direction}`}>{m.delta}</span>
      </div>
      <div className="metric-stat-label">Dummy value — placeholder only</div>
      <div className="metric-status">
        <span className="legend-dot legend-dot-pending" />
        <span className="metric-status-text">{m.status}</span>
      </div>
    </article>
  )
}
