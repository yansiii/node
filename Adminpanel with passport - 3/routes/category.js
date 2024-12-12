const express = require("express");
const catIndexCtl = require("../Controllers/categoryCtl")
const passport = require("../middleware/passportLocalSt")
const route = express.Router()
const upload = require("../multer/multer")





route.get("/addCat",passport.checkAuth, catIndexCtl.addCat)
route.post("/addCat",upload, catIndexCtl.addCatData)
route.get("/viewCat",passport.checkAuth, catIndexCtl.viewCat)
route.get("/catdelete",passport.checkAuth,catIndexCtl.catdelete)
route.get("/catedit",passport.checkAuth,catIndexCtl.catedit)
route.post("/catupdate",upload,passport.checkAuth,catIndexCtl.catupdate)

module.exports = route;
