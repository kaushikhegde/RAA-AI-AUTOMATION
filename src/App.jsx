import React, { useEffect, useState } from 'react'
import Personas from './components/Personas.jsx'
import CapabilityMap from './components/CapabilityMap.jsx'
import Challenges from './components/Challenges.jsx'
import Processes from './components/Processes.jsx'
import Opportunities from './components/Opportunities.jsx'
import Metrics from './components/Metrics.jsx'
import Login from './components/Login.jsx'
import { personas } from './data/personas.js'
import { challenges } from './data/challenges.js'
import { allCaps } from './data/capabilities.js'
import { processes } from './data/processes.js'
import { opportunities } from './data/opportunities.js'
import { metricThemes } from './data/metrics.js'

const TABS = [
  { id: 'personas', label: 'Personas', count: personas.length },
  { id: 'process', label: 'Process', count: processes.length },
  { id: 'capabilities', label: 'Capabilities', count: allCaps.length },
  { id: 'challenges', label: 'Challenges', count: challenges.length },
  { id: 'opportunities', label: 'Opportunities', count: opportunities.length },
  { id: 'metrics', label: 'Metrics', count: metricThemes.length },
]

// Tab state lives in the URL hash (#capabilities, #personas/journeys, #process/pay-bpay)
// so every view is linkable.
const DEFAULTS = { tab: 'personas', personaView: 'overview', processId: processes[0].id }

function readHash() {
  const [t, v] = window.location.hash.replace(/^#/, '').split('/')
  return {
    tab: TABS.some((x) => x.id === t) ? t : DEFAULTS.tab,
    personaView: v === 'journeys' ? 'journeys' : DEFAULTS.personaView,
    processId: processes.some((p) => p.id === v) ? v : DEFAULTS.processId,
  }
}

const AUTH_KEY = 'raa-guide-signed-in'

export default function App() {
  // Session-scoped so the branded sign-in screen shows again on a fresh browser session.
  const [signedIn, setSignedIn] = useState(
    () => typeof window !== 'undefined' && window.sessionStorage?.getItem(AUTH_KEY) === 'yes'
  )

  const initial = typeof window === 'undefined' ? DEFAULTS : readHash()
  const [tab, setTab] = useState(initial.tab)
  const [personaView, setPersonaView] = useState(initial.personaView)
  const [processId, setProcessId] = useState(initial.processId)

  useEffect(() => {
    const onHash = () => {
      const next = readHash()
      setTab(next.tab)
      setPersonaView(next.personaView)
      setProcessId(next.processId)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    let next = `#${tab}`
    if (tab === 'personas') next = `#personas/${personaView}`
    if (tab === 'process') next = `#process/${processId}`
    if (window.location.hash !== next) window.history.replaceState(null, '', next)
  }, [tab, personaView, processId])

  const signIn = () => {
    window.sessionStorage?.setItem(AUTH_KEY, 'yes')
    setSignedIn(true)
  }

  const signOut = () => {
    window.sessionStorage?.removeItem(AUTH_KEY)
    setSignedIn(false)
  }

  if (!signedIn) return <Login onSignIn={signIn} />

  return (
    <>
      <header className="app-header">
        <div className="header-main">
          <span className="raa-logo" aria-label="RAA">
            RAA
          </span>
          <span className="header-divider" aria-hidden="true" />
          <div className="header-titles">
            <h1>Travel Booking &amp; Payments — Solution Guide</h1>
            <div className="kicker">Personas · Process · Capabilities · Challenges · Opportunities · Metrics</div>
          </div>

          <span className="count-pill">
            <span className="dot" />
            {allCaps.length} capabilities
          </span>

          <div className="header-actions">
            <span className="count-pill" title="Current state, as documented">
              Current state
            </span>
            <button className="btn-ghost" onClick={signOut}>
              ⇥ Sign out
            </button>
          </div>
        </div>

        <nav className="tabbar">
          <div className="tabbar-inner" role="tablist" aria-label="Sections">
            {TABS.map((t) => (
              <button
                key={t.id}
                className="tab"
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
              >
                {t.label}
                <span className="tab-count">{t.count}</span>
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main>
        {tab === 'personas' && <Personas view={personaView} onViewChange={setPersonaView} />}
        {tab === 'process' && <Processes activeId={processId} onSelect={setProcessId} />}
        {tab === 'capabilities' && <CapabilityMap />}
        {tab === 'challenges' && <Challenges />}
        {tab === 'opportunities' && <Opportunities />}
        {tab === 'metrics' && <Metrics />}
      </main>

      <footer className="app-footer">
        <div className="inner">
          <span>
            <strong style={{ color: 'var(--raa-ink)' }}>RAA Travel</strong> — current-state analysis
          </span>
          <span>
            Sources: booking proccess.pdf (AS-IS pack v0.3, 23-Feb-2026) · proccess challenge.pdf
            (service blueprint) · Tramada demo.docx (SME session)
          </span>
          <span>Brand palette sampled from raa.com.au</span>
        </div>
      </footer>
    </>
  )
}
