const Recruiter = require("../models/recruiter");
const mongoose = require("mongoose");

async function addRecruiter(body){
    try{
        return  await Recruiter.insertMany([body], {ordered: true});
    }catch (e) {
        throw e;
    }
}

async function getRecruiterByQuery(
    query, skip=0, limit=10, fields = {}, sort = {_id: -1}, populate=null){
    try{
        let items = [];
        if(populate){
            items = await Recruiter.find(query, fields).skip(skip).limit(limit).sort(sort).populate(populate);
        }else{
            items = await Recruiter.find(query, fields).skip(skip).limit(limit).sort(sort);
        }
        return items
    }catch (e){
        throw e;
    }
}

async function getRecruiterObjByQuery(query, fields = {}, populate=null){
    try{
        let items = [];
        if(populate){
            items = await Recruiter.findOne(query, fields).populate(populate);
        }else{
            items = await Recruiter.findOne(query, fields);
        }
        return items
    }catch (e){
        throw e;
    }
}

async function getDistinctByQuery(query, distinctKey){
    try{
        let items = await Recruiter.distinct(distinctKey, query);
        return items;
    }catch (e) {
        throw e;
    }
}

async function updateRecruiter(query, data){
    try{
        await Recruiter.updateOne(query, data);
        return true;
    }catch (e) {
        throw e;
    }
}

async function deleteRecruiter(query){
    try{
        await Recruiter.findOneAndDelete(query);
        return true;
    }catch (e) {
        throw e;
    }
}

async function convertObjectId (id) {
    return new mongoose.Types.ObjectId(id);
  }

module.exports = {
    addRecruiter: addRecruiter,
    getRecruiterByQuery: getRecruiterByQuery,
    getRecruiterObjByQuery: getRecruiterObjByQuery,
    getDistinctByQuery: getDistinctByQuery,
    updateRecruiter:updateRecruiter,
    deleteRecruiter: deleteRecruiter,
    convertObjectId: convertObjectId
};