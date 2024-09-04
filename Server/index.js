// import express
const express = require("express")
// import router
// const router = require("./routes")
const router = require("./routes")
// configure dotenv
require("dotenv").config()
// import port
const PORT = process.env.PORT
// initialize the express app
const app = express()
// add the routes to middleware chain
app.use(router)
// start the web server
app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log("Listening to " + PORT)
})

module.exports = app