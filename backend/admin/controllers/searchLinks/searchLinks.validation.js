const { errorResponse } = require('../../../helpers/helpers')
const { errorMessages } = require('../../../helpers/messages');
const { checkingValidation } = require("../../../helpers/helpers")

module.exports.createSearchLinkValidation = async (req, res, next) => {
  const params = { ...req.body, ...req.params, ...req.query };

  const requiredParams = ['searchName', 'searchLink']
  const allowedParams = ['searchName', 'searchLink', 'notes', 'states', 'linkType','claimUserId','createdBy','claimStatus','category','subcategory','update']

  if(checkingValidation(params, requiredParams, allowedParams)){
    return errorResponse(req, res, errorMessages.INVALID_PARAMS)
  }
  return next();
}