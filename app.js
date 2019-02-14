var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var csrf = require('csurf');
const oprem = require('./routes/auth');
const session = require('express-session');
const mongoSession = require('connect-mongodb-session')(session);
var indexRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
var messageRouter = require('./routes/messages');
const flash = require('connect-flash');
const moment = require('moment');
const helmet = require('helmet');
const compression = require('compression');

var app = express();
var csrfPro = csrf();

app.use(helmet());
app.use(compression());

const store =  new mongoSession({
  uri: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-8gg55.mongodb.net/${process.env.MONGO_DATABASE}`,
  collection:'sessions'
   
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'my secret', resave:true, saveUninitialized:false, rolling:true, store:store,
cookie:{
    maxAge:1000*60*8   
}
}));
app.use(csrfPro);
app.use(flash());


app.use((req, res, next)=>{
  res.locals.isLog = req.session.Auth;
  res.locals.status = req.session.status;
  res.locals.current = req.session.user;
  res.locals.csrfToken = req.csrfToken();
  next();
});


app.use(indexRouter);
app.use(oprem);
app.use(usersRouter);
app.use(messageRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
 res.send("ova stranica ne postoji !");
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-8gg55.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true`).then(conn=>{
  app.listen(process.env.PORT || 3000);
});


module.exports = app;
