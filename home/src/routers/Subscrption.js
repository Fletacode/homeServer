import {Container,Button,Image,Form ,Col,Row,Card,Carousel,Spinner,Dropdown,DropdownButton} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import InfiniteScroll from 'react-infinite-scroll-component';

import {BoqList} from './Boq.js';
import { serverurl } from './serverurl.js';

import { useEffect, useState} from 'react';
import axios from 'axios';


export function Subscrption(){

  const [subs,setSubs] = useState([]);
  const [stRange,setStRange] = useState(0);
  const [maxSubLength,setMaxSubLength] = useState(20);
  const [searchInput,setsearchInput] = useState('');
  const [isSearchClick,setSearchClick] = useState(false);
  const [hasMore,setHasMore] = useState(true);

  useEffect(()=>{
    axios.get(serverurl+`/subscription/info/${stRange}`).then((result)=>{
      
        
        if (result.data.isSuccess){
          setMaxSubLength(result.data.length);
          setSubs(result.data.subs);
        }else{
          throw result.data.isSuccess;
        }
        
    }).catch((err)=>{
      alert('boq정보를 받아올 수 없습니다.');
    })

    

  },[])


  const loadMoreData = ()=>{
    if (isSearchClick){
      searchBoq(false);
    }else{

    setStRange(stRange => stRange + 10);
    
    axios.get(serverurl+`/subscription/info/${stRange}`).then((result)=>{
     
      
      if (result.data.isSuccess){
        
        let temp = [...subs];
        temp.push(...result.data.subs);
        setSubs(temp);
        if (subs.length > maxSubLength) setHasMore(false);
      }else{
        throw result.data.isSuccess;
      }
      
    }).catch((err)=>{
      alert('boq정보를 받아올 수 없습니다.');
    })
  }
  }

  const sortEarlyDate = ()=>{
      let temp = [...subs];
      temp.sort((a,b)=>{
        const aYear =  parseInt(a.startDate.substr(0,4));
        const aMonth = parseInt(a.startDate.substr(5,2));
        const aDay = parseInt(a.startDate.substr(8,2));
        const bYear =  parseInt(b.startDate.substr(0,4));
        const bMonth = parseInt(b.startDate.substr(5,2));
        const bDay = parseInt(b.startDate.substr(8,2));

        if (aYear != bYear) return aYear - bYear;
        
        if (aMonth != bMonth) return aMonth - bMonth;

        return aDay - bDay;
        
      })
      setSubs(temp);
  }

  const sortRecentDate = ()=>{
    let temp = [...subs];
    temp.sort((a,b)=>{
      const aYear =  parseInt(a.startDate.substr(0,4));
      const aMonth = parseInt(a.startDate.substr(5,2));
      const aDay = parseInt(a.startDate.substr(8,2));
      const bYear =  parseInt(b.startDate.substr(0,4));
      const bMonth = parseInt(b.startDate.substr(5,2));
      const bDay = parseInt(b.startDate.substr(8,2));
      let today = new Date();
      let year = today.getFullYear(); // 년도
      let month = today.getMonth() + 1;  // 월
      let date = today.getDate();  // 날짜
      
      let aSumHour = (aYear * 8766) + (aMonth * 731) + (aDay*24);
      let bSumHour = (bYear * 8766) + (bMonth * 731) + (bDay*24);
      let todaySumHour = (year * 8766) + (month * 731) + (date*24);
      return Math.abs(todaySumHour-aSumHour) - Math.abs(todaySumHour-bSumHour);
    })

    setSubs(temp);
  }

  const searchBoq = (isFirst)=>{
    setSearchClick(true);
    const queryParams = {
      input:searchInput
    };
    if (isFirst){
      setStRange(0);
      setHasMore(true);
    }  
    else{
      setStRange(stRange => stRange + 10);
    }
   

    axios.get(serverurl+`/subscription/search/${stRange}`,{params: queryParams})
    .then((result)=>{
      
      let tempSub = [...subs];
      if (result.data.isSuccess){
        if (isFirst){
          setSubs(result.data.boqs);
          setMaxSubLength(result.data.length);
          tempSub = result.data.boqs;
        }else{
          tempSub.push(...result.data.boqs);
          setSubs(tempSub);
          
          setMaxSubLength(result.data.length);
        }
       
        
        if (tempSub.length >= result.data.length) setHasMore(false);
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
              placeholder="지역검색 ex)남양주"
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
          <Button className='m-2' onClick={()=>{sortRecentDate()}}>최신순 정렬</Button>
          
          

      </Card>


      <InfiniteScroll
         dataLength={subs.length}
         next={loadMoreData}
         hasMore={hasMore}
         loader={hasMore ? <h4>Loading...</h4> : null}
      >
        {(subs) ? (<BoqList boqs={subs} kind={'subscription'}></BoqList>) :((<Spinner animation="border" role="status">
            <span className="visually-hidden">조건에 맞는 검색결과가 없습니다</span>
        </Spinner>))}


      </InfiniteScroll>





    </div>    
    </div>
    </Container>


    </>
    )
}