const ROOM_CREATED = 'room-created';
const JOIN_ROOM = 'join-room';

const socketIO = require('socket.io');
var db = require('../models/index');
var game = require('../models/game');
var currentUIDS = [];
var userIsConnected = true;
var connections = [];
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

var imageList = ['images/guard.jpg', '/images/2.jpeg', '/images/3.jpg', '/images/4.jpg', '/images/5.jpg', '/images/6.jpeg', '/images/7.jpg', '/images/8.jpeg'];

const init = (app, server) => {
  const io = socketIO().listen(server);
  var nsp = io.of('/game');
  io.sockets.on('connection', (socket) => {
    var currentUID = null;
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);
    // Messages display in chatbox
    socket.on('chat message', (msg) => {
      io.emit('chat message',  msg);
    });

    socket.on('game-lobby-message', (lobby) => {
      console.log('Player: ' + lobby.playerid);
      db.getPlayerRoom(lobby.playerid).then( (room) => {
        console.log('Socket joined room: ' + room.gameid);
        socket.join(room.gameid);
        io.sockets.in(room.gameid).emit('game-lobby', lobby.msg);
      }).catch((error) => {
        console.log("Error: " + error);
      });
    });

    socket.on('game-room-message', (gameroom) => {
      console.log('Player: ' + gameroom.playerid);
      db.getPlayerRoom(gameroom.playerid).then( (room) => {
        var game = room.gameid + 1000;
        console.log('Socket joined room: ' + game);
        socket.join(game);
        io.sockets.in(game).emit('game-room', gameroom.msg);
      }).catch((error) => {
        console.log("Error: " + error);
      });
    });

    socket.on('userLogin',(data)=>{
      if(data !==null){
        if(currentUIDS.includes(data)){
          userIsConnected = true;
          currentUID = data;
        }
      }
    });

    // Creates a shuffled deck for the game
    socket.on('startgame', (playerid) => {
      db.getPlayerRoom(playerid).then( (room) => {
        var gameroom = room.gameid + 1000;
        game.createDeck(deck, removedCards);
        game.startingHand(deck, player1, player2, player3, player4);
        game.drawCard(player1, deck);
        console.log("Deck: " + deck);
        console.log("Player1: " + player1);
        console.log("Player2: " + player2);
        console.log("Player3: " + player3);
        console.log("Player4: " + player4);
        console.log("Started game room: " + gameroom);

        socket.join(gameroom);
        io.sockets.in(gameroom).emit('playgame', player1);
      }).catch((error) => {
        console.log("Error: " + error);
      });
    });

    socket.on('playcard', (player) => {
      db.getPlayerRoom(player.playerid).then( (gameroom) => {
        if(turnCounter == 1) {
          console.log('Chosen card is: %s', player.card);
          if(player.card == 0) {
            console.log('Card: %s is being played', player1[player.card]);
            socket.join(gameroom);
            io.sockets.in(gameroom).emit('cardPlayed', {value: player1[player.card], cardPosition : player.card, playerid: player.playerid});
          } else {
            socket.join(gameroom);
            io.sockets.in(gameroom).emit('cardPlayed', {value: player1[player.card], cardPosition: player.card, playerid: player.playerid});
          }
          game.playCard(player1, player.card);
          console.log('Hand: %s', player1);
        }
      }).catch((error) => {
        console.log("Error: " + error);
      });
    });


    socket.on('joingame',() =>{
      db.joinRoom().then( (data)=>{ //joinRoom: function(request, gameRoomId) {
        var joinedRoom = gameRoomId;
        socket.join(joinedRoom);
        console.log('Room: %s joined.',joinedRoom);
      }).catch((error)=>{
        console.log("Error: " +error)
      });
    });

    socket.on('leavegame', (playerid) => {
      console.log('You left the room.');
      db.leaveRoom(playerid);
    });

    socket.on('createdgame', () => {
      var gameRoom = 1;
      db.getNewestRoom().then( (data) => {
        var newRoom = data.gameid + 1;
        socket.join(newRoom);
        console.log('Room: %s created.', newRoom);
        io.emit('addGameList',newRoom);
        localStorage.setItem('gameid',newRoom);
        //console.log("gamelist appended %s", gameRoom)
      }).catch((error) => {
        socket.join(gameRoom);
        console.log('Room: 1 is created');
        io.emit('addGameList',gameRoom);
        localStorage.setItem('gameid',gameRoom);
        //console.log("gamelist appended %s", gameRoom)

      });
    });

    socket.on('disconnect', function(data) {
      userIsConnected = false;
      setTimeout(function(){
        if(!userIsConnected) {currentUIDS.pop(currentUID);}
      },15000);
      connections.splice(connections.indexOf(socket), 1);
      console.log('Disconnected: %s sockets connected', connections.length);
    });

  });
};

module.exports = {init: init};
