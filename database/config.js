require("dotenv").config();
const knex = require('knex')({
    client: 'mysql',
    connection: {
    //   host : process.env.host,
    //   port :process.env.port,
    //   user : process.env.user,
    //   password :process.env.password,
    //   database :process.env.database
    host : 'localhost',
    port :3306,
    user :'root',
    password :'Chhaya@123',
    database:'bigcommerce'
    }
  })
 module.exports=knex; 
