const moment= require('moment');
const mongoose = require('mongoose');
const {user} = require('../models/user');



// PROTECT ROUTES IF USER !AUTH
const protect = (req, res, next)=>{
    if(!req.session.Auth){
        res.redirect('/');
    }
    next();
}

// TIME
const vreme = ((req, res, next)=>{
   user.findById(req.session.user._id).then(doc=>{

   
    var nextTrain = doc.skills.strength.nextTrain;

    if(nextTrain <= Date.now()){
        doc.skills.strength.isTrain = 'not';
        doc.save((err,data)=>{
            req.session.reload(err=>{
                req.session.user = data;
                req.session.save(err=>{
                    next();
                });
            });
        });
    }else{
        next();
    }
   });
   
});




module.exports={
    protect,
   vreme
}