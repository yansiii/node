const express = require("express")
const indexCtl = require("../controllers/indexCtl")

const route = express.Router()


route.get("/",indexCtl.signup)
route.post("/signup", indexCtl.handleSignup);

route.get("/signin", indexCtl.signin);
route.post("/signin", indexCtl.handleSignin);


route.get("/dashboard",indexCtl.dashboard)

route.get("/addAdmin",indexCtl.addAdmin)
route.post("/addAdmin",indexCtl.addAdminData)
route.get("/viewAdmin",indexCtl.viewAdmin)
route.get("/edit",indexCtl.editData)
route.post("/update",indexCtl.updateData)
route.get("/delete",indexCtl.deleteData)
route.get("/logout", indexCtl.logout);

module.exports = route