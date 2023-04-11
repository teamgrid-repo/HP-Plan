const specialQualification = require("../models/specialQualification");

async function createSpecialQualification(data){
    const entries = await specialQualification(data);
    return entries.save()
}

async function getSpecialQualificationByName(name, subCategoryId){
    return specialQualification.findOne({ name , subCategoryId}).lean()
}

async function dynamicSpecialQualification(data, fieldName={}){
    return specialQualification.find(data).select(fieldName).lean()
}

async function filterOutByRegex(fieldName, keywordSearch){
    return specialQualification.find({
        [`${fieldName}`]: { $regex: keywordSearch, $options: 'i'}
    }).exec()
}

async function findByIdAndUpdate(id, data){
    return specialQualification.findByIdAndUpdate(id, data)
}

module.exports = {
    createSpecialQualification,
    getSpecialQualificationByName,
    dynamicSpecialQualification,
    filterOutByRegex,
    findByIdAndUpdate
}