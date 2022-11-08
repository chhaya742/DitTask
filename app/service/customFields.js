const knex=require("../../database/config")
const query= require("../../common/query");

// GetAll
const  getAll = async (product_id) => {
    return query.getbyId('bigcommercecustomfields',{"product_id":product_id},'');
}

// Create
const  createLocal = async (userData) => {
    return query.insert('bigcommercecustomfields', userData);
}

// Update
const  updateLocal = async (reqData,customField_id,product_id) => {
    return query.update('bigcommercecustomfields',reqData,{"id":customField_id},{"product_id":product_id});
}

// Delete
const  deleteLocal = async (customField_id,product_id) => {
    return query.Delete('bigcommercecustomfields',{"id":customField_id},{"product_id":product_id});
}
// Get By Id
const  getDataById = async (customField_id,product_id) => {
    return query.getbyId('bigcommercecustomfields',{"id":customField_id},{"product_id":product_id});
}

const customFieldService={ 
    getAll,
    createLocal,
    updateLocal,
    deleteLocal,
    getDataById
};
module.exports =customFieldService;
