const dataApproval = require("../../dbQuery/dataApproval")
const {status, errorMessages, successMessages, requestType, method} = require("../../helpers/messages");
const {isEmpty, pick, groupBy, map, find, omit} = require("lodash");
const providerOrm = require("../../dbQuery/provider")
const organisationHelper = require("../my_organisation/organisation.helper")
const organisationOrm = require("../../dbQuery/organisation")
const cureCategoryOrm = require("../../dbQuery/cureCategory")
const { getCategoryAndSubCategory, storeDataInSession } = require("../../helpers/helpers")

async function createOrganisation(data){
    try {
        const { providerId } = data
        if(isEmpty(providerId)) return {err: true, msg: errorMessages.ID_NOT_FOUND }
        const org = await providerOrm.getProviderByName({ userId: providerId })
        if(isEmpty(org)) return { err: true, msg: errorMessages.USER_NOT_EXIST}
        const getDataApprovalForOrg = await dataApproval.getOrganisationDataApproval({ organisationId: org["organization"]._id, status: status.PENDING });
        if(!isEmpty(getDataApprovalForOrg)){
            return { err: true, msg: "Already One Action Remaining By Admin on Same Organisation"}
        }
        await dataApproval.createOrgData({ ...data, status: status.PENDING, organisationId: org["organization"]._id})
        return { err: false, msg: [], val: successMessages.APPROVAL_CREATED }
    } catch (err){
        return { err: true, msg: err }
    }
}

async function updateOrganisation(data){
    try {
        const { id } = data
        const findDataApprovalOrg = await dataApproval.getOrgDataApproval({ _id: id })
        const user = findDataApprovalOrg[0]
        if(isEmpty(user)) return { err: true, msg: errorMessages.ID_NOT_FOUND}
        if(data.status === status.APPROVED){
            const orgId = user.organisationId
            const userPick = omit(user, ["__v", "updatedAt", "createdAt", "organisationId", "status","requestBy","_id"])
            const updatedOrg = await organisationHelper.updateOneExistingOrganisation(orgId["_id"],{ ...userPick })
            if(!isEmpty(updatedOrg) && updatedOrg.err && updatedOrg.msg !== errorMessages.HUBSPOT) return updatedOrg
        }
        await dataApproval.updatedOrgDataApproval(user["_id"], {
            status: data.status, approvedBy: data.approvedBy
        })
        return { err: false, msg: [], val: successMessages.ORGANISATION_UPDATED}
    } catch (err){
        return { err: true, msg: err }
    }
}

async function getAllDataApproval(){
    try {
        const getAll = await dataApproval.getOrganisationDataApproval({ status: status.PENDING }, { __v: 0, updatedAt: 0, createdAt: 0 })
        const organisation = []
        const findAllSubCategory = await cureCategoryOrm.getAllSubCategory({})
        for(let org of getAll){
            const orgData = await organisationOrm.getOrganisationById(org["organisationId"]._id)
            if(isEmpty(orgData)) continue
            const orgSubCat = orgData["subcategory"]
            organisation.push({
                old: { ...orgData["_doc"], cat: !isEmpty(orgSubCat) ? getCategoryAndSubCategory(findAllSubCategory, orgSubCat): [] },
                new: org
            })
        }
        return  { err: false, msg: organisation }
    } catch (err) {
        return{ err: true, msg: err }
    }
}

module.exports = {
    createOrganisation,
    updateOrganisation,
    getAllDataApproval
}