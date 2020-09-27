const Sequelize = require('sequelize')
'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Album, {
        foreignKey: 'album_id',
      });
      this.belongsTo(models.Artist, {
        foreignKey: 'artist_id',
      });
      this.hasMany(models.List_of_songs, {
        foreignKey: 'song_id',
      });
      this.hasMany(models.Interaction, {
        foreignKey: 'song_id',
      });
    }
  };
  Song.init({
    title: DataTypes.STRING,
    album_id: DataTypes.INTEGER,
    artist_id: DataTypes.INTEGER,
    youtube_link: DataTypes.STRING,
    track_number: DataTypes.STRING,
    lyrics: DataTypes.STRING,    
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};