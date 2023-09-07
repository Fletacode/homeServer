exports.isLoggedIn = (req, res, next) => {
	
	
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(200).json({isSuccess:false,msg:'로그인이 필요합니다'});
  }
};

exports.isNotLoggedIn = (req, res, next) => {
	
	
  if (!req.isAuthenticated()) {
	 
    next();
  } else {
    res.status(200).json({isSuccess:false,msg:'로그아웃이 필요합니다'});
  }
};

exports.isAdminLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()){
	 if (req.user.id == 'admin') {
     next();
  }else{
	  res.status(200).json({isSuccess:false,msg:'관리자만 이용할 수 있습니다'});
  } 
  }
	else {
    res.status(200).json({isSuccess:false,msg:'관리자만 이용할 수 있습니다'});
  }
};