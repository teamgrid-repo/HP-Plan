const mongoose = require("mongoose")

const userStateLoc = new mongoose.Schema({
    ipAddress: {
        type: String
    },
    state: {
        type: String,
        required: true
    },
    page: {
        type: String,
        required: true
    },
    currDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("userStateLoc", userStateLoc)