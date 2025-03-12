// backend/models/MentorshipSession.js
const mongoose = require('mongoose');

const MentorshipSessionSchema = new mongoose.Schema({
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mentee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  duration: { type: Number, required: true }, // Duration in minutes
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'completed'], default: 'pending' },
});

module.exports = mongoose.model('MentorshipSession', MentorshipSessionSchema);