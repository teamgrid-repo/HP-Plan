exports.validateRegistration = {
  allowedParams: ['name', 'email', 'role', 'password', 'status','address','city','state','location','type','socialToken','fcmToken', "userState",
  "dob", "contact", "gender", "religion", "occupation", "maritalStatus","firstName","lastName","howYouHeard","jobTitle","orgName","zipcode","hippa","acceptTerms","optShareData", "subRole"],
  requiredParams: ['name', 'email', 'type'],
};

exports.validateLogin = {
  allowedParams: ['email', 'password','type','socialToken','fcmToken'],
  get requiredParams() {
    return this.allowedParams;
  },
};
 exports.validateVerifyForgotPassword={
   allowedParams:['code','password'],
   requiredParams:['code','password']
 }

 exports.validateChangePassword={
  allowedParams:['_id','currentPassword','password'],
  requiredParams:['_id','currentPassword','password']
}

exports.additionalResource = {
     allowedParams: ["name", "firstName","image", "makeAccountPrimary", "userId", "contact","organisationId","lastName","howYouHeard","jobTitle","hippaChat","hippa","email","isPoc","staticPocId"],
     requiredParams: ["name", "firstName", "userId","lastName","jobTitle"]
}
