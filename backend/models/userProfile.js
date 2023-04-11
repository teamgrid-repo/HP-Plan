const mongoose = require("mongoose");

const profile = new mongoose.Schema({
    dob: {
        type: Date,
    },
    gender: {
        type:String,
    },
    religion:{
        type: String
    },
    occupation: {
        type: String
    },
    maritalStatus: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    contact: {
        type: Number
    },
    image: {
        type: String
    },
    message: {
        type: Boolean,
        default: true
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
        default: true
    },
    communication: {
        type: Boolean,
        default: false
    },
    name: {
        type: String
    },
    acceptTerms: {
        type: Boolean,
    },
    acceptTermsDate: {
        type: Date
    },
    optShareData: {
        type: Boolean
    },
    userState: {
        type: String
    },
},{
    timestamps: true
})

module.exports = mongoose.model('userProfile', profile)
