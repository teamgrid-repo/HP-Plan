const express = require("express")
const { authentication, authorization, singleKeyAuthorization } = require("../../middleware/middleware")
const cmsController = require("./cms.controller")
const router = express.Router()

router.post("/cms", authentication, authorization, cmsController.createCmsByModule)
router.get("/cms", singleKeyAuthorization,  cmsController.getCmsByModule)

module.exports = router