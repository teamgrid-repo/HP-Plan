const { errorMessages, successMessages } = require("../../helpers/messages")
const { checkingValidation, errorResponse} = require("../../helpers/helpers")

exports.organisationValidation = async (req, res, next)=>{
    const params = {...req.body, ...req.params, ...req.query};

    const requiredParams = ['providerId']
    const allowedParams = ['name', 'contact', 'address', 'website','providerId','zipcode',
        'state', 'about', 'category', 'subcategory','leaf','virtual', "price", 'specialQues', "homeVisit",
        "email","complianceComplete","orgType","altWebsite","city","location","publish", "publicName"
    ];

    if(checkingValidation(params, requiredParams, allowedParams)){
        return errorResponse(req, res, errorMessages.INVALID_PARAMS)
    }
    return next()
}

exports.singleOrganisationValidation = (req, res, next)=>{
    const params = {...req.body, ...req.params, ...req.query};
    const requiredParams = ['providerId']
    const allowedParams = ['providerId'];
    if(checkingValidation(params, requiredParams, allowedParams)){
        return errorResponse(req, res, errorMessages.INVALID_PARAMS)
    }
    return next()
}
