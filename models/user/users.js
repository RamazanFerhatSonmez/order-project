

var crypto = require("crypto");
var {postgresClient} = require('../../config/db') ;
var md5 = require('md5');

module.exports.save = async function(data) {
    try {
        const sql = "INSERT INTO users (email, password, fullname) VALUES ($1, $2, $3) RETURNING *";
        let password = await md5(data.password, 10);
        console.log("data.password::");
        console.log(data.password);
        const values = [data.email, password, data.fullname];
        const  result  = await postgresClient.query(sql, values);
        console.log("result::");
        console.log(result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.log('Error occured', error.message);
        return false;
    }
}

module.exports.login = async function (data) {
    try {
        let password = await md5(data.password, 10);
        const sql = "SELECT * FROM users WHERE  email = $1 AND password = $2";
        const values = [data.email, password];
        const  result  = await postgresClient.query(sql, values);
        if(!result.rows.length) return false;
        return result.rows[0];
    } catch (error) {
        console.log('Error occured', error.message);
        return false;
    }
}

