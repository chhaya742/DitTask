const query= require("../../common/query");

// GetAll
const  getAll = async (product_id) => {
    return query.getbyId('bigcommerceproductoption',{"product_id":product_id},'');
}

// Create
const  createLocal = async (userData) => {
    return query.insert('bigcommerceproductoption', userData);
}

// Update
const  updateLocal = async (reqData,product_id,optionId) => {
    return query.update('bigcommerceproductoption',reqData,{"id":optionId},{"product_id":product_id});
}

// Delete
const  deleteLocal = async (product_id,optionId) => {
    return query.Delete('bigcommerceproductoption',{"id":optionId},{"product_id":product_id});
}
// Get By Id
const  getDataById = async (optionId,product_id) => {
    return query.getbyId('bigcommerceproductoption',{"id":optionId},{"product_id":product_id});
}

const productOptionService={ 
    getAll,
    createLocal,
    updateLocal,
    deleteLocal,
    getDataById
};
module.exports =productOptionService;
