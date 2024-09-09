// import express
const express = require("express")
// initialize the express app
const app = express()
// allow cors
const cors = require("cors")
const url = process.env.FRONTEND_URL || "http://localhost:5173"
const corsOptions = {
    origin : url,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
// import router
// const router = require("./routes")
const router = require("./routes")
// configure dotenv
require("dotenv").config()
// import port
const PORT = process.env.PORT
// add express.json to middleware chain to parse request body
app.use(express.json())
// add the routes to middleware chain
app.use(router)
// import sanitize module
const sanitize = require("sanitize")
// add sanitize to the middleware chain
app.use(sanitize.middleware)
// start the web server
app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log("Listening to " + PORT)
})

module.exports = app