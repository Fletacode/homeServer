const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;




const userSchema = new mongoose.Schema({
  id : {type : String, required: true},
  pw : {type : String, required: true},
 
  email:{type : String},
  token:{type : String},
  resetpwData:{type: Array},
  provider:{type : String},
  name:{type:String},
},{timestamps:true},{collection:'user'});






// hash password before saving to the database
userSchema.pre('save', function(next) {
 
	const user = this;

  if (user.isModified('pw')) {
	  bcrypt.genSalt(saltRounds, (err,salt)=>{
	  if (err) return next(err)
	  
	  bcrypt.hash(user.pw, salt, (err,hash)=>{
		  if (err) return next(err)
		  
		  user.pw = hash
		  next();
	  })
  })
  }else{
	  next();
  }
});




userSchema.methods.comparePw = function(plainpw,cb){
		
	bcrypt.compare(plainpw,this.pw, (err,isMatch)=>{
		if(err) return cb(err);
		
		return cb(null,isMatch);
	})
}





module.exports= mongoose.model('User',userSchema);
