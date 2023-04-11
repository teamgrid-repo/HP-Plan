const categoryOrm = require('../../dbQuery/cureCategory');
const { cureCategories, cureSubCategories, errorMessages, successMessages} = require("../../helpers/messages")
const { isEmpty, groupBy, find} = require('lodash')
const {errorResponse, successResponse} = require("../../helpers/helpers");
const {findAllCategories, getSubcategoryByCategoryId, getSubcategoryByIds, dynamicUpdateCategory, getAllSubCategory, dynamicSubcategory } = require("../../dbQuery/cureCategory");

const leaf = [
    { name: cureSubCategories.PREGNANCY_HELP, leaf: true},
    { name: cureSubCategories.WOMEN_MEDICAL_SERVICES, leaf: true},
    { name: cureSubCategories.SUPPORT_SERVICE_FOR_WOMEN, leaf: true},
    { name: cureSubCategories.HEALTH_SERVICES, leaf: true},
    { name: cureSubCategories.HOUSING_SHELTERS, leaf: true},
    { name: cureSubCategories.INTIMATE_PARTNER_VIOLATION, leaf: true},
    { name: cureSubCategories.COUNSELLING_FOR_WOMEN, leaf: true},
    { name: cureSubCategories.MEDICAL_INTERVENTION, leaf: true},
    { name: cureSubCategories.PERINATAL_HOSPICE, leaf: true},
    { name: cureSubCategories.PREGNANCY_LOSS_SUPPORT, leaf: true},
    { name: cureSubCategories.CHILDREN_HEALTH_CARE, leaf: true},
    { name: cureSubCategories.PARENTING_EDU, leaf: true},
]

function getValidSubcategories(name){
    if(name === cureCategories.MENTORSHIP.name){
        return [cureSubCategories.PREGNANCY_HELP]
    }else if(name === cureCategories.HEALTH_AND_WELL_BEING.name){
        return [cureSubCategories.WOMEN_MEDICAL_SERVICES, cureSubCategories.SUPPORT_SERVICE_FOR_WOMEN, cureSubCategories.HEALTH_SERVICES];
    }else if(name === cureCategories.FINANCIAL_ASSISTANCE_WORK_OR_EDUCATION.name){
        return [cureSubCategories.FINANCIAL_ASSISTANCE, cureSubCategories.WORK_OPPORTUNITY, cureSubCategories.EDU_OPPORTUNITIES];
    }else if(name === cureCategories.MATERIAL_OR_LEGAL_SUPPORT.name){
        return [cureSubCategories.TRANSPORTATION, cureSubCategories.FOOD_AND_NUTRITION, cureSubCategories.HOUSEHOLD_SERVICES,
            cureSubCategories.HOUSING_SHELTERS,cureSubCategories.LEGAL_SUPPORT]
    }else if(name === cureCategories.RECOVERY_AND_MENTAL_HEALTH.name){
        return [cureSubCategories.ADDICTIVE, cureSubCategories.INTIMATE_PARTNER_VIOLATION,cureSubCategories.COUNSELLING_FOR_WOMEN, cureSubCategories.ABORTION_RECOVERY];
    }else if(name === cureCategories.PRENATAL_DIAGNOSIS.name){
        return [cureSubCategories.DISABILITY_SUPPORT, cureSubCategories.MEDICAL_INTERVENTION, cureSubCategories.PERINATAL_HOSPICE,cureSubCategories.PREGNANCY_LOSS_SUPPORT]
    }else if(name === cureCategories.CARE_FOR_CHILDREN.name){
        return [cureSubCategories.CHILDCARE_HELP,
            cureSubCategories.PARENTING_EDU,
            cureSubCategories.CHILDREN_HEALTH_CARE,
            cureSubCategories.ADOPTION_SERVICES,
            cureSubCategories.FOSTER
        ]
    }else{
        return []
    }
}

exports.getAllCategories = async (req, res)=>{
    try {
        const allCategories = await categoryOrm.findAllCategories();
        if(isEmpty(allCategories)){
            for(const cure of Object.values(cureCategories)){
                const entries = await categoryOrm.upsertCategories(cure)
                if(!isEmpty(entries)){
                    const findSubCategoryRecords = await getValidSubcategories(entries["name"]);
                    if(!isEmpty(findSubCategoryRecords)){
                        for(let subCure of findSubCategoryRecords){
                            const findLeaf = find(leaf, { name: subCure })
                            let applicable= false
                            if(!isEmpty(findLeaf)) applicable = findLeaf.leaf
                            await categoryOrm.upsertSubcategories(entries["_id"], subCure, applicable);
                        }
                    }
                }
            }
        }
        const allCategoriesData = await categoryOrm.findAllCategories();
        return successResponse(req, res, allCategoriesData, successMessages.DATA_FETCHED)
    } catch (err){
        console.log(err);
        return errorResponse(req ,res, errorMessages.SOMETHING_WENT_WRONG)
    }
}

exports.fetchAllCategoryAndSubcategory = async (req, res)=>{
    try {
        const data = []
        const getAllCategory = await findAllCategories();
        for(let category of getAllCategory){
            const getAllsubCategory = await getSubcategoryByCategoryId(category._id);
            data.push({category,subCategory: getAllsubCategory})
        }
        return successResponse(req, res, data, successMessages.CURE_CATEGORY_FETCHED)
    } catch (err){
        console.log(err);
        return errorResponse(req ,res, errorMessages.SOMETHING_WENT_WRONG)
    }
}

exports.getCategoryOfCure = async (category = [], subcategory= [])=>{
    try {
        const categoryInfo=[]
        if(!isEmpty(category) && !isEmpty(subcategory)){
            const getAllCategory = await findAllCategories();
            const collectAllCategory = await getSubcategoryByIds(subcategory);
            const groupByCategory = await groupBy(collectAllCategory, "category_id")
            for(let categoryId of category){
                const findCategory = await find(getAllCategory, { _id: categoryId})
                if(!isEmpty(findCategory)){
                    categoryInfo.push({
                        category: findCategory,
                        subcategory: groupByCategory[categoryId]
                    })
                }
            }
        }
        return categoryInfo
    }catch (err){
        return {
            err: true, msg: err
        }
    }
}

exports.updateCategory = async (req, res) =>{
    try {
        const param = { ...req.body, ...req.query, ...req.params }
        if(!isEmpty(param.data)){
            const findAllCategory = await findAllCategories()
            const categoriesData = param.data;
            for(let category of categoriesData){
                const findCategoryById = find(findAllCategory, (cat) => cat.name === category.name)
                console.log(findCategoryById)
                if(isEmpty(findCategoryById)) return errorResponse(req, res, `category Id of ${category.id} is not valid`)
                await dynamicUpdateCategory({ _id: category.id }, category)
            }
            return successResponse(req, res, [], successMessages.DATA_UPDATED)
        }
        return errorResponse(req, res, "category Id not found")
    } catch (err) {
        return errorResponse(req ,res, err)
    }
}

exports.updateCatAndSubCatByType = async (req, res) => {
    try{
        const param = { ...req.body }
        const { id, type, updatedValue } = param
        if(type === "category"){
            const checkId = await findAllCategories({ _id : id})
            if(isEmpty(checkId)) return errorResponse(req, res, errorMessages.ID_NOT_FOUND)
            await dynamicUpdateCategory({ _id: id }, updatedValue)
            return successResponse(req, res, [], "Cure Category updated")
        }else if(type === "subcategory"){
            const checkId = await getAllSubCategory({ _id : id})
            if(isEmpty(checkId)) return errorResponse(req, res, errorMessages.ID_NOT_FOUND)
            await dynamicSubcategory({ _id: id }, updatedValue)
            return successResponse(req, res, [], "Cure SubCategory updated")
        }
        return errorResponse(req, res, "Correct Type is required!")
    } catch(err) {
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG)
    }
}
