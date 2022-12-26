"use strict";
const query = require("../../common/query");
const knex = require("../../database/config");

const creatRole = async (userData) => {
    // return query.insert('user', userData);
    var data = await query.insert('role', userData);
    return data;
}

const getrole=async(id)=>{
    let data=await query.getbyId('role',{id:id},'');
    return data;
}

const userService = {
    creatRole,getrole
};
module.exports = userService;
