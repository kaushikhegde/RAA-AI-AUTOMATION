import React, { useMemo, useState } from 'react'
import { opportunities, PRIORITY } from '../data/opportunities.js'
import { personas } from '../data/personas.js'
import { allCaps } from '../data/capabilities.js'
import CapabilityDrawer from './CapabilityDrawer.jsx'
import OpportunityDrawer from './OpportunityDrawer.jsx'

export default function Opportunities() {
  const [priorityFilter, setPriorityFilter] = useState(null)
  const [selectedCap, setSelectedCap] = useState(null)
  const [selectedOpp, setSelectedOpp] = useState(null)

  const visible = useMemo(
    () => opportunities.filter((o) => !priorityFilter || o.priority === priorityFilter),
    [priorityFilter]
  )

  return (
    <div className="page">
      <div className="section-head">
        <div className="eyebrow">AI opportunities</div>
        <h2>{opportunities.length} proposed opportunities, mapped to their specific capabilities.</h2>
        <p>
          From the Payments &amp; Reconciliation workshop, prioritised at the RAA prioritisation session
          — the reconciliation and supplier-payment opportunities go first, missing-information alerting
          is next, and the remaining input opportunities follow once those land.
        </p>
      </div>

      <div className="opp-toolbar">
        <span className="opp-count">
          {visible.length} of {opportunities.length} shown
        </span>
      </div>

      <div className="pillrow" role="group" aria-label="Filter by priority">
        <button
          className={`pill pill-all${!priorityFilter ? ' is-active' : ''}`}
          onClick={() => setPriorityFilter(null)}
        >
          All priorities
        </button>
        {Object.values(PRIORITY).map((p) => (
          <button
            key={p.code}
            className={`pill${priorityFilter === p.code ? ' is-active' : ''}`}
            onClick={() => setPriorityFilter(p.code)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="opp-table-wrap">
        <table className="opp-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Opportunity</th>
              <th>Capabilities</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ textAlign: 'center', color: 'var(--grey-500)', padding: 30 }}>
                  No opportunities match those filters.
                </td>
              </tr>
            ) : (
              visible.map((o) => {
                const p = personas.find((x) => x.id === o.persona)
                return (
                  <tr key={o.id}>
                    <td className="opp-id">{o.id}</td>
                    <td className="opp-req">
                      <button
                        type="button"
                        className="opp-req-title opp-req-title-link"
                        onClick={() => setSelectedOpp(o)}
                      >
                        {o.title}
                      </button>
                      <div className="opp-req-persona">
                        {p && `${p.emoji} ${p.name.split(' ')[0]} · ${p.role} — `}
                        {o.processStep}
                      </div>
                      <p className="opp-req-desc">{o.description}</p>
                      <div className="opp-req-meta">
                        <span className={`badge-outline opp-req-priority priority-${o.priority}`}>
                          {PRIORITY[o.priority].label}
                        </span>
                        <span className="opp-count-pill opp-count-pill-benefits" title="Benefits">
                          {o.benefits.length} Benefits
                        </span>
                        <span
                          className="opp-count-pill opp-count-pill-risks"
                          title="Dependencies, risks & tech limitations"
                        >
                          {o.risks.length} Dependencies, risks & tech limitations
                        </span>
                      </div>
                    </td>
                    <td>
                      {o.caps.map((id) => (
                        <button
                          type="button"
                          className="caplink"
                          key={id}
                          onClick={() => setSelectedCap(allCaps.find((c) => c.id === id))}
                        >
                          {id}
                        </button>
                      ))}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {selectedCap && <CapabilityDrawer cap={selectedCap} onClose={() => setSelectedCap(null)} />}
      {selectedOpp && <OpportunityDrawer opp={selectedOpp} onClose={() => setSelectedOpp(null)} />}
    </div>
  )
}
