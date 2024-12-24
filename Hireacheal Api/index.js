const express = require("express");
const port = 8008;
const path = require("path")

const app = express();
const cookie = require('cookie-parser')
app.use(express.urlencoded());

app.use("/", require("./routes"));
app.use(cookie())

app.listen(port, (err) => {
    err ? console.log(err) : console.log("server started on port" , port)
});