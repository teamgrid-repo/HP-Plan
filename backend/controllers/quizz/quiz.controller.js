const { createQuizQuestion, bulkInsertQuizQuestion, findOneQuiz, findQuizById, findQuizByQuestion,
    findCommonQues, updateQuizInfo, findNextQuiz, findOptionById, createQuizResult, getQuizResult, deleteQuizResultId
} = require("../../dbQuery/quizes");
const { v4: uuidv4 } = require("uuid")
const { isEmpty } = require("lodash");
const { errorResponse, successResponse } = require("../../helpers/helpers");
const { errorMessages, successMessages } = require("../../helpers/messages");
const quizResults = require("../../models/quizResults")
const {quizUrlTemplate  } = require("../../helpers/template")
const {sendMail} = require("../../connection/smtp.connect");


module.exports.getAllGroupedQuizzes = async (req, res) => {
    res.send({
        question: "I am looking for Help",
        options: {
            A: "A Client or Patient",
            B: "A Friend and Family Members",
            C: "Myself"
        }
    })
}

async function saveQuizResult(result, parentId) {
    if (!isEmpty(result) && !isEmpty(parentId)) {
        const parentOption = await findQuizById(parentId);
        const answerData = new quizResults({
            result,
            quiz_id: parentOption._id
        })
        await answerData.save();

        await updateQuizInfo({
            id: parentOption._id,
            result: answerData._id
        })
        return {
            err: false,
            msg: parentOption
        }
    } else {
        return {
            err: true,
            msg: "Answer and parent id Not found"
        }
    }
}

module.exports.createQuizQuestion = async (req, res) => {
    const data = { ...req.body, ...req.params, ...req.query };
    // CHECK THE QUESTION ALREADY AVAILABLE OR NOT THEN DON'T INSERT
    const questionString = data.question;
    const isQuestionExist = await findQuizByQuestion(questionString);
    if (!isEmpty(isQuestionExist)) {
        return errorResponse(req, res, errorMessages.QUESTION_ALREADY_EXISTS)
    }
    let parentQuestion
    let parentOption
    if (data.parentQuestionId !== "") {
        parentQuestion = await findQuizById(data.parentQuestionId);
    }
    if (data.parentOptionId !== "") {
        parentOption = await findQuizById(data.parentOptionId);
    }
    if (!isEmpty(data.result)) {
        //Save the answer
        const result = await saveQuizResult(data.result, data.parentQuestionId)
        if (!isEmpty(result) && result.err) {
            return errorResponse(req, res, result.msg);
        }
        return successResponse(req, res, result.msg)
    }
    if (isEmpty(questionString)) {
        return errorResponse(req, res, "NO question Found")
    }
    const isCommonQuestion = data.isCommon
    let saveQuizQuestion = {
        question: data.question,
        parent: isEmpty(parentQuestion) || isCommonQuestion ? null : data.parentQuestionId,
        parent_option: isEmpty(parentOption) ? null : data.parentOptionId,
        common: isCommonQuestion ? parentQuestion.option_uuid : null,
        result: null,
        isQuestion: true
    }
    let unix = uuidv4()
    const result = await createQuizQuestion(saveQuizQuestion);
    const option = data.option;
    const optionData = [];
    for (let children in data.option) {
        optionData.push({
            question: option[children],
            parent: result._id,
            common: null,
            result: null,//todo:link the result collection with this tab
            isQuestion: false,
            option_uuid: unix
        })
    }
    await bulkInsertQuizQuestion(optionData)
    return successResponse(req, res, data, successMessages.QUIZ_CREATED)
}

async function formatOfQuestion(question, option = []) {
    const data = []
    let index = 0;
    let ques;
    option.map((val) => {
        data.push({
            option: val.question,
            index,
            optionId: val._id
        })
        index++;
    })
    ques = question.question;
    ques_id = question._id;
    obj = {
        questionId: ques_id,
        question: ques,
        options: data
    };
    return obj
}

async function formatQuestion(question) {
    const questionOption = await findOneQuiz(question[0]._id);
    if (!isEmpty(questionOption)) {
        return formatOfQuestion(question[0], questionOption)
    }
    return {};
}

const formatNextQuiz = async (getChildQuestion) => {
    let optionsArr = [];
    for await (const data of getChildQuestion) {
        const quesOptions = await findOptionById(data._id);
        optionsArr.push(quesOptions);
    }
    return optionsArr;
}

module.exports.getAllQuizzes = async (req, res) => {
    const data = { ...req.body, ...req.params, ...req.query };
    const questionId = data.questionId;
    if (!isEmpty(data)) {
        if (isEmpty(questionId)) {
            let questionString = "I'M LOOKING FOR HELP FOR…"
            const getQuestion = await findQuizByQuestion(questionString);
            if (!isEmpty(getQuestion)) {
                const getQuestionOption = await findOneQuiz(getQuestion._id)
                const quizResult = await formatOfQuestion(getQuestion, getQuestionOption)
                return successResponse(req, res, quizResult, successMessages.QUIZ_FETCHED)
            }
            return errorResponse(req, res, errorMessages.NO_DATA_FOUND)
        } else {
            /**
             * TWO SENERIO IS THERE MAY THIS PARENT ID IS BELONGS TO  COMMON QUESTION
             * AND MAYBE BELONGS TO SOME SPECIFIC QUESTION
             * AND MAYBE BELONGS TO BOTH AND BELONGS TO RESULT AS WELL
             * */
            const allQuestion = [];
            const quizQuestion = await findQuizById(questionId);
            if (isEmpty(quizQuestion)) {
                return errorResponse(req, res, errorMessages.NO_DATA_FOUND)
            }
            const commonQuestion = await findCommonQues(quizQuestion.option_uuid)
            const childQuestion = await findOneQuiz(questionId);
            if (!isEmpty(commonQuestion) || !isEmpty(childQuestion)) {
                if (!isEmpty(commonQuestion)) {
                    const saveQues = await formatQuestion(commonQuestion);
                    if (!isEmpty(saveQues)) {
                        allQuestion.push(saveQues)
                    }
                }
                if (!isEmpty(childQuestion)) {
                    const saveChildQuestion = await formatQuestion(childQuestion);
                    if (!isEmpty(saveChildQuestion)) {
                        allQuestion.push(saveChildQuestion)
                    }
                }
            }
            else {
                //YOU NEED TO GIVE ANSWER BECAUSE THERE IS NO COMMON OR CHILD QUESTION
                // I have to print answer here
                if (!isEmpty(quizQuestion.result)) {
                    const result = await quizResults.findById(quizQuestion.result)
                    return successResponse(req, res, {
                        answer: result.result,
                        id: result._id
                    })
                }
            }
            return successResponse(req, res, allQuestion, successMessages.QUIZ_FETCHED)
        }
    } else {
        return errorResponse(req, res, errorMessages.NO_DATA_FOUND)
    }
}

module.exports.getNextQuiz = async (req, res) => {
    try {
        const data = { ...req.body, ...req.params, ...req.query };
        const parentQuestionId = data.parentQuestionId;
        const parentOptionId = data.parentOptionId;
        if (!isEmpty(data)) {
            if (parentQuestionId.length === 0) {
                let questionString = "I'M LOOKING FOR HELP FOR…"
                const getQuestion = await findQuizByQuestion(questionString);
                if (!isEmpty(getQuestion)) {
                    const getQuestionOption = await findOneQuiz(getQuestion._id)
                    const quizResult = await formatOfQuestion(getQuestion, getQuestionOption)
                    return successResponse(req, res, quizResult, successMessages.QUIZ_FETCHED)
                }
                return errorResponse(req, res, errorMessages.NO_DATA_FOUND)
            } else {
                let quizResult = [];
                for await (const data of parentOptionId) {
                    const getQuestion = await findNextQuiz(data);
                    const quizQuestion = await findQuizById(parentQuestionId);
                    if (isEmpty(quizQuestion)) {
                        return errorResponse(req, res, errorMessages.NO_DATA_FOUND)
                    }
                    if (!isEmpty(getQuestion)) {
                        const getQuestionOption = await formatNextQuiz(getQuestion);
                        for await (const [i, que] of getQuestion.entries()) {
                            quizData = await formatOfQuestion(que, getQuestionOption[i])
                            quizResult.push(quizData)
                        }
                    } else {
                        return errorResponse(req, res, errorMessages.NO_DATA_FOUND)
                    }
                }
                return successResponse(req, res, quizResult, successMessages.QUIZ_FETCHED)
            }
        } else {
            return errorResponse(req, res, errorMessages.NO_DATA_FOUND)
        }
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

module.exports.createSavedQuizResult= async (req, res)=>{
    try {
        const currUser = req.user;
        if(isEmpty(currUser)){
            return errorResponse(req, res, errorMessages.USER_NOT_EXIST)
        }
        const param = { ...req.body, ...req.params, ...req.query}
        const { url, name } = param
        await createQuizResult({
            url, userId: currUser._id,
            name
        })
        return  successResponse(req, res, [], successMessages.QUIZZ_SAVED)
    } catch (err){
        return errorResponse(req, res, err.message);
    }
}

module.exports.getAllSavedQuizResult = async (req, res)=>{
    try {
        const currUser = req.user;
        if(isEmpty(currUser)){
            return errorResponse(req, res, errorMessages.USER_NOT_EXIST)
        }
        const getQuiz = await getQuizResult({
            userId: currUser._id
        })
        return successResponse(req, res, getQuiz, successMessages.QUIZ_FETCHED)
    } catch (err) {
        return errorResponse(req, res, err);
    }
}

module.exports.deleteQuizResult = async (req, res) =>{
    try {
        const param = { ...req.body, ...req.params, ...req.query}
        if(isEmpty(param.id)){
            return errorResponse(req ,res, errorMessages.ID_NOT_FOUND)
        }
        const findId = await getQuizResult({
            _id: param.id
        })
        if(isEmpty(findId)) return errorResponse(req, res, `Invalid Id`)
        console.log(findId)
        await deleteQuizResultId(findId[0]["_id"]);
        return successResponse(req, res, [], successMessages.QUIZ_DELETED)
    } catch (err) {
        return errorResponse(req, res, err);
    }
}

module.exports.sendEmailOfQuizResult = async(req, res)=>{
    try {
        const param = { ...req.body, ...req.params, ...req.query};
        const { url, email } = param;
        if(isEmpty(url)) return errorResponse(req, res, "Url not found");
        if(isEmpty(email)) return errorResponse(req, res, "email not found");
        const template = quizUrlTemplate(url);
        sendMail(email, 'Quiz Result Link', template);
        return successResponse(req, res, [], "Email Successfully Sent")
    } catch (err){
        return errorResponse(req, res, err);
    }
}


module.exports.deleteQuizByUserId = async (userId)=>{
    try {
        const quizzes = await getQuizResult({ userId })
        for(let quiz of quizzes){
            await deleteQuizResultId(quiz["_id"])
        }
        return { err: false, msg: [], val: successMessages.QUIZ_DELETED}
    } catch (err){
        return { err: true, msg: err }
    }
}
