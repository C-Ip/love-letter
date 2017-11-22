var pg = require('pg');

var registerPlayer = "INSERT INTO players(username,password) VALUES('kris','hellow');";

module.exports = {
	login:function(req,res){
		pg.connect(process.env.DATABASE_URL,function(err,client,done){
			client.query('SELECT * FROM players', function (err,result){
				done();
				if (err){console.error(err);res.send("ERROR"+ err);}
				else {res.render('../db',{results :result.rows});}
			});
		});
	},
	register: function(req,res){
		var username = req.body.username;
		pg.connect(process.env.DATABASE_URL, function(err,client,done){
			client.query(registerPlayer,function(err,result){
				done();
				if (err){cnosole.error(err);res.send("ERROR" +err);}
				else {res.render('pages/db',{results:result.rows}); }
			});
		});
	}
};