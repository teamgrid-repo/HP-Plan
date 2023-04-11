const mongoose = require("mongoose");

const saveSearches = new mongoose.Schema({
    name: {
        type: String
    },
    url: {
        type: String,
        required: true
    },
    count: {
        type: Number
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
},{
    timestamps: true
})

module.exports = mongoose.model("saveSearchKeyword", saveSearches)