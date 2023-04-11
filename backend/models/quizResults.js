const mongoose = require("mongoose")

const quizResult = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    name: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('quizResult', quizResult);