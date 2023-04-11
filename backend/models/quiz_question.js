const mongoose = require("mongoose")

const quizQuestion = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'quiz_question'
    },
    parent_option: {
        type: [String],
    },
    common: {
      type: String,
      required: false
    },
    result: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'quiz_result'
    },
    isQuestion: {
        type: Boolean,
        required: true
    },
    option_uuid: {
        type: String,
        required: false
    }
},{
    timestamps: true
})

module.exports = mongoose.model('quiz_question', quizQuestion);