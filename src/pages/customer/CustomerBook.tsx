import { useState } from 'react'
import { timeSlots, partyPackages } from '../../data/store'
import { useLocation } from '../../context/LocationContext'
import { PageHeader } from '../../components/PageHeader'
import { format, parseISO } from 'date-fns'
import { Calendar, PartyPopper } from 'lucide-react'

type BookingMode = 'select' | 'walkin' | 'party'

export function CustomerBook() {
  const { location, locationName } = useLocation()
  const [mode, setMode] = useState<BookingMode>('select')
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [booked, setBooked] = useState(false)

  const locationSlots = timeSlots.filter(s => s.location === location)

  if (booked) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 0' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
        <h2 className="page-title" style={{ color: 'var(--primary)' }}>Booking Confirmed!</h2>
        <p className="text-muted mt-8">
          See you at Mudhouse {locationName}!<br />
          You will receive a confirmation shortly.
        </p>
        <button className="btn btn-primary mt-16" onClick={() => { setBooked(false); setMode('select') }}>
          Book Another
        </button>
      </div>
    )
  }

  if (mode === 'select') {
    return (
      <div>
        <PageHeader title="Book a Session" />
        <p className="text-muted mb-8">at Mudhouse {locationName}</p>

        <div className="info-banner mb-8">
          <p><strong>Walk-ins always welcome!</strong> Booking is optional but guarantees your spot.</p>
        </div>

        <div className="feature-card" onClick={() => setMode('walkin')} style={{ cursor: 'pointer' }}>
          <div className="icon-circle teal">
            <Calendar size={22} />
          </div>
          <div>
            <strong>Reserve a Time Slot</strong>
            <p className="text-muted" style={{ fontSize: '13px' }}>Guarantee your spot for 1 to 4 people</p>
          </div>
        </div>

        <div className="feature-card" onClick={() => setMode('party')} style={{ cursor: 'pointer' }}>
          <div className="icon-circle coral">
            <PartyPopper size={22} />
          </div>
          <div>
            <strong>Parties and Events</strong>
            <p className="text-muted" style={{ fontSize: '13px' }}>Kids' parties, adult events, team building, camps</p>
          </div>
        </div>
      </div>
    )
  }

  if (mode === 'party') {
    return (
      <div>
        <PageHeader title="Parties and Events" />
        <button className="btn btn-secondary mb-8" onClick={() => { setMode('select'); setSelectedPackage(null) }}>← Back to options</button>
        <p className="text-muted mb-8">at Mudhouse {locationName}</p>
        {partyPackages.map(pkg => (
          <div
            key={pkg.id}
            className="card"
            onClick={() => setSelectedPackage(pkg.id)}
            style={{ cursor: 'pointer', border: selectedPackage === pkg.id ? '2px solid var(--accent)' : undefined }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '28px' }}>{pkg.icon}</span>
              <div style={{ flex: 1 }}>
                <strong>{pkg.name}</strong>
                <p className="text-muted" style={{ fontSize: '13px' }}>{pkg.description}</p>
              </div>
              <span style={{ fontWeight: 700, color: 'var(--accent)', fontSize: '13px' }}>{pkg.price}</span>
            </div>
          </div>
        ))}
        {selectedPackage && (
          <div className="mt-16">
            <h2 className="page-subtitle">Request This Package</h2>
            <div className="form-group">
              <label>Guest Count</label>
              <input type="number" min="2" max="30" defaultValue="8" />
            </div>
            <div className="form-group">
              <label>Preferred Date</label>
              <input type="date" />
            </div>
            <div className="form-group">
              <label>Contact Name</label>
              <input type="text" placeholder="Your name" />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" placeholder="425-555-0000" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="you@email.com" />
            </div>
            <div className="form-group">
              <label>Special Requests (optional)</label>
              <textarea rows={3} placeholder="Theme, dietary needs, etc." style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '16px', fontFamily: 'Open Sans, sans-serif', resize: 'vertical' }}></textarea>
            </div>
            <button className="btn btn-accent" onClick={() => setBooked(true)}>
              Request Party Booking
            </button>
            <p className="text-muted mt-8" style={{ textAlign: 'center', fontSize: '12px' }}>
              We will confirm availability within 24 hours
            </p>
          </div>
        )}
      </div>
    )
  }

  // Walk-in / reserve mode
  return (
    <div>
      <PageHeader title="Reserve a Spot" />
      <button className="btn btn-secondary mb-8" onClick={() => { setMode('select'); setSelectedSlot(null) }}>← Back to options</button>
      <p className="text-muted mb-8">Mudhouse {locationName}</p>
      {locationSlots.map(slot => {
        const full = slot.spotsAvailable === 0
        return (
          <div
            key={slot.id}
            className="card"
            onClick={() => !full && setSelectedSlot(slot.id)}
            style={{
              cursor: full ? 'not-allowed' : 'pointer',
              opacity: full ? 0.5 : 1,
              border: selectedSlot === slot.id ? '2px solid var(--primary)' : undefined,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{format(parseISO(slot.date), 'EEE, MMM d')}</strong>
                <p className="text-muted">{slot.time}</p>
              </div>
              <span className={full ? 'badge badge-accent' : 'badge badge-success'}>
                {full ? 'Full' : `${slot.spotsAvailable} spots open`}
              </span>
            </div>
          </div>
        )
      })}
      {selectedSlot && (
        <div className="mt-16">
          <h2 className="page-subtitle">Your Details</h2>
          <div className="form-group">
            <label>Number of Guests</label>
            <select defaultValue="2">
              <option value="1">1 person</option>
              <option value="2">2 people</option>
              <option value="3">3 people</option>
              <option value="4">4 people</option>
            </select>
          </div>
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="Your name" />
          </div>
          <div className="form-group">
            <label>Phone or Email</label>
            <input type="text" placeholder="For confirmation" />
          </div>
          <button className="btn btn-primary" onClick={() => setBooked(true)}>
            Confirm Reservation
          </button>
        </div>
      )}
    </div>
  )
}
