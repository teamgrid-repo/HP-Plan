const express = require('express');
const categoryController = require('./categories.controller')
const { singleKeyAuthorization, authentication, authorization} = require("../../middleware/middleware")
const {checkingValidation, errorResponse} = require("../../helpers/helpers");
const {errorMessages} = require("../../helpers/messages");
const router = express.Router();

const categoryValidation = async (req, res, next)=>{
    const param = { ...req.body, ...req.query, ...req.params };
    const allowedParam = ["id", "type", "updatedValue"]
    const requiredParam = ["id", "type", "updatedValue"]
    if(checkingValidation(param, requiredParam, allowedParam)){
        return errorResponse(req, res, errorMessages.INVALID_PARAMS)
    }
    return next()
}


router.get('/cure_categories', singleKeyAuthorization, categoryController.getAllCategories)
router.get('/cure_subcategories',singleKeyAuthorization, categoryController.fetchAllCategoryAndSubcategory)
//router.put('/update-category', singleKeyAuthorization, categoryController.updateCategory)
router.put("/update-cat_subCat", authentication, authorization, categoryValidation, categoryController.updateCatAndSubCatByType)

module.exports = router;
