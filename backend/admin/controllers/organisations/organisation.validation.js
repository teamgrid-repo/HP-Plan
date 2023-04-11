const express = require("express");
const { checkingValidation, errorResponse} = require("../../../helpers/helpers")
const {errorMessages} = require("../../../helpers/messages");
const organisationController = require("./organisation.controller")
const router = express.Router();

const globalParams = {
    allowedParams: [
        'name','publicName', 'type', 'subTypes', 'notes', 'isAChurch', 'mainWebsite','altURL',
        'altUrlDescription','street', 'state', 'city', 'zip', 'phone', 'hotline','hotlineNumber',
        'sufficientForCompliance','specialRelationship', 'email', 'searchLink', 'leadStatus',
        'geoSpan', 'elevateForReview','leafStatus', 'leafNote', 'category', 'sub_category',"id"
    ],
    requiredParam: [
        'name', 'type', 'subTypes', 'mainWebsite', 'phone','email','searchLink','leadStatus'
    ]
}

async function checkOrganisationValidation(req, res, next){
    const param = {...req.params, ...req.query, ...req.body}
    const allowedParams = globalParams.allowedParams
    const requiredParam = globalParams.requiredParam
    if(checkingValidation(param, requiredParam, allowedParams)){
        return errorResponse(req, res, errorMessages.INVALID_PARAMS);
    }
    return next()
}

async function checkUpdatedParam(req, res, next){
    const param = {...req.params, ...req.query, ...req.body};
    const allowedParams = globalParams.allowedParams
    const requiredParam = ['id']
    if(checkingValidation(param, requiredParam, allowedParams)){
        return errorResponse(req, res, errorMessages.INVALID_PARAMS);
    }
    return next()
}
router.post('/organisation', checkOrganisationValidation, organisationController.createOrganisation);
router.put('/organisation/:id', checkUpdatedParam, organisationController.updateOrganisation)
router.get('/all_organisation/', organisationController.getAllOrganisation)


module.exports = router
