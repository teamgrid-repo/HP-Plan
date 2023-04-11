const jwt = require('jsonwebtoken');
const SimpleCrypto = require('simple-crypto-js').default;
const crypto = require('crypto');
const { envConstants } = require('./constants');
const randomize = require('randomatic');
const moment = require('moment');

const { errorMessages, successMessages, requestType, status} = require('./messages');
const {isEmpty, find, pick, map} = require("lodash");
const organisationOrm = require("../dbQuery/organisation");
const siteOrm = require("../admin/dbQuery/site");
const siteSubCategoryOrm = require("../dbQuery/sitesSubcategory");
const dataApprovalOrm = require("../dbQuery/dataApproval")

exports.successResponse = (req, res, data, message = successMessages.OPERATION_COMPLETED, code = 200) => {
  res.status(code);
  res.send({
    code,
    success: true,
    message,
    data,
  });
};

exports.errorResponse = (req, res, message = errorMessages.SOMETHING_WENT_WRONG, code = 200) => {
  res.status(code);
  res.send({
    code,
    success: false,
    message,
    data: {},
  });
};

exports.generateJWTtoken = (object, secretKey = envConstants.SECRET) => jwt.sign(object, secretKey, { expiresIn: envConstants.JWT_TOKEN_EXPIRATION_TIME });

exports.decrypt = (text) => {
  const simpleCrypto = new SimpleCrypto(envConstants.ENCRYPTION_KEY);
  const plainText = simpleCrypto.decrypt(text);
  return plainText;
};

exports.encrypt = (text) => {
  const simpleCrypto = new SimpleCrypto(envConstants.ENCRYPTION_KEY);
  const chiperText = simpleCrypto.encrypt(text);
  return chiperText;
};

exports.comparePassword = (paramPass, dbPass) => {
  const password = crypto
    .createHash('md5')
    .update(paramPass)
    .digest('hex');
  if (password === dbPass) return true;
  return false;
};

exports.generateVerifyCode = function(pattern = '*') {
  let code = randomize(pattern, 10);
  let params = {
      code: code,
      updatedOn: moment().add(1,'days').format('YYYY-MM-DD HH:mm:ss'),
  };
  return params;
}

exports.checkingValidation = (params, requiredParams = [], allowedParams = [])=>{
  let failed = false;
  const invalidRequiredParams = [];
  const invalidAllowedParams = [];
  Object.keys(params).forEach((element)=>{
    if(!allowedParams.includes(element)){
      failed = true
      invalidAllowedParams.push(element);
    }
  })
  requiredParams.forEach((element)=>{
    if(!params[element]){
      failed= true
      invalidRequiredParams.push(element);
    }
  })
  const invalidString = {
    'Required parameters that are not provided': invalidRequiredParams || undefined,
    'Not allowed parameters that are provided': invalidAllowedParams || undefined,
  };
  return failed;
}

const subCatArray = {}
const catArray = {}
let storedTime = ''
exports.getCategoryAndSubCategory= (allSubCat, subIds)=>{
  const storeCat = {}
  const categories = []
  const currTime = moment().utc()
  for(let id of subIds){
    let subcategory
    if(!isEmpty(subCatArray[id]) && currTime.diff(sessionTime, 'minutes') < 3){ subcategory = subCatArray[id] }
    else{
      subcategory = find(allSubCat, (sub) => sub["_id"].toString() === id.toString() )
      if(!isEmpty(subcategory)){
        storedTime = moment().utc()
        subCatArray[id] = subcategory
        catArray[subcategory.category_id._id] = subcategory.category_id
      }
    }
    if(!isEmpty(subcategory)){
      const catId = subcategory.category_id._id
      if(!isEmpty(storeCat[catId])){ storeCat[catId] = [ ...[ subcategory ], ...storeCat[catId]]}
      else{ storeCat[catId] = [ subcategory ] }
    }
  }
  for(let catId of Object.keys(storeCat)){
    categories.push({
      category: pick(catArray[catId], ["_id", 'name', 'icon', 'weight']),
      subcategory: map(storeCat[catId], (font) => { return { ...pick(font, ["_id", "name"]), categoryId: font.category_id["_id"]} })})
  }
  return categories
}

let sessionOrg = []
let sessionSite = []
let sessionService = []
let sessionTime
exports.storeDataInSession= async (type)=>{
  const time = moment().utc()
  if(isEmpty(sessionOrg) || isEmpty(sessionService) || isEmpty(sessionSite) || isEmpty(sessionTime) || time.diff(sessionTime, 'minutes') > 3) {
    sessionTime = moment().utc()
    sessionOrg = await organisationOrm.getOrganisations()
    sessionSite = await siteOrm.getAllSite()
    sessionService = await siteSubCategoryOrm.filterDataOfSiteSubCategory({})
  }
  if(requestType.ORGANISATION === type){
    return sessionOrg
  }else if(requestType.SITE === type){
    return sessionSite
  } else if(requestType.SITE_SERVICE === type){
    return  sessionService
  }
}

exports.updateApproval = async (approvalId, func1, func2)=>{
  if(!isEmpty(approvalId)){
    const checkDataApproval = await dataApprovalOrm[func1]( { _id: approvalId, status: status.PENDING  })
    if(!isEmpty(checkDataApproval)){
      await dataApprovalOrm[func2](approvalId, { status: status.APPROVED })
      return true
    }
  }
  return false
}
