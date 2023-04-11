const { errorResponse, checkingValidation } = require("../../helpers/helpers")
const { errorMessages } = require("../../helpers/messages")

module.exports.createProfileValidation = async (req, res, next)=>{
    const params = { ...req.body, ...req.params, ...req.query};
    const allowedParam = ['dob', "age","gender","religion","occupation", "maritalStatus", "userId","phone"]
    const requiredParam = ['dob', "age","gender", "maritalStatus", "userId"];

   /* if(checkingValidation(params, requiredParam, allowedParam)){
        return errorResponse(req, res, errorMessages.INVALID_PARAMS)
    }*/
    let failed = false;
    requiredParam.forEach((element) => {
        if (!params[element]) failed = true
    });
    if (failed) return errorResponse(req, res, errorMessages.INVALID_PARAMS, 400);
    return next();
}
