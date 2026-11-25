
import { useEffect, useState } from 'react'
import API from '../api/axios'
import { useLanguage } from '../context/LanguageContext'
import './Settings.css'

function Settings() {
  const { language, changeLanguage } = useLanguage()
  const isMarathi = language === 'Marathi'

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    hotelName: '',
    address: '',
    phone: '',
    logo: '',
    currency: 'INR',
    language: 'English',
  })

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await API.get('/settings')

        if (response.data.settings) {
          const settings = response.data.settings

          setFormData({
            hotelName: settings.hotelName || '',
            address: settings.address || '',
            phone: settings.phone || '',
            logo: settings.logo || '',
            currency: settings.currency || 'INR',
            language: settings.language || 'English',
          })

          if (settings.language) {
            changeLanguage(settings.language)
          }
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            (isMarathi
              ? 'सेटिंग्ज लोड करता आल्या नाहीत.'
              : 'Failed to load settings.')
        )
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })

    if (name === 'language') {
      changeLanguage(value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const response = await API.put('/settings', formData)

      setSuccess(
        response.data.message ||
          (isMarathi
            ? 'सेटिंग्ज यशस्वीपणे अपडेट झाल्या!'
            : 'Settings updated successfully!')
      )
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (isMarathi
            ? 'सेटिंग्ज अपडेट करता आल्या नाहीत.'
            : 'Failed to update settings.')
      )
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="settings-page">
        {isMarathi ? 'सेटिंग्ज लोड होत आहेत...' : 'Loading settings...'}
      </div>
    )
  }

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>
          {isMarathi ? 'हॉटेल सेटिंग्ज ⚙️' : 'Hotel Settings ⚙️'}
        </h2>
        <p>
          {isMarathi
            ? 'तुमच्या हॉटेल हनुमानची माहिती व्यवस्थापित करा.'
            : 'Manage your Hotel Hanuman information.'}
        </p>
      </div>

      {error && <p className="settings-error">{error}</p>}

      {success && <p className="settings-success">{success}</p>}

      <div className="settings-card">
        <h3>
          {isMarathi ? 'हॉटेलची माहिती' : 'Hotel Information'}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="settings-form-group">
            <label>{isMarathi ? 'हॉटेलचे नाव' : 'Hotel Name'}</label>
            <input
              type="text"
              name="hotelName"
              value={formData.hotelName}
              onChange={handleChange}
              placeholder={
                isMarathi ? 'हॉटेलचे नाव टाका' : 'Enter Hotel Name'
              }
              required
            />
          </div>

          <div className="settings-form-group">
            <label>{isMarathi ? 'हॉटेलचा पत्ता' : 'Hotel Address'}</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder={
                isMarathi ? 'हॉटेलचा पत्ता टाका' : 'Enter Hotel Address'
              }
              rows="3"
            />
          </div>

          <div className="settings-form-group">
            <label>
              {isMarathi ? 'संपर्क क्रमांक' : 'Contact Number'}
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={
                isMarathi ? 'संपर्क क्रमांक टाका' : 'Enter Contact Number'
              }
            />
          </div>

          <div className="settings-form-group">
            <label>
              {isMarathi ? 'हॉटेल लोगो URL' : 'Hotel Logo URL'}
            </label>
            <input
              type="text"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              placeholder={
                isMarathi ? 'लोगो URL टाका' : 'Enter Logo URL'
              }
            />
          </div>

          <div className="settings-form-group">
            <label>{isMarathi ? 'चलन' : 'Currency'}</label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
            >
              <option value="INR">Indian Rupee (₹ INR)</option>
              <option value="USD">US Dollar ($ USD)</option>
            </select>
          </div>

          <div className="settings-form-group">
            <label>{isMarathi ? 'भाषा' : 'Language'}</label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
            >
              <option value="English">English</option>
              <option value="Marathi">मराठी</option>
            </select>
          </div>

          <button
            type="submit"
            className="settings-save-btn"
            disabled={saving}
          >
            {saving
              ? isMarathi
                ? 'सेव्ह होत आहे...'
                : 'Saving...'
              : isMarathi
                ? 'सेटिंग्ज सेव्ह करा'
                : 'Save Settings'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Settings
