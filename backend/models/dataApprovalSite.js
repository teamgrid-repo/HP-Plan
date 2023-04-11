const mongoose = require("mongoose");

const dataApprovalSite = new mongoose.Schema({
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    requestBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    organisationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "organisation",
        required: true
    },
    status: {
        type: String,
        required: true
    },
    method:{
        type: String,
        required: true
    },
    siteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "site"
    },
    name: {
        type: String,
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
    HQ: {
        type: String
    },
    virtual: { type: Boolean},
    homeVisit: { type: Boolean },
    radius: { type: String },
}, {
    timestamps: true
})

module.exports = mongoose.model("dataApprovalSite", dataApprovalSite)