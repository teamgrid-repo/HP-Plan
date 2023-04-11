const express = require("express");
const { authentication, authorization } = require("../../middleware/middleware")
const teamListingController = require("./teamListing.controller")
const upload = require("../../connection/multer")
const router = express.Router();

router.post("/herPlan-team", authentication, authorization, upload.any(), teamListingController.createTeamList)
router.get("/herPlan-team", teamListingController.getTeamList)
router.put("/herPlan-team/:teamId", authentication, authorization, upload.any(), teamListingController.updateTeamList)
router.delete("/herPlan-team/:teamId", authentication, authorization, teamListingController.deleteTeamList)

module.exports = router