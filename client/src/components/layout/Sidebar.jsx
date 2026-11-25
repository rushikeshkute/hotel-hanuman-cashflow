
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import './Sidebar.css'

const menuItems = [
  { icon: '📊', name: 'dashboard', path: '/dashboard' },
  { icon: '💰', name: 'dailySales', path: '/sales' },
  { icon: '💸', name: 'dailyExpenses', path: '/expenses' },
  { icon: '📖', name: 'cashBook', path: '/cashbook' },
  { icon: '📒', name: 'udharManagement', path: '/udhar' },
  { icon: '📈', name: 'monthlyReports', path: '/reports' },
  { icon: '👥', name: 'staffManagement', path: '/staff', ownerOnly: true },
  { icon: '⚙️', name: 'settings', path: '/settings', ownerOnly: true },
]

function Sidebar() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const filteredMenu = menuItems.filter((item) => {
    if (item.ownerOnly && user?.role !== 'owner') return false
    return true
  })

  return (
    <>
      <button
        className="mobile-menu-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`sidebar ${isOpen ? 'mobile-open' : ''}`}>
        <div className="brand">
          <div className="brand-icon">🍽️</div>
          <div>
            <h2>HOTEL HANUMAN</h2>
            <span>Cash Flow Manager</span>
          </div>
        </div>

        <p className="menu-label">MAIN MENU</p>

        <nav className="menu">
          {filteredMenu.map((item) => (
            <NavLink
              to={item.path}
              key={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              <span>{item.icon}</span>
              {t(item.name)}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <span>💡</span>
            <h4>Need Help?</h4>
            <p>Manage your hotel finances easily.</p>
          </div>
          <p className="version">Hotel Hanuman v1.0</p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
