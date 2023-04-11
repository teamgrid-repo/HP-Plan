const {isEmpty, pick, get, groupBy, map} = require("lodash");
const {errorMessages, successMessages, identity, providerType, status} = require("../../../helpers/messages");
const userOrm = require("../../../dbQuery/users");
const providerOrm = require("../../../dbQuery/provider")
const userProfileOrm = require("../../../dbQuery/userProfile")
const dataApprovalOrm = require("../../../dbQuery/dataApproval")
const claimProviderOrm = require("../../../dbQuery/siteClaim")
const crypto = require('crypto');
const randomize = require("randomatic");
const siteSubCategoryHelper = require("../../../controllers/sitesSubCategory/sitesSubCategory.helper")
const appointmentHelper = require("../../../controllers/appointment/appointment.helper")
const savedListingHelper = require("../../../controllers/SavedListing/savedListing.helper")
const providerHelper = require("../../../controllers/provider/provider.helper")
const userProfileHelper = require("../../../controllers/userProfile/userProfile.helper")
const saveSearchesHelper = require("../../../controllers/saveSearches/saveSearches.helper")
const quizController = require("../../../controllers/quizz/quiz.controller")
const emailTemplate = require("../../../helpers/template");
const {sendMail} = require("../../../connection/smtp.connect");

async function assignRoleUserToUser(user, currUser){
    try {
        if(!isEmpty(user["assigningId"])) return { err: true, msg: "This Email is already assigned to one Admin"}
        const id = user['_id']
        const currUserId = currUser["_id"]
        await userOrm.updateUserById(id, { assigningId: currUserId })
        await userOrm.updateUserById(currUserId, { assigningId: id })
        return { err: false, msg: "assigned Successfully done"}
    }catch (err) {
        return { err: true, msg: err }
    }
}

async function createAdminUser(data){
    try {
        const { email, password } = data;
        if(isEmpty(email)) return { err: true, msg: "Email is required"};
        let code = randomize('*', 10,{ exclude: '0oOiIlL1' });
        data.password = crypto.createHash('md5').update(code).digest('hex');
        const findByEmail = await userOrm.findUser({ email })
        if(!isEmpty(findByEmail)){
            return  { err: true, msg: errorMessages.USER_ALREADY_EXIST }
        }
        await userOrm.createUser({ ...data, status: false, jwt_auth_token: '', jwt_token_expired:  '' });
        const template = await emailTemplate.geForgetPasswordTemplate(code);
        sendMail(email, 'New PassCode', template);
        return { err: false, msg: [], val: "Admin User Created"}
    } catch (err) {
        return { err: true, msg: err }
    }
}

async function getAllAdminUser(currUserId, key){
    try {
        const { keyword } = key
        let getALlUser
        if(!isEmpty(keyword)){
            console.log(key, keyword)
            getALlUser = await userOrm.findUserByData({ role: identity.ADMIN, email : { $regex: keyword, $options: 'i'}, _id: { $ne: currUserId }})
            if(!isEmpty(getALlUser)){
                const orderByUser = groupBy(getALlUser,'_id')
                const nameFinder = await userOrm.findUserByData({
                    role: identity.ADMIN,
                    name : { $regex: keyword, $options: 'i'},
                    _id: { $nin: [...Object.keys(orderByUser), ...currUserId]}
                })
                getALlUser = [ ...getALlUser, ...nameFinder ]
            }else{
                getALlUser = await userOrm.findUserByData({
                    role: identity.ADMIN,
                    name : { $regex: keyword, $options: 'i'},
                    _id: { $ne: currUserId }
                })
            }
        }else{
            getALlUser = await userOrm.findUserByData({ role: "admin" , _id: { $ne: currUserId }});
        }
        return { err: false, msg: getALlUser }
    } catch (err) {
        return { err: true, msg: err }
    }
}

async function updateAdminUser(id, data){
    try {
        const findUser = await userOrm.getUserById(id);
        if(isEmpty(findUser)){
            return { err: true, msg: errorMessages.USER_NOT_EXIST }
        }
        if(!isEmpty(data.password)){
            data.password = crypto.createHash('md5').update(data.password).digest('hex');
        }
        if(!isEmpty(findUser["assigningId"]) && (!isEmpty(data["providerEmail"]) || data["remove"])){
            const providerUser = await userOrm.findUser({ _id: findUser["assigningId"] })
            if(isEmpty(providerUser)) return { err: true, msg: "User Email not find"}
            data.assigningId = null
            await userOrm.updateUserById(findUser["assigningId"], { assigningId: null })
        }
        await userOrm.updateUserById(findUser["_id"], data);
        if(!isEmpty(data["providerEmail"])){
            const user = await userOrm.findUser({ email: data["providerEmail"] })
            if(isEmpty(user) || user["role"] === identity.GENERAL_USER) return { err: true, msg: "User Email not Valid"}
            const assigning = await assignRoleUserToUser(user, findUser)
            if(!isEmpty(assigning) && assigning.err) return assigning
        }
        return { err: false, msg: [], val: "Admin User Updated"}
    } catch (err){
        return { err: true, msg: err }
    }
}

async function deleteAdminUser(id){
    try {
        const findUser = await userOrm.getUserById(id);
        if(isEmpty(findUser)){
            return { err: true, msg: errorMessages.USER_NOT_EXIST }
        }
        await userOrm.deleteUserById(id);
        return { err: false, msg: [], val: successMessages.DATA_DELETED}
    } catch (err){
        return { err: true, msg: err }
    }
}

async function getAllGeneralOrProvider(type) {
    try {
      let data = [];
      if (type === identity.PROVIDER) {
        allApprovedClaimSite = await claimProviderOrm.getAllApprovedClaimSite();
        //console.log("allApprovedClaimSite", allApprovedClaimSite);
        let result = allApprovedClaimSite.map((a) => a.email);
        //console.log("result", result);
        data = await Promise.all([
          ...map(
            await providerOrm.filterProviderByPopulate(
              {},
              { name: 1, email: 1, role: 1, image: 1, status: 1, freeze: 1 },
              { name: 1 },
              {
                name: 1,
                firstName: 1,
                lastName: 1,
                howYouHeard: 1,
                jobTitle: 1,
                email: 1,
                organization: 1,
                approvedStatus: 1,
                approvedBy: 1,
                claimStatus: 1,
              }
            ),
            (provider) => {
              if("claimStatus" in provider &&  provider["claimStatus"] === status.PENDING)
              {
                return null;
              }
              else{
                return provider["approvedStatus"] === status.APPROVED
                ? result.includes(provider["email"])
                  ? {
                      ...provider["_doc"],
                      providerType: providerType.CLAIM_PROVIDER,
                    }
                  : {
                      ...provider["_doc"],
                      providerType: providerType.SYSTEM_PROVIDER,
                    }
                : {
                    ...provider["_doc"],
                    providerType: providerType.NEW_REGISTER_PROVIDER,
                  };
              }
            }
          ),
          ...map(await claimProviderOrm.getAllPendingClaimSite({}), (claim) => {
            return {
              ...claim,
              organisation: claim.organisationId,
              providerType: providerType.CLAIM_PROVIDER,
            };
          }),
          ...map(
            await dataApprovalOrm.getDataApprovalSubUser(
              {$or: [ { status: "pending" },  { status: "cancelled" }],},
              //{ status: "pending" },
              { createdAt: 0, updatedAt: 0, __v: 0 }
            ),
            (poc) => {
              return {
                ...poc,
                organisation: poc.organisationId,
                providerType: providerType.POC,
              };
            }
          ),
        ]);
      } else if (type === identity.GENERAL_USER) {
        const users = await userOrm.searchesClientByIds(
          { role: type },
          {
            name: 1,
            email: 1,
            role: 1,
            image: 1,
            status: 1,
            freeze: 1,
          }
        );
        for (let user of users) {
          let userData = { ...user["_doc"] };
          userData.profileId = pick(userData.profileId, [
            "dob",
            "gender",
            "martialStatus",
            "religion",
            "occupation",
            "phone",
          ]);
          data.push(userData);
        }
      } else {
        return { err: true, msg: `Typo is there in ${type}` };
      }
      const results = data.filter(element => {
        return element !== null;
      });
      console.log(results.length)
      return { err: false, msg: results };
    } catch (err) {
      return { err: true, msg: err };
    }
  }

async function freezeAccount(data){
    try {
        const { id, type } = data;
        let findId
        if(type === 'user'){
            findId = await userProfileOrm.findProfileByUserId(id)
        }else{
            findId = await providerOrm.getProviderByName({_id: id})
        }
        if(isEmpty(findId)){
            return { err: true, msg: errorMessages.USER_NOT_EXIST }
        }
        const userId = findId["userId"]
        if(isEmpty(userId)) return {err: true, msg: errorMessages.SOMETHING_WENT_WRONG }
        await userOrm.updateUserById(userId, {
            freeze: data.status || false
        })
        return { err: false, msg: [], val: successMessages.ACCOUNT_FREEZE }
    } catch (err){
        return { err: true, msg: err }
    }
}

async function deleteEverything(userId){
    try {
        const findId = await userOrm.getUserById(userId);
        if(isEmpty(findId)){
            return { err: true, msg: errorMessages.USER_NOT_EXIST }
        }
        if(isEmpty(findId["_id"])) return {err: true, msg: errorMessages.SOMETHING_WENT_WRONG }
        const id = findId["_id"];
        //Saved Listing
        const savedListing = await savedListingHelper.deleteSavedListing(id)
        if(!isEmpty(savedListing) && savedListing.err) return savedListing;

        //SAVED SEARCHES
        const savedSearched = await saveSearchesHelper.deleteSaveSearchedByUserId(id)
        if(!isEmpty(savedListing) && savedListing.err) return savedSearched;

        //SAVED QUIZZES
        const quizzes = await quizController.deleteQuizByUserId(id)
        if(!isEmpty(quizzes) && quizzes.err) return quizzes;
        if(findId["role"] === identity.PROVIDER){
            // SITE SUBCATEGORY
            const siteSubCategory = await siteSubCategoryHelper.deleteSiteSubcategoryByUserId(id);
            if(!isEmpty(siteSubCategory) && siteSubCategory.err) return siteSubCategory;

            //PROVIDER APPOINTMENT
            const appointment = await appointmentHelper.deleteAppointment(id, "providerId")
            if(!isEmpty(appointment) && appointment.err) return appointment;

            //Provider
            const providerProfile = await providerHelper.deleteProviderProfile(id)
            if(!isEmpty(providerProfile) && providerProfile.err) return providerProfile;
        }else if( findId["role"] === identity.GENERAL_USER){
            //USER APPOINTMENT
            const appointment = await appointmentHelper.deleteAppointment(id, "clientId")
            if(!isEmpty(appointment) && appointment.err) return appointment;
            //USER PROFILE
            const userProfile = await userProfileHelper.deleteUserProfile(id)
            if(!isEmpty(userProfile) && userProfile.err) return userProfile;
        }
        await userOrm.deleteUserById(id);
        return { err: false, msg: [], val: successMessages.PROFILE_DELETED}
    } catch (err){
        return { err: true, msg: err }
    }
}

async function deleteAccount(data){
    try {
        const { id } = data;
        let deleteAllData = { err: true, msg: errorMessages.SOMETHING_WENT_WRONG}
        let typeAccount = data["accountType"]
        if(typeAccount === providerType.SYSTEM_PROVIDER || typeAccount === providerType.NEW_REGISTER_PROVIDER || typeAccount === providerType.GENERAL_USER ||  typeAccount === providerType.CLAIM_PROVIDER){
            let findId;
            if(typeAccount === providerType.GENERAL_USER){
                findId = await userProfileOrm.findProfileByUserId(id)
            }else{
                findId  = await providerOrm.getProviderByName({_id: id})
            }
            deleteAllData = await deleteEverything(findId["userId"]);
            if(!isEmpty(deleteAllData) && deleteAllData.err) return deleteAllData;
        }else if (typeAccount === providerType.CLAIM_PROVIDER){
            const findClaimSite = await claimProviderOrm.getOneSiteClaim({ _id: id })
            if(isEmpty(findClaimSite)) return { err: true, msg: "Claim not Found"}
            await claimProviderOrm.deleteClaim(id)
            deleteAllData = { err: false, msg: successMessages.PROFILE_DELETED}
        }else if(typeAccount === providerType.POC){
            const subUser = await dataApprovalOrm.getDataApprovalSubUser({ _id: id })
            if(isEmpty(subUser)) return { err: true, msg: "Sub User Not Found"}
            await dataApprovalOrm.deleteDataApprovalSubuser(id);
            deleteAllData = { err: false, msg: successMessages.POC_PROVIDER_DELETED}
        }
        return deleteAllData
    } catch (err){
        return { err: true, msg: err }
    }
}

async function getGhostProvider() {
    try {
      var date = new Date();
      var lastdate = new Date(date.getTime() - 30 * 24 * 60 * 60 * 1000);
      let ghostids = await userOrm.getGhostUserIds(lastdate);
      ids = ghostids.map(({ id }) => id);
      let ghost = await providerOrm.getGhostProvider(lastdate, ids);
      return { err: false, msg: ghost };
    } catch (err) {
      return { err: true, msg: err };
    }
}

module.exports = {
    createAdminUser,
    getAllAdminUser,
    updateAdminUser,
    deleteAdminUser,
    getAllGeneralOrProvider,
    freezeAccount,
    deleteAccount,
    getGhostProvider,
}
