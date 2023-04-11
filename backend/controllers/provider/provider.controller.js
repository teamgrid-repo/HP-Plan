const { isEmpty, filter } = require("lodash");
const mongoose = require("mongoose");
const ProviderOrm = require("../../dbQuery/provider")
const { errorMessages, successMessages, identity, method, status} = require("../../helpers/messages")
const { errorResponse, successResponse } = require("../../helpers/helpers")
const { omit } = require("lodash")
const userOrm = require("../../dbQuery/users")
const providerOrm = require("../../dbQuery/provider");
const userProfileOrm = require("../../dbQuery/userProfile")
const providerHelper = require("./provider.helper")
const providerSiteHelper = require("./providersite.helper")
const organisationCrm = require("../../dbQuery/organisation");
const pocAccounts = require("../../dbQuery/pocAccounts");
const siteOrm = require("../../admin/dbQuery/site");
const sitesSubcategoryOrm = require("../../dbQuery/sitesSubcategory");
const { sendMail } = require("../../connection/smtp.connect");
const { content } = require("../../helpers/template");
const randomize = require("randomatic");
const crypto = require("crypto");

module.exports.newProvider = async (data, sheetUpload= false) => {
    try {
        const { name, email } = data
        const getProvider = await ProviderOrm.getProviderByName({
            name, email
        });
        if (!isEmpty(getProvider)) {
            return {
                err: true, msg: "Account already Exists"
            }
        }
        const value = await ProviderOrm.createProvider(data);
        return { err: false, msg: value }
    } catch (err) {
        return {
            err: true,
            msg: err
        }
    }
}

module.exports.createProvider = async (req, res) => {
    const params = { ...req.body, ...req.query, ...req.params }
    try {
        const value = await this.newProvider(params)
        if (!isEmpty(value) && value.err) {
            return errorResponse(req, res, value.msg)
        }
        return successResponse(req, res, value.msg, successMessages.PROVIDER_UPDATED)
    } catch (err) {
        console.error("err: ", err)
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG)
    }
}

module.exports.getAllProvider = async (req, res) => {
    try {
        const providerListing = await ProviderOrm.getAllProvider();
        if (!isEmpty(providerListing)) {
            return successResponse(req, res, providerListing, successMessages.DATA_FETCHED)
        }
        return successResponse(req, res, [], errorMessages.NO_DATA_FOUND)
    } catch (err) {
        console.log(`Get All Provider Err: `, err);
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG)
    }
}

module.exports.getOneProvider = async (req, res) => {
    try {
        const param = { ...req.body, ...req.params, ...req.query }
        const { id } = param;
        const providerListing = await ProviderOrm.getOneProvider(id);
        if (!isEmpty(providerListing)) {
            return successResponse(req, res, providerListing, successMessages.PROFILE_FETCHED)
        }
        return successResponse(req, res, [], errorMessages.NO_DATA_FOUND)
    } catch (err) {
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG)
    }
}


module.exports.getProviderByUserId = async (req, res) => {
    try {
        const param = { ...req.body, ...req.params, ...req.query }
        const { userId, email } = param;
        if (!isEmpty(userId)) {
            const getProvider = await ProviderOrm.getProviderByName({ userId, email });
            const siteInfoByProvider = await providerSiteHelper.getSiteWithSubCategoryInfoByUserId(getProvider)
            if(!isEmpty(siteInfoByProvider) && siteInfoByProvider.err){
                return errorResponse(req, res, siteInfoByProvider.msg)
            }
            const getUserId = await userOrm.getUserById(userId)
            let provider = { ...getProvider["_doc"],searchResults: getProvider["organization"].searchResults, totalAssigned: getProvider["organization"].totalAssigned || 10, siteInfo: siteInfoByProvider.msg, image: getUserId["image"] || ''}
            provider = omit(provider, ['organization'])
            if (!isEmpty(provider)) {
                return successResponse(req, res, provider, successMessages.PROFILE_FETCHED)
            } else {
                return errorResponse(req, res, "No data Found")
            }
        } else {
            return errorResponse(req, res, "User Id not found")
        }
    } catch (err) {
        console.log(`Get Provider Err: `, err);
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG)
    }
}

module.exports.saveClients = async (req, res) =>{
    try {
        const param = { ...req.body, ...req.params, ...req.query }
        if(isEmpty(param.clientId)) return errorResponse(req, res, errorMessages.INVALID_PARAMS);
        param.userId = req.user._id;
        const getProviderInfo = await ProviderOrm.filterProvider({ userId: req.user._id });
        if(isEmpty(getProviderInfo)) return errorResponse(req, res, "Provider Details Not found");
        const clientProfile = await userProfileOrm.getUserProfileById(param.clientId)
        if(isEmpty(clientProfile)) return errorResponse(req, res, "Client Id is not valid");
        const provider = getProviderInfo[0]
        const saveClientData = provider.saveClientUserId || []
        const checkClientAlreadySaved = await ProviderOrm.filterProvider({ saveClientUserId: { $in: param.clientId }, _id: provider._id})
        if(!isEmpty(checkClientAlreadySaved)){
            return errorResponse(req, res, "Client is Already Saved")
        }
        saveClientData.push(param.clientId);
        console.log(`,..................saveClientData--`,saveClientData)
        await ProviderOrm.updateProviderInfo({
            saveClientUserId: saveClientData
        }, req.user._id);
        return successResponse(req, res, [], successMessages.SAVED_UPDATED)
    } catch (err){
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG)
    }
}

module.exports.getSaveClients = async (req, res)=>{
    try {
        const userId = req.user._id;
        const getProviderInfo = await ProviderOrm.filterProvider({ userId });
        if(isEmpty(getProviderInfo)) return errorResponse(req, res, "Provider Details Not found");
        const provider = getProviderInfo[0]
        const saveClientData = provider.saveClientUserId || []
        if(isEmpty(saveClientData)){
            return successResponse(req, res, [], successMessages.SAVED_FETCHED)
        }
        const data = await userProfileOrm.getUserProfileOfArray(saveClientData);
        return successResponse(req, res, data, successMessages.SAVED_FETCHED)
    } catch (err) {
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG)
    }
}

module.exports.deleteSaveClient = async (req, res) =>{
    try {
        const param = { ...req.body, ...req.params, ...req.query }
        const { clientId } = param;
        const userId = req.user._id;
        const getProviderInfo = await ProviderOrm.filterProvider({ userId });
        if(isEmpty(getProviderInfo)) return errorResponse(req, res, "Provider Details Not found");
        const provider = getProviderInfo[0]
        const saveClientData = provider.saveClientUserId || [];
        if(isEmpty(saveClientData)) return errorResponse(req, res, errorMessages.NO_DATA_FOUND)
        const clientProfile = await ProviderOrm.filterProvider({ saveClientUserId: { $in: clientId }, _id: provider._id})
        if(isEmpty(clientProfile)) return errorResponse(req, res, "Client Id is not valid");
        const removedArr = filter(saveClientData, (id) => id != clientId)
        await ProviderOrm.updateProviderInfo({
            saveClientUserId: removedArr
        }, req.user._id);
        return successResponse(req, res, [], successMessages.SAVED_DELETED)
    }catch (err) {
        return errorResponse(req, res, err)
    }
}

module.exports.searchSavedClient = async (req, res) =>{
    try {
        const param = { ...req.body, ...req.params, ...req.query }
        if(isEmpty(param.keyword)){
            return errorResponse(req, res, errorMessages.INVALID_PARAMS)
        }
        param.userId = req.user._id
        const searchedResult = await providerHelper.searchesSavedClient(param);
        if(!isEmpty(searchedResult) && searchedResult.err){
            return errorResponse(req, res, searchedResult.msg, 200)
        }
        return successResponse(req, res, searchedResult.msg, successMessages.DATA_FETCHED)
    } catch (err){
        return errorResponse(req, res, err)
    }
}


module.exports.updateAccountApproval = async (req, res) =>{
    try {
        const data = { ...req.body }
        const userRole = req.user.role;
        if(userRole !== identity.ADMIN){
            return errorResponse(req, res, errorMessages.YOU_ARE_NOT_AUTHORIZED)
        }
        const userId = req.user._id;
        const updateAccountApproval = await providerHelper.updateAccountApproval(data, userId);
        if(!isEmpty(updateAccountApproval) && updateAccountApproval.err){
            return errorResponse(req, res, updateAccountApproval.msg, 200)
        }
        return successResponse(req, res, updateAccountApproval.msg, successMessages.PROVIDER_UPDATED)
    } catch (err) {
        return errorResponse(req, res, err)
    }
}

module.exports.shiftProviderOrganisation = async (req, res ) =>{
    try {
        const param = { ...req.body }
        const userId = req.user._id
        const provider = await providerHelper.shiftProviderOrganisation(param, userId)
        if(!isEmpty(provider) && provider.err) {
            return errorResponse(req, res, provider.msg)
        }
        return successResponse(req, res, provider.msg, successMessages.SHIFT_PROVIDER)
    } catch (err) {
        return errorResponse(req, res, err)
    }
}

module.exports.getAllHippaStatus = async (req, res) =>{
    try {
        const userRole = req.user.role;
        if(userRole !== identity.ADMIN){
            return errorResponse(req, res, errorMessages.YOU_ARE_NOT_AUTHORIZED)
        }
        const hippaStatus = await providerHelper.getAllHippaStatus();
        if(!isEmpty(hippaStatus) && hippaStatus.err){
            return errorResponse(req, res, hippaStatus.msg, 200)
        }
        return successResponse(req, res, hippaStatus.msg, "Hippa Status Fetched!")
    }catch (err) {
        return errorResponse(req, res, err)
    }
}


module.exports.getActiveProvider = async (req, res) => {
    try {
      const notFreezeids = await userOrm.notFreezeUserIds();
      let ids = notFreezeids.map(({ id }) => id);
      const providerListing = await ProviderOrm.getActiveProvider(ids);
      if (!isEmpty(providerListing)) {
        return successResponse(
          req,
          res,
          providerListing,
          successMessages.DATA_FETCHED
        );
      }
      return successResponse(req, res, [], errorMessages.NO_DATA_FOUND);
    } catch (err) {
      console.log(`Get All Provider Err: `, err);
      return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG);
    }
  };

  exports.createPOC = async (req, res) => {
    try {
      const param = { ...req.body, ...req.params, ...req.query };
      const userId = req.user._id;
      const role = req.user.role;
      param.currUserEmail = req.user.email;
      const getUser = await userOrm.getUserById(userId);
      if (isEmpty(getUser))
        return { err: true, msg: errorMessages.USER_NOT_EXIST };
      if (role !== "admin") {
        return errorResponse(req, res, "You are not authorised");
      }
      let findOrg = await organisationCrm.getOrganisationById(
        mongoose.Types.ObjectId(param.organisationId)
      );

      if (isEmpty(findOrg))
        return { err: true, msg: "Organisation doesn't not Exist" };

      const ghostUser = await pocAccounts.findPocAccount({ email: param.email });
      if (!isEmpty(ghostUser)) return errorResponse(req, res, errorMessages.USER_ALREADY_EXIST);

      // let poc = findOrg.poc;

      // const checkEmail = poc.map((item) => item.email).includes(param.email);

      // if (checkEmail) {
      //   return errorResponse(req, res, "Email already Exist");
      // }
      const addPoc = await organisationCrm.addPoc(param);
      let poc = addPoc.poc
      console.log("--------poc--------",poc);
      let staticPocData = poc.find(o => o.email === param.email);
      console.log("addPoc", addPoc);
      const addPocAccountData =await pocAccounts.addPocAccount({
        "staticPocId":staticPocData._id,
        "email":staticPocData.email,
        "name":staticPocData.name,
        "firstName":staticPocData.firstName,
        "lastName":staticPocData.lastName,
        "jobTitle":staticPocData.jobTitle,
        "contact":staticPocData.contact,
        "organisationId":param.organisationId,
        "isGhost":false
      })
      console.log("addPocAccountData", addPocAccountData);
      if (!isEmpty(addPoc) && addPoc.err) {
        return errorResponse(req, res, addPoc.msg);
      }
      return successResponse(req, res, [], addPoc.msg);
    } catch (err) {
      console.log(err);
      return errorResponse(req, res, err);
    }
  };

  exports.deletePOC = async (req, res) => {
    try {
      const param = { ...req.body, ...req.params, ...req.query };
      param.userId = req.user._id;
      param.currUserEmail = req.user.email;

      let findOrg = await organisationCrm.getOrganisationById(
        mongoose.Types.ObjectId(param.organisationId)
      );

      if (isEmpty(findOrg))
      {
        return { err: true, msg: "Organisation doesn't not Exist" };
      }


      siteIds = await siteOrm.findSitesIds({"organisationId":param.organisationId});

      ids = siteIds.map(({ id }) => id);

      usss= await sitesSubcategoryOrm.detStaticPoc({"staticPocId":param.pocId},ids)

      const removePoc = await organisationCrm.deletePoc(param);
      const pocAccountData = await pocAccounts.delPocAccount({"organisationId":param.organisationId,"staticPocId":param.pocId})

      if (!isEmpty(removePoc) && removePoc.err) {
        return errorResponse(req, res, removePoc.msg);
      }
      return successResponse(req, res, [], removePoc.msg);
    } catch (err) {
      console.log(err);
      return errorResponse(req, res, err);
    }
  };

  exports.deleteOnePOC = async (req, res) => {
    try {
      const param = { ...req.body, ...req.params, ...req.query };
      param.userId = req.user._id;
      param.currUserEmail = req.user.email;

      let findOrg = await organisationCrm.getOrganisationById(
        mongoose.Types.ObjectId(param.organisationId)
      );

      if (isEmpty(findOrg))
      {
        return { err: true, msg: "Organisation doesn't not Exist" };
      }


      // siteIds = await siteOrm.findSitesIds({"organisationId":param.organisationId});
      // console.log("siteIds",siteIds)
      // ids = siteIds.map(({ id }) => id);
      // console.log("idsssssss",ids)
      // usss= await sitesSubcategoryOrm.detStaticPoc({"staticPocId":param.pocId},ids)
      // console.log("deletedddd sssss tt",usss)
      // const deletedres = await organisationCrm.deletePoc({"organisationId":data.organisationId._id,"pocId":data.staticPocId})
      // console.log("deletedres---------------------",deletedres)
      param.isActive = false
      const removePoc = await organisationCrm.updatePocStatus(param);
      // const pocAccountData = await pocAccounts.delPocAccount({"organisationId":param.organisationId,"staticPocId":param.pocId})
      // console.log("----------del----pocAccountData--------",pocAccountData)
      if (!isEmpty(removePoc) && removePoc.err) {
        return errorResponse(req, res, removePoc.msg);
      }
      return successResponse(req, res, [], removePoc.msg);
    } catch (err) {
      console.log(err);
      return errorResponse(req, res, err);
    }
  };

  exports.updatePOC = async (req, res) => {
    try {
      const param = { ...req.body, ...req.params, ...req.query };
      const userId = req.user._id;
      const role = req.user.role;
      param.currUserEmail = req.user.email;
      const getUser = await userOrm.getUserById(userId);
      if (isEmpty(getUser))
        return { err: true, msg: errorMessages.USER_NOT_EXIST };
      if (role !== "admin") {
        return errorResponse(req, res, "You are not authorised");
      }

      let findOrg = await organisationCrm.getOrganisationById(
        mongoose.Types.ObjectId(param.organisationId)
      );

      if (isEmpty(findOrg))
        return { err: true, msg: "Organisation doesn't not Exist" };

      const updatePoc = await organisationCrm.updatePoc(param);
      console.log("updatePoc", updatePoc);

      siteIds = await siteOrm.findSitesIds({"organisationId":param.organisationId});
      console.log("siteIds",siteIds)
      ids = siteIds.map(({ id }) => id);
      console.log("idsssssss",ids)
      const updated= await sitesSubcategoryOrm.updateStaticPoc(param,ids);
      console.log("site static poc update",updated)
      const updatedpocAccount = await pocAccounts.updatePocAccount(param);
      console.log("updatedpocAccount-----------",updatedpocAccount)
      if (!isEmpty(updatePoc) && updatePoc.err) {
        return errorResponse(req, res, updatePoc.msg);
      }
      return successResponse(req, res, [], updatePoc.msg);
    } catch (err) {
      console.log(err);
      return errorResponse(req, res, err);
    }
  };

  exports.getPOC = async (req, res) => {
    try {
      const param = { ...req.body, ...req.params, ...req.query };
      const userId = req.user._id;

      param.currUserEmail = req.user.email;
      const getUser = await userOrm.getUserById(userId);
      if (isEmpty(getUser))
        return { err: true, msg: errorMessages.USER_NOT_EXIST };

      let findOrg = await organisationCrm.getOrganisationById(
        mongoose.Types.ObjectId(param.organisationId)
      );

      if (isEmpty(findOrg))
        return { err: true, msg: "Organisation doesn't not Exist" };

      const getPoc = await organisationCrm.getPoc(param);

      if (!isEmpty(getPoc) && getPoc.err) {
        return errorResponse(req, res, getPoc.msg);
      }
      return successResponse(req, res, getPoc, successMessages.DATA_FETCHED);
    } catch (err) {
      console.log(err);
      return errorResponse(req, res, err);
    }
  };

  exports.getAllPOC = async (req, res) => {
    try {
      console.log("get All pocs")
      const param = { ...req.body, ...req.params, ...req.query };
      const userId = req.user._id;
      const role = req.user.role;
      param.currUserEmail = req.user.email;
      const getUser = await userOrm.getUserById(userId);
      if (isEmpty(getUser))
        return { err: true, msg: errorMessages.USER_NOT_EXIST };
      if (role !== "admin") {
        return errorResponse(req, res, "You are not authorised");
      }

      const getPoc = await pocAccounts.getAllPocAccounts();

      if (!isEmpty(getPoc) && getPoc.err) {
        return errorResponse(req, res, getPoc.msg);
      }
      return successResponse(req, res, getPoc, successMessages.DATA_FETCHED);
    } catch (err) {
      console.log(err);
      return errorResponse(req, res, err);
    }
  };

  exports.resendInvite = async (req, res) => {
    try {
      const param = { ...req.body, ...req.params, ...req.query };
      const userId = req.user._id;
      const role = req.user.role;

      if (role === "admin" || role === "provider") {
        param.currUserEmail = req.user.email;
        const getUser = await userOrm.getUserById(userId);
        if (isEmpty(getUser))
          return { err: true, msg: errorMessages.USER_NOT_EXIST };

        let findProvider = await providerOrm.getProviderByEmail(param.email);

        if (isEmpty(findProvider))
          return { err: true, msg: "provider doesn't not Exist" };

        let id = findProvider[0].userId;
        if (findProvider) {
          code = randomize("*", 10, { exclude: "0oOiIlL1" });
          password = crypto.createHash("md5").update(code).digest("hex");
          await userOrm.updateUserById(id, {
            "password": password,
          });

          const approvedSubUserTemplate = content([
            "You are invited to set up a login to the Her PLAN directory! "+ `<a href="https://directory.herplan.org/login" target="_blank">Click here to login </a>` + ". Here is your temporary password. " +
              code +
              " You can now save lists and searches of providers, save custom quiz results, and directly message other providers on the platform. Please be sure to turn on appointments and messages.",
          ]);
          sendMail(
            param.email,
            "Thank You For Being Part Of Her Plan",
            approvedSubUserTemplate
          );
          if (!isEmpty(approvedSubUserTemplate) && approvedSubUserTemplate.err) {
            return errorResponse(req, res, approvedSubUserTemplate.msg);
          }
          return successResponse(req, res, [] ,successMessages.EMAIL_SEND);
        }
      } else {
        return errorResponse(req, res, "Not allowed");
      }
    } catch (err) {
      console.log(err);
      return errorResponse(req, res, err);
    }
  };
