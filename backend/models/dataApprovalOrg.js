const mongoose = require("mongoose");

const dataApprovalOrg = new mongoose.Schema({
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    requestBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    status: {
      type: String,
      required: true
    },
    organisationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "organisation",
        required: true
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cure_category',
        required: true
    }],
    subcategory:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cure_subcategory'
    }],
    altWebsite: {
        type: String
    },
    about: {
        type: String
    },
    name: {
        type: String,
        required: false,
    },
    contact: {
        type: String,
    },
    address: {
        type: String,
    },
    city:{
        type:String
    },
    zipcode: {
        type: String
    },
    state: {
        type: String
    },
    email: {
        type: String
    },
    publicName:{
        type: String,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("dataApprovalOrg", dataApprovalOrg)