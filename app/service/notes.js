"use strict";
const query = require("../../common/query");

const createnotes = async (userData) => {
    // return query.insert('user', userData);
    var data = await query.insert('notes', userData);
    return data;
}


const updatenote = async (id,userData) => {
    var data =await query.update1('notes',userData, { "id": id});
    let result = await query.usergetbyId('notes', { "id": data});
    if (result) {
        return ({ status: true, statusCode: 200, messages: "update successfully", data: result });
    }else{ 
        return ({ status: false, statusCode: 403, messages: "Incorrect Email", data: [] })
    }
}

// GetAll
const getnoteList = async (page_q, limit_q, term) => {
    var params = {
        page: page_q,
        limit: limit_q,
        term: term
    }
    // console.log(params);
    return query.findAll('notes', params);
};

// Get By Id
const getUserById = async (id) => {
    return query.usergetbyId('user', { "id": id });
};

const deleteUser = async (id) => {
    return query.Delete('user', id);
};

const userService = {
    createnotes,
    updatenote,
    getnoteList,
    getUserById,
    deleteUser
};
module.exports = userService;
