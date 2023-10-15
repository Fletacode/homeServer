
import {Container,Button,Form,InputGroup ,Col,Row,Card,Carousel,Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState} from 'react';
import axios from 'axios';
import { serverurl } from './serverurl';


export function Reviews(props){
   
    const [showWrite,setShowWrite] =  useState(false);
    const [doitWrite,setDoitWrite] = useState(false);
    const [user,setUser] = useState('');

    


    const checkWriteReview = (inuser)=>{
  
        
        if (!inuser) return;
        
        for (let i = 0; i < props.reviews.length; i++){
          
            if (props.reviews[i]?.writer == inuser?.id || props.reviews[i]?.writer == inuser?.name){
                return;
            }
        }
        setDoitWrite(true);
    }

    useEffect(()=>{
        axios.get(serverurl+`/auth/islogin`)
    .then((result)=>{
      if (result.data.isSuccess){
        checkWriteReview(result.data.user);
        setUser(result.data.user);
      }
    }).catch((err)=>{
      console.log(err);
    })

    

    },[])
    
        
   

    const reviewAndButtonBoxStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '1rem',
      };
    return(
    <>
    <Container className='mt-2'>
        <div style={reviewAndButtonBoxStyle} >
            <h2 style={{margin:"0px"}}>후기</h2> 
            {(doitWrite) ? (<div onClick={()=>{setShowWrite(true)}}>✏️</div>) : null}
        </div>

        {(showWrite) ? (<WriteReview setShowWrite={setShowWrite} 
                                buildName={props.buildName}
                                user={user}
                                setReviews={props.setReviews}
                                reviews={props.reviews}
                                setDoitWrite={setDoitWrite}
                                ></WriteReview>) : null}

        {(props.reviews?.length)? (<ReviewList reviews={props.reviews}></ReviewList>) : (<div>리뷰없음</div>)}
        


    </Container>
    
    </>
    )
}

function ReviewList(props){
    return(
        <>
        {props.reviews.map((review)=>{
            return(
                <Card className='mb-2'
                style={{ width: '100%' ,display:'flex', flexDirection:'row', justifyContent:'center'}}>
    
                <Card.Body>
           
                <Card.Text>{review.content}</Card.Text>
                <span style={{opacity:0.5}}>{review.writer} : {review.time}</span>
                </Card.Body>
                </Card>
            )
        })}
       </>

    )
}


function WriteReview(props){

    const [content,setContent] = useState('');

    const ClickWrite = ()=>{
        axios.post(serverurl+`/review`, {user:props.user,content:content,buildName:props.buildName}).then((result)=>{
            if (result.data.isSuccess){
                let temp = [...props.reviews];
                temp.push(result.data.review);
                props.setReviews(temp);
                props.setDoitWrite(false);
                alert(result.data.msg);
            }else{
                alert(result.data.msg);
            }
        }).catch((err)=>{
            console.error(err);
            alert(err);
        })

        props.setShowWrite(false);
    }

    return(
    <>
    <InputGroup className="mb-3">
        <Form.Control
          placeholder="한줄평 등록"
          aria-label="한줄평 등록"
          aria-describedby="한줄평 등록"
          onChange={(e)=>{setContent(e.target.value)}}
        />
        <Button variant="outline-secondary" 
        id="button-addon2"
        onClick={()=>{ClickWrite()}}>
          등록
        </Button>
      </InputGroup>
    </>
    )
}