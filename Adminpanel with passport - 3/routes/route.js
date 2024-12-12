const express = require("express");
const indexCtl = require("../Controllers/indexCtl")
const passport = require("../middleware/passportLocalSt")
const route = express.Router()


route.get("/",indexCtl.signin)
route.post("/signin",passport.authenticate("local",{ successRedirect: "/login",failureRedirect:"/"}), indexCtl.handleSignin);

route.get("/login",indexCtl.login)
route.post("/login",  indexCtl.loginAdmin)
route.get("/logout",indexCtl.logout)
route.get("/dashboard",passport.checkAuth,  indexCtl.dashboard) 
route.get("/addadmin",passport.checkAuth,indexCtl.addadmin)
route.get("/viewadmin",passport.checkAuth, indexCtl.viewadmin)
route.get("/delete",indexCtl.deleteData)
route.get("/edit",indexCtl.editData)
route.post("/update",indexCtl.updateData)
route.get("/profile",indexCtl.profile)
route.get("/changepass",passport.checkAuth, indexCtl.changepass)
route.post("/checkpass",passport.checkAuth, indexCtl.checkpass)
route.get("/checkpass2", indexCtl.checkpass2)
route.post("/checkpass2", indexCtl.checkpass2)



route.post("/addadmin",passport.checkAuth, indexCtl.addAdminData)
route.post("/sendOtp", indexCtl.sendOtp)
module.exports = route