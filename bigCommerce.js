
// require("dotenv").config();
// const express = require("express");
// const app = express();
// const axios = require('axios')
// const port = process.env.port

// const url = 'https://newsapi.org/v2/everything?q=tesla&from=2022-10-01&sortBy=publishedAt&apiKey=19cab6cf726f4b64b820fa4163544700'

// app.get("/", async (req, res) => {
//     const data = await fetch(url);
//     const response = await data.json();
//     res.json({
//         status:true,
//         StatusCode:200,
//         message:"get data successfully",
//         data:JSON.stringify(response , null, 2)
//     });

// });

// const url='https://dummyjson.com/products'
// app.get("/products",async(req,res)=>{
//     const response = await axios.get(url);
//     try {
//         console.log(response.data);
//         res.json(response.data)
//       } catch (error) {
//         console.error(error);
//         res.send(error)
//       }
//     })

// app.get("/products", async (req, res) => {
//     const data = await fetch(url);
//     const response = await data.json();
//     res.json({
//         status:true,
//         StatusCode:200,
//         message:"get data successfully",
//         data:response.products
//     });

//     console.log(response);
// });


// app.listen(port, () => {
//     console.log(`server is runnig on ${port} port`);
// });



// const express = require("express");
// const app = express();
// const { insert,truncate } = require("./common/query")
// var bodyParser = require('body-parser')
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
// // parse application/json
// app.use(bodyParser.json())
// const port = 3000
// var axios = require("axios");


// app.get("/products/List", async (req, res) => {
//     axios.request(options).then(function (response) {
//         res.json(response.data.data);
//         for (i in response.data.data) {
//             for (j in response.data.data[i]) {
//                 if (typeof (response.data.data[i][j]) == 'object') {
//                     response.data.data[i][j] = JSON.stringify(response.data.data[i][j])
//                     //  console.log(response.data.data[i][j]);
//                 }
//             }
//         }
//         truncate('products')
//         insert('products', response.data.data)

//     }).catch(function (error) {
//         res.send(error)
//     });
// });


// app.post("/products/create", async (req, res) => {
//     // console.log(req.body);
//     var options = {
//         method: 'POST',
//         url: 'https://api.bigcommerce.com/stores/${process.env.store_hash}/v3/catalog/products',
//         headers: {
//             'Content-Type': 'application/json',
//             Accept: 'application/json',
//             'X-Auth-Token': '8oedv47jgeu55xyfj34xbi9v84ifjrh'
//         },
//         data: req.body
//         };
        
//     axios.request(options).then(function (response) {
//         // console.log(response.data);
//         res.json(response.data)
//     }).catch(function (error) {
//         console.log(error);
//         res.json(error)
//     });
// });
// app.listen(port, () => {
//     console.log(`server is runnig on ${port} port`);
// });


const productUrl=( method,params,data)=> ({
  method: method,
  url: `https://api.bigcommerce.com/stores/${process.env.store_hash}/v3/catalog/products`+params,
  params: {include: 'custom_fields'},
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Auth-Token': '8oedv47jgeu55xyfj34xbi9v84ifjrh'
  },data:data
});

const productOptionUrl=( method,params,data)=> ({
  method: method,
  url:`https://api.bigcommerce.com/stores/${process.env.store_hash}/v3/catalog/products/${params}/options`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Auth-Token': '8oedv47jgeu55xyfj34xbi9v84ifjrh'
  },data:data
});

const productOptionByIdUrl=( method,params,data)=> ({
  method: method,
  url:`https://api.bigcommerce.com/stores/${process.env.store_hash}/v3/catalog/products/${params.productId}/options/${params.optionId}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Auth-Token': '8oedv47jgeu55xyfj34xbi9v84ifjrh'
  },data:data
});


const categoryUrl=( method,params,data)=> ({
    method: method,
    url: `https://api.bigcommerce.com/stores/${process.env.store_hash}/v3/catalog/categories`+params,
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': '8oedv47jgeu55xyfj34xbi9v84ifjrh'
    },data:data
});
const categoryByIdUrl=( method,params,data)=> ({
    method: method,
    url: `https://api.bigcommerce.com/stores/${process.env.store_hash}/v3/catalog/categories`,
    params: {'id:in': params},
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': '8oedv47jgeu55xyfj34xbi9v84ifjrh'
    },data:[data]
});

var customFieldUrl = ( method,params,data)=> ({
  method: method,
  url: `https://api.bigcommerce.com/stores/${process.env.store_hash}/v3/catalog/products/${params}/custom-fields`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Auth-Token': '8oedv47jgeu55xyfj34xbi9v84ifjrh'
  },data:data
});

var customFieldIdurl=(method,params,data)=>(
  {
    method: method,
    url: `https://api.bigcommerce.com/stores/${process.env.store_hash}/v3/catalog/products/${params.productId}/custom-fields/${params.customFieldId}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Auth-Token': '8oedv47jgeu55xyfj34xbi9v84ifjrh'
    },data:data
} 
);



module.exports=options={
  productUrl,
  categoryUrl,
  categoryByIdUrl,
  customFieldUrl,
  customFieldIdurl,
  productOptionUrl,
  productOptionByIdUrl
}

