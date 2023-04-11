const { isEmpty, map, filter, groupBy, find, uniq} = require("lodash")
const siteOrm = require("../../dbQuery/site")
const ProviderOrm = require("../../../dbQuery/provider")
const siteSubcategoryOrm = require("../../../dbQuery/sitesSubcategory")
const {successMessages, status, method} = require("../../../helpers/messages");
const { getSiteAndSiteSubCategory } = require("../../../controllers/sitesSubCategory/sitesSubCategory.helper")
const organisationOrm = require("../../../dbQuery/organisation")
const saveListingOrm = require("../../../dbQuery/savedListing")
const dataApprovalOrm = require("../../../dbQuery/dataApproval")

async function allocateSiteSubCategoryWithSite(siteId){
    try {
        const findSites = await siteOrm.findSites({ _id: siteId });
        if(isEmpty(findSites)) return { err: true, msg: "SiteId not found"}
        const subCategories = findSites[0]["subcategory"];
        for(let subCategory of subCategories){
            const checkIsAlreadyExit = await siteSubcategoryOrm.findSiteSubcategory({subCategoryId: subCategory, siteId })
            if(!isEmpty(checkIsAlreadyExit)) continue;
            await siteSubcategoryOrm.createSiteSubcategory({
                siteId, subCategoryId: subCategory,
                serviceName: '',serviceWebpage: '', serviceDescription: '',
                poc: [], price: [],leaf: false, specialQualiFlag: false,
            })
        }
    } catch (err){
        return { err: true, msg: err }
    }
}

async function createSties(data){
    try {
        const findAlreadyExistSites = await siteOrm.findSites({ organisationId: data.organisationId, name: data.name });
        if(!isEmpty(findAlreadyExistSites)) return { err: true, msg: "Site Name is already associate with this organisation"}
        if(!isEmpty(data.category) && !isEmpty(data.subcategory)){
            data.category = uniq(data.category)
            data.subcategory = uniq(data.subcategory)
        }
        const newSites = await siteOrm.createSite(data);
        const siteSubCategory = await allocateSiteSubCategoryWithSite(newSites._id)
        if(!isEmpty(siteSubCategory) && siteSubCategory.err) return siteSubCategory
       return {
           err: false, msg: newSites
       }
    } catch (err) {
        console.log(`Error`, err);
        return { err: true, msg: err}
    }
}

async function getSiteDetails(organisationId){
    try {
        const getAllSites = await siteOrm.findSites({ organisationId: organisationId })
        const dataValue = [];
        const siteApproval = await dataApprovalOrm.getSiteDataApproval({ organisationId, status: status.PENDING })
        for(let site of getAllSites){
            const siteInfo = await getSiteAndSiteSubCategory(site, site["_id"])
            const getAllPendingSite = find(siteApproval, { method: method.UPDATE, siteId: site["_id"]})
            dataValue.push(
                { approvalPending: !isEmpty(getAllPendingSite), approval : getAllPendingSite, ...siteInfo.msg}
            )
        }
        if(!isEmpty(dataValue)){
            return  { err: false, msg: [...dataValue, ...filter(siteApproval, { method: method.CREATE })], val: successMessages.DATA_FETCHED};
        }else{
            return { err: false, msg: []}
        }
    } catch (err ){

    }
}

async function getAllSitesByUser(data){
    try {
        const findProvider = await ProviderOrm.getDynamicProvider("userId", data.userId,
            {
                makeAccountPrimary: 1,
                organization: 1,
                name: 1
            })
        if(isEmpty(findProvider)) return { err: true, msg: "Provider Data not found"}
        if(!isEmpty(findProvider) && !findProvider[0].makeAccountPrimary) return { err: true, msg: "account is not primary"}
        return getSiteDetails(data.organisationId)
    } catch (err){
        return { err: true, msg: err}
    }
}


async function getAllSiteByOrganisation(organisationId){
    try {
        const checkValidOrganisation = await organisationOrm.getOrganisationById(organisationId);
        if(isEmpty(checkValidOrganisation)) return { err: true, msg: "Organisation Id NOT found"};
        return  getSiteDetails(organisationId)
    } catch ( err ){
        return { err: true, msg: err}
    }
}

async function findAllState(){
    try {
        const findStates = await siteOrm.getAllUniqueStatesName()
        findStates.sort();
        if(isEmpty(findStates)) return { err: false, msg: []};
        const data =[]
        for(let state of findStates){
            const getAddressWiseState = await siteOrm.findSitesByFields({ state: { $in: state }}, {})
            console.log(getAddressWiseState)
            data.push({ state, stateCount: getAddressWiseState.length })
        }
        console.log(`!!---Get All State----!!`,data)
        return { err: false, msg: data }
    } catch (err) {
        return { err: true, msg: err }
    }
}


async function updatedSiteDataAndSiteSubCategory(siteId, data){
    try {
        const findSites = await siteOrm.findSites({ _id: siteId });
        if(isEmpty(findSites)) return { err: true, msg: "SiteId not found"}
        if(!isEmpty(data.category) && !isEmpty(data.subcategory)){
            data.category = uniq(data.category)
            data.subcategory = uniq(data.subcategory)
        }
        const newSubCategory = data.subcategory
        const oldSubCategory = findSites[0]["subcategory"]
        let addIds = []
        let deleteIds = []
        for(let newS of newSubCategory){
            const findS = find(oldSubCategory, (data) => data.toString() === newS.toString())
            if(isEmpty(findS)) addIds.push(newS)
        }
        for(let oldS of oldSubCategory){
            const findS = find(newSubCategory, (data) => data.toString() === oldS.toString())
            if(isEmpty(findS)) deleteIds.push(oldS)
        }
        if(!isEmpty(addIds)){
            for(let sub of addIds){
                await siteSubcategoryOrm.createSiteSubcategory({
                    siteId, subCategoryId: sub,
                    serviceName: '',serviceWebpage: '', serviceDescription: '',
                    poc: [], price: [],leaf: false, specialQualiFlag: false,
                })
            }
        }
        if(!isEmpty(deleteIds)){
            for(let id of deleteIds){
                await siteSubcategoryOrm.findAndDelete({ subCategoryId: id, siteId })
            }
        }
        await siteOrm.updateSite(data, siteId);
        return { err: false, msg: "Site Updated Successfully Done"}
    } catch (err){
        return { err: true, msg: err }
    }
}

async function deleteSiteBySiteId(siteId){
    try {
        const findSites = await siteOrm.findSites({ _id: siteId });
        if(isEmpty(findSites)) return { err: true, msg: "SiteId not found"}
        const siteDetails = findSites[0];
        const findSiteSubCategory = await siteSubcategoryOrm.findDynamicSubcategory("siteId", siteDetails._id, { _id: 1 })
        for(let id of findSiteSubCategory){
            await siteSubcategoryOrm.findAndDelete({ _id: id });
        }
        const findInstanceOfSiteListingItems = await saveListingOrm.getDynamicSavedItemListing({ siteId } , { _id: 1 })
        for(let saveListingItemsId of findInstanceOfSiteListingItems){
            await saveListingOrm.deleteSavedItemList(saveListingItemsId["_id"])
        }
        await siteOrm.deleteSite(siteId)
        return { err: false, msg: "Data Deleted"}
    } catch (err) {
        return { err: true, msg: err }
    }
}

module.exports = {
    createSties,
    getAllSitesByUser,
    getAllSiteByOrganisation,
    findAllState,
    updatedSiteDataAndSiteSubCategory,
    deleteSiteBySiteId
}
