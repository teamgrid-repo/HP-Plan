const {envConstants} = require("./constants");

exports.successMessages = {
  DATA_FETCHED: 'Data fetched.',
  DATA_DELETED: 'Data deleted.',
  DATA_UPDATED: 'Data updated.',
  DATA_CREATED: "Data created.",
  OPERATION_COMPLETED: 'Operation completed.',
  REGISTRATION_DONE: 'Thank you, your registration is complete.',
  LOGGED_IN: 'You have been logged in.',
  PASSWORD_CHANGED:'Your password has been changed.',
  EMAIL_SEND: 'Your email has been sent.',
  QUIZ_FETCHED: 'Quiz fetched.',
  QUIZ_CREATED: 'Quiz created.',
  QUIZ_DELETED: 'Quiz deleted.',
  QUIZZ_SAVED: 'Quiz saved.',
  APPOINTMENT_BOOKED: 'Your appointment has been booked.',
  APPOINTMENT_STATUS_UPDATED: 'Appointment status updated.',
    APPOINTMENT_DELETED: "Your appointment has been deleted.",
    SEARCHLINK_CREATED: 'Search link created.',
  APPOINTMENT_UPDATED: 'Appointment status updated.',
  DOCTOR_CREATED: 'Doctor created successfully..!',
  SITE_CREATED: 'Site created successfully..!',
  ADMINCONTACT_CREATED:'Admin contact created successfully..!',
  USER_SAVED: 'User has been saved.',
  USER_FETCH: 'User Fetch Successfully',
  USER_DELETED: 'User has been removed.',
    PROFILE_UPDATED: 'Your profile has been updated.',
    PROFILE_CREATED: 'Profile created',
    PROFILE_FETCHED: 'Profile fetched',
    PROFILE_DELETED :'Profile Deleted',
    CMS_UPDATED: "Successfully Updated",
    CONTACT_FETCHED: "Contacts Successfully Fetched",
    CONTACT_DELETED: "Contacts Successfully Deleted",
    CURE_CATEGORY_FETCHED: "Category & Subcategory fetched",
    CURE_CATEGORY_DELETED: "Category & Subcategory deleted.",
    PROVIDER_UPDATED: "Provider details updated.",
    PROVIDER_CREATED: "A new provider has been created.",
    PROVIDER_DELETED: "Provider details deleted.",
    PROVIDER_FETCHED: "Provider fetched.",
    SITE_UPDATED: "Site details updated.",
    SITE_DELETED: "Site deleted.",
    SITE_FETCHED: "Site fetched.",
    LISTING_UPDATED: "Saved list updated.",
    LISTING_DELETED: "Saved list deleted.",
    LISTING_FETCHED: "Saved list fetched",
    LISTING_CREATED: "A new list has been created.",
    SEARCHES_UPDATED: "Saved search updated.",
    SEARCHES_DELETED: "Saved search deleted.",
    SEARCHES_FETCHED: "Saved Search Fetched Successfully",
    CLAIM_CREATED: "This claim has been registered.",
    CLAIM_UPDATED: "Claim details updated.",
    FEEDBACK_UPDATED: "Feedback updated.",
    FEEDBACK_DELETED: "Feedback deleted",
    FEEDBACK_FETCHED: "Feedback fetched",
    FEEDBACK_CREATED: "Thank you! Your feedback has been submitted. ",
    SAVED_UPDATED: "Client Updated Successfully",
    SAVED_DELETED: "Client Deleted Successfully",
    SAVED_FETCHED: "Feedback Fetched Successfully",
    ORGANISATION_UPDATED: "Organization details updated.",
    ORGANISATION_CREATED: "Organization created.",
    APPROVAL_CREATED: "Your approval request has been sent to the admin.",
    PROFILE_PIC_UPDATED: "Your profile details have been updated.",
    ACCOUNT_FREEZE: "Account has been freeze successfully",
    POC_PROVIDER_DELETED: "Poc Provider Deleted",
    SHIFT_PROVIDER: "This provider has been shifted."
};

exports.errorMessages = {
  TOKEN_EXPIRED: 'Session expired. Please log in.',
  USER_NOT_EXIST: 'This user does not exist.',
  USER_CONVERTED_TO_GHOST: "This user is converted to ghost user. Please contact to herPlan Admin",
  NO_TOKEN_PROVIDED: 'No token provided.',
  USER_ACC_DISABLED: 'This user account is disabled.',
  SOMETHING_WENT_WRONG: 'Error.',
  INVALID_UNAME_PWORD: 'Invalid username/password.',
  INVALID_PWORD: 'Invalid password.',
  INVALID_PARAMS: 'Invalid parameters.',
  YOU_ARE_NOT_AUTHORIZED: 'You are not authorized to access this route.',
  TOO_MANY_REQUESTS: 'Too many requests from this IP, please try again after 15 Minutes',
  CORS_BLOCK: 'Not allowed by CORS!',
  USER_ALREADY_EXIST: 'This account already exists.',
  SIGNUP_TOKEN: 'token not found',
  QUESTION_ALREADY_EXISTS: 'question already exists',
  NO_DATA_FOUND: 'NO Data Found',
  NO_CODE_FOUND: 'No code found.',
  GENERAL_USER_NOT_FOUND:'General User Not Found',
  DOCTOR_NOT_FOUND:'Doctor Not Found',
  ENTER_ONE_ID:'entre one id at a time',
  ID_NOT_FOUND: 'Id and Values not found',
  INVALID_PHONE:'Invalid phone number',
    NOT_FOUND: 'not found..!!',
    HUBSPOT: "Something went wrong in HUBSPOT",
    ORGANISATION_ALREADY_EXIST: "Organisation is already exists",
};


exports.signUpType = {
  WEB: 'web',
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
  APPLE: 'apple',
}

exports.cureCategories = {
    MENTORSHIP: {
        name: 'MENTORSHIP',
        description: "Find pregnancy centers, ultrasounds, and accompaniment groups like Embrace Grace and Gabriel Project here",
        weight: 1,
        icon: "https://herplan-development.s3.amazonaws.com/cureCategory/image6.png"},
    HEALTH_AND_WELL_BEING: {
        name: 'HEALTH AND WELL-BEING',
        description: "Find OB/GYNs, fertility instructors, doulas, midwives, clinics, primary care providers, and dentists here.",
        weight: 2,
        icon: "https://herplan-development.s3.amazonaws.com/cureCategory/image2.png"},
    FINANCIAL_ASSISTANCE_WORK_OR_EDUCATION: {
        name: 'FINANCIAL ASSISTANCE, WORK, OR EDUCATION',
        description: "Find benevolence ministries, financial educators, job training providers, life-skills education, and tutors here.",
        weight: 3,
        icon: "https://herplan-development.s3.amazonaws.com/cureCategory/image5.png"},
    MATERIAL_OR_LEGAL_SUPPORT: {
        name: 'MATERIAL OR LEGAL SUPPORT',
        description: 'Find transportation and car repair, food banks, clothing closets, thrift stores, housing and housing information and repair, and attorneys and legal aid clinics here',
        weight: 4,
        icon: "https://herplan-development.s3.amazonaws.com/cureCategory/image3.png"},
    RECOVERY_AND_MENTAL_HEALTH: {
        name: 'RECOVERY AND MENTAL HEALTH',
        description: 'Find recovery support groups, professional counselors, ministerial counseling, and specialized housing programs here.',
        weight: 5,
        icon: "https://herplan-development.s3.amazonaws.com/cureCategory/image1.png"},
    PRENATAL_DIAGNOSIS: {
        name: 'PRENATAL DIAGNOSIS',
        description: 'Find peer support groups, special-needs friendly programs, specialized medical professionals, and baby remembrance ministries here.',
        weight: 6,
        icon: "https://herplan-development.s3.amazonaws.com/cureCategory/image4.png"},
    CARE_FOR_CHILDREN: {
        name: 'CARE FOR CHILDREN',
        description: 'Find daycare, pediatrics, parenting classes, adoption providers, and foster care support here.',
        weight: 7,
        icon: "https://herplan-development.s3.amazonaws.com/cureCategory/image.png"}
}

exports.cureSubCategories = {
    PREGNANCY_HELP: 'Pregnancy help and case management',
    WOMEN_MEDICAL_SERVICES: "Women's medical services",
    SUPPORT_SERVICE_FOR_WOMEN: 'Support services for women',
    HEALTH_SERVICES: 'General health services',
    FINANCIAL_ASSISTANCE: 'Financial assistance',
    WORK_OPPORTUNITY: 'Work opportunities',
    EDU_OPPORTUNITIES: 'Education opportunities',
    TRANSPORTATION: 'Transportation',
    FOOD_AND_NUTRITION: 'Food and Nutrition',
    HOUSEHOLD_SERVICES: 'Clothing, household goods, and baby supplies',
    HOUSING_SHELTERS: 'Housing, shelters, and maternity homes',
    LEGAL_SUPPORT: 'Legal support',
    ADDICTIVE: 'Addiction or suicide intervention',
    INTIMATE_PARTNER_VIOLATION: 'Intimate partner violence, sexual assault, or sex trafficking',
    COUNSELLING_FOR_WOMEN: 'Counseling for women and families',
    ABORTION_RECOVERY: 'Abortion recovery and healing',
    DISABILITY_SUPPORT: 'Disability support organizations',
    MEDICAL_INTERVENTION: 'Medical interventions for baby',
    PERINATAL_HOSPICE: 'Perinatal hospice resources',
    PREGNANCY_LOSS_SUPPORT: 'Pregnancy and infant loss support',
    CHILDCARE_HELP: 'Childcare help',
    CHILDREN_HEALTH_CARE: "Children's health care",
    PARENTING_EDU: 'Family and parenting education',
    ADOPTION_SERVICES: 'Adoption services',
    FOSTER:'Foster and short-term care'//Foster and short-term care care
}

exports.status = {
    APPROVED: "approved",
    PENDING: "pending",
    CANCELLED: "cancelled",
}

exports.identity = {
    ADMIN: 'admin',
    MAIN_PROVIDER: 'main_provider',
    SUB_USER_PROVIDER: 'subUser_provider',
    PROVIDER: 'provider',
    GENERAL_USER: 'user',
    AUTOMATIC: "automatic"
}

exports.providerType = {
    SYSTEM_PROVIDER : 'system',
    CLAIM_PROVIDER: 'claim',
    NEW_REGISTER_PROVIDER: 'new_registration',
    POC: 'poc',
    GENERAL_USER: 'user',
}

exports.method = {
    CREATE: "create",
    UPDATE: "update",
    DELETE: "delete"
}

exports.requestType = {
    SITE: "site",
    ORGANISATION: "organisation",
    PROVIDER_SUBUSER: "subUser",
    SITE_SERVICE : 'siteService'
}

exports.enumeration = {
    "groupName":"companyinformation",
    "hidden":false,
    "displayOrder":2,
    "hasUniqueValue":false,
    "type":"enumeration",
    "fieldType":"checkbox",
    "formField":true,
}

exports.string = {
    "name": "another_example_property",
    "label": "Another Example Property",
    "description": "Another property being created as an example.",
    "groupName": "companyinformation",
    "type": "string",
    "fieldType": "text"
}

exports.cms = {
    ABOUT: 'about',
    HOME: 'home',
}

exports.leadStatus = {
    GENERAL_BY_ANALYST: 'Ph1.1 Prospecting - General by Analyst',
    STATE_COORDINATOR: "Ph1.2 Prospecting - Custom by State Coordinator",
    PROSPECTING: "Ph1.3 PHC Prospecting",
    PERSONAL_STATE_COORDINATOR: "Ph1.4 Prospecting - Personal by State Coordinator",
    MAIN_NETWORK: "Ph4 Publish Export Sent – Public Pro-life Main Network",
    ADDITIONAL_GAP: 'Ph4 Publish Export Sent – Public Gap/Additional Network',
    LIFE_MAIN_NETWORK: "Ph4 Publish Sent - Public Pro-life Main Network",
    GAP_ADDITIONAL_NETWORK: 'Ph4 Publish Sent - Public Gap/Additional Network',
    PRO_LIFE_MAIN_NETWORK: 'Ph5 Published - Public Pro-life Main Network',
    PUBLIC_ADDITIONAL_NETWORK: "Ph5 Published - Public Gap/Additional Network"
}

exports.messageLink = {
    LOGIN: `${envConstants.websiteUrl}login`,
    REGISTER: `${envConstants.websiteUrl}register`,
    MESSAGE: `${envConstants.websiteUrl}message/xyz`,
    APPOINTMENTS: `${envConstants.websiteUrl}my-appointments`
}

exports.specialQualification = {
    OFFER_ULTRASOUND: "Offer ultrasound",
    PRENATAL_CARE: "Offers prenatal care",
    FINANCIAL_ASSISTANCE: "Financial assistance",
    FINANCIAL_EDUCATION: "Financial education",
    LIFE_SKILL_EDU: "Offers life-skills education",
    ACADEMIC_EDUCATION: 'Offers academic education',
    HOUSE_PREGNANT_WOMEN: "Houses Pregnant Women",
    HOUSE_WOMEN_WITH_CHILDREN: "Houses Women with Children",
    HOUSE_MINORS:"Houses Minors",
    LICENSED_COUNSELLING: "Offers licensed counseling",
    MINISTRY_COUNSELLING: "Ministry/Lay counseling",
    BIO_PARENT_SUPPORT: "Biological parent support",
    ADOPTIVE_FAMILY_SUPPORT: "Adoptive family support",
    FOSTER_FAMILY_SUPPORT: "Foster family support"
}

exports.getPriceDetailsLikeHubspot = (price)=>{
    switch (price){
        case "Discounted,Negotiable-rates": return "Discounts"
        case "Market": return "Market"
        case "Sliding-fee-scale": return "Sliding scale"
        case "Medicaid": return "Accepts Medicaid"
        case "Free": return "Free"
        default: return ""
    }
}

exports.getLeafStatusLikeHubspot = (leaf = []) => {
    const n = leaf.length
    if( n > 1){
        return ["Pending - Likely Leaf", "Pending - Likely NO Leaf"]
    }else{
        if(leaf[0] === "yes") return ["Confirmed Leaf"]
        else return ["Confirmed NO Leaf"]
    }
}


exports.usStates = ["AL","AK","AZ","AR", "CA","CZ","CO","CT","DE","DC","FL","GA","GU","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OR","PA","RI","SC","SD","TN","TX","UT","VT","VI","VA","WA","WV","WI","WY"]