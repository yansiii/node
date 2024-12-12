const express = require("express")
const path = require("path")
const db = require("./Config/db")
const port = 8004;
const app = express()
app.set("view engine","ejs")
app.use(express.urlencoded({ extended: true }))

const session = require("express-session");
const passport = require("./middleware/passportLocalSt");
const flash = require("connect-flash");
const flashConnect = require("./middleware/flashConnect")

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
app.use(flash());
app.use(flashConnect.setFlash)

app.use(passport.AuthenticatedUser)
app.use("/",require("./routes/route"))
app.use("/category", require("./routes/category"));
app.use("/subcategory", require("./routes/subcategory"));
app.use("/Extra",require("./routes/extra"))
app.use("/product",require("./routes/product"))

app.use(express.static(path.join(__dirname,"/public")))
app.use("/public/uploads", express.static(path.join(__dirname, "public/uploads")));

app.listen(port,(err)=>{
    err ? console.log(err) : console.log("port connected",port)
})