const nodemailer= require("nodemailer")
const express= require("express")
const {config}= require("dotenv")

config()
const router= express.Router()

router.post('/contactus/sendmail', async(req, res)=>{
    try
    {
        const transport={
            service:"gmail",
            secure:true,
            port: process.env.MAIL_PORT,
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASSWORD,
            }
        }
        const transporter = nodemailer.createTransport(transport)
        transporter.verify((error, success) => {
            if (error) 
            {
                //if error happened code ends here
                console.error(error)
                return;
            }
            if(success)
                //this means success
                console.log('Ready to send mail!')
        })
        const mail={
            from: req.body.email,
            to: process.env.EMAIL,
            subject: 'New Contact Form Submission',
            text:`From: \n\n Name:${req.body.name} \n\n Phone Number: ${req.body.phoneNumber? req.body.phoneNumber :"not mentioned"} \n\n Email: ${req.body.email} \n\n Message: ${req.body.message} 
            `
        }
        transporter.sendMail(mail, (err, data) => {
            if (err) {
                res.status(500).json({success:true, msg:"Unable to send mail"})
            }
            else {
                res.status(200).json({success:false, msg:"Mail sent successfully"})
            }
        })
    }
    catch(err)
    {
        return res.status(500).json({success:false, error:err})
    }
})

module.exports= router