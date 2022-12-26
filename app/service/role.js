"use strict";
const query = require("../../common/query");
const knex = require("../../database/config");

const creatRole = async (userData) => {
    // return query.insert('user', userData);
    var data = await query.insert('role', userData);
    return data;
}


const userService = {
    creatRole
};
module.exports = userService;
