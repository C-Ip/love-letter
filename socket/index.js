const ROOM_CREATED = 'room-created';
const JOIN_ROOM = 'join-room';

const socketIO = require('socket.io');
var db = require('../models/index');
var game = require('../models/game');
var deck = [];
var removedCards = [];
var discard = [];
var player1 = [];
var player2 = [];
var player3 = [];
var player4 = [];
var turnCounter = 1;
var cardToPlay = 0;
var isProtected = [false,false,false,false]// not sure about this

const init = (app, server) => {
  const io = socketIO(server);
  const io2 = socketIO();
  var nsp = io.of('/game');
  io.sockets.on('connection', (socket) => {
    // Messages display in chatbox
    socket.on('chat message', (msg) => {
      io.emit('chat message',  msg);
    });

    // Creates a shuffled deck for the game
    socket.on('startgame', (data) => {
        game.createDeck(deck, removedCards);
        console.log("Deck: " + deck);
        game.startingHand(deck, player1, player2, player3, player4);
        io.emit('onDraw',{
          first : player1[0],
          second : player1[1]
          });
        console.log("Deck: " + deck);
        console.log("Player1: " + player1);
        console.log("Player2: " + player2);
        console.log("Player3: " + player3);
        console.log("Player4: " + player4);
      });

      socket.on('playcard', (data) => {
        console.log("Player plays a card");
        switch(turnCounter) {
          case 1:
            game.playCard(player1, cardToPlay);
            console.log(player1);
            break;
          case 2:
            game.playCard(player2, cardToPlay);
            console.log(player2);
            break;
          case 3:
            game.playCard(player3, cardToPlay);
            console.log(player3);
            break;
          case 4:
            game.playCard(player4, cardToPlay);
            console.log(player4);
            break;
        }
      });

      socket.on('startTurn', () => {
        if(turnCounter == 4) {
          turnCounter = 1;
        } else {
          turnCounter += 1;
        }
        console.log('Player ' + turnCounter + ' turn');
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
    });

  nsp.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.to('/game').emit('chat message', msg);
    });

    // May not be needed
    socket.on('endTurn', () => {
      turnCounter++;
    });
  });
};

module.exports = {init: init};
