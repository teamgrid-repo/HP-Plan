const { createUserProfile, getUserProfile } =require("./userProfile.helper")
const {errorResponse, successResponse} = require("../../helpers/helpers");
const {errorMessages, successMessages} = require("../../helpers/messages");
const {isEmpty} = require("lodash");

module.exports.createAndUpdateProfile = async (req, res )=>{
    try {
        const param = {...req.body, ...req.query, ...req.params};
        const data = await createUserProfile(param, req.user.email);
        if(!isEmpty(data) && data.err){
            return errorResponse( req , res, data.msg);
        }
        return successResponse(req, res, data.msg, data.val);
    } catch (err){
        return errorResponse( req, res, errorMessages.SOMETHING_WENT_WRONG)
    }
}

module.exports.getUserProfile = async (req, res)=>{
    try {
        const param = {...req.body, ...req.query, ...req.params};
        const data = await getUserProfile({
            userId: param.userId
        });
        if(!isEmpty(data) && data.err){
            return errorResponse( req , res, data.msg);
        }
        return successResponse(req, res, data.msg , successMessages.PROFILE_FETCHED);
    } catch (err){
        return errorResponse( req, res, errorMessages.SOMETHING_WENT_WRONG)
    }
}
