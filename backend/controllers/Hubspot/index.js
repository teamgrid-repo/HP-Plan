const cureCategoryOrm = require("../../dbQuery/cureCategory")
const { isEmpty, find, map, groupBy, uniq} = require("lodash")
const hubspotCrm = require("../../connection/hubspot")
const {enumeration, cureCategories, cureSubCategories, string, leadStatus, specialQualification } = require("../../helpers/messages");
const organisationOrm = require("../../dbQuery/organisation")

function cureSubCategoriesSameAsHubspot(subCat){
    switch (subCat){
        case cureSubCategories.PREGNANCY_HELP: return "Pregnancy Help and Case Management"
        case cureSubCategories.WOMEN_MEDICAL_SERVICES: return "Women's Health Medical Services"
        case cureSubCategories.SUPPORT_SERVICE_FOR_WOMEN: return "Women’s Health Support Services"
        case cureSubCategories.HEALTH_SERVICES: return "General Health Services"
        case cureSubCategories.FINANCIAL_ASSISTANCE: return "Financial Assistance"
        case cureSubCategories.WORK_OPPORTUNITY: return "Work Opportunities"
        case cureSubCategories.EDU_OPPORTUNITIES: return "Education Opportunities"
        case cureSubCategories.TRANSPORTATION: return "Transportation"
        case cureSubCategories.FOOD_AND_NUTRITION: return "Food and Nutrition"
        case cureSubCategories.HOUSEHOLD_SERVICES: return "Clothing, Household Goods, and Baby Supplies"
        case cureSubCategories.HOUSING_SHELTERS: return "Housing, Shelters, and Maternity Homes"
        case cureSubCategories.LEGAL_SUPPORT: return "Legal Support"
        case cureSubCategories.ADDICTIVE: return "Addiction or Suicide Intervention"
        case cureSubCategories.INTIMATE_PARTNER_VIOLATION: return "Intimate Partner Violence, Rape, Assault, or Sex Trafficking"
        case cureSubCategories.COUNSELLING_FOR_WOMEN: return "Counseling for Women and Families"
        case cureSubCategories.ABORTION_RECOVERY: return "Abortion Recovery and Healing"
        case cureSubCategories.DISABILITY_SUPPORT: return "Disability Support Organizations"
        case cureSubCategories.MEDICAL_INTERVENTION: return "Medical Interventions for Baby"
        case cureSubCategories.PERINATAL_HOSPICE: return "Perinatal Hospice Resources"
        case cureSubCategories.PREGNANCY_LOSS_SUPPORT: return "Pregnancy and Infant Loss Support"
        case cureSubCategories.CHILDCARE_HELP: return "Childcare Help"
        case cureSubCategories.CHILDREN_HEALTH_CARE: return "Children's Healthcare"
        case cureSubCategories.PARENTING_EDU: return "Family and Parenting Education"
        case cureSubCategories.ADOPTION_SERVICES: return "Adoption Services"
        case cureSubCategories.FOSTER: return "Foster and Short-Term Care"
        default: return ""
    }
}

function cureCategoriesSameAsHubspot(cat){
    switch (cat){
        case cureCategories.MENTORSHIP.weight: return "Forming Her PLAN"
        case cureCategories.HEALTH_AND_WELL_BEING.weight: return "Her Health and Well-Being"
        case cureCategories.FINANCIAL_ASSISTANCE_WORK_OR_EDUCATION.weight: return "Financial Assistance, Work, or Education"
        case cureCategories.MATERIAL_OR_LEGAL_SUPPORT.weight: return "Material or Legal Support"
        case cureCategories.RECOVERY_AND_MENTAL_HEALTH.weight: return "Recovery and Mental Health"
        case cureCategories.PRENATAL_DIAGNOSIS.weight: return "Prenatal or Perinatal Diagnosis"
        case cureCategories.CARE_FOR_CHILDREN.weight: return "Care for Children"
        default: return ""
    }
}

function specialQualificationSameAsHubspot(sQualif){
    switch (sQualif){
        case specialQualification.OFFER_ULTRASOUND: return "1.1 Offers ultrasounds"
        case specialQualification.PRENATAL_CARE: return "2.1 Offers prenatal care"
        case specialQualification.FINANCIAL_ASSISTANCE: return "3.1 Financial assistance"
        case specialQualification.FINANCIAL_EDUCATION: return "3.1 Financial education"
        case specialQualification.LIFE_SKILL_EDU: return "3.3 Offers life-skills education"
        case specialQualification.HOUSE_MINORS: return "4.4 Housing - accepts women under age 18"
        case specialQualification.HOUSE_PREGNANT_WOMEN: return "4.4 Accepts Pregnant Women (no other children)"
        case specialQualification.ACADEMIC_EDUCATION: return "3.3 Offers academic education"
        case specialQualification.HOUSE_WOMEN_WITH_CHILDREN: return "5.1 Houses Women with Children"
        case specialQualification.LICENSED_COUNSELLING: return "5.3 Offers licensed counseling"
        case specialQualification.MINISTRY_COUNSELLING: return "5.3 Ministry/Peer Counseling"
        case specialQualification.ADOPTIVE_FAMILY_SUPPORT: return "7.4 Adoptive family support"
        case specialQualification.BIO_PARENT_SUPPORT: return "7.5 Biological parent support"
        case specialQualification.FOSTER_FAMILY_SUPPORT: return "7.5 Foster parent support"
        default: return ""
        /*case specialQualification.ACADEMIC_EDUCATION: return "7.4 Biological parent support"
        case specialQualification.ACADEMIC_EDUCATION: return "Houses Pregnant Women"
        case specialQualification.ACADEMIC_EDUCATION: return "5.1/5.2 Accepts Parenting (not pregnant) Women with Child(ren)"
        case specialQualification.ACADEMIC_EDUCATION: return "5.1 Houses Pregnant Women"
        case specialQualification.ACADEMIC_EDUCATION: return "4.4 Accepts Parenting (not pregnant) Women with Child(ren)"
        case specialQualification.ACADEMIC_EDUCATION: return "5.1 Houses Minors"
       */
    }
}

function leadStatusInHubSpot(status){
    switch (status){
        case leadStatus.GENERAL_BY_ANALYST: return "OPEN"
        case leadStatus.STATE_COORDINATOR: return "IN_PROGRESS"
        case leadStatus.PROSPECTING: return "1.3 PHC"
        case leadStatus.PERSONAL_STATE_COORDINATOR: return "1.4 State Coordinator - New Contacts"
        case leadStatus.LIFE_MAIN_NETWORK: return "4 - Ready to publish!"
        case leadStatus.GAP_ADDITIONAL_NETWORK: return "4.2 - Ready for Gap Filler Proofing - Additional"
        case leadStatus.PRO_LIFE_MAIN_NETWORK: return "Ph5 Published - Main"
        case leadStatus.PUBLIC_ADDITIONAL_NETWORK: return "Ph5 Published - Gap"
        case leadStatus.MAIN_NETWORK: return "Ph4 HubSpot Manual Export"
        case leadStatus.ADDITIONAL_GAP: return "Ph4 HubSpot Manual Export - Gap"
    }
}

async function createCustomField(){
    try {
        const createBatched = [];
        const allCompanyProperty = await hubspotCrm.getCustomFields("", "company", true)
        if(!isEmpty(allCompanyProperty) && allCompanyProperty.err) return { err: true, msg: [] }
        const companyProperties = allCompanyProperty.msg
        let categoryNotFound = true
        let subcategoryNotFound = true;
        let orgTypeNotFound = true;
        let orgSubType = true;
        let sourceOfFindingNotFound = true
        let geoSpanNotFound = true
        let emailNotFound = true
        let complianceComplete = true
        for(let property of companyProperties){
            if(property.name === "category_of_care") categoryNotFound = false
            if(property.name === "sub_category_name") subcategoryNotFound = false
            if(property.name === "org_type") orgTypeNotFound = false
            if(property.name === "org_sub_type") orgSubType = false
            if(property.name === "discovery_source") sourceOfFindingNotFound = false
            if(property.name === "geospan") geoSpanNotFound = false
            if(property.name === "email") emailNotFound = false
            if(property.name === "hs_lead_status") complianceComplete = false
        }
        if(categoryNotFound){ createBatched.push({ ...enumeration, name: "category_of_care", label: "Category Of Care", options: map(Object.keys(cureCategories), (cate, index)=>
            {
                const data = cureCategories[cate]
                return { label: data.name, description: data.description, value: data.name, displayOrder: index, hidden: false }}
            )})}
        //const getSubCategory = await hubspotCrm.getCustomFields("sub_category_name", "company");
        if(subcategoryNotFound){ createBatched.push({ ...enumeration, name: "sub_category_name", label: "Sub-Category Care", options: map(Object.keys(cureSubCategories), (subCate, index)=>
            {
                const data = cureSubCategories[subCate]
                return { label: data, description: "", value: data, displayOrder: index, hidden: false }
            })
        })}
        if(orgTypeNotFound){ createBatched.push({ ...string, name: "org_type", label: "Org Type", description: "Organisation Type", groupName: "companyinformation"})}
        if(geoSpanNotFound){ createBatched.push({...string, name: "geospan", label: "GeoSpan", description: "Search Link State", groupName: "companyinformation"})}
        // const BatchInputPropertyCreate = { inputs: createBatched };
        // const objectType = "company";
        // if(!isEmpty(createBatched)){
        //     const customField = await hubspotCrm.createNewCustomFieldOnCompany(BatchInputPropertyCreate, objectType);
        //     return { err: false, msg: customField }
        // }
        return { err: false, msg: [] }
    }catch (err){
        return { err: true, msg: err }
    }
}

async function format(data){
    try {
        const { category, subcategory, email, name} = data;
        const hubspotBody = {
            name,org_email:email,
            domain: data.website,
            phone: data.contact || "",
            city: data.city || "",
            website: data.altWebsite|| "",
            state: data.state || "",
            description: data.about|| "",
            zip: data.zipcode || "",
            address: data.address || "",
            hs_lead_status: leadStatusInHubSpot(data.leadStatus)
        }
        if(!isEmpty(data["sourceOfFinding"])) hubspotBody.discovery_source= data["sourceOfFinding"] || ""
        const cureCategory = await cureCategoryOrm.findAllCategories()
        const cureSubCategory = await cureCategoryOrm.getSubcategoryByIds(subcategory);
        let categoryS = "";
        let subCategoryS = ""
        if(!isEmpty(category) && !isEmpty(data.subcategory)){
            for(let cat of category){
                const findCategory = await find(cureCategory, (c)=> c._id.toString() === cat.toString());
                const categoryOption = cureCategoriesSameAsHubspot(findCategory["weight"])
                if(!isEmpty(categoryOption)) categoryS += `${categoryOption};`
            }
            for(let subCat of cureSubCategory){
                const subCatOption = cureSubCategoriesSameAsHubspot(subCat["originalName"])
                if(!isEmpty(subCatOption)) subCategoryS += `${subCatOption};`
            }
        }
        hubspotBody.category_of_care = categoryS;
        hubspotBody.sub_category_name = subCategoryS;
        let orgType=""
        if(!isEmpty(data.orgType)){
            for(let org of data.orgType) orgType += `${org};`
        }
        hubspotBody.org_type = orgType
        let geoSpan = ""
        if(!isEmpty(data.geospan)){
            const geoSpanInHubspot = await hubspotCrm.getCustomFields("geospan", "company");
            const allGeoSpan = Object.keys(groupBy(geoSpanInHubspot.msg.options, 'value'))
            for(let geo of data.geospan) {
                if(allGeoSpan.includes(geo)) geoSpan += `${geo};`
            }
        }
        hubspotBody.geospan = geoSpan;
        let prices = ''
        if(!isEmpty(data.price)){
            for(let price of data.price) prices += `${price};`
        }
        hubspotBody.price = prices;
        let freeText = ''
        if(!isEmpty(data.sQFreeText)){
            for(let freeTxt of data.sQFreeText) freeText += `${freeTxt};`
        }
        hubspotBody.restrictions_or_denomination = freeText

        let sQFilter = ''
        for(let sq of uniq(data.specialSQ)) {
            if(!isEmpty(specialQualificationSameAsHubspot(sq))) sQFilter += `${specialQualificationSameAsHubspot(sq)};`
        }
        hubspotBody.special_qualification_filters = sQFilter

        let priceFilter= ''
        if(!isEmpty(data.price)){
            for(let pr of data.price){
                if(!isEmpty(pr)) priceFilter += `${pr};`
            }
        }
        hubspotBody.price = priceFilter
        let leafFilter = ''
        if(!isEmpty(data.leaf)){
            for(let lef of data.leaf) leafFilter += `${lef};`
        }
        hubspotBody.leaf_status = leafFilter
        let sourceOfFinding = ''
        if(!isEmpty(data.sourceOfFindingName)){
            sourceOfFinding = data.sourceOfFindingName
        }
        hubspotBody.discovery_source = sourceOfFinding
        return { err: false, msg: hubspotBody }
    } catch (err) {
        return { err: true, msg: err }
    }
}

async function pushContactDataToHubspot(providerData, orgHubspotId){
    try {
        if(isEmpty(orgHubspotId)){ return { err: true, msg: "Organisation Hubspot Id is required"} }
        for(let provider of providerData){
            const { contact, email, firstName, lastName, jobTitle, hubspotId, name } = provider
            const isNew = isEmpty(hubspotId)
            const properties = { associatedcompanyid: orgHubspotId ||null, email: email, firstname: firstName, lastname: lastName, phone: contact, jobtitle: jobTitle, "contact_salutation_anything_name_want_here_": name }
            if(isNew){
                const createContact = await hubspotCrm.createContact(properties, provider["_id"]);
                if(!isEmpty(createContact) && createContact.err) continue;
            }else{
                const contact = await hubspotCrm.updateContactObj(hubspotId, properties);
                const parse = JSON.parse(JSON.stringify(contact.msg))
                if(!isEmpty(contact) && contact.err) continue;
            }
        }
        return { err: false, msg: []}
    } catch (err) {
        return { err: true, msg: err }
    }
}


async function createAndUpdateHubspotCompany(isNew, orgId, data){
    try {
        const result = await format(data);
        const hubspotBody = result.msg
        let hubSpotId
        let company
        if(isNew){
            company = await hubspotCrm.create(hubspotBody, orgId["_id"])
            if(!isEmpty(company) && company.err) return { err: true, msg: "Something went wrong in HUBSPOT"}
            hubSpotId = company.msg.id
        }else{
            hubSpotId = orgId["hubspotId"];
            if(isEmpty(hubSpotId)) return { err: false, msg: "Hubspot Id Is Required"}
            company = await hubspotCrm.updateCompanyObj(hubSpotId, hubspotBody)
            if(!isEmpty(company)&& company.err) return { err: true, msg: "Something went wrong in HUBSPOT"}
        }
        if(!isEmpty(orgId["providerInfo"])){
            const contactPush = await pushContactDataToHubspot(orgId["providerInfo"], hubSpotId)
            if(!isEmpty(contactPush) && contactPush.err) return contactPush;
        }
        return company
    }catch (err) {
        return { err: true, msg: err }
    }
}



module.exports = {
    createAndUpdateHubspotCompany
}
