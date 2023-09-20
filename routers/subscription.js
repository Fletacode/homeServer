const express = require('express');
const SubscriptionBoq = require( '../models/subscriptionBoqModel.js');

const router = express.Router();



router.get('/info/:st', async(req,res)=>{
    try{
        const subInfos = await  SubscriptionBoq.find().skip(req.params.st).limit(10);
        const subLength = await SubscriptionBoq.countDocuments({});
        
        return res.json({isSuccess:true,subs:subInfos,length:subLength});
    }catch(err){
        return res.json({isSuccess:false,err:err});
    }
})

router.get('/search/:st', async (req,res)=>{
   
    
    let searchQuery = [
        {
            $search: {
              index: "default",
              text: {
                query: req.query.input,
                
                path: ['locate','name'] 
                
              },
            },
          },
            
            {
             $skip: parseInt(req.params.st), 
            },
            {
                $limit: 10, 
            },
        ];
    
    
       
    try{
        let boqInfos;
        let boqLength;
        if (!req.query.input){
            boqInfos =  await SubscriptionBoq.find().skip(req.params.st).limit(10);
            boqLength = await SubscriptionBoq.countDocuments({});
        }else{
            boqInfos = await  SubscriptionBoq.aggregate(searchQuery).exec();
            boqLength = await SubscriptionBoq.aggregate(searchQuery).exec();
        }
        
        
        return res.json({isSuccess:true,boqs:boqInfos,length:boqLength.length});
    }catch (err){
        console.log(err);
        return res.json({isSuccess:false});
    }
})







module.exports = router;