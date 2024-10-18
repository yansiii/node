const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    author :{
        type : String,
        required : true
    },
    year :{
        type : Number,
        required : true
    },
    price :{
        type : Number,
        required : true
    }
})

const admin = mongoose.model("Book",schema)

module.exports = admin;