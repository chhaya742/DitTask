
const knex = require("../database/config")

const findAll = async (tableName, params) => {
    const data = await knex.select('*').from(tableName)
        .where('name', 'like', `%${params.term}%`)
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

const update = async (tableName, userData, id,productId) => {
    if (productId == '' || productId == undefined) {
        await knex.update(userData).from(tableName).where(id)
    } else {
        return await knex.update(userData).from(tableName).where(id).andWhere(productId)
    }
}

const Delete = async (tableName, id,productId) => {
    if (productId.product_id == '' || productId.product_id == undefined) {
        return  await knex(tableName).where( id ).delete()
    } else {
        return await knex(tableName).where( id ).andWhere(productId).delete()
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
    truncate
}


module.exports = query;