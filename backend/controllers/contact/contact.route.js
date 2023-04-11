const express = require("express");
const { createContact, getAllContact, getOneContact, deleteContact } = require("./contact.controller");
const { createContactValidation } = require("./contact.validator");
const { singleKeyAuthorization, authorization, authentication } = require("../../middleware/middleware")
const router = express.Router();

router.post('/contact',singleKeyAuthorization, createContactValidation, createContact);
router.get('/contact', authentication, authorization, getAllContact);
router.get('/contact/:contact_id',  authentication, authorization,getOneContact);
router.delete('/contact/:contact_id',  authentication, authorization, deleteContact);

module.exports = router;