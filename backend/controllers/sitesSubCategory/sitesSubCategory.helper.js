const siteSubCategoryOrm = require("../../dbQuery/sitesSubcategory");
const siteOrm = require("../../admin/dbQuery/site")
const providerOrm = require("../../dbQuery/provider")
const organisationOrm = require("../../dbQuery/organisation")
const { isEmpty, get, filter, groupBy, pick, find, map } = require("lodash")
const {successMessages, status} = require("../../helpers/messages");
const siteHelperOrm = require("../../dbQuery/sitesSubcategory");
const categoryController = require("../cure_categories/categories.controller")
const specialQualifOrm = require("../../dbQuery/specialQualification");
const cureCategoryOrm = require("../../dbQuery/cureCategory")
const specialQualificationOrm = require("../../dbQuery/specialQualification")
const dataApprovalHelper = require("../DataApproval/DataApprovalSiteService")
const dataApprovalOrm = require("../../dbQuery/dataApproval")
const moment = require("moment");

async function sitesSubCategoryCreated(data, userId, localUserRole){
    try {
        return dataApprovalHelper.sitesSubCategoryCreated(data, userId, localUserRole)
    } catch (err) {
        return {err: true, msg: err };
    }
}

async function getSiteAndSiteSubCategory(getSiteDetails, siteId){
    try {
        if(isEmpty(getSiteDetails)){ return { err: true, msg: "SiteId is not valid" } }
        const findExitingSiteSubcategory = await siteSubCategoryOrm.findSiteSubCategoryBySiteId({ siteId });
        const data = []
        for(let siteSubcategory of findExitingSiteSubcategory){
            const specialQualification = await specialQualifOrm.dynamicSpecialQualification(
                { _id: { $in: siteSubcategory["specialQualif"]}},
                {createdAt: 0,updatedAt: 0,__v:0}
            )
            const findDataApprovalByService = await dataApprovalOrm.getSiteServiceDataApproval({
                siteId: siteSubcategory["siteId"], subCategoryId: siteSubcategory["subCategoryId"], status: status.PENDING
            })
            data.push({ ...siteSubcategory["_doc"], specialQualif: Object.keys(groupBy(specialQualification,"name")), approvalPending: !isEmpty(findDataApprovalByService)})
        }
        return { err: false, msg: { ...getSiteDetails, siteSubCategoryInfo: data}}
    } catch (err){
        return { err: true, msg: err};
    }
}

async function getSiteSubCategory(data, accountOwnerUserId){
    try {
        const checkProviderAccount = await providerOrm.getDynamicProvider("userId", accountOwnerUserId)
        const { makeAccountPrimary } = checkProviderAccount[0]
        if(isEmpty(checkProviderAccount) || !makeAccountPrimary){
            return { err: true, msg: "Account Primary not found"}
        }
        const value=[]
        const organisationId = get(checkProviderAccount[0], "organization", "")
        if(isEmpty(organisationId)) return { err: false, msg: []}
        const findOrganisation =await organisationOrm.fetchAllInfoByOrganisationId([organisationId])
        for(let organisation of findOrganisation){
            const siteInfo = organisation["sitesInfo"]
            const sites= []
            if(!isEmpty(siteInfo)){
                for(let site of siteInfo){
                    const siteSubCategory = await getSiteAndSiteSubCategory(site, site._id)
                    sites.push(siteSubCategory.msg)
                }
                organisation.sitesInfo = sites;
                value.push(organisation)
            }
        }

        return { err: false, msg: value}
    } catch (err) {
        return { err: true, msg: err};
    }
}

async function deleteSiteSubcategoryByUserId(userId){
    try {
        const siteSubcategories = await siteSubCategoryOrm.findPoc(userId);
        if(!isEmpty(siteSubcategories)){
            for(let siteSubcategory of siteSubcategories){
                const id = siteSubcategory["_id"]
                await siteSubCategoryOrm.updateSiteCategory(id, { $pull : { poc : { $in: userId }}})
            }
            return { err: false, msg: "Deleted SuccessFully"}
        } else{
            return { err: false, msg: "No data Found" };
        }
    } catch (err){
        return { err: true , msg: err};
    }
}

async function getAllSiteSubcategoryByUserId(userId){
    try {
        const siteData = []
        let getAllocation = await siteHelperOrm.findPoc(userId)
        getAllocation = await groupBy(getAllocation, 'siteId')
        const allSites = await siteOrm.findSites({
            _id: { $in: Object.keys(getAllocation)}
        })
        for(let site of allSites){
            const categoryArr = []
            const category = getAllocation[site["_id"]];
            const Subcategories = category.map((data)=>{
                const categoryId = data.subCategoryId.category_id._id;
                if(!categoryArr.includes(categoryId)) categoryArr.push(categoryId)
                return data["subCategoryId"]["_id"]
            })
            const categoryInfo = await categoryController.getCategoryOfCure(categoryArr, Subcategories)
            siteData.push({
                ...site, siteSubCategory: categoryInfo
            })
        }
        return { err: false, msg: siteData }
    } catch (err) {
        return { err: true, msg: err }
    }
}

async function dynamicFetchingOfData(data, filterData={}){
    try {
        let result = [];
        if(!isEmpty(data)){
            const groupByIds = groupBy(data, "_id");
            result = await siteSubCategoryOrm.filterDataOfSiteSubCategory({
                _id: { $in: Object.keys(groupByIds)},
                ...filterData,
            }, {createdAt:0, updatedAt: 0, __v: 0})
        }else{
            result = await siteSubCategoryOrm.filterDataOfSiteSubCategory({ ...filterData }, {createdAt:0, updatedAt: 0, __v: 0})
        }
        if(!isEmpty(result)) result = filter(result, (val)=> val.siteId !== null)
        return { err: false, msg: result }
    } catch (err){
        return { err: true, msg: err }
    }
}

async function fetchResult(data, filterData={}){
    const filterOut = await dynamicFetchingOfData(data, filterData)
    if(!isEmpty(filterOut) && filterOut.err) return []
    return filterOut.msg
}

async function searchByKeyWord(keyWord="", data=[]){
    try {
        let keywordSearchResult=[]
        let filterData = [
            {serviceName: { $regex: keyWord, $options: 'i'}},
            {serviceWebpage: { $regex: keyWord, $options: 'i'}},
            {specialQues: { $regex: keyWord, $options: 'i'} },
            {serviceDescription: { $regex: keyWord, $options: 'i'} }
        ]
        let siteIds = []
        const getAllOrganisation = await organisationOrm.filterOutOrganisationByRegexBYData( {
           $or: [
               { about: { $regex: keyWord, $options: 'i'}},
               { zipcode: { $regex: keyWord, $options: 'i'}}
           ]
        },{ "sitesInfo._id": 1 });
        for(let organisation of getAllOrganisation){
            if(!isEmpty(organisation["sitesInfo"])){ siteIds= map(organisation["sitesInfo"], (org) => org._id) }
        }
        if(isEmpty(keywordSearchResult)){
            const filterOutBySiteName = await siteOrm.findSites({
                $or: [
                    { name: { $regex: keyWord, $options: 'i' }},
                    { zipcode: { $regex: keyWord, $options: 'i'}},
                    { address: { $regex: keyWord, $options: 'i'}},
                    { city: { $regex: keyWord, $options: 'i'}}
                ]
            });
            const groupBySite = groupBy(filterOutBySiteName, "_id");
            siteIds = [ ...siteIds, ...Object.keys(groupBySite) ]
        }
        if(!isEmpty(siteIds)){ filterData = [ ...filterData, { siteId: { $in: siteIds} }]}

        const specialQualification = await specialQualificationOrm.filterOutByRegex("name", keyWord);
        if(!isEmpty(specialQualification)){
            const groupBySpecialIds = groupBy(specialQualification, "_id");
            filterData = [ ...filterData, { specialQualif: {$in: Object.keys(groupBySpecialIds)} } ]
        }
        let userName = await providerOrm.filterProvider({ $or: [
                { name: { $regex: keyWord, $options: 'i' }}, {email: { $regex: keyWord, $options: 'i' }}, { contact: { $regex: keyWord, $options: 'i' }}]
        })

        if(!isEmpty(userName)){
            filterData = [ ...filterData, { poc: { $in: Object.keys(groupBy(userName, "userId")) }}]
        }
        if(!isEmpty(filterData)){
            const filterOutResult = await dynamicFetchingOfData( data, { $or: filterData });
            if(!isEmpty(filterOutResult) && filterOutResult.err) return filterOutResult;
            keywordSearchResult = filterOutResult.msg;
        }
        return { err: false, msg: keywordSearchResult }
    } catch (err) {
        return { err: true, msg: err }
    }
}

async function orderBySiteId(groupBySiteId){
    try {
        let dataValue = []
        let storeCategory = {}
        for(let site of groupBySiteId){
            const siteSubCategories = site[1]
            const siteDetails = siteSubCategories[0].siteId;
            const providerDetails = await providerOrm.filterProviderByfields(
                { organization: siteDetails.organisationId, makeAccountPrimary: true },
                { makeAccountPrimary: 1, name: 1, email: 1 })
            const cat = {}
            for(let service of siteSubCategories){
                const items = pick(service, ['poc', 'price','specialQualif', 'serviceWebpage', 'serviceDescription', 'leaf', 'serviceName'])
                const categoryId = service.subCategoryId.category_id._id
                const ele = service.subCategoryId
                const data = {
                    categoryId: ele.category_id._id,
                    name: ele.name,
                    _id: ele._id,
                    ...items,
                    mainProvider: providerDetails,
                }
                if(isEmpty(cat[categoryId])){
                    cat[categoryId] = [data]
                }else cat[categoryId].push(data)
                if(isEmpty(storeCategory[categoryId])){ storeCategory[categoryId] = service.subCategoryId.category_id }
            }
            dataValue.push({ ...siteDetails["_doc"], categoryInfo: map(Object.keys(cat), (ids)=>{
                return { ...storeCategory[ids]["_doc"], subCat: cat[ids]}
            })})
        }
        return  { err: true, msg: dataValue}
    } catch (err) {
        return { err: true, msg: err }
    }
}

let siteSubcategoryData = []
let time
async function storeSiteSubCategoryInSession(){
    if(!isEmpty(siteSubcategoryData)){
        const currTime = moment().utc()
        if(currTime.diff(time, 'minutes') < 3) return siteSubcategoryData;
    }
    time = moment().utc()
    const allOrg = await organisationOrm.getOrganisations({ publish: true, searchResults: true });
    const allSite = await siteOrm.findSites({ organisationId: Object.keys(groupBy(allOrg, "_id")), additional: { $ne: true } })
    siteSubcategoryData = await siteSubCategoryOrm.filterDataOfSiteSubCategory({ siteId: Object.keys(groupBy(allSite, "_id"))})
    return siteSubcategoryData
}

async function filterSiteProvider(filterData){
    try {
        let data = await storeSiteSubCategoryInSession()
        let setFilter = {}
        if(!isEmpty(filterData)){
            console.log(filterData)
            if(Object.keys(filterData).includes("additionalResource") && filterData.additionalResource === true){
                const { additionalResource } = filterData;
                const siteData = await siteOrm.findSites({ additional: additionalResource })
                data = await fetchResult([], {  siteId: { $in: Object.keys(groupBy(siteData, "_id")) } })
                if(isEmpty(data)) return { err: false, msg: []}
            }
            if(!isEmpty(filterData.category)){
                const { category } = filterData
                // setFilter = { ...setFilter, subCategoryId: { $in: category} }
                data = await fetchResult(data, { subCategoryId: { $in: category} })
                if(isEmpty(data)) return { err: false, msg: []}
            }
            if(!isEmpty(filterData.price)){
                const { price } = filterData;
                // setFilter = { ...setFilter, price: { $in: price} }
                data = await fetchResult(data, { price: { $in: price} })
                if(isEmpty(data)) return { err: false, msg: []}
            }
            if(Object.keys(filterData).includes("leaf") && filterData.leaf === true){
                const { leaf } = filterData;
                let applicable,notApplicable
                if(!isEmpty(filterData.category)){
                    applicable = await cureCategoryOrm.getAllSubCategory({ _id: { $in: filterData.category }, applicable: true })
                    notApplicable = await cureCategoryOrm.getAllSubCategory({ _id: { $in: filterData.category }, applicable: false })
                }else {
                    applicable = await cureCategoryOrm.getAllSubCategory({ applicable: true })
                    notApplicable = await cureCategoryOrm.getAllSubCategory({ applicable: false })
                }
                const filterLeaf = await dynamicFetchingOfData(data, {
                    $or: [
                        { subCategoryId: { $in: Object.keys(groupBy(notApplicable, "_id"))}},
                        { subCategoryId: { $in: Object.keys(groupBy(applicable, "_id"))}, leaf },
                    ]
                })
                if(!isEmpty(filterLeaf) && filterLeaf.err) return filterLeaf
                data = filterLeaf.msg
                if(isEmpty(data)) return { err: false, msg: []}
            }
            let siteIds = []
            if(!isEmpty(filterData.specialQualification)){
                const {specialQualification} = filterData;
                if(!isEmpty(filterData.category)){
                    let applicable = []
                    let notApplicable = []
                    for(let subId of filterData.category){
                        const findSpQ = await specialQualificationOrm.dynamicSpecialQualification({ subCategoryId: subId }, {})
                        if(!isEmpty(findSpQ)){
                            let applied = false
                            for(let sPId of findSpQ){
                                const id = sPId["_id"]
                                if(specialQualification.includes(id.toString())) applied = true
                            }
                            if(applied){ applicable.push(subId) }
                            else notApplicable.push(subId)
                        }
                        else notApplicable.push(subId)
                    }
                    const filterSpQ = await dynamicFetchingOfData(data, {
                        $or: [
                            { subCategoryId: { $in: notApplicable }},
                            { subCategoryId: { $in: applicable }, specialQualif: { $in: specialQualification} },
                        ]
                    })
                    if(!isEmpty(filterSpQ) && filterSpQ.err) return filterSpQ
                    data = filterSpQ.msg
                    if(isEmpty(data)) return { err: false, msg: []}
                }else{
                    data = await fetchResult(data, { specialQualif: { $in: specialQualification} })
                    if(isEmpty(data)) return { err: false, msg: []}
                }
            }
            if(!isEmpty(filterData.keywords)){
                const { keywords } = filterData;
                const keyWordsData = await searchByKeyWord(keywords, data);
                if(!isEmpty(keyWordsData) && keyWordsData.err){ return keyWordsData; }
                data = keyWordsData.msg;
                if(isEmpty(data)) return { err: false, msg: []}
            }
            /*if(!isEmpty(filterData.address)){
                const { address } = filterData
                const filterOutBySiteAddress = await siteOrm.findSites({ address: { $regex: address , $options: 'i'}});
                data = await fetchResult(data, {  siteId: { $in: Object.keys(groupBy(filterOutBySiteAddress, "_id")) } })
                if(isEmpty(data)) return { err: false, msg: []}
            }*/
            if(!isEmpty(filterData.states)){
                const { states } = filterData
                const findSiteByState = await siteOrm.findSites({ state: { $in: states }})
                data = await fetchResult(data, {  siteId: { $in: Object.keys(groupBy(findSiteByState, "_id")) } })
                if(isEmpty(data)) return { err: false, msg: []}
            }
            if(isEmpty(data)) return { err: false, msg: []}
        }
        if (
            Object.keys(filterData).includes("additionalResource") &&
            filterData.additionalResource === false
          ) {

            const siteData = await siteOrm.findSites({
              additional: true,
            });
            data = await fetchResult(data, {
              siteId: { $nin: Object.keys(groupBy(siteData, "_id")) },
            });
            if (isEmpty(data)) return { err: false, msg: [] };
        }
        return { err: false, msg: data }
    } catch (err){
        return { err:true, msg: err}
    }
}

async function getPocAllData(poc = []){
    try {
        let data=[]
        if(!isEmpty(poc)){
            const getAllData = await providerOrm.getDynamicProvider("userId", poc, { name: 1, email: 1, contact: 1, userId: 1, appointments: 1, message: 1, hippa: 1 })
            data = getAllData
        }
        return { err:false, msg: data };
    } catch (err) {
        return{ err: true, msg: err }
    }
}

async function findSiteSubCategoryAlongWithOrg(siteSubCategories){
    try {
        const siteSubCategoriesVal = []
        const groupBySubCategoryId = groupBy(siteSubCategories, "subCategoryId")
        const getAllSubCategories = await cureCategoryOrm.getSubcategoryById(Object.keys(groupBySubCategoryId))
        let totalSiteContact = 0;
        for(let siteSubCategory of siteSubCategories){
            const data = pick(siteSubCategory, ["leaf", "isHippa","poc","price","serviceName","serviceDescription","serviceWebpage","specialQualiFlag","specialQualif","specialQues","staticPoc"])
            if(!isEmpty(siteSubCategory["poc"])){
                totalSiteContact += siteSubCategory["poc"].length
                const getUserDetails = await getPocAllData(siteSubCategory["poc"]);
                data.poc = getUserDetails.msg
            }
            const findSubCategoryData = find(getAllSubCategories, { _id: siteSubCategory.subCategoryId} )
            if(!isEmpty(findSubCategoryData)){
                if(!isEmpty(findSubCategoryData.category_id)){
                    const categoryData = findSubCategoryData.category_id;
                    data.categoryName = categoryData["name"];
                    data.categoryId = categoryData["_id"]
                    data.categoryIcon = categoryData["icon"] || ''
                }
                data.subCategoryName = findSubCategoryData["name"];
                data.subCategoryId = findSubCategoryData["_id"];
            }
            siteSubCategoriesVal.push(data)
        }
        return { err: false, msg: {siteSubCategoriesVal, totalSiteContact}}
    } catch (err) {
        return { err: true, msg: err }
    }
}

async function getAllSteteLocationsByCategories(){
    try {
        const result = []
        const cureCategory = await cureCategoryOrm.findAllCategories()
        for(let category of cureCategory){
            const dataValue = { _id: category._id, name: category.name,description: category.description,weight: category.weight, icon: category.icon  }
            const cureSubCategory = await cureCategoryOrm.findDistinctCureSubcategory(category['_id']);
            if(isEmpty(cureSubCategory)) return { err: true, msg: "No Category found"}
            const subCategory = await cureCategoryOrm.getSubcategoryByCategoryId(category['_id'],{ name: 1, active: 1})
            const allDistinctSites = await siteSubCategoryOrm.getDistinctSites("siteId", {
                subCategoryId: { $in: cureSubCategory }
            })
            if(isEmpty(allDistinctSites)){
                result.push({...dataValue, subCategory, loc: []})
                continue;
            }
            const siteLocationData= await siteOrm.findSitesByFields({ _id: { $in: allDistinctSites } }, { location: 1 })
            result.push({...dataValue,subCategory, loc: siteLocationData})
        }
        return { err: false, msg: result}
    } catch (err) {
        return { err: true, msg: err }
    }
}

async function allFilterProvider(filterData){
    try {
        //const filterData = await storeSiteSubCategoryInSession()
        const totalResult = Object.keys(groupBy(filterData, "siteId._id"))
        const inOffice = await siteOrm.findSitesCount({ _id: { $in: totalResult },  location: { $ne: null }, virtual: false, homeVisit: false })
        const virtualSite = await siteOrm.findSitesCount({ _id: { $in: totalResult },  virtual: true})
        const homeVisit = await siteOrm.findSitesCount({ _id: { $in: totalResult },  homeVisit: true, location: { $ne: null }})
        return { err: false, msg: { total: (inOffice+virtualSite+homeVisit), virtualSite, homeVisit, inOffice}}
    }catch (err) {
        return { err: true, msg: err }
    }
}

module.exports = {
    sitesSubCategoryCreated,
    getSiteSubCategory,
    getSiteAndSiteSubCategory,
    deleteSiteSubcategoryByUserId,
    getAllSiteSubcategoryByUserId,
    filterSiteProvider,
    findSiteSubCategoryAlongWithOrg,
    getAllSteteLocationsByCategories,
    orderBySiteId,allFilterProvider
}
