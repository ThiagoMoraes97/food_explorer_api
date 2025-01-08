exports.up = knex => knex.shemas.createTable('ingredients', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('dish_id').references('id').inTable('dishes').onDelete('CASCADE');
    table.timestamp('created_at').default(knex.fn.now());
  });
  
  
  exports.down = knex => knex.shemas.dropTable('ingredients');