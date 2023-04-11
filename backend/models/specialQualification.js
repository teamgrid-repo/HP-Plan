const mongoose = require("mongoose");

const specialQualification = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    generalised: {
        type: Boolean,
        required: true,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cure_subcategory"
    },
    other:{
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("specialQualification", specialQualification)