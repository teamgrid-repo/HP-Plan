const dataApprovalSiteOrm = require("../../dbQuery/dataApproval")
const siteOrm = require("../../admin/dbQuery/site")
const {status, errorMessages, method, successMessages, requestType } = require("../../helpers/messages");
const {  getCategoryAndSubCategory } = require("../../helpers/helpers");
const {isEmpty, pick, find, omit} = require("lodash");
const siteHelper = require("../../admin/controllers/site/site.helper")
const cureCategoryOrm = require("../../dbQuery/cureCategory");

async function createSiteRequestForAdmin(data){
    try {
        const findSiteName = await dataApprovalSiteOrm.getSiteDataApproval({ organisationId: data.organisationId, name: data.name, status: status.PENDING });
        if(!isEmpty(findSiteName)){
            return { err: true, msg: "This site Name request is already sent to admin"}
        }
        await dataApprovalSiteOrm.createSiteData({...data, status: status.PENDING })
        return { err:false, msg: []}
    } catch (err) {
        return { err: true, msg: err }
    }
}

async function updatedCreateSiteRequest(data){
    try {
        const findId = await dataApprovalSiteOrm.getSiteDataApproval({ _id: data.id, status: status.PENDING });
        if(isEmpty(findId)){
            return { err: true, msg: errorMessages.ID_NOT_FOUND }
        }
        if(data.status === status.APPROVED){
            const site = findId[0]
            if(isEmpty(site)) return {err: true, msg: errorMessages.SOMETHING_WENT_WRONG }
            const value = pick(site, ["organisationId","name","address","city","zipcode","state","website","category","subcategory", "virtual", "homeVisit", "radius", "HQ"])
            if(site.method === method.CREATE){
                const creatingNewSite = await siteHelper.createSties({...value, userId: site.requestBy })
                if(!isEmpty(creatingNewSite) && creatingNewSite.err) return creatingNewSite
            }else if(site.method === method.UPDATE){
                const updateSite= await siteHelper.updatedSiteDataAndSiteSubCategory(site.siteId, value)
                if(!isEmpty(updateSite) && updateSite.err) return updateSite
            }else if(site.method === method.DELETE){
                const deleteSite =await siteHelper.deleteSiteBySiteId(site.siteId);
                if(!isEmpty(deleteSite) && deleteSite.err) return deleteSite
            }
        }
        await dataApprovalSiteOrm.updatedSiteDataApproval( data.id, {
            status: data.status
        })
        return { err: false, msg: [], val: successMessages.SITE_UPDATED}
    } catch (err){
        return { err: true, msg: err }
    }
}

async function getALlList(){
    try {
        const getAllDataApproval = await dataApprovalSiteOrm.getSiteDataApproval({status: status.PENDING})
        const findAllSubCategory = await cureCategoryOrm.getAllSubCategory({})
        const data = []
        for(let approval of getAllDataApproval){
            const { siteId, organisationId } = approval
            const approvalNew = approval
            if(approval["method"] === method.DELETE || approval["method"] === method.UPDATE){
                const site = await siteOrm.getOneSite(siteId)
                if(isEmpty(site)) continue;
                const originalSite = site["subcategory"]
                data.push({
                    old: { ...site,
                        cat: !isEmpty(originalSite) ? getCategoryAndSubCategory(findAllSubCategory, originalSite): [],
                        organisationCat: !isEmpty(organisationId["subcategory"]) ? getCategoryAndSubCategory(findAllSubCategory, organisationId["subcategory"]) : []
                    },
                    new: approval["method"] === method.DELETE ? { ...approvalNew, ...omit(site, ["organisationId"])} : approvalNew
                })
            }else data.push({
                old: {},
                new: approvalNew
            })
        }
        return { err: false, msg: data, val: successMessages.SITE_FETCHED }
    } catch (err){
        console.log(err)
        return { err: true, msg: err }
    }
}

module.exports = {
    createSiteRequestForAdmin,
    updatedCreateSiteRequest,
    getALlList
}
