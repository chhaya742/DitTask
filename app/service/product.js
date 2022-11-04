
const {getbyId, findAll,insert,update,Delete} = require("../../common/query");

// Insert
// const studentService={
    // registerStudent:registerStudent,
    // updateStudent:updateStudent,
    // getStudentData:getStudentData,
    // getStudentDataById:getStudentDataById

// }
const  createLocal = async (userData) => {
    return insert('products', userData);
}
// Update
const  updateLocal = async (userData) => {
    return update('products', userData,{id:userData.id});
}
// GetAll
const  getAllProduct = async (page_q,limit_q,term) => {
    var params={
        page:page_q,
        limit:limit_q,
        term:term
    }
    // console.log(params);
    return findAll('products',params);
}

// Get By Id
const  getDataById = async (id) => {
    return getbyId('products',{id:id});
}

const  deleteLocal = async (id) => {
    return Delete('products',{id:id});
}
module.exports ={ createLocal,
    updateLocal,
    getAllProduct,
    getDataById,
    deleteLocal
};

