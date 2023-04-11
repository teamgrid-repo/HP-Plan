const mongoose = require("mongoose")

const Message = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: false
    },
    text: {
        type: String,
        required: true
    },
    socketId: {
        type: String,
    },
    room: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "unread"
    },
    time: {
        type: Date
    },
    imageFlag: {
        type: Boolean
    },
    activeUserId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: false
    }]
},{
    timestamps: true
})


module.exports = mongoose.model("message", Message);
