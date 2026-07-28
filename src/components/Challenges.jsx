import React, { useMemo, useState } from 'react'
import { challenges, themes, severityOrder, severityColour } from '../data/challenges.js'
import { personas } from '../data/personas.js'

export default function Challenges() {
  const [personaFilter, setPersonaFilter] = useState([])
  const [themeFilter, setThemeFilter] = useState([])
  const [sevFilter, setSevFilter] = useState([])
  const [query, setQuery] = useState('')

  const toggle = (setter, v) =>
    setter((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]))

  const q = query.trim().toLowerCase()

  const visible = useMemo(
    () =>
      challenges
        .filter((c) => !personaFilter.length || personaFilter.includes(c.persona))
        .filter((c) => !themeFilter.length || themeFilter.includes(c.theme))
        .filter((c) => !sevFilter.length || sevFilter.includes(c.severity))
        .filter(
          (c) =>
            !q ||
            c.title.toLowerCase().includes(q) ||
            c.detail.toLowerCase().includes(q) ||
            c.evidence.toLowerCase().includes(q) ||
            c.id.toLowerCase() === q
        )
        .sort((a, b) => severityOrder.indexOf(a.severity) - severityOrder.indexOf(b.severity)),
    [personaFilter, themeFilter, sevFilter, query]
  )

  const isFiltered =
    personaFilter.length > 0 || themeFilter.length > 0 || sevFilter.length > 0 || Boolean(q)
  const counts = severityOrder.map((s) => ({
    s,
    n: challenges.filter((c) => c.severity === s).length,
  }))

  return (
    <div className="page">
      <div className="section-head">
        <div className="eyebrow">Current-state challenges</div>
        <h2>{challenges.length} friction points, every one traced to a source.</h2>
        <p>
          Each challenge carries its evidence — a quote from the SME session, an annotation from the AS-IS
          diagrams, or a friction point from the service blueprint — and links to the capabilities it
          degrades.
        </p>
      </div>

      <div className="split">
        <aside className="rail">
          <h3>Filters</h3>
          <input
            className="search-input"
            type="search"
            placeholder="Search challenges…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search challenges"
          />

          <div className="rail-group">
            <h4>Persona</h4>
            {personas.map((p) => (
              <label key={p.id} className="check">
                <input
                  type="checkbox"
                  checked={personaFilter.includes(p.id)}
                  onChange={() => toggle(setPersonaFilter, p.id)}
                />
                <span>
                  {p.name.split(' ')[0]} · {p.role}
                </span>
              </label>
            ))}
          </div>

          <div className="rail-group">
            <h4>Theme</h4>
            {themes.map((t) => (
              <label key={t.id} className="check">
                <input
                  type="checkbox"
                  checked={themeFilter.includes(t.id)}
                  onChange={() => toggle(setThemeFilter, t.id)}
                />
                <span>
                  {t.id} · {t.name}
                </span>
              </label>
            ))}
          </div>

          <div className="rail-group">
            <h4>Severity</h4>
            {severityOrder.map((s) => (
              <label key={s} className="check">
                <input
                  type="checkbox"
                  checked={sevFilter.includes(s)}
                  onChange={() => toggle(setSevFilter, s)}
                />
                <span>{s}</span>
              </label>
            ))}
          </div>

          {isFiltered && (
            <button
              className="rail-clear"
              onClick={() => {
                setPersonaFilter([])
                setThemeFilter([])
                setSevFilter([])
                setQuery('')
              }}
            >
              Clear all filters
            </button>
          )}
        </aside>

        <div>
          <div className="summary-grid">
            {counts.map(({ s, n }) => (
              <div className="stat" key={s} style={{ borderTop: `3px solid ${severityColour[s]}` }}>
                <div className="n">{n}</div>
                <div className="l">{s}</div>
              </div>
            ))}
            <div className="stat" style={{ borderTop: '3px solid var(--raa-ink)' }}>
              <div className="n">{visible.length}</div>
              <div className="l">Showing</div>
            </div>
          </div>

          {visible.length === 0 ? (
            <div className="empty">No challenges match those filters.</div>
          ) : (
            <div className="chal-list">
              {visible.map((c) => {
                const p = personas.find((x) => x.id === c.persona)
                const t = themes.find((x) => x.id === c.theme)
                return (
                  <article
                    className="chal"
                    key={c.id}
                    style={{ borderLeftColor: severityColour[c.severity] }}
                  >
                    <div className="chal-top">
                      <span className="chal-id">{c.id}</span>
                      <span className="badge" style={{ background: severityColour[c.severity] }}>
                        {c.severity}
                      </span>
                      <span className="badge-outline" style={{ color: t.colour }}>
                        {t.id} · {t.name}
                      </span>
                      <span style={{ fontSize: 12, color: 'var(--grey-500)', fontWeight: 600 }}>
                        {p.emoji} {p.name.split(' ')[0]} · {p.role}
                      </span>
                      <h3>{c.title}</h3>
                    </div>
                    <p className="detail">{c.detail}</p>
                    <blockquote>{c.evidence}</blockquote>
                    <div className="srcline">Source: {c.source}</div>
                    <div className="caplinks">
                      {c.caps.map((id) => (
                        <span className="caplink" key={id}>
                          {id}
                        </span>
                      ))}
                    </div>
                  </article>
                )
              })}
            </div>
          )}

          <div className="section-head" style={{ paddingTop: 46 }}>
            <div className="eyebrow">Cross-cutting themes</div>
            <h2 style={{ fontSize: 24 }}>Seven patterns behind the {challenges.length} challenges.</h2>
          </div>
          <div className="iv-grid">
            {themes.map((t) => {
              const n = challenges.filter((c) => c.theme === t.id).length
              return (
                <div className="iv" key={t.id} style={{ borderTop: `3px solid ${t.colour}` }}>
                  <div className="iv-top">
                    <span className="badge" style={{ background: t.colour }}>
                      {t.id}
                    </span>
                    <h4>{t.name}</h4>
                  </div>
                  <p>{t.desc}</p>
                  <div style={{ marginTop: 11, fontSize: 11, fontWeight: 800, color: 'var(--grey-500)' }}>
                    {n} CHALLENGE{n === 1 ? '' : 'S'}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
