const hubspot = require("../models/hubspot");

async function createCred(data){
    const entries = await hubspot(data);
    return entries.save()
}

async function getCred(){
    return hubspot.find({}).lean()
}

async function updateAccessToken(id, data){
    return hubspot.findByIdAndUpdate(id, data).lean()
}

module.exports = {
    createCred,
    getCred,
    updateAccessToken
}