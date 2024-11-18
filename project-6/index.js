const express = require("express")
const port = 8080
const path = require("path")

const app = express()

app.set ("view engine", "ejs")
app.use("/", require("./routes/route"))


app.use("/public",express.static(path.join(__dirname,"public")))

app.listen(port,(err)=>{
    err ? console.log(err) : console.log("server start :" + port);   
})