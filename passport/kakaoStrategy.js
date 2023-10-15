const passport = require('passport');
const kakoStrategy = require('passport-kakao').Strategy;
const env = require('dotenv').config();
const User = require('../models/userModel.js');


module.exports = ()=>{
 
    passport.use(new kakoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL:'https://bug-free-spoon-v7qv667gwqwhwvpp-3000.app.github.dev/auth/kakao/callback',
    } , async (accessToken, refreshToken, profile, done)=>{
       

        try{
            const exUser = await User.findOne({id: profile.id, provider:'kakao'});

            if (exUser){
                done(null,exUser);
            }else{
                const newUser = await User.create({
                    id : profile.id,
                    provider:"kakao",
                    email:profile?._json?.kakao_account?.email,
                    name:profile.displayName,
                    img_url:profile?._json?.properties?.profile_image
                })
                done(null,newUser);
            }
        }catch(err){
            console.error(err);
            done(err);
        }
    }));

}