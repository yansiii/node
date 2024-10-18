const express = require("express")
const port = 3333;
const path = require("path")

const app = express()
const db = require("./config/db")
const adminSchema = require("./config/dbSchema")

app.set("view engine" , "ejs")
app.use(express.urlencoded());
app.use("/public", express.static(path.join(__dirname,"public")))


app.get('/', async(req,res)=>{
    let data = await adminSchema.find({})
    console.log(data)
    data && res.render("index",{data})
})

app.post ("/insert",async (req,res)=>{
let data = await adminSchema.create(req.body)
data && res.redirect("/")

})

app.get("/deleteData", async(req,res)=>{
    let deleteRecord = await adminSchema.findByIdAndDelete(req.query.id)
    deleteRecord && res.redirect("back")
})

app.get("/editData", async(req,res)=>{
    let data = await adminSchema.find({})
    let singleData = data.find((item)=> item.id == req.query.id)
    singleData && res.redirect("edit",{singleData})
})

app.post("/update", async(req,res)=>{
    let data = await adminSchema.findByIdAndUpdate(req.body.id,{
        name : req.body.name,
        subject : req.body.subject,
    })
    data && res.redirect("/")
})  

app.listen(port,(err)=>{
    err ? console.log(err): console.log("server started on port :-" + port);
    
})