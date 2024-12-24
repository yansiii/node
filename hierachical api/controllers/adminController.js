const adminSchema = require("../model/adminSchema");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const mailer = require("../config/mailer");
const path = require("path")
const fs = require("fs");

const regstrSchema = require("../model/registerSchema")

module.exports.addAdmin = async (req, res) => {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    req.body.createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');

    let data = await adminSchema.create(req.body)
    data ? res.status(200).json({ msg: "Admin Added!" }) : res.status(400).json({ msg: "Admin not added!, Try again" })
}

module.exports.viewAdmin = async (req, res) => {
    let data = await adminSchema.find({})
    data ? res.status(200).json({ msg: "admin founded!", data: data }) : res.status(400).json({ msg: "Admin not founded!" })
}

module.exports.deleteData = async (req, res) => {
    let isDelete = await adminSchema.findByIdAndDelete(req.query.id)
    isDelete ? res.status(200).json({ msg: "data deleted successfully!" }) : res.status(400).json({ msg: "something went wrong! try again" })
}

module.exports.adminLogin = async (req, res) => {
    let data = await adminSchema.findOne({ email: req.body.email })
    if (!data) res.status(404).json({ msg: "email not matched!" })
    if (data) {
        if (await bcrypt.compare(req.body.password, data.password)) {
            const token = jwt.sign({ data }, "node") //, { expiresIn: '1h' }
            res.status(200).json({ msg: "Login successfully!", token })
        } else {
            res.status(400).json({ msg: "password not matched, Try again" })
        }
    } else {
        res.status(400).json({ msg: "admin not found" })
    }
}

module.exports.profile = async (req, res) => {
    console.log(req.user);

    let profile = await adminSchema.findById(req.user.id)
    console.log(profile)
    profile ? res.status(200).json({ msg: "response found", profile: profile }) : res.status(400).json({ msg: "data not found" })
}

module.exports.changePassword = async (req, res) => {
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

module.exports.forgetPassword = async (req, res) => {
    let data = await adminSchema.findOne({ email: req.body.email })

    if (!data) {
        res.status(400).json({ msg: "email is wrong" })
    }

    let otp = Math.floor(Math.random() * 100000 + 900000);
    mailer.sendOtp(req.body.email, otp);
    res.cookie("otp", otp);

    res.status(200).json({ msg: "OTP sent successfully !" });
}

module.exports.managerRegstr = async (req, res) => {
    let user = await regstrSchema.findOne({ email: req.body.email })
    if(user) {return res.status(200).json({msg: "already Registerd"})}
    // req.body.image = req.file.path
    req.body.password = await bcrypt.hash(req.body.password, 10)
    req.body.createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');

    let userData = await regstrSchema.create(req.body);
    userData ? res.status(200).json({msg:"Registered!"}) : res.status(400).json({ msg: "something went wrong" })
}

module.exports.viewManager = async (req,res) => {
    let managerData = await regstrSchema.find({});
    managerData ? res.status(200).json({ msg: "response found", Manager: managerData }) : res.status(400).json({ msg: "data not found" })
}

module.exports.deleteManager = async (req,res) => {
    let singleData = await regstrSchema.findById(req.params.id);
    console.log(singleData);
    fs.unlinkSync(singleData.image)
    let isDeleteData = await regstrSchema.findByIdAndDelete(req.query.id)
    isDeleteData ? res.status(200).json({ msg: "Mangaer data deleted successfully!" }) : res.status(400).json({ msg: "Manager data is not deleted" })
}