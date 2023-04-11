const { isEmpty } = require("lodash");
const cmsOrm = require("../../dbQuery/cms");
const userProfileOrm = require("../../dbQuery/userProfile");
const providerProfileOrm = require("../../dbQuery/provider");
const moment = require("moment");
const { successMessages } = require("../../helpers/messages");
async function updateTerms(param) {
  try {
    const findHomeModule = await cmsOrm.getAllEntriesByModule({});
    if (!isEmpty(findHomeModule)) {
      if (param.type === "user") {
        param.userTermsUpdateDate = moment().utc();
      } else if (param.type === "provider") {
        param.providerTermsUpdateDate = moment().utc();
      }
      await cmsOrm.updateCmsEntries({ _id: findHomeModule["_id"] }, param);
      const cms = await cmsOrm.getTerms({});
      return { err: false, msg: cms };
    }
  } catch (err) {
    return { err: true, msg: err };
  }
}

async function getTerms() {
  try {
    const getCms = await cmsOrm.getTerms();
    return { err: false, msg: getCms };
  } catch (err) {
    return { err: true, msg: err };
  }
}
async function updateProfile(id, param) {
  try {
    let data = {};
    if (param.type === "user") {
      data.acceptTermsDate = moment().utc();
      data.acceptTerms = true;
      await userProfileOrm.updateUserProfileById(data, id);

      return { err: false, msg: successMessages.PROFILE_UPDATED };
    } else if (param.type === "provider") {
      data.acceptProviderTermsDate = moment().utc();
      await providerProfileOrm.updateProviderInfoo(data, id);
      return { err: false, msg: successMessages.PROFILE_UPDATED };
    }
  } catch (err) {
    console.log(err);
    return { err: true, msg: err };
  }
}
module.exports = {
  updateTerms,
  getTerms,
  updateProfile,
};
