const { isEmpty, size, filter, pick} = require("lodash")
const { getProviderById, getOneProvider, findProviderByOrganisation, getDynamicProviderWithoutPopulate, getProviderByName, updateProviderInfo,updateProviderInfoo } = require("../../dbQuery/provider")
const { getOrganisationById, findIdAndUpdate } = require("../../dbQuery/organisation")
const {errorMessages, successMessages, identity, status, method, signUpType} = require("../../helpers/messages");
const { sendNotificationToUser } = require("../../helpers/sendMessageHelper")
const UsersModel = require("../../models/users");
const { getUserById, updateUserById } = require("../../dbQuery/users")
const siteSubCategoryHelper = require("../sitesSubCategory/sitesSubCategory.helper")
const awsHelper = require("../ImageUpload/index")
const dataApprovalSubUser = require("../DataApproval/DataApprovalSubUser")
const dataApprovalOrm = require("../../dbQuery/dataApproval")
const { encrypt, generateJWTtoken} = require("../../helpers/helpers");
const crypto = require("crypto");
const moment = require("moment");
const {content} = require("../../helpers/template");
const {sendMail} = require("../../connection/smtp.connect");
const cmsOrm = require("../../dbQuery/cms");
const pocAccount = require("../../dbQuery/pocAccounts");

async function getLogin(param, user) {
    try {
      const newDataForUpdate = {};
      newDataForUpdate.status = true;
      let tokenExpireIn;
      const currentTime = moment();
      if (!isEmpty(param.fcmToken)) {
        newDataForUpdate.fcm_token = param.fcmToken;
      }
      if (
        user["jwt_token_expired"] === null ||
        user["jwt_token_expired"] < currentTime
      ) {
        tokenExpireIn = moment().add(7, "days");
        newDataForUpdate.jwt_auth_token = encrypt(
          generateJWTtoken({ _id: user["_id"], role: user["role"] })
        );
        newDataForUpdate.jwt_token_expired = tokenExpireIn;
      }
      newDataForUpdate.lastLogin = currentTime;
      await UsersModel.findByIdAndUpdate(user["_id"], newDataForUpdate);
      let users = await UsersModel.findOne({ email: param.email }).populate(
        "profileId"
      );
      const cmsData = await cmsOrm.getAllEntriesByModule({});
      let isTermSigned;
      let terms;
      console.log("loooooooooooo", users);
      if (user.role === "user") {
        terms = cmsData.userTerms;
        if (users.profileId.acceptTermsDate < cmsData.userTermsUpdateDate) {
          isTermSigned = false;
        } else if (users.profileId.acceptTermsDate === undefined) {
          isTermSigned = false;
        } else {
          isTermSigned = true;
        }
      }
      if (!isEmpty(users) && users["role"] === identity.PROVIDER) {
        let providerData = await getProviderByName({ userId: user["_id"] });
        if (providerData["approvedStatus"] === status.CANCELLED)
          return {
            err: true,
            msg: "Your Profile is Rejected By Admin!Please Contact to Admin",
          };
        let lastdate = await updateProviderInfoo({lastLogin:currentTime} , user["_id"])
        providerData = pick(providerData, [
          "appointments",
          "message",
          "textMessage",
          "EmailMessage",
          "communication",
          "searchResults",
          "makeAccountPrimary",
          "hippaChat",
          "hippa",
          "acceptHippaDate",
          "acceptNonHippaDate",
          "acceptProviderTermsDate",
          "claimStatus",
        ]);
        terms = cmsData.providerTerms;
        if (providerData.acceptProviderTermsDate === undefined) {
          isTermSigned = false;
        } else {
          if (
            providerData.acceptProviderTermsDate < cmsData.providerTermsUpdateDate
          ) {
            isTermSigned = false;
          } else {
            isTermSigned = true;
          }
        }

        users = {
          ...users["_doc"],
          profileId: providerData,
        };
      }
      return {
        err: false,
        msg: { user: users, isTermSigned: isTermSigned, terms: terms },
      };
    } catch (err) {
      return { err: true, msg: err };
    }
}

async function login(param){
    try {
        const ghostUser = await pocAccount.findPocAccount({ email: param.email });

        if (!isEmpty(ghostUser) && ghostUser.isGhost === true) return { err: true, msg: errorMessages.USER_CONVERTED_TO_GHOST };

        if (!isEmpty(ghostUser) && ghostUser.isGhost === false) return { err: true, msg: errorMessages.USER_ALREADY_EXIST};
        const user = await UsersModel.findOne({ email: param.email });
        if (isEmpty(user)) return { err: true, msg: errorMessages.USER_NOT_EXIST}
        if(!isEmpty(user) && user["freeze"]){ return { err: true, msg: "Account is freezed! Contact to Admin!!"} }
        if (param.type === signUpType.WEB) {
            const hashedPassword = crypto
                .createHash('md5')
                .update(param.password || '')
                .digest('hex');
            const output = hashedPassword === user["password"];
            if (!output) return { err: true, msg: errorMessages.INVALID_UNAME_PWORD }
        } else if (param.type === signUpType.GOOGLE || param.type === signUpType.FACEBOOK || param.type === signUpType.APPLE) {
            const signUptoken = user["social_token"];
            if (signUptoken !== param.socialToken || isEmpty(param.socialToken)) return { err: true, msg: errorMessages.SIGNUP_TOKEN}
        }else return { err: true, msg: `${param.type} is not valid`}
        return getLogin(param, user)
    } catch (err) {
        return { err: true, msg: err }
    }
}


async function createNewAdditionalSubUser(param){
    try {
        const { userId } = param;
        const getUser = await getUserById(userId);
        if(isEmpty(getUser)) return { err: true, msg: errorMessages.USER_NOT_EXIST}
        let userOwner
        if(param.role !== identity.ADMIN){
            const findAccountOwner = await getProviderById(getUser["_id"])
            userOwner = findAccountOwner[0]
            /**
             * Request sending user have primary account
             * then he is allowed to access to add the sub users*/
            if(isEmpty(findAccountOwner)) return { err: true, msg: `Provider ${errorMessages.USER_NOT_EXIST}` }
            if(!isEmpty(findAccountOwner) && !userOwner.makeAccountPrimary) return { err: true, msg: "You Don't have primary account" }
        }
        /**
         get the organisation details of users
         find the total subusers you should not go beyond the assigning limits*/
        const organisationId = getUser["role"] === "admin" ? param.organisationId : userOwner.organization
        const organisationDetails = await getOrganisationById(organisationId);
        const totalRegisteredUser = await findProviderByOrganisation(organisationDetails._id)
        console.log(organisationDetails,totalRegisteredUser )
        if(param.role !== identity.ADMIN){
            const findNameAndEmail = await UsersModel.findOne({ email: param.email }).lean();
            if(!isEmpty(findNameAndEmail)) return { err: true, msg: "Email of this account is already Exist" }

            const ghostUser = await pocAccount.findPocAccount({ email: param.email });
            if (!isEmpty(ghostUser)) return { err: true, msg: "Email of this account is already Exist" }

            if(size(totalRegisteredUser) === organisationDetails["totalAssigned"]+1){
                return { err: true, msg: "Can't added more subUser.Please contact to admin to increase limit" }
            }
            const createdNewReq = await dataApprovalSubUser.createDataApprovalForSubUser({
                ...param, requestBy: userId, method: method.CREATE,
                phone: param.contact
            });
            if(!isEmpty(createdNewReq) && createdNewReq.err) return createdNewReq
            const update = content(['Thank you for submitting improvements to the provider listing. Our team will review your comments and modify the listing as appropriate. We appreciate your contribution to the quality of our directory.'])
            sendMail(param.currUserEmail, "Update Request", update)
            return { err: false, msg: successMessages.APPROVAL_CREATED}
        }
        param.approvedStatus = status.APPROVED
        const newSubUserCreated = await dataApprovalSubUser.createOrgAndProviderBySubUser(param, false)
        if(!isEmpty(newSubUserCreated) && newSubUserCreated.err) return newSubUserCreated;
        return {
            err: false, msg: successMessages.PROVIDER_CREATED
        }
    } catch (err) {
        return {
            err : true, msg: err
        }
    }
}

async function getAdditionalSubUser(data, role){
    try {
        const { userId, organizationId } = data;
        let userOwner;
        if(role !== "admin"){
            const findAccountOwner = await getProviderById([userId]);
            userOwner = findAccountOwner[0]
            if(isEmpty(findAccountOwner)) return { err: true, msg: errorMessages.USER_NOT_EXIST }
            if(!isEmpty(findAccountOwner) && !userOwner.makeAccountPrimary) return { err: true, msg: "You Don't have primary account" }
        }
        const orgId = role === "admin" ? organizationId : userOwner.organization
        let providerData = await getDynamicProviderWithoutPopulate("organization", [orgId],{
            createdAt: 0,updatedAt: 0, __v: 0 })
        console.log(`!!!----getAdditionalSubUser----providerData`,providerData)
        if(isEmpty(providerData)){
            return { err: false, msg: []}
        }
        const organisation = await getOrganisationById(orgId) || [];
        const providerInfo=[]
        const getSubUser = await dataApprovalOrm.getDataApprovalSubUser({ requestBy: userId, status: status.PENDING },{
            createdAt: 0, updatedAt: 0, __v: 0, status: 0, requestBy: 0
        })
        for(let accountOwner of providerData){
            const getAllocation = await siteSubCategoryHelper.getAllSiteSubcategoryByUserId([accountOwner.userId])
            const getSubUserPending = filter(getSubUser, (p)=> p.method !== method.CREATE && !isEmpty(p.subUserId) && p.subUserId._id.toString() === accountOwner["userId"].toString());
            if(!isEmpty(getAllocation) && getAllocation.err){ return  getAllocation }
            providerInfo.push({
                ...accountOwner, totalAssigned: organisation["totalAssigned"] ?organisation["totalAssigned"] : 10,
                siteInfo:getAllocation.msg,
                approvalPending: !isEmpty(getSubUserPending)
            })
        }
        console.log(`providerInfo: ---`,providerInfo,role)
        return { err: false, msg: { providerInfo, approvalPending: getSubUser } }
    }catch (err){
        return {
            err : true, msg: err
        }
    }
}



async function updateSubUser(data, value, role){
    try {
        const { userId, providerId} = data
        if(role !== "admin"){
            const findAccountOwner = await getProviderById([userId])
            const userOwner = findAccountOwner[0]
            if(isEmpty(findAccountOwner)) return { err: true, msg: errorMessages.USER_NOT_EXIST }
            if(!isEmpty(findAccountOwner) && !userOwner.makeAccountPrimary) return { err: true, msg: "You Don't have primary account" }
        }
        return dataApprovalSubUser.updateProviderData(providerId, value)
    }catch (err){
        return {
            err : true, msg: err
        }
    }
}



async function updateSubUserProvider(data, value){
    try {
        const { userId, providerId} = data
        const findAccountOwner = await getProviderById([userId])
        const userOwner = findAccountOwner[0]
        if(isEmpty(findAccountOwner)) return { err: true, msg: errorMessages.USER_NOT_EXIST }
        //if(!isEmpty(findAccountOwner) && !userOwner.makeAccountPrimary) return { err: true, msg: "You Don't have primary account" }
        const provider = await getOneProvider(providerId);
        const createdNewReq = await dataApprovalSubUser.createDataApprovalForSubUser({
            requestBy: userId, ...value, method: method.UPDATE,
            subUserId: provider["userId"], email: provider["email"],
            organisationId: provider["organization"], phone:value.contact
        })
        if(!isEmpty(createdNewReq) && createdNewReq.err) return createdNewReq
        const update = content(['Thank you for submitting improvements to the provider listing. Our team will review your comments and modify the listing as appropriate. We appreciate your contribution to the quality of our directory.'])
        sendMail(provider["email"], "Update Request", update)
        return { err: false, msg: successMessages.APPROVAL_CREATED, val: successMessages.APPROVAL_CREATED}
    }catch (err){
        return {
            err : true, msg: err
        }
    }
}


async function deleteSubUser(data, role){
    try {
        const { userId, providerId} = data
        if(role !== "admin"){
            const findAccountOwner = await getProviderById([userId])
            const userOwner = findAccountOwner[0]
            if(isEmpty(findAccountOwner)) return { err: true, msg: errorMessages.USER_NOT_EXIST }
            if(!isEmpty(findAccountOwner) && !userOwner.makeAccountPrimary) return { err: true, msg: "You Don't have primary account" }
            const provider = await getOneProvider(providerId);
            const createdNewReq = await dataApprovalSubUser.createDataApprovalForSubUser({
                requestBy: userId,  method: method.DELETE,
                subUserId: provider["userId"], email: provider["email"],
                organisationId: provider["organization"],
                name: provider["name"]
            })
            console.log(createdNewReq)
            if(!isEmpty(createdNewReq) && createdNewReq.err) return createdNewReq
            return { err: false, msg: [], val: successMessages.APPROVAL_CREATED}
        }
        return dataApprovalSubUser.deleteSubUserByAdmin1(userId, providerId )
    }catch (err){
        return {
            err : true, msg: err
        }
    }
}

async function uploadImageByUserId(data){
    try {
        const { userId, image, filePath } = data;
        if(isEmpty(image) && isEmpty(filePath)) return { err: true, msg: "Image Buffer not found"}
        const users = await UsersModel.findOne({ _id: userId });
        if(isEmpty(userId) || isEmpty(users)) return { err: true, msg: "User not found"}
        const fileUpload = await awsHelper.uploadBase64ToS3(image,userId);
        if(!isEmpty(fileUpload) && fileUpload.err) return fileUpload
        const path = fileUpload.msg
        await updateUserById(userId, { image: path.link, imagePath: path.fileName })
        return { err: false, msg: [], val: successMessages.PROFILE_PIC_UPDATED }
        //const imagePath = await fileUpload(filePath[0],userId)
    } catch (err) {
        return { err: true, msg: err}
    }
}

async function makeAccountPrimaryApprovalUsers(data, id){
    try {
        const provider = await getProviderByName({ userId: id })
        console.log("provider",provider)
        if(Object.keys(data).includes("makeAccountPrimary")){
            const findExistingApproval = await dataApprovalOrm.getDataApprovalSubUser({
                subUserId: id, method: method.UPDATE, status: status.PENDING });
            if(!isEmpty(findExistingApproval)){
                return { err: true, msg:"One Request already pending on Same Email" }
            }
            const providerBasicInfo = { userId: id, providerId: provider["_id"] }
            const value = {
                name: provider["name"], email: provider["email"],
                makeAccountPrimary: data.makeAccountPrimary
            }
            return updateSubUserProvider(providerBasicInfo, value);
        }else{
            if(Object.keys(data).includes("searchResults")){
                await findIdAndUpdate(data, provider["organization"]._id)
            }
            else{
                await updateProviderInfo(data, id)
            }
            if(data.EmailMessage) sendNotificationToUser({ isEmail: true, email: provider["email"]})
            if(data.textMessage && !isEmpty(provider["contact"])) sendNotificationToUser({ isText: true, contact: provider["contact"]})
            return { err: false, msg: data, val: successMessages.PROFILE_UPDATED}
        }

    } catch (err){
        return { err: true, msg: err }
    }
}


module.exports = {
    login,
    createNewAdditionalSubUser,
    getAdditionalSubUser,
    updateSubUser,
    deleteSubUser,
    uploadImageByUserId,
    updateSubUserProvider,
    makeAccountPrimaryApprovalUsers,
    getLogin
}
