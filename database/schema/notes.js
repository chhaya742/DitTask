const knex=require("../config");
knex.schema.createTable('notes', (table) => {
    table.increments('id').primary();
    table.string('user_id').notNullable();
    table.string('Title').notNullable();
    table.string('Description').notNullable();
    table.string('image').notNullable();

})
.then(() => console.log("table created"))
    .catch((err) => { console.log(err.sqlMessage);  })

module.exports=knex;    
    