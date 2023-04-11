const nodemailer = require('nodemailer');
const { envConstants } = require("../helpers/constants")

exports.sendMail = (toMail, subject, body) => {

    const transporter = nodemailer.createTransport({
        host: envConstants.SES_HOST,
        port: 465,
        secure: true,
        auth: {
            user: envConstants.SES_KEY,
            pass: envConstants.SES_SECRET,
        },
    });
    console.log("here", toMail)

    const mailOptions = {
        from: envConstants.SES_VERIFIED_MAIL,
        to: toMail,
        subject,
        html: body,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('🚀 TCL -> transporter.sendMail -> error', error);
            return {
                err: true,
                msg: error
            };
        }
        console.log(`Email sent: ${info.response}`, 'email send to', toMail);
        return {
            err: false,
            msg: `Email sent successfully to ${toMail}`
        }
    });
};
