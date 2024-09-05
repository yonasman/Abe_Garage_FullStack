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
// add express.json to middleware chain to parse request body
app.use(express.json())
// add the routes to middleware chain
app.use(router)
// allow cors
const cors = require("cors")
const url = process.env.FRONTEND_URL
const corsOptions = {
    origin : url,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
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