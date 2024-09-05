// import express module
const express = require("express")
// import router module
const router = express.Router()
// import install router
const installRouter = require("./install.routes")
// add install router to middleware chain
router.use(installRouter)
// import employee router
const employeeRouter = require("../routes/employee.routes")
// add employee router to middleware chain
router.use(employeeRouter)
// export router
module.exports = router