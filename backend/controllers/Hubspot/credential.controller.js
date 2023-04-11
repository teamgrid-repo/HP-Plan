const {errorResponse, successResponse} = require("../../helpers/helpers");
const {envConstants} = require("../../helpers/constants");
const request = require("request");
const hubspotOrm = require("../../dbQuery/hubspot")
const {isEmpty} = require("lodash");
const {errorMessages, successMessages, leadStatus } = require("../../helpers/messages");
const organisationOrm = require("../../dbQuery/organisation")

module.exports.storeOuthCred = async (req, res)=>{
    try {
        console.log(req.query.code)
        const formData = {
            grant_type: 'authorization_code',
            client_id: envConstants.CLIENT_ID,
            client_secret: envConstants.CLIENT_SECRET,
            redirect_uri: envConstants.REDIRECT_URL,
            code: req.query.code
        };
        request.post('https://api.hubapi.com/oauth/v1/token', { form: formData }, async (err, data) => {
            // Handle the returned tokens
            if(err){
                console.log(err)
                return errorResponse(req, res, "Not Registered Successfully");
            }
            const result = JSON.parse(data.body)
            if(!isEmpty(result) && result.access_token){
                const storeData = {
                    refreshToken: result["refresh_token"],
                    accessToken: result["access_token"],
                    expireIn: result["expires_in"],
                    tokenType: result["token_type"]
                }
                const findCred = await hubspotOrm.getCred()
                if(!isEmpty(findCred)){
                    const id = findCred[0]._id
                    await hubspotOrm.updateAccessToken(id, storeData)
                }else{
                    await hubspotOrm.createCred(storeData)
                }
                return successResponse(req, res, [])
            }
            return errorResponse(req, res, "Not Registered Successfully")
        })
    } catch (err) {
        return errorResponse(req, res, err)
    }
}

function leadStatusInHubspot(status){
    switch (status){
        case "OPEN": return leadStatus.GENERAL_BY_ANALYST
        case "IN_PROGRESS": return leadStatus.STATE_COORDINATOR
        case "1.3 PHC": return leadStatus.PROSPECTING
        case "1.4 State Coordinator - New Contacts": return leadStatus.PERSONAL_STATE_COORDINATOR
        case "Ph4 HubSpot Manual Export" : return leadStatus.MAIN_NETWORK
        case "Ph4 HubSpot Manual Export - Gap" : return leadStatus.ADDITIONAL_GAP
        case "4 - Ready to publish!": return  leadStatus.LIFE_MAIN_NETWORK
        case "4.2 - Ready for Gap Filler Proofing - Additional": return  leadStatus.GAP_ADDITIONAL_NETWORK
        case "Ph5 Published - Main": return  leadStatus.PRO_LIFE_MAIN_NETWORK
        case "Ph5 Published - Gap": return  leadStatus.PUBLIC_ADDITIONAL_NETWORK
    }
}

const token={}
module.exports.updatePropertyByWebhook = async (req, res) =>{
    try {
        let updatedData = req.body
        console.log(updatedData)
        for(let data of updatedData){
            if(!token["eventId"]){
                const hubspotId = data.objectId;
                const findOrg = await organisationOrm.getOrganisationByData({ hubspotId })
                if(!isEmpty(findOrg)){
                    const id = findOrg["_id"]
                    if(data["propertyName"] === "hs_lead_status" && ["4 - Ready to publish!", "4.2 - Ready for Gap Filler Proofing - Additional"].includes(data["propertyValue"])){
                        await organisationOrm.findIdAndUpdate({ leadStatus: leadStatusInHubspot(data["propertyValue"])}, id)
                    }
                }
                token[data["eventId"]] = "active"
            }
        }
        return successResponse(req, res, [], successMessages.DATA_UPDATED)
    } catch (err) {
        return errorResponse(req, res, errorMessages.SOMETHING_WENT_WRONG, 400)
    }
}
