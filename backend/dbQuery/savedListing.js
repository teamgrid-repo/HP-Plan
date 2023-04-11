const savedListing = require("../models/savedListing");
const saveListingItems = require("../models/savedListingItem");

async function createSavedListing(data){
    const entries= await savedListing(data);
    return entries.save()
}

async function getDynamicSavedListing(data, field={}){
    return savedListing.find(data).select(field)
}

async function updateSaveListing(id, data){
    return savedListing.findByIdAndUpdate(id, data).lean()
}

async function deleteSavedListing(id){
    return savedListing.findByIdAndDelete(id).lean()
}

async function createSavedItemListing(data){
    const entries = await saveListingItems(data);
    return entries.save()
}

async function getDynamicSavedItemListing(data, field={}){
    return saveListingItems.find(data).select(field).lean()
}

async function findSavedListingWithAggregation(data){
    return savedListing.aggregate([
        {
            $lookup : {
                from: 'savelistingitems',
                localField: '_id',
                foreignField: 'saveListingId',
                as: 'directoryItems'
            }
        },{
            $match: data
        }
    ])
}

async function deleteSavedItemList(id){
    return saveListingItems.findByIdAndDelete(id).lean()
}

async function bulkDelete(siteId){
    return saveListingItems.deleteMany({ siteId })
}

module.exports = {
    createSavedListing,
    updateSaveListing,
    getDynamicSavedListing,
    deleteSavedListing,
    createSavedItemListing,
    findSavedListingWithAggregation,
    getDynamicSavedItemListing,
    deleteSavedItemList,
    bulkDelete
}
