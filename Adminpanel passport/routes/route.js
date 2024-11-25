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
route.get("/addadmin", passport.checkAuth, indexCtl.addadmin)
route.get("/viewadmin",passport.checkAuth, indexCtl.viewadmin)
route.post("/addadmin",passport.checkAuth, indexCtl.addAdminData)
module.exports = route