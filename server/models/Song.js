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
        foreignKey: 'albumId',
      });
      this.belongsTo(models.Artist, {
        foreignKey: 'artistId',
      });
      this.hasMany(models.ListOfSongs, {
        foreignKey: 'songId',
      });
      this.hasMany(models.Interaction, {
        foreignKey: 'songId',
      });
    }
  };
  Song.init({
    title: DataTypes.STRING,
    albumId: DataTypes.INTEGER,
    artistId: DataTypes.INTEGER,
    youtubeLink: DataTypes.STRING,
    trackNumber: DataTypes.STRING,
    lyrics: DataTypes.STRING,    
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};