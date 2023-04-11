const mongoose = require("mongoose");

const convertEmail = (email) => (email.toLowerCase());

const dataApprovalSubPro = new mongoose.Schema({
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
    subUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    name: {
        type: String,
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    jobTitle: {
        type: String
    },
    contact: {
        type: Number
    },
    email: {
        type: String,
        required: true,
        set: convertEmail,
    },
    hippaChat: {
        type: Boolean
    },
    makeAccountPrimary: {
        type: Boolean
    },
    organisationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "organisation"
    },
    method:{
        type: String,
        required: true
    },
    isPoc: {
        type: Boolean
    },
    staticPocId:{
        type: mongoose.Schema.Types.ObjectId
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("dataApprovalSubPro", dataApprovalSubPro)