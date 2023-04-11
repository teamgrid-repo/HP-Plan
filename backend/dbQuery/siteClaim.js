const siteClaim = require("../models/claimSite");

async function createClaimSite(data){
    const entries = await siteClaim(data);
    return entries.save();
}

async function getAllClaimSite(data = {}){
    return siteClaim.find(data)
        .populate({ path: "siteId", select: { name: 1, email: 1, state: 1 }})
        .populate({ path: "organisationId", select: { name: 1, email: 1 }})
        .populate({ path: "approvedBy", select: { name: 1}})
        .select({ createdAt: 0, updatedAt: 0,__v: 0}).lean()
        .lean()
}

async function getAllPendingClaimSite() {
    return siteClaim
      .find({ status: "pending" })
      .populate({ path: "siteId", select: { name: 1, email: 1, state: 1 } })
      .populate({ path: "organisationId", select: { name: 1, email: 1 } })
      .populate({ path: "approvedBy", select: { name: 1 } })
      .select({ createdAt: 0, updatedAt: 0, __v: 0 })
      .lean()
      .lean();
  }

async function getAllApprovedClaimSite() {
    return siteClaim.find({ status: "approved" }).select({ email: 1 }).lean();
}

async function getClaimByEmail(data){
    return siteClaim.find(data).lean()
}

async function getOneSiteClaim(data){
    return siteClaim.findOne(data).select({ createdAt: 0, updatedAt: 0,__v: 0}).lean()
        .lean()
}

async function updatedClaim(filter, data){
    return siteClaim.findOneAndUpdate(filter, data)
}

async function deleteClaim(id){
    return siteClaim.findByIdAndDelete(id).lean()
}

async function deletePendingClaim(data) {
    return siteClaim.deleteMany(data).lean();
}

module.exports = {
    createClaimSite,
    getAllClaimSite,
    getClaimByEmail,
    getOneSiteClaim,
    updatedClaim,
    deleteClaim,
    deletePendingClaim,
    getAllPendingClaimSite,
    getAllApprovedClaimSite
}
