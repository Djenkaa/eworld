const mongoose = require('mongoose');

var marketSchema = mongoose.Schema({
    img:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    attribute:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        default:0.5
    },
    tag:{
        type:String,
        
    },
    add:{
        type:Number,
       
    }
});

var market = mongoose.model('Market',marketSchema);

module.exports={
    market
}