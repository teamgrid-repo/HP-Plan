const Users = require("../models/users");

module.exports.createUser = async (data)=>{
    const entries = new Users(data);
    return entries.save()
}

module.exports.getUserById = async (id)=>{
    return Users.findById(id).lean()
}

module.exports.updateUserById = async (id, data) => {
    return Users.findByIdAndUpdate(id, data, { new: true }).exec();
};

module.exports.getUserByIds = async (ids = [])=>{
    return Users.find({ _id: { $in: ids }}).select({ name: 1, email:1 })
}

module.exports.searchesClientByIds = async (data, field, populate)=>{
    return Users.find(data).populate({ path: "profileId" ,select: { createdAt: 0, updatedAt: 0, __v: 0, }}).sort({ createdAt: "desc"}).select(field)
}

module.exports.findUser = async (data)=>{
    return Users.findOne(data).lean()
}

module.exports.findUserByData = async (data, field={})=>{
    return Users.find(data).populate({ path: "subRoleCreatedBy", select: { name: 1 }}).sort({ createdAt: "desc"}).select(field)
}

module.exports.deleteUserById = async (id)=>{
    return Users.findByIdAndDelete(id).lean()
}

module.exports.getUsers = async () => {
    return Users.find({ role: "user" })
      .populate({ path: "profileId", select: { acceptTermsDate: 1 } })
      .select({ name: 1, email: 1 });
  };

module.exports.getGhostUserIds = async (date) => {
    return Users.find({
      $or: [{lastLogin: { $lte: new Date(date) }}, {lastLogin: {$exists:false}}],
      role: "provider",
      createdAt:{ $lte: new Date(date) },
      //status: "approved",
      freeze: false,
    }).select({ _id: 1 });
};

module.exports.notFreezeUserIds = async () => {
    return Users.find({
      freeze: false,
    }).select({ _id: 1 });
};