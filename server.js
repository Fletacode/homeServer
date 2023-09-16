const express = require('express');
const app = express();

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportConfig = require('./passport');
passportConfig(); //passport설정
const {isLoggedIn,isNotLoggedIn} = require('./middlewares');


const cookieParser = require('cookie-parser');
const path = require('path');
const mongo = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const cors = require('cors');
const env = require('dotenv').config();

const outsideboq = require( './models/outsideBoqModel.js');
const fs = require('fs');


app.use(cors({
    origin: '*',// 접근 권한을 부여하는 도메인
    method:['GET','POST','DELETE'],
	credentials: true,
}));



app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'home/build')));

app.use(session({
	secret : process.env.SECRETCODE,
	resave : false, 
	saveUninitialized: false,
	session:true,
	cookie:{
		httpOnly:false,
		secure:false
	},
})); //pasport정보 생성
app.use(passport.initialize()); //req에 passport설정
app.use(passport.session()); //req.session에 passport정보 저장
 //세션 설정을 라우터 설정보다 위에 가게해야 라우터에서 req.user로 받아 올수있음


app.use('/auth', require('./routers/auth.js') );
app.use('/boq', require('./routers/boq.js'));




mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	 .then(()=>{
		
		console.log('연결 성공/ 포트:'+process.env.PORT)})
	 .catch((err)=>{console.error(err)});

app.listen(3000, function() {
    console.log("start! express server on port 3000");
})








app.get('*', function (req, res) {
	const jsonData = JSON.parse(fs.readFileSync('./outsideBoq.json', 'utf8')); // JSON 파일 경로에 맞게 수정
	/*
	outsideboq.insertMany(jsonData.DATA).then((docs)=>{
		console.log(`${docs.length}개의 문서가 MongoDB에 삽입되었습니다.`);
	}).catch((err)=>{
		console.log(err);
	})
	*/
	
	res.sendFile(path.join(__dirname,'/home/build/index.html'));
	
});



