const mongoose = require('mongoose');

const site = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
  },
  city:{
    type: String,
  },
  zipcode: {
    type: String,
  },
  state: [{
    type: String,
  }],
  website: {
    type: String,
  },
  category: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cure_category'
  }],
  subcategory:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cure_subcategory'
  }],
  organisationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "organisation"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  location: {
    lat: { type: Number},
    lang: {type: Number}
  },
  additional: {
    type: Boolean
  },
  publish: {
    type: String
  },
  HQ: {
    type: String
  },
  virtual: { type: Boolean, default: false },
  homeVisit: { type: Boolean, default: false },
  radius: { type: String },
  siteIdentifier: { type: String }
}, {
  timestamps: true,
});

module.exports = mongoose.model('site', site);
