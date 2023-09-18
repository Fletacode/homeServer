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
            },
            {
             $skip: parseInt(req.params.st), 
            },
            {
                $limit: 10, 
            },
        ];
        if (req.query.sido == '시도') delete searchQuery[1].$match.sido;
        if (req.query.armyType == '군종류') delete searchQuery[1].$match.a_dvs;
        


        if (!req.query.input) searchQuery.shift();
       
    try{
        
        let boqInfos = await  OutsideBoq.aggregate(searchQuery).exec();
        const boqLength = await OutsideBoq.countDocuments(searchQuery);
        
        if (boqInfos.length == 0){
            searchQuery.shift();
            boqInfos = await  OutsideBoq.aggregate(searchQuery).exec();
        }
        
        return res.json({isSuccess:true,boqs:boqInfos,length:boqLength});
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