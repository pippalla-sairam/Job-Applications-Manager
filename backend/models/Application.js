const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  status: { type: String, default: 'Applied' },
  date: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
