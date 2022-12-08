const { truncate, insert } = require("../../common/query");
const productOptionService= require('../service/productOption')
const options = require('../../bigCommerce')
var axios = require("axios");

// Add metaFields 

const addMetaFields=(req,res)=>{
    // console.log(req.params.variant_id);
    var options = {
        method: 'POST',
        url: `https://api.bigcommerce.com/stores/gmy1zranko/v3/catalog/products/${req.params.product_id}/variants/${req.params.variant_id}/metafields`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Auth-Token': 'm6chadj7sk7q42vndhmesiupi7lapyi'
        },data:req.body
      };
      
      axios.request(options).then(function (response) {
        res.json(response.data)
        // console.log(response.data);
      }).catch(function (error) {
        // console.error(error);
        res.send(error)
      });
}

// get product varient
const productVarient=(req,res)=>{
    // console.log(req.params.id);
    var options = {
        method: 'GET',
        url: `https://api.bigcommerce.com/stores/gmy1zranko/v3/catalog/products/${req.params.id}/variants`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Auth-Token': 'm6chadj7sk7q42vndhmesiupi7lapyi'
        }
      };
      
      axios.request(options).then(function (response) {
        res.json(response.data)
        // console.log(response.data);
      }).catch(function (error) {
        console.error(error);
        res.send(error)
      });
}

// get Meta Fields
// get product varient
const getMetaFields=(req,res)=>{
 
var options = {
    method: 'GET',
    url: `https://api.bigcommerce.com/stores/gmy1zranko/v3/catalog/products/${req.params.product_id}/variants/${req.params.variant_id}/metafields`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Auth-Token': 'm6chadj7sk7q42vndhmesiupi7lapyi'
    }
  };
  
  axios.request(options).then(function (response) {
    // console.log(response.data);
    res.json(response.data)
  }).catch(function (error) {
    console.error(error);
    req.send(error)
  });
}

const updateMf=(req,res)=>{
  var options = {
    method: 'PUT',
    url: `https://api.bigcommerce.com/stores/gmy1zranko/v3/catalog/products/582/variants/2151/metafields/225`,
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': 'm6chadj7sk7q42vndhmesiupi7lapyi'
    },
    data: req.body
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
    res.send(response.data)
  }).catch(function (error) {
    console.error(error);
  });
}
const ctls={  productVarient,
    addMetaFields,getMetaFields,updateMf}
module.exports={ctls}