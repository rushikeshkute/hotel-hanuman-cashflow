import './Login.css'
import { useState } from 'react'
import API from '../api/axios'
import { useAuth } from '../context/AuthContext'

function Login() {
    const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await API.post('/auth/login', formData)

     login(response.data.user, response.data.token)

      alert('Login Successful!')

     window.location.href = '/dashboard'
    } catch (error) {
      setError(
        error.response?.data?.message || 'Login failed. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>HOTEL HANUMAN</h1>
        <p>Cash Flow Management</p>

        <h2>Welcome Back!</h2>
        <p>Please login to continue</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'LOGIN'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
