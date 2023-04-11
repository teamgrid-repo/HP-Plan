const {errorResponse, successResponse} = require("../../helpers/helpers");
const {successMessages} = require("../../helpers/messages");
const specialQualifHelper = require("./specialQuali.helper")
const {isEmpty} = require("lodash");
module.exports.getSpecialQualification = async (req, res) =>{
    try {
        const param = { ...req.params, ...req.query, ...req.body };
        const getSpecialQualification = await specialQualifHelper.getSpecialQualification(param);
        if(!isEmpty(getSpecialQualification) && getSpecialQualification.err){
            return  errorResponse(req, res, getSpecialQualification.msg, 200)
        }
        return successResponse(req, res,getSpecialQualification.msg, successMessages.DATA_FETCHED)
    }catch (err) {
        return errorResponse(req, res, err, 200)
    }
}

module.exports.createSp = async (req, res)=>{
    try {
        const param = { ...req.params, ...req.query, ...req.body };
        const result = await specialQualifHelper.createSpecialQualification(param)
        if(!isEmpty(result) && result.err ){
            return errorResponse(req, res, result.msg, 200)
        }
        return successResponse(req, res, result.msg, successMessages.DATA_FETCHED)
    }catch (err) {
        return errorResponse(req, res, err, 200)
    }
}