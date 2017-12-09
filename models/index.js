'use strict';

const passport = require('passport');
const db = require('../db');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(5);

module.exports = {
  createUser: function(request) {
    var password = bcrypt.hashSync(request.body.password, salt);
    return db.none("INSERT INTO players(username, password) VALUES('"+ request.body.username +"', '" + request.body.password + "')");
  },
  
  verifyLogin: function(request, response) {
    var submittedPassword = bcrypt.hashSync(request.body.password, salt);
    return db.one('SELECT * FROM players WHERE username = $1', [request.body.username])
  },

  getUserByUsername: function(username) {
    return db.one('SELECT * FROM players WHERE username = $1', [username])
  },

  getUserById: function(id) {
    return db.one('SELECT * FROM players WHERE playerid = $1', [id])
  }
};
