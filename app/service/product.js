
const query= require("../../common/query");

const  createLocal = async (userData) => {
    return query.insert('bigcommerceproduct', userData);
}
// Update
const  updateLocal = async (userData) => {
    return query.update('bigcommerceproduct', userData,{id:userData.id});
}
// GetAll
const  getAllProduct = async (page_q,limit_q,term) => {
    var params={
        page:page_q,
        limit:limit_q,
        term:term
    }
    // console.log(params);
    return query.findAll('bigcommerceproduct',params);
}

// Get By Id
const  getDataById = async (id) => {
    return query.getbyId('bigcommerceproduct',id);
}

const  deleteLocal = async (id) => {
    return query.Delete('bigcommerceproduct',id);
}

const productService={ 
    createLocal,
    updateLocal,
    getAllProduct,
    getDataById,
    deleteLocal
};
module.exports =productService;
