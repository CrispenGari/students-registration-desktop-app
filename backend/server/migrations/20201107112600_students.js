
exports.up = async (knex)=> {
  await knex.schema.createTable("students", table=>{
    table.increments();
    table.text("student_name",256).notNullable();
    table.text("student_secondname",256);
    table.text("student_surname",256).notNullable();
    table.integer("student_year_of_birth").notNullable();
    table.string("student_profile",1000);
    table.integer("student_number").unique().notNullable();
    table.string("student_gender").notNullable();
})
};

exports.down = async (knex)=> {
    await knex.schema.dropTableIfExist("students")
};

/*
npx knex migrate:latest
npx knex seed:make seed_name
*/