const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/HirarchiAPI")

const db = mongoose.connection

db.once("open", (err) => {
    console.log(err ? err : "Database connected..")
})

