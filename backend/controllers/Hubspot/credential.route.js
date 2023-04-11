const express = require("express")
const storage = require("./credential.controller")

const router = express.Router()


router.get('/outh_callback',storage.storeOuthCred)
router.post("/webhook", storage.updatePropertyByWebhook)

module.exports = router
