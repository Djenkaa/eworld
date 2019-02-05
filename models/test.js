const mongoose = require('mongoose');


var test = mongoose.model('Test',{
    disable:{
        type:Boolean,
        default:true
    }
    
   
 });
 
 module.exports={test}