const searchLinkOrm = require("../../dbQuery/searchLink")
const {isEmpty, filter, size, groupBy, map} = require("lodash");
const {successMessages, status, identity,usStates,} = require("../../../helpers/messages");
const organisationOrm = require("../../../dbQuery/organisation")
const siteClaimOrm = require("../../../dbQuery/siteClaim");
const providerOrm = require("../../../dbQuery/provider")
const dataApprovalOrm = require("../../../dbQuery/dataApproval")
const siteSubcategoryOrm = require("../../../dbQuery/sitesSubcategory")
const appointmentOrm = require("../../../dbQuery/appointmentQuery")
const userOrm = require("../../../dbQuery/users")
const userProfileOrm = require("../../../dbQuery/userProfile")
const messageOrm = require("../../../dbQuery/message")
const moment = require("moment");
const siteOrm = require("../../dbQuery/site")
const savedListingOrm = require("../../../dbQuery/savedListing")

async function createOrUpdatedSL(data){
    try {
        const { searchName, states } = data;
        const findCreatedSearchLink = await searchLinkOrm.getSearchLinkByData({
            searchName, states
        })
        if(!isEmpty(findCreatedSearchLink)){
            return { err: true, msg: "Search link Already Created" }
        }
        const newSearchLink = await searchLinkOrm.createLink(data);
        return { err: false, msg: newSearchLink, val: successMessages.SEARCHLINK_CREATED }
    } catch (err) {
        return { err: true, msg: err }
    }
}

async function getAllSearchLink(currUser){
    try {
        let data = []
        if(currUser["subRole"] === "master" || currUser["subRole"] === "manager"){
            data = await searchLinkOrm.getAllLink();
        }else{
            data = await searchLinkOrm.getSearchLinkByData({ $or: [ { assignedTo: currUser }, { assignedTo: null } ]})
        }
        const total = []
        for(let sLink of data){
            const findTotalOrg= await organisationOrm.getOrganisations({ sourceOfFinding: sLink["_id"]})
            total.push({ ...sLink, orgCount: findTotalOrg.length })
        }
       return { err: false, msg: total }
    } catch (err) {
        return { err: true, msg: err }
    }
}

async function getOneLink(id){
    try {
        const getOneLink = await searchLinkOrm.getOneLink(id);
        return { err: false, msg: getOneLink }
    } catch (err){
        return { err: true, msg: err }
    }
}


async function getALlStatisticsDetails(){
    try {
        //ORGANISATION
        const getAllOrganisation = await organisationOrm.getAllOrganisation();
        const getAllOrganisationByPublish = await organisationOrm.getOrganisations({ publish: true });
        const data = {}
        data.organisation = {
            total: size(getAllOrganisation),
            publish: size(getAllOrganisationByPublish)
        }
        const getALlSearchLink = await searchLinkOrm.getAllLink();
        const getALlSearchLinkByStatus = await searchLinkOrm.getSearchLinkByData({ claimStatus: true });
        data.searchLink = {
            total: size(getALlSearchLink),
            claim: size(getALlSearchLinkByStatus),
            pending: size(getALlSearchLink) - size(getALlSearchLinkByStatus)
        }
        const getAllProvider = await providerOrm.getAllProvider();
        const getAllProviderByStatus = await providerOrm.getDynamicProvider("approvedStatus", status.APPROVED, {});
        const getAllProviderByStatusPending = await providerOrm.getDynamicProvider("approvedStatus", status.PENDING, {});
        data.accountApproval = {
            total: size(getAllProvider),
            approved: size(getAllProviderByStatus),
            pending: size(getAllProviderByStatusPending)
        }
        const getAllSiteClaim = await siteClaimOrm.getAllClaimSite();
        const getAllSiteClaimApproved = await siteClaimOrm.getClaimByEmail({ status: status.APPROVED })
        const getAllSiteClaimPending = await siteClaimOrm.getClaimByEmail({ status: status.PENDING })
        data.siteClaim = {
            total: size(getAllSiteClaim),
            approved: size(getAllSiteClaimApproved),
            pending: size(getAllSiteClaimPending)
        }
        const getAllDataApproval = await Promise.all([
            ...await dataApprovalOrm.getOrganisationDataApproval({},{status: 1}),
            ...await dataApprovalOrm.getSiteDataApproval({},{status: 1}),
        ])
        data.dataApproval = {
            total: size(getAllDataApproval),
            pending: size(filter(getAllDataApproval, { status: status.PENDING})),
            approved: size(filter(getAllDataApproval, { status: status.APPROVED}))
        }
        return { err: false, msg: data }
    } catch (err){
        return { err: true, msg: err }
    }
}

async function appointmentStatistics(){
    try {
        const appointmentByState = await appointmentOrm.getAppointmentByPopulate({})
        let noStateFound = 0;
        let stateObj = { virtual : { pending: 0,  approved: 0, cancelled: 0}}
        for(let appointment of appointmentByState){
            if(!isEmpty(appointment["siteId"])){
                const site = appointment["siteId"]
                if(!isEmpty(site.state) && !isEmpty(site.state[0])){
                    const states = site.state
                    if(site["virtual"]) stateObj["virtual"][`${appointment["status"]}`]++;
                    else{
                        map(states, (s) => {
                            if(!isEmpty(stateObj[s])){
                                stateObj[s][`${appointment["status"]}`]++;
                            }
                            else stateObj[s] = { pending: appointment["status"] === status.PENDING ? 1 : 0, approved: appointment["status"] === status.APPROVED ? 1 : 0, cancelled: appointment["status"] === status.CANCELLED ? 1 : 0}
                        })
                    }
                }else{
                    noStateFound++;
                }
            }
        }
        stateObj = Object.keys(stateObj).filter(key=> usStates.includes(key)).reduce((obj, key) => {
            obj[key] = stateObj[key];
            return obj;
        }, {});
        return { err: false, msg: { appointment: { stateObj, noStateFound}}}
    } catch (err) {
        return { err: true, msg: err }
    }
}

async function publishAndUnPublish(){
    try {
        const org = await organisationOrm.filterOutOrganisationByRegex({ state : { $ne: null }})
        const groupByPublish = groupBy(org, "publish")
        const publish = groupByPublish[true]
        let unPublished = groupByPublish[false];
        const groupByPublishState = groupBy(publish, 'state')
        const groupByUnPublishState = groupBy(unPublished, 'state')
        let totalPublishOrgByState = {}
        let totalUnPublishOrgByState = {}
        for(let st of Object.keys(groupByPublishState)){
            totalPublishOrgByState[st] = 0
            totalPublishOrgByState[st] += groupByPublishState[st].length
        }
        for(let st of Object.keys(groupByUnPublishState)){
            totalUnPublishOrgByState[st] = 0
            totalUnPublishOrgByState[st] += groupByUnPublishState[st].length
        }
        // STATE WISE RESULTS
        let totalPublishSiteByState = {}
        let totalUnPublishSiteByState = {}
        const orgPublishIds = Object.keys(groupBy(publish, "_id"))
        const orgUnPublishIds =Object.keys(groupBy(unPublished, "_id"))
        const publishSite = await siteOrm.findSites({ organisationId: { $in: orgPublishIds}, state: {$elemMatch: { $exists: true }} })
        const UnPublishSite = await siteOrm.findSites({ organisationId: { $in: orgUnPublishIds}, state: {$elemMatch: { $exists: true }} })

        const groupByPublishSiteState = groupBy(publishSite, "state")
        const groupByUnPublishSiteState = groupBy(UnPublishSite, "state")
        for(let st of Object.keys(groupByPublishSiteState)){
            totalPublishSiteByState[st] = 0
            totalPublishSiteByState[st] += groupByPublishSiteState[st].length
        }
        for(let st of Object.keys(groupByUnPublishSiteState)){
            totalUnPublishSiteByState[st] = 0
            totalUnPublishSiteByState[st] += groupByUnPublishSiteState[st].length
        }
        //Site Claim
        const getAllSiteClaim = await siteClaimOrm.getAllClaimSite({});
        let totalSiteClaim = {}
        for(let claim of getAllSiteClaim){
            if (claim["siteId"] !== null) {
            const states = claim["siteId"]["state"]
            const claimStatus = claim["status"]
            if(!isEmpty(states)){
                map(states, (state)=> {
                    if(!isEmpty(totalSiteClaim[state])){
                        totalSiteClaim[state][claimStatus]++;
                    }else{
                        totalSiteClaim[state] = { pending: claimStatus === status.PENDING ? 1 : 0, approved: claimStatus === status.APPROVED ? 1 : 0, cancelled: claimStatus === status.CANCELLED ? 1 : 0}
                    }
                })
            }
        }
        }
        //Total Subcategory
        //Service Wise Result of Published and UnPublished
        const publishSiteIds = Object.keys(groupBy(publishSite, "_id"))
        const unPublishSiteIds = Object.keys(groupBy(UnPublishSite, "_id"))
        const publishService = await siteSubcategoryOrm.findDynamicSubcategory("siteId",{ $in: publishSiteIds })
        const unPublishService = await siteSubcategoryOrm.findDynamicSubcategory("siteId",{ $in: unPublishSiteIds })
        const groupBySubCategory = groupBy(unPublishService, "subCategoryId.name")
        let totalUnPublishServiceByState = []
        for(let service of Object.keys(groupBySubCategory)){
            const subCatData = groupBySubCategory[service];
            const groupByStateOrg = groupBy(subCatData, "siteId.organisationId.state")
            let stateCount = { }
            for(let state of Object.keys(groupByStateOrg)){
                if(state){
                    stateCount[state] = groupByStateOrg[state].length
                }
            }
            totalUnPublishServiceByState.push({
                name: service,
                state: stateCount
            })
        }


        const groupBySubCategoryPublished = groupBy(publishService, "subCategoryId.name")
        let totalPublishServiceByState = []
        for(let service of Object.keys(groupBySubCategoryPublished)){
            const subCatData = groupBySubCategoryPublished[service];
            const groupByStateOrg = groupBy(subCatData, "siteId.organisationId.state")
            let stateCount = { }
            for(let state of Object.keys(groupByStateOrg)){
                if (usStates.includes(state) && state) {
                    stateCount[state] = groupByStateOrg[state].length;
                }
            }
            totalPublishServiceByState.push({
                name: service,
                state: stateCount
            })
        }
        totalPublishOrgByState = Object.keys(totalPublishOrgByState).filter(key=> usStates.includes(key)).reduce((obj, key) => {
            obj[key] = totalPublishOrgByState[key];
            return obj;
          }, {});
          totalUnPublishOrgByState = Object.keys(totalUnPublishOrgByState).filter(key=> usStates.includes(key)).reduce((obj, key) => {
            obj[key] = totalUnPublishOrgByState[key];
            return obj;
          }, {});
          totalPublishSiteByState = Object.keys(totalPublishSiteByState).filter(key=> usStates.includes(key)).reduce((obj, key) => {
            obj[key] = totalPublishSiteByState[key];
            return obj;
          }, {});
          totalUnPublishSiteByState =Object.keys(totalUnPublishSiteByState).filter(key=> usStates.includes(key)).reduce((obj, key) => {
            obj[key] = totalUnPublishSiteByState[key];
            return obj;
        }, {});
        return {
            organisationAndSite : { totalPublishOrgByState, totalUnPublishOrgByState, totalPublishSiteByState, totalUnPublishSiteByState,totalUnPublishServiceByState, totalPublishServiceByState, totalSiteClaim }
        }
    } catch (err) {
        return { err: true, msg: err }
    }
}

async function providerDataStatistics(){
    try {
        const org = await organisationOrm.linkProvider({ state : { $ne: null }})
        const userProfile = await userProfileOrm.findAllProfile()
        const groupByState = groupBy(org, "state")
        let totalProviderByState = {}
        for(let state of Object.keys(groupByState)){
            if(isEmpty(state)) continue
            let total = 0;
            for(let orgByState of groupByState[state]){
                total += orgByState["providerInfo"].length
            }
            totalProviderByState[state] = total
        }
        let totalGenUserByState = {}
        const groupByGenUserByState = groupBy(userProfile, "userState")
        for(let state of Object.keys(groupByGenUserByState)){
            if(state === "undefined") continue
            totalGenUserByState[state] = groupByGenUserByState[state].length
        }
        const getAllSubCategory = await siteSubcategoryOrm.filterDataOfSiteSubCategory({})
        const groupBySubCat = groupBy(getAllSubCategory, "subCategoryId.name")
        let totalBySubCats = {}
        for(let subCat of Object.keys(groupBySubCat)){
            let count = 0;
            for(let provider of groupBySubCat[subCat]){
                if(!isEmpty(provider.poc)){
                    count += provider.poc.length
                }
            }
            totalBySubCats[subCat] = count
        }
        const users = await userOrm.searchesClientByIds({})
        let generalUser = 0
        let providerUser = 0
        let analyst = 0
        let manager = 0
        for(let user of users){
            if(user["role"] === identity.GENERAL_USER) generalUser++;
            if(user["role"] === identity.PROVIDER) providerUser++;
            if(user["role"] === identity.ADMIN && user["subRole"] === "analyst") analyst++;
            if(user["role"] === identity.ADMIN && user["subRole"] === "manager") manager++;
        }
        let userData = { generalUser, providerUser, analyst, manager }
        const orgData = await publishAndUnPublish()
        totalProviderByState = Object.keys(totalProviderByState).filter(key=> usStates.includes(key)).reduce((obj, key) => {
            obj[key] = totalProviderByState[key];
            return obj;
          }, {});
          totalGenUserByState = Object.keys(totalGenUserByState).filter(key=> usStates.includes(key)).reduce((obj, key) => {
            obj[key] = totalGenUserByState[key];
            return obj;
        }, {});
        return { err: false, msg: {totalProviderByState, totalGenUserByState, totalBySubCats, userData, ...orgData }}
    } catch (err) {
        return { err: true, msg: err }
    }
}

async function overAllStatisticsSearchLink(){
    try {
        const data = []
        const allSearchLink = await searchLinkOrm.getSearchLinkByData({ })
        const groupByState = groupBy(allSearchLink, "states")
        let totalByState = {}
        for(let state of Object.keys(groupByState)){ totalByState[state] = groupByState[state].length }
        let unclaimedByState = filter(allSearchLink, { claimStatus: false })
        const unClaimed = groupBy(unclaimedByState, "states")
        let unClaimByState = {}
        for(let claim of Object.keys(unClaimed)) { unClaimByState[claim] = unClaimed[claim].length }
        const todayC = await searchLinkOrm.getSearchLinkByData({
            claimDate: {
                $gte: moment().format('YYYY-MM-DD 00:00:00'),
                $lte: moment()
            }
        })
        const inProgress = await searchLinkOrm.getSearchLinkByData({ close: false })
        totalByState = Object.keys(totalByState).filter(key=> usStates.includes(key)).reduce((obj, key) => {
            obj[key] = totalByState[key];
            return obj;
        }, {});
        let searchLink = {
            totalByState, unClaimByState,
            todayClaim: todayC.length,
            total: allSearchLink.length,
            inProgress: inProgress.length
        }
        const otherData = await providerDataStatistics()
        const user = otherData.msg
        const appointment = await appointmentStatistics()
        const totalChatRoom = await messageOrm.getDistinctChatRoom()
        const totalMessage = await messageOrm.getAllOlderMessageList({})
        const savedListProvider = await savedListingOrm.getDynamicSavedListing({})
        const groupByStateListProvider = groupBy(savedListProvider, "stateLoc")
        let providerList = {}
        for(let listingCount of Object.keys(groupByStateListProvider)){ providerList[listingCount] = groupByStateListProvider[listingCount].length }
        if(!isEmpty(appointment) && appointment.err) return appointment
        providerList = Object.keys(providerList).filter(key=> usStates.includes(key)).reduce((obj, key) => {
            obj[key] = providerList[key];
            return obj;
        }, {});
        return { err: false, msg: {searchLink, ...user, ...appointment.msg, message: { room: totalChatRoom["length"], totalMsg: totalMessage["length"]}, providerList } }
    } catch (err) {
        return { err: true, msg: err }
    }
}

module.exports = {
    createOrUpdatedSL,
    getAllSearchLink,
    getOneLink,
    getALlStatisticsDetails,
    overAllStatisticsSearchLink
}
