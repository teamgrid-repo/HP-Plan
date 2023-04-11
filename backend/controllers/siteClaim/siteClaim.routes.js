const express = require("express");
const { authentication, authorization, singleKeyAuthorization } = require("../../middleware/middleware")
const { checkingValidation, errorResponse} = require("../../helpers/helpers")
const {errorMessages} = require("../../helpers/messages");
const siteClaimController = require("./siteClaim.controller")
const router = express.Router()

const claimSiteValidation = async (req, res, next)=>{
    const param = { ...req.body, ...req.query, ...req.params };
    const allowedParam = ["name","jobTitle", "howYouHeard","password","email","altEmail","siteId","firstName", "lastName","isGeneralUser",]
    const requiredParam = ["name", "email", "siteId"];
    if(checkingValidation(param, requiredParam, allowedParam)){
        return errorResponse(req, res, errorMessages.INVALID_PARAMS)
    }
    return next()
}

router.post('/claimSite', claimSiteValidation, singleKeyAuthorization, siteClaimController.createClaimSite)
router.get('/claimSite', authentication, authorization, siteClaimController.getAllClaimSite)
router.put('/claimSite/:claimId', authentication, authorization, siteClaimController.updateClaimSite)

module.exports = router
