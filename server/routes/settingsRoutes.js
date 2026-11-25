
const express = require('express')
const router = express.Router()

const { protect, ownerOnly } = require('../middleware/authMiddleware')

const {
  getSettings,
  updateSettings,
} = require('../controllers/settingsController')

// Get Settings
router.get('/', protect, getSettings)

// Update Settings (Owner Only)
router.put('/', protect, ownerOnly, updateSettings)

module.exports = router
