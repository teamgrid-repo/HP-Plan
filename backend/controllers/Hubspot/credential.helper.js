const moment = require("moment")
const hubspot = require('@hubspot/api-client');
const hubspotOrm = require("../../dbQuery/hubspot")
const request = require("request")
const {envConstants} = require("../../helpers/constants");
const {isEmpty} = require("lodash");

/**
 * CLIENT_ID - Developer Account Client Id
 * CLIENT_SECRET - Developer Account Client Secret
 * REDIRECT_URL - Redirect Url is returning oauth callback URL
 * DEVELOPER_API_KEY - Developer Account Api Key
 * APP_ID - Developer Account App Id
 * ACCESS_TOKEN - Private App Hubspot Token
 * @returns {Promise<{msg: string, err: boolean}>}
 */

async function refreshToken(){
  const findCred = await hubspotOrm.getCred()
  if(isEmpty(findCred)) return { err: true, msg: "" }
  const hubspotClient = new hubspot.Client({});
  const token = findCred[0].accessToken
  try {
    const apiResponse = await hubspotClient.oauth.accessTokensApi.getAccessToken(token);
    return { err: false, msg: apiResponse.token}
  } catch (e) {
    e.message === 'HTTP request failed' ? console.error(JSON.stringify(e.response, null, 2))  : console.error(e.body.message)
    if(e.body.message === "The access token is expired or invalid"){
      const formData = {
        grant_type: 'refresh_token',client_id: envConstants.CLIENT_ID,
        client_secret: envConstants.CLIENT_SECRET,
        redirect_uri: envConstants.REDIRECT_URL,
        refresh_token: findCred[0].refreshToken
      };
      console.log(findCred, formData)
      const token = []
      request.post("https://api.hubapi.com/oauth/v1/token", { form: formData} , async (err, data)=>{
        if(err){
          console.log(err)
          return { err: true, msg: err }
        }
        console.log(data.body,'data')
        const result = JSON.parse(data.body)
        if(!isEmpty(result) && result.access_token){
          const storeData = {
            refreshToken: result["refresh_token"],
            accessToken: result["access_token"],
            expireIn: result["expires_in"],
            tokenType: result["token_type"],
          }
          await hubspotOrm.updateAccessToken(findCred[0]._id, storeData)
          console.log(`!!!!!!!!!!!!!!!!!!`, result["access_token"])
          token.push(result["access_token"])
          return { err: false, msg: result["access_token"]}
        }
      })
      if(isEmpty(token)){
        return { err: true, msg:"" }
      }
    }else{
      return { err: true, msg: "error"}
    }
  }
}

module.exports = { refreshToken }
