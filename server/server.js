const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const settingsRoutes = require('./routes/settingsRoutes')

require('dotenv').config()

const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/settings', settingsRoutes)

// Database Connection
connectDB()

// Test Route

app.get('/api/test', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Hotel Hanuman API is Working!'
  })
})

// Server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
