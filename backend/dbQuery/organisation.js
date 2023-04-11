const Organisation = require("../models/my_organisation");
const mongoose = require("mongoose");
const { status } = require("../helpers/messages");
const { isEmpty } = require("lodash");
async function createNewOrganisation(data) {
  const entries = await Organisation(data);
  return entries.save();
}

async function getAllOrganisation() {
  return Organisation.find({})
    .populate({ path: "services_id", select: ["_id", "name", "active"] })
    .populate({
      path: "sourceOfFinding",
      select: { __v: 0, updatedAt: 0, createdAt: 0 },
    })
    .populate("provider_id")
    .sort({ createdAt: "desc" })
    .lean();
}

async function getAllOrganisationWithPagination(params) {
  console.log(params);
  let page;
  let limit;
  let stype;
  let sdir;
  var sortObject = {};
  let isPublished = params.isPublished;
  if (isEmpty(params)) {
    page = 1;
    limit = 100;
    stype = params.keyName;
    sdir = params.sortingType;
    sortObject[stype] = sdir;
  } else {
    page = params.page;
    limit = params.limit;
    stype = params.keyName;
    sdir = params.sortingType;
    sortObject[stype] = sdir;
    page = parseInt(page);
    limit = parseInt(limit);
  }
  // const list = await Organisation.aggregate([
  //   {
  //     $facet: {
  //       data: [
  //         { $sort: { createdAt: -1 } },
  //         { $skip: page > 0 ? (page - 1) * limit : 0 },
  //         { $limit: limit },
  //       ],
  //       totalCount: [
  //         {
  //           $count: "count",
  //         },
  //       ],
  //     },
  //   },
  // ]);
  // total = (list[0].totalCount[0] && list[0].totalCount[0].count) || 0;
  try {
    const publishOrNot =
      typeof params.published === "boolean"
        ? { publish: { $eq: params.published } }
        : {};
    if (params.keyword !== undefined) {
      const list = await Organisation.find({
        $or: [
          { name: { $regex: params.keyword, $options: "i" } },
          { about: { $regex: params.keyword, $options: "i" } },
          { website: { $regex: params.keyword, $options: "i" } },
          { contact: { $regex: params.keyword, $options: "i" } },
          { email: { $regex: params.keyword, $options: "i" } },
        ],
        $and: [publishOrNot],
      })
        .sort(sortObject)
        .skip(page > 0 ? (page - 1) * limit : 0)
        .limit(limit);
      console.log(list.length);
      const list1 = await Organisation.find({
        $or: [
          { name: { $regex: params.keyword, $options: "i" } },
          { about: { $regex: params.keyword, $options: "i" } },
          { website: { $regex: params.keyword, $options: "i" } },
          { contact: { $regex: params.keyword, $options: "i" } },
          { email: { $regex: params.keyword, $options: "i" } },
        ],
        $and: [publishOrNot],
      }).count();
      return { data: list, total: list1 };
    } else {
      const list = await Organisation.find({ $and: [publishOrNot] })
        .sort(sortObject)
        .skip(page > 0 ? (page - 1) * limit : 0)
        .limit(limit);
      console.log(list.length);
      const list1 = await Organisation.find({ $and: [publishOrNot] }).count();
      return { data: list, total: list1 };
    }
  } catch (err) {
    console.log(err);
  }

  // .skip(page > 0 ? (page - 1) * limit : 0)
  // .limit(limit);
}

async function getOrganisationIdsAndNames() {
  const list = await Organisation.find().select({ _id: 1, name: 1 }).lean();
  return list;
}

async function getAllOrganisationByIds(ids) {
  return Organisation.find({ _id: { $in: ids } })
    .populate({ path: "services_id", select: ["_id", "name", "active"] })
    .populate("provider_id")
    .lean();
}

async function getOrganisationById(id) {
  return Organisation.findById(id).sort({ createdAt: "desc" }).exec();
}

async function getOrganisationByData(data) {
  return Organisation.findOne(data)
    .populate({ path: "sourceOfFinding", select: { searchName: 1 } })
    .populate({ path: "providerId", select: { role: 1, email: 1 } })
    .lean();
}

async function findIdAndUpdate(data, id) {
  return Organisation.findByIdAndUpdate(id, data, { new: true })
    .populate("category")
    .populate("subcategory");
}

async function getOrganisations(data) {
  return Organisation.find(data).lean();
}

async function fetchAllInfoByOrganisationId(orgId = []) {
  let val = orgId.map((s) => mongoose.Types.ObjectId(s));
  return Organisation.aggregate([
    {
      $lookup: {
        from: "sites",
        localField: "_id",
        foreignField: "organisationId",
        as: "sitesInfo",
      },
    },
    {
      $match: {
        _id: { $in: val },
      },
    },
  ]);
}

async function fetchAllInfoByOrganisationIdByData(data) {
  return Organisation.aggregate([
    {
      $lookup: {
        from: "sites",
        localField: "_id",
        foreignField: "organisationId",
        as: "sitesInfo",
      },
    },
    {
      $match: data,
    },
    { $unwind: "$sitesInfo" },
  ]);
}

async function filterOutOrganisationByRegex(data) {
  return Organisation.aggregate([
    {
      $lookup: {
        from: "sites",
        localField: "_id",
        foreignField: "organisationId",
        as: "sitesInfo",
      },
    },
    {
      $match: data,
    },
  ]);
}

async function filterOutOrganisationByRegexBYData(data, fields) {
  return Organisation.aggregate([
    {
      $lookup: {
        from: "sites",
        localField: "_id",
        foreignField: "organisationId",
        as: "sitesInfo",
      },
    },
    {
      $match: data,
    },
    {
      $project: fields,
    },
  ]);
}

async function filterOutByRegex(data, field) {
  return Organisation.find(data).select(field);
}

async function deleteOrgById(id) {
  return Organisation.findByIdAndDelete(id).lean();
}

async function findProvider(data) {
  return Organisation.aggregate([
    {
      $lookup: {
        from: "providers",
        let: { id: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$organization", "$$id"] },
                  { $eq: ["$approvedStatus", status.APPROVED] },
                ],
              },
            },
          },
        ],
        as: "providerInfo",
      },
    },
    {
      $match: data,
    },
  ]);
}

async function linkProvider(data) {
  return Organisation.aggregate([
    {
      $lookup: {
        from: "providers",
        localField: "_id",
        foreignField: "organization",
        as: "providerInfo",
      },
    },
    {
      $match: data,
    },
  ]);
}

async function addPoc(data) {
  console.log("data-----in--",data)
  return Organisation.findByIdAndUpdate(
    data.organisationId,
    {
      $push: {
        poc: {
          email: data.email,
          name: data.name,
          contact: data.contact,
          firstName: data.firstName,
          lastName: data.lastName,
          jobTitle: data.jobTitle,
        },
      },
    },
    { upsert: true, new: true }
  );
}

async function deletePoc(param) {
  console.log("param",param)
  return Organisation.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(param.organisationId) },
    {
      $pull: {
        poc: { _id: mongoose.Types.ObjectId(param.pocId) },
      },
    },
    { safe: true, multi: true }
  );
}

async function updatePoc(data) {
  console.log("data", data);
  return Organisation.updateOne(
    { _id: data.organisationId, "poc._id": data.pocId },
    {
      $set: {
        "poc.$.email": data.email,
        "poc.$.name": data.name,
        "poc.$.firstName": data.firstName,
        "poc.$.lastName": data.lastName,
        "poc.$.jobTitle": data.jobTitle,
        "poc.$.contact": data.contact,
      },
    }
  );
}

async function updatePocStatus(data) {
  console.log("data", data);
  return Organisation.updateOne(
    { _id: data.organisationId, "poc._id": data.pocId },
    {
      $set: {
        "poc.$.isActive": data.isActive,
      },
    }
  );
}

async function getPoc(data) {
  console.log("data", data);
  return Organisation.findOne({ _id: data.organisationId }).select({ poc: 1 });
}

async function updateOrganisation(data, organisationId) {
  return Organisation.findOneAndUpdate({ _id: organisationId }, data,{ upsert: true, new: true }).exec();
}



module.exports = {
  createNewOrganisation,
  getAllOrganisation,
  getOrganisationById,
  getOrganisationByData,
  findIdAndUpdate,
  getOrganisations,
  fetchAllInfoByOrganisationId,
  filterOutOrganisationByRegex,
  fetchAllInfoByOrganisationIdByData,
  getAllOrganisationByIds,
  filterOutByRegex,
  deleteOrgById,
  findProvider,
  linkProvider,
  filterOutOrganisationByRegexBYData,
  getAllOrganisationWithPagination,
  getOrganisationIdsAndNames,
  addPoc,
  updatePoc,
  deletePoc,
  getPoc,
  updateOrganisation,
  updatePocStatus
};
