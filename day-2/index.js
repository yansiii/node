const express = require("express")
const port = 3022;

const app = express()
app.set("view engine" , "ejs")
app.use(express.urlencoded());

let students = [
    {
        id : 1,
        name : "yansi",
        subject : "react",
        city : "surat"
    },
    {
        id : 2,
        name : "sahil",
        subject : "js",
        city : "ahm"
    },
    {
        id : 3,
        name : "smit",
        subject : "node",
        city : "rajkot"
    }
]


app.get('/',(req,res)=>{
    res.render("index",{students})
})

app.post ("/insert",(req,res)=>{
req.body.id = students.length+1
students.push(req.body)
console.log(req.body);

res.redirect("/")

})

app.get("/delete",(req,res)=>{
    // let id = req.query.Id
    // let data = students.filter((item)=> item.id != id)
    // students = data
    // res.redirect("back")

    let data = students.filter((item)=>
        item.id != req.query.Id 
    )
    students = data
    res.redirect("back")
})

app.get("/edit/:id",(req,res)=>{
    let singleData = students.find((item)=>item.id == req.params.id)
    singleData && res.render("edit",{singleData})
})

app.post("/update",(req,res)=>{
    students.map((e,i)=>{
        if(e.id == req.body.id){
            e.id = req.body.id,
            e.name = req.body.name,
            e.subject = req.body.subject,
            e.city = req.body.city
        } else{
            e
        }
    })
    res.redirect("/")
})

app.listen(port,(err)=>{
    err ? console.log(err): console.log("server started on port :-" + port);
    
})