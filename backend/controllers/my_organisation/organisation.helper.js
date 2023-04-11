const organisationCrm = require("../../dbQuery/organisation");
const {isEmpty, groupBy, find, pick, filter, map, forEach, uniq} = require("lodash");
const providerOrm = require("../../dbQuery/provider");
const userOrm = require("../../dbQuery/users")
const {successMessages, errorMessages, status, identity, leadStatus, getPriceDetailsLikeHubspot, getLeafStatusLikeHubspot } = require("../../helpers/messages");
const { findAllCategories, getSubcategoryByIds } = require("../../dbQuery/cureCategory")
const siteOrm = require("../../admin/dbQuery/site")
const siteSubCategoryOrm = require("../../dbQuery/sitesSubcategory")
const imageUploadOrm = require("../ImageUpload/index")
const dataApproval = require("../../dbQuery/dataApproval")
const hubspotCrm = require("../Hubspot/index")
const saveListingHelper = require("../../controllers/SavedListing/savedListing.helper")
const cureCategoryOrm = require("../../dbQuery/cureCategory")
const specialQualificationOrm = require("../../dbQuery/specialQualification")
const dataApprovalHelper = require("../DataApproval/DataApprovalSubUser")
const searchLinkOrm = require("../../admin/dbQuery/searchLink")
const { getSiteServiceBySiteId } = require("../provider/providersite.helper")
const request = require("request");
const moment = require("moment");
const { approvedProvider } = require("../../helpers/template");
const {sendMail} = require("../../connection/smtp.connect");
const mongoose = require("mongoose");
const { envConstants } = require("../../helpers/constants")

async function createOrganisationWithHubSpot(param, orgId, isNew){
    try {
        const orgCreateHub = await hubspotCrm.createAndUpdateHubspotCompany(isNew, orgId, param)
        if(!isEmpty(orgCreateHub) && orgCreateHub.err) return orgCreateHub;
        return { err: false, msg: []}
    }catch (err){
        return { err: true, msg: err }
    }
}

async function getRemoveSubCategoryByOrganisation(orgId, categoryIds=[], subCategoryIds=[]){
    try {
        const organisationDetails = await organisationCrm.getOrganisationByData({ _id: orgId })
        if(isEmpty(organisationDetails)) return { err: true, msg: "Organisation Id not found"}
        const oldOrganisationCategory = organisationDetails["category"]
        const oldOrganisationSubCategory = organisationDetails["subcategory"]
        console.log(`##oldOrganisationCategory##########`,oldOrganisationCategory, oldOrganisationSubCategory)
        const deleteCatIds = [];
        const deleteSubCatIds = [];
        for(let subCategory of oldOrganisationSubCategory){
            const findSubCategory = find(subCategoryIds, (id) => id.toString() === subCategory.toString());
            if(isEmpty(findSubCategory)) deleteSubCatIds.push(subCategory)
        }
        for(let category of oldOrganisationCategory){
            const findCategory = find(categoryIds, (id) => id.toString() === category.toString());
            if(isEmpty(findCategory)) deleteCatIds.push(category)
        }
        const findSiteBySubCategory = await siteOrm.findSitesByFields({ organisationId: orgId, subcategory: { $in: deleteSubCatIds }});
        if(isEmpty(findSiteBySubCategory)) return { err: false, msg: "No need to Change" }
        console.log(`Delete Category--${deleteCatIds}`,`Delete Subcategory--${deleteSubCatIds}`)
        for(let site of findSiteBySubCategory){
            const oldSiteSubcategory = site["subcategory"]
            for(let id of oldSiteSubcategory){
                const findDeletedId = filter(deleteSubCatIds, id)
                if(!isEmpty(findDeletedId)){
                    await siteSubCategoryOrm.findAndDelete({ siteId: site["_id"], subCategoryId: id })
                }
            }
            await siteOrm.updateSite({ $pull: { subcategory: { $in: deleteSubCatIds }, category: { $in: deleteCatIds }}}, site["_id"])
        }
        return { err: false, msg: []}
    } catch (err){
        return { err: true, msg: err }
    }
}


async function createOrganisation(data){
    try {
        const create = await organisationCrm.createNewOrganisation(data)
        return { err: false, msg: create, val: successMessages.ORGANISATION_CREATED}
    } catch (err) {
        return { err: true, msg: err }
    }
}

async function updateOneOrganisation(param, id){
    try {
        const org = await organisationCrm.findIdAndUpdate(param, id)
        return { err: false, msg: org, val: successMessages.ORGANISATION_UPDATED}
    } catch (err) {
        return { err: true, msg: err }
    }
}

async function createOrgByAdmin(data){
    try {
        if(!isEmpty(data.logo)){
            let imageUrl = await imageUploadOrm.uploadBase64ToS3(data.logo, data.userId);
            if(!isEmpty(imageUrl) && imageUrl.err) return imageUrl
            imageUrl = imageUrl.msg.link;
            data.logo = imageUrl
        }
        if(!isEmpty(data.sourceOfFinding)) await searchLinkOrm.getUpdateLink(data.sourceOfFinding, { assignedTo: data.userId })
        const createOrg = await createOrganisation(data);
        if(!isEmpty(createOrg) && createOrg.err) return createOrg;
        return createOrg
    } catch (err) {
        return { err: true, msg: err }
    }
}

async function updateOneExistingOrganisation(orgId, data){
    try {
        let findOrg = await organisationCrm.getOrganisationById(mongoose.Types.ObjectId(orgId))
        if(isEmpty(findOrg)) return { err: true, msg: "Organisation doesn't not Exist"}
        const provider = await providerOrm.filterProviderByfields( { organization: mongoose.Types.ObjectId(orgId) })
        if(!isEmpty(provider)) findOrg = { ...findOrg["_doc"], providerInfo: provider }
        if(!isEmpty(data.logo)){
            let imageUrl = await imageUploadOrm.uploadBase64ToS3(data.logo, data.userId);
            if(!isEmpty(imageUrl) && imageUrl.err) return imageUrl
            imageUrl = imageUrl.msg.link;
            data.logo = imageUrl
        }
        if(!isEmpty(data.category) && !isEmpty(data.subcategory)){
            data.category = uniq(data.category)
            data.subcategory = uniq(data.subcategory)
        }
        if(!isEmpty(data.subcategory)){
            const checkSubCategory = await getRemoveSubCategoryByOrganisation(orgId, data.category, data.subcategory)
            if(!isEmpty(checkSubCategory) && checkSubCategory.err) return checkSubCategory
        }
        const updateOrg= await updateOneOrganisation(data, orgId)
        const providers = findOrg["providerInfo"]
        if(!isEmpty(providers) && !findOrg["publish"] && data["publish"]){
            for(let provider of providers){
                const { passwordSent, email, userId } = provider
                if(!passwordSent){
                    await dataApprovalHelper.updateNewPassword(email, userId["_id"])
                    const template = approvedProvider()
                    sendMail(email, 'WELCOME NEW ORG',template)
                }
            }
        }
        if(!isEmpty(data["leadStatus"])){
            if([
                leadStatus.GENERAL_BY_ANALYST,
                leadStatus.STATE_COORDINATOR,
                leadStatus.PROSPECTING,
                leadStatus.PERSONAL_STATE_COORDINATOR,
                leadStatus.PRO_LIFE_MAIN_NETWORK,
                leadStatus.PUBLIC_ADDITIONAL_NETWORK,
            ].includes(data.leadStatus)){
                let isNew = isEmpty(findOrg["hubspotId"])
                const siteSubCategory = await siteOrm.fetchAllServicesByOrgId({ organisationId: mongoose.Types.ObjectId(orgId) })
                if(!isEmpty(siteSubCategory)){
                    data.specialSQ = []
                    data.sQFreeText = []
                    data.price = []
                    const roundUpLeaf = []
                    for(let siteService of siteSubCategory){
                        const services = siteService["serviceInfo"]
                        for(let service of services){
                            if(!isEmpty(service["specialQualif"])){
                                const getSQ = await specialQualificationOrm.dynamicSpecialQualification({ _id: service["specialQualif"]}, { name: 1});
                                data.specialSQ = [ ...Object.keys(groupBy(getSQ, "name")), ...data.specialSQ ]
                            }
                            if(!isEmpty(service["specialQues"])){data.sQFreeText.push(service["specialQues"])}
                            if(!isEmpty(service["price"])){
                                for(let pr of service["price"]){
                                    const valueLikeHubspot = getPriceDetailsLikeHubspot(pr);
                                    if(!data.price.includes(valueLikeHubspot)) data.price.push(valueLikeHubspot)
                                }
                            }
                            if(service["leaf"] && !roundUpLeaf.includes("yes")){ roundUpLeaf.push("yes") }
                            else if(!service["leaf"] && !roundUpLeaf.includes("no")) roundUpLeaf.push("no")
                        }
                    }
                    data.leaf = getLeafStatusLikeHubspot(roundUpLeaf)
                }
                const hubspotOrgCreation = await createOrganisationWithHubSpot(data, findOrg, isNew)
                if(!isEmpty(hubspotOrgCreation) && hubspotOrgCreation.err) return hubspotOrgCreation
            }
        }
        return updateOrg
    } catch (err) {
        return { err: true, msg: err }
    }
}

async function createDynamicOrganisation(data){
    try {
        if(!isEmpty(data.category) && !isEmpty(data.subcategory)){
            data.category = uniq(data.category)
            data.subcategory = uniq(data.subcategory)
        }
        if(data.type === identity.ADMIN){
            const getExistingOrganisationByName = await organisationCrm.getOrganisationByData({ name: data.name })
            if(!isEmpty(getExistingOrganisationByName)) return { err : true, msg: "Organisation is Already exist"};
            data.providerId = data.userId
            const orgCreation = await createOrgByAdmin(data)
            const findOrg = orgCreation.msg
            if(!isEmpty(data.leadStatus)){
                if([
                    leadStatus.GENERAL_BY_ANALYST,
                    leadStatus.STATE_COORDINATOR,
                    leadStatus.PROSPECTING,
                    leadStatus.PERSONAL_STATE_COORDINATOR,
                    leadStatus.PRO_LIFE_MAIN_NETWORK,
                    leadStatus.PUBLIC_ADDITIONAL_NETWORK,
                ].includes(data.leadStatus)){
                    const hubspotOrgCreation = await createOrganisationWithHubSpot(data, findOrg, true)
                    if(!isEmpty(hubspotOrgCreation) && hubspotOrgCreation.err) return hubspotOrgCreation
                }
            }
            return orgCreation
        }else if(data.type === identity.PROVIDER){
            const providerOrganisation = await organisationCrm.getOrganisationByData({ providerId: data.providerId })
            if(!isEmpty(providerOrganisation)) return { err : true, msg: errorMessages.ORGANISATION_ALREADY_EXIST};
            return createOrgByAdmin(data)
        }
    } catch (err) {
        return { err: true, msg: err }
    }
}

async function createCatSubcategory(organisation){
    try {
        const findAllCategory = await findAllCategories()
        const categoryInfo = []
        if(!isEmpty(organisation["subcategory"])){
            const collectAllCategory = await getSubcategoryByIds(organisation["subcategory"])
            const groupByCategory = await groupBy(collectAllCategory, "category_id")
            for(let categoryId of organisation.category){
                const findCategory = await find(findAllCategory, { _id: categoryId})
                if(!isEmpty(findCategory)){
                    categoryInfo.push({
                        category: findCategory,
                        subcategory: groupByCategory[categoryId]
                    })
                }
            }
        }
        return categoryInfo
    } catch (err) {
        return { err: true, msg: err }
    }
}

async function getAdminOrganisationById(data, role){
    try {
        let getExistingOrganisation
        let approvalPendingData = {}
        let getPendingStateOfDataApproval
        if(role === identity.PROVIDER){
            const { providerId } = data
            const provider = await providerOrm.getDynamicProvider("userId", providerId, {organization: 1})
            getExistingOrganisation = await organisationCrm.getOrganisationByData({ _id: provider[0].organization })
            if(isEmpty(getExistingOrganisation)) return { err: true, msg: "organisation Id not Exist"};
        }else if(role === identity.ADMIN){
            getExistingOrganisation = await organisationCrm.getOrganisationByData({ _id: data.orgId });
        }
        if(isEmpty(getExistingOrganisation)) return { err: true, msg: "organisation Id not Exist"};
        const organisation = getExistingOrganisation
        getPendingStateOfDataApproval = await dataApproval.getOrgDataApproval({ organisationId: getExistingOrganisation["_id"], status: status.PENDING });
        if(role === identity.PROVIDER) approvalPendingData.approvalPending= !isEmpty(getPendingStateOfDataApproval)
        else{
            approvalPendingData.approvalPending= !isEmpty(getPendingStateOfDataApproval)
            approvalPendingData.approvalData = !isEmpty(getPendingStateOfDataApproval)
                ? { ...getPendingStateOfDataApproval[0], cat: await createCatSubcategory(getPendingStateOfDataApproval[0]) }
                : {}
        }
        if(!isEmpty(organisation)){
            const details = []
            details.push({organisation, cat: await createCatSubcategory(organisation) , ...approvalPendingData})
            return { err: false, msg: details, val: successMessages.DATA_FETCHED}
        }else{
            return { err: false, msg: [], val: "No Data Found"}
        }
    } catch (err){
        return { err: true, msg: err }
    }
}

async function adminContactAllOrganisation(orgId){
    try {
        const organisation = await organisationCrm.getOrganisationByData({
            _id: orgId
        });
        if(isEmpty(organisation)) return { err: true, msg: "organisation Id not Exist"};
        const getProviderByOrganisation = await providerOrm.getDynamicProvider("organization", orgId, { organization: 1, name: 1, userId: 1, address: 1, city: 1, state: 1, email: 1, makeAccountPrimary: 1})
        return { err: false, msg: getProviderByOrganisation, val: successMessages.DATA_FETCHED }
    } catch (err){
        return { err: true, msg: err }
    }
}

async function getOrganisationDetailsByOrgId(data){
    try {
        const { orgId } = data
        const orgData = []
        const organisation = await organisationCrm.fetchAllInfoByOrganisationId([orgId]);
        const providerDetails = await providerOrm.filterProviderByfields({ organization: orgId, makeAccountPrimary: true }, { name: 1, email: 1, contact: 1, userId: 1, appointments: 1, message: 1, hippa: 1})
        const providerDetailsForSubProvider = await providerOrm.filterProviderByfields(
                { organization: orgId, identity: "subUser_provider" },
                {
                name: 1,
                email: 1,
                contact: 1,
                userId: 1,
                appointments: 1,
                message: 1,
                hippa: 1,
                }
            );
        if(isEmpty(organisation)) return { err: true, msg: "organisation Id not Exist"};
        const orgSitesInformation = organisation[0].sitesInfo
        if(!isEmpty(organisation) && !isEmpty(orgSitesInformation)){
            const siteDetails = []
            for(let site of orgSitesInformation){
                const siteData = await getSiteServiceBySiteId(site)
                if(!isEmpty(siteData) && siteData.err) return siteData;
                const sites = siteData.msg
                siteDetails.push(pick(sites, ["_id","name","address","city", "state","zipcode", "claimStatus","virtual","homeVisit","location","website","description","siteTotalPoc","cat","siteSubCategoryInfo","additional"]))
            }
            if(!isEmpty(siteDetails)){
                const org = organisation[0]
                org.sitesInfo = siteDetails
                org.primaryAccountOwnerInfo = providerDetails
                org.subProvider = providerDetailsForSubProvider;
                orgData.push(pick(org, ["_id", "name", "hippa", "sitesInfo","totalAssigned","website","location","address","about","primaryAccountOwnerInfo","subProvider","altWebsite","poc", "claimStatus"]))
            }
        }else{
            orgData.push(pick(organisation[0], ["_id", "name", "sitesInfo","totalAssigned","website","location","address","about","altWebsite","poc", "claimStatus"]))
        }
        if(orgData[0].primaryAccountOwnerInfo.length ===0)
        {
            orgData[0].claimStatus = false;
        }
        return { err: false, msg: orgData[0] }
    } catch (err){
        return { err: true, msg: err }
    }
}

async function searchOrganisationBYAdmin(dataValue){
    try {
        const { keyword } = dataValue;
        //let data = await organisationCrm.filterOutOrganisationByRegex("name", keyword, { name : 1 })
        let data = await organisationCrm.filterOutOrganisationByRegexBYData({
            $or: [
                {name: { $regex: keyword, $options: 'i'}},
                {about: { $regex: keyword, $options: 'i'}},
                {website: { $regex: keyword, $options: 'i'} },
                {contact: { $regex: keyword, $options: 'i'} },
                {email: { $regex: keyword, $options: 'i'} },
            ]
        }, { name: 1})
        if(!isEmpty(data)){
            const ids = groupBy(data, "_id");
            data = await organisationCrm.getAllOrganisationByIds(Object.keys(ids))
        }
        return { err: false, msg: data }
    } catch (err) {
        return { err: true, msg: err }
    }
}

async function deleteOrganisation(id){
    try {
        const checkOrg= await organisationCrm.getOrganisationById(id)
        if(isEmpty(checkOrg)) return { err: true, msg: errorMessages.ID_NOT_FOUND }
        const sites = await siteOrm.findSites({organisationId: id })
        for(let site of sites){
            //Delete SubCategory
            await siteSubCategoryOrm.bulkDeleteBySiteId(site["_id"])
            //Delete SaveSite
            const deleteSave = await saveListingHelper.deleteBySiteId(site["_id"])
            if(!isEmpty(deleteSave) && deleteSave.err) return deleteSave
            //Delete Sites
            await siteOrm.deleteSite(site["_id"])
        }
        const providerDelete = await providerOrm.filterProviderByfields({organization: id})
        for(let provider of providerDelete){
            const userId = provider["userId"];
            await userOrm.deleteUserById(userId);
            await providerOrm.deleteProvider(provider["_id"])
        }
        await organisationCrm.deleteOrgById(id)
        return { err: false, msg: checkOrg }
    } catch (err) {
         return { err: true, msg: err }
    }
}

async function bulkOrganisationData(data, subCategoryData, userId){
    try {
        let items = {}
        items.publish = true
        const category = []
        for(let objKeys of Object.keys(data)){
            const trimData = objKeys.trim()
            if(trimData === "Hubspot (ID) (Syncs in other direction)") items.hubspotId= data[objKeys]
            if(trimData === "Main Website") items.website= data[objKeys]
            if(trimData === "Logo") items.logo= data[objKeys]
            if(trimData === "Name") items.name= data[objKeys]
            if(trimData === "Alternative URL") items.altWebsite= data[objKeys]
            if(trimData === "Org Type") items.orgType= data[objKeys].split(';')
            if(trimData === "HQ Phone") items.contact= data[objKeys]
            if(trimData === "HQ Email") items.email= data[objKeys]
            if(trimData === "Portal Name") items.publicName= data[objKeys]
            if(trimData === "Org Geospan") items.geospan= data[objKeys].split(';').map((val) => val.trim())
            if(trimData === "Record Status") items.leadStatus= leadSTatus(data[objKeys])
            if(trimData === "Available Service Categories") {
                const dataValue = []
                forEach(data[objKeys].split(';'), (cat) => {
                    const subcategoryTrim = find(subCategoryData, (subId) => subId.name.toLowerCase() === cat.trim().toLowerCase().toString())
                    if(!isEmpty(subcategoryTrim)){
                        if(!category.includes(subcategoryTrim.category_id._id)){
                            category.push(subcategoryTrim.category_id._id)
                        }
                        dataValue.push(subcategoryTrim._id)
                    }
                })
                items.subcategory= dataValue
            }
            if(trimData === "Org Description") items.about= data[objKeys]
            if(trimData === "HQ Address") items.address= data[objKeys]
            if(trimData === "HQ City") items.city= data[objKeys]
            if(trimData === "HQ State") items.state= data[objKeys]
            if(trimData === "HQ Zip") items.zipcode= data[objKeys]
            items.complianceComplete = true
            items.hippa = true
        }
        items.category = category
        items.providerId = userId
        if(isEmpty(items["name"])) return { err: true, msg: "Name not found"}
        const findOrg = await organisationCrm.getOrganisationByData({ name: items.name, email: items.email })
        if(!isEmpty(findOrg)) return { err: false, msg: "Already Save" }
        await organisationCrm.createNewOrganisation(items)
        return { err: false, msg: "Save Done" }
    } catch (err) {
        return { err: true, msg: "upload Err" }
    }
}


async function bulkSiteData(data, userId){
    try {
        let item = {}
        let hubspotId
        for(let siteKey of Object.keys(data)){
            const trimData = siteKey.trim()
            if(trimData === "Hubspot (ID) - Site Organization") hubspotId = data[siteKey].toString()
            if(trimData === "Site Identifier") item.siteIdentifier = data[siteKey]
            if(trimData === "Site Website (URL)") item.website = data[siteKey]
            if(trimData === "Site Name") item.name = data[siteKey]
            if(trimData === "Site Street") item.address = data[siteKey]
            if(trimData === "Site City") item.city = data[siteKey]
            if(trimData === "Site State") item.state = data[siteKey].split(';')
            if(trimData === 'Site Zip') item.zipcode = data[siteKey]
            if(trimData === "Home Visit") item.homeVisit = data[siteKey].toLowerCase() === 'yes'
            if(trimData === "Is Additional Resource") item.additional = data[siteKey].toLowerCase() === 'yes'
            if(trimData === "IS HQ (0/1)") item.HQ = data[siteKey].toLowerCase === 'yes'
            if(trimData === "Service Radius") item.radius = data[siteKey]
            if(trimData === "Is Virtual") item.virtual = data[siteKey].toLowerCase() === 'yes'
        }
        if(isEmpty(item.name)) return { err: true, msg: "Site Name not found"}
        const findOrganisation = await organisationCrm.getOrganisationByData({ hubspotId })
        if(isEmpty(findOrganisation)) return { err: true, msg: "No Organisation Data found"}
        item.userId = userId
        item.organisationId = findOrganisation["_id"]
        const findSite = await siteOrm.findSites({ organisationId: item.organisationId, name: item.name, siteIdentifier: item.siteIdentifier })
        if(!isEmpty(findSite)) return { err: false, msg: "Already Save" }
        await siteOrm.createSite(item)
        return { err: false, msg: "Save Done" }
    } catch (err) {
        return { err: true, msg: "upload Err" }
    }
}


async function bulkServiceData(data) {
    try {
        let item={}
        let poc = {}
        let hubspotId
        let siteIdentifier=''
        for(let serviceKey of Object.keys(data)){
            const trimData = serviceKey.trim()
            if(trimData === "Hubspot (ID)") hubspotId = data[serviceKey].toString()
            if(trimData === "Associated Site Identifier (Site Name ID)") siteIdentifier = data[serviceKey]
            if(trimData === "Site Sub Category"){
                const subCategoryName = data[serviceKey]
                const subcategoryTrim = await cureCategoryOrm.getAllSubCategory({
                    name: { $regex: subCategoryName.trim(), $options: 'i'}
                })
                item.subCategoryId = !isEmpty(subcategoryTrim) ? subcategoryTrim[0]._id : ''
            }
            if(trimData === "Site Sub Category webpage") item.serviceWebpage = data[serviceKey]
            if(trimData === "Price") item.price = data[serviceKey].split(";")
            if(trimData === "Site Sub Category Description") item.serviceDescription = data[serviceKey]
            if(trimData === "Service Vanity Name") item.serviceName = data[serviceKey]
            if(trimData === "Leaf") item.leaf = data[serviceKey].toLowerCase() === 'yes'
            if(trimData === "Name") poc.name = data[serviceKey]
            if (trimData === "Phone Number") item.contact = data[serviceKey]
            if(trimData === "Email") item.email = data[serviceKey]
            if (trimData === "Additional Requirements") item.specialQues = data[serviceKey]
            if(trimData === 'Special qualifications') {
                item.specialQualiFlag = true
                const specialQ = map(data[serviceKey].split(';'), (qualificationName)=> qualificationName.trim())
                const qualificationIds = await specialQualificationOrm.dynamicSpecialQualification({
                    name: { $in: specialQ }
                })
                item.specialQualif = isEmpty(qualificationIds) ? [] : map(qualificationIds, (id) => id._id)
            }
        }
        if(isEmpty(hubspotId)) return { err: true, msg: "Hubspot Id not found"}
        if(isEmpty(siteIdentifier)) return { err: true, msg: "siteIdentifier Id not found"}
        if(isEmpty(item.subCategoryId)) return { err: true, msg: "subCategory Id not found"}
        const findOrg = await organisationCrm.fetchAllInfoByOrganisationIdByData({ hubspotId })
        if(isEmpty(findOrg)) return { err: true, msg: "Org in service not found"}
        const siteData = await find(findOrg, (data) => data.sitesInfo.siteIdentifier === siteIdentifier )
        if(isEmpty(siteData)) return { err: true, msg: "Site service Data not found"}
        const site = siteData.sitesInfo
        poc.siteId = site._id
        poc.subCategoryId = item.subCategoryId
        poc.organisationId = findOrg[0]._id
        const service = await siteSubCategoryOrm.findSiteSubCategoryBySiteId({subCategoryId: item.subCategoryId, siteId: site._id })
        if(!isEmpty(service)){
            poc.serviceId = service[0]._id
            return { err: false, msg: "Already Save", poc }
        }
        const serviceId = await siteSubCategoryOrm.createSiteSubcategory({ ...item, siteId: site._id})
        poc.serviceId = serviceId._id
        return { err: false, msg: "Save Done", poc: poc }
    } catch (err) {
        return { err: true, msg: "upload Err" }
    }
}

async function geoCodingLocation(site){
    try {
        let locations = {}
        let errFound = false
        if(!isEmpty(site["address"])){
            const address = site["address"]
            const key = envConstants.GEOCODING_API;
            request.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address},${site["city"]}&key=${key}`,{}, async (err, data)=>{
                if(err) {
                    errFound = true
                    return;
                }
                const bodyParse = JSON.parse(data.body)
                console.log(`!!!----Locations----!!!`,bodyParse)
                const result = bodyParse["results"]
                if(!isEmpty(result) && !isEmpty(result[0])){
                    const getGeometryLocation = result[0].geometry.location
                    locations.lat = getGeometryLocation.lat;
                    locations.lang = getGeometryLocation.lng;
                    console.log(`!!!----Locations----!!!`,locations)
                    await siteOrm.updateSite({ location: locations }, site["_id"])
                }
            })
        }
        return { err: false, msg: []}
    } catch (err) {
        return { err: true, msg: err }
    }
}

async function siteCategoryAndSubCategory(poc = [], userId){
    try {
        const organisationDetails = {}
        const allSite = await siteOrm.findSites({})
        const siteSubCategory = await siteSubCategoryOrm.findSiteSubCategoryBySiteId({}, { subCategoryId: 1, siteId: 1 })
        const allSubCategory = await cureCategoryOrm.getAllSubCategory({})
        const groupBySiteId = await groupBy(siteSubCategory, 'siteId');
        for(let site of allSite){
            const cat = []
            const subCat=[]
            const allSiteSubCat = groupBySiteId[site["_id"]] || []
            for(let siteSubCat of allSiteSubCat){
                const findSubCategory = find(allSubCategory, { _id: siteSubCat.subCategoryId })
                if(isEmpty(findSubCategory)) continue;
                if(!subCat.includes(siteSubCat.subCategoryId)) subCat.push(siteSubCat.subCategoryId.toString())
                const catId =findSubCategory.category_id._id
                if(!cat.includes(catId)) cat.push(catId.toString())
            }
            if(!isEmpty(subCat)){
                await siteOrm.updateSite({ category: cat, subcategory: subCat }, site["_id"])
                if(!isEmpty(organisationDetails[site["organisationId"]])){
                    const orgKey = organisationDetails[site["organisationId"]]
                    orgKey.categoryId = [ ...orgKey.categoryId, ...cat]
                    orgKey.subCategoryId = [ ...orgKey.subCategoryId, ...subCat]
                }else{
                    organisationDetails[site["organisationId"]] = {
                        categoryId: cat,
                        subCategoryId: subCat
                    }
                }
            }
            await geoCodingLocation(site)
        }

        for(let org of Object.keys(organisationDetails)){
            const details = organisationDetails[org]
            await organisationCrm.findIdAndUpdate({ category: uniq(details.categoryId),  subcategory: uniq(details.subCategoryId) }, org)
        }
        for(let user of poc) {
            if (!isEmpty(user.name) && !isEmpty(user.email)) {
                const createUser = await dataApprovalHelper.createOrgAndProviderBySubUser({
                    ...user, userId, approvedStatus: status.APPROVED, organisationId: user.organisationId, sheet: true, acceptHippaDate: moment().utc(), hippa: true
                })
                const pocId = createUser.id
                const findSiteSubCategory = await siteSubCategoryOrm.findSiteSubcategory({_id: user.serviceId})
                if (!isEmpty(findSiteSubCategory)) {
                    await siteSubCategoryOrm.updateSiteCategory(user.serviceId, { $push: { poc: pocId }})
                }
            }
        }
        return { err: false, msg: []}
    } catch (err) {
        return { err: true, msg: err }
    }
}



async function uploadOrganisation(file, userId){
    console.log(file)
    const uploadXlsx = await imageUploadOrm.uploadExcelToParsingData(file[0].path)
    if(!isEmpty(uploadXlsx) && uploadXlsx.err) return uploadXlsx
    const fileDataInJson = uploadXlsx.msg;
    const organisationErr = []
    const siteErr = []
    const serviceErr = []
    const subCategoryData = await cureCategoryOrm.getAllSubCategory()
    const type = file[0].fieldname
    const poc = []
    if(!isEmpty(type)){
        for(let fileData of fileDataInJson){
            if(type === "organisation"){
                const organisationDetails = await bulkOrganisationData(fileData, subCategoryData, userId)
                if(!isEmpty(organisationDetails) && organisationDetails.err){
                    organisationErr.push(fileData)
                    continue;
                }
            }else if(type === "sites"){
                const siteDetails = await bulkSiteData(fileData, userId)
                if(!isEmpty(siteDetails) && siteDetails.err){
                    siteErr.push(fileData)
                    continue;
                }
            }else if(type === "service"){
                const serviceData = await bulkServiceData(fileData)
                if(!isEmpty(serviceData) && serviceData.err) {
                    serviceErr.push(fileData)
                    continue;
                }
                poc.push(serviceData.poc)
            }
        }
        if(type === "service"){
            await siteCategoryAndSubCategory(poc , userId)
        }
    }
    return  { err: false, msg : { organisationErr, siteErr, serviceErr }}
}


module.exports ={
    createOrganisation,
    createDynamicOrganisation,
    getAdminOrganisationById,
    updateOneExistingOrganisation,
    uploadOrganisation,
    deleteOrganisation,
    searchOrganisationBYAdmin,
    getOrganisationDetailsByOrgId,
    adminContactAllOrganisation,
    geoCodingLocation
}