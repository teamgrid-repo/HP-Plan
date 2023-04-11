const { isEmpty } = require("lodash")
const teamListingOrm = require("../../dbQuery/teamListing")
const { fileUpload } = require("../../connection/s3_utils")

async function createNewTeam(data){
    try {
        const { name, description, job } = data;
        let link = ''
        if(!isEmpty(data["staffImage"])){
            const file = data["staffImage"]
            const uploadImage = await fileUpload(file, data.userId)
            if(isEmpty(uploadImage)) return { err: true, msg: "Error Found"}
            link = uploadImage
        }
        await teamListingOrm.createTeam({
            name, description, image: link, uploadBy: data.userId, job
        })
        return  { err: false, msg: [] , val: "Team Member is Successfully created"}
    }catch (err) {
        return { err: true, msg: err }
    }
}

async function getAllTeam(){
    try {
        const getAllTeam = await teamListingOrm.getAllTeam({}, { name: 1, description: 1, image: 1, job: 1 })
        return { err: false, msg: getAllTeam, val: "Successfully Done" }
    } catch (err ){
        return { err: true, msg: err }
    }
}

async function updateTeamList(teamId, data){
    try {
        const findTeam = await teamListingOrm.getAllTeam({ _id: teamId })
        if(isEmpty(findTeam)) return { err: true, msg: "Send Me Valid Id for Updating"}
        if(!isEmpty(data["staffImage"])){
            const file = data["staffImage"]
            const uploadImage = await fileUpload(file, data.userId)
            if(isEmpty(uploadImage)) return { err: true, msg: "Error Found"}
            data.image = uploadImage
        }
        await teamListingOrm.updateTeam(teamId, data)
        const updatedData = await teamListingOrm.getAllTeam({ _id: teamId })
        return { err: false, msg: updatedData, val: "Successfully Updated the Staff List" }
    } catch (err) {
        return { err: true, msg: err }
    }
}

async function deleteTeamListing(teamId){
    try {
        const findTeam = await teamListingOrm.getAllTeam({ _id: teamId })
        if(isEmpty(findTeam)) return { err: true, msg: "Send Me Valid Id for Deleting"}
        await teamListingOrm.deleteTeam(teamId)
        return { err: false, msg: [], val: "Successfully Deleted"}
    }catch (err) {
        return { err: true, msg: err }
    }
}

module.exports = {
    createNewTeam,
    getAllTeam,
    updateTeamList,
    deleteTeamListing
}