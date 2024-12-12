const adminSchema = require("../model/adminSchema")
const localSt = require("../middleware/passportLocalSt")
const { query } = require("express")
const admin = require("../model/adminSchema")
const mailer = require("../middleware/mailer")


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
 req.flash("success","Login Successfull")

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

module.exports.profile = (req,res) =>{
  res.render("profile")
}

module.exports.changepass = (req,res) =>{
  res.render("changepass")
}

module.exports.checkpass =  async(req,res) =>{
  let user = req.user

  if(req.body.oldpass == user.password){
     if(req.body.newpass !== user.password){
      if(req.body.newpass == req.body.confirmpass){
      
     let passChange = await adminSchema.findByIdAndUpdate(user.id,{password:req.body.newpass})
       res.redirect("/logout")
       console.log(passChange)
      }else{
        console.log("newpasswprd not matched with confirm password")
      }
     }else{
       console.log("new password and old password must be different")
     }
  }else{
    console.log("old password is wrong")
  }
}

module.exports.sendOtp = async(req,res) =>{
  let user = await adminSchema.findOne({email : req.body.email})

  if(!user){
    return res.redirect("/")
  }

  let otp = Math.floor(100000 + Math.random()* 900000)
  console.log(otp)

  mailer.sendOtp(req.body.email, otp);
  req.session.otp = otp
  req.session.adminData = user

  res.render("checkpass")
}

module.exports.checkpass2 = async(req,res) =>{
 
 
 let adminId = req.session.adminData._id
  let otp = req.session.otp

  if(req.body.otp == otp){
    if(req.body.newpass == req.body.confirmpass){
      let changePassword = await adminSchema.findByIdAndUpdate(adminId,{password : req.body.newpass})
      res.redirect("/")
    }else{
      res.redirect("/")
    }
  }else{
    res.redirect("/")
  }
}



