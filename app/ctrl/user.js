'use strict'
const userService = require('../service/user')

//  user CRUD on local
const getUserbyId = (req, res) => {
    userService.getUserById(req.params.id).then((data) => {
        res.json({ status: true, statusCode: 200, messages: "get successfully", data: data })
    }).catch((err) => {
        res.json({ status: false, statusCode: 404, messages: err.sqlMessage, data: [] })
    })
};

const createUser = (req, res) => {
    console.log(req.body);
    userService.createUser(req.body).then((data) => {
        if(data){
            
            res.cookie("user", data[1].token);
            res.json({ status: true, statusCode: 200, messages: "Created successfully", data: data });
        }
    }).catch((err) => {
        res.json({ status: false, statusCode: 404, messages: err.sqlMessage, data: [] })
    });
};

const loginUser = (req, res) => {
    userService.loginuser(req.body).then((data) => {
        if (data != undefined && data.data) {
            res.cookie("user", data.data.token)
            res.json(data);
        } else {
            res.send(data);
        }
    }).catch((err) => {
        res.json({ status: false, statusCode: 404, messages: err.sqlMessage, data: [] })
    });
}

const updateUser = (req, res) => {
    // console.log(req.body);
    userService.updateLocal(req.body).then((data) => {
        res.json({ status: true, statusCode: 200, messages: "updated successfully", data: data })
    }).catch((err) => {
        res.json({ status: false, statusCode: 404, messages: err.sqlMessage, data: [] })
    })
}

const getallUsers = (req, res) => {
    let page_q = req.query.page
    let limit_q = req.query.limit
    let query_string = req.query.query_string
    term = "%" + query_string + "%";
    // console.log(term);
    if (page_q && limit_q) {
        page_q = parseInt(page_q)
        limit_q = parseInt(limit_q)
        page_q = (page_q * limit_q - limit_q)
    }
    else {
        page_q = 0
        limit_q = 50
    }
    userService.getAllProduct(page_q, limit_q, term).then((data) => {
        res.json({ status: true, statusCode: 200, messages: "get successfully", data: data })
    }).catch((err) => {
        res.json({ status: false, statusCode: 404, messages: err.sqlMessage, data: [] })
    })
};

const deleteUser = (req, res) => {
    userService.deleteLocal(req.params.id).then((data) => {
        res.json({ status: true, statusCode: 200, messages: "delete successfully", data: data })
    }).catch((err) => {
        res.json({ status: false, statusCode: 404, messages: err.sqlMessage, data: [] })
    })
};

const userLogout=(req,res)=>{
    res.clearCookie("user")
    res.json({message:"logout success"})
}

const userCtrl = {
    getUserbyId,
    createUser,
    updateUser,
    getallUsers,
    deleteUser,
    loginUser,
    userLogout
}
module.exports = { userCtrl };
