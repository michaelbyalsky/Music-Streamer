'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InteractionsAlbums extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Album, {
        foreignKey: 'albumId'
      })
    }
  };
  InteractionsAlbums.init({
    userId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    artistId: DataTypes.INTEGER,
    isLike: DataTypes.BOOLEAN,
    playCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'InteractionsAlbums',
    tableName: 'Interactions_Albums'
  });
  return InteractionsAlbums;
};