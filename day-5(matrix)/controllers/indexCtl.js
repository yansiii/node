const adminSchema = require("../Config/adminSchema")
const upload = require("../middleware/multer");


const fs = require("fs")


module.exports.login = (req,res) =>{
    res.render("login")
}

module.exports.loginAdmin = async(req,res) =>{
   let admin = await adminSchema.findOne({"email" : req.body.email})

   if(!admin){
    return console.log("user not found")
   }
 
   if(req.body.password == admin.password){
      res.cookie("AdminData",admin)
      res.redirect("/dashboard")
   }
}

module.exports.dashboard = (req,res) =>{
   let admin = req.cookies.AdminData
   admin ? res.render("dashboard") : res.redirect("/");
}

module.exports.logout=(req,res)=>{
    res.clearCookie("AdminData")
    res.redirect("/")
}


module.exports.addAdmin = (req,res) =>{
    let admin = req.cookies.AdminData
    admin ? res.render("addAdmin") : res.redirect("/")
}

module.exports.addAdminData = async(req,res)=>{
    req.body.image = req.file.path
    console.log(req.body)
    let data = await adminSchema.create(req.body)
    data && res.redirect("/addAdmin")
}

module.exports.viewAdmin=async(req,res)=>{
    if(req.cookies.AdminData){
        let data = await adminSchema.find({})
        data && res.render("viewAdmin",{data})
    }else{
        res.redirect("/")
    }
 
  
}

module.exports.deleteData = async(req,res) =>{
    let singleData = await adminSchema.findById(req.query.id)
    console.log(singleData)

    fs.unlinkSync(singleData.image)
    let deleteRecord = await adminSchema.findByIdAndDelete(req.query.id)
    singleData && res.redirect("back")
}

module.exports.editData = async(req,res)=>{
    let data = await adminSchema.find({})
    let singleData = data.find((item)=>item.id == req.query.id)
    singleData && res.render("edit",{singleData})
}

module.exports.updateData = async(req,res) =>{
    let img = " ";
    let singleData = await adminSchema.findById(req.body.id)
    req.file ? img = req.file.path : img = singleData.image
    req.file && fs.unlinkSync(singleData.image)
    req.body.image = img
    console.log(req.body)
    let data = await adminSchema.findByIdAndUpdate(req.body.id,req.body)
    data && res.redirect("/")
}
