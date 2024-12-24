const express = require("express")
const port = 1008

const app = express()
app.use(express.urlencoded())




app.listen(port,(err)=>{
    err ? console.log(err) : console.log("server started " + port);
    
})