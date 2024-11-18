const mongoose = require("mongoose")

const Schema = mongoose.Schema({
    name :{
        type:String,
        required:true
    },

    email :{
        type:String,
        required:true
    },

    password :{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    hobby :{
        type:[String],
        required:true
    },
    image :{
        type:String,
        required:true
    },
})

const admin = mongoose.model("AdminPanel",Schema)

module.exports = admin