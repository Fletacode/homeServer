const mongoose = require('mongoose');





const reviewsBoqSchema = new mongoose.Schema({
    :{type : String},
    
    
},{collection:'outsideboq'});



module.exports= mongoose.model('OutsideBoq',outsideBoqSchema);
