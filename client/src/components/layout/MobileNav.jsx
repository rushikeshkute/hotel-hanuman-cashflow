
import { NavLink } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import './MobileNav.css'

function MobileNav() {
  const { language } = useLanguage()
  const isMarathi = language === 'Marathi'

  const navItems = [
    {
      icon: '📊',
      label: isMarathi ? 'होम' : 'Home',
      path: '/dashboard',
    },
    {
      icon: '💰',
      label: isMarathi ? 'विक्री' : 'Sales',
      path: '/sales',
    },
    {
      icon: '💸',
      label: isMarathi ? 'खर्च' : 'Expenses',
      path: '/expenses',
    },
    {
      icon: '📈',
      label: isMarathi ? 'रिपोर्ट' : 'Reports',
      path: '/reports',
    },
  ]

  return (
    <nav className="mobile-nav">
      {navItems.map((item) => (
        <NavLink
          to={item.path}
          key={item.path}
          className={({ isActive }) =>
            `mobile-nav-item ${isActive ? 'active' : ''}`
          }
        >
          <span className="mobile-nav-icon">{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default MobileNav
