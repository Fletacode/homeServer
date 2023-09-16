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

router.get('/search', async (req,res)=>{
    console.log(req.query);

    try{
        const boqInfos = await  OutsideBoq.find({})
    }catch{

    }
})




module.exports = router;