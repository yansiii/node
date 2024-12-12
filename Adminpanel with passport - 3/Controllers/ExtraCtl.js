const SubCatSchema = require("../model/subCatSchema")

const ExtraSchema = require("../model/ExtraSchema")


module.exports.ExtraAddCatData=async(req,res)=>{
    let data = await SubCatSchema.find({})
    data && res.render("ExtraAddCat",{data})
}
module.exports.SendExtraCat=async(req,res)=>{
    let data = await ExtraSchema.create(req.body)
    data && res.redirect("/Extra/ExtraSubAddCat")
}
module.exports.ViewExtraCat=async(req,res)=>{
    let data = await ExtraSchema.find({}).
    populate({
        path:"ExtraCatId",
        populate:{
            path:"categoryId"
        }
    })
    
    console.log(data);
    
   
    // let data = await ExtraSchema.find({})
    data && res.render("ExtraViewCat",{data})

}