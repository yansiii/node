const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },

    phone: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    
})

const admin = mongoose.model("Admin", adminSchema)

module.exports = admin