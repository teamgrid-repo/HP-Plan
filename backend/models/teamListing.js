const mongoose = require("mongoose")

const team = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    job: {
        type: String
    },
    uploadBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
},{
    timestamps: true
})

module.exports = mongoose.model('teamListing', team)