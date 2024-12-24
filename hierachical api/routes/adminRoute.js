const express = require("express");
const admin = express.Router()

const db = require("../config/database");
const adminCtrl = require("../controllers/adminController");
const auth = require("../config/authentication")
const multer = require("multer");

const Storage = multer.diskStorage({
    destination: (req, file, db) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    }
})

const upload = multer({storage : Storage}).single("image")

admin.post("/addAdmin", adminCtrl.addAdmin);
admin.get("/viewAdmin", adminCtrl.viewAdmin);
admin.delete("/deleteData", adminCtrl.deleteData);
admin.get("/profile",auth, adminCtrl.profile)
admin.post("/adminLogin", adminCtrl.adminLogin);
admin.post("/changePassword", auth, adminCtrl.changePassword);
admin.post("/forgetPassword", auth, adminCtrl.forgetPassword);
admin.post('/managerRegstr', adminCtrl.managerRegstr);
admin.get('/viewManager', adminCtrl.viewManager);
admin.delete("/deleteManager", adminCtrl.deleteManager);

module.exports = admin