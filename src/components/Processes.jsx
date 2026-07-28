import React, { useState } from 'react'
import { processes, processById, LANE_COLOURS } from '../data/processes.js'
import ProcessFlow from './ProcessFlow.jsx'

export default function Processes({ activeId, onSelect }) {
  const [state, setState] = useState('current')
  const [selectedNode, setSelectedNode] = useState(null)

  const p = processById[activeId] || processes[0]

  const goTo = (id) => {
    if (!processById[id]) return
    onSelect(id)
    setSelectedNode(null)
    setState('current')
  }

  return (
    <div className="page">
      <div className="section-head">
        <div className="eyebrow">Process flows</div>
        <h2>Every AS-IS process, exactly as documented.</h2>
        <p>
          {processes.length} processes transcribed from the AS-IS pack (v0.3, 23-Feb-2026), annotated with
          friction points from the current-state blueprint and the SME session. Steps sit in the swimlane of
          the actor or system that performs them. Click a step for its detail; click a sub-process to open it.
        </p>
      </div>

      <div className="split">
        <aside className="rail proc-rail">
          <h3>Processes</h3>
          <nav className="proc-nav">
            {processes.map((x, i) => (
              <button
                key={x.id}
                className="proc-nav-item"
                aria-current={x.id === activeId}
                onClick={() => goTo(x.id)}
              >
                <span className="proc-nav-n">{String(i + 1).padStart(2, '0')}</span>
                <span className="proc-nav-name">
                  {x.code && <em>{x.code}</em>}
                  {x.name}
                </span>
              </button>
            ))}
          </nav>
        </aside>

        <div>
          <div className="proc-head">
            <div>
              <h3>
                {p.code && <span className="proc-code">{p.code}</span>}
                {p.name}
              </h3>
              <p className="proc-summary">{p.summary}</p>
              <div className="proc-source">Source: {p.source}</div>
            </div>
            <div className="proc-state-switch" role="tablist" aria-label="Process state">
              <button
                role="tab"
                aria-selected={state === 'current'}
                className="proc-state-btn"
                onClick={() => setState('current')}
              >
                Current process
              </button>
              <button
                role="tab"
                aria-selected={state === 'future'}
                className="proc-state-btn"
                onClick={() => setState('future')}
              >
                Future process
              </button>
            </div>
          </div>

          {state === 'current' ? (
            <>
              <div className="proc-legend">
                <span className="legend-label">Swimlanes</span>
                {p.lanes.map((lane, i) => (
                  <span className="lane-key" key={lane}>
                    <i style={{ background: LANE_COLOURS[i % LANE_COLOURS.length] }} />
                    {lane}
                  </span>
                ))}
                <span className="spacer" />
                <span className="legend-label">
                  {p.nodes.length} steps · {p.lanes.length} lanes
                </span>
              </div>

              {/* key remounts the flow on process change — useNodesState only reads its initial value */}
              <ProcessFlow key={p.id} process={p} onSelectNode={setSelectedNode} onOpenLink={goTo} />

              <div className="proc-shapes">
                <span><i className="sw sw-start" /> Start / End</span>
                <span><i className="sw sw-task" /> Activity</span>
                <span><i className="sw sw-dec" /> Decision</span>
                <span><i className="sw sw-sub" /> Sub-process (click to open)</span>
                <span><i className="sw sw-note" /> Has a source annotation</span>
              </div>

              {selectedNode && (
                <div className="proc-detail">
                  <button className="proc-detail-close" onClick={() => setSelectedNode(null)} aria-label="Close">
                    ×
                  </button>
                  <div className="meta-label">Step detail</div>
                  <h4>{selectedNode.label}</h4>
                  <div className="proc-detail-lane" style={{ color: selectedNode.colour }}>
                    <i style={{ background: selectedNode.colour }} />
                    {selectedNode.lane}
                  </div>
                  {selectedNode.note ? (
                    <p className="proc-detail-note">{selectedNode.note}</p>
                  ) : (
                    <p className="proc-detail-note is-empty">
                      No annotation recorded against this step in the source diagram.
                    </p>
                  )}
                </div>
              )}

              {p.notes?.length > 0 && (
                <div className="proc-notes">
                  <div className="meta-label">Annotations from the source</div>
                  <ul>
                    {p.notes.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <FuturePlaceholder process={p} />
          )}
        </div>
      </div>
    </div>
  )
}

function FuturePlaceholder({ process }) {
  return (
    <div className="proc-future">
      <div className="proc-future-inner">
        <span className="proc-future-mark">◇</span>
        <h4>Future process — not yet defined</h4>
        <p>
          The target-state flow for <strong>{process.name}</strong> is intentionally left blank. It will be
          designed once the current state is signed off.
        </p>
      </div>
    </div>
  )
}
