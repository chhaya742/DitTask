const { truncate, insert } = require("../../common/query");
const productService = require('../service/product')
const options = require('../../bigCommerce')
var axios = require("axios");
//  product CRUD on local
const getProductByIdLocal = (req, res) => {
    productService.getDataById(req.params.id).then((data) => {
        res.json({ status: true, statusCode: 200, messages: "get successfully", data: data })
    }).catch((err) => {
        res.json({ status: false, statusCode: 404, messages: err.sqlMessage, data: [] })
    })
};

const createProductLocal = (req, res) => {
    // console.log(req.body);
    productService.createLocal(req.body).then((data) => {
        res.json({ status: true, statusCode: 200, messages: "Created successfully", data: data })
    }).catch((err) => {
        res.json({ status: false, statusCode: 404, messages: err.sqlMessage, data: [] })
    })
};

const updateProductLocal = (req, res) => {
    // console.log(req.body);
    productService.updateLocal(req.body).then((data) => {
        res.json({ status: true, statusCode: 200, messages: "updated successfully", data: data })
    }).catch((err) => {
        res.json({ status: false, statusCode: 404, messages: err.sqlMessage, data: [] })
    })
}

const getProductsLocal = (req, res) => {
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
    productService.getAllProduct(page_q, limit_q, term).then((data) => {
        res.json({ status: true, statusCode: 200, messages: "get successfully", data: data })
    }).catch((err) => {
        res.json({ status: false, statusCode: 404, messages: err.sqlMessage, data: [] })
    })
};

const deleteProductLocal = (req, res) => {
    productService.deleteLocal(req.params.id).then((data) => {
        res.json({ status: true, statusCode: 200, messages: "delete successfully", data: data })
    }).catch((err) => {
        res.json({ status: false, statusCode: 404, messages: err.sqlMessage, data: [] })
    })
};

// create bigCommerce Product CRUD
const getDataFromAPi = (req, res) => {
    axios.request(options.productUrl('GET', '', [])).then(function (response) {
        for (i in response.data.data) {
            for (j in response.data.data[i]) {
                if (typeof (response.data.data[i][j]) == 'object') {
                    response.data.data[i][j] = JSON.stringify(response.data.data[i][j])
                    //  console.log(response.data.data[i][j]);
                }
            }
        }
        truncate('bigcommerceproduct')
        insert('bigcommerceproduct', response.data.data)
        // console.log(response.data.data);
        res.send({ status: true, statusCode: 200, messages: "get successfully", data: response.data })
    }).catch(function (error) {
        // console.error(error);
        res.send({ status: false, statusCode: 404, messages: error, data: [] })
    });

}

const createProductLive = (req, res) => {
    axios.request(options.productUrl('POST', '', req.body)).then(function (response) {
        // console.log(response.data);
        res.json({ status: true, statusCode: 200, messages: "Created successfully", data: response.data })
    }).catch(function (error) {
        console.log(error);
        res.json(error.message)
    });
};


const getProductByIdLive = (req, res) => {
    axios.request(options.productUrl('GET', `/${req.params.id}`, [])).then(function (response) {
        // console.log(response.data);
        res.send({ status: true, statusCode: 200, messages: "get successfully", data: response.data })
    }).catch(function (error) {
        console.error(error);
        res.send({ status: false, statusCode: 404, messages: error, data: [] })
    });
}


const deleteProductLive = (req, res) => {
    axios.request(options.productUrl('DELETE', `?id:in=${req.body.id}`, [])).then(function (response) {
        res.send({ status: true, statusCode: 200, messages: "delete successfully", data: response.data })
        // console.log(response.data);
    }).catch(function (error) {
        console.error(error);
        res.send(error)
    });

}

const updateProductLive = (req, res) => {
    axios.request(options.productUrl('PUT',`/${req.params.id}`,req.body)).then(function (response) {
        res.send({ status: true, statusCode: 200, messages: "update successfully", data: response.data })
    }).catch(function (error) {
        console.log(error)
        res.send(error)

    });

}

const bigCProductCtrl ={
    createProductLive,
    deleteProductLive,
    getProductByIdLive, 
    getDataFromAPi, 
    updateProductLive 
}
const localProductCtrl ={
    getProductsLocal, 
    updateProductLocal, 
    createProductLocal, 
    getProductByIdLocal, 
    deleteProductLocal }
module.exports = { bigCProductCtrl, localProductCtrl }
