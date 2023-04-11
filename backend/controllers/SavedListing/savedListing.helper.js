const {isEmpty, groupBy, find, pick} = require("lodash");
const {errorMessages, successMessages} = require("../../helpers/messages");
const saveListingOrm = require("../../dbQuery/savedListing")
const siteSubCategoryHelper = require("../../controllers/sitesSubCategory/sitesSubCategory.helper")
const siteSubCategoryOrm = require("../../dbQuery/sitesSubcategory")
const organisationOrm = require("../../dbQuery/organisation")
const providerOrm = require("../../dbQuery/provider")
const siteOrm = require("../../admin/dbQuery/site")
const mongoose = require("mongoose");
const {filterProviderByfields} = require("../../dbQuery/provider");

async function createSavedListing(data){
    try {
        const { userId, listingName, stateLoc } = data;
        if(isEmpty(listingName)) return { err: true, msg: `Listing ${errorMessages.NOT_FOUND}`};
        const findExistingListing = await saveListingOrm.getDynamicSavedListing({ userId, name: listingName }, { name: 1, userId: 1 })
        if(!isEmpty(findExistingListing)){
            if(!data.update) return { err: true, msg: "This Directory is already Created"}
            const id = findExistingListing[0]._id;
            const { updatedName } = data;
            await saveListingOrm.updateSaveListing(id, { name: updatedName })
            const updatedSavedListing = await saveListingOrm.getDynamicSavedListing({ userId, name: updatedName }, { name: 1, userId: 1 })
            return { err: false, msg: updatedSavedListing, val: successMessages.LISTING_UPDATED}
        }
        const createNewSavedListing = await saveListingOrm.createSavedListing({
            userId, name: listingName, stateLoc
        })
        return { err: false, msg: createNewSavedListing, val: successMessages.LISTING_CREATED}
    } catch (err) {
        return { err: true, msg: err }
    }
}


async function getSavedListing(userId, name = false){
    try {
        let getSavedListingByUserId
        if(name){
            getSavedListingByUserId = await saveListingOrm.getDynamicSavedListing({ userId }, { name: 1 })
        }else{
            getSavedListingByUserId = await saveListingOrm.findSavedListingWithAggregation({ userId: mongoose.Types.ObjectId(userId)})
            if(isEmpty(getSavedListingByUserId)) return { err: false, msg: [] };
            for(let savedListing of getSavedListingByUserId){
                if(!isEmpty(savedListing) && !isEmpty(savedListing["directoryItems"])){
                    const siteItems = savedListing["directoryItems"];
                    const groupBySiteId = groupBy(siteItems,"siteId");
                    const siteData = await siteOrm.findSitesByFields({ _id: { $in: Object.keys(groupBySiteId) }},
                        { name: 1, address: 1, location: 1, website: 1, city: 1, state: 1, organisationId: 1, homeVisit: 1, virtual: 1, zipcode: 1 })
                    for(let site of siteItems){
                        const orgDetails = await organisationOrm.getOrganisationByData({ _id: site.organisationId })
                        const providerDetails = await providerOrm.filterProviderByfields({
                            organization: site.organisationId, makeAccountPrimary: true }, { name: 1, email: 1, contact: 1, userId: 1, appointments: 1, message: 1})
                        const subCategory = await siteSubCategoryOrm.findSiteSubCategoryBySiteId({ siteId: site.siteId })
                        const siteSubCat = await siteSubCategoryHelper.findSiteSubCategoryAlongWithOrg(subCategory)
                        if(!isEmpty(siteSubCat) && siteSubCat.err) continue;
                        const siteSubCategoryInformation = siteSubCat.msg
                        site.siteSubCategoryInfo= siteSubCategoryInformation["siteSubCategoriesVal"]
                        site.siteDetails = find(siteData, { _id: site.siteId})
                        site.primaryAccountOwnerInfo = providerDetails
                        site.organisation = { hippa: orgDetails.hippa, about: orgDetails.about}
                    }
                }
            }
        }
        return { err: false, msg: getSavedListingByUserId }
    } catch (err){
        return { err: true, msg: err }
    }
}

async function createSavedListItem(data){
    try {
        const { saveListingId, siteId, organisationId } = data;
        if(isEmpty(saveListingId)) return { err: true, msg: `saveListingId ${errorMessages.NOT_FOUND}`};
        const findSavedListingByIdAndUserId = await saveListingOrm.getDynamicSavedListing({ userId: data.userId, _id: saveListingId },{name: 1, userId: 1});
        if(isEmpty(findSavedListingByIdAndUserId)) return { err: true, msg: `${errorMessages.NO_DATA_FOUND} in Save Listing` };
        const findExistingSavedListingItem = await saveListingOrm.getDynamicSavedItemListing( {
            saveListingId, siteId
        });
        const findSite = await siteOrm.findSites({ _id: siteId, organisationId })
        if(isEmpty(findSite)) return { err : true, msg: "Site and Organisation not found"}
        if(!isEmpty(findExistingSavedListingItem)){
            return { err: true, msg: "This Site is already allocated in this directory" }
        }
        const createNewSavedListingItem = await saveListingOrm.createSavedItemListing({
            saveListingId, siteId, organisationId
        })
        return { err: false, msg: createNewSavedListingItem, val: successMessages.LISTING_CREATED}
    }catch (err) {
        return { err: true, msg: err }
    }
}

async function deleteSavedItemListings(directoryId){
    try {
        const ids = await saveListingOrm.getDynamicSavedItemListing({saveListingId: directoryId}, { _id: 1})
        for(let id of ids){
            await saveListingOrm.deleteSavedItemList(id["_id"]);
        }
        return { err: false, msg: [], val: successMessages.LISTING_DELETED}
    } catch (err){
        return { err: true, msg: err }
    }
}

async function deleteSavedListing(userId){
    try {
        const getAllSaveListing = await saveListingOrm.getDynamicSavedListing({ userId });
        for(let directory of getAllSaveListing){
            const deleteListing = await deleteSavedItemListings(directory["_id"])
            if(!isEmpty(deleteListing) && deleteListing.err) return deleteListing
        }
        return { err: false, msg: [], val: successMessages.LISTING_DELETED }
    } catch (err){
        return { err: true, msg: err }
    }
}

async function deleteBySiteId(siteId){
    try {
        const getAllSiteId = await saveListingOrm.getDynamicSavedListing({ siteId })
        if(!isEmpty(getAllSiteId)){
            await saveListingOrm.bulkDelete(siteId)
            return { err: false, msg: [], val: successMessages.LISTING_DELETED }
        }
        return { err: false, msg: [], val: successMessages.LISTING_DELETED}
    } catch (err){
        return { err: true, msg: err }
    }
}

module.exports = {
    createSavedListing,
    createSavedListItem,
    getSavedListing,
    deleteSavedItemListings,
    deleteSavedListing,
    deleteBySiteId
}
