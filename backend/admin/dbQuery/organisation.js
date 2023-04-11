const organisation = require("../models/organisations")


module.exports.createNewOrganisation = async (data)=>{
    const entries = await organisation(data);
    return entries.save();
}

module.exports.updateOrganisationDetails = async (id, data)=>{
    return organisation.findOneAndUpdate({_id: id}, {...data}, {new: true})
}

module.exports.getAllOrganisation = async ()=>{
    return organisation.find({}).exec()
}
