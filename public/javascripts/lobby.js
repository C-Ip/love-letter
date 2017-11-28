const ROOM_ID = 'room-id';
const USER_ID = 'user-id';
const USER_NAME = 'username';
const ROOM_CREATED = 'room-created';

$(function () {
  var socket = io();
  $('#chat').submit(function() {
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  //$('#games').append($("<button>Join Game</button>"));
  /*
  $(".create-room").on("submit", () =>
    socket.emit(ROOM_CREATED, {userid: 1});
  });
  */
  socket.on('chat message', function(msg) {
    $('#messages').append($('<li>').text(msg));
  });

  socket.on(ROOM_CREATED, (data) => {
    $.cookie(ROOM_ID, data, {path: "/"});
    window.location = "/gamelobby";
  });
  
});
