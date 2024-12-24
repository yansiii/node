const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    image: {
        type: String
    },
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
    hobby: {
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
    createdAt: {
        type: String,
        required: false
    }
})

const admin = mongoose.model("Admin", adminSchema)

module.exports = admin