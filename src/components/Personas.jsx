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
        <h2>Five people the travel booking process runs through.</h2>
        <p>
          Each persona stands for a category of actors with similar journeys, drawn from the swimlanes in
          the AS-IS process pack, the current-state blueprint and the recorded SME session. Together they
          account for all {challenges.length} recorded challenges.
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
                {p.challengeIds.length} recorded challenges · {p.challengeIds[0]}–
                {p.challengeIds[p.challengeIds.length - 1]}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="callout">
        These five personas cover every lane in the AS-IS pack. Two further actors appear in the process
        but are not modelled as full personas: the <strong>Retail team member</strong> operating the ECR for
        cash and cheque receipting, and the <strong>Travel Operations Manager</strong> as the transformation
        sponsor.
      </div>
    </>
  )
}

function Journeys() {
  const [activeId, setActiveId] = useState(personas[0].id)
  const [lightbox, setLightbox] = useState(false)
  const p = personas.find((x) => x.id === activeId)

  const selectPersona = (id) => {
    setActiveId(id)
    setLightbox(false)
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

      {p.journeyImage ? (
        <figure className="journey-figure">
          <button
            className="journey-figure-btn"
            onClick={() => setLightbox(true)}
            aria-label="View the full-resolution journey map"
          >
            <img src={p.journeyImage} alt={p.journeyImageCaption || `${p.name} journey map`} />
          </button>
          <figcaption>{p.journeyImageCaption} · click to view full resolution</figcaption>
        </figure>
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

      {lightbox && p.journeyImage && (
        <div className="journey-lightbox" onClick={() => setLightbox(false)} role="dialog" aria-modal="true">
          <button className="journey-lightbox-close" aria-label="Close">×</button>
          <img
            src={p.journeyImage}
            alt={p.journeyImageCaption || `${p.name} journey map`}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div className="callout">
        <strong>{p.name}</strong> — {p.context} {p.keyBenefit}.
      </div>
    </>
  )
}
