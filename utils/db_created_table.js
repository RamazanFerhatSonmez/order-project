const pg = require('pg')
const postgresClient = new pg.Pool({
    connectionString: 'postgresql://postgres:1234@localhost:5432',
});
const sqlorders = ` CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    userId integer NOT NULL,
    title TEXT,
    description TEXT,
    crateDate date
)`;
const sqlusers = ` CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    userId integer NOT NULL,
    email TEXT,
    password TEXT,
    fullname TEXT
)`;
const execute = async () => {
    try {
        await postgresClient.query('CREATE DATABASE orrrderup'); 
        await postgresClient.query(sqlorders);
        await postgresClient.query(sqlusers);
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await postgresClient.end();                                // closes connection
    }
};

execute().then(result => {
    if (result) {
        console.log('Databases and tables created.');
    }
});
