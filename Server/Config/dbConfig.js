// import mysql2 driver
const mysql2 = require("mysql2/promise")
// configure dotenv
require("dotenv").config()
// define connection parameters
const dbConfig = {
    connectionLimit : 10,
    user: process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database:process.env.DB_NAME
}

const pool = mysql2.createPool(dbConfig)

// get the connection and log status of the connection
async function checkConnection() {
    try {
        const connection = await pool.getConnection();
        console.log("connected to db successfully")
        connection.release();
    } catch (error) {
        console.log("Error connecting to db", error.message)
    }
}
// call the function to check the connection
checkConnection();
// a function to handle db query
async function query(sql,params) {
    const [rows,fields] = await pool.query(sql,params)
    return rows
}
module.exports = {pool,query}