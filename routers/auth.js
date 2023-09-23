const express = require('express');

const passport = require('passport');

const {isLoggedIn,isNotLoggedIn} = require('../middlewares');
const {join,login} = require('../controllers/auth');

const router = express.Router();

router.post('/join' , isNotLoggedIn , join);

//로그인 기능 passport token안 감
router.post('/login', isNotLoggedIn, login);

router.get('/islogin', isLoggedIn , (req,res)=>{
    
    
    res.json({isSuccess:true, userID:req.user.id});
})

router.get('/logout', isLoggedIn, (req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.json({isSuccess:true})
    });
})

module.exports = router;