const { isEmpty } = require("lodash");
const {getOneSite } = require("../../dbQuery/site");
const { errorResponse, successResponse, updateApproval} = require("../../../helpers/helpers");
const { errorMessages, successMessages, identity, method} = require("../../../helpers/messages");
const siteOrm = require("../../dbQuery/site")
const dataApprovalSiteHelper = require("../../../controllers/DataApproval/DataApprovalSite")
const { createSties, getAllSitesByUser, getAllSiteByOrganisation, findAllState, updatedSiteDataAndSiteSubCategory, deleteSiteBySiteId} = require("./site.helper")
const {content} = require("../../../helpers/template");
const {sendMail} = require("../../../connection/smtp.connect");

// CREATE SITE
module.exports.createSite = async (req, res) => {
  try {
    const param = {...req.body, ...req.params, ...req.query};
    const currUser = req.user;
    if(!isEmpty(currUser) && currUser.role !== identity.ADMIN){
      const findAlreadyExistSites = await siteOrm.findSites({ organisationId: param.organisationId, name: param.name });
      if(!isEmpty(findAlreadyExistSites)) return { err: true, msg: "Site Name is already associate with this organisation"}
      const createReq = await dataApprovalSiteHelper.createSiteRequestForAdmin({ requestBy: currUser._id, ...param, method: method.CREATE })
      if(!isEmpty(createReq) && createReq.err) return errorResponse(req, res, createReq.msg);
      const update = content(['Thank you for submitting improvements to the provider listing. Our team will review your comments and modify the listing as appropriate. We appreciate your contribution to the quality of our directory.'])
      sendMail(req.user.email, "Update Request", update)
      return successResponse(req, res, [], successMessages.APPROVAL_CREATED)
    }
    const data = await createSties(param, currUser);
    if(!isEmpty(data) && data.err){
      return  errorResponse(req, res, data.msg);
    }
    return successResponse(req, res, data.msg, successMessages.SITE_CREATED)
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
}

// GET ALL SITE
exports.getAllSite = async (req, res) => {
  try {
    const param = {...req.body, ...req.params, ...req.query};
    const data = await getAllSitesByUser(param);
    if (!isEmpty(data) && data.err) return errorResponse(req, res, data.msg);
    return successResponse(req, res, data.msg, successMessages.DATA_FETCHED);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

// GET ONE SITE
exports.getOneSite = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };
    const data = await getOneSite(param.siteId);
    if (isEmpty(data)) return errorResponse(req, res, errorMessages.NO_DATA_FOUND);

    return successResponse(req, res, data, successMessages.DATA_FETCHED);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

// UPDATE SITE BY ID
exports.updateSite = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };
    const id = param.siteId
    const data = param;
    console.log(`Site Id--${id} and Updated Site Data ----- ${JSON.stringify(data)}`);
    if (isEmpty(id) || isEmpty(data)) return errorResponse(req, res, errorMessages.ID_NOT_FOUND)
    const currUser = req.user;
    if(!isEmpty(currUser) && currUser.role !== identity.ADMIN){
      const findSites = await siteOrm.findSites({ _id: data.siteId });
      const createReq = await dataApprovalSiteHelper.createSiteRequestForAdmin({
        requestBy: currUser._id, ...data, method: method.UPDATE, organisationId: findSites[0]["organisationId"]
      })
      if(!isEmpty(createReq) && createReq.err) return errorResponse(req, res, createReq.msg);
      const update = content(['Thank you for submitting improvements to the provider listing. Our team will review your comments and modify the listing as appropriate. We appreciate your contribution to the quality of our directory.'])
      sendMail(req.user.email, "Update Request", update)
      return successResponse(req, res, [], successMessages.APPROVAL_CREATED)
    }
    await updatedSiteDataAndSiteSubCategory( id,data );
    if(!isEmpty(param["approvalId"])){
      const approval = await updateApproval(param["approvalId"],"getSiteDataApproval", "updatedSiteDataApproval" )
      if(!approval) return errorResponse(req, res, "Send me correct approval")
    }
    return successResponse(req, res, data, successMessages.SITE_UPDATED);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

// DELETE SITE BY ID
exports.deleteSite = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };
    const currUser = req.user;
    if(!isEmpty(currUser) && currUser.role !== identity.ADMIN){
      const siteDetail = await siteOrm.getOneSite(param.siteId);
      const createReq = await dataApprovalSiteHelper.createSiteRequestForAdmin({
        requestBy: currUser._id, siteId: param.siteId, method: method.DELETE,organisationId: siteDetail["organisationId"]
      })
      if(!isEmpty(createReq) && createReq.err) return errorResponse(req, res, createReq.msg);
      return successResponse(req, res, [], successMessages.APPROVAL_CREATED)
    }
    const data = await deleteSiteBySiteId(param.siteId)
    if(!isEmpty(param["approvalId"])){
      const approval = await updateApproval(param["approvalId"], "getSiteDataApproval", "updatedSiteDataApproval" )
      if(!approval) return errorResponse(req, res, "Send me correct approval")
    }
    if (!isEmpty(data)) {
      return successResponse(req, res, data, successMessages.DATA_DELETED);
    }
    return errorResponse(req, res, errorMessages.NO_DATA_FOUND);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

//ADMIN

exports.getAllSiteByOrganisation = async (req, res) =>{
  try {
    const param = { ...req.body, ...req.params, ...req.query };
    const { organisationId } = param;
    console.log(`!!!---Admin Organisation Id---!!`,organisationId);
    const data = await getAllSiteByOrganisation(organisationId);
    if(!isEmpty(data) && data.err){
      return errorResponse(req, res, data.msg);
    }
    return successResponse(req, res, data.msg, data.val)
  } catch ( err ){
    return errorResponse(req, res, err.message);
  }
}

exports.getAllSitesStates = async (req, res) =>{
  try {
    const findState = await findAllState();
    if(!isEmpty(findState) && findState.err) {
      return  errorResponse(req, res, findState.msg)
    }
    return successResponse(req, res, findState.msg, successMessages.DATA_FETCHED)
  } catch (err){
    return errorResponse(req, res, err.message);
  }
}

