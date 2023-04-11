const express = require("express");
const { authorization, authentication, singleKeyAuthorization } = require("../../middleware/middleware")
const { checkingValidation, errorResponse} = require("../../helpers/helpers")
const {errorMessages} = require("../../helpers/messages");
const feedBackController = require("./siteFeedBack.controller")
const router = express.Router();

const feedBackValidation = async (req, res, next)=>{
    const param = { ...req.body, ...req.query, ...req.params };
    const allowedParam = ["name", "siteId", "email", "feedback"]
    const requiredParam = ["name", "siteId", "email"]
    if(checkingValidation(param, requiredParam, allowedParam)){
        return errorResponse(req, res, errorMessages.INVALID_PARAMS)
    }
    return next()
}

router.post("/create-feedBack", singleKeyAuthorization, feedBackValidation, feedBackController.createSiteFeedBack )
router.get("/get-feedBack", authentication, authorization, feedBackController.getAllSiteFeedBack)
router.delete("/delete-feedBack", authentication, authorization, feedBackController.deleteSiteFeedBack)

module.exports = router