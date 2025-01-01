const express = require("express")
const rout = express.Router()
const ctl = require("../controller/userCtl")
const auth = require("../middlewear/JWT")

rout.get("/",ctl.SignupPage)
rout.get("/login",ctl.LoginPage)
rout.post("/signupData",ctl.SignupData)
rout.post("/loginData",ctl.LoginData)
rout.get("/home",auth,ctl.HomePage)
rout.get("/logout",ctl.Logout)
rout.get("/addrecipe",auth,ctl.Addrecipe)
rout.post("/submitrecipe",auth,ctl.AddrecipeData)
rout.get("/viewrecipe",auth,ctl.Viewrecipe)
rout.get("/delete",auth,ctl.Deleterecipe)
rout.get("/edit",auth,ctl.Edit)
rout.post("/editrecipe",auth,ctl.Editrecipe)

module.exports = rout