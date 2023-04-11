const saveSearches = require("../models/saveSearches");

async function createSaveSearches(data){
    const entries = await saveSearches(data);
    return entries.save();
}

async function getAllSaveSearchesById(id){
    return saveSearches.findById(id).select({ name: 1, url: 1, count: 1}).lean()
}

async function getAllSaveSearches(userId){
    return saveSearches.find({ userId }).select({ name: 1, url: 1, count: 1}).lean()
}

async function deleteSaveSearchesById(id){
    return saveSearches.findByIdAndDelete(id)
}

async function findSaveSearchesData(data){
    return saveSearches.find(data).select({ name: 1, url: 1, count: 1})
}

async function updatedSaveSearches(id, data){
    return saveSearches.findOneAndUpdate({ _id: id }, data)
}
module.exports = {
    createSaveSearches,
    getAllSaveSearchesById,
    getAllSaveSearches,
    deleteSaveSearchesById,
    findSaveSearchesData,
    updatedSaveSearches
}