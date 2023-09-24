
import {Container,Button,Image,Form ,DropdownButton,Row,Card,Spinner,Dropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useEffect, useState} from 'react';

import { serverurl } from './serverurl.js';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

export default function Boq() {
	const navigate = useNavigate();
  
	const [boqs,setBoqs] = useState([]);
  const [stRange,setStRange] = useState(0);
  const [maxBoqLength,setMaxBoqLength] = useState(20);
  const [hasMore,setHasMore] = useState(true);

  const [searchArmyType,setSearchArmyType] = useState('군종류');
  const [searchSido,setSearchSido] = useState('시도');
  const [searchInput,setsearchInput] = useState('');

  useEffect(()=>{
    axios.get(serverurl+`/boq/info/${stRange}`).then((result)=>{
      
        
        if (result.data.isSuccess){
          setMaxBoqLength(result.data.length);
          setBoqs(result.data.boqs);
          
        }else{
          throw result.data.isSuccess;
        }
        
    }).catch((err)=>{
      alert('boq정보를 받아올 수 없습니다.');
    })

    

  },[])
  
  const loadMoreData = ()=>{
   

    if (searchArmyType !== '군종류' || searchSido !== '시도' || searchInput){
      searchBoq(false);

    }else{

    setStRange(stRange => stRange + 10);
    
    axios.get(serverurl+`/boq/info/${stRange}`).then((result)=>{
     
      
      if (result.data.isSuccess){
        
        let temp = [...boqs];
        temp.push(...result.data.boqs);
        setBoqs(temp);
        if (temp.length >= result.data.length-1) setHasMore(false);
      }else{
        throw result.data.isSuccess;
      }
      
    }).catch((err)=>{
      alert('boq정보를 받아올 수 없습니다.');
    })

  }
  }

  const searchBoq = (isFirst)=>{
  
   
    
    const queryParams = {
      armyType: searchArmyType,
      sido: searchSido,
      input:searchInput
    };
    if (isFirst) {
      setStRange(0);
      setHasMore(true);
    }
    else{
     
      setStRange(stRange => stRange + 10);
    }

    axios.get(serverurl+`/boq/search/${stRange}`,{params: queryParams}).then((result)=>{
      
      
      if (result.data.isSuccess){
       
        let tempBoq = [...boqs];
        if (isFirst){
          console.log(result.data.boqs);
          setBoqs(result.data.boqs);
          setMaxBoqLength(result.data.length);
          tempBoq = result.data.boqs;
        }else{
        
          tempBoq.push(...result.data.boqs);
          setBoqs(tempBoq);
          setMaxBoqLength(result.data.length);
        }
        
        if (tempBoq.length >= result.data.length-1) {
          setHasMore(false);
          
        }
      }else{
        throw result.data.isSuccess;
      }
      
    }).catch((err)=>{
      console.error(err);
      alert('boq정보를 받아올 수 없습니다.');
    })
  }


  return (
    <>	
      <Container className="mt-5">
      <div className="row d-flex justify-content-center">
      <div className='col-md-6' >
      <Row className='mb-2'>
        
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="관사검색 ex)동구 제5공중기동비행단"
              className="me-2 rounded-pill"
              aria-label="Search"
              onChange={(e)=>{setsearchInput(e.target.value)}}
             
            />
            <Button className="rounded-pill" variant="outline-primary"
              onClick={()=>{searchBoq(true)}}>
              Search
            </Button>
          </Form>

          
      
       
      </Row>

      <Card className='mb-2' style={{ width: '100%' ,display:'flex', flexDirection:'row', justifyContent:'start'}}>
          <DropdownButton id="dropdown-basic-button" title={searchArmyType} className='m-2'>
          <Dropdown.Item onClick={()=>{setSearchArmyType('육군')}}>육군</Dropdown.Item>
          <Dropdown.Item onClick={()=>{setSearchArmyType('공군')}}>공군</Dropdown.Item>
          <Dropdown.Item onClick={()=>{setSearchArmyType('해군')}}>해군</Dropdown.Item>
          </DropdownButton>

          <DropdownButton id="dropdown-basic-button" title={searchSido} className='m-2'>
          <Dropdown.Item onClick={()=>{setSearchSido('서울특별시')}}>서울특별시</Dropdown.Item>
          <Dropdown.Item onClick={()=>{setSearchSido('부산광역시')}}>부산광역시</Dropdown.Item>
          <Dropdown.Item onClick={()=>{setSearchSido('대구광역시')}}>대구광역시</Dropdown.Item>
          <Dropdown.Item onClick={()=>{setSearchSido('인천광역시')}}>인천광역시</Dropdown.Item>
          <Dropdown.Item onClick={()=>{setSearchSido('광주광역시')}}>광주광역시</Dropdown.Item>
          <Dropdown.Item onClick={()=>{setSearchSido('대전광역시')}}>대전광역시</Dropdown.Item>
          <Dropdown.Item onClick={()=>{setSearchSido('울산광역시')}}>울산광역시</Dropdown.Item>
          <Dropdown.Item onClick={()=>{setSearchSido('세종특별자치시')}}>세종특별자치시</Dropdown.Item>
          <Dropdown.Item onClick={()=>{setSearchSido('경기도')}}>경기도</Dropdown.Item>
          <Dropdown.Item onClick={()=>{setSearchSido('강원특별자치도')}}>강원특별자치도</Dropdown.Item>
          <Dropdown.Item onClick={()=>{setSearchSido('충청북도')}}>충청북도</Dropdown.Item>
          <Dropdown.Item onClick={()=>{setSearchSido('충청남도')}}>충청남도</Dropdown.Item>
          <Dropdown.Item onClick={()=>{setSearchSido('전라북도')}}>전라북도</Dropdown.Item>
          <Dropdown.Item onClick={()=>{setSearchSido('전라남도')}}>전라남도</Dropdown.Item>
          <Dropdown.Item onClick={()=>{setSearchSido('경상북도')}}>경상북도</Dropdown.Item>
          <Dropdown.Item onClick={()=>{setSearchSido('경상남도')}}>경산남도</Dropdown.Item>
          <Dropdown.Item onClick={()=>{setSearchSido('제주특별자치도')}}>제주특별자치도</Dropdown.Item>
          
          </DropdownButton>

      </Card>

    
      <InfiniteScroll
         dataLength={boqs.length}
         next={loadMoreData}
         hasMore={hasMore}
         loader={hasMore ? <h4>Loading...</h4> : null}
      >
        {(boqs) ? (<BoqList boqs={boqs} kind={'boq'}></BoqList>) :
          ((<Spinner animation="border" role="status">
          </Spinner>))}


      </InfiniteScroll>
      
      
      
      
      
      
      </div>
      </div>
      
    </Container>
	 			
    </>
  );
}


export function BoqList(props){
  const navigate = useNavigate();
  
    return(
    <>
      {props.boqs.map((boq)=>{
        return(
        <>
        <Card style={{ display:'flex', flexDirection:'row', justifyContent:'center',margin:'10px'}}
              onClick={()=>{navigate(`/${props.kind}/${boq._id}`)}}
              key={boq._id}>
        {(props.kind == 'subscription') ?  (<><Card.Body>
        <Card.Title>{boq.number}</Card.Title>
        <Card.Text>{boq.name}</Card.Text>
        <Card.Text>{boq.startDate} ~ {boq.finishDate}</Card.Text>
        </Card.Body></>) : (<Card.Body>
        <Card.Title>{boq.build_nm}</Card.Title>
        <Card.Text>{boq.a_dvs} {boq.mng_unit}</Card.Text>
        <Card.Text>{boq.sido} {boq.sigun} {boq.eupmyeon}</Card.Text>
        </Card.Body>)}
        
        </Card>

        </>
        )
      })}
    
    </>

    )
}




