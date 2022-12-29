const knex=require("../config");
knex.schema.createTable('role', (table) => {
    table.increments('id').primary();
    table.string('user_id').notNullable();
    table.string('Role').notNullable();
    table.string('Biodata').notNullable();

})
.then(() => console.log("table created"))
    .catch((err) => { console.log(err.sqlMessage);  })

module.exports=knex;    
    