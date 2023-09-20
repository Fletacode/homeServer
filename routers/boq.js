const express = require('express');
const OutsideBoq = require( '../models/outsideBoqModel.js');

const router = express.Router();

    
router.get('/info/:st', async (req,res)=>{
    
    try{
        const boqInfos = await  OutsideBoq.find().skip(req.params.st).limit(10);
        const boqLength = await OutsideBoq.countDocuments({});

        return res.json({isSuccess:true,boqs:boqInfos,length:boqLength});
    }catch{
        return res.json({isSuccess:false});
    }
})

router.get('/search/:st', async (req,res)=>{
   
   
    let searchQuery = [
            {
            $search: {index: 'default', 
                      text: {
                          query: req.query.input, 
                          path: ['mng_unit','build_nm','sigun','eupmyeon'] 
                      },
                    },
            },
            {
                $match:{
                    sido: req.query.sido,
                    a_dvs:req.query.armyType
                }
            }
            
        ];
        const skipObject = {$skip: parseInt(req.params.st), };
        const limitObject = {$limit: 10};

        //입력값 검사
        if (req.query.sido == '시도') delete searchQuery[1].$match.sido;
        if (req.query.armyType == '군종류') delete searchQuery[1].$match.a_dvs;
        if (!req.query.input) searchQuery.shift();
       
    try{
        //최대길이
        let boqLength = await OutsideBoq.aggregate(searchQuery).exec();
        
        searchQuery.push(skipObject);
        searchQuery.push(limitObject);
        let boqInfos = await  OutsideBoq.aggregate(searchQuery).exec();
    
        
        if (boqInfos.length == 0){
            
            searchQuery.shift(); //입력값으로 검색($search)하는거 x, $match로만 검색
            searchQuery.pop();
            searchQuery.pop();
            boqLength = await OutsideBoq.aggregate(searchQuery).exec();
            searchQuery.push(skipObject);
            searchQuery.push(limitObject);
            boqInfos = await  OutsideBoq.aggregate(searchQuery).exec();
        }
        
        return res.json({isSuccess:true,boqs:boqInfos,length:boqLength.length});
    }catch (err){
        console.log(err);
        return res.json({isSuccess:false});
    }
})

router.get('/detailinfo/:id', async (req,res)=>{
   
    try{
        const boqInfo = await OutsideBoq.findOne({_id:req.params.id});

        return res.json({isSuccess:true,boq:boqInfo});
    }catch(err){


        return res.json({isSuccess:false, err: err});
    }
   
    


})


module.exports = router;