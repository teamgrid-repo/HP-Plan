const mongoose = require("mongoose");

const chatRooms = new mongoose.Schema({
    room: {
        type: String,
        required: true
    },
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    group: {
        type: Boolean
    }
},{
    timestamps: true
});

module.exports = mongoose.model('chat_room', chatRooms);
