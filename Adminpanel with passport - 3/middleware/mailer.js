const nodemailer = require("nodemailer");

const mailer = nodemailer.createTransport({
    service :"gmail",
    auth:{
        user:"meghnagondaliya15@gmail.com",
        pass:"mavmyejilndetjly",
    },
})

module.exports.sendOtp = (to,otp) =>{
    let mailoptions = {
        from: "meghnagondaliya15@gmail.com",
        to: to,
        subject: "Your Password Reset OTP",
        text: `Your OTP is ${otp}`,
    };
    mailer.sendMail(mailoptions,(err)=>{
        err ? console.log(err) : console.log("mail sended successfully")
    })
}


