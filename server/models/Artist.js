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
        foreignKey: 'artist_id',
      });
      this.hasMany(models.Song, {
        foreignKey: 'artist_id',
      });
    }
  };
  Artist.init({
    name: DataTypes.STRING,
    artist_img: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Artist',
  });
  return Artist;
};