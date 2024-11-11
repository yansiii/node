const express = require("express")

const port = 8001;


const app =express()
app.set("view engine","ejs")
app.use(express.urlencoded())

const path = require("path")

const db = require("./config/db")
const adminSchema = require("./model/dbSchema")
const multer = require("multer")

app.use("/",require("./routes/index"))

app.use("/uploads",express.static(path.join(__dirname,"uploads")))

app.listen(port,(err)=>{
    err? console.log(err) : console.log("port started  :",+port)
})