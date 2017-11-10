'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(
      'cards',
      {
        cardid: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        cardvalue: {
          type: Sequelize.INTEGER
        },
        action: {
          type: Sequelize.STRING
        }
      }
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cards');
  }
};
