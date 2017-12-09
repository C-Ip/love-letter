var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET users listing. */
router.get('/', (request, response) => {
  response.render('registration', { title: 'Registration Page' });
});

router.post('/', (request, response) => {
  console.log('POST request on /registration');

  // I'll just have page reload when passwords do not match for now
  if (request.body.password != request.body.confirmPassword) {
    console.log('redirecting...');
    response.redirect('/registration');
  } 
  else {
    console.log('Username: ' + request.body.username);
    console.log('Password: ' + request.body.password);
    
    /* Checks if username is already taken
      
    db.any('SELECT username FROM players')
    .then( data => {
      console.log(data[0].username);
      /*
      if(request.username == data.username) {
        console.log("Username is already taken");
        return false;
      }
      
    });
    */
    db.none('INSERT INTO players(username,password,wins) VALUES($1,$2,$3)',[request.body.username, request.body.password, '0'])
    .then( _ => {
      console.log('successful');
      response.redirect('/login');
    }).catch(error => {
      console.log(error);
      response.json(error);
    });
  }

});

module.exports = router;
