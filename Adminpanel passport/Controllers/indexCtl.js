const adminSchema = require("../model/adminSchema")
const localSt = require("../middleware/passportLocalSt")


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

