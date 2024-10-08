// import express module
const express = require("express")
// import router module
const router = express.Router()
// import employee controller
const employeeController = require("../Controllers/employee.controller.js")
const { VerifyToken, isAdmin } = require("../Middlewares/auth.middleware.js")
// const {VerifyToken} = 
// handle post request to add employee
router.post("/api/employee",[VerifyToken, isAdmin],employeeController.createEmployee)
// route to handle get request to employees list
router.get('/api/employees',[VerifyToken,isAdmin],employeeController.getAllEmployees)
module.exports = router