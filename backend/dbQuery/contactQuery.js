const contact = require("../models/contact");

exports.createContact = async (data) => {
    const result = contact(data);
    return result.save();
}

exports.getAllContact = async () => {
    return contact.find({}).lean();
}

exports.getOneContact = async (contact_id) => {
    return contact.findOne({ _id: contact_id }).lean();
}

exports.deleteContact = async (contact_id) => {
    return contact.findOneAndDelete({ _id: contact_id });
}
