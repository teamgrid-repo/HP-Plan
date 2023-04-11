const CureCategory = require('../models/category');
const subCategory = require('../models/subcategory');

exports.insertCategory = async (data)=>{
    const entries = await CureCategory(data);
    return entries.save();
}

exports.findSingleCategories = async (categoryName)=>{
    return CureCategory.findOne({ name: categoryName })
}

exports.upsertCategories = async (category)=>{
    return CureCategory.findOneAndUpdate({name: category.name}, { ...category, active: true}, { new: true, upsert: true})
}

exports.findAllCategories = (data = {}) => {
    return CureCategory.find( { ...data, active: true }, ['active','name', "description", "icon", "weight"]).sort({weight : "asc"})
}


exports.upsertSubcategories = function (categoryId, subCategoryName, applicable=false){
    return subCategory.findOneAndUpdate({name : subCategoryName}, {
        name: subCategoryName,
        category_id: categoryId,
        active: true,
        applicable,
        originalName: subCategoryName
    },{ new: true, upsert: true})
}

exports.getSubcategoryByCategoryId = function (categoryId, fields={}){
    return subCategory.find({category_id: categoryId}).select(fields)
}

exports.getSubcategoryById = function (id = []){
    return subCategory.find({ _id: {$in: id}}).populate("category_id")
}

exports.getSubcategoryByIds = function (id = []){
    return subCategory.find({ _id: {$in: id}})
}


exports.findAllSubCategory = function (name = []){
    return subCategory.find({ name: { $in: name}, active : true})
}

exports.filterOutByRegex = function (keyword = "", field = {}){
    return subCategory.find({ name: { $regex: keyword, $options: 'i'}}).select(field)
}

exports.findDistinctCureSubcategory = function ( categoryId ){
    return subCategory.distinct('_id', { category_id: categoryId })
}

exports.dynamicUpdateCategory = function (filterData, updatedData){
    return CureCategory.findOneAndUpdate(filterData, updatedData).lean()
}

exports.getAllSubCategory = function (data= {}){
    return subCategory.find(data).populate("category_id")
}

exports.dynamicSubcategory = function (filterData, updatedData){
    return subCategory.findOneAndUpdate(filterData, updatedData).lean()

}
