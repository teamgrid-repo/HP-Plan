const {successMessages, errorMessages} = require("../../helpers/messages");
const feedbackOrm = require("../../dbQuery/siteFeedBack");
const siteOrm = require("../../admin/dbQuery/site")
const template = require("../../helpers/template")
const { sendMail } = require("../../connection/smtp.connect")
const {isEmpty} = require("lodash");

async function createSiteFeedBack(data){
    try {
        const { name, siteId, feedback, email } = data;
        const findSite = await siteOrm.getOneSite(siteId);
        if(isEmpty(findSite)){
            return { err: true, msg: "Site Not found" }
        }
        const createFeedback = await feedbackOrm.createSiteFeedBack({
            siteId, name, email, feedback
        })
        if(isEmpty(createFeedback)) return { err: true, msg: errorMessages.SOMETHING_WENT_WRONG }
        const feedbackTemplate = template.content(['Thank you for submitting improvements to the provider listing. Our team will review your comments and modify the listing as appropriate. We appreciate your contribution to the quality of our directory.'])
        sendMail(email, "Thank You For the FeedBack", feedbackTemplate)
        return { err: false, msg: [], val: successMessages.FEEDBACK_CREATED}
    } catch (err) {
        return { err: true, msg: err }
    }
}

async function getAllSiteFeedBack(){
    try {
        const getAllFeedBack = {
            archive: await feedbackOrm.getAllSiteFeedBack({ archive: true }),
            unArchive: await feedbackOrm.getAllSiteFeedBack({ archive: false }),
        }
        return { err: false, msg: getAllFeedBack, val: successMessages.FEEDBACK_FETCHED}
    } catch (err) {
        return { err: true, msg: err }
    }
}

async function deleteSiteFeedBack(id){
    try {
        const findValidId = await feedbackOrm.getOneFeedback(id);
        if(isEmpty(findValidId)) return { err: true, msg: errorMessages.ID_NOT_FOUND }

        const feedbackId = findValidId["_id"]
        const deleteIds = await feedbackOrm.updateSiteFeedBack({ archive: !findValidId["archive"] }, { _id: feedbackId });
        if(isEmpty(deleteIds)) return { err: true, msg: errorMessages.SOMETHING_WENT_WRONG }
        return { err: false, msg: [], val: successMessages.FEEDBACK_DELETED }
    } catch (err) {
        return { err: true, msg: err }
    }
}

module.exports = {
    createSiteFeedBack,
    getAllSiteFeedBack,
    deleteSiteFeedBack
}