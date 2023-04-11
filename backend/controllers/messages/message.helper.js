const messageOrm = require("../../dbQuery/message");
const {isEmpty, map, groupBy, filter, orderBy, find} = require("lodash");
const {errorMessages, successMessages, identity, messageLink} = require("../../helpers/messages");
const moment = require("moment");
const { fileUpload } = require("../../connection/s3_utils")
const admin = require("../../connection/firebase")
const providerOrm = require("../../dbQuery/provider")
const stateOrm = require("../../dbQuery/states")
const { messageToUser } = require("../../helpers/template")
const {sendMail} = require("../../connection/smtp.connect");
const { sendSmsFunction } = require("../../connection/voyage.connect")


function serviceWorker(registrationToken=[], body={}){
    try {
        console.log(body, registrationToken)
        admin.messaging().sendToDevice(registrationToken,body,{}).then((response)=>{
            console.log("Send Message Successfully", response)
        }).catch((err)=>{
            console.log("Send Message Error found",err)
        })
    } catch (err) {
        return { err: true, msg: err}
    }
}

async function saveChat(data, activeUser= {}){
    try{
        let imageUrl
        if(data.imageFlag){
            const source = data.files[0]
            const uploadFile = await fileUpload(source, data.senderId)
            if(isEmpty(uploadFile)) return { err: true, msg: "Error Found"}
            imageUrl = uploadFile
        }
        const registrationToken = []
        let senderName
        const userId = []
        const email = []
        let contact = []
        const getChatRoom = await messageOrm.getRoomByData({ room: data.room, active: true });
        for(let user of getChatRoom){
            const cUserId = user["userId"]
            userId.push(cUserId._id)
            if(cUserId["_id"].toString() === data.senderId) senderName = cUserId.name
            else{
                let taken = true
                if(cUserId.role === identity.PROVIDER){
                    const provider = await providerOrm.getProviderByName({ userId: cUserId._id })
                    if(isEmpty(provider)) taken = false
                    else{
                        if( isEmpty(cUserId.fcm_token) || !provider["appNotification"] ) taken = false
                        if( provider["EmailMessage"] && !activeUser[cUserId["_id"].toString()]) email.push(cUserId["email"])
                        if( provider["textMessage"] && !activeUser[cUserId["_id"].toString()] && !isEmpty(provider["contact"])) contact.push(provider["contact"])
                    }
                }else if( cUserId.role === identity.GENERAL_USER && !isEmpty(cUserId.profileId) ){
                    if(isEmpty(cUserId.fcm_token) || !cUserId.profileId.appNotification) taken = false
                    if(!activeUser[cUserId["_id"].toString()]){
                        if(cUserId.profileId.EmailMessage) email.push(cUserId["email"])
                        if(cUserId.profileId.textMessage && !isEmpty(cUserId.profileId.contact)) contact.push(cUserId.profileId.contact.toString())
                    }
                }
                if(taken) registrationToken.push(user["userId"].fcm_token)
            }
        }
        const saveChatData = await messageOrm.createMessageList({
            senderId: data.senderId,
            text: data.imageFlag ? imageUrl: data.text,
            socketId: data.socketId,
            room: data.room,
            status: "unread",
            time: isEmpty(data.time)? moment() : data.time,
            imageFlag: data.imageFlag || false,
            activeUserId: userId
        })
        const getMessage = await messageOrm.getOneMessageById(saveChatData._id)
        if(!isEmpty(registrationToken)){
            serviceWorker(registrationToken, { notification: { title: `You have a message waiting for you in your Her PLAN message portal. Please click here ${messageLink.MESSAGE} to go to your messages to view and respond.`, body: data.text }, data: {roomName: data.room }})
        }
        if(!isEmpty(email)){
            const template = messageToUser()
            sendMail(email, `New Message Received`, template)
        }
        if(!isEmpty(contact)){
            for(let cont of contact){
                sendSmsFunction(cont, `You have a message waiting for you in your Her PLAN message portal. Please click here ${messageLink.MESSAGE} go to your messages to view and respond.`)
            }
        }
        return {
            err : false, msg: getMessage
        }
    } catch (err){
        console.log(err);
        return {
            err: true, msg : errorMessages.SOMETHING_WENT_WRONG
        }
    }
}



async function getAllRoomByUserIdByData(data){
    try {
        const { userId } = data
        let getAllRoomByUserId = await messageOrm.getAllChatRoomByUserId({ userId });
        if(isEmpty(getAllRoomByUserId)) return { err: false, msg: []}
        getAllRoomByUserId = filter(getAllRoomByUserId, (data)=>{
            if(data.group || (!data.group && data.active)) return true
            return false
        })
        const allRoomName = map(getAllRoomByUserId, (data) => data.room)

        const getAllUserDetails = await messageOrm.getAllChatRoomByUserId({
            userId: { $ne: userId },
            room: { $in: allRoomName}
        })
        // const hipaaChat = await providerOrm.filterProviderByfields({ userId: { $in : Object.keys(groupBy(getAllUserDetails, "userId._id")) }}, { hippa: 1, userId: 1 })
        const groupByRoom = groupBy(getAllUserDetails, "room");
        let dataValues = [];

        const i1 = "https://media.istockphoto.com/photos/empty-road-at-building-exterior-picture-id479842074?k=20&m=479842074&s=612x612&w=0&h=HS6lsU1f9W21IkotS3cxdvU5KeEO-gLMUa6xrIBbR6k=";
        for(let room of allRoomName){
            const userLast = await messageOrm.getLastMessage({ room });
            const getChatRoom = await messageOrm.getRoomByName(room, userId)
            const chatRoom = getChatRoom[0]
            const allUserByRoom = groupByRoom[room];
            let imageStore = []
            const userData = [];
            let errFound = false
            for(let user of allUserByRoom ){
                let details = user["userId"]
                //const findHippa = find(hipaaChat, (providerId) => providerId.userId.toString() === details["_id"].toString())
                // if(details["role"] === identity.PROVIDER && !isEmpty(findHippa)){
                //     details = { ...details["_doc"], hippa: findHippa.hippa || false}
                // }
                if(isEmpty(details)){
                    errFound = true;
                    continue
                }
                if(isEmpty(details.image)) imageStore.push(details.image)
                userData.push(details)
            }
            if(errFound) continue;
            dataValues.push({
                img: isEmpty(imageStore) ? i1 : imageStore[0],
                id: allUserByRoom[0]._id,
                name: userData,
                room: room,
                lastTime:!isEmpty( userLast) ?  userLast[0].time: getChatRoom[0]["updatedAt"],
                lastMsg: isEmpty(userLast) ? '' : userLast[0].text,
                status: isEmpty(userLast) ? 'unread' : userLast[0].status,
                rid: allUserByRoom[0]["userId"]._id,
                group: chatRoom["group"],
                active: chatRoom["active"]
            })
        }
        dataValues = orderBy(dataValues, ["lastTime"], ["desc"]);
        return  { err: false, msg: dataValues };
    } catch (err) {
        return { err: true, msg: err }
    }
}

async function createNewChatRoom(data){
    try {
        const { userId, roomName, active, fromUserId, group } = data;
        if(isEmpty(userId)) return { err: true, msg: "User Id not found"}
        if(isEmpty(roomName)) return { err: true, msg: "Room Name not found"}
        const findUserInChatAlreadyExist = await messageOrm.getRoomByName(roomName, userId)
        if(!isEmpty(findUserInChatAlreadyExist)){
            await messageOrm.deleteChatRoom(roomName)
            return { err: true, msg: errorMessages.USER_ALREADY_EXIST };
        }
        const createNewRoomByRoomName = await messageOrm.createNewChatRoom({
            room: roomName, fromUserId,
            userId: userId, active: active,
            group: group || false
        })
        console.log(`!!!!!!!!!--------New Chat Room---!!!!`,createNewRoomByRoomName)
        return { err: false, msg: createNewRoomByRoomName }
    } catch (err) {
        return { err: true, msg: err }
    }
}

async function createChat(roomDetails, users, dataValue){
    try {
        let val = successMessages.DATA_FETCHED
        let findRoom;
        const currUser = dataValue.localUserId;
        const userArr= users;
        const chatRooms = await messageOrm.getAllChatRoomByUserId({ userId: currUser });
        const groupAllChatRoom = groupBy(chatRooms, "room")
        let getRoomAnotherUserByRoomNameAll = await messageOrm.getRoomByData({ room: Object.keys(groupAllChatRoom), userId: { $ne: dataValue.localUserId}});
        let getRoomAnotherUserByRoomName  = getRoomAnotherUserByRoomNameAll.filter(function (el) {
            return el.userId != null;
          });
        const groupByDifferentUser = groupBy(getRoomAnotherUserByRoomName, "room")


        let success = true
        for(let i =0 ;i < userArr.length ; i++){
            let room = []
            const getUserRoomName = filter(getRoomAnotherUserByRoomName, (id)=> {
                if(id['userId']._id == userArr[i]){
                    room = [ ...groupByDifferentUser[id['room']]]
                    return true;
                }
                return false;
            });
            if(isEmpty(getUserRoomName)) break;
            if( i === userArr.length-1 ){
                const lastUserGroupBy = groupBy(room, "room");
                for(let roomName of Object.keys(lastUserGroupBy)){
                    const value = lastUserGroupBy[roomName];
                    if(value.length === userArr.length){
                        findRoom = roomName
                        success = false
                    }
                }
            }
            getRoomAnotherUserByRoomName = room
        }
        if(success){
            const checkRoomName = await messageOrm.getAllChatRoomByUserId({ room: roomDetails})
            if(!isEmpty(checkRoomName)) return { err: true, msg: "This Room Name is Already Taken"}
            for(let user of [...userArr, currUser]){
                console.log(`>user`,user)
                await createNewChatRoom({ roomName: roomDetails,fromUserId: currUser, userId: user, active: true, group: dataValue.group})
            }
            findRoom = roomDetails
            val = successMessages.DATA_CREATED
        }else{
            await messageOrm.updateChatRoom({ active: true }, { room: findRoom })
        }
        return { err: false, msg: findRoom, val }
    }catch (err){
        return { err: true, msg: err }
    }
}

async function createOrGetRoomByRoomId(roomName, userId, dataValue){
    try {
        if(isEmpty(roomName)) return { err: true, msg: "Room Name not found"}
        if(isEmpty(userId) || typeof(userId) === "string") return { err: true, msg: " UserId not found "}
        const findOrCreateRoom= await createChat(roomName, userId, dataValue);
        if(!isEmpty(findOrCreateRoom) && findOrCreateRoom.err) return findOrCreateRoom
        const room = findOrCreateRoom.msg
        const getRoomByRoomName = await messageOrm.getRoomByData({ room: room, userId: { $ne: dataValue.localUserId} });
        const userData = []
        for(let user of getRoomByRoomName){
            const providerHippa = await providerOrm.filterProviderByfields({ userId: user['userId'] }, {  name: 1})
            userData.push({ ...user['userId']["_doc"], hippa: isEmpty(providerHippa) ? false : providerHippa[0].hippa || false})
        }
        const roomObj = {
            active: getRoomByRoomName[0].active,
            room: getRoomByRoomName[0].room,
            userId: userData,
            image: userData[0].image,
            group: getRoomByRoomName[0].group
        }
        return { err: false, msg: roomObj, val: findOrCreateRoom.val }
    } catch (err){
        return { err: true, msg: err }
    }
}


async function getAllMessageByRoomName(roomName, userId){
    try {
        const room = await messageOrm.getAllOlderMessageList({
            room: roomName,
            activeUserId: { $in: userId }
        })
        if(isEmpty(room)){
            return { err: false, msg: []}
        }
        return { err: false, msg: room }
    } catch (err) {
        return { err: true, msg: err}
    }
}

async function updateMessageReadStatus(data){
    try {
        const { roomName, userId } = data
        const getOtherPeopleUserId = await messageOrm.getAllChatRoomByUserId({
            userId: { $ne: userId },
            room: { $in: roomName}
        })
        if(isEmpty(getOtherPeopleUserId)) return { err: false, msg: "", val: "No Data Found"}
        for(let user of getOtherPeopleUserId){
            const findUserId = user["userId"]._id
            await messageOrm.updateMessageReadStatus({
                status: "read"
            }, {
                room: roomName, senderId: findUserId
            })
        }
        return { err: false, msg: [], val: successMessages.DATA_UPDATED}
    } catch (err ){
        return { err: true, msg: err}
    }
}

async function leaveDeleteChat(data){
    try {
        const { roomName, currUserId } = data;
        const getRoomName = await messageOrm.getRoomByData({
            room: roomName, userId: currUserId
        });
        let val;
        if(isEmpty(getRoomName)) return { err: true, msg: "Room Name not found"};
        const roomDetails = getRoomName[0];
        if(!roomDetails.group){
            await messageOrm.updateOneChatRoom({ active: false }, { room: roomDetails.room, userId: currUserId })
            val= "Delete Chat SuccessFully Done"
        }else{
            if(!Object.keys(data).includes("delete")) return { err: true, msg: "Key is mandatory" }
            if(data.delete){
                await messageOrm.deleteChatRoom(roomName, { room :roomName, userId: currUserId })
                val = "Group Chat Deleted SuccessFully Done"
            }else{
                await messageOrm.updateOneChatRoom({ active: false }, { room: roomDetails.room, userId: currUserId })
                val= "Group Chat Leave SuccessFully Done"
            }
        }
        return { err: false, msg: [], val }
    } catch (err){
        return { err: true, msg: err}
    }
}

async function uploadLargeFile(data){
    try {
        if(data.imageFlag){
            return saveChat(data)
        }
        return { err: false, msg: "Flag is required" }
    } catch (err ){
        return { err: true, msg: err}
    }
}

async function uploadSite(name, file, all){
    try {
        if(all){
            return {
                err: false,
                msg: await stateOrm.getAllState({}, { createdAt: 0, updatedAt: 0, __v: 0 }),
                val: successMessages.DATA_FETCHED
            }
        }else{
            const source = file[0]
            const uploadFile = await fileUpload(source, name)
            if(isEmpty(uploadFile)) return { err: true, msg: "Error Found"}
            const getStateByName = await stateOrm.getAllState({ name })
            if(!isEmpty(getStateByName)){
                await stateOrm.updateStateByData({ image: uploadFile }, { name })
            }else{
                await stateOrm.createState({ name, image: uploadFile })
            }
            return {
                err: false,
                msg: await stateOrm.getAllState({}, { createdAt: 0, updatedAt: 0, __v: 0 }),
                val: successMessages.DATA_CREATED
            }
        }
    } catch (err) {
        return { err: true, msg: err}
    }
}

module.exports = {
    createOrGetRoomByRoomId,
    getAllMessageByRoomName,
    saveChat,
    getAllRoomByUserIdByData,
    updateMessageReadStatus,
    leaveDeleteChat,
    serviceWorker,
    uploadLargeFile,
    uploadSite
}
