const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/userModel.js');

module.exports = ()=>{
	passport.use(new LocalStrategy({
	  usernameField: 'id',
	  passwordField: 'pw',
	  passReqToCallback: false,
		}, function (inputid, inputpw, done) {
		
			User.findOne({id:inputid}).then((userInfo)=>{
				if (!userInfo) return done(null,false,{message:'존재하지않는 아이디',isSuceess:false}); 
		
				userInfo.comparePw(inputpw,(err,isMatch)=>{
				if (!isMatch) return done(null, false, { message: '비밀번호가 틀렸습니다',isSuceess:false })
					//로그인 할때마다 업데이트 일자 변경
					userInfo.updatedAt = new Date();		  
					userInfo.save().then((result)=>{
							return done(null, userInfo)
					}).catch((err)=>{
						return done(err);
					})
				})
			}).catch((err)=>{
				return done(err);
			})
		
			
}));
}
