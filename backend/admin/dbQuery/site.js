const site = require("../models/sites");

exports.createSite = async (data) => {
    const result = site(data);
    return result.save();
}

exports.getAllSite = async () => {
  return site.find({}).lean();
}

exports.getOneSite = async (siteId) => {
  return site.findOne({ _id: siteId }).lean();
}

exports.updateSite = async (data, siteId) => {
  return site.findOneAndUpdate({ _id: siteId }, data, { new: true });
}

exports.deleteSite = async (siteId) => {
  return site.findOneAndDelete({ _id: siteId });
}

exports.findSites = (data)=>{
    return site.find(data).lean()
}

exports.findSitesIds = (data)=>{
    return site.find(data).select({ _id: 1 });
}

exports.findSitesCount = (data)=>{
    return site.find(data).count()
}

exports.filterOutSiteByRegex = async (fieldName, fieldData)=>{
    return site.find({
        [`${fieldName}`]: { $regex: fieldData, $options: 'i' }
    })
}

exports.findSitesByFields = async ( data, field)=>{
    return site.find(data).select(field)
}

exports.getAllUniqueStatesName = async ()=>{
    return site.distinct("state")
}

exports.fetchAllServicesByOrgId = async (data)=>{
    return site.aggregate([
        {
            $lookup: {
                from: 'sitessubcategories',
                localField: '_id',
                foreignField: 'siteId',
                as: 'serviceInfo'
            }
        },
        {
            $match: data
        },
    ])
}

exports.findOrgIdBySiteId = async (data)=>{
    return site.find(data).select({ organisationId: 1 });
}