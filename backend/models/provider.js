const mongoose = require("mongoose")

const provider = new mongoose.Schema({
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
        howYouHeard: {
            type: String
        },
        jobTitle: {
            type: String
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
        types: {
            type: String
        },
        contact: {
            type: String,
        },
        email: {
            type: String,
            required: true
        },
        message: {
            type: Boolean,
            default: false
        },
        textMessage: {
            type: Boolean,
            default: false
        },
        EmailMessage: {
            type: Boolean,
            default: true
        },
        appNotification: {
            type: Boolean,
            default: true
        },
        appointments: {
            type: Boolean,
            default: false
        },
        communication: {
            type: Boolean,
            default: false
        },
        makeAccountPrimary: {
            type: Boolean,default: true
        },
        createdUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "organisation"
        },
        hippa: {
            type: Boolean
        },
        saveClientUserId:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }],
        approvedStatus: {
            type: String
        },
        approvedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
        identity: {
            type: String
        },
        hubspotId: {
            type: String,
        },
        acceptHippaDate: {
            type: Date
        },
        acceptNonHippaDate:{
            type: Date
        },
        acceptProviderTermsDate: {
            type: Date,
        },
        passwordSent: {
            type: Boolean,
            default: true
        },
        claimStatus: {
            type: String,
        },
        lastLogin: {
            type: Date,
        },
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('provider', provider);
