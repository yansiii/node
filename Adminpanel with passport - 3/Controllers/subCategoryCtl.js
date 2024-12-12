let catSchema = require("../model/addCatSchema")

let subCatSchema = require("../model/subCatSchema")

module.exports.AddSubCat =async(req,res)=>{
    let data = await catSchema.find({})
   data && res.render("subAddCat",{data})
}
module.exports.SendSubCat=async(req,res)=>{
    console.log(req.body);
    let data  = await subCatSchema.create(req.body)
    data && res.redirect("/subCategory/subAddCat")
}
module.exports.ViewSubCat=async(req,res)=>{
    let data = await subCatSchema.find({})
    .populate({
        path:"categoryId"
    })
    data && res.render("subViewCat",{data})
}