const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")


const port = 1051;


const app = express()
const db = require("./config/db")

app.set("view engine" , "ejs")
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/",require("./routes/route"))

app.use(express.static(path.join(__dirname,"public")))


app.listen(port , (err)=>{
    err ? console.log(err) : console.log("port started" , port)
})