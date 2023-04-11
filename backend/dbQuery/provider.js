const provider = require("../models/provider")

exports.createProvider = async (data) => {
    const result = provider(data);
    return result.save();
}

exports.getAllProvider = async () => {
    return provider.find({}).lean();
}

exports.getOneProvider = async (id) => {
    return provider.findOne({ _id: id }).populate({
        path: "subcategory",
        populate: {path: "category_id"}
    }).exec()
}

exports.updateProviderInfo = async (data, id) => {
    return provider.findOneAndUpdate({ userId: id }, data).populate({
        path: "subcategory",
        populate: {path: "category_id"}
    }).exec()
}

exports.updateProviderInfoo = async (data, id) => {
    return provider.findOneAndUpdate({ userId: id }, data).exec();
  };

exports.getProviderByName = async (data) => {
    return provider.findOne(data).populate({
        path: "organization",
    }).exec()
}

exports.filterProvider = async (data) => {
    return provider.find(data).populate('userId').lean()
}

exports.getProviderById = async (userId = [])=>{
    return provider.find({userId : { $in: userId } }).populate("userId")
}

exports.findProviderByUserId = async (userId)=>{
    return provider.find({ createdUser : userId}).select({name: 1, email: 1, totalAssigned: 1, organization: 1})
}

exports.findProviderByOrganisation= async (orgId)=>{
    return provider.find({ organization : orgId}).select({name: 1, email: 1, totalAssigned: 1})
}

exports.dynamicUpdateProvider = async (fieldName, fieldData, data)=>{
    return provider.findOneAndUpdate({[`${fieldName}`]: fieldData }, data).lean()
}

exports.getDynamicProvider = async (fieldName, fieldData = [], field = {})=>{
    return provider.find({ [`${fieldName}`]: { $in: fieldData }}).select(field).lean()
        .populate({ path: 'userId', select: { status: 1 }})
}

exports.getDynamicProviderWithoutPopulate = async (fieldName, fieldData = [], field = {})=>{
    return provider.find({ [`${fieldName}`]: { $in: fieldData }}).select(field).lean()
}
exports.deleteProvider =  async (providerId)=>{
    return provider.findOneAndDelete({_id : providerId})
}

exports.filterProviderByfields = async (data, field={})=>{
    return provider.find(data).select(field)
        .populate({ path: 'userId', select: { status: 1 }})
}

exports.filterProviderByPopulate = async (data, userIdField = {}, organisationField = {}, fields = {})=>{
    return provider.find(data)
        .populate({ path: 'userId', select: { ...userIdField }})
        .populate({ path: 'organization', select: { ...organisationField }, })
        .select(fields)
}

exports.filterProvider = async (data = {})=>{
    return provider.find(data).lean()
}

exports.getProviderByuserId = async (userId) => {
    return provider.findOne({ userId: userId });
  };

exports.getActiveProvider = async (ids) => {
    return provider
    .find({ approvedStatus: "approved", userId: { $in: ids } })
      .populate({
        path: "organization",
        select: { city: 1, state: 1, zipcode: 1, address: 1 },
      })
      .select({
        email: 1,
        firstName: 1,
        lastName: 1,
        acceptHippaDate: 1,
        acceptNonHippaDate: 1,
        acceptProviderTermsDate: 1,
      })
      .exec();
};

exports.getGhostProvider = async (date, ids) => {
    console.log(date);
    return (
      provider
        .find({
          userId: { $in: ids },
          //identity: "subUser_provider",
          approvedStatus: "approved",
        })
        .populate({
          path: "organization",
          select: { name: 1 },
        })
        // .populate({
        //   path: "userId",
        //   match: { lastLogin: { $lte: new Date(date) } },
        // })
        .select({
          contact: 1,
          email: 1,
          name: 1,
          firstName: 1,
          lastName: 1,
          jobTitle: 1,
          userId: 1,
          organization: 1,
          identity: 1,
          lastLogin: 1,
          createdAt:1,
        })
        .exec()
    );
  };


exports.getAllPrimaryProvider = async (id) => {
    return provider
      .find({ makeAccountPrimary: true, organization: id })
      .select({
        email: 1,
      })
      .exec();
};

exports.getProviderByEmail = async (email) => {
  return provider
    .find({ email: email })
    .select({ name: 1, email: 1, identity: 1, userId: 1 });
};
