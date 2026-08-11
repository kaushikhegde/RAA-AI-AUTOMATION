import React, { useMemo, useState } from 'react'
import { opportunities, opportunityPhases, PRIORITY } from '../data/opportunities.js'
import { personas } from '../data/personas.js'
import { challenges } from '../data/challenges.js'
import { allCaps } from '../data/capabilities.js'
import CapabilityDrawer from './CapabilityDrawer.jsx'

export default function Opportunities() {
  const [query, setQuery] = useState('')
  const [phaseFilter, setPhaseFilter] = useState(null)
  const [priorityFilter, setPriorityFilter] = useState(null)
  const [selectedCap, setSelectedCap] = useState(null)

  const q = query.trim().toLowerCase()

  const visible = useMemo(
    () =>
      opportunities
        .filter((o) => !phaseFilter || o.phase === phaseFilter)
        .filter((o) => !priorityFilter || o.priority === priorityFilter)
        .filter(
          (o) =>
            !q ||
            o.title.toLowerCase().includes(q) ||
            o.description.toLowerCase().includes(q) ||
            o.id.toLowerCase() === q
        ),
    [phaseFilter, priorityFilter, q]
  )

  return (
    <div className="page">
      <div className="section-head">
        <div className="eyebrow">AI opportunities</div>
        <h2>{opportunities.length} proposed opportunities, mapped to capabilities and challenges.</h2>
        <p>
          From the Payments &amp; Reconciliation workshop, prioritised at the RAA prioritisation session
          — the reconciliation and supplier-payment opportunities go first, missing-information alerting
          is next, and the remaining input opportunities follow once those land.
        </p>
      </div>

      <div className="opp-toolbar">
        <input
          className="search-input"
          type="search"
          placeholder="Search opportunities…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search opportunities"
        />
        <span className="opp-count">
          {visible.length} of {opportunities.length} shown
        </span>
      </div>

      <div className="pillrow" role="group" aria-label="Filter by area">
        <button
          className={`pill pill-all${!phaseFilter ? ' is-active' : ''}`}
          onClick={() => setPhaseFilter(null)}
        >
          All areas
        </button>
        {opportunityPhases.map((p) => (
          <button
            key={p.id}
            className={`pill${phaseFilter === p.id ? ' is-active' : ''}`}
            onClick={() => setPhaseFilter(p.id)}
            title={p.desc}
          >
            {p.name}
          </button>
        ))}
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
              <th>Challenges</th>
              <th>Dependencies</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', color: 'var(--grey-500)', padding: 30 }}>
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
                      <div className="opp-req-title">{o.title}</div>
                      <div className="opp-req-persona">
                        {p && `${p.emoji} ${p.name.split(' ')[0]} · ${p.role} — `}
                        {o.processStep}
                      </div>
                      <p className="opp-req-desc">{o.description}</p>
                      <span className={`badge-outline opp-req-priority priority-${o.priority}`}>
                        {PRIORITY[o.priority].label}
                      </span>
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
                    <td>
                      {o.challenges.map((id) => {
                        const c = challenges.find((x) => x.id === id)
                        return (
                          <span className="tag" key={id} title={c?.title}>
                            {id}
                          </span>
                        )
                      })}
                    </td>
                    <td>
                      {o.dependencies.length === 0 ? (
                        <span className="opp-dep-none">—</span>
                      ) : (
                        o.dependencies.map((id) => {
                          const dep = opportunities.find((x) => x.id === id)
                          return (
                            <span className="tag" key={id} title={dep?.title}>
                              {id}
                            </span>
                          )
                        })
                      )}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {selectedCap && <CapabilityDrawer cap={selectedCap} onClose={() => setSelectedCap(null)} />}
    </div>
  )
}
