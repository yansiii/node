const mongoose = require("mongoose")

const ExtraSchema = mongoose.Schema({
    ExtraCatName :{
        type : String,
        required : true,
    },

    ExtraCatId:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"subCatSchema",
        required: true,
    }

    
})

let ExtraCatSchema = mongoose.model("ExtraSchema",ExtraSchema)

module.exports = ExtraCatSchema