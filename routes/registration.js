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
  if (request.body.passwordReg !== request.body.confirmPassword) {
    console.log('redirecting...')
    respond.redirect('/registration');
  } else {
    console.log('Username: ' + request.body.usernameReg);
    console.log('Password: ' + request.body.passwordReg);
/*
    const insert = 'INSERT INTO players(username, password) VALUES \
    (\"' + request.body.username + '\", \"' + request.body.password + '\");';
*/


    db.none('INSERT INTO players(username,password) VALUES($1,$2)',[request.body.usernameReg, request.body.passwordReg])
    .then( _ => {
      console.log('successful');
    }).catch(error => {
      console.log(error);
      respond.json(error);
    });
  }

/*
    db.one('select * from players where username=$1 and password=$2',
  [request.body.username, request.body.password]).then( _ => console.log('hi')).catch(error => {
    respond.json(error);
  });
*/

});

module.exports = router;
