
import './Header.css'
import { useAuth } from '../../context/AuthContext'
import { useEffect, useState } from 'react'
import API from '../../api/axios'
import { useLanguage } from '../../context/LanguageContext'

function Header() {
  const { user, logout } = useAuth()
  const { language, changeLanguage } = useLanguage()
  const { t } = useLanguage()

  const [hotelName, setHotelName] = useState('Hotel Hanuman')

  useEffect(() => {
    const fetchHotelName = async () => {
      try {
        const response = await API.get('/settings')

        if (response.data.settings?.hotelName) {
          setHotelName(response.data.settings.hotelName)
        }
      } catch (error) {
        console.error('Failed to load hotel name:', error)
      }
    }

    fetchHotelName()
  }, [])

  return (
    <header className="header">
      <div className="header-title">
        <h2>{hotelName}</h2>
        <p>{t('welcome')}</p>
      </div>

      <div className="header-actions">
        <select
          className="language-select"
          value={language}
          onChange={(e) => changeLanguage(e.target.value)}
        >
          <option value="English">🌐 English</option>
          <option value="Marathi">🌐 मराठी</option>
        </select>

        <div className="owner-profile">
          <div className="owner-avatar">
            {user?.name?.charAt(0).toUpperCase() || 'H'}
          </div>

          <div className="owner-info">
            <strong>{user?.name || 'User'}</strong>
            <span>{user?.role || 'Staff'}</span>
          </div>
        </div>

        <button
          className="logout-button"
          onClick={logout}
        >
          {t('logout')}
        </button>
      </div>
    </header>
  )
}

export default Header
