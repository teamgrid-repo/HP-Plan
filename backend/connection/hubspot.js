const hubspot = require("@hubspot/api-client");
const {envConstants } = require("../helpers/constants");
const organisationOrm = require("../dbQuery/organisation")
const providerOrm = require("../dbQuery/provider")
const {  isEmpty} = require("lodash")
const { refreshToken } = require("../controllers/Hubspot/credential.helper")
const {successMessages} = require("../helpers/messages");

async function auth(){
    let YOUR_ACCESS_TOKEN
    const token = await refreshToken()
    console.log(`!----Token Provided---!!!`,token)
    if(!isEmpty(token) && token.err) {
        YOUR_ACCESS_TOKEN = envConstants.ACCESS_TOKEN
    }else{
        YOUR_ACCESS_TOKEN = token.msg
    }
    console.log(`!----YOUR_ACCESS_TOKEN Provided---!!!`,YOUR_ACCESS_TOKEN)
    const hubspotClient = new hubspot.Client({
        accessToken: YOUR_ACCESS_TOKEN
    });
    return { hubspotClient }
}

async function getWebhookUrl() {
    const hubspotClient = new hubspot.Client({apiKey: envConstants.DEVELOPER_API_KEY});
    const appId = envConstants.APP_ID;
    if(!isEmpty(appId)){
        try {
            const apiResponse = await hubspotClient.webhooks.settingsApi.getAll(appId);
            console.log(`apiResponse`,JSON.stringify(apiResponse, null, 2));
            return { err: false, msg: apiResponse, val: successMessages.DATA_FETCHED }
        } catch (e) {
            const throttling = { "maxConcurrentRequests": 10, "period": "SECONDLY" };
            const SettingsChangeRequest = { targetUrl: envConstants.WEBHOOK_URL, throttling };
            const appId = envConstants.APP_ID;
            try {
                const apiResponse = await hubspotClient.webhooks.settingsApi.configure(appId, SettingsChangeRequest);
                return { err: false, msg: apiResponse, val: successMessages.DATA_CREATED }
            } catch (e) {
                return { err: true, msg: "Hubspot Error"}
            }
        }
    }else{
        return { err: true, msg: "App Id not found" }
    }
}


async function updateCompanyObj(companyId, properties){
    const idProperty = undefined;
    const { hubspotClient } =await auth()
    try {
        const apiResponse = await hubspotClient.crm.companies.basicApi.update(companyId, { properties }, idProperty);
        console.log(`Update Company--`,JSON.stringify(apiResponse, null, 2));
        return { err: false, msg: apiResponse }
    } catch (e) {
        e.message === 'HTTP request failed'
            ? console.error(JSON.stringify(e.response, null, 2))
            : console.error(e.message)
        return  { err: true, msg: e.message}
    }
}

async function updateContactObj(contactId, properties){
    const idProperty = undefined;
    try {
        const { hubspotClient } =await auth()
        const apiResponse = await hubspotClient.crm.contacts.basicApi.update(contactId, { properties }, idProperty);
        return { err: false, msg: apiResponse }
    } catch (e) {
        e.message === 'HTTP request failed'
            ? console.error(JSON.stringify(e.response, null, 2))
            : console.error(e.message)
        return  { err: true, msg: e.message}
    }
}


async function create(dataValue, orgId){
    const SimplePublicObjectInput = { properties: dataValue };
    const { hubspotClient } =await auth()
    try {
        const doSearch = await searchCompany("name", dataValue.name, hubspotClient, "company")
        if(doSearch.err) return doSearch
        const searchResult = doSearch.msg
        let apiResponse
        let companyId
        if(!isEmpty(searchResult)){
            companyId = searchResult[0].id
            apiResponse = await hubspotClient.crm.companies.basicApi.update(companyId, { properties: dataValue }, undefined);
        }else{
            apiResponse = await hubspotClient.crm.companies.basicApi.create(SimplePublicObjectInput);
            console.log(JSON.stringify(apiResponse, null, 2));
            companyId= apiResponse.id
        }
        if(!isEmpty(apiResponse)){
            await organisationOrm.findIdAndUpdate({ hubspotId: companyId}, orgId)
        }
        return { err: false, msg: apiResponse }
    } catch (e) {
        e.message === 'HTTP request failed'
            ? console.error(JSON.stringify(e.response, null, 2))
            : console.error(e.message)
        return { err: true, msg: e.message }
    }
}


async function getCustomFields(propertyName, objectType, all = false){
    const archived = false;
    const { hubspotClient } =await auth()
    try {
        let apiResponse
        if(all){
            apiResponse = await hubspotClient.crm.properties.coreApi.getAll(objectType, archived);
            apiResponse = apiResponse.results
        }else{
            apiResponse= await hubspotClient.crm.properties.coreApi.getByName(objectType, propertyName, archived);
        }
        return  { err: false, msg: apiResponse }
    } catch (e) {
        e.message === 'HTTP request failed'
            ? console.error(JSON.stringify(e.response, null, 2))
            : console.log(e.message)
        return { err: true, msg: e.message}
    }
}

async function createNewCustomFieldOnCompany(BatchInputPropertyCreate, objectType){
    try {
        const { hubspotClient } =await auth()
        if(!isEmpty(BatchInputPropertyCreate)){
            try {
                const apiResponse = await hubspotClient.crm.properties.batchApi.create(objectType, BatchInputPropertyCreate);
                console.log(JSON.stringify(apiResponse, null, 2));
            } catch (e) {
                e.message === 'HTTP request failed'
                    ? console.error(JSON.stringify(e.response, null, 2))
                    : console.error(e.message)
                return { err: true, msg: e.message}
            }
        }else{
            return { err: false, msg: [] }
        }
    } catch (err) {
        return  { err: true, msg: err }
    }
}

async function createContact(dataValue, contactId){
    try {
        const { hubspotClient } =await auth()
        const SimplePublicObjectInput = { properties: dataValue };
        try {
            const doSearch = await searchCompany("email", dataValue.email, hubspotClient, "contact")
            if(doSearch.err) return doSearch
            const searchResult = doSearch.msg
            let apiResponse
            let hubspotId
            if(!isEmpty(searchResult)){
                hubspotId = searchResult[0].id
                console.log(`##############I am in Update`, searchResult)
                apiResponse = await hubspotClient.crm.contacts.basicApi.update(hubspotId, { properties: dataValue }, undefined);
            }else{
                apiResponse = await hubspotClient.crm.contacts.basicApi.create(SimplePublicObjectInput);
                hubspotId= apiResponse["id"]
            }
            console.log(JSON.stringify(apiResponse, null, 2));
            if(!isEmpty(apiResponse)){
                await providerOrm.dynamicUpdateProvider("_id", contactId, { hubspotId: hubspotId })
            }
            return { err: false, msg: apiResponse }
        } catch (e) {
            e.message === 'HTTP request failed'
                ? console.error(JSON.stringify(e.response, null, 2))
                : console.error(e.message)
            return { err: true, msg: e.message }
        }
    } catch (err) {
        console.log(err)
    }
}

async function searchCompany(propertyName, value, hubspotClient, group){
    try {
        const PublicObjectSearchRequest = {
            filterGroups: [
                {"filters":[
                    {"value":value,"propertyName":propertyName,"operator":"EQ"}]}
            ]
        };
        if(group === "company"){
            const apiResponse = await hubspotClient.crm.companies.searchApi.doSearch(PublicObjectSearchRequest);
            return {
                err: false, msg: apiResponse.results
            }
        }else if(group === "contact"){
            const apiResponse = await hubspotClient.crm.contacts.searchApi.doSearch(PublicObjectSearchRequest);
            return {
                err: false, msg: apiResponse.results
            }
        }else{
            return { err: true, msg: "Wrong Search Called Pattern"}
        }
    } catch (e) {
        e.message === 'HTTP request failed'
            ? console.error(JSON.stringify(e.response, null, 2))
            : console.error(e.message)
        return { err: true, msg: e.message }
    }
}
module.exports = {
    create,
    createNewCustomFieldOnCompany,
    updateCompanyObj,
    getCustomFields,
    createContact,
    updateContactObj,
    getWebhookUrl
}

