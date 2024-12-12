const ProductSchema = require("../model/productSchema")
const ExtraSchema = require("../model/ExtraSchema")

module.exports.AddProduct=async(req,res)=>{
    let data = await ExtraSchema.find({});
    data && res.render("addProduct",{data});
}
module.exports.AddProductData=async(req,res)=>{
   
    let data = await ProductSchema.create(req.body)
    data && res.redirect("/product/addProduct")
}

module.exports.ViewProductCat = async(req,res)=>{
    let data = await ProductSchema.find({}).populate({
        path:"ProductId",
        populate:{
            path:"ExtraCatId",
            populate:{
                path:"categoryId"
            }
        }
    })

    data && res.render("ViewProduct",{data})
}