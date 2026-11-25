
const Settings = require('../models/Settings')

// Get Hotel Settings
const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne()

    if (!settings) {
      settings = await Settings.create({})
    }

    res.status(200).json({
      success: true,
      settings,
    })
  } catch (error) {
    console.error('Get Settings Error:', error.message)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch settings',
    })
  }
}

// Update Hotel Settings
const updateSettings = async (req, res) => {
  try {
    const {
      hotelName,
      address,
      phone,
      logo,
      currency,
      language,
    } = req.body

    if (!hotelName || !hotelName.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Hotel name is required',
      })
    }

    if (language && !['English', 'Marathi'].includes(language)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid language',
      })
    }

    let settings = await Settings.findOne()

    if (!settings) {
      settings = new Settings({})
    }

    settings.hotelName = hotelName.trim()
    settings.address = address || ''
    settings.phone = phone || ''
    settings.logo = logo || ''
    settings.currency = currency || 'INR'
    settings.language = language || 'English'

    await settings.save()

    res.status(200).json({
      success: true,
      message: 'Settings updated successfully',
      settings,
    })
  } catch (error) {
    console.error('Update Settings Error:', error.message)

    res.status(500).json({
      success: false,
      message: 'Failed to update settings',
    })
  }
}

module.exports = {
  getSettings,
  updateSettings,
}
    