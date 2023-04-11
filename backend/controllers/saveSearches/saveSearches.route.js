const express = require("express");
const { authentication, authorization } = require("../../middleware/middleware")
const savedSearchesController = require("./saveSearches.controller")
const router = express.Router();

router.post("/save-searches", authentication, authorization, savedSearchesController.createSaveSearches)
router.post("/get-save-searches", authentication, authorization, savedSearchesController.getAllSaveSearches)
router.delete("/delete-save-searches/:id", authentication, authorization, savedSearchesController.deleteSaveSearches)

module.exports = router