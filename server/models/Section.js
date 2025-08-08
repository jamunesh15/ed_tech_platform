// models/Section.js
const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
    required: true,
  },
  Subsection: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subsection",
  }],
  courseId: {  // THIS IS CRUCIAL
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Section", sectionSchema);