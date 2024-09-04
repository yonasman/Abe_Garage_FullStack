// import db connection
const { resolve } = require("path")
const query = require("../Config/dbConfig")
// import fs module to read the sql file
const fs = require("fs")
// function handling installing the db tables
async function install() {
    // path to sql file
    const sqlPath = __dirname + "../Resources/queries.sql"
    // variable to store the queries
    const queries = [];
    const tempLine = "";
    finalMessage = {};
    // read the file
    const lines = await fs.writeFileSync(sqlPath,"utf-8").split("/n")
    // handling the asynchronous reading of file and storing on the variable
    const executed = await new Promise((resolve,reject) => {
        lines.forEach((line) => {
            if(line.trim().startsWith("--") || line.trim() === "") {
                return
            }
            tempLine += line
            if(tempLine.trim().endsWith(";")) {
                queries.push(tempLine)
                tempLine = ""
            }
            resolve("Queries are added to the list");
        })
    })
    // loop through the queries array and execute the queries
    for (let i = 0;i < queries.length;i++) {
        try {
            const result = await query(queries[i])
            console.log("Tables created!")
        } catch (error) {
            finalMessage.message = "Not all tables are created"
        }
    }
    if(!finalMessage.message) {
        finalMessage.message = "All tables created successfully"
        finalMessage.status = 200
    } else {
        finalMessage.status = 500
    }
}
module.exports = {install}