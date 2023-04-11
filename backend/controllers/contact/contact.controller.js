const { isEmpty } = require("lodash");
const { errorResponse, successResponse } = require("../../helpers/helpers");
const { errorMessages, successMessages } = require("../../helpers/messages");
const emailTemplate = require('../../helpers/template')
const { sendMail } = require('../../connection/smtp.connect');
const { createContact, getAllContact, getOneContact, deleteContact, findUser } = require("../../dbQuery/contactQuery");

// CREATE CONTACT
module.exports.createContact = async (req, res) => {
  try {
    const params = { ...req.body, ...req.params, ...req.query };
    const name = params.name;
    const email = params.email;
    const contact = params.contact;
    const subject = params.subject;
    const message = params.message;
    let saveContact = {
      name, email, contact, subject, message
    }

    const data = await createContact(saveContact);
    await data.save();

    const template = emailTemplate.contactEmailTemplate(name, email, contact, subject, message);
    sendMail('info@herplan.org', 'Contact details', template);

    return successResponse(req, res, data, successMessages.EMAIL_SEND);

  } catch (error) {
    return errorResponse(req, res, error.message);
  }
}

// GET ALL CONTACT
exports.getAllContact = async (req, res) => {
  try {
    const data = await getAllContact();
    if (isEmpty(data)) return errorResponse(req, res, errorMessages.NO_DATA_FOUND);
    
    return successResponse(req, res, data, successMessages.CONTACT_FETCHED);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

// GET ONE CONTACT
exports.getOneContact = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };
    const data = await getOneContact(param.contact_id);
    if (isEmpty(data)) return errorResponse(req, res, errorMessages.NO_DATA_FOUND);
    
    return successResponse(req, res, data, successMessages.CONTACT_FETCHED);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

// DELETE CONTACT
exports.deleteContact = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };
    const data = await deleteContact(param.contact_id);
    if (isEmpty(data)) return errorResponse(req, res, errorMessages.NO_DATA_FOUND);

    return successResponse(req, res, data, successMessages.CONTACT_DELETED);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};