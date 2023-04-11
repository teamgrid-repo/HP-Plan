const mongoose = require("mongoose");

const saveListingItems = new mongoose.Schema({
    saveListingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "savedListing",
        required: true
    },
    siteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "site",
        required: true
    },
    organisationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "organisation"
    }
},{
    timestamps: true
});


module.exports = mongoose.model("saveListingItem", saveListingItems);