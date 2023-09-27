const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
    content:{type : String},
    writer :{type : String, require: true},
    time :{type : String ,require:true},
    buildName:{type : String ,require:true}
    
},{collection:'review'});



module.exports= mongoose.model('Review',reviewSchema);