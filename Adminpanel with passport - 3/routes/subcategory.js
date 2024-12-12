const express = require("express")

const route = express.Router()
const subCatCtl = require("../Controllers/subCategoryCtl")

const passport = require("passport")


route.get("/subAddCat",passport.checkAuth,subCatCtl.AddSubCat)

route.post("/SendSubCat",passport.checkAuth,subCatCtl.SendSubCat)

route.get("/subViewCat",passport.checkAuth,subCatCtl.ViewSubCat)


module.exports = route;