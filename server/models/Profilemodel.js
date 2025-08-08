const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
  gender: {
    type: String,
    enum: ["Male", "Female", "Other", "Prefer not to say"],
    default: null
  },
  dateOfBirth: { // Changed to camelCase to match frontend
    type: String,
    default: null
  },
  about: {
    type: String,
    trim: true,
    maxLength: 250,
    default: null
  },
  contactNumber: {
    type: String,
    trim: true,
    default: null
  }
}, {
  timestamps: true // Add timestamps for created/updated tracking
})

module.exports = mongoose.model("Profile", ProfileSchema)