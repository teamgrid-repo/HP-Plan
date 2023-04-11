const userProfile = require("../models/userProfile");

async function saveUserProfile(data){
    const entries = await userProfile(data);
    return entries.save();
}

async function findProfileByUserId(id){
    return userProfile.findOne({userId: id}).exec()
}

async function updateUserProfile(data, id){
    return userProfile.findByIdAndUpdate(id, data, {new: true}).exec()
}

async function updateUserProfileById(data, id) {
    return userProfile.findOneAndUpdate({ userId: id }, data).exec();
}

async function getUserProfileById(userId){
    return userProfile.findOne({userId: userId}).exec()
}

async function getUserProfileOfArray(userId=[]){
    return userProfile.find({userId: {$in: userId}}).populate({ path: "userId", select: { name: 1, email: 1, image: 1}}).exec()
}

async function deleteUserProfile(id){
    return userProfile.findByIdAndDelete(id).lean()
}

async function findAllProfile(data= {}){
    return userProfile.find(data).lean()
}

module.exports = {
    saveUserProfile,
    findProfileByUserId,
    updateUserProfile,
    getUserProfileById,
    getUserProfileOfArray,
    deleteUserProfile,
    findAllProfile,
    updateUserProfileById,
}
