const { isEmpty } = require("lodash");
const { errorResponse, successResponse } = require("../../../helpers/helpers");
const { errorMessages, successMessages } = require("../../../helpers/messages");
const { getUpdateLink, getDeleteLink, getSearchLinkByData} = require("../../dbQuery/searchLink");
const searchLinkHelper = require("./searchLink.helper")
const moment = require("moment");

// CREATE SEARCHLINK
module.exports.createSearchLink= async (req, res) => {
  try {
    const params = { ...req.body, ...req.params, ...req.query };
    params.createdBy = req.user._id
    const searchLink = await searchLinkHelper.createOrUpdatedSL(params);
    if(!isEmpty(searchLink) && searchLink.err){
        return errorResponse(req, res, searchLink.msg, 200)
    }
    return successResponse(req, res, searchLink.msg, searchLink.val)
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
}

// GET ALL SEARCHLINKS
exports.getAllSearchLink = async (req, res) => {
  try {
    const allSearchLink = await searchLinkHelper.getAllSearchLink(req.user);
    if(!isEmpty(allSearchLink) && allSearchLink.err){
        return errorResponse(req, res, allSearchLink.msg)
    }
    return successResponse(req, res, allSearchLink.msg, successMessages.DATA_FETCHED)
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

// GET ONE SEARCHLINK
exports.getOneSearchLink = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };
    if(isEmpty(param.id)) return errorResponse(req, res, errorMessages.INVALID_PARAMS);

    const oneSearchLink = await searchLinkHelper.getOneLink(param.id);
    if(!isEmpty(oneSearchLink) && oneSearchLink.err){
        return errorResponse(req, res, oneSearchLink.msg)
    }
    return successResponse(req, res, oneSearchLink.msg, successMessages.DATA_FETCHED)
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

// UPDATE SERACHLINK

exports.updateSearchLink = async (req,res)=>{
    try {
        const param = { ...req.body, ...req.params, ...req.query };
        const getSearchLink = await getSearchLinkByData({ _id: param.id})
        if(!isEmpty(param.assignedTo) && !isEmpty(getSearchLink) && isEmpty(getSearchLink[0]["assignedTo"])){
          param.claimDate = moment().format('YYYY-MM-DD HH:mm:ss')
        }
        const data = await getUpdateLink(param.id,param);
        if (isEmpty(data)) return errorResponse(req, res, errorMessages.NO_DATA_FOUND);

        return successResponse(req, res, data, successMessages.DATA_FETCHED);
      } catch (error) {
        return errorResponse(req, res, error.message);
      }
}

// DELETE SEARCHLINK
exports.deleteSearchLink = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };
    if(isEmpty(param.id)) return errorResponse(req, res, errorMessages.INVALID_PARAMS);
    const data = await getDeleteLink(param.id);
    if (isEmpty(data)) return errorResponse(req, res, errorMessages.NO_DATA_FOUND);

    return successResponse(req, res, data, successMessages.DATA_DELETED);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

exports.getALlStatistics= async (req, res)=>{
  try {
    const role = req.user.role;
    if(role !== "admin"){
      return errorResponse(req, res, "Not allowed")
    }
    const dashboard = await searchLinkHelper.getALlStatisticsDetails();
    if(!isEmpty(dashboard) && dashboard.err){
      return errorResponse(req, res, dashboard.msg)
    }
    return successResponse(req, res, dashboard.msg, "Over all Statistics Fetched");
  } catch (err) {
    return errorResponse(req, res, err);
  }
}

exports.getALlSearchLinkStatistics= async (req, res)=>{
  try {
    const role = req.user.role;
    if(role !== "admin"){
      return errorResponse(req, res, "Not allowed")
    }
    const searchLinkDashboard = await searchLinkHelper.overAllStatisticsSearchLink();
    if(!isEmpty(searchLinkDashboard) && searchLinkDashboard.err){
      return errorResponse(req, res, searchLinkDashboard.msg)
    }
    return successResponse(req, res, searchLinkDashboard.msg, "Over all Statistics Fetched");
  } catch (err) {
    return errorResponse(req, res, err);
  }
}