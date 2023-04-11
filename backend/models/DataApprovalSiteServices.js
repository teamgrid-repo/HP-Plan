const mongoose = require("mongoose")

const dataApprovalSiteService = new mongoose.Schema({
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    requestBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    status: {
        type: String,
        required: true
    },
    method:{
        type: String,
        required: true
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sitesSubCategory",
    },
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
    serviceName: { type: String },
    serviceWebpage: { type: String },
    serviceDescription: { type: String },
    specialQues: { type: String },
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
            type: Number,
          },
          email: {
            type: String,
            required: true,
          },
          // makeAccountPrimary: {
          //   type: Boolean,
          // },
        },
      ],
    price: [{ type: String }],
    specialQualiFlag: { type: Boolean, default: false },
    leaf: { type: Boolean, default: false },
    specialQualif: [{ type: mongoose.Schema.Types.ObjectId, ref: "specialQualification"}],
}, {
    timestamps: true
})

module.exports = mongoose.model("dataApprovalSiteService", dataApprovalSiteService)
