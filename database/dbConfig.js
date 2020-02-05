const knex = require('knex');

const knexConfig = require('../knexfile.js');

module.exports = knex(knexConfig.development || process.env(DATABASE_URL) || process.env.DB_ENV);