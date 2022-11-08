const query = require("../../common/query");

// GetAll
const  getAll = async (page_q,limit_q,term) => {
    var params={
        page:page_q,
        limit:limit_q,
        term:term
    }
    // console.log(params);
    return query.findAll('bigcommercecategory',params);
}
// Create
const  createLocal = async (userData) => {
    return query.insert('bigcommercecategory', userData);
}
// Update
const  updateLocal = async (userData,id) => {
    return query.update('bigcommercecategory', userData,{id:id});
}

// Delete
const  deleteLocal = async (id) => {
    return query.Delete('bigcommercecategory',id);
}
// Get By Id
const  getDataById = async (id) => {
    return query.getbyId('bigcommercecategory',{'id':id},'')
}

const categoryService={ 
    getAll,
    createLocal,
    updateLocal,
    deleteLocal,
    getDataById
};
module.exports =categoryService;
