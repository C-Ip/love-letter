var express = require('express');
var router = express.Router();
var db = require('../models');

/* GET users listing. */
router.get('/', (request, respond) => {
  respond.render('login', { title: 'Login' });
});

router.post('/', (request, response, next) => {
  db.verifyLogin(request.body.username, request.body.password)
    .then( data => {
      response.cookie('username', data.username);
      response.cookie('user_id', data.id);
      response.redirect('/');
    })
    .catch( error => {
      console.log(error);
      response.redirect('/login');  
    })
});

module.exports = router;
