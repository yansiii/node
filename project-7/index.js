const express = require("express")
const port = 2005;

const path = require("path")

const app = express();

app.set("view engine","ejs")



app.use("/",require("./routes/route"))

app.use(express.static(path.join(__dirname,"public")))

app.listen(port,(err)=>{
    err ? console.log(err) : console.log("port started : " ,port)
})