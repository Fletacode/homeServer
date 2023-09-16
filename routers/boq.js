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
                          path: ['mng_unit','build_nm'] 
                      },
                    },
            },
            {
                $match:{
                    sido: req.query.sido,
                    a_dvs:req.query.armyType
                }
            },
            {
             $skip: parseInt(req.params.st), // skip 스테이지 추가
            },
            {
                $limit: 10, // limit 스테이지 추가
            },
        ];
    
        if (!req.query.input) searchQuery.shift();

    try{
        
        let boqInfos = await  OutsideBoq.aggregate(searchQuery).exec();
        const boqLength = await OutsideBoq.countDocuments(searchQuery);
        if (!boqInfos) {
            searchQuery.shift();
            boqInfos = await OutsideBoq.aggregate(searchQuery).exec();
        }
        return res.json({isSuccess:true,boqs:boqInfos,length:boqLength});
    }catch (err){
        console.log(err);
        return res.json({isSuccess:false});
    }
})




module.exports = router;