const Users = require("../models/user");
const mongoose = require("mongoose");


async function addUser(body){
    try{
        return  await Users.insertMany([body], {ordered: true});
    }catch (e) {
        throw e;
    }
}

async function getUserByQuery(
    query, skip=0, limit=10, fields = {}, sort = {_id: -1}, populate=null){
    try{
        let items = [];
        if(populate){
            items = await Users.find(query, fields).skip(skip).limit(limit).sort(sort).populate(populate);
        }else{
            items = await Users.find(query, fields).skip(skip).limit(limit).sort(sort);
        }
        return items
    }catch (e){
        throw e;
    }
}

async function getUserObjByQuery(query, fields = {}, populate=null){
    try{
        let items = [];
        if(populate){
            items = await Users.findOne(query, fields).populate(populate);
        }else{
            items = await Users.findOne(query, fields);
        }
        return items
    }catch (e){
        throw e;
    }
}

async function getDistinctByQuery(query, distinctKey){
    try{
        let items = await Users.distinct(distinctKey, query);
        return items;
    }catch (e) {
        throw e;
    }
}

async function updateUsers(query, data){
    try{
        await Users.updateOne(query, data);
        return true;
    }catch (e) {
        throw e;
    }
}

async function deleteUser(query){
    try{
        await Users.findOneAndDelete(query);
        return true;
    }catch (e) {
        throw e;
    }
}

async function convertObjectId (id) {
    return new mongoose.Types.ObjectId(id);
  }

module.exports = {
    getUserByQuery:getUserByQuery,
    getUserObjByQuery:getUserObjByQuery,
    getDistinctByQuery:getDistinctByQuery,
    updateUsers:updateUsers,
    deleteUser: deleteUser,
    convertObjectId: convertObjectId,
    addUser: addUser
};