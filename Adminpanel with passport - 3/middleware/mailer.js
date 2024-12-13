const nodemailer = require("nodemailer");

const mailer = nodemailer.createTransport({
    service :"gmail",
    auth:{
        user:"isotiyayansi@gmail.com",
        pass:"irgjzpglmqbjhhei",
    },
})

module.exports.sendOtp = (to,otp) =>{
    let mailoptions = {
        from: "isotiyayansi@gmail.com",
        to: to,
        subject: "Your Password Reset OTP",
        text: `Your OTP is ${otp}`,
    };
    mailer.sendMail(mailoptions,(err)=>{
        err ? console.log(err) : console.log("mail sended successfully")
    })
}


