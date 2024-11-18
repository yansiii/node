const express = require("express")

const route = express.Router();

const indexctl = require("../controllers/indexctl")

route.get("/",indexctl.dashboard)
route.get("/addAdmin",indexctl.addAdmin)

module.exports = route