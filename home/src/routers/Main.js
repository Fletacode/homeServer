
import { Carousel,Image,Container,Row,Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { serverurl } from './serverurl.js';
import { useNavigate} from 'react-router-dom';

export default function Main() {
  const ProfileUrl = `${serverurl}/images/TempProfile.jpg`;
  const homeImgUrl = `${serverurl}/images/mainhomeIcon.png`;
  const subscrptionImgUrl = `${serverurl}/images/mainSubscriptionIcon.png`;
  const navigate = useNavigate();

  return (
    <>
	
	 <Carousel style={{padding:'20px'}} data-interval="0">
	   <Carousel.Item>
        <Image src={ProfileUrl}
			height={200}
			
			alt={"프로필이미지 없음"}/>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src={ProfileUrl}
			height={200}
			
			alt={"프로필이미지 없음"}/>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      
	  
	  
	 </Carousel>
	 		
	<Container style={{padding: '50px 5px 20px 5px'}}>
	<Row>
        <Col style={{display:'flex',justifyContent: 'center',flexDirection: 'column',alignItems: 'center'}}
             onClick={()=>{navigate('/subscrption')}}>
			<Image src={subscrptionImgUrl}
			height={120}
			roundedCircle
			alt={"청약정보"}/>
      <div>청약정보</div>
		</Col>
        <Col style={{display:'flex',justifyContent: 'center',flexDirection: 'column',alignItems: 'center'}}
             onClick={()=>{navigate('/boq')}}>
			<Image src={homeImgUrl}
			height={120}
			roundedCircle
			alt={"관사정보"}/>
      <div>관사정보</div>
		</Col>
    </Row>		
	</Container>			
		
	
    </>
  );
}




