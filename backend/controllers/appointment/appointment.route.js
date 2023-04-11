const express = require("express");
const { getAllAppointment } = require("../../dbQuery/appointmentQuery");
const { authentication, authorization } = require("../../middleware/middleware");
const { bookAppointment, updateAppointment, allAppointment } = require("./appointment.controller");
const { bookAppointmentValidation } = require("./appointment.validator");
const router = express.Router();

router.post('/appointment',authentication, authorization, bookAppointmentValidation, bookAppointment);
router.put('/appointment/:appointmentId',authentication, authorization, updateAppointment);
router.get('/allAppointment', authentication, authorization, allAppointment);

module.exports = router;