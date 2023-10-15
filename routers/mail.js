const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

router.post('/' , async (req,res)=>{
    
    const transporter = nodemailer.createTransport({
        service: "gmail",  //  이메일사용 업체 ex 구글:gmail
        auth: {
         user: process.env.MAIL_ID,  // 발송자 이메일
        pass: process.env.MAIL_PASSWORD,  // 발송자 비밀번호
        },
    });
    try{
        const isSendMail = await transporter.sendMail(req.body.mailOptions);
       
        return res.json({isSuccess:true});
    }catch(err){
        console.error(err);
        return res.json({isSuccess:false,err:err});
    }
   
})




module.exports = router;