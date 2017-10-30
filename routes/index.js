var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://trifoo:jm@localhost:5432/myapp";

var db = new pg.Client(conString);
db.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/tests", (request, response) => {
  db.query(`INSERT INTO test_table ("testString") VALUES ('Hello at ${Date.now()}')`)
  	.then( _ => db.query('SELECT * FROM test_table') )
  	.then( results => response.json( results ) )
  	.catch( error => {
  		console.log( error )
  		response.json({error})
  	})
});


module.exports = router;
