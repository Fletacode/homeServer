const mongoose = require('mongoose');





const outsideBoqSchema = new mongoose.Schema({
    build_type:{type : String},
    a_dvs:{type : String, index: true},
    mng_unit:{type : String,index: true},
    build_nm:{type : String,index: true},
    sido:{type : String,index: true},
    sigun:{type : String,index: true},
    eupmyeon:{type : String,index: true},
    build_year:{type : String},
    sply:{type : String},
    und20:{type : String},
    up20und30:{type : String},
    up30und40:{type : String},
    up40:{type : String},
    
},{collection:'outsideboq'});



module.exports= mongoose.model('OutsideBoq',outsideBoqSchema);
