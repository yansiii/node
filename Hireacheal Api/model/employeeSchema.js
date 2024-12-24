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

    phone: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    }
  
});

const employeeRegstr = mongoose.model("employeeRegister", employeeSchema);

module.exports = employeeRegstr