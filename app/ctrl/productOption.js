const { truncate, insert } = require("../../common/query");
const productOptionService= require('../service/productOption')
const options = require('../../bigCommerce')
var axios = require("axios");


//  productOption CRUD on local

const getProductOptionListLocal = (req, res) => {
    productOptionService.getAll(req.params.productId).then((data) => {
        res.json({ status: true, statusCode: 200, messages: "get successfully", data: data })
    }).catch((err) => {
        res.json({ status: false, statusCode: 404, messages: err.sqlMessage, data: [] })
    })

};

const createProductOptionLocal = (req, res) => {
  let body=req.body
  for (i in body){
    if (typeof(body[i]) == 'object') {
        body[i]= JSON.stringify(body[i])
    }
  }
  productOptionService.createLocal(req.body).then((data) => {
      res.json({ status: true, statusCode: 200, messages: "Created successfully", data: data })
  }).catch((err) => {
      res.json({ status: false, statusCode: 404, messages: err.sqlMessage, data: [] })
  })
};

const updateProductOptionLocal = (req, res) => {
    let body=req.body
    for (i in body){
      if (typeof(body[i]) == 'object') {
          body[i]= JSON.stringify(body[i])
      }
    }
  let params={productId:req.params.productId,optionId:req.params.optionId}
  productOptionService.updateLocal(body,params.productId,params.optionId).then((data) => {
      res.json({ status: true, statusCode: 200, messages: "updated successfully", data: data })
  }).catch((err) => {
      res.json({ status: false, statusCode: 404, messages: err.sqlMessage, data: [] })
  })
}

  const getProductOptionByIdLocal = (req, res) => {
    let params={optionId:req.params.optionId,productId:req.params.productId}
    console.log(params);
    productOptionService.getDataById(params.optionId,params.productId).then((data) => {
        res.json({ status: true, statusCode: 200, messages: "get successfully", data: data })
    }).catch((err) => {
        res.json({ status: false, statusCode: 404, messages: err.sqlMessage, data: [] })
    })
};

const deleteProductOptionLocal = (req, res) => {
  let params={productId:req.params.productId,optionId:req.params.optionId}
  productOptionService.deleteLocal(params.productId,params.optionId).then((data) => {
      res.json({ status: true, statusCode: 200, messages: "delete successfully", data: data })
  }).catch((err) => {
      res.json({ status: false, statusCode: 404, messages: err.sqlMessage, data: [] })
      console.log(err);
  })
};


// create bigCommerce productOption CRUD

const getProductOptionList = (req, res) => {
    axios.request(options.productOptionUrl('GET',req.params.id,[])).then(function (response) {
        for (i in response.data.data) {
            for (j in response.data.data[i]) {
                if (typeof (response.data.data[i][j]) == 'object') {
                    response.data.data[i][j] = JSON.stringify(response.data.data[i][j])
                    //  console.log(response.data.data[i][j]);
                }
            }
        }
        for (i of response.data.data){
          i["product_id"]=req.params.id
        }
        // truncate('bigcommercecustomFields')
        for(i of response.data.data){
          console.log(i);
          insert('bigcommerceproductoption',i)
        }
        // insert('bigcommercecustomFields', response.data.data)
        res.send({ status: true, statusCode: 200, messages: "get successfully", data: response.data })
      }).catch(function (error) {
        console.error(error);
        res.send(error)
      });
}




const getProductOptionByID = (req, res) => {
    const params={productId:req.params.productId,optionId:req.params.optionId}
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
    const params={productId:req.params.productId,optionId:req.params.optionId}
    axios.request(options.productOptionByIdUrl('PUT', params, req.body)).then(function (response) {
        // console.log(response.data);
        res.json({ status: true, statusCode: 200, messages: "Update successfully", data: response.data })
    }).catch(function (error) {
        console.log(error);
        res.json(error.message)
    });
};

const deleteProductOptionLive=(req,res)=>{
   
    const params={productId:req.params.productId,optionId:req.params.optionId}
    axios.request(options.productOptionByIdUrl('DELETE', params, req.body)).then(function (response) {
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
    deleteProductOptionLive
}

const productOptionlocalCtrl={
    getProductOptionListLocal,
    createProductOptionLocal,
    updateProductOptionLocal,
    getProductOptionByIdLocal,
    deleteProductOptionLocal
    
  }
module.exports={productOptionCtrl,productOptionlocalCtrl}