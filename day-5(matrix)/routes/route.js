const express = require("express")

const route = express.Router();

const indexCtl = require("../controllers/indexCtl")
const upload = require("../middleware/multer")

route.get("/",indexCtl.login)
route.post("/login",indexCtl.loginAdmin)
route.get("/dashboard",indexCtl.dashboard)
route.get("/addAdmin" , indexCtl.addAdmin)

route.post("/addAdmin",upload,indexCtl.addAdminData)
route.get("/viewAdmin",upload,indexCtl.viewAdmin)
route.get("/edit",indexCtl.editData)
route.get("/delete", indexCtl.deleteData);
route.post("/update",upload,indexCtl.updateData)

route.get("/logout",indexCtl.logout)


module.exports = route;
