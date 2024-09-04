// import mysql2 driver
// const mysql2 = require("mysql2/promise")
const {Pool} = require("pg")
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

// const pool = mysql2.createPool(dbConfig)
const pool = new Pool(dbConfig)
// connecting to postgres
pool.connect((err, client, done) => {
    if (err) {
      console.error('Error connecting to the PostgreSQL database:', err.message);
    } else {
      console.log('Connected to the PostgreSQL database');
      done();
    }
  });
// get the connection and log status of the connection
// pool.getConnection((err, connection) => {
//     if(err) {
//         console.log("Error in connecting to db")
//     } else {
//         console.log("connected to db")
//         // release the connection back to pool
//         connection.release();
//     }
// })
// a function to handle db query
async function query(sql,params) {
    const [rows,fields] = await pool.execute(sql,params)
    return rows
}
module.exports = {query}