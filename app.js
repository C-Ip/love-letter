var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var flash = require('connect-flash');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
if (typeof localStorage ==="undefined" || localStorage == null){
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

var index = require('./routes/index');
var users = require('./routes/users');
var tests = require('./routes/tests');
var login = require('./routes/login');
var gameLobby = require('./routes/gamelobby');
var game = require('./routes/game');
var registration = require('./routes/registration');
var rules = require('./routes/rules');
var logout = require('./routes/logout');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(flash());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({resave:true, saveUninitialized:true, secret: 'SECRET',cookie: {maxAge: 180000}}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/users', users);
app.use('/tests', tests);
app.use('/gamelobby', gameLobby);
app.use('/game', game);
app.use('/login', login);
app.use('/registration', registration);
app.use('/rules', rules);
app.use('/logout', logout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // Global variable
  res.locals.user = req.user || null;
  localStorage.setItem('uUID',Math.random().toString(24)+ new Date());
  console.log(localStorage.getItem('uUID'))

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

if(process.env.NODE_ENV === 'development'){
	require("dotenv").config();
}

module.exports = app;
