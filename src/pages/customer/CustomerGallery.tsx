import { useState, useEffect } from 'react'
import { getGallery, type DbGalleryItem } from '../../lib/db'
import { PageHeader } from '../../components/PageHeader'

export function CustomerGallery() {
  const [items, setItems] = useState<DbGalleryItem[]>([])
  const [category, setCategory] = useState('All')
  const [difficulty, setDifficulty] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getGallery().then(data => {
      setItems(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const categories = ['All', ...new Set(items.map(i => i.category))]
  const difficulties = ['All', 'Easy', 'Medium', 'Advanced']

  const filtered = items.filter(item => {
    if (category !== 'All' && item.category !== category) return false
    if (difficulty !== 'All' && item.difficulty !== difficulty) return false
    return true
  })

  if (loading) {
    return <div><PageHeader title="Pick Your Piece" /><p className="text-muted">Loading gallery...</p></div>
  }

  return (
    <div>
      <PageHeader title="Pick Your Piece" />
      <p className="text-muted mb-8">
        Browse our collection and get inspired. Prices range from $22 to $65.
      </p>

      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '12px' }}>
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: 'none',
              background: category === c ? 'var(--primary)' : 'var(--card)',
              color: category === c ? 'white' : 'var(--text)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: category === c ? 'none' : '0 1px 2px rgba(55,45,48,0.06)',
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {difficulties.map(d => (
          <button
            key={d}
            onClick={() => setDifficulty(d)}
            style={{
              padding: '4px 10px',
              borderRadius: '12px',
              border: difficulty === d ? '2px solid var(--accent)' : '1px solid var(--border)',
              background: 'transparent',
              color: difficulty === d ? 'var(--accent)' : 'var(--text-muted)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="grid-2">
        {filtered.map(item => (
          <div key={item.id} className="card" style={{ textAlign: 'center', padding: '16px 8px' }}>
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>{item.image}</div>
            <strong style={{ fontSize: '14px', color: 'var(--text)' }}>{item.name}</strong>
            <p className="text-muted" style={{ fontSize: '12px', margin: '4px 0' }}>{item.description}</p>
            <span className={`badge ${item.difficulty === 'Easy' ? 'badge-success' : item.difficulty === 'Medium' ? 'badge-warning' : 'badge-accent'}`}>
              {item.difficulty}
            </span>
          </div>
        ))}
      </div>

      <div className="info-banner mt-16">
        <p>
          We supply stamps, stencils, and support.<br />
          <strong>No artistic talent required!</strong>
        </p>
      </div>
    </div>
  )
}
