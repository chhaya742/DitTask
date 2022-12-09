
const query= require("../../common/query");

const  createUser = async (userData) => {
    return query.insert('user', userData);
}


const  loginuser= async (userData) => {
    console.log(userData.Email);
    return query.login('user', {"Email":userData.Email},{"password":userData.password});
}

// Update
const  updateUser = async (userData) => {
    return query.update('user', userData,{id:userData.id});
}
// GetAll
const  getAllUsers = async (page_q,limit_q,term) => {
    var params={
        page:page_q,
        limit:limit_q,
        term:term
    }
    // console.log(params);
    return query.findAll('user',params);
}

// Get By Id
const  getUserById = async (id) => {
    return query.usergetbyId('user',{"id":id});
}

const  deleteUser= async (id) => {
    return query.Delete('user',id);
}

const userService={ 
    createUser,
    loginuser,
    updateUser,
    getAllUsers,
    getUserById,
    deleteUser
};
module.exports =userService;
