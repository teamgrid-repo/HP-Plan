const { errorResponse, successResponse } = require("../../helpers/helpers");
const {
  errorMessages,
  identity,
  successMessages,
} = require("../../helpers/messages");
const termsHelper = require("./terms.helper");
const { isEmpty } = require("lodash");
module.exports.updateTerms = async (req, res) => {
  try {
    const param = { ...req.body, ...req.query, ...req.param };
    if (req.user.role !== identity.ADMIN)
      return errorResponse(req, res, "No Allowed");
    param.userid = req.user._id;
    const createOrUpdateCms = await termsHelper.updateTerms(param);

    if (!isEmpty(createOrUpdateCms) && createOrUpdateCms.err) {
      return errorResponse(req, res, createOrUpdateCms.msg);
    }
    return successResponse(
      req,
      res,
      createOrUpdateCms.msg,
      createOrUpdateCms.val
    );
  } catch (err) {
    return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG);
  }
};

module.exports.getTerms = async (req, res) => {
  try {
    const param = { ...req.body, ...req.query, ...req.param };
    const getCmsByModule = await termsHelper.getTerms(param);
    if (!isEmpty(getCmsByModule) && getCmsByModule.err) {
      return errorResponse(req, res, getCmsByModule.msg);
    }
    return successResponse(
      req,
      res,
      getCmsByModule.msg,
      successMessages.DATA_FETCHED
    );
  } catch (err) {
    console.log(err);
    return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG);
  }
};

module.exports.acceptTerms = async (req, res) => {
  try {
    const param = { ...req.params, ...req.query, ...req.body };
    const id = req.user._id;
    console.log(id);
    if (isEmpty(id)) {
      return errorResponse(req, res, "ID not found");
    }
    const acceptTerms = await termsHelper.updateProfile(id, param);

    if (!isEmpty(acceptTerms) && acceptTerms.err) {
      return errorResponse(req, res, createOrUpdateCms.msg);
    }
    return successResponse(req, res, acceptTerms.msg);
  } catch (err) {
    return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG);
  }
};
