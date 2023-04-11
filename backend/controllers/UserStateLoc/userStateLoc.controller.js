const {errorResponse, successResponse} = require("../../helpers/helpers");
const {errorMessages, successMessages} = require("../../helpers/messages");
const userStateLocHelper = require("./userStateLoc.helper")
const {isEmpty} = require("lodash");

module.exports.createUserStateLocation = async (req, res) => {
    try {
        const param = { ...req.body, ...req.query, ...req.params };
        const createLocation = await userStateLocHelper.createUserStateLoc(param)
        if(!isEmpty(createLocation) && createLocation.err){
            return errorResponse(req, res, createLocation.msg)
        }
        return successResponse(req, res, createLocation.msg, "successfully done")
    } catch (err) {
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG)
    }
}

module.exports.getAllUserStateLocationStatistics = async (req, res )=>{
    try {
        const getAllStateLoc = await userStateLocHelper.getStatisticsOfStateLoc()
        if(!isEmpty(getAllStateLoc) && getAllStateLoc.err) {
            return errorResponse(req, res, getAllStateLoc.msg)
        }
        return successResponse(req, res, getAllStateLoc.msg, successMessages.DATA_FETCHED)
    } catch (err) {
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG)
    }
}