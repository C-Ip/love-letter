var express = require('express');
var router = express.Router();
var db = require('../models/index');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

router.get('/', function(request, response) {
  response.render('login', { title: 'Login Page' });
});

passport.use(new LocalStrategy( (username, password, done) => {
  db.getUserByUsername(username)
  .then( user => {
    bcrypt.compare(password, user.password, function(err, res) {
      if(res == true) {
        console.log('Verified');
        return done(null, user);
      } else {
        console.log('Incorrect Password');
        return done(null, false);
    }});
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.playerid);
});

passport.deserializeUser(function(id, done) {
  db.getUserById(id)
  .then( user => {
    done(null, user);
  });
});

router.post('/',
  passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login'}),
    function(request, response) {
      console.log("Logged in");
      response.redirect('/');
    }
);

module.exports = router;
