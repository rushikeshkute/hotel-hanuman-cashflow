
const mongoose = require('mongoose')

const settingsSchema = new mongoose.Schema(
  {
    hotelName: {
      type: String,
      default: 'Hotel Hanuman',
    },
    address: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    logo: {
      type: String,
      default: '',
    },
    currency: {
      type: String,
      default: 'INR',
    },
    language: {
      type: String,
      enum: ['English', 'Marathi'],
      default: 'English',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Settings', settingsSchema)
