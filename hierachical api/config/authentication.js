const jwt = require("jsonwebtoken");

const auth = (req,res,next) => {
    const token = req.header('Authorization')
    
    if(!token) return res.status(400).json({msg:"token not founded!"})
        const newToken = token.slice(7, token.length)
    
    let decode =  jwt.verify(newToken, "node");
    req.user = decode
    // console.log(decode);
    
    next();
}

module.exports = auth