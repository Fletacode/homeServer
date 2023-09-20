const mongoose = require('mongoose');





const subscriptionBoqSchema = new mongoose.Schema({
    number:{type : String},
    locate :{type : String},
    name :{type : String},
    startDate:{type : String},
    finishDate:{type : String},
    confirmDate:{type : String},
    
},{collection:'subscriptionboq'});



module.exports= mongoose.model('SubscriptionBoq',subscriptionBoqSchema);
