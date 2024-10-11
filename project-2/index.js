const express = require("express")
const port = 1002
const path = require("path")

const app = express()
app.use(express.urlencoded())

app.set("view engine","ejs")
app.use("/public", express.static(path.join(__dirname,"public")))

app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/shop",(req,res)=>{
    res.render("shop")
})
app.get("/detail",(req,res)=>{
    res.render("detail")
})
app.get("/cart",(req,res)=>{
    res.render("cart")
})
app.get("/checkout",(req,res)=>{
    res.render("checkout")
})
app.get("/contact",(req,res)=>{
    res.render("contact")
})

app.listen(port,(err)=>{
    err ? console.log(err) : console.log("server started " + port);
    
})