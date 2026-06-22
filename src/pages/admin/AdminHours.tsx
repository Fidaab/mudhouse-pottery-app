import { useState } from 'react'
import type { Location } from '../../data/store'
import { Save } from 'lucide-react'

interface AdminHoursProps {
  location: Location
}

interface HoursData {
  [key: string]: { open: string; close: string; closed: boolean }
}

const defaultHours: HoursData = {
  Monday: { open: '', close: '', closed: true },
  Tuesday: { open: '10:00', close: '20:00', closed: false },
  Wednesday: { open: '10:00', close: '20:00', closed: false },
  Thursday: { open: '10:00', close: '20:00', closed: false },
  Friday: { open: '10:00', close: '20:00', closed: false },
  Saturday: { open: '10:00', close: '20:00', closed: false },
  Sunday: { open: '11:00', close: '17:00', closed: false },
}

export function AdminHours({ location }: AdminHoursProps) {
  const [hours, setHours] = useState<HoursData>(defaultHours)
  const [saved, setSaved] = useState(false)

  const locationName = location === 'issaquah' ? 'Issaquah' : 'Bothell'

  function updateDay(day: string, field: 'open' | 'close' | 'closed', value: string | boolean) {
    setHours(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }))
    setSaved(false)
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div>
      <p className="text-muted mb-8">Store hours for {locationName}. Changes show immediately to customers.</p>

      {Object.entries(hours).map(([day, data]) => (
        <div key={day} className="card" style={{ padding: '12px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <strong style={{ width: '90px', fontSize: '14px' }}>{day}</strong>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={data.closed}
                  onChange={e => updateDay(day, 'closed', e.target.checked)}
                  style={{ width: '16px', height: '16px' }}
                />
                Closed
              </label>
            </div>
            {!data.closed && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input
                  type="time"
                  value={data.open}
                  onChange={e => updateDay(day, 'open', e.target.value)}
                  style={{ padding: '4px 8px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '13px' }}
                />
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>to</span>
                <input
                  type="time"
                  value={data.close}
                  onChange={e => updateDay(day, 'close', e.target.value)}
                  style={{ padding: '4px 8px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '13px' }}
                />
              </div>
            )}
          </div>
        </div>
      ))}

      <button className="btn btn-primary mt-16" onClick={handleSave}>
        <Save size={16} /> Save Hours
      </button>
      {saved && (
        <p style={{ color: 'var(--success)', textAlign: 'center', marginTop: '8px', fontSize: '14px', fontWeight: 600 }}>
          ✓ Hours saved successfully
        </p>
      )}
    </div>
  )
}
