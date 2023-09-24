
import {Container,Button,Image,Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState} from 'react';
import { useNavigate} from 'react-router-dom';

import { serverurl } from './serverurl.js';
import axios from 'axios';

export default function Join() {
	const navigate = useNavigate();

	const [isLoginActiveCss,setIsLoginActiveCss] = useState(true);
	const LoginActiveCss = (isLoginActiveCss) ? 'nav-link active' : 'nav-link';
	const RegisterActiveCss = (isLoginActiveCss) ? 'nav-link' : 'nav-link active';
	const LoginActiveCss2 = (isLoginActiveCss) ? 'tab-pane fade show active' : 'tab-pane fade';
	const RegisterActiveCss2 = (isLoginActiveCss) ? 'tab-pane fade' : 'tab-pane fade show active';
	
	const [idJoin,setIdJoin] = useState('');
	const [pwJoin,setPwJoin] = useState('');
	const [email,setEmail] = useState('');
	const [idLogin,setIdLogin] = useState('');
	const [pwLogin,setPwLogin] = useState('');

	const naverImgUrl = serverurl+'/images/naver_login_small.png';
	const kakaoLoginImgUrl = serverurl+'/images/kakao_login_small.png';
	const gooleLoginImgUrl  = serverurl+'/images/goole_login_small.png';
	const ClickJoin = ()=>{
		const joinData = {
			id:idJoin,
			pw:pwJoin,
			email:email
		}
		axios.post(serverurl+'/auth/join',joinData)
		.then((result)=>{
			if (result.data.isSuccess){
				alert(result.data.msg);
				window.location.replace('/');
			}else{
				alert(result.data.msg);
			}
		}).catch((err)=>{
			console.log(err);
			alert('회원가입 오류');
		})
	}
	
	const ClickLogin = ()=>{
		const LoginData = {
			id:idLogin,
			pw:pwLogin,
		}
		axios.post(serverurl+'/auth/login',LoginData)
		.then((result)=>{
			if (result.data.isSuccess){
				alert(result.data.msg);
				window.location.replace('/');
			}else{
				alert(result.data.msg);
			}
		}).catch((err)=>{
			console.log(err);
			alert('로그인 오류');
		})
	}
	
	const ClickisLogin = ()=>{
		axios.get(serverurl+"/auth/islogin").then((result)=>{
            if (result.data.isSuccess){
				
            }else{
                

            }
        }).catch((err)=>{
            console.log(err);
        })
	}

	

	
	const iconStyle = {
    borderRadius: '100%', 
  	};
	
	
	
  return (
    <>	
	<Container style={{paddingTop: '3rem'}}>
	  <div className="row d-flex justify-content-center">
		  <div className='col-md-6' >
		  <div className='card'>
		  <div className='card-body p-4'>
			  <ui className='nav nav-pills nav-fill mb-3'>
			  <li className='nav-item' onClick={()=>{setIsLoginActiveCss(true)}}><a className={LoginActiveCss}>Login</a></li>
			   <li className='nav-item'onClick={()=>{setIsLoginActiveCss(false)}} ><a className={RegisterActiveCss}>Register</a></li>
			  </ui>
			  <div className='tab-content'>
			  
			  <div className={LoginActiveCss2} aria-labelledby="tab-login">
				<Form>
					<div class="text-center mb-3">
						<p>Sign in with:</p>
						
						<Image src={naverImgUrl}
							height={40}
							style={{margin:'0px 10px 10px 10px'}}
					
							alt={"네이버로그인"}/>
						<a href="https://bug-free-spoon-v7qv667gwqwhwvpp-3000.app.github.dev/auth/kakao">
						<Image src={kakaoLoginImgUrl} 
							height={40}
							style={{margin:'0px 10px 10px 10px'}}
							alt={"카카오로그인"}
							
							/>

						</a>
						
						<Image src={gooleLoginImgUrl}
							height={40}
							style={{margin:'0px 10px 10px 10px'}}
							alt={"구글로그인"}/>
						
						<p>or:</p>
					</div>
					<div class="form-outline">
						<Form.Group className="mb-3" controlId="formBasicEmail">
        					<Form.Label>아이디</Form.Label>
       					 	<Form.Control type="text" 
								placeholder="아이디를 입력해주세요"
								onChange={(e)=>{setIdLogin(e.target.value)}}/>
        					<Form.Text className="text-muted">
          							아이디를 입력해주세요
        					</Form.Text>
      					</Form.Group>
						
						<Form.Group className="mb-3" controlId="formBasicEmail">
        					<Form.Label>비밀번호</Form.Label>
       					 	<Form.Control type="password" 
								placeholder="비밀번호를 입력해주세요"
								onChange={(e)=>{setPwLogin(e.target.value)}}/>
        					<Form.Text className="text-muted">
          							비밀번호를 입력해주세요
        					</Form.Text>
      					</Form.Group>
					 </div>
					
					 <div class="col-md-6 d-flex justify-content-center"><a href="#!">비밀번호를 잊으셨습니까?</a></div>
						
					 <Button variant="primary" 
						 style={{width:'100%',marginTop:'30px',marginBottom:'50px'}}
						 onClick={()=>{ClickLogin()}}
						 >로그인</Button>
				  </Form>
				
			  </div>
			  
			  <div className ={RegisterActiveCss2} aria-labelledby="tab-register">
				  <Form>
					<div class="text-center mb-3">
						<p>Sign in with:</p>
						
						<Image src={naverImgUrl}
							height={40}
							style={{margin:'0px 10px 10px 10px'}}
					
							alt={"네이버로그인"}/>
						<Image src={kakaoLoginImgUrl} 
							height={40}
							style={{margin:'0px 10px 10px 10px'}}
							alt={"카카오로그인"}/>
						<Image src={gooleLoginImgUrl}
							height={40}
							style={{margin:'0px 10px 10px 10px'}}
							alt={"구글로그인"}/>
						
						<p>or:</p>
					</div>
					<div class="form-outline">
						<Form.Group className="mb-3" controlId="formBasicEmail">
        					<Form.Label>아이디</Form.Label>
       					 	<Form.Control type="text" 
								placeholder="아이디를 입력해주세요"
								onChange={(e)=>{setIdJoin(e.target.value)}}/>
        					<Form.Text className="text-muted">
          							아이디를 입력해주세요
        					</Form.Text>
      					</Form.Group>
						
						<Form.Group className="mb-3" controlId="formBasicEmail">
        					<Form.Label>비밀번호</Form.Label>
       					 	<Form.Control type="password" 
								placeholder="비밀번호를 입력해주세요"
								onChange={(e)=>{setPwJoin(e.target.value)}}/>
        					<Form.Text className="text-muted">
          							비밀번호를 입력해주세요
        					</Form.Text>
      					</Form.Group>
						
						<Form.Group className="mb-3" controlId="formBasicEmail">
        					<Form.Label>이메일</Form.Label>
       					 	<Form.Control type="email" 
								placeholder="이메일을 입력해주세요"
								onChange={(e)=>{setEmail(e.target.value)}}/>
        					<Form.Text className="text-muted">
          							이메일을 입력해주세요
        					</Form.Text>
      					</Form.Group>
					 </div>
					
					
						
					 <Button variant="primary" 
						 style={{width:'100%',marginTop:'30px',marginBottom:'50px'}}
						 onClick={()=>{ClickJoin()}}>회원가입</Button>
				  </Form>
			  </div>  
				
			  
			  </div>
			  
		  </div>
		  	
			  
		  </div>
		  </div>
	  </div>
	  
	  
	  
	  
	  
	  
	  
	  
	 </Container>
	 			
		
	
    </>
  );
}




