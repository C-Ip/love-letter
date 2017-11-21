var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (request, respond) => {
  respond.render('registration', { title: 'Registration Page' });
});

/* Authenticate user */
router.post('/', (request, response, next) => {
  //console.log(request.body.email);
  db.createUser(request).then( data => { response.render('login'); })
});

module.exports = router;
