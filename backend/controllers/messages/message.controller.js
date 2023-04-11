const {errorMessages, successMessages} = require("../../helpers/messages");
const { isEmpty } = require("lodash")
const {successResponse, errorResponse} = require("../../helpers/helpers");
const messageHelper = require("./message.helper")
const { generateVerifyCode } = require("../../helpers/helpers")

module.exports.createOrGetRoomByRoomId = async (req, res) =>{
    try {
        const param = {...req.body, ...req.params, ...req.query};
        const { userId } = param
        param.localUserId = req.user._id
        const roomName = await generateVerifyCode('Aa0')
        const getMessageRoom = await messageHelper.createOrGetRoomByRoomId(roomName.code, userId, param)
        console.log(`!!!-----getRoomByUserId---!!`,getMessageRoom)

        if(!isEmpty(getMessageRoom) && getMessageRoom.err){
            return errorResponse(req, res, getMessageRoom.msg)
        }
        return successResponse(req, res, getMessageRoom.msg, getMessageRoom.val)
    } catch (err){
        return errorResponse(req, res, err);
    }
}

module.exports.getAllRoomByUserId = async (req, res)=>{
    try {
        const param = { ...req.body, ...req.params, ...req.query };
        param.userId = req.user._id;
        const getMessageRoom = await messageHelper.getAllRoomByUserIdByData(param)
        console.log(`!!!-----getAllRoomByUserId---!!`,getMessageRoom)

        if(!isEmpty(getMessageRoom) && getMessageRoom.err){
            return errorResponse(req, res, getMessageRoom.msg)
        }
        return successResponse(req, res, getMessageRoom.msg, successMessages.DATA_FETCHED)
    } catch (err) {
        return errorResponse(req, res, err)
    }
}

module.exports.messageGetByRoomId = async (req, res)=>{
    try {
        const param = {...req.params, ...req.query, ...req.body };
        if(isEmpty(param.roomName)) return errorResponse(req, res, "Room Name is required")
        param.userId = req.user._id
        const messageListing = await messageHelper.getAllMessageByRoomName(param.roomName, param.userId);
        console.log(`!!!-----messageGetByRoomId---!!`,messageListing)
        if(!isEmpty(messageListing) && messageListing.err){
            return errorResponse(req, res, messageListing.msg)
        }
        return successResponse(req, res, messageListing.msg, successMessages.DATA_FETCHED)
    } catch (err){
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG);
    }
}

module.exports.messageReadStatus = async (req, res)=>{
    try {
        const param = {...req.params, ...req.query, ...req.body };
        if(isEmpty(param.roomName)) return errorResponse(req, res, "Room Name is required")
        param.userId = req.user._id
        const userReadStatus = await messageHelper.updateMessageReadStatus(param);
        if(!isEmpty(userReadStatus) && userReadStatus.err){
            return errorResponse(req, res, userReadStatus.msg)
        }
        return successResponse(req, res, userReadStatus, userReadStatus.val)
    } catch (err) {
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG);
    }
}

module.exports.leaveDeleteRoomByUser = async (req, res )=>{
    try {
        const param = {...req.params, ...req.query, ...req.body };
        if(isEmpty(param.roomName)) return errorResponse(req, res, "Room Name is required")
        param.currUserId = req.user._id;
        console.log(req.user)
        const leaveDelete = await messageHelper.leaveDeleteChat(param);
        if(!isEmpty(leaveDelete) && leaveDelete.err){
            return errorResponse(req, res, leaveDelete.msg)
        }
        return successResponse(req, res, leaveDelete.msg, leaveDelete.val)
    } catch (err) {
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG);
    }
}

module.exports.fileUploadBySocket = async (req, res) =>{
    try {
        const param = {...req.params, ...req.query, ...req.body }
        param.userId = req.user._id
        const file = req.files;
        if(isEmpty(file)) return errorResponse(req, res, "file not found")
        if(isEmpty(param.room)) return errorResponse(req, res, "Chat Room not found")
        if(isEmpty(param.senderId)) return errorResponse(req, res, "senderId not found")
        param.files = file
        const fileUploadInS3 = await messageHelper.uploadLargeFile(param)
        if(!isEmpty(fileUploadInS3) && fileUploadInS3.err){
            return errorResponse(req, res, fileUploadInS3.msg)
        }
        return successResponse(req, res, fileUploadInS3.msg, fileUploadInS3.val)
    }catch (err) {
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG);
    }
}

module.exports.uploadAndGetSite = async (req, res) =>{
    try {
        const param = {...req.params, ...req.query, ...req.body }
        const file = req.files;
        const name = param.name;
        let uploadState
        if(!isEmpty(file) && !isEmpty(name)){
            uploadState = await messageHelper.uploadSite(name, file, false)
        }else{
            uploadState = await messageHelper.uploadSite('', '', true)
        }
        if(!isEmpty(uploadState) && uploadState.err){
            return errorResponse(req, res, uploadState.msg)
        }
        return successResponse(req, res, uploadState.msg, uploadState.val)
    } catch (err) {
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG);
    }
}



