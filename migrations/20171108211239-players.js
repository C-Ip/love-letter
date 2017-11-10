'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.createTable('players',
   	{
   		playerid:{
   			type: Sequelize.INTEGER,
   			primaryKey: true,
   			autoIncrement: true
   		},
      username:{
        type: Sequelize.STRING,
        allowNull: false
      },
      password:{
        type: Sequelize.STRING,
        allowNull: false
      },
      wins:{
        type: Sequelize.INTEGER
      }
   	}
   	);
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.dropTable('players');
  }
};
