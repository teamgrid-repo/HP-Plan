const mongoose = require("mongoose");

const sitesSubCategory = new mongoose.Schema({
    serviceName: { type: String },
    siteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "site",
        required: true
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cure_subcategory",
        required: true
    },
    serviceWebpage: { type: String },
    specialQues: { type: String },
    serviceDescription: { type: String },
    poc: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    staticPoc: [
        {
          staticPocId:{
            type: mongoose.Schema.Types.ObjectId
          },
          name: {
            type: String,
          },
          firstName: {
            type: String,
          },
          lastName: {
            type: String,
          },
          jobTitle: {
            type: String,
          },
          contact: {
            type: String,
          },
          email: {
            type: String,
            required: true,
          },
        },
    ],
    price: [{ type: String }],
    specialQualiFlag: { type: Boolean, default: false },
    leaf: { type: Boolean, default: false },
    specialQualif: [{ type: mongoose.Schema.Types.ObjectId, ref: "specialQualification"}],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" }
}, {
    timestamps: true
});

module.exports = mongoose.model("sitesSubCategory", sitesSubCategory);
