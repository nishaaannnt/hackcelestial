const Announcements = require("../models/announcements");
const mongoose = require("mongoose");

async function addAnnouncement(body){
    try{
        return  await Announcements.insertMany([body], {ordered: true});
    }catch (e) {
        throw e;
    }
}

async function getAllDocumentsCount(query){
    try{
        return await Announcements.find(query).count();
    }catch (e) {
        throw e;
    }
}

async function getAnnouncementByQuery(
    query, skip=0, limit=10, fields = {}, sort = {_id: -1}, populate=null){
    try{
        let items = [];
        if(populate){
            items = await Announcements.find(query, fields).skip(skip).limit(limit).sort(sort).populate(populate);
        }else{
            items = await Announcements.find(query, fields).skip(skip).limit(limit).sort(sort);
        }
        return items
    }catch (e){
        throw e;
    }
}

async function getAnnouncementObjByQuery(query, fields = {}, populate=null){
    try{
        let items = [];
        if(populate){
            items = await Announcements.findOne(query, fields).populate(populate);
        }else{
            items = await Announcements.findOne(query, fields);
        }
        return items
    }catch (e){
        throw e;
    }
}

async function getDistinctByQuery(query, distinctKey){
    try{
        let items = await Announcements.distinct(distinctKey, query);
        return items;
    }catch (e) {
        throw e;
    }
}

async function updateAnnouncements(query, data){
    try{
        await Announcements.updateOne(query, data);
        return true;
    }catch (e) {
        throw e;
    }
}

async function updateManyAnnouncements(query, data, extra={}){
    try{
        await Announcements.updateMany(query, data, extra);
        return true;
    }catch (e) {
        throw e;
    }
}

async function deleteAnnouncements(query){
    try{
        await Announcements.findOneAndDelete(query);
        return true;
    }catch (e) {
        throw e;
    }
}

async function getAggregateQuery(query){
    try{
        return await Announcements.aggregate(query);
    }catch (e) {
        throw e;
    }
}

async function convertObjectId (id) {
    return new mongoose.Types.ObjectId(id);
  }

module.exports = {
    getAnnouncementByQuery: getAnnouncementByQuery,
    getAnnouncementObjByQuery: getAnnouncementObjByQuery,
    getDistinctByQuery: getDistinctByQuery,
    updateAnnouncements: updateAnnouncements,
    updateManyAnnouncements: updateManyAnnouncements,
    deleteAnnouncements: deleteAnnouncements,
    convertObjectId: convertObjectId,
    getAggregateQuery: getAggregateQuery,
    addAnnouncement: addAnnouncement,
    getAllDocumentsCount: getAllDocumentsCount
};