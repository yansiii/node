const multer = require("multer")



const Storage = multer.diskStorage({
    destination :(req,file,cb) =>{
        cb(null,"public/uploads/")
    },

    filename : (req,file,cb) =>{
        cb(null,file.filename + "_" +Date.now())
    }
})

const upload = multer({storage:Storage}).single("image")

module.exports = upload;