const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:'This field is required'
    },
    image:{
        type:String,
        required:'This field is required'
    }
},{timestamps:true})

const admin = mongoose.model("category", categorySchema)

module.exports = admin