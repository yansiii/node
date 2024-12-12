const passport = require("passport")
let admin = require("../model/adminSchema")

const localSt = require("passport-local").Strategy

passport.use("local",new localSt (
    {usernameField : "email"}, async(email,password,done)=>{
       let user = await admin.findOne({email:email})

       if(user){
        if(user.password == password){
            return done(null,user)
        }else{
            return done(null,false)  
        }

       }else{
        return done(null,false)
       }
    }

  
))

passport.serializeUser ((user,done)=>{
   return done(null,user.id)
})

passport.deserializeUser(async(id,done)=>{
    let user = await admin.findById(id)

    if(user){
        return done(null,user)
    }else{
        return done(null,false)
    }
})

passport.checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect("/");
    }
};

passport.AuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user; 
    }
    next(); 
};


module.exports = passport;