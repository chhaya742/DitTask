const {truncate,insert} = require("../../common/query");

const options=require('../../bigCommerce');
var axios = require("axios");
const { response } = require("express");


const getCategoryFromAPi=(req,res)=>{
    axios.request(options.categoryUrl('GET','',[])).then(function (response) {
    //   console.log(response.data.data);
      for (i in response.data.data) {
        for (j in response.data.data[i]) {
            if (typeof (response.data.data[i][j]) == 'object') {
                response.data.data[i][j] = JSON.stringify(response.data.data[i][j])
                //  console.log(response.data.data[i][j]);
            }
        }
    }
      truncate('bigcommercecategory')
      insert('bigcommercecategory', response.data.data)
      res.send({ status: true, statusCode: 200, messages: "get successfully", data: response.data })
    }).catch(function (error) {
      console.error(error);
      res.send(error)
    });
}

const getCategoryByIdLive=(req,res)=>{

  // var options = {
  //   method: 'GET',
  //   url: 'https://api.bigcommerce.com/stores/71ukaf4yd0/v3/catalog/categories/20',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'X-Auth-Token': '8oedv47jgeu55xyfj34xbi9v84ifjrh'
  //   }
  // };
  console.log(req.body.category_id);
  axios.request(options.categoryUrl('GET',`/${req.body.category_id}`,[])).then(function (response) {
    console.log(response.data);
    res.json(response.data)
  }).catch(function (error) {
    // console.error(error);
    res.send(error)
  });

//   axios.request(options.categoryUrl('GET',`/${req.params.id}`,[])).then(function (response) {
//     res.send({ status: true, statusCode: 200, messages: "get successfully", data: response.data })
//   }).catch(function (error) {
//     console.error(error);
//     res.send(error)
//   });
}

const createCategoryLive = (req, res) => {
    axios.request(options.categoryUrl('POST','',req.body)).then(function (response) {
      console.log(response.data);
      res.json({ status: true, statusCode: 200, messages: "Created successfully", data:response.data })
    }).catch(function (error) {
      console.error(error);
      res.json(error.message);
    });
};


const updateCategoryLive = (req, res) => {

axios.request(options.categoryUrl('PUT','',req.body)).then(function (response) {
  console.log(response.data);
  res.json(response.data)
}).catch(function (error) {
  console.error(error);
  res.send(error)
});
}

const deleteCategoryLive= (req, res) => {
  // console.log(req.body.category_id);
  axios.request(options.categoryDeleteUrl('DELETE',`${req.body.category_id}`,[])).then(function (response) {
      res.send({ status: true, statusCode: 200, messages: "delete successfully", data: response.data })
      // console.log(response.data);
  }).catch(function (error) {
      // console.error(error);
      res.send(error);
  });

}
const bigCCategoryCtrl={getCategoryFromAPi,createCategoryLive,deleteCategoryLive,updateCategoryLive,getCategoryByIdLive}
module.exports ={bigCCategoryCtrl}