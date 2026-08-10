import React, { useMemo, useState } from 'react'
import { domains, allCaps, groupCount } from '../data/capabilities.js'
import CapabilityDrawer from './CapabilityDrawer.jsx'

const ZOOMS = [0.75, 0.85, 1, 1.15]

export default function CapabilityMap() {
  const [query, setQuery] = useState('')
  const [domainFilter, setDomainFilter] = useState([])
  const [zoomIdx, setZoomIdx] = useState(2)
  const [selected, setSelected] = useState(null)

  const toggle = (setter, value) =>
    setter((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))

  const q = query.trim().toLowerCase()

  const matches = (cap) => {
    if (!q) return true
    return (
      cap.name.toLowerCase().includes(q) ||
      cap.id.includes(q) ||
      (cap.note || '').toLowerCase().includes(q) ||
      (cap.systems || []).some((s) => s.toLowerCase().includes(q))
    )
  }

  const visible = useMemo(
    () =>
      domains
        .filter((d) => !domainFilter.length || domainFilter.includes(d.id))
        .map((d) => ({
          ...d,
          groups: d.groups
            .map((g) => ({ ...g, caps: g.caps.filter(matches) }))
            .filter((g) => g.caps.length),
        }))
        .filter((d) => d.groups.length),
    [query, domainFilter]
  )

  const shown = visible.reduce((n, d) => n + d.groups.reduce((m, g) => m + g.caps.length, 0), 0)
  const isFiltered = Boolean(q) || domainFilter.length > 0

  return (
    <div className="page">
      <div className="section-head">
        <div className="eyebrow">Business capability map</div>
        <h2>What RAA Travel does, and where the effort goes.</h2>
        <p>
          {allCaps.length} capabilities across {domains.length} domains, derived from the AS-IS process
          pack, the current-state service blueprint, the SME session and the two Tramada Finance AI
          workshops of July 2026. Select any capability to see the systems it runs on, the personas it
          affects and the challenges recorded against it.
        </p>
      </div>

      <div className="split">
        <aside className="rail">
          <h3>Filters</h3>
          <input
            className="search-input"
            type="search"
            placeholder="Search capabilities…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search capabilities"
          />

          <div className="rail-group">
            <h4>Domain</h4>
            {domains.map((d) => (
              <label key={d.id} className="check">
                <input
                  type="checkbox"
                  checked={domainFilter.includes(d.id)}
                  onChange={() => toggle(setDomainFilter, d.id)}
                />
                <span>
                  {d.id} {d.name}
                </span>
              </label>
            ))}
          </div>

          {isFiltered && (
            <button
              className="rail-clear"
              onClick={() => {
                setQuery('')
                setDomainFilter([])
              }}
            >
              Clear all filters
            </button>
          )}
        </aside>

        <div>
          <div className="toolbar">
            <span className="legend-label">
              {domains.length} domains · {groupCount} groups · {allCaps.length} capabilities
            </span>
            <div className="spacer" />
            <span style={{ fontSize: 12, color: 'var(--grey-500)', fontWeight: 600 }}>
              Showing {shown} of {allCaps.length}
            </span>
            <div className="zoom-btns">
              <button
                className="zoom-btn"
                onClick={() => setZoomIdx((i) => Math.max(0, i - 1))}
                aria-label="Zoom out"
                title="Zoom out"
              >
                −
              </button>
              <button
                className="zoom-btn"
                onClick={() => setZoomIdx((i) => Math.min(ZOOMS.length - 1, i + 1))}
                aria-label="Zoom in"
                title="Zoom in"
              >
                +
              </button>
            </div>
          </div>

          {visible.length === 0 ? (
            <div className="empty">No capabilities match those filters.</div>
          ) : (
            <div
              className="capmap"
              style={{
                zoom: ZOOMS[zoomIdx],
              }}
            >
              {visible.map((d) => (
                <section className="domain" key={d.id}>
                  <header className="domain-head">
                    <span className="num">{d.id}</span>
                    <h3>{d.name}</h3>
                    <p className="blurb">{d.blurb}</p>
                  </header>
                  <div className="group-grid">
                    {d.groups.map((g) => (
                      <div className="group" key={g.id}>
                        <div className="group-head">
                          <span className="gnum">{g.id}</span>
                          <span>{g.name}</span>
                        </div>
                        {g.caps.map((c) => (
                          <button
                            key={c.id}
                            className={`cap${selected?.id === c.id ? ' is-selected' : ''}`}
                            onClick={() =>
                              setSelected({ ...c, domainName: d.name, groupName: g.name, groupId: g.id })
                            }
                          >
                            <span className="cap-id">{c.id}</span>
                            <span className="cap-name">{c.name}</span>
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>

      {selected && <CapabilityDrawer cap={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
