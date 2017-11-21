'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(
      'gamecards',
      {
        gamecardsid: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
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
        cardid: {
          type: Sequelize.INTEGER,
          foreignKey:{
            name: 'cardid',
            table: 'cards',
            rules: {
              onDelete: 'CASCADE',
              onUpdate: 'RESTRICT'
            }
          }
        },
        playerid: {
          type: Sequelize.INTEGER,
          foreignKey:{
            name: 'playerid',
            table: 'players',
            rules: {
              onDelete: 'CASCADE',
              onUpdate: 'RESTRICT'
            }
          }
        },
        cardorder: {
          type: Sequelize.INTEGER
        },
        discarded: {
          type: Sequelize.INTEGER
        }                
      }
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('gamecards');
  }
};
