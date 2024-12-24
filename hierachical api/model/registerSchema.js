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
    password: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    role: {
        type : String,
        required : true,
        default : "Manager"
    },
    createdAt: {
        type: String,
        required: false
    }
})

const registeredSchema = mongoose.model("registration", register)

module.exports = registeredSchema