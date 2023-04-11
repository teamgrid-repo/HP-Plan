const { isEmpty } = require("lodash");
const appointmentHelper = require("./appointment.helper")
const {sendMail} = require("../../connection/smtp.connect");
const emailTemplate = require("../../helpers/template")
const { errorResponse, successResponse } = require("../../helpers/helpers");
const { errorMessages, identity} = require("../../helpers/messages");

// BOOK APPOINTMENT
module.exports.bookAppointment = async (req, res) => {
  try {
    const param = { ...req.body, ...req.query, ...req.params }
    const user = req.user
    param.userId = req.user._id
    param.role = req.user.role
    const bookAppointment = await appointmentHelper.createAppointment(param);
    if(!isEmpty(bookAppointment) && bookAppointment.err) {
      return errorResponse(req, res, bookAppointment.msg , 200 )
    }
    if(user.role === identity.GENERAL_USER){
      const { email } = user
      const template = emailTemplate.content([
          "The provider will be in touch regarding your appointment request. Please call the provider directly if the request is urgent."
      ])
      sendMail(email, "Appointment Request", template)
    }
    return successResponse(req, res, bookAppointment.msg , bookAppointment.val )
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
}

// Get Appointment for provider and client
module.exports.allAppointment = async (req,res)=>{
  try{
    let param = {};
    param.userId = req.user._id
    param.role = req.user.role
    const getAllAppointment = await appointmentHelper.getAllAppointment(param)
    if(!isEmpty(getAllAppointment) && getAllAppointment.err) {
      return errorResponse(req, res, getAllAppointment.msg , 200 )
    }
    return successResponse(req, res, getAllAppointment.msg , getAllAppointment.val )
  }
  catch(error){
    return errorResponse(req,res,error.message)
  }
}

// UPDATE APPOINTMENT
exports.updateAppointment = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };
    const id = param.appointmentId
    const data = param;
    if (isEmpty(id) || isEmpty(data)) return errorResponse(req, res, `Appointment ${errorMessages.ID_NOT_FOUND}`)
    data.providerId = req.user._id
    const updatedAppointment = await appointmentHelper.updateAppointment(data, id);
    if(!isEmpty(updatedAppointment) && updatedAppointment.err) {
      return errorResponse(req, res, updatedAppointment.msg)
    }
    return successResponse(req, res, [], updatedAppointment.val);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};