const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema({
    productName:{
        type : String,
        required : true
    },
    ProductId:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"ExtraSchema",
        required: true
    },
    price:{
        type:String,
        required:true
    }
    
})

let Product = mongoose.model("ProductSchema",ProductSchema)

module.exports = Product