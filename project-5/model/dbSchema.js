const mongoose = require("mongoose")

const schema = mongoose.Schema({
    image :{
        type:String,
        required:true
    },

    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
})



const admin = mongoose.model("bookMyShow",schema)

module.exports = admin;