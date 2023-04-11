const organisationCrm = require("../../dbQuery/organisation");
const {
  errorResponse,
  successResponse,
  updateApproval,
} = require("../../helpers/helpers");
const { successMessages, identity } = require("../../helpers/messages");
const { isEmpty } = require("lodash");
const organisationHelper = require("./organisation.helper");
const {
  createOrganisation,
} = require("../DataApproval/DataApprovalOrganisation");
const { content } = require("../../helpers/template");
const { sendMail } = require("../../connection/smtp.connect");

exports.reqForApprovalOrganisation = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };
    param.userId = req.user._id;
    const values = await createOrganisation({
      requestBy: param.userId,
      ...param,
    });
    if (!isEmpty(values) && values.err)
      return errorResponse(req, res, values.msg, values.value);
    const update = content([
      "Thank you for submitting improvements to the provider listing. Our team will review your comments and modify the listing as appropriate. We appreciate your contribution to the quality of our directory.",
    ]);
    sendMail(req.user.email, "Update Request", update);
    return successResponse(req, res, [], successMessages.APPROVAL_CREATED);
  } catch (err) {
    return errorResponse(req, res, err, 200);
  }
};

exports.getAllOrganisation = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };
    const list = await organisationCrm.getAllOrganisationWithPagination(param);
    return successResponse(req, res, list, successMessages.DATA_FETCHED);
  } catch (err) {
    return errorResponse(req, res, err);
  }
};

exports.getAllOrganisationIdsAndNames = async (req, res) => {
  try {
    const list = await organisationCrm.getOrganisationIdsAndNames();
    return successResponse(req, res, list, successMessages.DATA_FETCHED);
  } catch (err) {
    return errorResponse(req, res, err);
  }
};

exports.getOneOrganisation = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };
    const role = req.user.role;
    let list;
    if (role === identity.ADMIN) {
      const { orgId } = param;
      list = await organisationHelper.getAdminOrganisationById(
        { orgId },
        identity.ADMIN
      );
    } else if (role === identity.PROVIDER) {
      console.log(`##Provider Fetch Request##`, param);
      list = await organisationHelper.getAdminOrganisationById(
        param,
        identity.PROVIDER
      );
    }
    if (!isEmpty(list) && list.err) {
      return errorResponse(req, res, list.msg);
    }
    return successResponse(req, res, list.msg, list.val);
  } catch (err) {
    return errorResponse(req, res, err);
  }
};

exports.createOrganisationForAdmin = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };
    param.userId = req.user._id;
    const adminOrganisation =
      await organisationHelper.createDynamicOrganisation({
        ...param,
        type: identity.ADMIN,
      });
    if (!isEmpty(adminOrganisation) && adminOrganisation.err) {
      return errorResponse(req, res, adminOrganisation.msg);
    }
    return successResponse(
      req,
      res,
      adminOrganisation.msg,
      adminOrganisation.val
    );
  } catch (err) {
    return errorResponse(req, res, err);
  }
};

exports.updateOneOrganisation = async (req, res) => {
  try {
    const param = { ...req.params, ...req.query };
    const { orgId } = param;
    const data = req.body;
    const userId = req.user._id;
    console.log(`!---Admin update!!!---`, data, orgId);
    const listing = await organisationHelper.updateOneExistingOrganisation(
      orgId,
      data,
      userId
    );
    if (!isEmpty(data["approvalId"])) {
      const approval = await updateApproval(
        data["approvalId"],
        "getOrgDataApproval",
        "updatedOrgDataApproval"
      );
      if (!approval) return errorResponse(req, res, "Send me correct approval");
    }
    if (!isEmpty(listing) && listing.err) {
      return errorResponse(req, res, listing.msg);
    }
    return successResponse(req, res, listing.msg, listing.val);
  } catch (err) {
    return errorResponse(req, res, err);
  }
};

exports.adminContactByOrganisation = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };
    const { orgId } = param;
    console.log(`!---Admin update!!!--GET-`, orgId);
    const listing = await organisationHelper.adminContactAllOrganisation(orgId);
    if (!isEmpty(listing) && listing.err) {
      return errorResponse(req, res, listing.msg);
    }
    return successResponse(req, res, listing.msg, listing.val);
  } catch (err) {
    return errorResponse(req, res, err);
  }
};

exports.getOrganisationDetailsByOrgId = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };
    console.log(`!--General User Access this Page After Filter---!!`, param);
    const orgDetailsListing =
      await organisationHelper.getOrganisationDetailsByOrgId(param);
    if (!isEmpty(orgDetailsListing) && orgDetailsListing.err) {
      return errorResponse(req, res, orgDetailsListing.msg);
    }
    return successResponse(
      req,
      res,
      orgDetailsListing.msg,
      successMessages.DATA_FETCHED
    );
  } catch (err) {
    return errorResponse(req, res, err);
  }
};

exports.searchOrganisation = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };
    console.log(`!--Search KeyWords---!!`, param);
    const organisationSearch =
      await organisationHelper.searchOrganisationBYAdmin(param);
    if (!isEmpty(organisationSearch) && organisationSearch.err) {
      return errorResponse(req, res, organisationSearch.msg, 200);
    }
    return successResponse(
      req,
      res,
      organisationSearch.msg,
      successMessages.DATA_FETCHED
    );
  } catch (err) {
    return errorResponse(req, res, err);
  }
};

exports.deleteOrganisation = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };
    const deleteOrg = await organisationHelper.deleteOrganisation(param.id);
    if (!isEmpty(deleteOrg) && deleteOrg.err) {
      return errorResponse(req, res, deleteOrg.msg);
    }
    return successResponse(
      req,
      res,
      deleteOrg.msg,
      successMessages.DATA_DELETED
    );
  } catch (err) {
    return errorResponse(req, res, err);
  }
};

exports.uploadOrganisation = async (req, res) => {
  try {
    const userId = req.user._id;
    const file = req.files;
    const uploadOrg = await organisationHelper.uploadOrganisation(file, userId);
    console.log(uploadOrg);
    if (!isEmpty(uploadOrg) && uploadOrg.err) {
      return errorResponse(req, res, uploadOrg.msg);
    }
    return successResponse(
      req,
      res,
      uploadOrg.msg,
      "Organisation Uploaded Successfully"
    );
  } catch (err) {
    return errorResponse(req, res, err);
  }
};
