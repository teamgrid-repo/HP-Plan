const express = require("express");
const { checkingValidation, errorResponse} = require("../../helpers/helpers")
const {errorMessages} = require("../../helpers/messages");
const userStateLocController = require("./userStateLoc.controller")
const {singleKeyAuthorization, authorization, authentication} = require("../../middleware/middleware");
const router = express.Router()

const userStateLocValidation = async (req, res, next)=>{
    const param = { ...req.body, ...req.query, ...req.params };
    const allowedParam = ["ipAddress","state", "page"]
    const requiredParam = ["state", "page"]
    if(checkingValidation(param, requiredParam, allowedParam)){
        return errorResponse(req, res, errorMessages.INVALID_PARAMS)
    }
    return next()
}

router.post("/user-stateLoc",singleKeyAuthorization, userStateLocValidation, userStateLocController.createUserStateLocation)
router.get("/user-stateLoc-statistics", authentication, authorization, userStateLocController.getAllUserStateLocationStatistics )

module.exports = router
