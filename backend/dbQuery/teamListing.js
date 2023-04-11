const teamListing = require("../models/teamListing")

async function createTeam(data){
    const entries = await teamListing(data)
    return entries.save()
}

async function getAllTeam(data = {}, fields = { createdAt:0, updatedAt: 0, __v: 0 }){
    return teamListing.find(data).select(fields).lean()
}

async function updateTeam(id, data){
    return teamListing.findOneAndUpdate({ _id: id}, data)
}

async function deleteTeam(id){
    return teamListing.findByIdAndDelete(id).lean()
}

module.exports = {
    createTeam,
    getAllTeam,
    updateTeam,
    deleteTeam
}