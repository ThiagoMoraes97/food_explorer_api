exports.up = knex => knex.schema.createTable('ingredients', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('dish_id').references('id').inTable('dishes').onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
  
  
  exports.down = knex => knex.schema.dropTable('ingredients');