const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/userModel.js');

module.exports = () =>{
	passport.serializeUser(function (user, done) {
		console.log(user);
		
  		return done(null, user.id)
	});

	passport.deserializeUser(function (userid, done) {
  		User.findOne({id:userid}, (err,userInfo)=>{
			if (err) return done(err);
			return done(null, userInfo);
		})
	});
	
	local();
}


