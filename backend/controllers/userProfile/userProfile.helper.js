const userProfileOrm = require("../../dbQuery/userProfile")
const { isEmpty } = require("lodash")
const {successMessages } = require("../../helpers/messages");
const { sendNotificationToUser } = require("../../helpers/sendMessageHelper")
const userOrm = require("../../dbQuery/users")

async function deleteUserProfile(userId){
    try {
        const userProfile = await userProfileOrm.getUserProfileById(userId);
        await userProfileOrm.deleteUserProfile(userProfile["_id"]);
        return {err: false, msg: [], val: successMessages.DATA_DELETED }
    } catch (err){
        return {err: true, msg: err}
    }
}

async function createUserProfile(data, email){
    try {
        const alreadyExistProfile = await userProfileOrm.findProfileByUserId(data.userId);
        if(!isEmpty(alreadyExistProfile)){
            const id = alreadyExistProfile._id;
            const updateData = await userProfileOrm.updateUserProfile(data, id);
            if(data["EmailMessage"]) sendNotificationToUser({ isEmail: true, email })
            if(data["textMessage"] && !isEmpty(alreadyExistProfile["contact"].toString())) sendNotificationToUser({ isText: true, contact: alreadyExistProfile["contact"].toString() })
            return {
                err: false, msg: updateData, val: successMessages.PROFILE_UPDATED
            }
        }else{
            const saveData = await userProfileOrm.saveUserProfile(data);
            return { err: false, msg: saveData, val: successMessages.PROFILE_CREATED}
        }
    } catch (err){
        return { err: true, msg: err}
    }
}

async function getUserProfile(data){
    try {
        const {userId} = data
        const getProfile = await userProfileOrm.getUserProfileById(userId);
        const userById = await userOrm.getUserById(userId)
        return {
            err: false, msg: { ...getProfile["_doc"], image: userById["image"]}
        }
    } catch (err) {
        console.log(err)
        return { err: true, msg: err};
    }
}

module.exports = {
    createUserProfile,
    getUserProfile,
    deleteUserProfile
}
