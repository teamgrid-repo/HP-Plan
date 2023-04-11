const dataApprovalSubPro = require("../models/dataApprovalSubProvider")
const dataApprovalSite = require("../models/dataApprovalSite")
const dataApprovalOrg = require("../models/dataApprovalOrg")
const dataApprovalSiteService = require("../models/DataApprovalSiteServices")

async function createDataSubUser(data){
    const entries = await dataApprovalSubPro(data);
    return entries.save()
}

async function getDataApprovalSubUser(data, field={}){
    return dataApprovalSubPro.find(data)
        .populate({path: "approvedBy", select: { name: 1}})
        .populate({path: "requestBy", select: { name: 1}})
        .populate({path: "subUserId", select: { name: 1}})
        .populate({path: "organisationId", select: { name: 1}})
        .sort({ createdAt: "desc"})
        .select(field).lean()
}

async function updatedDataApproval(id, data){
    return dataApprovalSubPro.findByIdAndUpdate(id, data).lean()
}

async function deleteDataApprovalSubuser(id){
    return dataApprovalSubPro.findByIdAndDelete(id).lean()
}

async function createSiteData(data){
    const entries = await dataApprovalSite(data);
    return entries.save()
}

async function updatedSiteDataApproval(id, data){
    return dataApprovalSite.findByIdAndUpdate(id, data).lean()
}

async function getSiteDataApproval(data, field={}){
    return dataApprovalSite.find(data)
        .populate({path: "approvedBy", select: { name: 1}})
        .populate({path: "requestBy", select: { name: 1}})
        .populate({path: "organisationId", select: { name: 1, subcategory: 1}})
        .populate({ path: "subcategory", select: { name: 1}, populate: { path: "category_id", select: { name: 1, weight: 1}}})
        .sort({ createdAt: "desc"})
        .select(field).lean()
}

async function createOrgData(data){
    const entries = await dataApprovalOrg(data);
    return entries.save()
}

async function getOrgDataApproval(data){
    return dataApprovalOrg.find(data).lean()
}

async function getOrganisationDataApproval(data, field= {}){
    return dataApprovalOrg.find(data)
        .populate({path: "approvedBy", select: { name: 1}})
        .populate({path: "requestBy", select: { name: 1}})
        .populate({path: "organisationId", select: { name: 1}})
        .populate({ path: "subcategory", select: { name: 1}, populate: { path: "category_id", select: { name: 1, weight: 1}}})
        .sort({ createdAt: "desc"})
        .select(field).lean()
}

async function updatedOrgDataApproval(id, data) {
    return dataApprovalOrg.findByIdAndUpdate(id, data).lean()
}

async function createDataApprovalSiteService(data){
    const entries = await dataApprovalSiteService(data);
    return entries.save()
}

async function getSiteServiceDataApproval(data, field={}){
    return dataApprovalSiteService.find(data).select(field).lean()
}

async function siteServiceWithPopulate(data,field={}){
    return dataApprovalSiteService.find(data).populate({ path: "siteId", select: { name: 1 }, populate: { path: "organisationId", select: { name: 1 }}})
        .populate({ path: "subCategoryId", select: { name: 1}, populate: { path: "category_id", select: { name: 1, weight: 1}}})
        .populate({ path: "requestBy" ,select: { name: 1}})
        .populate({ path: "approvedBy" ,select: { name: 1}})
        .populate({ path: "poc" ,select: { name: 1}})
        .populate("specialQualification")
        .select(field)
}

async function updateSiteService(id, data){
    return dataApprovalSiteService.findOneAndUpdate({ _id: id }, data)
}

module.exports = {
    createDataSubUser,
    getDataApprovalSubUser,
    updatedDataApproval,
    createSiteData,
    updatedSiteDataApproval,
    getSiteDataApproval,
    createOrgData,
    getOrganisationDataApproval,
    updatedOrgDataApproval,
    createDataApprovalSiteService,
    getSiteServiceDataApproval,
    siteServiceWithPopulate,
    updateSiteService,
    deleteDataApprovalSubuser,
    getOrgDataApproval
}
