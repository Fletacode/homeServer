const express = require('express');
const User = require( '../models/userModel.js');
const crypto = require('crypto');
const env = require('dotenv').config();
const axios = require('axios');
const { error } = require('console');
const {isLoggedIn,isNotLoggedIn} = require('../middlewares');

const router = express.Router();

router.get('/sendmail/:email' ,isNotLoggedIn ,async (req,res)=>{
   
    if (!req.params.email) res.json({isSuccess:false,msg:'잘못된 요청'});
    try{
        const exUser = await User.findOne({email:req.params.email,provider:'local'});
        const token =  crypto.randomBytes(20).toString('hex');
        if (!exUser) return res.json({isSuccess:false,msg:'해당 이메일의 회원이 존재하지않습니다'});
        const mailOptions = {
            from: process.env.MAIL_ID,
            to: exUser.email,
            subject: "군관사 비밀번호 재설정",
            html: `<h1>군관사 이메일 인증</h1>
                  <h2>유저 아이디:${exUser.id} <h2>
                    <div>
                  아래 버튼을 눌러 비밀번호를 재설정해주세요.
                    </div>
                  <div>
                  <a href='${process.env.SERVER_URL}/resetpw/${token}'>비밀번호 재설정하기</a>
                  </div>`,
            text: "군관사 비밀번호 재설정 메일입니다.",
        };

        const resetpwData = [ {
            id:exUser.id,
            token:token,
            time:new Date().getTime()} ];
        const isUpdate = await User.updateOne({ id: exUser.id }, { $set: {  resetpwData: resetpwData } });
        
        const isSend = await axios.post(process.env.SERVER_URL+'/mail', {mailOptions:mailOptions});
        if (!isUpdate || !isSend.data.isSuccess) throw error; 

        return res.json({isSuccess:true,msg:'비밀번호 재설정 이메일이 전송 되었습니다.'});
    }catch (err){
        console.error(err);
        return res.json({isSuccess:false,msg:err});
    }
})


router.post('/',isNotLoggedIn ,(req,res)=>{
    User.findOne({resetpwData:{ $elemMatch:  {token:req.body.token } } } )
    .then((result)=>{
		if (result) {
	
			if (new Date().getTime() - result.resetpwData[0].time < 600000){
				result.pw = req.body.pw;
				const user = new User(result);
				
                user.save().then((result)=>{
                    return res.status(200).json({isSuccess:true,msg:'변경 성공'});
                }).catch((err)=>{
                    console.error(err);
                    return res.json({isSuccess:false,msg:err});
                })

				
				
			}else{
				return res.status(200).json({isSuccess:false,msg:'비밀번호 재설정 시간이 만료되었습니다. 재설정하세요'});
			}
			
			
			
		}else{
			return res.status(200).json({isSuccess:false,msg:'잘못된 토큰 값입니다'});
		}
    }).catch((err)=>{
        console.error(err);
        return res.status(200).json({isSuccess:false,msg:err});
    })
})




module.exports = router;