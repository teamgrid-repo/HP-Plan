const {isEmpty} = require("lodash");
const { uploadBase64ToS3 } = require("../ImageUpload/index")
const cmsOrm = require("../../dbQuery/cms")
const siteOrm = require("../../admin/dbQuery/site");
const { geoCodingLocation } = require("../my_organisation/organisation.helper")
const {successMessages} = require("../../helpers/messages");

async function createOrUpdateByModuleList(data){
    try {
        if(!isEmpty(data.homeImage)){
            const imageLink = await uploadBase64ToS3(data.homeImage, data.userId)
            if(!isEmpty(imageLink) && imageLink.err) return imageLink
            data.homeImage = imageLink.msg.link
        }
        if(!isEmpty(data.aboutImage)){
            const imageLink = await uploadBase64ToS3(data.aboutImage, data.userId)
            if(!isEmpty(imageLink) && imageLink.err) return imageLink
            data.aboutImage = imageLink.msg.link
        }
        if(!isEmpty(data.homeOneImage)){
            const imageLink = await uploadBase64ToS3(data.homeOneImage, data.userId)
            if(!isEmpty(imageLink) && imageLink.err) return imageLink
            data.homeOneImage = imageLink.msg.link
        }
        if(!isEmpty(data.homeTwoImage)){
            const imageLink = await uploadBase64ToS3(data.homeTwoImage, data.userId)
            if(!isEmpty(imageLink) && imageLink.err) return imageLink
            data.homeTwoImage = imageLink.msg.link
        }
        const findHomeModule = await cmsOrm.getAllEntriesByModule({})
        if(!isEmpty(findHomeModule)){
            await cmsOrm.updateCmsEntries({ _id: findHomeModule["_id"] }, data)
            const cms = await cmsOrm.getAllEntriesByModule({ createdAt: 0,updatedAt: 0,__v:0 })
            return { err: false, msg: cms}
        }
        const createCms = await cmsOrm.saveCmsByModule(data);
        return { err: false, msg: createCms, val: successMessages.CMS_UPDATED }
    } catch (err) {
        return { err: true, msg: err }
    }
}

async function getCmsByModule(){
    try {
        const getCms = await cmsOrm.getAllEntriesByModule({})
        const allSite = await siteOrm.findSites({ location : {$eq: null } })
        for(let site of allSite){
            await geoCodingLocation(site)
        }
        return { err: false, msg: getCms }
    } catch (err) {
        return { err: true, msg: err }
    }
}

module.exports = {
    createOrUpdateByModuleList,
    getCmsByModule
}