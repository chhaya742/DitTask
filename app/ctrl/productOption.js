const { truncate, insert } = require("../../common/query");
const { getDataById, getAllProduct, createLocal, updateLocal, deleteLocal } = require('../service/product')
const options = require('../../bigCommerce')
var axios = require("axios");


const getProductOptionList = (req, res) => {
    axios.request(options.productOptionUrl('GET',req.params.id, [])).then(function (response) {
        // console.log(response.data);
        res.send({ status: true, statusCode: 200, messages: "get successfully", data: response.data })
    }).catch(function (error) {
        console.error(error);
        res.send({ status: false, statusCode: 404, messages: error, data: [] })
    });
}


const getProductOptionByID = (req, res) => {
    // console.log(req.query.productId,req.query.optionId);
    const params={productId:req.query.productId,optionId:req.query.optionId}
    axios.request(options.productOptionByIdUrl('GET', params, [])).then(function (response) {
        // console.log(response.data);
        res.send({ status: true, statusCode: 200, messages: "get successfully", data: response.data })
    }).catch(function (error) {
        // console.error(error);
        res.send({ status: false, statusCode: 404, messages: error, data: [] })
    });
}

const createProductOptionLive = (req, res) => {
    axios.request(options.productOptionUrl('POST', req.params.id, req.body)).then(function (response) {
        // console.log(response.data);
        res.json({ status: true, statusCode: 200, messages: "Created successfully", data: response.data })
    }).catch(function (error) {
        console.log(error);
        res.json(error.message)
    });
};


const updateProductOptionLive = (req, res) => {
    const params={productId:req.body.productId,optionId:req.params.optionId}
    axios.request(options.productOptionByIdUrl('PUT', params, req.body)).then(function (response) {
        // console.log(response.data);
        res.json({ status: true, statusCode: 200, messages: "Update successfully", data: response.data })
    }).catch(function (error) {
        console.log(error);
        res.json(error.message)
    });
};


const deleteProductOptionLive=(req,res)=>{
   
    const params={productId:req.query.productId,optionId:req.query.optionId}
    axios.request(options.productOptionByIdUrl('PUT', params, req.body)).then(function (response) {
        // console.log(response.data);
        res.json({ status: true, statusCode: 200, messages: "delete successfully", data: response.data })
    }).catch(function (error) {
        console.log(error);
        res.json(error.message)
    });

}
const productOptionCtrl={
    getProductOptionList,
    createProductOptionLive,
    getProductOptionByID,
    updateProductOptionLive,
    deleteProductOptionLive}
module.exports=productOptionCtrl