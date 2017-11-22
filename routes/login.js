var express = require('express');
var router = express.Router();
const db = require('../db');

/* GET users listing. */
router.get('/', (request, response) => {
  response.render('login', { title: 'Login' });
});

router.post('/', (request, response) => {
  console.log('POST request on /login');

  /*redirects to homepage if login successful, else
  refreshes to login page*/
  db.one('SELECT * FROM players WHERE username = $1 AND password = $2', [request.body.username, request.body.password])
  .then(data => {
    console.log("Login successful");
    response.redirect('/');
  })
  .catch( error => {
    console.log(error);
    response.redirect('login');
  })
});

module.exports = router;
