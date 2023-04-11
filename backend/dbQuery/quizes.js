const quizQuestion = require("../models/quiz_question")
const quizResult = require("../models/quizResults")

async function createQuizQuestion(data) {
    const result = new quizQuestion(data);
    return result.save();
}

async function bulkInsertQuizQuestion(data = []) {
    return quizQuestion.collection.insertMany(data, function (err, docs) {
        if (err) {
            return {
                err: true,
                msg: err
            }
        } else {
            return {
                err: false,
                msg: docs
            }
        }
    })
}

async function findOneQuiz(id) {
    return quizQuestion.find({ parent: id })
}

async function findQuizById(id) {
    return quizQuestion.findById(id)
}

async function findQuizByQuestion(quesString) {
    return quizQuestion.findOne({
        question: quesString
    })
}

async function findCommonQues(data) {
    return quizQuestion.find({ common: data })
}

async function updateQuizInfo(data) {
    return quizQuestion.findByIdAndUpdate({
        _id: data.id
    }, {
        result: data.result
    })
}

async function findNextQuiz(data) {
    return quizQuestion.find({}).where('parent_option').in(data)
}

async function findOptionById(id) {
    return quizQuestion.find({ parent: id, isQuestion: false })
}

async function createQuizResult(data){
    const entries = await quizResult(data);
    return entries.save()
}

async function getQuizResult(data){
    return quizResult.find(data).lean()
}

async function deleteQuizResultId(id){
    return quizResult.findByIdAndDelete(id).lean()
}

module.exports = {
    createQuizQuestion,
    bulkInsertQuizQuestion,
    findOneQuiz,
    findQuizById,
    findQuizByQuestion,
    findCommonQues,
    updateQuizInfo,
    findNextQuiz,
    findOptionById,
    createQuizResult,
    getQuizResult,
    deleteQuizResultId
}