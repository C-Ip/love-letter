var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET users listing. */
router.get('/', (request, respond) => {
  respond.render('registration', { title: 'Registration Page' });
});

router.post('/', (request, respond) => {
  console.log('POST request on /registration');

  // I'll just have page reload when passwords do not match for now
  if (request.body.password !== request.body.confirmPassword) {
    console.log('redirecting...')
    respond.redirect('/registration');
  } else {
    console.log('Username: ' + request.body.username);
    console.log('Password: ' + request.body.password);
    const insert = 'INSERT INTO players (username, password) VALUES \
    (' + request.body.username + ', ' + request.body.password + ')';

    db.any(insert);
  }
});

module.exports = router;
