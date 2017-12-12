'use strict';

var db = require('../db');

module.exports = {
  createDeck: (deck, removedCards) => {
    deck.push('1');
    deck.push('1');
    deck.push('1');
    deck.push('1');
    deck.push('1');
    deck.push('2');
    deck.push('2');
    deck.push('3');
    deck.push('3');
    deck.push('4');
    deck.push('4');
    deck.push('5');
    deck.push('5');
    deck.push('6');
    deck.push('7');
    deck.push('8');
    //shuffles deck
    var i, j, tempi, tempj;
    for( i=0;i< deck.length;i+=1 ){
      j = Math.floor( Math.random() * ( i + 1 ) );
      tempi = deck[i];
      tempj = deck[j];
      deck[i] = tempj;
      deck[j] = tempi;
    }

    // Remove two cards from deck
    deck.pop();
    deck.pop();
  },

  startingHand: (deck, player1, player2, player3, player4) => {
    player1.push(deck[0]);
    deck.shift();
    player2.push(deck[0]);
    deck.shift();
    player3.push(deck[0]);
    deck.shift();
    player4.push(deck[0]);
    deck.shift();
  },

  drawCard: (currentPlayer, deck) => {
    currentPlayer.push(deck[0]);
    deck.shift();  // Removes first card from deck
  },

  playCard: (currentPlayer, card) => {
    if(card == 0) {
      return currentPlayer.shift();
    } else {
      return currentPlayer.pop();
    }
  },

  compareCards: (currentPlayer, targetPlayer) => {
    var currPlayerCard = currentPlayer[0].value;
    var targetPlayerCard = targetPlayer[0].value;

    if(currPlayerCard > targetPlayerCard) {
      targetPlayer.shift();
    }
    if(currPlayerCard == targetPlayerCard) {
      // Nothing happens display message
    }
    else {
      currentPlayer.shift();
    }
  },

  //Guard Card activated comes to this function
  requestCards: (cardValue,targetPlayer)=>{
    var targetPlayerCard = targetPlayer[0].value;
    if (cardValue == targetPlayerCard) {
      targetPlayer.pop();
      console.log(targetPlayer + "lost");

    }
  },
  // trade cards when prompted by card effect comes to this function
  tradeCards: (currentPlayer,targetPlayer)=>{
    var tempPlayerCard = currentPlayer[0].value;
    var tempTargetCard = targetPlayer[0].value;
    console.log(tempPlayerCard +" " + tempTargetCard);

    currentPlayer[0] = tempTargetCard;
    targetPlayer[0] = tempPlayerCard;
    console.log(tempPlayerCard +" " + tempTargetCard);
  },

  // returns true if player has no cards left
  playerCheck: (currentPlayer)=>{
    if (currentPlayer.length == 0){
      return true;
    }
    else{
      return false;
    }
  },

  checkDiscarded: (targetPlayer)=>{
    if (targetPlayer[0].value = 8){
      return true;
    }
    else {return false;}
  },

  countessCheck: (currentPlayer,drawnCard)=> {
    if((currentPlayer[0].value == 5 || currentPlayer[0].value == 6) && drawnCard == 7 ){
      currentPlayer.shift();
      currentPlayer[0] = 7;
    }
  },

  deckEmpty:(deck,removedCards)=>{
    if (length(deck) == 0){
      for (var i = removedCards.length; i > 0 ;i--){
        deck.insert(removedCards[i].value);
      }
      return true;
    }
    else {return false;}
  },

  cardPeek:(targetPlayer)=>{
    return targetPlayer[0].value;
  },

  checkImmunity:(currentPlayer)=>{
    if (currentPlayer[0].value = 4)
      {return true;}
    else{return false;}
  },

};
