
import {Container,Button,Image,ListGroup ,Col,Row,Card,Carousel,Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Reviews(props){

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
            <div>✏️</div>
        </div>
        {(props.reviews)? (<ReviewList reviews={props.reviews}></ReviewList>) : (<div>리뷰없음</div>)}
        


    </Container>
    
    </>
    )
}

function ReviewList(props){
    return(
        <>
        {props.reviews.map((review)=>{
            return(
                <Card style={{ width: '100%' ,display:'flex', flexDirection:'row', justifyContent:'center'}}>
    
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