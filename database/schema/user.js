const knex=require("../config");
knex.schema.createTable('user', (table) => {
    table.increments('id').primary();
    table.string('Name').notNullable();
    table.integer('Age').notNullable();
    table.string('Email').unique().notNullable();
    table.string('password').notNullable();
    table.string('Phone').notNullable();
    table.string('Gender').notNullable();
    table.integer('Pin').notNullable();
    table.timestamps(false, true);
})
.then(() => console.log("table created"))
    .catch((err) => { console.log(err.sqlMessage);  })

module.exports=knex;    
    