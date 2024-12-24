const express = require("express");
const port = 1001
const path = require("path")

const app = express();
const cookie = require('cookie-parser')
app.use(express.urlencoded());

app.use("/", require("./routes"));
app.use(cookie())

app.listen(port, (err) => {
    console.log(err ? err : `Server successfully start on port ${port}`)
});