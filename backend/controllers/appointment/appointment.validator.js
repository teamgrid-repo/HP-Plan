const { errorResponse, checkingValidation} = require('../../helpers/helpers')
const { errorMessages } = require('../../helpers/messages');

module.exports.bookAppointmentValidation = async (req, res, next) => {
  const params = { ...req.body };

  const requiredParams = ['clientId', 'date']
  const allowedParams = ['clientId', 'providerId', 'siteId', 'subCategoryId', 'date', "email","contact",]

  if(checkingValidation(params, requiredParams, allowedParams)){
    return errorResponse(req, res, errorMessages.INVALID_PARAMS)
  }

  return next()
}