var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Love Letter', user: req.user.playerid });
});

function ensureAuthenticated(request, response, next) {
  if(request.isAuthenticated()) {
    return next();
  } else {
    response.redirect('/login');
  }
}

module.exports = router;
