const express = require("express")
const employee = express.Router()
const auth = require("../config/authentication")

const employeeCtl = require('../controllers/employeeController')

employee.get("/profile", auth,employeeCtl.profile)
employee.post('/employeeLogin', employeeCtl.employeeLogin)
employee.post("/employeeForgetPass", employeeCtl.employeeForgetPass);
employee.post('/employeeChangePass', auth, employeeCtl.employeeChangePass)

module.exports = employee