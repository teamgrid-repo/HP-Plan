const mongoose = require("mongoose");

const siteClaim = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    jobTitle: {
        type: String,
    },
    howYouHeard: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    altEmail: {
        type: String,
    },
    siteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "site",
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
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    active: {
        type: Boolean,
        default: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    isGeneralUser: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("siteClaim", siteClaim)
