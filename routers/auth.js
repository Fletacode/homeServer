const express = require('express');

const passport = require('passport');

const {isLoggedIn,isNotLoggedIn} = require('../middlewares');
const {join,login} = require('../controllers/auth');

const router = express.Router();

router.post('/join' , isNotLoggedIn , join);

//로그인 기능 passport token안 감
router.post('/login', isNotLoggedIn, login);



module.exports = router;