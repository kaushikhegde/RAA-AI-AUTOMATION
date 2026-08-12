import React from 'react'
import { PRIORITY } from '../data/opportunities.js'
import { personas } from '../data/personas.js'

export default function OpportunityDrawer({ opp, onClose }) {
  const p = personas.find((x) => x.id === opp.persona)

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-label={`${opp.title} detail`}>
        <button className="drawer-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <header className="drawer-head">
          <div className="path">
            {opp.id} · {opp.processStep}
            {p && ` · ${p.emoji} ${p.name.split(' ')[0]} — ${p.role}`}
          </div>
          <h3>{opp.title}</h3>
          <span className={`badge-outline opp-req-priority priority-${opp.priority}`}>
            {PRIORITY[opp.priority].label}
          </span>
        </header>
        <div className="drawer-body">
          <div className="meta-block">
            <div className="meta-label">Description</div>
            <p style={{ fontSize: 14, color: 'var(--grey-700)', lineHeight: 1.55 }}>{opp.description}</p>
            {opp.example && (
              <p style={{ fontSize: 13, color: 'var(--grey-500)', lineHeight: 1.5, marginTop: 8, fontStyle: 'italic' }}>
                e.g. {opp.example}
              </p>
            )}
          </div>

          <div className="meta-block">
            <div className="meta-label">Benefits</div>
            <div
              style={{
                border: '1px solid var(--ok-line)',
                borderRadius: 8,
                padding: '12px 14px',
                background: 'var(--ok-bg)',
              }}
            >
              {opp.benefits.map((b, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 8,
                    alignItems: 'flex-start',
                    marginTop: i === 0 ? 0 : 8,
                  }}
                >
                  <span style={{ color: '#1b6b32', fontWeight: 800, lineHeight: 1.5 }}>✓</span>
                  <span style={{ fontSize: 13, color: 'var(--raa-ink)', lineHeight: 1.5 }}>{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="meta-block">
            <div className="meta-label">Dependencies, risks &amp; tech limitations</div>
            <div
              style={{
                border: '1px solid var(--bad-line)',
                borderRadius: 8,
                padding: '12px 14px',
                background: 'var(--bad-bg)',
              }}
            >
              {opp.risks.map((r, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 8,
                    alignItems: 'flex-start',
                    marginTop: i === 0 ? 0 : 8,
                  }}
                >
                  <span style={{ color: 'var(--raa-burgundy)', fontWeight: 800, lineHeight: 1.5 }}>!</span>
                  <span style={{ fontSize: 13, color: 'var(--raa-ink)', lineHeight: 1.5 }}>{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
