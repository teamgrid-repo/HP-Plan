const {errorResponse, successResponse, checkingValidation, updateApproval} = require("../../helpers/helpers");
const {successMessages, errorMessages} = require("../../helpers/messages");
const siteSubcategoryHelper = require("../sitesSubCategory/sitesSubCategory.helper")
const siteOrm = require("../../admin/dbQuery/site");
const organisationOrm = require("../../dbQuery/organisation");
const {isEmpty, groupBy} = require("lodash");

async function checkNewSitesValidation(data){
    const requiredParams = ["siteId","subCategoryId"];
    const allowedParams = ["serviceName", "leaf", "serviceWebpage", "serviceDescription" , "poc", "price", "virtual", "homeVisit", "specialQualiFlag" ,"specialQualif", "priceA","siteId","subCategoryId","additionalResource","specialQues","approvalId","staticPoc"];

    if(checkingValidation(data, requiredParams, allowedParams)){
        return { err: true, msg: errorMessages.INVALID_PARAMS };
    }
    return { err: false, msg: [] };
}

module.exports.createdNewSiteSubcategory = async (req, res) => {
    try {
      const param = req.body.appData;
      const checkValidation = await checkNewSitesValidation(param);
      if (!isEmpty(checkValidation) && checkValidation.err) {
        return errorResponse(req, res, checkValidation.msg, 200);
      }
      let pocIds = param.poc;
      console.log("pocIds",pocIds)
      let org = await siteOrm.findOrgIdBySiteId({"_id":param.siteId})
      console.log("org---",org)
      let poc = await organisationOrm.getPoc({"organisationId":org[0].organisationId})
      console.log("poc",poc)
      let staticPocData = poc.poc;
      console.log("staticPocData",staticPocData)
      let staticPoc = [];
      let newPoc = [];
      for(let i= 0;i<pocIds.length;i++){
        console.log(" pocIds[i]", pocIds[i])

        const object = staticPocData.find(  obj =>{ return obj._id.equals(pocIds[i])});
        if(object !== undefined)
        {
            staticPoc.push(
              {
                "staticPocId" : pocIds[i],
                "name": object.name,
                "firstName": object.firstName,
                "lastName": object.lastName,
                "jobTitle":object.jobTitle,
                "contact":object.contact,
                "email":object.email
              }
              )
            //param.poc.pop(pocIds[i])
        }else{
          newPoc.push(pocIds[i]);
        }
      }

      console.log("param.staticPoc",staticPoc)

      param.staticPoc = staticPoc;
      param.poc = newPoc;
      console.log(param)
      const siteHelper = await siteSubcategoryHelper.sitesSubCategoryCreated(
        param,
        req.user._id,
        req.user.role
      );
      if (!isEmpty(param["approvalId"])) {
        const approval = await updateApproval(
          param["approvalId"],
          "siteServiceWithPopulate",
          "updateSiteService"
        );
        if (!approval) return errorResponse(req, res, "Send me correct approval");
      }
      if (!isEmpty(siteHelper) && siteHelper.err) {
        return errorResponse(req, res, siteHelper.msg, 200);
      }
      return successResponse(req, res, siteHelper.msg, siteHelper.val);
    } catch (err) {
      return errorResponse(req, res, err, 200);
    }
  };

module.exports.getAllSiteSubcategory = async (req, res) => {
    try {
        const param = { ...req.params, ...req.body, ...req.query };
        const userId = req.user._id;
        if(req.user.role !== "provider") return errorResponse(req, res, "You are not a provider");
        const getAllSitesSubCategoryDetails = await siteSubcategoryHelper.getSiteSubCategory(param, userId)
        if(!isEmpty(getAllSitesSubCategoryDetails) && getAllSitesSubCategoryDetails.err){
            return errorResponse(req, res, getAllSitesSubCategoryDetails.msg, 200)
        }
        return successResponse(req, res, getAllSitesSubCategoryDetails.msg, successMessages.DATA_FETCHED)
    } catch (err) {
        return errorResponse(req, res, err, 200)
    }
}

module.exports.filterSitesProvider = async (req, res) => {
    try {
        const param = { ...req.body, ...req.params, ...req.query }
        const getProvider = await siteSubcategoryHelper.filterSiteProvider(param)
        if (!isEmpty(getProvider) && !getProvider.err) {
            let index = param.index || 0
            let filterProvider = getProvider.msg
            filterProvider.sort(function (a, b) {
                // sort in an ascending order
                if (a.siteId.name < b.siteId.name) {
                  return -1;
                }
                if (a.siteId.name > b.siteId.name) {
                  return 1;
                }

                // names must be equal
                return 0;
            });
            const result = await siteSubcategoryHelper.allFilterProvider(filterProvider)
            filterProvider = Object.entries(groupBy(filterProvider, "siteId._id"))
            if(isEmpty(param.address)){
                filterProvider = result.msg.total > 100 ? filterProvider.slice(index, index+100) : filterProvider
            }
            const provider = await siteSubcategoryHelper.orderBySiteId(filterProvider)
            return successResponse(req, res, { count: result.msg, provider: provider.msg }, successMessages.DATA_FETCHED)
        } else {
            return errorResponse(req, res, getProvider.msg)
        }
    } catch (err) {
        console.log(`Get Provider Err: `, err);
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG)
    }
}

module.exports.findAllStateLocationByCategory = async (req, res) =>{
    try {
        const stateLocation = await siteSubcategoryHelper.getAllSteteLocationsByCategories()
        console.log(stateLocation)
        if(!isEmpty(stateLocation) && stateLocation.err) {
            return errorResponse(req, res, stateLocation.msg)
        }
        return successResponse(req, res, stateLocation.msg, successMessages.DATA_FETCHED)
    } catch (err){
        return errorResponse(req, res, err)
    }
}
