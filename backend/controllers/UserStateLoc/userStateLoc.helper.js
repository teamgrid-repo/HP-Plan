const { isEmpty, groupBy} = require("lodash")
const userStateLocOrm = require("../../dbQuery/userStateLoc")
const moment = require("moment");
const {usStates} = require("../../helpers/messages");

async function createUserStateLoc(data){
    try {
        const date = moment().utc()
        const { ipAddress, state, page } = data
        const findLoc = await userStateLocOrm.getAllStateLoc({ ipAddress, state, page,
            currDate: {
                $gte: moment(date).format("YYYY-MM-DD 00:00:00"),
                $lt: moment(date).format("YYYY-MM-DD 23:59:59")
            }
        })
        if(!isEmpty(findLoc)) return { err: true, msg: "Already Added"}
        const saveRecord = await userStateLocOrm.createStateLoc({
            ipAddress, state, page, currDate: date
        })
        const findRecord = await userStateLocOrm.getAllStateLoc({ _id: saveRecord["_id"] }, { createdAt:0, updatedAt: 0, __v: 0, currDate: 0 })
        return { err: false, msg: findRecord}
    } catch (err) {
        return { err: true, msg: err }
    }
}

async function getStatisticsOfStateLoc(){
    try {
        const states = {}
        const allLocation  = await userStateLocOrm.getAllStateLoc({}, { createdAt:0, updatedAt: 0, __v: 0, currDate: 0 })
        const groupByState = groupBy(allLocation,"state")
        for(let state of Object.keys(groupByState)){
            const stateArray = groupByState[state]
            const groupByPage = groupBy(stateArray, "page")
            const pages = {}
            for(let page of Object.keys(groupByPage)){
                const pageArr = groupByPage[page]
                pages[page] = pageArr.length
            }
            states[state] = pages
        }
        let usAllStates = Object.keys(states).filter(key=> usStates.includes(key)).reduce((obj, key) => {
            obj[key] = states[key];
            return obj;
        }, {});
        return { err: false, msg: states }
    } catch (err) {
        return { err: true, msg: err }
    }
}

module.exports = {
    createUserStateLoc,
    getStatisticsOfStateLoc
}