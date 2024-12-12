const express = require("express")
const port = 8880;
const path = require("path")
const db = require("./Config/db")

const app = express()
app.set("view engine","ejs")
app.use(express.urlencoded({ extended: true }))

const session = require("express-session");
const passport = require("passport");

app.use(session ({
    name :"local",
    secret:"local",
    resave:true,
    saveUninitialized:false,
    cookie:{maxAge:100*100*60}

})
)

app.use(passport.initialize());
app.use(passport.session());

app.use("/",require("./routes/route"))

app.use(express.static(path.join(__dirname,"public")))

app.listen(port,(err)=>{
    err ? console.log(err) : console.log("port connected",port)
})