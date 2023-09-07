import { Navbar,Container,Nav,Offcanvas,Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState} from 'react';
import { useNavigate} from 'react-router-dom';



export default function NavBar() {
	const [profiles,setProfiles] = useState('');
	 const navigate = useNavigate();
	
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
	 <Container>
	 	 <Navbar.Brand href="/">슬군생</Navbar.Brand>			
		 <Navbar.Toggle aria-controls="basic-navbar-nav" />
		 <Navbar.Offcanvas
              aria-labelledby='basic-navbar-nav'
              placement="end"
            > 
			 <Offcanvas.Header closeButton>
				 {(profiles) ? (<Profile></Profile>) : (<Offcanvas.Title  
															onClick={()=>{navigate('/join')}}>
															로그인하세요
														</Offcanvas.Title>)}
				 
                
              </Offcanvas.Header>
		 
		 	   <Offcanvas.Body>
		 			<Navbar.Collapse id="basic-navbar-nav">
			 			 <Nav className="me-auto">
				  			<Nav.Link href="#home">Home</Nav.Link>
			  			</Nav>
		  			</Navbar.Collapse>
			   </Offcanvas.Body>
			 
		</Navbar.Offcanvas>	 	 
	 </Container>
	</Navbar>
    </>
  );
}


function Profile(){
	return(
	<>	
		<div style={{display:'flex',alignItems: 'center'}}>
		<Image src="https://homeservice.run.goorm.site/images/TempProfile.jpg" 
			roundedCircle
			height={55}
			style={{padding:'10px'}}
			alt={"프로필이미지 없음"}/>
		<div>이름</div>
		</div>
		
	</>
	)
}


