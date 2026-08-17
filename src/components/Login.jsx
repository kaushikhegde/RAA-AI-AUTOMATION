import React, { useState } from 'react'
import loginImage from '../assets/raa-login.jpg'

// NOTE: this is a presentation gate, not security. The credentials below ship in the client
// bundle and anyone can read them in devtools. It exists so the guide opens on a branded screen
// during a demo — do not put anything genuinely confidential behind it.
export const DEMO_EMAIL = 'user@raa.demo'
export const DEMO_PASSWORD = '123456'

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 6 10-6" />
  </svg>
)

const LockIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="10" width="16" height="11" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
)

const EyeIcon = ({ off }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1.5 12S5 5.5 12 5.5 22.5 12 22.5 12 19 18.5 12 18.5 1.5 12 1.5 12Z" />
    <circle cx="12" cy="12" r="3" />
    {off && <path d="m3 3 18 18" />}
  </svg>
)

export default function Login({ onSignIn }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [reveal, setReveal] = useState(false)
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setError('')
      onSignIn()
    } else {
      setError('That email and password combination is not recognised.')
    }
  }

  return (
    <div className="login">
      <aside className="login-brand">
        <div className="login-brand-inner">
          <span className="raa-logo login-logo" aria-label="RAA">
            RAA
          </span>

          <div className="login-eyebrow">RAA Travel · AI Proof of Concepts</div>
          <h1>Travel Payments, Receipts &amp; Reconciliation Solution Guide</h1>
          <p className="login-blurb">
            Personas, processes, capabilities, challenges and opportunities for Travel payments, receipts and reconciliation
            current-state analysis.
          </p>

          <figure className="login-figure">
            <img src={loginImage} alt="" />
          </figure>
        </div>
        <footer className="login-brand-foot">© 2026 RAA · raa.com.au</footer>
      </aside>

      <main className="login-panel">
        <form className="login-form" onSubmit={submit} noValidate>
          <h2>Sign in to continue</h2>

          <label className="login-label" htmlFor="login-email">
            Email
          </label>
          <div className="login-field">
            <span className="login-field-icon">
              <MailIcon />
            </span>
            <input
              id="login-email"
              type="email"
              autoComplete="username"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          </div>

          <label className="login-label" htmlFor="login-password">
            Password
          </label>
          <div className="login-field">
            <span className="login-field-icon">
              <LockIcon />
            </span>
            <input
              id="login-password"
              type={reveal ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="login-reveal"
              onClick={() => setReveal((v) => !v)}
              aria-label={reveal ? 'Hide password' : 'Show password'}
            >
              <EyeIcon off={reveal} />
            </button>
          </div>

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="login-submit">
            Sign in <span aria-hidden="true">→</span>
          </button>

          <p className="login-hint">
            <strong>Demo access</strong>
            {DEMO_EMAIL} · {DEMO_PASSWORD}
          </p>
        </form>
      </main>
    </div>
  )
}
