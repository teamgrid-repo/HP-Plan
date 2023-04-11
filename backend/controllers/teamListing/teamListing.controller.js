const teamListingHelper = require("./teamListing.helper")
const {errorResponse, successResponse} = require("../../helpers/helpers");
const {errorMessages} = require("../../helpers/messages");
const {isEmpty} = require("lodash");

function authRole(role, desiredRole){
    let failed = false
    if(isEmpty(role) || role !== desiredRole){

        failed = true
    }
    return failed;
}

module.exports.createTeamList = async (req, res) =>{
    try {
        const param = { ...req.body, ...req.query, ...req.param }
        const file = req.files
        if(authRole(req.user.role, "admin")) return errorResponse(req, res, "Not allowed")
        if(isEmpty(param.name)) return errorResponse(req, res, "Name Field is Required")
        if(isEmpty(file)) return errorResponse(req, res, "staffImage Field is Required")
        if(isEmpty(param.description)) return errorResponse(req, res, "description Field is Required")
        param.userId = req.user._id
        param.staffImage = file[0]
        const createTeam = await teamListingHelper.createNewTeam(param)
        const { msg, err, val} = createTeam
        if(!isEmpty(createTeam) && err) {
            return errorResponse(req, res, msg)
        }
        return successResponse(req, res, msg, val)
    } catch (err) {
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG)
    }
}

module.exports.getTeamList = async (req, res) =>{
    try {
        const param = { ...req.body, ...req.query, ...req.param }

        const teamListing = await teamListingHelper.getAllTeam(param)
        const { msg, err, val} = teamListing
        if(!isEmpty(teamListing) && err) {
            return errorResponse(req, res, msg)
        }
        return successResponse(req, res, msg, val)
    } catch (err) {
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG)
    }
}

module.exports.updateTeamList = async (req, res) =>{
    try {
        const param = { ...req.body, ...req.query, ...req.params }
        if(authRole(req.user.role, "admin")) return errorResponse(req, res, "Not allowed")
        if(isEmpty(param["teamId"])) return errorResponse(req, res, "Id Field is Required")
        const file = req.files
        if(!isEmpty(file)){ param.staffImage = file[0] }
        param.userId = req.user._id
        const updateListing = await teamListingHelper.updateTeamList(param["teamId"],param)
        const { msg, err, val} = updateListing
        if(!isEmpty(updateListing) && err) {
            return errorResponse(req, res, msg)
        }
        return successResponse(req, res, msg, val)
    } catch (err) {
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG)
    }
}

module.exports.deleteTeamList = async (req, res) =>{
    try {
        const param = { ...req.body, ...req.query, ...req.params }
        if(authRole(req.user.role, "admin")) return errorResponse(req, res, "Not allowed")
        if(isEmpty(param["teamId"])) return errorResponse(req, res, "Id Field is Required")
        const deleteListing = await teamListingHelper.deleteTeamListing(param["teamId"],param)
        const { msg, err, val} = deleteListing
        if(!isEmpty(deleteListing) && err) {
            return errorResponse(req, res, msg)
        }
        return successResponse(req, res, msg, val)
    } catch (err) {
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG)
    }
}