const { errorResponse } = require("../../helpers/helpers")
const { errorMessages } = require("../../helpers/messages")

module.exports.createProviderValidation = async (req, res, next)=>{
    const params = { ...req.body, ...req.params, ...req.query};
    const requiredParams = ['name', 'types', 'headquarters', 'address', 'companySize',"city","state","zipcode","email","userId"];
    //const allowedParams = ['name', 'category', 'types', 'headquarters', 'address', 'noOfDoctors', 'companySize', 'about'];

    let failed = false;
    /*Object.keys(params).forEach((element) => {
        if (!allowedParams.includes(element)) failed = true
    });*/
    requiredParams.forEach((element) => {
        if (!params[element]) failed = true
    });

    if (failed) return errorResponse(req, res, errorMessages.INVALID_PARAMS, 400);
    return next();
}
