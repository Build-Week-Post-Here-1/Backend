
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('subreddits').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('subreddits').insert([
        {id: 1, name: 'AskScienceFiction', user_id: 1},
        {id: 2, name: 'baseball', user_id: 1},
        {id: 3, name: 'MechanicAdvice', user_id: 1},
        {id: 4, name: 'AskScienceFiction', user_id: 2},
        {id: 5, name: 'YouShouldKnow', user_id: 2},
        {id: 6, name: 'football', user_id: 2},
        {id: 7, name: 'cheerleading', user_id: 3},
        {id: 8, name: 'basketball', user_id: 3},
        {id: 9, name: 'MechanicAdvice', user_id: 3}
      ]);
    });
};
