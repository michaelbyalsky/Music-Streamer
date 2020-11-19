const Sequelize = require('sequelize')
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Album, {
        foreignKey: 'artistId',
      });
      this.hasMany(models.Song, {
        foreignKey: 'artistId',
      });
      this.hasMany(models.InteractionsArtists , {
        foreignKey: 'artistId',
      })
    }
  };
  Artist.init({
    name: DataTypes.STRING,
    artistImg: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Artist',
  });
  return Artist;
};