
import { useEffect, useState } from 'react'
import API from '../api/axios'
import { useLanguage } from '../context/LanguageContext'
import './StaffManagement.css'

function StaffManagement() {
  const { language } = useLanguage()
  const isMarathi = language === 'Marathi'

  const [staffMembers, setStaffMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [editingId, setEditingId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  const fetchStaff = async () => {
    try {
      const response = await API.get('/users/staff')
      setStaffMembers(response.data.staff || [])
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (isMarathi
            ? 'कर्मचारी माहिती लोड करता आली नाही.'
            : 'Unable to load staff members.')
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStaff()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleEdit = async (staff) => {
    const updatedName = prompt(
      isMarathi ? 'कर्मचाऱ्याचे नाव टाका:' : 'Enter Staff Name:',
      staff.name
    )

    if (updatedName === null) return

    const updatedEmail = prompt(
      isMarathi ? 'कर्मचाऱ्याचा ईमेल टाका:' : 'Enter Staff Email:',
      staff.email
    )

    if (updatedEmail === null) return

    if (!updatedName.trim() || !updatedEmail.trim()) {
      setError(
        isMarathi
          ? 'नाव आणि ईमेल आवश्यक आहेत.'
          : 'Name and email are required.'
      )
      return
    }

    setEditingId(staff._id)
    setError('')
    setSuccess('')

    try {
      await API.put(`/users/staff/${staff._id}`, {
        name: updatedName,
        email: updatedEmail,
      })

      setSuccess(
        isMarathi
          ? 'कर्मचाऱ्याची माहिती यशस्वीपणे अपडेट झाली.'
          : 'Staff details updated successfully.'
      )

      await fetchStaff()
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (isMarathi
            ? 'कर्मचारी माहिती अपडेट करता आली नाही.'
            : 'Failed to update staff.')
      )
    } finally {
      setEditingId(null)
    }
  }

  const handleDelete = async (staff) => {
    const confirmed = window.confirm(
      isMarathi
        ? `तुम्हाला ${staff.name} या कर्मचाऱ्याला डिलीट करायचे आहे का?`
        : `Are you sure you want to delete ${staff.name}?`
    )

    if (!confirmed) return

    setDeletingId(staff._id)
    setError('')
    setSuccess('')

    try {
      await API.delete(`/users/staff/${staff._id}`)

      setSuccess(
        isMarathi
          ? 'कर्मचारी यशस्वीपणे डिलीट झाला.'
          : 'Staff deleted successfully.'
      )

      await fetchStaff()
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (isMarathi
            ? 'कर्मचारी डिलीट करता आला नाही.'
            : 'Failed to delete staff.')
      )
    } finally {
      setDeletingId(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSaving(true)

    try {
      await API.post('/users/staff', formData)

      setSuccess(
        isMarathi
          ? 'नवीन कर्मचारी खाते यशस्वीपणे तयार झाले.'
          : 'Staff account created successfully.'
      )

      setFormData({
        name: '',
        email: '',
        password: '',
      })

      setShowForm(false)
      await fetchStaff()
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (isMarathi
            ? 'कर्मचारी खाते तयार करता आले नाही.'
            : 'Failed to create staff account.')
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="staff-page">
      <div className="staff-header">
        <div>
          <h2>
            {isMarathi ? 'कर्मचारी व्यवस्थापन 👥' : 'Staff Management 👥'}
          </h2>
          <p>
            {isMarathi
              ? 'तुमच्या हॉटेलमधील कर्मचारी आणि त्यांची माहिती व्यवस्थापित करा.'
              : 'Manage your hotel employees and their details.'}
          </p>
        </div>

        <button
          type="button"
          className="staff-add-btn"
          onClick={() => {
            setShowForm(!showForm)
            setError('')
            setSuccess('')
          }}
        >
          {showForm
            ? isMarathi
              ? 'रद्द करा'
              : 'Cancel'
            : isMarathi
              ? '+ कर्मचारी जोडा'
              : '+ Add Staff'}
        </button>
      </div>

      {showForm && (
        <div className="staff-table-card">
          <h3>
            {isMarathi ? 'नवीन कर्मचारी जोडा' : 'Add New Staff'}
          </h3>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder={isMarathi ? 'कर्मचाऱ्याचे नाव' : 'Staff Name'}
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder={isMarathi ? 'कर्मचाऱ्याचा ईमेल' : 'Staff Email'}
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder={
                isMarathi
                  ? 'पासवर्ड तयार करा (किमान 6 अक्षरे)'
                  : 'Create Password (minimum 6 characters)'
              }
              value={formData.password}
              onChange={handleChange}
              minLength={6}
              required
            />

            <button type="submit" disabled={saving}>
              {saving
                ? isMarathi
                  ? 'तयार होत आहे...'
                  : 'Creating...'
                : isMarathi
                  ? 'कर्मचारी खाते तयार करा'
                  : 'Create Staff Account'}
            </button>
          </form>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <div className="staff-summary">
        <div className="staff-summary-card">
          <span>{isMarathi ? 'एकूण कर्मचारी' : 'Total Staff'}</span>
          <h2>{staffMembers.length.toString().padStart(2, '0')}</h2>
        </div>

        <div className="staff-summary-card">
          <span>{isMarathi ? 'सक्रिय कर्मचारी' : 'Active Staff'}</span>
          <h2>{staffMembers.length.toString().padStart(2, '0')}</h2>
        </div>

        <div className="staff-summary-card">
          <span>{isMarathi ? 'मासिक पगार' : 'Monthly Salary'}</span>
          <h2>{isMarathi ? 'उपलब्ध नाही' : 'Not Available'}</h2>
        </div>
      </div>

      <div className="staff-table-card">
        <h3>
          {isMarathi ? 'कर्मचारी माहिती' : 'Employee Details'}
        </h3>

        {loading ? (
          <p>
            {isMarathi
              ? 'कर्मचारी माहिती लोड होत आहे...'
              : 'Loading staff members...'}
          </p>
        ) : staffMembers.length === 0 ? (
          <p>
            {isMarathi
              ? 'कोणतेही कर्मचारी सापडले नाहीत.'
              : 'No staff members found.'}
          </p>
        ) : (
          <div className="staff-table-wrap">
            <table className="staff-table">
              <thead>
                <tr>
                  <th>{isMarathi ? 'कर्मचारी' : 'Employee'}</th>
                  <th>{isMarathi ? 'ईमेल' : 'Email'}</th>
                  <th>{isMarathi ? 'भूमिका' : 'Account Role'}</th>
                  <th>{isMarathi ? 'कृती' : 'Actions'}</th>
                </tr>
              </thead>

              <tbody>
                {staffMembers.map((staff) => (
                  <tr key={staff._id}>
                    <td>{staff.name}</td>

                    <td>{staff.email}</td>

                    <td>
                      <span className="staff-status">
                        {staff.role === 'staff'
                          ? isMarathi
                            ? 'कर्मचारी'
                            : 'Staff'
                          : staff.role === 'owner'
                            ? isMarathi
                              ? 'मालक'
                              : 'Owner'
                            : staff.role}
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        onClick={() => handleEdit(staff)}
                        disabled={
                          editingId === staff._id ||
                          deletingId === staff._id
                        }
                      >
                        {editingId === staff._id
                          ? isMarathi
                            ? 'एडिट होत आहे...'
                            : 'Editing...'
                          : isMarathi
                            ? 'एडिट'
                            : 'Edit'}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(staff)}
                        disabled={
                          editingId === staff._id ||
                          deletingId === staff._id
                        }
                      >
                        {deletingId === staff._id
                          ? isMarathi
                            ? 'डिलीट होत आहे...'
                            : 'Deleting...'
                          : isMarathi
                            ? 'डिलीट'
                            : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default StaffManagement
