const mongoose = require('mongoose');

const savedListing = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    name: { type: String, required: true },
    stateLoc: { type: String, default: "malicious" },
},{
    timestamp: true
});

module.exports = mongoose.model("savedListing", savedListing);