'use strict';

var db = require('../db');

module.exports = {
  createUser: function(request) {
    return db.none('INSERT INTO players(username, password) VALUES(${username}, ${password})', request.body); 
  },
  
  verifyLogin: function(username, password) {
    return db.one('SELECT * FROM players WHERE username = $1 AND password = $2', [username, password]);
    
  }
};
