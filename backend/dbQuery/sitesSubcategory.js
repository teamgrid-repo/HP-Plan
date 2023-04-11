const sitesSubCategory = require("../models/sitesSubCategory");

async function createSiteSubcategory(data){
    const entries = await sitesSubCategory(data);
    return entries.save()
}

async function findSiteSubcategory(data){
    return sitesSubCategory.findOne(data).lean()
}

async function updateSiteCategory(id, data){
    return sitesSubCategory.findOneAndUpdate({_id: id}, { ...data }).lean()
}

async function getOneSiteCategoryById(id){
    return sitesSubCategory.findById(id).lean()
}

async function findSiteSubCategoryBySiteId(data, fields={}){
    return sitesSubCategory.find(data).select(fields)
}

async function findPoc(userId = [], fields= {poc:1, siteId: 1,subCategoryId: 1}){
    return sitesSubCategory.find({
        poc: { $in: userId }
    }).populate({ path: "subCategoryId",select: {createdAt:0, updatedAt: 0, __v: 0}, populate: { path: "category_id" ,select: {createdAt:0, updatedAt: 0, __v: 0}}})
        .select(fields)
}

async function findDynamicSubcategory(fieldName, fieldData, fields){
    return sitesSubCategory.find({ [`${fieldName}`]: fieldData})
        .populate({path: "siteId", select: {createdAt:0, updatedAt: 0, __v: 0}, populate: { path: "organisationId", select: { hippa: 1, about: 1, state: 1 }}})
        .populate({ path: "subCategoryId",select: {createdAt:0, updatedAt: 0, __v: 0}, populate: { path: "category_id" ,select: {createdAt:0, updatedAt: 0, __v: 0}}})
        .populate({path: "specialQualif", select: { createdAt:0, updatedAt: 0, __v: 0 }})
        .select(fields)
}

async function filterDataOfSiteSubCategory(data, fields){
    return sitesSubCategory.find( data )
        .populate({path: "siteId", select: {createdAt:0, updatedAt: 0, __v: 0}, populate: { path: "organisationId", select: { hippa: 1, about: 1, logo:1 }}})
        .populate({ path: "subCategoryId",select: {createdAt:0, updatedAt: 0, __v: 0}, populate: { path: "category_id" ,select: {createdAt:0, updatedAt: 0, __v: 0}}})
        .populate({path: "specialQualif", select: { createdAt:0, updatedAt: 0, __v: 0 }})
        .populate({path: "poc", select: { name: 1, email: 1 }})
        .select(fields)
}

async function deleteById(id){
    return sitesSubCategory.findByIdAndDelete(id).lean();
}

async function getDistinctSites(fieldName, filter){
    return sitesSubCategory.distinct(fieldName, filter )
}

async function findAndDelete(data){
    return sitesSubCategory.findOneAndDelete(data)
}

async function bulkDeleteBySiteId(siteId){
    return sitesSubCategory.deleteMany({ siteId }).lean()
}

async function findUpdateSiteSubcategory(data,ids){
    return sitesSubCategory.updateMany(
        {
            siteId: { $in: ids },
            "staticPoc.staticPocId":data.staticPocId
        },
        {
            $push: { poc: data.userId },
            $pull: { staticPoc:{staticPocId:data.staticPocId}},
        }
        ).lean()
}

async function detStaticPoc(data,ids){
    return sitesSubCategory.updateMany(
        {
            siteId: { $in: ids },
            "staticPoc.staticPocId":data.staticPocId
        },
        {
            $pull: { staticPoc:{staticPocId:data.staticPocId}},
        }
        ).lean()
}

async function updateStaticPoc(data,ids){
    return sitesSubCategory.updateMany(
        {
            siteId: { $in: ids },
            "staticPoc.staticPocId":data.pocId
        },
        {
          $set: {
            "staticPoc.$.email": data.email,
            "staticPoc.$.name": data.name,
            "staticPoc.$.firstName": data.firstName,
            "staticPoc.$.lastName": data.lastName,
            "staticPoc.$.jobTitle": data.jobTitle,
            "staticPoc.$.contact": data.contact,
          },
        }
      );
}

async function addstaticpoc(data,userId,ids){
    console.log("userId",userId)
    return sitesSubCategory.updateMany(
        {
            siteId: { $in: ids },
            "poc" : {
                "$in": [
                   userId
                  ]
            }
        },
        {
            $pull: { poc: userId },
            $push: { staticPoc:data},
        }
        ).lean()
}

module.exports = {
    createSiteSubcategory,
    findSiteSubcategory,
    updateSiteCategory,
    getOneSiteCategoryById,
    findSiteSubCategoryBySiteId,
    findPoc,
    deleteById,
    findDynamicSubcategory,
    filterDataOfSiteSubCategory,
    getDistinctSites,
    findAndDelete,
    bulkDeleteBySiteId,
    findUpdateSiteSubcategory,
    addstaticpoc,
    detStaticPoc,
    updateStaticPoc
}
