const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
    apiKey: "cadcdf41",
    apiSecret: "6uaMOI4BbfD4E6fP",
})

// const vonage = new Vonage({
//     apiKey: "036c09bd",
//     apiSecret: "ZABCdYg35drKTi9U",
//
// })



function sendSmsFunction(toNumber, text){
    const from = "18443740531"
    const to = `1${toNumber}`

    vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.",to);
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })
}

module.exports = {
    sendSmsFunction
}