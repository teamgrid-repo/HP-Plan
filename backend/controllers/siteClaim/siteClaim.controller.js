const {errorMessages, successMessages} = require("../../helpers/messages");
const {successResponse, errorResponse} = require("../../helpers/helpers");
const siteClaimHelper = require("./siteClaim.helper")
const {isEmpty} = require("lodash");

module.exports.createClaimSite = async (req, res)=>{
    try {
        const param = { ...req.body, ...req.query, ...req.params };
        const createClaim = await siteClaimHelper.createSiteClaim(param);
        if(!isEmpty(createClaim) && createClaim.err){
            return errorResponse(req, res, createClaim.msg)
        }
        return successResponse(req, res, createClaim.msg, successMessages.CLAIM_CREATED)
    } catch (err) {
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG)
    }
}

module.exports.getAllClaimSite = async (req, res)=>{
    try {
        const userRole = req.user.role;
        if(userRole !== "admin"){
            return errorResponse(req, res, "You are not authorised")
        }
        const getAllClaimSite =await siteClaimHelper.getALlClaimSite();
        if(!isEmpty(getAllClaimSite) && getAllClaimSite.err){
            return errorResponse(req, res, getAllClaimSite.msg)
        }
        return successResponse(req, res, getAllClaimSite.msg, successMessages.DATA_FETCHED)
    } catch (err) {
        return errorMessages(req, res, errorMessages.SOMETHING_WENT_WRONG)
    }
}

module.exports.updateClaimSite = async (req, res)=>{
    try {
        const claimId = req.params["claimId"]

        let data = req.body;
        const currUser = req.user._id
        const userRole = req.user.role;
        if(userRole !== "admin"){
            return errorResponse(req, res, "You are not authorised")
        }
        const updatedClaim =await siteClaimHelper.updatedClaimSite(claimId, data, currUser);
        if(!isEmpty(updatedClaim) && updatedClaim.err){
            return errorResponse(req, res, updatedClaim.msg)
        }
        return successResponse(req, res, updatedClaim.msg, updatedClaim.val)
    } catch (err) {
        return errorMessages(req, res, errorMessages.SOMETHING_WENT_WRONG)
    }
}