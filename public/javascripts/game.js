


var socket = io();
var returnGame =false;
var pos_id =0;
var room = 0;


const drawURLImg = function (context, src, posX, posY, scale) {
  var img = new Image();
  img.onload = function () {
    context.beginPath();
    context.drawImage(img, posX, posY, img.width / scale, img.height / scale);
  };
  img.src = src;
};

$(document).ready(function(){
	var gameroomcanvas = $("#game-room");
	var context = gameroomcanvas[0].getContext("2d");
	context.canvas.width = 700;
	context.canvas.height = 800;

	const drawCard = function (context,cardNum){
		var imageSrc = "/images/baron3.jpg";
		var scale = 4.0;
		drawURLImg(context,imageSrc,posx,posy,scale);
	};

	socket.on('startgame', room {
		console.log("game has started AKA linked success");
 		drawCard(context,0);

	});

});