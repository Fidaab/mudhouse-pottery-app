import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { LocationProvider } from './context/LocationContext'
import { CustomerHome } from './pages/customer/CustomerHome'
import { CustomerBook } from './pages/customer/CustomerBook'
import { CustomerGallery } from './pages/customer/CustomerGallery'
import { CustomerTracker } from './pages/customer/CustomerTracker'
import { AdminLogin } from './pages/admin/AdminLogin'
import { AdminDashboard } from './pages/admin/AdminDashboard'
import { CalendarDays, Palette, Clock, Home as HomeIcon } from 'lucide-react'
import './styles/app.css'

export default function App() {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false)

  return (
    <BrowserRouter>
      <LocationProvider>
        <Routes>
          {/* Admin routes */}
          <Route path="/admin" element={
            adminLoggedIn
              ? <div className="app"><main className="main-content admin-content"><AdminDashboard onLogout={() => setAdminLoggedIn(false)} /></main></div>
              : <div className="app"><main className="main-content admin-content"><AdminLogin onLogin={() => setAdminLoggedIn(true)} /></main></div>
          } />

          {/* Customer routes */}
          <Route path="/*" element={
            <div className="app">
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<CustomerHome />} />
                  <Route path="/book" element={<CustomerBook />} />
                  <Route path="/gallery" element={<CustomerGallery />} />
                  <Route path="/track" element={<CustomerTracker />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </main>
              <nav className="bottom-nav">
                <NavLink to="/" end className="nav-item">
                  <HomeIcon size={20} />
                  <span>Home</span>
                </NavLink>
                <NavLink to="/book" className="nav-item">
                  <CalendarDays size={20} />
                  <span>Book</span>
                </NavLink>
                <NavLink to="/gallery" className="nav-item">
                  <Palette size={20} />
                  <span>Gallery</span>
                </NavLink>
                <NavLink to="/track" className="nav-item">
                  <Clock size={20} />
                  <span>My Pieces</span>
                </NavLink>
              </nav>
            </div>
          } />
        </Routes>
      </LocationProvider>
    </BrowserRouter>
  )
}
