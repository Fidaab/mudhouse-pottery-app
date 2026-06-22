import { useState } from 'react'

interface AdminLoginProps {
  onLogin: () => void
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)

  // Simple PIN auth (in production, use proper auth)
  const ADMIN_PIN = '1234'

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (pin === ADMIN_PIN) {
      onLogin()
    } else {
      setError(true)
      setPin('')
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <img src="/mudhouse-logo.png" alt="Mudhouse Pottery" style={{ width: '140px', height: 'auto', marginBottom: '16px' }} />
        <h1 className="page-title" style={{ marginTop: '8px' }}>Staff Login</h1>
        <p className="text-muted">Mudhouse Pottery Studio</p>
      </div>

      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '320px' }}>
        <div className="form-group">
          <label>Enter Staff PIN</label>
          <input
            type="password"
            inputMode="numeric"
            maxLength={4}
            placeholder="****"
            value={pin}
            onChange={e => { setPin(e.target.value); setError(false) }}
            style={{ textAlign: 'center', fontSize: '24px', letterSpacing: '8px' }}
            autoFocus
          />
        </div>
        {error && (
          <p style={{ color: 'var(--danger)', fontSize: '13px', textAlign: 'center', marginBottom: '12px' }}>
            Incorrect PIN. Try again.
          </p>
        )}
        <button type="submit" className="btn btn-primary">
          Log In
        </button>
      </form>
    </div>
  )
}
