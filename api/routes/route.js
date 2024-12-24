const express = require("express")
const route = express.Router();
const ctl = require("../controller/indexCtl")
const upload = require("../multer/multer")

route.get("/",ctl.getRecord);
route.post("/addRecord",ctl.addRecord);
route.delete("/deletData",ctl.deleteData)
route.put("/editData", ctl.EditData)

module.exports = route ;