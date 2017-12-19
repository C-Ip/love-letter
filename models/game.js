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
    console.log("Shuffled Deck: " + deck);
    // Remove two cards from deck
    deck.pop();
    deck.pop();
    console.log("Removed Cards: " + deck);
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

  showPlayerHand(currentPlayer, images) {

  },
    //for(i = 0; i < currentPlayer.length; i++) {

    //}

  drawCard: (currentPlayer, deck) => {
    currentPlayer.push(deck[0]);
    deck.shift();  // Removes first card from deck
  },

  playCard: (currentPlayer, card) => {
    console.log('You played card: %s', currentPlayer[card]);
    switch(currentPlayer[card]) {
      case 1:
        // action for guard
        break;
      case 2:
        // action
        break;
      case 3:
        // action
        break;
      case 4:
        // action
        break;
      case 5:
        // action
        break;
      case 6:
        // action
        break;
      case 7:
        // action
        break;
      case 8:
        // action
        break;
    }
    if(card == 0) {
      currentPlayer.shift();
    } else {
      currentPlayer.pop();
    }
  },

  // Compares hands of two players, Baron's action
  compareCards: (currentPlayer, targetPlayer, player1, player2, player3, player4) => {
    console.log('PLAS: ' + player3[0]);
    console.log('current player: ' + currentPlayer);
    console.log('target: ' + targetPlayer);
    if(currentPlayer == 1) {
      if(targetPlayer == 2) {
        if(player1[0] > player2[0]) {
          player2.pop();
          return 1;
        } if(player1[0] < player2[0]) {
          player1.pop();
          return 2;
        }
      }
      if(targetPlayer == 3) {
        if(player1[0] > player3[0]) {
          player3.pop();
          return 1;
        } if(player1[0] < player3[0]) {
          player1.pop();
          return 3;
        }
      }
      if(targetPlayer == 4) {
        if(player1[0] > player4[0]) {
          player4.pop();
          return 1;
        } if(player1[0] < player4[0]) {
          player1.pop();
          return 4;
        }
      }
    }
    if(currentPlayer == 2) {
      if(targetPlayer == 1) {
        if(player2[0] > player1[0]) {
          player1.pop();
          return 2;
        } if(player2[0] < player1[0]) {
          player2.pop();
          return 1;
        }
      }
      if(targetPlayer == 3) {
        if(player2[0] > player3[0]) {
          player3.pop();
          return 2;
        } if(player2[0] < player3[0]) {
          player2.pop();
          return 3;
        }
      }
      if(targetPlayer == 4) {
        if(player2[0] > player4[0]) {
          player4.pop();
          return 2;
        } if(player2[0] < player4[0]) {
          player2.pop();
          return 4;
        }
      }
    }
    if(currentPlayer == 3) {
      if(targetPlayer == 1) {
        if(player3[0] > player1[0]) {
          player1.pop();
          return 3;
        } if(player3[0] < player1[0]) {
          player3.pop();
          return 1;
        }
      }
      if(targetPlayer == 2) {
        if(player3[0] > player2[0]) {
          player2.pop();
          return 3;
        } if(player3[0] < player2[0]) {
          player3.pop();
          return 2;
        }
      }
      if(targetPlayer == 4) {
        if(player3[0] > player4[0]) {
          player4.pop();
          return 3;
        } if(player3[0] < player4[0]) {
          player3.pop();
          return 4;
        }
      }
    }
    if(currentPlayer == 4) {
      if(targetPlayer == 1) {
        if(player4[0] > player1[0]) {
          player1.pop();
          return 4;
        } if(player4[0] < player1[0]) {
          player4.pop();
          return 1;
        }
      }
      if(targetPlayer == 2) {
        if(player4[0] > player2[0]) {
          player2.pop();
          return 4;
        } if(player4[0] < player2[0]) {
          player4.pop();
          return 2;
        }
      }
      if(targetPlayer == 3) {
        if(player4[0] > player3[0]) {
          player3.pop();
          return 4;
        } if(player4[0] < player3[0]) {
          player4.pop();
          return 3;
        }
      }

    }
  },

  //Guard Card activated comes to this function
  requestCards: (cardValue,targetPlayer) => {
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

  checkImmunity:(currentPlayer)=>{
    if (currentPlayer[0].value = 4)
      {return true;}
    else{return false;}
  }

};
