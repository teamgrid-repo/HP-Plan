const express = require("express");
const { createProfileValidation } = require("./userProfile.validation")
const { authentication } = require("../../middleware/middleware")
const { createAndUpdateProfile, getUserProfile } = require("./userProfile.controller")
const router = express.Router();

router.post('/profile',authentication, createAndUpdateProfile)
router.get('/getProfile/:userId',authentication, getUserProfile)
module.exports = router
