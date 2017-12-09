const ROOM_ID = 'room-id';
const USER_ID = 'user-id';
const USER_NAME = 'username';
const ROOM_CREATED = 'room-created';
var game_id = 000000

var socket = io();
const game = io('/game');

const drawDeck = function(context) {
  var imageSrc = "../images/dice.png";
};

$(function () {
  var deck = $('#deck');

  $('#chat').submit(function() {
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  $('[data-toggle="popover"]').popover();

  //$('#games').append($("<button>Join Game</button>"));

  $(".create-room").on("submit", () => {
    socket.emit(ROOM_CREATED, {gameroom: game_id + 1});
    socket.join('/game');
  });

  $('#playcard').on('clicked', () => {
    socket.emit('card_played');
  });

  $('#startgame').submit( function() {
    socket.emit('startgame', {gameid: game_id});
  });

  socket.on('startgame', function() {
    drawDeck(context);
  });
  socket.on('chat message', function(msg) {
    $('#messages').append($('<li>').text(msg));
  });
  
  socket.on(ROOM_CREATED, (data) => {
    $.cookie(ROOM_ID, data, {path: "/"});
  });
});
