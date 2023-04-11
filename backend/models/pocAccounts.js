const mongoose = require("mongoose");

const convertEmail = (email) => email.toLowerCase();

const pocAccounts = mongoose.Schema(
  {
    staticPocId:{
      type: mongoose.Schema.Types.ObjectId
    },
    name: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
    contact: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      set: convertEmail,
    },
    organisationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organisation",
    },
    isGhost: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("pocAccounts", pocAccounts);
