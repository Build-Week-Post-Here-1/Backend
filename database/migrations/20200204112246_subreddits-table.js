
exports.up = function(knex) {
  return knex.schema 
    .createTable('subreddits', function(tbl) {
        tbl.increments();
        tbl.string('name', 128)
            .notNullable();
        tbl.string('subLink', 128);
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
