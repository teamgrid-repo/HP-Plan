const cms = require("../models/cms")

async function saveCmsByModule(data){
    const entries = await cms(data)
    return entries.save()
}

async function updateCmsEntries(filter, data){
    return cms.findOneAndUpdate(filter, data).lean()
}

async function getAllEntriesByModule(data){
    return cms.findOne(data).lean()
}

async function getTerms() {
    return cms
      .findOne()
      .select({ userTerms: 1, providerTerms: 1, _id: 0 })
      .lean();
  }

module.exports = {
    saveCmsByModule,
    getAllEntriesByModule,
    updateCmsEntries,
    getTerms
}