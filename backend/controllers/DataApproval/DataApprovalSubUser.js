const {successMessages, errorMessages, method, status, identity} = require("../../helpers/messages");
const dataApprovalOrm = require("../../dbQuery/dataApproval");
const userOrm = require("../../dbQuery/users")
const providerOrm = require("../../dbQuery/provider");
const siteOrm = require("../../admin/dbQuery/site");
const sitesSubcategoryOrm = require("../../dbQuery/sitesSubcategory");
const organisationCrm = require("../../dbQuery/organisation");
const pocAccounts = require("../../dbQuery/pocAccounts");
const {isEmpty, pick} = require("lodash");
const UsersModel = require("../../models/users");
const randomize = require("randomatic");
const crypto = require("crypto");
const providerController = require("../provider/provider.controller");
const emailTemplate = require("../../helpers/template");
const {sendMail} = require("../../connection/smtp.connect");
const {getOneProvider, dynamicUpdateProvider, getDynamicProvider, deleteProvider, updateProviderInfo} = require("../../dbQuery/provider");
const siteSubCategoryHelper = require("../sitesSubCategory/sitesSubCategory.helper");
const { content} = require("../../helpers/template")
const mongoose = require("mongoose");

async function updateNewPassword(email, userId){
    try {
        let code = randomize('*', 10,{ exclude: '0oOiIlL1' });
        const template = emailTemplate.geForgetPasswordTemplate(code);
        sendMail(email, 'Confirmation code', template);
        await updateProviderInfo({ passwordSent: true }, userId)
        await UsersModel.findOneAndUpdate({ _id: userId }, { password: crypto.createHash('md5').update(code).digest('hex') })
        return { err: false, msg: [] }
    } catch (err) {
        return { err: true, msg: err }
    }
}

async function createOrgAndProviderBySubUser(data, sendMailToProvider = true) {
  try {
    console.log("++++++++++++++++++++++++++++++++++++++++++++++++++",data)
    const { name, email, userId, contact, phone } = data;
    /**
           Process to create New additional provider
           Process to create New provider and linked it to Main organisation
           */
    const findNameAndEmail = await UsersModel.findOne({ email }).lean();
    if (!isEmpty(findNameAndEmail)) {
      return {
        err: true,
        msg: "Email of this account already Exist",
        id: findNameAndEmail._id,
      };
    }
    let code;
    let password;
    if (!isEmpty(data.password)) {
      password = crypto.createHash("md5").update(data.password).digest("hex");
    } else {
      code = randomize("*", 10, { exclude: "0oOiIlL1" });
      password = crypto.createHash("md5").update(code).digest("hex");
    }
    const createNewUser = new UsersModel({
      name,
      email,
      role: "provider",
      password: password,
      status: false,
      type: "web",
      jwt_auth_token: "",
      jwt_token_expired: "",
      fcm_token: null,
    });
    await createNewUser.save();
    console.log("userrrrrrr======", createNewUser);
    const subProvider = await providerController.newProvider(
      {
        ...data,
        userId: createNewUser._id,
        createdUser: userId,
        identity: identity.SUB_USER_PROVIDER,
        approvedStatus: data.approvedStatus || status.PENDING,
        organization: data.organisationId,
        contact: contact || phone,
        passwordSent: sendMailToProvider,
      },
      data.sheet
    );
    if(data.isPoc){
      console.log("subProvider======", subProvider);
      siteIds = await siteOrm.findSitesIds({"organisationId":data.organisationId});
      console.log("siteIds",siteIds)
      ids = siteIds.map(({ id }) => id);
      console.log("idsssssss",ids)
      usss= await sitesSubcategoryOrm.findUpdateSiteSubcategory({"staticPocId":data.staticPocId,"userId":createNewUser._id},ids)
      console.log("yyyyyyyyyyyyyyyyyyyy",usss)
      console.log("sendMailToProvider---", sendMailToProvider);
      console.log("-------------------*************************",data.organisationId._id)
      const deletedres = await organisationCrm.deletePoc({"organisationId":data.organisationId._id,"pocId":data.staticPocId})
      const pocAccountData = await pocAccounts.delPocAccount({"organisationId":data.organisationId._id,
                  "staticPocId":data.staticPocId})
      console.log("----------del----pocAccountData--------",pocAccountData)
      console.log("deletedres---------------------",deletedres)
    }
    if (sendMailToProvider) {
      //Send a Email of New Password
      // const template = emailTemplate.geForgetPasswordTemplate(code);
      // sendMail(email, "Confirmation code", template);
      const approvedSubUserTemplate = content([
        "You are invited to set up a login to the Her PLAN directory! "+`<a href="https://directory.herplan.org/login" target="_blank">Click here to login </a>` + ". Here is your temporary password. " +
          code +
          " You can now save lists and searches of providers, save custom quiz results, and directly message other providers on the platform. Please be sure to turn on appointments and messages.",
      ]);
      sendMail(
        email,
        "Thank You For Being Part Of Her Plan",
        approvedSubUserTemplate
      );
    }
    console.log("!isEmpty(subProvider)", !isEmpty(subProvider));
    console.log(" subProvider.err", subProvider.err);
    console.log(
      "!isEmpty(subProvider) && subProvider.err",
      !isEmpty(subProvider) && subProvider.err
    );
    if (!isEmpty(subProvider) && !subProvider.err) {
      console.log("kuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
      return subProvider;
    }
    return { err: false, msg: [], id: createNewUser._id };
  } catch (err) {
    return { err: true, msg: err };
  }
}

async function updateProviderData(providerId, value){
    try {
        const provider = await getOneProvider(providerId);
        console.log(`!---PROVIDER DATA---!`,provider, value)
        if(isEmpty(provider)){
            return { err: true, msg: []}
        }
        if(!isEmpty(value) && (value.email || value.name)){
            let data = {}
            if(value.name) {
                data = { ...data, name: value.name}
            }
            if(value.email) {
                data = { ...data, email: value.email}
            }
            await UsersModel.findByIdAndUpdate(provider["userId"], data)
        }
        const providerData = await dynamicUpdateProvider("_id", providerId, value);
        console.log(`providerData: update Success ---`,providerData)
        if(isEmpty(providerData)){ return { err: true, msg: []} }
        return { err: false, msg: successMessages.PROVIDER_UPDATED }
    } catch (err) {
        return {err: true, msg: err }
    }
}

async function deleteSubUserByAdmin(userId, providerId){
    try {
        const provider = await getOneProvider(providerId);
        if(isEmpty(provider)){
            return { err: true, msg: []}
        }
        const userData=await UsersModel.findByIdAndDelete(provider["userId"])
        const providerData = await deleteProvider( providerId);
        if(isEmpty(providerData || userData)){
            return { err: true, msg: []}
        }
        const deleteAssociateSite = await siteSubCategoryHelper.deleteSiteSubcategoryByUserId(provider["userId"]);
        if(!isEmpty(deleteAssociateSite) && deleteAssociateSite.err){
            return deleteAssociateSite;
        }
        return { err: false, msg: successMessages.PROVIDER_DELETED }
    } catch (err) {

    }
}
async function deleteSubUserByAdmin1(userId, providerId) {
    try {
      const provider = await getOneProvider(providerId);
      if (isEmpty(provider)) {
        return { err: true, msg: [] };
      }

      console.log("provider",provider)

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

      console.log("sss",sss)
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


      const userData = await UsersModel.findByIdAndDelete(provider["userId"]);
      const providerData = await deleteProvider(providerId);
      if (isEmpty(providerData || userData)) {
        return { err: true, msg: [] };
      }
      const deleteAssociateSite =
        await siteSubCategoryHelper.deleteSiteSubcategoryByUserId(
          provider["userId"]
        );
      if (!isEmpty(deleteAssociateSite) && deleteAssociateSite.err) {
        return deleteAssociateSite;
      }
      return { err: false, msg: successMessages.PROVIDER_DELETED };
    } catch (err) {}
  }
async function createDataApprovalForSubUser(data){
    try {
        const findEmail = await dataApprovalOrm.getDataApprovalSubUser({ email: data.email });
        if(!isEmpty(findEmail)){
            const findUser = await userOrm.findUser({ email : data.email})
            if(!isEmpty(findUser) && data.method === method.CREATE){
                return { err: true, msg: errorMessages.USER_ALREADY_EXIST }
            }
            const findEmailUser = await dataApprovalOrm.getDataApprovalSubUser({ email: data.email, status: status.PENDING });
            if(!isEmpty(findEmailUser)){
                return { err: true, msg: "Already One Action Remaining By Admin on Same Email"}
            }
        }
        await dataApprovalOrm.createDataSubUser({ ...data, status: status.PENDING});
        return { err: false, msg: [], val: successMessages.PROVIDER_CREATED }
    } catch (err){
        return {err: true, msg: err }
    }
}

async function dataApprovalAction(){
    try {
        const getAllApprovalData = await dataApprovalOrm.getDataApprovalSubUser({}, {
            createdAt: 0, updatedAt: 0, __v: 0
        });
        return { err: false, msg: getAllApprovalData }
    } catch (err){
        return {err: true, msg: err }
    }
}


async function updateDataApprovalRecord(data) {
  try {
    console.log("data", data);
    const getAllApprovalData = await dataApprovalOrm.getDataApprovalSubUser(
      { _id: mongoose.Types.ObjectId(data.id), status: status.PENDING },
      {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      }
    );
    console.log("getAllApprovalData", getAllApprovalData);
    if (isEmpty(getAllApprovalData))
      return { err: false, msg: errorMessages.ID_NOT_FOUND };
    const user = getAllApprovalData[0];
    console.log(user);
    if (data.status === status.APPROVED && user.method === method.CREATE) {
      const primaryProviderList = await providerOrm.getAllPrimaryProvider(
        user.organisationId
      );
      let email = [];
      for (let provider of primaryProviderList) {
        if (!isEmpty(provider["email"])) {
          email.push(provider["email"]);
        }
      }
      console.log("primaryProviderList", primaryProviderList);
      console.log("email---", email);
      if (!isEmpty(email)) {
        const template = content([
          "We have received and approved a request to add a sub-user to your organization's profile in the Her PLAN directory. Congratulations on your growing team! To view and manage your team, please login to the Her PLAN directory and click " +
            "My Profile." +
            " If you have questions, please reach out to us at " +
            `<a href="mailto:info@herplan.org" target="_blank">info@herplan.org.</a>` +
            `<br/>` +
            "Thank you for all you do for women and families! ",
        ]);
        sendMail(email, "Thank You For Being Part Of Her Plan", template);
      }
      const userCreated = await createOrgAndProviderBySubUser({
        ...user,
        role: identity.ADMIN,
        userId: user.requestBy,
        approvedStatus: status.APPROVED,
        approvedBy: data.approvedBy,
      });
      if (
        !isEmpty(userCreated) &&
        userCreated.err &&
        userCreated.msg !== errorMessages.HUBSPOT
      )
        return userCreated;
    } else if (
      data.status === status.APPROVED &&
      user.method === method.UPDATE
    ) {
      const providerDetails = await getDynamicProvider(
        "userId",
        user.subUserId,
        { name: 1, email: 1 }
      );
      const providerId = providerDetails[0]._id;
      const value = pick(user, [
        "name",
        "firstName",
        "lastName",
        "jobTitle",
        "hippaChat",
        "makeAccountPrimary",
        "email",
        "phone",
      ]);
      const updateUser = await updateProviderData(providerId, value);
      if (
        !isEmpty(updateUser) &&
        updateUser.err &&
        updateUser.msg !== errorMessages.HUBSPOT
      ) {
        return updateUser;
      }

      // if (
      //   Object.keys(value).includes("makeAccountPrimary") &&
      //   value.makeAccountPrimary === true
      // ) {
      //   console.log("send mailll");
      //   const template = content([
      //     "You have been approved as a provider user in the Her PLAN directory! " + `<a href="https://directory.herplan.org/login" target="_blank">Click here to login </a>` + ". You can now save lists and searches of providers, save custom quiz results, and directly message other providers on the platform. Please be sure to turn on appointments and messages.",
      //   ]);
      //   sendMail(value.email, "Thank You For Being Part Of Her Plan", template);
      // }
    } else if (
      data.status === status.APPROVED &&
      user.method === method.DELETE
    ) {
      const providerDetails = await getDynamicProvider(
        "userId",
        user.subUserId,
        { name: 1 }
      );
      const providerId = providerDetails[0]._id;
      const deleteProviderSubUser = await deleteSubUserByAdmin(
        user.requestBy,
        providerId
      );
      if (!isEmpty(deleteProviderSubUser) && deleteProviderSubUser.err)
        return deleteProviderSubUser;
    } else if (
      data.status === status.CANCELLED &&
      user.method === method.CREATE
    ) {

      if(user.isPoc)
      {
        const removePoc = await organisationCrm.updatePocStatus({organisationId:user.organisationId,pocId:user.staticPocId,isActive:true});
      }
      const primaryProviderList = await providerOrm.getAllPrimaryProvider(
        user.organisationId
      );
      let email = [];
      for (let provider of primaryProviderList) {
        if (!isEmpty(provider["email"])) {
          email.push(provider["email"]);
        }
      }
      console.log("primaryProviderList", primaryProviderList);
      console.log("email---", email);
      if (!isEmpty(email)) {
        const template = content([
          "We have received and reviewed a request to add a sub-user to your account. We cannot approve this request at this time. Please feel free to contact us at " +
            `<a href="mailto:info@herplan.org" target="_blank">info@herplan.org.</a>` +
            " for information. Thank you for all you do for women and families.",
        ]);
        sendMail(email, "Thank You For Being Part Of Her Plan", template);
      }
    }
    // else if (
    //   data.status === status.CANCELLED &&
    //   user.method === method.UPDATE
    // ) {
    //   console.log("Insideeeeee cancellllllllllllll")
    //   if (
    //     Object.keys(user).includes("makeAccountPrimary") &&
    //     user.makeAccountPrimary === true
    //   ) {
    //     console.log("rejectedddd");
    //     const template = content([
    //       "We have received and reviewed a request to add you as a provider user in the Her PLAN directory. We cannot approve this request at this time. Please feel free to contact us at " +
    //         `<a href="mailto:info@herplan.org" target="_blank">info@herplan.org.</a>` +
    //         " for information. Thank you for all you do for women and families.",
    //     ]);
    //     sendMail(user.email, "Thank You For Being Part Of Her Plan", template);
    //   }
    // }
    await dataApprovalOrm.updatedDataApproval(data.id, data);
    // if (data.status === status.APPROVED && user.method === method.CREATE) {
    //   const approvedSubUserTemplate = content([
    //     "Thank you for becoming a user of the Her PLAN directory. We invite you to explore your profile’s settings first. You must turn ON appointments and messages in order to receive or send secure information using this platform. In addition to messages and appointments, you can create your own lists of providers, searches, and quiz results.",
    //   ]);
    //   sendMail(
    //     user.email,
    //     "Thank You For Being Part Of Her Plan",
    //     approvedSubUserTemplate
    //   );
    // }
    return { err: false, msg: [], val: successMessages.PROVIDER_UPDATED };
  } catch (err) {
    return { err: true, msg: err };
  }
}



module.exports = {
    createDataApprovalForSubUser,
    dataApprovalAction,
    updateDataApprovalRecord,
    createOrgAndProviderBySubUser,
    updateProviderData,
    deleteSubUserByAdmin,
    deleteSubUserByAdmin1,
    updateNewPassword
}
