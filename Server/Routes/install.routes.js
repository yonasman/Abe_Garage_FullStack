// import express
const express = require("express")
// import router module
const router = express.Router()
// import install controller
const installController = require("../Controllers/install.controller")
// handler install request
router.get("/install", installController.install);
module.exports = router
