const ROOM_ID = 'room-id';
const USER_ID = 'user-id';
const USER_NAME = 'username';
const ROOM_CREATED = 'room-created';
var game_id = 0;
// local_data is found in index.pug
var currPlayer = local_data.playerid;
//var game_id = local_data.gameid;
var socket = io();

var imageList = ['/images/guard.jpg', '/images/2.jpeg', '/images/3.jpg', '/images/4.jpg', '/images/5.jpg', '/images/6.jpeg', '/images/7.jpg', '/images/8.jpeg'];

$(function () {
  var gamerooms = localStorage.getItem('gameid');
    if(gamerooms){
      gamerooms.split(';').forEach(function(gameid){
        $('#gamelist').append($('<li>').text("gameroom: "+ gameid));
      });
    }
  $('#chat').submit(function() {
    socket.emit('chat message', {msg:$('#m').val(),player:currPlayer});
    $('#m').val('');
    return false;
  });

  $('#joingame').submit( function(){
    socket.emit('joingame',game_id);
  });

  $('#creategames').click(function() {
    socket.emit('createdgame', currPlayer);
  });

  socket.on('chat message', function(data) {
    $('#messages').append($('<li>').text(data.player + ":" + data.msg));

  });
  socket.on('addGameList', function(gameId) {
    var gamerooms = localStorage.getItem('gameid')|| '';
    if (gamerooms){
      gamerooms += ';';
    }
    gamerooms =+ gameId;
    localStorage.setItem('gameId',gamerooms);
    $('#gamelist').append($('<li>').text("gameroom:" + gameId));
  });

});
