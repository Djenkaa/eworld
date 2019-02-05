const {user} = require('../models/user'); 
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

// CREATE TRANSPORTER FOR MAIL
var transporter = nodemailer.createTransport({
    service:'yahoo',
    auth:{
       user:'mihajlo_crnobrnja@yahoo.com',
       pass:'Pa$$w0rd' 
    }
});

// GET LOGIN PAGE
const logIn = (req, res, next)=>{
    
    res.render('auth/login',{
        error:req.flash('registerError')[0],
        success:req.flash('registerSuccess')[0],
        path:'/'
    });
}
// REGISTER USER
const register = (req, res, next)=>{
    var email = req.body.email;
    var password = req.body.password;
    var username = req.body.username;
    var img = req.body.img
    user.findOne({email:email}).then(el=>{
        if(el){
            req.flash('registerError', 'This email is already in use');
            
            res.redirect('/login');
        }else{
            bcrypt.hash(password, 12).then(pass=>{
                var mailOptions = {
                    from:'djeneralcrni@gmail.com',
                    to:email,
                    subject:'no-replay',
                    text:'Uspesno ste se registrovali :)'
                }
                const newUser = new user({
                    password:pass,
                    email:email,
                    username:username,
                    img:img
                });
                newUser.save().then(doc=>{
                    transporter.sendMail(mailOptions, (err, info)=>{
                        if(err){
                            console.log(err);
                        }
                    });
                    console.log(`korisnik upisan kao ${doc}`);
                    req.flash('registerSuccess', 'You have successfully registered');
                    res.redirect('/');
                }); 
            });
            
        }
    }).catch(err=>{
        console.log('ne moze da se registruje');
    });
    
   
}
// POST LOGIN
const loginAuth = (req, res, next)=>{
    var email = req.body.email;
    var password = req.body.password;
   user.findOne({email:email}).then(doc=>{
        if(!doc){
           
            req.flash('registerError', 'There is not a such user in database');
             res.redirect('/login');
        }else{
            bcrypt.compare(password, doc.password).then(el=>{
                if(el){
                    req.session.status = 'online';
                    doc.save((err,data)=>{
                        req.session.Auth = true;
                    req.session.user = data;
                    req.session.lastLogIn = Date.now();
                    

                    req.session.save(err=>{
                        console.log(err);
                        res.redirect('/home');
                    });
                    });
                    
                }else{
                    req.flash('registerError','Incorrect password');
                    res.redirect('/');
                }
            });
            
           
        }
   }).catch(err=>{
       console.log('ne radi login');
   });
   

}

module.exports = {
    logIn,
    register,
    loginAuth
}