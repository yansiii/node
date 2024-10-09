const http = require("http");
const port = 8000;

const portHandler = (req,res)=>{
    res.write("<h1>  server started </h1>")
    res.end()
}

let server = http.createServer(portHandler);

server.listen(port,(err)=>{
    err ? console.log(err): console.log("server started on port " + port);
})  