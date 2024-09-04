// import express module
const express = require("express")
// import router module
const router = express.Router()
// import install router
const installRouter = require("./install.routes")
// add install router to middleware chain
router.use(installRouter)
// export router
module.exports = router