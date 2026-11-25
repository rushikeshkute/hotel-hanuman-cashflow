
const User = require('../models/User')
const bcrypt = require('bcryptjs')

// Get All Staff Members
const getAllStaff = async (req, res) => {
  try {
    const staff = await User.find({ role: 'staff' })
      .select('-password')
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: staff.length,
      staff,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch staff members',
    })
  }
}

// Create New Staff Member
const createStaff = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields',
      })
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      })
    }

    const normalizedEmail = email.trim().toLowerCase()

    const existingUser = await User.findOne({
      email: normalizedEmail,
    })

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newStaff = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: 'staff',
    })

    res.status(201).json({
      success: true,
      message: 'Staff created successfully',
      staff: {
        id: newStaff._id,
        name: newStaff.name,
        email: newStaff.email,
        role: newStaff.role,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create staff member',
    })
  }
}

// Update Staff Member
const updateStaff = async (req, res) => {
  try {
    const { name, email } = req.body

    const staff = await User.findOne({
      _id: req.params.id,
      role: 'staff',
    })

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found',
      })
    }

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required',
      })
    }

    const normalizedEmail = email.trim().toLowerCase()

    const existingUser = await User.findOne({
      email: normalizedEmail,
      _id: { $ne: staff._id },
    })

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered',
      })
    }

    staff.name = name.trim()
    staff.email = normalizedEmail

    await staff.save()

    res.status(200).json({
      success: true,
      message: 'Staff updated successfully',
      staff: {
        id: staff._id,
        name: staff.name,
        email: staff.email,
        role: staff.role,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update staff member',
    })
  }
}

// Delete Staff Member
const deleteStaff = async (req, res) => {
  try {
    const staff = await User.findOneAndDelete({
      _id: req.params.id,
      role: 'staff',
    })

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Staff deleted successfully',
    })
  } catch (error) {
  console.error('Delete Staff Error:', error)

  res.status(500).json({
    success: false,
    message: error.message,
  })
}
}

module.exports = {
  getAllStaff,
  createStaff,
  updateStaff,
  deleteStaff,
}
