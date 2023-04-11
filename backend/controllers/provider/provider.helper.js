const providerOrm = require("../../dbQuery/provider");
const organisationOrm = require("../../dbQuery/organisation")
const siteSubcategoryOrm = require("../../dbQuery/sitesSubcategory")
const organisationHelper = require("../../controllers/my_organisation/organisation.helper")
const userOrm = require("../../dbQuery/users")
const { isEmpty, groupBy, filter, pick, map, find} = require("lodash");
const userProfileOrm = require("../../dbQuery/userProfile")
const mongoose = require("mongoose");
const { errorMessages, status, successMessages} = require("../../helpers/messages");
const { approvedProviderUser } = require("../../helpers/template")
const {sendMail} = require("../../connection/smtp.connect");
const { content } = require("../../helpers/template");

async function deleteProviderProfile(userId){
    try {
        const getProvider = await providerOrm.filterProvider({userId});
        for(let provider of getProvider){
            await providerOrm.deleteProvider(provider["_id"]);
        }
        return {err: false, msg: [], val: successMessages.DATA_DELETED }
    } catch (err){
        return {err: true, msg: err}
    }
}

async function searchesSavedClient(dataValues){
    try {
        const { keyword, userId } = dataValues;
        console.log(dataValues)

        const getProvider =await providerOrm.getDynamicProvider("userId", [userId], { saveClientUserId: 1 });
        if(isEmpty(getProvider)) return { err: true, msg: "Provider Details not found"};
        const providerClientIds = getProvider[0].saveClientUserId;
        if(isEmpty(providerClientIds)) return { err: false, msg: [] };
        const fields = { createdAt: 0, updatedAt: 0, __v: 0, fcm_token: 0, jwt_token_expired: 0, jwt_auth_token: 0, social_token: 0, password:0 }
        let data = await userOrm.searchesClientByIds({
            _id: { $in: providerClientIds },
            name: { $regex: keyword, $options: 'i' }
        }, fields)
        if(!isEmpty(data)){
            const groupByIds =await groupBy(data, 'profileId._id');
            let val = Object.keys(groupByIds).map(s => mongoose.Types.ObjectId(s))
            const searchDataByEmail = await userOrm.searchesClientByIds({
                _id: { $in: providerClientIds },
                profileId: { $nin: val },
                email: { $regex: keyword, $options: 'i' }
            }, fields)
            data = [...data, ...searchDataByEmail ]
        } else {
            data = await userOrm.searchesClientByIds({
                _id: { $in: providerClientIds },
                email: { $regex: keyword, $options: 'i' }
            }, fields)
        }
        if(!isEmpty(data)){
            const groupByUserId = groupBy(data, "_id");
            data = await userProfileOrm.getUserProfileOfArray(Object.keys(groupByUserId))
        }
        return { err: false, msg: data }
    } catch (err){
        return { err: true, msg: err }
    }
}



async function updateAccountApproval(data, currUserId){
    try {
        const checkId = await providerOrm.getOneProvider(data["id"]);
        if(isEmpty(checkId)){
            return { err: true, msg: errorMessages.ID_NOT_FOUND }
        }
        if(data.approvedStatus === status.APPROVED || data.approvedStatus === status.CANCELLED){
            if(!isEmpty(data["newOrgId"])){
                const orgId = data["newOrgId"]
                const findOrg = await organisationOrm.getOrganisationById(orgId)
                if(isEmpty(findOrg)) return { err: true, msg: "Selected organisation not found" }
                const oldOrgProvider = await providerOrm.filterProvider({ organization: checkId["organization"] })
                for(let provider of oldOrgProvider){
                    const updatedData = {}
                    if(provider["_id"].toString() === checkId["_id"].toString() ){
                        updatedData.approvedStatus = data.approvedStatus
                        updatedData.approvedBy = currUserId
                    }
                    updatedData.organization = orgId
                    await providerOrm.dynamicUpdateProvider("_id", provider["_id"], updatedData)
                }
                await organisationHelper.deleteOrganisation(checkId["organization"])
            }else{
                await providerOrm.dynamicUpdateProvider("_id", checkId._id, {
                    approvedStatus: data.approvedStatus,
                    approvedBy: currUserId
                })
            }
            if(data.approvedStatus === status.APPROVED){
                const approvedProvider = approvedProviderUser();
                sendMail(checkId["email"], "Account Approved", approvedProvider)
            }
            if (data.approvedStatus === status.CANCELLED) {
                const template = content([
                  "We have received and reviewed a request to add you as a provider user in the Her PLAN directory. We cannot approve this request at this time. Please feel free to contact us at " +
                    `<a href="mailto:info@herplan.org" target="_blank">info@herplan.org</a>` +
                    " for information." +
                    `<br/>` +
                    " Thank you for all you do for women and families.",
                ]);
                sendMail(checkId["email"], "Account Rejected", template);
            }
        }else{
            return { err: true, msg: `Typo is there in ${data.approvedStatus}`}
        }

        return { err: false, msg: []}
    } catch (err) {
        return { err: true, msg: err }
    }
}

async function shiftProviderOrganisation(data){
    try {
        const { email, currOrgId } = data;
        const provider = await providerOrm.filterProvider({ email })
        const user = provider[0]
        if(isEmpty(provider)) return { err: true, msg: "Email not Found! Please Register"}
        const org = await organisationOrm.getOrganisationById(currOrgId)
        if(isEmpty(org)) return { err: true, msg: "Organisation is not Valid"}
        let findPoc = await siteSubcategoryOrm.findPoc([user.userId._id])
        for(let poc of findPoc){
            await siteSubcategoryOrm.updateSiteCategory(poc["_id"], { $pull: { poc: user.userId._id} })
        }
        await providerOrm.updateProviderInfo({ organization: currOrgId },  user.userId._id)
        return { err: false, msg: []}
    } catch (err) {
        return { err: true, msg: err }
    }
}

async function getAllHippaStatus(){
    try {
        const getProvider = await providerOrm.filterProvider({})
        const getAllOrganisation = await organisationOrm.getAllOrganisation()
        const hippaData = {
            hippa: map(filter(getProvider, { hippa : true }), (provider)=> {
                let findOrg = find(getAllOrganisation, (org) => org._id.toString() === provider.organization.toString()) || {}
                findOrg.orgName= isEmpty(findOrg) ? '' : findOrg.name
                return { ...pick(provider, ['name', 'firstName', 'lastName', 'email', 'hippa', 'acceptHippaDate']), ...pick(findOrg, ['orgName', 'address', 'city', 'state'])}
            }),
            nonHippa: map(filter(getProvider, { hippa : false }), (provider)=> {
                let findOrg = find(getAllOrganisation, (org) => org._id.toString() === provider.organization.toString()) || {}
                findOrg.orgName= isEmpty(findOrg) ? '' : findOrg.name
                return { ...pick(provider, ['name', 'firstName', 'lastName', 'email', 'hippa', 'acceptNonHippaDate']), ...pick(findOrg, ['orgName', 'address', 'city', 'state'])}
            })
        }
        return { err: false, msg: hippaData }
    }catch (err) {
        return { err: true, msg: err }
    }
}

module.exports = {
    searchesSavedClient,
    updateAccountApproval,
    deleteProviderProfile,
    getAllHippaStatus,
    shiftProviderOrganisation
}