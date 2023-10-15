import * as facilities from "./facilities";
import {Container,Button,Image,ListGroup ,Carousel,Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState} from 'react';

import { serverurl } from './serverurl.js';
import {Reviews} from './Reviews.js';

import axios from 'axios';
import { useNavigate,useParams,Link} from 'react-router-dom';


export  function BoqDetailed() {
	let {id} = useParams();
  const tempImgUrl = `${serverurl}/images/defaultBoqDetail.png`;
	const [boq,setBoq] = useState('');
  const [reviews, setReviews] = useState('');
  const [stations,setStations] = useState(['1']);
  const [user,setUser] = useState('');
  
  const [majorFac, setMajorFac] = useState(false);
  const majorCat = facilities.category.slice(0,5);

  useEffect(()=>{

    




    axios.get(serverurl+`/boq/detailinfo/${id}`)
    .then((result)=>{
        if (result.data.isSuccess){
          setBoq(result.data.boq);
          axios.get(serverurl+`/review/${result.data.boq.build_nm}`)
          .then((result)=>{
            if (result.data.isSuccess){
              setReviews(result.data.reviews);
            }else{
              throw "err";
            }
            }).catch((err)=>{
              alert("에러 입니다"+err);
            })

            facilities.addrTOcoor(result.data.boq).then((coordinate) =>
            {
              Promise.all(majorCat.map((category) => facilities.neighbooringFacilities(coordinate, category)))
              .then((major) => {setMajorFac(major); console.log(major)})
              .catch((err)=>alert(err));
            });


        }else{
          throw "err";
        }
    }).catch((err)=>{
        alert("에러 입니다"+err);
    })

    

    
  },[])


  return (
    <>	
      <Container className="mt-5">
      <div className="row d-flex justify-content-center">
      <div className='col-md-6' >
      <Carousel style={{padding:'20px'}}>
	   <Carousel.Item>
        <Image src={tempImgUrl}
			height={300}
			
			alt={"프로필이미지 없음"}/>
        <Carousel.Caption>
          <h3>예시 사진</h3>
        
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src={tempImgUrl}
			height={300}
			
			alt={"프로필이미지 없음"}/>
        <Carousel.Caption>
          <h3>예시 사진</h3>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src={tempImgUrl}
      height={300}
			
			alt={"프로필이미지 없음"}/>
        <Carousel.Caption>
        <h3>예시 사진</h3>
          
        </Carousel.Caption>
      </Carousel.Item> 
	  
	  
	 </Carousel>

    {(boq) ? (<BoqContent boq={boq}></BoqContent>) : (<Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>)}

    <Container className='mt-2'>
    <h2>주변 시설</h2>
    <ListGroup>
    {majorFac ?     
        <div>{majorFac.map((eachCat) => eachCat.length == 0 ? <></> : <Periphery fac={eachCat[0]} />)}</div>
        
         : 
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
    }
    </ListGroup>
    </Container>
    

    <div style={{    background: '#F8F9FA',
                padding: '5px'}}></div>
    {(reviews)? (<Reviews reviews={reviews} setReviews={setReviews}  buildName={boq.build_nm}></Reviews> ):
     (<Spinner animation="border" role="status">
     <span className="visually-hidden">Loading...</span>
   </Spinner>)}
      



      </div>
      </div>
      </Container>
	 			
		
	
    </>
  );
}


export function BoqContent(props){
    return (
      <>
      <Container className='mt-2' >
      
        <h1>{props.boq.build_nm}</h1>
        <h3>관리부대:{props.boq.a_dvs} {props.boq.mng_unit}</h3>
        <h4>위치:{props.boq.sido} {props.boq.sigun} {props.boq.eupmyeon}</h4>

        <div>공급세대:{props.boq.sply}</div>
        <div>준공년도:{props.boq.build_year}</div>
        {(props.boq.und20) ? (<div>20평미만 세대수:{props.boq.und20}</div>) : null}
        {(props.boq.up20und30) ? (<div>20~30평 세대수:{props.boq.up20und30}</div>) : null}
        {(props.boq.up30und40) ? (<div>30~40평 세대수:{props.boq.up30und40}</div>) : null}
        {(props.boq.up40) ? (<div>40평이상 세대수:{props.boq.up40}</div>) : null}
    </Container>
      
      </>
    );
}

export function Periphery(props){
 
 
  
  return(
    <>
    <Link to={props.fac.place_url} target="_blank" style={{ textDecoration: 'none' }}>
      <ListGroup.Item>
        {`${props.fac.category_group_name}: ${props.fac.distance / 1000}km 거리에 ${
                  props.fac.place_name}`}
      </ListGroup.Item>
    </Link>
    </>
  )
}




