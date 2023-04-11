const express = require("express");
const { authentication, authorization } = require("../../middleware/middleware")
const dataApprovalController = require("./DataApproval.controller")
const router = express.Router();

router.get("/data-approval/:reqType", authentication, authorization, dataApprovalController.getAllDataApprovalByMethod)
router.put("/data-approval", authentication, authorization, dataApprovalController.updateDataApproval)

module.exports = router