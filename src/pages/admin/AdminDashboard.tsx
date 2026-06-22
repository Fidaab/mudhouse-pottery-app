import { useState } from 'react'
import { pieces, getStatusLabel, getStatusColor, timeSlots, inventory } from '../../data/store'
import type { PieceStatus, Location } from '../../data/store'
import { AdminHours } from './AdminHours'
import { AdminGallery } from './AdminGallery'
import { AdminNotes } from './AdminNotes'
import { LogOut, MapPin } from 'lucide-react'

type AdminTab = 'pieces' | 'slots' | 'inventory' | 'hours' | 'gallery' | 'notes'

const statusOrder: PieceStatus['status'][] = ['painting', 'drying', 'glazing', 'firing', 'ready', 'picked-up']

interface AdminDashboardProps {
  onLogout: () => void
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [tab, setTab] = useState<AdminTab>('pieces')
  const [location, setLocation] = useState<Location>('issaquah')
  const [adminPieces, setAdminPieces] = useState(pieces)

  const locationName = location === 'issaquah' ? 'Issaquah' : 'Bothell'
  const filteredPieces = adminPieces.filter(p => p.location === location)
  const filteredSlots = timeSlots.filter(s => s.location === location)
  const filteredInventory = inventory.filter(i => i.location === location)

  function advanceStatus(id: string) {
    setAdminPieces(prev => prev.map(p => {
      if (p.id !== id) return p
      const idx = statusOrder.indexOf(p.status)
      if (idx < statusOrder.length - 1) {
        return { ...p, status: statusOrder[idx + 1] }
      }
      return p
    }))
  }

  const tabs: { id: AdminTab; label: string }[] = [
    { id: 'pieces', label: 'Pieces' },
    { id: 'slots', label: 'Bookings' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'hours', label: 'Hours' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'notes', label: 'Notes' },
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h1 className="page-title" style={{ marginBottom: '0' }}>Admin Panel</h1>
          <p className="text-muted" style={{ fontSize: '12px' }}>Mudhouse Pottery Studio</p>
        </div>
        <button
          onClick={onLogout}
          style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 12px', border: 'none', background: 'var(--bg)', borderRadius: '8px', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '13px' }}
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      {/* Location toggle */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', marginBottom: '16px' }}>
        <MapPin size={16} color="var(--primary)" />
        <span style={{ fontSize: '13px', fontWeight: 600 }}>Store:</span>
        <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
          <button
            onClick={() => setLocation('issaquah')}
            className={location === 'issaquah' ? 'location-btn active' : 'location-btn'}
          >
            Issaquah
          </button>
          <button
            onClick={() => setLocation('bothell')}
            className={location === 'bothell' ? 'location-btn active' : 'location-btn'}
          >
            Bothell
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: 'none',
              background: tab === t.id ? 'var(--primary)' : 'var(--card)',
              color: tab === t.id ? 'white' : 'var(--text)',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: tab === t.id ? 'none' : '0 1px 2px rgba(0,0,0,0.05)',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Pieces tab */}
      {tab === 'pieces' && (
        <div>
          <p className="text-muted mb-8">
            {filteredPieces.length} pieces at {locationName}. Tap "Advance" to move to next stage.
          </p>
          {filteredPieces.map(piece => (
            <div key={piece.id} className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '28px' }}>{piece.image}</span>
                <div style={{ flex: 1 }}>
                  <strong>{piece.name}</strong>
                  <p className="text-muted" style={{ fontSize: '12px' }}>
                    {piece.customerName} | {piece.orderCode}
                  </p>
                  <span className={`badge ${getStatusColor(piece.status)}`} style={{ marginTop: '4px' }}>
                    {getStatusLabel(piece.status)}
                  </span>
                </div>
                {piece.status !== 'picked-up' && (
                  <button
                    onClick={() => advanceStatus(piece.id)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      background: piece.status === 'ready' ? 'var(--success)' : 'var(--primary)',
                      color: 'white',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {piece.status === 'ready' ? 'Mark Picked Up' : 'Advance \u2192'}
                  </button>
                )}
                {piece.status === 'picked-up' && (
                  <span className="badge badge-neutral">Complete</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Slots tab */}
      {tab === 'slots' && (
        <div>
          <p className="text-muted mb-8">Booking slots at {locationName}</p>
          {filteredSlots.map(slot => (
            <div key={slot.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>{slot.time}</strong>
                  <p className="text-muted" style={{ fontSize: '12px' }}>{slot.date}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <strong style={{ color: slot.spotsAvailable === 0 ? 'var(--danger)' : 'var(--text)' }}>
                    {slot.maxSpots - slot.spotsAvailable}
                  </strong>
                  <span className="text-muted"> / {slot.maxSpots} booked</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Inventory tab */}
      {tab === 'inventory' && (
        <div>
          <p className="text-muted mb-8">Stock at {locationName}</p>
          {filteredInventory.map(item => {
            const low = item.stock <= item.reorderAt
            return (
              <div key={item.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>{item.name}</strong>
                    <p className="text-muted" style={{ fontSize: '12px' }}>
                      Reorder at: {item.reorderAt} {item.unit}
                    </p>
                  </div>
                  <span className={`badge ${low ? 'badge-warning' : 'badge-success'}`}>
                    {low ? '\u26a0\ufe0f ' : ''}{item.stock} {item.unit}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Hours tab */}
      {tab === 'hours' && <AdminHours location={location} />}

      {/* Gallery tab */}
      {tab === 'gallery' && <AdminGallery />}

      {/* Notes tab */}
      {tab === 'notes' && <AdminNotes location={location} />}
    </div>
  )
}
