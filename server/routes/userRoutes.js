
const express = require('express')

const router = express.Router()

const { protect, ownerOnly } = require('../middleware/authMiddleware')


const {
  getAllStaff,
  createStaff,
  updateStaff,
  deleteStaff,
} = require('../controllers/userController')

// Get Logged In User
router.get('/profile', protect, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  })
})

// Owner Only Route
router.get('/owner', protect, ownerOnly, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome Owner!',
  })
})

// Get All Staff
router.get('/staff', protect, ownerOnly, getAllStaff)

// Create New Staff
router.post('/staff', protect, ownerOnly, createStaff)

module.exports = router

 // Update Staff
router.put('/staff/:id', protect, ownerOnly, updateStaff)

// Delete Staff
router.delete('/staff/:id', protect, ownerOnly, deleteStaff)
