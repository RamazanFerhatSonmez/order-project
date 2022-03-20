
var {postgresClient} = require('../../config/db') ;

module.exports.save = async function(data) {
    try {
        const sql = "INSERT INTO orders (userId, title, description,crateDate) VALUES ($1, $2, $3, $4) RETURNING *";

        const values = [data.userId, data.title, data.description,data.crateDate];
        const  result  = await postgresClient.query(sql, values);
        console.log("result::");
        console.log(result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.log('Error occured', error.message);
        return false;
    }
}
module.exports.list = async function(data) {
    try {
        const sql = "SELECT id,title,crateDate FROM orders WHERE  userId = $1";

        const values = [data.userId];
        const  result  = await postgresClient.query(sql, values);
        return result.rows;
    } catch (error) {
        console.log('Error occured', error.message);
        return false;
    }
}
module.exports.getOrder = async function(data) {
    try {
        const sql = "SELECT * FROM orders WHERE  id = $1";

        const values = [data.id];
        const  result  = await postgresClient.query(sql, values);
        console.log("result::");
        console.log(result.rows);
        return result.rows[0];
    } catch (error) {
        console.log('Error occured', error.message);
        return false;
    }
}