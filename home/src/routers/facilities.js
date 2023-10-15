import axios from 'axios';
const REST_API_KEY = '642366c0335a689ad5bf76f53c97a02f'; // 여기에 실제 Kakao API 키를 삽입해야 합니다.
//const jsonfile = fs.readFileSync('./outsideBoq.json', 'utf8');
//const Boqdat = JSON.parse(jsonfile).DATA;

//const Boq = (index) => Boqdat[index];
const boqtoAddr = (Boq, excludeBuilding) => {
  if(excludeBuilding == false)
    return `${Boq.sido} ${Boq.sigun} ${Boq.eupmyeon} ${Boq.build_nm}`;
  else return `${Boq.sido} ${Boq.sigun} ${Boq.eupmyeon}`;
}

function getMapinfo (qry) {
  return new Promise((resolve, reject) => {
    axios.get('https://dapi.kakao.com/v2/local/search/address.json', {
      params: {
        query: qry
      },
      headers: {
        'Authorization': `KakaoAK ${REST_API_KEY}`
      }
    }).then((response)=>
    {
      if(response.data.meta.total_count == 0)
      {
        console.log("fetching region info..");
        reject("err");
      }
      else resolve({ x: response.data.documents[0].x , y: response.data.documents[0].y});
    }) ;
  }) 
}



function addrTOcoor(individualBoq)
{ 

  const addresswithBuildnm = boqtoAddr(individualBoq, false);
  const addresswoBuildnm = boqtoAddr(individualBoq, true);

  return getMapinfo(addresswithBuildnm)
  .then((res) => {return res}, 
  ()=> {
    return getMapinfo(addresswoBuildnm)
  });
}

const category = [
  "MT1", //대형마트
  "PS3", //어린이집, 유치원
  "HP8",//병원
  "SC4", //학교
  "SW8",//지하철역

  "CS2", //편의점
  "AC5",//학원
  "PK6",//주차장
  "OL7",//주유소,충전소
  "BK9",//은행
  "CT1",//문화시설
  "AG2",//중개업소
  "PO3",//공공기관
  "AT4",//관광명소
  "AD5",//숙박
  "FD6",//음식점
  "CE7",//카페
  "PM9"//약국
];

const bbb = {
  build_type: "연립",
  a_dvs: "공군",
  mng_unit: "제5공중기동비행단",
  build_nm: "연립관사 6동",
  sido: "부산광역시",
  sigun: "강서구",
  eupmyeon: "대저2동",
  build_year: "1994",
  sply: "8",
  und20: "",
  up20und30: "8",
  up30und40: "",
  up40: ""
};



async function neighbooringFacilities (coordinate, category_code, radius=7000) 
{
  let returnval;
  await axios.get('https://dapi.kakao.com/v2/local/search/category.json', {
    params: {
      'category_group_code': category_code,
      'radius': radius, // 기본 반경 7km내로 검색 제한
      'x':coordinate.x,
      'y':coordinate.y,
      'sort': 'distance'  //거리순 정렬
    },
    headers: {
      'Authorization': `KakaoAK ${REST_API_KEY}`
    }
  })
  .then((response) => {
    // 요청이 성공하면 여기에서 응답 데이터를 처리할 수 있습니다.
    returnval = response.data.documents;
  })
  return returnval;
  
}


export {addrTOcoor, neighbooringFacilities, category, bbb};




