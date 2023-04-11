const mongoose = require("mongoose");

const hubspot = new mongoose.Schema({
    refreshToken: {
        type: String,
    },
    accessToken: {
        type: String,
        required: true
    },
    expireIn: {
        type: Number,
    },
    tokenType: {
        type: String
    }
},{
    timestamps: true
})

module.exports = mongoose.model("hubspot", hubspot)
