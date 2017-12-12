var socket = io();

var imageArray = new Array();
var imageList = ['images/guard.jpg', '/images/2.jpeg', '/images/3.jpg', '/images/4.jpg', '/images/5.jpg', '/images/6.jpeg', '/images/7.jpg', '/images/8.jpeg'];
for(i = 0; i < 8; i++) {
  imageArray[i] = new Image();
  imageArray[i].src = imageList[i];
}

document.getElementById('playerCard1_1').src = imageArray[1].src;
document.getElementById('playerCard1_2').src = imageArray[5].src;

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
  socket.emit('playcard');
  document.getElementById('playcard').style.visibility = 'hidden';
  document.getElementById('endturn').style.visibility = 'visible';
};

function endTurnFunction() {
  socket.emit('startTurn');
};
