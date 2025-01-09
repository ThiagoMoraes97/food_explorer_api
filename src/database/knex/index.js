const knex = require('knex');
const configuration = require('../../../knexfile');

const apiConnection = knex(configuration.development);

module.exports = apiConnection;