const crypto = require('crypto');
const mongoose = require("mongoose")
const UsersModel = require('../../models/users');
const otpModel = require('../../models/otp')
const { isEmpty, pick } = require('lodash');
const {
  successResponse,
  errorResponse,
  generateVerifyCode
} = require('../../helpers/helpers');
const emailTemplate = require('../../helpers/template')
const { sendMail } = require('../../connection/smtp.connect')
const { successMessages, errorMessages, signUpType, status, identity } = require('../../helpers/messages');
const moment = require("moment")
const { newProvider } = require("../provider/provider.controller")
const { createDynamicOrganisation } = require("../my_organisation/organisation.helper");
const { createUserProfile } = require("../userProfile/userProfile.helper");
const { getUserProfileOfArray } = require("../../dbQuery/userProfile")
const userHelper = require("./user.helper");
const {content} = require("../../helpers/template");
const cmsOrm = require("../../dbQuery/cms");
const userOrm = require("../../dbQuery/users");
const organisationCrm = require("../../dbQuery/organisation");
const pocAccount = require("../../dbQuery/pocAccounts");

exports.register = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };
    if(![signUpType.WEB, signUpType.APPLE, signUpType.FACEBOOK, signUpType.GOOGLE].includes(param.type)){
      return errorResponse(req, res, `${param.type} is not valid`)
    }
    param.password = crypto.createHash('md5').update(param.password).digest('hex');

    const user = await UsersModel.findOne({ email: param.email });
    if (!isEmpty(user)) return errorResponse(req, res, errorMessages.USER_ALREADY_EXIST);
    const ghostUser = await pocAccount.findPocAccount({ email: param.email });
    if (!isEmpty(ghostUser)) return errorResponse(req, res, errorMessages.USER_ALREADY_EXIST);

    const data = new UsersModel({
      name: param.name,
      email: param.email, password: param.password, role: param.role,
      status: param.status, type: param.type, social_token: param.socialToken || '', fcm_token: param.fcmToken || null,
      jwt_auth_token: '', jwt_token_expired:  ''
    })
    await data.save();
    if (param.role === "provider") {
      const organisation = await createDynamicOrganisation({
        name: param["orgName"],
        providerId: data._id,
        zipcode: param.zipcode,
        address: param.address, city: param.city, state: param.state, hippa: param.hippa,
        type: identity.PROVIDER
      })
      if (!isEmpty(organisation) && organisation.err && organisation.msg !== errorMessages.HUBSPOT) {
        await UsersModel.findByIdAndDelete(data._id)
        return errorResponse(req, res, organisation.msg)
      }

      const newData = await newProvider({
        name: param.name,
        firstName: param.firstName,lastName: param.lastName,howYouHeard: param.howYouHeard,jobTitle: param.jobTitle,
        contact: param.phone, email: param.email, userId: data._id, organization: organisation.msg._id,hippa: param.hippa,
        approvedStatus: status.PENDING, identity: identity.MAIN_PROVIDER,acceptProviderTermsDate: moment().utc(),
      })
      if (!isEmpty(newData) && newData.err && newData.msg !== errorMessages.HUBSPOT) {
        await UsersModel.findByIdAndDelete(data._id)
        return errorResponse(req, res, newData.msg)
      }
      const template = content([
        "Thank you for applying for a provider user login! Our team at Her PLAN is reviewing your request. You will receive an email when your login request gets approved. If you have questions, please reach out to us at " +
          `<a href="mailto:info@herplan.org" target="_blank">info@herplan.org</a>.` +
          `<br/>` +
          "Thank you for all you do for women and families!",
      ]);
      sendMail(param.email, "Thank You For Being Part Of Her Plan", template);
    } else {
      const dataProfile = await createUserProfile({
        userId: data._id,
        phone: param.phone,
        gender: param.gender,
        maritalStatus: param.maritalStatus,
        dob: param.dob,
        name: param.name,
        religion: param.religion,
        occupation: param.occupation,
        acceptTerms: param.acceptTerms,
        acceptTermsDate: moment().utc(),
        optShareData: param.optShareData,
        userState: param.userState
      })
      if (!isEmpty(dataProfile) && dataProfile.err) {
        await UsersModel.findByIdAndDelete(data._id)
        return errorResponse(req, res, dataProfile.msg)
      }else{
        await UsersModel.findByIdAndUpdate(data._id, {profileId: dataProfile.msg._id})
      }
      const template = content([
        'Thank you for becoming a user of the Her PLAN directory. We invite you to explore your profile’s settings first. You must turn ON appointments and messages in order to receive or send secure information using this platform. In addition to messages and appointments, you can create your own lists of providers, searches, and quiz results.'
      ])
      sendMail(param.email, 'Thank You For Being Part Of Her Plan', template)
    }
    const originalData = await UsersModel.findById(data._id).populate("profileId")
    const cmsData = await cmsOrm.getAllEntriesByModule({});
    let terms;
    if (param.role === "user") {
      terms = cmsData.userTerms;
    }

    return successResponse(req, res, originalData , successMessages.REGISTRATION_DONE);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };
    const data = await userHelper.login(param)
    if(!isEmpty(data) && data.err) {
      return errorResponse(req, res, data.msg)
    }
    return successResponse(req, res, data.msg, successMessages.LOGGED_IN);
  } catch (error) {
    console.log(error)
    return errorResponse(req, res, error.message);
  }
};

exports.profile = async (req, res) => {
  try {
    const data = await UsersModel.findOne({ _id: req.user._id }).populate({ path: "assigningId", select: { email: 1, name: 1 }}).lean();
    return successResponse(req, res, data, successMessages.DATA_FETCHED);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

exports.getAll = async (req, res) => {
  try {
    const queryParams = req.query;
    const page = queryParams.page * 1;
    const rows = queryParams.rows * 1 || 10;
    const field = queryParams.field;
    const sortOrder = queryParams.sortOrder;
    let sort = {};
    let limit = rows;
    let skip = (page - 1) * limit

    let condtionObj = {}
    let countCondtionObj = {}

    if (queryParams.role) {
      condtionObj["role"] = queryParams.role;
      countCondtionObj["role"] = queryParams.role;
    }
    if (field) {
      if (sortOrder === 'asc') {
        sort[field] = 1;
      }
      if (sortOrder === 'desc') {
        sort[field] = -1;
      }
    }

    const data = await UsersModel.find(condtionObj).skip(skip).limit(limit).sort(sort).lean();
    const totalItems = await UsersModel.countDocuments(countCondtionObj);
    if (data.length > 0 && totalItems) {
      return successResponse(req, res, { data, page, rows, totalItems }, successMessages.DATA_FETCHED);
    }
    return errorResponse(req, res, errorMessages.NO_DATA_FOUND);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

exports.findById = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };
    const data = await UsersModel.findOne({ _id: param.userId }).lean();
    return successResponse(req, res, data, successMessages.DATA_FETCHED);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

exports.deleteById = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };
    const data = await UsersModel.findOneAndDelete({ _id: param.userId });
    return successResponse(req, res, data, successMessages.DATA_DELETED);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };
    const email = param.email;
    if (!isEmpty(email)) {
      console.log(`email`, email)

      const userExist = await UsersModel.findOne({ email: email });
      if (isEmpty(userExist)) {
        return errorResponse(req, res, errorMessages.USER_NOT_EXIST);
      }
      const hashCode = generateVerifyCode()
      console.log('code', JSON.stringify(hashCode));
      const userOtpExists = await otpModel.findOne({ user_id: userExist._id });
      if (isEmpty(userOtpExists)) {
        const OtpCollection = new otpModel({
          code: hashCode.code,
          expires_in: hashCode.updatedOn,
          user_id: userExist._id,
        })
        await OtpCollection.save()
      } else {
        await otpModel.findByIdAndUpdate(userOtpExists._id, {
          code: hashCode.code,
          expires_in: hashCode.updatedOn,
        })
      }
      const template = await emailTemplate.geForgetPasswordTemplate(hashCode.code);
      sendMail(email, 'Confirmation code', template);
      return successResponse(req, res, hashCode)
    } else {
      return errorResponse(req, res, 'Email not found')
    }
  } catch (error) {
    return errorResponse(req, res)
  }
}
exports.changePassword = async (req, res) => {
  try {

    const param = { ...req.body, ...req.params, ...req.query };

    let user = await UsersModel.findOne({ _id: param._id })
    if (isEmpty(user)) {
      return errorResponse(req, res, errorMessages.USER_NOT_EXIST)
    }
    else {
      const hashedPassword = crypto.createHash('md5').update(param.currentPassword).digest('hex');
      const output = hashedPassword === user.password;
      if (!output) return errorResponse(req, res, errorMessages.INVALID_PWORD);
      else {
        param.password = crypto.createHash('md5').update(param.password).digest('hex');
        await user.updateOne({ password: param.password })
        return successResponse(req, res, [], successMessages.PASSWORD_CHANGED);
      }
    }
  }
  catch (error) {
    return errorResponse(req, res, error.message);
  }

}

exports.verifyForgotPassword = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };
    let codeExists = await otpModel.findOne({ code: param.code });
    if (isEmpty(codeExists)) {
      return errorResponse(req, res, errorMessages.NO_CODE_FOUND)
    }
    else {
      let user = await UsersModel.findOne({ _id: codeExists.user_id })

      if (isEmpty(user)) {
        return errorResponse(req, res, errorMessages.USER_NOT_EXIST)
      }
      else {
        param.password = crypto.createHash('md5').update(param.password).digest('hex');
        await user.updateOne({ password: param.password })
        return successResponse(req, res, [], successMessages.PASSWORD_CHANGED);
      }
    }
  }

  catch (error) {
    return errorResponse(req, res, error.message)
  }


}

exports.savedUser = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };
    const loginUser = await UsersModel.findOne({ _id: req.user._id }).lean();
    if (!loginUser) return errorResponse(req, res, errorMessages.USER_NOT_EXIST);
    let data;
    const userToBeSaved = await UsersModel.findOne({ _id: param.savedUserId }).lean();

    if (loginUser.role === 'provider' && userToBeSaved.role === 'provider') {

      let savedUserArr = loginUser.saved_provider || [];
      if ((savedUserArr.includes(param.savedUserId))) return errorResponse(req, res, errorMessages.USER_ALREADY_EXIST);
      savedUserArr.push(param.savedUserId)
      data = await UsersModel.findOneAndUpdate({ _id: req.user._id }, { saved_provider: savedUserArr }, { new: true })
    } else if (loginUser.role === 'provider' && userToBeSaved.role === 'user') {

      let savedUserArr = loginUser.saved_user || [];
      if ((savedUserArr.includes(param.savedUserId))) return errorResponse(req, res, errorMessages.USER_ALREADY_EXIST);
      savedUserArr.push(param.savedUserId)
      data = await UsersModel.findOneAndUpdate({ _id: req.user._id }, { saved_user: savedUserArr }, { new: true })
    } else if (loginUser.role === 'user' && userToBeSaved.role === 'provider') {

      let savedUserArr = loginUser.saved_provider || [];
      if ((savedUserArr.includes(param.savedUserId))) return errorResponse(req, res, errorMessages.USER_ALREADY_EXIST);
      savedUserArr.push(param.savedUserId)
      data = await UsersModel.findOneAndUpdate({ _id: req.user._id }, { saved_provider: savedUserArr }, { new: true })
    } else {
      return errorResponse( req, res, errorMessages.SOMETHING_WENT_WRONG)
    }

    return successResponse(req, res, data, successMessages.USER_SAVED);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

exports.getSavedUser = async (req, res) => {
  try {
      const param = {...req.params, ...req.query, ...req.body};
    const loginUser = await UsersModel.findOne({ _id: req.user._id }).lean();
    if (!loginUser) return errorResponse(req, res, errorMessages.USER_NOT_EXIST);
    let savedUser = param["provider"] ? loginUser["saved_provider"] : loginUser["saved_user"];
    let data
    if(!isEmpty(savedUser) && ((loginUser["role"] === "provider" && param["provider"]) || (loginUser["role"] === "user"))){
      console.log("saveUsed", savedUser, loginUser._id)
      let val = savedUser.map(s => mongoose.Types.ObjectId(s))
      data = await UsersModel.aggregate([
        {
          $lookup : {
            from: 'providers',
            localField: '_id',
            foreignField: 'userId',
            as: 'providerInfo'
          }
        },{
          $lookup: {
            from: 'organisations',
            localField: '_id',
            foreignField: 'providerId',
            as: 'organisationInfo'
          }
        },
        {$unwind: '$providerInfo'},
        {$unwind: '$organisationInfo'},
        {
        $match: {
          _id: { $in: val}
        }
        }
      ])
    }else if(!isEmpty(savedUser)){
      data = await getUserProfileOfArray(savedUser)
    }
    return successResponse(req, res, data, successMessages.USER_FETCH);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

exports.removeSavedUser = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };
    let savedUser = param.savedUserId;
    const data = await UsersModel.updateOne({ _id: req.user._id }, { $pullAll: { saved_user: [savedUser], saved_provider: [savedUser] } })
    if (!data) return errorResponse(req, res, errorMessages.NO_DATA_FOUND);

    return successResponse(req, res, data, successMessages.USER_DELETED);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

exports.createAdditionalUser = async (req, res)=>{
  try {
    const param = { ...req.body, ...req.params, ...req.query};
    param.userId = req.user._id
    param.role = req.user.role
    param.currUserEmail = req.user.email
    const addNewSubUser = await userHelper.createNewAdditionalSubUser(param);
    if(!isEmpty(addNewSubUser) && addNewSubUser.err){
      return errorResponse(req, res, addNewSubUser.msg);
    }
    return successResponse(req, res, [], addNewSubUser.msg)
  } catch (err) {
    console.log(err);
    return errorResponse(req, res, err);
  }
}


exports.getAllAdditionalUser = async (req, res)=>{
  try {
    const param = { ...req.body, ...req.params, ...req.query};
    if(isEmpty(param.userId)){
      return  errorResponse(req, res, "User Field is required")
    }
    const role = req.user.role
    const data = await userHelper.getAdditionalSubUser(param, role);
    if(!isEmpty(data) && data.err){
      return errorResponse(req, res, data.msg);
    }
    return successResponse(req, res, data.msg, successMessages.DATA_FETCHED)
  } catch (err){
    return errorResponse(req, res, err);
  }
}

exports.updateSubUsers = async (req, res)=>{
  try {
    const param = {...req.params, ...req.query};
    const { providerId} = param
    if(isEmpty(providerId)){
      return  errorResponse(req, res, "providerId Field is required")
    }
    const value = req.body
    const role = req.user.role

    const data = await userHelper.updateSubUser(param,value,role);
    if(!isEmpty(data) && data.err){
      return errorResponse(req, res, data.msg);
    }
    return successResponse(req, res, [], data.msg)
  } catch (err){
    return errorResponse(req, res, err);
  }
}

exports.updateSubUsersProvider = async (req, res)=>{
  try {
    const param = {...req.params, ...req.query};
    const { providerId} = param
    if(isEmpty(providerId)){
      return  errorResponse(req, res, "providerId Field is required")
    }
    const value = req.body
    param.currUserEmail = req.user.email
    const data = await userHelper.updateSubUserProvider(param,value);
    if(!isEmpty(data) && data.err){
      return errorResponse(req, res, data.msg);
    }
    return successResponse(req, res, [], data.msg)
  } catch (err){
    return errorResponse(req, res, err);
  }
}


exports.deleteSubUsers = async (req, res)=>{
  try {
    const param = {...req.params, ...req.query};
    const { providerId} = param
    if(isEmpty(providerId)){
      return  errorResponse(req, res, "providerId Field is required")
    }
    param.userId = req.user._id
    const role = req.user.role
    const data = await userHelper.deleteSubUser(param,role);
    if(!isEmpty(data) && data.err){
      return errorResponse(req, res, data.msg);
    }
    return successResponse(req, res, data.msg, data.val)
  } catch (err){
    return errorResponse(req, res, err);
  }
}

exports.uploadBase64Image = async (req, res)=>{
  try {
    const param = { ...req.params, ...req.query, ...req.body };
    const upload = await userHelper.uploadImageByUserId({ userId: req.user._id, image: param.image, filePath: req.files})
    if(!isEmpty(upload) && upload.err){
      return errorResponse(req, res, upload.msg)
    }
    return successResponse(req, res, upload.msg, upload.val)
  } catch (err) {
    return errorResponse(req, res, err)
  }
}

module.exports.updateProviderInfo = async (req, res) =>{
  try {
    const param = { ...req.body }
    const id = req.params.id
    const data = param;
    if (isEmpty(id) || isEmpty(data)) return errorResponse(req, res, errorMessages.ID_NOT_FOUND)
    const updateInfo = await userHelper.makeAccountPrimaryApprovalUsers(data, id);
    console.log(`333333333333333##########`,updateInfo)
    if(!isEmpty(updateInfo) && updateInfo.err){
      return errorResponse(req, res, updateInfo.msg)
    }
    return successResponse(req, res, updateInfo.msg, updateInfo.val)
  } catch (err) {
    return errorResponse(req, res, err)
  }
}

module.exports.updateFcmToken = async (req, res) =>{
  try {
    const param = { ...req.params, ...req.query, ...req.body };
    const id = req.user._id;
    if(isEmpty(id)){
      return errorResponse(req, res, "ID not found")
    }
    await UsersModel.findOneAndUpdate({ _id: id }, { fcm_token: param.fcmToken })
    return successResponse(req, res, [], successMessages.PROFILE_UPDATED)
  } catch (err) {
    return errorResponse(req, res, err)
  }
}

module.exports.switchTab = async (req, res) =>{
  try {
    const userData = req.user;
    const getAssigningId = userData["assigningId"]
    if(isEmpty(getAssigningId)) return errorResponse(req, res, "Assigning Email not Found")
    const user = await UsersModel.findOne({ _id: getAssigningId });
    const loginDetails = await userHelper.getLogin( { email: user["email"] }, user)
    if(!isEmpty(loginDetails) && loginDetails.err) {
      return  errorResponse( req, res, loginDetails.msg)
    }
    return successResponse(req, res, loginDetails.msg, successMessages.LOGGED_IN)
  } catch (err) {
    return errorResponse(req, res, err)
  }
}

exports.createPOC = async (req, res) => {
  try {
    console.log("wwwww");
    const param = { ...req.body, ...req.params, ...req.query };
    param.userId = req.user._id;
    param.role = req.user.role;
    param.currUserEmail = req.user.email;
    let findOrg = await organisationCrm.getOrganisationById(
      mongoose.Types.ObjectId(param.orgId)
    );
    if (isEmpty(findOrg))
      return { err: true, msg: "Organisation doesn't not Exist" };
    const addNewSubUser = await organisationCrm.addPoc(param);
    if (!isEmpty(addNewSubUser) && addNewSubUser.err) {
      return errorResponse(req, res, addNewSubUser.msg);
    }
    return successResponse(req, res, [], addNewSubUser.msg);
  } catch (err) {
    console.log(err);
    return errorResponse(req, res, err);
  }
};

(
    async function createUser(){
      const findEmail = await UsersModel.findOne({ email: "admin@gmail.com"})
      if(isEmpty(findEmail)){
        const entries = new UsersModel({
          email: "admin@gmail.com",
          password: crypto.createHash('md5').update('Test@123').digest('hex'),
          name: "admin",
          role: "admin", subRole: "master",
          status: false, type: "web",
          jwt_auth_token: '', jwt_token_expired:  ''
        })
        await entries.save()
      }
    }
)()


exports.activeUser = async (req, res) => {
  try {
    const data = await userOrm.getUsers();
    return successResponse(req, res, data, successMessages.DATA_FETCHED);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};