const mongoose = require("mongoose")

const state = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String },
}, {
    timestamps: true
})

module.exports = mongoose.model('state', state)
