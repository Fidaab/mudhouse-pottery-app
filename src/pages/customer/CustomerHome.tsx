import { CalendarDays, Palette, Clock, MapPin, Phone, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLocation } from '../../context/LocationContext'

export function CustomerHome() {
  const { location, setLocation, locationName } = useLocation()

  return (
    <div>
      {/* Hero with logo */}
      <div className="hero-header">
        <img
          src="/mudhouse-logo.png"
          alt="Mudhouse Pottery Studio"
          style={{ width: '180px', height: 'auto', marginBottom: '8px' }}
        />
        <p style={{ fontStyle: 'italic', fontSize: '13px' }}>A Contemporary Ceramic Painting Studio</p>
      </div>

      {/* Location selector */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px' }}>
        <MapPin size={18} color="var(--primary)" />
        <span style={{ fontSize: '14px', fontWeight: 600 }}>Location:</span>
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

      {/* Walk-ins banner */}
      <div className="info-banner mt-16">
        <p>
          <strong>Walk-ins Welcome!</strong> No studio fees.<br />
          No appointment needed. Just call ahead for large groups.
        </p>
      </div>

      {/* Feature cards */}
      <div className="mt-16">
        <Link to="/book" className="feature-card">
          <div className="icon-circle coral">
            <CalendarDays size={22} />
          </div>
          <div>
            <strong>Book a Party or Event</strong>
            <p className="text-muted" style={{ fontSize: '13px' }}>Birthdays, team events, adult parties, summer camps</p>
          </div>
        </Link>

        <Link to="/gallery" className="feature-card">
          <div className="icon-circle teal">
            <Palette size={22} />
          </div>
          <div>
            <strong>Browse Our Pieces</strong>
            <p className="text-muted" style={{ fontSize: '13px' }}>Mugs, plates, figurines, vases, and more</p>
          </div>
        </Link>

        <Link to="/track" className="feature-card">
          <div className="icon-circle coral">
            <Clock size={22} />
          </div>
          <div>
            <strong>Track My Piece</strong>
            <p className="text-muted" style={{ fontSize: '13px' }}>Check if your pottery is ready for pickup</p>
          </div>
        </Link>
      </div>

      {/* How it works */}
      <div className="mt-16">
        <h2 className="page-subtitle">How It Works</h2>
        <div className="card">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '20px', width: '28px', textAlign: 'center' }}>1️⃣</span>
              <div>
                <strong>Pick Your Piece</strong>
                <p className="text-muted" style={{ fontSize: '13px' }}>Choose from mugs ($22) to large platters ($65)</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '20px', width: '28px', textAlign: 'center' }}>2️⃣</span>
              <div>
                <strong>Paint Your Design</strong>
                <p className="text-muted" style={{ fontSize: '13px' }}>We supply stamps, stencils, and support. No talent required!</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '20px', width: '28px', textAlign: 'center' }}>3️⃣</span>
              <div>
                <strong>Pick It Up</strong>
                <p className="text-muted" style={{ fontSize: '13px' }}>Your one-of-a-kind piece is ready in about 10 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hours & Contact */}
      <div className="mt-16">
        <h2 className="page-subtitle">{locationName} Location</h2>
        <div className="card">
          <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '12px' }}>
            <strong>Hours:</strong><br />
            Tuesday to Saturday: 10 AM to 8 PM<br />
            Sunday: 11 AM to 5 PM<br />
            Monday: Closed
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a href="tel:425-677-7334" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>
              <Phone size={16} /> 425-677-7334
            </a>
            <a href="mailto:info@mudhousepottery.com" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>
              <Mail size={16} /> info@mudhousepottery.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
