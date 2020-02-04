const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development || process.env(DATABASE_URL));

module.exports = {
  add,
  findById,
  find,
  findBy,
  findByUserName,
  update,
  remove
};

function find(){
  return db('users').select('id', 'username');
}

function findBy(filter){
  return db('users')
  .where(filter);
}
async function add(user){
  const [id] = await db('users')
  .insert(user, 'id')
  .returning('id');
  return findById(id); //do I need this line??
};

// function findById(id){
//   return db('users')
//   .where({id})
//   .first();
// };
function findById(id){
  return findBy({id}).first();
}

function findByUserName(username){
  return findBy({username}).first();
}

function update(id, changes) {
  return db('users')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('users')
    .where('id', id)
    .del();
}