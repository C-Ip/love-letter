'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'playergame',
      {
        playergameid: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        playerid: {
          type: Sequelize.INTEGER,
          foreignKey: {
            name: 'playerid',
            table: 'players',
            rules: {
              onDelete: 'CASCADE',
              onUpdate: 'RESTRICT'
            }
          }
        },
        gameid: {
          type: Sequelize.INTEGER,
          foreignKey:{
            name: 'gameid',
            table: 'game',
            rules: {
              onDelete: 'CASCADE',
              onUpdate: 'RESTRICT'
            }
          }
        },
        positionid: {
          type: Sequelize.INTEGER
        }
      }
      );
  },

  down: (queryInterface, Sequelize) => {
	return queryInterface.dropTable('playergame');
  }
};
