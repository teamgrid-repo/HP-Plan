const { status, requestType, errorMessages} = require("../../helpers/messages")
const {errorResponse, successResponse} = require("../../helpers/helpers");
const userApprovalHelper = require("./DataApprovalSubUser")
const siteApprovalHelper = require("./DataApprovalSite")
const orgApprovalHelper = require("./DataApprovalOrganisation")
const siteServiceHelper = require("./DataApprovalSiteService")
const {isEmpty} = require("lodash");

function authRole(role, desiredRole){
    let failed = false
    if(isEmpty(role) || role !== desiredRole){

        failed = true
    }
    return failed;
}

module.exports.updateDataApproval =async (req, res)=>{
    try {
        const param = { ...req.params, ...req.query, ...req.body };
        const role = req.user.role;
        if(authRole(role, "admin")) {
            return errorResponse(req, res, "Not allowed")
        }
        if(!Object.values(requestType).includes(param.type)){
            return errorResponse(req, res, `${errorMessages.INVALID_PARAMS} ${param.type}`)
        }
        if(!Object.values(status).includes(param.status)){
            return errorResponse(req, res, `${errorMessages.INVALID_PARAMS} ${param.status}`)
        }
        let dataApproval
        param.approvedBy = req.user._id
        if(param.type === requestType.PROVIDER_SUBUSER){
            dataApproval = await userApprovalHelper.updateDataApprovalRecord(param);
        } else if(param.type === requestType.SITE){
            dataApproval = await siteApprovalHelper.updatedCreateSiteRequest(param)
        }else if(param.type === requestType.ORGANISATION){
            dataApproval = await orgApprovalHelper.updateOrganisation(param)
        }else if(param.type === requestType.SITE_SERVICE){
            dataApproval = await siteServiceHelper.updateSiteService(param)
        }
        if(!isEmpty(dataApproval) && dataApproval.err){
            return errorResponse(req, res, dataApproval.msg)
        }
        return successResponse(req, res, dataApproval.msg, dataApproval.val)
    } catch (err){
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG)
    }
}

module.exports.getAllDataApprovalByMethod = async (req, res)=>{
    try {
        const param = { ...req.params, ...req.query, ...req.body };
        const role = req.user.role;
        if(authRole(role, "admin")) {
            return errorResponse(req, res, "Not allowed")
        }
        if(!Object.values(requestType).includes(param["reqType"])){
            return errorResponse(req, res, `${errorMessages.INVALID_PARAMS} ${param["reqType"]}`)
        }
        let getDataApproval;
        if(param["reqType"] === requestType.PROVIDER_SUBUSER){
            getDataApproval = await userApprovalHelper.dataApprovalAction()

        }else if(param["reqType"] === requestType.SITE){
            getDataApproval = await siteApprovalHelper.getALlList()
        }else if(param["reqType"] === requestType.ORGANISATION){
            getDataApproval = await orgApprovalHelper.getAllDataApproval()
        } else if (param["reqType"] === requestType.SITE_SERVICE){
            getDataApproval = await siteServiceHelper.getAllSiteService()
        }
        if(!isEmpty(getDataApproval) && getDataApproval.err){
            return errorResponse(req, res, getDataApproval.msg)
        }
        return successResponse(req, res, getDataApproval.msg, getDataApproval.val)
    } catch (err){
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG)
    }
}
