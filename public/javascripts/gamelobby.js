var game_id = 0;
var socket = io();
var currPlayer = local_data.playerid;
var currentPlayerUsername = local_data.username;

$(function () {
  $('#gamelobbychat').submit(function() {
    socket.emit('game-lobby-message', {msg: $('#msg').val(), playerid: local_data.playerid});
    $('#msg').val('');
    return false;
  });

  $('#leaveroom').click(function() {
    socket.emit('leavegame', currPlayer);
  });

  socket.on('game-lobby', function(msg) {
    $('#gamelobbymessages').append($('<li>').text(currentPlayerUsername + ': ' + msg));
  });

  socket.on('playeradded',function(playerid){
    //$('#playerthumb').append($("<li id ='"+playerid+"'>").text(playerid));
    //$('#playerthumb').append($('<li>').text("Player:" + playerid);
    $('#gamelobbymessages').append($('<li>').text("player added"));
  });

});
