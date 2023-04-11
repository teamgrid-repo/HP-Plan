const saveSearchesOrm = require("../../dbQuery/saveSearches")
const {isEmpty} = require("lodash");
const {successMessages, errorMessages} = require("../../helpers/messages");

async function createSaveSearches(data){
    try {
        const savedListingSearches = await saveSearchesOrm.createSaveSearches(data);
        return { err: false, msg: savedListingSearches }
    } catch (err) {
        return { err: true, msg: err };
    }
}

async function getAllSaveSearches(data){
    try {
        const { userId } = data
        let searchData;
        if(data.all){
            searchData = await saveSearchesOrm.getAllSaveSearches(userId);
        }else if(data.update){
            const { name, updatedName } = data;
            if(isEmpty(name)) return { err: true, msg: "old name not found"}
            if(isEmpty(updatedName)) return { err: true, msg: "updatedName not found"};
            if(name === updatedName) return { err: true, msg: "name and updatedName both are same"}
            const checkNameValidation = await saveSearchesOrm.findSaveSearchesData({ name });
            if(isEmpty(checkNameValidation)) return  { err: true, msg: errorMessages.NO_DATA_FOUND }
            const id = checkNameValidation[0]._id
            await saveSearchesOrm.updatedSaveSearches(id, { name: updatedName });
            searchData = await saveSearchesOrm.getAllSaveSearchesById(id)
        }else if(!isEmpty(data.id)){
            searchData = await saveSearchesOrm.getAllSaveSearchesById(data.id)
        }else{
            searchData = []
        }
        return { err: false, msg: searchData };
    } catch (err){
        return { err: true, msg: err };
    }
}

async function deleteSaveSearchesById(id){
    try {
        const data = await saveSearchesOrm.deleteSaveSearchesById(id);
        if(isEmpty(data)){
            return { err: false, msg: `Id not found`}
        }
        return { err: false, msg: successMessages.SEARCHES_DELETED }
    } catch (err) {
        return { err: true, msg: err };
    }
}

async function deleteSaveSearchedByUserId(userId){
    try {
        const findAllSearchByUserId = await saveSearchesOrm.findSaveSearchesData({ userId })
        for(let search of findAllSearchByUserId){
            const deleteSearch = await deleteSaveSearchesById(search["_id"]);
            if(!isEmpty(deleteSearch) && deleteSearch.err) return deleteSearch
        }
        return { err: false, msg: [], val: successMessages.SEARCHES_DELETED }
    } catch (err){
        return { err: true, msg: err };
    }
}

module.exports = {
    createSaveSearches,
    getAllSaveSearches,
    deleteSaveSearchesById,
    deleteSaveSearchedByUserId
}