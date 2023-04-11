const { isEmpty } = require("lodash")
const {errorResponse, successResponse} = require("../../helpers/helpers");
const {successMessages, errorMessages} = require("../../helpers/messages");
const savedListingController = require("./savedListing.helper")
const savedListingOrm = require("../../dbQuery/savedListing")

module.exports.createSavedListing = async (req, res)=>{
    try {
        const param = { ...req.body, ...req.params, ...req.query };
        const localUser = req.user
        param.userId = localUser._id
        const savedListing = await savedListingController.createSavedListing(param);
        if(!isEmpty(savedListing) && savedListing.err){
            return errorResponse(req, res, savedListing.msg)
        }
        return successResponse(req, res, savedListing.msg, savedListing.val)
    } catch (err) {
        return errorResponse(req,res, err, 200)
    }
}

module.exports.getAllSavedListingByUserId = async (req, res)=>{
    try {
        const param = { ...req.body, ...req.params, ...req.query };
        const localUser = req.user;
        param.userId = localUser._id;
        const getSavedListingByUserId = await savedListingController.getSavedListing(param.userId, param.name);
        if(!isEmpty(getSavedListingByUserId) && getSavedListingByUserId.err){
            return errorResponse(req, res, getSavedListingByUserId.msg);
        }
        return successResponse(req, res, getSavedListingByUserId.msg, successMessages.LISTING_FETCHED)
    } catch (err) {
        return errorResponse(req,res, err, 200)
    }
}

module.exports.deleteSavedListing = async (req, res)=>{
    try {
        const param = { ...req.body, ...req.params, ...req.query };
        if(!isEmpty(param.id)){
            const listingItems = await savedListingController.deleteSavedItemListings(param.id)
            if(!isEmpty(listingItems) && listingItems.err) return errorResponse(req, res, listingItems.msg)
            const deleteData = await savedListingOrm.deleteSavedListing(param.id);
            if(!isEmpty(deleteData)){
                return successResponse(req, res, {}, successMessages.LISTING_DELETED);
            }
        }
        return errorResponse(req, res, errorMessages.ID_NOT_FOUND,200)
    } catch (err) {
        return errorResponse(req,res, err, 200)
    }
}

module.exports.createSavedItemsListing = async (req, res)=>{
    try {
        const param = { ...req.body, ...req.params, ...req.query };
        const localUser = req.user
        param.userId = localUser._id;
        const savedItemListing = await savedListingController.createSavedListItem(param);
        if(!isEmpty(savedItemListing) && savedItemListing.err) {
            return errorResponse(req, res, savedItemListing.msg, 200);
        }
        return successResponse(req, res, savedItemListing.msg, savedItemListing.val)
    } catch (err){
        return errorResponse( req, res, err, 200)
    }
}

module.exports.deleteSavedItemListing= async (req, res)=>{
    try {
        const param = { ...req.body, ...req.params, ...req.query };
        const deleteData = await savedListingOrm.deleteSavedItemList(param.id)
        if(!isEmpty(deleteData)){
            return successResponse(req, res, {}, successMessages.LISTING_DELETED);
        }
        return errorResponse(req, res, errorMessages.ID_NOT_FOUND,200)
    } catch (err){
        return errorResponse( req, res, err, 200)
    }
}