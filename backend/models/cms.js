const mongoose = require("mongoose")

const cms = new mongoose.Schema({
    homeImage: { type: String },
    homeHeader: { type: String },
    homeText: { type: String },
    homeButtonOneText: { type: String },
    homeButtonOneUrl: { type: String },
    homeButtonTwoText: { type: String },
    homeButtonTwoUrl: { type: String },
    mapTipsQuestion: { type: String },
    mapTipsAnswer: { type: String },
    aboutImage: { type: String },
    aboutHeader: { type: String },
    aboutText: { type: String },
    contactInfo: { type: String },
    contactEmail: { type: String },
    homeOneImage: { type: String },
    homeDescOne: { type: String },
    homeTitleOne: { type: String },
    homeDescTwo: { type: String },
    homeTitleTwo: { type: String },
    homeTwoSubTitle: { type: String },
    homeTwoImage: { type: String },
    userTerms: { type: String },
    userTermsUpdateDate: { type: Date },
    providerTerms: { type: String },
    providerTermsUpdateDate: { type: Date },

}, {
    timestamps: true
})

module.exports = mongoose.model('cms', cms)