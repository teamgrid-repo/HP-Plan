const mongoose = require('mongoose');

const convertEmail = (email) => (email.toLowerCase());

const Users = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    set: convertEmail,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user'
  },
  status: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    required: true
  },
  social_token: {
    type: String,
  },
  jwt_auth_token: {
    type: String,
  },
  jwt_token_expired: {
    type: Date
  },
  fcm_token: {
    type: String
  },
  saved_user: {
    type: Array
  },
  saved_provider: {
    type: Array
  },
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userProfile"
  },
  image:{
    type: String,
  },
  imagePath: {
    type: String
  },
  subRole: {
    type: String
  },
  subRoleCreatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  contact: {
    type: Number
  },
  freeze: {
    type: Boolean,
    default: false
  },
  assigningId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('users', Users);
