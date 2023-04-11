const message = require("../models/message");
const chatRooms = require("../models/chat_room");
const {isEmpty} = require("lodash");

async function createMessageList(data){
    const entries = message(data);
    return entries.save()
}

async function createNewChatRoom(data){
    const entries = await chatRooms(data);
    return entries.save();
}

async function getRoomByName(name, id){
    return chatRooms.find({room: name, userId: id}).populate({path: 'userId', select: { name: 1, role: 1 }}).select({
        room: 1, userId: 1, active: 1, group: 1, updatedAt: 1
    }).exec()
}

async function deleteChatRoom(roomName, data={}){
    if(!isEmpty(data)){
        return chatRooms.deleteOne(data)
    }
    return chatRooms.deleteMany({ room: roomName})
}

async function getRoomByData(data){
    return chatRooms.find(data).populate({path: 'userId', select: { name: 1, email: 1, image: 1, fcm_token: 1, role:1 }, populate: { path: "profileId", select: {  __v: 0, updatedAt: 0, createdAt: 0 }}})
        .select({
        room: 1, userId: 1, active: 1, group: 1
    })
}

async function getAllChatRoomByUserId(data){
    return chatRooms.find(data).populate({path: 'userId', select: { name: 1, image:1, role: 1 }}).select({
        room: 1, userId: 1, active: 1, group: 1
    }).sort({createdAt: 1}).exec()
}

async function updateOneChatRoom(data, filter){
    return chatRooms.findOneAndUpdate(filter, data)
}

async function updateChatRoom(data, filter){
    return chatRooms.bulkWrite([{
        updateMany: {
            filter, update: data
        }
    }])
}

async function getOneMessageById(id){
    return message.findById(id).populate({ path: "senderId", select:{
            name: 1, image: 1
        }}).select({ __v: 0, updatedAt: 0, createdAt: 0})
}

async function getAllOlderMessageList(data){
    return message.find(data).populate({ path: "senderId", select:{
        name: 1, image: 1
        }}).select({ __v: 0, updatedAt: 0, createdAt: 0}).limit(100)
}

async function getLastMessage(data){
    return message.find(data).sort({createdAt: "descending"}).limit(1)
}

async function updateMessageReadStatus(data, filter){
    return message.bulkWrite([
        {
            updateMany: {
                filter: filter,
                update: data
            }
        }
    ])
}

async function getDistinctChatRoom(){
    return chatRooms.distinct("room")
}

module.exports = {
    createMessageList,
    getAllOlderMessageList,
    createNewChatRoom,
    getRoomByName,
    getOneMessageById,
    getAllChatRoomByUserId,
    getLastMessage,
    getRoomByData,
    updateMessageReadStatus,
    deleteChatRoom,
    updateChatRoom,
    updateOneChatRoom,
    getDistinctChatRoom
}
