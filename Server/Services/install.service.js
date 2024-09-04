// import db connection
const conn = require("../Config/dbConfig")
// import fs module to read the sql file
const fs = require("fs").promises
// import path module
const path = require("path")
// function handling installing the db tables
async function install() {
    try {
      // path to sql file
    const sqlPath = path.join(__dirname, "../Resources/queries.sql")
    // variable to store the queries
    const queries = [];
    let tempLine = "";
    finalMessage = {};
    // read the file
    const fileContent = await fs.readFile(sqlPath,"utf-8");
    const lines = fileContent.split("\n");
    // handling the asynchronous reading of file and storing on the variable
    for(let line of lines) {
        line = line.trim()
        if(line.startsWith("--") || line === "") {
            continue
        }
        tempLine += line
        if(line.endsWith(";")) {
            queries.push(tempLine)
            tempLine = "" // reset the tempLine after pushing the query
        }
    }
    for(let i = 0;i < queries.length;i++) {
        try {
            let result = await conn.query(queries[i])
            console.log(result)
            // console.log("Query executed successfully" + queries[i]);
        } catch (error) {
            // console.error("Queries not executed successfully" + queries[i])
            finalMessage.message = "Not All tables created"
        }
    }  
    if(!finalMessage.message) {
        finalMessage.status = 200
        finalMessage.message = "All tables created successfully"
    } else {
        finalMessage.status = 500
    }
    } catch (error) {
        console.log(error)
    }
    return finalMessage
}
module.exports = {install}