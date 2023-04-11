const appointment = require("../models/appointments");


exports.bookAppointment = async (data) => {
    const result =await appointment(data);
    return result.save();
}

exports.getProviderAppointment = async (providerId) => {
    return appointment.find({ providerId: providerId })
}

exports.getClientAppointment = async (clientId) => {
    return appointment.find({ clientId: clientId })
}

exports.updateAppointment = async (data, generalUserId) => {
    return appointment.findOneAndUpdate({ _id: generalUserId }, data, { new: true });
}

exports.getAppointment = async (data, field)=>{
    return appointment.find(data)
        .populate({ path: "clientId", select: { role: 1, name: 1, email: 1, profileId: 1}, populate: { path: "profileId", select: {createdAt:0, updatedAt: 0, __v: 0}}})
        .populate({ path: "providerId", select: { role: 1, name: 1, email: 1}})
        .populate({ path: "canceledBy", select: { role: 1, name: 1, email: 1}})
        .select(field)
}

exports.getAppointmentByPopulate = async (data, field)=>{
    return appointment.find(data)
        .populate({ path: "clientId", select: { role: 1, name: 1, email: 1, profileId: 1}, populate: { path: "profileId", select: {createdAt:0, updatedAt: 0, __v: 0}}})
        .populate({ path:"siteId", select: {createdAt:0, updatedAt: 0, __v: 0, category: 0, subcategory: 0 } })
        .populate({path: "subCategoryId", select: { name: 1, category_id: 1}})
        .populate({ path: "canceledBy", select: { role: 1, name: 1, email: 1}})
        .select(field)
}

exports.getAllAppointment = async (data, isCancel) => {
    const commonPipeline = [
        {
            $lookup: {
                from: 'users',
                localField: 'clientId',
                foreignField: '_id',
                as: 'clientData'
            },
        },
        { $unwind: "$clientData"},
        {
            $lookup: {
                from: 'userprofiles',
                localField: 'clientData.profileId',
                foreignField: '_id',
                as: 'profileData'
            },
        },
        { $unwind: "$profileData"},
        {
            $lookup: {
                from: 'sites',
                localField: 'siteId',
                foreignField: '_id',
                as: 'siteData'
            },
        },
        { $unwind: "$siteData"},
        {
            $lookup: {
                from: 'cure_subcategories',
                localField: 'subCategoryId',
                foreignField: '_id',
                as: 'subCategoryData'
            },
        },
        { $unwind: "$subCategoryData"},
        {
            $lookup: {
                from: "sitessubcategories",
                let: {si: "$siteId", sc: "$subCategoryId"},
                pipeline: [
                    { $match:{ $expr:{ $and:[ {$eq: [ "$siteId",  "$$si" ]}, {$eq: [ "$subCategoryId", "$$sc"]} ]}}}],
                as: "service"
            },
        },
        { $unwind: "$service"},
        {
            $lookup: {
                from: 'users',
                localField: 'canceledBy',
                foreignField: '_id',
                as: 'canceledByData'
            },
        },
        { $match: data },
        { $project: {
                "service._id": 1,
                "room": 1, "status": 1, "date": 1,
                "service.serviceName": 1,
                "service.serviceWebpage": 1,
                "service.serviceDescription": 1,
                "canceledByData.email": 1,
                "canceledByData.name": 1,
                "subCategoryData._id": 1,
                "subCategoryData.name": 1,
                "subCategoryData.category_id": 1,
                "siteData": 1,
                "profileData": 1,
                "clientData._id": 1,
                "clientData.name": 1,
                "clientData.email": 1,
            }}
    ]
    return appointment.aggregate(commonPipeline)
}

exports.deleteAppointment = async (id)=>{
    return appointment.findByIdAndDelete(id).lean()
}