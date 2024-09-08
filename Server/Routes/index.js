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
// import login router
const loginRouter = require("../routes/login.routes.js")
// add login to middleware chain
router.use(loginRouter)
// export router
module.exports = router