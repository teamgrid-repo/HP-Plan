const siteSubCategoryOrm = require("../../dbQuery/sitesSubcategory")
const cureCategoryOrm = require("../../dbQuery/cureCategory")
const siteOrm = require("../../admin/dbQuery/site")
const {groupBy, pick, find, isEmpty, map} = require("lodash");
const specialQualifOrm = require("../../dbQuery/specialQualification");
const siteSubCategoryHelper = require("../sitesSubCategory/sitesSubCategory.helper")
const claimSiteOrm = require("../../dbQuery/siteClaim");
const {status} = require("../../helpers/messages");
const moment = require("moment");

let siteStorage = []
let time
async function storeSiteInSession(){
    if(!isEmpty(siteStorage)){
        const currTime = moment().utc()
        if(currTime.diff(time, 'minutes') < 3) return siteStorage;
    }
    siteStorage= await siteOrm.getAllSite()
    time = moment().utc()
    return siteStorage;
}

async function getSiteWithSubCategoryInfoByUserId(providerDetails){
    try {
        const findPoc = await siteSubCategoryOrm.findPoc([providerDetails.userId], {  createdAt:0, updatedAt: 0, __v: 0 })
        const allSites = await storeSiteInSession()
        const groupBySiteId = groupBy(findPoc, 'siteId')
        const siteInfo = []
        const category = {}
        const subCategoryByCat = {}
        for(let site of Object.keys(groupBySiteId)){
            const siteDetails = find(allSites, (siteIds) => siteIds._id.toString() === site.toString())
            const siteSubCategoryInfo = groupBySiteId[site]
            for(let service of siteSubCategoryInfo){
                const catId = service.subCategoryId.category_id
                const pickService = pick(service, ["price", "leaf", "specialQualif", "_id", "serviceWebpage", "serviceDescription", "siteId"])
                const subCatId = service.subCategoryId
                const data = {
                    ...pickService, subCategoryId : subCatId["_id"], ...pick(subCatId, ["name", "active"])
                }
                if(isEmpty(subCategoryByCat[catId["_id"]])){
                    subCategoryByCat[catId["_id"]] = [data]
                }else{
                    subCategoryByCat[catId["_id"]].push(data)
                }
                if(isEmpty(category[catId["_id"]])){
                    category[catId["_id"]] = catId["_doc"]
                }
            }
            siteInfo.push({
                ...siteDetails,
                cat: map(Object.keys(subCategoryByCat), (ids) => {
                    return { ...category[ids], subCategory: subCategoryByCat[ids]}
                }),
            })
        }
        return { err: false, msg: siteInfo }
    } catch (err) {
         return { err: true, msg: err }
    }
}

async function getSiteServiceBySiteId(siteDetails){
    try {
        const services = await siteSubCategoryOrm.findSiteSubCategoryBySiteId({ siteId: siteDetails["_id"]}, {
            createdAt: 0,updatedAt: 0, __v: 0
        })
        const siteServices = await siteSubCategoryHelper.findSiteSubCategoryAlongWithOrg(services);
        if(!isEmpty(siteServices) && siteServices.err) return siteServices
        const servicesBySiteId = siteServices.msg.siteSubCategoriesVal
        const subCategories = await cureCategoryOrm.getAllSubCategory({
            _id: { $in: Object.keys(groupBy(servicesBySiteId, "subCategoryId"))}
        })
        const details = []
        const groupByCategory = groupBy(subCategories, "category_id._id")
        for(let catId of Object.keys(groupByCategory)){
            let category = groupByCategory[catId][0].category_id
            const subCat = []
            for(let subCatId of groupByCategory[catId]){
                const findService = find(servicesBySiteId, ( subCategory) => subCategory.subCategoryId.toString() === subCatId._id.toString())
                const specialQualification = await specialQualifOrm.dynamicSpecialQualification(
                    { _id: { $in: findService["specialQualif"]}},
                    {createdAt: 0,updatedAt: 0,__v:0}
                )
                subCat.push({
                    subCategoryName : subCatId.name,
                    subCategoryId : subCatId._id,
                    ...findService,
                    specialQualif: Object.keys(groupBy(specialQualification,"name"))
                })
            }
            details.push({
                ...pick(category["_doc"], ["name","icon","description","weight"]),
                subCat,
                siteTotalPoc: siteServices.msg.totalSiteContact
            })
        }
        const findApprovedClaimSite = await claimSiteOrm.getOneSiteClaim({ siteId: siteDetails._id, status: status.APPROVED })
        return { err: false, msg: { ...siteDetails, siteSubCategoryInfo: details , claimStatus: !isEmpty(findApprovedClaimSite)} }
    } catch (err) {
        console.log(err)
        return { err: true, msg: err }
    }
}

module.exports = {
    getSiteWithSubCategoryInfoByUserId,
    getSiteServiceBySiteId
}
