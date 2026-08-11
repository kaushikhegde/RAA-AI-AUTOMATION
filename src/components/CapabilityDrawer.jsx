import React from 'react'
import { challenges } from '../data/challenges.js'
import { personas } from '../data/personas.js'
import { opportunities } from '../data/opportunities.js'

export default function CapabilityDrawer({ cap, onClose }) {
  const related = challenges.filter((c) => c.caps.includes(cap.id))
  const relatedOpportunities = opportunities.filter((o) => o.caps.includes(cap.id))
  const relatedPersonas = [...new Set(related.map((c) => c.persona))]
    .map((id) => personas.find((p) => p.id === id))
    .filter(Boolean)

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-label={`${cap.name} detail`}>
        <button className="drawer-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <header className="drawer-head">
          <div className="path">
            {cap.domainName} → {cap.groupId} {cap.groupName}
          </div>
          <h3>
            {cap.id} {cap.name}
          </h3>
        </header>
        <div className="drawer-body">
          {cap.note && (
            <div className="meta-block">
              <div className="meta-label">Current state</div>
              <p style={{ fontSize: 14, color: 'var(--grey-700)', lineHeight: 1.55 }}>{cap.note}</p>
            </div>
          )}

          {cap.systems?.length > 0 && (
            <div className="meta-block">
              <div className="meta-label">Systems involved</div>
              <div>
                {cap.systems.map((s) => (
                  <span className="tag" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {relatedPersonas.length > 0 && (
            <div className="meta-block">
              <div className="meta-label">Personas affected</div>
              <div>
                {relatedPersonas.map((p) => (
                  <span className="tag" key={p.id}>
                    {p.emoji} {p.name} · {p.role}
                  </span>
                ))}
              </div>
            </div>
          )}

          {relatedOpportunities.length > 0 && (
            <div className="meta-block">
              <div className="meta-label">AI opportunities ({relatedOpportunities.length})</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {relatedOpportunities.map((o) => (
                  <div
                    key={o.id}
                    style={{
                      border: '1px solid var(--ok-line)',
                      borderRadius: 8,
                      padding: '10px 12px',
                      background: 'var(--ok-bg)',
                    }}
                  >
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 5 }}>
                      <span className="chal-id" style={{ background: '#1b6b32' }}>{o.id}</span>
                      <span style={{ fontSize: 10.5, fontWeight: 800, color: 'var(--grey-500)' }}>
                        {o.processStep.toUpperCase()}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--raa-ink)', lineHeight: 1.35 }}>
                      {o.title}
                    </div>
                    <p style={{ fontSize: 12.5, color: 'var(--grey-700)', lineHeight: 1.45, margin: '6px 0 0' }}>
                      {o.description}
                    </p>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: '#1b6b32', marginTop: 6 }}>
                      ✓ {o.benefit}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="meta-block">
            <div className="meta-label">
              Linked challenges {related.length > 0 && `(${related.length})`}
            </div>
            {related.length === 0 ? (
              <p style={{ fontSize: 13, color: 'var(--grey-500)' }}>
                No specific pain point recorded against this capability.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {related.map((c) => (
                  <div
                    key={c.id}
                    style={{
                      border: '1px solid var(--grey-200)',
                      borderRadius: 8,
                      padding: '10px 12px',
                      background: 'var(--sand-50)',
                    }}
                  >
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 5 }}>
                      <span className="chal-id">{c.id}</span>
                      <span style={{ fontSize: 10.5, fontWeight: 800, color: 'var(--grey-500)' }}>
                        {c.severity.toUpperCase()}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--raa-ink)', lineHeight: 1.35 }}>
                      {c.title}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
