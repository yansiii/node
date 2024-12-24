const mongoose = require("mongoose");

const register = mongoose.Schema({
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
    }
 
   
})

const registeredSchema = mongoose.model("registration", register)

module.exports = registeredSchema