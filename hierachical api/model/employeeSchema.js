const mongoose = require("mongoose")

const employeeSchema = mongoose.Schema({
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
    createdAt: {
        type: String,
        required: false
    }
});

const employeeRegstr = mongoose.model("employeeRegister", employeeSchema);

module.exports = employeeRegstr