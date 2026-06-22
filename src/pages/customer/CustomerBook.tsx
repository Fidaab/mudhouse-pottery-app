import { PageHeader } from '../../components/PageHeader'
import { useLocation } from '../../context/LocationContext'
import { CalendarDays, ExternalLink, Phone } from 'lucide-react'

export function CustomerBook() {
  const { locationName } = useLocation()

  return (
    <div>
      <PageHeader title="Book a Session" />
      <p className="text-muted mb-8">at Mudhouse {locationName}</p>

      <div className="info-banner mb-8">
        <p><strong>Walk-ins always welcome!</strong> No appointment needed. Just call ahead for large groups.</p>
      </div>

      <div className="card" style={{ textAlign: 'center', padding: '24px 16px' }}>
        <CalendarDays size={40} color="var(--primary)" style={{ marginBottom: '12px' }} />
        <h2 className="page-subtitle" style={{ marginBottom: '8px' }}>Request a Booking</h2>
        <p className="text-muted" style={{ marginBottom: '20px' }}>
          Reserve your spot for open paint, parties, events, or summer camps.
        </p>
        <a
          href="https://mudhousepottery.com/pottery-painting-issaquah/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          style={{ textDecoration: 'none', display: 'inline-flex' }}
        >
          Reserve on Our Website <ExternalLink size={16} />
        </a>
      </div>

      <div className="card mt-16">
        <h3 style={{ fontSize: '16px', marginBottom: '12px', color: 'var(--primary)', fontFamily: 'Rum Raisin, sans-serif', fontWeight: 400 }}>What We Offer</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '18px' }}>🎨</span>
            <div>
              <strong style={{ fontSize: '14px' }}>Open Paint</strong>
              <p className="text-muted" style={{ fontSize: '13px' }}>Drop in anytime, no reservation needed</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '18px' }}>🎂</span>
            <div>
              <strong style={{ fontSize: '14px' }}>Kids' Painting Parties</strong>
              <p className="text-muted" style={{ fontSize: '13px' }}>Perfect for birthdays</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '18px' }}>🥂</span>
            <div>
              <strong style={{ fontSize: '14px' }}>Adult Events and Parties</strong>
              <p className="text-muted" style={{ fontSize: '13px' }}>Showers, girls night, celebrations</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '18px' }}>🏢</span>
            <div>
              <strong style={{ fontSize: '14px' }}>Corporate Team Building</strong>
              <p className="text-muted" style={{ fontSize: '13px' }}>Facilitated creative sessions</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '18px' }}>☀️</span>
            <div>
              <strong style={{ fontSize: '14px' }}>Summer Camps</strong>
              <p className="text-muted" style={{ fontSize: '13px' }}>Weekly sessions, ages 6 to 12</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-16" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Phone size={20} color="var(--accent)" />
        <div>
          <strong style={{ fontSize: '14px' }}>Prefer to call?</strong>
          <p><a href="tel:425-677-7334" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>425-677-7334</a></p>
        </div>
      </div>
    </div>
  )
}
