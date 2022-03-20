const pg = require('pg')
var dotenv = require('dotenv');

dotenv.config()

module.exports.postgresClient = new pg.Pool({
    connectionString: process.env.DB_CONNECTION_STRING,
});
