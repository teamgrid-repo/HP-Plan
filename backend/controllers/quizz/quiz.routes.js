const express = require("express");
const { getAllGroupedQuizzes, createQuizQuestion, getAllQuizzes, getNextQuiz, createSavedQuizResult, getAllSavedQuizResult, deleteQuizResult, sendEmailOfQuizResult } = require('./quiz.controller')
const { createQuizQuesValidation } = require('./quiz.validator')
const { authentication, authorization, singleKeyAuthorization} = require('../../middleware/middleware');
const router = express.Router();

router.get('/groupA',  authentication, authorization ,getAllGroupedQuizzes);
router.post('/create_quiz', authentication, authorization ,createQuizQuesValidation, createQuizQuestion)
router.get('/get_quiz',  authentication, authorization , getAllQuizzes)
router.get('/get_next_quiz', authentication, authorization ,getNextQuiz)

//Saved Quiz Result
router.post('/quiz', authentication,  createSavedQuizResult)
router.get('/quiz', authentication,  getAllSavedQuizResult)
router.delete('/quiz', authentication,  deleteQuizResult)
router.post('/email-quiz', singleKeyAuthorization,  sendEmailOfQuizResult)

module.exports = router;