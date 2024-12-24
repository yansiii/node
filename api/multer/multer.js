const multer = require("multer")

const DataStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename:(req,file,cb)=>{
        cb(nill,file.fieldname + '-' + Date.now())
    }
})

const upload = multer({storage:DataStorage}).single("image")
module.exports = upload