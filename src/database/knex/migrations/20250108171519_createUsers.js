exports.up = knex => knex.shemas.createTable('users', table => {
  table.increments('id').primary();

  table.string('name').notNullable();
  table.string('email').notNullable();
  table.string('password').notNullable();

  table.enum('role', ['admin', 'user'], { useNative: true, enumName: "roles" }).notNullable().default('user');

  table.timestamp('created_at').default(knex.fn.now());
  table.timestamp('updated_at').default(knex.fn.now());
});


exports.down = knex => knex.shemas.dropTable('users');
