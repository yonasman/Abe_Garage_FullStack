// import express
const express = require("express")
// import the router module
const router = express.Router()
// import the login controller
const loginController = require("../Controllers/login.controller.js")
// handle post request to login
router.post("/api/employee/login",loginController.login)
module.exports = router