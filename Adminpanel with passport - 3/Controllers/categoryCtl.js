const addCatSchema = require("../model/addCatSchema")
const fs = require("fs");


module.exports.addCat = (req,res) =>{
    res.render("addCat")
}
  
module.exports.viewCat = (req,res) =>{
    res.render("viewCat")
}

module.exports.addCatData =async(req,res) =>{
 
    
    req.body.image =  req.file.path
    // req.body.image = "/uploads/" + req.file.filename;
    let data = await addCatSchema.create(req.body)
    data && res.redirect("/category/viewCat")

    console.log(req.body)
   
}

module.exports.viewCat = async(req,res)=>{
    let data = await addCatSchema.find({})
    data && res.render("viewCat",{data})
}

module.exports.catdelete = async(req,res)=>{
    let singleData = await addCatSchema.findById(req.query.id)
    console.log(singleData);
    
    fs.unlinkSync(singleData.image)
   
    let deleteRecord = await addCatSchema.findByIdAndDelete(req.query.id)
    deleteRecord && res.redirect("/category/viewcat")
  
}

module.exports.catedit = async(req,res)=>{
    let data = await addCatSchema.find({})
    let singleData = data.find((item)=>item.id == req.query.id)
    singleData && res.render("editcat",{singleData})
}

module.exports.catupdate = async(req,res) =>{
  
    
    let img = "";
    let singleData = await addCatSchema.findById(req.body.id)
    req.file ? img = req.file.path : img = singleData.image
    req.file && fs.unlinkSync(singleData.image)
    req.body.image = img
    console.log(req.body)
    let data = await addCatSchema.findByIdAndUpdate(req.body.id,req.body)
    data && res.redirect("/")
}