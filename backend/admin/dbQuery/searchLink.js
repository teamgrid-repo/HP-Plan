const SearchLinks = require("../models/searchLinks")

async function createLink(data){
    const result = SearchLinks(data);
    return result.save();
}

async function getAllLink(){
    return SearchLinks.find({}).populate({path: "createdBy", select: { name: 1, email: 1, image: 1 }})
        .populate({path: "claimUserId", select: { name: 1, email: 1, image: 1 }})
        .populate({path: "assignedTo", select: { name: 1, email: 1, image: 1 }})
        .populate({path: "assignedBy", select: { name: 1, email: 1, image: 1 }})
        .sort({ createdAt: "desc"})
        .lean();
}

async function getOneLink( searchLink_id){
    return SearchLinks.findOne({ _id: searchLink_id }).lean();
}

async function getUpdateLink(searchLink_id,updateData){
    return SearchLinks.findOneAndUpdate({ _id: searchLink_id },updateData,{ new: true });
}

async function getDeleteLink(searchLink_id){
    return SearchLinks.findOneAndDelete({ _id: searchLink_id });
}

async function getSearchLinkByData(data){
    return SearchLinks.find(data)
        .populate({path: "assignedTo", select: { name: 1, email: 1, image: 1 }})
        .populate({path: "assignedBy", select: { name: 1, email: 1, image: 1 }})
        .sort({ createdAt: "desc"})
}
module.exports = {
    createLink,
    getAllLink,
    getOneLink,
    getUpdateLink,
    getDeleteLink,
    getSearchLinkByData
}
