
const adminSchema = require("../model/adminSchema")
const UserSchema = require("../model/UserSchema")


module.exports.signup= (req,res) =>{
    res.render("signup")
}

module.exports.dashboard = (req,res) =>{
   let user = req.cookies.userData
   user ? res.render("dashboard") : res.redirect("/signin")

}

module.exports.handleSignup = async (req, res) =>{
    let existingUser = await UserSchema.findOne({"email" : req.body.email})
    if(existingUser){
        return res.render("signup",{error : "user not found"})
    }
    let data = await UserSchema.create(req.body)
   
    res.redirect("/signin")
}

module.exports.signin = async(req,res) =>{
    res.render("signin")
}

module.exports.handleSignin = async (req, res) =>{
   
    let existingUser = await UserSchema.findOne({"email" : req.body.email})

    console.log(existingUser);
    

    if(!existingUser){
        return res.render("signin",{error : "user not found"})
    }
    if(req.body.password === existingUser.password){
        res.cookie("userData",existingUser)
       res.redirect("/dashboard")
    }
}

module.exports.addAdmin = (req,res)=>{
    let user = req.cookies.userData
    user ? res.render("addAdmin") : res.redirect("/")
}

module.exports.addAdminData = async(req,res) =>{
    req.body.userid = req.cookies.userData._id
    let data = await adminSchema.create(req.body)
    data && res.redirect("/addAdmin")
    console.log(req.body)

    
}

module.exports.viewAdmin = async(req,res) =>{
    if(req.cookies.userData){
        let data = await adminSchema.find({})
        let UID = data.filter(item => item.userid == req.cookies.userData._id)
        data &&  res.render("viewAdmin",{UID})
    }else{
        res.redirect("/")
    }
   
}

module.exports.editData = async(req,res)=>{
    let data = await adminSchema.find({})
    let singleData = data.find((item)=> item.id == req.query.id)
    singleData && res.render("edit",{singleData})
}

module.exports.updateData = async(req,res)=>{
   
    
    let data = await adminSchema.findByIdAndUpdate(req.body.id,req.body)
    console.log(data)
    data && res.redirect("/viewAdmin")
}



module.exports.deleteData =async(req,res) =>{
   

    let deleteRecord = await adminSchema.findByIdAndDelete(req.query.id)
    deleteRecord && res.redirect("back")
}



module.exports.logout =(req,res) =>{
    res.clearCookie("adminData")
    res.redirect("/")
}


