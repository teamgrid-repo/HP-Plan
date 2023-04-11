const { errorResponse } = require('../../helpers/helpers')
const { errorMessages } = require('../../helpers/messages');


module.exports.createQuizQuesValidation = async (req, res, next) =>{
    const params = { ...req.body, ...req.params, ...req.query };

    const requiredParams = ['question','option',]
    const allowedParams = ['question','option','parentQuestionId','parentOptionId','result','isCommon']
    let failed = false;

    Object.keys(params).forEach((element) => {
        if (!allowedParams.includes(element)) failed = true
    });
    requiredParams.forEach((element)=>{
        if(!params[element]) failed= true
    });


    if (failed) return errorResponse(req, res, errorMessages.INVALID_PARAMS);
    return next();
}