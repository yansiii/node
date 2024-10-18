const express = require("express")
const port = 2323;
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
    let singleData = await adminSchema.findById(req.query.id)
    // let singleData = data.find((item)=> item.id == req.query.id)
    singleData && res.render("edit",{singleData})
})

app.post("/update", async(req,res)=>{
    let data = await adminSchema.findByIdAndUpdate(req.body.id,req.body)
    data && res.redirect("/")
})  

app.listen(port,(err)=>{
    err ? console.log(err): console.log("server started on port :-" + port);
    
})