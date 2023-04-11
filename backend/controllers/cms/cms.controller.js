const {errorResponse, successResponse} = require("../../helpers/helpers");
const {errorMessages, identity, successMessages} = require("../../helpers/messages");
const cmsHelper = require("./cms.helper")
const {isEmpty} = require("lodash");

module.exports.createCmsByModule = async (req, res)=>{
    try {
        const param = { ...req.body, ...req.query, ...req.param }
        if(req.user.role !== identity.ADMIN) return errorResponse(req, res, "No Allowed")
        param.userid = req.user._id
        const createOrUpdateCms = await cmsHelper.createOrUpdateByModuleList(param)
        if(!isEmpty(createOrUpdateCms) && createOrUpdateCms.err) {
            return errorResponse(req, res, createOrUpdateCms.msg)
        }
        return successResponse(req, res, createOrUpdateCms.msg, createOrUpdateCms.val)
    }catch (err) {
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG)
    }
}

module.exports.getCmsByModule = async (req, res)=>{
    try {
        const param = { ...req.body, ...req.query, ...req.param }
        const getCmsByModule = await cmsHelper.getCmsByModule(param)
        if(!isEmpty(getCmsByModule) && getCmsByModule.err) {
            return errorResponse(req, res, getCmsByModule.msg)
        }
        return successResponse(req, res, getCmsByModule.msg, successMessages.DATA_FETCHED)
    }catch (err) {
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG)
    }
}
