const Jobs = require("../models/job");
const mongoose = require("mongoose");


async function addJobs(body){
    try{
        return  await Jobs.insertMany([body], {ordered: true});
    }catch (e) {
        throw e;
    }
}

async function getJobsByQuery(
    query, skip=0, limit=10, fields = {}, sort = {_id: -1}, populate=null){
    try{
        let items = [];
        if(populate){
            items = await Jobs.find(query, fields).skip(skip).limit(limit).sort(sort).populate(populate);
        }else{
            items = await Jobs.find(query, fields).skip(skip).limit(limit).sort(sort);
        }
        return items
    }catch (e){
        throw e;
    }
}

async function getJobsObjByQuery(query, fields = {}, populate=null){
    try{
        let items = [];
        if(populate){
            items = await Jobs.findOne(query, fields).populate(populate);
        }else{
            items = await Jobs.findOne(query, fields);
        }
        return items
    }catch (e){
        throw e;
    }
}

async function getDistinctByQuery(query, distinctKey){
    try{
        let items = await Jobs.distinct(distinctKey, query);
        return items;
    }catch (e) {
        throw e;
    }
}

async function updateJobs(query, data){
    try{
        await Jobs.updateOne(query, data);
        return true;
    }catch (e) {
        throw e;
    }
}

async function deleteJobs(query){
    try{
        await Jobs.findOneAndDelete(query);
        return true;
    }catch (e) {
        throw e;
    }
}

async function getAggregateQuery(query){
    try{
        return await Jobs.aggregate(query);
    }catch (e) {
        throw e;
    }
}

async function convertObjectId (id) {
    return new mongoose.Types.ObjectId(id);
  }

module.exports = {
    getJobsByQuery:getJobsByQuery,
    getJobsObjByQuery:getJobsObjByQuery,
    getDistinctByQuery:getDistinctByQuery,
    updateJobs:updateJobs,
    deleteJobs: deleteJobs,
    convertObjectId: convertObjectId,
    addJobs: addJobs,
    getAggregateQuery: getAggregateQuery
};