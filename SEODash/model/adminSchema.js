const mongoose = require("mongoose")
const Schema = mongoose.Schema({
    activityName:{
        type: String,
        required: true 
    },
   date:{
        type: String,
        required: true 
    },

    time:{
        type: String, 
        required: true 
    },  
    activityType:{
        type: String, 
        required: true 
    },
    sport:{
        type: String, 
        required: true 
    }, 
    notes:{ 
        type: String,
        required:true
    },
    userid:{
        type:String,
        required:true
    }



})

const admin = mongoose.model("SEODash",Schema)

module.exports = admin