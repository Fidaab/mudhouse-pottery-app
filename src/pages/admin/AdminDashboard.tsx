import { useState, useEffect } from 'react'
import { getPieces, updatePieceStatus, getInventory, getBookings } from '../../lib/db'
import type { DbPiece, DbInventoryItem, DbBooking } from '../../lib/db'
import type { Location } from '../../data/store'
import { AdminHours } from './AdminHours'
import { AdminGallery } from './AdminGallery'
import { AdminNotes } from './AdminNotes'
import { LogOut, MapPin, RefreshCw } from 'lucide-react'

type AdminTab = 'pieces' | 'bookings' | 'inventory' | 'hours' | 'gallery' | 'notes'

const statusOrder: DbPiece['status'][] = ['painting', 'drying', 'glazing', 'firing', 'ready', 'picked-up']

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = { painting: 'In Studio', drying: 'Drying', glazing: 'Being Glazed', firing: 'In the Kiln', ready: 'Ready for Pickup!', 'picked-up': 'Picked Up' }
  return labels[status] || status
}

interface AdminDashboardProps {
  onLogout: () => void
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [tab, setTab] = useState<AdminTab>('pieces')
  const [location, setLocation] = useState<Location>('issaquah')
  const [pieces, setPieces] = useState<DbPiece[]>([])
  const [inventoryItems, setInventoryItems] = useState<DbInventoryItem[]>([])
  const [bookings, setBookings] = useState<DbBooking[]>([])
  const [loading, setLoading] = useState(true)

  const locationName = location === 'issaquah' ? 'Issaquah' : 'Bothell'

  async function loadData() {
    setLoading(true)
    try {
      const [p, inv, b] = await Promise.all([
        getPieces(location),
        getInventory(location),
        getBookings(location),
      ])
      setPieces(p)
      setInventoryItems(inv)
      setBookings(b)
    } catch (err) {
      console.error('Failed to load data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadData() }, [location])

  async function handleAdvanceStatus(id: string, currentStatus: DbPiece['status']) {
    const idx = statusOrder.indexOf(currentStatus)
    if (idx >= statusOrder.length - 1) return
    const newStatus = statusOrder[idx + 1]
    try {
      await updatePieceStatus(id, newStatus)
      setPieces(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p))
    } catch (err) {
      console.error('Failed to update status:', err)
    }
  }

  const tabs: { id: AdminTab; label: string }[] = [
    { id: 'pieces', label: 'Pieces' },
    { id: 'bookings', label: 'Bookings' },
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
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={loadData} style={{ display: 'flex', alignItems: 'center', padding: '8px', border: 'none', background: 'var(--bg)', borderRadius: '8px', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <RefreshCw size={16} />
          </button>
          <button onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 12px', border: 'none', background: 'var(--bg)', borderRadius: '8px', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '13px' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {/* Location toggle */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', marginBottom: '16px' }}>
        <MapPin size={16} color="var(--primary)" />
        <span style={{ fontSize: '13px', fontWeight: 600 }}>Store:</span>
        <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
          <button onClick={() => setLocation('issaquah')} className={location === 'issaquah' ? 'location-btn active' : 'location-btn'}>Issaquah</button>
          <button onClick={() => setLocation('bothell')} className={location === 'bothell' ? 'location-btn active' : 'location-btn'}>Bothell</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: tab === t.id ? 'var(--primary)' : 'var(--card)', color: tab === t.id ? 'white' : 'var(--text)', fontWeight: 600, fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading && <p className="text-muted">Loading...</p>}

      {/* Pieces tab */}
      {!loading && tab === 'pieces' && (
        <div>
          <p className="text-muted mb-8">{pieces.length} pieces at {locationName}. Tap status to change it.</p>
          {pieces.map(piece => (
            <div key={piece.id} className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '28px' }}>{piece.image}</span>
                <div style={{ flex: 1 }}>
                  <strong>{piece.name}</strong>
                  <p className="text-muted" style={{ fontSize: '12px' }}>{piece.customer_name} | {piece.order_code}</p>
                </div>
                {piece.status !== 'picked-up' && (
                  <button
                    onClick={() => handleAdvanceStatus(piece.id, piece.status)}
                    style={{ padding: '8px 12px', borderRadius: '6px', border: 'none', background: piece.status === 'ready' ? 'var(--success)' : 'var(--primary)', color: 'white', fontSize: '11px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}
                  >
                    {piece.status === 'ready' ? 'Picked Up' : 'Advance \u2192'}
                  </button>
                )}
              </div>
              {/* Status selector - allows setting back to any status */}
              <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Status:</span>
                <select
                  value={piece.status}
                  onChange={async (e) => {
                    const newStatus = e.target.value as DbPiece['status']
                    try {
                      await updatePieceStatus(piece.id, newStatus)
                      setPieces(prev => prev.map(p => p.id === piece.id ? { ...p, status: newStatus } : p))
                    } catch (err) {
                      console.error('Failed to update status:', err)
                    }
                  }}
                  style={{ padding: '6px 10px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '13px', background: 'white', flex: 1 }}
                >
                  {statusOrder.map(s => (
                    <option key={s} value={s}>{getStatusLabel(s)}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bookings tab */}
      {!loading && tab === 'bookings' && (
        <div>
          <p className="text-muted mb-8">{bookings.length} bookings at {locationName}</p>
          {bookings.length === 0 && <div className="card"><p className="text-muted" style={{ textAlign: 'center' }}>No bookings yet</p></div>}
          {bookings.map(booking => (
            <div key={booking.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>{booking.customer_name}</strong>
                  <p className="text-muted" style={{ fontSize: '12px' }}>{booking.slot_date} at {booking.slot_time}</p>
                  <p className="text-muted" style={{ fontSize: '12px' }}>{booking.booking_type} | {booking.guest_count} guests</p>
                </div>
                <span className="badge badge-success">{booking.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Inventory tab */}
      {!loading && tab === 'inventory' && (
        <div>
          <p className="text-muted mb-8">Stock at {locationName}</p>
          {inventoryItems.map(item => {
            const low = item.stock <= item.reorder_at
            return (
              <div key={item.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>{item.name}</strong>
                    <p className="text-muted" style={{ fontSize: '12px' }}>Reorder at: {item.reorder_at} {item.unit}</p>
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

      {tab === 'hours' && <AdminHours location={location} />}
      {tab === 'gallery' && <AdminGallery />}
      {tab === 'notes' && <AdminNotes location={location} />}
    </div>
  )
}
