const express = require("express");
const siteSubCategoryController = require("./siteSubCategory.controller")
const { authentication, authorization, singleKeyAuthorization } = require("../../middleware/middleware")

const router = express.Router();

router.post('/allocated-subCategory', authentication, authorization, siteSubCategoryController.createdNewSiteSubcategory);
router.get('/get-allocated-subCategory', authentication, authorization, siteSubCategoryController.getAllSiteSubcategory);
router.post('/filter-provider',singleKeyAuthorization, siteSubCategoryController.filterSitesProvider)
router.get('/get-all_stateLoc', singleKeyAuthorization,siteSubCategoryController.findAllStateLocationByCategory)

module.exports = router
