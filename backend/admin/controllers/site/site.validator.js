const { errorResponse } = require('../../../helpers/helpers')
const { errorMessages } = require('../../../helpers/messages');

module.exports.createSiteValidation = async (req, res, next) => {
  const params = { ...req.body };

  const requiredParams = ['name','organisationId',"userId"]
  const allowedParams = ['name', 'description', 'address', 'zipcode', 'state', 'website', 'category', 'subcategory', 'organisationId',"userId","location","additional","publish","HQ", "virtual","homeVisit","city","radius"]

  let failed = false;

  Object.keys(params).forEach((element) => {
    if (!allowedParams.includes(element)){
      console.log(`createSiteValidation....>>element`,element)
      failed = true
    }
  });
  requiredParams.forEach((element) => {
    if (!params[element]) failed = true
  });

  if (failed) return errorResponse(req, res, errorMessages.INVALID_PARAMS, 400);
  return next();
}
