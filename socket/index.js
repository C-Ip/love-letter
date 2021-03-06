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
var targetPlayerCard = 0;
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

    var gamerooms = localStorage.getItem('gameid');
      if(gamerooms){
        gamerooms.split(';').forEach(function(gameid){

        });
      }
    socket.on('chat message', (msg) => {
      io.emit('chat message',  {msg:msg.msg, username:msg.username});
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
            io.sockets.in(gameroom).emit('cardPlayed', {value: player1[player.card], cardPosition : player.card, playerid: player.playerid, gameid: gameroom});
          } else {
            socket.join(gameroom);
            io.sockets.in(gameroom).emit('cardPlayed', {value: player1[player.card], cardPosition: player.card, playerid: player.playerid, gameid: gameroom});
          }
          game.playCard(player1, player.card);
          console.log('Hand: %s', player1);
        }
      }).catch((error) => {
        console.log("Error: " + error);
      });
    });

    socket.on('gameselected',(gameid)=>{
      console.log("gimme somthin"+ gameid);
      io.emit('readytojoin',gameid);

    });

    socket.on('joingame',(playerid) =>{
      var playerPositionId = 0;
      db.getInGameId(data.room).then((gameid)=>{
        playerPositionId = gameid.max +1;
        db.joinRoom(data.player,data.room, playerPositionId);
        var joinedRoom = data.room;
      });
      /* Gets previous player's positionId and assigns the next person to join the next positionId
       Needs to be fixed
      db.getInGameId(gameid).then( (gameid) => {
        playerPositionId = gameid + 1;
        db.joinRoom().then( (data)=>{ //joinRoom: function(playerid, gameRoomId, inGameId) {
          var joinedRoom = gameRoomId;
          socket.join(joinedRoom);
          console.log('Room: %s joined.',joinedRoom);
        });
      }).catch((error)=>{
        console.log("Error: " +error)
      });
      */
    });

    socket.on('leavegame', (playerid) => {
      console.log('You left the room.');
      db.leaveRoom(playerid);
    });

    socket.on('createdgame', (playerid) => {
      var gameRoom = 1;
      io.emit('playeradded',playerid);
      console.log(playerid);
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

    // Game play functions
    socket.on('targetChosen', (player) => {
      console.log('Action performed: ' + player.cardAction);
      console.log('Target: ' + player.targetPlayer);
      socket.join(player.gameroom);
      switch(player.cardAction) {
        case '1':
          console.log('Choose a card by entering the value on the chat');
        case '2':
          if(player.targetPlayer == 1) {
            targetPlayerCard = player1[0];
            console.log('Player 1 has: ' + targetPlayerCard);
          } if(player.targetPlayer == 2) {
            targetPlayerCard = player2[0];
            console.log('Player 2 has: ' + targetPlayerCard);
          } if(player.targetPlayer == 3) {
            targetPlayerCard = player3[0];
            console.log('Player 3 has: ' + targetPlayerCard);
          } if(player.targetPlayer == 4) {
            targetPlayerCard = player4[0];
            console.log('Player 4 has: ' + targetPlayerCard);
          }
          io.sockets.in(player.gameroom).emit('priestAction', {target: player.targetPlayer, targetHand: targetPlayerCard});
          break;
        case '3':
          io.sockets.in(player.gameroom).emit('baronAction', game.compareCards(1, player.targetPlayer, player1, player2, player3, player4));
          break;
        case '4':
          break;
        case '5':
         if(player.targetPlayer == 1) {
            player1.pop();
            game.drawCard(player1, deck);
            console.log("Player1: " + player1);
          } if(player.targetPlayer == 2) {
            player2.pop();
            game.drawCard(player2, deck);
            console.log("Player2: " + player2);
          } if(player.targetPlayer == 3) {
            player3.pop();
            game.drawCard(player3, deck);
            console.log("Player3: " + player3);
          } if(player.targetPlayer == 4) {
            player4.pop();
            game.drawCard(player4, deck);
            console.log("Player4: " + player4);
          }
          io.sockets.in(player.gameroom).emit('princeAction', {target: player.targetPlayer});
          break;
        case '6':
          game.tradeCards(1, player.targetPlayer, player1, player2, player3, player4);
          if(player.currentPlayer == 1) {
              io.sockets.in(player.gameroom).emit('kingAction', player1);
          }
          console.log(player1[0]);
          break;
        case '8':
          io.sockets.in(player.gameroom).emit('princessAction', game.checkDiscarded(player.cardAction));
          break;
      }
    });

    socket.on('endturn', (playerid) => {
      db.getPlayerRoom(playerid).then( (gameroom) => {
        socket.join(gameroom);
        io.sockets.in(gameroom).emit('checkRemainingPlayers', {player1: game.playerCheck(player1), player2: game.playerCheck(player2), player3: game.playerCheck(player3), player4: game.playerCheck(player4)});
      });
      console.log('Turn: ' + turnCounter);
      if(turnCounter == 4) {
        turnCounter = 0;
      } else {
        turnCounter++;
      }
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
