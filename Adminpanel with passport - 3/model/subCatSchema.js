const mongoose = require("mongoose")

const subCatSchema = mongoose.Schema({
    subcatName:{
        type:String,
        required:true,
    },

    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"addCatSchema",
        required:true,
    },
})

const subcategory = mongoose.model("subCatSchema",subCatSchema)

module.exports = subcategory