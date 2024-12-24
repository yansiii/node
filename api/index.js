const express = require ("express")
const port = 1001
const path = require("path")
const app = express()
const db = require("./config/db")

app.use (express.urlencoded())
app.use("/", require("./routes/route"))
app.use("uploads/",express.static(path.join(__dirname,"/uploads")))


app.listen (port ,(err)=>{
    err ? console.log(err) : console.log("server start " + port);
    
})