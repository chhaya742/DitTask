const knex=require("../config");
knex.schema.createTable('Student', (table) => {
    table.increments('id').primary();
    table.string('Name').notNullable();
    table.integer('Age').notNullable();
    table.string('Email').unique().notNullable();
    table.string('Class').notNullable();
    table.string('Section').notNullable();
    table.integer('rollNumber').notNullable();
    table.timestamps(false, true);
})
.then(() => console.log("table created"))
    .catch((err) => { console.log(err.sqlMessage);  })

module.exports=knex;    
    