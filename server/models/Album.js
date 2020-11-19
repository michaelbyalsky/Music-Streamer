'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Artist, {
          foreignKey: 'artistId'
      })
      this.hasMany(models.Song, {
          foreignKey: 'albumId'
      })
      this.hasMany(models.InteractionsAlbums , {
        foreignKey: 'albumId',
      })
    }
  };
  Album.init({
    name: DataTypes.STRING,
    artistId: DataTypes.INTEGER,
    coverImg: DataTypes.TEXT,

  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};