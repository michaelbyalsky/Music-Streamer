'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("songs", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      artist_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      youtube_link: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      album_id: {
        type: Sequelize.INTEGER,
      },
      length: {
        type: Sequelize.TIME,
      },
      track_number: { 
        type: Sequelize.INTEGER,
        allowNull: false
      },
      lyrics: { 
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("songs");
  }
};
