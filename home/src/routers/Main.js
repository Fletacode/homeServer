
import { Carousel,Image,Container,Row,Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Main() {

  return (
    <>	
	 
	 <Carousel style={{padding:'20px'}}>
	   <Carousel.Item>
        <Image src="https://homeservice.run.goorm.site/images/TempProfile.jpg" 
			height={200}
			
			alt={"프로필이미지 없음"}/>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src="https://homeservice.run.goorm.site/images/TempProfile.jpg" 
			height={200}
			
			alt={"프로필이미지 없음"}/>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src="https://homeservice.run.goorm.site/images/TempProfile.jpg" 
			height={200}
			
			alt={"프로필이미지 없음"}/>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item> 
	  
	  
	 </Carousel>
	 		
	<Container style={{padding: '50px 5px 20px 5px'}}>
	<Row>
        <Col style={{display:'flex',justifyContent: 'center'}}>
			<Image src="https://homeservice.run.goorm.site/images/TempProfile.jpg" 
			height={120}
			roundedCircle
			alt={"프로필이미지 없음"}/>
		</Col>
        <Col style={{display:'flex',justifyContent: 'center'}}>
			<Image src="https://homeservice.run.goorm.site/images/TempProfile.jpg" 
			height={120}
			roundedCircle
			alt={"프로필이미지 없음"}/>
		</Col>
    </Row>		
	</Container>			
		
	
    </>
  );
}




