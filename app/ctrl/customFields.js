const { truncate, insert, Delete } = require("../../common/query");
const customFieldsService = require("../service/customFields")
const options = require('../../bigCommerce');
var axios = require("axios");

//  customFields CRUD on local

const getcustomFieldsListLocal = (req, res) => {
  customFieldsService.getAll(req.params.id).then((data) => {
    res.json({ status: true, statusCode: 200, messages: "get successfully", data: data })
  }).catch((err) => {
    res.json({ status: false, statusCode: 404, messages: err.sqlMessage, data: [] })
  })

};

const createcustomFieldsLocal = (req, res) => {
  customFieldsService.createLocal(req.body).then((data) => {
    res.json({ status: true, statusCode: 200, messages: "Created successfully", data: data })
    console.log(data);
  }).catch((err) => {
    res.json({ status: false, statusCode: 404, messages: err.sqlMessage, data: [] })
  })
};

const updatecustomFieldsLocal = (req, res) => {
  let params = { customFieldId: req.params.customFieldId, productId: req.params.productId }
  customFieldsService.updateLocal(req.body, params.customFieldId, params.productId).then((data) => {
    res.json({ status: true, statusCode: 200, messages: "updated successfully", data: data })
  }).catch((err) => {
    res.json({ status: false, statusCode: 404, messages: err.sqlMessage, data: [] })
  })
}

const getcustomFieldsByIdLocal = (req, res) => {
  let params = { customFieldId: req.params.customFieldId, productId: req.params.productId }
  customFieldsService.getDataById(params.customFieldId, params.productId).then((data) => {
    res.json({ status: true, statusCode: 200, messages: "get successfully", data: data })
  }).catch((err) => {
    res.json({ status: false, statusCode: 404, messages: err.sqlMessage, data: [] })
  })
};

const deletecustomFieldsLocal = (req, res) => {
  let params = { customFieldId: req.params.customFieldId, productId: req.params.productId }
  customFieldsService.deleteLocal(params.customFieldId, params.productId).then((data) => {
    res.json({ status: true, statusCode: 200, messages: "delete successfully", data: data })
  }).catch((err) => {
    res.json({ status: false, statusCode: 404, messages: err.sqlMessage, data: [] })
    console.log(err);
  })
};


// create bigCommerce customfields CRUD
const getcustomFieldsFromAPi = (req, res) => {
  axios.request(options.customFieldUrl('GET', req.params.id, [])).then(function (response) {
    for (i of response.data.data) {
      i["product_id"] = req.params.id
    }
    for (i of response.data.data) {
      console.log(i);
      insert('bigcommercecustomFields', i)
    }
    res.send({ status: true, statusCode: 200, messages: "get successfully", data: response.data })
  }).catch(function (error) {
    console.error(error);
    res.send(error)
  });
}

const getcustomFieldsByIdLive = (req, res) => {
  console.log(req.body.customFieldId);
  const params = { productId: req.params.productId, customFieldId: req.params.customFieldId }
  axios.request(options.customFieldIdurl('GET', params, [])).then(function (response) {
    console.log(response.data);
    res.json(response.data)
  }).catch(function (error) {
    res.send(error)
  });

}

const createcustomFieldsLive = (req, res) => {
  console.log(req.params.id);
  axios.request(options.customFieldUrl('POST', req.params.id, req.body)).then(function (response) {
    console.log(response.data);
    res.json({ status: true, statusCode: 200, messages: "Created successfully", data: response.data })
  }).catch(function (error) {
    console.error(error);
    res.json(error.message);
  });
};

const updatecustomFieldsLive = (req, res) => {
  const params = { productId: req.params.productId, customFieldId: req.params.customFieldId }
  console.log(params);
  axios.request(options.customFieldIdurl('PUT', params, req.body)).then(function (response) {
    console.log(response.data);
    res.json(response.data)
  }).catch(function (error) {
    console.error(error);
    res.send(error)
  });
}

const deletecustomFieldsLive = (req, res) => {
  const params = { productId: req.params.productId, customFieldId: req.params.customFieldId }
  axios.request(options.customFieldIdurl('DELETE', params, [])).then(function (response) {
    Delete('bigcommercecustomFields', req.body.customFieldId)
    res.send({ status: true, statusCode: 200, messages: "delete successfully", data: response.data })
  }).catch(function (error) {
    console.error(error);
    res.send(error);
  });

}
const bigCcustomFieldsCtrl = {
  getcustomFieldsFromAPi,
  createcustomFieldsLive,
  deletecustomFieldsLive,
  updatecustomFieldsLive,
  getcustomFieldsByIdLive
}

const customFieldslocalCtrl = {
  getcustomFieldsListLocal,
  createcustomFieldsLocal,
  updatecustomFieldsLocal,
  getcustomFieldsByIdLocal,
  deletecustomFieldsLocal
}
module.exports = { bigCcustomFieldsCtrl, customFieldslocalCtrl }