const mongoose = require('mongoose');

const contact = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('contact', contact);
