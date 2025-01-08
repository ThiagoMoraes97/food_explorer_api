exports.up = knex => knex.shemas.createTable('dishes', table => {
    table.increments('id').primary();
  
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.decimal('price').notNullable();
    table.enum('category', ['meals', 'desserts', 'drinks'], { useNative: true, enumName: "categorys" }).notNullable().default('meals');
    table.string('image').nullable();

    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');

    table.timestamp('created_at').default(knex.fn.now());
    table.timestamp('updated_at').default(knex.fn.now());
  });
  
  
  exports.down = knex => knex.shemas.dropTable('dishes');
