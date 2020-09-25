const Sequelize = require('sequelize')
'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class List_of_songs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Playlist, {
        foreignKey: 'playlist_id',
      });
      this.belongsTo(models.Song, {
        foreignKey: 'song_id',
      });
    }
  };
  List_of_songs.init({
    playlist_id: DataTypes.INTEGER,
    song_id: DataTypes.INTEGER,  
  }, {
    sequelize,
    modelName: 'List_of_songs',
  });
  return List_of_songs;
};