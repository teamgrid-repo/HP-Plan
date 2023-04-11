const state = require("../models/states")

async function createState(data){
    const entries = await state(data)
    return entries.save()
}

async function getAllState(data, field){
    return state.find(data).select(field)
}

async function updateStateByData(data, filter){
    return state.findOneAndUpdate(filter, data)
}

module.exports = {
    createState,
    getAllState,
    updateStateByData
}
