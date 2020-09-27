const Sequelize = require('sequelize')
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.List_of_songs, {
        foreignKey: 'playlist_id',
      });
      this.hasMany(models.Interactions_Playlists , {
        foreignKey: 'playlist_id',
      })
    }
  };

  Playlist.init({
    name: DataTypes.INTEGER,
    cover_img: DataTypes.TEXT,  
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};