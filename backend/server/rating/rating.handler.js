const Ratings = require("../models/rating");
const mongoose = require("mongoose");


async function addRatings(body){
    try{
        return  await Ratings.insertMany([body], {ordered: true});
    }catch (e) {
        throw e;
    }
}

async function getAllDocumentsCount(query){
    try{
        return await Ratings.find(query).count();
    }catch (e) {
        throw e;
    }
}

async function getRatingsByQuery(
    query, skip=0, limit=10, fields = {}, sort = {_id: -1}, populate=null){
    try{
        let items = [];
        if(populate){
            items = await Ratings.find(query, fields).skip(skip).limit(limit).sort(sort).populate(populate);
        }else{
            items = await Ratings.find(query, fields).skip(skip).limit(limit).sort(sort);
        }
        return items
    }catch (e){
        throw e;
    }
}

async function getRatingsObjByQuery(query, fields = {}, populate=null){
    try{
        let items = [];
        if(populate){
            items = await Ratings.findOne(query, fields).populate(populate);
        }else{
            items = await Ratings.findOne(query, fields);
        }
        return items
    }catch (e){
        throw e;
    }
}

async function getDistinctByQuery(query, distinctKey){
    try{
        let items = await Ratings.distinct(distinctKey, query);
        return items;
    }catch (e) {
        throw e;
    }
}

async function updateRatings(query, data){
    try{
        await Ratings.updateOne(query, data);
        return true;
    }catch (e) {
        throw e;
    }
}

async function deleteRatings(query){
    try{
        await Ratings.findOneAndDelete(query);
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
    getRatingsByQuery:getRatingsByQuery,
    getRatingsObjByQuery:getRatingsObjByQuery,
    getDistinctByQuery:getDistinctByQuery,
    updateRatings:updateRatings,
    deleteRatings: deleteRatings,
    convertObjectId: convertObjectId,
    addRatings: addRatings,
    getAllDocumentsCount: getAllDocumentsCount,
    getAggregateQuery: getAggregateQuery
};