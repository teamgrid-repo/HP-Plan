const dataApproval = require("../../dbQuery/dataApproval")
const {status, method, successMessages} = require("../../helpers/messages");
const {isEmpty, omit, uniq} = require("lodash");
const specialQualifOrm = require("../../dbQuery/specialQualification");
const siteOrm = require("../../admin/dbQuery/site");
const siteSubCategoryOrm = require("../../dbQuery/sitesSubcategory");
const providerOrm = require("../../dbQuery/provider");

async function createDataApprovalForSiteServices(data){
    try {
        const dataApprovalService = await dataApproval.getSiteServiceDataApproval({
            siteId: data.siteId, subCategoryId: data.subCategoryId, status: status.PENDING
        })
        if(!isEmpty(dataApprovalService)) return  { err: true, msg: "Same Approval is already Pending! Contact to Admin"}
        await dataApproval.createDataApprovalSiteService(data)
        return { err: false, msg: [], val: "Request is Sent to Admin"}
    } catch (err) {
        return { err: true, msg: err }
    }
}

async function getAllSiteService(){
    try {
        const getAllSiteService = await dataApproval.siteServiceWithPopulate({ status: status.PENDING }, {createdAt:0, updatedAt: 0, __v: 0})
        const data = []
        for(let service of getAllSiteService){
            const { siteId, subCategoryId } = service
            const sites = await siteOrm.getOneSite(siteId["_id"])
            if(isEmpty(sites)) continue;
            const findExitingSiteSubcategory = await siteSubCategoryOrm.filterDataOfSiteSubCategory({ siteId: siteId["_id"], subCategoryId: subCategoryId["_id"] });
            const provider = await providerOrm.filterProviderByfields({ organization: sites["organisationId"] },{ name: 1, email: 1, userId : 1 })
            if(isEmpty(findExitingSiteSubcategory)) continue;
            data.push({
                old: findExitingSiteSubcategory[0],
                new: service,
                allPoc: provider
            })
        }
        return { err: false, msg: data }
    } catch (err) {
        console.log(err)
        return { err: true, msg: err }
    }
}

async function validationSpecialQualification(specialQualification = [], subCategoryId){
    try {
        const validIds = []
        for(let name of specialQualification){
            const checkedQualification = await specialQualifOrm.dynamicSpecialQualification({ name, subCategoryId}, { name: 1});
            if(!isEmpty(checkedQualification)) validIds.push(checkedQualification[0]._id);
        }
        return { err: false, msg: validIds}
    } catch (err) {
        return { err: true, msg: err }
    }
}

async function sitesSubCategoryCreated(data, userId, localUserRole){
    try {
        const { siteId, subCategoryId } = data;
        const getSiteDetails = await siteOrm.getOneSite(siteId);
        if(isEmpty(getSiteDetails)){ return { err: true, msg: "SiteId is not valid" } }
        if(isEmpty(subCategoryId)) return { err: true, msg: "subcategory not found"}
        const findExitingSiteSubcategory = await siteSubCategoryOrm.findSiteSubcategory({ siteId, subCategoryId });
        let validSpecialQualif;
        if(isEmpty(data.request) || data.request !== "byProvider"){
            if(data.specialQualiFlag){
                validSpecialQualif = await validationSpecialQualification(data.specialQualif, subCategoryId)
                console.log(`!!!---validSpecialQualifications---!!!`, validSpecialQualif)
                if(!isEmpty(validSpecialQualif)) data.specialQualif = validSpecialQualif.msg
            }else data.specialQualif = []
        }
        if(localUserRole !== "admin"){
            const checkProviderAccount = await providerOrm.getDynamicProvider("userId", userId)
            const { makeAccountPrimary } = checkProviderAccount[0]
            if(isEmpty(checkProviderAccount) || !makeAccountPrimary){
                return { err: true, msg: "Account Primary not found"}
            }
            return createDataApprovalForSiteServices({
                ...data, status: status.PENDING, method: method.UPDATE, requestBy: userId, serviceId: findExitingSiteSubcategory["_id"]
            })
        }
        console.log(`!---Find Existing Site Subcategory ---!!`,findExitingSiteSubcategory,`-----Data--`, data)
        if(!isEmpty(data.poc)){
            data.poc = uniq(data.poc)
        }
        if(!isEmpty(findExitingSiteSubcategory)){
            const id = findExitingSiteSubcategory["_id"];
            await siteSubCategoryOrm.updateSiteCategory(id, data)
            const updatedData = await siteSubCategoryOrm.getOneSiteCategoryById(id);
            return { err: false, msg: updatedData, val: successMessages.SITE_UPDATED}
        }
        const createSubcategory = await siteSubCategoryOrm.createSiteSubcategory({ ...data, userId});
        return { err: false, msg: createSubcategory, val: successMessages.SITE_CREATED}
    } catch (err) {
        console.log(err)
        return {err: true, msg: err };
    }
}

async function updateSiteService(data){
    try {
        const getPendingApprovalData =await dataApproval.getSiteServiceDataApproval({ _id: data.id, status: status.PENDING }, { createdAt: 0,updatedAt: 0, __v: 0})
        if(isEmpty(getPendingApprovalData)) return  { err: true, msg: "No Data Found" }
        const siteService = getPendingApprovalData[0];
        if(siteService["method"] === method.UPDATE){
            const updateSiteService = await sitesSubCategoryCreated({ ...omit(siteService, ["_id", "status", "method"]), request: "byProvider" },
                data.approvedBy, "admin")
            if(!isEmpty(updateSiteService) && updateSiteService.err) return updateSiteService
        }
        await dataApproval.updateSiteService(data.id, data)
        return { err: false,msg: []}
    }catch (err) {
        return { err: true, msg: err }
    }
}

module.exports = {
    createDataApprovalForSiteServices,
    getAllSiteService,
    updateSiteService,
    sitesSubCategoryCreated
}
