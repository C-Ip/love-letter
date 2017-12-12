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
  },

  createRoom: function() {
    return db.one('INSERT INTO game(playerturn) VALUES($1) RETURNING gameid', ['0'])
  },

  joinRoom: function(request, gameRoomId) {
    return db.none('INSERT INTO playergame(playerid, gameid) VALUES($1, $2)', [request.session.player_id, gameRoomId])
  },

  getRoom: function() {
    return db.one('SELECT * FROM game')
  }
};
