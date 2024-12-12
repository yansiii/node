const mongoose = require("mongoose")


const schema = mongoose.Schema({
    catName :{
        type:String,
        required:true
    },

    image :{
        type:String,
        required:true
    },

   

})

const admin = mongoose.model("addCatSchema",schema)

module.exports = admin