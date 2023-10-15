
import {Container,Button,Image,Form ,Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { serverurl } from './serverurl.js';
import axios from 'axios';
import { useState} from 'react';
import { useParams} from 'react-router-dom';

export function ResetPw(){
    const {token} = useParams();
    const [pw,setPw] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const ClickResetPw = () =>{
        setIsLoading(true);
        if (!pw) alert('비밀번호를 입력해주세요');
        else if (pw.length <= 5) alert('비밀번호가 너무 짧습니다');
        else if (pw.length >= 20) alert('비밀번호가 너무 깁니다');
        else{
            axios.post(serverurl+`/resetpw`,{token:token,pw:pw}).then((result)=>{
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
        
        setIsLoading(true);
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
								placeholder="비밀번호를 입력해주세요"
                                onChange={(e)=>{setPw(e.target.value)}}
                                
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