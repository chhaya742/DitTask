const {truncate,insert} = require("../../common/query");
const categoryService=require("../service/category")
const options=require('../../bigCommerce');
var axios = require("axios");
const { response } = require("express");


//  Category CRUD on local

const getCategoryListLocal = (req, res) => {
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
    categoryService.getAll(page_q, limit_q, term).then((data) => {
        res.json({ status: true, statusCode: 200, messages: "get successfully", data: data })
    }).catch((err) => {
        res.json({ status: false, statusCode: 404, messages: err.sqlMessage, data: [] })
    })

};

const createCategoryLocal = (req, res) => {
  // console.log(req.body);
  categoryService.createLocal(req.body).then((data) => {
      res.json({ status: true, statusCode: 200, messages: "Created successfully", data: data })
      console.log(data);
  }).catch((err) => {
      res.json({ status: false, statusCode: 404, messages: err.sqlMessage, data: [] })
      console.log(err);
  })
};

const updateCategoryLocal = (req, res) => {
  // console.log(req.body);
  categoryService.updateLocal(req.body,req.params.id).then((data) => {
      res.json({ status: true, statusCode: 200, messages: "updated successfully", data: data })
  }).catch((err) => {
      res.json({ status: false, statusCode: 404, messages: err.sqlMessage, data: [] })
  })
}

  const getCategoryByIdLocal = (req, res) => {
    categoryService.getDataById(req.params.id).then((data) => {
        res.json({ status: true, statusCode: 200, messages: "get successfully", data: data })
    }).catch((err) => {
        res.json({ status: false, statusCode: 404, messages: err.sqlMessage, data: [] })
    })
};

const deleteCategoryLocal = (req, res) => {
  categoryService.deleteLocal(req.params.id).then((data) => {
      res.json({ status: true, statusCode: 200, messages: "delete successfully", data: data })
  }).catch((err) => {
      res.json({ status: false, statusCode: 404, messages: err.sqlMessage, data: [] })
  })
};



// create bigCommerce Category CRUD

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
  // console.log(req.params.id);
  axios.request(options.categoryByIdUrl('GET',req.params.id,[])).then(function (response) {
    res.json(response.data)
  }).catch(function (error) {
    res.send(error)
  });
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
axios.request(options.categoryUrl('PUT',`/${req.params.id}`,req.body)).then(function (response) {
  res.json(response.data)
}).catch(function (error) {
  res.send(error)
  console.log(error);
});
}

const deleteCategoryLive= (req, res) => {
  const params=req.params.id
  axios.request(options.categoryByIdUrl('DELETE',params,[])).then(function (response) {
      res.send({ status: true, statusCode: 200, messages: "delete successfully", data: response.data })
  }).catch(function (error) {
      res.send(error);
      console.error(error);
  });

}
const bigCCategoryCtrl={
  getCategoryFromAPi,
  createCategoryLive,
  deleteCategoryLive,
  updateCategoryLive,
  getCategoryByIdLive
}
const CategorylocalCtrl={
  getCategoryListLocal,
  getCategoryByIdLocal,
  updateCategoryLocal,
  createCategoryLocal,
  deleteCategoryLocal
}
module.exports ={bigCCategoryCtrl,CategorylocalCtrl}