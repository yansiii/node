const regstrSchema = require("../model/registerSchema");
const employeeRegstrSchema = require("../model/employeeSchema");
const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken");
let mailer = require("../config/mailer")
const fs = require("fs");

module.exports.managerLogin = async (req, res) => {
    let data = await regstrSchema.findOne({ email: req.body.email })

    if (data) {
        if (await bcrypt.compare(req.body.password, data.password)) {
            let token = jwt.sign({ data: data }, "node")
            res.status(200).json({ msg: "Manager Login Succesfully !", adminToken: token })
        }
        else {
            res.status(400).json({ msg: "passwrod is incorrect" })
        }
    }
    else {
        res.status(400).json({ msg: "Manager not found, Please try again" })
    }

}

module.exports.profile = async (req, res) => {
   
     
      
        const manager = await regstrSchema.findById(req.user.data.id)
        console.log(manager)
    
        manager ? res.status(200).json({ msg: "response found", manager: manager }) : res.status(400).json({ msg: "data not found" })
       
    }





module.exports.viewManager = async (req, res) => {
    let managerData = await regstrSchema.find({});
    managerData ? res.status(200).json({ msg: "response found", Manager: managerData }) : res.status(400).json({ msg: "data not found" })
}


module.exports.mngrforgetPass = async (req, res) => {
    let data = await regstrSchema.findOne({ email: req.body.email });

    if (!data) {
        return res.status(400).json({ msg: "Manager email is wrong" })
    }

    let otp = Math.floor(Math.random() * 100000 + 900000);
    mailer.adminOtp(req.body.email, otp);

    res.cookie("otp", otp);
    res.cookie("ManagerId", data._id)

    res.status(200).json({ msg: "otp is sended to your email" })
}


module.exports.mngrChangePasscode = async (req, res) => {
    const data = await regstrSchema.findById(req.user.data._id)
    if (await bcrypt.compare(req.body.oldPassword, req.user.data.password)) {
        if (req.body.newPassword == req.body.confirmPassword) {
            let newPass = await bcrypt.hash(req.body.newPassword, 10)
            let changePass = await adminSchema.findByIdAndUpdate(req.user.data._id, { password: newPass })
            res.status(400).json({ msg: "Password Change Succ" })
        } else {
            res.status(400).json({ msg: "New password and confirm password must be same" })
        }
    } else {
        res.status(400).json({ msg: "Password is wrong" })
    }
}

module.exports.addEmployee = async (req, res) => {

    req.body.password = await bcrypt.hash(req.body.password, 10);
   

    let data = await employeeRegstrSchema.create(req.body)
    data ? res.status(200).json({ msg: "employee Added!" }) : res.status(400).json({ msg: "employee not added!, Try again" })

}

module.exports.viewEmployee = async (req,res) => {
    let data = await employeeRegstrSchema.find({});
    data ? res.status(200).json({ msg: "employee founded!", data: data }) : res.status(400).json({ msg: "employee not founded!" })
}

module.exports.deleteEmployee = async (req, res) => {
    let isDelete = await employeeRegstrSchema.findByIdAndDelete(req.query.id)
    isDelete ? res.status(200).json({ msg: "data deleted successfully!" }) : res.status(400).json({ msg: "something went wrong! try again" })
}