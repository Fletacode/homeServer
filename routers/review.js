const express = require('express');

const {isLoggedIn,isNotLoggedIn} = require('../middlewares');
const Review = require( '../models/reviewModel.js');

const router = express.Router();

router.post('/', isLoggedIn ,(req,res)=>{
    console.log(req.body);
    let today = new Date();

    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);

    const setReview = {
        writer: (req.user?.id) ? req.user.id : req.user?.name,
        content: req.body.content,
        buildName:req.body.buildName,
        time:`${year}.${month}.${day}`,
    }
    const saveReview = new Review(setReview);
    saveReview.save().then((result)=>{
        res.json({isSuccess:true,review:result,msg:"리뷰가 등록되었습니다"});
    }).catch((err)=>{
        console.log(err);
        res.json({isSuccess:false,msg:'에러'});
    })
    
})

router.get('/:build_nm' , async (req,res)=>{
    try{
        
        const build_nm = req.params.build_nm;
        
        const findReviews = await Review.find({buildName:build_nm});
      
        return res.json({isSuccess:true,reviews:findReviews});
    }catch(err){
        return res.json({isSuccess:false,msg:err});
    }
    

    
})





module.exports = router;