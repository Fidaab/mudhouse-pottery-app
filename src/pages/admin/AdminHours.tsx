import { useState, useEffect } from 'react'
import { getStoreHours, updateStoreHours } from '../../lib/db'
import type { DbStoreHours } from '../../lib/db'
import type { Location } from '../../data/store'
import { Save } from 'lucide-react'

interface AdminHoursProps {
  location: Location
}

const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export function AdminHours({ location }: AdminHoursProps) {
  const [hours, setHours] = useState<DbStoreHours[]>([])
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)

  const locationName = location === 'issaquah' ? 'Issaquah' : 'Bothell'

  async function loadHours() {
    try {
      const data = await getStoreHours(location)
      setHours(data.sort((a, b) => dayOrder.indexOf(a.day_of_week) - dayOrder.indexOf(b.day_of_week)))
    } catch (err) {
      console.error('Failed to load hours:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { setLoading(true); loadHours() }, [location])

  async function handleUpdate(id: string, field: string, value: string | boolean) {
    try {
      const updates: Record<string, string | boolean | null> = { [field]: value }
      if (field === 'is_closed' && value === true) {
        updates.open_time = null
        updates.close_time = null
      }
      await updateStoreHours(id, updates)
      setHours(prev => prev.map(h => h.id === id ? { ...h, ...updates } as DbStoreHours : h))
      setSaved(false)
    } catch (err) {
      console.error('Failed to update hours:', err)
    }
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (loading) return <p className="text-muted">Loading hours...</p>

  return (
    <div>
      <p className="text-muted mb-8">Store hours for {locationName}. Changes update immediately for customers.</p>

      {hours.map(day => (
        <div key={day.id} className="card" style={{ padding: '12px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <strong style={{ width: '90px', fontSize: '14px' }}>{day.day_of_week}</strong>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={day.is_closed}
                  onChange={e => handleUpdate(day.id, 'is_closed', e.target.checked)}
                  style={{ width: '16px', height: '16px' }}
                />
                Closed
              </label>
            </div>
            {!day.is_closed && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input
                  type="time"
                  value={day.open_time || ''}
                  onChange={e => handleUpdate(day.id, 'open_time', e.target.value)}
                  style={{ padding: '4px 8px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '13px' }}
                />
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>to</span>
                <input
                  type="time"
                  value={day.close_time || ''}
                  onChange={e => handleUpdate(day.id, 'close_time', e.target.value)}
                  style={{ padding: '4px 8px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '13px' }}
                />
              </div>
            )}
          </div>
        </div>
      ))}

      <button className="btn btn-primary mt-16" onClick={handleSave}>
        <Save size={16} /> All Changes Saved
      </button>
      {saved && (
        <p style={{ color: 'var(--success)', textAlign: 'center', marginTop: '8px', fontSize: '14px', fontWeight: 600 }}>
          ✓ Hours are live for customers
        </p>
      )}
    </div>
  )
}
