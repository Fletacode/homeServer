const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/userModel.js');

module.exports = () =>{
	passport.serializeUser(function (user, done) {
		
		
  		return done(null, user.id);
	});

	passport.deserializeUser(function (userid, done) {
		User.findOne({id:userid}).then((userInfo)=>{
			return done(null, userInfo);
		}).catch((err)=>{
			return done(err);
		})

  		
	});
	
	local();
	kakao();
	
}


