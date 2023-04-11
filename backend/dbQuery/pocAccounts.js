const pocAccounts = require("../models/pocAccounts");

module.exports.addPocAccount = async (data) => {
  const entries = new pocAccounts(data);
  return entries.save();
};

module.exports.getAllPocAccounts = async()=>{
  return pocAccounts.find({"isGhost":true}).populate({
    path: "organisationId",
    select: { name: 1 }
  })
  .exec();
}
module.exports.findPocAccount= async(data)=>{
  return pocAccounts.findOne(data);
}

module.exports.updatePocAccount= async(data)=>{
  return pocAccounts.findOneAndUpdate({staticPocId: id}, { ...data }).lean()
}

module.exports.delPocAccount = async(data)=>{
  console.log("del poc accounttt",data);
  return pocAccounts.deleteOne(data);
}