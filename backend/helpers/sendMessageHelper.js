const {content} = require("./template");
const {sendMail} = require("../connection/smtp.connect");
const {sendSmsFunction} = require("../connection/voyage.connect");

exports.sendNotificationToUser = (data) =>{
    if(data["isEmail"]){
        const update = content(['Thank you for signing up to receive message and appointment notifications. Message and data rates may apply. Reply HELP for help. STOP for cancel.'])
        sendMail(data.email, "Update Request", update)
    }
    if(data["isText"]){
        sendSmsFunction(data.contact, `Thank you for signing up to receive message and appointment notifications. Message and data rates may apply. Reply HELP for help. STOP for cancel.`)
    }
}
