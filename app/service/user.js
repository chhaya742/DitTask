"use strict";
const query = require("../../common/query");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");


const createUser = async (userData) => {
    const token = sign({ password: userData.password }, "chhayabagwan", { expiresIn: "6h" })
    // return query.insert('user', userData);
    var data = await query.insert('user', userData);
    data.push({token:token})
    return data;
}


const loginuser = async (userData) => {
    var data = await query.usergetbyId('user', { "Email": userData.Email });
    let result = Object.values(JSON.parse(JSON.stringify(data)))[0];
    if (result) {
        if (result.password == userData.password) {
            const token = sign({ password: result.password }, "chhayabagwan", { expiresIn: "6h" });
            result["token"] = token;
            return ({ status: true, statusCode: 200, messages: "login successfully", data: result });
        } else {
            return ({ status: false, statusCode: 403, messages: "Incorrect password", data: [] });
        }
    } else {
        return ({ status: false, statusCode: 403, messages: "Incorrect Email", data: [] })
    }
}

// Update
const updateuser = async (userData) => {
    return query.update1('user', userData, { id: userData.id });
}
// GetAll
const getAllUsers = async (page_q, limit_q, term) => {
    var params = {
        page: page_q,
        limit: limit_q,
        term: term
    }
    // console.log(params);
    return query.findAll('user', params);
};

// Get By Id
const getUserById = async (id) => {
    return query.usergetbyId('user', { "id": id });
};

const deleteUser = async (id) => {
    return query.Delete('user', id);
};

const userService = {
    createUser,
    loginuser,
    updateuser,
    getAllUsers,
    getUserById,
    deleteUser
};
module.exports = userService;
