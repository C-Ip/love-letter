var express = require('express');
var router = express.Router();
var db = require('../models/index');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(5);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

router.get('/', function(request, response) {
  response.render('login', { title: 'Login Page' });
});

passport.use(new LocalStrategy( (username, password, done) => {
  db.getUserByUsername(username)
  .then( user => {
    //var submittedPassword = bcrypt.hashSync(password, salt);
    //var isVerified = bcrypt.compareSync(submittedPassword, user.password);
    if(password == user.password) {
      console.log('Verified');
      return done(null, user);
    } else {
      console.log('Incorrect Password');
      return done(null, false);
    }
  })
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

router.post('/', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login'}), (request, response) => {
    console.log(request.session.player_id);
    response.redirect('/');
  }
);

module.exports = router;
