const nodemailer = require("nodemailer")

const mailer = nodemailer.createTransport({
    service: "gmail",
    auth :{
        user : "isotiyayansi@gmail.com",
        pass :"irgjzpglmqbjhhei",
    },
})

module.exports.sendOtp = (to, otp)=>{
    let mailoptions ={
        from :"isotiyayansi@gmail.com",
        to : to,
        sub : "your password reset OTP",
        text : "your OTP is ${OTP}"
    }
    mailer.sendmailer(mailoptions,(err)=>{
        err ? console.log(err) :console.log("mail sended successfully");
    
        
    })
}