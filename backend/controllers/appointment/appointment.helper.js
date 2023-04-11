const { isEmpty, groupBy, pick} = require("lodash");
const appointmentOrm = require("../../dbQuery/appointmentQuery");
const userProfileOrm = require("../../dbQuery/userProfile")
const providerOrm = require("../../dbQuery/provider")
const moment = require("moment");
const { status, successMessages, errorMessages, messageLink} = require("../../helpers/messages")
const siteSubcategoryOrm = require("../../dbQuery/sitesSubcategory")
const siteOrm = require("../../admin/dbQuery/site")
const { generateVerifyCode } = require("../../helpers/helpers")
const messageHelper = require("../messages/message.helper")
const {sendMail} = require("../../connection/smtp.connect");
const emailTemplate = require("../../helpers/template")
const userOrm = require("../../dbQuery/users")
const { sendSmsFunction } = require("../../connection/voyage.connect")

async function deleteAppointment(userId, deletedBy){
    try {
        const findALlAppointment = await appointmentOrm.getAppointmentByPopulate({
            [`${deletedBy}`]: userId
        })
        for(let appointment of findALlAppointment){
            await appointmentOrm.deleteAppointment(appointment["_id"])
        }
        return { err: false, msg: [], val: successMessages.APPOINTMENT_DELETED}
    } catch (err){
        return { err: true, msg: err}
    }
}

async function providerTakenBehalfAppointment(currUserId, siteId, subCategoryId, providerId,sendEmail,sendContact){
    try {
        const subCategory = await siteSubcategoryOrm.filterDataOfSiteSubCategory({ siteId, subCategoryId })
        const findSubCategory = subCategory[0]
        let email = [], contact = []
        if(isEmpty(findSubCategory["poc"])){
            const orgId = findSubCategory.siteId["organisationId"]
            const providers = await providerOrm.filterProviderByfields({ organization: orgId, makeAccountPrimary: true }, { createdAt:0, updatedAt: 0, __v: 0})
            for(let provider of providers){
                if(!isEmpty(provider["email"]) && provider["EmailMessage"]){ email.push(provider["email"])}
                if(!isEmpty(provider["contact"]) && provider["textMessage"]){ contact.push(provider["contact"])}
            }
        }else{
            // const poc = findSubCategory["poc"]
            // //const providers = await providerOrm.filterProviderByfields({ userId: Object.keys(groupBy(poc, "_id")) }, { createdAt:0, updatedAt: 0, __v: 0 })
            // const providers = await providerOrm.filterProviderByfields({ userId: providerId }, { createdAt:0, updatedAt: 0, __v: 0 })
            // for(let provider of providers){
            //     if(!isEmpty(provider["email"]) && provider["EmailMessage"]){ email.push(provider["email"])}
            //     if(!isEmpty(provider["contact"]) && provider["textMessage"]){ contact.push(provider["contact"])}
            // }
            console.log("sendEmail", sendEmail, sendContact);
            if (!isEmpty(sendEmail)) {
                email.push(sendEmail);
            }
            if (!isEmpty(sendContact)) {
                contact.push(sendContact);
            }
        }
        if(!isEmpty(email)){
            const template = await emailTemplate.appointmentStatus()
            sendMail(email, "Appointment Request", template)
        }
        if(!isEmpty(contact)){
            for(let number of contact){
                if(number === 'undefined' || isEmpty(number)) continue;
                sendSmsFunction(number, `You have an appointment request waiting for you in your Her PLAN appointment portal. Please click here ${messageLink.APPOINTMENTS} to go to your messages to view and respond.`)
            }
        }
        return { err: false, msg: "Mail Send Successfully"}
    }catch (err) {
        return { err: true, msg: err }
    }
}

async function createAppointment(data){
    try {
        const { clientId, providerId, siteId, subCategoryId, date, role } = data;
        const findAlreadyBookedAppointment = await appointmentOrm.getAppointment({
            date: moment(date).add(1, "days").format('YYYY-MM-DD'), clientId, siteId: data.siteId
        })
        if(!isEmpty(findAlreadyBookedAppointment) && findAlreadyBookedAppointment[0].status !== status.CANCELLED) return { err: true, msg: "You have already requested an appointment for that date."}
        const format = { clientId, providerId, siteId, subCategoryId,
            date: moment(date).add(1, "days").format('YYYY-MM-DD'), status: status.PENDING}
        if(role === "provider"){
            const clientUser = await userProfileOrm.getUserProfileById(clientId)
            if(isEmpty(clientUser)) return { err: true, msg: "Client Id not found"};
            if(!isEmpty(clientUser) && !clientUser["optShareData"]) return { err: true, msg: "Client are not allowed to Share his Data" };
            format.referredBy = data.userId
            const createUniqueRoom = generateVerifyCode('Aa0');
            const roomName= createUniqueRoom.code;
            const getOrCreateRoom = await messageHelper.createOrGetRoomByRoomId(roomName, [clientId, providerId], {
                group: true,
                localUserId: data.userId
            })
            if(!isEmpty(getOrCreateRoom) && getOrCreateRoom.err) return getOrCreateRoom;
            const roomDetails = getOrCreateRoom.msg;
            format.room = roomDetails.room
        }
        const createNewAppointment = await appointmentOrm.bookAppointment(format)
        await providerTakenBehalfAppointment(data.userId, siteId, subCategoryId, providerId, data.email,data.contact)
        return { err: false, msg: createNewAppointment, val: "Appointment Request has been sent successfully" }
    } catch (err){
        return { err: true, msg: err}
    }
}

async function getAllAppointment(data){
    try {
        let dataValue = []
        const { userId, role } = data;
        if(role === "user"){
            const findGeneralUser = await userProfileOrm.getUserProfileById(userId);
            if(isEmpty(findGeneralUser)) return { err: true, msg: errorMessages.USER_NOT_EXIST }
            dataValue = await appointmentOrm.getAppointmentByPopulate({ clientId: userId });
        }else if( role === "provider"){
            const getProviderDetails = await providerOrm.filterProvider({ userId })
            if(isEmpty(getProviderDetails)) return { err: true, msg: errorMessages.USER_NOT_EXIST }
            const provider = getProviderDetails[0]
            /**
             * This Appointment are fetched when Provider User done some action on it like Pending , approved, cancelled
             * This information are always old and fetch because provider has done some action
             * Fetch all this appointment where account owner is worked as a POC
             * @type {Query<Array<EnforceDocument<unknown, {}>>, Document<any, any, unknown>, {}, unknown>}
             */
            const getAllActionAppointment = await appointmentOrm.getAppointmentByPopulate({providerId: userId})
            dataValue = [ ...getAllActionAppointment]
            // const organisationId = provider.organization
            // const primaryAccount = provider.makeAccountPrimary
            // let findSiteWithNoPoc = []
            // if(primaryAccount){
            //     const siteIds = await siteOrm.findSites({ organisationId: organisationId });
            //     const groupBySiteIds = groupBy(siteIds, "_id")
            //     findSiteWithNoPoc = await siteSubcategoryOrm.findSiteSubCategoryBySiteId({
            //         $or: [
            //             {siteId: Object.keys(groupBySiteIds), poc:  []},
            //             {poc: { $in: userId }}
            //         ]
            //     }, { siteId: 1, subCategoryId: 1, serviceName: 1 })
            // }else{
            //     findSiteWithNoPoc = await siteSubcategoryOrm.findSiteSubCategoryBySiteId({poc: { $in: userId }}, { siteId: 1, subCategoryId: 1, serviceName: 1 })
            // }
            // for(let site of findSiteWithNoPoc){
            //     const findPendingAppointment= await appointmentOrm.getAppointmentByPopulate({ _id: { $nin: Object.keys(groupBy(getAllActionAppointment, "_id")) },siteId: site["siteId"] ,
            //         subCategoryId: site["subCategoryId"] , status: status.PENDING, providerId: { $exists: false } })
            //     if(isEmpty(findPendingAppointment)) continue;
            //     dataValue = [ ...dataValue, ...findPendingAppointment]
            // }
        }
        const newData = []
        for(let appoint of dataValue){
            appoint.clientId.profileId = {}
            const clientData = pick(appoint.clientId, ["role", "name", "email","_id"])
            const profileData = appoint.clientId.profileId
            const siteData = appoint.siteId
            const subCategoryData = appoint.subCategoryId
            const canceledByData = !isEmpty(appoint.canceledBy) ? [appoint.canceledBy] : []
            const service = await siteSubcategoryOrm.findSiteSubCategoryBySiteId({
                siteId: appoint["siteId"], subCategoryId: appoint["subCategoryId"]
            }, { serviceName: 1, serviceWebpage: 1, serviceDescription: 1 })
            newData.push({ ...pick(appoint, ["room", "status", "date", "_id","clientId","providerId"]),
                clientData, profileData, siteData, subCategoryData, canceledByData, service: service[0]
            })
        }
        return { err: false, msg: newData}
    } catch ( err ){
        console.log(`###########`,err)
        return { err: true, msg: err }
    }
}

async function updateAppointment(data, appointmentId){
    try {
        let email = ''
        let contact = ''
        const findAppointment = await appointmentOrm.getAppointment({ _id: appointmentId });
        if(isEmpty(findAppointment)) return { err: true, msg: "Appointment is not valid"};
        if(isEmpty(data.status)) return { err: true, msg: "status Parameter is mandatory"};
        if(data.status === status.APPROVED || data.status === status.CANCELLED){
            const appointment = findAppointment[0]
            const date = moment(appointment.date).utc();
            const currDate = moment().subtract(1, 'days').utc()
            if(currDate > date) return { err: true, msg: `${data.status} action can't be performed to previous date`}
            if(data.status === status.CANCELLED){
                data.canceledBy = data.providerId
            }
            await appointmentOrm.updateAppointment(data, appointmentId)
            const client = appointment["clientId"]
            if(!isEmpty(client)){
                email = client["profileId"].EmailMessage ? client.email : ''
                contact = (client["profileId"].textMessage && !isEmpty(client["profileId"].contact.toString())) ? client["profileId"].contact.toString() : ''
            }
        }else{
            return { err: true, msg: `Typo is there in ${data.status}`}
        }
        if(!isEmpty(email)){
            const template = emailTemplate.appointmentUpdateStatus()
            sendMail(email, "Appointment Status", template)
        }
        if(!isEmpty(contact)){
            sendSmsFunction(contact, `A provider has responded to your appointment request. Click here ${messageLink.APPOINTMENTS} and go to your appointments to view and respond.`)
        }
        return { err: false, msg: [], val: "Your Response was successfully received" }
    } catch (err) {
        return { err: true, msg: err }
    }
}

module.exports = {
    createAppointment,
    getAllAppointment,
    updateAppointment,
    deleteAppointment
}