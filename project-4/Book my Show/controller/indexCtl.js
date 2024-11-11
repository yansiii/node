const admin = require("../model/dbSchema")
const fs = require("fs");

module.exports.homePage = async(req,res) =>{
    let data = await admin.find({})
    data && res.render("index",{data})
}

module.exports.addData = async (req,res) =>{
    req.body.image = req.file.path
    let data = await admin.create(req.body)
    data && res.redirect("/")

}

module.exports.deleteData = async(req,res) =>{
    let singleData = await admin.findById(req.query.id)
    console.log(singleData)

    fs.unlinkSync(singleData.image)
    let deleteRecord = await admin.findByIdAndDelete(req.query.id)
    singleData && res.redirect("back")
}

module.exports.editData = async(req,res) =>{
    let data = await admin.find({})
    let singleData = data.find((item)=>item.id == req.query.id)
    singleData && res.render("edit",{singleData})
}

module.exports.updateData = async(req,res) =>{
    let img = "";
    let singleData = await admin.findById(req.body.id)
    req.file ? img = req.file.path : img = singleData.image
    req.file && fs.unlinkSync(singleData.image)
    req.body.image = img
    console.log(req.body)
    let data = await admin.findByIdAndUpdate(req.body.id,req.body)
    data && res.redirect("/")
}







