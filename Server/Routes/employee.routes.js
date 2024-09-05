// import express module
const express = require("express")
// import router module
const router = express.Router()
// import employee controller
const employeeController = require("../Controllers/employee.controller.js")
// handle post request to add employee
router.post("/api/employee",employeeController.createEmployee)

module.exports = router