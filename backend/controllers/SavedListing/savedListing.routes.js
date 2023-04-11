const express = require("express");
const { authorization, authentication } = require("../../middleware/middleware")
const saveListingController = require("./savedListing.controller")
const {checkingValidation, errorResponse} = require("../../helpers/helpers");
const {errorMessages} = require("../../helpers/messages");
const router = express.Router();

const saveListingValidation = (req, res, next)=>{
    const params = {...req.body, ...req.params, ...req.query};
    const requiredParams = ["listingName"]
    const allowedParams = ["userId", "listingName", "saveListingId","siteId","organisationId","updatedName", "update", "stateLoc"];
    if(checkingValidation(params, requiredParams, allowedParams)){
        return errorResponse(req, res, errorMessages.INVALID_PARAMS)
    }
    return next();
}

const saveListingItemValidation = (req, res, next)=>{
    const params = {...req.body, ...req.params, ...req.query};
    const requiredParams = ["saveListingId","siteId","organisationId"]
    const allowedParams = ["saveListingId","siteId","organisationId"]
    if(checkingValidation(params, requiredParams, allowedParams)){
        return errorResponse(req, res, errorMessages.INVALID_PARAMS)
    }
    return next();
}

router.post("/savedListing/create&update", authentication, authorization, saveListingValidation, saveListingController.createSavedListing)
router.delete("/savedListing-delete/:id", authentication, authorization, saveListingController.deleteSavedListing)
router.get("/savedListing", authentication, authorization, saveListingController.getAllSavedListingByUserId)

router.post("/savedListingItems/create", authentication, authorization, saveListingItemValidation, saveListingController.createSavedItemsListing)
router.delete("/savedListingItems-delete/:id", authentication, authorization, saveListingController.deleteSavedItemListing);

module.exports = router