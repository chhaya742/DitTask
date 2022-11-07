
const knex= require("../database/config")

const findAll = async (tableName,params) => {
    const data= await knex.select('*').from(tableName)
    .where('name', 'like', `%${params.term}%`)
    .limit(params.limit).offset(params.page)
    // .toString()
    // console.log(data);
    return data
}

const insert = async (tableName, userData) => {
    const data= await knex(tableName).insert(userData)
    return data
}

const getbyId = async (tableName, condition) => {
    const data= await knex.select('*').from(tableName).where(condition)
    return data
     
}

const update = async (tableName, userData,id) => {
    const data= await knex.update(userData).from(tableName).where(id)
    // .toString();
    // console.log(data);
    return data

}


const Delete = async (tableName,id) => {
    const data= await knex(tableName).where({'id':id}).delete()
    // .toString()
    // console.log(data);
    return data

}
const truncate=async(tableName,params)=>{

    const data=await knex(tableName).truncate();
    return data
 
}
module.exports = { truncate,findAll, getbyId, insert, update, Delete}