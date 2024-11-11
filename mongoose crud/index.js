const express = require("express")
const port = 6044;
const path = require("path")
const app = express()
app.set("view engine","ejs")
app.use(express.urlencoded())


const db = require("./config/db")
const adminSchema = require("./config/dbSchema")
const fs = require("fs")

app.use("/uploads",express.static(path.join(__dirname,"uploads")))
const multer = require("multer")

const Storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/")

    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + "-" + Date.now())
    }
})

const upload = multer({storage : Storage}).single("image")



app.get("/",async(req,res)=>{
    let data  = await adminSchema.find({})
    console.log(data)
    data && res.render("index",{data})
 })

 app.get("/deleteData",async(req,res)=>{
    let singleData = await adminSchema.findById(req.query.id)
    console.log(singleData);
    fs.unlinkSync(singleData.image)    
    let deleteRecord = await adminSchema.findByIdAndDelete(req.query.id)
    deleteRecord && res.redirect("back")
})

app.get("/editData",async(req,res)=>{
    let data = await adminSchema.find({})
    let singleData = data.find((item)=> item.id == req.query.id )
    singleData && res.render("edit",{singleData})
})

app.post("/update",upload,async(req,res)=>{
    let img = "";
    let singleData = await adminSchema.findById(req.body.id)
    req.file ? img = req.file.path : img = singleData.image
    req.file && fs.unlinkSync(singleData.image)
    req.body.image = img
    console.log(req.body)
    let data  = await adminSchema.findByIdAndUpdate(req.body.id,req.body)
    data && res.redirect("/")
})

app.post("/insert",upload,async(req,res)=>{
    req.body.image = req.file.path
    let data = await adminSchema.create(req.body)
    data && res.redirect("/")
})


app.listen(port,(err)=>{
    err?console.log(err) : console.log("port started : " , port)
})