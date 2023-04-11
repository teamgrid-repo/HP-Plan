const subCategoryHelper = require("../../helpers/messages");
const cureSubCategoryOrm = require("../../dbQuery/cureCategory");
const specialQualificationOrm = require("../../dbQuery/specialQualification")
const {isEmpty, groupBy } = require("lodash");

async function createSpecialQualification(data){
    try {
        const { PREGNANCY_HELP, WOMEN_MEDICAL_SERVICES, FINANCIAL_ASSISTANCE, EDU_OPPORTUNITIES, HOUSING_SHELTERS,
            ADDICTIVE, INTIMATE_PARTNER_VIOLATION, COUNSELLING_FOR_WOMEN, ADOPTION_SERVICES, FOSTER } = subCategoryHelper.cureSubCategories;
        const data = [PREGNANCY_HELP, WOMEN_MEDICAL_SERVICES, FINANCIAL_ASSISTANCE, EDU_OPPORTUNITIES, HOUSING_SHELTERS,
            ADDICTIVE, INTIMATE_PARTNER_VIOLATION, COUNSELLING_FOR_WOMEN, ADOPTION_SERVICES, FOSTER];
        const cureSubCategories = await cureSubCategoryOrm.findAllSubCategory(data);
        for(let cureSubCategory of cureSubCategories){
            if(cureSubCategory["name"] === PREGNANCY_HELP){
                await checkedSpecialQualifiAlreadyExist(["Offer ultrasound"], cureSubCategory["_id"])
            }
            else if(cureSubCategory["name"] === WOMEN_MEDICAL_SERVICES){
                await checkedSpecialQualifiAlreadyExist(["Offers prenatal care"], cureSubCategory["_id"])
            }
            else if(cureSubCategory["name"] === FINANCIAL_ASSISTANCE){
                await checkedSpecialQualifiAlreadyExist(["Financial assistance","Financial education"], cureSubCategory["_id"])
            }
            else if(cureSubCategory["name"] === EDU_OPPORTUNITIES){
                await checkedSpecialQualifiAlreadyExist(["Offers life-skills education","Offers academic education"], cureSubCategory["_id"])
            }
            else if(cureSubCategory["name"] === HOUSING_SHELTERS){
                await checkedSpecialQualifiAlreadyExist(["Houses pregnant women", "Houses women with children", "Houses minors"], cureSubCategory["_id"])
            }
            else if(cureSubCategory["name"] === ADDICTIVE){
                await checkedSpecialQualifiAlreadyExist(["Houses Pregnant Women","Houses Women with Children","Houses Minors"], cureSubCategory["_id"])
            }
            else if(cureSubCategory["name"] === INTIMATE_PARTNER_VIOLATION){
                await checkedSpecialQualifiAlreadyExist(["Houses Pregnant Women","Houses Women with Children","Houses Minors"], cureSubCategory["_id"])
            }
            else if(cureSubCategory["name"] === COUNSELLING_FOR_WOMEN){
                await checkedSpecialQualifiAlreadyExist(["Offers licensed counseling","Ministry/Lay counseling"], cureSubCategory["_id"])
            }
            else if(cureSubCategory["name"] === ADOPTION_SERVICES){
                await checkedSpecialQualifiAlreadyExist(["Biological parent support","Adoptive family support"], cureSubCategory["_id"])
            }
            else if(cureSubCategory["name"] === FOSTER){
                await checkedSpecialQualifiAlreadyExist(["Biological parent support","Foster family support"], cureSubCategory["_id"])
            }
        }
        return { err: false, msg: cureSubCategories}
    } catch (err) {
        return { err: true, msg: err}
    }
}


async function getSpecialQualification(){
    try {
        const data=[]
        let generalisedSpecialQual = await specialQualificationOrm.dynamicSpecialQualification({
            generalised: true
        }, { name: 1, subCategoryId: 1 });
        if(isEmpty(generalisedSpecialQual)){
            await createSpecialQualification();
            generalisedSpecialQual = await specialQualificationOrm.dynamicSpecialQualification({
                generalised: true
            }, { name: 1, subCategoryId: 1 });
        }
        const other = await specialQualificationOrm.dynamicSpecialQualification({
            generalised: false
        }, { name: 1, userId: 1, subCategoryId: 1})
        console.log(`!!------GENERALISED QUALIFICATION --!!${JSON.stringify(generalisedSpecialQual)}`);
        const groupByCureSubCategory = groupBy(generalisedSpecialQual, "subCategoryId");
        const groupByOther = groupBy(other, "subCategoryId")
        const cureSubcategories = await cureSubCategoryOrm.getSubcategoryById(Object.keys(groupByCureSubCategory));
        for(let cure of cureSubcategories){
            data.push({
                name: cure["name"], _id: cure["_id"],
                specialQualification: groupByCureSubCategory[cure["_id"]],
                other: groupByOther[cure["_id"]] || []
            })
        }
        return { err: false, msg: data };
    } catch (err) {
        return{ err: true, msg: err};
    }
}

async function checkedSpecialQualifiAlreadyExist(names = [], subCategoryId){
    try {
        for(let name of names){
            const checkedExisting = await specialQualificationOrm.getSpecialQualificationByName(name, subCategoryId);
            if(!isEmpty(checkedExisting)) continue;
            await specialQualificationOrm.createSpecialQualification({
                name, subCategoryId, generalised: true
            })
        }
    } catch (err) {
        return { err: true, msg: err}
    }
}



module.exports = {
    getSpecialQualification,
    createSpecialQualification

}
