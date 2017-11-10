'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'game',
      {
        gameid: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        playerturn: {
          type: Sequelize.INTEGER
        } 
      }
      );
  },

  down: (queryInterface, Sequelize) => {
return queryInterface.dropTable('game');
  }
};
