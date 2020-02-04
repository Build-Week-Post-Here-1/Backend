const db = require('../database/dbConfig');

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
};

function get() {
  return db('subreddits');
}

function getById(id) {
  return db('subreddits')
    .where({ id })
    .first();
}

function insert(subreddit) {
  return db('subreddits')
    .insert(subreddit)
    .then(ids => {
      return getById(ids[0]);
    });
}

function update(id, changes) {
  return db('subreddits')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('subreddits')
    .where('id', id)
    .del();
}