const adminSchema = require("../model/adminSchema")
const localSt = require("../middleware/passportLocalSt")
const { query } = require("express")
const admin = require("../model/adminSchema")


module.exports.signin = (req,res) =>{
  res.render("signin")
}

module.exports.handleSignin = async(req,res) =>{
  res.render("signin")
}

module.exports.login = (req,res) =>{
  res.render("login")
}


module.exports.loginAdmin = async(req,res) =>{


  res.redirect("/dashboard")
}

module.exports.logout = (req,res) =>{
  req.session.destroy()
  res.redirect("/")
}


module.exports.dashboard = (req,res)=>{
    res.render("dashboard")
}

module.exports.addadmin = (req,res)=>{
   res.render("addadmin")
}



module.exports.addAdminData = async(req,res)=>{
  console.log("Form Data Received:", req.body); 
   let data = await adminSchema.create(req.body)
  
   data && res.redirect("/viewadmin")
  
}

module.exports.viewadmin = async(req,res)=>{
  let data = await adminSchema.find({})
  console.log(data)
  data &&  res.render("viewadmin",{data})
}

module.exports.deleteData = async(req,res) =>{
  let singleData = await adminSchema.findById(req.query.id)
  let deleteRecord = await adminSchema.findByIdAndDelete(req.query.id);

  singleData && res.redirect("back")
}

module.exports.editData = async(req,res) =>{
  let data = await adminSchema.find({})
  let singleData = data.find((item)=>item.id == req.query.id)
  singleData && res.render("edit",{singleData})
}

module.exports.updateData = async(req,res) =>{
  let singleData = await adminSchema.findById(req.body.id)
  let data = await adminSchema.findByIdAndUpdate(req.body.id,req.body)
  data && res.redirect("/")
}