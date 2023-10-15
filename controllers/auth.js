const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/userModel.js');


exports.join = async(req,res,next) =>{
	const {id,pw,email} = req.body;
	
	try{
		const exUser = await User.findOne({id:id,email:email});
		if (exUser){
			return res.json({isSuccess:false,msg:'존재하는 아이디,이메일입니다.'});
		}
		req.body.provider = "local";
		const iUser = await new User(req.body);
		
		await iUser.save().then((saveResult)=>{
			
		}).catch((err)=>{
			if (err) return res.json({isSuccess:false,msg:'회원 저장 오류'});
		})
		
		
		return res.json({isSuccess:true,msg:'회원가입 되었습니다.'});
	} catch (err){
		console.error(err);
		return next(err);
	}
	
}

exports.login = (req,res,next) =>{
	
	passport.authenticate('local', (authError,user,info) =>{
		
		if (authError){
			
			return next(authError);
		}
		if (!user){
			
			return res.json({isSuccess:false,msg:info.message});
		}
		return req.login(user, (loginError)=>{
			if (loginError){
			
				return next(loginError);
			}
			return res.json({isSuccess:true,msg:'로그인 성공!'});
		});
	})(req,res,next);
	
	
}