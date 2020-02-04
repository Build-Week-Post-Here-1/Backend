
exports.up = function(knex) {
  return knex.schema 
    .createTable('subreddits', function(tbl) {
        tbl.increments();
        tbl.string('name')
            .notNullable();
        tbl
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('subreddits');
};
