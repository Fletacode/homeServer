import { Navbar,Container,Nav,Offcanvas,Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import { serverurl } from './serverurl.js';

export function NavBar() {
	const [userID,setUserID] = useState('');
	const navigate = useNavigate();

	const navLogourl = serverurl+'/images/navlogo.png';
	
	useEffect(()=>{
		
        axios.get(serverurl+"/auth/islogin").then((result)=>{
            if (result.data.isSuccess){
				setUserID(result.data.userID);
            }else{
                

            }
        }).catch((err)=>{
            
        })
		
    },[])
	
	const LogOut = ()=>{
		axios.get(serverurl+'/auth/logout').then((result)=>{
			if (result.data.isSuccess){
				window.location.replace("/");
			}
		}).catch((err)=>{
			console.log(err);
			
		})
	}

  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
	 <Container>
	 	 <Navbar.Brand href="/">
			<Image src={navLogourl}
			roundedCircle
			height={55}
			style={{padding:'10px'}}
			alt={"프로필이미지 없음"}/></Navbar.Brand>			
		 <Navbar.Toggle aria-controls="basic-navbar-nav" />
		 <Navbar.Offcanvas
              aria-labelledby='basic-navbar-nav'
              placement="end"
            > 
			 <Offcanvas.Header closeButton>
			 <Image src={navLogourl}
			roundedCircle
			height={55}
			style={{padding:'10px'}}
			alt={"프로필이미지 없음"}/>
				 
                
              </Offcanvas.Header>
		 
		 	   <Offcanvas.Body>
		 			<Navbar.Collapse id="basic-navbar-nav">
			 			 <Nav className="me-auto">
						  {
						(userID) ? (<div style={{display:'flex', justifyContent: 'space-between'}}> 
					<div style={{display : 'flex',justifyContent : 'center', alignItems : 'center' ,opacity:"0.7"}}>{userID}님 안녕하세요!</div> 
					  <div onClick={()=>{LogOut()}}>로그아웃</div>
				  </div> ) :  (<div style={{display:'flex', justifyContent: 'space-between'}}> 
					<div style={{display : 'flex',justifyContent : 'center', alignItems : 'center' ,opacity:"0.7"}}>로그인이 필요합니다</div> 
					  <Nav.Link href="/join">로그인/회원가입</Nav.Link>
				  </div>)
					}
				  			<Nav.Link href="/">Home</Nav.Link>
			  			</Nav>
		  			</Navbar.Collapse>
			   </Offcanvas.Body>
			 
		</Navbar.Offcanvas>	 	 
	 </Container>
	</Navbar>
    </>
  );
}


export function Profile(props){
	return(
	<>	
		<div style={{display:'flex',alignItems: 'center'}}>
		{(props.imgurl) ? (<Image src={props.imgurl}
			roundedCircle
			height={55}
			style={{padding:'10px'}}
			alt={"프로필이미지 없음"}/>) : null}
		
		<div>{props.userID}님</div>
		</div>
		
	</>
	)
}


