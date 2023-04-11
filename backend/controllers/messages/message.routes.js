const express = require("express");
const { authorization, authentication, singleKeyAuthorization} = require("../../middleware/middleware")
const upload = require("../../connection/multer")
const messageController = require("./message.controller")
const router = express.Router();

router.get('/message',authentication,authorization, messageController.messageGetByRoomId)
router.post('/message_room', authentication, messageController.createOrGetRoomByRoomId)
router.get("/message-allRoom", authentication, messageController.getAllRoomByUserId)
router.put("/update-readStatus", authentication, messageController.messageReadStatus)
router.put("/leave-delete-chat",authentication,authorization, messageController.leaveDeleteRoomByUser)
router.post('/socket-upload', authentication, upload.any(), messageController.fileUploadBySocket)
router.post("/siteImage", singleKeyAuthorization, upload.any(), messageController.uploadAndGetSite)

module.exports = router
