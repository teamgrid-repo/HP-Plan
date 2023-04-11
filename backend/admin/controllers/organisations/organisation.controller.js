const organisationOrm = require("../../dbQuery/organisation")
const {errorResponse, successResponse} = require("../../../helpers/helpers");
const {errorMessages, successMessages} = require("../../../helpers/messages");


module.exports.createOrganisation = async (req, res)=>{
    try {
        const param = {...req.body, ...req.params, ...req.query}
        const data = await organisationOrm.createNewOrganisation(param);
        return successResponse(req, res, data, successMessages.ORGANISATION_UPDATED)
    } catch (err) {
        console.error("err", err);
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG);
    }
}

module.exports.updateOrganisation = async (req, res)=>{
    try{
        const data = await organisationOrm.updateOrganisationDetails(req.params.id, req.body)
        return successResponse(req, res, data, successMessages.ORGANISATION_UPDATED)
    } catch (err){
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG)
    }
}

module.exports.getAllOrganisation = async (req, res)=>{
    try {
        const OrganisationData = await organisationOrm.getAllOrganisation();
        return successResponse(req, res, OrganisationData, successMessages.OPERATION_COMPLETED)
    } catch (error){
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG)
    }
}
