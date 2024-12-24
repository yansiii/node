const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let mailer = require("../config/mailer")  

const EmployeRegisterSchema = require('../model/employeeSchema')  


module.exports.employeeLogin = async (req,res) => {
    let data = await EmployeRegisterSchema.findOne({email: req.body.email })
    if(data) {
        if(await bcrypt.compare(req.body.password, data.password)) {
            let token = jwt.sign({data: data}, "node", { expiresIn: "1h" })
            res.status(200).json({ msg: "Employee Login Succesfully", adminToken: token })
        }
        else{
            res.status(400).json({ msg: "passwrod is wrong" })
        }
    }
    else {
        res.status(400).json({ msg: "Employee not found" })
    }
}

module.exports.profile = async (req, res) => {
    console.log(req.user);

    let profile = await EmployeRegisterSchema.findById(req.user.id)
    console.log(profile)
    profile ? res.status(200).json({ msg: "response found", profile: profile }) : res.status(400).json({ msg: "data not found" })
}

module.exports.employeeForgetPass = async (req,res) => {
    let data = await EmployeRegisterSchema.findOne({ email: req.body.email });

    if (!data) {
        return res.status(400).json({ msg: "Employee email is wrong" })
    }

    let otp = Math.floor(Math.random() * 100000 + 900000);
    mailer.adminOtp(req.body.email, otp);

    res.cookie("otp", otp);
    res.cookie("EmployeeId", data._id)

    res.status(200).json({ msg: "otp is sended to your email" })
}

module.exports.employeeChangePass = async (req,res) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    if(await bcrypt.compare(req.body.oldPass, req.user.data.password)) {
        if(req.body.newPass == req.body.conPass){
            let bPass = await bcrypt.hash(req.body.newPass, 10);
            let change = await EmployeRegisterSchema.findByIdAndUpdate(req.user.data._id, { password: bPass })
        }
        else{
            res.status(400).json({ msg: "new password and confirm password must be same" })
        }
    }
    else{
        res.status(400).json({ msg: "password is wrong" })
    }
}