const express = require("express");
const { singleKeyAuthorization } = require("../../middleware/middleware")
const { getSpecialQualification, createSp } = require("./specialQuali.controller")
const router = express.Router();

router.get('/special-qualification', singleKeyAuthorization, getSpecialQualification)
//router.post('/special-qualification', createSp)

module.exports = router