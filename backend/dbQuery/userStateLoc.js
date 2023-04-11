const userStateLoc = require("../models/userStateLoc")

async function createStateLoc(data){
    const entries = userStateLoc(data)
    return entries.save()
}

async function getAllStateLoc(data = {}, fields = {}){
    return userStateLoc.find(data).select(fields).lean()
}

module.exports = {
    createStateLoc,
    getAllStateLoc
}