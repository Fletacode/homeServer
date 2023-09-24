const express = require('express');

const passport = require('passport');

const {isLoggedIn,isNotLoggedIn} = require('../middlewares');
const {join,login} = require('../controllers/auth');

const router = express.Router();

router.post('/join' , isNotLoggedIn , join);

//로그인 기능 passport token안 감
router.post('/login', isNotLoggedIn, login);

router.get('/islogin', isLoggedIn , (req,res)=>{
    console.log(req.user);
    
    res.json({isSuccess:true, user:req.user});
})

router.get('/logout', isLoggedIn, (req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.json({isSuccess:true})
    });
})

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect:'/?loginError=카카오로그인실패',
}), (req,res)=>{
    res.redirect('/');
});

module.exports = router;