import React, { useState } from 'react'
import { personas } from '../data/personas.js'
import { challenges } from '../data/challenges.js'

export default function Personas({ view, onViewChange }) {
  return (
    // Journeys need the full width to fit all nine lifecycle stages without clipping.
    <div className={view === 'journeys' ? 'page' : 'page-narrow'}>
      <div className="subtabs" role="tablist" aria-label="Persona views">
        <button
          className="subtab"
          role="tab"
          aria-selected={view === 'overview'}
          onClick={() => onViewChange('overview')}
        >
          ▦ Overview
        </button>
        <button
          className="subtab"
          role="tab"
          aria-selected={view === 'journeys'}
          onClick={() => onViewChange('journeys')}
        >
          ⤳ Journeys
        </button>
      </div>

      {view === 'overview' ? <Overview /> : <Journeys />}
    </div>
  )
}

function Overview() {
  return (
    <>
      <div className="section-head">
        <div className="eyebrow">Who we serve</div>
        <h2>{personas.length} people the travel booking process runs through.</h2>
        <p>
          Each persona stands for a category of actors with similar journeys, drawn from the swimlanes in
          the AS-IS process pack, the current-state blueprint, the recorded SME session and the two
          Tramada Finance AI workshops of July 2026. Together they account for all {challenges.length}{' '}
          recorded challenges.
        </p>
      </div>

      <div className="persona-grid">
        {personas.map((p) => (
          <article className="persona-card" key={p.id}>
            <div className="persona-top">
              <span className="avatar" style={{ borderColor: p.accent }} aria-hidden="true">
                {p.emoji}
              </span>
              <div>
                <h3>{p.name}</h3>
                <div className="role">{p.role}</div>
                <div className="ctx">{p.context}</div>
              </div>
            </div>

            <div className="tt-grid">
              <div className="tt tt-today">
                <h4>Today</h4>
                <ul>
                  {p.today.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div className="tt tt-tomorrow">
                <h4>Tomorrow</h4>
                <ul>
                  {p.tomorrow.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="persona-foot">
              <div className="meta-label">Key benefit</div>
              <div className="benefit">{p.keyBenefit}</div>
              <div className="goal">&ldquo;{p.goalStatement}&rdquo;</div>
              <div style={{ marginTop: 10, fontSize: 11, color: 'var(--grey-500)', fontWeight: 700 }}>
                {p.challengeIds.length} recorded challenges
              </div>
              {p.evidenceNote && (
                <div
                  style={{
                    marginTop: 8, fontSize: 11.5, lineHeight: 1.45, fontStyle: 'italic',
                    color: 'var(--grey-500)', borderTop: '1px solid var(--grey-200)', paddingTop: 8,
                  }}
                >
                  {p.evidenceNote}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="callout">
        These personas cover every lane in the AS-IS pack plus the back-office roles surfaced in the July
        2026 workshops. Two actors are still not modelled in full: the <strong>Retail team member</strong>{' '}
        who receipts cash through the ECR, and the <strong>corporate / debtor client</strong> — sports
        teams and similar — whose split-profile bookings receipt and invoice differently to retail.
      </div>
    </>
  )
}

function Journeys() {
  const [activeId, setActiveId] = useState(personas[0].id)
  const [view, setView] = useState('overview')
  const p = personas.find((x) => x.id === activeId)

  const selectPersona = (id) => {
    setActiveId(id)
    setView('overview')
  }

  return (
    <>
      <div className="section-head">
        <div className="eyebrow">Persona journeys</div>
        <h2>Today vs Tomorrow — every step of the booking.</h2>
        <p>
          Journey diagrams showing how an automated payments and integration layer changes each
          persona&rsquo;s experience across the full booking-to-invoice lifecycle.
        </p>
      </div>

      <div className="persona-switch" role="group" aria-label="Choose a persona">
        {personas.map((x) => (
          <button
            key={x.id}
            className="pswitch"
            aria-pressed={x.id === activeId}
            onClick={() => selectPersona(x.id)}
          >
            <span className="n">{x.name.split(' ')[0]}</span>
            <span className="r">{x.role}</span>
          </button>
        ))}
      </div>

      {p.journeyScenario ? (
        <>
          <div className="scenario-subtabs" role="tablist" aria-label="Journey view">
            <button
              className="scenario-subtab"
              role="tab"
              aria-selected={view === 'overview'}
              onClick={() => setView('overview')}
            >
              High-level overview
            </button>
            <button
              className="scenario-subtab"
              role="tab"
              aria-selected={view === 'today'}
              onClick={() => setView('today')}
            >
              Today — {p.journeyScenario.title.replace(/^Scenario \d+: /, '')}
            </button>
            <button
              className="scenario-subtab"
              role="tab"
              aria-selected={view === 'tomorrow'}
              onClick={() => setView('tomorrow')}
            >
              Tomorrow (placeholder)
            </button>
          </div>

          {view === 'overview' && <HighLevelOverview persona={p} />}
          {view === 'today' && <ScenarioBoard scenario={p.journeyScenario} mode="today" />}
          {view === 'tomorrow' && <ScenarioBoard scenario={p.journeyScenario} mode="tomorrow" />}
        </>
      ) : (
        <div className="journey-pending">
          <span className="journey-pending-mark">◇</span>
          <h4>Journey map not yet produced</h4>
          <p>
            The Today vs Tomorrow journey map for <strong>{p.name}</strong> ({p.role}) is still to be
            drawn. The underlying analysis is on the <strong>Overview</strong> tab and in the
            Challenges register.
          </p>
        </div>
      )}

      <div className="callout">
        <strong>{p.name}</strong> — {p.context} {p.keyBenefit}.
      </div>
    </>
  )
}

function HighLevelOverview({ persona }) {
  return (
    <>
      <p className="overview-flow-intro">
        End-to-end current-state process for <strong>{persona.name}</strong> — high-level steps and
        the pain point at each one. Sourced from the AS-IS process pack and the current-state
        journeys and pain points pack.
      </p>
      <div className="overview-flow">
        {persona.journey.map((s, i) => (
          <React.Fragment key={s.stage}>
            <div className="overview-step">
              <div className="overview-step-emotion" aria-hidden="true">{s.emotion}</div>
              <h4>{s.stage}</h4>
              <p>{s.today}</p>
            </div>
            {i < persona.journey.length - 1 && (
              <div className="overview-arrow" aria-hidden="true">&rarr;</div>
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  )
}

function ScenarioBoard({ scenario, mode }) {
  const placeholder = mode === 'tomorrow'
  return (
    <div className={`scenario-board-wrap${placeholder ? ' is-placeholder' : ''}`}>
      <div className="scenario-head">
        <h3>{scenario.title}</h3>
        {placeholder ? (
          <div className="scenario-placeholder-banner">
            Future-state layout only — content not yet designed
          </div>
        ) : (
          <>
            <p className="scenario-summary">{scenario.summary}</p>
            <div className="scenario-headline">{scenario.headline}</div>
            <div className="scenario-source">Source: {scenario.source}</div>
          </>
        )}
      </div>

      <div className="scenario-board">
        {scenario.phases.map((phase) => (
          <div className="scenario-phase" key={phase.name}>
            <div className="scenario-phase-head">
              <h4>{phase.name}</h4>
              <div className="scenario-actors">
                {phase.actors.map((a) => (
                  <span className="scenario-actor" key={a}>{a}</span>
                ))}
              </div>
            </div>

            <div className="scenario-section">
              <div className="scenario-section-label">Human actions</div>
              {placeholder ? (
                <p className="scenario-placeholder-text">Placeholder</p>
              ) : (
                <ul>
                  {phase.actions.map((a) => (
                    <li key={a.title}>
                      <strong>{a.title}:</strong> {a.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="scenario-section scenario-section-pain">
              <div className="scenario-section-label">Pain points</div>
              {placeholder ? (
                <p className="scenario-placeholder-text">Placeholder</p>
              ) : (
                <ul>
                  {phase.painPoints.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
