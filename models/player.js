module.exports = Player = function(username, playerid, gameid){
	this.username = username;
	this.id = playerid;
	this.untargetable = false;
	this.outofround = false;
	this.game = gameid;
	this.hand = [];
}

//pop the first card in their hand and return it in a temporary variable
Player.prototype.UseFirstCard = function(){
	var temp = 0;
	temp = this.hand.pop();
	return temp;
}

//store the first card in a variable holder then pop the second card and return it in a temporary variable
Player.prototype.UseSecondCard = function(){
	var holder = 0;
	holder = this.hand.pop();
	var temp = 0;
	temp = this.hand.pop();
	this.hand.push(holder);
	return temp;
}