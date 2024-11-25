const express = require("express")
const cookieParser = require("cookie-parser")
const path = require("path")
const fs = require("fs")
const db = require("./Config/db")

const port = 3036
const app = express()
app.set("view engine","ejs")
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/",require("./routes/route"))


app.use("/uploads",express.static(path.join(__dirname,"uploads")))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "views")))

app.listen(port,(err)=>{
    err ? console.log(err) : console.log("port started : " ,port)
})