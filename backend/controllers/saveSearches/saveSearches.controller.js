const {errorResponse, successResponse} = require("../../helpers/helpers");
const {successMessages} = require("../../helpers/messages");
const saveSearchesHelper = require("./saveSearches.helper")
const {isEmpty} = require("lodash");

module.exports.createSaveSearches = async (req, res)=>{
    try {
        const param = { ...req.body, ...req.query, ...req.params }
        param.userId = req.user._id
        const listing =await saveSearchesHelper.createSaveSearches(param);
        if(!isEmpty(listing) && listing.err){
            return errorResponse(req, res, listing.msg)
        }
        return  successResponse(req, res,listing.msg, successMessages.LISTING_CREATED)
    } catch (err){
        return errorResponse(req, res, err)
    }
}

module.exports.getAllSaveSearches = async (req, res)=>{
    try {
        const param = { ...req.body, ...req.query, ...req.params }
        param.userId = req.user._id;
        const allSaveListing = await saveSearchesHelper.getAllSaveSearches(param);
        if(!isEmpty(allSaveListing) && allSaveListing.err){
            return errorResponse(req, res, allSaveListing.msg)
        }
        return  successResponse(req, res,allSaveListing.msg, successMessages.SEARCHES_FETCHED)
    }catch (err){
        return errorResponse(req, res, err)
    }
}

module.exports.deleteSaveSearches = async (req, res)=>{
    try {
        const param = { ...req.body, ...req.query, ...req.params }
        param.userId = req.user._id;
        const deleteItems = await saveSearchesHelper.deleteSaveSearchesById(param.id);
        if(!isEmpty(deleteItems) && deleteItems.err){
            return errorResponse(req, res, deleteItems.msg)
        }
        return  successResponse(req, res,[], successMessages.SEARCHES_DELETED)
    } catch (err){
        return errorResponse(req, res, err)
    }
}