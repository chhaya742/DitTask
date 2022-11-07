const {truncate,insert,Delete} = require("../../common/query");

const options=require('../../bigCommerce');
var axios = require("axios");
const { response } = require("express");



// create bigCommerce customfields CRUD

const getcustomFieldsFromAPi=(req,res)=>{
    axios.request(options.customFieldUrl('GET',req.params.id,[])).then(function (response) {
      for (i of response.data.data){
        i["product_id"]=req.params.id
      }
      // truncate('bigcommercecustomFields')
      // insert('bigcommercecustomFields', response.data.data)
      res.send({ status: true, statusCode: 200, messages: "get successfully", data: response.data })
    }).catch(function (error) {
      console.error(error);
      res.send(error)
    });
}

const getcustomFieldsByIdLive=(req,res)=>{

  console.log(req.body.customFieldId);
  const params={productId:req.body.productId,customFieldId:req.body.customFieldId}
  axios.request(options.customFieldIdurl('GET',params,[])).then(function (response) {
    console.log(response.data);
    res.json(response.data)
  }).catch(function (error) {
    // console.error(error);
    res.send(error)
  });

}

const createcustomFieldsLive = (req, res) => {

    console.log(req.params.id);
    axios.request(options.customFieldUrl('POST',req.params.id,req.body)).then(function (response) {
      console.log(response.data);
      res.json({ status: true, statusCode: 200, messages: "Created successfully", data:response.data })
    }).catch(function (error) {
      console.error(error);
      res.json(error.message);
    });
};

const updatecustomFieldsLive = (req, res) => {
const params={productId:req.params.productId,customFieldId:req.params.customFieldId}
console.log(params);
axios.request(options.customFieldIdurl('PUT',params,req.body)).then(function (response) {
  console.log(response.data);
  res.json(response.data)
}).catch(function (error) {
  console.error(error);
  res.send(error)
});
}

const deletecustomFieldsLive= (req, res) => {
  // console.log(req.body.customFieldId);
  const params={productId:req.body.productId,customFieldId:req.body.customFieldId}
  axios.request(options.customFieldIdurl('DELETE',params,[])).then(function (response) {
    Delete('bigcommercecustomFields',req.body.customFieldId)
      res.send({ status: true, statusCode: 200, messages: "delete successfully", data: response.data })
      // console.log(response.data);
  }).catch(function (error) {
      // console.error(error);
      res.send(error);
  });

}
const bigCcustomFieldsCtrl={getcustomFieldsFromAPi,createcustomFieldsLive,deletecustomFieldsLive,updatecustomFieldsLive,getcustomFieldsByIdLive}
module.exports ={bigCcustomFieldsCtrl}