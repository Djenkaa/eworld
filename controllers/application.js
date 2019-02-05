var {
    user
} = require('../models/user');
var {
    chat
} = require('../models/chat');
var {
    test
} = require('../models/test');
const moment = require('moment');


// GET HOME PAGE
var getHome = function (req, res, next) {
    user.findById(req.session.user._id).then(el=>{
        chat.find().sort({
            updatedAt: 'desc'
        }).populate('from').then(doc => {
    
            res.render('shop/index', {
                path: '/home',
                message: doc,
                user:el
    
    
            });
        }).catch(err => {
            console.log('nije moguce ucitati home page');
        });
    });
    
}

//POST MESSAGE
const postMessage = (req, res, next) => {
    var message = req.body.message;

    var newMessage = new chat({
        from: req.session.user._id,
        message: message

    });

    newMessage.save().then(doc => {

        res.redirect('/home');
    }, err => {
        console.log('poruka nije poslata ');
    });


}

// POST LOGOUT
const logout = (req, res, next) => {
    user.findById(req.session.user._id).then(doc => {
        req.session.status = 'offline';
       
           
            req.session.destroy(err => {
               res.redirect('/');
            });
       
    });

}

// GET TRAIN PAGE
const getTrain = (req, res, next) => {
    user.findById(req.session.user._id).then(doc => {
        res.render('shop/train', {
            path: '/train',
            user: doc,
            success: req.flash('success'),
            error: req.flash('error')
           

        });
    }).catch(err => {
        console.log('ne moze da se ucita stranica /train');
    });

}

// POST TRAIN PAGE
const postTrain = (req, res, next) => {
    var str = parseInt(req.body.str);



    user.findById(req.session.user._id).then(doc => {
        if (doc.skills.energy < 10) {
            req.flash('error', 'You do not have enough energy to train');

            return res.redirect('/train');

        }

        doc.skills.strength.value += 20;
        doc.skills.energy -= 10;
        doc.skills.strength.isTrain = 'yes';
        doc.skills.level.experience += 7;
       
        if (doc.skills.level.experience >= doc.skills.level.nextLevel) {
            doc.skills.level.lvl++;
            doc.skills.gold+=5;
            doc.skills.level.experience -= doc.skills.level.nextLevel;
            doc.skills.level.nextLevel = Math.floor(doc.skills.level.nextLevel * 1.5);
            doc.alert.alerts.push({
                alertMessage:"Congratulations on your level up.As a reward you got 5 gold"
            });
            doc.alert.newAlert++;

        }
        var current = parseInt(moment(Date.now()).get('date'));
        var time = moment(Date.now()).date(current + 1);
        doc.skills.strength.nextTrain = Date.now()+(1000*60*60*24);


        doc.save((err, data) => {
            console.log(data.skills.strength.isTrain);
            // req.session.reload(err => {
            //     req.session.user = data;
            //     req.session.save(err => {
                    req.flash('success', 'You have successfully trained, your strength has increased by 20 points.Come tomorrow and train again!');
                    res.redirect('/train');
            //     });
            // });

        });

    }).catch(err => {
        console.log('neuspesan pokusaj treninga');
    });
}

// GET PROFILE PAGE
const getProfile = (req, res, next) => {
    var id = req.params.id;
    user.findById(req.session.user._id).then(el=>{
        user.findById(id).then(doc => {
            var bar = (doc.skills.level.experience / doc.skills.level.nextLevel)*100;
            console.log(bar);
            res.render('shop/profile', {
                path: '/profile',
                users: doc,
                bar:bar,
                user:el
            });
        });
    }).catch(err => {
        console.log('nece da ucita profilnu stranicu');
    });
   
}
module.exports = {
    getHome,
    postMessage,
    logout,
    getTrain,
    postTrain,
    getProfile

}