const mongoose = require('mongoose');
const moment = require('moment');

var chatSchema = mongoose.Schema({
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    message:{
        type:String,
        required:true
    },
    time:{
        type:String,
        default:moment(Date.now()).format('HH:mm')
    }
    
},{timestamps:true});

var chat = mongoose.model('Chat',chatSchema);

module.exports={chat}