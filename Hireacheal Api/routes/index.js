const express = require("express");
const routes = express.Router()

const db = require("../config/database");
const adminCtrl = require("../controllers/adminController");

routes.get("/", (req,res) => {
    res.status(200).json({msg:"HomePage"})
})


routes.use("/admin", require("./adminRoute"));
routes.use("/manager", require("./managerRoute"));
routes.use("/employee", require("./employeeRoute"))
module.exports = routes