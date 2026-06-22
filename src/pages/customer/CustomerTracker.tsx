import { useState } from 'react'
import { pieces, getStatusLabel, getStatusColor } from '../../data/store'
import { PageHeader } from '../../components/PageHeader'
import { Search } from 'lucide-react'

const statusOrder = ['painting', 'drying', 'glazing', 'firing', 'ready', 'picked-up'] as const

export function CustomerTracker() {
  const [lookupCode, setLookupCode] = useState('')
  const [results, setResults] = useState<typeof pieces>([])
  const [searched, setSearched] = useState(false)

  function handleSearch() {
    const code = lookupCode.trim().toUpperCase()
    if (!code) return
    const found = pieces.filter(p =>
      p.orderCode.toUpperCase().includes(code) ||
      p.customerPhone.includes(lookupCode.trim())
    )
    setResults(found)
    setSearched(true)
  }

  return (
    <div>
      <PageHeader title="Track My Piece" />
      <p className="text-muted mb-8">Your piece will be ready in about 10 days. Check the status below.</p>

      <div className="card">
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="Order code or phone number"
            value={lookupCode}
            onChange={e => setLookupCode(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            style={{
              flex: 1,
              padding: '12px',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              fontSize: '16px',
              background: 'white',
              fontFamily: 'Open Sans, sans-serif',
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              border: 'none',
              background: 'var(--accent)',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            <Search size={20} />
          </button>
        </div>
      </div>

      {searched && results.length === 0 && (
        <div className="card mt-16" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '32px', marginBottom: '8px' }}>🔍</p>
          <p className="text-muted">No pieces found. Double-check your order code and try again.</p>
          <p className="text-muted mt-8" style={{ fontSize: '12px' }}>
            Questions? Call us at <a href="tel:425-677-7334" style={{ color: 'var(--primary)' }}>425-677-7334</a>
          </p>
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-16">
          {results.map(piece => (
            <div key={piece.id} className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '32px' }}>{piece.image}</span>
                <div style={{ flex: 1 }}>
                  <strong>{piece.name}</strong>
                  <p className="text-muted" style={{ fontSize: '13px' }}>
                    Order: {piece.orderCode}
                  </p>
                  <p className="text-muted" style={{ fontSize: '12px' }}>
                    Dropped off: {piece.droppedOff}
                  </p>
                </div>
                <span className={`badge ${getStatusColor(piece.status)}`}>
                  {getStatusLabel(piece.status)}
                </span>
              </div>

              {/* Progress bar */}
              <div style={{ marginTop: '12px' }}>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '6px' }}>
                  {statusOrder.slice(0, 5).map(s => (
                    <div
                      key={s}
                      style={{
                        flex: 1,
                        height: '6px',
                        borderRadius: '3px',
                        background: statusOrder.indexOf(s) <= statusOrder.indexOf(piece.status)
                          ? 'var(--primary)'
                          : 'var(--border)',
                        transition: 'background 0.3s',
                      }}
                    />
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)' }}>
                  <span>Painted</span>
                  <span>Drying</span>
                  <span>Glazed</span>
                  <span>Fired</span>
                  <span>Ready!</span>
                </div>
                {piece.status !== 'ready' && piece.status !== 'picked-up' && (
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'right', marginTop: '8px' }}>
                    Estimated ready: {piece.estimatedReady}
                  </p>
                )}
                {piece.status === 'ready' && (
                  <div style={{ textAlign: 'center', marginTop: '12px', padding: '10px', background: 'var(--primary-light)', borderRadius: '8px' }}>
                    <p style={{ fontSize: '14px', color: 'var(--primary)', fontWeight: 600 }}>
                      🎉 Your piece is ready! Come pick it up.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="info-banner mt-16">
        <p>
          <strong>Tip:</strong> Your order code is on the tag attached to your piece
          when you drop it off. You can also search by phone number.
        </p>
      </div>
    </div>
  )
}
