const ROOM_ID = 'room-id';
const USER_ID = 'user-id';
const USER_NAME = 'username';
const ROOM_CREATED = 'room-created';
var game_id = 0;
// local_data is found in index.pug
var currPlayer = local_data.playerid;
// Player's username
var currentPlayerUsername = local_data.username;
var socket = io();
var joinRoom = 0;

var imageList = ['/images/guard.jpg', '/images/2.jpeg', '/images/3.jpg', '/images/4.jpg', '/images/5.jpg', '/images/6.jpeg', '/images/7.jpg', '/images/8.jpeg'];

$(function () {
  var gamerooms = localStorage.getItem('gameid');
    if(gamerooms){
      gamerooms.split(';').forEach(function(gameid){
        $('#gamelist').append($('<li>').text("gameroom: "+ gameid));
        //$('#messages').append($('<li>').text(gamerooms));
      });
    }
  $('#chat').submit(function() {
    socket.emit('chat message', {msg:$('#m').val(), username:currentPlayerUsername});
    $('#m').val('');
    return false;
  });

  $('#joingame').submit( function(){
    socket.emit('joingame',{player: currPlayer,room: joinRoom });
  });

  $('#gamelist li').click(function(){
    alert($(this).attr('id'));
    $('#messages').append($('<li>').text("Trying to join game??????"));
      if ($(this).css("background-color") === "none") {
        $('#gamelist').css("background-color","#000000");
        $(this).css("background-color", "#1796cf");
    } else {
        $(this).css("background-color", "#333333");
    }
    socket.emit('gameselected',$(this).attr('id'));
  });

  $('#gamelist li').each(function(n){
      $('#gamelist li').attr("id",n);
  });


  $('#creategames').click(function() {
    socket.emit('createdgame', currPlayer);
  });


  socket.on('chat message', function(data) {
    $('#messages').append($('<li>').text(data.username + ": " + data.msg));

  });
  socket.on('addGameList', function(data) {
    // Should create buttons next to rooms that does socket.emit('joingame',currPlayer, gameid)
    // Game room is  there even though I ran a rollback..
    gamerooms = localStorage.getItem('gameid')|| '';
    
    if (gamerooms){
      gamerooms += ';';
    }
    gamerooms += data;
    localStorage.setItem('gameid',gamerooms);
    $('#gamelist').append($('li').text("gameroom:" + gamerooms));

  });

  socket.on('readytojoin', function(data){
    joinRoom = data;
  })

});
