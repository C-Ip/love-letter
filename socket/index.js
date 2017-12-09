const ROOM_CREATED = 'room-created';

const socketIO = require('socket.io');
var db = require('../db');
var game = require('../models/game.js');
var deck = [];
var player1 = [];
var player2 = [];
var player3 = [];
var player4 = [];
var turnCounter = 1;
var cardToPlay = 0;

const init = (app, server) => {
  const io = socketIO(server);
  var nsp = io.of('/game');
  io.sockets.on('connection', (socket) => {
    // Messages display in chatbox
    socket.on('chat message', (msg) => {
      io.emit('chat message',  msg);
    });

    // Creates a shuffled deck for the game
    socket.on('startgame', (data) => {
      console.log(data);
      game.createDeck(deck);
      console.log(deck);
    });
  });

  nsp.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.to('/game').emit('chat message', msg);
    });
    socket.on('playcard', (data) => {
      console.log("Player plays a card");
      switch(turnCounter) {
        case 1:
          game.playCard(player1, cardToPlay);
          break;
        case 2:
          game.playCard(player2, cardToPlay);
          break;
        case 3:
          game.playCard(player3, cardToPlay);
          break;
        case 4:
          game.playCard(player4, cardToPlay);
          break;
      }
    });

    socket.on('startTurn', () => {
      switch(turnCounter) {
        case 1:
          game.drawCard(player1, deck);
          break;
        case 2:
          game.drawCard(player2, deck);
          break;
        case 3:
          game.drawCard(player3, deck);
          break;
        case 4:
          game.drawCard(player4, deck);
          break;
      }
    });

    // May not be needed
    socket.on('endTurn', () => {
      turnCounter++;
    });
  });
};

module.exports = {init: init};
