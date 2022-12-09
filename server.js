
require("dotenv").config();
const express = require("express");
const app = express();
const axios = require('axios');
const router = express.Router();
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
const port =process.env.port
const fs = require("fs")
const path = require('path');
// const cors=require("cors");
// const corsOptions ={
//    origin:'http://localhost:3000/', 
//    credentials:true,           
//    optionSuccessStatus:200,
// }
// app.use(cors(corsOptions))
var cors = require('cors');
app.use(cors());


const directoryPath = path.join(__dirname, 'app/routes');
const files = (router) =>{
  
        fs.readdirSync(directoryPath ).filter(function (file) {
            // console.log(file);
          require(path.join(directoryPath , file))(router);
        });

}
files(router)

app.use("/",router)

app.get("/",()=>{
console.log(`server is runnig on ${port} port`);
})

app.listen(port, (req,res) => {
    console.log(`server is runnig on ${port} port`);

});