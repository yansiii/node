const express = require("express");
const port = 2001;

const app = express()
app.set("view engine","ejs")
app.use(express.urlencoded({ extended: true }))

const db = require("./config/db")

const path = require("path")

app.use("/uploads",express.static(path.join(__dirname,"uploads")))
app.use(express.static(path.join(__dirname, 'views')));
const fs = require("fs");


app.use("/",require("./route/index"))


app.listen(port,(err)=>{
    err ? console.log(err) : console.log("port started : " ,port)
})