const express = require("express");
const manager = express.Router()
const managerCtrl = require("../controllers/managerController");
const auth = require('../config/authentication')

manager.post("/managerLogin", managerCtrl.managerLogin)
manager.get("/profile",auth, managerCtrl.profile)
manager.get("/viewManager",auth, managerCtrl.viewManager)
manager.post("mngrforgetPass", managerCtrl.mngrforgetPass)
manager.post("/mngrChangePasscode",auth, managerCtrl.mngrChangePasscode)
manager.post("/addEmployee",auth, managerCtrl.addEmployee)
manager.get("/viewEployee",auth, managerCtrl.viewEmployee)
manager.delete("/deleteEmployee",auth, managerCtrl.deleteEmployee)

module.exports = manager