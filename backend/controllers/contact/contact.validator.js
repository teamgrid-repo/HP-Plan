const { errorResponse } = require('../../helpers/helpers')
const { errorMessages } = require('../../helpers/messages');

module.exports.createContactValidation = async (req, res, next) => {
  const params = { ...req.body, ...req.params, ...req.query };

  const requiredParams = ['name', 'email', 'subject', 'message']
  const allowedParams = ['name', 'email', 'contact', 'subject', 'message']
  
  let failed = false;

  Object.keys(params).forEach((element) => {
    if (!allowedParams.includes(element)) failed = true
  });
  requiredParams.forEach((element) => {
    if (!params[element]) failed = true
  });

  if (failed) return errorResponse(req, res, errorMessages.INVALID_PARAMS, 400);
  return next();
}