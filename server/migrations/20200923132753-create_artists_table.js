'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("artists", {
      id : {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
    },

    artist_img: {
      type: Sequelize.TEXT,
    },
    createdAt:{
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt:
    {
     allowNull: false, 
     type: Sequelize.DATE,
    }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("artists");
  }
};
