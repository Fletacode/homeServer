
import {Container,Button,Image,Form ,Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { serverurl } from './serverurl.js';
import axios from 'axios';
import { useState } from 'react';

export function SearchPw(){
    const [email,setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const ClickResetPw = () =>{
        setIsLoading(true);
        if (!email) alert('이메일을 입력해주세요');
        else{
            axios.get(serverurl+`/resetpw/sendmail/${email}`).then((result)=>{
                if (result.data.isSuccess){
                    alert(result.data.msg);
                    setIsLoading(false);
                }else{
                    alert(result.data.msg);
                    setIsLoading(false);
                }   
            }).catch((err)=>{
                console.error(err);
                alert(err);
                setIsLoading(false);
            })
        }

        
    }


    return(
    <>
    <Container style={{paddingTop: '3rem'}}>
    <div className="row d-flex justify-content-center">
    <div className='col-md-6' >
    <div className='card'>
    <div className='card-body p-4'>

    <div class="form-outline">
						<Form.Group className="mb-3" controlId="formBasicEmail">
        					<Form.Label>비밀번호 재설정</Form.Label>
       					 	<Form.Control type="text" 
								placeholder="회원 가입했던 이메일을 입력해주세요"
                                onChange={(e)=>{setEmail(e.target.value)}}
                                
								/>
        					<Form.Text className="text-muted">
          							카카오,구글,네이버로 회원가입,로그인한경우 이 기능이 제공되지 않습니다
        					</Form.Text>
      					</Form.Group>
						
						
					 </div>

                     {(isLoading)? (<Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>) : ( <Button variant="primary" 
						 style={{width:'100%',marginTop:'30px',marginBottom:'50px'}}
						 onClick={()=>{ClickResetPw()}}
                         disabled={isLoading}
						 >비밀번호 재설정</Button>)}
                    


    </div>
    </div>
    </div> 
    </div>
    </Container>
    </>    
    )
}