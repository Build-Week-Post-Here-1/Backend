
exports.seed = function(knex) {
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Hippo1', password: "123456"},
        {id: 2, username: 'RedditThis', password: "123456"},
        {id: 3, username: 'RandomRead', password: "123456"}
      ]);
    });
};
