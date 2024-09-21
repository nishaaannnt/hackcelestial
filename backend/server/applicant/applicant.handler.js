const JobApplicant = require("../models/jobApplicant");
const mongoose = require("mongoose");

async function addApplicant(body){
    try{
        return  await JobApplicant.insertMany([body], {ordered: true});
    }catch (e) {
        throw e;
    }
}

async function getApplicantByQuery(
    query, skip=0, limit=10, fields = {}, sort = {_id: -1}, populate=null){
    try{
        let items = [];
        if(populate){
            items = await JobApplicant.find(query, fields).skip(skip).limit(limit).sort(sort).populate(populate);
        }else{
            items = await JobApplicant.find(query, fields).skip(skip).limit(limit).sort(sort);
        }
        return items
    }catch (e){
        throw e;
    }
}

async function getApplicantObjByQuery(query, fields = {}, populate=null){
    try{
        let items = [];
        if(populate){
            items = await JobApplicant.findOne(query, fields).populate(populate);
        }else{
            items = await JobApplicant.findOne(query, fields);
        }
        return items
    }catch (e){
        throw e;
    }
}

async function getDistinctByQuery(query, distinctKey){
    try{
        let items = await JobApplicant.distinct(distinctKey, query);
        return items;
    }catch (e) {
        throw e;
    }
}

async function updateJobApplicant(query, data){
    try{
        await JobApplicant.updateOne(query, data);
        return true;
    }catch (e) {
        throw e;
    }
}

async function deleteJobApplicant(query){
    try{
        await JobApplicant.findOneAndDelete(query);
        return true;
    }catch (e) {
        throw e;
    }
}


async function getAggregateQuery(query){
    try{
        return await JobApplicant.aggregate(query);
    }catch (e) {
        throw e;
    }
}

async function convertObjectId (id) {
    return new mongoose.Types.ObjectId(id);
  }

module.exports = {
    getApplicantByQuery:getApplicantByQuery,
    getApplicantObjByQuery:getApplicantObjByQuery,
    getDistinctByQuery:getDistinctByQuery,
    updateJobApplicant:updateJobApplicant,
    deleteJobApplicant: deleteJobApplicant,
    convertObjectId: convertObjectId,
    getAggregateQuery: getAggregateQuery,
    addApplicant: addApplicant
};