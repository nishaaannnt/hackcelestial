const Applications = require("../models/applications");
const mongoose = require("mongoose");

async function addApplication(body){
    try{
        return  await Applications.insertMany([body], {ordered: true});
    }catch (e) {
        throw e;
    }
}

async function getAllDocumentsCount(query){
    try{
        return await Sellers.find(query).count();
    }catch (e) {
        throw e;
    }
}

async function getApplicationByQuery(
    query, skip=0, limit=10, fields = {}, sort = {_id: -1}, populate=null,collation=null){
    try{
        let items = [];
        if(populate){
            items = await Applications.find(query, fields).skip(skip).limit(limit).sort(sort).populate(populate);
        }else if(collation){
            items = await Applications.find(query, fields).skip(skip).limit(limit).sort(sort).collation(collation);
        }
        return items
    }catch (e){
        throw e;
    }
}

async function getApplicationObjByQuery(query, fields = {}, populate=null){
    try{
        let items = [];
        if(populate){
            items = await Applications.findOne(query, fields).populate(populate);
        }else{
            items = await Applications.findOne(query, fields);
        }
        return items
    }catch (e){
        throw e;
    }
}

async function getDistinctByQuery(query, distinctKey){
    try{
        let items = await Applications.distinct(distinctKey, query);
        return items;
    }catch (e) {
        throw e;
    }
}

async function updateApplications(query, data){
    try{
        await Applications.updateOne(query, data);
        return true;
    }catch (e) {
        throw e;
    }
}

async function updateManyApplications(query, data, extra={}){
    try{
        await Applications.updateMany(query, data, extra);
        return true;
    }catch (e) {
        throw e;
    }
}

async function deleteApplications(query){
    try{
        await Applications.findOneAndDelete(query);
        return true;
    }catch (e) {
        throw e;
    }
}


async function getAggregateQuery(query){
    try{
        return await Applications.aggregate(query);
    }catch (e) {
        throw e;
    }
}

async function convertObjectId (id) {
    return new mongoose.Types.ObjectId(id);
  }

module.exports = {
    getApplicationByQuery:getApplicationByQuery,
    getApplicationObjByQuery:getApplicationObjByQuery,
    getDistinctByQuery:getDistinctByQuery,
    updateApplications:updateApplications,
    updateManyApplications:updateManyApplications,
    deleteApplications: deleteApplications,
    convertObjectId: convertObjectId,
    getAggregateQuery: getAggregateQuery,
    addApplication: addApplication,
    getAllDocumentsCount: getAllDocumentsCount
};