const {user} = require('../models/user');

// POST MESSAGE
const postMessage = (req, res, next)=>{
    var id=req.body.id;
    var message = req.body.message
    console.log(id);
    user.findById(id).then(doc=>{
     doc.message.messages.push({
         from:req.session.user._id,
        inbox:message
     });
     doc.message.newMessage++;
     doc.save((err,data)=>{
        res.json({
            message:'uspesno ste poslali poruku korisniku !'
        });
     });  
    });
   
}

//GET INBOX PAGE
const getInbox = (req,res,next)=>{
    user.findById(req.session.user._id).populate('message.messages.from').then(doc=>{
        doc.message.newMessage = 0;
        doc.save((err,data)=>{
            res.render('messages/inbox',{
                path: '/inbox',
                message:doc.message.messages,
                user:doc
            });
        }); 
       
    });
   
}


//GET ALERT PAGGE
const getAlert = (req, res, next)=>{
    user.findById(req.session.user._id).then(doc=>{
        doc.alert.newAlert=0;
        doc.save((err,data)=>{
            res.render('messages/alerts',{
                path: '/alerts',
                user:data
            });
        });
        
    });
}

// POST REPLAY
const postReplay = (req, res, next)=>{
    var messageID = req.body.messageID;
    var userEmail = req.body.userEmail;
    var mentionedTtext = req.body.mentionedTtext;
    var replayMess = req.body.replayMess;
    // console.log(messageID);
    // console.log(userEmail);
    // console.log(mentionedTtext);
    // console.log(replayMess);

user.find({email:userEmail}).then(doc=>{
   
    

    doc.save((err,data)=>{
        res.json({
            message:'uspesno poslata poruka !',
            text:replayMess
           });
    });
  
});
   
    

}

const postDeleteInbox = (req, res , next)=>{
    user.findById(req.session.user._id).then(doc=>{
        doc.message.messages = [];
        doc.save((err,data)=>{
            res.redirect('/inbox');
        });
    });
}

const postDeleteAlert = (req, res, next)=>{
    user.findById(req.session.user._id).then(doc=>{
        doc.alert.alerts = [];
        doc.save((err,data)=>{
            res.redirect('/alerts');
        });
    });
}

module.exports={
    postMessage,
    getInbox,
    getAlert,
    postReplay,
    postDeleteInbox,
    postDeleteAlert
}