const mongoose = require('mongoose');

const convertEmail = (email) => (email ? email.toLowerCase() : email);

const Organisation = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
    },
    address: {
        type: String,
    },
    city:{
        type:String
    },
    zipcode: {
        type: String
    },
    state: {
      type: String
    },
    about: {
      type: String
    },
    website: {
        type: String,
    },
    orgType: [{
        type: String
    }],
    altWebsite: {
        type: String
    },
    email: {
        type: String
    },
    location: {
        lat: { type: Number},
        lang: {type: Number}
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cure_category'
    }],
    subcategory:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cure_subcategory'
    }],
    totalAssigned: {
        type: Number,
        default: 10
    },
    subUserIncreasingLimit: {
        type: Boolean,
        default: false
    },
    complianceComplete: {
        type: Boolean
    },
    publicName:{
        type: String,
    },
    recordStatus:{
        type: Boolean,
    },
    logo:{
        type: String,
    },
    geospan:[{
        type: String,
    }],
    hippa:{
        type: Boolean,
        default: false
    },
    sourceOfFinding: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SearchLinks'
    },
    publish: {
        type: Boolean,
        default: false
    },
    hubspotId: {
        type: String,
    },
    searchResults: {
        type: Boolean,default: true
    },
    leadStatus: {
        type: String,
    },
    sourceOfFindingName: {
        type: String,
    },
    claimStatus: {
        type: Boolean,
        default: false,
    },
    poc: [
        {
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
            set: convertEmail,
          },
          isActive:{
            type: Boolean,
            default: true,
          }
          // makeAccountPrimary: {
          //   type: Boolean,
          // },
        },
      ],
},{
    timestamps: true
});

module.exports = mongoose.model('organisation', Organisation)
