const siteFeedBack = require("../models/siteFeedBack");

async function createSiteFeedBack(data){
    const entries = await siteFeedBack(data);
    return entries.save()
}

async function updateSiteFeedBack(data, filter){
    return siteFeedBack.findOneAndUpdate(filter, data);
}

async function getAllSiteFeedBack(data = {}){
    return siteFeedBack.find(data)
        .populate({path: "siteId", select: { name: 1, organisationId : 1},
            populate:{ path: "organisationId" , select: {name: 1}}})
        .sort({ createdAt: "desc"})
        .select({createdAt: 0, updatedAt: 0, __v: 0}).lean()
}

async function deleteFeedBack(id){
    return siteFeedBack.findByIdAndDelete(id)
}

async function getOneFeedback(id){
    return siteFeedBack.findById(id).lean()
}

module.exports = {
    createSiteFeedBack,
    updateSiteFeedBack,
    getAllSiteFeedBack,
    deleteFeedBack,
    getOneFeedback
}
