
import {Container,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState} from 'react';

export default function Join() {
	const [isLoginActiveCss,setIsLoginActiveCss] = useState(true);
	const LoginActiveCss = (isLoginActiveCss) ? 'nav-link active' : 'nav-link';
	const RegisterActiveCss = (isLoginActiveCss) ? 'nav-link' : 'nav-link active';
	
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
			  
			  
		  </div>
		  	
			  
		  </div>
		  </div>
	  </div>
	  
	  
	  
	  
	  
	  
	  
	  
	 </Container>
	 			
		
	
    </>
  );
}




