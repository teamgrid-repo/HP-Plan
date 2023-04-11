const mongoose = require("mongoose");

const Organisation = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    publicName: {
        type: String
    },
    type: {
        type: String,
        required: true
    },
    subTypes: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    isAChurch:{
        type: Boolean,
        default: false
    },
    mainWebsite: {
        type: String,
        required: true
    },
    altURL: {
        type: String,
    },
    altUrlDescription: {
        type: String,
    },
    hqAddressStreet: {
        type: String
    },
    hqAddressState: {
        type: String
    },
    hqAddressCity: {
        type: String
    },
    hqAddressZip: {
        type: String
    },
    phone: {
        type: Number,
        required: true
    },
    hotline:{
        type: Boolean,
        default: false
    },
    hotlineNumber: {
        type: Number,
    },
    sufficientForCompliance:{
        type: Boolean,
        default: false
    },
    specialRelationship:{
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true
    },
    searchLink: {
        type: String,
        required: true
    },
    leadStatus: {
        type: String,
        required: true
    },
    geoSpan: {
        type: String
    },
    elevateForReview: {
        type: Boolean,
        required: true,
        default: true
    },
    leafStatus: {
        type: String,
    },
    leafNote: {
        type: String
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cure_category'
    }],
    subCategory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "cure_subcategory"
    }]
},{
    timestamps: true
});

module.exports = mongoose.model('admin_organisation', Organisation)
