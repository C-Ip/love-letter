var express = require('express');
var router = express.Router();
var db = require('../models/index');

/* GET users listing. */
router.get('/', (request, response) => {
  response.render('registration', { title: 'Registration Page' });
});

router.post('/', (request, response) => {
  console.log('POST request on /registration');
  var username = request.body.username;
  var password = request.body.password;
  var confirmPassword = request.body.confirmPassword;

  // I'll just have page reload when passwords do not match for now
  if (password != confirmPassword) {
    console.log('redirecting...');
    response.redirect('/registration');
  } 
  else {
    console.log('Username: ' + request.body.username);
    console.log('Password: ' + request.body.password);

    db.createUser(request)
    .then( data => { 
      response.render('login'); 
    })  
  }

});
module.exports = router;
