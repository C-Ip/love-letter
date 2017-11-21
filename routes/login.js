var express = require('express');
var router = express.Router();
const db = require('../db');

/* GET users listing. */
router.get('/', (request, respond) => {
  respond.render('login', { title: 'Login' });
});

router.post('/', (request, respond) => {
  console.log('POST request on /login');
  const confirm = 'SELECT IF(' + request.body.username + '=username, 0, 1) \
  AND IF(' + request.body.password + '=password, 0, 1) FROM players';

  /*redirects to homepage if login successful, else
  refreshes to login page*/
  db.any(confirm).then(results => {
    if (results == 0) {
      console.log('login successful')
      respond.redirect('/');
    } else {
      console.log('unmatched credentials');
      respond.redirect('/login');
    }
  });
});

module.exports = router;
