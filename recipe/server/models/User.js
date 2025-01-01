const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
    
    },
    hash_password: {
      type: String,
      required: true,
    },
    image:{
      type:String
    },
    description:{
      type:String,
      required:true
    }
  },
  { timestamps: true }
);

userSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.hash_password);
  },
};

const admin = mongoose.model("user", userSchema)

module.exports = admin
