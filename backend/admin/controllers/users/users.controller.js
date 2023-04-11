const {errorResponse, successResponse} = require("../../../helpers/helpers");
const userHelper = require("./users.helper");
const providerOrm = require("../../../dbQuery/provider");
const organisationCrm = require("../../../dbQuery/organisation");
const siteOrm = require("../../../admin/dbQuery/site");
const sitesSubcategoryOrm = require("../../../dbQuery/sitesSubcategory")
const pocAccounts = require("../../../dbQuery/pocAccounts")
const { isEmpty } = require("lodash")
const {errorMessages, signUpType, successMessages, providerType} = require("../../../helpers/messages");
const dataApproval = require("../../../controllers/DataApproval/DataApprovalSubUser");

function authRole(role, desiredRole){
    let failed = false
    if(isEmpty(role) || role !== desiredRole){

        failed = true
    }
    return failed;
}

module.exports.createAdminUser = async (req, res) =>{
    try {
        const param = { ...req.body, ...req.params, ...req.query };
        if(![signUpType.WEB].includes(param.type)){
            return errorResponse(req, res, `${param.type} is not valid`)
        }
        param.subRoleCreatedBy = req.user._id;
        const createUser = await userHelper.createAdminUser(param);
        if(!isEmpty(createUser) && createUser.err ){
            return errorResponse(req, res, createUser.msg)
        }
        return successResponse(req, res, createUser.msg, createUser.val)
    } catch (err) {
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG)
    }
}

module.exports.getAdminUser = async (req, res) =>{
    try {
        const keyword = { ...req.query }
        const role = req.user.role;
        if(authRole(role, "admin")) {
            return errorResponse(req, res, "Not allowed")
        }
        const currId = req.user._id
        const getAllUser = await userHelper.getAllAdminUser(currId, keyword);
        if(!isEmpty(getAllUser) && getAllUser.err ){
            return errorResponse(req, res, getAllUser.msg)
        }
        return successResponse(req, res, getAllUser.msg, successMessages.DATA_FETCHED)
    } catch (err) {
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG)
    }
}

module.exports.updateAdminUser = async (req, res) =>{
    try {
        const role = req.user.role;
        if(authRole(role, "admin")) {
            return errorResponse(req, res, "Not allowed")
        }
        const param = { ...req.body, ...req.params, ...req.query };
        if(isEmpty(param.id)){
            return errorResponse(req, res, errorMessages.ID_NOT_FOUND)
        }
        const updatedUser = await userHelper.updateAdminUser(param.id, param);
        if(!isEmpty(updatedUser) && updatedUser.err ){
            return errorResponse(req, res, updatedUser.msg)
        }
        return successResponse(req, res, updatedUser.msg, updatedUser.val)
    } catch (err){
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG)
    }
}

module.exports.deleteAdminUser = async (req, res) =>{
    try {
        const role = req.user.role;
        if(authRole(role, "admin")) {
            return errorResponse(req, res, "Not allowed")
        }
        const param = { ...req.body, ...req.params, ...req.query };
        if(isEmpty(param.id)){
            return errorResponse(req, res, errorMessages.ID_NOT_FOUND)
        }
        const deletedUser = await userHelper.deleteAdminUser(param.id, param);
        if(!isEmpty(deletedUser) && deletedUser.err ){
            return errorResponse(req, res, deletedUser.msg)
        }
        return successResponse(req, res, deletedUser.msg, deletedUser.val)


    } catch (err){
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG)
    }
}

module.exports.getAllProviderOrGeneral = async (req, res)=>{
    try {
        const role = req.user.role;
        if(authRole(role, "admin")) {
            return errorResponse(req, res, "Not allowed")
        }
        const param = { ...req.body, ...req.params, ...req.query };
        if(isEmpty(param.type)){
            return errorResponse(req, res, "search item not found")
        }
        const getALlUser = await userHelper.getAllGeneralOrProvider(param.type);
        if(!isEmpty(getALlUser) && getALlUser.err ){
            return errorResponse(req, res, getALlUser.msg)
        }
        return successResponse(req, res, getALlUser.msg, getALlUser.val)
    } catch (err) {
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG)
    }
}

module.exports.freezeAccount = async (req, res)=>{
    try {
        const role = req.user.role;
        if(authRole(role, "admin")) {
            return errorResponse(req, res, "Not allowed")
        }
        const param = { ...req.body, ...req.params, ...req.query };
        if(isEmpty(param.id)){
            return errorResponse(req, res, errorMessages.ID_NOT_FOUND)
        }
        const freezeAccount = await userHelper.freezeAccount(param);
        if(!isEmpty(freezeAccount) && freezeAccount.err ){
            return errorResponse(req, res, freezeAccount.msg)
        }
        return successResponse(req, res, freezeAccount.msg, freezeAccount.val)
    } catch (err){
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG)
    }
}

module.exports.deleteAccount = async (req, res)=>{
    try {
        const role = req.user.role;
        if(authRole(role, "admin")) {
            return errorResponse(req, res, "Not allowed")
        }
        const param = { ...req.body, ...req.params, ...req.query };
        if(!Object.values(providerType).includes(param["accountType"])){
            return errorResponse(req, res, `${param["accountType"]} is not valid type`)
        }
        if(isEmpty(param.id)){
            return errorResponse(req, res, errorMessages.ID_NOT_FOUND)
        }
        const deleteAccountByAdmin = await userHelper.deleteAccount(param);
        if(!isEmpty(deleteAccountByAdmin) && deleteAccountByAdmin.err ){
            return errorResponse(req, res, deleteAccountByAdmin.msg)
        }
        return successResponse(req, res, deleteAccountByAdmin.msg, deleteAccountByAdmin.val)
    } catch (err){
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG)
    }
}

module.exports.getAllGhostAccount = async (req, res) => {
    try {
      const role = req.user.role;
      if (authRole(role, "admin")) {
        return errorResponse(req, res, "Not allowed");
      }
      const getAllGhostProvider = await userHelper.getGhostProvider();
      if (!isEmpty(getAllGhostProvider) && getAllGhostProvider.err) {
        return errorResponse(req, res, getAllGhostProvider.msg);
      }
      return successResponse(
        req,
        res,
        getAllGhostProvider.msg,
        getAllGhostProvider.val
      );
    } catch (err) {
      return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG);
    }
  };

  module.exports.delGhostProvider = async (req, res) => {
    try {
      console.log("del");
      const role = req.user.role;
      if (authRole(role, "admin")) {
        return errorResponse(req, res, "Not allowed");
      }
      const param = { ...req.body, ...req.params, ...req.query };

      console.log("param",param)
      // if (isEmpty(param.type)) {
      //   return errorResponse(req, res, "search item not found");
      // }
      //const getALlUser = await userHelper.delGhostProvider(param);
      const providerDetails = await providerOrm.filterProvider({"_id":param.providerId});
      let provider = providerDetails[0]

      const oooo = await organisationCrm.getOrganisationById(provider.organization);


      const sss=await organisationCrm.addPoc(
        {
          "organisationId":provider.organization,
          "email":provider.email,
          "name":provider.name,
          "contact":provider.contact,
          "firstName":provider.firstName || " ",
          "lastName":provider.lastName || " ",
          "jobTitle":provider.jobTitle|| " "
        })

      let poc = sss.poc

      let staticPocData = poc.find(o => o.email === provider.email);

      const addPoc =await pocAccounts.addPocAccount({
        "staticPocId":staticPocData._id,
        "email":staticPocData.email,
        "name":staticPocData.name,
        "firstName":staticPocData.firstName,
        "lastName":staticPocData.lastName ,
        "jobTitle":staticPocData.jobTitle,
        "contact":staticPocData.contact,
        "organisationId":provider.organization,
        "isGhost":true
      })


      siteIds = await siteOrm.findSitesIds({"organisationId":provider.organization});

      ids = siteIds.map(({ id }) => id);

      const usss= await sitesSubcategoryOrm.addstaticpoc(
        {
          "staticPocId":staticPocData._id,
          "email":staticPocData.email,
          "name":staticPocData.name,
          "firstName":staticPocData.firstName,
          "lastName":staticPocData.lastName,
          "jobTitle":staticPocData.jobTitle,
          "contact":staticPocData.contact,
          //"userId":provider.userId
        },provider.userId,ids)

      let getALlUser = await dataApproval.deleteSubUserByAdmin(
        param.userId,
        param.providerId
      );

      if (!isEmpty(getALlUser) && getALlUser.err) {
        return errorResponse(req, res, getALlUser.msg);
      }
      return successResponse(req, res, getALlUser.msg, getALlUser.val);
    } catch (err) {
      return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG);
    }
  };
