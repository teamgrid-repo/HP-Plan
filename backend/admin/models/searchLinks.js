const mongoose = require('mongoose');

const searchLinks = new mongoose.Schema({
  searchName: {
    type: String,
    required: true
  },
  searchLink: {
    type: String,
    required: true
  },
  notes: {
    type: String,
  },
  states: {
    type: String
  },
  linkType: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  claimStatus:{
      type:Boolean,
  },
  category: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cure_category'
  }],
  subcategory:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cure_subcategory'
  }],
  close:{ type: Boolean, default: false },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  hoursSpent: {
    type: Number
  },
  claimDate: {
    type: Date
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('SearchLinks', searchLinks);
