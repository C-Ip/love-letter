var socket = io();
var currPlayer = local_data.playerid;
var currentPlayerUsername = local_data.username;
var cardChosen = 0;
var gameroomId = 0;
var playedCard = 0;

// Keeps state of players in the game
var playerImmune1 = false;
var playerImmune2 = false;
var playerImmune3 = false;
var playerImmune4 = false;

var imageArray = new Array();
var imageList = ['images/guard.jpg', '/images/2.jpeg', '/images/3.jpg', '/images/4.jpg', '/images/5.jpg', '/images/6.jpeg', '/images/7.jpg', '/images/8.jpeg'];
for(i = 0; i < 8; i++) {
  imageArray[i] = new Image();
  imageArray[i].src = imageList[i];
};

function showAllTargets() {
  document.getElementById('player2').style.visibility = 'visible';
  document.getElementById('player3').style.visibility = 'visible';
  document.getElementById('player4').style.visibility = 'visible';
};

function player2Immune() {
  document.getElementById('player2').style.visibility = 'hidden';
  document.getElementById('player3').style.visibility = 'visible';
  document.getElementById('player4').style.visibility = 'visible';
};

function player3Immune() {
  document.getElementById('player2').style.visibility = 'visible';
  document.getElementById('player3').style.visibility = 'hidden';
  document.getElementById('player4').style.visibility = 'visible';
};

function player4Immune() {
  document.getElementById('player2').style.visibility = 'visible';
  document.getElementById('player3').style.visibility = 'visible';
  document.getElementById('player4').style.visibility = 'hidden';
};

function startGame() {
  socket.emit('startgame', currPlayer);
  document.getElementById('begin').style.visibility = 'hidden';
  document.getElementById('player2').style.visibility = 'hidden';
  document.getElementById('player3').style.visibility = 'hidden';
  document.getElementById('player4').style.visibility = 'hidden';
};

function firstCardChosen() {
  cardChosen = 0;
  document.getElementById('playerCard1_1').style.border = '3px solid #1ec5e5';
  document.getElementById('playerCard1_2').style.border = 'none';
  document.getElementById('playcard').style.visibility = 'visible';
};

function secondCardChosen() {
  cardChosen = 1;
  document.getElementById('playerCard1_2').style.border = '3px solid #1ec5e5';
  document.getElementById('playerCard1_1').style.border = 'none';
  document.getElementById('playcard').style.visibility = 'visible';
};

function selectCard(id) {
  if(id.style.borderStyle == 'none') {
    id.style.border = '3px #1ec5e5';
    id.style.borderStyle = 'solid';
    document.getElementById('playcard').style.visibility = 'visible';
  } else {
    id.style.borderStyle = 'none';
  }
  //document.getElementById('playerCard4_2').src = imageList[5];
};

function playFunction() {
  socket.emit('playcard', {card: cardChosen, playerid: currPlayer});
  document.getElementById('playerCard1_1').style.border = 'none';
  document.getElementById('playerCard1_2').style.border = 'none';
  document.getElementById('playcard').style.visibility = 'hidden';
  document.getElementById('endturn').style.visibility = 'visible';
};

function endTurnFunction() {
  document.getElementById('playcard').style.visibility = 'hidden';
  document.getElementById('endturn').style.visibility = 'hidden';
  socket.emit('endturn', currPlayer);
};

$(function () {
  $('#gameroomchat').submit(function() {
    socket.emit('game-room-message', {msg: $('#gamemsg').val(), playerid: local_data.playerid});
    $('#gamemsg').val('');
    return false;
  });

  $('#player2').click(function() {
    $('#gameroommessages').append($('<li>').text('Player 2 chosen.'));
    $('#player2').hide();
    $('#player3').hide();
    $('#player4').hide();
    socket.emit('targetChosen', {currentPlayer: currPlayer, targetPlayer: 2, cardAction: playedCard, gameroom: gameroomId});
  });

  $('#player3').click(function() {
    $('#gameroommessages').append($('<li>').text('Player 3 chosen.'));
    $('#player2').hide();
    $('#player3').hide();
    $('#player4').hide();
    socket.emit('targetChosen', {currentPlayer: currPlayer, targetPlayer: 3, cardAction: playedCard, gameroom: gameroomId});
  });

  $('#player4').click(function() {
    $('#gameroommessages').append($('<li>').text('Player 4 chosen.'));
    $('#player2').hide();
    $('#player3').hide();
    $('#player4').hide();
    socket.emit('targetChosen', {currentPlayer: currPlayer, targetPlayer: 4, cardAction: playedCard, gameroom: gameroomId});
  });

  socket.on('playgame', function(player) {
    $('#playerCard1_1').attr('src', imageList[player[0] - 1]);
    $('#playerCard1_2').attr('src', imageList[player[1] - 1]);
    $('#playerCard2_1').removeAttr('src');
    $('#playerCard3_1').removeAttr('src');
    $('#playerCard4_1').removeAttr('src');
  });

  socket.on('game-room', function(msg) {
    $('#gameroommessages').append($('<li>').text(currentPlayerUsername + ': ' + msg));
  });

  socket.on('checkRemainingPlayers', (players) => {
    if(players.player1) {
      $('#playerCard1_1').removeAttr('src');
      $('#playerCard1_2').removeAttr('src');
      playerImmune1 = true;
    }
    if(players.player2) {
      $('#playerCard2_1').removeAttr('src');
      $('#playerCard2_2').removeAttr('src');
      playerImmune2 = true;
    }
    if(players.player3) {
      $('#playerCard3_1').removeAttr('src');
      $('#playerCard3_2').removeAttr('src');
      playerImmune3 = true;
    }
    if(players.player4) {
      $('#playerCard4_1').removeAttr('src');
      $('#playerCard4_2').removeAttr('src');
      playerImmune4 = true;
    }
  });

  socket.on('cardPlayed', function(card) {
    if(card.cardPosition == 0) {
      $('#playerCard1_1').removeAttr('src');
    } else {
      $('#playerCard1_2').removeAttr('src');
    }
    playedCard = card.value;
    gameroomId = card.gameid;
    switch(card.value) {
      case '1':
        showAllTargets();
        $('#gameroommessages').append($('<li>').text('Player ' + currentPlayerUsername + ' has played a Guard'));
        $('#gameroommessages').append($('<li>').text('Choose a player.'));
        break;
      case '2':
        showAllTargets();
        $('#gameroommessages').append($('<li>').text('Player ' + currentPlayerUsername + ' has played a Priest'));
        $('#gameroommessages').append($('<li>').text('Choose a player and look at their hand.'));
        break;
      case '3':
        showAllTargets();
        $('#gameroommessages').append($('<li>').text('Player ' + currentPlayerUsername + ' has played a Baron'));
        $('#gameroommessages').append($('<li>').text('Choose a player and compare hands. Lowest card is knocked out of the round.'));
        break;
      case '4':
        showAllTargets();
        $('#gameroommessages').append($('<li>').text('Player ' + currentPlayerUsername + ' has played a Handmaid'));
        $('#gameroommessages').append($('<li>').text('Player: ' + currentPlayerUsername + ' is immune to effects until their next turn.'));
        break;
      case '5':
        showAllTargets();
        $('#gameroommessages').append($('<li>').text('Player ' + currentPlayerUsername + ' has played a Prince'));
        $('#gameroommessages').append($('<li>').text('Choose a player, that player will discard their hand and draw a new card.'));
        break;
      case '6':
        showAllTargets();
        $('#gameroommessages').append($('<li>').text('Player ' + currentPlayerUsername + ' has played a King'));
        $('#gameroommessages').append($('<li>').text('Choose a player and trade hands.'));
        break;
      case '7':
        showAllTargets();
        $('#gameroommessages').append($('<li>').text('Player ' + currentPlayerUsername + ' has played a Countess'));
        break;
      case '8':
        showAllTargets();
        $('#gameroommessages').append($('<li>').text('Player %s' + currentPlayerUsername + ' has played a Princess'));
        break;
      default:
        break;
    }
  });

  socket.on('priestAction', (target) => {
    $('#gameroommessages').append($('<li>').text('Player ' + target.target + ' has card: ' + target.targetHand));
  });

  socket.on('baronAction', (winner) => {
    $('#gameroommessages').append($('<li>').text('Player ' + winner + ' won!'));
  });

  socket.on('kingAction', (player) => {
    if($('#playerCard1_1').attr('src') != "") {
      $('#playerCard1_2').attr('src', imageList[player[0] - 1]);
    } else {
      $('#playerCard1_1').attr('src', imageList[player[0] - 1]);
    }
  });

  socket.on('princessAction', (princessDiscarded) => {
    if(princessDiscarded) {
      $('#gameroommessages').append($('<li>').text('Princess was discarded!!!!'));
    }
  });

});
