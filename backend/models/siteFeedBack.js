const mongoose = require("mongoose");
const convertEmail = (email) => (email.toLowerCase());

const siteFeedBack = new mongoose.Schema({
    siteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "site",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        set: convertEmail,
    },
    feedback: {
        type: String
    },
    archive: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

module.exports = mongoose.model("feedback", siteFeedBack)