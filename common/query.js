
const knex = require("../database/config");
require("../database/schema/notes");

const findAll = async (tableName, params) => {
    const data = await knex.select('*').from(tableName)
        .where('Title', 'like', `%${params.term}%`)
        .limit(params.limit).offset(params.page)
    // .toString()
    // console.log(data);
    return data
}

const insert = async (tableName, userData) => {
    // console.log(userData);
    const data = await knex(tableName).insert(userData)
    // .toString()
    // console.log(data);
    return data
}

const getbyId = async (tableName, id, productId) => {
    if (productId.product_id == '' || productId.product_id == undefined) {
        return await knex.select('*').from(tableName).where(id)
    } else {
        return await knex.select('*').from(tableName).where(id).andWhere(productId)
    }
}


const usergetbyId = async (tableName, id,) => {

    return await knex.select('*').from(tableName).where(id)

}

const login = async (tableName, email, pass) => {

    return await knex.select('*').from(tableName).where(email).andWhere(pass)

}

const update = async (tableName, userData, id, productId) => {
    if (productId == '' || productId == undefined) {
        await knex.update(userData).from(tableName).where(id)
    } else {
        return await knex.update(userData).from(tableName).where(id).andWhere(productId)
    }
}

const update1 = async (tableName, userData, id) => {
    return await knex.update(userData).from(tableName).where(id)
}
const Delete = async (tableName, id, productId) => {
    if (productId.product_id == '' || productId.product_id == undefined) {
        return await knex(tableName).where(id).delete()
    } else {
        return await knex(tableName).where(id).andWhere(productId).delete()
    }
}

const truncate = async (tableName, params) => {

    const data = await knex(tableName).truncate();
    return data

}
const query = {
    findAll,
    insert,
    getbyId,
    update,
    Delete,
    truncate,
    login,
    usergetbyId,
    update1
}


module.exports = query;