const {errorResponse, successResponse} = require("../../helpers/helpers");
const feedbackHelper = require("./siteFeedBack.helper")
const {isEmpty} = require("lodash");


module.exports.createSiteFeedBack = async (req, res)=>{
    try {
        const param = { ...req.body, ...req.query, ...req.params };
        const createFeedBack = await feedbackHelper.createSiteFeedBack(param);
        if(!isEmpty(createFeedBack) && createFeedBack.err){
            return errorResponse(req, res, createFeedBack.msg)
        }
        return successResponse(req, res, createFeedBack.msg, createFeedBack.val)
    } catch (err) {
        return errorResponse(req, res, err)
    }
}

module.exports.getAllSiteFeedBack = async (req, res) =>{
    try {
        const user = req.user;
        if(user.role !== "admin") {
            return errorResponse(req, res, "Not allowed To visit this route")
        }
        const getAllFeedBack = await feedbackHelper.getAllSiteFeedBack()
        if(!isEmpty(getAllFeedBack) && getAllFeedBack.err){
            return errorResponse(req, res, getAllFeedBack.msg)
        }
        return successResponse(req, res, getAllFeedBack.msg, getAllFeedBack.val)
    } catch (err) {
        return errorResponse(req, res, err)
    }
}


module.exports.deleteSiteFeedBack = async (req, res)=>{
    try {
        const param = { ...req.body, ...req.query, ...req.params };
        if(isEmpty(param.id)){
            return errorResponse(req, res, "Id is Mandatory")
        }
        const deleteFeedBack = await feedbackHelper.deleteSiteFeedBack(param.id)
        if(!isEmpty(deleteFeedBack) && deleteFeedBack.err) {
            return errorResponse(req, res, deleteFeedBack.msg)
        }
        return successResponse(req, res, deleteFeedBack.msg, deleteFeedBack.val)
    } catch (err) {
        return errorResponse(req, res, err)
    }
}