const mongoose = require('mongoose');

const appointment = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    require: true
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  siteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "site",
    required: true
  },
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cure_subcategory",
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    default: 'pending'
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  room: {
    type: String
  },
  canceledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('appointment', appointment);
